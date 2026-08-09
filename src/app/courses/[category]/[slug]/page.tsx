import { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  BarChart,
  Users,
  CheckCircle,
  Award,
  Briefcase,
  GraduationCap,
  Phone,
  Calendar,
  Calculator,
  Scale,
  ListChecks,
  ArrowRight,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseJsonLd, FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ReviewRibbon } from "@/components/seo/review-ribbon";
import { getCourseTestimonials } from "@/lib/actions/public-testimonials";
import { Star, Quote } from "lucide-react";
import { courses, getCourse, getCategory, getRelatedCourses } from "@/data/courses";
import { getHiringPartners } from "@/data/companies";
import { getTrainersForCourse } from "@/data/team";
import {
  siteConfig,
  googleReviews,
  MIN_COURSE_RATINGS_FOR_SCHEMA,
} from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { getNextBatchForCourse } from "@/lib/actions/public-batches";
import { getCourseRichContent } from "@/data/course-content";
import { Suspense } from "react";
import {
  RichCourseContentAboveFold,
  RichCourseContentBelowFold,
} from "@/components/courses/rich-course-content";
import Image from "next/image";
import { LastUpdated } from "@/components/seo/last-updated";
import { COURSE_LAST_REVIEWED } from "@/lib/seo/content-dates";
import { RelatedReading } from "@/components/courses/related-reading";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { VideoEmbed } from "@/components/seo/video-embed";
import { getCourseVideo } from "@/data/course-videos";
import { getRelatedBlogPosts } from "@/lib/actions/blog";
import { deriveCourseKeywords } from "@/lib/seo/course-keywords";
import { getRelatedAssetsForCourse } from "@/lib/seo/course-related-assets";
import { CounselorDialogLazy } from "@/components/common/counselor-dialog-lazy";

