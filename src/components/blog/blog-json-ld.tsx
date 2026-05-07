import { siteConfig } from "@/data/site-config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  slug: string;
  author?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  featuredImage?: string | null;
  category?: string | null;
  /** Comma-separated tag string from blog_posts.tags (e.g. "python, ai, career"). */
  tags?: string | null;
  /** Full markdown/HTML content used to compute wordCount + articleBody. */
  content?: string;
}

/**
 * Strip simple Markdown / HTML to a rough plain-text approximation so the
 * schema's articleBody and wordCount reflect actual reading content rather
 * than markup overhead. Imperfect but good enough for SEO/AEO purposes.
 */
function plainText(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ")        // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → label
    .replace(/<[^>]+>/g, " ")        // HTML tags
    .replace(/[#*_>~-]+/g, " ")      // markdown punctuation
    .replace(/\s+/g, " ")
    .trim();
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  author,
  publishedAt,
  updatedAt,
  featuredImage,
  category,
  tags,
  content,
}: BlogPostJsonLdProps) {
  const tagList = tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];
  const body = content ? plainText(content) : "";
  const wordCount = body ? body.split(/\s+/).filter(Boolean).length : undefined;

  const schema = {
    "@context": "https://schema.org",
    // BlogPosting is a more specific subtype of Article — preferred by Google
    // for blog content + recognised by AI-engine RAG pipelines.
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: `${baseUrl}/blog/${slug}`,
    inLanguage: "en-IN",
    ...(featuredImage && {
      image: featuredImage.startsWith("http")
        ? featuredImage
        : `${baseUrl}${featuredImage}`,
    }),
    ...(publishedAt && {
      datePublished: publishedAt.toISOString(),
    }),
    ...(updatedAt && {
      dateModified: updatedAt.toISOString(),
    }),
    author: {
      "@type": "Person",
      name: author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    ...(category && {
      articleSection: category,
    }),
    ...(tagList.length > 0 && {
      keywords: tagList.join(", "),
    }),
    ...(wordCount && { wordCount }),
    // articleBody intentionally truncated to avoid bloating <head>; full content
    // is in the visible DOM. ~500 words is enough for AEO snippet extraction.
    ...(body && { articleBody: body.slice(0, 3500) }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogListingJsonLdProps {
  posts: Array<{
    title: string;
    slug: string;
    excerpt?: string | null;
    publishedAt?: Date | null;
  }>;
}

export function BlogListingJsonLd({ posts }: BlogListingJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: `Read the latest articles, tutorials, and insights from ${siteConfig.name} - your guide to IT training and career development.`,
    url: `${baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${baseUrl}/blog/${post.slug}`,
      ...(post.excerpt && { description: post.excerpt }),
      ...(post.publishedAt && { datePublished: post.publishedAt.toISOString() }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BlogBreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
