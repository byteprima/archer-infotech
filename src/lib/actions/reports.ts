"use server";

import { and, count, desc, eq, gte, isNotNull, lt, lte, ne, sql } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { db } from "@/db";
import { admissions, followUps, leads, user } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import {
  CLOSED_LEAD_STATUSES,
  LEAD_STATUSES,
  LOSS_REASONS,
  leadStatusLabel,
  lossReasonLabel,
} from "@/lib/leads/lifecycle";
import { resolveRange, type DateRange } from "@/lib/reports/date-range";
import {
  conversionRate,
  dailySeries,
  isoDay,
  toDistribution,
} from "@/lib/reports/metrics";

/**
 * The six reports, plus the dashboard's numbers.
 *
 * Every one of them answers the same question about a window of time, so they
 * all take the same resolved DateRange rather than each parsing the request
 * their own way.
 *
 * A note on what "converted" means here. An admission is counted against the
 * ENQUIRY it came from, and it lands in the range that the *enquiry* falls in
 * — not the admission date. Course-wise and source-wise conversion rates are
 * otherwise nonsense: dividing this month's admissions (some from leads that
 * arrived last year) by this month's enquiries produces a rate that can exceed
 * 100% and does not describe anything. The Admissions report, which is about
 * revenue rather than conversion, uses the admission date instead. Each
 * function says which it uses.
 */

export interface ReportRangeInput {
  preset?: string | null;
  from?: string | null;
  to?: string | null;
}

function rangeOf(input: ReportRangeInput): DateRange {
  return resolveRange(input);
}

/** `column` is any timestamp column — leads.created_at, leads.closed_at,
 *  follow_ups.follow_up_at — so it is typed by what it must support rather
 *  than pinned to one table's column. */
function inRange(column: SQLiteColumn, range: DateRange) {
  return and(gte(column, range.from), lte(column, range.to));
}

/** Leads created in the window, with the admission that came from each. */
async function leadsWithAdmissions(range: DateRange) {
  return db
    .select({
      id: leads.id,
      createdAt: leads.createdAt,
      courseInterest: leads.courseInterest,
      source: leads.source,
      status: leads.status,
      priority: leads.priority,
      assignedToUserId: leads.assignedToUserId,
      closureReason: leads.closureReason,
      admissionId: admissions.id,
      admissionStatus: admissions.status,
      admissionFee: admissions.finalFee,
      admissionCourse: admissions.courseName,
    })
    .from(leads)
    .leftJoin(admissions, eq(admissions.leadId, leads.id))
    .where(inRange(leads.createdAt, range));
}

/** An admission only counts as converted if it was not cancelled. */
function isConverted(row: { admissionId: number | null; admissionStatus: string | null }) {
  return row.admissionId !== null && row.admissionStatus !== "CANCELLED";
}

// ---------------------------------------------------------------- dashboard

