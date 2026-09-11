import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  MESSAGE_TEMPLATES,
  MESSAGE_TEMPLATE_LABELS,
  composeMessage,
  isMessageTemplate,
  type TemplateContext,
} from "./message-templates";

const institute = {
  name: "Archer Infotech",
  phone: "+91 98765 43210",
  site: "https://archerinfotech.in",
};

const base: TemplateContext = {
  leadName: "Rahul Deshmukh",
  courseName: "Java Full Stack Development",
  courseUrl: "https://archerinfotech.in/courses/x/java",
  feePaise: 4_500_000,
  batchName: "Java FS — Oct Weekend",
  batchStart: new Date(2026, 9, 5, 10),
  batchTiming: "9:00 AM - 12:00 PM",
  demoAt: new Date(2026, 8, 20, 18, 30),
  demoLocation: "Kothrud, Lab 2",
  demoLink: null,
  counsellorName: "Sneha",
  institute,
};

describe("message templates", () => {
  it("labels every template", () => {
    for (const t of MESSAGE_TEMPLATES) {
      assert.equal(typeof MESSAGE_TEMPLATE_LABELS[t], "string", t);
    }
  });

  it("composes every template from a full context", () => {
    for (const t of MESSAGE_TEMPLATES) {
      const result = composeMessage(t, base);
      assert.notEqual(result, null, t);
      assert.equal(result!.body.length > 40, true, t);
    }
  });

  it("never leaks an unfilled placeholder", () => {
    for (const t of MESSAGE_TEMPLATES) {
      const body = composeMessage(t, base)!.body;
      assert.equal(/\{\{|\}\}|undefined|null|NaN/.test(body), false, `${t}: ${body}`);
    }
  });

  it("greets by first name", () => {
    const body = composeMessage("FOLLOW_UP_REMINDER", base)!.body;
    assert.equal(body.startsWith("Hi Rahul,"), true, body);
  });

  it("signs off with the institute's real contact details", () => {
    const body = composeMessage("COURSE_DETAILS", base)!.body;
    assert.equal(body.includes("Archer Infotech"), true);
    assert.equal(body.includes("+91 98765 43210"), true);
  });

  it("formats the fee in rupees, never in paise", () => {
    const body = composeMessage("FEES", base)!.body;
    assert.equal(body.includes("₹45,000"), true, body);
    assert.equal(body.includes("4500000"), false, body);
  });
});

describe("templates refuse to compose a misleading message", () => {
  it("will not send a fee message with no fee", () => {
    assert.equal(composeMessage("FEES", { ...base, feePaise: null }), null);
    assert.equal(composeMessage("FEES", { ...base, feePaise: undefined }), null);
  });

  it("will not send course details with no course", () => {
    assert.equal(composeMessage("COURSE_DETAILS", { ...base, courseName: null }), null);
  });

  it("will not send a syllabus with no link", () => {
    assert.equal(composeMessage("SYLLABUS", { ...base, courseUrl: null }), null);
  });

  it("will not send a demo reminder with no date", () => {
    assert.equal(composeMessage("DEMO_REMINDER", { ...base, demoAt: null }), null);
  });

  it("will not send batch info with neither a name nor a date", () => {
    assert.equal(
      composeMessage("BATCH_INFO", { ...base, batchName: null, batchStart: null }),
      null,
    );
  });

  it("still follows up when only the name is known", () => {
    // The one template that works with almost nothing — which is the point of
    // a follow-up nudge.
    const result = composeMessage("FOLLOW_UP_REMINDER", {
      leadName: "Priya",
      institute,
    });
    assert.notEqual(result, null);
    assert.equal(result!.body.includes("Priya"), true);
  });
});

describe("optional fields leave no gaps", () => {
  it("omits the location line when there is none", () => {
    const body = composeMessage("DEMO_REMINDER", { ...base, demoLocation: null })!.body;
    assert.equal(body.includes("Where:"), false, body);
  });

  it("omits the counsellor line when unknown", () => {
    const body = composeMessage("COURSE_DETAILS", { ...base, counsellorName: null })!.body;
    assert.equal(body.includes("— "), false, body);
  });

  it("never produces three blank lines in a row", () => {
    for (const t of MESSAGE_TEMPLATES) {
      const body = composeMessage(t, { ...base, counsellorName: null, demoLocation: null })!.body;
      assert.equal(/\n\n\n/.test(body), false, `${t}: ${JSON.stringify(body)}`);
    }
  });
});

describe("isMessageTemplate", () => {
  it("rejects anything not in the list", () => {
    assert.equal(isMessageTemplate("FEES"), true);
    for (const bad of ["", "fees", null, 3, {}]) {
      assert.equal(isMessageTemplate(bad), false);
    }
  });
});
