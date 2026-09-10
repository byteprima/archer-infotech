import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  MAX_FEE_PAISE,
  computeFees,
  formatPaise,
  paiseToRupeeInput,
  parseRupeesToPaise,
} from "./money";

describe("parseRupeesToPaise", () => {
  it("accepts the shapes an admin actually types", () => {
    assert.equal(parseRupeesToPaise("45000"), 4_500_000);
    assert.equal(parseRupeesToPaise("45,000"), 4_500_000);
    assert.equal(parseRupeesToPaise("₹45,000"), 4_500_000);
    assert.equal(parseRupeesToPaise(" 45000 "), 4_500_000);
    assert.equal(parseRupeesToPaise("45000.50"), 4_500_050);
    assert.equal(parseRupeesToPaise(0), 0);
  });

  it("rejects anything that is not a plain rupee amount", () => {
    for (const bad of ["", "abc", "-500", "1e5", "12.345", "4 5", null, undefined, {}]) {
      assert.equal(parseRupeesToPaise(bad), null, `accepted ${JSON.stringify(bad)}`);
    }
  });

  it("never produces a fractional paise", () => {
    assert.equal(Number.isInteger(parseRupeesToPaise("39999.99")), true);
  });
});

describe("computeFees", () => {
  it("derives the final fee", () => {
    const result = computeFees("45000", "5000");
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.courseFee, 4_500_000);
    assert.equal(result.discount, 500_000);
    assert.equal(result.finalFee, 4_000_000);
  });

  it("treats a blank discount as zero", () => {
    for (const blank of ["", null, undefined]) {
      const result = computeFees("45000", blank);
      assert.equal(result.ok, true);
      if (result.ok) assert.equal(result.finalFee, 4_500_000);
    }
  });

  it("stays exact where floating point would not", () => {
    // 45000 - 12% is 39600 exactly. The float route gives 39599.999999999996.
    const result = computeFees("45000", "5400");
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.finalFee, 3_960_000);
  });

  it("refuses a discount larger than the fee", () => {
    const result = computeFees("45000", "50000");
    assert.equal(result.ok, false);
  });

  it("allows a fee entirely waived", () => {
    const result = computeFees("45000", "45000");
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.finalFee, 0);
  });

  it("rejects a fee that is obviously a typo", () => {
    assert.equal(computeFees(String(MAX_FEE_PAISE), "0").ok, false);
  });

  it("rejects a missing fee rather than defaulting it to zero", () => {
    assert.equal(computeFees("", "0").ok, false);
    assert.equal(computeFees(undefined, "0").ok, false);
  });
});

describe("formatPaise", () => {
  it("uses the Indian grouping", () => {
    assert.equal(formatPaise(4_500_000), "₹45,000");
    assert.equal(formatPaise(100_000_000), "₹10,00,000");
  });

  it("shows paise only when there are any", () => {
    assert.equal(formatPaise(4_500_050), "₹45,000.50");
    assert.equal(formatPaise(0), "₹0");
  });

  it("does not invent a zero for a missing amount", () => {
    assert.equal(formatPaise(null), "—");
    assert.equal(formatPaise(undefined), "—");
  });
});

describe("paiseToRupeeInput", () => {
  it("round-trips through parseRupeesToPaise", () => {
    for (const paise of [0, 4_500_000, 4_500_050, 1]) {
      assert.equal(parseRupeesToPaise(paiseToRupeeInput(paise)), paise);
    }
  });

  it("is blank for a missing amount, not '0'", () => {
    assert.equal(paiseToRupeeInput(null), "");
  });
});
