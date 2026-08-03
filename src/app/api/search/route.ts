import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { generateEmbedding } from "@/ai/embeddings";

type SearchResult = {
  id: string;
  url: string;
  title: string;
  body: string | null;
  source: string;
  language: string;
  published_at: string | null;
  summary: string | null;
  sentiment: string | null;
  similarity: number;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const threshold = parseFloat(searchParams.get("threshold") || "0.5");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query);

    // Search using the Supabase function
    const supabase = getSupabase();

    const { data, error } = await supabase.rpc("search_articles", {
      query_embedding: queryEmbedding,
      match_count: limit,
      match_threshold: threshold,
    });

    if (error) {
      throw error;
    }

    const results: SearchResult[] = data || [];

    return NextResponse.json({
      query,
      results,
      count: results.length,
    });
  } catch (error) {
    console.error("[Search API] Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
