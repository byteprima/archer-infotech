import type { Metadata } from "next";
import { redirect, permanentRedirect } from "next/navigation";
import { siteConfig } from "@/data/site-config";

/**
 * /review — a short, memorable URL that forwards to the Google review box
 * (P7-04). Used on QR cards, classroom posters, email signatures and review
 * request messages so staff never have to share the long Google link.
 *
 * Destination is `siteConfig.googleMaps.reviewUrl` (single source of truth) —
 * currently the Maps place page; swap in the one-tap g.page/r/…/review link
 * once it's generated in GBP and the CTA becomes a direct review prompt.
 *
 * Not indexable — it's a utility redirect, not content.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ReviewRedirectPage() {
  const url = siteConfig.googleMaps.reviewUrl;
  // External destinations can't be permanently cached by Next's helper unless
  // absolute; both helpers handle absolute URLs. Use a 307 (temporary) for now
  // because the destination will change to the g.page link — avoids browsers
  // hard-caching the interim Maps URL. Switch to permanentRedirect once final.
  if (url.includes("g.page")) {
    permanentRedirect(url);
  }
  redirect(url);
}
