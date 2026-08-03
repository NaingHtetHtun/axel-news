export type EnrichmentResult = {
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  bias_notes: string;
  confidence: number;
};

export type LLMProvider = "groq" | "gemini" | "ollama";

const ENRICHMENT_PROMPT = `Analyze this news article and provide:
1. A 2-3 sentence summary
2. Sentiment (positive, neutral, or negative)
3. Any bias notes (empty string if none)

Return JSON:
{
  "summary": "...",
  "sentiment": "positive|neutral|negative",
  "bias_notes": "...",
  "confidence": 0.0-1.0
}

Article:
Title: {title}
Body: {body}
Language: {language}`;
