import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { LinkedinIcon } from "@/components/common/social-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  teamMembers,
  getTrainer,
  getCourseSlugsForTrainer,
} from "@/data/team";
import { getCourse } from "@/data/courses";
import { buildPageMetadata } from "@/lib/seo";
import { summariseToMeta } from "@/lib/seo/meta-trim";
import { LastUpdated } from "@/components/seo/last-updated";
import { EVERGREEN_LAST_REVIEWED } from "@/lib/seo/content-dates";

interface TrainerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: TrainerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) return { title: "Trainer Not Found" };

  // P3-22 — trainer bios run 250-373 chars (intentional editorial body
  // copy). For the <meta name="description"> we summarise to the first
  // full sentence within Google's mobile snippet band so the SERP shows
  // a clean editorial cut instead of Google's mid-sentence truncation.
  return buildPageMetadata({
    title: `${trainer.name} — ${trainer.role} | Archer Infotech`,
    description: summariseToMeta(trainer.bio, 165),
    path: `/trainers/${slug}`,
    ogImage: trainer.image,
  });
}

export default async function TrainerProfilePage({ params }: TrainerPageProps) {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) notFound();

  const courseSlugs = getCourseSlugsForTrainer(slug);
  const courses = courseSlugs
    .map((s) => getCourse(s))
    .filter((c): c is NonNullable<ReturnType<typeof getCourse>> => Boolean(c));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Trainers", url: "/trainers" },
          { name: trainer.name, url: `/trainers/${slug}` },
        ]}
      />
      <PersonJsonLd
        name={trainer.name}
        jobTitle={trainer.role}
        description={trainer.bio}
        image={trainer.image}
        knowsAbout={trainer.expertise}
        linkedin={trainer.linkedin}
        url={`/trainers/${slug}`}
      />

      {/*
        Semantic structure: trainer profile is one article (about a Person).
        Layout already wraps {children} in <main>. Pillar 3 P3-09.
      */}
      <article aria-labelledby="trainer-name">
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[
              { name: "Trainers", href: "/trainers" },
              { name: trainer.name },
            ]}
          />
          <Link
            href="/trainers"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Trainers
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {trainer.image && (
                  <div className="w-32 h-32 rounded-full overflow-hidden relative shrink-0 ring-4 ring-secondary/30">
                    <Image
                      src={trainer.image}
                      alt={`${trainer.name}, ${trainer.role} at Archer Infotech, Pune`}
                      fill
                      className="object-cover"
                      sizes="128px"
                      priority
                    />
                  </div>
                )}
                <div>
                  <h1
                    id="trainer-name"
                    className="text-3xl md:text-4xl font-bold mb-2"
                  >
                    {trainer.name}
                  </h1>
                  <p className="text-lg text-white/80 mb-2">{trainer.role}</p>
                  <LastUpdated iso={EVERGREEN_LAST_REVIEWED} className="mb-2 text-xs text-white/70" />
                  <p className="text-sm text-secondary font-medium mb-4">
                    {trainer.experience} experience
                  </p>
                  {trainer.linkedin && (
                    <a
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Profile details" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {trainer.name.split(" ")[0]}</h2>
                <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {trainer.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {courses.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Courses Taught by {trainer.name.split(" ")[0]} ({courses.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map((course) => {
                      const href =
                        course.categorySlug === "bootcamps"
                          ? `/bootcamps/${course.slug.replace("-bootcamp", "")}`
                          : `/courses/${course.categorySlug}/${course.slug}`;
                      return (
                        <Link
                          key={course.id}
                          href={href}
                          className="group rounded-lg border p-4 hover:border-primary hover:shadow-md transition-all"
                        >
                          <Badge variant="outline" className="text-xs mb-2">
                            {course.category}
                          </Badge>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {course.shortDescription}
                          </p>
                          <div className="mt-2 text-xs text-primary font-medium inline-flex items-center">
                            View course <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Why learn from {trainer.name.split(" ")[0]}?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {trainer.experience} of hands-on industry experience</li>
                    <li>• Real-world projects and code reviews in every batch</li>
                    <li>• Career and interview preparation included</li>
                    <li>• Available for online and classroom batches in Pune</li>
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-4 w-full inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Enquire about a course
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
      </article>
    </>
  );
}
