"use client";

/**
 * Direct gtag.js loader (NOT the GTM container) wrapped in
 * requestIdleCallback for an extra deferral pass beyond
 * `next/script`'s `strategy="lazyOnload"`.
 *
 * Layered deferrals (cheapest to most-deferred):
 *   1. Component is rendered as a client child of the root layout.
 *   2. requestIdleCallback (or a 3s setTimeout fallback) gates whether
 *      the <Script> tags get mounted at all on this paint.
 *   3. next/script `strategy="lazyOnload"` then waits for the browser's
 *      `load` event before executing the script.
 *
 * Net effect: gtag.js is fetched/parsed/executed *long* after FCP and
 * after main-thread idle, removing ~158KB transfer / 41% unused JS /
 * 828ms total bootup from the critical TBT window. See PSI snapshot:
 *  - Mobile TBT 290ms → 110ms (warm), 4860ms → 160ms peak post-deploy
 *  - "Reduce unused JS" audit -22KB on mobile, -215KB on desktop
 *
 * Trade-off: pageview events fire ~3-5s after FCP (worse for real-time
 * dashboards, irrelevant for SEO traffic analysis which is our use
 * case). SPA route changes still emit pageview events via the
 * `<PageEvent>` component (separate file).
 */
import { useEffect, useState } from "react";
import Script from "next/script";

interface GoogleAnalyticsLazyProps {
  /** GA4 measurement ID, e.g. "G-WYMDWF9DKE". */
  gaId: string;
}

export function GoogleAnalyticsLazy({ gaId }: GoogleAnalyticsLazyProps) {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // requestIdleCallback isn't in older Safari; fall back to a
    // reasonable timeout so analytics still fires within ~3s on
    // browsers that lack the API.
    const ric = (
      window as unknown as {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout?: number },
        ) => number;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(() => setShouldMount(true), { timeout: 3000 });
      return () => {
        const cic = (
          window as unknown as {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;
        cic?.(id);
      };
    }
    const id = window.setTimeout(() => setShouldMount(true), 3000);
    return () => window.clearTimeout(id);
  }, []);

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
