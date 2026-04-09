import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogPostJsonLd, BlogBreadcrumbJsonLd } from "@/components/blog/blog-json-ld";
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

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || post.content.slice(0, 160);

  return {
    title: `${title} | ${siteConfig.name} Blog`,
    description,
    keywords: post.tags?.split(",").map((t) => t.trim()) || [],
    openGraph: {
      title: `${title} | ${siteConfig.name} Blog`,
      description,
      type: "article",
      url: `${siteConfig.url}/blog/${slug}`,
      ...(post.featuredImage && {
        images: [
          {
            url: post.featuredImage,
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
      ...(post.featuredImage && {
        images: [post.featuredImage],
      }),
    },
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
      />
      <BlogBreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
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
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container mx-auto px-4 -mt-6">
          <div className="relative aspect-video max-w-4xl rounded-xl overflow-hidden shadow-xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
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
            {/* Article */}
            <article className="lg:col-span-3">
              <div className="max-w-3xl">
                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Content */}
                <BlogPostContent content={post.content} />

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share:
                  </span>
                  <TrackedAnchor
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    event="blog_post_shared"
                    properties={{ network: "twitter", post_slug: slug }}
                  >
                    Twitter
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    event="blog_post_shared"
                    properties={{ network: "linkedin", post_slug: slug }}
                  >
                    LinkedIn
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    event="blog_post_shared"
                    properties={{ network: "facebook", post_slug: slug }}
                  >
                    Facebook
                  </TrackedAnchor>
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
            </article>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                currentCategory={post.category || undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
