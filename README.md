# Axel News

**Myanmar IT news** aggregator — free-first pet project.

Axel News collects IT/tech news relevant to Myanmar readers, stores articles, and enriches them with **summary**, **sentiment**, and **bias** notes using free tooling only.

> Status: **docs + agent skills** scaffolded. Application code not started yet.

## Free stack (summary)

| Layer | Choice |
|-------|--------|
| App | Next.js (Vercel free) |
| DB | Supabase free |
| Auth | Clerk free |
| Scraper | Playwright / Puppeteer |
| AI | Groq / Gemini free / Ollama |
| Analytics | PostHog free |

Full paid → free mapping: [docs/free-stack.md](docs/free-stack.md)

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/architecture.md](docs/architecture.md) | System overview & data flow |
| [docs/free-stack.md](docs/free-stack.md) | Free replacements (EN + MM notes) |
| [docs/usage.md](docs/usage.md) | How agents use skills & context files |
| [docs/roadmap.md](docs/roadmap.md) | Build phases |
| [docs/context/](docs/context/) | Domain briefs for agents |

## Agent workspace

- Project rules: [`AGENTS.md`](AGENTS.md)
- Grok skills: [`.grok/skills/`](.grok/skills/)
  - `axel-free-stack`, `axel-scraper`, `axel-ai-news`, `axel-ui`

See [docs/usage.md](docs/usage.md) for when to load each skill/context file.

## License

TBD — pet project.
