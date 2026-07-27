# Animation recipes

Framer Motion recipes for Axel News. Prefer subtle motion. **Always** respect reduced motion.

---

## Setup

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
```

Shared hook pattern:

```tsx
export function useMotionSafe() {
  const reduce = useReducedMotion();
  return {
    reduce,
    // duration 0 when reduced
    t: (seconds: number) => (reduce ? 0 : seconds),
  };
}
```

---

## Fade-up (enter)

Use for cards, detail sections, hero text.

```tsx
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Stagger children (feed)

```tsx
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerFeed({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
  }

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: "easeOut" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

Keep stagger ≤ ~0.08s so large feeds don’t feel slow.

---

## Shared layout

Highlight selected card → detail hero continuity.

```tsx
// Card image
<motion.div layoutId={`article-image-${id}`} className="overflow-hidden rounded-lg">
  {/* img */}
</motion.div>

// Detail image
<motion.div layoutId={`article-image-${id}`} className="overflow-hidden rounded-xl">
  {/* img */}
</motion.div>
```

Wrap app section in `LayoutGroup` when multiple shared elements exist. Disable shared layout when `useReducedMotion()` is true (render static `div`).

---

## Skeleton pulse

Prefer CSS for zero-JS skeletons:

```tsx
<div className="animate-pulse rounded-md bg-muted h-4 w-full" />
```

Optional Framer shimmer (client only):

```tsx
function Shimmer({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn("rounded-md bg-muted", className)} />;
  }
  return (
    <motion.div
      className={cn("rounded-md bg-muted", className)}
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
```

---

## Modal / dialog

```tsx
export function MotionModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg"
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

Use `AnimatePresence` when mounting/unmounting. Trap focus with a proper dialog primitive when product hardens a11y.

---

## Hover / tap (cards)

```tsx
<motion.div
  whileHover={reduce ? undefined : { y: -2 }}
  whileTap={reduce ? undefined : { scale: 0.99 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
>
  {/* NewsCard content */}
</motion.div>
```

Do not rely on hover for critical info (touch devices).

---

## Page section transition

```tsx
<motion.main
  initial={reduce ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: reduce ? 0 : 0.25 }}
>
  {children}
</motion.main>
```

Avoid animating large layout shifts on every navigation.

---

## Reduced motion (policy)

| Situation | Behavior |
| --- | --- |
| `prefers-reduced-motion: reduce` | No translate/scale springs; opacity optional duration 0–0.01 |
| Skeleton | Static muted blocks OK; no infinite shimmer required |
| Shared layout | Off |
| Modals | Instant appear or simple opacity |
| Stagger | Render grid without stagger |

Detect with Framer `useReducedMotion()` and/or CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .motion-safe-only {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Performance tips

- Animate `transform` and `opacity`, not `width`/`top` when possible
- Don’t stagger 100+ nodes at once; virtualize long lists later
- Keep `"use client"` boundaries small
- Prefer CSS pulse for pure skeletons

---

## Related

- [component-patterns.md](component-patterns.md)
- [tailwind-tokens.md](tailwind-tokens.md)
