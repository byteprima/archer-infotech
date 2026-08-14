"use client";

/**
 * Lead capture inside the campaign popup: name, mobile, course.
 *
 * Feeds the SAME pipeline as /contact (submitLead -> leads table), tagged
 * source="independence_day_popup" plus utm_campaign, so these leads sit
 * alongside every other lead in /admin and are filterable rather than
 * landing somewhere separate.
 *
 * submitLead requires an email and a message; this form deliberately asks
 * for neither (three fields convert, five do not), so email is sent empty —
 * which its schema explicitly permits — and the message is synthesised from
 * the chosen course.
 *
 * The course list is read from the same canonical data as the /contact
 * picker (courses-minimal), so the two can never drift apart. It renders as
 * a native <select> rather than the portalled multi-select used on /contact:
 * inside a modal a native control gets the OS picker on mobile, avoids
 * fighting the dialog's focus trap, and keeps the popup to one decision.
 */

import { useState } from "react";
import { categories, coursesSummary } from "@/data/courses-minimal";
import { submitLead } from "@/lib/actions/leads";

/** Featured first — these are the three batches the artwork advertises. */
const OFFER_COURSE_SLUGS = [
  "java-full-stack-training-in-pune",
  "dotnet-full-stack-training-in-pune",
  "python-full-stack-training-in-pune",
];

const CAMPAIGN = "independence-day-2026";

interface Props {
  /** Called after a lead is stored, so the popup can stop reappearing. */
  onSuccess: () => void;
}

export function OfferLeadForm({ onSuccess }: Props) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const offerCourses = OFFER_COURSE_SLUGS.map((slug) =>
    coursesSummary.find((c) => c.slug === slug),
  ).filter((c) => c !== undefined);

  const otherGroups = categories
    .map((cat) => ({
      name: cat.name,
      courses: coursesSummary.filter(
        (c) =>
          c.categorySlug === cat.slug && !OFFER_COURSE_SLUGS.includes(c.slug),
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
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^\d{10}$/.test(phone))
      next.phone = "Enter a 10-digit mobile number, digits only.";
    if (!course) next.course = "Please choose a course.";
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
        message: `Independence Day offer enquiry from the website popup. Interested in: ${course}.`,
        honeypot: String(fd.get("website") || ""),
        source: "independence_day_popup",
        utmSource: "site",
        utmMedium: "popup",
        utmCampaign: CAMPAIGN,
        currentPath:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        referrer:
          typeof document !== "undefined" ? document.referrer : undefined,
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
      setFormError(
        "We couldn't reach the server. Please call +91 9850 678451 instead.",
      );
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="p-5 text-center" role="status">
        <p className="font-heading text-base font-medium text-foreground">
          Thank you — we&apos;ve got your details.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Our counsellor will call you shortly to confirm your seat. For
          anything urgent, call{" "}
          <a href="tel:+919850678451" className="font-medium text-primary">
            +91 9850 678451
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldClass =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-base " +
    "outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-3 p-4 sm:p-5">
      <p className="text-sm font-medium text-foreground">
        Book your seat — we&apos;ll call you back.
      </p>

      {/* Honeypot: hidden from people, checked on the server. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-1">
        <label htmlFor="offer-name" className="text-sm text-muted-foreground">
          Full name
        </label>
        <input
          id="offer-name"
          name="name"
          autoComplete="name"
          required
          className={fieldClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "offer-name-err" : undefined}
        />
        {errors.name && (
          <p id="offer-name-err" className="text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="offer-phone" className="text-sm text-muted-foreground">
          Mobile number
        </label>
        <input
          id="offer-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="10-digit mobile number"
          required
          className={fieldClass}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "offer-phone-err" : undefined}
        />
        {errors.phone && (
          <p id="offer-phone-err" className="text-xs text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid gap-1">
        <label htmlFor="offer-course" className="text-sm text-muted-foreground">
          Course interested in
        </label>
        <select
          id="offer-course"
          name="course"
          required
          defaultValue=""
          className={fieldClass}
          aria-invalid={!!errors.course}
          aria-describedby={errors.course ? "offer-course-err" : undefined}
        >
          <option value="" disabled>
            Select a course
          </option>
          <optgroup label="Independence Day offer">
            {offerCourses.map((c) => (
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
        {errors.course && (
          <p id="offer-course-err" className="text-xs text-destructive">
            {errors.course}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
      >
        {pending ? "Sending…" : "Enrol now"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        We&apos;ll only use this to contact you about the offer.
      </p>
    </form>
  );
}
