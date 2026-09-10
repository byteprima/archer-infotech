import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ADMISSION_STATUSES,
  ADMISSION_STATUS_LABELS,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS,
  admissionStatusLabel,
  isAdmissionStatus,
  isPaymentStatus,
  paymentStatusLabel,
} from "./lifecycle";

describe("admission vocabulary", () => {
  it("labels every status", () => {
    for (const value of ADMISSION_STATUSES) {
      assert.equal(typeof ADMISSION_STATUS_LABELS[value], "string");
    }
    for (const value of PAYMENT_STATUSES) {
      assert.equal(typeof PAYMENT_STATUS_LABELS[value], "string");
    }
  });

  it("keeps admission and payment vocabularies separate", () => {
    for (const value of ADMISSION_STATUSES) {
      assert.equal(isPaymentStatus(value), false, `${value} leaked`);
    }
    for (const value of PAYMENT_STATUSES) {
      assert.equal(isAdmissionStatus(value), false, `${value} leaked`);
    }
  });

  it("shows an unknown value rather than hiding it", () => {
    assert.equal(admissionStatusLabel("SOMETHING_ELSE"), "SOMETHING_ELSE");
    assert.equal(paymentStatusLabel("SOMETHING_ELSE"), "SOMETHING_ELSE");
    assert.equal(admissionStatusLabel(null), "—");
    assert.equal(paymentStatusLabel(undefined), "—");
  });

  it("guards reject non-strings", () => {
    for (const bad of [null, undefined, 3, {}]) {
      assert.equal(isAdmissionStatus(bad), false);
      assert.equal(isPaymentStatus(bad), false);
    }
  });
});
