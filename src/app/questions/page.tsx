import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleQuestion, ArrowRight, BookOpenCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import {
  questionCategories,
  totalQuestionsAcrossCategories,
} from "@/data/questions";

/**
 * P5-24 — PAA / Q&A hub at /questions.
 *
 * Aggregates the most-asked People-Also-Ask style questions about
 * Archer Infotech + Pune IT careers. Distinct from /interview-questions
 * (which targets interview-prep queries).
 */

export const metadata: Metadata = buildPageMetadata({
  // P3-22 title compaction — original 69-char title pushed over the
  // 60-char Google snippet budget; this ≤49-char form keeps the count
  // + the dual-topic positioning + brand.
  title: `${totalQuestionsAcrossCategories()} FAQs: Pune IT Careers + Archer Infotech (2026)`,
  description: `${totalQuestionsAcrossCategories()} most-asked questions about Pune IT careers + Archer Infotech in 2026 — salaries, courses, fees, placements, admissions, bootcamps, batch formats. Honest answers with verified facts.`,
  path: "/questions",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

export default function QuestionsHub() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Questions", url: "/questions" },
        ]}
      />
      {/* P8-04 wave 4 — CollectionPage exposing question categories. The
          individual /questions/[slug] pages already emit FAQPage schema;
          this is the hub-level ItemList that ties categories together. */}
      <CategoryCollectionJsonLd
        name="Pune IT Careers + Archer Infotech — FAQs"
        description="Question categories spanning Pune IT careers and Archer Infotech — salaries, courses, fees, placements, admissions, bootcamps, batch formats. Verified facts only."
        url="/questions"
        items={questionCategories.map((c) => ({
          name: c.label,
          url: `/questions/${c.slug}`,
          description: c.intro,
        }))}
      />

      <article aria-labelledby="hub-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs variant="light" items={[{ name: "Questions" }]} />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              FAQs · Pune IT + Archer Infotech · 2026
            </p>
            <h1
              id="hub-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              Pune IT Careers + Archer Infotech — {totalQuestionsAcrossCategories()} Questions Answered
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Honest answers to the {totalQuestionsAcrossCategories()} questions
              prospective students + parents + career changers most often ask
              about IT careers in Pune + how Archer Infotech fits in. Verified
              facts only; no fabricated stats.
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
          <DefinitiveAnswer eyebrow="How to use this hub">
            Pick the category most relevant to what you&apos;re trying to
            decide. Each category page contains 10 detailed answers to the
            most-asked questions in that area, with internal links to
            deeper guides + career path pages + tools. If your specific
            question isn&apos;t here, the contact page connects you to an
            admissions counsellor who can help.
          </DefinitiveAnswer>

          {/* Category grid */}
          <section aria-labelledby="categories">
            <h2
              id="categories"
              className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3"
            >
              <MessageCircleQuestion className="h-7 w-7 text-secondary" />
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/questions/${cat.slug}`}
                  className="rounded-lg border p-5 bg-card hover:border-secondary transition-colors flex flex-col"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{cat.label}</h3>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {cat.questions.length} Qs
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {cat.intro}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3">
                    Browse answers
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related-content CTAs */}
          <section className="rounded-lg border bg-muted/30 p-6 space-y-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-secondary" />
              Looking for something else?
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/interview-questions/pune-it-freshers-2026"
                  className="text-primary hover:underline font-medium"
                >
                  → Pune IT Fresher Interview Questions Bank
                </Link>{" "}
                — 35 questions interviewers ask (different from PAA-style
                questions above).
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="text-primary hover:underline font-medium"
                >
                  → Pune IT Glossary
                </Link>{" "}
                — 28 term definitions (Java FS, MERN, LangChain, GCC, CTC,
                ISTQB, etc.).
              </li>
              <li>
                <Link
                  href="/career-paths"
                  className="text-primary hover:underline font-medium"
                >
                  → Pune IT Career Paths
                </Link>{" "}
                — Long-form roadmaps for Java, Python, Full Stack, Data
                Science / AI, First IT Job, Cloud / DevOps.
              </li>
              <li>
                <Link
                  href="/tools/pune-it-salary-calculator"
                  className="text-primary hover:underline font-medium"
                >
                  → Pune IT Salary Calculator
                </Link>{" "}
                — Interactive role × experience × employer-type bands.
              </li>
              <li>
                <Link
                  href="/about/facts"
                  className="text-primary hover:underline font-medium"
                >
                  → Archer Infotech Fact Sheet
                </Link>{" "}
                — Verified institute facts (founded 2009, 10K+ trained, 90%
                placement rate, 126+ Google reviews).
              </li>
            </ul>
          </section>
        </div>
      </article>

      {/* Closing CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Question not answered here?
          </h2>
          <p className="text-muted-foreground mb-6">
            Speak with an admissions counsellor (we don&apos;t do hard-sell
            scripts) or book a free demo class. Often the fastest way to
            decide is to attend one demo + ask the trainer directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/career-paths"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See career paths
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
