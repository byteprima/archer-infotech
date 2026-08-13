"use client";

/*
 * Public alumni self-service form (rendered at /alumni). Follows the same
 * lightweight philosophy as ContactForm: native HTML5 validation on the
 * client, authoritative Zod validation in the `submitAlumni` server action.
 * Submits as FormData so the optional photo file rides along. Private
 * fields (package band, contact, location, hiring/referral) are clearly
 * separated from the public testimonial section in the UI.
 */

import { useEffect, useRef, useState, useTransition } from "react";
import {
  Loader2,
  CheckCircle2,
  User,
  Briefcase,
  Handshake,
  MessageSquareQuote,
  ShieldCheck,
  Upload,
  ImageIcon,
  X,
  BookUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitAlumni } from "@/lib/actions/alumni";
import { ALUMNI_PACKAGE_BANDS } from "@/lib/alumni/constants";
import { courses } from "@/data/courses";
import { getAnalyticsDistinctId } from "@/lib/posthog/client";
import { parseGithubUsername } from "@/lib/github-username";

type FieldErrors = Record<string, string>;

// Contact Picker API (mobile browsers, e.g. Android Chrome over HTTPS).
// Not in the standard TS DOM lib, so we declare the minimal shape we use.
interface PickedContact {
  name?: string[];
  tel?: string[];
  email?: string[];
}
interface ContactsManager {
  select(
    properties: string[],
    options?: { multiple?: boolean }
  ): Promise<PickedContact[]>;
}

const courseTitles = Array.from(new Set(courses.map((c) => c.title))).sort(
  (a, b) => a.localeCompare(b)
);

const selectClass =
  "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

function Section({
  step,
  title,
  hint,
  icon: Icon,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border bg-card p-6 ring-1 ring-foreground/5">
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <legend className="font-semibold">
            <span className="text-muted-foreground">{step}.</span> {title}
          </legend>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {children}
    </fieldset>
  );
}

