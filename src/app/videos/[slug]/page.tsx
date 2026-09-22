import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { VideoEmbed } from "@/components/seo/video-embed";
import { courseVideos, getCourseVideo } from "@/data/course-videos";
import { getCourse } from "@/data/courses";
import { buildPageMetadata } from "@/lib/seo";

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(courseVideos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getCourseVideo(slug);
  const course = getCourse(slug);

  if (!video || !course) return {};

  return buildPageMetadata({
    title: `${video.title} | Free Video Lesson`,
    description: video.description,
    path: `/videos/${slug}`,
  });
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = getCourseVideo(slug);
  const course = getCourse(slug);

  if (!video || !course) notFound();

  const coursePath = `/courses/${course.categorySlug}/${course.slug}`;
  const pagePath = `/videos/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Courses", url: "/courses" },
          { name: course.title, url: coursePath },
          { name: video.title, url: pagePath },
        ]}
      />
      <main className="py-10 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { name: "Courses", href: "/courses" },
              { name: course.shortTitle, href: coursePath },
              { name: "Video lesson" },
            ]}
          />

          <article className="mx-auto mt-8 max-w-4xl" aria-labelledby="video-title">
            <p className="text-sm font-semibold uppercase text-primary">Free video lesson</p>
            <h1 id="video-title" className="mt-2 text-3xl font-bold md:text-5xl">
              {video.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              {video.description}
            </p>

            <VideoEmbed
              youtubeId={video.youtubeId}
              title={video.title}
              description={video.description}
              uploadDate={video.uploadDate}
              duration={video.duration}
              schemaId={`video-${slug}`}
              pagePath={pagePath}
            />

            <div className="mt-8 flex flex-wrap gap-3 border-t pt-8">
              <Link
                href={coursePath}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to {course.shortTitle}
              </Link>
              <Link
                href={coursePath}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Explore the full course
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
