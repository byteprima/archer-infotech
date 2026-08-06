import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, BarChart, Briefcase, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
import { BreadcrumbJsonLd, CategoryCollectionJsonLd } from "@/components/seo/json-ld";
import { categories, courses, getCategory } from "@/data/courses";
import { buildPageMetadata } from "@/lib/seo";
import { getCategoryContent } from "@/data/category-content";
import { FaqSection } from "@/components/seo/faq-section";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { getRelatedAssetsForCategory } from "@/lib/seo/course-related-assets";
import { Calculator, Scale, ListChecks } from "lucide-react";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return { title: "Category Not Found" };
  const rich = getCategoryContent(categorySlug);

  return buildPageMetadata({
    // P3-22 — prefer metaTitle (≤60-char SERP cut) over h1 when set.
    title: rich?.metaTitle ?? rich?.h1 ?? `${category.name} Training in Pune`,
    description:
      rich?.subhead ??
      `Explore ${category.name} courses at Archer Infotech, Pune — classroom and online batches, expert trainers, and placement assistance. ${category.description ?? ""}`.trim(),
    path: `/courses/${categorySlug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const categoryCourses = courses.filter((c) => c.categorySlug === categorySlug);
  // Rich category content (overview paragraphs, career outcomes, FAQs)
  // — present for the 9 main categories; falls back to the legacy
  // minimal layout when not configured (e.g. bootcamps category).
  // P4-11.
  const rich = getCategoryContent(categorySlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: category.name, url: `/courses/${categorySlug}` },
        ]}
      />
      {/* CollectionPage + ItemList schema — feeds rich-result
          eligibility for category queries like "programming courses
          in Pune". Lists every course in the category as a structured
          item. P4-11. */}
      <CategoryCollectionJsonLd
        name={rich?.h1 ?? `${category.name} Training in Pune`}
        description={rich?.subhead ?? category.description}
        url={`/courses/${categorySlug}`}
        items={categoryCourses.map((c) => ({
          name: c.title,
          url:
            c.categorySlug === "bootcamps"
              ? `/bootcamps/${c.slug.replace("-bootcamp", "")}`
              : `/courses/${c.categorySlug}/${c.slug}`,
          description: c.shortDescription,
        }))}
      />

      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {rich?.h1 ?? `${category.name} Training in Pune`}
            </h1>
            {/* Variant-rich subhead — naturally weaves the four
                head-keyword variants (training in H1; courses, classes,
                institute here) so every category page picks up keyword
                surface area without keyword stuffing. P4-06. */}
            <p className="text-base md:text-lg text-white/85 mb-3 leading-snug">
              {rich?.subhead ??
                `Explore ${category.name.toLowerCase()} courses, classes and specialisation tracks at the Archer Infotech institute in Kothrud, Pune.`}
            </p>
            {category.description && (
              <p className="text-lg text-white/80">{category.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Long-form category overview — only renders when rich content
          is configured for this slug. Pushes category page word count
          past the 800-word spec floor. P4-11. */}
      {rich && rich.paragraphs.length > 0 && (
        <section
          aria-labelledby="category-overview-heading"
          className="py-16 border-b"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Overview
              </p>
              <h2
                id="category-overview-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                {category.name} at Archer Infotech, Pune
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                {rich.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {category.name} Courses ({categoryCourses.length})
            </h2>
            <Link
              href="/courses"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              View all categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryCourses.map((course) => {
              const href =
                course.categorySlug === "bootcamps"
                  ? `/bootcamps/${course.slug.replace("-bootcamp", "")}`
                  : `/courses/${course.categorySlug}/${course.slug}`;
              return (
                <Link key={course.id} href={href} className="block h-full">
                  <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/20 h-full flex flex-col cursor-pointer">
                    <CardHeader className="p-0 flex-shrink-0">
                      <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                        <CourseImagePlaceholder course={course} />
                        {course.isPopular && (
                          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground z-10">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 flex-grow flex flex-col">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {course.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart className="h-4 w-4" /> {course.level}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-4 border-t-0 bg-transparent flex-shrink-0 mt-auto">
                      <span className="w-full inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Outcomes — typical roles the category leads to. Cards
          carry attributed salary bands per the P8-09 source-attribution
          discipline. P4-11. */}
      {rich && rich.careerOutcomes.length > 0 && (
        <section
          aria-labelledby="category-careers-heading"
          className="py-16 bg-muted/30 border-t"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Career Outcomes
              </p>
              <h2
                id="category-careers-heading"
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                Where {category.name} courses lead at Pune IT companies
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Typical roles Archer Infotech alumni take after completing
                a {category.name} programme, with fresher salary bands
                from placement-team data (last 12 months of offers).
                Actual offers depend on role, company tier, and prior
                experience.
              </p>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 max-w-5xl mx-auto">
              {rich.careerOutcomes.map((c) => (
                <li
                  key={c.role}
                  className="rounded-2xl border border-border bg-background p-6 flex flex-col"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Briefcase className="h-4 w-4" aria-hidden="true" />
                    Role
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {c.role}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {c.description}
                  </p>
                  {c.band && (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                      {c.band.replace(/^₹/, "")}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* DevOps outcome push — surface cluster spokes (guides,
          compares, tools) on the category hub so the topic-cluster
          link graph compounds. Currently scoped to cloud-devops /
          cloud-certifications where KPI data showed 134 impressions
          / 0 clicks at depth-of-funnel positions 55-91. Renders
          nothing on categories without a curated cluster beyond the
          two universal tools. */}
      {(() => {
        const assets = getRelatedAssetsForCategory(categorySlug);
        if (assets.length <= 2) return null; // tools-only = skip
        const iconFor = (t: "tool" | "compare" | "guide") =>
          t === "tool" ? Calculator : t === "compare" ? Scale : ListChecks;
        const labelFor = (t: "tool" | "compare" | "guide") =>
          t === "tool" ? "Tool" : t === "compare" ? "Comparison" : "Guide";
        return (
          <section className="py-12 border-t bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Plan your {category.name} path
                </h2>
                <p className="text-muted-foreground">
                  Comparisons, salary tools, and hands-on guides that pair
                  with {category.name.toLowerCase()} courses at Archer Infotech.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {assets.map((a) => {
                  const Icon = iconFor(a.type);
                  return (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="group flex items-start gap-3 rounded-lg border p-4 bg-background hover:border-primary hover:shadow-md transition-all"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-grow">
                        <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                          {labelFor(a.type)}
                        </span>
                        <span className="block font-medium text-foreground group-hover:text-primary transition-colors mt-0.5 text-sm">
                          {a.title}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Category-level FAQs — paired with FAQPage JSON-LD via the
          existing FaqSection component. AI engines lift these
          verbatim. P4-11 + P8-08. */}
      {rich && rich.faqs.length > 0 && (
        <FaqSection
          heading={`${category.name} courses — Frequently Asked Questions`}
          intro={`The most-asked questions about Archer Infotech's ${category.name.toLowerCase()} courses — choosing the right track, prerequisites, online vs offline, fees, and placement support.`}
          items={rich.faqs}
        />
      )}

      {/* P5-17 — newsletter banner. */}
      {/* Outbound citations aggregated across every course in this category,
          deduped by href and capped so the block stays a citation list and
          not a link farm. Audit 2026-08-06. */}
      <SourceCitations
        heading="Curriculum references"
        intro={`Official documentation for the technologies taught across our ${category.name} courses.`}
        items={sourcesForTopics(categoryCourses.map((c) => c.slug))}
      />

      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement={`category:${category.slug}`}
            variant="banner"
            headline={`Pune ${category.name} hiring — monthly briefing`}
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </section>
    </>
  );
}
