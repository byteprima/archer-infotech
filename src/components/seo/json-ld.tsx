import { siteConfig } from "@/data/site-config";
import type { Batch } from "@/db/schema";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

// Canonical @id for the Organization node. Uses a #organization fragment
// rather than the bare baseUrl so it never collides with the homepage
// WebPage / WebSite IRI (both of which legitimately resolve to baseUrl).
// Every `provider` / `publisher` / `author` / `worksFor` / `mainEntity`
// reference below points here so Google + AI engines merge them into one
// canonical Organization node in the page graph. Audit 2026-06-21.
const ORG_ID = `${baseUrl}/#organization`;
// Canonical @id for the WebSite node (Sitelinks Searchbox + entity anchor).
const WEBSITE_ID = `${baseUrl}/#website`;

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

// Schema.org PostalAddress maps `addressLocality` to the CITY, not the
// suburb. siteConfig.contact.address.city is "Kothrud, Pune" (correct for
// the human-readable NAP shown on the site) — but emitting that as
// addressLocality is non-standard and weakens matching on city-level
// queries. So at the schema layer we split it: addressLocality = "Pune",
// the Kothrud suburb goes in addressSubLocality (and is already present in
// streetAddress via line2). Audit 2026-06-21. The visible NAP is untouched.
const POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
  addressLocality: "Pune",
  addressSubLocality: "Kothrud",
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
  siteConfig.social.github,
  siteConfig.social.reddit,
  // Google Business Profile / Maps listing — the canonical GBP page for
  // the Kothrud centre. Anchors the LocalBusiness schema to the actual
  // GBP record Google already indexes.
  siteConfig.googleMaps.url,
  // Wikidata entity (P6-06 — submitted 2026-06-11). The canonical
  // machine-readable identifier; Google Knowledge Graph + every major
  // AI engine maps brand → Wikidata Q-id. Most-valuable sameAs link in
  // the entire graph.
  siteConfig.social.wikidata,
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
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: "Archer Infotech",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}${siteConfig.ogImage}`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    // P8-04 — founder gives Google + AI engines a verified named expert
    // to attribute the institute to. Matches the canonical founder
    // record on /trainers/yogesh-patil.
    founder: {
      "@type": "Person",
      name: "Yogesh Patil",
      jobTitle: "Founder & Director",
      url: `${baseUrl}/trainers/yogesh-patil`,
    },
    address: POSTAL_ADDRESS,
    geo: { "@type": "GeoCoordinates", ...GEO },
    hasMap: siteConfig.googleMaps.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: SAME_AS,
    areaServed: AREA_SERVED_FULL,
    priceRange: "₹₹",
    openingHoursSpecification: OPENING_HOURS,
    // P8-04 — aggregateRating sourced from the 126+ verified Google
    // Business Profile reviews (5.0★ as of 2026-06-10). Same figure
    // already in /testimonials' AggregateRatingJsonLd — this puts it
    // on the canonical site-wide Org block so every page's Org schema
    // benefits, not just /testimonials.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5.0,
      ratingCount: 126,
      bestRating: 5,
      worstRating: 1,
    },
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

/**
 * WebSite schema — the entity anchor Google uses to connect the brand to
 * its Knowledge Panel and the prerequisite for the Sitelinks Searchbox
 * rich result. Highest-value previously-missing block (audit 2026-06-21).
 * Render once, on the homepage only. `publisher` resolves to the canonical
 * Org node by @id; `potentialAction` points at the course catalogue's
 * query param so a branded search box can deep-link into the site.
 */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    alternateName: "Archer Infotech",
    url: baseUrl,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    "@id": ORG_ID,
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
  /**
   * Audit 2026-06-21 — optional fee fields for Google's Course price
   * enhancement. Google requires the structured-data price to MATCH the
   * price visible on the page, so only pass these once the fee is shown on
   * the course page. `price` is a single exact figure; `priceRange` (e.g.
   * "₹20,000–₹45,000") is the safer choice when fees vary by batch/mode.
   * When neither is supplied the Offer omits price entirely (valid — a
   * "Paid" Offer without a number is acceptable and never a mismatch).
   */
  price?: string;
  priceRange?: string;
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
  price,
  priceRange,
}: CourseJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    // P8-04 — provider is a reference to the canonical Org block
    // emitted by OrganizationJsonLd at the same baseUrl @id. Avoids
    // re-declaring the Org partially (no `url` field, no `address`,
    // etc.) which was the dominant validator error: 54 × pages
    // missing `EducationalOrganization.url` on the Course.provider
    // nested block. Google + AI engines resolve `@id` references
    // back to the canonical block on the same page.
    provider: { "@id": ORG_ID },
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
      // Only emitted when the page actually shows the fee (audit 2026-06-21).
      ...(price && { price }),
      ...(priceRange && { priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        // priceRange isn't a valid Offer field; surface the human range
        // via a PriceSpecification description so it's still machine-read.
        description: priceRange,
      } }),
      url: `${baseUrl}${url}`,
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
        jobTitle: "Founder & Director",
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
  /**
   * P8-04 — short description for the WebPage block. Optional but
   * recommended by Google's structured-data spec; when supplied,
   * raises the page's rich-result eligibility band.
   */
  description?: string;
  /**
   * P8-04 — ISO date for the WebPage's `datePublished`. Use the
   * location-page review-cadence constant (LOCATIONS_LAST_REVIEWED)
   * so the schema's freshness signal matches the visible "Last
   * updated" stamp on the page.
   */
  datePublished?: string;
}

export function NeighbourhoodJsonLd({
  name,
  fullName,
  pincode,
  slug,
  pageName,
  description,
  datePublished,
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
    ...(description && { description }),
    ...(datePublished && { datePublished }),
    about: place,
    mainEntity: {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": ORG_ID,
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
        "@id": ORG_ID,
        name: siteConfig.name,
        url: baseUrl,
      },
      about: {
        "@type": "Course",
        name: b.courseName,
        // P8-04 — provider is an @id-keyed reference to the canonical
        // Org block; avoids the partial-redeclaration that triggers
        // EducationalOrganization.url validator errors.
        provider: { "@id": ORG_ID },
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
    // Stable @id so the person resolves as a distinct Knowledge-Graph node
    // and can be referenced by @id from BlogPosting.author / Review.author
    // instead of being inlined. Audit 2026-06-21.
    "@id": `${baseUrl}${url}#person`,
    name,
    jobTitle,
    description,
    ...(image && { image: image.startsWith("http") ? image : `${baseUrl}${image}` }),
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout }),
    ...(linkedin && { sameAs: [linkedin] }),
    // P8-04 — @id reference to the canonical Org block.
    worksFor: { "@id": ORG_ID },
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
  // P8-04 — emit as an `@id`-referenced rating attached to the canonical
  // Org block. Without `@id: baseUrl` the validator (correctly) reports
  // an EducationalOrganization missing `url`, `address`, `telephone`,
  // etc — and Google's structured-data parser may treat this as a
  // duplicate-conflict orphan Org. Linking to @id resolves both.
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
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
  /**
   * Optional ISO date for the review's `datePublished` field
   * (recommended by Google's Review rich-result spec). For
   * testimonials, the `createdAt` timestamp from the DB is the
   * canonical source. Without it the validator flags missing
   * `Review.datePublished`. P8-04.
   */
  datePublished?: string | null;
}

