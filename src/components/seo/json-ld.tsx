import { siteConfig } from "@/data/site-config";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

// Lat/long extracted from the Google Maps embed in site-config.ts
const GEO = { latitude: 18.5002215, longitude: 73.810452 };

const POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
  addressLocality: siteConfig.contact.address.city,
  addressRegion: siteConfig.contact.address.state,
  postalCode: siteConfig.contact.address.pincode,
  addressCountry: "IN",
};

const OPENING_HOURS = siteConfig.openingHours.map((slot) => ({
  "@type": "OpeningHoursSpecification" as const,
  dayOfWeek: slot.days,
  opens: slot.opens,
  closes: slot.closes,
}));

// Entity-graph identity surfaces — every place a search engine or AI
// crawler can verify Archer Infotech's identity by URL. Strengthens the
// "this is the same business" signal across schema instances. P2-33.
const SAME_AS = [
  siteConfig.social.linkedin,
  siteConfig.social.facebook,
  siteConfig.social.instagram,
  siteConfig.social.twitter,
  siteConfig.social.youtube,
  // Google Business Profile / Maps listing — the canonical GBP page for
  // the Kothrud centre. Anchors the LocalBusiness schema to the actual
  // GBP record Google already indexes.
  siteConfig.googleMaps.url,
].filter(Boolean);

// Combined EducationalOrganization + LocalBusiness — single source of truth, used site-wide.
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": baseUrl,
    name: siteConfig.name,
    alternateName: "Archer Infotech",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    address: POSTAL_ADDRESS,
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: siteConfig.googleMaps.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: SAME_AS,
    areaServed: { "@type": "City", name: "Pune" },
    priceRange: "₹₹",
    openingHoursSpecification: OPENING_HOURS,
    knowsAbout: [
      "Java", "Python", "JavaScript", "React", "Angular", "Node.js",
      "AWS", "Azure", "Google Cloud", "DevOps", "Kubernetes", "Docker",
      "Machine Learning", "Data Science", "Generative AI",
      "Spring Boot", "MERN Stack", "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness-specific schema retained for the contact page where the map is shown.
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${baseUrl}${siteConfig.ogImage}`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: siteConfig.contact.phone,
    address: POSTAL_ADDRESS,
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: siteConfig.googleMaps.url,
    openingHoursSpecification: OPENING_HOURS,
    priceRange: "₹₹",
    // Entity-graph linkage so Google can match this LocalBusiness to the
    // social profiles + GBP record indexed elsewhere. P2-33.
    sameAs: SAME_AS,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Course schema
interface CourseJsonLdProps {
  name: string;
  description: string;
  provider?: string;
  duration?: string;
  url: string;
  category?: string;
  /** ISO 8601 start date for the next batch, if known. */
  nextBatchStartDate?: string;
  nextBatchMode?: "offline" | "online";
  /**
   * ISO 8601 publish date (when the page first went live). Optional but
   * pairs with dateModified to give Google + AI engines a content
   * freshness signal. P3-18.
   */
  datePublished?: string;
  /**
   * ISO 8601 last meaningful review date. Required for the freshness
   * signal — bump every 6 months on real content refresh, never on a
   * cosmetic change. P3-18.
   */
  dateModified?: string;
}

export function CourseJsonLd({
  name,
  description,
  provider = siteConfig.name,
  duration,
  url,
  category,
  nextBatchStartDate,
  nextBatchMode,
  datePublished,
  dateModified,
}: CourseJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: provider,
      sameAs: baseUrl,
    },
    ...(duration && { timeRequired: duration }),
    ...(category && { courseCode: category }),
    url: `${baseUrl}${url}`,
    inLanguage: "en",
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    ...(nextBatchStartDate && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        startDate: nextBatchStartDate,
        courseMode: nextBatchMode === "online" ? "Online" : "Onsite",
        location:
          nextBatchMode === "online"
            ? undefined
            : {
                "@type": "Place",
                name: siteConfig.name,
                address: POSTAL_ADDRESS,
              },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ schema for course pages
interface FAQJsonLdProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb schema
interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Person schema for trainer profile pages
interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  knowsAbout?: string[];
  linkedin?: string;
  url: string;
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  image,
  knowsAbout,
  linkedin,
  url,
}: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    ...(image && { image: image.startsWith("http") ? image : `${baseUrl}${image}` }),
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout }),
    ...(linkedin && { sameAs: [linkedin] }),
    worksFor: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: baseUrl,
    },
    url: `${baseUrl}${url}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Aggregate Rating schema for testimonials
interface AggregateRatingJsonLdProps {
  ratingValue: number;
  ratingCount: number;
  itemName?: string;
}

export function AggregateRatingJsonLd({
  ratingValue,
  ratingCount,
  itemName = siteConfig.name,
}: AggregateRatingJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Per-testimonial Review schema. Each testimonial gets its own Review block
// referencing the EducationalOrganization @id. Emit one combined JSON-LD
// (array of Reviews) per page so we don't pollute the DOM with N <script>
// tags. Pillar 3 P3-13 / Pillar 7 P7-33.
export interface ReviewSchemaInput {
  /**
   * Stable identifier for the review — used in the Review @id. Should not
   * change once published. The numeric ID from the testimonials table works.
   */
  id: string | number;
  /** Reviewer's full name (Person.name). */
  authorName: string;
  /** Optional placement company — populates Person.worksFor. */
  authorCompany?: string | null;
  /** Optional reviewer role/title — Person.jobTitle. */
  authorRole?: string | null;
  /** The actual review text — reviewBody. */
  body: string;
  /** Star rating 1-5. */
  rating: number;
  /** Optional course taken — adds itemReviewed of type Course. */
  course?: string | null;
}

export function ReviewListJsonLd({ reviews }: { reviews: ReviewSchemaInput[] }) {
  if (reviews.length === 0) return null;

  const orgId = baseUrl;
  const schema = reviews.map((r) => {
    const review: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Review",
      "@id": `${baseUrl}/#review-${r.id}`,
      author: {
        "@type": "Person",
        name: r.authorName,
        ...(r.authorRole && { jobTitle: r.authorRole }),
        ...(r.authorCompany && {
          worksFor: { "@type": "Organization", name: r.authorCompany },
        }),
      },
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      // The thing being reviewed: prefer the specific course if known,
      // otherwise the institute itself. Google validates either.
      itemReviewed: r.course
        ? {
            "@type": "Course",
            name: r.course,
            provider: { "@id": orgId },
          }
        : { "@id": orgId },
      // Publisher = the institute hosting the testimonial.
      publisher: { "@id": orgId },
    };
    return review;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * CollectionPage + ItemList schema for course category landing pages
 * (e.g. /courses/programming, /courses/full-stack-development). Tells
 * Google and AI engines that the URL is a curated index of training
 * programmes — feeds rich-result eligibility for category queries
 * like "programming courses in Pune". P4-11.
 */
interface CategoryCollectionJsonLdProps {
  /** Category display name, e.g. "Programming". */
  name: string;
  /** Short category description used as schema description. */
  description: string;
  /** Absolute path on the site, e.g. "/courses/programming". */
  url: string;
  /** Course list to expose as ItemList. */
  items: Array<{
    name: string;
    /** Absolute site path. */
    url: string;
    description?: string;
  }>;
}

export function CategoryCollectionJsonLd({
  name,
  description,
  url,
  items,
}: CategoryCollectionJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${baseUrl}${url}`,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: baseUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${name} courses at ${siteConfig.name}`,
      numberOfItems: items.length,
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: `${baseUrl}${item.url}`,
        ...(item.description && { description: item.description }),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
