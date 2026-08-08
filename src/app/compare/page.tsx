import { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { comparisons } from "@/data/comparisons";
import { buildPageMetadata } from "@/lib/seo";
import { LastUpdated } from "@/components/seo/last-updated";
import { NEW_ASSETS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";

export const metadata: Metadata = buildPageMetadata({
  title: "Compare IT Courses & Career Paths",
  description:
    "Honest side-by-side comparisons for Pune IT learners — Java vs Python, MERN vs Java Full Stack, online vs offline training, Python Developer vs Data Scientist, and bootcamp vs self-study.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <>
      <PageEvent event="compare_index_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="Compare IT Courses & Career Paths"
        description="Side-by-side comparisons for Pune IT learners — Java vs Python, MERN vs Java Full Stack, online vs offline training, Python Developer vs Data Scientist, and bootcamp vs self-study."
        url="/compare"
        items={comparisons.map((c) => ({
          name: `${c.optionA} vs ${c.optionB}`,
          url: `/compare/${c.slug}`,
          description: c.metaDescription,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs variant="light" items={[{ name: "Compare" }]} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            Compare IT Courses &amp; Career Paths
          </h1>
          <LastUpdated iso={NEW_ASSETS_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
          <p className="text-lg text-white/85 max-w-3xl">
            &ldquo;Which is better?&rdquo; — answered honestly. Side-by-side
            comparisons to help Pune learners choose the right language, stack,
            format and path.
          </p>
        </div>
      </header>

      {/* Opening summary — factual, derived from the collection itself,
          so it cannot drift out of sync with what the hub lists. P-05. */}
      <DefinitiveAnswer eyebrow="Comparisons at Archer Infotech, in short">
        {`Archer Infotech publishes ${comparisons.length} side-by-side comparisons for Pune learners choosing between technologies and career paths — Java vs Python, MERN vs Java Full Stack, AWS vs Azure, data analyst vs data scientist and more. Each gives a factor-by-factor table, guidance on when each option fits, and a plain bottom line rather than a verdict that favours whichever course we sell.`}
      </DefinitiveAnswer>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <Scale className="h-5 w-5" />
                <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {c.optionA} vs {c.optionB}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{c.metaDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Read the comparison
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies referenced on this page."
        items={sourcesForTopics(["java", "python", "react", "aws"])}
      />

    </>
  );
}
