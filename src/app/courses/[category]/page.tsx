import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, BarChart, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
import {
  courses,
  categories,
  getCategory,
  getCoursesByCategory,
  type Course,
} from "@/data/courses";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Courses in Pune`,
    description: `Explore our ${category.name} training courses in Pune. ${category.description}. Expert trainers and 100% placement assistance.`,
  };
}

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
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col">
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const categoryCourses = getCoursesByCategory(categorySlug);

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/courses"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Courses
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name} Courses
            </h1>
            <p className="text-lg text-white/80">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {categoryCourses.length} Course{categoryCourses.length !== 1 && "s"} Available
            </h2>
          </div>

          {categoryCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No courses found in this category.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center mt-4 text-primary hover:text-secondary"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                View All Courses
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Explore Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((cat) => cat.slug !== categorySlug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/courses/${cat.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
