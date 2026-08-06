import type { ReactNode } from "react";

interface DefinitiveAnswerProps {
  /**
   * Optional eyebrow heading rendered before the paragraph (e.g., "About
   * Archer Infotech"). Use a question that matches actual search queries —
   * it renders as a real `<h2>`, so the block reads to extractors as a
   * question with its answer directly beneath.
   */
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
 *
 * The eyebrow is an `<h2>`, not a styled `<p>`. It looks identical, but it
 * makes the block a real heading-plus-answer pair rather than two loose
 * paragraphs — which is what AI extractors and "top summary" heuristics
 * look for when deciding whether a page states its answer up front. The
 * `<h2>` is safe at every call site: this block always renders below the
 * page `<h1>`. Audit 2026-08-06.
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
            <h2 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-secondary mb-2">
              {eyebrow}
            </h2>
          )}
          <div className="text-base md:text-lg leading-relaxed text-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
