import { ImageResponse } from "next/og";
import { ogImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/components/seo/og-image-template";
import { getBootcamp } from "@/data/bootcamps";

export const alt = "Archer Infotech bootcamp preview";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const bootcamp = getBootcamp(slug);

  const title = bootcamp ? bootcamp.name : "Bootcamp at Archer Infotech";
  // tagline is short + punchy, ideal subtitle.
  const subtitle = bootcamp?.tagline || "Pune · Placement-Assisted";
  const durationDetail = bootcamp?.details.find(
    (d) => d.label.toLowerCase() === "duration",
  )?.value;
  const detail = durationDetail
    ? `${durationDetail} · 100% Placement Assistance · Kothrud, Pune`
    : "100% Placement Assistance · Kothrud, Pune";

  return new ImageResponse(
    ogImageTemplate({ kind: "Bootcamp", title, subtitle, detail }),
    { ...size },
  );
}
