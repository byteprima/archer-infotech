import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListChecks, Database, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForGuide } from "@/data/guide-sources";
import { listicles, getListicle } from "@/data/listicles";
import { buildPageMetadata } from "@/lib/seo";
import { summariseToMeta } from "@/lib/seo/meta-trim";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { getRecommendedCourseForGuide } from "@/lib/seo/guide-to-course";
import { GraduationCap } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listicles.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getListicle(slug);
  if (!guide) return { title: "Guide Not Found" };

  return buildPageMetadata({
    title: guide.metaTitle,
    // P3-22 — clamp to Google's mobile snippet band (22 guides had
    // data-side descriptions over 180 chars per the audit).
    description: summariseToMeta(guide.metaDescription, 175),
    path: `/guides/${slug}`,
    lastModified: EVERGREEN_LAST_REVIEWED,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getListicle(slug);
  if (!guide) notFound();

  // Related guides — sibling cross-links so each guide sits in a topic graph
  // instead of being reachable only from the /guides hub. Score by shared
  // meaningful slug tokens (topic words like "python", "devops", "interview").
  const STOP = new Set([
    "for", "pune", "2026", "the", "and", "in", "a", "an", "of", "to", "best",
    "top", "freshers", "engineers", "developers", "make",
  ]);
  const tokensOf = (s: string) =>
    new Set(s.split("-").filter((t) => t.length > 1 && !STOP.has(t)));
  const myTokens = tokensOf(guide.slug);
  const relatedGuides = listicles
    .filter((l) => l.slug !== guide.slug)
    .map((l) => {
      const shared = [...tokensOf(l.slug)].filter((t) => myTokens.has(t)).length;
      return { l, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 4)
    .map((x) => x.l);

  // ItemList schema — listicles are extracted cleanly by AI engines.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guide.h1,
    numberOfItems: guide.entries.length,
    itemListElement: guide.entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      description: e.what,
    })),
  };

  return (
    <>
      <PageEvent event="guide_page_viewed" properties={{ guide_slug: slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: guide.shortLabel, url: `/guides/${slug}` },
        ]}
      />

      <article aria-labelledby="guide-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Guides", href: "/guides" }, { name: guide.shortLabel }]}
            />
            <h1
              id="guide-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {guide.h1}
            </h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-12 max-w-4xl">
          {/* Verdict / TL;DR */}
          <DefinitiveAnswer eyebrow="The short version">{guide.intro}</DefinitiveAnswer>

          {/* Numbered list */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <ListChecks className="h-7 w-7 text-secondary" />
              The list
            </h2>
            <ol className="space-y-5">
              {guide.entries.map((entry, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-grow rounded-lg border p-4">
                    <h3 className="font-semibold text-lg">
                      {entry.href ? (
                        <Link
                          href={entry.href}
                          {...(entry.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="hover:text-primary transition-colors"
                        >
                          {entry.name}
                          {entry.external ? " ↗" : " →"}
                        </Link>
                      ) : (
                        entry.name
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{entry.what}</p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Why it matters:</span>{" "}
                      <span className="text-muted-foreground">{entry.dataPoint}</span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Best for:</span>{" "}
                      <span className="text-muted-foreground">{entry.bestFor}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Methodology */}
          <section className="rounded-lg border-l-4 border-secondary bg-muted/30 p-5">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Database className="h-5 w-5 text-secondary" />
              How we built this list
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.methodology}</p>
          </section>

          {/* Related guides — sibling cross-links */}
          {relatedGuides.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <ListChecks className="h-7 w-7 text-secondary" />
                Related guides
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedGuides.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/guides/${l.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {l.shortLabel} →
                  </Link>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Browse all{" "}
                <Link href="/guides" className="text-primary hover:underline font-medium">
                  Pune IT career guides
                </Link>
                .
              </p>
            </section>
          )}

          {/* FAQ */}
          <FaqSection
            heading="FAQs"
            intro={`Common questions about ${guide.shortLabel.toLowerCase()}.`}
            items={guide.faqs}
          />

          {/* Outbound citations, curated per guide. Renders nothing when the
              guide has no honest primary source (see guide-sources.ts).
              Audit 2026-08-06. */}
          <SourceCitations
            heading="Sources"
            intro="Primary references for the tools and data discussed above."
            items={sourcesForGuide(slug)}
            anchorId={`sources-${slug}`}
          />

          {/* P5-17 — newsletter banner. */}
          <NewsletterSignupForm
            placement={`guide:${slug}`}
            variant="banner"
            headline="Pune IT careers — monthly briefing"
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </article>

      {/* Recommended Archer course — DevOps-outcome push pattern.
          Routes each /guides/[slug] guide to its most relevant course
          category hub so spoke → hub link equity compounds. Renders
          nothing when slug keywords don't confidently match a course
          (the generic CTA below still fires). */}
      {(() => {
        const rec = getRecommendedCourseForGuide(slug);
        if (!rec) return null;
        return (
          <section className="py-10 border-t bg-background">
            <div className="container mx-auto px-4">
              <Link
                href={rec.href}
                className="group flex items-start gap-4 max-w-4xl mx-auto rounded-xl border-2 border-primary/20 bg-primary/5 p-5 md:p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground shrink-0">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div className="flex-grow">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-primary mb-1">
                    Recommended Archer course
                  </p>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rec.blurb}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </section>
        );
      })()}

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want a structured path through all this?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Archer Infotech&apos;s placement-backed courses turn these skills into
            a real Pune IT career. Book a free demo to map your route.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ location: "guide_cta", guide_slug: slug }}
            >
              Book a Free Demo
            </TrackedLink>
            <Link
              href="/tools/pune-it-career-roadmap"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              See the career roadmap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
