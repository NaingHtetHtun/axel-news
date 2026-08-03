"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false,
    capture_pageleave: true,
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("$pageview", { $current_url: pathname });
    }
  }, [pathname]);

  return <>{children}</>;
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(name, properties);
  }
}
