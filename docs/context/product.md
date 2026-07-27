# Context — Product

## What is Axel News?

**Axel News** is a Myanmar-focused **IT / technology news** experience:

- Collects articles from public tech/IT sources relevant to Myanmar readers
- Stores and lists them in a simple web app
- Adds **AI enrichment**: short summary, sentiment, and bias notes
- Built as a **free pet project** (see `docs/free-stack.md`)

## Audience

- Myanmar developers, IT students, and tech-curious readers
- Bilingual reality: sources and UI may mix **Myanmar** and **English**

## Core features (target)

| Feature | Description |
|---------|-------------|
| News feed | Chronological or source-grouped list of articles |
| Article detail | Full cleaned text or excerpt + link to source |
| Summary | Short AI summary for fast scanning |
| Sentiment | Coarse label (e.g. positive / neutral / negative) |
| Bias notes | Brief, non-absolute notes — not “truth scores” |
| Auth (optional) | Clerk for saved articles / admin later |

## Non-features (for now)

- Real-time social network
- User-generated long-form publishing
- Guaranteed political neutrality claims
- Paid premium scraping or premium LLM quality SLAs

## Product principles

1. **Free-first** — run on free tiers and local tools
2. **Source-honest** — always link to originals
3. **Enrichment is assistive** — AI labels are hints, not verdicts
4. **UI is scannable** — cards, badges, motion that aids reading (not decoration spam)

## Related

- Architecture: `docs/architecture.md`
- UI skill: `axel-ui`
- AI skill: `axel-ai-news`
