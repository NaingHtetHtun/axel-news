# Usage Guide — Agent Skills & Context

How humans and coding agents should use Axel News docs, agents, skills, and workflows.

## Mental model

```text
Always on          →  AGENTS.md
Task map           →  docs/usage.md  (this file)
Domain memory      →  .ai/memory/*.md
Engineering rules  →  .ai/rules/core-standards.md
Agents             →  .ai/agents/*.md  (role definitions)
Skills             →  .ai/skills/**/*.md  (craft knowledge)
Workflows          →  .ai/workflows/*.md  (orchestration sequences)
Commands           →  .ai/commands/*.md  (slash-command entry points)
Checks             →  .ai/checks/*.md  (validation gates)
Hooks              →  .ai/hooks/*.md  (lifecycle contracts)
Prompts            →  .ai/prompts/*.md  (invocation templates)
Templates          →  .ai/templates/*.md  (structural scaffolds)
```

| Layer | Loads how | Purpose |
|-------|-----------|---------|
| `AGENTS.md` | Auto every session | Hard rules (free-first, stack, pointers) |
| `.ai/agents/*` | Routed by task signal | Role definition, authority, skill access |
| `.ai/skills/**` | Auto via skill loader or manually | Step-by-step craft knowledge |
| `.ai/workflows/*` | Loaded by commands or agents | Orchestration sequences across skills |
| `.ai/commands/*` | Slash command or manual trigger | Task entry points |
| `.ai/checks/*` | Loaded by hooks or commands | Validation gates |
| `.ai/hooks/*` | Mapped to lifecycle events | Pre/post edit and test contracts |
| `.ai/rules/*` | Auto every session | Cross-cutting engineering constraints |
| `.ai/memory/*` | Read on demand | Project-specific facts and decisions |
| `.ai/prompts/*` | Manual invocation | Bracketed invocation templates |

---

## Agents

Agents define role, authority, and default skill loading. They are not autonomous — they are invoked by workflows and commands.

| Agent | Mission | Use when the task involves… |
|-------|---------|------------------------------|
| `architect` | Protect coherent system boundaries and durable technical decisions | System design, tradeoff evaluation, architecture review |
| `backend-engineer` | Deliver secure, maintainable server-side behavior | APIs, domain workflows, persistence, server logic |
| `database-engineer` | Protect data integrity, lifecycle, and query performance | Schema design, migrations, queries, data modeling |
| `devops` | Enable safe, observable delivery and recovery | Deployment, config, rollback, release plans |
| `frontend-engineer` | Deliver accessible, resilient user-facing interfaces | UI components, pages, client-side interactions |
| `reviewer` | Evidence-based review focused on user impact and risk | PR reviews, code review, change evaluation |
| `security-engineer` | Identify and reduce security and privacy risk | Auth, input validation, threat modeling, secrets |
| `tester` | Create trustworthy verification proportionate to risk | Test strategy, test creation, coverage assessment |

See `.ai/agents/*.md` for full responsibilities, allowed skills, forbidden actions, and decision rules per agent.

---

## Skills — master table

Skills live under `.ai/skills/`. Each skill is a standalone `.md` file with YAML front matter and 9 canonical sections (Purpose, When to use, Inputs, Outputs, Rules, Checklist, Examples, Anti Patterns, Best Practices, Related Skills).

### Architecture

| Skill | Purpose |
|-------|---------|
| `api-design` | Define stable, discoverable interfaces that express consumer needs and evolve safely |
| `clean-architecture` | Organize software so core policies remain independent of delivery mechanisms |
| `dependency-injection` | Make dependencies visible, replaceable, and composed at application boundaries |

### Backend

| Skill | Purpose |
|-------|---------|
| `service-boundaries` | Define cohesive backend services and the contracts between them |

### Database

| Skill | Purpose |
|-------|---------|
| `data-modeling` | Model data around business invariants, ownership, integrity, and access patterns |

### Debugging

| Skill | Purpose |
|-------|---------|
| `debugging-method` | Find the true cause of a defect with reproducible evidence before changing code |

### Deployment

| Skill | Purpose |
|-------|---------|
| `release-safety` | Release changes predictably with verification, monitoring, and a tested recovery path |

### Documentation

| Skill | Purpose |
|-------|---------|
| `documentation-standard` | Document durable decisions, contracts, and operational knowledge close to their users |

### Git

| Skill | Purpose |
|-------|---------|
| `git-conventions` | Keep history reviewable, traceable, and safe for collaboration |

### Performance

| Skill | Purpose |
|-------|---------|
| `performance-baseline` | Meet user-facing latency, throughput, and resource goals through measurement-led design |

### Planning

| Skill | Purpose |
|-------|---------|
| `feature-planning` | Turn an outcome into a small, testable, risk-aware delivery plan |

### Quality

