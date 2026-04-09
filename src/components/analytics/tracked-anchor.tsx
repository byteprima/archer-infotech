"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import {
  captureAnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/posthog/client";

type TrackedAnchorProps = ComponentPropsWithoutRef<"a"> & {
  event: string;
  properties?: AnalyticsProperties;
};

export function TrackedAnchor({
  event,
  properties,
  onClick,
  ...props
}: TrackedAnchorProps) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    captureAnalyticsEvent(event, properties);
    onClick?.(clickEvent);
  };

  return <a {...props} onClick={handleClick} />;
}
