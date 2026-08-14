"use client";

/**
 * Time-boxed promotional popup (Independence Day 2026).
 *
 * Two things about this site make the obvious implementation wrong:
 *
 * 1. HTML is edge-cached at Cloudflare (s-maxage 5min-6h, see next.config.ts).
 *    A server-side date check would be baked into the cached HTML, so the
 *    offer could keep showing after it ends or fail to show while it runs.
 *    The window is therefore evaluated IN THE BROWSER, on every load. The
 *    cost is that it trusts the visitor's clock — acceptable for a promo,
 *    and the only option that is correct behind a CDN.
 *
 * 2. Mobile LCP is the hero <H1> and was just brought to ~772ms by inlining
 *    CSS (see next.config.ts). The artwork is 1672x941; if it rendered at
 *    first paint it would become the LCP element and undo that. So it mounts
 *    only after SHOW_AFTER_MS, well past LCP, and next/image serves a
 *    modern format at a fraction of the 1.4MB source.
 *
 * After END_DATE this renders nothing on every route, with no deploy needed.
 * To reuse it for the next campaign, change the OFFER constant.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const OFFER = {
  /** Bump this when the artwork changes so returning visitors see the new one. */
  id: "independence-day-2026",
  /** Inclusive, IST. Dates are compared as YYYY-MM-DD strings. */
  startDate: "2026-08-15",
  endDate: "2026-08-17",
  image: "/images/offers/independence-day-2026.png",
  width: 1672,
  height: 941,
  /**
   * Every word of the offer is pixels in the artwork — invisible to search
   * engines and screen readers. This is the only text form of it.
   */
  alt:
    "Archer Infotech Independence Day Special Offer. Online Java, .NET and " +
    "Python Full Stack batches for final-year engineering students. " +
    "Enrol 15 August for Rs 15,000, 16 August for Rs 16,000, or " +
    "17 August for Rs 17,000. Limited period offer.",
  href:
    "/contact?utm_source=site&utm_medium=popup&utm_campaign=independence-day-2026",
} as const;

/**
 * The popup opens on the visitor's first interaction, NOT on a timer.
 *
 * This is not a stylistic choice — it was measured. A timer does not protect
 * LCP: the browser keeps promoting new LCP candidates until the first user
 * input, so a large image appearing at 1800ms simply becomes a *later* LCP.
 * Measured on the homepage, Pixel 5 / 4x CPU / slow 4G:
 *
 *   no popup            LCP  772ms  (element: hero H1)
 *   popup on a timer    LCP 5712ms  (element: the offer image)  <- broken
 *   popup on interaction LCP 772ms  (element: hero H1)
 *
 * Gating on interaction makes the two events coincide: the same tap/scroll
 * that seals LCP is the one that opens the popup, so the image can never
 * become a candidate. Trade-off: a visitor who never touches the page never
 * sees the offer — but that visitor is bouncing regardless.
 */
const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/** Small pause after the trigger so it doesn't snap open mid-scroll. */
const SHOW_AFTER_MS = 400;

/** Today's date in IST as YYYY-MM-DD, whatever timezone the visitor is in. */
function todayInIST(): string {
  // en-CA formats as YYYY-MM-DD, which sorts correctly as a plain string.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function OfferPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Never over the admin panel — it nests under the root layout too.
    if (pathname?.startsWith("/admin")) return;

    const today = todayInIST();
    if (today < OFFER.startDate || today > OFFER.endDate) return;

    // Once per day per visitor: the key carries the date, so it shows again
    // tomorrow without needing anything cleaned up.
    const seenKey = `archer-offer:${OFFER.id}:${today}`;
    try {
      if (localStorage.getItem(seenKey)) return;
    } catch {
      // Private mode / storage disabled — show it rather than suppress it.
    }

    let timer = 0;

    const reveal = () => {
      cleanup();
      timer = window.setTimeout(() => {
        setOpen(true);
        try {
          localStorage.setItem(seenKey, "1");
        } catch {
          // Non-fatal: worst case they see it again on the next page load.
        }
      }, SHOW_AFTER_MS);
    };

    // `once` per listener isn't enough — the first of ANY of them must remove
    // all the others, or a later scroll would re-arm an already-fired popup.
    const cleanup = () => {
      for (const t of TRIGGERS) window.removeEventListener(t, reveal);
    };

    for (const t of TRIGGERS) {
      window.addEventListener(t, reveal, { once: true, passive: true });
    }

    return () => {
      cleanup();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  // Lift the backdrop above the cookie banner (z-60) and the floating action
  // buttons (z-50) while open, so nothing pokes through the dim layer. Driven
  // by an attribute + one rule in globals.css rather than by reaching into
  // those components.
  useEffect(() => {
    const el = document.documentElement;
    if (open) el.setAttribute("data-offer-open", "true");
    else el.removeAttribute("data-offer-open");
    return () => el.removeAttribute("data-offer-open");
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="z-[95] max-w-[calc(100%-1.5rem)] overflow-hidden p-0 sm:max-w-3xl"
      >
        {/* Present to assistive tech and required by the dialog primitive;
            the artwork carries the same words visually. */}
        <DialogTitle className="sr-only">
          Independence Day Special Offer
        </DialogTitle>
        <DialogDescription className="sr-only">{OFFER.alt}</DialogDescription>

        <DialogClose
          aria-label="Close offer"
          className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <XIcon className="size-5" />
        </DialogClose>

        <Link
          href={OFFER.href}
          onClick={() => setOpen(false)}
          className="block focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          {/* width/height are the intrinsic dimensions, so the box is
              reserved before the bytes land — no layout shift. Deliberately
              not `priority`: preloading it would put a 1.4MB image on the
              critical path and cost the LCP win it was designed around. */}
          <Image
            src={OFFER.image}
            alt={OFFER.alt}
            width={OFFER.width}
            height={OFFER.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </Link>

        <div className="flex flex-col gap-2 p-4 sm:flex-row sm:justify-end">
          <DialogClose className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
            Maybe later
          </DialogClose>
          <Link
            href={OFFER.href}
            onClick={() => setOpen(false)}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Enrol now
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
