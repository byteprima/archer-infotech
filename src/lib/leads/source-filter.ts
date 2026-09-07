import { eq, like, type SQL } from "drizzle-orm";
import { leads } from "@/db/schema";

/**
 * Source tabs for the admin leads view. The `key` is what travels in the
 * `?source=` query param; the matcher below turns it into a DB condition.
 *
 * Keys map to the values the app actually writes:
 *   - contact_form  -> website contact form (and the default fallback)
 *   - sitewide_cta  -> the floating WhatsApp / CTA button
 *   - chat_widget   -> the on-site chat widget
 *   - newsletter    -> newsletter_signup:<placement>   (prefix match)
 *   - reports       -> report_download:<slug>           (prefix match)
 *   - internships   -> internship_interest, from the /internships popup
 *   - manual        -> leads added by hand in the admin
 */
export const LEAD_SOURCE_TABS = [
  { key: "", label: "All Leads" },
  { key: "contact_form", label: "Contact Form" },
  { key: "sitewide_cta", label: "WhatsApp / CTA" },
  { key: "chat_widget", label: "Chat Widget" },
  { key: "newsletter", label: "Newsletter" },
  { key: "reports", label: "Reports" },
  // The /internships popup carries the college requirement in `message`,
  // which is the part a counsellor needs before the first call — worth its
  // own tab rather than being lost inside All Leads.
  { key: "internship_interest", label: "Internships" },
  { key: "manual", label: "Manual" },
] as const;

export const MANUAL_LEAD_SOURCE = "manual";

/**
 * Translate a `?source=` tab key into a Drizzle condition. Returns `undefined`
 * for the "All Leads" tab (no filtering). Newsletter and Reports use a prefix
 * match because their stored sources carry a `:placement` / `:slug` suffix.
 */
export function buildSourceCondition(sourceKey: string): SQL | undefined {
  switch (sourceKey) {
    case "":
      return undefined;
    case "newsletter":
      return like(leads.source, "newsletter_signup%");
    case "reports":
      return like(leads.source, "report_download%");
    default:
      return eq(leads.source, sourceKey);
  }
}
