import { ImageResponse } from "next/og";
import { ogImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/components/seo/og-image-template";
import { getTrainer } from "@/data/team";

export const alt = "Archer Infotech trainer profile";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const trainer = getTrainer(slug);

  const title = trainer?.name || "Trainer Profile";
  const subtitle = trainer?.role || "Trainer at Archer Infotech";
  const experienceLine = trainer?.experience
    ? `${trainer.experience} experience`
    : "Industry-experienced trainer";
  const detail = `${experienceLine} · Kothrud, Pune`;

  return new ImageResponse(
    ogImageTemplate({ kind: "Trainer", title, subtitle, detail }),
    { ...size },
  );
}
