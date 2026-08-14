"use client";

/**
 * Campaign popup — big artwork, optional lead-capture strip along the bottom.
 *
 * Configured entirely from /admin/popups (enable/disable, artwork, mode,
 * date window). Three things about this site shaped the implementation, all
 * of them measured rather than assumed:
 *
 * 1. Config is fetched from /api/popup, not rendered into the page. The
 *    site's HTML is edge-cached at Cloudflare for up to 6 hours, so a popup
 *    baked into a page would keep showing after it was switched off, or stay
 *    hidden after it was switched on. The endpoint is no-store, so an admin
 *    change takes effect on the next page load.
 *
 * 2. It opens on the visitor's first interaction, NOT on a timer — see
 *    TRIGGERS below for the numbers. A timer does not protect LCP.
 *
 * 3. The artwork is never preloaded and carries explicit dimensions, so it
 *    can neither join the critical path nor shift the layout.
 *
 * Shown once per browsing session, and never again once the visitor submits.
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

import { OfferLeadForm } from "@/components/marketing/offer-lead-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface PopupConfig {
  id: number;
  subject: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  mode: "image_only" | "image_and_form";
  linkUrl: string | null;
}

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

/** Small pause after the trigger so it doesn't snap open mid-scroll. */
const SHOW_AFTER_MS = 400;

const sessionKey = (id: number) => `archer-popup:${id}:session`;
const convertedKey = (id: number) => `archer-popup:${id}:converted`;

export function OfferPopup() {
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  const reveal = useCallback(async () => {
    let popup: PopupConfig | null = null;
    try {
      // Fetched only after an interaction, so a visitor who bounces costs
      // nothing and the request can never land in the LCP window.
      const res = await fetch("/api/popup", { cache: "no-store" });
      if (!res.ok) return;
      popup = (await res.json()).popup ?? null;
    } catch {
      return; // Offline or the endpoint is down — just don't show a popup.
    }
    if (!popup) return;

    try {
      if (localStorage.getItem(convertedKey(popup.id))) return;
      if (sessionStorage.getItem(sessionKey(popup.id))) return;
    } catch {
      // Private mode — show it rather than suppress it.
    }

    setConfig(popup);
    setOpen(true);
    try {
      sessionStorage.setItem(sessionKey(popup.id), "1");
    } catch {
      // Non-fatal: worst case it shows again on the next page load.
    }
  }, []);

  useEffect(() => {
    if (isAdminRoute) return;

    let timer = 0;
    const onFirstInteraction = () => {
      cleanup();
      timer = window.setTimeout(reveal, SHOW_AFTER_MS);
    };
    // `once` per listener isn't enough — the first of ANY of them must remove
    // all the others, or a later scroll would re-arm an already-fired popup.
    const cleanup = () => {
      for (const t of TRIGGERS) window.removeEventListener(t, onFirstInteraction);
    };

    for (const t of TRIGGERS) {
      window.addEventListener(t, onFirstInteraction, { once: true, passive: true });
    }
    return () => {
      cleanup();
      window.clearTimeout(timer);
    };
  }, [isAdminRoute, reveal]);

  // Lift the backdrop above the cookie banner (z-60) and the floating action
  // buttons (z-50) while open, so nothing pokes through the dim layer. Driven
  // by an attribute plus one rule in globals.css rather than by reaching into
  // those components.
  useEffect(() => {
    const el = document.documentElement;
    if (open) el.setAttribute("data-offer-open", "true");
    else el.removeAttribute("data-offer-open");
    return () => el.removeAttribute("data-offer-open");
  }, [open]);

  if (!open || !config) return null;

  const artwork = (
    /* Explicit intrinsic dimensions reserve the box before the bytes land —
       no layout shift. Deliberately not `priority`: preloading would put the
       artwork back on the critical path. */
    <Image
      src={config.imageUrl}
      alt={config.imageAlt}
      width={config.imageWidth}
      height={config.imageHeight}
      sizes="(max-width: 640px) 100vw, 720px"
      className="h-auto w-full"
      unoptimized={false}
    />
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        // Artwork plus a strip can exceed a short mobile viewport, so the
        // dialog scrolls rather than overflowing off-screen.
        className="z-[95] max-h-[92vh] max-w-[calc(100%-1.5rem)] overflow-y-auto p-0 sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">{config.subject}</DialogTitle>
        <DialogDescription className="sr-only">{config.imageAlt}</DialogDescription>

        <DialogClose
          aria-label="Close"
          className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <XIcon className="size-5" />
        </DialogClose>

        {/* In image-only mode the artwork is the call to action, so it links
            (when a URL is set). With the form present it must not — a stray
            tap on the image would abandon a half-filled form. */}
        {config.mode === "image_only" && config.linkUrl ? (
          <Link
            href={config.linkUrl}
            onClick={() => setOpen(false)}
            className="block focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {artwork}
          </Link>
        ) : (
          artwork
        )}

        {config.mode === "image_and_form" && (
          <OfferLeadForm
            subject={config.subject}
            onSuccess={() => {
              try {
                localStorage.setItem(convertedKey(config.id), "1");
              } catch {
                // Non-fatal: they'd just be asked again on a later visit.
              }
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
