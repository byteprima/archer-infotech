"use server";

import { z } from "zod";

// Schema for lead validation
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .max(10, "Please enter a valid 10-digit phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  course: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitLead(data: LeadFormData): Promise<ActionResult> {
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
