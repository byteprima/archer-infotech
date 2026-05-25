import { MetadataRoute } from "next";
import { courses, categories } from "@/data/courses";
import { bootcamps } from "@/data/bootcamps";
import { teamMembers } from "@/data/team";
import { neighbourhoods } from "@/data/locations";
import { audiences } from "@/data/audiences";
import { comparisons } from "@/data/comparisons";
import { listicles } from "@/data/listicles";
import { getAllPublishedSlugs, getCategories } from "@/lib/actions/blog";
import { categoryToSlug } from "@/lib/blog/category-slug";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://archerinfotech.in";

// Render at request time, not build time. The production image is built
// without DATABASE_URL, so building this statically drops every DB-backed URL
// (blog posts + blog categories) from the sitemap. Generating on demand lets
// the DB-backed sections populate from the live database.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/placements`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/corporate-training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/batch-schedule`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/pune-it-salary-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/pune-it-career-roadmap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Category pages (filtered via query param on /courses)
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/courses/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Course pages
  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.categorySlug}/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog post pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPublishedSlugs();
    blogPages = slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    // Database might not be available during build
    console.log("Could not fetch blog slugs for sitemap:", error);
  }

  // Blog category pages — clean paths (P5-06)
  let blogCategoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    blogCategoryPages = categories.map((name) => ({
      url: `${baseUrl}/blog/category/${categoryToSlug(name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.log("Could not fetch blog categories for sitemap:", error);
  }

  // Bootcamp pages
  const bootcampListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/bootcamps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const bootcampPages: MetadataRoute.Sitemap = bootcamps.map((bootcamp) => ({
    url: `${baseUrl}/bootcamps/${bootcamp.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Trainer pages — Pillar 1 #18 (E-E-A-T author bylines)
  const trainerListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/trainers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const trainerPages: MetadataRoute.Sitemap = teamMembers.map((trainer) => ({
    url: `${baseUrl}/trainers/${trainer.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Neighbourhood location pages (P4-15) + the /locations hub.
  const locationListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const locationPages: MetadataRoute.Sitemap = neighbourhoods.map((area) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Audience-intent landing pages (P4-17).
  const audiencePages: MetadataRoute.Sitemap = audiences.map((a) => ({
    url: `${baseUrl}/courses/for/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Comparison pages (P8-10) + the /compare hub.
  const compareListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Listicle guide pages (P8-12) + the /guides hub.
  const guidesListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
  const guidePages: MetadataRoute.Sitemap = listicles.map((l) => ({
    url: `${baseUrl}/guides/${l.slug}`,
    lastModified: new Date(),
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
