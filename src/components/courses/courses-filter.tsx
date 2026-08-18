"use client";

import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CourseImagePlaceholder } from "@/components/courses/course-image-placeholder";
// P-12 (2026-06-04) chunk-audit fix: import light-only data so the 79 KB
// full course catalogue doesn't ship in the /courses client filter chunk —
// only fields used by the card UI (title, slug, level, duration, mode,
// shortDescription, image, categorySlug) are needed.
import {
  coursesSummary as courses,
  categories,
  type CourseSummary as Course,
} from "@/data/courses-minimal";
import { cn } from "@/lib/utils";

function getCourseHref(course: Course): string {
  if (course.categorySlug === "bootcamps") {
    return `/bootcamps/${course.slug.replace("-bootcamp", "")}`;
  }
  return `/courses/${course.categorySlug}/${course.slug}`;
}

/**
 * Category families — five hues, not one per category.
 *
 * Eleven category colours reads as confetti in a 46-card grid. These group
 * by what kind of work the course leads to, which is the distinction a
 * student is actually making when they scan: learn a language, build
 * applications, run infrastructure, work with data, or get job-ready. The
 * colour is doing taxonomy, not decoration.
 *
 * Hues sit in the same family as the site tokens (navy primary, amber
 * secondary, teal accent) so the grid stays on-brand rather than becoming a
 * separate palette.
 */
const CATEGORY_ACCENT: Record<string, string> = {
  programming: "text-[#3F5C86]",
  "full-stack-development": "text-[#4A4E9E]",
  "modern-web": "text-[#4A4E9E]",
  "mobile-app-development": "text-[#4A4E9E]",
  "cloud-devops": "text-[#12776E]",
  "cloud-certifications": "text-[#12776E]",
  "database-technologies": "text-[#12776E]",
  "data-ai": "text-[#7A4AA0]",
  "generative-ai": "text-[#7A4AA0]",
  "testing-qa": "text-[#9A6212]",
  salesforce: "text-[#9A6212]",
  bootcamps: "text-[#9A6212]",
};

/**
 * A course card is a specification, not an advertisement.
 *
 * The previous card gave badge, title, description, meta and a full-width
 * outlined button roughly equal weight, so nothing led and the two values a
 * student actually compares across courses — how long, what level — were the
 * quietest thing on it.
 *
 * Now: a coloured category eyebrow, the title as the one loud element, the
 * description held to two lines, then a labelled spec strip in tabular
 * figures. The strip is the signature: it makes 46 courses comparable at a
 * glance, which is the page's whole job.
 *
 * The full-width "View Details" button is gone. The entire card is already a
 * link, so it was a second affordance for the same action costing ~60px on
 * every one of 46 cards. The arrow keeps the affordance without the weight.
 */
function CourseCard({ course }: { course: Course }) {
  const accent = CATEGORY_ACCENT[course.categorySlug] ?? "text-primary";

  return (
    <Link href={getCourseHref(course)} className="block h-full group">
      <Card className="h-full flex flex-col overflow-hidden cursor-pointer border-border/80 transition-all duration-200 hover:border-primary/25 hover:shadow-[0_8px_28px_-12px_rgba(16,32,55,0.28)]">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative h-40 overflow-hidden bg-muted/40">
            {/* Scale the artwork, not the container — the badge above must
                stay put. motion-safe so reduced-motion users get none of it. */}
            <div className="h-full w-full transition-transform duration-300 motion-safe:group-hover:scale-[1.04]">
              <CourseImagePlaceholder course={course} />
            </div>
            {course.isPopular && (
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground z-10 shadow-sm">
                Popular
              </Badge>
            )}
            {course.isFeatured && !course.isPopular && (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground z-10 shadow-sm">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-5 pb-4 flex-grow flex flex-col">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] mb-2 ${accent}`}
          >
            {course.category}
          </p>
          <h3 className="font-semibold text-[17px] leading-snug mb-2 text-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {course.shortDescription}
          </p>

          {/* Spec strip — the two values students compare across courses,
              labelled and set in tabular figures so the columns line up down
              the grid instead of jittering. */}
          {/* mt-auto, not mt-4: cards stretch to a common height, so with a
              short description the strip floated mid-card and left a gap
              above the CTA. Anchoring it to the bottom of the content puts
              the slack after the description, where it reads as breathing
              room rather than as a hole. */}
          <dl className="mt-auto pt-4 border-t grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70 mb-0.5">
                Duration
              </dt>
              <dd className="flex items-center gap-1.5 font-medium text-foreground tabular-nums">
                <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {course.duration}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70 mb-0.5">
                Level
              </dt>
              <dd className="flex items-center gap-1.5 font-medium text-foreground">
                <BarChart className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {course.level}
              </dd>
            </div>
          </dl>
        </CardContent>

        {/* CardFooter ships with border-t and bg-muted/50. The spec strip
            directly above already draws a rule, so the default gave the card
            two stacked rules and a grey band under them. Stripped to a plain
            row. */}
        <CardFooter className="px-5 pb-5 pt-3 flex-shrink-0 border-t-0 bg-transparent rounded-none">
          <span className="inline-flex items-center text-sm font-semibold text-primary">
            View course
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
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
