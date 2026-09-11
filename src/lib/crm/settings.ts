/**
 * CRM settings the office controls, with their defaults.
 *
 * Defined in one place so a key cannot be written under one spelling and read
 * under another, and so every default is visible together. Values are stored
 * as text; the parsers below are the only things that interpret them.
 */

export const CRM_SETTING_KEYS = [
  "auto_assign_enabled",
  "auto_follow_up_enabled",
  "auto_follow_up_days",
  "ai_insights_enabled",
] as const;

export type CrmSettingKey = (typeof CRM_SETTING_KEYS)[number];

export const CRM_SETTING_DEFAULTS: Record<CrmSettingKey, string> = {
  // Both automations default OFF. Turning them on quietly would start
  // assigning real enquiries to people who are not expecting them, and put
  // follow-up dates on leads nobody agreed to own. The office switches them on.
  auto_assign_enabled: "false",
  auto_follow_up_enabled: "false",
  auto_follow_up_days: "1",
  // Off. Summarising a lead posts a real student's education, situation and
  // the counsellor's private notes to Google. That is a decision about other
  // people's data and the institute makes it knowingly — it is not inherited
  // because a key happened to be set for the SEO audit tool.
  ai_insights_enabled: "false",
};

export const CRM_SETTING_LABELS: Record<CrmSettingKey, string> = {
  auto_assign_enabled: "Auto-assign new website enquiries",
  auto_follow_up_enabled: "Auto-schedule the first follow-up",
  auto_follow_up_days: "Days until that first follow-up",
  ai_insights_enabled: "AI lead summaries",
};

export const CRM_SETTING_HELP: Record<CrmSettingKey, string> = {
  auto_assign_enabled:
    "Shares new website enquiries between counsellors in turn, and notifies whoever gets one. Leads added by hand are never auto-assigned — whoever typed it in decides.",
  auto_follow_up_enabled:
    "Puts a follow-up date on every new website enquiry, so it appears in the call queue instead of waiting to be noticed.",
  auto_follow_up_days:
    "0 means today. 1 means tomorrow. Weekends are not skipped — the queue shows overdue clearly enough, and skipping them silently moves work people expected to see.",
  ai_insights_enabled:
    "Lets a counsellor generate a written briefing for a lead. This SENDS that lead's course interest, education, situation and your follow-up notes to Google's Gemini API. Names, phone numbers and email addresses are never sent. Lead scoring does not use this and works either way.",
};

export function isCrmSettingKey(value: unknown): value is CrmSettingKey {
  return (
    typeof value === "string" && (CRM_SETTING_KEYS as readonly string[]).includes(value)
  );
}

/** Text to boolean. Anything that is not exactly "true" is false. */
export function asBoolean(value: string | null | undefined): boolean {
  return value === "true";
}

/**
 * Text to a day count, clamped to something sane.
 *
 * A follow-up 400 days out is a typo, not a plan; a negative one would place
 * the lead in the overdue queue the moment it arrives.
 */
export function asFollowUpDays(value: string | null | undefined): number {
  // Number("") and Number(null) are both 0, not NaN — so a missing value would
  // silently mean "follow up today" rather than falling back to the default.
  if (value === null || value === undefined || value.trim() === "") return 1;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(Math.trunc(parsed), 0), 30);
}
