/**
 * One colour per course category, used by every course dropdown on the site.
 *
 * Defined once so the picker on /contact, the counsellor dialog, the offer
 * popup and the chat widget cannot drift apart — a visitor who sees "Data & AI"
 * in violet on one form should see violet on all of them.
 *
 * Class names are written out in full rather than composed (`text-${hue}-700`),
 * because Tailwind scans source text for literal class names and would strip
 * anything it cannot see written down.
 *
 * Colour is deliberately a *secondary* cue: every group still carries its name
 * as text, so nothing is lost if the colours are indistinguishable to the
 * reader. Each pair is a light/dark variant so the labels stay legible in both
 * themes rather than washing out on the dark background.
 */

export interface CategoryColor {
  /** Small filled dot beside the group name and each course row. */
  dot: string;
  /** Group heading text colour. */
  text: string;
  /** Left rule running down the group, tinted to match. */
  border: string;
  /**
   * Row background: a faint wash of the category hue, plus a stronger wash on
   * hover. Expressed as alpha over the popover background rather than a fixed
   * shade, so the same value works in light and dark themes.
   */
  row: string;
  /** Row background once the course is selected — same hue, stronger again. */
  rowSelected: string;
}

/** Fallback for a category slug not listed here (e.g. a newly added one). */
export const DEFAULT_CATEGORY_COLOR: CategoryColor = {
  dot: "bg-muted-foreground",
  text: "text-muted-foreground",
  border: "border-border",
  row: "bg-muted/30 hover:bg-muted",
  rowSelected: "bg-muted",
};

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  programming: {
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-500/40",
    row: "bg-blue-500/[0.07] hover:bg-blue-500/20",
    rowSelected: "bg-blue-500/30",
  },
  "full-stack-development": {
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-500/40",
    row: "bg-violet-500/[0.07] hover:bg-violet-500/20",
    rowSelected: "bg-violet-500/30",
  },
  "modern-web": {
    dot: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-500/40",
    row: "bg-sky-500/[0.07] hover:bg-sky-500/20",
    rowSelected: "bg-sky-500/30",
  },
  "cloud-devops": {
    dot: "bg-cyan-500",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-500/40",
    row: "bg-cyan-500/[0.07] hover:bg-cyan-500/20",
    rowSelected: "bg-cyan-500/30",
  },
  "cloud-certifications": {
    dot: "bg-teal-500",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-500/40",
    row: "bg-teal-500/[0.07] hover:bg-teal-500/20",
    rowSelected: "bg-teal-500/30",
  },
  "data-ai": {
    dot: "bg-fuchsia-500",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    border: "border-fuchsia-500/40",
    row: "bg-fuchsia-500/[0.07] hover:bg-fuchsia-500/20",
    rowSelected: "bg-fuchsia-500/30",
  },
  "generative-ai": {
    dot: "bg-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-500/40",
    row: "bg-purple-500/[0.07] hover:bg-purple-500/20",
    rowSelected: "bg-purple-500/30",
  },
  "mobile-app-development": {
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500/40",
    row: "bg-emerald-500/[0.07] hover:bg-emerald-500/20",
    rowSelected: "bg-emerald-500/30",
  },
  "database-technologies": {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-500/40",
    row: "bg-amber-500/[0.07] hover:bg-amber-500/20",
    rowSelected: "bg-amber-500/30",
  },
  "testing-qa": {
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-500/40",
    row: "bg-rose-500/[0.07] hover:bg-rose-500/20",
    rowSelected: "bg-rose-500/30",
  },
  salesforce: {
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-500/40",
    row: "bg-orange-500/[0.07] hover:bg-orange-500/20",
    rowSelected: "bg-orange-500/30",
  },
  bootcamps: {
    dot: "bg-lime-600",
    text: "text-lime-700 dark:text-lime-300",
    border: "border-lime-600/40",
    row: "bg-lime-500/[0.07] hover:bg-lime-500/20",
    rowSelected: "bg-lime-500/30",
  },
};

export function categoryColor(slug: string): CategoryColor {
  return CATEGORY_COLORS[slug] ?? DEFAULT_CATEGORY_COLOR;
}
