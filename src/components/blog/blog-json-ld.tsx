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
  /**
   * Rich Person-schema author object resolved from the trainer team
   * (P5-12). When provided, takes precedence over the legacy `author`
   * string and emits the full Person block — name, jobTitle, url,
   * image, sameAs LinkedIn — so AI engines and Google can match the
   * post to a verifiable named expert. Falls back to `author` (legacy
   * institutional byline) when null.
   */
  authorPerson?: {
    name: string;
    jobTitle: string;
    profilePath: string;
    image?: string;
    linkedin?: string;
    bio?: string;
  } | null;
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
  authorPerson,
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
    // P5-12: prefer the rich Person-schema author when available — gives
    // AI engines a verifiable named expert with LinkedIn sameAs that
    // ranking systems (especially Perplexity's citation ranker) weight
    // heavily. Falls back to legacy bare-name author when not resolved.
    author: authorPerson
      ? {
          "@type": "Person",
          name: authorPerson.name,
          jobTitle: authorPerson.jobTitle,
          url: `${baseUrl}${authorPerson.profilePath}`,
          ...(authorPerson.image && {
            image: authorPerson.image.startsWith("http")
              ? authorPerson.image
              : `${baseUrl}${authorPerson.image}`,
          }),
          ...(authorPerson.bio && { description: authorPerson.bio }),
          ...(authorPerson.linkedin && { sameAs: [authorPerson.linkedin] }),
          worksFor: {
            "@type": "EducationalOrganization",
            name: siteConfig.name,
            url: baseUrl,
          },
        }
      : {
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

interface HowToStepInput {
  position: number;
  name: string;
  text?: string;
  url: string;
}

interface HowToJsonLdProps {
  /** Title of the how-to (e.g. the post title). */
  name: string;
  /** Short description for the schema (e.g. the post excerpt). */
  description?: string;
  /** Hero image URL — pulls from post.featuredImage when available. */
  image?: string | null;
  /**
   * ISO 8601 duration estimate (e.g. "PT12M"). Computed from word count
   * by `estimateTotalTime` in src/lib/blog/howto.ts so the schema
   * agrees with the visible reading-time badge.
   */
  totalTime?: string;
  /** Ordered step list — produced by `extractHowToSteps`. */
  steps: HowToStepInput[];
}

/**
 * `HowTo` schema for tutorial/roadmap-style blog posts. P8-13.
 *
 * AI engines (and Google's Featured Snippet pipeline) heavily favour
 * HowTo because the structured steps are trivially extractable into a
 * numbered list response. Each step's `url` is a hash anchor into the
 * matching H2 in the post body, so AI engines can deep-link directly
 * to the relevant section rather than the whole article.
 *
 * Emitted alongside (not instead of) the regular `BlogPosting` schema —
 * Google handles multiple schema blocks per page fine, and the
 * combination signals "this is both a blog article and a how-to
 * tutorial".
 */
export function HowToJsonLd({
  name,
  description,
  image,
  totalTime,
  steps,
}: HowToJsonLdProps) {
  if (steps.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description && { description }),
    ...(image && {
      image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    }),
    ...(totalTime && { totalTime }),
    // HowTo's `step` validator requires the schema entries to use full
    // HowToStep shape; trim text to a sensible length so the schema
    // doesn't bloat <head> when an H2 happens to be a long phrase.
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.position,
      name: s.name.length > 110 ? s.name.slice(0, 107) + "..." : s.name,
      text: (s.text ?? s.name).slice(0, 280),
      url: s.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
