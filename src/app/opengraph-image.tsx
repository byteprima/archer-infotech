import { ImageResponse } from "next/og";
import { ogImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/components/seo/og-image-template";

export const alt = "Archer Infotech — Pune's trusted IT training institute since 2009";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

/**
 * Default site-wide OG image — used on every page that doesn't have a more
 * specific opengraph-image.tsx (home, listing pages, etc.). Replaces the
 * legacy /images/og-image.jpg fallback referenced by siteConfig.ogImage,
 * which was returning 404.
 */
export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      kind: "IT Training Institute",
      title: "Pune's Most Trusted IT Training Institute Since 2009",
      subtitle: "10,000+ trained · 5,000+ placed · 100+ hiring partners",
      detail: "Java · Python · Full Stack · Data Science · AI/ML · Cloud · DevOps",
    }),
    { ...size },
  );
}