export async function getDashboardMetrics(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);
  const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

  const rows = await leadsWithAdmissions(range);
  const enquiries = rows.length;
  const converted = rows.filter(isConverted).length;

  const [
    todayEnquiries,
    todayFollowUps,
    overdueFollowUps,
    newLeads,
    hotLeads,
    admissionsToday,
    admissionsThisMonth,
    enquiriesThisMonth,
  ] = await Promise.all([
    db.select({ n: count() }).from(leads).where(and(gte(leads.createdAt, startOfToday), lte(leads.createdAt, endOfToday))),
    db
      .select({ n: count() })
      .from(leads)
      .where(
        and(
          isNotNull(leads.followUpDate),
          gte(leads.followUpDate, startOfToday),
          lte(leads.followUpDate, endOfToday),
          // A reminder against an enrolled or closed lead is noise.
          sql`${leads.status} NOT IN (${sql.join(CLOSED_LEAD_STATUSES.map((s) => sql`${s}`), sql`, `)})`,
        ),
      ),
    db
      .select({ n: count() })
      .from(leads)
      .where(
        and(
          isNotNull(leads.followUpDate),
          lt(leads.followUpDate, startOfToday),
          sql`${leads.status} NOT IN (${sql.join(CLOSED_LEAD_STATUSES.map((s) => sql`${s}`), sql`, `)})`,
        ),
      ),
    db.select({ n: count() }).from(leads).where(eq(leads.status, "NEW")),
    db.select({ n: count() }).from(leads).where(eq(leads.priority, "HOT")),
    db
      .select({ n: count() })
      .from(admissions)
      .where(and(gte(admissions.admissionDate, startOfToday), lte(admissions.admissionDate, endOfToday), ne(admissions.status, "CANCELLED"))),
    db
      .select({ n: count() })
      .from(admissions)
      .where(and(gte(admissions.admissionDate, startOfMonth), ne(admissions.status, "CANCELLED"))),
    db.select({ n: count() }).from(leads).where(gte(leads.createdAt, startOfMonth)),
  ]);

  return {
    range,
    todayEnquiries: todayEnquiries[0].n,
    todayFollowUps: todayFollowUps[0].n,
    overdueFollowUps: overdueFollowUps[0].n,
    newLeads: newLeads[0].n,
    hotLeads: hotLeads[0].n,
    admissionsToday: admissionsToday[0].n,
    admissionsThisMonth: admissionsThisMonth[0].n,
    enquiriesThisMonth: enquiriesThisMonth[0].n,
    rangeEnquiries: enquiries,
    rangeAdmissions: converted,
    conversionRate: conversionRate(converted, enquiries),
  };
}

// ------------------------------------------------------------------ charts

export async function getDashboardCharts(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);
  const rows = await leadsWithAdmissions(range);

  const enquiriesByDate = dailySeries(
    rows.map((r) => ({ date: r.createdAt })),
    range.from,
    range.to,
  );

  const byCourse = groupCount(rows, (r) => r.courseInterest || "Not stated");
  const bySource = groupCount(rows, (r) => r.source || "Not stated");
  const byStatus = groupCount(rows, (r) => r.status);

  // Admissions by course uses the admission's own course, which can differ
  // from what the enquiry asked about — people change their minds, and the
  // course they actually joined is the one worth counting.
  const admissionRows = rows.filter(isConverted);
  const admissionsByCourse = groupCount(
    admissionRows,
    (r) => r.admissionCourse || "Unknown",
  );

  // Conversion trend: for each day, the enquiries that arrived and how many
  // of them eventually converted. Cohort-based, so a day's rate never moves
  // above 100%.
  const convertedByDate = dailySeries(
    admissionRows.map((r) => ({ date: r.createdAt })),
    range.from,
    range.to,
  );
  const conversionTrend = enquiriesByDate.map((point, i) => ({
    date: point.date,
    enquiries: point.count,
    admissions: convertedByDate[i]?.count ?? 0,
    rate: conversionRate(convertedByDate[i]?.count ?? 0, point.count),
  }));

  return {
    range,
    enquiriesByDate,
    enquiriesByCourse: toDistribution(byCourse).slice(0, 10),
    enquiriesBySource: toDistribution(bySource).slice(0, 10),
    statusDistribution: toDistribution(
      byStatus.map((row) => ({ ...row, label: leadStatusLabel(row.key) })),
    ),
    admissionsByCourse: toDistribution(admissionsByCourse).slice(0, 10),
    conversionTrend,
  };
}

function groupCount<T>(
  rows: readonly T[],
  pick: (row: T) => string,
): Array<{ key: string; label: string; count: number }> {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = pick(row);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts].map(([key, count]) => ({ key, label: key, count }));
}

// ----------------------------------------------------------------- reports

/** Enquiry report: the raw list, for scanning and for CSV. */
export async function getEnquiryReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);
  const rows = await db
    .select({
      id: leads.id,
      enquiryNumber: leads.enquiryNumber,
      createdAt: leads.createdAt,
      name: leads.name,
      phone: leads.phone,
      email: leads.email,
      courseInterest: leads.courseInterest,
      source: leads.source,
      status: leads.status,
      priority: leads.priority,
      counsellor: user.name,
      closureReason: leads.closureReason,
    })
    .from(leads)
    .leftJoin(user, eq(leads.assignedToUserId, user.id))
    .where(inRange(leads.createdAt, range))
    .orderBy(desc(leads.createdAt));
  return { range, rows };
}

