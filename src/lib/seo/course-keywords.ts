/**
 * Derive a small list of search keywords from a course's slug + category
 * for matching against blog post tags. Drives the "Related reading"
 * block on course detail pages — bridges course → blog topic clusters
 * (P5-28).
 *
 * Approach: strip the boilerplate "training-in-pune" suffix and any
 * generic stop-words from the course slug + category, then split into
 * single-token keywords. Multi-token core terms (e.g. "full stack",
 * "machine learning") are preserved as a single keyword so they match
 * blog tags exactly.
 *
 * This is intentionally a lightweight heuristic — a hand-curated
 * mapping per course would be more precise but costs editorial time on
 * 42 course files. The hit-count ranking in getRelatedBlogPosts() gives
 * us most of the precision a curated mapping would, with zero
 * maintenance.
 */

const STOP_WORDS = new Set([
  "training",
  "in",
  "pune",
  "course",
  "courses",
  "with",
  "and",
  "the",
  "for",
  "a",
  "an",
  "by",
  "of",
  "online",
  "offline",
]);

/**
 * Multi-word phrases that should stay glued so they match blog tags
 * verbatim. Order matters — longer phrases checked first.
 */
const MULTI_WORD_KEYWORDS = [
  "full stack",
  "machine learning",
  "data science",
  "data engineering",
  "data analytics",
  "deep learning",
  "generative ai",
  "prompt engineering",
  "cloud computing",
  "spring boot",
  "react native",
  "android development",
  "ios swift",
  "mern stack",
  "mean stack",
  "next js",
  "node js",
];

/**
 * Convert a hyphenated slug into a normalised lowercase string with
 * known multi-word phrases re-glued. E.g. "java-full-stack" →
 * "java full stack" → tokens ["java", "full stack"].
 */
function tokenise(input: string): string[] {
  let normalised = input
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens: string[] = [];

  // Pull out multi-word phrases first so their constituents don't get
  // split off into single words.
  for (const phrase of MULTI_WORD_KEYWORDS) {
    if (normalised.includes(phrase)) {
      tokens.push(phrase);
      normalised = normalised.replace(phrase, " ").replace(/\s+/g, " ").trim();
    }
  }

  // Remaining single words.
  for (const word of normalised.split(/\s+/)) {
    if (word.length >= 2 && !STOP_WORDS.has(word)) {
      tokens.push(word);
    }
  }

  return tokens;
}

/**
 * Build a deduplicated list of keywords for a course. Combines slug
 * tokens with category tokens, with slug tokens prioritised (more
 * specific).
 */
export function deriveCourseKeywords(
  slug: string,
  categoryName: string | null | undefined,
): string[] {
  // Strip the "training-in-pune" suffix that every course slug carries
  // — it adds no signal because every blog tag is also Pune-IT scoped.
  const coreSlug = slug.replace(/-training-in-pune$/i, "");

  const slugTokens = tokenise(coreSlug);
  const categoryTokens = categoryName ? tokenise(categoryName) : [];

  const merged: string[] = [];
  const seen = new Set<string>();
  for (const t of [...slugTokens, ...categoryTokens]) {
    if (!seen.has(t)) {
      seen.add(t);
      merged.push(t);
    }
  }

  return merged;
}
