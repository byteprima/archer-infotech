import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { LastUpdated } from "@/components/seo/last-updated";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import {
  questionCategories,
  getQuestionCategory,
} from "@/data/questions";

/**
 * P5-24 — Q&A category page.
 *
 * 10 Pune-context PAA-style answers per category, with FAQPage schema
 * for AI Overview + rich-result eligibility. Internal-link discipline
 * via each entry's optional relatedHref.
 */

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return questionCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getQuestionCategory(slug);
  if (!category) return { title: "Questions" };

  return buildPageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/questions/${slug}`,
    lastModified: EVERGREEN_LAST_REVIEWED,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getQuestionCategory(slug);
  if (!category) notFound();

  // FAQPage schema for the entire category
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.questions.map((q) => ({
      "@type": "Question",
      "@id": `https://archerinfotech.in/questions/${slug}#${q.id}`,
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
          { name: "Questions", url: "/questions" },
          { name: category.label, url: `/questions/${slug}` },
        ]}
      />

      <article aria-labelledby="page-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Questions", href: "/questions" },
                { name: category.label },
              ]}
            />
            <p className="uppercase text-xs tracking-wider opacity-80 mb-3 mt-2">
              FAQ Category · 2026
            </p>
            <h1
              id="page-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {category.h1}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              {category.intro}
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
          <DefinitiveAnswer eyebrow="On this page">
            {category.questions.length} answers to the most-asked questions
            in this category. Each answer is direct + verified (we don&apos;t
            fabricate stats). Where helpful, we link to deeper guides + tools
            + career pages so you can continue exploring.
          </DefinitiveAnswer>

          {/* Q&A list */}
          <section aria-labelledby="qa-list">
            <h2
              id="qa-list"
              className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3"
            >
              <MessageCircleQuestion className="h-7 w-7 text-secondary" />
              {category.label}
            </h2>
            <dl className="space-y-5">
              {category.questions.map((q) => (
                <div
                  key={q.id}
                  id={q.id}
                  className="rounded-lg border p-5 bg-card scroll-mt-24"
                >
                  <dt>
                    <h3 className="font-semibold text-lg leading-snug mb-2">
                      {q.question}
                    </h3>
                  </dt>
                  <dd className="space-y-3 text-sm">
                    <p className="text-muted-foreground leading-relaxed">
                      {q.answer}
                    </p>
                    {q.relatedHref && q.relatedLabel && (
                      <p>
                        <Link
                          href={q.relatedHref}
                          className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                        >
                          {q.relatedLabel}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Other categories */}
          <section
            aria-labelledby="other-categories"
            className="rounded-lg border bg-muted/30 p-5"
          >
            <h2
              id="other-categories"
              className="text-base font-semibold mb-3"
            >
              Browse other categories
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {questionCategories
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/questions/${c.slug}`}
                      className="text-primary hover:underline"
                    >
                      {c.label}{" "}
                      <span className="text-xs text-muted-foreground">
                        ({c.questions.length} Qs)
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Book a free demo class or speak with an admissions counsellor.
            Specific questions about your situation often get clearer answers
            from a direct conversation than an FAQ page.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/questions"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              All Q&amp;A categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