interface CoursePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Bootcamp-category courses are excluded: this route only redirects them to
  // /bootcamps/<slug>, so prerendering them produced build artefacts (title,
  // canonical, robots) for pages that are never served. Those artefacts were
  // misleading enough to read as duplicate indexable content during the
  // 2026-08-06 audit. The redirect still works for anyone hitting the URL —
  // it is just resolved at request time now.
  return courses
    .filter((course) => course.categorySlug !== "bootcamps")
    .map((course) => ({
      category: course.categorySlug,
      slug: course.slug,
    }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  // Canonical is built from the course's OWN category, never the requested one.
  // A course has exactly one home; see the category-mismatch redirect below.
  return buildPageMetadata({
    title: course.seoTitle ?? `${course.title} Training in Pune with Placement`,
    description: course.description,
    path: `/courses/${course.categorySlug}/${slug}`,
    lastModified: COURSE_LAST_REVIEWED,
  });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { category: categorySlug, slug } = await params;
  const course = getCourse(slug);
  const category = getCategory(categorySlug);

  if (!course || !category) {
    notFound();
  }

  // Bootcamp-category courses live at /bootcamps/<slug>; this route is the
  // legacy path and only redirects.
  //
  // permanentRedirect (308), not redirect (307). `redirect()` issues a
  // TEMPORARY 307, which tells Google to keep the old URL indexed and NOT to
  // consolidate signals onto the destination — so both URLs stayed eligible
  // to rank against each other. sitemap.ts has described these as "301" since
  // they were added, so permanent was always the intent; the helper simply
  // did not match it. Fixed 2026-08-06.
  if (course.categorySlug === "bootcamps") {
    const bootcampSlug = course.slug.replace("-bootcamp", "");
    permanentRedirect(`/bootcamps/${bootcampSlug}`);
  }

  // Category-mismatch guard. `getCourse()` resolves by slug alone and
  // `getCategory()` only checks that the category exists, so ANY valid
  // category paired with ANY valid course rendered a full 200 page — 12
  // categories x 51 courses = 612 crawlable URLs for 51 real pages, each
  // self-canonicalising to whatever category the crawler happened to request.
  // GSC flagged the first casualty on 2026-08-05:
  //   /courses/cloud-devops/aws-solutions-architect-training-in-pune
  // as "Duplicate, Google chose different canonical than user" against the
  // real page under /courses/cloud-certifications/. No internal link or
  // sitemap entry ever produced the bad URL (every link builds from
  // `course.categorySlug`), so these are externally discovered or guessed —
  // which means the shape has to be closed at the route, not at the links.
  //
  // 308, matching the bootcamp redirect above: permanent, so Google drops the
  // duplicate and consolidates its signals onto the real page.
  if (categorySlug !== course.categorySlug) {
    permanentRedirect(`/courses/${course.categorySlug}/${slug}`);
  }

  const nextBatch = await getNextBatchForCourse(slug);
  const nextBatchDateLabel = nextBatch
    ? new Date(nextBatch.startDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const trainers = getTrainersForCourse(slug);
  const rich = getCourseRichContent(slug);
  // Prefer the long-form FAQ when available — feeds both visible accordion
  // and FAQPage schema so AI engines and Google see the same questions.
  const effectiveFaqs = rich?.faqs ?? course.faqs;

  // "Related reading" — find up to 3 blog posts whose tags or category
  // overlap with this course's keyword footprint. Builds course → blog
  // internal-link chains. P5-28.
  const relatedKeywords = deriveCourseKeywords(slug, course.category);
  const relatedReading = await getRelatedBlogPosts(relatedKeywords, 3);

  // P7-33 — course-matched testimonials feed both the visible
  // "Student feedback" panel below and the per-course aggregateRating +
  // review[] block inside CourseJsonLd above.
  //
  // The schema rating is withheld below MIN_COURSE_RATINGS_FOR_SCHEMA. The
  // old threshold was 1, which put a spotless `ratingValue: 5,
  // ratingCount: 1` on six course pages — Java, Python, JavaScript, MERN,
  // .NET Full Stack and React. A perfect score off a single review is the
  // exact pattern review-snippet guidance treats as manufactured, and the
  // penalty lands on the domain, not the snippet. The visible testimonial
  // panel still renders from one card; only the machine-readable claim
  // waits for a real distribution.
  const courseTestimonials = await getCourseTestimonials(course.title);
  const courseAggregateRating =
    courseTestimonials.length >= MIN_COURSE_RATINGS_FOR_SCHEMA
      ? {
          ratingValue:
            Math.round(
              (courseTestimonials.reduce(
                (sum, t) => sum + (t.rating ?? 5),
                0,
              ) /
                courseTestimonials.length) *
                10,
            ) / 10,
          ratingCount: courseTestimonials.length,
        }
      : undefined;
  const courseReviewsForSchema = courseTestimonials.slice(0, 5).map((t) => ({
    id: t.id,
    authorName: t.name,
    authorRole: t.role,
    body: t.content,
    rating: t.rating ?? 5,
  }));

  return (
    <>
      <PageEvent
        event="course_page_viewed"
        properties={{
          category_slug: categorySlug,
          course_slug: slug,
          course_title: course.title,
          course_category: course.category,
        }}
      />

      {/* Schema.org Structured Data */}
      <CourseJsonLd
        name={course.title}
        description={course.description}
        duration={course.duration}
        url={`/courses/${categorySlug}/${slug}`}
        category={course.category}
        nextBatchStartDate={nextBatch ? new Date(nextBatch.startDate).toISOString() : undefined}
        nextBatchMode={nextBatch?.mode === "online" ? "online" : nextBatch ? "offline" : undefined}
        dateModified={COURSE_LAST_REVIEWED}
        aggregateRating={courseAggregateRating}
        reviews={courseReviewsForSchema}
      />
      <FAQJsonLd faqs={effectiveFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: category.name, url: `/courses/${categorySlug}` },
          { name: course.title, url: `/courses/${categorySlug}/${slug}` },
        ]}
      />

      {/*
        Semantic structure: the course detail page is a single article. Layout
        already wraps {children} in <main>, so we wrap the page-level visible
        content in <article> and use <header> for the hero (rather than a
        generic <section>) so screen readers, Googlebot, and AI crawlers see a
        clean Article > Header > body. Related Courses sits OUTSIDE the article
        because it's sibling navigation, not part of the article content.
        Pillar 3 P3-09.
      */}
      <article aria-labelledby="course-title">
      {/* Hero / article header */}
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[
              { name: "Courses", href: "/courses" },
              { name: category.name, href: `/courses/${categorySlug}` },
              { name: course.title },
            ]}
          />
          <Link
            href={`/courses/${categorySlug}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to {category.name}
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20">{course.category}</Badge>
                {course.isPopular && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Popular
                  </Badge>
                )}
                {course.isFeatured && (
                  <Badge className="bg-white text-primary">Featured</Badge>
                )}
              </div>
              <h1
                id="course-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                {course.heroHeading ?? `${course.title} Training in Pune with Placement`}
              </h1>
              {/* Variant-rich subheading so every course page naturally
                  carries all four head-keyword variants — "training" (in
                  the H1 above), "course" (in the description below),
                  "classes" (here), "institute" (here). Applies to all 42
                  course pages from a single template edit. P4-06. */}
              <p className="text-base md:text-lg text-white/85 mb-3 leading-snug">
                Pune&apos;s trusted{" "}
                <strong className="font-semibold text-white">
                  {course.shortTitle}
                </strong>{" "}
                classes at the Archer Infotech institute, Kothrud — weekday,
                weekend and online batches with placement assistance.
              </p>
              {nextBatchDateLabel && (
                <div className="inline-flex items-center gap-2 bg-secondary/15 text-white border border-secondary/40 rounded-full px-4 py-1.5 text-sm mb-4">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>
                    Next batch starts: <strong className="font-semibold">{nextBatchDateLabel}</strong>
                    {nextBatch?.mode && ` (${nextBatch.mode === "online" ? "Online" : "Classroom"})`}
                  </span>
                </div>
              )}
              <p className="text-lg text-white/80 mb-4">{course.description}</p>
              {/* P7-33 — trust ribbon: verified GBP rating from site-config,
                  routes to /testimonials. Visible signal that pairs with
                  the per-course aggregateRating in CourseJsonLd. */}
              <ReviewRibbon variant="light" className="mb-4" />
              {/* Trust-numbers strip — surfaces the same proof competitors
                  lead with (students trained, placed, placement rate, years)
                  using the canonical site-config stats. Pairs with the
                  ReviewRibbon above so the hero carries rating + scale, the
                  two signals every page-1 Pune institute foregrounds. */}
              <dl className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
                {[
                  { value: siteConfig.stats.studentsTrained, label: "Trained" },
                  { value: siteConfig.stats.studentsPlaced, label: "Placed" },
                  { value: siteConfig.stats.placementRate, label: "Placement rate" },
                  // Course-specific batch count (e.g. Java batches run) when set.
                  ...(course.batchesCompleted
                    ? [{ value: course.batchesCompleted, label: "Batches" }]
                    : []),
                  { value: `Since ${siteConfig.foundingYear}`, label: "17+ years" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-xl md:text-2xl font-bold leading-none">
                      {stat.value}
                    </dd>
                    <span className="text-xs text-white/70 mt-1">{stat.label}</span>
                  </div>
                ))}
              </dl>
              {/* Outcome + financing pills — salary proof and EMI, the two
                  desire/affordability levers competitors foreground. Each
                  renders only when the course carries a real, verified value
                  (see courses.ts); never synthesised. */}
              {(course.highestPackageLpa ||
                course.avgPackageThisYearLpa ||
                course.emiAvailable) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {course.highestPackageLpa && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 border border-secondary/40 px-3 py-1.5 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 text-secondary" />
                      Highest package ₹{course.highestPackageLpa} LPA
                    </span>
                  )}
                  {course.avgPackageThisYearLpa && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
                      Avg this year ₹{course.avgPackageThisYearLpa} LPA
                    </span>
                  )}
                  {course.emiAvailable && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
                      <CreditCard className="h-4 w-4" />
                      EMI available
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.mode.join(" & ")}</span>
                </div>
              </div>
              {/* Freshness signal — visible "Last updated" stamp paired
                  with dateModified in CourseJsonLd above. P3-18. */}
              <LastUpdated
                iso={COURSE_LAST_REVIEWED}
                label="Curriculum last reviewed"
                className="mt-5 text-xs md:text-sm text-white/70"
              />
            </div>
            {/* Enquiry Card */}
            <div className="bg-white rounded-xl p-6 text-foreground shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Interested in this course?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get in touch with us to learn more about the curriculum, batch
                timings, and fees.
              </p>
              <div className="space-y-3">
                <TrackedLink
                  href="/contact"
                  className="block w-full text-center bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  event="course_enquiry_clicked"
                  properties={{
                    category_slug: categorySlug,
                    course_slug: slug,
                    course_title: course.title,
                    location: "course_hero_card",
                  }}
                >
                  Enquire Now
                </TrackedLink>
                <TrackedAnchor
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-center gap-2 w-full border py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                  event="contact_method_clicked"
                  properties={{
                    method: "phone",
                    location: "course_hero_card",
                    course_slug: slug,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </TrackedAnchor>
                <CounselorDialogLazy
                  location="course_hero_card"
                  defaultCourse={course.title}
                  triggerLabel="Ask a Counsellor"
                  triggerClassName="flex items-center justify-center gap-2 w-full border py-3 rounded-lg font-medium hover:bg-muted transition-colors"
                />
              </div>
              <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Next batch starting soon!</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hiring-partner strip — the recruiter-logo row every page-1
          competitor (Kiran, Technogeeks, SevenMentor) leads with. We render
          partner names (logo assets aren't in the repo) in the same text
          treatment as the homepage CompaniesSection. Reinforces the
          placement claim with concrete, recognisable employer names right
          below the hero. Applies to all course pages from one template edit. */}
      {(() => {
        const partners = getHiringPartners().slice(0, 12);
        if (partners.length === 0) return null;
        return (
          <section aria-label="Companies that hire our students" className="border-b bg-muted/20 py-8">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-6">
                Our {course.shortTitle} students get placed at
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {partners.map((company) => (
                  <div
                    key={company.id}
                    className="flex h-14 items-center justify-center rounded-lg border bg-background px-3 text-center text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    {company.name}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                And many more —{" "}
                <span className="font-semibold text-primary">
                  {siteConfig.stats.corporatePartners} corporate partners
                </span>{" "}
                hiring across Pune and India.
              </p>
            </div>
          </section>
        );
      })()}

      {/* Course Content (article body) */}
      <section aria-label="Course details" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {rich ? (
            // Rich layout — split into a synchronous above-the-fold half
            // (intro + why-learn + who-for) and an async below-the-fold half
            // (curriculum onward) wrapped in <Suspense>. The Suspense
            // boundary lets Next/React flush the hero + above-fold in the
            // first response chunk; the heavy ~350 lines below stream after.
            // Course FAQ joins the same boundary so it streams too rather
            // than blocking initial paint.
            <>
              {/* P5-26 — course intro video. Lazy-loaded YouTube iframe +
                  VideoObject JSON-LD. Renders nothing when no video is
                  mapped for this slug (see src/data/course-videos.ts). */}
              {(() => {
                const courseVideo = getCourseVideo(slug);
                if (!courseVideo) return null;
                return (
                  <div className="container mx-auto px-4 max-w-3xl">
                    <VideoEmbed
                      youtubeId={courseVideo.youtubeId}
                      title={courseVideo.title}
                      description={courseVideo.description}
                      uploadDate={courseVideo.uploadDate}
                      duration={courseVideo.duration}
                      schemaId={`course-intro-${slug}`}
                      pagePath={`/courses/${categorySlug}/${slug}`}
                    />
                  </div>
                );
              })()}

              <RichCourseContentAboveFold rich={rich} />
              <Suspense
                fallback={
                  <div
                    aria-busy="true"
                    className="min-h-[600px] flex items-center justify-center text-sm text-muted-foreground"
                  >
                    Loading course details…
                  </div>
                }
              >
                <RichCourseContentBelowFold
                  rich={rich}
                  courseName={course.shortTitle}
                />
                {/* FAQ from rich content — server-rendered, AI-citable */}
                {effectiveFaqs.length > 0 && (
                  <section className="mt-12 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {effectiveFaqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group border rounded-lg bg-background"
                          open={i < 3}
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
              </Suspense>
            </>
          ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    Course Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-1" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion className="w-full">
                    {course.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <span className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                              {index + 1}
                            </span>
                            {module.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-11">
                            {module.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Projects */}
              {course.projects && course.projects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-secondary" />
                      Projects You Will Build
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {course.projects.map((project, index) => (
                        <div
                          key={index}
                          className="rounded-lg border bg-muted/30 p-4"
                        >
                          <h3 className="font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Target Audience */}
              {course.targetAudience && course.targetAudience.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-secondary" />
                      Who Can Join
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {course.targetAudience.map((audience, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-1" />
                          <span className="text-sm">{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* FAQs */}
              {course.faqs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion className="w-full">
                      {course.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Tools & Technologies */}
              {course.tools && course.tools.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tools & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {course.tools.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Career Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    Career Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.careerOpportunities.map((career, index) => (
                      <Badge key={index} variant="outline">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Placement Support */}
              {course.placementSupport && course.placementSupport.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Placement Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.placementSupport.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Certifications */}
              {course.certifications && course.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-secondary" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.certifications.map((cert, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Award className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Training Modes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Training Modes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.mode.includes("Offline") && (
                      <div className="group flex items-start gap-3 rounded-lg bg-muted p-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                          <Users className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Classroom Training</h4>
                          <p className="text-xs text-muted-foreground">
                            In-person classes at our Pune center
                          </p>
                        </div>
                      </div>
                    )}
                    {course.mode.includes("Online") && (
                      <div className="group flex items-start gap-3 rounded-lg bg-muted p-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-colors group-hover:bg-primary">
                          <BarChart className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Online Training</h4>
                          <p className="text-xs text-muted-foreground">
                            Live virtual classes via Zoom/Meet
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Online-mode + registration strip — full-width CTA placed right
          after the course content/syllabus. Mirrors the /placements bottom
          strip styling (gradient-hero). Calls out that the course also runs
          in live online mode (only when course.mode actually includes
          "Online" — never a false claim) and drives registration/enquiry.
          Single insertion here applies to every course detail page. */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {course.mode.includes("Online")
              ? `Learn ${course.shortTitle} Online or at Our Pune Centre`
              : `Start Your ${course.shortTitle} Journey Today`}
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            {course.mode.includes("Online")
              ? `Good news — ${course.shortTitle} is available in live online mode as well as classroom training at our Kothrud, Pune centre. Learn from anywhere with the same trainers, curriculum and placement assistance. Register now or send us your enquiry.`
              : `Join Archer Infotech and launch your IT career with expert trainers and placement assistance. Register now or send us your enquiry.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_online_strip",
                cta: "register_now",
              }}
            >
              Register Now
            </TrackedLink>
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="course_enquiry_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_online_strip",
                cta: "enquire_now",
              }}
            >
              Enquire Now
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Taught By — trainer attribution for E-E-A-T (Pillar 1 #18) */}
      {trainers.length > 0 && (
        <section className="py-12 border-t bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Taught by {trainers.length === 1 ? "an Industry Expert" : "Industry Experts"}
            </h2>
            <p className="text-muted-foreground mb-8">
              Every batch is led by a working professional with years of MNC experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map((trainer) => (
                <Link
                  key={trainer.id}
                  href={`/trainers/${trainer.id}`}
                  className="group flex items-start gap-4 p-5 rounded-lg border bg-background hover:border-primary hover:shadow-md transition-all"
                >
                  {trainer.image ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0 ring-2 ring-primary/10">
                      <Image
                        src={trainer.image}
                        alt={`${trainer.name}, ${trainer.role} at Archer Infotech, Pune`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                      {trainer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">
                      {trainer.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{trainer.role}</div>
                    <div className="text-xs text-primary font-medium mt-1">
                      {trainer.experience} experience
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      </article>

      {/* Related Courses — internal linking for discoverability + SEO */}
      {(() => {
        const related = getRelatedCourses(slug, 4);
        if (related.length === 0) return null;
        return (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Courses</h2>
              <p className="text-muted-foreground mb-8">
                Students who joined {course.shortTitle} also explored these:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((rc) => {
                  const href =
                    rc.categorySlug === "bootcamps"
                      ? `/bootcamps/${rc.slug.replace("-bootcamp", "")}`
                      : `/courses/${rc.categorySlug}/${rc.slug}`;
                  return (
                    <Link
                      key={rc.id}
                      href={href}
                      className="group rounded-lg border p-5 hover:border-primary hover:shadow-md transition-all"
                    >
                      <Badge variant="outline" className="text-xs mb-2">
                        {rc.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {rc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rc.shortDescription}
                      </p>
                      <div className="mt-3 text-sm text-primary font-medium">
                        View course →
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Related reading — blog posts matched against course keywords.
          Renders nothing when no posts overlap. P5-28. */}
      <RelatedReading posts={relatedReading} courseTitle={course.shortTitle} />

      {/* P7-33 — course-matched student feedback. Pairs with the
          aggregateRating + review[] block embedded in CourseJsonLd above
          so the visible signal and structured-data signal say the same
          thing. Renders nothing when no testimonials match. */}
      {courseTestimonials.length > 0 && (
        <section
          aria-labelledby="course-feedback-heading"
          className="py-12 bg-muted/30 border-t"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Student Feedback
              </p>
              <h2
                id="course-feedback-heading"
                className="text-2xl md:text-3xl font-bold mb-3"
              >
                What {course.shortTitle} students say
              </h2>
              <p className="text-muted-foreground text-sm">
                {courseTestimonials.length}{" "}
                published testimonial
                {courseTestimonials.length !== 1 && "s"} from{" "}
                {course.shortTitle} students, alongside our overall{" "}
                {googleReviews.ratingValue.toFixed(1)}★ rating from{" "}
                {googleReviews.ratingCount} Google reviews.{" "}
                <Link
                  href="/testimonials"
                  className="text-primary hover:underline font-medium"
                >
                  See all
                </Link>
                .
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {courseTestimonials.slice(0, 6).map((t) => (
                <Card key={t.id} className="h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <Quote className="h-7 w-7 text-secondary mb-3 shrink-0" />
                    <p className="text-sm text-muted-foreground flex-grow mb-4 leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="pt-3 border-t">
                      <div className="font-semibold text-sm">{t.name}</div>
                      {(t.role || t.placedAt) && (
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                          {t.role && t.placedAt && " — placed at "}
                          {!t.role && t.placedAt && "Placed at "}
                          {t.placedAt}
                        </div>
                      )}
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-secondary text-secondary"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related tools, comparisons & guides — contextual cross-link block
          that pulls in the salary calculator + roadmap + topic-matched
          /compare/* and /guides/* pages. Compounds internal-link authority
          for the new SEO assets and improves the research journey. */}
      {(() => {
        const assets = getRelatedAssetsForCourse(course.slug, course.categorySlug);
        if (assets.length === 0) return null;
        const iconFor = (t: "tool" | "compare" | "guide") =>
          t === "tool" ? Calculator : t === "compare" ? Scale : ListChecks;
        const labelFor = (t: "tool" | "compare" | "guide") =>
          t === "tool" ? "Tool" : t === "compare" ? "Comparison" : "Guide";
        return (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Related tools, comparisons & guides
              </h2>
              <p className="text-muted-foreground mb-8">
                Plan your {course.shortTitle} path — see salaries, compare with
                alternatives, and pick up the practical guides students use.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {assets.map((a) => {
                  const Icon = iconFor(a.type);
                  return (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="group flex items-start gap-3 rounded-lg border p-4 hover:border-primary hover:shadow-md transition-all"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-grow">
                        <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                          {labelFor(a.type)}
                        </span>
                        <span className="block font-semibold text-sm group-hover:text-primary transition-colors">
                          {a.title}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary font-medium">
                          Open <ArrowRight className="h-3 w-3" />
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

      {/* P5-17 — newsletter banner. Positioned before the high-commitment
          CTA so the lower-commitment ask (free monthly briefing) catches
          considering-but-not-ready visitors. Source-tagged per course for
          analytics. Single insertion here applies to all ~45 course detail
          pages. */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement={`course-detail:${slug}`}
            variant="banner"
            headline={`${course.shortTitle} careers in Pune — monthly briefing`}
            subhead="Hiring updates, salary movements, and an employer spotlight every month. Free, unsubscribe anytime."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your {course.shortTitle} Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Enroll now and take the first step towards a successful IT career.
            Our expert trainers and placement assistance will help you achieve
            your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_bottom_cta",
              }}
            >
              Enquire Now
            </TrackedLink>
            <TrackedLink
              href="/batch-schedule"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="view_batch_schedule_clicked"
              properties={{
                course_slug: slug,
                course_title: course.title,
                location: "course_bottom_cta",
              }}
            >
              View Batch Schedule
            </TrackedLink>
            <CounselorDialogLazy
              location="course_bottom_cta"
              defaultCourse={course.title}
              triggerLabel="Ask a Counsellor"
              triggerClassName="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            />
          </div>
        </div>
      </section>
    </>
  );
}
