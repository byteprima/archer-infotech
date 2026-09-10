import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatPhone,
  normalisePhone,
  phoneKey,
  samePhone,
  telHref,
} from "./phone";

describe("normalisePhone — Indian numbers", () => {
  it("normalises every form the specification lists", () => {
    for (const input of ["9876543210", "+919876543210", "91 9876543210"]) {
      assert.equal(phoneKey(input), "+919876543210", input);
    }
  });

  it("normalises the forms people actually type", () => {
    for (const input of [
      "+91 98765 43210",
      "+91-98765-43210",
      "098765 43210",
      "0 9876543210",
      "919876543210",
      "00919876543210",
      "  9876543210  ",
      "(+91) 98765 43210",
      "98765-43210",
    ]) {
      assert.equal(phoneKey(input), "+919876543210", input);
    }
  });

  it("marks Indian numbers as confidently identified", () => {
    const result = normalisePhone("9876543210");
    assert.equal(result.confident, true);
    assert.equal(result.indianNational, "9876543210");
  });

  it("accepts every valid Indian mobile prefix", () => {
    for (const first of ["6", "7", "8", "9"]) {
      assert.equal(phoneKey(`${first}876543210`), `+91${first}876543210`);
    }
  });

  it("does not treat a ten-digit number starting 0-5 as an Indian mobile", () => {
    // Landlines and nonsense: normalised consistently, but not claimed as +91.
    const result = normalisePhone("1234543210");
    assert.equal(result.indianNational, null);
    assert.equal(result.confident, false);
  });
});

describe("normalisePhone — international", () => {
  it("keeps a country code it was given", () => {
    assert.equal(phoneKey("+971501234567"), "+971501234567");
    assert.equal(phoneKey("+1 415 555 2671"), "+14155552671");
    assert.equal(phoneKey("+44 20 7946 0958"), "+442079460958");
  });

  it("treats 00 as a plus", () => {
    assert.equal(phoneKey("00971501234567"), "+971501234567");
  });

  it("never rejects a valid international number", () => {
    // The failure the specification calls out.
    for (const input of ["+971501234567", "+14155552671", "+6591234567", "+61412345678"]) {
      assert.notEqual(phoneKey(input), null, input);
    }
  });

  it("is confident about an explicit country code", () => {
    assert.equal(normalisePhone("+971501234567").confident, true);
  });

  it("is not confident about a bare foreign number", () => {
    const result = normalisePhone("971501234567");
    assert.equal(result.confident, false);
    assert.equal(result.e164, "+971501234567");
  });
});

describe("normalisePhone — rejections", () => {
  it("returns null for what is not a phone number", () => {
    for (const bad of ["", "   ", null, undefined, "abc", "12345", "N/A", "-"]) {
      assert.equal(phoneKey(bad), null, JSON.stringify(bad));
    }
  });

  it("rejects a number longer than E.164 allows", () => {
    assert.equal(phoneKey("1234567890123456"), null);
  });

  it("strips an extension rather than failing on it", () => {
    assert.equal(phoneKey("9876543210 x21"), "+919876543210");
  });
});

describe("samePhone", () => {
  it("matches the same person written differently", () => {
    assert.equal(samePhone("9876543210", "+91 98765 43210"), true);
    assert.equal(samePhone("098765 43210", "919876543210"), true);
  });

  it("does not match different people", () => {
    assert.equal(samePhone("9876543210", "9876543211"), false);
  });

  it("never matches two unusable values to each other", () => {
    // Two blanks are not the same person.
    assert.equal(samePhone("", ""), false);
    assert.equal(samePhone(null, undefined), false);
    assert.equal(samePhone("abc", "xyz"), false);
  });
});

describe("display helpers", () => {
  it("groups an Indian number for reading", () => {
    assert.equal(formatPhone("+919876543210"), "98765 43210");
  });

  it("shows an international number in E.164", () => {
    assert.equal(formatPhone("+971501234567"), "+971501234567");
  });

  it("falls back to the raw value rather than showing nothing", () => {
    assert.equal(formatPhone("N/A"), "N/A");
    assert.equal(formatPhone(null), "");
  });

  it("builds a dialable href", () => {
    assert.equal(telHref("98765 43210"), "tel:+919876543210");
    assert.equal(telHref("nonsense"), null);
  });
});
