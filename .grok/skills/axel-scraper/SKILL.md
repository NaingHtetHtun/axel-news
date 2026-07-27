---
name: axel-scraper
description: Playwright-first ethical scraping for Axel News. Use when building or changing scrapers, extractors, listing crawls, Supabase article upserts, worker/cron ingest, selectors, or when users mention Puppeteer, Oxylabs, paywalls, or headless browsers.
---

# Axel Scraper

Build **ethical, public-page** scrapers that upsert articles for Axel News. Playwright-first. No paywall bypass.

## When to apply

- Implementing Phase 3 scraper work
- Site-specific extractors or listing crawls
- Choosing worker vs serverless placement
- User asks to “unblock” or bypass paywalls / CAPTCHAs

## Defaults

| Decision | Choice |
| --- | --- |
| Browser | Playwright (Chromium); Puppeteer acceptable if already standard |
| Proxies | None by default (see `axel-free-stack`) |
| Runtime | Dedicated worker / cron — **not** per-request serverless Chromium |
| Storage | Supabase upsert by `source_url` |
| Scope | Public HTML only |

## Pipeline checklist

1. Seed or listing URL (public).
2. Navigate with sensible timeouts; handle cookie banners without dark patterns.
3. Extract: `source_url`, `source_name`, `title`, `author`, `published_at`, `excerpt`/`body`, `image_url`, `locale`.
4. Normalize canonical URL; strip chrome/nav from body when possible.
5. Upsert on `source_url`; set `scraped_at`.
6. If text is rich enough → `enrichment_status = pending`.
7. Rate-limit; log failures with URL + reason; continue batch.

## Upsert patterns

- **Unique key:** `source_url`
- **On conflict:** refresh content fields + `scraped_at` / `updated_at`
- **Re-enrich:** if body meaningfully changed, re-queue enrichment
- **Idempotent runs:** safe to re-run the same list

Conceptual SQL spirit (adapt to Supabase client):

```text
insert article
on conflict (source_url) do update set ...
```

## Ethics (hard rules)

**Must**

- Public pages only
- Polite concurrency (`SCRAPER_CONCURRENCY`, delays)
- Skip sources that require login for the content you need

**Must not**

- Bypass paywalls, meter limits, or member-only walls
- Use stolen cookies, shared logins, or credential stuffing
- Farm CAPTCHAs or sell access to scraped copyrighted full-text archives
- Ignore clear legal/ToS risk when the operator would be exposed

If asked to bypass a paywall: **refuse**, explain public-only policy, suggest licensed APIs or official RSS if available.

## Quality bar

- Non-empty title; usable excerpt or body for LLM
- Stable URLs (no session junk as identity)
- No crash-on-single-failure
- Config per source (selectors, rate limit), not one spaghetti script forever

## Anti-patterns

- Chromium inside every Next.js API request
- Defaulting to Oxylabs “to be safe”
- Storing unbounded raw HTML forever on free Supabase
- Scraping faster than a human site can reasonably serve

## Related

- Context: `docs/context/scraping.md`
- Architecture: `docs/architecture.md`
- Free stack: skill `axel-free-stack`
- Downstream: skill `axel-ai-news` for enrichment
