/**
 * P5-26 — Course detail page video embeds.
 *
 * Per-course YouTube video metadata. Looked up by course slug in
 * `/courses/[category]/[slug]/page.tsx` and rendered via the
 * shared `<VideoEmbed>` component (see
 * `src/components/seo/video-embed.tsx`).
 *
 * Each entry triggers:
 *   - A lazy-loaded YouTube iframe at the top of the course content area
 *   - VideoObject JSON-LD with @id, contentUrl, embedUrl, thumbnailUrl,
 *     uploadDate, duration, publisher → Organization @id
 *
 * Sourced from the Archer Infotech YouTube channel
 * (@archerinfotech2022 — channel id UCJNlH-yeN4t-uMfodxN6IkQ).
 *
 * Adding more entries:
 *   1. Pick a YouTube video — get the v= ID
 *   2. Visit /watch?v=ID and grab uploadDate + duration (ISO 8601)
 *   3. Add an entry below keyed on the course slug
 *   4. Build verifies the page picks it up automatically
 */
export interface CourseVideo {
  youtubeId: string;
  title: string;
  description: string;
  uploadDate: string; // ISO 8601 date YYYY-MM-DD
  duration: string; // ISO 8601 duration e.g. PT5M41S
}

/**
 * Map keyed by course slug. Slug matches the route segment after
 * `/courses/<category>/`. If a slug is not in this map, the course
 * page renders without a video — no fallback shown.
 */
export const courseVideos: Record<string, CourseVideo> = {
  "c-training-in-pune": {
    youtubeId: "lxPrWLXDlnc",
    title: "Introduction to Computer and C Programming",
    description:
      "Get started with C programming — covers what computers actually do, " +
      "where C fits in the language landscape, and the foundations every " +
      "Pune fresher should understand before writing their first line of C.",
    uploadDate: "2024-01-07",
    duration: "PT45M51S",
  },
  "java-training-in-pune": {
    youtubeId: "RBxum7M3B94",
    title: "How To Install JDK 21 On Windows",
    description:
      "Walkthrough of installing the latest Java JDK on Windows — the " +
      "exact setup our Pune students follow on day 1 of the Java track.",
    uploadDate: "2023-11-28",
    duration: "PT5M41S",
  },
  "python-training-in-pune": {
    youtubeId: "hqASj2QIKoU",
    title: "Python OOP — Classes & Objects (Tutorial Series #8.1)",
    description:
      "An introduction to object-oriented programming in Python — the " +
      "module where Pune fresher developers consistently level up their " +
      "code. Part of our full Python Tutorial for Beginners series.",
    uploadDate: "2020-09-06",
    duration: "PT3M20S",
  },
  "cpp-training-in-pune": {
    youtubeId: "UytHPb_xvh4",
    title: "Download and Install Code::Blocks for C and C++",
    description:
      "Setup tutorial for the Code::Blocks IDE — a free, lightweight " +
      "development environment that's perfect for Pune students starting " +
      "with C++ before moving to more advanced toolchains.",
    uploadDate: "2023-11-28",
    duration: "PT6M4S",
  },
  "java-full-stack-training-in-pune": {
    youtubeId: "-_QAiptYC-Y",
    title: "Download and Install Eclipse for Java",
    description:
      "Eclipse setup for Java development — the IDE many Pune product " +
      "captives still use day-to-day. The Java Full Stack track walks " +
      "you through this on day 1.",
    uploadDate: "2024-09-22",
    duration: "PT4M37S",
  },
};

export function getCourseVideo(slug: string): CourseVideo | null {
  return courseVideos[slug] ?? null;
}
