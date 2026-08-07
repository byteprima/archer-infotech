import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  GraduationCap,
  Rocket,
  Target,
  Award,
  Phone,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FAQJsonLd,
  BreadcrumbJsonLd,
  CategoryCollectionJsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { audiences, getAudience } from "@/data/audiences";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { getCourse } from "@/data/courses";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";
import { LastUpdated } from "@/components/seo/last-updated";
import { NEW_ASSETS_LAST_REVIEWED } from "@/lib/seo/content-dates";

interface AudiencePageProps {
  params: Promise<{ audience: string }>;
}

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({
  params,
}: AudiencePageProps): Promise<Metadata> {
  const { audience: slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return { title: "Page Not Found" };

  return buildPageMetadata({
    title: audience.metaTitle,
    description: audience.metaDescription,
    path: `/courses/for/${slug}`,
  });
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const { audience: slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const alsoConsider = audience.alsoConsiderCourseSlugs
    .map((s) => getCourse(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Sibling cross-links to other backgrounds, so each audience page sits in a
  // crawlable graph rather than being reachable only from the /courses tail.
  // General (qualification/experience) backgrounds are surfaced ahead of the
  // college-specific ones.
  const GENERAL_FIRST = [
    "students-after-12th", "engineering-students", "bca-students",
    "bsc-cs-students", "graduates", "mca-students", "working-professionals",
    "career-changers",
  ];
  const relatedAudiences = [...audiences]
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const ai = GENERAL_FIRST.indexOf(a.slug);
      const bi = GENERAL_FIRST.indexOf(b.slug);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .slice(0, 6);

  return (
    <>
      <PageEvent
        event="audience_page_viewed"
        properties={{ audience_slug: slug, audience_name: audience.name }}
      />

      <FAQJsonLd faqs={audience.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: audience.name, url: `/courses/for/${slug}` },
        ]}
      />
      <CategoryCollectionJsonLd
        name={audience.metaTitle}
        description={audience.metaDescription}
        url={`/courses/for/${slug}`}
        items={alsoConsider.map((c) => ({
          name: c.title,
          url: `/courses/${c.categorySlug}/${c.slug}`,
          description: c.shortDescription,
        }))}
      />

      <article aria-labelledby="audience-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Courses", href: "/courses" },
                { name: audience.name },
              ]}
            />
            <h1
              id="audience-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {audience.h1}
            </h1>
            <p className="text-lg text-white/85 max-w-3xl mb-6">
              {audience.tagline}
            </p>
            <LastUpdated iso={NEW_ASSETS_LAST_REVIEWED} className="mb-6 text-xs md:text-sm text-white/70" />
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                event="course_enquiry_clicked"
                properties={{ audience_slug: slug, location: "audience_hero" }}
              >
                Book a Free Demo
              </TrackedLink>
              <TrackedAnchor
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
                event="contact_method_clicked"
                properties={{ method: "phone", location: "audience_hero", audience_slug: slug }}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </TrackedAnchor>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
          {/* Intro */}
          <section className="prose prose-slate max-w-none space-y-4">
            {audience.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground">
                {p}
              </p>
            ))}
          </section>

          {/* This is for you if */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Target className="h-7 w-7 text-secondary" />
              This is for you if…
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {audience.forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recommended programme */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Rocket className="h-7 w-7 text-secondary" />
              Recommended programme
            </h2>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">
                  {audience.programme.bootcampName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {audience.programme.pitch}
                </p>
                <Link
                  href={`/bootcamps/${audience.programme.bootcampSlug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Explore {audience.programme.bootcampName} →
                </Link>
              </CardContent>
            </Card>
          </section>

          {/* What you'll gain */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Award className="h-7 w-7 text-secondary" />
              What you&apos;ll gain
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {audience.whatYouGain.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Also consider — courses */}
          {alsoConsider.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-secondary" />
                Courses to consider
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {alsoConsider.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.categorySlug}/${course.slug}`}
                    className="group rounded-lg border p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <Badge variant="outline" className="text-xs mb-2">
                      {course.category}
                    </Badge>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {course.title} Training in Pune
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.shortDescription}
                    </p>
                    <span className="mt-3 inline-block text-sm text-primary font-medium">
                      View course →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related backgrounds — sibling cross-links */}
          {relatedAudiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Courses for other backgrounds
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedAudiences.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/courses/for/${a.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {a.name} →
                  </Link>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                See all{" "}
                <Link href="/courses/for" className="text-primary hover:underline font-medium">
                  courses by background
                </Link>
                .
              </p>
            </section>
          )}

          {/* Eligibility */}
          <section className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Who can join</h2>
            <p className="text-muted-foreground leading-relaxed">
              {audience.eligibility}
            </p>
          </section>

          {/* Why Archer */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Why {audience.name.toLowerCase()} choose Archer Infotech
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {audience.whyArcher.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* FAQs */}
          {audience.faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {audience.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border rounded-lg bg-background"
                    open={i < 2}
                  >
                    <summary className="cursor-pointer list-none p-5 font-medium flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors">
                      <span>{faq.question}</span>
                      <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45 text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* P5-17 — newsletter banner. */}
      {/* Outbound citations aggregated across the courses this audience is
          steered toward, deduped by href. Audit 2026-08-06. */}
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation for the technologies taught on the tracks recommended above."
        items={sourcesForTopics(alsoConsider.map((c) => c.slug))}
      />

      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement={`audience:${slug}`}
            variant="banner"
            headline={`Pune IT careers — briefing for ${audience.name}`}
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Not sure if it&apos;s right for you?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free demo class or talk to our team — we&apos;ll help you pick
            the programme and batch format that fit your goals and schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ audience_slug: slug, location: "audience_bottom_cta" }}
            >
              Book a Free Demo
            </TrackedLink>
            <TrackedLink
              href="/courses"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="cta_clicked"
              properties={{ audience_slug: slug, location: "audience_bottom_cta", cta: "browse_courses" }}
            >
              Browse All Courses
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
