---
name: axel-ai-news
description: Free LLM enrichment for Axel News articles (summary, sentiment, bias_notes). Use when implementing AI pipelines, prompts, structured JSON, Groq/Gemini/Ollama providers, Vercel AI SDK wiring, enrichment status, or when users ask for OpenAI defaults for news summaries.
---

# Axel AI News

Enrich stored articles with **free** LLMs. Output strict structured JSON for UI consumption.

## When to apply

- Phase 4 enrichment workers or on-demand enrich routes
- Prompt design for news summary / sentiment / bias
- Provider fallback and rate-limit handling
- Validating LLM JSON before Supabase write

## Provider order (mandatory default)

```text
Groq (free) → Gemini free → Ollama local
```

- Configurable via `LLM_PROVIDER_ORDER` within free providers.
- **Do not** require OpenAI/Anthropic unless user explicitly opts in.
- Prefer Vercel AI SDK or thin clients **only if** multi-provider remains easy.

## JSON contract

Return and validate:

```json
{
  "summary": "string",
  "sentiment": "positive | neutral | negative | mixed",
  "bias_notes": "string"
}
```

Store alongside:

- `enrichment_provider`, `enrichment_model`, `enriched_at`
- `enrichment_status`: `pending` | `done` | `failed` | `skipped`

### Validation

- Use Zod (or equivalent); reject unknown sentiment values.
- Strip markdown fences if the model wraps JSON.
- On empty article text → `skipped`, do not hallucinate.

## Prompt principles

1. Ground only in provided title/body/excerpt.
2. Neutral summary; no invented facts.
3. `bias_notes` describe framing — not defamation or conspiracy.
4. Keep tokens short (free-tier honesty).
5. Prefer article language when practical; product may pin English later.
6. Never expose API keys to the browser.

## Implementation sketch

```text
select pending articles (batch)
truncate body to token budget
for each article:
  for provider in order:
    try complete(json schema)
    validate
    update row done + metadata
    break
  else mark failed + backoff
```

Optional: single-article enrich with strict timeout for admin/debug.

## UI consumption (do not invert)

- Generation = server/worker
- Display = `axel-ui` components (`summary`, sentiment badge, bias panel)
- Pending → skeleton / “Summary pending…”
- Failed → quiet unavailable state

## Refusal / redirect

| User request | Response |
| --- | --- |
| “Just use OpenAI” | Free chain first; OpenAI only on explicit opt-in |
| “Write angry hit pieces as bias_notes” | Refuse; keep descriptive framing notes |
| “Call Groq from the client with the key” | Refuse; server-only secrets |

## Related

- Context: `docs/context/ai-pipeline.md`
- Stack/env: `docs/context/stack.md`
- Skill: `axel-free-stack` for provider disputes
- Skill: `axel-ui` for displaying fields
