import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { audiences } from "@/data/audiences";
import { buildPageMetadata } from "@/lib/seo";
import { NEW_ASSETS_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { audienceHubFaqs } from "@/data/hub-faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Courses in Pune for Your Background",
  description:
    "Pick the right IT course in Pune for where you are starting from — students after 12th, engineering and BCA/BSc/MCA students, graduates, working professionals and career changers.",
  path: "/courses/for",
});

// Hub index for the /courses/for/[audience] cluster. Gives the audience
// landing pages a dedicated, footer-linked entry point instead of only the
// buried block near the bottom of /courses.
export default function AudienceHubPage() {
  return (
    <>
      <PageEvent event="audience_hub_viewed" />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: "For Your Background", url: "/courses/for" },
        ]}
      />
      <CategoryCollectionJsonLd
        name="IT Courses in Pune for Your Background"
        description="Audience-specific guidance on which Archer Infotech course fits your starting point — by qualification, college year and work experience."
        url="/courses/for"
        items={audiences.map((a) => ({
          name: a.name,
          url: `/courses/for/${a.slug}`,
          description: a.metaDescription,
        }))}
      />

      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[{ name: "Courses", href: "/courses" }, { name: "For Your Background" }]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            IT Courses in Pune for Your Background
          </h1>
          <p className="text-lg text-white/85 max-w-3xl">
            The right first course depends on where you are starting from. Find
            the path built for your qualification, college year or work
            experience — with eligibility, fit and placement guidance for each.
          </p>
        </div>
      </header>

      {/* Opening summary — factual, derived from the collection itself,
          so it cannot drift out of sync with what the hub lists. P-05. */}
      <DefinitiveAnswer eyebrow="Courses by background, in short">
        {`Archer Infotech maps its catalogue to ${audiences.length} learner backgrounds — 12th passouts, engineering and BCA/BSc-CS students, graduates, MCA students, working professionals and career changers, plus specific Pune colleges. Each page recommends a starting track for that background, explains why it fits, and sets out the realistic first-job outcome.`}
      </DefinitiveAnswer>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              href={`/courses/for/${a.slug}`}
              className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-primary mb-2">
                <GraduationCap className="h-5 w-5" />
                <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {a.name}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{a.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                Explore this path
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <LastUpdated iso={NEW_ASSETS_LAST_REVIEWED} />
        </div>
      </section>
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies taught on the tracks these pages recommend."
        items={sourcesForTopics(
          audiences.flatMap((a) => a.alsoConsiderCourseSlugs),
        )}
      />
      {/* Hub-level FAQ — gives this page question-shaped headings,
          adjacent answers and a FAQPage payload it previously had none
          of. Content is specific to this hub, not shared boilerplate.
          Audit 2026-08-09. */}
      <FaqSection heading="Choosing by background — FAQs" items={audienceHubFaqs} />

    </>
  );
}
