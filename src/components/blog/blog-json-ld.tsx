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
}: BlogPostJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${baseUrl}/blog/${slug}`,
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
