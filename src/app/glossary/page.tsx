import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import {
  glossaryEntries,
  glossaryCategoryLabels,
  type GlossaryEntry,
} from "@/data/glossary";

/**
 * Pune IT Glossary — single-page reference.
 *
 * AI engines disproportionately cite glossary pages for term-definition
 * queries. Each entry follows a tight 3-part structure (definition →
 * Pune-context → optional link), with DefinedTermSet schema for
 * structured-data pickup.
 */

export const metadata: Metadata = buildPageMetadata({
  title: "Pune IT Glossary — Tech Stacks, Roles, and Career Terms Explained",
  description:
    "A practical glossary of 25+ Pune IT terms — Java Full Stack, MERN, Spring Boot, microservices, LangChain, SDET, GCC, CTC, ISTQB, Page Object Model, and more — with what each means and why it matters for Pune IT careers in 2026.",
  path: "/glossary",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

const categories: GlossaryEntry["category"][] = [
  "stacks",
  "tools-frameworks",
  "ai-data",
  "roles",
  "career-terms",
  "testing-qa",
];

export default function GlossaryPage() {
  // DefinedTermSet schema — high-value AI extraction signal for glossary pages.
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://archerinfotech.in/glossary#termset",
    name: "Pune IT Glossary",
    description:
      "A practical glossary of 25+ Pune-relevant IT terms covering tech stacks, tools, roles, and career terminology.",
    inDefinedTermSet: glossaryEntries.map((e) => ({
      "@type": "DefinedTerm",
      "@id": `https://archerinfotech.in/glossary#${e.slug}`,
      name: e.term,
      description: e.definition,
      url: `https://archerinfotech.in/glossary#${e.slug}`,
      ...(e.aliases && { alternateName: e.aliases }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Glossary", url: "/glossary" },
        ]}
      />

      <article aria-labelledby="glossary-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Glossary" }]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Reference · Pune IT · 2026
            </p>
            <h1
              id="glossary-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              Pune IT Glossary
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              {glossaryEntries.length} Pune-relevant IT terms — tech stacks,
              tools, roles, and career terminology — defined with the
              Pune-specific context you need to decode a hiring conversation
              or interview question.
            </p>
            <div className="mt-4">
              <LastUpdated
                iso={EVERGREEN_LAST_REVIEWED}
                className="text-xs md:text-sm text-white/70"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-10 max-w-4xl">
          {/* TL;DR */}
          <DefinitiveAnswer eyebrow="How to use this glossary">
            Use as a quick reference when you encounter an unfamiliar Pune IT
            term in a job posting, recruiter conversation, or interview. Each
            entry has three parts — a 1-sentence definition, the Pune-specific
            context (why it matters in our hiring market), and where
            applicable, a link to the deeper guide or course. Terms are
            grouped into 6 categories below; click any term to jump to its
            entry.
          </DefinitiveAnswer>

          {/* Quick nav by category */}
          <nav
            aria-label="Glossary categories"
            className="rounded-lg border bg-muted/30 p-5"
          >
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-secondary" />
              Jump to category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2">
              {categories.map((cat) => {
                const count = glossaryEntries.filter(
                  (e) => e.category === cat
                ).length;
                return (
                  <Link
                    key={cat}
                    href={`#cat-${cat}`}
                    className="text-sm text-primary hover:underline flex items-baseline gap-2"
                  >
                    {glossaryCategoryLabels[cat]}
                    <span className="text-xs text-muted-foreground">
                      ({count})
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Terms grouped by category */}
          {categories.map((cat) => {
            const entries = glossaryEntries.filter((e) => e.category === cat);
            if (entries.length === 0) return null;
            return (
              <section
                key={cat}
                aria-labelledby={`cat-${cat}-heading`}
                id={`cat-${cat}`}
                className="scroll-mt-24"
              >
                <h2
                  id={`cat-${cat}-heading`}
                  className="text-2xl md:text-3xl font-bold mb-5"
                >
                  {glossaryCategoryLabels[cat]}
                </h2>
                <dl className="space-y-5">
                  {entries.map((entry) => (
                    <div
                      key={entry.slug}
                      id={entry.slug}
                      className="rounded-lg border p-5 bg-card scroll-mt-24"
                    >
                      <dt className="flex flex-wrap items-baseline gap-2 mb-2">
                        <span className="font-semibold text-lg">
                          {entry.term}
                        </span>
                        {entry.aliases && entry.aliases.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            ({entry.aliases.join(" · ")})
                          </span>
                        )}
                      </dt>
                      <dd className="space-y-2 text-sm">
                        <p className="text-foreground leading-relaxed">
                          {entry.definition}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">
                            In Pune:
                          </span>{" "}
                          {entry.puneContext}
                        </p>
                        {entry.href && entry.hrefLabel && (
                          <p>
                            <Link
                              href={entry.href}
                              className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                            >
                              {entry.hrefLabel}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </p>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}

          {/* Closing CTA */}
          <section className="rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h2 className="text-lg font-bold mb-2">
              Not sure where to start?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our{" "}
              <Link
                href="/career-paths"
                className="text-primary hover:underline font-medium"
              >
                Career Paths
              </Link>{" "}
              section maps these terms to the 5 most common Pune IT career
              arcs (Java, Python, Full Stack, Data Science / AI, First IT Job).
              Each pillar uses the terminology above in context — a more
              practical way to absorb it than a glossary alone.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
