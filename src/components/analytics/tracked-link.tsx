"use client";

import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import Link, { type LinkProps } from "next/link";
import {
  captureAnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/posthog/client";

type TrackedLinkProps = PropsWithChildren<
  LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
      event: string;
      properties?: AnalyticsProperties;
    }
>;

export function TrackedLink({
  event,
  properties,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    captureAnalyticsEvent(event, properties);
    onClick?.(clickEvent);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
