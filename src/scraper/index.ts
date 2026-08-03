import { chromium, Browser, Page } from "playwright";
import { SourceConfig, sources } from "./sources";
import { normalizeArticle } from "./normalize";
import { upsertArticle } from "@/lib/articles";

const DELAY_MS = 2000;
const MAX_RETRIES = 3;

export async function scrapeSource(source: SourceConfig) {
  console.log(`[Scraper] Starting: ${source.name}`);

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

    console.log(`[Scraper] Found ${articleLinks.length} articles from ${source.name}`);

    for (const link of articleLinks) {
      try {
        await scrapeArticle(page, link, source);
        await page.waitForTimeout(DELAY_MS);
      } catch (error) {
        console.error(`[Scraper] Failed to scrape ${link}:`, error);
      }
    }
  } catch (error) {
    console.error(`[Scraper] Failed to scrape source ${source.name}:`, error);
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
      console.log(`[Scraper] Saved: ${title.substring(0, 50)}...`);
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

  for (const source of sources) {
    await scrapeSource(source);
  }

  console.log("[Scraper] Full scrape complete.");
}

if (require.main === module) {
  scrapeAll().catch(console.error);
}
