// ISR — testimonials are cached for 10 min so the rendered HTML can be
// Cloudflare-cached and Googlebot-served without a per-request DB hit.
// Admin edits push instantly via revalidateTag("testimonials").
export const revalidate = 600;

import { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  Quote,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { LinkedinIcon, GitHubIcon } from "@/components/common/social-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { LastUpdated } from "@/components/seo/last-updated";
import {
  BreadcrumbJsonLd,
  ReviewListJsonLd,
  type ReviewSchemaInput,
} from "@/components/seo/json-ld";
import { getAllPublishedTestimonials } from "@/lib/actions/public-testimonials";
import { siteConfig, googleReviews } from "@/data/site-config";
import { testimonialsFaqs } from "@/data/testimonial-faqs";
import { buildPageMetadata } from "@/lib/seo";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

export const metadata: Metadata = buildPageMetadata({
  // P3-22 — original 85-char title was over the 60-char Google
  // snippet budget. Brand stays in the title since the page IS the
  // brand's review hub; the buildPageMetadata auto-skip suffix logic
  // detects "Archer Infotech" and won't double it.
  title: `Archer Infotech Reviews — ${googleReviews.ratingValue.toFixed(1)}★ from ${googleReviews.ratingCount} Google Reviews`,
  description: `Read ${googleReviews.ratingValue.toFixed(1)}-star Google-verified reviews + placement testimonials from Archer Infotech students. Names, courses, hiring companies and LinkedIn profiles — all verifiable, none fabricated. Rating verified ${googleReviews.verifiedOn}.`,
  path: "/testimonials",
  lastModified: EVERGREEN_LAST_REVIEWED,
});

/**
 * Course → track-grouping map. Reduces 40+ course names to ~8 buckets so
 * the "filter by track" UX is usable. Anything not matched falls into
 * "Other Tracks". The grouping is content-only — IDs in this list are
 * substrings matched case-insensitively against the testimonial's
 * `courseTaken` field.
 */
const TRACK_GROUPS: Array<{
  slug: string;
  label: string;
  matches: string[];
}> = [
  { slug: "java", label: "Java Full Stack", matches: ["java"] },
  { slug: "python", label: "Python", matches: ["python"] },
  { slug: "mern", label: "MERN / MEAN Stack", matches: ["mern", "mean", "react", "node"] },
  { slug: "dotnet", label: ".NET Full Stack", matches: [".net", "dotnet"] },
  { slug: "data-ai", label: "Data Science & AI", matches: ["data", "machine learning", "ml", "ai", "analytics"] },
  { slug: "cloud-devops", label: "Cloud & DevOps", matches: ["aws", "azure", "devops", "cloud", "kubernetes"] },
  { slug: "testing", label: "Software Testing", matches: ["testing", "selenium", "qa"] },
];

function classifyTrack(courseTaken: string | null): string {
  if (!courseTaken) return "other";
  const c = courseTaken.toLowerCase();
  for (const g of TRACK_GROUPS) {
    if (g.matches.some((m) => c.includes(m))) return g.slug;
  }
  return "other";
}

/**
 * Build the alt text for a testimonial avatar. Mirrors the home-page
 * P3-14 alt template so AI engines see consistent semantic alt across
 * surfaces.
 */
function buildTestimonialAlt(
  name: string,
  placedAt: string | null,
  courseTaken: string | null,
): string {
  const parts = [name];
  if (placedAt && courseTaken) {
    parts.push(`placed at ${placedAt} after ${courseTaken}`);
  } else if (placedAt) {
    parts.push(`placed at ${placedAt}`);
  } else if (courseTaken) {
    parts.push(`student of ${courseTaken}`);
  } else {
    parts.push("Archer Infotech alumnus");
  }
  return `${parts.join(", ")} at Archer Infotech, Pune`;
}

export default async function TestimonialsPage() {
  const dbTestimonials = await getAllPublishedTestimonials();

  // Group by track for the by-track section. Falls back to a single
  // "all" group when the DB is empty (build-time prerender) so the page
  // still renders without crashing.
  const grouped = TRACK_GROUPS.map((g) => ({
    ...g,
    items: dbTestimonials.filter((t) => classifyTrack(t.courseTaken) === g.slug),
  })).filter((g) => g.items.length > 0);

  const otherTrack = dbTestimonials.filter(
    (t) => classifyTrack(t.courseTaken) === "other",
  );

  // Headline aggregate — read from the single verified GBP constant. These
  // were previously literals here (126 / 5.0) that drifted out of step with
  // the live profile and with the AggregateRating in the JSON-LD. Anything
  // rendering the rating now derives it, so one verification updates every
  // surface at once.
  const googleReviewCount = googleReviews.ratingCount;
  const googleRatingValue = googleReviews.ratingValue;
  const onSiteTestimonialCount = dbTestimonials.length;
  const uniqueCompanies = new Set(
    dbTestimonials
      .map((t) => t.placedAt || t.company)
      .filter((c): c is string => Boolean(c)),
  ).size;

  // Review schema payload — only the testimonials that have content
  // qualify, and we cap at the top 50 to keep the JSON-LD blob
  // reasonable for AI-crawler ingestion.
  const reviewSchemas: ReviewSchemaInput[] = dbTestimonials
    .slice(0, 50)
    .map((t) => ({
      id: t.id,
      authorName: t.name,
      authorCompany: t.placedAt || t.company,
      authorRole: t.role,
      body: t.content,
      rating: t.rating ?? 5,
      course: t.courseTaken,
      // P8-04 — datePublished from the DB createdAt; truthful, not invented.
      datePublished: t.createdAt
        ? new Date(t.createdAt).toISOString().slice(0, 10)
        : null,
    }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />
      {/* P8-04 — AggregateRatingJsonLd intentionally NOT emitted here:
          the canonical OrganizationJsonLd block (in the root layout) now
          carries the same verified GBP rating site-wide via the @id-linked
          EducationalOrganization. A second top-level Org block here
          would orphan the rating to a partial Org missing url/address/
          telephone — caught by the P8-04 validator. The full Review[]
          on the page (next) gives the same rating-context AI engines
          and Google use for SERP star eligibility, attached to the
          page's Reviews not a redundant Org. */}
      <ReviewListJsonLd reviews={reviewSchemas} />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[{ name: "Testimonials" }]}
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium mb-4">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span>Verified Google &amp; LinkedIn-cross-checked</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Archer Infotech Reviews &amp; Student Testimonials
            </h1>
            <p className="text-lg text-white/85 mb-6">
              {googleRatingValue.toFixed(1)}-star average across{" "}
              {googleReviewCount} verified Google reviews, from students placed
              at TCS, Infosys, Tech Mahindra, Capgemini, Persistent and 100+
              other hiring partners since 2009. Every name, course and
              placement on this page is verifiable.
            </p>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/review"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                event="leave_review_clicked"
                properties={{ location: "testimonials_hero" }}
              >
                <Star className="h-4 w-4" />
                Leave a Google review
              </TrackedLink>
              <TrackedLink
                href={siteConfig.googleMaps.url}
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
                event="external_link_clicked"
                properties={{
                  destination: "google_business_profile",
                  location: "testimonials_hero",
                }}
              >
                <ExternalLink className="h-4 w-4" />
                View all on Google
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Definitive answer — proof-first opening AI engines lift verbatim */}
      <DefinitiveAnswer eyebrow="Archer Infotech Review Summary">
        Archer Infotech holds a {googleRatingValue.toFixed(1)}-star average
        across {googleReviewCount} verified Google reviews on its Kothrud
        Business Profile (read from the live profile on{" "}
        {googleReviews.verifiedOn}). The institute was founded in 2009 by
        Yogesh Patil. Reviews are unmoderated on Google — the institute does
        not run paid-review schemes, incentivise feedback, or pre-screen
        submissions, which is why the review count is smaller than at
        institutes that solicit at scale. Independent listings on JustDial
        and Sulekha carry separate multi-year rating histories.
        Testimonials surfaced on this page are a curated cross-section from
        students who completed flagship tracks (Java Full Stack, MERN,
        Python, Data Science / ML, AWS / DevOps) and were placed at TCS,
        Infosys, Wipro, Tech Mahindra, Capgemini, Persistent Systems,
        Cognizant, Accenture, L&amp;T Infotech and 100+ other hiring
        partners. Names, courses, placement companies and LinkedIn / GitHub
        profile links (where shared) are all verifiable independently.
      </DefinitiveAnswer>

      {/* Aggregate stats row */}
      <section id="aggregate-stats" className="py-12 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <LastUpdated
            iso={EVERGREEN_LAST_REVIEWED}
            className="text-xs md:text-sm text-muted-foreground mb-6 text-center"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Star,
                value: googleRatingValue.toFixed(1),
                suffix: "/ 5",
                label: "Google rating",
                detail: "Across all reviews",
              },
              {
                icon: ShieldCheck,
                value: `${googleReviewCount}+`,
                suffix: "",
                label: "Verified Google reviews",
                detail: "On Business Profile",
              },
              {
                icon: Quote,
                value: `${onSiteTestimonialCount}`,
                suffix: "",
                label: "Published testimonials",
                detail: "With explicit consent",
              },
              {
                icon: Award,
                value: `${uniqueCompanies}+`,
                suffix: "",
                label: "Placement companies",
                detail: "Represented here",
              },
            ].map((s) => (
              <Card key={s.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {s.value}
                    {s.suffix && (
                      <span className="text-base text-muted-foreground font-normal ml-1">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {s.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {s.detail}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Where reviews come from — review distribution + verification trail */}
      <section
        id="review-platforms"
        aria-labelledby="review-platforms-heading"
        className="py-16 border-t scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Where Reviews Come From
            </p>
            <h2
              id="review-platforms-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Verify our reputation across three platforms
            </h2>
            <p className="text-muted-foreground">
              No single source can be gamed without leaving a paper trail —
              we surface our reviews on every major platform Pune learners
              actually check.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Google Business Profile",
                href: siteConfig.googleMaps.url,
                rating: `${googleRatingValue.toFixed(1)} ★`,
                count: `${googleReviewCount} reviews`,
                detail:
                  "Canonical source. Unmoderated. Verifiable by anyone with a Google account.",
                cta: "View on Google Maps",
              },
              {
                name: "JustDial",
                href: "https://www.justdial.com/Pune/Archer-Infotech-Kothrud/020PXX20-XX20-200101100200-D2J1_BZDET",
                // No rating asserted: the JustDial figure has not been read
                // off the live listing on a recorded date, and quoting an
                // unverified star value here is the same failure that put a
                // stale count into the Google AggregateRating.
                rating: "Independent listing",
                count: "Verified profile",
                detail:
                  "Independent Indian local-business listing platform with multi-year review history.",
                cta: "View JustDial listing",
              },
              {
                name: "LinkedIn alumni",
                href: siteConfig.social.linkedin,
                rating: "Public profiles",
                count: "Cross-verifiable",
                detail:
                  "Many testimonials link to the student's actual LinkedIn profile — verify employment history independently.",
                cta: "View company page",
              },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-secondary">
                    {p.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">{p.count}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {p.detail}
                </p>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                  {p.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grouped by track */}
      <section id="testimonials-by-track" className="py-16 border-t scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              By Programme Track
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Testimonials by course track
            </h2>
            <p className="text-muted-foreground">
              Skip to the track you&apos;re considering. Each block surfaces
              published student feedback for that programme, with placement
              company and (where shared) LinkedIn / GitHub profile.
            </p>
          </div>

          {/* Track-jump nav — improves UX + helps Google understand
              the section hierarchy. */}
          {grouped.length > 0 && (
            <nav
              aria-label="Jump to track"
              className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto mb-12"
            >
              {grouped.map((g) => (
                <a
                  key={g.slug}
                  href={`#track-${g.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {g.label}
                  <span className="text-xs text-muted-foreground">
                    ({g.items.length})
                  </span>
                </a>
              ))}
              {otherTrack.length > 0 && (
                <a
                  href="#track-other"
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Other Tracks
                  <span className="text-xs text-muted-foreground">
                    ({otherTrack.length})
                  </span>
                </a>
              )}
            </nav>
          )}

          <div className="space-y-16 max-w-6xl mx-auto">
            {grouped.map((g) => (
              <div key={g.slug} id={`track-${g.slug}`} className="scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <span>{g.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {g.items.length} testimonial{g.items.length !== 1 && "s"}
                    </Badge>
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {g.items.map((t) => (
                    <TestimonialCard key={t.id} testimonial={t} />
                  ))}
                </div>
              </div>
            ))}

            {otherTrack.length > 0 && (
              <div id="track-other" className="scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <span>Other Tracks</span>
                    <Badge variant="outline" className="text-xs">
                      {otherTrack.length} testimonial
                      {otherTrack.length !== 1 && "s"}
                    </Badge>
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherTrack.map((t) => (
                    <TestimonialCard key={t.id} testimonial={t} />
                  ))}
                </div>
              </div>
            )}

            {dbTestimonials.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <p>
                  Testimonials are loaded from the database. If you&apos;re
                  seeing this on the live site, please try again in a
                  moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Where to go next — internal-link distribution */}
      <section
        id="related"
        aria-labelledby="related-heading"
        className="py-16 bg-muted/30 border-t scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2
              id="related-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Verify the rest of the story
            </h2>
            <p className="text-muted-foreground">
              Testimonials are one signal. Cross-check the placement record,
              the trainer roster, and the actual centre on the pages below.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                href: "/placements",
                icon: Award,
                title: "Placement record",
                detail:
                  "5,000+ placed since 2009, 90% rate, hiring partners, salary bands.",
              },
              {
                href: "/trainers",
                icon: Users,
                title: "Meet the trainers",
                detail:
                  "6-person faculty, 54+ combined years of industry experience.",
              },
              {
                href: "/locations/it-training-in-kothrud",
                icon: MapPin,
                title: "Visit the Kothrud centre",
                detail:
                  "Address, directions, neighbourhood notes — see us in person.",
              },
              {
                href: "/about/facts",
                icon: ShieldCheck,
                title: "Verified facts sheet",
                detail:
                  "Every number, date and claim — sourced and AI-citable.",
              },
            ].map((c) => (
              <TrackedLink
                key={c.href}
                href={c.href}
                className="group rounded-lg border bg-card p-5 hover:border-primary hover:shadow-md transition-all"
                event="related_link_clicked"
                properties={{
                  destination: c.href,
                  location: "testimonials_related",
                }}
              >
                <c.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground">{c.detail}</p>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs about reviews + credibility — own the trust queries */}
      <FaqSection
        heading="Testimonial &amp; Review FAQs"
        intro="The most-asked credibility questions about Archer Infotech's reviews and student testimonials — verification, authenticity, how to leave one, and what we publish vs. what stays private."
        items={testimonialsFaqs}
        anchorId="testimonial-faqs"
      />

      {/* Bottom CTA */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to become the next testimonial?
          </h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Book a free demo class, meet a trainer, and pick the batch that
            fits. Most students complete training in 3-6 months and join the
            placement pipeline that produced every review on this page.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              event="cta_clicked"
              properties={{
                cta: "enquire_now",
                location: "testimonials_bottom",
              }}
            >
              Book a Free Demo
            </TrackedLink>
            <TrackedLink
              href="/courses"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
              event="cta_clicked"
              properties={{
                cta: "explore_courses",
                location: "testimonials_bottom",
              }}
            >
              Explore Courses
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Inline TestimonialCard — rich card with photo, rating, content,
 * course, placement company, and optional LinkedIn / GitHub badges.
 * Server-rendered for SEO; no client interaction so analytics are
 * attached at the anchor level only.
 */
function TestimonialCard({
  testimonial: t,
}: {
  testimonial: Awaited<
    ReturnType<typeof getAllPublishedTestimonials>
  >[number];
}) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 pb-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-secondary mb-4 shrink-0" />
        <p className="text-muted-foreground flex-grow mb-6 leading-relaxed">
          &ldquo;{t.content}&rdquo;
        </p>
        <div className="flex items-center gap-3 pt-4 border-t">
          <Avatar className="h-12 w-12">
            {t.photoUrl && (
              <AvatarImage
                src={t.photoUrl}
                alt={buildTestimonialAlt(t.name, t.placedAt, t.courseTaken)}
              />
            )}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="font-semibold truncate">{t.name}</div>
            {(t.role || t.company) && (
              <div className="text-xs text-muted-foreground truncate">
                {t.role}
                {t.role && t.company && " at "}
                {t.company}
              </div>
            )}
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-secondary text-secondary"
                />
              ))}
            </div>
          </div>
          {(t.linkedinUrl || t.githubUrl) && (
            <div className="flex flex-col gap-1 shrink-0">
              {t.linkedinUrl && (
                <a
                  href={t.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${t.name} on LinkedIn`}
                  className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {t.githubUrl && (
                <a
                  href={t.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${t.name} on GitHub`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
        {(t.courseTaken || t.placedAt) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {t.courseTaken && (
              <Badge variant="outline" className="font-normal">
                {t.courseTaken}
              </Badge>
            )}
            {t.placedAt && (
              <Badge
                variant="outline"
                className="font-normal border-primary/30 text-primary"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Placed at {t.placedAt}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
