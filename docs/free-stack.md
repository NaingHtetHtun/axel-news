# Free Stack — Axel News

Paid → free tool mapping. Non-negotiable default: **100% free**.

## Decision Table

| Concern | Use (free) | Do not default to | Exception process |
|---------|------------|-------------------|-------------------|
| Framework | Next.js | N/A | — |
| Hosting | Vercel free tier | Paid hosting | Document if paid needed |
| Database | Supabase free tier | Paid-only DBs | Document if paid needed |
| Auth | Clerk free tier | Paid auth plans | Document if paid needed |
| Scraping | Playwright / Puppeteer + Chromium | Oxylabs, ScrapingBee | Document if paid needed |
| LLM | Groq → Gemini free → Ollama | OpenAI, Anthropic | Document if paid needed |
| Analytics | PostHog free tier | Paid analytics | Document if paid needed |
| UI | Tailwind CSS + Framer Motion | Paid UI libraries | — |
| Testing | Vitest / Jest (free) | Paid test services | — |
| CI/CD | GitHub Actions free | Paid CI services | — |

## Evaluation Process

When choosing any tool:

1. **Check free tier** — Is there a free option?
2. **Check limits** — Does it fit our scale?
3. **Check lock-in** — Can we migrate if needed?
4. **Check effort** — Is the free option reasonable to implement?
5. **Document exception** — If paid is required, document why in AGENTS.md

## Current Stack (Verified Free)

| Layer | Choice | Free Tier |
|-------|--------|-----------|
| Framework | Next.js 14+ | Open source |
| Hosting | Vercel | 100GB bandwidth/mo |
| Database | Supabase | 500MB, 50k MAU |
| Auth | Clerk | 10k MAU |
| Scraper | Playwright | Unlimited (local) |
| LLM | Groq/Gemini/Ollama | Rate-limited / local |
| Analytics | PostHog | 1M events/mo |
| UI | Tailwind + Framer | Open source |
| Testing | Vitest | Open source |
| CI/CD | GitHub Actions | 2000 min/mo |

## Migration Path

If we outgrow free tiers:

| Service | Free Limit | Paid Alternative | Migration Effort |
|---------|------------|------------------|------------------|
| Supabase | 500MB | Supabase Pro ($25/mo) | Low |
| Vercel | 100GB | Vercel Pro ($20/mo) | Low |
| Clerk | 10k MAU | Clerk Pro ($25/mo) | Low |
| PostHog | 1M events | PostHog paid | Low |

## Red Lines

- Never use Oxylabs, ScrapingBee, or paid scrapers as default
- Never use OpenAI or Anthropic as default LLM
- Never skip free evaluation
- Always document paid exceptions
