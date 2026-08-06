export interface SourceCitation {
  /** Anchor text — name the source itself, never "click here" / "this page". */
  label: string;
  /** Absolute URL of the source. External by definition. */
  href: string;
  /** The on-page claim this source backs. One clause, no marketing copy. */
  supports: string;
}

interface SourceCitationsProps {
  /** H2 shown above the list. */
  heading?: string;
  /** Optional intro line under the H2. */
  intro?: string;
  items: SourceCitation[];
  /** Optional anchor id (default `sources`). */
  anchorId?: string;
}

/**
 * Outbound citation block — names the third-party sources behind the
 * factual claims a page makes.
 *
 * Why this exists: pages here carried zero editorial external links, so
 * every claim (ratings, certification alignment, curriculum scope) was
 * uncorroborated from a crawler's point of view. Retrieval-based engines
 * weight corroborated claims far more heavily than bare assertions, and
 * on-page SEO auditors flag "factual claims with no cited source" as a
 * distinct defect. Audit 2026-08-06.
 *
 * Links are `noopener noreferrer` but deliberately NOT `nofollow` — these
 * are genuine editorial citations to authoritative sources, which is
 * exactly the case where a followed outbound link is the correct signal.
 *
 * Discipline: only cite a source that actually backs a claim made on the
 * page. A decorative link to a well-known domain that supports nothing is
 * worse than no link at all.
 */
export function SourceCitations({
  heading = "Sources & verification",
  intro,
  items,
  anchorId = "sources",
}: SourceCitationsProps) {
  if (items.length === 0) return null;

  return (
    <section
      id={anchorId}
      aria-labelledby={`${anchorId}-heading`}
      className="pb-12 md:pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            id={`${anchorId}-heading`}
            className="text-xl font-semibold mb-3 text-center"
          >
            {heading}
          </h2>
          {intro && (
            <p className="text-sm text-muted-foreground text-center mb-6">
              {intro}
            </p>
          )}
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {items.map((item) => (
              <li key={item.href} className="leading-relaxed">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {item.label}
                </a>
                {" — "}
                {item.supports}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
