// ISR — re-render every 10 min instead of every request. Combined with the
// Cloudflare s-maxage headers in next.config, repeat visits hit the edge
// cache; LCP variance drops. revalidateTag("testimonials") in the admin
// write path makes edits show up immediately.
export const revalidate = 600;

import type { Metadata } from "next";
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
import { buildPageMetadata } from "@/lib/seo";
import { ReviewListJsonLd } from "@/components/seo/json-ld";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { homeFaqs } from "@/data/faqs";

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

  return (
    <>
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
        hiring partners. The institute maintains a 90% placement rate and a
        5.0-star Google rating, and is led by trainers with 15+ years of MNC
        experience. Courses run weekday, weekend and online with lifetime LMS
        access, certification and placement assistance.
      </DefinitiveAnswer>

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

      <CTASection />
    </>
  );
}
