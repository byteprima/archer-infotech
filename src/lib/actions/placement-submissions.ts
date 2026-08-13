"use server";

/**
 * Public placement submission — a student reporting their own offer at
 * /placements/submit, instead of an admin typing it in.
 *
 * Nothing written here is public. Rows land in `placement_submissions` with
 * status "new"; an admin reads the attached offer letter and, on approval,
 * copies the row into `placements`, which is what the public page renders.
 * The separation is the point: anonymous input must never be able to publish
 * a salary or an employer name.
 */
import { headers } from "next/headers";
import { z } from "zod";

import { rateLimit, clientKey } from "@/lib/rate-limit";
import { saveMedia } from "@/lib/storage/media";

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

const optional = z.string().trim().optional().or(z.literal("")).transform((v) => v || undefined);

const schema = z.object({
  studentName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
  linkedinUrl: optional,
  githubUrl: optional,
  company: z.string().trim().min(2, "Which company made the offer?"),
  designation: z.string().trim().min(2, "What is the role called?"),
  package: optional,
  offerDate: optional,
  courseTaken: optional,
  batchYear: optional,
  testimonial: optional,
});

export interface PlacementSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitPlacement(
  formData: FormData,
): Promise<PlacementSubmissionResult> {
  // Honeypot: a field hidden from humans by CSS and left empty by them.
  // Bots that fill every input trip it. Cheap, no third-party dependency,
  // and invisible to real users — unlike a captcha, which taxes everyone to
  // stop a minority.
  if (str(formData, "website")) {
    // Report success. Telling a bot it was detected only tells the author
    // what to change.
    return { success: true, message: "Thank you — we'll be in touch." };
  }

  const h = await headers();
  const limit = rateLimit(`placement-submit:${clientKey(h)}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.ok) {
    return {
      success: false,
      message: `Too many submissions from this connection. Try again in ${Math.ceil(limit.retryAfter / 60)} minutes.`,
    };
  }

  const parsed = schema.safeParse({
    studentName: str(formData, "studentName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    linkedinUrl: str(formData, "linkedinUrl"),
    githubUrl: str(formData, "githubUrl"),
    company: str(formData, "company"),
    designation: str(formData, "designation"),
    package: str(formData, "package"),
    offerDate: str(formData, "offerDate"),
    courseTaken: str(formData, "courseTaken"),
    batchYear: str(formData, "batchYear"),
    testimonial: str(formData, "testimonial"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const d = parsed.data;

  // Offer letter — the evidence a reviewer needs. Required, because the
  // whole point of accepting public submissions is that someone can check
  // them; a claim with nothing attached is what we were trying to avoid.
  const letter = formData.get("offerLetter");
  if (!(letter instanceof File) || letter.size === 0) {
    const msg = "Attach your offer letter so we can verify the placement.";
    return { success: false, message: msg, errors: { offerLetter: [msg] } };
  }
  const savedLetter = await saveMedia(letter, "offer-letters");
  if (!savedLetter.ok) {
    return {
      success: false,
      message: savedLetter.error,
      errors: { offerLetter: [savedLetter.error] },
    };
  }

  // Optional photo, public-facing if the submission is approved AND consent
  // was given. Stored in the ordinary `placements` collection, not the
  // private one — it is meant to be seen.
  // An uploaded file always wins over the profile-photo option: picking a
  // file is the more deliberate act, and the checkbox clears any selection
  // when ticked, so both arriving at once means something odd happened.
  let photoFilename: string | null = null;
  const photo = formData.get("photo");
  const useProfilePhoto = str(formData, "useProfilePhoto") === "on";

  if (photo instanceof File && photo.size > 0) {
    const savedPhoto = await saveMedia(photo, "placements");
    if (!savedPhoto.ok) {
      return {
        success: false,
        message: savedPhoto.error,
        errors: { photo: [savedPhoto.error] },
      };
    }
    photoFilename = savedPhoto.filename;
  } else if (useProfilePhoto) {
    const { resolveProfileAvatar } = await import("@/lib/storage/profile-avatar");
    const avatar = await resolveProfileAvatar({
      linkedinUrl: d.linkedinUrl,
      githubUrl: str(formData, "githubUrl"),
      collection: "placements",
    });
    if (!avatar.ok) {
      // The photo is optional; a failed lookup must not lose a submission
      // that already carries a verified offer letter. Surface it against the
      // photo field so they can browse for one instead.
      return {
        success: false,
        message: avatar.error,
        errors: { photo: [avatar.error] },
      };
    }
    photoFilename = avatar.filename;
  }

  try {
    const { db } = await import("@/db");
    const { placementSubmissions } = await import("@/db/schema");

    await db.insert(placementSubmissions).values({
      studentName: d.studentName,
      email: d.email,
      phone: d.phone,
      linkedinUrl: d.linkedinUrl ?? null,
      company: d.company,
      designation: d.designation,
      package: d.package ?? null,
      offerDate: d.offerDate ?? null,
      courseTaken: d.courseTaken ?? null,
      batchYear: d.batchYear ? Number(d.batchYear) || null : null,
      offerLetterFilename: savedLetter.filename,
      testimonial: d.testimonial ?? null,
      photoFilename,
      consentDisplayPublic: str(formData, "consentDisplayPublic") === "on",
      status: "new",
      source: str(formData, "source") || "placement_submit_form",
    });

    return {
      success: true,
      message:
        "Thank you — we've received your placement. Our team will verify it and get in touch before anything is published.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong saving your submission. Please try again.",
    };
  }
}
