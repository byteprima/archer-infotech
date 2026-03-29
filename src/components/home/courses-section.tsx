"use client";

import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPopularCourses, type Course } from "@/data/courses";

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary/20">
            {course.shortTitle.charAt(0)}
          </div>
          {course.isPopular && (
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
              Popular
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/courses/${course.categorySlug}/${course.slug}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          )}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export function CoursesSection() {
  const popularCourses = getPopularCourses().slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular <span className="text-primary">Courses</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore our most sought-after courses designed to help you succeed in
              today&apos;s competitive IT industry.
            </p>
          </div>
          <Link href="/courses" className={cn(buttonVariants({ variant: "outline" }))}>
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
