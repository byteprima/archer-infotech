import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";

import { categories, courses } from "./courses";
import { siteConfig } from "./site-config";

const PUBLIC_COPY_EXTENSIONS = new Set([".md", ".txt", ".ts", ".tsx"]);

function publicCopyFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return publicCopyFiles(path);
    return PUBLIC_COPY_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
  });
}

function lowerBound(claim: string): number {
  const match = /^(\d+)\+$/.exec(claim);
  assert.ok(match, `Expected a lower-bound claim such as "60+", got "${claim}"`);
  return Number(match[1]);
}

describe("canonical public facts", () => {
  it("keeps the rounded course claim aligned with the actual catalogue", () => {
    const claimedMinimum = lowerBound(siteConfig.stats.courses);
    const roundedCatalogueSize = Math.floor(courses.length / 10) * 10;

    assert.equal(
      claimedMinimum,
      roundedCatalogueSize,
      `${courses.length} courses should be published as ${roundedCatalogueSize}+`,
    );
  });

  it("keeps category and bootcamp counts aligned with the catalogue", () => {
    const bootcamps = courses.filter(
      (course) => course.categorySlug === "bootcamps",
    );
    const courseCategories = categories.filter(
      (category) => category.slug !== "bootcamps",
    );

    assert.equal(courseCategories.length, siteConfig.stats.courseCategories);
    assert.equal(bootcamps.length, siteConfig.stats.bootcamps);
  });

  it("does not reintroduce the retired 40+/48+ catalogue claims", () => {
    const staleCourseClaim =
      /\b(?:40|48)\+\s+(?:(?:active|technical|technology|job-focused|career-focused|IT training|tech)\s+)?(?:courses|programmes|programs|career tracks)\b/i;

    for (const file of [
      ...publicCopyFiles("src/app"),
      ...publicCopyFiles("src/components"),
      ...publicCopyFiles("src/data"),
      ...publicCopyFiles("public"),
    ]) {
      assert.doesNotMatch(
        readFileSync(file, "utf8"),
        staleCourseClaim,
        `Stale catalogue count in ${file}`,
      );
    }
  });

  it("does not describe a two-centre institute as single-location", () => {
    const factSheet = readFileSync("src/app/about/facts/page.tsx", "utf8");
    const staleLocationClaim =
      /\b(?:single|sole|only)\s+(?:campus|physical location)|\bno other branches\b/i;

    assert.ok(siteConfig.branches.length > 0);
    assert.doesNotMatch(factSheet, staleLocationClaim);
  });

  it("keeps both LLM reference files explicit about locations and outcomes", () => {
    for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
      const content = readFileSync(file, "utf8");
      assert.match(content, /two physical centres/i, file);
      assert.match(content, /Vishrambag, Sangli/i, file);
      assert.ok(
        content.includes(`${siteConfig.stats.courses} courses`),
        `${file} must carry the canonical course claim`,
      );
      assert.ok(
        content.includes(siteConfig.stats.placementRateBasis),
        `${file} must carry the placement-rate basis`,
      );
    }
  });
});
