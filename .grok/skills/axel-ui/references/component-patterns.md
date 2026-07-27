# Component patterns

Reusable UI patterns for Axel News (Next.js + Tailwind + Framer Motion).

---

## Folder structure

```text
components/
  ui/
    button.tsx
    badge.tsx
    card.tsx
    skeleton.tsx
    empty-state.tsx
  news/
    news-card.tsx
    sentiment-badge.tsx
    article-detail.tsx
    news-feed.tsx
  layout/
    site-header.tsx
    site-shell.tsx
lib/
  cn.ts
```

Naming: kebab-file names OK; export PascalCase components.

---

## Props conventions

| Convention | Example |
| --- | --- |
| Extend native props where useful | `ButtonProps extends ButtonHTMLAttributes` |
| `className` always optional + merged with `cn()` | `cn(base, className)` |
| Variants via union or `cva` | `variant: "default" \| "outline" \| "ghost"` |
| Sizes | `sm` \| `md` \| `lg` |
| Domain data as explicit props | `article: { title, summary, ... }` not opaque `any` |
| Boolean UI flags | `isLoading`, `isEmpty` — not `loading={1}` |
| Children for composition | `Card` / `CardHeader` / `CardContent` style optional |

Keep presentational components free of data fetching.

---

## `cn()` helper

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Card

**Purpose:** Surface for news items and panels.

**Structure (conceptual):**

```tsx
// components/ui/card.tsx — pattern
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-4 pb-0", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 p-4 pt-0", className)} {...props} />;
}
```

**News usage:** `NewsCard` wraps `Card` with image, title link, summary clamp, `SentimentBadge`, source line.

---

## Badge

**Purpose:** Compact status (sentiment, source tag, “pending”).

```tsx
// pattern
type BadgeVariant = "default" | "secondary" | "outline" | "positive" | "negative" | "mixed" | "neutral";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-muted text-muted-foreground",
        variant === "outline" && "border border-border text-foreground",
        variant === "positive" && "bg-sentiment-positive/15 text-sentiment-positive",
        variant === "negative" && "bg-sentiment-negative/15 text-sentiment-negative",
        variant === "mixed" && "bg-sentiment-mixed/15 text-sentiment-mixed",
        variant === "neutral" && "bg-sentiment-neutral/15 text-sentiment-neutral",
        className
      )}
      {...props}
    />
  );
}
```

**SentimentBadge:** map `positive|neutral|negative|mixed` → variant + visible label (`Positive`, etc.).

---

## Button

```tsx
type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-6 text-base",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "outline" && "border border-border bg-transparent hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        className
      )}
      {...props}
    />
  );
}
```

Prefer `Link` styled as button for navigation (shared class strings).

---

## Skeleton

**Purpose:** Loading placeholders matching card layout.

```tsx
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// NewsCardSkeleton — compose rectangles for image, title, lines
export function NewsCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-4 space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
```

If using Framer shimmer, still provide CSS `animate-pulse` fallback under reduced motion (see animation-recipes).

---

## EmptyState

```tsx
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-16 text-center",
        className
      )}
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
```

Examples:

- Feed empty: “No articles yet” / “Run the scraper or seed fixtures.”
- Filter empty: “No stories match this sentiment.”

---

## NewsCard (domain)

**Props sketch:**

```ts
type NewsCardProps = {
  id: string;
  title: string;
  sourceName: string;
  summary?: string | null;
  sentiment?: "positive" | "neutral" | "negative" | "mixed" | null;
  imageUrl?: string | null;
  publishedAt?: string | null;
  enrichmentStatus?: "pending" | "done" | "failed" | "skipped";
  href: string;
  className?: string;
};
```

**Behavior:**

- Clamp summary to ~3 lines (`line-clamp-3`)
- If `enrichmentStatus === "pending"` and no summary → muted “Summary pending…”
- If failed → omit summary or short unavailable line
- Image optional; reserve aspect ratio to avoid layout shift
- Entire card clickable via overlay link **or** clear title link (a11y: one primary link)

---

## Accessibility notes

- Buttons need discernible text (icon-only → `aria-label`)
- Badges are not the only sentiment cue
- Focus visible on interactive cards/links
- Don’t trap focus incorrectly in motion wrappers

---

## Related

- [animation-recipes.md](animation-recipes.md)
- [tailwind-tokens.md](tailwind-tokens.md)
- Parent skill: [../SKILL.md](../SKILL.md)
