import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CoursesFilter } from "@/components/courses/courses-filter";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { coursesFaqs } from "@/data/faqs";
import { categories, courses } from "@/data/courses";
import { audiences } from "@/data/audiences";
import { courseLocations } from "@/data/course-locations";
import { CategoryCollectionJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { COURSE_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { SourceCitations } from "@/components/seo/source-citations";
import { sourcesForTopics } from "@/data/authoritative-sources";
import { LastUpdated } from "@/components/seo/last-updated";

export const metadata: Metadata = buildPageMetadata({
  // Hub owns the high-intent commercial head term "IT courses in Pune"
  // with the modifiers users actually search (placement, fees). Individual
  // course pages target the long-tail; this page is the category-level net.
  title: "IT Training Courses in Pune with Placement & Fees",
  description:
    "Explore 40+ IT training courses in Pune with placement — Java, Python, AWS, DevOps, Full Stack, Data Science & AI/ML. Fees from ₹15,000; 4–6 month weekday, weekend & online batches.",
  path: "/courses",
  lastModified: COURSE_LAST_REVIEWED,
});

export default function CoursesPage() {
  return (
    <>
      {/* P8-04 wave 4 — CollectionPage of categories. The full server-rendered
          course list lives below the fold inside the existing courses-filter
          fallback; here we expose the *category* level so AI engines see
          /courses as a curated index of training tracks. */}
      <CategoryCollectionJsonLd
        name="IT Training Courses in Pune"
        description="40+ classroom and online IT training courses in Pune across Programming, Full Stack, Cloud, Data and AI, Testing, and Database tracks."
        url="/courses"
        items={categories.map((cat) => ({
          name: cat.name,
          url: `/courses/${cat.slug}`,
          description: cat.description,
        }))}
      />

      {/* BreadcrumbList — site convention is a breadcrumb on every non-home
          page; the /courses hub was the one indexed surface still missing it.
          Gives Google a Home › Courses trail (eligible for breadcrumb rich
          results) and reinforces this page as the category root. */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Breadcrumbs
              variant="light"
              items={[{ name: "Courses" }]}
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              IT Training Courses in Pune | 40+ Programs with Placement Assistance
            </h1>
            <LastUpdated iso={COURSE_LAST_REVIEWED} className="mt-3 text-xs md:text-sm text-white/70" />
            <p className="text-lg text-white/80">
              Explore our comprehensive range of industry-relevant IT courses.
              Learn from expert trainers and get placement assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Definitive Answer Paragraph — citation-friendly factual opening
          before the JS-hydrated filter. AI engines lift this when answering
          "IT courses Pune / Archer Infotech courses". P8-07. */}
      <DefinitiveAnswer eyebrow="IT Training Courses at Archer Infotech, Pune">
        Archer Infotech offers 40+ IT training courses across Programming
        (Java, Python, C, C++), Full Stack Development (Java Full Stack,
        MERN, Spring Boot, .NET), Cloud and DevOps (AWS, Azure, Kubernetes,
        Docker, Terraform), Data and AI (Data Science, Machine Learning,
        Generative AI, Power BI), Testing (Selenium, Manual Testing) and
        Database (MySQL, PostgreSQL, MongoDB). Courses run 4–6 months in
        standard batches with weekday, weekend and online schedules,
        starting at ₹15,000 with EMI plans. Every paid program includes
        lifetime LMS access, an industry-recognised certificate and
        placement assistance with 100+ corporate hiring partners — no
        separate placement fee.
      </DefinitiveAnswer>

      {/* Server-rendered all-courses directory — grouped by category, every
          course gets a real <a href> in initial HTML. The CoursesFilter
          below is client-hydrated so Googlebot's first crawl pass sees only
          its fallback shell; explicit anchor links here pass PageRank from
          /courses (indexed) to all 45 child course pages immediately.
          Directly addresses the 2026-06-04 finding that 3 course pages
          (prompt-engineering, mongodb, oracle-database) were "Unknown to
          Google" despite indexed parent categories — discovery signal,
          not robots/canonical, was the missing piece. Also serves users:
          fast browse-without-JS for the courses listing. */}
      <section
        aria-labelledby="all-courses-index-heading"
        className="py-12 border-b bg-muted/30"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="all-courses-index-heading"
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            Browse all 40+ IT training courses
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Quick directory of every course we run, grouped by track. Use the
            filter below for fees, duration and batch timings — or jump
            straight to any course.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {categories.map((cat) => {
              const catCourses = courses.filter(
                (c) => c.categorySlug === cat.slug,
              );
              if (catCourses.length === 0) return null;
              return (
                <div key={cat.slug}>
                  <h3 className="text-base font-semibold mb-2">
                    <Link
                      href={
                        cat.slug === "bootcamps"
                          ? "/bootcamps"
                          : `/courses/${cat.slug}`
                      }
                      className="hover:text-primary hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </h3>
                  <ul className="space-y-1.5 text-sm list-none p-0">
                    {catCourses.map((c) => {
                      const href =
                        c.categorySlug === "bootcamps"
                          ? `/bootcamps/${c.slug.replace("-bootcamp", "")}`
                          : `/courses/${c.categorySlug}/${c.slug}`;
                      return (
                        <li key={c.id}>
                          <Link
                            href={href}
                            className="text-muted-foreground hover:text-primary hover:underline"
                          >
                            {c.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Server-rendered directory of audience-intent landing pages
          (/courses/for/[audience]). Same discovery-signal rationale as the
          all-courses index above: these 20+ pages were Discovered/Unknown to
          Google because nothing on an indexed surface linked to them. The
          /courses hub is indexed and authoritative, so real <a href> links
          here pass PageRank and get the cluster crawled. */}
      <section
        aria-labelledby="courses-by-audience-heading"
        className="py-12 border-b"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="courses-by-audience-heading"
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            Courses for your background
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Not sure where to start? Pick the path built for your situation —
            each one maps the right course and batch to where you are now.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {audiences.map((a) => (
              <Link
                key={a.slug}
                href={`/courses/for/${a.slug}`}
                className="group block"
              >
                <span className="text-sm font-semibold group-hover:text-primary group-hover:underline">
                  {a.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {a.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Server-rendered directory of course × Pune-location landing pages
          (/courses/in/[slug]). These 40+ combos were the most orphaned
          cluster — nothing real linked to them. Explicit anchors from the
          indexed /courses hub make them crawlable. */}
      <section
        aria-labelledby="courses-by-location-heading"
        className="py-12 border-b bg-muted/30"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="courses-by-location-heading"
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            IT courses by Pune location
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Targeting a specific Pune IT hub — Hinjewadi, Baner, Kharadi,
            Kothrud and more? These pages map our flagship tracks to the
            companies hiring in each area.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {courseLocations.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/in/${c.slug}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {c.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*
        Reserve vertical space for the client-side CoursesFilter (filter sidebar
        + course grid) so it doesn't snap into place after JS hydration.
        Empty Suspense fallback was causing /courses desktop CLS = 0.735 (failing).
        See SEO baselines/2026-05-07-psi/.
      */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="container mx-auto px-4 py-12 min-h-[1200px]"
          />
        }
      >
        <CoursesFilter />
      </Suspense>

      {/* FAQ block + FAQPage JSON-LD — broad PAA-style course questions,
          server-rendered so AI crawlers see the answers in initial HTML.
          P8-08. */}
      <FaqSection
        heading="IT Courses in Pune — FAQs"
        intro="Choosing the right course, fees, duration, online vs offline, certificates and placement support — answered."
        items={coursesFaqs}
      />

      {/* Aggregated across the full catalogue — derived, not hand-curated,
          so it cannot drift from the courses actually offered. */}
      <SourceCitations
        heading="Curriculum references"
        intro="Official documentation and certification bodies behind the technologies we teach."
        items={sourcesForTopics(courses.map((c) => c.slug))}
      />
    </>
  );
}
