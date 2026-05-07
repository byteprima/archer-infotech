import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { categories, courses, getCategory } from "@/data/courses";
import { buildPageMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return { title: "Category Not Found" };

  return buildPageMetadata({
    title: `${category.name} Training in Pune`,
    description: `Explore ${category.name} courses at Archer Infotech, Pune — classroom and online batches, expert trainers, and placement assistance. ${category.description ?? ""}`.trim(),
    path: `/courses/${categorySlug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const categoryCourses = courses.filter((c) => c.categorySlug === categorySlug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: category.name, url: `/courses/${categorySlug}` },
        ]}
      />

      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {category.name} Training in Pune
            </h1>
            {/* Variant-rich subhead — naturally weaves the four
                head-keyword variants (training in H1; courses, classes,
                institute here) so every category page picks up keyword
                surface area without keyword stuffing. P4-06. */}
            <p className="text-base md:text-lg text-white/85 mb-3 leading-snug">
              Explore {category.name.toLowerCase()} courses, classes and
              specialisation tracks at the Archer Infotech institute in
              Kothrud, Pune.
            </p>
            {category.description && (
              <p className="text-lg text-white/80">{category.description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {category.name} Courses ({categoryCourses.length})
            </h2>
            <Link
              href="/courses"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              View all categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryCourses.map((course) => {
              const href =
                course.categorySlug === "bootcamps"
                  ? `/bootcamps/${course.slug.replace("-bootcamp", "")}`
                  : `/courses/${course.categorySlug}/${course.slug}`;
              return (
                <Link key={course.id} href={href} className="block h-full">
                  <Card className="group overflow-hidden hover:shadow-lg transition-all hover:border-primary/20 h-full flex flex-col cursor-pointer">
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
                          <Clock className="h-4 w-4" /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart className="h-4 w-4" /> {course.level}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-5 pb-5 pt-4 border-t-0 bg-transparent flex-shrink-0 mt-auto">
                      <span className="w-full inline-flex items-center justify-center h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
