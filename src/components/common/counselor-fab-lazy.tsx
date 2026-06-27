"use client";

/**
 * Lazy mount + lazy load wrapper for the floating "Ask Counsellor" pill.
 *
 * Same approach as whatsapp-button-lazy: the dialog + form code is a CTA
 * nobody clicks before they've seen the page, so we (1) defer the JS chunk
 * via next/dynamic (ssr:false) and (2) defer the mount until the main
 * thread is idle. Keeps the counsellor form off the critical-path bundle.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CounselorFab = dynamic(
  () => import("./counselor-fab").then((m) => m.CounselorFab),
  { ssr: false },
);

export function CounselorFabLazy() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const ric = (
      window as unknown as {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout?: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      const id = ric(() => setShouldMount(true), { timeout: 2000 });
      return () => {
        const cic = (
          window as unknown as {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;
        cic?.(id);
      };
    }
    const id = window.setTimeout(() => setShouldMount(true), 2000);
    return () => window.clearTimeout(id);
  }, []);

  if (!shouldMount) return null;
  return <CounselorFab />;
}
