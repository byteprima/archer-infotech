"use client";

/**
 * Microsoft Clarity — session recordings, heatmaps, rage/dead-click
 * detection. Free, unlimited, and complements the numeric tools already
 * running (GA4, PostHog) by showing what people actually did rather than
 * how many of them did it.
 *
 * Gated behind `useDeferredActivation` and `strategy="lazyOnload"`, the
 * same two-stage deferral GoogleAnalyticsLazy and MetaPixelLazy use. The
 * homepage was taken from desktop 94 to 100 and mobile TBT 200ms to 40ms
 * by keeping third-party scripts out of the critical window; a recording
 * tool is not worth surrendering that.
 *
 * Trade-off, stated plainly: the recording starts at first engagement
 * (pointer / key / touch / scroll / mousemove, tab-hide, or a 10s idle
 * fallback) rather than at first paint, so the opening moment of a session
 * is not captured. That is an acceptable loss here — a visitor who never
 * moves, scrolls or types has produced no interaction worth watching, and
 * `useDeferredActivation` fires on mousemove, which any engaged visitor
 * triggers almost immediately.
 *
 * Set NEXT_PUBLIC_CLARITY_PROJECT_ID to activate. Absent the variable,
 * nothing mounts and no request is made — matching how GA and the Meta
 * Pixel are wired in the root layout.
 */
import Script from "next/script";
import { useDeferredActivation } from "@/lib/hooks/use-deferred-activation";

interface ClarityLazyProps {
  /** Clarity project ID from clarity.microsoft.com — e.g. "abcd1234ef". */
  projectId: string;
}

export function ClarityLazy({ projectId }: ClarityLazyProps) {
  const shouldMount = useDeferredActivation();

  if (!shouldMount) return null;

  return (
    <Script id="ms-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${projectId}");`}
    </Script>
  );
}
