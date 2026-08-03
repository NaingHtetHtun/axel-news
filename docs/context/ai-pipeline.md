# AI Pipeline — Axel News

How articles are enriched with AI.

## Pipeline Flow

```text
Raw Article
  → Language Detection
  → Summary Generation
  → Sentiment Analysis
  → Bias Detection
  → Store Enriched Data
```

## Enrichment Fields

| Field | Type | Description |
|-------|------|-------------|
| `summary` | text | 2-3 sentence AI-generated summary |
| `sentiment` | enum | positive / neutral / negative |
| `bias_notes` | text | Brief bias hints (if any) |
| `enrichment_model` | text | Which model produced output |

## Model Priority

1. **Groq** (default) — Fast, free tier, good for structured output
2. **Gemini** (fallback) — Free tier, good for Myanmar content
3. **Ollama** (local) — Unlimited, offline/dev use

## Structured Output

All enrichment must return structured JSON:

```json
{
  "summary": "AI-generated summary text",
  "sentiment": "positive|neutral|negative",
  "bias_notes": "Brief bias hints or empty string",
  "confidence": 0.85
}
```

## Idempotency

- Re-enriching same article should produce same (or better) output
- Store `enrichment_model` to track which model was used
- Allow manual re-enrichment with different model

## Error Handling

- Log failed enrichments with article URL and error
- Don't block pipeline on single article failure
- Track enrichment success/failure rate
- Allow partial enrichment (e.g., summary but no sentiment)

## Rate Limits

- Groq: implement backoff on 429 errors
- Gemini: implement backoff on 429 errors
- Ollama: no rate limits (local)

## Myanmar Content

- Some models handle Myanmar better than others
- Gemini may be better for Myanmar text
- Fallback to English summary if Myanmar fails
