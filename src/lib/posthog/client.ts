"use client";

/**
 * Lazy PostHog client wrapper.
 *
 * Background: posthog-js itself is ~80KB minified and pulls in core-js
 * polyfills for Math.trunc, Array.prototype.at/flat/flatMap,
 * Object.fromEntries/hasOwn, String.prototype.trimEnd/trimStart — all
 * the polyfills PSI's "Legacy JavaScript" audit flagged on
 * archerinfotech.in. Importing posthog-js *eagerly* at module top-level
 * (the previous behaviour) put that entire payload + its core-js deps
 * into the critical first-paint chunk, costing ~290ms of TBT on
 * mobile and shipping ~22KiB of polyfills modern browsers don't need.
 *
 * Fix: dynamic-import posthog-js so it lands in its own chunk that
 * loads on idle (or on first capture call, whichever comes first).
 * captureAnalyticsEvent() stays synchronous from the caller's POV —
 * events fired before posthog finishes loading are buffered and
 * flushed once init completes. No call site changes required.
 *
 * Trade-off: events fire ~1-3s after page load (bounded by
 * requestIdleCallback's 2s timeout). Acceptable for an SEO-traffic
 * analytics use case; would need revisiting for funnel/realtime work.
 */
import type posthogModule from "posthog-js";

type PostHogInstance = typeof posthogModule;

type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsProperties = Record<
  string,
  AnalyticsValue | AnalyticsValue[]
>;

type QueuedCapture = {
  kind: "capture";
  event: string;
  properties?: AnalyticsProperties;
};

let posthogPromise: Promise<PostHogInstance | null> | null = null;
let posthogInstance: PostHogInstance | null = null;
const queue: QueuedCapture[] = [];

function loadPostHog(): Promise<PostHogInstance | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (posthogPromise) return posthogPromise;

  posthogPromise = import("posthog-js")
    .then((mod) => {
      const ph = mod.default;
      const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
      if (!token) {
        return null;
      }
      ph.init(token, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        capture_pageleave: true,
        person_profiles: "identified_only",
        // Keep the heavy features off — see archerinfotech instrumentation
        // notes (autocapture / surveys / session-recording all add
        // major TBT cost on mobile).
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_decide: true,
      });
      posthogInstance = ph;
      // Drain any events captured before init finished.
      while (queue.length > 0) {
        const item = queue.shift();
        if (item && item.kind === "capture") {
          try {
            ph.capture(item.event, item.properties);
          } catch (error) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(
                `Failed to flush queued event "${item.event}"`,
                error,
              );
            }
          }
        }
      }
      return ph;
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to load posthog-js", error);
      }
      // Drop queued events — analytics is best-effort, never blocking.
      queue.length = 0;
      return null;
    });

  return posthogPromise;
}

/**
 * Schedules the posthog-js dynamic import on the next idle frame.
 * Called once during client bootstrap from instrumentation-client.ts.
 * Safe to call multiple times — loadPostHog() memoises the promise.
 */
export function scheduleLazyInit() {
  if (typeof window === "undefined") return;
  if (posthogPromise) return;

  const ric = (
    window as unknown as {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout?: number },
      ) => number;
    }
  ).requestIdleCallback;

  if (typeof ric === "function") {
    ric(() => void loadPostHog(), { timeout: 2000 });
  } else {
    window.setTimeout(() => void loadPostHog(), 2000);
  }
}

export function captureAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  if (typeof window === "undefined") return;
  if (posthogInstance) {
    try {
      posthogInstance.capture(eventName, properties);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Failed to capture analytics event "${eventName}"`, error);
      }
    }
    return;
  }
  // Buffer until posthog finishes loading.
  queue.push({ kind: "capture", event: eventName, properties });
  // First call also kicks off the load — events captured during early
  // page lifecycle (e.g. a click before idle fires) still get sent.
  if (!posthogPromise) {
    void loadPostHog();
  }
}

export function getAnalyticsDistinctId() {
  if (!posthogInstance) return undefined;
  try {
    return posthogInstance.get_distinct_id();
  } catch {
    return undefined;
  }
}
