# Project Guide — Axel News

Complete guide on all markdown files, when to use them, and how they work together.

---

## Quick Reference — File Map

```text
axel-news/
├── AGENTS.md                    ← READ FIRST (every session)
├── docs/
│   ├── usage.md                 ← How agents/skills/workflows work
│   ├── architecture.md          ← System design & components
│   ├── roadmap.md               ← Build phases & checklist
│   ├── project-guide.md         ← THIS FILE
│   ├── free-stack.md            ← Paid → free tool mapping
│   └── context/
│       ├── product.md           ← What we're building & why
│       ├── stack.md             ← Tier limits & constraints
│       ├── scraping.md          ← Scraping rules & ethics
│       ├── ai-pipeline.md       ← LLM enrichment flow
│       └── ui-conventions.md    ← UI patterns & rules
├── .ai/                         ← Installed via npx (axel-agent)
└── src/                         ← Application code
```

---

## Mandatory Workflow

**Every code change MUST use axel-agent workflow.** This is not optional.

### The workflow

```
/new-feature command
    ↓
agent-router.md → determines primary agent
    ↓
skill-loader.md → selects required skills
    ↓
feature-development workflow → implements in slices
    ↓
evidence-report.md → verification gates
```

### Why this matters

- **Consistency** — All code follows same patterns
- **Quality** — Skills enforce best practices
- **Traceability** — Evidence report documents what was done
- **Safety** — Checks catch issues before completion

### What the workflow enforces

1. **Skill load plan** — Which skills to load and why
2. **Small verifiable slices** — One slice at a time
3. **Evidence-based completion** — Proof that it works
4. **Verification gates** — Format, lint, test, security, performance

---

## Layer 1: Always-Load Files

These load **automatically** at session start.

| File | When | What it does |
|------|------|--------------|
| `AGENTS.md` | Every session | Hard rules: free-first, stack choices, coding defaults, workflow requirement |

**Rule:** Never skip AGENTS.md. It's the single source of truth for constraints.

---

## Layer 2: Project Docs (docs/)

Reference files for understanding the project. Read when needed.

### Core docs

| File | When to read | What you'll find |
|------|--------------|------------------|
| `docs/usage.md` | First time working on project | How axel-agent skills/workflows work |
| `docs/architecture.md` | Design decisions, component questions | System diagram, components, article lifecycle |
| `docs/roadmap.md` | Planning next task | Build phases, what's done, what's next |
| `docs/project-guide.md` | Understanding all docs | This file — complete guide |

### Context briefs (docs/context/)

| File | When to read | What you'll find |
|------|--------------|------------------|
| `docs/context/product.md` | Understanding scope | What we're building, target users, features |
| `docs/context/stack.md` | Tech constraints | Tier limits (Supabase 500MB, Clerk 10k MAU, etc.) |
| `docs/context/scraping.md` | Scraping tasks | Allowed sources, robots.txt rules, ethics |
| `docs/context/ai-pipeline.md` | AI/LLM tasks | Enrichment flow, model order, structured output |
| `docs/context/ui-conventions.md` | UI work | Tailwind tokens, Framer Motion rules, components |
| `docs/free-stack.md` | Choosing tools/APIs | Paid → free alternatives table |

---

## Layer 3: .ai/ Framework (Installed)

The `.ai/` folder is installed via `npx` and managed separately. It contains:

- **Agents** — Role definitions (architect, backend-engineer, etc.)
- **Skills** — Step-by-step know-how for specific tasks
- **Workflows** — Orchestration sequences across skills
- **Commands** — Slash-command entry points
- **Rules** — Engineering constraints
- **Checks** — Validation checklists
- **Hooks** — Lifecycle contracts
- **Memory** — Project-specific facts
- **Prompts** — Invocation templates

**Do not modify `.ai/` directly** — it's managed by the axel-agent installer.

---

## How to Use These Docs

### Before starting work

1. Read `AGENTS.md` (auto-loaded)
2. Check `docs/roadmap.md` for next task
3. Read relevant `docs/context/` brief

### When making decisions

1. Check `docs/context/stack.md` for constraints
2. Check `docs/free-stack.md` for tool choices
3. Document decisions in code comments

### When stuck

1. Read `docs/architecture.md` for system design
2. Read `docs/context/` for domain knowledge
3. Check `docs/usage.md` for agent workflows

---

## Do / Don't

### Do

- Read `AGENTS.md` every session
- Check `docs/roadmap.md` for next task
- Read context briefs before domain work
- Follow axel-agent workflows from `.ai/`
- Use `/new-feature` for every code change
- Return evidence-report.md for every phase

### Don't

- Modify `.ai/` folder directly
- Skip AGENTS.md
- Ignore free-stack rules
- Store secrets in docs
- Manually create code files
- Skip the axel-agent workflow

---

## Related docs

- [AGENTS.md](../AGENTS.md) — Hard rules + workflow requirement
- [usage.md](usage.md) — Agent workflow reference
- [architecture.md](architecture.md) — System design
- [roadmap.md](roadmap.md) — Build phases
