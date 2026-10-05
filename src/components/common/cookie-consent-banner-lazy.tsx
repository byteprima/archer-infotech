"use client";

/**
 * Lazy mount + lazy load wrapper for the cookie consent banner.
 *
 * The banner already waits 1.2s before showing, but as a plain client
 * component in the root layout its code (and the Button + meta-pixel client
 * it imports) still shipped in the first-paint bundle on every page. Same
 * approach as the other floating components: defer the chunk via
 * next/dynamic (ssr:false) and the mount via useDeferredActivation — first
 * interaction, leaving the tab, or a 10s fallback.
 */
import dynamic from "next/dynamic";
import { useDeferredActivation } from "@/lib/hooks/use-deferred-activation";

const CookieConsentBanner = dynamic(
  () =>
    import("./cookie-consent-banner").then((m) => m.CookieConsentBanner),
  { ssr: false },
);

export function CookieConsentBannerLazy() {
  const activated = useDeferredActivation();
  if (!activated) return null;
  return <CookieConsentBanner />;
}
