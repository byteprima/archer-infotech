/**
 * The fresher-vs-experienced answer, in one place.
 *
 * Plain module rather than living in the field component, because the chatbot's
 * `capture_lead` tool validates against the same list server-side — and a
 * `"use client"` module's non-component exports arrive in the server graph as
 * client references, not the array itself.
 *
 * The strings are written verbatim to `leads.experience_level` and grouped in
 * the admin panel, so nothing may paraphrase them into a third bucket.
 */

export const EXPERIENCE_LEVEL_OPTIONS = ["Fresher", "Experienced"] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVEL_OPTIONS)[number];

/** Longer labels for radio buttons; the stored value stays the short one. */
export const EXPERIENCE_LEVEL_HINTS: Record<ExperienceLevel, string> = {
  Fresher: "Fresher (student / no IT experience)",
  Experienced: "Experienced (working professional)",
};

/**
 * Coerce free text (a chatbot argument, a mobile-app payload) to a canonical
 * option, or `undefined` when it matches neither.
 */
export function normalizeExperienceLevel(value: unknown): ExperienceLevel | undefined {
  const candidate = String(value ?? "").trim().toLowerCase();
  return EXPERIENCE_LEVEL_OPTIONS.find((option) => option.toLowerCase() === candidate);
}
