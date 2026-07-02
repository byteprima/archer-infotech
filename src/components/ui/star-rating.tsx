/**
 * SVG-sprite star rating.
 *
 * Replaces per-star inline <Star> icons (lucide-react), which duplicated the
 * full ~650B star path 30× in the homepage HTML (6 testimonials × 5 stars).
 * The geometry is now defined ONCE via <StarSprite/>, and each star is a
 * lightweight <use href="#icon-star"/> reference — less HTML to parse and
 * fewer path strings for the browser to build on mobile.
 *
 * Usage: render <StarSprite/> exactly once per page (e.g. at a section root),
 * then use <StarRating/> anywhere below it.
 */

// Exact lucide-react "star" geometry (v1.7.0), kept byte-identical so output
// matches the previous <Star> render pixel-for-pixel. Color/stroke are left
// off the symbol so each <StarRating/> instance controls them via className
// (fill-secondary text-secondary), exactly as the old <Star> did.
export function StarSprite() {
  return (
    <svg width="0" height="0" className="hidden" aria-hidden="true">
      <symbol
        id="icon-star"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
    </svg>
  );
}

export function StarRating({
  count = 5,
  className = "flex items-center gap-1 mt-4",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-secondary text-secondary"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <use href="#icon-star" />
        </svg>
      ))}
    </div>
  );
}
