"use client";

/**
 * Floating "Ask Counsellor" pill — sitewide.
 *
 * Renders the shared CounselorDialog behind a fixed pill at bottom-left.
 * It sits on the LEFT so it never collides with the right-corner stack
 * (WhatsApp at bottom-6 right-6, chat widget at bottom-24 right-6).
 *
 * Mounted lazily via counselor-fab-lazy.tsx so its JS stays out of the
 * first-paint bundle.
 */

import { Headset } from "lucide-react";
import { CounselorDialog } from "./counselor-dialog";

export function CounselorFab() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <CounselorDialog
        location="floating_button"
        triggerLabel="Ask Counsellor"
        triggerIcon={<Headset className="h-5 w-5" />}
        triggerClassName="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
      />
    </div>
  );
}
