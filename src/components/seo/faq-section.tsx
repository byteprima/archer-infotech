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
 * Server-rendered FAQ block — semantic <details>/<summary> markup so the
 * answer text ships in initial HTML (Googlebot, AI engines and JS-disabled
 * users all see it). Pairs with FAQPage JSON-LD so AI engines can lift the
 * Q&A pairs verbatim. P8-08.
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
            {items.map((faq, idx) => (
              <li key={faq.question}>
                <details
                  className="group rounded-lg border border-border bg-card text-card-foreground transition-colors hover:bg-accent/30 open:bg-card open:hover:bg-card"
                  open={idx === 0}
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base md:text-lg font-semibold leading-snug">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-sm font-bold transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {/* Answer is a plain paragraph — short, factual, liftable
                        as an AI snippet (40–60 words target per pillar 8). */}
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {withSchema && <FAQJsonLd faqs={items} />}
    </section>
  );
}
