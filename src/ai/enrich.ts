import { EnrichmentResult, LLMProvider } from "./types";
import { enrichWithGroq } from "./groq";
import { updateArticleEnrichment } from "@/lib/articles";

const PROVIDER_ORDER: LLMProvider[] = ["groq"];

export async function enrichArticle(
  articleId: string,
  title: string,
  body: string,
  language: string
): Promise<{ success: boolean; provider?: LLMProvider; error?: string }> {
  for (const provider of PROVIDER_ORDER) {
    try {
      const result = await enrichWithProvider(provider, title, body, language);

      await updateArticleEnrichment(articleId, {
        summary: result.summary,
        sentiment: result.sentiment,
        bias_notes: result.bias_notes,
        enrichment_model: provider,
      });

      console.log(`[Enrich] Success with ${provider} for article ${articleId}`);
      return { success: true, provider };
    } catch (error) {
      console.error(`[Enrich] Failed with ${provider}:`, error);
      continue;
    }
  }

  return {
    success: false,
    error: "All providers failed",
  };
}

async function enrichWithProvider(
  provider: LLMProvider,
  title: string,
  body: string,
  language: string
): Promise<EnrichmentResult> {
  switch (provider) {
    case "groq":
      return enrichWithGroq(title, body, language);
    default:
      throw new Error(`Provider ${provider} not implemented`);
  }
}

export async function enrichUnenrichedArticles(limit: number = 10) {
  const { getSupabase } = await import("@/lib/supabase");
  const supabase = getSupabase();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, body, language")
    .is("summary", null)
    .limit(limit);

  if (error) {
    throw error;
  }

  console.log(`[Enrich] Found ${articles?.length || 0} unenriched articles`);

  let successCount = 0;
  let failCount = 0;

  for (const article of articles || []) {
    const result = await enrichArticle(
      article.id,
      article.title,
      article.body || "",
      article.language || "en"
    );

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`[Enrich] Complete: ${successCount} success, ${failCount} failed`);
  return { successCount, failCount };
}