| Skill | Purpose |
|-------|---------|
| `clean-code` | Keep code understandable, local in its effects, and inexpensive to change |
| `dry` | Ensure each business fact and policy has a single authoritative representation |
| `kiss-yagni` | Deliver the smallest design that safely satisfies the current, evidenced need |
| `solid` | Use SOLID principles to keep changing concerns isolated and contracts dependable |

### Review

| Skill | Purpose |
|-------|---------|
| `code-review` | Evaluate changes for correctness, safety, maintainability, and fit with the intended outcome |

### Security

| Skill | Purpose |
|-------|---------|
| `input-validation` | Accept only well-formed, authorized input at every untrusted boundary |
| `security-baseline` | Build secure defaults through threat-aware design, least privilege, and safe data handling |

### Shared

| Skill | Purpose |
|-------|---------|
| `error-handling` | Make failures explicit, actionable, safe, and consistent across boundaries |
| `logging` | Provide useful, structured operational evidence without leaking sensitive information |
| `naming` | Create names that communicate intent, scope, and units without requiring comments |
| `observability` | Make system behavior measurable through logs, metrics, traces, and actionable alerts |

### Testing

| Skill | Purpose |
|-------|---------|
| `testing-strategy` | Provide fast, trustworthy evidence that behavior and critical contracts are correct |

---

## Workflows

Workflows are step-by-step orchestration sequences that load one or more skills in order.

| Workflow | Skills loaded | Use for |
|----------|---------------|---------|
| `api-creation` | api-design, input-validation, security-baseline, error-handling, testing-strategy | Creating new API endpoints |
| `bug-fix` | debugging-method, error-handling, testing-strategy, code-review | Investigating and fixing bugs |
| `database-migration` | data-modeling, release-safety, testing-strategy, performance-baseline | Database schema changes |
| `debug-workflow` | debugging-method, logging, observability | Systematic debugging |
| `feature-development` | feature-planning, clean-code, testing-strategy, security-baseline, code-review | End-to-end feature delivery |
| `pr-review-workflow` | code-review, security-baseline, testing-strategy, git-conventions | Pull request reviews |
| `refactor-workflow` | clean-code, solid, dry, testing-strategy, code-review | Safe refactoring |
| `release-workflow` | release-safety, observability, git-conventions, testing-strategy | Production releases |
| `testing-workflow` | testing-strategy + domain skill | Test creation |

---

## Commands

Commands are task entry points. A host may map slash commands to these files.

| Command | Agent | Workflow | What it does |
|---------|-------|----------|--------------|
| `/deploy` | `devops` | `release-workflow` | Readiness gates, deploy with authority, rollback plan |
| `/fix-bug` | Routed by task | `bug-fix` | Reproduce, diagnose, fix, verify, evidence report |
| `/new-feature` | Routed by task | `feature-development` | Plan, implement in slices, verify, evidence report |
| `/optimize` | Owning engineer | Performance skills | Baseline, identify bottleneck, re-measure, evidence |
| `/review` | `reviewer` | `pr-review-workflow` | Evidence-backed PR review ordered by impact |

---

## Hooks

Hooks are declarative lifecycle contracts that hosts can map to native events.

| Hook | When it runs | What it does |
|------|-------------|--------------|
| `before-edit` | Before any code change | Identify outcome/scope, route to agent, read memory/rules, load skills |
| `after-edit` | After code change | Diff review, update docs/memory, run format/lint/test, record evidence |
| `after-test` | After test run | Record results, hand off failures to `/fix-bug`, assess coverage, update evidence |
| `before-commit` | Before git commit | Run `before-commit` + `evidence-first` checks, confirm no secrets |

---

## Checks

Checks are validation checklists selected from change risk.

| Check | Purpose |
|-------|---------|
| `before-commit` | Quality gate: format, lint, typecheck, tests, security, performance, docs |
| `change-readiness` | Verify acceptance criteria, tests, build, security, logging, docs |
| `evidence-first` | Every criterion maps to evidence; reviewer can reproduce; residual risk has owner |
| `release-readiness` | Build artifact, automated checks, dashboards/alerts, rollback, secrets |
| `security-review` | Assets/boundaries, auth/authz, input validation, secrets/dependencies, evidence |

---

## Rules

Cross-cutting engineering constraints in `.ai/rules/core-standards.md`:

| Standard | One-line rule |
|----------|---------------|
| Naming | Communicate intent, scope, and units without comments |
| Folder structure | Group by feature or layer, not by type |
| Logging | Structured, actionable, no secrets |
| Error handling | Explicit, safe, consistent across boundaries |
| Code style | Follow project formatter and linter without exception |
| SOLID | Keep changing concerns isolated |
| DRY | Single authoritative representation per fact |
| KISS / YAGNI | Smallest safe design for current need |
| DI | Dependencies visible and replaceable at boundaries |
| Security | Validate input, encode output, least privilege |
| Performance | Measure before optimizing, budget-aware |
| Documentation | Durable decisions close to users |
| Git | Reviewable, traceable, safe history |
| Testing | Proportionate evidence, fast feedback |

