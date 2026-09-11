import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  HOT_THRESHOLD,
  WARM_THRESHOLD,
  scoreLead,
  suggestNextAction,
  type ScoreSignals,
} from "./lead-score";

const NOW = new Date(2026, 8, 11, 12);
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 864e5);

const bare: ScoreSignals = {
  status: "NEW",
  createdAt: NOW,
  followUpCount: 0,
  lastFollowUpAt: null,
  demoRegistered: false,
  demoAttended: false,
  batchInterestCount: 0,
  courseInterest: null,
  email: null,
  qualification: null,
  expectedJoining: null,
  modePreference: null,
};

describe("scoreLead — shape", () => {
  it("never leaves the 0-100 range", () => {
    const everything: ScoreSignals = {
      ...bare,
      status: "INTERESTED",
      followUpCount: 50,
      lastFollowUpAt: NOW,
      demoRegistered: true,
      demoAttended: true,
      batchInterestCount: 5,
      courseInterest: "Java",
      email: "a@b.c",
      qualification: "BE",
      expectedJoining: "Next month",
      modePreference: "Offline",
    };
    const result = scoreLead(everything, NOW);
    assert.equal(result.score <= 100, true, String(result.score));
    assert.equal(result.score >= 0, true);
  });

  it("floors at zero rather than going negative", () => {
    const neglected: ScoreSignals = {
      ...bare,
      createdAt: daysAgo(120),
      lastFollowUpAt: daysAgo(90),
      followUpCount: 0,
    };
    const result = scoreLead(neglected, NOW);
    assert.equal(result.score >= 0, true, String(result.score));
  });

  it("gives every reason a non-zero weight", () => {
    const result = scoreLead(
      { ...bare, demoAttended: true, courseInterest: "Java" },
      NOW,
    );
    for (const reason of result.reasons) {
      assert.notEqual(reason.points, 0, reason.label);
    }
  });

  it("orders reasons by weight so the top one is the real one", () => {
    const result = scoreLead(
      { ...bare, demoAttended: true, email: "a@b.c", courseInterest: "Java" },
      NOW,
    );
    assert.equal(result.reasons[0].label, "Attended a demo");
  });

  it("explains every point it awards", () => {
    const signals = { ...bare, demoAttended: true, batchInterestCount: 1, courseInterest: "Java" };
    const result = scoreLead(signals, NOW);
    const summed = result.reasons.reduce((s, r) => s + r.points, 0);
    assert.equal(summed, result.rawScore, "rawScore must equal the sum of its reasons");
    assert.equal(result.score, result.rawScore, "uncapped, the two agree");
  });

  it("reports the raw total when the score is capped", () => {
    // The panel lists the reasons and a counsellor can add them up. If they
    // sum to 117 and the score reads 100, the difference must be visible as a
    // cap rather than looking like an arithmetic error.
    const everything: ScoreSignals = {
      ...bare,
      status: "INTERESTED",
      followUpCount: 10,
      lastFollowUpAt: NOW,
      demoRegistered: true,
      demoAttended: true,
      batchInterestCount: 2,
      courseInterest: "Java",
      email: "a@b.c",
      qualification: "BE",
      expectedJoining: "Next month",
      modePreference: "Offline",
    };
    const result = scoreLead(everything, NOW);
    assert.equal(result.score, 100);
    assert.equal(result.rawScore > 100, true, String(result.rawScore));
    assert.equal(
      result.reasons.reduce((s, r) => s + r.points, 0),
      result.rawScore,
    );
  });
});

