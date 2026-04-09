"use client";

import posthog from "posthog-js";

type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsProperties = Record<
  string,
  AnalyticsValue | AnalyticsValue[]
>;

export function captureAnalyticsEvent(
  eventName: string,
  properties?: AnalyticsProperties
) {
  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Failed to capture analytics event "${eventName}"`, error);
    }
  }
}

export function getAnalyticsDistinctId() {
  try {
    return posthog.get_distinct_id();
  } catch {
    return undefined;
  }
}
