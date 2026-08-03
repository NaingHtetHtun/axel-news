# UI Conventions — Axel News

Tailwind CSS + Framer Motion patterns for the news UI.

## Design Tokens

### Colors

Use Tailwind's default palette. Primary accent: `blue-600` for links and actions.

### Typography

- Headings: `font-bold` with appropriate `text-*` sizes
- Body: `text-gray-800` for readability
- Meta: `text-gray-500` for dates, sources

### Spacing

Follow Tailwind's spacing scale. Consistent padding: `p-4` to `p-6`.

## Components

### News Card

Reusable card for feed list:

```tsx
<ArticleCard
  title={article.title}
  source={article.source}
  summary={article.summary}
  sentiment={article.sentiment}
  publishedAt={article.published_at}
  onClick={() => router.push(`/article/${article.id}`)}
/>
```

### Skeleton Loader

Use for loading states:

```tsx
<Skeleton className="h-4 w-3/4 mb-2" />
<Skeleton className="h-4 w-1/2" />
```

### Badge

For sentiment, language, source:

```tsx
<SentimentBadge sentiment={article.sentiment} />
<LanguageBadge language={article.language} />
```

## Framer Motion Rules

### Animate Only Meaningful Transitions

**Do animate:**
- Page transitions
- List item enter/exit
- Card hover effects
- Modal open/close

**Don't animate:**
- Every DOM node
- Static content
- Text changes (unless significant)

### Pattern

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.2 }}
>
  {content}
</motion.div>
```

## Layout

### App Shell

```text
┌─────────────────────────────┐
│ Header (logo, nav)          │
├─────────────────────────────┤
│                             │
│ Feed / Article Detail       │
│                             │
├─────────────────────────────┤
│ Footer (links, credits)     │
└─────────────────────────────┘
```

### Feed Layout

- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
- Cards with consistent height
- Skeleton loaders while fetching

## Myanmar / English

- Support both languages in UI
- Detect and display appropriate font
- Use `lang` attribute for accessibility
- Consider Myanmar text rendering (line height, spacing)

## Responsive Breakpoints

Follow Tailwind defaults:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
