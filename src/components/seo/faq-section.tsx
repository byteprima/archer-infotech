import { FAQJsonLd } from "@/components/seo/json-ld";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  /** H2 shown above the FAQ list. */
  heading: string;
  /** Optional intro line under the H2. */
  intro?: string;
  /** Item list. The first item is open by default; the rest are collapsed. */
  items: FaqItem[];
  /**
   * Optional anchor id (default `faqs`). Used by anchor links and ToC.
   */
  anchorId?: string;
  /**
   * Whether this FAQ block should emit a FAQPage JSON-LD payload (default
   * true). Disable on pages that already inject a FAQPage payload elsewhere
   * (e.g., course detail pages) to avoid duplicate `@type: FAQPage` blocks.
   */
  withSchema?: boolean;
}

/**
 * Split an answer into a lead paragraph (the direct answer) and the rest.
 *
 * Sentence boundaries are only honoured where a terminator is followed by
 * whitespace and then a capital letter or `₹`. That guard keeps address and
 * numeric fragments intact — "Flat No. 12" does not split, because `1` is
 * not an uppercase letter.
 *
 * A bare "Yes." / "No." opener is not a usable standalone answer, so the
 * lead keeps absorbing sentences until it carries real information.
 */
export function splitLeadAnswer(answer: string): [lead: string, rest: string] {
  const sentences = answer.split(/(?<=[.!?])\s+(?=[A-Z₹])/);
  if (sentences.length <= 1) return [answer, ""];

  let cut = 1;
  while (
    cut < sentences.length &&
    sentences.slice(0, cut).join(" ").length < 60
  ) {
    cut += 1;
  }

  return [sentences.slice(0, cut).join(" "), sentences.slice(cut).join(" ")];
}

/**
 * Server-rendered FAQ block — semantic markup so the answer text ships in
 * initial HTML (Googlebot, AI engines and JS-disabled users all see it).
 * Pairs with FAQPage JSON-LD so AI engines can lift the Q&A pairs verbatim.
 * P8-08.
 *
 * The lead sentence of every answer renders OUTSIDE the <details>, as the
 * immediate next sibling of the <h3>. Answers used to live entirely inside
 * <details>, which made them a sibling of <summary> rather than of the
 * heading — extractors that chunk by heading proximity (AI Overviews,
 * ChatGPT search, Perplexity) therefore saw questions with no adjacent
 * answer. Google and the FAQPage payload were always fine; this is purely
 * about passage-level extractability. Only the remainder stays collapsed,
 * so the block keeps its compact accordion feel.
 *
 * Visual design intentionally simple — Tailwind utility classes only, no
 * shadcn dependency, so this works on every public page without breaking
 * SSR.
 */
export function FaqSection({
  heading,
  intro,
  items,
  anchorId = "faqs",
  withSchema = true,
}: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      id={anchorId}
      aria-labelledby={`${anchorId}-heading`}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            id={`${anchorId}-heading`}
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
          >
            {heading}
          </h2>
          {intro && (
            <p className="text-muted-foreground text-center mb-8 md:mb-10">
              {intro}
            </p>
          )}
          <ul className="space-y-3 list-none p-0">
            {items.map((faq, idx) => {
              const [lead, rest] = splitLeadAnswer(faq.answer);

              return (
                <li
                  key={faq.question}
                  className="rounded-lg border border-border bg-card text-card-foreground"
                >
                  <h3 className="px-5 pt-4 text-base md:text-lg font-semibold leading-snug">
                    {faq.question}
                  </h3>
                  {/* Direct answer — the <h3>'s immediate next sibling, and
                      short, factual and liftable as an AI snippet (40–60
                      words target per pillar 8). */}
                  <p
                    className={`px-5 pt-2 text-sm md:text-base text-muted-foreground leading-relaxed ${
                      rest ? "pb-3" : "pb-4"
                    }`}
                  >
                    {lead}
                  </p>
                  {rest && (
                    <details className="group border-t border-border" open={idx === 0}>
                      <summary className="flex cursor-pointer items-center gap-2 px-5 py-3 list-none text-sm font-medium text-primary transition-colors hover:bg-accent/30 [&::-webkit-details-marker]:hidden">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                        <span className="group-open:hidden">Read more</span>
                        <span className="hidden group-open:inline">Show less</span>
                      </summary>
                      <p className="px-5 pb-5 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {rest}
                      </p>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {withSchema && <FAQJsonLd faqs={items} />}
    </section>
  );
}
