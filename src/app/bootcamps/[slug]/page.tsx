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

  return {
    title: bootcamp.seo.title,
    description: bootcamp.seo.description,
    keywords: bootcamp.seo.keywords,
  };
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  if (!bootcamp) {
    notFound();
  }

  const durationLabel =
    bootcamp.details.find((detail) => detail.label === "Duration")?.value ?? "";

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
      />
      <FAQJsonLd faqs={bootcamp.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Bootcamps", url: "/bootcamps" },
          { name: bootcamp.name, url: `/bootcamps/${slug}` },
        ]}
      />

      <BootcampDetailPage bootcamp={bootcamp} slug={slug} />
    </>
  );
}
