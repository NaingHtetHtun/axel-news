---
name: axel-ui
description: Primary UI skill for Axel News — clean reusable Next.js components with Tailwind CSS and Framer Motion. Use when building layouts, news cards, badges, feeds, detail pages, skeletons, empty states, motion, cn() helpers, design tokens, or any frontend UI work.
---

# Axel UI

**Primary UI skill** for Axel News. Build calm, reusable interfaces with **Tailwind CSS** + **Framer Motion**.

## When to apply

- Any `components/**` or `app/**` UI work
- News cards, feeds, sentiment badges, detail views
- Motion, skeletons, modals, empty states
- Token / theme setup

## Stack rules

| Rule | Detail |
| --- | --- |
| Styling | Tailwind utilities + semantic tokens |
| Motion | Framer Motion; honor `prefers-reduced-motion` |
| Classes | Always prefer `cn()` (`clsx` + `tailwind-merge`) |
| RSC | Server Components default; `"use client"` only for motion/state |
| Language | English UI strings and prop names |
| Kits | No heavy paid UI kit as default |

## Composition model

```text
components/ui/*      → primitives (Button, Card, Badge, Skeleton, EmptyState)
components/news/*    → domain (NewsCard, SentimentBadge, ArticleDetail, Feed)
components/layout/*  → shell chrome
```

Domain components **compose** primitives; avoid duplicating button/badge styles ad hoc.

## Implementation checklist

1. Read `docs/context/ui-conventions.md`.
2. Open references below for patterns, motion, tokens.
3. Define or reuse semantic colors (neutral + accent placeholders).
4. Build primitive → news component → page.
5. Loading, empty, and error states are part of done.
6. Sentiment never color-only (include text label).
7. Clamp summaries on cards; full text on detail.
8. Respect reduced motion (instant or fade-only fallbacks).

## References (read when implementing)

| File | Contents |
| --- | --- |
| [references/component-patterns.md](references/component-patterns.md) | Folders, props, Card/Badge/Button/Skeleton/EmptyState |
| [references/animation-recipes.md](references/animation-recipes.md) | Fade-up, stagger, shared layout, skeleton, modal, reduced motion |
| [references/tailwind-tokens.md](references/tailwind-tokens.md) | Semantic color/spacing tokens for news UI |

## Data fields to design for

From AI pipeline / articles:

- `title`, `source_name`, `summary`, `sentiment`, `bias_notes`
- `image_url`, `published_at`, `enrichment_status`

Show honest pending/failed enrichment states.

## Anti-patterns

- Inline hex soup without tokens
- Motion that ignores reduced-motion
- Giant one-file pages with no `ui/` reuse
- Calling LLMs from client components
- Fake summaries while loading

## Related

- Context: `docs/context/ui-conventions.md`
- Product: `docs/context/product.md`
- AI fields: `docs/context/ai-pipeline.md`
