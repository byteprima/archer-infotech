import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  CLOSED_LEAD_STATUSES,
  LEGACY_STATUS_MAP,
  isLeadStatus,
  leadStatusLabel,
  leadPriorityLabel,
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
