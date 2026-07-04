import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale, CheckCircle, GraduationCap } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { comparisons, getComparison } from "@/data/comparisons";
import { getCourse } from "@/data/courses";
import { buildPageMetadata } from "@/lib/seo";
import { summariseToMeta } from "@/lib/seo/meta-trim";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) return { title: "Comparison Not Found" };

  return buildPageMetadata({
    title: cmp.metaTitle,
    // P3-22 — clamp to Google's mobile snippet band (14 compares had
    // data-side descriptions over 180 chars per the audit).
    description: summariseToMeta(cmp.metaDescription, 175),
    path: `/compare/${slug}`,
    lastModified: EVERGREEN_LAST_REVIEWED,
  });
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const cmp = getComparison(slug);
  if (!cmp) notFound();

  const courses = cmp.relatedCourseSlugs
    .map((s) => getCourse(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Related comparisons — sibling cross-links so each compare page sits in a
  // topic graph instead of being reachable only from the 30-item hub. Score
  // by shared meaningful slug tokens (topic words like "python", "devops").
  const STOP = new Set([
    "vs", "for", "pune", "2026", "the", "and", "in", "a", "an", "of", "to",
    "career", "developers", "engineers", "developer", "engineer",
  ]);
  const tokensOf = (s: string) =>
    new Set(s.split("-").filter((t) => t.length > 1 && !STOP.has(t)));
  const myTokens = tokensOf(cmp.slug);
  const relatedComparisons = comparisons
    .filter((c) => c.slug !== cmp.slug)
    .map((c) => {
      const shared = [...tokensOf(c.slug)].filter((t) => myTokens.has(t)).length;
      return { c, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 4)
    .map((x) => x.c);

  return (
    <>
      <PageEvent event="comparison_page_viewed" properties={{ comparison_slug: slug }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
          { name: cmp.shortLabel, url: `/compare/${slug}` },
        ]}
      />

      <article aria-labelledby="compare-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Compare", href: "/compare" }, { name: cmp.shortLabel }]}
            />
            <h1
              id="compare-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {cmp.h1}
            </h1>
            <p className="text-lg text-white/85">
              {cmp.optionA} vs {cmp.optionB} — an honest comparison for Pune learners.
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
          {/* Verdict / TL;DR */}
          <DefinitiveAnswer eyebrow="The short answer">{cmp.verdict}</DefinitiveAnswer>

          {/* Comparison table — the most-cited element */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Scale className="h-7 w-7 text-secondary" />
              {cmp.optionA} vs {cmp.optionB} — side by side
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Factor</th>
                    <th className="text-left p-3 font-semibold text-primary">{cmp.optionA}</th>
                    <th className="text-left p-3 font-semibold text-primary">{cmp.optionB}</th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.table.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 font-medium">{row.factor}</td>
                      <td className="p-3 text-muted-foreground">{row.a}</td>
                      <td className="p-3 text-muted-foreground">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When A */}
          <section className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">{cmp.whenA.heading}</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              {cmp.whenA.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* When B */}
          <section className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">{cmp.whenB.heading}</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              {cmp.whenB.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Bottom line */}
          <section className="rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-secondary" />
              The bottom line
            </h2>
            <p className="text-muted-foreground leading-relaxed">{cmp.bottomLine}</p>
          </section>

          {/* Related courses */}
          {courses.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-secondary" />
                Train for either path at Archer Infotech
              </h2>
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.categorySlug}/${c.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {c.title} Training in Pune →
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related comparisons — sibling cross-links */}
          {relatedComparisons.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Scale className="h-7 w-7 text-secondary" />
                Related comparisons
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedComparisons.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {c.optionA} vs {c.optionB} →
                  </Link>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                See all{" "}
                <Link href="/compare" className="text-primary hover:underline font-medium">
                  IT course &amp; career comparisons
                </Link>
                .
              </p>
            </section>
          )}

          {/* FAQ */}
          <FaqSection
            heading={`${cmp.shortLabel} — FAQs`}
            intro={`Common questions comparing ${cmp.optionA} and ${cmp.optionB}.`}
            items={cmp.faqs}
          />

          {/* P5-17 — newsletter banner. */}
          <NewsletterSignupForm
            placement={`compare:${slug}`}
            variant="banner"
            headline="Pune IT careers — monthly briefing"
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Still deciding?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free counselling session and we&apos;ll help you pick the right
            path for your goals — then map the courses to get you there.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ location: "compare_cta", comparison_slug: slug }}
            >
              Book Free Counselling
            </TrackedLink>
            <Link
              href="/tools/pune-it-salary-calculator"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Compare salaries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