/**
 * Course-wise: enquiries, admissions and conversion rate.
 *
 * Grouped on the enquiry's stated course interest, which is free text from a
 * public form. It is not resolved against the catalogue here — a report whose
 * rows do not add up to the total enquiries invites the reader to conclude
 * some are missing. Unmatched values appear under their own name.
 */
export async function getCourseReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);
  const rows = await leadsWithAdmissions(range);
  return { range, rows: breakdownBy(rows, (r) => r.courseInterest || "Not stated") };
}

/** Source-wise: enquiries, admissions and conversion rate. */
export async function getSourceReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);
  const rows = await leadsWithAdmissions(range);
  return { range, rows: breakdownBy(rows, (r) => r.source || "Not stated") };
}

type LeadWithAdmission = Awaited<ReturnType<typeof leadsWithAdmissions>>[number];

function breakdownBy(
  rows: readonly LeadWithAdmission[],
  pick: (row: LeadWithAdmission) => string,
) {
  const groups = new Map<string, { enquiries: number; admissions: number; fees: number }>();
  for (const row of rows) {
    const key = pick(row);
    const group = groups.get(key) ?? { enquiries: 0, admissions: 0, fees: 0 };
    group.enquiries += 1;
    if (isConverted(row)) {
      group.admissions += 1;
      group.fees += row.admissionFee ?? 0;
    }
    groups.set(key, group);
  }
  return [...groups]
    .map(([key, group]) => ({
      key,
      enquiries: group.enquiries,
      admissions: group.admissions,
      fees: group.fees,
      conversionRate: conversionRate(group.admissions, group.enquiries),
    }))
    .sort((a, b) => b.enquiries - a.enquiries || a.key.localeCompare(b.key));
}

/**
 * Counsellor performance.
 *
 * Assigned leads are counted from leads created in the window, so the rate is
 * "of what you were given, how much did you convert". Follow-ups are counted
 * by when they were LOGGED, not by the lead's date — a counsellor's activity
 * this month includes calls on leads from last month, and excluding those
 * would understate the people doing the patient work.
 */
export async function getCounsellorReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);

  const [leadRows, followUpRows, staff] = await Promise.all([
    leadsWithAdmissions(range),
    db
      .select({ userId: followUps.createdByUserId, n: count() })
      .from(followUps)
      .where(inRange(followUps.followUpAt, range))
      .groupBy(followUps.createdByUserId),
    db.select({ id: user.id, name: user.name, role: user.role }).from(user),
  ]);

  const names = new Map(staff.map((s) => [s.id, s.name]));
  const followUpCounts = new Map(
    followUpRows.map((r) => [r.userId ?? "__unassigned", r.n]),
  );

  const groups = new Map<string, { assigned: number; admissions: number }>();
  for (const row of leadRows) {
    const key = row.assignedToUserId ?? "__unassigned";
    const group = groups.get(key) ?? { assigned: 0, admissions: 0 };
    group.assigned += 1;
    if (isConverted(row)) group.admissions += 1;
    groups.set(key, group);
  }

  // Staff with no leads but logged follow-ups must still appear, otherwise
  // the report silently rewards doing nothing.
  for (const key of followUpCounts.keys()) {
    if (!groups.has(key)) groups.set(key, { assigned: 0, admissions: 0 });
  }

  return {
    range,
    rows: [...groups]
      .map(([key, group]) => ({
        key,
        name: key === "__unassigned" ? "Unassigned" : names.get(key) ?? "Removed user",
        assigned: group.assigned,
        followUps: followUpCounts.get(key) ?? 0,
        admissions: group.admissions,
        conversionRate: conversionRate(group.admissions, group.assigned),
      }))
      .sort((a, b) => b.admissions - a.admissions || b.assigned - a.assigned),
  };
}

