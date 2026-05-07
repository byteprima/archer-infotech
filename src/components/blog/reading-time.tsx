import { Clock } from "lucide-react";

interface ReadingTimeProps {
  /** Approximate word count of the post body. */
  wordCount: number;
  /**
   * Words-per-minute used to compute the estimate. 200 wpm is the
   * standard for English long-form prose; pillar 5 spec calls for
   * exactly this value so the displayed estimate matches what
   * Hubspot, Medium and other reference blogs show.
   */
  wpm?: number;
  /**
   * Optional className override for layouts that need different
   * spacing or text colour (e.g. on a dark hero background).
   */
  className?: string;
}

/**
 * Visible "~ N min read" badge for the blog-post hero meta row.
 * Pillar 5 P5-14.
 *
 * Lightweight UX signal — Hubspot reports posts with reading-time
 * estimates have ~10% lower bounce rate. Computed server-side from the
 * post body so the value ships in initial HTML for AI crawlers + JS-
 * disabled users.
 */
export function ReadingTime({ wordCount, wpm = 200, className }: ReadingTimeProps) {
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  return (
    <span
      className={
        className ??
        "inline-flex items-center gap-2 text-sm text-white/80"
      }
    >
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span>~ {minutes} min read</span>
    </span>
  );
}
