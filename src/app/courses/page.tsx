import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
import { courses, categories, type Course } from "@/data/courses";

export const metadata: Metadata = {
  title: "IT Training Courses in Pune",
  description:
    "Explore our comprehensive IT training courses including Java, Python, AWS, DevOps, Full Stack Development, Data Science, and more. 100% placement assistance.",
};

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/20 h-full flex flex-col">
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
        <Link
          href={`/courses/${course.categorySlug}/${course.slug}`}
          className="w-full inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

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

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/courses/${category.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">All Courses ({courses.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
