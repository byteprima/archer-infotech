import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, Tag, Share2, MessageCircle } from "lucide-react";
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
            </article>

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
    </>
  );
}
