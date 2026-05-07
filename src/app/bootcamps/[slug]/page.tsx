import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEvent } from "@/components/analytics/page-event";
import { BootcampDetailPage } from "@/components/bootcamps/bootcamp-detail-page";
import {
  BreadcrumbJsonLd,
  CourseJsonLd,
  FAQJsonLd,
} from "@/components/seo/json-ld";
import { bootcamps, getBootcamp } from "@/data/bootcamps";
import { buildPageMetadata } from "@/lib/seo";
import { getNextBatchForCourse } from "@/lib/actions/public-batches";
import { BOOTCAMP_LAST_REVIEWED } from "@/lib/seo/content-dates";

interface BootcampPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bootcamps.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: BootcampPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  if (!bootcamp) {
    return { title: "Bootcamp Not Found" };
  }

  return buildPageMetadata({
    title: bootcamp.seo.title,
    description: bootcamp.seo.description,
    path: `/bootcamps/${slug}`,
  });
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  if (!bootcamp) {
    notFound();
  }

  const durationLabel =
    bootcamp.details.find((detail) => detail.label === "Duration")?.value ?? "";

  // Look up next upcoming batch by bootcamp slug. Same helper as course pages —
  // it accepts any slug and falls back to a slug-suffix-stripped lookup, so
  // works for "codeleap", "careercode", "techready" without code changes.
  // Pillar 3 P3-11.
  const nextBatch = await getNextBatchForCourse(slug);

  return (
    <>
      <PageEvent
        event="bootcamp_page_viewed"
        properties={{
          bootcamp_slug: slug,
          bootcamp_name: bootcamp.name,
        }}
      />

      <CourseJsonLd
        name={`${bootcamp.name} Bootcamp`}
        description={bootcamp.description}
        duration={durationLabel}
        url={`/bootcamps/${slug}`}
        category="Bootcamps"
        nextBatchStartDate={nextBatch ? new Date(nextBatch.startDate).toISOString() : undefined}
        nextBatchMode={nextBatch?.mode === "online" ? "online" : nextBatch ? "offline" : undefined}
        dateModified={BOOTCAMP_LAST_REVIEWED}
      />
      <FAQJsonLd faqs={bootcamp.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Bootcamps", url: "/bootcamps" },
          { name: bootcamp.name, url: `/bootcamps/${slug}` },
        ]}
      />

      <BootcampDetailPage bootcamp={bootcamp} slug={slug} nextBatch={nextBatch} />
    </>
  );
}
