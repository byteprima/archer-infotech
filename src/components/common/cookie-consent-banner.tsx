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
 * SERVER-RENDERED, AND VISIBILITY IS CSS-DRIVEN. This used to mount in an
 * effect and then wait a further 1200 ms before rendering anything:
 *
 *     const [visible, setVisible] = useState(false);
 *     useEffect(() => { setTimeout(() => setVisible(true), 1200); }, []);
 *     if (!visible) return null;
 *
 * The intent was to stay out of first paint. The effect was the opposite of
 * that on mobile. The markup below is a full-width fixed card at the bottom
 * of the viewport — on a 360 px screen it is a large contentful element —
 * and painting it late made it the LARGEST CONTENTFUL PAINT. Measured on
 * PageSpeed Insights, 2026-08-13:
 *
 *     FCP 1.7 s   Speed Index 1.7 s   TBT 40-50 ms   LCP 3.9-4.1 s
 *
 * Hydration long tasks began ~2.7 s; plus the 1200 ms timer lands at
 * ~3.9 s, matching the measured LCP almost exactly. Lighthouse's
 * `largest-contentful-paint-element` audit came back EMPTY on every run,
 * which is what happens when the LCP node appears late — the tell that
 * confirmed it.
 *
 * Nothing else on the page was at fault: no render-blocking resources, no
 * third-party cost, bootup 0.5 s, network complete by 2.0 s.
 *
 * So the banner is now in the server HTML and paints with everything else at
 * FCP. Visibility is controlled entirely by a `data-cookie-consent`
 * attribute on <html>, set by a tiny blocking script in the document head
 * before first paint (see layout.tsx). React never touches that attribute
 * during render, which is deliberate: if this component owned visibility via
 * state, hydration would reconcile it back and fight the inline script.
 * Clicking a button sets the attribute directly, and CSS does the hiding.
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { setConsent, type CookieConsent } from "@/lib/meta-pixel/client";

/** Marks a decision as made so the CSS rule in globals.css hides the banner. */
function dismiss() {
  document.documentElement.setAttribute("data-cookie-consent", "decided");
}

export function CookieConsentBanner() {
  const decide = (consent: CookieConsent) => {
    setConsent(consent);
    dismiss();
  };

  return (
    <div
      id="cookie-consent"
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
