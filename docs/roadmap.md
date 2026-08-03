# Roadmap — Axel News

Phased plan for a free pet project. Adjust order as needed; do not skip free-stack rules.

## Workflow Rule

**All phases must be implemented using axel-agent workflow.** See `AGENTS.md` for details.

- `/new-feature` → agent-router → skill-loader → feature-development → evidence-report
- Never manually create code files
- Every phase produces `evidence-report.md`

---

## Phase 0 — Docs & agent workspace ✅ (DONE)

### 0a: Core docs ✅ (DONE)

- [x] `AGENTS.md`
- [x] `docs/architecture.md`
- [x] `docs/usage.md`
- [x] `docs/roadmap.md`
- [x] `docs/project-guide.md`

### 0b: Context briefs ✅ (DONE)

- [x] `docs/free-stack.md` (paid → free mapping)
- [x] `docs/context/product.md`
- [x] `docs/context/stack.md`
- [x] `docs/context/scraping.md`
- [x] `docs/context/ai-pipeline.md`
- [x] `docs/context/ui-conventions.md`

### 0c: Axel agent config ✅ (DONE)

- [x] `.ai/` folder installed via `npx` (axel-agent default config)
- [x] Project-specific docs in `docs/` to match agent requirements

---

## Phase 1 — App shell ✅ (DONE)

**Evidence report**: `evidence-report-phase1.md`

- [x] `create-next-app` (TypeScript, App Router)
- [x] Tailwind CSS setup + base theme tokens
- [x] Framer Motion dependency
- [x] Layout shell: header, feed placeholder, footer
- [x] Env example file (no real secrets)

---

## Phase 2 — Data & auth ✅ (DONE)

**Evidence report**: `evidence-report-phase2.md`

- [x] Supabase client setup (`src/lib/supabase.ts`)
- [x] Articles table schema (`supabase/migrations/001_articles.sql`)
- [x] Server-side data access functions (`src/lib/articles.ts`)
- [x] Clerk auth setup (`src/lib/clerk-provider.tsx`)
- [x] Protected saved items route (`src/app/saved/page.tsx`)
- [x] Env example updated (`.env.example`)

---

## Phase 3 — Scraper

- [ ] Playwright-based ingest script/worker
- [ ] 1–3 seed Myanmar IT / tech sources (public pages)
- [ ] Normalize + upsert by canonical URL
- [ ] Document why worker > serverless Chromium

## Phase 4 — AI enrichment

- [ ] Groq client (default)
- [ ] Structured JSON: summary, sentiment, bias_notes
- [ ] Gemini free fallback
- [ ] Ollama local path for offline/dev
- [ ] Idempotent re-enrich job

## Phase 5 — Product UI

- [ ] Feed list + article detail (reusable cards)
- [ ] Loading skeletons + empty states
- [ ] Framer Motion list/detail transitions
- [ ] Myanmar / English content display basics

## Phase 6 — Analytics & polish

- [ ] PostHog free: page views, article open, enrich success/fail
- [ ] Basic error boundaries and rate-limit messaging
- [ ] README "how to run fully free locally"

## Later (optional)

- Vector search on free Supabase if quota allows
- Source management UI (admin)
- RSS where sites provide it (lighter than full browser scrape)
- PWA / offline reading

## Explicit non-goals (unless you change policy)

- Oxylabs or paid residential proxies as default
- OpenAI / Anthropic as default LLM
- Large multi-tenant SaaS hardening
