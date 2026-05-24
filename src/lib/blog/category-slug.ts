/**
 * Blog category slug helpers (P5-06).
 *
 * Blog categories are stored as free-form display names (e.g. "Career
 * Advice", "Web Development"). Clean category URLs use a slug derived from
 * the name, so we need a deterministic name→slug function plus a resolver
 * that maps a slug back to its display name against the live category list.
 */

/** "Career Advice" → "career-advice". Deterministic and reversible-by-lookup. */
export function categoryToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Clean path for a category display name. */
export function categoryPath(name: string): string {
  return `/blog/category/${categoryToSlug(name)}`;
}

/**
 * Resolve a slug back to its category display name against the known list.
 * Returns undefined when no category matches (caller should 404).
 */
export function resolveCategorySlug(
  slug: string,
  categories: string[],
): string | undefined {
  return categories.find((name) => categoryToSlug(name) === slug);
}
