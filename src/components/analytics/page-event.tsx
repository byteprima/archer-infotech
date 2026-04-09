"use client";

import { useEffect, useRef } from "react";
import {
  captureAnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/posthog/client";

interface PageEventProps {
  event: string;
  properties?: AnalyticsProperties;
}

export function PageEvent({ event, properties }: PageEventProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) {
      return;
    }

    hasTrackedRef.current = true;
    captureAnalyticsEvent(event, properties);
  }, [event, properties]);

  return null;
}
