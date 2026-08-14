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
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    const { db, leads } = await import("@/db");

    // Insert the lead into the database
    await db.insert(leads).values({
      name: validationResult.data.name,
      email: validationResult.data.email,
      phone: validationResult.data.phone,
      courseInterest: validationResult.data.course,
      message: validationResult.data.message,
      source: validationResult.data.source || "contact_form",
      utmSource: validationResult.data.utmSource,
      utmMedium: validationResult.data.utmMedium,
      utmCampaign: validationResult.data.utmCampaign,
      status: "new",
    });

    await captureServerEvent({
      distinctId: validationResult.data.analyticsDistinctId,
      event: "lead_created",
      properties: {
        source: validationResult.data.source || "contact_form",
        current_path: validationResult.data.currentPath,
        referrer: validationResult.data.referrer,
        course_interest: validationResult.data.course,
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
