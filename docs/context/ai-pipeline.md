# Context — AI Pipeline

## Goal

For each stored article, produce assistive enrichment:

| Field | Intent |
|-------|--------|
| `summary` | Short, scannable summary (Myanmar and/or English as appropriate to source) |
| `sentiment` | Coarse label: `positive` \| `neutral` \| `negative` (or equivalent) |
| `bias_notes` | Brief notes on framing/angle — **not** a moral score or “fake news” verdict |
| `enrichment_model` | Which free model produced the result |

## Provider order (free)

1. **Groq** — default cloud free, fast
2. **Gemini free** (Google AI Studio) — backup when Groq limited
3. **Ollama** — local Llama/Mistral-class models; fully free offline

Do **not** default to OpenAI or Anthropic paid APIs.

## Output contract (target JSON)

```json
{
  "summary": "string",
  "sentiment": "positive|neutral|negative",
  "bias_notes": "string",
  "confidence": 0.0
}
```

Validate/parse strictly; on failure, store error state and retry later — don’t block the feed on one bad completion.

## Prompt principles

- Article title + body (truncated if needed for context windows)
- Ask for **JSON only** when using plain completions
- State that bias notes are descriptive, tentative, and non-defamatory
- Prefer concise outputs suitable for card UI

## Runtime

- Batch or queue enrichment to respect free rate limits
- Record `enrichment_model` per row for debugging
- Allow re-run enrichment without duplicating articles

## UI consumption

- Summary on cards and detail
- Sentiment as a small badge
- Bias notes on detail (collapsed or secondary text)
- Never present AI labels as absolute truth

## Related

- Skill: `axel-ai-news`
- Stack keys: `docs/context/stack.md`
- Free LLM section: `docs/free-stack.md`
