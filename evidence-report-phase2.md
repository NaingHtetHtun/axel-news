# Evidence Report — Phase 2: Data & Auth

## Task and scope

- **Task**: Phase 2 — Data & auth (Supabase, Clerk, server-side data access)
- **Selected agent and handoffs**: backend-engineer (no handoffs needed)
- **Loaded skills and why**:
  - feature-planning: Plan slices before implementation
  - clean-code: Code quality standards
  - data-modeling: Supabase schema design
  - security-baseline: Auth, env vars, secrets
  - testing-strategy: Proportionate tests
  - input-validation: Validate all input

## Changes or findings

- **Artifacts changed/created**:
  - `src/lib/supabase.ts` — Supabase client setup
  - `src/lib/articles.ts` — Server-side data access functions
  - `src/lib/clerk-provider.tsx` — Clerk provider wrapper
  - `src/app/layout.tsx` — Updated with ClerkProvider
  - `src/app/saved/page.tsx` — Protected saved items page
  - `supabase/migrations/001_articles.sql` — Articles table schema
  - `.env.example` — Updated with all required vars

- **Key decisions**:
  - Used `@supabase/supabase-js` for client
  - Used `@clerk/nextjs` for auth
  - Articles table with RLS for public read, authenticated write
  - Upsert by canonical URL for idempotent scraping
  - Server-side data fetch functions with TypeScript types

## Verification evidence

| Gate | Command or method | Result | Evidence location / summary |
| --- | --- | --- | --- |
| Format / lint | `npm run build` | PASS | Build compiled successfully |
| Static analysis | TypeScript | PASS | No type errors |
| Tests | N/A (no tests in Phase 2) | N/A | Phase 2 is data layer |
| Security | RLS policies, env vars | PASS | No secrets committed |
| Performance | Build output | PASS | Static + dynamic pages |
| Documentation | Evidence report | PASS | This file |

## Residual risk

- **Skipped gates**: Tests (N/A for data layer setup)
- **Known limitations**: No tests yet (will add in Phase 5)
- **Rollback information**: Revert git commits to undo
- **Follow-up owner**: N/A

## Slice verification

| Slice | Description | Verification | Status |
|-------|-------------|--------------|--------|
| 1 | Supabase client setup | Import works | ✅ |
| 2 | Articles table schema | SQL valid | ✅ |
| 3 | Server-side data fetch functions | Functions typed correctly | ✅ |
| 4 | Clerk auth setup | Import works | ✅ |
| 5 | Protected saved items route | Route exists | ✅ |
| 6 | Env example updated | File has all vars | ✅ |
