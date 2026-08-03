import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "Axel-News-RSS/1.0",
  },
});

export type RSSArticle = {
  url: string;
  title: string;
  body: string;
  source: string;
  publishedAt?: string;
  language: "my" | "en" | "mixed";
};

export async function parseRSSFeed(
  feedUrl: string,
  sourceName: string,
  language: "my" | "en" | "mixed"
): Promise<RSSArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);

    return feed.items
      .filter((item) => item.link && item.title)
      .slice(0, 20) // Limit to 20 articles per feed
      .map((item) => ({
        url: item.link!,
        title: item.title || "",
        body: item.contentSnippet || item.content || item.summary || "",
        source: sourceName,
        publishedAt: item.pubDate || item.isoDate || undefined,
        language,
      }));
  } catch (error) {
    console.error(`[RSS] Failed to parse ${feedUrl}:`, error);
    return [];
  }
}

export function stripHTML(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
