"use client";

/**
 * Cookie / Meta Pixel consent banner — NOTICE + OPT-OUT model.
 *
 * The Pixel and analytics run by default (see MetaPixelLazy); this banner
 * informs visitors and lets them opt out. "Decline" calls
 * fbq('consent','revoke') via setConsent() and the choice is remembered in
 * localStorage so the Pixel stays suppressed on future visits. Once a
 * decision exists the banner never shows again.
 *
 * Rendered after a short delay in an effect so it never blocks first paint
 * and never appears for visitors who have already chosen.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getStoredConsent,
  setConsent,
  type CookieConsent,
} from "@/lib/meta-pixel/client";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() !== null) return;
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  const decide = (consent: CookieConsent) => {
    setConsent(consent);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-4xl rounded-xl border bg-card/95 p-4 shadow-lg backdrop-blur sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            We use cookies and the Meta (Facebook) Pixel to understand site
            usage and to show you relevant ads. You can opt out anytime. See
            our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => decide("declined")}
            >
              Decline
            </Button>
            <Button size="sm" onClick={() => decide("granted")}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
