"use client";

/**
 * Direct gtag.js loader (NOT the GTM container), gated on first user
 * interaction via `useDeferredActivation` and then deferred again by
 * `next/script`'s `strategy="lazyOnload"`.
 *
 * Layered deferrals (cheapest to most-deferred):
 *   1. Component is rendered as a client child of the root layout.
 *   2. useDeferredActivation gates whether the <Script> tags mount at all:
 *      it returns true on the first user interaction (pointer/key/touch/
 *      scroll/mousemove), on tab-hide/pagehide, or after a 10s idle
 *      fallback — see that hook for the full rationale.
 *   3. next/script `strategy="lazyOnload"` then waits for the browser's
 *      `load` event before executing the script.
 *
 * Net effect: gtag.js is fetched/parsed/executed only after the visitor
 * engages, removing ~158KB transfer / 41% unused JS / ~440ms bootup from
 * the Lighthouse mobile critical (TBT) window. The previous
 * requestIdleCallback gate fired ~1.5s after FCP — inside that window —
 * which capped mobile at ~82. Desktop was already 100 and is unaffected.
 *
 * Trade-off: pageview events fire on engagement instead of immediately;
 * pure no-interaction bounces may go uncounted (acceptable for SEO traffic
 * analysis — those are the least valuable sessions). SPA route changes
 * still emit pageview events via the `<PageEvent>` component (separate
 * file).
 */
import Script from "next/script";
import { useDeferredActivation } from "@/lib/hooks/use-deferred-activation";

interface GoogleAnalyticsLazyProps {
  /** GA4 measurement ID, e.g. "G-WYMDWF9DKE". */
  gaId: string;
}

export function GoogleAnalyticsLazy({ gaId }: GoogleAnalyticsLazyProps) {
  const shouldMount = useDeferredActivation();

  if (!shouldMount) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });`}
      </Script>
    </>
  );
}
