"use client";

/* B3 perf: this component used to ship react-hook-form + @hookform/resolvers
 * + zod (~150KB transit) for client-side validation. We now use native HTML5
 * validation (required, pattern, minLength, type) and let the server action
 * (`submitLead`) do the authoritative Zod check. The lost UX is real-time
 * field-level zod messages — the gain is ~150KB off the contact-page bundle
 * and a smaller hydration tree. Server errors map back to per-field messages
 * via the `ActionResult.errors` payload. */

import { useState, useTransition, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CourseSelect } from "@/components/forms/course-select";
import { submitLead } from "@/lib/actions/leads";
import {
  captureAnalyticsEvent,
  getAnalyticsDistinctId,
} from "@/lib/posthog/client";
import { trackMetaPixelEvent, newMetaEventId } from "@/lib/meta-pixel/client";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "message", string>
>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const inputClassName = "h-12 px-4";

  const handleFormStart = () => {
    if (hasStarted) return;
    setHasStarted(true);
    captureAnalyticsEvent("contact_form_started", {
      form_name: "contact",
      source: "contact_form",
      current_path: window.location.pathname,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formEl = event.currentTarget;
    const fd = new FormData(formEl);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;
    const analyticsDistinctId = getAnalyticsDistinctId();
    const currentPath = window.location.pathname;
    const referrer = document.referrer || undefined;
    const courseInterest =
      selectedCourses.length > 0 ? selectedCourses.join(", ") : undefined;

    // Shared dedup id for the browser pixel + server Conversions API event.
    const metaEventId = newMetaEventId();
    const metaContentCategory = courseInterest || "general";

    startTransition(async () => {
      try {
        const result = await submitLead({
          name,
          email,
          phone,
          message,
          course: courseInterest,
          source: "contact_form",
          utmSource,
          utmMedium,
          utmCampaign,
          analyticsDistinctId,
          currentPath,
          referrer,
          meta: {
            eventId: metaEventId,
            eventName: "Lead",
            contentName: "Contact Form",
            contentCategory: metaContentCategory,
            sourceUrl: window.location.href,
          },
        });

        if (result.success) {
          captureAnalyticsEvent("contact_form_submitted", {
            form_name: "contact",
            source: "contact_form",
            current_path: currentPath,
            course_count: selectedCourses.length,
            has_email: Boolean(email),
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
          });
          // Meta Pixel conversion — fires the standard "Lead" event so
          // Facebook/Instagram ad campaigns can optimise toward enquiries.
          trackMetaPixelEvent(
            "Lead",
            {
              content_name: "Contact Form",
              content_category: metaContentCategory,
            },
            metaEventId,
          );
          toast.success("Thank you for contacting us!", {
            description: result.message,
          });
          formRef.current?.reset();
          setSelectedCourses([]);
          setHasStarted(false);
        } else {
          // Map server-side Zod field errors back to per-field UI
          if (result.errors) {
            const fieldErrors: FieldErrors = {};
            for (const [k, v] of Object.entries(result.errors)) {
              if (Array.isArray(v) && v[0]) {
                fieldErrors[k as keyof FieldErrors] = v[0];
              }
            }
            setErrors(fieldErrors);
          }
          captureAnalyticsEvent("contact_form_submission_failed", {
            form_name: "contact",
            source: "contact_form",
            current_path: currentPath,
            error_message: result.message,
          });
          toast.error("Error", { description: result.message });
        }
      } catch {
        captureAnalyticsEvent("contact_form_submission_failed", {
          form_name: "contact",
          source: "contact_form",
          current_path: currentPath,
          error_message: "unexpected_error",
        });
        toast.error("Error", {
          description: "Something went wrong. Please try again later.",
        });
      }
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={handleFormStart}
      className="space-y-6"
      noValidate={false}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            className={inputClassName}
            required
            minLength={2}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className={inputClassName}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="Enter 10-digit phone number"
            className={inputClassName}
            required
            pattern="\d{10}"
            maxLength={10}
            title="Please enter a valid 10-digit phone number"
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="course">Courses Interested In</Label>
          <CourseSelect
            value={selectedCourses}
            onValueChange={(value) => setSelectedCourses(value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your requirements... (optional)"
          rows={5}
          className="px-4 py-3"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-12 w-full px-6 text-base font-semibold md:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
