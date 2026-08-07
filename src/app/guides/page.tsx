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
    </>
  );
}
