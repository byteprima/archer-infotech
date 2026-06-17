"use client";

/**
 * Meta (Facebook) Pixel loader, gated on first user interaction via
 * `useDeferredActivation` and then deferred again by `next/script`'s
 * `strategy="lazyOnload"`.
 *
 * Mirrors GoogleAnalyticsLazy exactly so the Pixel inherits the same
 * performance protection — fbevents.js is fetched/parsed/executed only
 * after the visitor engages, keeping it out of the Lighthouse mobile
 * critical (TBT) window (the 100 desktop / low-TBT mobile wins are
 * preserved).
 *
 * Layered deferrals (cheapest to most-deferred):
 *   1. Rendered as a client child of the root layout.
 *   2. useDeferredActivation gates whether the <Script> tag mounts at all:
 *      true on first user interaction, on tab-hide/pagehide, or after a
 *      10s idle fallback (see that hook for the full rationale — the old
 *      requestIdleCallback gate fired ~1.5s after FCP, inside the TBT
 *      window, capping mobile at ~82).
 *   3. next/script `strategy="lazyOnload"` then waits for the browser's
 *      `load` event before executing.
 *
 * Trade-off: the first PageView fires on engagement instead of ~3-5s after
 * FCP. Irrelevant for the retargeting / ad-audience use case (people who
 * convert always interact first). SPA route changes emit their own
 * PageView via the usePathname effect below — the Pixel base code only
 * auto-fires once.
 *
 * The Meta Pixel Helper extension and Events Manager "Active" status both
 * read the live browser DOM after scripts run, so interaction-gated
 * mounting is fully detectable (just after the first interaction).
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useDeferredActivation } from "@/lib/hooks/use-deferred-activation";

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
  const shouldMount = useDeferredActivation();
  const pathname = usePathname();

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
