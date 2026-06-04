"use client";

import nextDynamic from "next/dynamic";

/**
 * Client-side lazy mount of the sonner Toaster.
 *
 * Why this exists: the actual `<Toaster />` from `@/components/ui/sonner`
 * pulls the full 37 KB sonner package into whatever chunk first imports
 * it. Previously the root layout.tsx mounted it eagerly → sonner shipped
 * on every public route's first-paint bundle.
 *
 * `next/dynamic({ ssr: false })` only works inside Client Components
 * (Next 16 App Router rule), so this thin wrapper exists purely to be
 * that Client Component boundary. The root Server-Component layout.tsx
 * imports `<ToasterLazy />` like any other component; the dynamic import
 * defers sonner to its own chunk that hydrates on idle.
 *
 * Trade-off: toast() calls fired before sonner finishes loading render
 * slightly late. Acceptable for our use case (form submits + admin
 * actions are user-gated and happen after idle). P-12 follow-up
 * 2026-06-04.
 */
const Toaster = nextDynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false },
);

export function ToasterLazy() {
  return <Toaster />;
}
