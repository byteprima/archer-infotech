"use client";

/**
 * Public placement submission form (rendered at /placements/submit).
 *
 * Mirrors the alumni form: native HTML5 validation on the client,
 * authoritative Zod validation in the server action, FormData so the offer
 * letter and photo ride along.
 *
 * Nothing submitted here is published. The copy says so in the form itself,
 * because a student handing over a salary figure deserves to know where it
 * goes before they type it, not after.
 */
import { useRef, useState, useTransition } from "react";
import {
  Loader2,
  CheckCircle2,
  Upload,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitPlacement } from "@/lib/actions/placement-submissions";

type FieldErrors = Record<string, string>;

export function PlacementSubmitForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const letterRef = useRef<HTMLInputElement>(null);
  const [letterName, setLetterName] = useState<string | null>(null);

  const inputClass = "h-12 px-4";
  const err = (k: string) =>
    errors[k] ? <p className="text-sm text-destructive">{errors[k]}</p> : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    const fd = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await submitPlacement(fd);
        if (result.success) {
          toast.success("Received", { description: result.message });
          formRef.current?.reset();
          setLetterName(null);
          setSubmitted(true);
        } else {
          if (result.errors) {
            const fe: FieldErrors = {};
            for (const [k, v] of Object.entries(result.errors)) {
              if (Array.isArray(v) && v[0]) fe[k] = v[0];
            }
            setErrors(fe);
          }
          toast.error("Please check the form", { description: result.message });
        }
      } catch {
        toast.error("Error", {
          description: "Something went wrong. Please try again later.",
        });
      }
    });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center ring-1 ring-foreground/5">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Congratulations, and thank you!</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We&apos;ve received your placement details. Our team will verify them
          and contact you before anything appears on the site.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from people, not from bots that fill every input. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="rounded-xl border bg-card p-6 ring-1 ring-foreground/5">
        <legend className="px-2 font-semibold">About you</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="studentName">Full name *</Label>
            <Input id="studentName" name="studentName" required className={inputClass} />
            {err("studentName")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required className={inputClass} />
            {err("email")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone / WhatsApp *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              required
              pattern="\d{10}"
              maxLength={10}
              title="Enter a valid 10-digit phone number"
              className={inputClass}
            />
            {err("phone")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/..."
              className={inputClass}
            />
            {err("linkedinUrl")}
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-xl border bg-card p-6 ring-1 ring-foreground/5">
        <legend className="px-2 font-semibold">Your offer</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input id="company" name="company" required className={inputClass} />
            {err("company")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Role / designation *</Label>
            <Input id="designation" name="designation" required className={inputClass} />
            {err("designation")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="package">Package</Label>
            <Input id="package" name="package" placeholder="e.g. 6.5 LPA" className={inputClass} />
            {err("package")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="offerDate">Offer / joining date</Label>
            <Input id="offerDate" name="offerDate" type="date" className={inputClass} />
            {err("offerDate")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseTaken">Course you took at Archer</Label>
            <Input id="courseTaken" name="courseTaken" className={inputClass} />
            {err("courseTaken")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="batchYear">Batch year</Label>
            <Input
              id="batchYear"
              name="batchYear"
              type="number"
              inputMode="numeric"
              placeholder="2026"
              className={inputClass}
            />
            {err("batchYear")}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="offerLetter">Offer letter *</Label>
          <input
            ref={letterRef}
            id="offerLetter"
            name="offerLetter"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp,image/avif"
            required
            className="sr-only"
            onChange={(e) => setLetterName(e.target.files?.[0]?.name ?? null)}
          />
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <FileText className="h-5 w-5" />
            </span>
            <Button
              type="button"
              variant="outline"
              className="h-12 gap-2"
              onClick={() => letterRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              {letterName ? "Change file" : "Attach offer letter"}
            </Button>
            {letterName && (
              <button
                type="button"
                title="Remove file"
                onClick={() => {
                  if (letterRef.current) letterRef.current.value = "";
                  setLetterName(null);
                }}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {letterName ?? "PDF or image, up to 5 MB."}
          </p>
          {/* Said plainly, next to the field that asks for it. Someone
              uploading a salary document is entitled to know where it goes. */}
          <p className="flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Your offer letter is stored privately and is only ever seen by our
              placement team to verify the offer. It is never published, never
              shown on the site, and never shared.
            </span>
          </p>
          {err("offerLetter")}
        </div>
      </fieldset>

      <fieldset className="rounded-xl border bg-card p-6 ring-1 ring-foreground/5">
        <legend className="px-2 font-semibold">Share your story (optional)</legend>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial">A few words about your experience</Label>
            <Textarea id="testimonial" name="testimonial" rows={4} />
            {err("testimonial")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="h-12"
            />
            {err("photo")}
          </div>
          <label className="flex items-start gap-3 rounded-lg border p-3">
            <input
              type="checkbox"
              name="consentDisplayPublic"
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span className="text-sm">
              <span className="font-medium">
                You may show my name, company and photo on the website
              </span>
              <span className="block text-xs text-muted-foreground">
                Leave this unticked and we&apos;ll keep your placement to
                internal records only. Your salary figure is never published
                either way.
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        Nothing you submit here appears on the site automatically. Our team
        verifies every placement against the offer letter first, and contacts
        you before anything is published.
      </div>

      <Button type="submit" size="lg" className="w-full gap-2" disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Submitting…" : "Submit my placement"}
      </Button>
    </form>
  );
}
