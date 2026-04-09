import { z } from "zod";
import { BATCH_MODE, BATCH_STATUS } from "@/db/schema";

export const batchFormSchema = z
  .object({
    courseSlug: z.string().trim().min(1, "Course slug is required"),
    courseName: z.string().trim().min(1, "Course name is required"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date"),
    timing: z.string().trim().min(1, "Timing is required"),
    duration: z.string().trim().min(1, "Duration is required"),
    mode: z.enum(BATCH_MODE),
    totalSeats: z.coerce.number().int().min(1, "Total seats must be at least 1"),
    seatsAvailable: z.coerce.number().int().min(0, "Available seats cannot be negative"),
    status: z.enum(BATCH_STATUS),
    instructor: z.string().trim().optional().or(z.literal("")),
    location: z.string().trim().optional().or(z.literal("")),
    meetingLink: z.string().trim().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.seatsAvailable > data.totalSeats) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["seatsAvailable"],
        message: "Available seats cannot exceed total seats",
      });
    }

    if (data.mode === "offline" && !data.location?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["location"],
        message: "Location is required for offline batches",
      });
    }

    if (data.mode === "online" && !data.meetingLink?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["meetingLink"],
        message: "Meeting link is required for online batches",
      });
    }

    if (data.meetingLink?.trim()) {
      try {
        new URL(data.meetingLink);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["meetingLink"],
          message: "Enter a valid meeting link",
        });
      }
    }
  });

export type BatchFormData = z.infer<typeof batchFormSchema>;
