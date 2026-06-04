import { MetadataRoute } from "next";
import { courses, categories } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { teamMembers } from "@/data/team";
import { neighbourhoods } from "@/data/locations";
import { audiences } from "@/data/audiences";
import { comparisons } from "@/data/comparisons";
import { listicles } from "@/data/listicles";
import {
  getAllPublishedSlugsWithDates,
  getCategories,
} from "@/lib/actions/blog";
import { categoryToSlug } from "@/lib/blog/category-slug";
import {
  EVERGREEN_LAST_REVIEWED,
  COURSE_LAST_REVIEWED,
  BOOTCAMP_LAST_REVIEWED,
  NEW_ASSETS_LAST_REVIEWED,
  isoToDate,
} from "@/lib/seo/content-dates";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

// Real content-review dates per route family. Previously every URL stamped
// `new Date()`, so Google saw every URL as "modified today, every day" — a
// well-known lastmod-discounting signal. Each route family now carries its
// actual editorial review date and only bumps when that review happens.
const EVERGREEN = isoToDate(EVERGREEN_LAST_REVIEWED);
const COURSE = isoToDate(COURSE_LAST_REVIEWED);
const BOOTCAMP = isoToDate(BOOTCAMP_LAST_REVIEWED);
const NEW_ASSETS = isoToDate(NEW_ASSETS_LAST_REVIEWED);

// Render at request time, not build time. The production image is built
// without DATABASE_URL, so building this statically drops every DB-backed URL
// (blog posts + blog categories) from the sitemap. Generating on demand lets
// the DB-backed sections populate from the live database.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — EVERGREEN review date for marketing surfaces touched by
  // P8-07/P8-08; NEW_ASSETS for /press + /tools/* which shipped 2026-05-25.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: EVERGREEN, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: EVERGREEN, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/placements`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/corporate-training`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/internships`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/batch-schedule`, lastModified: EVERGREEN, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: EVERGREEN, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/press`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tools/pune-it-salary-calculator`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/pune-it-career-roadmap`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.7 },
    // Legal pages — shipped 2026-05-08 (P4-22 canonicals) but were missing
    // from the sitemap. Low priority + yearly cadence — they rarely change,
    // but inclusion is a baseline trust signal for Google + AI crawlers
    // doing site-wide policy checks. 2026-06-04.
    { url: `${baseUrl}/privacy-policy`, lastModified: EVERGREEN, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: EVERGREEN, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Category landing pages — refreshed with rich content in P4-11 (2026-05-08).
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/courses/${category.slug}`,
    lastModified: EVERGREEN,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Course pages — curriculum last reviewed COURSE_LAST_REVIEWED (Pillar 1 #6).
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.categorySlug}/${course.slug}`,
    lastModified: COURSE,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog post pages — each post's TRUE updatedAt (fallback publishedAt).
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const rows = await getAllPublishedSlugsWithDates();
    blogPages = rows.map(({ slug, updatedAt, publishedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: updatedAt ?? publishedAt ?? EVERGREEN,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.log("Could not fetch blog slugs for sitemap:", error);
  }

  // Blog category pages — clean paths (P5-06, shipped 2026-05-25).
  let blogCategoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    blogCategoryPages = categories.map((name) => ({
      url: `${baseUrl}/blog/category/${categoryToSlug(name)}`,
      lastModified: NEW_ASSETS,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.log("Could not fetch blog categories for sitemap:", error);
  }

  // Bootcamps — BOOTCAMP_LAST_REVIEWED (P4-13 Related-Courses block).
  const bootcampListingPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/bootcamps`, lastModified: BOOTCAMP, changeFrequency: "weekly", priority: 0.9 },
  ];
  const bootcampPages: MetadataRoute.Sitemap = bootcamps.map((bootcamp) => ({
    url: `${baseUrl}/bootcamps/${bootcamp.slug}`,
    lastModified: BOOTCAMP,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Trainer pages — Pillar 1 #18 (E-E-A-T author bylines, evergreen cadence).
  const trainerListingPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/trainers`, lastModified: EVERGREEN, changeFrequency: "monthly", priority: 0.7 },
  ];
  const trainerPages: MetadataRoute.Sitemap = teamMembers.map((trainer) => ({
    url: `${baseUrl}/trainers/${trainer.id}`,
    lastModified: EVERGREEN,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Neighbourhood location pages (P4-15) + the /locations hub — 2026-05-25.
  const locationListingPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/locations`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.7 },
  ];
  const locationPages: MetadataRoute.Sitemap = neighbourhoods.map((area) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: NEW_ASSETS,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Audience-intent landing pages (P4-17, 2026-05-25).
  const audiencePages: MetadataRoute.Sitemap = audiences.map((a) => ({
    url: `${baseUrl}/courses/for/${a.slug}`,
    lastModified: NEW_ASSETS,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Comparison pages (P8-10) + the /compare hub — 2026-05-25.
  const compareListingPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compare`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.6 },
  ];
  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: NEW_ASSETS,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Listicle guide pages (P8-12) + the /guides hub — 2026-05-25.
  const guidesListingPage: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/guides`, lastModified: NEW_ASSETS, changeFrequency: "monthly", priority: 0.6 },
  ];
  const guidePages: MetadataRoute.Sitemap = listicles.map((l) => ({
    url: `${baseUrl}/guides/${l.slug}`,
    lastModified: NEW_ASSETS,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...coursePages,
    ...bootcampListingPage,
    ...bootcampPages,
    ...trainerListingPage,
    ...trainerPages,
    ...locationListingPage,
    ...locationPages,
    ...audiencePages,
    ...compareListingPage,
    ...comparePages,
    ...guidesListingPage,
    ...guidePages,
    ...blogPages,
    ...blogCategoryPages,
  ];
}
