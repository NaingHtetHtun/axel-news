---
name: axel-free-stack
description: Enforce Axel News free-only defaults (Next.js, Supabase free, Clerk free, Playwright, Groq→Gemini→Ollama, PostHog free, Tailwind+Framer). Use when choosing dependencies, APIs, hosts, LLM providers, proxies, analytics, or when the user asks about OpenAI, Oxylabs, paid SaaS, or stack substitutions.
---

# Axel Free Stack

Keep Axel News on the **free-first** stack. Refuse paid defaults unless the user **explicitly** opts in.

## When to apply

- Adding or changing npm/cloud dependencies
- Choosing LLM, scraper, auth, DB, analytics, or hosting
- User mentions OpenAI, Anthropic, Oxylabs, Bright Data, ScrapingBee, Mixpanel paid, etc.
- Reviewing PRs/plans for hidden paid assumptions

## Free defaults (enforce)

| Concern | Free default |
| --- | --- |
| App | Next.js + TypeScript |
| DB | Supabase free |
| Auth | Clerk free |
| Scrape | Playwright / Puppeteer (own worker) |
| LLM | Groq → Gemini free → Ollama |
| Analytics | PostHog free |
| UI | Tailwind CSS + Framer Motion |
| Host | Free hobby host; scraper off serverless Chromium |

## Substitution table

| Suggested paid / tutorial default | Respond with |
| --- | --- |
| OpenAI SDK as required | Groq first, then Gemini free, then Ollama |
| Oxylabs / residential proxy | Playwright on public pages; worker placement |
| Auth0 paid / heavy custom OAuth | Clerk free |
| Firebase Blaze | Supabase free |
| Mixpanel / Amplitude paid | PostHog free |
| Paid UI kit subscription | Tailwind + Framer + `axel-ui` patterns |

## Rules

1. **Do not** add paid SDKs or API keys as the only path.
2. **Do not** silently switch the project to OpenAI “for quality.”
3. **Do** mention free-tier limits (RPM, MAU, egress) and design backoff/queues.
4. **Do** allow paid tools **only** after clear user language (“use paid OpenAI”, “OK to use Oxylabs”).
5. **Do** point to `docs/free-stack.md` and `docs/context/stack.md` for env names and rationale.
6. Serverless Chromium scrape is not a free-tier footgun you should recommend as default.

## Refusal pattern

When a plan defaults to paid:

```text
Axel News is free-first. Default is <free alternative>.
I will not add <paid service> unless you explicitly opt in.
See docs/free-stack.md and skill axel-free-stack.
```

## Related context

- `docs/context/stack.md`
- `docs/free-stack.md`
- `AGENTS.md`
