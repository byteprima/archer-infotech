import { z } from "zod";
import { BATCH_MODE, DEMO_SESSION_STATUS } from "@/db/schema";

/**
 * A demo or trial class somebody can be invited to.
 *
 * The course is picked from the catalogue rather than typed, so slug and name
 * cannot disagree — unlike the batch form, which asks for both and derives the
 * slug from the name.
 *
 * `scheduledAt` is a datetime-local string ("2026-09-20T18:30"), which has no
 * timezone. It is parsed as local time, which is what the person typing it
 * means; the column stores an instant.
 */
export const demoSessionFormSchema = z
  .object({
    courseSlug: z.string().trim().min(1, "Choose a course"),
    batchId: z.string().trim().optional().or(z.literal("")),
    scheduledAt: z
      .string()
      .min(1, "Date and time are required")
      .refine(
        (value) => !Number.isNaN(new Date(value).getTime()),
        "Enter a valid date and time",
      ),
    mode: z.enum(BATCH_MODE),
    status: z.enum(DEMO_SESSION_STATUS),
    trainer: z.string().trim().max(120).optional().or(z.literal("")),
    capacity: z
      .union([z.literal(""), z.coerce.number().int().min(1).max(500)])
      .optional(),
    location: z.string().trim().max(300).optional().or(z.literal("")),
    meetingLink: z.string().trim().max(500).optional().or(z.literal("")),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Same rule as batches: whoever is invited has to be told where to go.
    // Hybrid needs both, which is the whole point of hybrid.
    const needsLocation = data.mode === "offline" || data.mode === "hybrid";
    const needsLink = data.mode === "online" || data.mode === "hybrid";

    if (needsLocation && !data.location?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["location"],
        message:
          data.mode === "hybrid"
            ? "Hybrid demos need a location as well as a link"
            : "Location is required for an offline demo",
      });
    }

    if (needsLink && !data.meetingLink?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["meetingLink"],
        message:
          data.mode === "hybrid"
            ? "Hybrid demos need a link as well as a location"
            : "Meeting link is required for an online demo",
      });
    }

    if (data.meetingLink?.trim()) {
      try {
        const url = new URL(data.meetingLink);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("scheme");
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meetingLink"],
          message: "Enter a valid http(s) link",
        });
      }
    }
  });

export type DemoSessionFormData = z.infer<typeof demoSessionFormSchema>;
