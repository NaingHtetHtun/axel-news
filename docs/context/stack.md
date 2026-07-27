# Context — Stack

Locked **free** stack for Axel News. Agents must not “upgrade” to paid defaults without user approval.

## Locked choices

| Layer | Choice | Notes |
|-------|--------|-------|
| Language | TypeScript | App code |
| Framework | Next.js (App Router) | Target |
| Styling | Tailwind CSS | + design tokens |
| Motion | Framer Motion | See `axel-ui` |
| Database | Supabase free | Postgres; vectors later if quota allows |
| Auth | Clerk free | Optional product surfaces |
| Scraper | Playwright (prefer) / Puppeteer | Chromium headless |
| LLM | Groq → Gemini free → Ollama | Structured enrichment |
| Analytics | PostHog free | Key events only |
| Host | Vercel free | Scrapers preferably off-host |

## Free-tier reminders

| Service | Watch |
|---------|--------|
| Supabase | ~500MB DB — store cleaned text, prune raw HTML |
| Clerk | ~10k MAU — fine for pet/demo |
| Groq / Gemini | Rate limits — queue + fallback |
| Vercel | Function size/time — avoid fat Chromium deploys |
| PostHog | Event budget — don’t track every mousemove |

## Environment variables (planned names)

Document only; do not commit values.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# LLM (use what you enable)
GROQ_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
# Ollama: usually http://127.0.0.1:11434 — no key

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

## Dependency policy

- Prefer packages that work with free providers (e.g. Vercel AI SDK with Groq/Google).
- Do not add official OpenAI/Anthropic SDKs unless user explicitly requests paid APIs.
- Do not add Oxylabs SDK.

## Related

- `docs/free-stack.md`
- Skill: `axel-free-stack`
