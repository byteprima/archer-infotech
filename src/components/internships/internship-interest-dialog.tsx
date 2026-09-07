"use client";

/**
 * Internship interest popup.
 *
 * Feeds the SAME pipeline as /contact (submitLead -> leads table), tagged
 * `source: "internship_interest"` so the admin lead list can segment it.
 *
 * The leads table has no internship-specific columns and adding six would be
 * the wrong trade: they are only ever read by a human triaging an enquiry.
 * So the internship answers are folded into `message` as labelled lines,
 * which is the same approach the offer popup takes, and the chosen track goes
 * into `course` where the admin list already surfaces it.
 *
 * Deliberately not auto-opening. An internship is a considered decision and
 * this page is long; a timed interstitial over it would interrupt the reading
 * that does the actual convincing. It opens only when someone asks for it.
 */

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/actions/leads";
import { ModePreferenceField } from "@/components/forms/mode-preference-field";
import {
  captureAnalyticsEvent,
  type AnalyticsProperties,
} from "@/lib/posthog/client";

const PROGRAMMES = [
  "Diploma",
  "BCA",
  "BSc (CS / IT)",
  "B.E. / B.Tech",
  "MCA",
  "Other",
] as const;

const PATHS = [
  "Academic Internship / OJT (4–16 weeks)",
  "3-Month Skill + Project Internship",
  "MCA Final-Semester Internship / Project",
  "6-Month Job-Ready Internship",
  "Not sure yet — please advise",
] as const;

const TRACKS = [
  "Java Full Stack Development",
  "Python Full Stack Development",
  "MERN Stack Development",
  ".NET Full Stack Development",
  "Data Analytics",
  "Data Science & Machine Learning",
  "Generative AI / LLM",
  "Software Testing & QA",
  "QA Automation (Selenium / Playwright)",
  "Cloud & DevOps",
  "React / Next.js Frontend",
  "Data Engineering",
  "Agentic AI Engineering",
  "Mobile App Development",
  "AWS / Azure Cloud",
  "Salesforce Admin + Developer",
  "Not decided yet",
] as const;

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

export function InternshipInterestDialog({
  children,
  triggerClassName,
  defaultPath,
  defaultTrack,
  analyticsEvent,
  analyticsProperties,
}: {
  children: React.ReactNode;
  triggerClassName?: string;
  /**
   * Preselect the path/track the visitor was reading about when they clicked.
   * Someone who pressed "Apply for 6-Month Internship" has already told us
   * which one they mean; asking again wastes the goodwill that got them to
   * open the form.
   */
  defaultPath?: string;
  defaultTrack?: string;
  /**
   * Fired when the dialog OPENS, so the intent signal survives replacing the
   * old TrackedLink-to-/contact calls. Without this, moving collection into a
   * popup would have silently deleted `internship_apply_clicked`.
   */
  analyticsEvent?: string;
  analyticsProperties?: AnalyticsProperties;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const programme = String(fd.get("programme") || "").trim();
    const college = String(fd.get("college") || "").trim();
    const path = String(fd.get("path") || "").trim();
    const track = String(fd.get("track") || "").trim();
    const requirement = String(fd.get("requirement") || "").trim();

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^\d{10}$/.test(phone)) next.phone = "Enter a 10-digit mobile number.";
    if (!programme) next.programme = "Select your programme.";
    if (!path) next.path = "Select an internship path.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    setFormError(null);
    try {
      // Labelled lines rather than prose: whoever picks this up in the admin
      // list is scanning for the college requirement, not reading a paragraph.
      const message = [
        `Internship enquiry from the website.`,
        `Programme: ${programme}`,
        college ? `College: ${college}` : null,
        `Path: ${path}`,
        `Track: ${track || "Not decided yet"}`,
        requirement ? `College requirement: ${requirement}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const result = await submitLead({
        name,
        email,
        phone,
        course: track || path,
        modePreference: String(fd.get("modePreference") || ""),
        message,
        honeypot: String(fd.get("website") || ""),
        source: "internship_interest",
        utmSource: "site",
        utmMedium: "popup",
        utmCampaign: "internships",
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
    } catch {
      setFormError("We couldn't reach the server. Please call +91 9850 678451.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next && analyticsEvent) {
          captureAnalyticsEvent(analyticsEvent, analyticsProperties);
        }
        setOpen(next);
      }}
    >
      <DialogTrigger className={triggerClassName}>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {done ? (
          <div className="py-6 text-center">
            <DialogTitle className="text-xl">Thanks — we have it.</DialogTitle>
            <DialogDescription className="mt-3 text-base">
              A counsellor will call you on the number you gave, usually the
              same working day. If your college has a documentation format,
              keep it handy for that call.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Tell us what you need</DialogTitle>
              <DialogDescription>
                Two minutes. The more you tell us about your college
                requirement, the more useful the first call will be.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — hidden from people, filled by bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="int-name">Name *</Label>
                  <Input id="int-name" name="name" required />
                  {errors.name && (
                    <p className="text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="int-phone">Mobile *</Label>
                  <Input
                    id="int-phone"
                    name="phone"
                    inputMode="numeric"
                    maxLength={10}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="int-email">Email</Label>
                <Input id="int-email" name="email" type="email" />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="int-programme">Your programme *</Label>
                  <select
                    id="int-programme"
                    name="programme"
                    className={SELECT_CLASS}
                    required
                  >
                    <option value="">Select…</option>
                    {PROGRAMMES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.programme && (
                    <p className="text-xs text-red-600">{errors.programme}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="int-college">College</Label>
                  <Input id="int-college" name="college" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="int-path">Internship path *</Label>
                <select
                  id="int-path"
                  name="path"
                  className={SELECT_CLASS}
                  defaultValue={defaultPath ?? ""}
                  required
                >
                  <option value="">Select…</option>
                  {PATHS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.path && (
                  <p className="text-xs text-red-600">{errors.path}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="int-track">Technology track</Label>
                <select
                  id="int-track"
                  name="track"
                  className={SELECT_CLASS}
                  defaultValue={defaultTrack ?? ""}
                >
                  <option value="">Not decided yet</option>
                  {TRACKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <ModePreferenceField />

              <div className="space-y-1.5">
                <Label htmlFor="int-requirement">
                  Your college&rsquo;s requirement
                </Label>
                <Textarea
                  id="int-requirement"
                  name="requirement"
                  rows={3}
                  placeholder="Duration and hours required, domain, and the documentation format your college asks for."
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {pending ? "Sending…" : "Send my details"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                We use this only to contact you about the internship. Final
                credit acceptance is always decided by your college.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
