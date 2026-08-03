require("dotenv").config({ path: ".env.local" });

import { chromium, Browser, Page } from "playwright";
import { SourceConfig, sources as defaultSources } from "./sources";
import { normalizeArticle } from "./normalize";
import { upsertArticle } from "@/lib/articles";
import { parseRSSFeed, RSSArticle } from "./rss";
import { getActiveSources, Source, updateScrapeStatus } from "@/lib/sources";

const DELAY_MS = 2000;
const MAX_RETRIES = 3;

// Convert database source to SourceConfig
function dbSourceToConfig(source: Source): SourceConfig {
  return {
    name: source.name,
    url: source.url,
    rssUrl: source.rss_url || undefined,
    selector: {
      articleLink: "article a",
      title: "h1",
      body: "article-content",
      publishedAt: "time",
    },
    language: source.language,
  };
}

export async function scrapeSource(source: SourceConfig, sourceId?: string) {
  console.log(`[Scraper] Starting: ${source.name}`);

  // Try RSS first if available
  if (source.rssUrl) {
    console.log(`[Scraper] Trying RSS feed for ${source.name}...`);
    const rssArticles = await scrapeRSS(source);

    if (rssArticles.length > 0) {
      console.log(
        `[Scraper] Successfully scraped ${rssArticles.length} articles via RSS from ${source.name}`
      );
      if (sourceId) {
        await updateScrapeStatus(sourceId, true);
      }
      return;
    }

    console.log(
      `[Scraper] RSS failed or unavailable for ${source.name}, falling back to Playwright...`
    );
  }

  // Fall back to Playwright
  await scrapeWithPlaywright(source, sourceId);
}

async function scrapeRSS(source: SourceConfig): Promise<RSSArticle[]> {
  if (!source.rssUrl) return [];

  const articles = await parseRSSFeed(
    source.rssUrl,
    source.name,
    source.language
  );

  for (const rssArticle of articles) {
    try {
      const article = normalizeArticle({
        url: rssArticle.url,
        title: rssArticle.title,
        body: rssArticle.body,
        source: rssArticle.source,
        publishedAt: rssArticle.publishedAt,
        language: rssArticle.language,
      });

      await upsertArticle(article);
      console.log(`[Scraper] Saved via RSS: ${rssArticle.title.substring(0, 50)}...`);
    } catch (error) {
      console.error(`[Scraper] Failed to save RSS article ${rssArticle.url}:`, error);
    }
  }

  return articles;
}

async function scrapeWithPlaywright(source: SourceConfig, sourceId?: string) {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(source.url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(DELAY_MS);

    const articleLinks = await page.$$eval(
      source.selector.articleLink,
      (links) =>
        links
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((href) => href && href.startsWith("http"))
          .slice(0, 10)
    );

    console.log(
      `[Scraper] Found ${articleLinks.length} articles from ${source.name} via Playwright`
    );

    for (const link of articleLinks) {
      try {
        await scrapeArticle(page, link, source);
        await page.waitForTimeout(DELAY_MS);
      } catch (error) {
        console.error(`[Scraper] Failed to scrape ${link}:`, error);
      }
    }

    if (sourceId) {
      await updateScrapeStatus(sourceId, true);
    }
  } catch (error) {
    console.error(
      `[Scraper] Failed to scrape source ${source.name} via Playwright:`,
      error
    );
    if (sourceId) {
      await updateScrapeStatus(
        sourceId,
        false,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  } finally {
    await browser?.close();
  }
}

async function scrapeArticle(
  page: Page,
  url: string,
  source: SourceConfig
) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(DELAY_MS);

      const title = await page.$eval(source.selector.title, (el) =>
        el.textContent?.trim() || ""
      );

      const body = await page.$eval(source.selector.body, (el) =>
        el.textContent?.trim() || ""
      );

      let publishedAt: string | undefined;
      if (source.selector.publishedAt) {
        publishedAt = await page
          .$eval(source.selector.publishedAt, (el) =>
            el.getAttribute("datetime") || el.textContent?.trim() || ""
          )
          .catch(() => undefined);
      }

      const article = normalizeArticle({
        url,
        title,
        body,
        source: source.name,
        publishedAt,
        language: source.language,
      });

      await upsertArticle(article);
      console.log(`[Scraper] Saved via Playwright: ${title.substring(0, 50)}...`);
      return;
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      await page.waitForTimeout(DELAY_MS * retries);
    }
  }
}

export async function scrapeAll() {
  console.log("[Scraper] Starting full scrape...");

  let dbSources: Source[] = [];

  try {
    dbSources = await getActiveSources();
  } catch (error) {
    console.warn(
      "[Scraper] Could not fetch sources from database, using defaults:",
      error
    );
  }

  // Use database sources if available, otherwise fall back to defaults
  const sourcesToScrape =
    dbSources.length > 0
      ? dbSources.map((s) => ({
          config: dbSourceToConfig(s),
          id: s.id,
        }))
      : defaultSources.map((s) => ({ config: s, id: undefined }));

  for (const { config, id } of sourcesToScrape) {
    await scrapeSource(config, id);
  }

  console.log("[Scraper] Full scrape complete.");
}

if (require.main === module) {
  scrapeAll().catch(console.error);
}
