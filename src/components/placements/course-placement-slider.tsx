"use client";

/**
 * Placement strip for a course page, this course's placements first.
 *
 * Built on native scroll-snap rather than a transform track, for the same
 * reason the homepage testimonials slider is: how many cards fit is a
 * breakpoint question and CSS already knows the answer, where a transform
 * would need JS to track the breakpoint to compute its offset. It also gets
 * touch swipe, trackpad scroll and keyboard support for free.
 *
 * Every card renders exactly once, in the initial HTML. AI crawlers do not
 * execute JavaScript, and a placement record they cannot see is one they
 * cannot cite — which is the whole point of publishing it.
 *
 * Consent is already applied upstream: `displayName` arrives masked unless
 * the student agreed to their full name, `package` is null unless they
 * agreed to that separately, and the proof document is never fetched at all.
 * This component only decides layout.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RankedPlacement } from "@/lib/actions/public-placements";

function relevanceLabel(relevance: RankedPlacement["relevance"]): string | null {
  if (relevance === "course") return "From this course";
  if (relevance === "category") return "Related course";
  return null;
}

function PlacementCard({ placement }: { placement: RankedPlacement }) {
  const label = relevanceLabel(placement.relevance);
  return (
    <article className="flex w-[280px] shrink-0 snap-start flex-col gap-3 rounded-xl border border-border bg-background p-5 sm:w-[320px]">
      <div className="flex items-start gap-3">
        {placement.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placement.photoUrl}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
          >
            {placement.displayName?.slice(0, 1) ?? "—"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">
            {placement.displayName ?? "—"}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {placement.designation}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium">{placement.company}</p>

      <div className="mt-auto flex flex-wrap items-center gap-2 text-xs">
        {label && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
            {label}
          </span>
        )}
        {placement.verified && (
          <span className="rounded-full bg-secondary/15 px-2 py-0.5 font-medium text-secondary-foreground">
            Verified
          </span>
        )}
        {/* Present only where the student consented to it being published. */}
        {placement.package && (
          <span className="font-semibold tabular-nums text-primary">
            {placement.package}
          </span>
        )}
        {placement.batchYear && (
          <span className="text-muted-foreground">Batch {placement.batchYear}</span>
        )}
      </div>
    </article>
  );
}

export function CoursePlacementSlider({
  placements,
  courseTitle,
}: {
  placements: RankedPlacement[];
  courseTitle: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (placements.length === 0) return null;

  const fromThisCourse = placements.filter((p) => p.relevance === "course").length;

  return (
    <section className="py-10" aria-labelledby="course-placements-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 id="course-placements-heading" className="text-2xl font-bold">
            Where our students are working
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {fromThisCourse > 0
              ? `${fromThisCourse} of these completed ${courseTitle}. The rest are from related Archer Infotech courses.`
              : `From across Archer Infotech. We have not yet published a verified placement from ${courseTitle}.`}
          </p>
        </div>
        {/* Arrows are enhancement — the track scrolls by touch, trackpad and
            keyboard without them, so they are hidden from assistive tech
            rather than duplicated as extra tab stops. */}
        <div aria-hidden className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            tabIndex={-1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            tabIndex={-1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {placements.map((placement) => (
          <PlacementCard key={placement.id} placement={placement} />
        ))}
      </div>
    </section>
  );
}
