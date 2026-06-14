"use client";

/**
 * Meta (Facebook) Pixel loader, wrapped in requestIdleCallback for an
 * extra deferral pass beyond `next/script`'s `strategy="lazyOnload"`.
 *
 * Mirrors GoogleAnalyticsLazy exactly so the Pixel inherits the same
 * performance protection — fbevents.js is fetched/parsed/executed long
 * after FCP and after main-thread idle, keeping it out of the critical
 * TBT window (the 100→100 desktop / low-TBT mobile wins are preserved).
 *
 * Layered deferrals (cheapest to most-deferred):
 *   1. Rendered as a client child of the root layout.
 *   2. requestIdleCallback (or a 3s setTimeout fallback) gates whether
 *      the <Script> tags mount at all on this paint.
 *   3. next/script `strategy="lazyOnload"` then waits for the browser's
 *      `load` event before executing.
 *
 * Trade-off: the first PageView fires ~3-5s after FCP. Irrelevant for
 * the retargeting / ad-audience use case (people don't bounce in 3s and
 * still convert). SPA route changes emit their own PageView via the
 * usePathname effect below — the Pixel base code only auto-fires once.
 *
 * The Meta Pixel Helper extension and Events Manager "Active" status
 * both read the live browser DOM after scripts run, so lazy-mounting is
 * fully detectable (just a few seconds later than an eager install).
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

interface MetaPixelLazyProps {
  /** Meta Pixel / Dataset ID, e.g. "1361671492691891". */
  pixelId: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelLazy({ pixelId }: MetaPixelLazyProps) {
  const [shouldMount, setShouldMount] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // requestIdleCallback isn't in older Safari; fall back to a
    // reasonable timeout so the Pixel still fires within ~3s on
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

  // SPA route-change PageView. The base snippet auto-fires PageView once
  // on init; client-side navigations need an explicit track call. Guarded
  // on `shouldMount` so it no-ops until fbq exists, and skips the first
  // run (init already counts that pageview).
  useEffect(() => {
    if (!shouldMount) return;
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
    // Intentionally depend only on pathname; the init PageView covers the
    // mount, and this effect handles every subsequent navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!shouldMount) return null;

  return (
    <Script id="meta-pixel-init" strategy="lazyOnload">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
// Notice + opt-out consent: Pixel is on by default, but if this visitor
// previously declined the cookie banner, re-apply revoke BEFORE PageView
// so fbevents withholds the event for the whole session.
try{if(localStorage.getItem('archer-cookie-consent')==='declined')fbq('consent','revoke');}catch(e){}
fbq('track', 'PageView');`}
    </Script>
  );
}
