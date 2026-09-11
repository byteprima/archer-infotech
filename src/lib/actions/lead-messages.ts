"use server";

import { z } from "zod";
import { and, desc, eq, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  batches,
  demoRegistrations,
  demoSessions,
  leads,
  messages,
  MESSAGE_CHANNELS,
} from "@/db/schema";
import { logAdminAction, requireAdminAction } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { siteConfig } from "@/data/site-config";
import { getCourse } from "@/data/courses";
import { resolveCourseSlugs } from "@/lib/courses/course-match";
import { phoneKey } from "@/lib/leads/phone";
import {
  MESSAGE_TEMPLATES,
  composeMessage,
  type MessageTemplate,
  type TemplateContext,
} from "@/lib/crm/message-templates";

/**
 * Preparing a message for a lead.
 *
 * NOTHING IS SENT. There is no WhatsApp or email provider configured and the
 * specification says not to add one. The counsellor copies the text, or opens
 * wa.me with it prefilled — which is what they do today anyway, from memory,
 * differently every time.
 *
 * Recording what was prepared is the point: it gives the abstraction a place
 * to live, and it means the day a provider is added, these rows are what it
 * delivers.
 */

export type ActionResult = { success: boolean; message: string };

const INSTITUTE = {
  name: siteConfig.name,
  phone: siteConfig.contact.phone,
  site: siteConfig.url,
};

/** Gather everything the templates might need about one lead. */
async function buildContext(leadId: number): Promise<TemplateContext | null> {
  const [lead] = await db
    .select({
      name: leads.name,
      courseInterest: leads.courseInterest,
      assignedTo: leads.assignedTo,
    })
    .from(leads)
    .where(eq(leads.id, leadId))
    .limit(1);
  if (!lead) return null;

  const slug = resolveCourseSlugs(lead.courseInterest)[0];
  const course = slug ? getCourse(slug) : undefined;

  // The next batch for that course, and the lead's next demo, if any.
  const [batch] = course
    ? await db
        .select({
          batchName: batches.batchName,
          startDate: batches.startDate,
          timing: batches.timing,
        })
        .from(batches)
        .where(and(eq(batches.courseSlug, course.slug), eq(batches.status, "upcoming")))
        .orderBy(batches.startDate)
        .limit(1)
    : [];

  const [demo] = await db
    .select({
      scheduledAt: demoSessions.scheduledAt,
      mode: demoSessions.mode,
      location: demoSessions.location,
      meetingLink: demoSessions.meetingLink,
    })
    .from(demoRegistrations)
    .innerJoin(demoSessions, eq(demoRegistrations.demoSessionId, demoSessions.id))
    .where(
      and(
        eq(demoRegistrations.leadId, leadId),
        eq(demoSessions.status, "scheduled"),
        gte(demoSessions.scheduledAt, new Date()),
      ),
    )
    .orderBy(demoSessions.scheduledAt)
    .limit(1);

  const current = await getCurrentUser();

  return {
    leadName: lead.name,
    courseName: course?.title ?? lead.courseInterest ?? null,
    courseUrl: course ? `${siteConfig.url}/courses/${course.category}/${course.slug}` : null,
    // Courses carry no fee in courses.ts, so a fee message needs the figure
    // typed by whoever knows it. Null here means the FEES template refuses.
    feePaise: null,
    batchName: batch?.batchName ?? null,
    batchStart: batch?.startDate ?? null,
    batchTiming: batch?.timing ?? null,
    demoAt: demo?.scheduledAt ?? null,
    demoMode: demo?.mode ?? null,
    demoLocation: demo?.location ?? null,
    demoLink: demo?.meetingLink ?? null,
    counsellorName: (current as { name?: string } | null)?.name ?? lead.assignedTo ?? null,
    institute: INSTITUTE,
  };
}

export interface PreparedMessage {
  template: MessageTemplate;
  label: string;
  subject: string;
  body: string;
}

/**
 * Every template that can be composed for this lead, with the ones that cannot
 * simply absent — a template that would produce "your batch starts on " is not
 * offered rather than offered broken.
 */
export async function getAvailableMessages(leadId: number): Promise<{
  waLink: string | null;
  messages: PreparedMessage[];
}> {
  await requireAdminAction();

  const ctx = await buildContext(leadId);
  if (!ctx) return { waLink: null, messages: [] };

  const [lead] = await db
    .select({ phone: leads.phone })
    .from(leads)
    .where(eq(leads.id, leadId))
    .limit(1);

  const key = phoneKey(lead?.phone);
  const prepared: PreparedMessage[] = [];
  for (const template of MESSAGE_TEMPLATES) {
    const composed = composeMessage(template, ctx);
    if (!composed) continue;
    prepared.push({
      template,
      label: template,
      subject: composed.subject,
      body: composed.body,
    });
  }

  return {
    // wa.me wants the number without the plus.
    waLink: key ? `https://wa.me/${key.slice(1)}` : null,
    messages: prepared,
  };
}

const recordSchema = z.object({
  leadId: z.number().int().positive(),
  template: z.enum(MESSAGE_TEMPLATES),
  channel: z.enum(MESSAGE_CHANNELS).default("whatsapp"),
  subject: z.string().trim().max(200).optional(),
  body: z.string().trim().min(1).max(4000),
});

/**
 * Record that a message was prepared and copied.
 *
 * Status stops at "copied". It cannot honestly say "sent": nothing here knows
 * whether the counsellor actually pasted it, and claiming delivery we did not
 * perform would make every later report about messaging a lie.
 */
export async function recordMessageCopied(
  input: z.infer<typeof recordSchema>,
): Promise<ActionResult> {
  const actor = await requireAdminAction();
  const parsed = recordSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Invalid message." };

  await db.insert(messages).values({
    leadId: parsed.data.leadId,
    channel: parsed.data.channel,
    template: parsed.data.template,
    subject: parsed.data.subject || null,
    body: parsed.data.body,
    status: "copied",
    createdByUserId: actor.actorId,
  });

  await logAdminAction({
    action: "create",
    entityType: "message",
    entityId: String(parsed.data.leadId),
    summary: `Prepared a ${parsed.data.template} message for lead #${parsed.data.leadId}`,
  });

  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true, message: "Copied, and recorded against the lead." };
}

export async function getLeadMessages(leadId: number) {
  await requireAdminAction();
  return db
    .select({
      id: messages.id,
      template: messages.template,
      channel: messages.channel,
      status: messages.status,
      createdAt: messages.createdAt,
    })
    .from(messages)
    .where(eq(messages.leadId, leadId))
    .orderBy(desc(messages.createdAt))
    .limit(20);
}
