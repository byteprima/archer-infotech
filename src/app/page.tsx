// ISR — re-render every 10 min instead of every request. Combined with the
// Cloudflare s-maxage headers in next.config, repeat visits hit the edge
// cache; LCP variance drops. revalidateTag("testimonials") in the admin
// write path makes edits show up immediately.
export const revalidate = 600;

import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { USPSection } from "@/components/home/usp-section";
import { CompaniesSection } from "@/components/home/companies-section";
import { CTASection } from "@/components/home/cta-section";

/* Below-the-fold client components — lazy-imported so each ships in
 * its own chunk that hydrates on idle, not blocking initial paint /
 * TBT. ssr stays on (default) so HTML still renders for SEO + AI
 * crawlers. P-3 perf batch. */
const CoursesSection = nextDynamic(
  () => import("@/components/home/courses-section").then((m) => m.CoursesSection),
);
const BootcampsSection = nextDynamic(
  () => import("@/components/home/bootcamps-section").then((m) => m.BootcampsSection),
);
const TestimonialsSection = nextDynamic(
  () => import("@/components/home/testimonials-section").then((m) => m.TestimonialsSection),
);
import { getHomeTestimonials } from "@/lib/actions/public-testimonials";
import { siteConfig } from "@/data/site-config";
import { getDisplayRating } from "@/lib/reviews/rating";
import { buildPageMetadata } from "@/lib/seo";
import { ReviewListJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { IconSprite } from "@/components/ui/icon-sprite";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { LastUpdated } from "@/components/seo/last-updated";
import { HOME_LAST_REVIEWED } from "@/lib/seo/content-dates";
import {
  SourceCitations,
  type SourceCitation,
} from "@/components/seo/source-citations";
import { homeFaqs } from "@/data/faqs";

/* Outbound citations for the factual claims this page makes. Each entry
 * has to back something actually stated above it — the Google listing
 * carries the public rating and review count, and the vendor references
 * are the official syllabi/documentation behind the named course tracks.
 * NASSCOM and similar industry bodies were deliberately left out: the
 * homepage makes no national hiring-market claim for them to support, and
 * a citation that backs nothing is noise. Audit 2026-08-06. */
const homeSources: SourceCitation[] = [
  {
    label: "Archer Infotech on Google Maps",
    href: siteConfig.googleMaps.url,
    supports:
      "the public Google rating and student review count quoted on this page.",
  },
  {
    label: "Oracle Java SE documentation",
    href: "https://docs.oracle.com/en/java/javase/",
    supports:
      "the official Java language reference underpinning the Java and Java Full Stack tracks.",
  },
  {
    label: "Python Software Foundation documentation",
    href: "https://docs.python.org/3/",
    supports:
      "the official Python reference underpinning the Python, Data Science and AI/ML tracks.",
  },
  {
    label: "AWS Certification",
    href: "https://aws.amazon.com/certification/",
    supports:
      "the official AWS certification paths the Cloud and DevOps tracks prepare for.",
  },
  {
    label: "Microsoft Credentials",
    href: "https://learn.microsoft.com/en-us/credentials/",
    supports:
      "the official Azure certification paths the Cloud track prepares for.",
  },
];

// Match <title>, og:title and visible <h1> exactly — Pillar 1 #11.
// Home-specific description (overrides siteConfig.description fallback) —
// leads with brand to disambiguate from Archer Aviation / Archer Daniels
// Midland on the "archer" SERP (76 impr / 0 clicks at pos 11.4 per GSC
// 2026-06-04). Front-loads the 90% placement rate + concrete hiring
// partners to drive SERP CTR. Companies are framed as partners (not
// "placement at X") so the 90% reads as the overall rate, not a
// per-company claim. ~155 chars, fits Google's desktop snippet window
// and clears the 150-char floor some SEO auditors flag.
export const metadata: Metadata = buildPageMetadata({
  title: `Pune's Most Trusted IT Training Institute Since ${siteConfig.foundingYear}`,
  description:
    "Archer Infotech — Pune's IT training institute since 2009. Java, Python, Full Stack, Cloud & AI courses, a 90% placement rate, partners like TCS & Infosys.",
  path: "/",
});

export default async function HomePage() {
  const testimonials = await getHomeTestimonials();
  const rating = await getDisplayRating();

  return (
    <>
      {/* Icon-sprite defs (star/check/arrow) — defined once here so the home
          sections below can reference them via <use> instead of re-inlining
          each lucide path dozens of times. See components/ui/icon-sprite. */}
      <IconSprite />

      {/* WebSite schema — Sitelinks Searchbox eligibility + brand entity
          anchor for the Knowledge Panel. Homepage only. Audit 2026-06-21. */}
      <WebSiteJsonLd />

      {/* Per-testimonial Review schema — each visible testimonial gets a
          structured Review block referencing the EducationalOrganization
          (Pillar 3 P3-13 / Pillar 7 cross-feed). Emit BEFORE the visible
          section so the schema is in initial HTML even if the section is
          rendered as a client component. */}
      <ReviewListJsonLd
        reviews={testimonials.map((t) => ({
          id: t.id,
          authorName: t.name,
          authorRole: t.role,
          authorCompany: t.placedAt || t.company,
          body: t.content,
          rating: t.rating,
          course: t.courseTaken,
          // P8-04 — datePublished from DB createdAt; truthful.
          datePublished: t.createdAt
            ? new Date(t.createdAt).toISOString().slice(0, 10)
            : null,
        }))}
      />

      <HeroSection />

      {/* Definitive Answer Paragraph — first body content the crawler reads.
          ~95 words, factual, every sentence stands alone, AI-citation
          ready. P8-07. */}
      <DefinitiveAnswer eyebrow="What is Archer Infotech?">
        Archer Infotech is an IT training institute in Kothrud, Pune, founded
        in 2009. Over 17+ years, more than 10,000 students have been trained
        in Java, Python, Full Stack Development, Data Science, AI/ML,
        AWS, DevOps and Cloud, with 5,000+ placed at MNCs including TCS,
        Infosys, Wipro, Tech Mahindra, Persistent Systems and 100+ other
        hiring partners. The institute maintains a 90% placement rate and a{" "}
        {rating.ratingValue.toFixed(1)}-star Google rating across{" "}
        {rating.ratingCount} reviews, and is led by trainers with 15+
        years of MNC
        experience. Courses run weekday, weekend and online with lifetime LMS
        access, certification and placement assistance.
      </DefinitiveAnswer>

      {/* Visible freshness stamp. The homepage previously carried no
          human-readable date at all — the only date in the HTML was
          `datePublished` buried inside the Review payload. Freshness is a
          real retrieval signal for AI engines on a topic ("IT training in
          Pune") where currency matters. Sits directly under the definitive
          answer so the claim and its as-of date are read together. */}
      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <LastUpdated iso={HOME_LAST_REVIEWED} label="Last reviewed" />
        </div>
      </div>

      <USPSection />
      <BootcampsSection />
      <CoursesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CompaniesSection />

      {/* Server-rendered FAQ block + FAQPage JSON-LD. AI engines lift these
          Q&A pairs into responses; Google can surface them as Featured
          Snippets and in AI Overviews. P8-08. */}
      <FaqSection
        heading="Archer Infotech — Frequently Asked Questions"
        intro={`The most common questions about Pune’s ${siteConfig.foundingYear}-founded IT training institute, its courses, fees, trainers and placement support.`}
        items={homeFaqs}
      />

      {/* Internal-link surface for high-value hub pages that are otherwise
          reachable only from the footer. The homepage is the most-crawled
          page, so linking here gives Googlebot a strong discovery path.
          Added 2026-07-11 after GSC showed /questions and the Python
          interview guide as "unknown to Google" despite existing footer/
          hub links. Placed after the FAQ block since it is topically the
          same "questions & guides" surface. */}
      <section aria-labelledby="resources-heading" className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="resources-heading" className="text-xl font-semibold mb-3">
              More free resources for Pune IT learners
            </h2>
            <p className="text-muted-foreground">
              Browse our{" "}
              <Link
                href="/questions"
                className="text-primary underline underline-offset-4 hover:no-underline"
              >
                IT career questions &amp; answers
              </Link>{" "}
              and{" "}
              <Link
                href="/guides"
                className="text-primary underline underline-offset-4 hover:no-underline"
              >
                free career guides
              </Link>
              , including{" "}
              <Link
                href="/guides/python-interview-questions-pune-freshers-2026"
                className="text-primary underline underline-offset-4 hover:no-underline"
              >
                Python interview questions for Pune freshers
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <SourceCitations
        intro="Third-party references for the ratings and certification paths cited above."
        items={homeSources}
      />

      <CTASection />
    </>
  );
}
