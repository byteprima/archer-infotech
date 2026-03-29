import { HeroSection } from "@/components/home/hero-section";
import { USPSection } from "@/components/home/usp-section";
import { CoursesSection } from "@/components/home/courses-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CompaniesSection } from "@/components/home/companies-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <USPSection />
      <CoursesSection />
      <TestimonialsSection />
      <CompaniesSection />
      <CTASection />
    </>
  );
}
