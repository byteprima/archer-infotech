import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  SESSION_MAX_AGE_SECONDS,
  isLegacyLoginEnabled,
  signSessionToken,
  verifyCredentials,
  verifySessionToken,
} from "./legacy-admin-auth";

const KEYS = [
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "ADMIN_LEGACY_LOGIN",
] as const;

function configure(values: Partial<Record<(typeof KEYS)[number], string>>) {
  for (const key of KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
}

const CONFIGURED = {
  ADMIN_USERNAME: "owner",
  ADMIN_PASSWORD: "s3cret-password",
  ADMIN_SESSION_SECRET: "0123456789abcdef0123456789abcdef",
};

afterEach(() => configure({}));

describe("isLegacyLoginEnabled", () => {
  it("is off when nothing is configured", () => {
    configure({});
    assert.equal(isLegacyLoginEnabled(), false);
  });

  it("is off when only some variables are set", () => {
    configure({ ADMIN_USERNAME: "owner", ADMIN_PASSWORD: "p" });
    assert.equal(isLegacyLoginEnabled(), false);
  });

  it("treats a blank value as unset", () => {
    configure({ ...CONFIGURED, ADMIN_PASSWORD: "   " });
    assert.equal(isLegacyLoginEnabled(), false);
  });

  it("is on when fully configured", () => {
    configure(CONFIGURED);
    assert.equal(isLegacyLoginEnabled(), true);
  });

  it("honours the kill switch", () => {
    configure({ ...CONFIGURED, ADMIN_LEGACY_LOGIN: "OFF" });
    assert.equal(isLegacyLoginEnabled(), false);
  });
});

describe("verifyCredentials", () => {
  it("rejects the removed built-in defaults", async () => {
    configure({});
    assert.equal(await verifyCredentials("admin", "archer2024"), false);
  });

  it("accepts the configured pair", async () => {
    configure(CONFIGURED);
    assert.equal(await verifyCredentials("owner", "s3cret-password"), true);
  });

  it("rejects a wrong password", async () => {
    configure(CONFIGURED);
    assert.equal(await verifyCredentials("owner", "s3cret-passworD"), false);
  });

  it("rejects a wrong username", async () => {
    configure(CONFIGURED);
    assert.equal(await verifyCredentials("Owner", "s3cret-password"), false);
  });

  it("rejects everything once the kill switch is off", async () => {
    configure({ ...CONFIGURED, ADMIN_LEGACY_LOGIN: "off" });
    assert.equal(await verifyCredentials("owner", "s3cret-password"), false);
  });
});

describe("session tokens", () => {
  it("round-trips a freshly signed token", () => {
    configure(CONFIGURED);
    assert.equal(verifySessionToken(signSessionToken()), true);
  });

  it("never puts the secret in the token", () => {
    configure(CONFIGURED);
    const token = signSessionToken();
    assert.equal(token.includes(CONFIGURED.ADMIN_SESSION_SECRET), false);
    // The old format was base64 of "<secret>:<timestamp>".
    const decoded = Buffer.from(token, "base64").toString("utf8");
    assert.equal(decoded.includes(CONFIGURED.ADMIN_SESSION_SECRET), false);
  });

  it("rejects the old base64 cookie format", () => {
    configure(CONFIGURED);
    const legacy = Buffer.from(
      `${CONFIGURED.ADMIN_SESSION_SECRET}:${Date.now()}`
    ).toString("base64");
    assert.equal(verifySessionToken(legacy), false);
  });

  it("expires after the cookie max age", () => {
    configure(CONFIGURED);
    const issuedAt = Date.now();
    const token = signSessionToken(issuedAt);
    const justInside = issuedAt + SESSION_MAX_AGE_SECONDS * 1000 - 1000;
    const justOutside = issuedAt + SESSION_MAX_AGE_SECONDS * 1000 + 1000;
    assert.equal(verifySessionToken(token, justInside), true);
    assert.equal(verifySessionToken(token, justOutside), false);
  });

  it("rejects a token issued in the future", () => {
    configure(CONFIGURED);
    const issuedAt = Date.now() + 60_000;
    assert.equal(verifySessionToken(signSessionToken(issuedAt), Date.now()), false);
  });

  it("rejects a tampered timestamp", () => {
    configure(CONFIGURED);
    const issuedAt = Date.now();
    const [, signature] = signSessionToken(issuedAt).split(".");
    assert.equal(verifySessionToken(`${issuedAt - 5000}.${signature}`), false);
  });

  it("rejects a token signed with a different secret", () => {
    configure(CONFIGURED);
    const token = signSessionToken();
    configure({ ...CONFIGURED, ADMIN_SESSION_SECRET: "a-completely-other-secret" });
    assert.equal(verifySessionToken(token), false);
  });

  it("rejects malformed input", () => {
    configure(CONFIGURED);
    for (const bad of ["", ".", "abc", "abc.def", ".sig", "123."]) {
      assert.equal(verifySessionToken(bad), false, `accepted ${JSON.stringify(bad)}`);
    }
  });

  it("refuses to sign when disabled", () => {
    configure({});
    assert.throws(() => signSessionToken(), /disabled/);
  });
});
