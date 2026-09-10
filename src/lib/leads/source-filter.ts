import { and, eq, like, not, or, type SQL } from "drizzle-orm";
import { leads } from "@/db/schema";

/**
 * Source tabs for the admin leads view.
 *
 * Four buckets by what the person was DOING, not by which component captured
 * them. The previous eight tabs were named after the mechanism — Contact
 * Form, WhatsApp / CTA, Chat Widget, Newsletter, Manual — which meant one
 * intent ("tell me about a course") was scattered across four tabs while the
 * question anyone triaging actually asks is what the lead wants.
 *
 * The four are exhaustive by construction: `course` is defined as everything
 * that is not one of the other three, so no lead can fall outside the tabs
 * and become unreachable. That matters because legacy rows carry sources
 * this file has never heard of — "website", "whatsapp", "referral" — and a
 * fixed allow-list would have hidden them.
 */
export const LEAD_SOURCE_TABS = [
  { key: "course", label: "Course interest" },
  { key: "syllabus", label: "Syllabus download" },
  { key: "content", label: "Blog and reports" },
  { key: "internship", label: "Internship" },
] as const;

export const DEFAULT_LEAD_SOURCE_TAB = "course";

export const MANUAL_LEAD_SOURCE = "manual";

/** Syllabus PDFs are `report_download:<course>-syllabus`. */
const isSyllabus = () => like(leads.source, "report_download:%syllabus%");

/**
 * Newsletter signups, plus the report downloads that are NOT syllabi — the
 * Pune IT hiring report and anything like it. Written as "report_download
 * minus syllabus" rather than an allow-list of report slugs, so a new report
 * lands here automatically instead of silently falling into Course interest.
 */
const isContent = (): SQL =>
  or(
    like(leads.source, "newsletter_signup%"),
    and(
      like(leads.source, "report_download%"),
      not(like(leads.source, "%syllabus%")),
    )!,
  )!;

const isInternship = () => eq(leads.source, "internship_interest");

/**
 * Translate a `?source=` tab key into a Drizzle condition.
 *
 * Returns `undefined` only for an unrecognised key, which shows everything —
 * a safer failure than showing nothing if a stale bookmark is opened.
 */
export function buildSourceCondition(sourceKey: string): SQL | undefined {
  switch (sourceKey) {
    case "syllabus":
      return isSyllabus();
    case "content":
      return isContent();
    case "internship":
      return isInternship();
    case "course":
      // The complement of the other three. Everything that is not a syllabus
      // download, a content download or an internship enquiry is somebody
      // asking about a course — including the legacy "website" / "whatsapp" /
      // "referral" rows and anything added by hand in the admin.
      return and(
        not(isSyllabus()),
        not(isContent()),
        not(isInternship()),
      )!;
    default:
      return undefined;
  }
}
