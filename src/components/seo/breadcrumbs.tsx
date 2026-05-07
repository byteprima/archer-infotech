import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  /** Visible label, e.g. "Programming" or "Python Training in Pune". */
  name: string;
  /**
   * Absolute path on the site (e.g. "/courses/programming"). The leaf item
   * (the current page) should pass `undefined` so it renders as plain text
   * with `aria-current="page"` and no anchor.
   */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Visual variant: "light" for dark backgrounds, "dark" (default) for light. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Visible breadcrumb navigation, mirrors the existing `BreadcrumbJsonLd`
 * (Schema.org BreadcrumbList) on every non-home page. Renders semantic
 * `<nav aria-label="Breadcrumb"><ol>...</ol></nav>` so screen readers,
 * Googlebot and AI crawlers all get a clean structure. Leaf is plain text
 * with `aria-current="page"` per WCAG.
 *
 * Usage:
 *   <Breadcrumbs items={[
 *     { name: "Courses", href: "/courses" },
 *     { name: "Programming", href: "/courses/programming" },
 *     { name: "Python Training in Pune" },  // current page, no href
 *   ]} />
 *
 * Home is auto-prefixed; do NOT pass it in `items`.
 */
export function Breadcrumbs({ items, variant = "dark", className = "" }: BreadcrumbsProps) {
  if (!items.length) return null;

  const linkClass =
    variant === "light"
      ? "text-white/80 hover:text-white"
      : "text-muted-foreground hover:text-primary";
  const sepClass = variant === "light" ? "text-white/50" : "text-muted-foreground/60";
  const currentClass = variant === "light" ? "text-white" : "text-foreground";

  return (
    <nav aria-label="Breadcrumb" className={`mb-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li className="flex items-center gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1 transition-colors ${linkClass}`}
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-2">
              <ChevronRight className={`h-3.5 w-3.5 ${sepClass}`} aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className={`transition-colors ${linkClass}`}>
                  {item.name}
                </Link>
              ) : (
                <span className={`font-medium ${currentClass}`} aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
