/**
 * SVG-sprite icons.
 *
 * lucide-react renders each icon as a full inline <svg> with its complete
 * path(s) every time it's used. On the homepage that meant the same
 * star/check/arrow markup duplicated 30/12/11 times — kilobytes of repeated
 * markup and dozens of SVG subtrees for the mobile browser to parse. Here
 * each icon's geometry is defined ONCE in <IconSprite/> and referenced via
 * <use>, so the paths are parsed once and the HTML shrinks.
 *
 * Render <IconSprite/> exactly once per page (near the top of the tree), then
 * use <SpriteIcon/> / <StarRating/> anywhere on that page. Color and fill come
 * from each instance's className, exactly as with the original lucide icons.
 */

// Shared presentation attrs — inherited by each symbol's paths, matching
// lucide's defaults so output is pixel-identical to the previous icons.
const SYMBOL_ATTRS = {
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Geometry copied byte-identical from lucide-react v1.7.0.
export function IconSprite() {
  return (
    <svg width="0" height="0" className="hidden" aria-hidden="true">
      <symbol id="icon-star" {...SYMBOL_ATTRS}>
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </symbol>
      <symbol id="icon-check" {...SYMBOL_ATTRS}>
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </symbol>
      <symbol id="icon-arrow-right" {...SYMBOL_ATTRS}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </symbol>
    </svg>
  );
}

type SpriteName = "star" | "check" | "arrow-right";

// Drop-in replacement for a lucide icon. fill="none" stroke="currentColor"
// mirror lucide's defaults; a fill-* className (e.g. on stars) overrides fill
// via CSS just as it did on the original <Star>.
export function SpriteIcon({
  name,
  className,
}: {
  name: SpriteName;
  className?: string;
}) {
  return (
    <svg className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <use href={`#icon-${name}`} />
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
        <SpriteIcon key={i} name="star" className="h-4 w-4 fill-secondary text-secondary" />
      ))}
    </div>
  );
}
