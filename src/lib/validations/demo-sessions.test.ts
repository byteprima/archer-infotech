import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { demoSessionFormSchema } from "./demo-sessions";

const base = {
  courseSlug: "java-full-stack",
  batchId: "",
  scheduledAt: "2026-09-20T18:30",
  mode: "offline" as const,
  status: "scheduled" as const,
  trainer: "",
  capacity: "" as const,
  location: "Kothrud, Lab 2",
  meetingLink: "",
  notes: "",
};

function errorPaths(input: Record<string, unknown>): string[] {
  const result = demoSessionFormSchema.safeParse(input);
  if (result.success) return [];
  // Unique: a blank required field trips both min(1) and the refine, and
  // which of the two fires is not what these tests are about.
  return [...new Set(result.error.issues.map((i) => i.path.join(".")))];
}

describe("demo session validation", () => {
  it("accepts a well-formed offline demo", () => {
    assert.equal(demoSessionFormSchema.safeParse(base).success, true);
  });

  it("requires a course", () => {
    assert.deepEqual(errorPaths({ ...base, courseSlug: "" }), ["courseSlug"]);
  });

  it("requires a valid date and time", () => {
    assert.deepEqual(errorPaths({ ...base, scheduledAt: "" }), ["scheduledAt"]);
    assert.deepEqual(errorPaths({ ...base, scheduledAt: "not a date" }), [
      "scheduledAt",
    ]);
  });

  it("requires a location for an offline demo", () => {
    assert.deepEqual(errorPaths({ ...base, location: "" }), ["location"]);
  });

  it("requires a link for an online demo", () => {
    const online = { ...base, mode: "online", location: "", meetingLink: "" };
    assert.deepEqual(errorPaths(online), ["meetingLink"]);
  });

  it("requires both for a hybrid demo", () => {
    const hybrid = { ...base, mode: "hybrid", location: "", meetingLink: "" };
    assert.deepEqual(errorPaths(hybrid).sort(), ["location", "meetingLink"]);
  });

  it("accepts a hybrid demo that has both", () => {
    const hybrid = {
      ...base,
      mode: "hybrid",
      location: "Kothrud",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    };
    assert.equal(demoSessionFormSchema.safeParse(hybrid).success, true);
  });

  it("rejects a link that is not http(s)", () => {
    for (const link of ["meet.google.com/abc", "javascript:alert(1)", "ftp://x/y"]) {
      const online = { ...base, mode: "online", location: "", meetingLink: link };
      assert.deepEqual(errorPaths(online), ["meetingLink"], `accepted ${link}`);
    }
  });

  it("treats a blank capacity as no limit", () => {
    const parsed = demoSessionFormSchema.safeParse({ ...base, capacity: "" });
    assert.equal(parsed.success, true);
    if (parsed.success) assert.equal(parsed.data.capacity, "");
  });

  it("rejects a capacity below one", () => {
    assert.deepEqual(errorPaths({ ...base, capacity: 0 }), ["capacity"]);
  });

  it("rejects an unknown mode or status", () => {
    assert.deepEqual(errorPaths({ ...base, mode: "postal" }), ["mode"]);
    assert.deepEqual(errorPaths({ ...base, status: "maybe" }), ["status"]);
  });
});
