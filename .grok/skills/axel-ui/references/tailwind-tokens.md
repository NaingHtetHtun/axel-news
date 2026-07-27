# Tailwind tokens

Suggested **semantic** color and spacing tokens for Axel News. Placeholders only—tune brand accent later without rewriting every component.

---

## Principles

1. Components reference **semantic** names (`bg-background`, `text-muted-foreground`), not raw palette steps.
2. Neutrals carry the UI; **one accent** for CTAs and focus.
3. Sentiment colors are **separate** from brand accent so badges stay readable in light/dark.
4. Spacing scale stays on Tailwind defaults unless a product rhythm needs extension.

---

## CSS variables (light / dark sketch)

Add to global CSS when scaffolding (e.g. `app/globals.css`):

```css
:root {
  /* Neutral surfaces */
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 4%;
  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 240 5% 34%;

  /* Brand accent (placeholder indigo-ish) */
  --primary: 234 89% 56%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 96%;
  --secondary-foreground: 240 6% 10%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;

  /* Sentiment (accessible-ish placeholders) */
  --sentiment-positive: 142 71% 30%;
  --sentiment-negative: 0 70% 40%;
  --sentiment-neutral: 240 4% 40%;
  --sentiment-mixed: 32 90% 38%;

  --radius: 0.75rem;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --card: 240 6% 8%;
  --card-foreground: 0 0% 98%;
  --muted: 240 4% 14%;
  --muted-foreground: 240 5% 64%;
  --border: 240 4% 16%;
  --input: 240 4% 16%;
  --ring: 234 89% 70%;

  --primary: 234 89% 66%;
  --primary-foreground: 240 10% 4%;
  --secondary: 240 4% 14%;
  --secondary-foreground: 0 0% 98%;
  --destructive: 0 62% 45%;
  --destructive-foreground: 0 0% 98%;

  --sentiment-positive: 142 60% 55%;
  --sentiment-negative: 0 70% 65%;
  --sentiment-neutral: 240 5% 70%;
  --sentiment-mixed: 32 90% 60%;
}
```

HSL channels without `hsl()` wrapper match common shadcn-style Tailwind configs.

---

## Tailwind theme extension (sketch)

```ts
// tailwind.config.ts — conceptual
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        sentiment: {
          positive: "hsl(var(--sentiment-positive))",
          negative: "hsl(var(--sentiment-negative))",
          neutral: "hsl(var(--sentiment-neutral))",
          mixed: "hsl(var(--sentiment-mixed))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Semantic usage map

| Token | Use for |
| --- | --- |
| `bg-background` / `text-foreground` | Page canvas, default text |
| `bg-card` / `text-card-foreground` | News cards, panels |
| `bg-muted` / `text-muted-foreground` | Skeletons, secondary lines, source names |
| `border-border` | Card and input borders |
| `bg-primary` / `text-primary-foreground` | Primary CTAs, key links |
| `ring-ring` | Focus rings |
| `text-sentiment-*` / `bg-sentiment-*/15` | Sentiment badges |
| `bg-destructive` | Dangerous actions only |

---

## Spacing rhythm

Stick to Tailwind scale for consistency:

| Context | Suggestion |
| --- | --- |
| Page padding | `px-4 sm:px-6 lg:px-8` |
| Section stack | `space-y-8` or `gap-8` |
| Card internal | `p-4` / header `gap-1.5` |
| Feed grid | `gap-4` |
| Compact meta row | `gap-2` |

Avoid magic values like `p-[13px]` unless aligning to a fixed design export.

---

## Typography (practical)

| Role | Classes (starting point) |
| --- | --- |
| Page title | `text-2xl font-semibold tracking-tight sm:text-3xl` |
| Card title | `text-base font-semibold leading-snug sm:text-lg` |
| Summary | `text-sm text-muted-foreground leading-relaxed` |
| Meta (source, date) | `text-xs text-muted-foreground` |
| Bias notes | `text-sm text-muted-foreground` |

Use a clean system or one free Google font later (e.g. Inter / Source Sans)—not required at docs phase.

---

## Sentiment mapping

| `sentiment` value | Text class | Soft background |
| --- | --- | --- |
| `positive` | `text-sentiment-positive` | `bg-sentiment-positive/15` |
| `negative` | `text-sentiment-negative` | `bg-sentiment-negative/15` |
| `neutral` | `text-sentiment-neutral` | `bg-sentiment-neutral/15` |
| `mixed` | `text-sentiment-mixed` | `bg-sentiment-mixed/15` |
| missing / pending | `text-muted-foreground` | `bg-muted` |

Always pair color with a text label.

---

## Dark mode

- Prefer class strategy (`.dark` on `html`) for user toggle later.
- Verify sentiment contrast on both themes before ship.
- Images: optional dim overlay `dark:opacity-90` on card media.

---

## What not to do

- Hard-code `#3B82F6` across fifty files
- Use pure red/green only without labels
- Invent a second parallel token system mid-feature
- Animate color flashes for sentiment changes (distracting; a11y risk)

---

## Related

- [component-patterns.md](component-patterns.md)
- [animation-recipes.md](animation-recipes.md)
- Context: `docs/context/ui-conventions.md`
