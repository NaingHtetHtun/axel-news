require("dotenv").config({ path: ".env.local" });

// Embedding generation worker
// Generates vector embeddings for articles that don't have them yet

import { getSupabase } from "@/lib/supabase";
import { generateEmbedding } from "./embeddings";

const BATCH_SIZE = 10;
const DELAY_MS = 1000;

type Article = {
  id: string;
  title: string;
  body: string | null;
  summary: string | null;
};

async function getArticlesWithoutEmbeddings(): Promise<Article[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("articles")
    .select("id, title, body, summary")
    .is("embedding", null)
    .limit(BATCH_SIZE);

  if (error) {
    throw error;
  }

  return data || [];
}

async function updateArticleEmbedding(
  articleId: string,
  embedding: number[]
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("articles")
    .update({ embedding: embedding })
    .eq("id", articleId);

  if (error) {
    throw error;
  }
}

function prepareTextForEmbedding(article: Article): string {
  // Combine title, summary, and body for embedding
  // Prioritize summary if available, otherwise use body
  const parts = [article.title];

  if (article.summary) {
    parts.push(article.summary);
  } else if (article.body) {
    // Use first 1000 chars of body if no summary
    parts.push(article.body.substring(0, 1000));
  }

  return parts.join("\n\n");
}

async function processArticle(article: Article): Promise<boolean> {
  try {
    const text = prepareTextForEmbedding(article);
    const embedding = await generateEmbedding(text);
    await updateArticleEmbedding(article.id, embedding);
    console.log(
      `[Embedding] Generated for: ${article.title.substring(0, 50)}...`
    );
    return true;
  } catch (error) {
    console.error(
      `[Embedding] Failed for article ${article.id}:`,
      error
    );
    return false;
  }
}

async function generateAllEmbeddings() {
  console.log("[Embedding] Starting embedding generation...");

  let totalProcessed = 0;
  let totalFailed = 0;

  while (true) {
    const articles = await getArticlesWithoutEmbeddings();

    if (articles.length === 0) {
      console.log("[Embedding] No more articles to process.");
      break;
    }

    console.log(`[Embedding] Processing ${articles.length} articles...`);

    for (const article of articles) {
      const success = await processArticle(article);

      if (success) {
        totalProcessed++;
      } else {
        totalFailed++;
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  console.log("[Embedding] Generation complete.");
  console.log(`[Embedding] Processed: ${totalProcessed}, Failed: ${totalFailed}`);
}

// Get embedding status
async function getEmbeddingStatus() {
  const supabase = getSupabase();

  const { data, error } = await supabase.rpc("get_embedding_status");

  if (error) {
    throw error;
  }

  return data;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args[0] === "status") {
    getEmbeddingStatus()
      .then((status) => {
        console.log("[Embedding] Status:", status);
      })
      .catch(console.error);
  } else {
    generateAllEmbeddings().catch(console.error);
  }
}

export { generateAllEmbeddings, getEmbeddingStatus };