export function AlumniForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  // githubUrl is mirrored into state only so the checkbox can enable itself
  // and preview the avatar as the URL is typed. The input stays the form
  // field of record — the server reads it from FormData like every other.
  const [githubUrl, setGithubUrl] = useState("");
  const [useGithubAvatar, setUseGithubAvatar] = useState(false);
  const githubUser = parseGithubUsername(githubUrl);
  const inputClassName = "h-12 px-4";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    if (file) {
      setPhotoName(file.name);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoName(null);
      setPhotoPreview(null);
    }
  };

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    if (photoInputRef.current) photoInputRef.current.value = "";
    setPhotoName(null);
    setPhotoPreview(null);
  };

  // --- Phone-book contact picker (mobile) ---
  const hrContactsRef = useRef<HTMLTextAreaElement>(null);
  const [contactsSupported, setContactsSupported] = useState(false);

  useEffect(() => {
    setContactsSupported(
      typeof navigator !== "undefined" &&
        "contacts" in navigator &&
        "ContactsManager" in window
    );
  }, []);

  const pickFromPhoneBook = async () => {
    const mgr = (
      navigator as Navigator & { contacts?: ContactsManager }
    ).contacts;
    if (!mgr) return;
    try {
      const picked = await mgr.select(["name", "tel", "email"], {
        multiple: true,
      });
      if (!picked || picked.length === 0) return;

      const lines = picked.map((c) =>
        [c.name?.[0] || "", c.tel?.[0] || "", c.email?.[0] || ""]
          .map((s) => s.trim())
          .filter(Boolean)
          .join(" · ")
      );

      const el = hrContactsRef.current;
      if (el) {
        const existing = el.value.trim();
        el.value = (existing ? existing + "\n" : "") + lines.join("\n");
      }
      toast.success(
        `Added ${picked.length} contact${picked.length > 1 ? "s" : ""} from your phone book.`
      );
    } catch {
      toast.error("Couldn't access your contacts.", {
        description: "You can also type them in manually below.",
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const fd = new FormData(event.currentTarget);
    const sp = new URLSearchParams(window.location.search);
    fd.set("utmSource", sp.get("utm_source") || "");
    fd.set("utmMedium", sp.get("utm_medium") || "");
    fd.set("utmCampaign", sp.get("utm_campaign") || "");
    fd.set("source", sp.get("source") || "alumni_form");
    fd.set("analyticsDistinctId", getAnalyticsDistinctId() || "");

    startTransition(async () => {
      try {
        const result = await submitAlumni(fd);
        if (result.success) {
          toast.success("Thank you!", { description: result.message });
          formRef.current?.reset();
          clearPhoto();
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
        <h2 className="text-2xl font-bold">Thank you for sharing!</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your details have been received. Our team will review them and may
          reach out. If you allowed public display, your testimonial will appear
          on our site once approved.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit another response
        </Button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? <p className="text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot. Hidden from people, not from bots that fill every input.
          aria-hidden + tabIndex keep it out of the accessibility tree and
          the tab order, so a screen-reader user never meets it. autoComplete
          off stops a browser helpfully filling it in. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* Section 1 — About you (private) */}
      <Section step={1} title="About you" hint="Kept private — for our placement team only" icon={User}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" required minLength={2} className={inputClassName} />
            {err("name")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" required className={inputClassName} />
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
              className={inputClassName}
            />
            {err("phone")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Current City / Location</Label>
            <Input id="city" name="city" placeholder="e.g. Pune, Bengaluru" className={inputClassName} />
            {err("city")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input id="linkedinUrl" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/..." className={inputClassName} />
            {err("linkedinUrl")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              type="url"
              placeholder="https://github.com/..."
              className={inputClassName}
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
            {err("githubUrl")}
          </div>
        </div>

        {/* Photo belongs here, with the other identity fields, rather than in
            the testimonial section where it used to sit. It identifies the
            person; it is not part of what they wrote about the course. */}
        <div className="mt-6 space-y-3">
          <Label htmlFor="photo">Photo (optional)</Label>

          {/* GitHub avatar opt-in. Offered for GitHub only — it publishes
              avatars at an unauthenticated URL, so this needs no API key and
              no scraping. LinkedIn has no equivalent; see
              lib/storage/github-avatar.ts for why. */}
          <label
            className={`flex items-start gap-3 rounded-lg border p-3 ${
              githubUser ? "cursor-pointer hover:bg-muted/40" : "opacity-60"
            }`}
          >
            <input
              type="checkbox"
              name="useGithubAvatar"
              className="mt-0.5 h-4 w-4 shrink-0"
              disabled={!githubUser}
              checked={useGithubAvatar}
              onChange={(e) => {
                setUseGithubAvatar(e.target.checked);
                // Ticking the box discards any file already chosen, so the
                // form only ever offers one photo to the server.
                if (e.target.checked) clearPhoto();
              }}
            />
            <span className="text-sm">
              <span className="font-medium">Use my GitHub profile photo</span>
              <span className="block text-xs text-muted-foreground">
                {githubUser
                  ? `We'll copy the avatar from github.com/${githubUser} and store it with your entry.`
                  : "Add your GitHub URL above to enable this."}
              </span>
            </span>
            {githubUser && useGithubAvatar && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://github.com/${githubUser}.png?size=96`}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                className="ml-auto h-12 w-12 shrink-0 rounded-full border object-cover"
              />
            )}
          </label>

          {!useGithubAvatar && (
            <>
              <input
                ref={photoInputRef}
                id="photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="sr-only"
                onChange={handlePhotoChange}
              />
              <div className="flex items-center gap-3">
                {photoPreview ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={photoPreview}
                    alt="Selected photo preview"
                    className="h-12 w-12 rounded-full border object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 gap-2"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {photoName ? "Change photo" : "Browse…"}
                </Button>
                {photoName && (
                  <button
                    type="button"
                    onClick={clearPhoto}
                    title="Remove photo"
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {photoName ?? "JPG, PNG, WebP or AVIF — up to 5 MB."}
              </p>
            </>
          )}
          {err("photo")}
        </div>
      </Section>

      {/* Section 2 — Your career now */}
      <Section step={2} title="Your career now" hint="Helps us showcase outcomes and build salary insights" icon={Briefcase}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="courseTaken">Course taken at Archer</Label>
            <select id="courseTaken" name="courseTaken" className={selectClass} defaultValue="">
              <option value="">Select a course</option>
              {courseTitles.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
              <option value="Other">Other</option>
            </select>
            {err("courseTaken")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="completionYear">Year completed / batch</Label>
            <Input id="completionYear" name="completionYear" placeholder="e.g. 2021" className={inputClassName} />
            {err("completionYear")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentCompany">Current Company *</Label>
            <Input id="currentCompany" name="currentCompany" required className={inputClassName} />
            {err("currentCompany")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentRole">Current Job Title / Role</Label>
            <Input id="currentRole" name="currentRole" placeholder="e.g. Software Engineer" className={inputClassName} />
            {err("currentRole")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageBand">
              Current Package <span className="text-xs font-normal text-muted-foreground">(private)</span>
            </Label>
            <select id="packageBand" name="packageBand" className={selectClass} defaultValue="">
              <option value="">Select a range</option>
              {ALUMNI_PACKAGE_BANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {err("packageBand")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Total years of experience</Label>
            <Input id="yearsExperience" name="yearsExperience" placeholder="e.g. 3" className={inputClassName} />
            {err("yearsExperience")}
          </div>
        </div>
      </Section>

      {/* Section 3 — Help place current students */}
      <Section step={3} title="Help us place current students" hint="Optional — many alumni refer or hire the next batch" icon={Handshake}>
        <div className="space-y-4">
          <label className="flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/40">
            <input type="checkbox" name="openToReferrals" className="mt-0.5 h-4 w-4" />
            <span>I&apos;m open to <strong>referring</strong> Archer students at my company.</span>
          </label>
          <label className="flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/40">
            <input type="checkbox" name="companyHiring" className="mt-0.5 h-4 w-4" />
            <span>My company is <strong>hiring</strong> — I can be a contact point.</span>
          </label>
          <div className="space-y-2">
            <Label htmlFor="hiringRoles">Roles / skills your company hires for</Label>
            <Textarea
              id="hiringRoles"
              name="hiringRoles"
              rows={2}
              placeholder="e.g. Java backend, React, DevOps freshers..."
              className="px-4 py-3"
            />
            {err("hiringRoles")}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="hrContacts">
                HR contacts you can connect with / HR contacts in your phone book
              </Label>
              {contactsSupported && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={pickFromPhoneBook}
                >
                  <BookUser className="h-4 w-4" />
                  Add from phone book
                </Button>
              )}
            </div>
            <Textarea
              ref={hrContactsRef}
              id="hrContacts"
              name="hrContacts"
              rows={4}
              placeholder={
                "Share any HR / hiring contacts who can help place our students — one per line:\nName · Phone · Email\ne.g. Priya S. · 98765XXXXX · priya.hr@XXXXX.com"
              }
              className="px-4 py-3"
            />
            <p className="text-xs text-muted-foreground">
              Optional. On a mobile phone, tap{" "}
              <strong>Add from phone book</strong> to pick HR contacts directly,
              or type the name, phone, and email. Kept strictly private.
            </p>
            {err("hrContacts")}
          </div>
        </div>
      </Section>

      {/* Section 4 — Testimonial (public after approval) */}
      <Section step={4} title="Your testimonial" hint="Shown publicly only after you consent & we approve" icon={MessageSquareQuote}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rating">Your rating</Label>
            <select id="rating" name="rating" className={selectClass} defaultValue="5">
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
              ))}
            </select>
            {err("rating")}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Label htmlFor="testimonialContent">Your experience at Archer Infotech</Label>
          <Textarea
            id="testimonialContent"
            name="testimonialContent"
            rows={5}
            placeholder="What did the training and placement support do for your career?"
            className="px-4 py-3"
          />
          {err("testimonialContent")}
        </div>
        <div className="mt-6 space-y-3 rounded-lg border bg-muted/30 p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Consent
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="consentDisplayPublic" className="mt-0.5 h-4 w-4" />
            <span>
              I allow Archer Infotech to <strong>publish my testimonial</strong>{" "}
              (name, role, company, and photo) on its website and marketing.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="consentSharePartners" className="mt-0.5 h-4 w-4" />
            <span>
              I allow Archer Infotech to <strong>share my profile with hiring
              partners</strong> for referrals and opportunities.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="lookingForJobChange" className="mt-0.5 h-4 w-4" />
            <span>
              I&apos;m <strong>looking for a job change</strong> — please
              consider me for relevant openings from your recruiters.
            </span>
          </label>
        </div>
      </Section>

      <div className="sticky bottom-4 z-10">
        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="h-12 w-full text-base font-semibold shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit my details"
          )}
        </Button>
      </div>
    </form>
  );
}
