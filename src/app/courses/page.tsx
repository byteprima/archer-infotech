import { Suspense } from "react";
import { Metadata } from "next";
import { CoursesFilter } from "@/components/courses/courses-filter";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "IT Training Courses in Pune",
  description:
    "Explore 40+ classroom and online IT training courses in Pune — Java, Python, AWS, DevOps, Full Stack, Data Science, AI/ML, Cloud and more, with 100% placement assistance.",
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
              IT Training Courses
            </h1>
            <p className="text-lg text-white/80">
              Explore our comprehensive range of industry-relevant IT courses.
              Learn from expert trainers and get 100% placement assistance.
            </p>
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
    </>
  );
}
