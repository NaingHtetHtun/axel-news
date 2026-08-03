import { getSupabase } from "./supabase";

export type Source = {
  id: string;
  name: string;
  url: string;
  rss_url: string | null;
  language: "my" | "en" | "mixed";
  is_active: boolean;
  last_scraped_at: string | null;
  scrape_error: string | null;
  created_at: string;
  updated_at: string;
};

export type SourceInsert = Omit<
  Source,
  "id" | "created_at" | "updated_at" | "last_scraped_at" | "scrape_error"
>;

export type SourceUpdate = Partial<
  Omit<Source, "id" | "created_at" | "updated_at">
>;

// Get all sources
export async function getSources(): Promise<Source[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data || [];
}

// Get active sources only
export async function getActiveSources(): Promise<Source[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw error;
  }

  return data || [];
}

// Get source by ID
export async function getSourceById(id: string): Promise<Source | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    throw error;
  }

  return data;
}

// Create a new source
export async function createSource(source: SourceInsert): Promise<Source> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("sources")
    .insert(source)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Update a source
export async function updateSource(
  id: string,
  updates: SourceUpdate
): Promise<Source> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("sources")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete a source
export async function deleteSource(id: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.from("sources").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

// Update scrape status
export async function updateScrapeStatus(
  id: string,
  success: boolean,
  error?: string
): Promise<void> {
  const supabase = getSupabase();

  const updates: SourceUpdate = {
    last_scraped_at: new Date().toISOString(),
    scrape_error: success ? null : error || null,
  };

  const { error: updateError } = await supabase
    .from("sources")
    .update(updates)
    .eq("id", id);

  if (updateError) {
    throw updateError;
  }
}
