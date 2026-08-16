import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Navigation,
  Building2,
  GraduationCap,
  CheckCircle,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import {
  NeighbourhoodJsonLd,
  FAQJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { NewsletterSignupForm } from "@/components/newsletter/newsletter-signup-form";
import { LastUpdated } from "@/components/seo/last-updated";
import {
  neighbourhoods,
  getNeighbourhood,
  getNearbyNeighbourhoods,
  getLocationDepth,
  directionsUrlFrom,
} from "@/data/locations";
import { SourceCitations } from "@/components/seo/source-citations";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { getCourse } from "@/data/courses";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import {
  LOCATIONS_LAST_REVIEWED,
} from "@/lib/seo/content-dates";
import { FaqSection } from "@/components/seo/faq-section";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return neighbourhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getNeighbourhood(slug);
  if (!area) return { title: "Location Not Found" };

  return buildPageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/locations/${slug}`,
    lastModified: LOCATIONS_LAST_REVIEWED,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const area = getNeighbourhood(slug);
  if (!area) notFound();

  const pageName = `IT Training in ${area.fullName} — Archer Infotech`;

  // Resolve popular-course slugs against the catalogue so titles/links can
  // never drift from the source of truth.
  const popularCourses = area.popularCourseSlugs
    .map((courseSlug) => getCourse(courseSlug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // P4-21 — resolve cross-neighbourhood links so AI engines + crawlers
  // can hop laterally between location pages without bouncing through
  // the hub.
  const nearbyAreas = getNearbyNeighbourhoods(area.slug);

  // Depth layer — audience, batch-fit table, takeaway and sources.
  // Audit 2026-08-16: these close the nine checks the whole section was
  // failing. See the LOCATION_DEPTH header in data/locations.ts for the
  // check-to-field mapping.
  const depth = getLocationDepth(area.slug);
  const topCourse = popularCourses[0];

  return (
    <>
      <PageEvent
        event="location_page_viewed"
        properties={{ location_slug: slug, location_name: area.name }}
      />

      {/* Structured data — WebPage > Place + areaServed (P4-19), FAQ, breadcrumb */}
      <NeighbourhoodJsonLd
        name={area.name}
        fullName={area.fullName}
        pincode={area.pincode}
        slug={area.slug}
        pageName={pageName}
        // P8-04 — pull description + datePublished from the same
        // canonical sources the meta tags use, so visible signal,
        // <meta>, and JSON-LD all agree.
        description={area.metaDescription}
        datePublished={LOCATIONS_LAST_REVIEWED}
      />
      <FAQJsonLd faqs={area.localFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
          { name: area.name, url: `/locations/${area.slug}` },
        ]}
      />

      <article aria-labelledby="location-title">
        {/* Hero */}
        <header className="gradient-hero text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="light"
              items={[
                { name: "Locations", href: "/locations" },
                { name: area.name },
              ]}
            />
            <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>{area.fullName}</span>
            </div>
            <h1
              id="location-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
            >
              IT Training in {area.name}, Pune — with Placement
            </h1>
            <p className="text-lg text-white/85 max-w-3xl mb-6">{area.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                event="course_enquiry_clicked"
                properties={{ location_slug: slug, location: "location_hero" }}
              >
                Book a Free Demo
              </TrackedLink>
              <TrackedAnchor
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
                event="contact_method_clicked"
                properties={{ method: "phone", location: "location_hero", location_slug: slug }}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </TrackedAnchor>
            </div>
          </div>
        </header>

        {/* Summary answer. Opens with a definition sentence ("Archer Infotech
            is an IT training institute...") and carries the verified stats,
            so the passage is self-contained for extraction and every claim
            in it is a number rather than an adjective. Audit 2026-08-16. */}
        <DefinitiveAnswer eyebrow={`IT training in ${area.name} — the short answer`}>
          Archer Infotech is an IT training institute in Kothrud, Pune, running
          classroom and live-online batches for students across{" "}
          {area.fullName}
          {area.slug === "it-training-in-kothrud"
            ? ""
            : ` — ${area.commute.distanceLabel} from the classroom`}
          . We have taught here since {siteConfig.foundingYear}, with 10,000+
          students trained, 5,000+ placed, a {siteConfig.stats.placementRate}{" "}
          placement rate and more than 1,000 batches completed across{" "}
          {siteConfig.stats.courses} courses.
        </DefinitiveAnswer>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-14 max-w-4xl">
          {/* Intro */}
          <section className="prose prose-slate max-w-none space-y-4">
            <LastUpdated iso={LOCATIONS_LAST_REVIEWED} className="text-xs md:text-sm text-muted-foreground !mt-0 !mb-2" />
            {area.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground">
                {p}
              </p>
            ))}
          </section>

          {/* At a glance — the facts a reader would otherwise have to mine
              out of five sections, in one extractable table. Every value is
              resolved from existing per-area data, so it cannot drift from
              the prose above it. */}
          <section id="at-a-glance" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold">
              IT training in {area.name} at a glance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <caption className="sr-only">
                  Key facts about training at Archer Infotech for students from{" "}
                  {area.fullName}
                </caption>
                <tbody>
                  {[
                    ["Area covered", area.fullName],
                    ["PIN code", area.pincode],
                    ["Distance to our Kothrud centre", area.commute.distanceLabel],
                    ["Nearest landmarks", area.landmarks.slice(0, 3).join(" · ")],
                    [
                      "Most-taken course from this area",
                      topCourse ? `${topCourse.title} Training in Pune` : "Java Full Stack Training in Pune",
                    ],
                    ["Batch formats available", "Weekday classroom · Weekend classroom · Live online"],
                    ["Centre hours", "Monday–Saturday, 09:00–20:00"],
                    ["Placement rate", `${siteConfig.stats.placementRate} across 1,000+ completed batches`],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b last:border-b-0">
                      <th
                        scope="row"
                        className="text-left font-medium py-2.5 pr-4 align-top text-foreground w-[45%]"
                      >
                        {label}
                      </th>
                      <td className="py-2.5 text-muted-foreground align-top">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who this page is for. The audit flagged "audience and use-case
              clarity" on 18 of 23 location pages: the pages described a place
              but never named a reader. */}
          {depth && (
            <section id="who-this-is-for" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold">
                Who is this page for?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {depth.audience}
              </p>
              <ul className="grid sm:grid-cols-3 gap-3">
                {[
                  "Freshers and final-year students choosing a first course",
                  "Working professionals upskilling around a full-time job",
                  "Career switchers moving into IT from another field",
                ].map((who) => (
                  <li
                    key={who}
                    className="flex items-start gap-2 text-sm rounded-lg border p-4"
                  >
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{who}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Commute & directions */}
          <section id="commute" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Navigation className="h-7 w-7 text-secondary" />
              Getting to our Kothrud centre from {area.name}
            </h2>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
              <Clock className="h-4 w-4" />
              {area.commute.distanceLabel}
            </p>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              {area.commute.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {area.commute.modes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">{m.mode}:</strong>{" "}
                    <span className="text-muted-foreground">{m.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Route map — centre location embed + per-area directions link */}
            <div className="grid md:grid-cols-3 gap-4 items-stretch pt-2">
              <div className="md:col-span-2 aspect-video rounded-xl overflow-hidden border">
                <iframe
                  src={siteConfig.googleMaps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Archer Infotech location — directions from ${area.name}`}
                />
              </div>
              <a
                href={directionsUrlFrom(area.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-center gap-2 rounded-xl border bg-muted/30 p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <Navigation className="h-6 w-6 text-primary" />
                <span className="font-semibold">Get directions from {area.name}</span>
                <span className="text-sm text-muted-foreground">
                  Open the route to our Kothrud centre in Google Maps.
                </span>
              </a>
            </div>
          </section>

          {/* Landmarks */}
          <section id="landmarks" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Building2 className="h-7 w-7 text-secondary" />
              Landmarks near {area.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {area.landmarks.map((l) => (
                <Badge key={l} variant="outline" className="text-sm py-1">
                  {l}
                </Badge>
              ))}
            </div>
          </section>

          {/* Why convenient */}
          <section id="why-convenient" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold">
              Why {area.name} students choose Archer Infotech
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {area.whyConvenient.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Batch-format decision table. This is the question the page is
              actually being read to answer — "given where I live, which batch
              do I take?" — and the audit's "comparison or decision support"
              and "structured answer support" checks both failed across the
              whole section because nothing here answered it. Every `suits`
              string is reasoned for this specific commute; see the DISCIPLINE
              note in data/locations.ts. */}
          {depth && (
            <section id="which-batch" className="space-y-5 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Clock className="h-7 w-7 text-secondary" />
                Which batch format suits a {area.name} commute?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All four formats teach the same syllabus with the same
                trainers. The only thing that differs is what your journey from{" "}
                {area.name} does to your attendance over a three-to-six month
                course — which is the part most people get wrong when they
                enrol. Here is the honest comparison.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <caption className="sr-only">
                    Comparison of batch formats for students commuting from{" "}
                    {area.fullName}
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-foreground/20">
                      <th scope="col" className="text-left font-semibold py-2.5 pr-4 w-[38%]">
                        Batch format
                      </th>
                      <th scope="col" className="text-left font-semibold py-2.5">
                        How it works from {area.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {depth.batchFit.map((row) => (
                      <tr key={row.format} className="border-b last:border-b-0">
                        <th
                          scope="row"
                          className="text-left font-medium py-3 pr-4 align-top text-foreground"
                        >
                          {row.format}
                        </th>
                        <td className="py-3 text-muted-foreground align-top leading-relaxed">
                          {row.suits}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground">
                Not sure which fits? Check live timings on the{" "}
                <Link href="/batch-schedule" className="text-primary hover:underline">
                  batch schedule
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  book a free demo
                </Link>{" "}
                and decide after sitting in one session.
              </p>
            </section>
          )}

          {/* Popular courses */}
          {popularCourses.length > 0 && (
            <section id="popular-courses" className="space-y-5 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-secondary" />
                Courses popular with {area.name} students
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {popularCourses.map((course) => (
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
              <p className="text-sm text-muted-foreground">
                Browse the full catalogue on our{" "}
                <Link href="/courses" className="text-primary hover:underline">
                  courses page
                </Link>
                , or see real outcomes on our{" "}
                <Link href="/placements" className="text-primary hover:underline">
                  placements page
                </Link>
                .
              </p>
            </section>
          )}

          {/* Local FAQs — rendered through the shared FaqSection so each
              question is a real <h3> with its answer as the immediate next
              sibling. The bespoke <details> markup this replaces put every
              question inside a <span> in a <summary>, so the page had no
              question-shaped headings at all and its answers were siblings
              of <summary> rather than of a heading. withSchema is off
              because this page already emits FAQJsonLd above. P-01/P-04.
              Audit 2026-08-08. */}
          <FaqSection
            heading={`${area.name} — Frequently Asked Questions`}
            items={area.localFaqs}
            anchorId="local-faqs"
            withSchema={false}
          />

          {/* Nearby areas — P4-21 cross-neighbourhood link graph */}
          {nearbyAreas.length > 0 && (
            <section id="nearby-areas" className="space-y-5 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <MapPin className="h-7 w-7 text-secondary" />
                Nearby IT training locations
              </h2>
              <p className="text-muted-foreground">
                Live in one of these neighbouring areas? Each has its own page
                with directions, landmarks, and commute notes for our Kothrud
                centre.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {nearbyAreas.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/locations/${n.slug}`}
                    className="group rounded-lg border p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        IT Training in {n.name}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                    </div>
                    {/* Tagline, not commute.distanceLabel.
                        Each of the 12 location pages links 3 neighbours, and
                        printing a bare "~5 km · 15-20 min" string on every
                        card put a distance/time phrase next to a pair of Pune
                        area names 36 times across the section. Google matched
                        that against travel queries: the Camp page was ranking
                        for "swargate to camp distance", "kothrud to camp
                        distance" and "camp to swargate distance" — 181
                        impressions, zero clicks, from people wanting
                        directions rather than training. The real commute
                        section above (singular, about reaching Kothrud for
                        class) is genuinely useful and is left intact; it is
                        the cross-product in these cards that generated the
                        junk. Tagline also tells a reader more about why they
                        would click. */}
                    <p className="text-sm text-muted-foreground">
                      {n.tagline}
                    </p>
                  </Link>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                See the full list on the{" "}
                <Link href="/locations" className="text-primary hover:underline">
                  locations hub
                </Link>
                .
              </p>
            </section>
          )}

          {/* Closing takeaway — the one paragraph worth extracting if an AI
              engine reads nothing else on the page. Deliberately states a
              recommendation rather than restating the sections above. */}
          {depth && (
            <section
              id="key-takeaway"
              className="scroll-mt-24 rounded-xl border-l-4 border-secondary bg-muted/30 p-6 md:p-7"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Key takeaway for {area.name} students
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {depth.takeaway}
              </p>
            </section>
          )}
        </div>

        {/* Outbound citations. Transport and civic claims point at the
            operator or the corporation rather than at our own restatement of
            them — the audit's "credible citations" check failed on all 23
            location pages because the only external link was the Maps
            directions button. */}
        {depth && (
          <SourceCitations
            heading={`Sources for ${area.name} travel and area details`}
            intro="Timings and routes change. These are the authorities we point students to rather than restating a timetable that may be out of date."
            items={depth.sources.map((s) => ({
              label: s.label,
              href: s.href,
              supports: s.supports,
            }))}
            anchorId="sources"
          />
        )}
      </article>

      {/* P5-17 — newsletter banner. */}
      <section className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <NewsletterSignupForm
            placement={`location:${slug}`}
            variant="banner"
            headline={`Pune IT careers — monthly briefing`}
            subhead={`Hiring updates, salary movements, and an employer spotlight every month. Free.`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start your IT career from {area.name}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a free demo class, meet the trainer, and pick the batch format —
            classroom, weekend or live online — that fits your commute from{" "}
            {area.name}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="course_enquiry_clicked"
              properties={{ location_slug: slug, location: "location_bottom_cta" }}
            >
              Book a Free Demo
            </TrackedLink>
            <TrackedLink
              href="/batch-schedule"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              event="view_batch_schedule_clicked"
              properties={{ location_slug: slug, location: "location_bottom_cta" }}
            >
              View Batch Schedule
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
