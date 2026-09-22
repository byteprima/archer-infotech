import { categories, courses } from "./courses";

/**
 * Canonical catalogue totals derived from the records that actually power the
 * course pages. Public copy must consume these values instead of maintaining
 * a separate, hand-written count.
 */
export const catalogueStats = {
  courses: courses.filter((course) => course.categorySlug !== "bootcamps").length,
  bootcamps: courses.filter((course) => course.categorySlug === "bootcamps").length,
  courseCategories: categories.filter((category) => category.slug !== "bootcamps").length,
  totalPrograms: courses.length,
} as const;
