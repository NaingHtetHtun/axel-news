import { getSupabase } from "./supabase";

export type Article = {
  id: string;
  url: string;
  title: string;
  body: string | null;
  source: string;
  language: "my" | "en" | "mixed" | null;
  published_at: string | null;
  scraped_at: string;
  summary: string | null;
  sentiment: "positive" | "neutral" | "negative" | null;
  bias_notes: string | null;
  enrichment_model: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleInsert = Omit<
  Article,
  "id" | "created_at" | "updated_at" | "scraped_at"
>;

export async function getArticles({
  page = 1,
  limit = 20,
  source,
  language,
}: {
  page?: number;
  limit?: number;
  source?: string;
  language?: string;
} = {}) {
  const supabase = getSupabase();
  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (source) {
    query = query.eq("source", source);
  }

  if (language) {
    query = query.eq("language", language);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Article[];
}

export async function getArticleById(id: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Article;
}

export async function getArticleByUrl(url: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("url", url)
    .single();

  if (error) {
    throw error;
  }

  return data as Article;
}

export async function upsertArticle(article: ArticleInsert) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("articles")
    .upsert(article, { onConflict: "url" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Article;
}

export async function updateArticleEnrichment(
  id: string,
  enrichment: {
    summary: string;
    sentiment: "positive" | "neutral" | "negative";
    bias_notes: string;
    enrichment_model: string;
  }
) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("articles")
    .update({
      ...enrichment,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Article;
}
