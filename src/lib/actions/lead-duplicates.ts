"use server";

import { and, desc, eq, isNotNull, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import { phoneKey } from "@/lib/leads/phone";

/**
 * Duplicate detection, keyed on the mobile number.
 *
 * Two rules from the specification shape everything here:
 *
 *   "Do not silently create duplicates" — the admin form warns before creating.
 *   "Preserve the submitted enquiry but flag potential duplicates" — a website
 *   submission is NEVER blocked or merged. A person enquiring twice is a person
 *   asking twice, and the second one is often the one that converts.
 *
 * The match is DERIVED on read, not stored as a flag on the row. A stored flag
 * goes stale the moment the other lead is deleted or its number corrected, and
 * a stale duplicate warning is worse than none — it teaches the counsellor to
 * ignore the warning.
 */

export interface DuplicateMatch {
  id: number;
  enquiryNumber: string | null;
  name: string;
  phone: string;
  courseInterest: string | null;
  status: string;
  createdAt: Date | null;
  assignedTo: string | null;
}

/**
 * Other leads reachable on the same number, newest first.
 *
 * `excludeId` leaves out the lead being looked at. An unusable number matches
 * nothing: NULL keys must never collide, or every lead with a blank phone
 * becomes a duplicate of every other.
 */
export async function findLeadsByPhone(
  phone: string,
  excludeId?: number,
): Promise<DuplicateMatch[]> {
  await requireAdminAction();

  const key = phoneKey(phone);
  if (!key) return [];

  const clauses = [eq(leads.phoneNormalised, key), isNotNull(leads.phoneNormalised)];
  if (excludeId !== undefined) clauses.push(ne(leads.id, excludeId));

  return db
    .select({
      id: leads.id,
      enquiryNumber: leads.enquiryNumber,
      name: leads.name,
      phone: leads.phone,
      courseInterest: leads.courseInterest,
      status: leads.status,
      createdAt: leads.createdAt,
      assignedTo: leads.assignedTo,
    })
    .from(leads)
    .where(and(...clauses))
    .orderBy(desc(leads.createdAt))
    .limit(20);
}

/**
 * The check the Add Lead form runs before creating.
 *
 * Returns what was found rather than a verdict — whether a six-month-old closed
 * enquiry counts as a duplicate is the counsellor's call, and the spec is
 * explicit that valid repeat enquiries must not be lost.
 */
export async function checkForDuplicatePhone(phone: string): Promise<{
  key: string | null;
  matches: DuplicateMatch[];
}> {
  const key = phoneKey(phone);
  if (!key) return { key: null, matches: [] };
  return { key, matches: await findLeadsByPhone(phone) };
}

export interface DuplicateGroup {
  phoneNormalised: string;
  count: number;
  leadIds: number[];
  names: string;
  latest: Date | null;
}

/**
 * Every number with more than one lead against it, busiest first.
 *
 * Derived on read, so it is always current — a group disappears as soon as the
 * extra leads are closed as DUPLICATE or deleted.
 */
export async function getDuplicateGroups(): Promise<DuplicateGroup[]> {
  await requireAdminAction();

  const rows = await db
    .select({
      phoneNormalised: leads.phoneNormalised,
      count: sql<number>`count(*)`,
      leadIds: sql<string>`group_concat(${leads.id})`,
      names: sql<string>`group_concat(distinct ${leads.name})`,
      latest: sql<number>`max(${leads.createdAt})`,
    })
    .from(leads)
    .where(isNotNull(leads.phoneNormalised))
    .groupBy(leads.phoneNormalised)
    .having(sql`count(*) > 1`)
    .orderBy(sql`count(*) desc, max(${leads.createdAt}) desc`);

  return rows.map((row) => ({
    phoneNormalised: row.phoneNormalised!,
    count: Number(row.count),
    leadIds: String(row.leadIds ?? "")
      .split(",")
      .map(Number)
      .filter(Number.isFinite),
    names: String(row.names ?? ""),
    // Drizzle hands back the raw integer from an aggregate rather than a Date.
    latest: row.latest ? new Date(Number(row.latest) * 1000) : null,
  }));
}

/** How many numbers currently have more than one lead. For the list badge. */
export async function countDuplicateGroups(): Promise<number> {
  await requireAdminAction();
  const rows = await db
    .select({ phoneNormalised: leads.phoneNormalised })
    .from(leads)
    .where(isNotNull(leads.phoneNormalised))
    .groupBy(leads.phoneNormalised)
    .having(sql`count(*) > 1`);
  return rows.length;
}
