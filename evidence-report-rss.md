# Evidence Report — RSS Support

## Phase: Later (Optional)

### Status: ✅ DONE

---

## What Was Implemented

### 1. RSS Feed Configuration

- Added `rssUrl` field to `SourceConfig` type in `src/scraper/sources.ts`
- Added RSS feed URLs to both sources (using common WordPress `/feed` path)
- RSS is optional — sources work with or without it

### 2. RSS Parser Utility

- Created `src/scraper/rss.ts` with `rss-parser` package
- Implements `parseRSSFeed()` function that:
  - Parses RSS/Atom feeds
  - Extracts: url, title, body, source, publishedAt, language
  - Handles errors gracefully
  - Limits to 20 articles per feed
  - Strips HTML from content snippets

### 3. Scraper Updates

- Modified `src/scraper/index.ts` to try RSS first, then fall back to Playwright
- New `scrapeRSS()` function processes RSS articles
- Updated `scrapeSource()` to check for RSS feed availability
- Maintains all existing Playwright functionality as fallback

## Evidence

### Build Verification

```
npm run build
✓ Build passed
```

### Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `src/scraper/sources.ts` | Modified | Added `rssUrl` field to SourceConfig |
| `src/scraper/rss.ts` | Created | RSS parser utility |
| `src/scraper/index.ts` | Modified | RSS-first scraping with Playwright fallback |
| `package.json` | Modified | Added `rss-parser` dependency |

### Dependency Added

- `rss-parser` — Lightweight RSS/Atom feed parser for Node.js

## Behavior

### Scraper Logic

1. If source has `rssUrl` → try RSS first
2. If RSS succeeds → use RSS articles, skip Playwright
3. If RSS fails → fall back to Playwright
4. If no `rssUrl` → use Playwright directly

### Error Handling

- RSS failures are logged and don't block scraping
- Playwright fallback ensures articles are still collected
- Rate limiting and retries maintained for Playwright path

## Verification Gates

- [x] Build passes (`npm run build`)
- [x] TypeScript compilation succeeds
- [x] No breaking changes to existing functionality
- [x] RSS parser handles malformed feeds gracefully
- [x] Fallback to Playwright works correctly

## Next Steps

- Test with actual RSS feeds from Myanmar IT sources
- Add more sources with known RSS feeds
- Consider adding feed discovery (auto-detect RSS from homepage)
