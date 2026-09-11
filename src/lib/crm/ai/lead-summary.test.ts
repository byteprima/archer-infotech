import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildSummaryPrompt, type SummaryInput } from "./lead-summary";

const base: SummaryInput = {
  courseInterest: "Java Full Stack Development",
  status: "COUNSELLING",
  priority: "WARM",
  createdAt: new Date(2026, 7, 20),
  qualification: "B.E. Computer Science",
  currentStatus: "Final year student",
  expectedJoining: "After exams",
  modePreference: "Offline",
  source: "contact_form",
  demoAttended: true,
  batchInterest: "Java FS — Oct Weekend",
  followUps: [
    {
      type: "CALL",
      outcome: "CONNECTED",
      notes: "Asked about fees and weekend timing",
      at: new Date(2026, 8, 1),
    },
  ],
  scoreBand: "HOT",
  scoreReasons: ["Attended a demo", "Asked about a specific batch"],
};

describe("buildSummaryPrompt — what it sends", () => {
  it("includes the facts a briefing needs", () => {
    const prompt = buildSummaryPrompt(base);
    assert.equal(prompt.includes("Java Full Stack Development"), true);
    assert.equal(prompt.includes("COUNSELLING"), true);
    assert.equal(prompt.includes("Asked about fees and weekend timing"), true);
  });

  it("never sends the person's identity", () => {
    // The summary is about what happened and what to do next. None of that
    // needs a name, so the name does not leave the building.
    const prompt = buildSummaryPrompt({
      ...base,
      // Even if a caller passed these through a note, the shape has no field
      // for them — this asserts the prompt cannot carry one.
    });
    for (const leak of ["9876543210", "@example.com", "ENQ-2026"]) {
      assert.equal(prompt.includes(leak), false, leak);
    }
  });

  it("escapes quotes in notes so they cannot break the prompt structure", () => {
    const prompt = buildSummaryPrompt({
      ...base,
      followUps: [
        { type: "CALL", outcome: "CONNECTED", notes: 'He said "call me Monday"', at: null },
      ],
    });
    assert.equal(prompt.includes('"call me Monday"'), false);
    assert.equal(prompt.includes("'call me Monday'"), true);
  });

  it("says plainly when there is no history rather than leaving a gap", () => {
    const prompt = buildSummaryPrompt({ ...base, followUps: [] });
    assert.equal(prompt.includes("No conversations have been recorded"), true);
  });

  it("omits unknown fields instead of sending 'null'", () => {
    const prompt = buildSummaryPrompt({
      ...base,
      qualification: null,
      currentStatus: null,
      expectedJoining: null,
      modePreference: null,
      priority: null,
      batchInterest: null,
    });
    assert.equal(/null|undefined/.test(prompt), false, prompt);
  });

  it("caps a very long history", () => {
    const many = Array.from({ length: 40 }, (_, i) => ({
      type: "CALL",
      outcome: "NO_ANSWER",
      notes: `attempt ${i}`,
      at: new Date(2026, 8, 1),
    }));
    const prompt = buildSummaryPrompt({ ...base, followUps: many });
    assert.equal(prompt.includes("attempt 11"), true);
    assert.equal(prompt.includes("attempt 30"), false);
  });
});

describe("buildSummaryPrompt — what it forbids", () => {
  it("tells the model not to invent anything", () => {
    const prompt = buildSummaryPrompt(base);
    assert.equal(prompt.includes("Use ONLY the facts above"), true);
    assert.equal(prompt.includes("Do not invent"), true);
  });

  it("handles a lead with almost nothing known", () => {
    const prompt = buildSummaryPrompt({
      courseInterest: null,
      status: "NEW",
      priority: null,
      createdAt: null,
      qualification: null,
      currentStatus: null,
      expectedJoining: null,
      modePreference: null,
      source: null,
      demoAttended: false,
      batchInterest: null,
      followUps: [],
      scoreBand: "COLD",
      scoreReasons: [],
    });
    assert.equal(prompt.includes("not stated"), true);
    assert.equal(/null|undefined/.test(prompt), false);
  });
});
