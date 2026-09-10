import { z } from "zod";

/**
 * An image reference that may be absolute or one of ours.
 *
 * Images on the admin forms arrive two ways: someone pastes an absolute URL
 * (a LinkedIn avatar, a CDN link), or they upload a file and we store it,
 * producing a site-relative `/media/<collection>/<file>` path from mediaUrl().
 * A bare `z.string().url()` rejects the relative form, which silently breaks
 * every upload button on the form that uses it — the file stores fine, then
 * the save is refused.
 *
 * Extracted here because it was written twice (placements, testimonials) with
 * a comment in each pointing at the other, and the blog form — which never
 * had it — could not accept uploads at all as a result.
 */
export const imageUrlSchema = z
  .string()
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//.test(v),
    "Please enter a valid image URL, or an uploaded /media path",
  );

/** The same rule, allowing an empty string for optional fields. */
export const optionalImageUrlSchema = imageUrlSchema.optional().or(z.literal(""));
