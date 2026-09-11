/**
 * Message templates for a lead: course details, syllabus, fees, batch, demo
 * and follow-up reminders.
 *
 * NOTHING HERE SENDS ANYTHING. The specification is explicit that WhatsApp
 * must not be implemented without a configured provider, and this project has
 * none. What this does is compose the message from the lead's own data so a
 * counsellor can copy it into WhatsApp — which they are doing by hand today,
 * from memory, differently each time.
 *
 * That is also the provider-independent abstraction the spec asks for: when a
 * provider is added it delivers these strings, and the templates, the record
 * of what was prepared and the UI do not change.
 *
 * Pure functions of their input, so they can be tested without a database and
 * cannot leak a placeholder like "{{name}}" into a real message.
 */

import { formatPaise } from "@/lib/admissions/money";

export const MESSAGE_TEMPLATES = [
  "COURSE_DETAILS",
  "SYLLABUS",
  "FEES",
  "BATCH_INFO",
  "DEMO_REMINDER",
  "FOLLOW_UP_REMINDER",
] as const;

export type MessageTemplate = (typeof MESSAGE_TEMPLATES)[number];

export const MESSAGE_TEMPLATE_LABELS: Record<MessageTemplate, string> = {
  COURSE_DETAILS: "Course details",
  SYLLABUS: "Syllabus link",
  FEES: "Fees",
  BATCH_INFO: "Batch information",
  DEMO_REMINDER: "Demo reminder",
  FOLLOW_UP_REMINDER: "Follow-up reminder",
};

export interface TemplateContext {
  leadName: string;
  courseName?: string | null;
  courseUrl?: string | null;
  /** In paise, like everywhere else money is handled. */
  feePaise?: number | null;
  batchName?: string | null;
  batchStart?: Date | null;
  batchTiming?: string | null;
  demoAt?: Date | null;
  demoMode?: string | null;
  demoLocation?: string | null;
  demoLink?: string | null;
  counsellorName?: string | null;
  institute: { name: string; phone: string; site: string };
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full.trim();
}

function day(value: Date | null | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function time(value: Date | null | undefined): string {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Drop empty lines so a missing field leaves no gap or dangling label. */
function lines(...parts: Array<string | null | undefined | false>): string {
  return parts.filter((p): p is string => Boolean(p && p.trim())).join("\n");
}

function signOff(ctx: TemplateContext): string {
  return lines(
    "",
    ctx.counsellorName ? `— ${ctx.counsellorName}` : null,
    `${ctx.institute.name} · ${ctx.institute.phone}`,
    ctx.institute.site,
  );
}

/**
 * Compose a message. Returns null when the context lacks what the template
 * needs — a "your batch starts on" with no date is worse than no message.
 */
export function composeMessage(
  template: MessageTemplate,
  ctx: TemplateContext,
): { subject: string; body: string } | null {
  const hi = `Hi ${firstName(ctx.leadName)},`;
  const course = ctx.courseName;

  switch (template) {
    case "COURSE_DETAILS": {
      if (!course) return null;
      return {
        subject: `${course} at ${ctx.institute.name}`,
        body: lines(
          hi,
          "",
          `Thank you for your interest in our ${course} course.`,
          ctx.courseUrl ? `Full details are here: ${ctx.courseUrl}` : null,
          "",
          "Happy to answer any questions or arrange a free demo class.",
          signOff(ctx),
        ),
      };
    }

    case "SYLLABUS": {
      if (!course || !ctx.courseUrl) return null;
      return {
        subject: `${course} syllabus`,
        body: lines(
          hi,
          "",
          `Here is the full ${course} syllabus, including the topics covered and the projects you will build:`,
          ctx.courseUrl,
          signOff(ctx),
        ),
      };
    }

    case "FEES": {
      if (!course) return null;
      // A fee message with no fee is the one that must never go out.
      if (ctx.feePaise === null || ctx.feePaise === undefined) return null;
      return {
        subject: `${course} fees`,
        body: lines(
          hi,
          "",
          `The fee for ${course} is ${formatPaise(ctx.feePaise)}.`,
          "Instalment options are available — happy to talk through what suits you.",
          signOff(ctx),
        ),
      };
    }

    case "BATCH_INFO": {
      if (!ctx.batchName && !ctx.batchStart) return null;
      return {
        subject: ctx.batchName ? `${ctx.batchName} — batch details` : "Batch details",
        body: lines(
          hi,
          "",
          ctx.batchStart
            ? `Our next ${course ?? ""} batch starts on ${day(ctx.batchStart)}.`.replace("  ", " ")
            : `Here are the details for ${ctx.batchName}.`,
          ctx.batchTiming ? `Timing: ${ctx.batchTiming}` : null,
          ctx.batchName && ctx.batchStart ? `Batch: ${ctx.batchName}` : null,
          "",
          "Seats are limited — let me know if you would like one held for you.",
          signOff(ctx),
        ),
      };
    }

    case "DEMO_REMINDER": {
      if (!ctx.demoAt) return null;
      return {
        subject: "Your free demo class",
        body: lines(
          hi,
          "",
          `A reminder about your free ${course ?? ""} demo on ${day(ctx.demoAt)} at ${time(ctx.demoAt)}.`.replace("  ", " "),
          ctx.demoLocation ? `Where: ${ctx.demoLocation}` : null,
          ctx.demoLink ? `Join here: ${ctx.demoLink}` : null,
          "",
          "Do let me know if you need to change the time.",
          signOff(ctx),
        ),
      };
    }

    case "FOLLOW_UP_REMINDER": {
      return {
        subject: course ? `Following up — ${course}` : "Following up",
        body: lines(
          hi,
          "",
          course
            ? `Just following up on your enquiry about ${course}.`
            : "Just following up on your enquiry.",
          "Is there anything I can help you decide on — the syllabus, the fees, or the batch timing?",
          signOff(ctx),
        ),
      };
    }
  }
}

export function isMessageTemplate(value: unknown): value is MessageTemplate {
  return (
    typeof value === "string" && (MESSAGE_TEMPLATES as readonly string[]).includes(value)
  );
}
