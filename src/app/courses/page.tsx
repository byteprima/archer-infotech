import { Suspense } from "react";
import { Metadata } from "next";
import { CoursesFilter } from "@/components/courses/courses-filter";
import { buildPageMetadata } from "@/lib/seo";
import { DefinitiveAnswer } from "@/components/seo/definitive-answer";
import { FaqSection } from "@/components/seo/faq-section";
import { coursesFaqs } from "@/data/faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Training Courses in Pune",
  description:
    "Explore 40+ classroom and online IT training courses in Pune — Java, Python, AWS, DevOps, Full Stack, Data Science, AI/ML, Cloud and more, with placement assistance.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              IT Training Courses in Pune | 40+ Programs with Placement Assistance
            </h1>
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
    </>
  );
}
