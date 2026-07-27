# Usage Guide — Agent Skills & Context

How humans and coding agents (Grok) should use Axel News docs and skills.

## Mental model

```text
Always on          →  AGENTS.md
Task map           →  docs/usage.md  (this file)
Deep domain        →  docs/context/*.md  (read when relevant)
Repeatable craft   →  .grok/skills/*/SKILL.md  (auto or /slash)
Long recipes       →  skill references/ folders
```

| Layer | Loads how | Purpose |
|-------|-----------|---------|
| `AGENTS.md` | Auto every session | Hard rules (free-first, stack, pointers) |
| `docs/context/*` | Agent reads on demand | Domain briefs |
| `.grok/skills/*` | Auto on trigger or `/skill-name` | Step-by-step craft |

---

## Context files — when to open

| File | Open when the task involves… |
|------|------------------------------|
| [context/product.md](context/product.md) | Product goals, audience, feature scope |
| [context/stack.md](context/stack.md) | Dependencies, free-tier limits, env vars |
| [context/scraping.md](context/scraping.md) | News sources, Playwright, ingest |
| [context/ai-pipeline.md](context/ai-pipeline.md) | Summary, sentiment, bias, LLM providers |
| [context/ui-conventions.md](context/ui-conventions.md) | Components, Tailwind, motion principles |

**Rule:** If you are about to write code in a domain, **read the matching context file first**, then the matching skill.

---

## Skills — map

Skills live under [`.grok/skills/`](../.grok/skills/).

| Skill | Slash | Triggers (examples) | Use for |
|-------|-------|---------------------|---------|
| `axel-free-stack` | `/axel-free-stack` | free, paid, Oxylabs, OpenAI, which API, stack | Tool choice, refuse paid defaults |
| `axel-scraper` | `/axel-scraper` | scrape, crawl, Playwright, Puppeteer, news source | Ingest pipelines |
| `axel-ai-news` | `/axel-ai-news` | summary, bias, sentiment, enrich, LLM, Groq | AI enrichment |
| `axel-ui` | `/axel-ui` | UI, Tailwind, Framer Motion, animation, component | Clean reusable UI |

### Skill + context pairs

| Working on… | Load skill | Read context |
|-------------|------------|--------------|
| Architecture / deps | `axel-free-stack` | `stack.md`, `free-stack.md` |
| Scraping a site | `axel-scraper` | `scraping.md` |
| Article enrichment | `axel-ai-news` | `ai-pipeline.md` |
| News card / feed / motion | `axel-ui` | `ui-conventions.md` + skill `references/` |

---

## Workflow examples

### 1. “Build an animated news card”

1. Read `docs/context/ui-conventions.md`
2. Invoke / follow `axel-ui` (and `references/component-patterns.md`, `animation-recipes.md`)
3. Use Tailwind tokens + Framer Motion; prefer reusable `components/ui` + `components/news`

### 2. “Scrape a Myanmar IT news site”

1. Confirm free path via `axel-free-stack` (no Oxylabs)
2. Read `docs/context/scraping.md`
3. Follow `axel-scraper` (Playwright-first, ethical public pages only)

### 3. “Add bias and sentiment to articles”

1. Read `docs/context/ai-pipeline.md`
2. Follow `axel-ai-news` (Groq → Gemini → Ollama)
3. Store structured fields on the article row (see architecture)

### 4. “Should we use OpenAI?”

1. Follow `axel-free-stack`
2. Answer: default **no**; use free chain unless user explicitly wants paid and accepts cost

---

## Do / don’t for agents

### Do

- Read `AGENTS.md` rules as hard constraints
- Open the matching context file before non-trivial domain code
- Prefer skills’ reference recipes over inventing new UI patterns
- Keep secrets in env examples only (never commit real keys)
- Say when free-tier limits may block a design (e.g. Chromium on serverless)

### Don’t

- Default to Oxylabs, ScrapingBee paid, OpenAI, or Anthropic APIs
- Skip `axel-ui` and dump one-off Tailwind soup on pages
- Add Framer Motion to every DOM node (animate meaningful transitions)
- Scrape login-walled or clearly disallowed content
- Treat `docs/` as executable code — they are planning + agent context

---

## For you (human operator)

| Goal | Action |
|------|--------|
| Remind the agent of free stack | Point to `docs/free-stack.md` or `/axel-free-stack` |
| Consistent UI | Ask for components “per axel-ui skill” |
| New domain knowledge | Add a short file under `docs/context/` and link it here |
| New repeatable procedure | Add `.grok/skills/<name>/SKILL.md` |

Skills auto-reload when files change on disk. After adding a skill, it should appear in the slash menu within a few seconds.

---

## Related top-level docs

- [architecture.md](architecture.md)
- [free-stack.md](free-stack.md)
- [roadmap.md](roadmap.md)
- [../AGENTS.md](../AGENTS.md)
