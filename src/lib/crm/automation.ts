import { and, count, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/db";
import { crmSettings, leads, user } from "@/db/schema";
import { STAFF_ROLES } from "@/lib/leads/roles";
import { CLOSED_LEAD_STATUSES } from "@/lib/leads/lifecycle";
import {
  CRM_SETTING_DEFAULTS,
  asBoolean,
  asFollowUpDays,
  type CrmSettingKey,
} from "./settings";

/**
 * What happens to a website enquiry the moment it arrives.
 *
 * The specification's final flow has the lead appearing in admin and then
 * being assigned and followed up. These are those two steps, done
 * automatically — and both are OFF until the office turns them on, because
 * silently assigning real enquiries to people who are not expecting them is
 * worse than leaving them unassigned where everybody can see them.
 *
 * Applies to WEBSITE enquiries only. A lead typed in by hand is never
 * auto-assigned: whoever typed it in is standing there and can decide.
 */

export async function getSettings(): Promise<Record<CrmSettingKey, string>> {
  const rows = await db.select().from(crmSettings);
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return { ...CRM_SETTING_DEFAULTS, ...stored } as Record<CrmSettingKey, string>;
}

/**
 * The counsellor whose turn it is.
 *
 * Round-robin by current open workload rather than by a stored pointer: fewest
 * open leads wins, ties broken by who was assigned least recently. A stored
 * "next counsellor" pointer drifts the moment somebody is added, removed or
 * goes on leave, and then quietly sends everything to one person.
 *
 * Returns null when there is nobody to assign to, which is not an error — the
 * lead simply stays unassigned and visible.
 */
export async function nextAssignee(): Promise<{ id: string; name: string } | null> {
  const staff = await db
    .select({ id: user.id, name: user.name, role: user.role })
    .from(user)
    .where(sql`${user.role} in (${sql.join(STAFF_ROLES.map((r) => sql`${r}`), sql`, `)})`);

  // Counsellors first; if none exist, anyone on staff will do.
  const counsellors = staff.filter((s) => s.role === "counselor");
  const pool = counsellors.length > 0 ? counsellors : staff;
  if (pool.length === 0) return null;

  const openCounts = await db
    .select({ userId: leads.assignedToUserId, n: count() })
    .from(leads)
    .where(
      and(
        isNotNull(leads.assignedToUserId),
        sql`${leads.status} NOT IN (${sql.join(
          CLOSED_LEAD_STATUSES.map((s) => sql`${s}`),
          sql`, `,
        )})`,
      ),
    )
    .groupBy(leads.assignedToUserId);

  const openBy = new Map(openCounts.map((r) => [r.userId!, r.n]));

  const lastAssigned = await db
    .select({ userId: leads.assignedToUserId, latest: sql<number>`max(${leads.assignedAt})` })
    .from(leads)
    .where(isNotNull(leads.assignedToUserId))
    .groupBy(leads.assignedToUserId);
  const lastBy = new Map(lastAssigned.map((r) => [r.userId!, Number(r.latest ?? 0)]));

  const chosen = [...pool].sort((a, b) => {
    const load = (openBy.get(a.id) ?? 0) - (openBy.get(b.id) ?? 0);
    if (load !== 0) return load;
    return (lastBy.get(a.id) ?? 0) - (lastBy.get(b.id) ?? 0);
  })[0];

  return { id: chosen.id, name: chosen.name };
}

/** The date a new enquiry's first follow-up should fall on. */
export function firstFollowUpDate(days: number, now: Date = new Date()): Date {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  // 10am: a follow-up dated at the moment of submission sorts oddly in a queue
  // read first thing in the morning, and "due today" should mean the day.
  date.setHours(10, 0, 0, 0);
  return date;
}

export interface AutomationOutcome {
  assignedToUserId: string | null;
  assignedToName: string | null;
  followUpDate: Date | null;
}

/**
 * Apply the automation rules to a newly created website lead.
 *
 * Runs AFTER the insert, deliberately. The enquiry is the thing that must not
 * be lost; if assignment or scheduling fails, the lead is still there,
 * unassigned, and visible to everyone.
 */
export async function applyNewLeadAutomation(leadId: number): Promise<AutomationOutcome> {
  const outcome: AutomationOutcome = {
    assignedToUserId: null,
    assignedToName: null,
    followUpDate: null,
  };

  try {
    const settings = await getSettings();
    const update: Partial<typeof leads.$inferInsert> = {};

    if (asBoolean(settings.auto_assign_enabled)) {
      const assignee = await nextAssignee();
      if (assignee) {
        update.assignedToUserId = assignee.id;
        update.assignedAt = new Date();
        outcome.assignedToUserId = assignee.id;
        outcome.assignedToName = assignee.name;
      }
    }

    if (asBoolean(settings.auto_follow_up_enabled)) {
      const due = firstFollowUpDate(asFollowUpDays(settings.auto_follow_up_days));
      update.followUpDate = due;
      outcome.followUpDate = due;
    }

    if (Object.keys(update).length > 0) {
      await db
        .update(leads)
        .set({ ...update, updatedAt: new Date() })
        .where(eq(leads.id, leadId));
    }
  } catch (error) {
    // An enquiry that arrived but could not be routed is still an enquiry.
    console.error("Lead automation failed for lead", leadId, error);
  }

  return outcome;
}
