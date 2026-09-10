import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatEnquiryNumber,
  highestEnquirySequence,
  parseEnquiryNumber,
} from "./enquiry-number";

describe("enquiry numbering", () => {
  it("matches the format migration 0002 backfilled", () => {
    assert.equal(formatEnquiryNumber(2026, 42), "ENQ-2026-0042");
    assert.equal(formatEnquiryNumber(2026, 1), "ENQ-2026-0001");
  });

  it("does not truncate past four digits", () => {
    assert.equal(formatEnquiryNumber(2026, 12345), "ENQ-2026-12345");
  });

  it("seeds from the backfilled sequence rather than zero", () => {
    const existing = Array.from({ length: 25 }, (_, i) =>
      formatEnquiryNumber(2026, i + 1),
    );
    assert.equal(highestEnquirySequence(2026, existing), 25);
  });

  it("is zero for a fresh year", () => {
    assert.equal(highestEnquirySequence(2027, ["ENQ-2026-0099"]), 0);
    assert.equal(highestEnquirySequence(2026, []), 0);
  });

  it("ignores references it did not issue", () => {
    const existing = [null, "", "42", "ENQ-2026", "ADM-2026-0009", "ENQ-2026-0002"];
    assert.equal(highestEnquirySequence(2026, existing), 2);
  });

  it("drops back when the highest row is deleted — which is why the counter exists", () => {
    // This is the regression the first version shipped with. The seed falls
    // from 27 to 26 when the newest lead is deleted, so "seed + 1" would hand
    // ENQ-2026-0027 to a second person. lib/reference-counter.ts is what
    // stops that; this test pins the reason it is needed.
    const withNewest = ["ENQ-2026-0026", "ENQ-2026-0027"];
    const afterDelete = ["ENQ-2026-0026"];
    assert.equal(highestEnquirySequence(2026, withNewest), 27);
    assert.equal(highestEnquirySequence(2026, afterDelete), 26);
  });

  it("parses only its own year and prefix", () => {
    assert.equal(parseEnquiryNumber("ENQ-2026-0004", 2026), 4);
    assert.equal(parseEnquiryNumber("ENQ-2025-0004", 2026), null);
    assert.equal(parseEnquiryNumber("ADM-2026-0004", 2026), null);
    assert.equal(parseEnquiryNumber("ENQ-2026-0000", 2026), null);
    assert.equal(parseEnquiryNumber(null, 2026), null);
  });
});
