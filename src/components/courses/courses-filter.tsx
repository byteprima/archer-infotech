"use client";

import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
import { courses, categories, type Course } from "@/data/courses";
import { cn } from "@/lib/utils";

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.categorySlug}/${course.slug}`} className="block h-full">
      <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/20 h-full flex flex-col cursor-pointer">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
            <CourseImagePlaceholder course={course} />
            {course.isPopular && (
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground z-10">
                Popular
              </Badge>
            )}
            {course.isFeatured && !course.isPopular && (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground z-10">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {course.shortDescription}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              {course.level}
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-4 border-t-0 bg-transparent flex-shrink-0 mt-auto">
          <span className="w-full inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function CoursesFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySectionRef = useRef<HTMLElement>(null);
  const selectedCategory = searchParams.get("category");

  const setSelectedCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.replace(`/courses?${params.toString()}`, { scroll: false });
    categorySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.categorySlug === selectedCategory)
    : courses;

  return (
    <>
      {/* Categories Section */}
      <section ref={categorySectionRef} className="py-6 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                selectedCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                  selectedCategory === category.slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory
                ? `${categories.find((c) => c.slug === selectedCategory)?.name} Courses`
                : "All Courses"}{" "}
              ({filteredCourses.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
