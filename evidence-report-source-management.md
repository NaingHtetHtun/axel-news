# Evidence Report — Source Management UI

## Phase: Later (Optional)

### Status: ✅ DONE

---

## What Was Implemented

### 1. Sources Table Migration

- Created `supabase/migrations/003_sources.sql`
- Added `sources` table with fields: name, url, rss_url, language, is_active, last_scraped_at, scrape_error
- Added RLS policies for public read, authenticated CRUD
- Added auto-update trigger for `updated_at` timestamp

### 2. Data Access Functions

- Created `src/lib/sources.ts` with full CRUD operations:
  - `getSources()` — Get all sources
  - `getActiveSources()` — Get only active sources
  - `getSourceById()` — Get single source
  - `createSource()` — Create new source
  - `updateSource()` — Update source
  - `deleteSource()` — Delete source
  - `updateScrapeStatus()` — Update scrape status with error handling

### 3. API Endpoints

- `GET /api/sources` — List all sources (authenticated)
- `POST /api/sources` — Create new source (authenticated)
- `GET /api/sources/[id]` — Get single source (authenticated)
- `PUT /api/sources/[id]` — Update source (authenticated)
- `DELETE /api/sources/[id]` — Delete source (authenticated)

### 4. Admin Page

- Created `src/app/admin/sources/page.tsx`
- Full CRUD interface for managing sources
- Table view with columns: Name, URL, RSS URL, Language, Active, Last Scraped, Actions
- Active toggle button for enabling/disabling sources
- Edit/Add modal with form fields
- Delete with confirmation dialog
- Loading skeleton animation
- Error display with red alert
- Dark mode support matching project theme

### 5. Scraper Updates

- Modified `src/scraper/index.ts` to fetch sources from database
- Falls back to hardcoded defaults if database unavailable
- Tracks scrape status per source (success/failure)
- Uses `updateScrapeStatus()` to record last_scraped_at and errors

### 6. Navigation

- Added "Admin" link to header navigation
- Links to `/admin/sources`

## Evidence

### Build Verification

```
npm run build
✓ Build passed
```

### Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `supabase/migrations/003_sources.sql` | Created | Sources table with RLS |
| `src/lib/sources.ts` | Created | Data access functions |
| `src/app/api/sources/route.ts` | Created | GET/POST endpoints |
| `src/app/api/sources/[id]/route.ts` | Created | GET/PUT/DELETE endpoints |
| `src/app/admin/sources/page.tsx` | Created | Admin management UI |
| `src/scraper/index.ts` | Modified | Database sources support |
| `src/components/header.tsx` | Modified | Added Admin link |

### API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/sources` | GET | Yes | List all sources |
| `/api/sources` | POST | Yes | Create source |
| `/api/sources/[id]` | GET | Yes | Get source |
| `/api/sources/[id]` | PUT | Yes | Update source |
| `/api/sources/[id]` | DELETE | Yes | Delete source |

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Source name |
| url | text | Source URL (unique) |
| rss_url | text | RSS feed URL (optional) |
| language | text | my/en/mixed |
| is_active | boolean | Whether source is active |
| last_scraped_at | timestamptz | Last successful scrape |
| scrape_error | text | Last scrape error message |

## Usage

### 1. Run Migration

```sql
-- In Supabase SQL Editor
-- Run contents of supabase/migrations/003_sources.sql
```

### 2. Access Admin Page

Navigate to `/admin/sources` (requires Clerk authentication)

### 3. Add Sources

1. Click "Add Source"
2. Fill in name, URL, optional RSS URL, language
3. Click "Save"

### 4. Toggle Sources

- Click the active toggle to enable/disable sources
- Disabled sources are skipped during scraping

## Verification Gates

- [x] Build passes (`npm run build`)
- [x] TypeScript compilation succeeds
- [x] API endpoints respond correctly
- [x] Admin page renders with proper auth
- [x] CRUD operations work end-to-end
- [x] Scraper falls back to defaults if no DB sources

## Next Steps

- Add source health monitoring dashboard
- Add automatic source discovery from RSS feeds
- Add source categorization (tech, business, etc.)
- Add bulk import/export of sources
