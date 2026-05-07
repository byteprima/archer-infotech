import { ImageResponse } from "next/og";
import { ogImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/components/seo/og-image-template";
import { getCourse, getCategory } from "@/data/courses";

export const alt = "Archer Infotech course preview";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const course = getCourse(slug);
  const category = getCategory(categorySlug);

  // Fallback to the generic site OG if the course can't be resolved (shouldn't
  // happen because of generateStaticParams + notFound() in the page route,
  // but defensive).
  const title = course
    ? `${course.title} Training in Pune with Placement`
    : "IT Training Course at Archer Infotech";
  const subtitle = course && category ? category.name : "Pune · Since 2009";
  const detail = course?.duration
    ? `${course.duration} · Placement Assistance · Kothrud, Pune`
    : "Placement Assistance · Kothrud, Pune";

  return new ImageResponse(
    ogImageTemplate({ kind: "Course", title, subtitle, detail }),
    { ...size },
  );
}
