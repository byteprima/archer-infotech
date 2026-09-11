import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CRM_SETTING_DEFAULTS,
  CRM_SETTING_HELP,
  CRM_SETTING_KEYS,
  CRM_SETTING_LABELS,
  asBoolean,
  asFollowUpDays,
  isCrmSettingKey,
} from "./settings";

describe("CRM settings", () => {
  it("has a default, a label and help for every key", () => {
    for (const key of CRM_SETTING_KEYS) {
      assert.equal(typeof CRM_SETTING_DEFAULTS[key], "string", key);
      assert.equal(typeof CRM_SETTING_LABELS[key], "string", key);
      assert.equal(typeof CRM_SETTING_HELP[key], "string", key);
    }
  });

  it("defaults both automations to off", () => {
    assert.equal(CRM_SETTING_DEFAULTS.auto_assign_enabled, "false");
    assert.equal(CRM_SETTING_DEFAULTS.auto_follow_up_enabled, "false");
  });

  it("rejects unknown keys", () => {
    assert.equal(isCrmSettingKey("auto_assign_enabled"), true);
    for (const bad of ["", "nonsense", null, 7, {}]) {
      assert.equal(isCrmSettingKey(bad), false);
    }
  });
});

describe("asBoolean", () => {
  it("is true only for exactly 'true'", () => {
    assert.equal(asBoolean("true"), true);
    for (const value of ["false", "1", "yes", "TRUE", "", null, undefined]) {
      assert.equal(asBoolean(value), false, String(value));
    }
  });
});

describe("asFollowUpDays", () => {
  it("reads a plain number", () => {
    assert.equal(asFollowUpDays("0"), 0);
    assert.equal(asFollowUpDays("3"), 3);
  });

  it("falls back to one for nonsense", () => {
    for (const value of ["", "abc", null, undefined]) {
      assert.equal(asFollowUpDays(value), 1, String(value));
    }
  });

  it("clamps a negative to zero", () => {
    // Otherwise a new lead lands in the overdue queue on arrival.
    assert.equal(asFollowUpDays("-5"), 0);
  });

  it("clamps an absurd value", () => {
    assert.equal(asFollowUpDays("400"), 30);
  });

  it("truncates a fraction rather than producing a partial day", () => {
    assert.equal(asFollowUpDays("2.7"), 2);
  });
});
