import { formatLastReviewed } from "@/lib/seo/content-dates";

interface LastUpdatedProps {
  /** ISO date string. Renders as a `<time>` element with `dateTime`. */
  iso: string;
  /**
   * Optional label override. Default: "Last updated". Some surfaces
   * prefer "Last reviewed" — both are acceptable freshness signals.
   */
  label?: string;
  /**
   * Optional className override for layout containers that want different
   * spacing or alignment.
   */
  className?: string;
}

/**
 * Visible "Last updated: {date}" stamp for long-form content pages.
 *
 * Pairs with the `dateModified` field in Course / Article / BlogPosting
 * JSON-LD so that the freshness signal is duplicated in both human-
 * readable and machine-readable form. Pillar 3 P3-18.
 *
 * Visual weight is intentionally low — this is a trust signal, not a
 * design element.
 */
export function LastUpdated({
  iso,
  label = "Last updated",
  className,
}: LastUpdatedProps) {
  return (
    <p
      className={
        className ??
        "text-xs md:text-sm text-muted-foreground"
      }
    >
      {label}:{" "}
      <time dateTime={iso} className="font-medium text-foreground">
        {formatLastReviewed(iso)}
      </time>
    </p>
  );
}