/**
 * Lost lead report, grouped by closure reason.
 *
 * Counted by when the lead was CLOSED, not when it arrived — the question is
 * "why are we losing people this month".
 */
export async function getLostLeadReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);

  const rows = await db
    .select({
      closureReason: leads.closureReason,
      status: leads.status,
      n: count(),
    })
    .from(leads)
    .where(and(isNotNull(leads.closedAt), inRange(leads.closedAt, range)))
    .groupBy(leads.closureReason, leads.status);

  const byReason = new Map<string, number>();
  for (const row of rows) {
    const key = row.closureReason ?? "UNRECORDED";
    byReason.set(key, (byReason.get(key) ?? 0) + row.n);
  }

  // Leads closed before closure reasons existed have no reason. They are shown
  // as "Not recorded" rather than dropped: hiding them would make the
  // percentages describe a smaller population than the reader thinks.
  const distribution = toDistribution(
    [...byReason].map(([key, n]) => ({
      key,
      label: key === "UNRECORDED" ? "Not recorded" : lossReasonLabel(key),
      count: n,
    })),
  );

  return { range, rows: distribution, total: distribution.reduce((s, r) => s + r.count, 0) };
}

/**
 * Follow-up report: scheduled, completed and overdue per counsellor.
 *
 * "Completed" is a logged follow-up — the log is append-only, so every entry
 * is something that happened. "Scheduled" counts entries that set a next date.
 * "Overdue" is a lead whose next follow-up date has passed and which is not
 * closed; it is counted against whoever the lead is assigned to now.
 */
export async function getFollowUpReport(input: ReportRangeInput = {}) {
  await requireAdminAction();
  const range = rangeOf(input);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [logged, overdue, staff] = await Promise.all([
    db
      .select({
        userId: followUps.createdByUserId,
        completed: count(),
        scheduled: sql<number>`sum(case when ${followUps.nextFollowUpAt} is not null then 1 else 0 end)`,
      })
      .from(followUps)
      .where(inRange(followUps.followUpAt, range))
      .groupBy(followUps.createdByUserId),
    db
      .select({ userId: leads.assignedToUserId, n: count() })
      .from(leads)
      .where(
        and(
          isNotNull(leads.followUpDate),
          lt(leads.followUpDate, startOfToday),
          sql`${leads.status} NOT IN (${sql.join(CLOSED_LEAD_STATUSES.map((s) => sql`${s}`), sql`, `)})`,
        ),
      )
      .groupBy(leads.assignedToUserId),
    db.select({ id: user.id, name: user.name }).from(user),
  ]);

  const names = new Map(staff.map((s) => [s.id, s.name]));
  const keys = new Set<string>([
    ...logged.map((r) => r.userId ?? "__unassigned"),
    ...overdue.map((r) => r.userId ?? "__unassigned"),
  ]);
  const loggedBy = new Map(logged.map((r) => [r.userId ?? "__unassigned", r]));
  const overdueBy = new Map(overdue.map((r) => [r.userId ?? "__unassigned", r.n]));

  return {
    range,
    rows: [...keys]
      .map((key) => ({
        key,
        name: key === "__unassigned" ? "Unassigned" : names.get(key) ?? "Removed user",
        completed: loggedBy.get(key)?.completed ?? 0,
        scheduled: Number(loggedBy.get(key)?.scheduled ?? 0),
        overdue: overdueBy.get(key) ?? 0,
      }))
      .sort((a, b) => b.overdue - a.overdue || b.completed - a.completed),
  };
}

/** Every status, for the report filter dropdowns. */
export async function getReportFilterOptions() {
  await requireAdminAction();
  return {
    statuses: LEAD_STATUSES.map((value) => ({ value, label: leadStatusLabel(value) })),
    reasons: LOSS_REASONS.map((value) => ({ value, label: lossReasonLabel(value) })),
  };
}

export { isoDay };
