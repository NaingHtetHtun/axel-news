import { EnrichmentResult } from "./types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function enrichWithGroq(
  title: string,
  body: string,
  language: string
): Promise<EnrichmentResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY not set");
  }

  const prompt = `Analyze this news article and provide:
1. A 2-3 sentence summary
2. Sentiment (positive, neutral, or negative)
3. Any bias notes (empty string if none)

Return JSON only:
{"summary": "...", "sentiment": "positive|neutral|negative", "bias_notes": "...", "confidence": 0.0-1.0}

Article:
Title: ${title}
Body: ${body.substring(0, 2000)}
Language: ${language}`;

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || "";

  return parseEnrichmentResult(content, "groq");
}

function parseEnrichmentResult(
  content: string,
  model: string
): EnrichmentResult {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      summary: parsed.summary || "",
      sentiment: validateSentiment(parsed.sentiment),
      bias_notes: parsed.bias_notes || "",
      confidence: parsed.confidence || 0.5,
    };
  } catch {
    return {
      summary: content.substring(0, 200),
      sentiment: "neutral",
      bias_notes: "",
      confidence: 0.3,
    };
  }
}

function validateSentiment(
  sentiment: string
): "positive" | "neutral" | "negative" {
  if (sentiment === "positive" || sentiment === "negative") {
    return sentiment;
  }
  return "neutral";
}
