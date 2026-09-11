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
] as const;

export type CrmSettingKey = (typeof CRM_SETTING_KEYS)[number];

export const CRM_SETTING_DEFAULTS: Record<CrmSettingKey, string> = {
  // Both automations default OFF. Turning them on quietly would start
  // assigning real enquiries to people who are not expecting them, and put
  // follow-up dates on leads nobody agreed to own. The office switches them on.
  auto_assign_enabled: "false",
  auto_follow_up_enabled: "false",
  auto_follow_up_days: "1",
};

export const CRM_SETTING_LABELS: Record<CrmSettingKey, string> = {
  auto_assign_enabled: "Auto-assign new website enquiries",
  auto_follow_up_enabled: "Auto-schedule the first follow-up",
  auto_follow_up_days: "Days until that first follow-up",
};

export const CRM_SETTING_HELP: Record<CrmSettingKey, string> = {
  auto_assign_enabled:
    "Shares new website enquiries between counsellors in turn, and notifies whoever gets one. Leads added by hand are never auto-assigned — whoever typed it in decides.",
  auto_follow_up_enabled:
    "Puts a follow-up date on every new website enquiry, so it appears in the call queue instead of waiting to be noticed.",
  auto_follow_up_days:
    "0 means today. 1 means tomorrow. Weekends are not skipped — the queue shows overdue clearly enough, and skipping them silently moves work people expected to see.",
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
