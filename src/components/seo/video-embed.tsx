/**
 * P5-26 — VideoEmbed + VideoObject schema scaffold.
 *
 * Drop-in component for embedding YouTube (or Vimeo) videos with proper
 * VideoObject Schema.org markup. Designed so a single `<VideoEmbed>`
 * placement gives you:
 *   - Lazy-loaded YouTube iframe (no JS shipped until in-viewport)
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
  aspect = "16/9",
}: VideoEmbedProps) {
  const thumb =
    thumbnailUrl ??
    `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
  const id = schemaId ?? `video-${youtubeId}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}#${id}`,
    name: title,
    description,
    thumbnailUrl: thumb.startsWith("http") ? thumb : `${baseUrl}${thumb}`,
    uploadDate,
    duration,
    contentUrl: watchUrl,
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
      <div
        className="relative w-full overflow-hidden rounded-xl border bg-black"
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        {/* Native lazy-loaded iframe — no JS shipped, no IntersectionObserver
            needed. Modern browsers honour loading="lazy" for iframes. */}
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
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
            src={thumb}
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
