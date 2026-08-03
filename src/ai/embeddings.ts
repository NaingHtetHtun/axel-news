// Embedding generation using Groq's free embedding API
// Uses model: mixtral-8x7b-32768 (free tier)

const GROQ_API_URL = "https://api.groq.com/openai/v1/embeddings";
const EMBEDDING_MODEL = "mixtral-8x7b-32768";
const EMBEDDING_DIMENSIONS = 1536;

type EmbeddingResponse = {
  data: Array<{
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
};

export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is required for embedding generation");
  }

  // Truncate text to avoid token limits
  const truncatedText = text.substring(0, 8000);

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: truncatedText,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data: EmbeddingResponse = await response.json();

  if (!data.data || data.data.length === 0) {
    throw new Error("No embedding returned from API");
  }

  return data.data[0].embedding;
}

export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is required for embedding generation");
  }

  // Truncate texts to avoid token limits
  const truncatedTexts = texts.map((text) => text.substring(0, 8000));

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: truncatedTexts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data: EmbeddingResponse = await response.json();

  if (!data.data || data.data.length === 0) {
    throw new Error("No embeddings returned from API");
  }

  // Sort by index to maintain order
  return data.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
}

export { EMBEDDING_DIMENSIONS };
