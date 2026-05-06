import type { CourseRichContent } from "./types";
import { javaTrainingInPune } from "./java-training-in-pune";

/**
 * Registry of long-form rich content keyed by course slug.
 *
 * Add a new course here once its content file is written. Courses without
 * an entry continue to render the existing simple layout unchanged, so
 * the rollout is incremental and zero-risk.
 */
export const courseRichContent: Record<string, CourseRichContent> = {
  "java-training-in-pune": javaTrainingInPune,
};

export function getCourseRichContent(slug: string): CourseRichContent | null {
  return courseRichContent[slug] ?? null;
}

export type { CourseRichContent };
