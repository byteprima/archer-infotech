"use client";

/**
 * Lazy mount + lazy load wrapper for the floating WhatsApp button.
 *
 * The button is a sitewide CTA but it's purely decorative on first
 * paint — it has no SEO value (a separate WhatsApp link sits in the
 * footer for crawlers) and no user can click it before they've seen
 * the page anyway. So we both:
 *
 *   1. Defer the JS chunk via `next/dynamic` (ssr:false) — the
 *      WhatsAppButton code never enters the initial bundle.
 *   2. Defer the *mount* until requestIdleCallback fires — even after
 *      the JS arrives, React skips hydrating the button until the
 *      main thread is free.
 *
 * Combined effect on mobile PSI: removes ~3KB of initial JS and
 * removes the button's hydration cost from the TBT window.
 *
 * Universal fix — desktop sees the same code load slightly later
 * (~50ms) and that delay is below human perception.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WhatsAppButton = dynamic(
  () => import("./whatsapp-button").then((m) => m.WhatsAppButton),
  { ssr: false },
);

export function WhatsAppButtonLazy() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const ric = (
      window as unknown as {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout?: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      const id = ric(() => setShouldMount(true), { timeout: 2000 });
      return () => {
        const cic = (
          window as unknown as {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;
        cic?.(id);
      };
    }
    const id = window.setTimeout(() => setShouldMount(true), 2000);
    return () => window.clearTimeout(id);
  }, []);

  if (!shouldMount) return null;
  return <WhatsAppButton />;
}
