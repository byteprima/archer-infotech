"use server";

import { z } from "zod";
import { captureServerEvent } from "@/lib/posthog/server";
import { sendMetaConversionEvent } from "@/lib/meta-pixel/server";

// Schema for lead validation
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").or(z.literal("")),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .max(10, "Please enter a valid 10-digit phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  course: z.string().optional(),
  /**
   * Delivery format the enquirer wants. Optional so the forms that have no
   * business asking (newsletter, chat) are unaffected — only the course
   * enquiry forms send it.
   */
  modePreference: z.string().optional(),
  /**
   * "Fresher" or "Experienced". Every enquiry form makes the visitor pick one,
   * but it stays optional here because the newsletter signup and the chatbot's
   * `capture_lead` tool share this action and have no such question to ask —
   * rejecting those submissions server-side would lose real leads.
   */
  experienceLevel: z.string().optional(),
  // Optional: the contact form's textarea is not mandatory — a name, phone
  // and course pick is a complete enquiry, and forcing 10 characters of prose
  // was costing submissions. Other callers (chat widget, offer popup) still
  // pass a generated message, so nothing downstream needs to change.
  message: z.string().optional(),
  // Honeypot. Hidden from humans by CSS and left empty by them; bots that
  // fill every input trip it. Optional so existing callers that don't send
  // it (the /contact form) are unaffected — only forms that opt in are
  // checked. Added when the offer popup put a lead form on every page,
  // which is a much larger spam surface than a single /contact route.
  honeypot: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  analyticsDistinctId: z.string().optional(),
  currentPath: z.string().optional(),
  /** Read from the URL, never asked for. See lib/leads/utm.ts. */
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrer: z.string().optional(),
  // Meta Conversions API dedup payload — when present, the server fires the
  // matching server-side conversion. eventId/eventName must equal the values
  // the browser pixel used so Meta counts the conversion once.
  meta: z
    .object({
      eventId: z.string(),
      eventName: z.string(),
      contentName: z.string().optional(),
      contentCategory: z.string().optional(),
      sourceUrl: z.string().optional(),
    })
    .optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitLead(data: LeadFormData): Promise<ActionResult> {
  // Trip the honeypot before anything else — no DB write, no analytics, no
  // conversion event. Report success: telling a bot it was detected only
  // tells whoever wrote it what to change.
  if (data.honeypot) {
    return { success: true, message: "Thank you! We'll be in touch shortly." };
  }

  // Validate the data
  const validationResult = leadSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const { insertLeadWithEnquiryNumber } = await import(
      "@/lib/leads/allocate-enquiry-number"
    );

    // Insert the lead, with its ENQ-YYYY-NNNN reference allocated in the same
    // transaction. Nothing asks the visitor for anything extra — see the
    // schema above, which is still name, phone, email, mode and experience.
    const created = insertLeadWithEnquiryNumber({
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      courseInterest: validationResult.data.course,
      modePreference: validationResult.data.modePreference || null,
      experienceLevel: validationResult.data.experienceLevel || null,
      // Empty textarea → null rather than "", so the admin lead list shows a
      // blank cell instead of an empty-looking message body.
      message: validationResult.data.message?.trim() || null,
      source: validationResult.data.source || "contact_form",
      utmSource: validationResult.data.utmSource,
      utmMedium: validationResult.data.utmMedium,
      utmCampaign: validationResult.data.utmCampaign,
      // Captured from the page the visitor was on, not asked for.
      utmContent: validationResult.data.utmContent,
      utmTerm: validationResult.data.utmTerm,
      landingPage: validationResult.data.currentPath || null,
      status: "NEW",
    });

    // Routing runs AFTER the insert, and its failures are swallowed: the
    // enquiry is the thing that must not be lost. Both rules are off until the
    // office turns them on in /admin/crm/settings.
    const { applyNewLeadAutomation } = await import("@/lib/crm/automation");
    const routed = await applyNewLeadAutomation(created.id);

    if (routed.assignedToUserId) {
      const { notify } = await import("@/lib/actions/notifications");
      await notify({
        userId: routed.assignedToUserId,
        type: "LEAD_ASSIGNED",
        title: `New enquiry assigned to you: ${validationResult.data.name}`,
        body: [
          validationResult.data.course,
          validationResult.data.modePreference,
          validationResult.data.experienceLevel,
        ]
          .filter(Boolean)
          .join(" · ") || null,
        href: `/admin/leads/${created.id}`,
        leadId: created.id,
      });
    }

    await captureServerEvent({
      distinctId: validationResult.data.analyticsDistinctId,
      event: "lead_created",
      properties: {
        source: validationResult.data.source || "contact_form",
        current_path: validationResult.data.currentPath,
        referrer: validationResult.data.referrer,
        course_interest: validationResult.data.course,
        experience_level: validationResult.data.experienceLevel,
        has_email: Boolean(validationResult.data.email),
        utm_source: validationResult.data.utmSource,
        utm_medium: validationResult.data.utmMedium,
        utm_campaign: validationResult.data.utmCampaign,
      },
    });

    // Meta Conversions API — server-side twin of the browser pixel event,
    // deduplicated by the shared event id. No-op until META_CAPI_ACCESS_TOKEN
    // is set; never throws (failures are logged inside the sender).
    if (validationResult.data.meta) {
      const [firstName, ...rest] = validationResult.data.name.trim().split(/\s+/);
      await sendMetaConversionEvent({
        eventName: validationResult.data.meta.eventName,
        eventId: validationResult.data.meta.eventId,
        eventSourceUrl: validationResult.data.meta.sourceUrl,
        userData: {
          email: validationResult.data.email || undefined,
          phone: validationResult.data.phone,
          firstName,
          lastName: rest.join(" ") || undefined,
        },
        customData: {
          content_name: validationResult.data.meta.contentName,
          content_category: validationResult.data.meta.contentCategory,
        },
      });
    }

    return {
      success: true,
      message: "Thank you for your enquiry! We will contact you shortly.",
    };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
