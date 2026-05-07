import type { ReactNode } from "react";

interface DefinitiveAnswerProps {
  /** Optional eyebrow heading rendered before the paragraph (e.g., "About Archer Infotech"). Use a question that matches actual search queries. */
  eyebrow?: string;
  /**
   * The factual, citation-friendly paragraph. ~60–120 words, every sentence
   * stands alone, no marketing puffery. AI engines lift this verbatim into
   * responses; Featured Snippets pull from it. P8-07.
   */
  children: ReactNode;
}

/**
 * Definitive Answer Paragraph (DAP) block.
 *
 * Renders a server-side, citation-friendly opening paragraph in the first
 * 100–150 words of body content. Pairs with the page's H1 hero so that
 * crawlers and AI engines see a quotable factual answer immediately after
 * the headline, before any marketing copy. P8-07.
 *
 * Visual treatment: prose-sized text inside a soft callout card with a
 * left accent bar. Subtle enough to not break hero designs, distinct
 * enough that humans read it as the page's elevator pitch.
 */
export function DefinitiveAnswer({ eyebrow, children }: DefinitiveAnswerProps) {
  return (
    <section
      aria-label={eyebrow ?? "Definitive answer"}
      className="border-y bg-muted/30"
    >
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="max-w-4xl mx-auto border-l-4 border-secondary pl-5 md:pl-6">
          {eyebrow && (
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-secondary mb-2">
              {eyebrow}
            </p>
          )}
          <div className="text-base md:text-lg leading-relaxed text-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
