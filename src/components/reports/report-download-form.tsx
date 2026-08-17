"use client";

/**
 * P6-13 — Report Download Form (gated lead capture).
 *
 * Single-purpose form for the Pune IT Hiring Report 2026 (and any future
 * downloadable PDF reports). Reuses the existing `submitLead` server
 * action with a distinct `source` value so admin analytics can
 * segment report-download leads from generic contact leads.
 *
 * Once submitted successfully:
 *   - Lead is recorded in the leads table with source="report_download:<slug>"
 *   - User gets a success message + visible PDF download link
 *   - In a future iteration we email the PDF instead (not in scope today)
 *
 * Stays in this folder (not src/components/forms/) so it can ship as a
 * dormant component until the actual PDF exists.
 */
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/lib/actions/leads";
import { trackMetaPixelEvent, newMetaEventId } from "@/lib/meta-pixel/client";

interface ReportDownloadFormProps {
  /** Slug identifying which report — feeds `source` for analytics. */
  reportSlug: string;
  /** Public PDF URL once available. While null, button text shifts to "Get notified when ready". */
  pdfUrl?: string;
  /** Display title used in the success message. */
  reportTitle: string;
  /**
   * Noun used in button labels — "report" by default. Course syllabus
   * downloads pass "syllabus" so the CTA reads correctly; existing report
   * pages keep the original wording by omitting this.
   */
  nounLabel?: string;
  /**
   * Drop this form's own card chrome (border, background, padding) when it
   * is nested inside a container that already provides it. Without this the
   * syllabus block rendered a bordered card inside a bordered card.
   */
  bare?: boolean;
}

export function ReportDownloadForm({
  reportSlug,
  pdfUrl,
  reportTitle,
  nounLabel = "report",
  bare = false,
}: ReportDownloadFormProps) {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setErrorMsg(null);
    startTransition(async () => {
      // Shared dedup id for the browser pixel + server Conversions API event.
      const metaEventId = newMetaEventId();
      const data = {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        message: pdfUrl
          ? `Requested download: ${reportTitle}`
          : `Requested notification for: ${reportTitle}`,
        course: "",
        source: `report_download:${reportSlug}`,
        meta: {
          eventId: metaEventId,
          eventName: "Lead",
          contentName: reportTitle,
          contentCategory: `report:${reportSlug}`,
          sourceUrl: window.location.href,
        },
      };
      const result = await submitLead(data);
      if (result.success) {
        trackMetaPixelEvent(
          "Lead",
          {
            content_name: reportTitle,
            content_category: `report:${reportSlug}`,
          },
          metaEventId,
        );
        setSuccess(true);
      } else {
        setErrorMsg(result.message || "Submission failed. Please try again.");
      }
    });
  }

  if (success) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <h3 className="text-lg font-semibold text-primary mb-2">
          ✓ You&apos;re on the list.
        </h3>
        {pdfUrl ? (
          <p className="text-sm text-muted-foreground mb-3">
            Your copy of <strong>{reportTitle}</strong> is ready. Use the
            button below to download the PDF (~2 MB).
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mb-3">
            We&apos;ll email you the PDF of <strong>{reportTitle}</strong> as
            soon as it&apos;s ready (early Q3 2026). Until then, explore the
            preview sections below.
          </p>
        )}
        {pdfUrl && (
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Download the {nounLabel} (PDF)
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className={
        bare
          ? "space-y-5"
          : "rounded-xl border bg-card p-6 space-y-5"
      }
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="report-name">Your name</Label>
        <Input
          id="report-name"
          name="name"
          required
          minLength={2}
          autoComplete="name"
          placeholder="Full name"
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="report-email">Work or personal email</Label>
        <Input
          id="report-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="report-phone">Phone (10 digits, India)</Label>
        <Input
          id="report-phone"
          name="phone"
          type="tel"
          required
          pattern="[0-9]{10}"
          minLength={10}
          maxLength={10}
          autoComplete="tel-national"
          placeholder="9876543210"
          disabled={isPending}
        />
      </div>
      {errorMsg && (
        <p className="text-sm text-destructive" role="alert">
          {errorMsg}
        </p>
      )}
      <Button type="submit" disabled={isPending} className="w-full mt-1">
        {isPending
          ? "Submitting…"
          : pdfUrl
            ? `Download the ${nounLabel} (free)`
            : "Notify me when ready"}
      </Button>
      <p className="text-xs text-muted-foreground !mt-3">
        We email the PDF link to the address above. No spam — you can
        unsubscribe at any time.
      </p>
    </form>
  );
}
