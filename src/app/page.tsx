export const dynamic = "force-dynamic";

import { HeroSection } from "@/components/home/hero-section";
import { USPSection } from "@/components/home/usp-section";
import { CoursesSection } from "@/components/home/courses-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CompaniesSection } from "@/components/home/companies-section";
import { CTASection } from "@/components/home/cta-section";
import { db } from "@/db";
import { testimonials as testimonialsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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
      <HeroSection />
      <USPSection />
      <CoursesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CompaniesSection />
      <CTASection />
    </>
  );
}
