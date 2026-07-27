# Context — UI Conventions

## Stack

- **Tailwind CSS** for styling
- **Framer Motion** for meaningful animation
- **Next.js** App Router; client components only where motion/interactivity needs them

Full craft instructions: skill **`axel-ui`** and its `references/`.

## Goals

- Clean, **reusable** components (not one-off page markup)
- Scannable news UI: feed, card, badges, detail, skeletons
- Motion that helps hierarchy and feedback — not decoration spam
- Accessible focus states and **reduced motion** support

## Folder sketch (when app exists)

```text
components/
  ui/           # Button, Badge, Skeleton, EmptyState — generic
  news/         # NewsCard, FeedList, ArticleHeader — domain
  layout/       # SiteHeader, Shell
lib/
  cn.ts         # clsx + tailwind-merge helper
```

## Rules of thumb

1. Build `ui/*` primitives before special-casing pages
2. Compose pages from primitives; keep page files thin
3. Use semantic Tailwind tokens (theme colors) over raw hex in JSX
4. Animate list enter/exit, route-level fades, and press/hover on cards — sparingly
5. Respect `prefers-reduced-motion` / Framer `useReducedMotion`
6. Myanmar + English text: plan for longer Myanmar line lengths (flexible layouts)

## Do not

- Inline huge class strings copied per page without extraction
- Add a new animation library beyond Framer without discussion
- Ship UI that ignores keyboard focus

## Related

- Skill: `axel-ui`
- References: `.grok/skills/axel-ui/references/`
