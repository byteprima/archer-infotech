"use client";

/**
 * Lazy load wrapper for the campaign popup.
 *
 * OfferPopup pulls in the Dialog, next/image and OfferLeadForm — which
 * imports the whole courses-minimal dataset (~28KB) — and it used to ship in
 * the first-paint bundle of every page even though it can only ever open
 * after an interaction. This wrapper owns that interaction listener (a few
 * hundred bytes) and only downloads + mounts the popup once it fires; the
 * popup then runs its reveal as soon as it mounts.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const OfferPopup = dynamic(
  () => import("./offer-popup").then((m) => m.OfferPopup),
  { ssr: false },
);

/**
 * The popup opens on the visitor's first interaction, NOT on a timer.
 *
 * Measured on the homepage, Pixel 5 / 4x CPU / slow 4G:
 *
 *   no popup             LCP  772ms  (element: hero H1)
 *   popup on a timer     LCP 5712ms  (element: the artwork)  <- broken
 *   popup on interaction LCP  504ms  (element: hero H1)
 *
 * A timer cannot work: the browser keeps promoting new LCP candidates until
 * the first user input, so a large image appearing later simply becomes a
 * later, worse LCP. Gating on interaction makes the two coincide — the tap
 * or scroll that seals LCP is the one that opens the popup. Trade-off: a
 * visitor who never touches the page never sees it, but that visitor is
 * bouncing regardless.
 */
const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

export function OfferPopupLazy() {
  const [triggered, setTriggered] = useState(false);
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdminRoute || triggered) return;

    const onFirstInteraction = () => {
      cleanup();
      setTriggered(true);
    };
    // `once` per listener isn't enough — the first of ANY of them must remove
    // all the others, or a later scroll would re-arm an already-fired popup.
    const cleanup = () => {
      for (const t of TRIGGERS) window.removeEventListener(t, onFirstInteraction);
    };

    for (const t of TRIGGERS) {
      window.addEventListener(t, onFirstInteraction, { once: true, passive: true });
    }
    return cleanup;
  }, [isAdminRoute, triggered]);

  if (!triggered) return null;
  return <OfferPopup />;
}