---

## Memory

Project-specific facts stored in `.ai/memory/*.md`:

| File | Stores |
|------|--------|
| `api.md` | API contracts, versioning, auth, idempotency, pagination |
| `architecture.md` | Architectural boundaries, dependency direction, ownership |
| `database.md` | Data stores, identifiers, migrations, indexes, constraints |
| `decisions.md` | Accepted decisions: context, alternatives, consequence, owner |
| `known-issues.md` | Active issues with impact, evidence, workaround, owner |
| `stack.md` | Runtime, frameworks, packages, delivery environment |

**Rule:** No credentials in memory files. No unverified suspicions in `known-issues.md`.

---

## Prompts

Invocation templates with bracketed placeholders in `.ai/prompts/`:

| Prompt | Use for |
|--------|---------|
| `create-feature` | Plan and deliver a feature |
| `fix-bug` | Investigate and fix a bug |
| `generate-documentation` | Document an interface, decision, or workflow |
| `generate-tests` | Create proportionate tests |
| `improve-performance` | Performance investigation with measurable budget |
| `refactor-code` | Safe refactoring with behavior preservation |
| `review-code` | Evidence-backed code review |

---

## Workflow examples

### 1. "Build an animated news card"

1. Agent: `frontend-engineer`
2. Workflow: `feature-development`
3. Skills: `feature-planning`, `clean-code`, `testing-strategy`, `security-baseline`, `code-review`
4. Follow the workflow steps; use Framer Motion for meaningful transitions only

### 2. "Scrape a Myanmar IT news site"

1. Agent: `backend-engineer`
2. Workflow: `api-creation`
3. Skills: `api-design`, `input-validation`, `security-baseline`, `error-handling`, `testing-strategy`
4. Confirm free path via AGENTS.md rules (no Oxylabs, no paid scrapers)

### 3. "Add bias and sentiment to articles"

1. Agent: `backend-engineer`
2. Workflow: `feature-development`
3. Skills: `feature-planning`, `clean-code`, `testing-strategy`
4. Store structured fields on the article row (see architecture.md)

### 4. "Review a PR"

1. Agent: `reviewer`
2. Workflow: `pr-review-workflow`
3. Skills: `code-review`, `security-baseline`, `testing-strategy`, `git-conventions`
4. Read intent before diff; report evidence-backed findings ordered by impact

### 5. "Fix a production bug"

1. Command: `/fix-bug`
2. Workflow: `bug-fix`
3. Skills: `debugging-method`, `error-handling`, `testing-strategy`, `code-review`
4. Reproduce first, prove root cause, then fix; return evidence report

---

## Do / don't for agents

### Do

- Read `AGENTS.md` rules as hard constraints
- Route tasks to the correct agent via `.ai/agents/` (use the narrowest accountable agent)
- Load the matching workflow before non-trivial work
- Read `.ai/memory/` before making domain decisions
- Follow `.ai/rules/core-standards.md` for all code changes
- Run hooks (`before-edit`, `after-edit`, `before-commit`) as lifecycle contracts
- Keep secrets in env examples only (never commit real keys)
- Say when free-tier limits may block a design (e.g. Chromium on serverless)

### Don't

- Default to Oxylabs, ScrapingBee paid, OpenAI, or Anthropic APIs
- Skip skills and dump one-off code without following workflows
- Add Framer Motion to every DOM node (animate meaningful transitions only)
- Scrape login-walled or clearly disallowed content
- Treat `docs/` or `.ai/` as executable code — they are planning + agent context
- Bypass checks (`before-commit`, `evidence-first`) before completing work
- Store credentials in `.ai/memory/` files

---

## For you (human operator)

| Goal | Action |
|------|--------|
| Remind the agent of free stack | Point to `AGENTS.md` or ask for free-stack evaluation |
| Consistent UI | Ask for components following the `frontend-engineer` agent + `clean-code` skill |
| New domain knowledge | Add a short file under `docs/context/` and link it here |
| New repeatable procedure | Add `.ai/skills/<category>/<name>.md` following the skill template |
| New agent role | Add `.ai/agents/<name>.md` following the agent template |
| New workflow | Add `.ai/workflows/<name>.md` following the workflow template |
| Track a decision | Add to `.ai/memory/decisions.md` with date, context, alternatives |
| Track a known issue | Add to `.ai/memory/known-issues.md` with impact, evidence, owner |

---

## Related top-level docs

- [architecture.md](architecture.md)
- [roadmap.md](roadmap.md)
- [../AGENTS.md](../AGENTS.md)
