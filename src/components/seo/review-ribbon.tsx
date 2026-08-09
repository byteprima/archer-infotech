import { Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { resolveRating } from "@/lib/reviews/rating";

interface ReviewRibbonProps {
  /**
   * Visual variant. `light` = white text on a dark hero. `dark` =
   * dark text on a light background section.
   */
  variant?: "light" | "dark";
  /**
   * Optional override for the rating value. Omit in normal use — the
   * ribbon resolves the verified figure itself. Rendered to one decimal.
   */
  ratingValue?: number;
  /**
   * Optional override for the review count. Omit in normal use.
   *
   * Rendered as an exact figure, never `N+`. The "+" implies a floor that
   * has not been established, and this number must match the
   * AggregateRating in the JSON-LD exactly.
   */
  reviewCount?: number;
  /** Layout — `compact` is a single line; `block` is a card. */
  layout?: "compact" | "block";
  /** Optional className to pin spacing. */
  className?: string;
}

/**
 * P7-33 — visible "4.9★ from 24 Google reviews" trust ribbon used on
 * course detail page heroes, /placements, and any other surface that
 * benefits from a same-context credibility nudge. Routes to /testimonials
 * so the click goes to our own flagship trust page first (where the full
 * Review + AggregateRating schema lives) rather than bouncing straight
 * to Google. AI engines reading the page see both the visible signal
 * AND the structured AggregateRating in the parent surface's JSON-LD.
 */
export async function ReviewRibbon({
  variant = "dark",
  ratingValue,
  reviewCount,
  layout = "compact",
  className,
}: ReviewRibbonProps) {
  // Resolved from the same source as the AggregateRating in the page's
  // JSON-LD, so the visible claim and the machine-readable one cannot
  // disagree. When no source is fresh enough to publish, the ribbon
  // renders nothing rather than a stale number — a missing trust badge is
  // recoverable, a wrong one that contradicts the profile is not.
  const { rating } = await resolveRating();
  const value = ratingValue ?? rating?.ratingValue;
  const count = reviewCount ?? rating?.ratingCount;
  if (value === undefined || count === undefined) return null;

  const lightText = variant === "light";

  if (layout === "compact") {
    return (
      <Link
        href="/testimonials"
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          lightText
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-secondary/10 text-foreground hover:bg-secondary/20"
        } ${className ?? ""}`}
      >
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.round(value)
                  ? "fill-secondary text-secondary"
                  : "text-muted-foreground/40"
              }`}
            />
          ))}
        </span>
        <span>
          <strong>{value.toFixed(1)}</strong> from {count} Google
          reviews
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/testimonials"
      className={`group inline-flex items-center gap-3 rounded-xl border p-4 transition-all ${
        lightText
          ? "border-white/20 bg-white/5 text-white hover:border-white/40"
          : "border-border bg-card hover:border-primary hover:shadow-md"
      } ${className ?? ""}`}
    >
      <ShieldCheck
        className={`h-8 w-8 shrink-0 ${
          lightText ? "text-secondary" : "text-primary"
        }`}
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{value.toFixed(1)}</span>
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(value)
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground/40"
                }`}
              />
            ))}
          </span>
          <span className="text-sm font-medium">/ 5</span>
        </div>
        <div className={`text-xs ${lightText ? "text-white/80" : "text-muted-foreground"}`}>
          From {count} verified Google reviews — read on /testimonials
        </div>
      </div>
    </Link>
  );
}
