import { ArticleInsert } from "@/lib/articles";

export function normalizeArticle(raw: {
  url: string;
  title: string;
  body: string;
  source: string;
  publishedAt?: string;
  language: "my" | "en" | "mixed";
}): ArticleInsert {
  return {
    url: raw.url,
    title: cleanText(raw.title),
    body: cleanText(raw.body),
    source: raw.source,
    language: raw.language,
    published_at: raw.publishedAt ? new Date(raw.publishedAt).toISOString() : null,
    summary: null,
    sentiment: null,
    bias_notes: null,
    enrichment_model: null,
  };
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, "\n")
    .trim();
}

export function detectLanguage(text: string): "my" | "en" | "mixed" {
  const myanmarChars = text.match(/[\u1000-\u109F]/g) || [];
  const englishChars = text.match(/[a-zA-Z]/g) || [];
  const total = myanmarChars.length + englishChars.length;

  if (total === 0) return "en";

  const myanmarRatio = myanmarChars.length / total;
  if (myanmarRatio > 0.7) return "my";
  if (myanmarRatio < 0.3) return "en";
  return "mixed";
}
