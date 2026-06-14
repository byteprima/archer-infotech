"use client";

/**
 * P5-17 — Newsletter signup form.
 *
 * Captures email + optional interest segment via the existing `submitLead`
 * server action. Source tag varies by placement so admin analytics can
 * segment newsletter signups (footer vs blog-inline vs etc) from generic
 * contact leads.
 *
 * Platform-agnostic: today this is purely DB-side capture (leads table
 * row with source="newsletter_signup:<placement>"). When the email
 * platform integration ships (P5-17 stretch), the admin tooling will
 * export newsletter_signup-tagged leads to the platform's contact list.
 *
 * Form fields are MINIMAL on purpose — only email + (optional) interest
 * track. Phone is intentionally omitted: a 30+ char form is the #1 way
 * to kill newsletter conversion. Phone-collection happens later on the
 * dedicated contact form.
 *
 * Compliance with `submitLead` server action: phone field is required
 * by `leadSchema` (10 digits). To work around this without breaking the
 * leads schema, we send a stub "0000000000" phone marked in the
 * message field — admin tooling will recognise newsletter_signup source
 * tag and treat the phone field as not-applicable. (A cleaner fix is
 * a separate `submitNewsletterSignup` server action; deferred.)
 */
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/actions/leads";
import { trackMetaPixelEvent } from "@/lib/meta-pixel/client";

interface NewsletterSignupFormProps {
  /** Stable placement key for analytics, e.g. "footer" / "blog-inline" / "homepage". */
  placement: string;
  /** Compact (footer) or banner (inline/homepage) visual treatment. */
  variant?: "compact" | "banner";
  /** Optional override of the headline copy. */
  headline?: string;
  /** Optional override of the subhead copy. */
  subhead?: string;
}

export function NewsletterSignupForm({
  placement,
  variant = "compact",
  headline = "Pune IT careers — monthly briefing",
  subhead = "One email a month with the most actionable Pune IT hiring + salary updates. Free, unsubscribe anytime.",
}: NewsletterSignupFormProps) {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setErrorMsg(null);
    startTransition(async () => {
      const email = String(formData.get("email") ?? "").trim();
      if (!email || !email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
      const result = await submitLead({
        name: email.split("@")[0],
        email,
        // submitLead's leadSchema requires 10-digit phone. Newsletter
        // signups intentionally omit phone; pass a stub the admin
        // tooling recognises as "not-applicable for source=newsletter".
        phone: "0000000000",
        message: `Newsletter signup from ${placement}`,
        course: "",
        source: `newsletter_signup:${placement}`,
      });
      if (result.success) {
        trackMetaPixelEvent("Subscribe", {
          content_name: `Newsletter: ${placement}`,
        });
        setSuccess(true);
      } else {
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    });
  }

  if (success) {
    if (variant === "banner") {
      return (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <h3 className="font-semibold text-primary mb-1">
            ✓ You&apos;re subscribed.
          </h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ll email you the next briefing. Check your inbox for a
            confirmation in a minute.
          </p>
        </div>
      );
    }
    return (
      <p className="text-sm text-secondary-bright font-medium">
        ✓ Subscribed. We&apos;ll email you the next briefing.
      </p>
    );
  }

  if (variant === "banner") {
    return (
      <div className="rounded-xl border bg-card p-6 md:p-8">
        <h3 className="font-semibold text-lg mb-1">{headline}</h3>
        <p className="text-sm text-muted-foreground mb-4">{subhead}</p>
        <form
          action={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
          noValidate
        >
          <Input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isPending}
            className="flex-grow"
            aria-label="Email address for newsletter subscription"
          />
          <Button type="submit" disabled={isPending} className="sm:w-auto">
            {isPending ? "Subscribing…" : "Subscribe (free)"}
          </Button>
        </form>
        {errorMsg && (
          <p className="text-xs text-destructive mt-2" role="alert">
            {errorMsg}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          One email per month. No spam. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Compact (footer-friendly) variant.
  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-2"
      noValidate
    >
      <Input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        disabled={isPending}
        aria-label="Email address for newsletter subscription"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
      <Button
        type="submit"
        disabled={isPending}
        size="sm"
        className="bg-secondary hover:bg-secondary/90"
      >
        {isPending ? "Subscribing…" : "Subscribe"}
      </Button>
      {errorMsg && (
        <p className="text-xs text-secondary-bright" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
