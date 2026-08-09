import { Metadata } from "next";
import Link from "next/link";
import { ListChecks, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { listicles } from "@/data/listicles";
import { buildPageMetadata } from "@/lib/seo";
import { SourceCitations } from "@/components/seo/source-citations";
import { topGuideSources } from "@/data/guide-sources";
import { LastUpdated } from "@/components/seo/last-updated";
import { NEW_ASSETS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { guidesHubFaqs } from "@/data/hub-faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Career & Learning Guides",
  description:
    "Practical guides for Pune IT learners — best Python projects, top fresher skills, Java frameworks, free full-stack resources and the highest-paying IT roles in Pune.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <>
      <PageEvent event="guides_index_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="IT Career & Learning Guides"
        description="Practical guides for Pune IT learners — best Python projects, top fresher skills, Java frameworks, free full-stack resources and the highest-paying IT roles in Pune."
        url="/guides"
        items={listicles.map((l) => ({
          name: l.h1,
          url: `/guides/${l.slug}`,
          description: l.metaDescription,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Guides" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            IT Career &amp; Learning Guides
          </h1>
          <LastUpdated iso={NEW_ASSETS_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
          <p className="text-lg text-white/85 max-w-3xl">
            Practical, Pune-context guides to help you learn the right skills,
            build the right projects, and target the right roles.
          </p>
        </div>
      </header>

      {/* Opening summary — factual, derived from the collection itself,
          so it cannot drift out of sync with what the hub lists. P-05. */}
      <DefinitiveAnswer eyebrow="Free guides, in short">
        {`Archer Infotech publishes ${listicles.length} free guides for Pune IT learners — project ideas for your resume, interview question sets by stack, library and tooling round-ups, and career-skill explainers. Each guide is a ranked list with a stated selection method, a concrete data point per entry, and a recommendation for who it suits.`}
      </DefinitiveAnswer>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {listicles.map((l) => (
            <Link
              key={l.slug}
              href={`/guides/${l.slug}`}
              className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <ListChecks className="h-5 w-5" />
                <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {l.h1}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{l.metaDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Read the guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SourceCitations
        heading="Sources"
        intro="The primary references cited most often across these guides."
        items={topGuideSources()}
      />
      {/* Hub-level FAQ — gives this page question-shaped headings,
          adjacent answers and a FAQPage payload it previously had none
          of. Content is specific to this hub, not shared boilerplate.
          Audit 2026-08-09. */}
      <FaqSection heading="About these guides — FAQs" items={guidesHubFaqs} />

    </>
  );
}