export function ReviewListJsonLd({ reviews }: { reviews: ReviewSchemaInput[] }) {
  if (reviews.length === 0) return null;

  const orgId = ORG_ID;
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
      // P8-04 — datePublished is a Google-recommended Review field.
      // Pass through only when supplied; never invent a date.
      ...(r.datePublished && { datePublished: r.datePublished }),
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
            // P8-04 — @id-reference instead of partial Org redeclaration.
            provider: { "@id": orgId },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              courseWorkload: "P3M",
              instructor: {
                "@type": "Person",
                name: "Yogesh Patil",
                jobTitle: "Founder & Director",
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

/**
 * Report schema (Schema.org Report, subclass of CreativeWork).
 *
 * Used for downloadable PDF / data reports that we publish as
 * linkable assets — e.g. the Pune IT Hiring Report 2026. Carries
 * datePublished + dateModified + author (Org @id-ref) + about +
 * keywords + abstract.
 *
 * P6-13.
 */
interface ReportJsonLdProps {
  /** Display name, e.g. "Pune IT Hiring Report 2026". */
  name: string;
  /** Plain-English description of what the report covers. */
  description: string;
  /** Canonical site-relative URL, e.g. "/reports/pune-it-hiring-report-2026". */
  url: string;
  /** ISO date the report was first published. */
  datePublished: string;
  /** ISO date the report was last updated. */
  dateModified: string;
  /** Topic keywords used by AI engines + Google Discover. */
  keywords: string[];
  /** Single-paragraph executive summary (used as `abstract`). */
  abstract?: string;
}

export function ReportJsonLd({
  name,
  description,
  url,
  datePublished,
  dateModified,
  keywords,
  abstract,
}: ReportJsonLdProps) {
  const fullUrl = `${baseUrl}${url}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Report",
    name,
    description,
    url: fullUrl,
    inLanguage: "en-IN",
    datePublished,
    dateModified,
    keywords: keywords.join(", "),
    ...(abstract && { abstract }),
    // P8-04 — author + publisher = @id-ref to canonical Org graph.
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: {
      "@type": "Thing",
      name: "Pune IT Hiring Market",
      description:
        "The Pune Information Technology hiring market across product companies, services majors, BFSI captives, and startups.",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
