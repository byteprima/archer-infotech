import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface RelatedReadingPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
}

interface RelatedReadingProps {
  posts: RelatedReadingPost[];
  /**
   * Course title — used in the section heading so each course page
   * shows a context-appropriate intro. e.g. "Related reading on Python".
   */
  courseTitle: string;
}

/**
 * "Related reading from the blog" block — links from a course detail
 * page to 2–3 contextually relevant blog posts. Pillar 5 P5-28.
 *
 * Why this matters:
 *   - Builds course → blog → other-course internal-link chains the
 *     topic-cluster web Google rewards.
 *   - Gives prospective learners a soft, trust-building entry point
 *     ("read this guide first") instead of a hard "enrol now" CTA.
 *   - Each blog post earns inbound links from every course page whose
 *     keywords match — distributes link equity across the topic.
 *
 * Renders nothing if there are no matched posts so courses without a
 * matching blog yet don't show an empty section.
 */
export function RelatedReading({ posts, courseTitle }: RelatedReadingProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-reading-heading"
      className="border-t bg-muted/20 py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Related Reading
          </p>
          <h2
            id="related-reading-heading"
            className="mt-3 text-2xl md:text-3xl font-bold text-balance"
          >
            From the Archer Infotech blog: {courseTitle}
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Long-form guides, career advice and tutorials our trainers
            have written on topics relevant to this course.
          </p>
        </div>

        <ul className="grid gap-5 list-none p-0 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.category ?? "Blog"}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 flex-grow text-sm leading-6 text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Browse all blog posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
