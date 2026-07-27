# Context — Scraping

## Goal

Ingest public Myanmar IT / tech news pages into Supabase as normalized articles.

## Default tool

- **Playwright + Chromium** (preferred)
- Puppeteer acceptable if already chosen for a task

**Not default:** Oxylabs, Bright Data, paid residential proxies, or paid scrape APIs.

Optional free tiers (Firecrawl / Apify) only for tiny experiments — document why if used.

## Placement

| Environment | Recommendation |
|-------------|----------------|
| Local dev | Playwright script or `packages/scraper` style worker |
| Production pet | Scheduled worker / small always-on free VM if needed |
| Vercel API route | Only lightweight fetches; avoid full Chromium when possible |

## Pipeline sketch

1. Seed list of source URLs or listing pages
2. Open page with Playwright
3. Extract title, body text, canonical URL, published time if present
4. Clean boilerplate (nav, ads, scripts)
5. Upsert by `url` into Supabase
6. Enqueue AI enrichment (separate step)

## Ethics & safety

- Public pages only
- Respect `robots.txt` and site terms when practical
- Rate-limit requests; identify a clear user-agent string for a personal project
- No login bypass, CAPTCHA solving services, or paywall circumvention
- Always keep `source` + outbound link to original

## Quality bar

- Prefer stable selectors; fall back carefully
- Handle timeouts and empty extractions without crashing the whole job
- Log failures per URL
- Idempotent upserts (same URL → update, don’t duplicate)

## Related

- Skill: `axel-scraper`
- Architecture article lifecycle: `docs/architecture.md`
- Free replacement rationale: `docs/free-stack.md`
