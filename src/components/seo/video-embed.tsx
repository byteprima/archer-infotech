/**
 * P5-26 — VideoEmbed + VideoObject schema scaffold.
 *
 * Drop-in component for embedding YouTube (or Vimeo) videos with proper
 * VideoObject Schema.org markup. Designed so a single `<VideoEmbed>`
 * placement gives you:
 *   - Click-to-load facade: a thumbnail until pressed, then the real
 *     player. No YouTube JavaScript on page load at all.
 *   - Visible title + description for screen readers
 *   - VideoObject JSON-LD with @id, contentUrl, thumbnailUrl, uploadDate,
 *     duration (ISO 8601), publisher @id-ref to canonical Org
 *
 * Activation: drop a `<VideoEmbed …/>` into any server component (course
 * detail, location, testimonials, /about, /placements) once the user
 * supplies the video URL + thumbnail + duration metadata.
 *
 * Until then, this is dormant infrastructure — no calls site-wide.
 */
import { VideoFacade } from "@/components/seo/video-facade";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

export interface VideoEmbedProps {
  /** YouTube video ID (the v= param) — e.g. "dQw4w9WgXcQ". Mandatory. */
  youtubeId: string;
  /** Human-readable title shown above the embed AND in VideoObject schema. */
  title: string;
  /** 1-2 sentence summary (caption + schema description). */
  description: string;
  /** ISO 8601 date the video was first published — e.g. "2026-05-15". */
  uploadDate: string;
  /** ISO 8601 duration — e.g. "PT3M45S" (3 min 45 sec). */
  duration: string;
  /**
   * Absolute or site-relative thumbnail URL. Optional — if omitted we
   * fall back to YouTube's hqdefault.jpg (always exists for any valid
   * youtubeId).
   */
  thumbnailUrl?: string;
  /**
   * Page-relative @id anchor — lets sibling JSON-LD refer to this video
   * (e.g. Course.video → {"@id": baseUrl + page + "#video-<id>"}). Defaults
   * to a stable id derived from youtubeId.
   */
  schemaId?: string;
  /**
   * Site-relative path of the page this video lives on — e.g.
   * "/courses/programming/java-training-in-pune". Used to anchor the
   * VideoObject @id to the actual page rather than the site root. When
   * omitted, the @id falls back to the bare origin (legacy behaviour).
   */
  pagePath?: string;
  /**
   * Sets aspect-ratio of the embed wrapper. Defaults to 16:9.
   */
  aspect?: "16/9" | "4/3";
}

export function VideoEmbed({
  youtubeId,
  title,
  description,
  uploadDate,
  duration,
  thumbnailUrl,
  schemaId,
  pagePath,
  aspect = "16/9",
}: VideoEmbedProps) {
  const ytThumb = (quality: string) =>
    `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`;
  // The visible fallback image must use a size that exists for EVERY video —
  // maxresdefault/sddefault 404 for most uploads (verified 2026-06-26: only
  // 1 of 5 course videos has maxres), so hqdefault is the universal guarantee.
  const thumbDisplay = thumbnailUrl
    ? thumbnailUrl.startsWith("http")
      ? thumbnailUrl
      : `${baseUrl}${thumbnailUrl}`
    : ytThumb("hqdefault");
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
  const id = schemaId ?? `video-${youtubeId}`;

  // Google's VideoObject.uploadDate must be ISO 8601 *with a timezone*.
  // A date-only value ("2023-11-28") triggers the GSC warnings
  // "Datetime property uploadDate is missing a timezone" and
  // "Invalid datetime value for uploadDate". Normalise date-only input to
  // IST midnight (+05:30 — the business/channel timezone); pass through
  // values that already carry a time/offset untouched.
  const uploadDateTime = /^\d{4}-\d{2}-\d{2}$/.test(uploadDate)
    ? `${uploadDate}T00:00:00+05:30`
    : uploadDate;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    // Anchor the @id to the page the video actually lives on, not the
    // site root. `pagePath` should be the site-relative course path; when
    // absent we fall back to the bare origin (legacy behaviour).
    "@id": `${baseUrl}${pagePath ?? ""}#${id}`,
    name: title,
    description,
    // Offer multiple resolutions largest-first so Google picks the best
    // AVAILABLE one per video (it skips past any 404). Meets Google's
    // "provide high-resolution thumbnails" guidance without forcing a maxres
    // URL that 404s on most uploads. A caller-supplied thumbnailUrl overrides
    // with that single image.
    thumbnailUrl: thumbnailUrl
      ? thumbDisplay
      : [ytThumb("maxresdefault"), ytThumb("sddefault"), ytThumb("hqdefault")],
    uploadDate: uploadDateTime,
    duration,
    // contentUrl intentionally omitted: it must be a direct media-file URL,
    // which YouTube doesn't expose. Google uses embedUrl for YouTube embeds;
    // a watch-page contentUrl is non-spec and can trigger "couldn't fetch the
    // video". embedUrl alone satisfies VideoObject's URL requirement.
    embedUrl,
    // Reference the canonical Organization @id graph instead of
    // redeclaring publisher fields (matches P8-04 wave 1 + 3 patterns).
    publisher: { "@id": baseUrl },
  };

  return (
    <figure className="my-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Click-to-load facade, NOT a bare `loading="lazy"` iframe.
          The attribute defers the load until the frame is near the
          viewport, not until it is watched — and this video sits high
          enough in the course body to be inside that threshold, so the
          whole player loaded on every view: ~850 KiB of a 1,794 KiB page.
          See video-facade.tsx for the measurements. */}
      <VideoFacade
        youtubeId={youtubeId}
        title={title}
        thumbnailUrl={thumbDisplay}
        aspectRatio={aspect.replace("/", " / ")}
      />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        <strong className="text-foreground">{title}</strong> — {description}
      </figcaption>
      {/* Visible thumbnail link for screen-reader users + bots that don't
          execute iframes; also surfaces in WebP image archives. */}
      <noscript>
        <a href={watchUrl} target="_blank" rel="noopener noreferrer">
          {/* Plain <img>: inside <noscript>, next/image optimisation can't run.
              eslint @next/next/no-img-element disabled deliberately here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbDisplay}
            alt={`${title} — watch on YouTube`}
            width={640}
            height={360}
            className="mt-2 rounded-lg"
          />
        </a>
      </noscript>
    </figure>
  );
}
