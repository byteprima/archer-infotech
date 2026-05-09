/**
 * Client-side instrumentation entry point (Next.js calls this once
 * during the client bootstrap, before any route renders).
 *
 * Previously this file imported posthog-js eagerly, which dragged the
 * entire posthog-js + core-js polyfill payload (~80KB JS + ~22KiB of
 * legacy polyfills PSI flagged) into the critical first-paint chunk.
 *
 * Now we just trigger the lazy loader inside lib/posthog/client.ts.
 * The actual posthog-js import happens on the next idle frame
 * (requestIdleCallback, fallback 2s setTimeout) — outside the LCP /
 * TBT measurement window. Any captureAnalyticsEvent() calls fired
 * during early page lifecycle are buffered and flushed once init
 * completes. No behavioural change for analytics fidelity.
 */
import { scheduleLazyInit } from "@/lib/posthog/client";

scheduleLazyInit();
