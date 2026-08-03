# Scraping Rules — Axel News

Ethical and technical guidelines for news ingestion.

## Core Principles

1. **Public pages only** — Never scrape login-walled content
2. **Respect robots.txt** — Check and follow directives
3. **Rate limiting** — Don't overwhelm source servers
4. **Attribution** — Link back to original sources
5. **No bypasses** — Don't circumvent anti-bot measures

## Allowed Sources

- Public Myanmar IT/tech news sites
- Sites without paywalls
- Sites that don't explicitly block scraping

## Prohibited

- Login-walled content
- Paywalled articles
- Sites with explicit no-scrape directives
- Bypassing CAPTCHAs or anti-bot systems

## Technical Approach

### Primary: Playwright Worker

- Run locally or on long-running server
- Headless Chromium for JavaScript-rendered pages
- Handle dynamic content loading
- Extract: title, body, source, published_at, language

### Secondary: Light API Scrape

- For sites with public RSS or API
- Simpler, faster, less resource-intensive
- Fallback when Playwright not needed

## Normalization

All scraped content should be normalized to:

| Field | Description |
|-------|-------------|
| `url` | Canonical URL (unique key) |
| `title` | Headline text |
| `body` | Cleaned article text (no HTML) |
| `source` | Site name or domain |
| `published_at` | Source timestamp if known |
| `language` | `my` / `en` / `mixed` |
| `scraped_at` | Ingest timestamp |

## Error Handling

- Log failed scrapes with URL and error
- Don't retry indefinitely (max 3 attempts)
- Alert on repeated failures for same source
- Skip and continue on single source failure
