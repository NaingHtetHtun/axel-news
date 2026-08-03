# Axel News — Project Rules

Axel News is a **Myanmar IT news** project. Agents must follow these rules on every task.

## Free-first (non-negotiable default)

This pet project targets **100% free** tooling. Do **not** default to paid services.

| Concern | Use (free) | Do not default to |
|---------|------------|-------------------|
| Framework / host | Next.js on Vercel free | Paid hosting |
| Database / vector | Supabase free tier | Paid-only DBs |
| Auth | Clerk free tier | Paid auth plans |
| Scraping | Playwright / Puppeteer + Chromium | Oxylabs or paid scrapers |
| LLM | Groq → Gemini free → Ollama | OpenAI / Anthropic paid APIs |
| Analytics | PostHog free tier | Paid analytics |

If the user **explicitly** asks for a paid tool, acknowledge cost and document the exception. Otherwise keep the free stack.

## Axel-Agent Workflow (mandatory for all code)

**Every roadmap phase MUST use the axel-agent workflow.** Do NOT manually create code files.

### Required workflow

1. Start with `/new-feature` command
2. Let `agent-router.md` determine the primary agent
3. Let `skill-loader.md` select required skills
4. Follow `feature-development` workflow
5. Return `evidence-report.md` with verification gates

### What the workflow enforces

- Skill load plan before editing
- Small verifiable slices
- Evidence-based completion
- Format, lint, test, security, performance checks

### Why this matters

The axel-agent ensures consistency, quality, and traceability across all code changes. Skipping the workflow produces undocumented, untested code.

## Where to read more

| Need | File |
|------|------|
| Skill + context map | `docs/usage.md` |
| Architecture | `docs/architecture.md` |
| Paid → free table | `docs/free-stack.md` |
| Product brief | `docs/context/product.md` |
| Stack limits | `docs/context/stack.md` |
| Scraping rules | `docs/context/scraping.md` |
| AI enrichment | `docs/context/ai-pipeline.md` |
| UI conventions | `docs/context/ui-conventions.md` |

## Skills (load when relevant)

- `axel-free-stack` — choosing tools, deps, APIs (see `docs/free-stack.md`)
- `axel-scraper` — news ingest / Playwright (see `docs/context/scraping.md`)
- `axel-ai-news` — summary, bias, sentiment (see `docs/context/ai-pipeline.md`)
- `axel-ui` — Tailwind + Framer Motion components (see `docs/context/ui-conventions.md`)

## Coding defaults

- **TypeScript** for application code
- **UI:** Tailwind CSS + Framer Motion; follow the `axel-ui` skill
- **Comments / code:** English
- **Product copy:** may be Myanmar and/or English
- Prefer small reusable components over one-off page markup
- No secrets in git; use env vars for free API keys

## Out of scope unless asked

- Paid scraping APIs as the primary path
- Paid LLM APIs as the primary path
- Heavy design systems unrelated to news UI
