import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleQuestion, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import {
  interviewBank,
  totalQuestionCount,
  allQuestions,
} from "@/data/interview-questions";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";

/**
 * Pune IT Freshers Interview Questions Bank — server-rendered.
 *
 * AI engines disproportionately cite Q&A-organised content for "X interview
 * questions" long-tail queries. FAQPage schema covers the entire bank for
 * AI Overview + rich-result eligibility.
 */

export const metadata: Metadata = buildPageMetadata({
  title: `${totalQuestionCount()}+ Pune IT Fresher Interview Questions (2026)`,
  description: `${totalQuestionCount()} interview questions Pune freshers actually face in 2026 — behavioural, DSA, Java + Spring Boot, Python, Full Stack, Cloud / DevOps, SQL, system design — with concrete answers and Pune-specific context.`,
  path: "/interview-questions/pune-it-freshers-2026",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

export default function InterviewQuestionsPage() {
  const questions = allQuestions();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      "@id": `https://archerinfotech.in/interview-questions/pune-it-freshers-2026#${q.slug}`,
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Interview Questions", url: "/interview-questions/pune-it-freshers-2026" },
        ]}
      />

      <article aria-labelledby="page-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Interview Questions" }]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              Interview Prep · Pune IT · 2026
            </p>
            <h1
              id="page-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {totalQuestionCount()}+ Pune IT Fresher Interview Questions (2026)
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              The questions Pune freshers actually face in 2026 — behavioural,
              DSA, Java + Spring Boot, Python, Full Stack, Cloud / DevOps,
              SQL, system design. Concrete answers with Pune-specific
              context. Built from 17 years of placement-cell interview
              debriefs.
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
          <DefinitiveAnswer eyebrow="How to use this bank">
            Practice these {totalQuestionCount()} questions aloud, not just
            silently — Pune fresher interviews are as much about
            clear-communication signal as technical correctness. Use the
            category nav to focus on your weakest areas. Aim for
            45-60 minutes per category in the 2 weeks before active
            applications. For technical questions, walk through your
            approach verbally before coding; interviewers reward clear
            structure even when the final code has bugs.
          </DefinitiveAnswer>

          {/* Quick nav */}
          <nav
            aria-label="Question categories"
            className="rounded-lg border bg-muted/30 p-5"
          >
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-secondary" />
              Jump to category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2">
              {interviewBank.map((block) => (
                <Link
                  key={block.category}
                  href={`#cat-${block.category}`}
                  className="text-sm text-primary hover:underline flex items-baseline gap-2"
                >
                  {block.label}
                  <span className="text-xs text-muted-foreground">
                    ({block.questions.length})
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Questions by category */}
          {interviewBank.map((block) => (
            <section
              key={block.category}
              id={`cat-${block.category}`}
              aria-labelledby={`cat-${block.category}-heading`}
              className="scroll-mt-24"
            >
              <h2
                id={`cat-${block.category}-heading`}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {block.label}
              </h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {block.intro}
              </p>
              <ol className="space-y-5">
                {block.questions.map((q, i) => (
                  <li
                    key={q.slug}
                    id={q.slug}
                    className="rounded-lg border p-5 bg-card scroll-mt-24"
                  >
                    <h3 className="font-semibold text-base mb-3 flex items-start gap-2">
                      <span className="text-secondary font-mono text-sm shrink-0">
                        Q{i + 1}.
                      </span>
                      {q.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {q.answer}
                    </p>
                    {q.puneNote && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2 italic">
                        <span className="font-medium text-foreground not-italic">
                          Pune note:
                        </span>{" "}
                        {q.puneNote}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}

          {/* CTA */}
          <section className="rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h2 className="text-lg font-bold mb-2">
              Past Q&amp;A practice — what about real mock interviews?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Archer Infotech placement cell runs 2 technical + 1 HR
              mock interviews per week for active job-seekers as part of
              every placement-bundled course. See the{" "}
              <Link
                href="/career-paths/first-it-job-pune"
                className="text-primary hover:underline font-medium"
              >
                First IT Job in Pune
              </Link>{" "}
              pillar for the full 90-day fresher search playbook + the{" "}
              <Link
                href="/guides/leetcode-patterns-pune-fresher-it-interviews-2026"
                className="text-primary hover:underline font-medium"
              >
                LeetCode Patterns guide
              </Link>{" "}
              for the DSA prep map.
            </p>
          </section>
        </div>
      </article>

      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your IT career?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our placement-backed courses cover the technical depth + the
            interview preparation + direct introductions to Pune hiring
            managers. Book a free demo to map a personalised plan.
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
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies referenced on this page."
        items={sourcesForTopics(["java", "python", "javascript", "data-science"])}
      />

    </>
  );
}
