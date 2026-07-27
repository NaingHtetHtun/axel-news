# Roadmap — Axel News

Phased plan for a free pet project. Adjust order as needed; do not skip free-stack rules.

## Phase 0 — Docs & agent workspace ✅ (current)

- [x] `AGENTS.md`, `README.md`
- [x] Architecture, free-stack, usage, roadmap
- [x] Context briefs under `docs/context/`
- [x] Grok skills: free-stack, scraper, ai-news, ui (+ references)

## Phase 1 — App shell

- [ ] `create-next-app` (TypeScript, App Router)
- [ ] Tailwind CSS setup + base theme tokens
- [ ] Framer Motion dependency
- [ ] Layout shell: header, feed placeholder, footer
- [ ] Env example file (no real secrets)

## Phase 2 — Data & auth

- [ ] Supabase project (free) + articles table
- [ ] Clerk free app + protected optional routes (e.g. saved items)
- [ ] Server-side data access patterns

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
- [ ] README “how to run fully free locally”

## Later (optional)

- Vector search on free Supabase if quota allows
- Source management UI (admin)
- RSS where sites provide it (lighter than full browser scrape)
- PWA / offline reading

## Explicit non-goals (unless you change policy)

- Oxylabs or paid residential proxies as default
- OpenAI / Anthropic as default LLM
- Large multi-tenant SaaS hardening
