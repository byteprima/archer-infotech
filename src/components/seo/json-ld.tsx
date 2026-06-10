import { siteConfig } from "@/data/site-config";
import type { Batch } from "@/db/schema";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

// Lat/long extracted from the Google Maps embed in site-config.ts
const GEO = { latitude: 18.5002215, longitude: 73.810452 };

/**
 * Parse a human-readable course duration ("3 Months", "8 Weeks", "4-6 Months")
 * into an ISO 8601 duration ("P3M", "P8W", "P5M" for ranges → median).
 *
 * Required by Google's Course schema spec (effective late 2024) — the
 * `courseWorkload` field on `hasCourseInstance` must be an ISO 8601
 * duration, not free text. Without it the entire Course block is
 * rejected as invalid and any Review.itemReviewed referencing the
 * course fails with "Invalid object type". P3-13 follow-up 2026-06-04.
 *
 * Falls back to "P3M" (the catalogue median) when parsing fails — chosen
 * because it's safer than emitting nothing, which would re-trigger the
 * validator failure. Misclassifying a 6-month track as 3 months in
 * schema-only emission is a forgivable approximation; emitting no
 * duration at all is not.
 */
function durationToISO8601(duration?: string): string {
  if (!duration) return "P3M";
  const m = duration.match(/(\d+)(?:\s*[-–]\s*(\d+))?\s*(Month|Week|Day|Year)/i);
  if (!m) return "P3M";
  const [, lo, hi, unit] = m;
  const value = hi ? Math.ceil((Number(lo) + Number(hi)) / 2) : Number(lo);
  const unitChar = unit[0].toUpperCase(); // M, W, D, Y
  return `P${value}${unitChar}`;
}

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

// Service-area signal. Archer's centre is in Kothrud, but students commute
// from across west/central Pune and the PCMC belt. Enumerating the priority
// catchment neighbourhoods as `areaServed` Places tells Google/AI engines the
// business serves these locations — the page-independent half of P4-19. When
// the dedicated /locations/* neighbourhood pages ship (P4-15), each one adds
// its own WebPage > about(Place) + LocalBusiness areaServed schema on top.
const AREA_SERVED = [
  "Kothrud",
  "Karve Nagar",
  "Erandwane",
  "Warje",
  "Bavdhan",
  "Aundh",
  "Baner",
  "Hinjewadi",
  "Wakad",
  "Pimpri-Chinchwad",
  "Deccan",
  "Karve Road",
].map((name) => ({ "@type": "Place" as const, name: `${name}, Pune` }));

