import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatAdmissionNumber,
  highestAdmissionSequence,
  parseAdmissionNumber,
} from "./numbering";

describe("admission numbering", () => {
  it("pads to four digits", () => {
    assert.equal(formatAdmissionNumber(2026, 7), "ADM-2026-0007");
    assert.equal(formatAdmissionNumber(2026, 1234), "ADM-2026-1234");
  });

  it("does not truncate past four digits", () => {
    assert.equal(formatAdmissionNumber(2026, 12345), "ADM-2026-12345");
  });

  it("is zero for a fresh year", () => {
    assert.equal(highestAdmissionSequence(2026, []), 0);
    assert.equal(highestAdmissionSequence(2027, ["ADM-2026-0009"]), 0);
  });

  it("seeds from the highest number in use", () => {
    const existing = ["ADM-2026-0001", "ADM-2026-0003", "ADM-2026-0002"];
    assert.equal(highestAdmissionSequence(2026, existing), 3);
  });

  it("drops back when the highest row is deleted — which is why the counter exists", () => {
    // Shipped in Phase 3 as "highest + 1", which reissued ADM-2026-0004 after
    // the newest admission was deleted. lib/reference-counter.ts is the fix;
    // this pins the reason.
    assert.equal(highestAdmissionSequence(2026, ["ADM-2026-0003", "ADM-2026-0004"]), 4);
    assert.equal(highestAdmissionSequence(2026, ["ADM-2026-0003"]), 3);
  });

  it("ignores references it did not issue", () => {
    const existing = [null, "", "2026/07", "ADM-2026", "ADMISSION-5", "ADM-2026-0002"];
    assert.equal(highestAdmissionSequence(2026, existing), 2);
  });

  it("parses only its own year", () => {
    assert.equal(parseAdmissionNumber("ADM-2026-0004", 2026), 4);
    assert.equal(parseAdmissionNumber("ADM-2025-0004", 2026), null);
    assert.equal(parseAdmissionNumber("ADM-2026-0000", 2026), null);
    assert.equal(parseAdmissionNumber(null, 2026), null);
  });
});
