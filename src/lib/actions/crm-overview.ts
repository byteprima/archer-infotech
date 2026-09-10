"use server";

import { and, count, eq, gte, isNotNull, lt, lte, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { admissions, batches, demoSessions, leads } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import { CLOSED_LEAD_STATUSES } from "@/lib/leads/lifecycle";
import { conversionRate } from "@/lib/reports/metrics";
import { countDuplicateGroups } from "@/lib/actions/lead-duplicates";

/**
 * The numbers on the CRM hub tiles.
 *
 * One query pass for the whole page rather than each tile fetching its own —
 * the hub is the first thing opened in the morning and it should not cost
 * eight round trips to render a menu.
 */
export async function getCrmOverview() {
  await requireAdminAction();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);
  const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

  const openLead = sql`${leads.status} NOT IN (${sql.join(
    CLOSED_LEAD_STATUSES.map((s) => sql`${s}`),
    sql`, `,
  )})`;

  const [
    totalLeads,
    newLeads,
    hotLeads,
    todayEnquiries,
    overdueFollowUps,
    todayFollowUps,
    upcomingDemos,
    upcomingBatches,
    totalAdmissions,
    monthAdmissions,
    monthEnquiries,
    duplicateGroups,
  ] = await Promise.all([
    db.select({ n: count() }).from(leads),
    db.select({ n: count() }).from(leads).where(eq(leads.status, "NEW")),
    db.select({ n: count() }).from(leads).where(and(eq(leads.priority, "HOT"), openLead)),
    db
      .select({ n: count() })
      .from(leads)
      .where(and(gte(leads.createdAt, startOfToday), lte(leads.createdAt, endOfToday))),
    db
      .select({ n: count() })
      .from(leads)
      .where(and(isNotNull(leads.followUpDate), lt(leads.followUpDate, startOfToday), openLead)),
    db
      .select({ n: count() })
      .from(leads)
      .where(
        and(
          isNotNull(leads.followUpDate),
          gte(leads.followUpDate, startOfToday),
          lte(leads.followUpDate, endOfToday),
          openLead,
        ),
      ),
    db
      .select({ n: count() })
      .from(demoSessions)
      .where(and(eq(demoSessions.status, "scheduled"), gte(demoSessions.scheduledAt, new Date()))),
    db
      .select({ n: count() })
      .from(batches)
      .where(sql`${batches.status} in ('planned', 'upcoming')`),
    db.select({ n: count() }).from(admissions).where(ne(admissions.status, "CANCELLED")),
    db
      .select({ n: count() })
      .from(admissions)
      .where(and(ne(admissions.status, "CANCELLED"), gte(admissions.admissionDate, startOfMonth))),
    db.select({ n: count() }).from(leads).where(gte(leads.createdAt, startOfMonth)),
    countDuplicateGroups(),
  ]);

  return {
    leads: {
      total: totalLeads[0].n,
      new: newLeads[0].n,
      hot: hotLeads[0].n,
      today: todayEnquiries[0].n,
    },
    duplicates: duplicateGroups,
    followUps: { overdue: overdueFollowUps[0].n, today: todayFollowUps[0].n },
    demos: { upcoming: upcomingDemos[0].n },
    batches: { upcoming: upcomingBatches[0].n },
    admissions: { total: totalAdmissions[0].n, thisMonth: monthAdmissions[0].n },
    // Guarded: a fresh month has no enquiries yet.
    conversion: conversionRate(monthAdmissions[0].n, monthEnquiries[0].n),
  };
}
