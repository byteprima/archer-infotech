/**
 * Google review wall — renders the mirrored GBP reviews on /testimonials.
 *
 * Displays the real thing: reviewer name, their words, their stars, our
 * reply. This is the content AI engines can actually cite, which is the
 * point of mirroring the profile at all — a bare aggregate number is not
 * quotable, a review is.
 *
 * Attribution follows Google's requirements for displaying review
 * content: the author is credited with name and avatar, the listing is
 * linked so a reader can reach the source, dates are shown, and the page
 * states plainly that Google does not verify reviews. Those rules are
 * written for Places API consumers; they are applied here regardless of
 * which API sourced the row, because they are also just honest
 * presentation.
 *
 * Renders nothing when the mirror is empty — before the GBP sync is
 * approved and running, an empty wall would read as "no reviews" rather
 * than "not connected yet".
 */
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";

import type { GbpReview } from "@/db/schema";
import { siteConfig } from "@/data/site-config";

function relativeDate(value: Date | null): string | null {
  if (!value) return null;
  const days = Math.floor((Date.now() - value.getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function GoogleReviewsWall({
  reviews,
  totalReviewCount,
}: {
  reviews: GbpReview[];
  /**
   * Google's own total. Shown alongside the rendered count so a reader can
   * see that the wall is a window onto a larger set rather than the whole
   * of it — which is what makes displaying a subset honest.
   */
  totalReviewCount?: number;
}) {
  if (reviews.length === 0) return null;

  const withText = reviews.filter((r) => r.comment);

  return (
    <section aria-labelledby="google-reviews" className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="google-reviews" className="text-2xl md:text-3xl font-bold">
          Reviews from our Google Business Profile
        </h2>
        <a
          href={siteConfig.googleMaps.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Read them on Google
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {withText.length} review
        {withText.length === 1 ? "" : "s"} with written feedback
        {typeof totalReviewCount === "number" && (
          <> out of {totalReviewCount} ratings on the profile</>
        )}
        , newest first. Reviews are published exactly as written — we
        don&apos;t edit, reorder by sentiment, or hide critical ones. Google
        doesn&apos;t verify reviews, though it removes fake content it
        identifies.
      </p>

      <ul className="grid gap-4 md:grid-cols-2">
        {withText.map((r) => {
          const when = relativeDate(r.createTime);
          return (
            <li
              key={r.reviewId}
              className="rounded-xl border bg-card p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {/* Avatar is decorative next to the adjacent name, so it is
                    marked aria-hidden rather than repeating the name to a
                    screen reader. */}
                {r.reviewerPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.reviewerPhotoUrl}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold"
                  >
                    {initials(r.reviewerName)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">
                    {r.reviewerName ?? "Google user"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex items-center gap-0.5"
                      aria-label={`${r.starRating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${
                            i < r.starRating
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </span>
                    {when && (
                      <span className="text-xs text-muted-foreground">
                        {when}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {r.comment}
              </p>

              {r.replyComment && (
                <div className="rounded-lg border-l-2 border-primary/40 bg-muted/40 px-3 py-2">
                  <p className="text-xs font-semibold mb-1">
                    Archer Infotech replied
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {r.replyComment}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-muted-foreground">
        Want to add yours?{" "}
        <Link href="/review" className="text-primary hover:underline">
          Leave a Google review
        </Link>{" "}
        — takes about a minute, and honest criticism is as useful to us as
        praise.
      </p>
    </section>
  );
}
