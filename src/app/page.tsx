export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { USPSection } from "@/components/home/usp-section";
import { CoursesSection } from "@/components/home/courses-section";
import { BootcampsSection } from "@/components/home/bootcamps-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CompaniesSection } from "@/components/home/companies-section";
import { CTASection } from "@/components/home/cta-section";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig } from "@/data/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { ReviewListJsonLd } from "@/components/seo/json-ld";

// Match <title>, og:title and visible <h1> exactly — Pillar 1 #11.
export const metadata: Metadata = buildPageMetadata({
  title: `Pune's Most Trusted IT Training Institute Since ${siteConfig.foundingYear}`,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const testimonials = await db
    .select({
      id: testimonialsTable.id,
      name: testimonialsTable.name,
      role: testimonialsTable.role,
      company: testimonialsTable.company,
      courseTaken: testimonialsTable.courseTaken,
      content: testimonialsTable.content,
      rating: testimonialsTable.rating,
      photoUrl: testimonialsTable.photoUrl,
      linkedinUrl: testimonialsTable.linkedinUrl,
      githubUrl: testimonialsTable.githubUrl,
      placedAt: testimonialsTable.placedAt,
    })
    .from(testimonialsTable)
    .where(eq(testimonialsTable.isPublished, true))
    .limit(6);

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
        }))}
      />

      <HeroSection />
      <USPSection />
      <BootcampsSection />
      <CoursesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CompaniesSection />
      <CTASection />
    </>
  );
}
