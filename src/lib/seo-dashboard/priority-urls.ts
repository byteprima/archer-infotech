/**
 * Priority URLs the SEO dashboard pulls deep diagnostics for
 * (URL Inspection + URL-level CrUX).
 *
 * Kept to ~20 URLs because each call has rate-limit cost — 24h cache
 * means each URL incurs 1 GSC call + 1 CrUX call per day max. The set
 * covers the highest-impact surfaces: home, expanded /about, /placements
 * (proof page), all 9 category landing pages (P4-11), and the highest-
 * traffic course + bootcamp + blog pages.
 */
import { siteConfig } from "@/data/site-config";

const BASE = siteConfig.url;

export interface PriorityUrl {
  /** Path relative to origin (e.g. "/about"). */
  path: string;
  /** Friendly label for tables. */
  label: string;
  /** Bucket the URL belongs to — used for grouping in the UI. */
  group:
    | "Evergreen"
    | "Category"
    | "Course"
    | "Bootcamp"
    | "Blog";
}

export const PRIORITY_URLS: PriorityUrl[] = [
  // Evergreen — the 5 most strategically important pages
  { path: "/", label: "Home", group: "Evergreen" },
  { path: "/about", label: "About", group: "Evergreen" },
  { path: "/placements", label: "Placements", group: "Evergreen" },
  { path: "/courses", label: "Courses index", group: "Evergreen" },
  { path: "/contact", label: "Contact", group: "Evergreen" },

  // Category landing pages (P4-11) — 4 highest-volume categories
  {
    path: "/courses/programming",
    label: "Programming category",
    group: "Category",
  },
  {
    path: "/courses/full-stack-development",
    label: "Full Stack category",
    group: "Category",
  },
  {
    path: "/courses/data-ai",
    label: "Data & AI category",
    group: "Category",
  },
  {
    path: "/courses/generative-ai",
    label: "Generative AI category",
    group: "Category",
  },

  // Top course pages (highest organic search volume)
  {
    path: "/courses/programming/python-training-in-pune",
    label: "Python",
    group: "Course",
  },
  {
    path: "/courses/programming/java-training-in-pune",
    label: "Java",
    group: "Course",
  },
  {
    path: "/courses/full-stack-development/java-full-stack-training-in-pune",
    label: "Java Full Stack",
    group: "Course",
  },
  {
    path: "/courses/full-stack-development/mern-stack-training-in-pune",
    label: "MERN Stack",
    group: "Course",
  },
  {
    path: "/courses/data-ai/data-science-training-in-pune",
    label: "Data Science",
    group: "Course",
  },

  // Bootcamps
  { path: "/bootcamps/codeleap", label: "CodeLeap", group: "Bootcamp" },
  { path: "/bootcamps/techready", label: "TechReady", group: "Bootcamp" },

  // Top blog posts (sample of 3 high-impression candidates)
  {
    path: "/blog/python-best-first-programming-language",
    label: "Why Python is the best first language",
    group: "Blog",
  },
  {
    path: "/blog/mern-stack-developer-roadmap-skills-projects-jobs",
    label: "MERN Stack roadmap",
    group: "Blog",
  },
  {
    path: "/blog/ai-engineer-roadmap-for-freshers-2025",
    label: "AI Engineer roadmap",
    group: "Blog",
  },
];

/** Absolute-URL form for the CrUX / URL Inspection APIs. */
export function priorityUrlFull(p: PriorityUrl): string {
  return `${BASE}${p.path}`;
}
