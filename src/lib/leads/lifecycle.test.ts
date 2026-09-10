import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CLOSED_LEAD_STATUSES,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  LEGACY_STATUS_MAP,
  LOSS_REASONS,
  LOSS_REASON_LABELS,
  REASON_REQUIRED_STATUSES,
  isLeadStatus,
  isLossReason,
  leadPriorityLabel,
  leadStatusLabel,
  lossReasonLabel,
  requiresClosureReason,
} from "./lifecycle";

describe("lead lifecycle", () => {
  it("labels every status", () => {
    // A missing label renders as the raw enum name on screen, which is the
    // exact thing the spec asks us not to show.
    for (const status of LEAD_STATUSES) {
      assert.ok(LEAD_STATUS_LABELS[status], `no label for ${status}`);
      assert.notEqual(LEAD_STATUS_LABELS[status], status);
    }
  });

  it("treats closed statuses as a subset of all statuses", () => {
    for (const status of CLOSED_LEAD_STATUSES) {
      assert.ok(LEAD_STATUSES.includes(status), `${status} is not a status`);
    }
  });

  it("keeps ADMISSION_CONFIRMED out of the follow-up queues", () => {
    // Queues exclude closed leads; a reminder against an enrolled student is
    // the noise that stops people reading the queue at all.
    assert.ok(CLOSED_LEAD_STATUSES.includes("ADMISSION_CONFIRMED"));
    assert.ok(!CLOSED_LEAD_STATUSES.includes("FOLLOW_UP"));
  });

  it("maps every legacy value onto a real status", () => {
    for (const [legacy, mapped] of Object.entries(LEGACY_STATUS_MAP)) {
      assert.ok(
        LEAD_STATUSES.includes(mapped),
        `${legacy} maps to ${mapped}, which is not a status`,
      );
    }
  });

  it("recognises new values and rejects the old lowercase ones", () => {
    assert.ok(isLeadStatus("ADMISSION_CONFIRMED"));
    assert.ok(!isLeadStatus("new"));
    assert.ok(!isLeadStatus("nonsense"));
  });

  it("falls back to the raw value rather than blanking it", () => {
    // An unrecognised status must still be visible; showing "—" would hide
    // that a row needs attention.
    assert.equal(leadStatusLabel("FOLLOW_UP"), "Follow-up");
    assert.equal(leadStatusLabel("something-old"), "something-old");
    assert.equal(leadStatusLabel(null), "—");
    assert.equal(leadPriorityLabel("HOT"), "Hot");
    assert.equal(leadPriorityLabel(null), "—");
  });
});

describe("closure reasons", () => {
  it("labels every reason", () => {
    for (const value of LOSS_REASONS) {
      assert.equal(typeof LOSS_REASON_LABELS[value], "string");
    }
  });

  it("requires a reason for exactly the five closing outcomes", () => {
    const required = LEAD_STATUSES.filter(requiresClosureReason);
    assert.deepEqual([...required].sort(), [
      "DUPLICATE",
      "INVALID",
      "LOST",
      "NOT_INTERESTED",
      "NO_RESPONSE",
    ]);
  });

  it("does not demand a reason for an admission", () => {
    // ADMISSION_CONFIRMED is closed, but the admission record explains it.
    assert.equal(requiresClosureReason("ADMISSION_CONFIRMED"), false);
  });

  it("does not demand a reason for an active status", () => {
    for (const status of ["NEW", "CONTACTED", "FOLLOW_UP", "INTERESTED"]) {
      assert.equal(requiresClosureReason(status), false, status);
    }
  });

  it("every reason-required status is also a closed status", () => {
    for (const status of REASON_REQUIRED_STATUSES) {
      assert.equal(CLOSED_LEAD_STATUSES.includes(status), true, status);
    }
  });

  it("shows an unknown reason rather than hiding it", () => {
    assert.equal(lossReasonLabel("SOMETHING_ELSE"), "SOMETHING_ELSE");
    assert.equal(lossReasonLabel(null), "—");
  });

  it("guards reject non-strings", () => {
    for (const bad of [null, undefined, 7, {}]) {
      assert.equal(isLossReason(bad), false);
    }
  });
});