describe("scoreLead — what it believes", () => {
  it("ranks attending a demo above merely booking one", () => {
    const booked = scoreLead({ ...bare, demoRegistered: true }, NOW);
    const attended = scoreLead({ ...bare, demoRegistered: true, demoAttended: true }, NOW);
    assert.equal(attended.score > booked.score, true);
  });

  it("does not double-count a booked demo that was attended", () => {
    const result = scoreLead({ ...bare, demoRegistered: true, demoAttended: true }, NOW);
    const labels = result.reasons.map((r) => r.label);
    assert.equal(labels.includes("Registered for a demo"), false, labels.join(", "));
  });

  it("caps the reward for many conversations", () => {
    const three = scoreLead({ ...bare, followUpCount: 3 }, NOW);
    const thirty = scoreLead({ ...bare, followUpCount: 30 }, NOW);
    // Otherwise a lead nobody can reach outranks one who attended a demo,
    // purely because somebody kept logging attempts.
    assert.equal(thirty.score - three.score <= 6, true, `${three.score} -> ${thirty.score}`);
  });

  it("penalises a lead nobody has ever contacted", () => {
    const fresh = scoreLead({ ...bare, createdAt: NOW }, NOW);
    const forgotten = scoreLead({ ...bare, createdAt: daysAgo(30) }, NOW);
    assert.equal(forgotten.score < fresh.score, true);
    assert.equal(
      forgotten.reasons.some((r) => r.label.includes("Never contacted")),
      true,
    );
  });

  it("does not penalise a brand new enquiry for being uncontacted", () => {
    const result = scoreLead({ ...bare, createdAt: daysAgo(1) }, NOW);
    assert.equal(result.reasons.some((r) => r.points < 0), false);
  });

  it("penalises a lead gone quiet for months", () => {
    const stale = scoreLead(
      { ...bare, status: "INTERESTED", followUpCount: 2, lastFollowUpAt: daysAgo(90) },
      NOW,
    );
    assert.equal(
      stale.reasons.some((r) => r.label.includes("over two months")),
      true,
    );
  });

  it("bands a demo-attending, batch-asking lead as hot", () => {
    const result = scoreLead(
      {
        ...bare,
        status: "INTERESTED",
        demoRegistered: true,
        demoAttended: true,
        batchInterestCount: 1,
        followUpCount: 2,
        lastFollowUpAt: daysAgo(2),
        courseInterest: "Java",
      },
      NOW,
    );
    assert.equal(result.band, "HOT", `${result.score}`);
    assert.equal(result.score >= HOT_THRESHOLD, true);
  });

  it("bands a bare untouched enquiry as cold", () => {
    const result = scoreLead(bare, NOW);
    assert.equal(result.band, "COLD");
    assert.equal(result.score < WARM_THRESHOLD, true);
  });
});

describe("scoreLead — closed leads", () => {
  it("refuses to score a closed lead", () => {
    for (const status of ["ADMISSION_CONFIRMED", "LOST", "NOT_INTERESTED", "DUPLICATE"]) {
      const result = scoreLead({ ...bare, status, demoAttended: true }, NOW);
      assert.equal(result.notApplicable, true, status);
      assert.equal(result.reasons.length, 0, status);
    }
  });
});

describe("suggestNextAction", () => {
  it("says nothing for a closed lead", () => {
    assert.equal(
      suggestNextAction({ ...bare, status: "LOST" }, scoreLead({ ...bare, status: "LOST" }, NOW), NOW),
      null,
    );
  });

  it("pushes for a decision after a demo", () => {
    const s = { ...bare, status: "DEMO_ATTENDED", demoAttended: true, demoRegistered: true };
    const text = suggestNextAction(s, scoreLead(s, NOW), NOW);
    assert.equal(text?.includes("confirm a seat"), true, String(text));
  });

  it("asks for a reminder when a demo is booked but not attended", () => {
    const s = { ...bare, demoRegistered: true };
    const text = suggestNextAction(s, scoreLead(s, NOW), NOW);
    assert.equal(text?.includes("reminder"), true, String(text));
  });

  it("flags an enquiry nobody has called, with the age", () => {
    const s = { ...bare, createdAt: daysAgo(3) };
    const text = suggestNextAction(s, scoreLead(s, NOW), NOW);
    assert.equal(text?.includes("3 days"), true, String(text));
  });

  it("never claims something the signals do not support", () => {
    // A bare new lead must not be told "they attended the demo".
    const text = suggestNextAction(bare, scoreLead(bare, NOW), NOW) ?? "";
    assert.equal(/demo/i.test(text), false, text);
  });
});
