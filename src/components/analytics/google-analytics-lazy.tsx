"use client";

/**
 * Lightweight Google Analytics loader using Next.js `<Script>` with
 * `strategy="lazyOnload"`. Replaces `@next/third-parties/google`'s
 * `<GoogleAnalytics>` which loads with `afterInteractive` (the strict
 * default that makes GTM a render-path blocker on mobile).
 *
 * The PSI mobile run on archerinfotech.in flagged GTM as 158KB
 * transfer / 483KB resource / 41% unused / 828ms total bootup —
 * single biggest TBT contributor after the framework chunks. With
 * lazyOnload, GTM/GA loads only after the browser fires the `load`
 * event, removing it from the critical TBT window entirely.
 *
 * Trade-off: pageview events fire ~3-5s later than before. For SEO
 * traffic analysis (the primary use case here) that's fine — the
 * pageview still fires, just later in the page's lifecycle. For
 * real-time event streaming (rare on a marketing site), less ideal.
 */
import Script from "next/script";

interface GoogleAnalyticsLazyProps {
  /** GA4 measurement ID, e.g. "G-WYMDWF9DKE". */
  gaId: string;
}

export function GoogleAnalyticsLazy({ gaId }: GoogleAnalyticsLazyProps) {
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
