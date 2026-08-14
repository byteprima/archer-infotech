"use client";

/**
 * Lead capture strip beneath the campaign artwork: name, mobile, course.
 *
 * Laid out as a single compact bar so the image stays the hero — on desktop
 * the three fields and the button sit on one row; on mobile they stack,
 * because four controls across a 360px screen is not a form anyone fills in.
 *
 * Feeds the SAME pipeline as /contact (submitLead -> leads table), tagged
 * source="popup:<campaign subject>" so every lead is traceable to the exact
 * campaign that produced it rather than to "a popup".
 *
 * submitLead requires an email and a 10-character message; this form asks
 * for neither (three fields convert, five do not), so email is sent empty —
 * which its schema explicitly permits — and the message is synthesised.
 *
 * The course list reads from the same canonical data as the /contact picker
 * (courses-minimal) so the two cannot drift. It renders as a native <select>
 * rather than the portalled multi-select used on /contact: inside a modal a
 * native control gets the OS picker on mobile, avoids fighting the dialog's
 * focus trap, and keeps the popup to one decision.
 */

import { useState } from "react";
import { categories, coursesSummary } from "@/data/courses-minimal";
import { submitLead } from "@/lib/actions/leads";

/** Featured first — the batches most campaigns advertise. */
const FEATURED_SLUGS = [
  "java-full-stack-training-in-pune",
  "dotnet-full-stack-training-in-pune",
  "python-full-stack-training-in-pune",
];

/** "Independence Day Offer" -> "popup:independence-day-offer" */
export function popupLeadSource(subject: string): string {
  const slug = subject
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `popup:${slug || "campaign"}`;
}

interface Props {
  /** Campaign name — tags the lead and appears in the enquiry message. */
  subject: string;
  /** Called once a lead is stored, so the popup can stop reappearing. */
  onSuccess: () => void;
}

export function OfferLeadForm({ subject, onSuccess }: Props) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const featured = FEATURED_SLUGS.map((slug) =>
    coursesSummary.find((c) => c.slug === slug),
  ).filter((c) => c !== undefined);

  const otherGroups = categories
    .map((cat) => ({
      name: cat.name,
      courses: coursesSummary.filter(
        (c) => c.categorySlug === cat.slug && !FEATURED_SLUGS.includes(c.slug),
      ),
    }))
    .filter((g) => g.courses.length > 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const course = String(fd.get("course") || "").trim();

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^\d{10}$/.test(phone)) next.phone = "Enter a 10-digit mobile number.";
    if (!course) next.course = "Choose a course.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    setFormError(null);
    try {
      const result = await submitLead({
        name,
        email: "",
        phone,
        course,
        // submitLead enforces a 10-character minimum here.
        message: `${subject} — enquiry from the website popup. Interested in: ${course}.`,
        honeypot: String(fd.get("website") || ""),
        source: popupLeadSource(subject),
        utmSource: "site",
        utmMedium: "popup",
        utmCampaign: popupLeadSource(subject).replace(/^popup:/, ""),
        currentPath:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
      });

      if (!result.success) {
        setFormError(result.message || "Something went wrong. Please try again.");
        if (result.errors) {
          const flat: Record<string, string> = {};
          for (const [k, v] of Object.entries(result.errors)) {
            if (Array.isArray(v) && v[0]) flat[k] = v[0];
          }
          setErrors(flat);
        }
        return;
      }

      setDone(true);
      onSuccess();
    } catch {
      setFormError("We couldn't reach the server. Please call +91 9850 678451.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="bg-muted/40 px-4 py-4 text-center sm:px-5" role="status">
        <p className="font-heading text-sm font-medium text-foreground">
          Thank you — we&apos;ve got your details.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Our counsellor will call you shortly. For anything urgent, call{" "}
          <a href="tel:+919850678451" className="font-medium text-primary">
            +91 9850 678451
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm " +
    "outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40";

  // Errors live under the strip rather than under each field: inside a
  // three-across bar, per-field messages reflow the row and push the button
  // out from under the cursor.
  const messages = Object.values(errors);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-t bg-muted/40 px-3 py-3 sm:px-4"
    >
      {/* Honeypot: hidden from people, checked on the server. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
        <input
          name="name"
          autoComplete="name"
          placeholder="Your name"
          aria-label="Your name"
          aria-invalid={!!errors.name}
          className={field}
        />
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="Mobile number"
          aria-label="Mobile number"
          aria-invalid={!!errors.phone}
          className={field}
        />
        <select
          name="course"
          defaultValue=""
          aria-label="Course interested in"
          aria-invalid={!!errors.course}
          className={field}
        >
          <option value="" disabled>
            Course interested in
          </option>
          <optgroup label="Featured">
            {featured.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </optgroup>
          {otherGroups.map((g) => (
            <optgroup key={g.name} label={g.name}>
              {g.courses.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
        >
          {pending ? "Sending…" : "Enrol now"}
        </button>
      </div>

      {(messages.length > 0 || formError) && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {formError ?? messages[0]}
        </p>
      )}
    </form>
  );
}
