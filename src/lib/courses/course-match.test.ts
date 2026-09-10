import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { matchesCourse, splitCourseValue } from "./course-match";

/**
 * These are regression tests for two bugs that were live in the database,
 * not hypotheticals. Both failed silently — no error, just records that
 * quietly appeared on the wrong pages or on none at all.
 */
describe("course matching", () => {
  it("matches a plain title", () => {
    assert.ok(matchesCourse("Java Full Stack Development", "Java Full Stack Development"));
  });

  it("survives the punctuation and spacing that orphaned real rows", () => {
    // Four of five published testimonials read exactly this and reached no
    // course page at all under the old substring test.
    assert.ok(
      matchesCourse("Java full-stack development ", "Java Full Stack Development"),
    );
  });

  it("does not over-match a short value", () => {
    // "C" satisfied `title.includes("C")` against 41 of 61 course titles —
    // Core Java, JavaScript, Docker, React.
    assert.ok(matchesCourse("C", "C Programming") === false);
    assert.ok(!matchesCourse("C", "Core Java Programming"));
    assert.ok(!matchesCourse("C", "Docker"));
    assert.ok(!matchesCourse("C", "React.js Development"));
  });

  it("matches every course in a comma-joined value", () => {
    const stored = "AWS Cloud Computing, DevOps Engineering";
    assert.ok(matchesCourse(stored, "AWS Cloud Computing"));
    assert.ok(matchesCourse(stored, "DevOps Engineering"));
    assert.ok(!matchesCourse(stored, "Kubernetes"));
  });

  it("does not match a partial title", () => {
    // "Java Full Stack" is not "Java Full Stack Development" — the backfill
    // canonicalises these rather than the matcher guessing.
    assert.ok(!matchesCourse("Java Full Stack", "Java Full Stack Development"));
  });

  it("handles empty and missing values without throwing", () => {
    assert.ok(!matchesCourse(null, "Java Full Stack Development"));
    assert.ok(!matchesCourse("", "Java Full Stack Development"));
    assert.ok(!matchesCourse("Java Full Stack Development", ""));
    assert.deepEqual(splitCourseValue(null), []);
    assert.deepEqual(splitCourseValue(" A , ,B "), ["A", "B"]);
  });
});
