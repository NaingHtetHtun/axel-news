# Stack Limits — Axel News

Free tier constraints that affect architecture decisions.

## Hosting

| Service | Free Tier | Limit | Impact |
|---------|-----------|-------|--------|
| Vercel | Free | 100GB bandwidth/mo, 10s serverless timeout | No heavy Chromium in API routes |
| Supabase | Free | 500MB database, 50k MAU | Keep articles lean, archive old |
| Clerk | Free | 10k MAU | Sufficient for pet project |

## Scraping

| Service | Free Tier | Limit | Impact |
|---------|-----------|-------|--------|
| Playwright | Local | Unlimited (your machine) | Best for heavy scraping |
| Vercel Serverless | Free | 10s timeout, 50MB | Not suitable for Chromium |

**Decision:** Use local/long-running worker for scraping, NOT Vercel API routes.

## LLM

| Provider | Free Tier | Limit | Fallback Order |
|----------|-----------|-------|----------------|
| Groq | Free | Rate-limited (fast) | 1st choice |
| Gemini | Free | Rate-limited | 2nd choice |
| Ollama | Local | Unlimited (your machine) | 3rd choice (dev/offline) |

**Decision:** Always design for rate-limit fallback.

## Analytics

| Service | Free Tier | Limit | Impact |
|---------|-----------|-------|--------|
| PostHog | Free | 1M events/mo | More than sufficient |

## Key Constraints

1. **No Chromium on Vercel** — cold starts, size limits, 10s timeout
2. **Supabase 500MB** — archive or delete old articles if needed
3. **LLM rate limits** — implement fallback chain (Groq → Gemini → Ollama)
4. **No paid alternatives** — document exception if user requests paid tool
