"use client";

/**
 * Lazy trigger for the "Ask Archer Counsellor" enquiry dialog.
 *
 * The full CounselorDialog is a heavy client island (base-ui Dialog, sonner,
 * Meta Pixel client, the lead form + server action). Importing it directly
 * into the homepage hero / CTA and the course page — all Server Components
 * built to ship zero JS — pulled that whole bundle onto the critical path and
 * hydrated it eagerly (regressed mobile TBT).
 *
 * This wrapper instead server-renders just the trigger *button* (so it's in
 * the initial HTML — no layout shift, visible without JS-blocking) and defers
 * the dialog chunk until the user shows intent:
 *   - pointer-enter / focus  → prefetch the chunk (mount closed)
 *   - click                  → mount + auto-open (defaultOpen)
 *
 * Same visual result as before; the dialog's JS just no longer loads until
 * someone actually reaches for it. Mirrors counselor-fab-lazy's philosophy.
 */

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";

const CounselorDialog = dynamic(
  () => import("./counselor-dialog").then((m) => m.CounselorDialog),
  { ssr: false },
);

interface CounselorDialogLazyProps {
  location: string;
  triggerLabel?: string;
  triggerClassName?: string;
  triggerIcon?: React.ReactNode;
  defaultCourse?: string;
}

export function CounselorDialogLazy({
  location,
  triggerLabel = "Ask Archer Counsellor",
  triggerClassName,
  triggerIcon,
  defaultCourse,
}: CounselorDialogLazyProps) {
  // `mounted` loads the (heavy) dialog chunk; `openNow` also auto-opens it.
  // Hover/focus is intent-to-maybe-use → prefetch only; a click both mounts
  // and opens so a cold tap needs no second press.
  const [mounted, setMounted] = useState(false);
  const [openNow, setOpenNow] = useState(false);

  if (mounted) {
    return (
      <CounselorDialog
        location={location}
        triggerLabel={triggerLabel}
        triggerClassName={triggerClassName}
        triggerIcon={triggerIcon}
        defaultCourse={defaultCourse}
        defaultOpen={openNow}
      />
    );
  }

  return (
    <button
      type="button"
      className={triggerClassName}
      onPointerEnter={() => setMounted(true)}
      onFocus={() => setMounted(true)}
      onClick={() => {
        setOpenNow(true);
        setMounted(true);
      }}
    >
      {triggerIcon ?? <MessageCircleQuestion className="h-5 w-5" />}
      {triggerLabel}
    </button>
  );
}
