import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, Tag, Share2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { CodeCopyInit } from "@/components/blog/code-copy-init";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogPostJsonLd, BlogBreadcrumbJsonLd, HowToJsonLd } from "@/components/blog/blog-json-ld";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { extractToc, approximateWordCount } from "@/lib/blog/toc";
import { PostInternalLinks } from "@/components/blog/post-internal-links";
import {
  findRelevantCoursesForPost,
  courseHref,
  tokeniseTags,
} from "@/lib/seo/blog-internal-links";
import { getRelatedBlogPosts } from "@/lib/actions/blog";
import { TrainerByline } from "@/components/blog/trainer-byline";
import { resolveBlogAuthor } from "@/lib/seo/blog-author";
import { categoryPath } from "@/lib/blog/category-slug";
import { ReadingTime } from "@/components/blog/reading-time";
import {
  shouldEmitHowTo,
  extractHowToSteps,
  estimateTotalTime,
} from "@/lib/blog/howto";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  getPublishedPostBySlug,
  getAllPublishedSlugs,
  getCategories,
  getRecentPosts,
} from "@/lib/actions/blog";
import { siteConfig } from "@/data/site-config";
import { summariseToMeta } from "@/lib/seo/meta-trim";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Strip any pre-existing " | Archer Infotech" suffix the post.title or
  // post.metaTitle may have been saved with — the root layout's title template
  // (`%s | Archer Infotech`) appends the brand exactly once. Without this strip
  // the rendered <title> ended up as
  //   `Post Title | Archer Infotech | Archer Infotech Blog | Archer Infotech`
  // (triple brand). See SEO/work-plan/raw/pillar5.json P5-02.
  const rawTitle = post.metaTitle || post.title;
  const title = rawTitle.replace(/\s*\|\s*Archer\s*Infotech\b.*$/i, "").trim();
  const rawDescription = post.metaDescription || post.excerpt || post.content.slice(0, 160);
  // P3-22 — clamp description to Google's mobile snippet band (≤175
  // chars, sentence-boundary cut).
  const description = summariseToMeta(rawDescription, 175);

  // P3-22 — auto-skip the " | Archer Infotech" suffix when (a) the
  // root template would push the rendered title past ~60 chars, or
  // (b) the title already mentions the brand. Inlined here (not via
  // buildPageMetadata) because this generateMetadata emits BlogPosting-
  // specific OpenGraph fields (publishedTime, modifiedTime, authors,
  // section) that the shared helper doesn't expose.
  const TITLE_SNIPPET_BUDGET = 60;
  const BRAND_SUFFIX = ` | ${siteConfig.name}`;
  const titleAlreadyHasBrand = /archer\s*infotech/i.test(title);
  const suffixBlowsBudget = title.length + BRAND_SUFFIX.length > TITLE_SNIPPET_BUDGET;
  const skipBrandSuffix = titleAlreadyHasBrand || suffixBlowsBudget;
  const fullTitle = skipBrandSuffix ? title : `${title}${BRAND_SUFFIX}`;

  // og:image + twitter:image MUST be absolute URLs — social-card parsers
  // (Facebook, Twitter/X, LinkedIn) don't reliably resolve relative paths.
  // After the 2026-06-04 P5-04 migration that swapped Unsplash absolute URLs
  // to local "/images/blog/<id>.jpg" relative paths, this guard is what
  // keeps social cards working. Pattern mirrors BlogPostJsonLd's image
  // handling in src/components/seo/json-ld.tsx.
  const ogImage = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${siteConfig.url}${post.featuredImage}`
    : null;

  return {
    // When skipBrandSuffix is true, use `absolute` to bypass the root
    // layout's title template — otherwise the template would re-append
    // the suffix and undo our trim.
    title: skipBrandSuffix ? { absolute: title } : title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      // OG titles do NOT use the title.template, so always emit the
      // resolved fullTitle here.
      title: fullTitle,
      description,
      type: "article",
      url: `${siteConfig.url}/blog/${slug}`,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: post.author ? [post.author] : undefined,
      section: post.category || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
    // P8-23: explicit freshness signal for real-time AI crawlers, using the
    // post's true modified (or published) date — never faked.
    ...((post.updatedAt || post.publishedAt) && {
      other: {
        "last-modified": new Date(
          (post.updatedAt || post.publishedAt) as Date,
        ).toUTCString(),
      },
    }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [categories, recentPosts] = await Promise.all([
    getCategories(),
    getRecentPosts(5, slug),
  ]);

  const displayDate = post.publishedAt || post.createdAt;
  const tags = post.tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  // Resolve a real-trainer author from the post's tags + category. Drives
  // both the visible byline and the BlogPosting Person JSON-LD so search
  // engines and AI rankers see a verifiable named expert tied to the
  // post (vs the generic "Archer Infotech" institutional byline). P5-12.
  const authorTrainer = resolveBlogAuthor(post.tags, post.category);

  // HowTo schema for tutorial / roadmap / step-by-step posts. Reuses
  // the H2 anchors injected by BlogPostContent for the P5-10 TOC, so
  // each step's url is a deep-linkable hash anchor into the matching
  // section of the post body. Falls through silently when the post
  // doesn't match the tutorial pattern. P8-13.
  const howToSteps = shouldEmitHowTo(post.title, post.tags)
    ? extractHowToSteps(
        post.content,
        `${siteConfig.url}/blog/${slug}`,
      )
    : [];

  // Build TOC for long-form posts only. Pillar 5 P5-10 threshold: 1,500
  // words. Below that, the TOC adds visual noise without UX benefit.
  // Also require at least 3 H2/H3 headings — a TOC of one item is silly.
  const tocItems = extractToc(post.content);
  const postWordCount = approximateWordCount(post.content);
  const showToc = tocItems.length >= 3 && postWordCount >= 1500;

  // Internal-link block at the bottom of the post — guarantees the
  // pillar 5 P5-09 minimum (≥1 course, 2-3 related posts, 1 trust-page)
  // on every blog post by construction. Match-on-tags so links stay
  // contextually relevant; fall back to /courses index when no course
  // overlaps.
  const courseMatches = findRelevantCoursesForPost(post.tags, post.category, 1);
  const tagBasedKeywords = tokeniseTags(post.tags);
  const relatedKeywords =
    tagBasedKeywords.length > 0
      ? tagBasedKeywords
      : post.category
        ? [post.category.toLowerCase()]
        : [];
  // Fetch a wide pool then drop the current post if it sneaks in.
  const relatedPool = await getRelatedBlogPosts(relatedKeywords, 4);
  const relatedPosts = relatedPool.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageEvent
        event="blog_post_viewed"
        properties={{
          post_slug: slug,
          post_title: post.title,
          post_category: post.category,
          post_author: post.author,
        }}
      />

      {/* JSON-LD Structured Data */}
      <BlogPostJsonLd
        title={post.title}
        description={post.metaDescription || post.excerpt || post.content.slice(0, 160)}
        slug={post.slug}
        author={post.author}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        featuredImage={post.featuredImage}
        category={post.category}
        tags={post.tags}
        content={post.content}
        authorPerson={{
          name: authorTrainer.name,
          jobTitle: authorTrainer.role,
          profilePath: `/trainers/${authorTrainer.id}`,
          image: authorTrainer.image,
          linkedin: authorTrainer.linkedin,
          bio: authorTrainer.bio,
        }}
      />
      <BlogBreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />
      {/* Tutorial / roadmap-style posts also emit HowTo schema, with
          step.url anchors pointing at the matching H2s. P8-13. */}
      {howToSteps.length > 0 && (
        <HowToJsonLd
          name={post.title}
          description={
            post.metaDescription ||
            post.excerpt ||
            post.content.slice(0, 160)
          }
          image={post.featuredImage}
          totalTime={estimateTotalTime(postWordCount)}
          steps={howToSteps}
        />
      )}

      {/*
        Semantic structure: blog post is one article. Layout already wraps
        children in <main>; here we add <article> + <header>. Pillar 3 P3-09.
      */}
      <article aria-labelledby="post-title">
      {/* Hero / article header */}
      <header className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            variant="light"
            items={[
              { name: "Blog", href: "/blog" },
              ...(post.category
                ? [{
                    name: post.category,
                    href: categoryPath(post.category),
                  }]
                : []),
              { name: post.title },
            ]}
          />
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>

          <div className="max-w-4xl">
            {/* Category */}
            {post.category && (
              <Badge className="mb-4 bg-white/20 hover:bg-white/30">
                {post.category}
              </Badge>
            )}

            {/* Title */}
            <h1
              id="post-title"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <time dateTime={displayDate.toISOString()}>
                  {displayDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                {/* Visible "Updated" stamp when the post has been
                    revised post-publication — pairs with the dateModified
                    field already in BlogPosting schema. Shown only when
                    updatedAt is meaningfully later than publishedAt
                    (>1 day delta to suppress noise from build-time
                    timestamp bumps). P3-18. */}
                {post.updatedAt &&
                  post.publishedAt &&
                  post.updatedAt.getTime() - post.publishedAt.getTime() >
                    24 * 60 * 60 * 1000 && (
                    <span className="ml-2 text-xs text-white/60">
                      · Updated{" "}
                      <time dateTime={post.updatedAt.toISOString()}>
                        {post.updatedAt.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </span>
                  )}
              </div>
              {/* Real-trainer byline — replaces the legacy
                  institutional "Archer Infotech" string with the
                  topic-resolved named author. Pairs with Person schema
                  in BlogPostJsonLd. P5-12. */}
              <TrainerByline trainer={authorTrainer} variant="header" />
              {/* Reading-time estimate — server-rendered so it ships
                  in initial HTML. P5-14. */}
              <ReadingTime wordCount={postWordCount} />
              {post.author && post.author !== authorTrainer.name && (
                <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Edited by {post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container mx-auto px-4 -mt-6">
          <div className="relative aspect-video max-w-4xl rounded-xl overflow-hidden shadow-xl">
            <Image
              src={post.featuredImage}
              alt={`Featured image for ${post.title}${
                post.category ? ` — ${post.category}` : ""
              } guide on the Archer Infotech blog${
                post.author ? `, written by ${post.author}` : ""
              }`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Article body — outer page already <article aria-labelledby>;
                this inner div is just the main grid column layout. */}
            <div className="lg:col-span-3">
              <div className="max-w-3xl">
                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Table of contents — only for long-form posts (1,500+
                    words, 3+ headings). P5-10. */}
                {showToc && <TableOfContents items={tocItems} />}

                {/* Content */}
                <BlogPostContent content={post.content} />

                {/* Wires up the per-code-block Copy buttons that
                    BlogPostContent's Shiki highlighter injected. Single
                    delegated listener; renders nothing visible. P5-11. */}
                <CodeCopyInit />

                {/* "Continue learning at Archer Infotech" — guarantees
                    the pillar 5 P5-09 minimum of ≥1 course + 2–3 related
                    posts + 1 trust-page (Placements) on every post by
                    construction. Auto-derived from tag overlap. */}
                <PostInternalLinks
                  postTitle={post.title}
                  course={
                    courseMatches.length > 0
                      ? {
                          title: courseMatches[0].course.title,
                          href: courseHref(courseMatches[0].course),
                          category: courseMatches[0].course.category,
                        }
                      : null
                  }
                  relatedPosts={relatedPosts.map((p) => ({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    category: p.category,
                  }))}
                />

                {/* About the author — full trainer card with photo, role,
                    bio and LinkedIn. Mirrors the Person schema emitted in
                    BlogPostJsonLd. P5-12. */}
                <TrainerByline trainer={authorTrainer} variant="footer" />

                {/* Tags — semantic <ul>, each tag is an internal link to the
                    tag-filtered blog index. Builds topic-cluster internal
                    linking surface area (P5-05). */}
                {tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Tag className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                      <ul
                        className="flex flex-wrap items-center gap-2 list-none p-0 m-0"
                        aria-label="Post tags"
                      >
                        {tags.map((tag) => (
                          <li key={tag}>
                            <Link
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 p-4 rounded-xl bg-muted/50 border">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium shrink-0">
                      <Share2 className="h-4 w-4" />
                      Share
                    </span>
                    <div className="h-6 w-px bg-border shrink-0" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <TrackedAnchor
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${siteConfig.url}/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-sm font-medium"
                        event="blog_post_shared"
                        properties={{ network: "whatsapp", post_slug: slug }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </TrackedAnchor>
                      <TrackedAnchor
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all text-sm font-medium"
                        event="blog_post_shared"
                        properties={{ network: "twitter", post_slug: slug }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        Twitter
                      </TrackedAnchor>
                      <TrackedAnchor
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all text-sm font-medium"
                        event="blog_post_shared"
                        properties={{ network: "linkedin", post_slug: slug }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </TrackedAnchor>
                      <TrackedAnchor
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all text-sm font-medium"
                        event="blog_post_shared"
                        properties={{ network: "facebook", post_slug: slug }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                      </TrackedAnchor>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 bg-muted/50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">
                    Ready to Start Learning?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our industry-leading IT courses and take the next step
                    in your career with {siteConfig.name}.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <TrackedLink
                      href="/courses"
                      event="blog_cta_clicked"
                      properties={{ cta: "view_courses", post_slug: slug }}
                    >
                      <Button>View Courses</Button>
                    </TrackedLink>
                    <TrackedLink
                      href="/contact"
                      event="blog_cta_clicked"
                      properties={{ cta: "contact_us", post_slug: slug }}
                    >
                      <Button variant="outline">Contact Us</Button>
                    </TrackedLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                currentCategory={post.category || undefined}
              />
              </div>
            </div>
          </div>
        </div>
      </section>
      </article>
    </>
  );
}