// City-level + neighbourhood-level service area, broadest first.
const AREA_SERVED_FULL = [
  { "@type": "City" as const, name: "Pune" },
  ...AREA_SERVED,
];

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
    areaServed: AREA_SERVED_FULL,
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
    areaServed: AREA_SERVED_FULL,
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
  /**
   * P7-33 — per-course aggregate rating, derived from the course-matched
   * testimonials. When at least one testimonial matches, embed an
   * `aggregateRating` on the Course schema so the page becomes SERP
   * star-snippet eligible against its own Course (not the Org). Skip
   * entirely when no testimonials match — a fabricated rating is worse
   * than no rating.
   */
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  /**
   * P7-33 — optional Review objects embedded inside the Course schema.
   * Cap at 5 to keep the JSON-LD blob lightweight. Each Review must have
   * a Person author + reviewBody + reviewRating; itemReviewed is the
   * parent Course itself so we don't need to repeat it inline.
   */
  reviews?: Array<{
    id: string | number;
    authorName: string;
    authorRole?: string | null;
    body: string;
    rating: number;
  }>;
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
  aggregateRating,
  reviews,
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
    // 2026-06-04: hasCourseInstance is now REQUIRED for valid Course schema
    // (Google's Course-info rich-result spec, effective late 2024). Was
    // previously conditional on `nextBatchStartDate` — meaning courses
    // without a scheduled next batch emitted invalid Course schema and
    // had their Review.itemReviewed flagged "Invalid object type" in GSC.
    // Required CourseInstance fields per the current spec: courseMode,
    // courseWorkload, instructor. startDate is added when a real batch
    // date is known (it stays the highest-signal field for AI engines
    // surfacing "next batch starts" answers).
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: nextBatchMode === "online" ? "Online" : "Blended",
      courseWorkload: durationToISO8601(duration),
      instructor: {
        "@type": "Person",
        name: "Yogesh Patil",
        jobTitle: "Founder & Lead Trainer",
      },
      ...(nextBatchStartDate && { startDate: nextBatchStartDate }),
      ...(nextBatchMode !== "online" && {
        location: {
          "@type": "Place",
          name: siteConfig.name,
          address: POSTAL_ADDRESS,
        },
      }),
    },
    // P7-33 — per-course aggregateRating. Only emit when at least one
    // matched testimonial exists; a synthetic rating would be a
    // structured-data spam violation.
    ...(aggregateRating && aggregateRating.ratingCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    // P7-33 — embedded Reviews. Each one keys to the parent Course
    // schema by virtue of being a child of it, so itemReviewed is
    // implicit and we save bytes vs the ReviewListJsonLd block.
    ...(reviews && reviews.length > 0 && {
      review: reviews.map((r) => ({
        "@type": "Review",
        "@id": `${baseUrl}${url}#review-${r.id}`,
        author: {
          "@type": "Person",
          name: r.authorName,
          ...(r.authorRole && { jobTitle: r.authorRole }),
        },
        reviewBody: r.body,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      })),
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

// Neighbourhood location-page schema (P4-19).
//
// Signals to Google/AI engines that Archer serves a specific Pune
// neighbourhood: a WebPage whose `about` is the Place, with `mainEntity`
// pointing at the org @id and an `areaServed` Place scoped to this
// neighbourhood. Pairs with the site-wide AREA_SERVED_FULL on the org schema.
interface NeighbourhoodJsonLdProps {
  /** Display name, e.g. "Hinjewadi". */
  name: string;
  /** Postal area name, e.g. "Hinjewadi, Pune". */
  fullName: string;
  /** Representative PIN code for the area. */
  pincode: string;
  /** URL slug under /locations/. */
  slug: string;
  /** Page title used as the WebPage name. */
  pageName: string;
}

export function NeighbourhoodJsonLd({
  name,
  fullName,
  pincode,
  slug,
  pageName,
}: NeighbourhoodJsonLdProps) {
  const place = {
    "@type": "Place",
    name: fullName,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "Maharashtra",
      postalCode: pincode,
      addressCountry: "IN",
    },
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    url: `${baseUrl}/locations/${slug}`,
    about: place,
    mainEntity: {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": baseUrl,
      name: siteConfig.name,
      url: baseUrl,
      address: POSTAL_ADDRESS,
      telephone: siteConfig.contact.phone,
      areaServed: { "@type": "Place", name: fullName },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// EducationEvent schema for scheduled training batches (P8-25 + P3-20).
//
// Emits one EducationEvent per batch on /batch-schedule so Google (Event
// rich results) and AI engines can surface "next Java batch in Pune" style
// answers. Caller must pass only future, non-cancelled batches — use
// `filterUpcomingBatches` from public-batches. Never mark up past events.
export function BatchEventsJsonLd({ batches }: { batches: Batch[] }) {
  if (batches.length === 0) return null;

  const events = batches.map((b) => {
    const isOnline = b.mode === "online";
    return {
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: `${b.courseName} — ${isOnline ? "Live Online" : "Classroom"} Batch, Pune`,
      description: `${b.courseName} training batch at Archer Infotech, Pune. ${b.duration}, ${b.timing}. ${isOnline ? "Live instructor-led online sessions." : "Classroom training at our Kothrud centre."} Includes placement assistance.`,
      startDate: new Date(b.startDate).toISOString(),
      eventAttendanceMode: isOnline
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: isOnline
        ? {
            "@type": "VirtualLocation",
            url: b.meetingLink || baseUrl,
          }
        : {
            "@type": "Place",
            name: siteConfig.name,
            address: POSTAL_ADDRESS,
          },
      organizer: {
        "@type": "EducationalOrganization",
        "@id": baseUrl,
        name: siteConfig.name,
        url: baseUrl,
      },
      about: {
        "@type": "Course",
        name: b.courseName,
        provider: {
          "@type": "EducationalOrganization",
          "@id": baseUrl,
          name: siteConfig.name,
        },
      },
      offers: {
        "@type": "Offer",
        url: `${baseUrl}/contact`,
        category: "Paid",
        availability:
          b.seatsAvailable > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
      },
    };
  });

  return (
    <>
      {events.map((event, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
        />
      ))}
    </>
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
      // The thing being reviewed. When a course is known, emit a complete
      // Course: Google's review-snippet spec only accepts itemReviewed from a
      // fixed list of supported types — `Thing` is rejected ("Invalid object
      // type"), and a Course without `description`/`provider` is rejected
      // ("Missing field description"). A full Course satisfies both, and
      // course reviews on our own site aren't "self-serving" the way an
      // Organization/LocalBusiness self-review would be. Falls back to the
      // institute @id only when no course is recorded.
      //
      // 2026-06-04 update: Google's Course rich-result spec (effective late
      // 2024) now requires `hasCourseInstance` with courseMode +
      // courseWorkload + instructor for the Course to be a *valid* Course.
      // Without it, the Review.itemReviewed validator reports "Invalid
      // object type" — misleading error message, but the root cause is the
      // Course schema being invalid and that failure propagating up.
      // Added hasCourseInstance with sensible defaults: "Blended" mode
      // covers our Onsite + Online offering, P3M = 3-month median track
      // duration across our catalogue, founder Yogesh Patil as default
      // instructor (his Person schema already lives in /about per memory
      // P4-08). Verified against the GSC error
      // "Invalid object type for field itemReviewed" reported 2026-06-04.
      itemReviewed: r.course
        ? {
            "@type": "Course",
            name: r.course,
            description: `${r.course} training at ${siteConfig.name}, a Pune IT training institute.`,
            provider: {
              "@type": "EducationalOrganization",
              name: siteConfig.name,
              sameAs: baseUrl,
              url: baseUrl,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              courseWorkload: "P3M",
              instructor: {
                "@type": "Person",
                name: "Yogesh Patil",
                jobTitle: "Founder & Lead Trainer",
              },
            },
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
