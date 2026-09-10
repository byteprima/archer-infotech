import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatAdmissionNumber,
  nextAdmissionNumber,
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

  it("starts at one for a fresh year", () => {
    assert.equal(nextAdmissionNumber(2026, []), "ADM-2026-0001");
    assert.equal(
      nextAdmissionNumber(2027, ["ADM-2026-0009"]),
      "ADM-2027-0001",
    );
  });

  it("continues from the highest number in use", () => {
    const existing = ["ADM-2026-0001", "ADM-2026-0003", "ADM-2026-0002"];
    assert.equal(nextAdmissionNumber(2026, existing), "ADM-2026-0004");
  });

  it("does not reissue a number after a deletion", () => {
    // Three issued, the middle one deleted. Counting rows would return 0003,
    // which is already printed on somebody's receipt.
    const existing = ["ADM-2026-0001", "ADM-2026-0003"];
    assert.equal(nextAdmissionNumber(2026, existing), "ADM-2026-0004");
  });

  it("ignores references it did not issue", () => {
    const existing = [null, "", "2026/07", "ADM-2026", "ADMISSION-5", "ADM-2026-0002"];
    assert.equal(nextAdmissionNumber(2026, existing), "ADM-2026-0003");
  });

  it("parses only its own year", () => {
    assert.equal(parseAdmissionNumber("ADM-2026-0004", 2026), 4);
    assert.equal(parseAdmissionNumber("ADM-2025-0004", 2026), null);
    assert.equal(parseAdmissionNumber("ADM-2026-0000", 2026), null);
    assert.equal(parseAdmissionNumber(null, 2026), null);
  });
});
