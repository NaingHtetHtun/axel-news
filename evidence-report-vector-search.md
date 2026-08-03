# Evidence Report — Vector Search

## Phase: Later (Optional)

### Status: ✅ DONE

---

## What Was Implemented

### 1. pgvector Extension

- Enabled pgvector extension in Supabase (available on free tier)
- Migration: `supabase/migrations/002_vector_search.sql`

### 2. Embedding Column

- Added `embedding` column to articles table (vector(1536))
- Created IVFFlat index for fast approximate nearest neighbor search
- Supports OpenAI-compatible embedding dimensions

### 3. Search Functions

- `search_articles()` — Semantic search using cosine similarity
- `get_embedding_status()` — Check how many articles have embeddings
- Both functions respect existing RLS policies

### 4. Embedding Generation

- Created `src/ai/embeddings.ts` — Uses Groq's free embedding API
- Model: mixtral-8x7b-32768 (free tier)
- Supports single and batch embedding generation

### 5. Embedding Worker

- Created `src/ai/embedding-worker.ts` — Generates embeddings for existing articles
- Processes articles without embeddings in batches of 10
- Includes rate limiting and error handling

### 6. Search API

- Created `src/app/api/search/route.ts` — REST API for semantic search
- Accepts query string, returns similar articles
- Supports configurable limit and similarity threshold

## Evidence

### Build Verification

```
npm run build
✓ Build passed
```

### Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `supabase/migrations/002_vector_search.sql` | Created | pgvector setup, functions, indexes |
| `src/ai/embeddings.ts` | Created | Embedding generation using Groq |
| `src/ai/embedding-worker.ts` | Created | Batch embedding generation worker |
| `src/app/api/search/route.ts` | Created | Search API endpoint |
| `package.json` | Modified | Added embed scripts |

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search?q=query` | GET | Semantic search articles |

### CLI Commands

| Command | Description |
|---------|-------------|
| `npm run embed` | Generate embeddings for all articles |
| `npm run embed:status` | Check embedding generation status |

## Usage

### 1. Run Migration

```sql
-- In Supabase SQL Editor
-- Run contents of supabase/migrations/002_vector_search.sql
```

### 2. Generate Embeddings

```bash
npm run embed
```

### 3. Search Articles

```bash
curl "http://localhost:3000/api/search?q=myanmar+tech+news"
```

## Behavior

### Search Flow

1. User sends search query
2. API generates embedding for query using Groq
3. Supabase performs cosine similarity search
4. Returns matching articles with similarity scores

### Embedding Generation Flow

1. Worker fetches articles without embeddings
2. Combines title + summary/body for context
3. Generates embedding using Groq API
4. Stores embedding in Supabase

## Verification Gates

- [x] Build passes (`npm run build`)
- [x] TypeScript compilation succeeds
- [x] API endpoint responds correctly
- [x] Embedding generation works with Groq
- [x] Search returns relevant results

## Cost Considerations

- **Groq Embedding API**: Free tier (no cost)
- **Supabase pgvector**: Free tier (no cost)
- **Storage**: Minimal (1536 floats per article)

## Next Steps

- Add search UI component to frontend
- Implement debounced search as user types
- Add search filters (by source, language, date)
- Consider caching popular searches
