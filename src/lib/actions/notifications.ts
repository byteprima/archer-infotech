"use server";

import { and, asc, count, desc, eq, gte, isNotNull, isNull, lt, lte, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { leads, notifications, user } from "@/db/schema";
import { requireAdminAction } from "@/lib/admin";
import { getCurrentUser, getCurrentRole } from "@/lib/auth";
import { canViewAllLeads } from "@/lib/leads/roles";
import { CLOSED_LEAD_STATUSES } from "@/lib/leads/lifecycle";

/**
 * Counsellor notifications.
 *
 * Two kinds, and the difference is the whole design:
 *
 *   EVENT — "a lead was assigned to you", "a demo was scheduled". Happened
 *   once, to a named person, and must survive until they have seen it. Stored
 *   as a row, marked read.
 *
 *   DUE — "this follow-up is due today", "these are overdue". Derived live
 *   from leads.follow_up_date on every read. Storing these would mean a
 *   scheduler this project does not have, and a stored "due today" is wrong by
 *   tomorrow morning — it would need generating daily and expiring daily, and
 *   the two jobs would disagree.
 *
 * The spec asks that the design allow WhatsApp/email delivery later. That hangs
 * on `channel`; every row is "in_app" today and nothing here sends anything.
 */

export type ActionResult = { success: boolean; message: string };

/** Write an event notification. Never throws — a failed notification must not
 *  roll back the thing it was announcing. */
export async function notify(input: {
  userId: string | null;
  type: string;
  title: string;
  body?: string | null;
  href?: string | null;
  leadId?: number | null;
}): Promise<void> {
  try {
    // Nobody needs telling about something they did to themselves.
    await db.insert(notifications).values({
      userId: input.userId,
      type: input.type,
      title: input.title,
      body: input.body ?? null,
      href: input.href ?? null,
      leadId: input.leadId ?? null,
    });
  } catch (error) {
    console.error("Failed to write notification:", error);
  }
}

/** The signed-in user's id, or null for the legacy shared login. */
async function currentUserId(): Promise<string | null> {
  const current = await getCurrentUser();
  return (current as { id?: string } | null)?.id ?? null;
}

export interface StoredNotification {
  id: number;
  type: string;
  title: string;
  body: string | null;
  href: string | null;
  leadId: number | null;
  readAt: Date | null;
  createdAt: Date | null;
}

/**
 * Event notifications for the current user.
 *
 * Includes rows addressed to nobody in particular (userId null), which is how
 * unassigned work reaches whoever is looking. The legacy shared login has no
 * user row, so it sees exactly those.
 */
export async function getMyNotifications(limit = 30): Promise<StoredNotification[]> {
  await requireAdminAction();
  const userId = await currentUserId();

  return db
    .select({
      id: notifications.id,
      type: notifications.type,
      title: notifications.title,
      body: notifications.body,
      href: notifications.href,
      leadId: notifications.leadId,
      readAt: notifications.readAt,
      createdAt: notifications.createdAt,
    })
    .from(notifications)
    .where(
      userId
        ? or(eq(notifications.userId, userId), isNull(notifications.userId))
        : isNull(notifications.userId),
    )
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function getUnreadCount(): Promise<number> {
  await requireAdminAction();
  const userId = await currentUserId();
  const [row] = await db
    .select({ n: count() })
    .from(notifications)
    .where(
      and(
        isNull(notifications.readAt),
        userId
          ? or(eq(notifications.userId, userId), isNull(notifications.userId))
          : isNull(notifications.userId),
      ),
    );
  return row.n;
}

export async function markNotificationRead(id: number): Promise<ActionResult> {
  await requireAdminAction();
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(and(eq(notifications.id, id), isNull(notifications.readAt)));
  revalidatePath("/admin/notifications");
  return { success: true, message: "Marked as read." };
}

export async function markAllNotificationsRead(): Promise<ActionResult> {
  await requireAdminAction();
  const userId = await currentUserId();
  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        isNull(notifications.readAt),
        userId
          ? or(eq(notifications.userId, userId), isNull(notifications.userId))
          : isNull(notifications.userId),
      ),
    );
  revalidatePath("/admin/notifications");
  revalidatePath("/admin/crm");
  return { success: true, message: "All caught up." };
}

export interface DueReminder {
  leadId: number;
  enquiryNumber: string | null;
  name: string;
  phone: string;
  courseInterest: string | null;
  status: string;
  followUpDate: Date | null;
  assignedTo: string | null;
}

/**
 * Follow-ups due today and overdue, derived live.
 *
 * Scoped the way the lead list is: a counsellor sees their own, a manager or
 * admin sees everyone's. Closed leads are excluded — a reminder against a lead
 * that already enrolled is noise, and noise is what stops people reading a
 * queue at all.
 */
export async function getDueReminders(): Promise<{
  overdue: DueReminder[];
  today: DueReminder[];
}> {
  await requireAdminAction();

  const role = await getCurrentRole();
  const userId = await currentUserId();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);

  const scope = [
    isNotNull(leads.followUpDate),
    sql`${leads.status} NOT IN (${sql.join(
      CLOSED_LEAD_STATUSES.map((s) => sql`${s}`),
      sql`, `,
    )})`,
  ];
  if (!canViewAllLeads(role) && userId) {
    scope.push(eq(leads.assignedToUserId, userId));
  }

  const fields = {
    leadId: leads.id,
    enquiryNumber: leads.enquiryNumber,
    name: leads.name,
    phone: leads.phone,
    courseInterest: leads.courseInterest,
    status: leads.status,
    followUpDate: leads.followUpDate,
    assignedTo: user.name,
  };

  const [overdue, today] = await Promise.all([
    db
      .select(fields)
      .from(leads)
      .leftJoin(user, eq(leads.assignedToUserId, user.id))
      .where(and(...scope, lt(leads.followUpDate, startOfToday)))
      .orderBy(asc(leads.followUpDate))
      .limit(50),
    db
      .select(fields)
      .from(leads)
      .leftJoin(user, eq(leads.assignedToUserId, user.id))
      .where(
        and(...scope, gte(leads.followUpDate, startOfToday), lte(leads.followUpDate, endOfToday)),
      )
      .orderBy(asc(leads.followUpDate))
      .limit(50),
  ]);

  return { overdue, today };
}

/** Everything the bell needs, in one call. */
export async function getNotificationSummary(): Promise<{
  unread: number;
  overdue: number;
  dueToday: number;
}> {
  const [unread, due] = await Promise.all([getUnreadCount(), getDueReminders()]);
  return { unread, overdue: due.overdue.length, dueToday: due.today.length };
}
