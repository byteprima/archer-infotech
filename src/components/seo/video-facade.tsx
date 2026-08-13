"use client";

/**
 * Click-to-load facade for a YouTube embed.
 *
 * WHY THIS EXISTS: VideoEmbed previously rendered the real iframe directly
 * with `loading="lazy"`, on the reasoning that no JavaScript ships until
 * the frame is in view. That is not what the attribute does — it defers
 * the load until the frame is NEAR the viewport, and browsers use generous
 * thresholds. The video sits high in the course body, inside that
 * threshold, so the full player loaded on every page view.
 *
 * Measured on /courses/full-stack-development/java-full-stack-training-in-pune
 * (PageSpeed Insights, mobile, 2026-08-13) before this change:
 *
 *   page weight 1,794 KiB   script 1,297 KiB   LCP 4.1 s   TBT 350 ms
 *   base.js         467 KiB (330 unused)   <- YouTube player
 *   m=r78Drb        235 KiB (121 unused)   <- YouTube player
 *   m=root,base     154 KiB ( 81 unused)   <- YouTube player
 *   www-player.css   56 KiB ( 56 unused)   <- YouTube player
 *
 * ~850 KiB of a 1,794 KiB page was the player, on a page where nobody had
 * pressed play. The homepage, which has no video, scored 91 against this
 * page's 77.
 *
 * The facade ships a single thumbnail image (~15 KiB) and swaps in the real
 * iframe on click, with autoplay so the click that reveals the player also
 * starts it — one interaction, not two.
 *
 * The VideoObject JSON-LD, figcaption and <noscript> fallback all stay in
 * the parent server component, so nothing about the SEO surface changes:
 * crawlers still get the schema, the title, the description and a
 * thumbnail link without executing any of this.
 */
import { useState } from "react";

interface VideoFacadeProps {
  youtubeId: string;
  /** Used for the iframe title and the play button's accessible name. */
  title: string;
  /** Poster frame. Caller resolves the correct YouTube thumbnail size. */
  thumbnailUrl: string;
  /** CSS aspect-ratio value, already normalised (e.g. "16 / 9"). */
  aspectRatio: string;
}

export function VideoFacade({
  youtubeId,
  title,
  thumbnailUrl,
  aspectRatio,
}: VideoFacadeProps) {
  const [activated, setActivated] = useState(false);

  // autoplay=1 only on the click-through: the user has just pressed play, so
  // starting playback is what they asked for. It is never set on first
  // render, so nothing auto-plays on page load.
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=1`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border bg-black"
      style={{ aspectRatio }}
    >
      {activated ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          // Warm the DNS/TLS handshake to YouTube on intent rather than on
          // load, so the click-to-first-frame delay is not paid in full.
          onMouseEnter={preconnectYouTube}
          onFocus={preconnectYouTube}
          onTouchStart={preconnectYouTube}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          {/*
            Plain <img>, not next/image: i.ytimg.com is not in the
            remotePatterns allow-list in next.config.ts, and adding a
            third-party host to the image optimiser to serve one poster
            frame is a worse trade than shipping the thumbnail directly.
            Dimensions are set so the box never shifts (CLS is 0.00 in
            field data and should stay there).
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-black/70 transition-colors group-hover:bg-[#ff0000]"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Insert preconnect hints once, on first intent. Cheap, idempotent, and it
 * removes the connection setup from the critical path between the click and
 * the first frame.
 */
function preconnectYouTube() {
  if (typeof document === "undefined") return;
  for (const href of [
    "https://www.youtube-nocookie.com",
    "https://www.google.com",
  ]) {
    if (document.head.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      continue;
    }
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    document.head.appendChild(link);
  }
}
