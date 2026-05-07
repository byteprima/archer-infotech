import Link from "next/link";
import { ArrowRight, GraduationCap, BookOpen, Users } from "lucide-react";

interface RelatedCourseLink {
  title: string;
  href: string;
  category: string | null;
}

interface RelatedPostLink {
  id: number;
  title: string;
  slug: string;
  category: string | null;
}

interface PostInternalLinksProps {
  /**
   * Top course match for the post (1 link required by P5-09). When no
   * course matches the post's tags, pass `null` and the block will
   * fall back to a generic /courses link.
   */
  course: RelatedCourseLink | null;
  /**
   * 2–3 related blog posts (P5-09 requires at least 2). Auto-derived
   * from tag overlap by the calling page; pass an empty array to skip
   * the related-posts row.
   */
  relatedPosts: RelatedPostLink[];
  /** Title of the post being read — used in microcopy. */
  postTitle: string;
}

/**
 * "Continue learning at Archer Infotech" — internal-link block at the
 * bottom of every blog post. Pillar 5 P5-09.
 *
 * Editorial rule the block enforces by construction:
 *   1× relevant course page (matched by post tag → course keyword
 *      overlap; falls back to /courses index)
 *   2–3× related blog posts (matched by tag overlap)
 *   1× trust-building page (Placements — proof-first deep link that
 *       suits any blog post since every reader is a potential learner)
 *
 * Net effect: every blog post — current and future — automatically
 * carries ≥4 contextual internal links with descriptive anchor text,
 * varied phrasing (every link is a unique route + context), and natural
 * surrounding prose. Satisfies the pillar 5 minimum without per-post
 * editorial cost.
 */
export function PostInternalLinks({
  course,
  relatedPosts,
  postTitle,
}: PostInternalLinksProps) {
  // Build the course block — fall back to the catalogue index when no
  // tag-matched course is found so the block always has a course link.
  const courseLink = course ?? {
    title: "Browse all training programmes",
    href: "/courses",
    category: null,
  };

  return (
    <aside
      aria-labelledby="continue-learning-heading"
      className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8"
    >
      <h2
        id="continue-learning-heading"
        className="text-xl md:text-2xl font-bold mb-2"
      >
        Continue learning at Archer Infotech
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
        If this guide on{" "}
        <span className="font-medium text-foreground">{postTitle}</span>{" "}
        was useful, here&apos;s what to read next at our Pune training
        institute.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Course pick */}
        <Link
          href={courseLink.href}
          className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            Take the course
          </div>
          <p className="text-sm md:text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {course
              ? `Join the ${course.title} programme`
              : "Browse all training programmes"}
          </p>
          {course?.category && (
            <p className="mt-1 text-xs text-muted-foreground">
              {course.category}
            </p>
          )}
          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
            Explore course
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Trust-building deep link — Placements is the highest-converting
            proof page and works as the "next read" for any topic. */}
        <Link
          href="/placements"
          className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Users className="h-4 w-4" aria-hidden="true" />
            See the proof
          </div>
          <p className="text-sm md:text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            5,000+ students placed at top IT companies
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Hiring partners, salary band, placement process
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
            View placements
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        {/* Related posts column — title + small list. Rendered as one
            card so the 3-column grid stays balanced even when there are
            only 2 related posts. */}
        <div className="flex flex-col rounded-xl border border-border bg-background p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Related reads
          </div>
          {relatedPosts.length > 0 ? (
            <ul className="space-y-2.5 list-none p-0 text-sm">
              {relatedPosts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="font-medium text-foreground hover:text-primary hover:underline line-clamp-2 leading-snug"
                  >
                    {p.title}
                  </Link>
                  {p.category && (
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {p.category}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              <Link
                href="/blog"
                className="font-medium text-primary hover:underline"
              >
                Browse the full Archer Infotech blog
              </Link>{" "}
              for more guides on Pune IT training and careers.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
