"use client";

/**
 * Google Tag Manager container loader.
 *
 * READ THIS BEFORE SETTING NEXT_PUBLIC_GTM_ID.
 *
 * GTM was deliberately NOT used on this site. GA4 loads directly through
 * gtag.js (see GoogleAnalyticsLazy, whose header says "NOT the GTM
 * container"), and the Meta Pixel loads through its own component. That
 * was a performance decision: the container adds a second tag-management
 * layer, and its payload lands on a site whose Lighthouse numbers were
 * won by keeping third-party JavaScript out of the critical window.
 *
 * If you turn this on, GA4 and the Meta Pixel are ALREADY firing from
 * their own loaders. Adding either of them again as tags inside the GTM
 * container will double-count every pageview and every conversion. Pick
 * one path per tag:
 *
 *   - Keep the direct loaders and use GTM only for NEW tags (LinkedIn
 *     Insight, call tracking, a chat widget), or
 *   - Move GA4 and the Pixel into GTM and delete
 *     NEXT_PUBLIC_GA_MEASUREMENT_ID / NEXT_PUBLIC_FACEBOOK_PIXEL_ID so
 *     the direct loaders stop mounting.
 *
 * Do not run both for the same tag. Skewed conversion data is harder to
 * notice, and harder to unwind, than a missing tag.
 *
 * The <noscript> iframe GTM's own snippet includes is omitted on purpose:
 * it only serves visitors with JavaScript disabled, who cannot trigger
 * any tag in the container anyway, and it would render an iframe into the
 * body of every page.
 */
import Script from "next/script";
import { useDeferredActivation } from "@/lib/hooks/use-deferred-activation";

interface GtmLazyProps {
  /** Container ID from tagmanager.google.com — e.g. "GTM-ABC1234". */
  gtmId: string;
}

export function GtmLazy({ gtmId }: GtmLazyProps) {
  const shouldMount = useDeferredActivation();

  if (!shouldMount) return null;

  return (
    <Script id="gtm-container" strategy="lazyOnload">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
