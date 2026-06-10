import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  MapPin,
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { LastUpdated } from "@/components/seo/last-updated";
import { FaqSection } from "@/components/seo/faq-section";
import {
  courseLocations,
  getCourseLocationCombo,
} from "@/data/course-locations";
import { getCourse } from "@/data/courses";
import { getNeighbourhood } from "@/data/locations";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

interface CourseLocationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return courseLocations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CourseLocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const combo = getCourseLocationCombo(slug);
  if (!combo) return { title: "Combo Not Found" };

  return buildPageMetadata({
    title: combo.metaTitle,
    description: combo.metaDescription,
    path: `/courses/in/${slug}`,
    lastModified: EVERGREEN_LAST_REVIEWED,
  });
}

export default async function CourseLocationPage({
  params,
}: CourseLocationPageProps) {
  const { slug } = await params;
  const combo = getCourseLocationCombo(slug);
  if (!combo) notFound();

  // Resolve the canonical course + location so we can link cleanly
  // and pull authoritative facts (duration, mode, etc) without
  // duplicating data.
  const course = getCourse(combo.courseSlug);
  const location = getNeighbourhood(combo.locationSlug);

  return (
    <>
      <PageEvent
        event="course_location_page_viewed"
        properties={{
          combo_slug: slug,
          course_slug: combo.courseSlug,
          location_slug: combo.locationSlug,
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: combo.shortLabel, url: `/courses/in/${combo.slug}` },
        ]}
      />
      <FAQJsonLd faqs={combo.faqs} />

      {/* Hero */}
      <article aria-labelledby="combo-title">
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Courses", href: "/courses" },
                { name: combo.shortLabel },
              ]}
            />
            <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>{location?.fullName ?? "Pune"}</span>
            </div>
            <h1
              id="combo-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              {combo.h1}
            </h1>
            <div className="flex flex-wrap gap-3 mt-6">
              <TrackedLink
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                event="course_enquiry_clicked"
                properties={{
                  combo_slug: slug,
                  location: "course_location_hero",
                }}
              >
                Book a Free Demo
              </TrackedLink>
              <TrackedAnchor
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
                event="contact_method_clicked"
                properties={{
                  method: "phone",
                  location: "course_location_hero",
                  combo_slug: slug,
                }}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </TrackedAnchor>
            </div>
          </div>
        </header>

        {/* Intro */}
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl space-y-14">
          <section className="prose prose-slate max-w-none space-y-4">
            <LastUpdated
              iso={EVERGREEN_LAST_REVIEWED}
              className="text-xs md:text-sm text-muted-foreground !mt-0 !mb-2"
            />
            {combo.intro.map((p, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-foreground"
              >
                {p}
              </p>
            ))}
          </section>

          {/* Why this combo */}
          <section id="why-here" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold">
              Why this combination works
            </h2>
            <ul className="space-y-3">
              {combo.whyHere.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Anchor pages — canonical course + canonical location */}
          <section
            id="canonical-pages"
            className="grid md:grid-cols-2 gap-5 scroll-mt-24"
          >
            {course && (
              <Link
                href={`/courses/${course.categorySlug}/${course.slug}`}
                className="group rounded-xl border-2 border-primary/20 bg-primary/5 p-5 md:p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <p className="text-[11px] uppercase tracking-wide font-semibold text-primary mb-1">
                  Full course details
                </p>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Curriculum, fee, batch schedule, trainer details and
                  outcomes — see the canonical course page.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
                  View course
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}

            {location && (
              <Link
                href={`/locations/${location.slug}`}
                className="group rounded-xl border-2 border-primary/20 bg-primary/5 p-5 md:p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <p className="text-[11px] uppercase tracking-wide font-semibold text-primary mb-1">
                  Local area details
                </p>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  IT Training in {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Commute, landmarks, and the popular courses for{" "}
                  {location.name} students — see the canonical location page.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
                  View location page
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}
          </section>

          {/* Quick-fact strip — pulled from canonical course data */}
          {course && (
            <section
              id="quick-facts"
              className="rounded-xl border bg-muted/30 p-5 md:p-6 scroll-mt-24"
            >
              <h2 className="text-lg font-semibold mb-3">Quick facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Duration
                  </p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Level
                  </p>
                  <p className="font-semibold">{course.level}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Mode
                  </p>
                  <p className="font-semibold">
                    {course.mode.join(" & ")}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Placement
                  </p>
                  <p className="font-semibold">Yes — 100+ partners</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </article>

      {/* FAQs */}
      <FaqSection
        heading={`${combo.shortLabel} — Frequently Asked Questions`}
        intro={`The most-asked questions about ${combo.shortLabel.toLowerCase()} — commute, format, employers, certification, cost.`}
        items={combo.faqs}
        anchorId="combo-faqs"
      />

      {/* Bottom CTA */}
      <section className="py-12 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start with a free demo
          </h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Meet the trainer, walk through the curriculum, and confirm the
            batch format that fits your{" "}
            {location?.name ?? "Pune"} schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                combo_slug: slug,
                location: "course_location_bottom",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <TrackedLink
              href="/batch-schedule"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="view_batch_schedule_clicked"
              properties={{
                combo_slug: slug,
                location: "course_location_bottom",
              }}
            >
              View Batch Schedule
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
