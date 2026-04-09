import { Suspense } from "react";
import { Metadata } from "next";
import { CoursesFilter } from "@/components/courses/courses-filter";

export const metadata: Metadata = {
  title: "IT Training Courses in Pune",
  description:
    "Explore our comprehensive IT training courses including Java, Python, AWS, DevOps, Full Stack Development, Data Science, and more. 100% placement assistance.",
};

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

      <Suspense>
        <CoursesFilter />
      </Suspense>
    </>
  );
}
