"use client";

/**
 * "Ask Archer Counsellor" — reusable enquiry dialog.
 *
 * A single client island that wraps the base-ui Dialog around a short
 * name + phone + course + message form. On submit it writes through the
 * same `submitLead` server action every other form uses, tagged
 * source="counselor_modal" so these enquiries are distinguishable in the
 * /admin/leads panel and in PostHog.
 *
 * It's deliberately presentation-agnostic: the trigger look is supplied
 * by the call site via `triggerClassName` / `triggerLabel` / `triggerIcon`
 * so the same dialog backs the homepage hero CTA, the course-page enquiry
 * card, and the sitewide floating button (see counselor-fab.tsx).
 *
 * `defaultCourse` pre-fills the course field on course pages so the
 * counsellor sees which course the visitor is asking about.
 */

import { useEffect, useState, useTransition } from "react";
import { Loader2, MessageCircleQuestion } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitLead } from "@/lib/actions/leads";
import {
  captureAnalyticsEvent,
  getAnalyticsDistinctId,
} from "@/lib/posthog/client";
import { trackMetaPixelEvent, newMetaEventId } from "@/lib/meta-pixel/client";

interface CounselorDialogProps {
  /** Analytics location tag, e.g. "homepage_hero" or "course_hero_card". */
  location: string;
  /** Visible trigger text. Defaults to "Ask Archer Counsellor". */
  triggerLabel?: string;
  /** Tailwind classes for the trigger button so it matches the surrounding CTAs. */
  triggerClassName?: string;
  /** Optional leading icon node for the trigger. */
  triggerIcon?: React.ReactNode;
  /** Pre-fills the course field (course pages pass the course title). */
  defaultCourse?: string;
  /**
   * Start opened on mount. Used by the lazy wrapper (counselor-dialog-lazy)
   * so a cold click that both loads the chunk and opens the dialog doesn't
   * require a second click. Fires the same "opened" analytics event.
   */
  defaultOpen?: boolean;
}

type FieldErrors = Partial<Record<"name" | "phone" | "message", string>>;

export function CounselorDialog({
  location,
  triggerLabel = "Ask Archer Counsellor",
  triggerClassName,
  triggerIcon,
  defaultCourse,
  defaultOpen = false,
}: CounselorDialogProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});

  // When mounted already-open (lazy auto-open path), the open goes through
  // useState init rather than handleOpenChange, so fire the analytics here.
  useEffect(() => {
    if (defaultOpen) {
      captureAnalyticsEvent("counselor_dialog_opened", {
        source: "counselor_modal",
        location,
        course_interest: defaultCourse,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setErrors({});
      captureAnalyticsEvent("counselor_dialog_opened", {
        source: "counselor_modal",
        location,
        course_interest: defaultCourse,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const fd = new FormData(event.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").replace(/\D/g, "");
    const course = String(fd.get("course") || "").trim();
    const typedMessage = String(fd.get("message") || "").trim();

    // The lead schema no longer requires a message, but an empty one tells the
    // counsellor nothing. Counsellor enquiries are often just a callback
    // request, so when the visitor leaves the box empty we still synthesise a
    // descriptive default for the admin lead list.
    const message =
      typedMessage ||
      `Counsellor callback request via website${course ? ` about ${course}` : ""}.`;

    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;
    const analyticsDistinctId = getAnalyticsDistinctId();
    const currentPath = window.location.pathname;
    const referrer = document.referrer || undefined;
    const courseInterest = course || undefined;

    const metaEventId = newMetaEventId();
    const metaContentCategory = courseInterest || "general";

    startTransition(async () => {
      try {
        const result = await submitLead({
          name,
          email: "",
          phone,
          message,
          course: courseInterest,
          source: "counselor_modal",
          utmSource,
          utmMedium,
          utmCampaign,
          analyticsDistinctId,
          currentPath,
          referrer,
          meta: {
            eventId: metaEventId,
            eventName: "Lead",
            contentName: "Ask Counsellor",
            contentCategory: metaContentCategory,
            sourceUrl: window.location.href,
          },
        });

        if (result.success) {
          captureAnalyticsEvent("counselor_dialog_submitted", {
            source: "counselor_modal",
            location,
            course_interest: courseInterest,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
          });
          trackMetaPixelEvent(
            "Lead",
            {
              content_name: "Ask Counsellor",
              content_category: metaContentCategory,
            },
            metaEventId,
          );
          toast.success("Thank you! Our counsellor will call you shortly.", {
            description: result.message,
          });
          setOpen(false);
        } else {
          if (result.errors) {
            const fieldErrors: FieldErrors = {};
            for (const [k, v] of Object.entries(result.errors)) {
              if (Array.isArray(v) && v[0]) {
                fieldErrors[k as keyof FieldErrors] = v[0];
              }
            }
            setErrors(fieldErrors);
          }
          captureAnalyticsEvent("counselor_dialog_submission_failed", {
            source: "counselor_modal",
            location,
            error_message: result.message,
          });
          toast.error("Error", { description: result.message });
        }
      } catch {
        captureAnalyticsEvent("counselor_dialog_submission_failed", {
          source: "counselor_modal",
          location,
          error_message: "unexpected_error",
        });
        toast.error("Error", {
          description: "Something went wrong. Please try again later.",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={triggerClassName}>
        {triggerIcon ?? <MessageCircleQuestion className="h-5 w-5" />}
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ask an Archer Counsellor</DialogTitle>
          <DialogDescription>
            Share your details and our counsellor will call you back during
            working hours (Mon–Sat, 9 AM–8 PM). It&apos;s free, no obligation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="counselor-name">Full Name *</Label>
            <Input
              id="counselor-name"
              name="name"
              placeholder="Enter your name"
              required
              minLength={2}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="counselor-phone">Phone Number *</Label>
            <Input
              id="counselor-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="10-digit phone number"
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

          <div className="space-y-1.5">
            <Label htmlFor="counselor-course">Course of Interest</Label>
            <Input
              id="counselor-course"
              name="course"
              placeholder="e.g. Java Full Stack"
              defaultValue={defaultCourse}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="counselor-message">Your Question (optional)</Label>
            <Textarea
              id="counselor-message"
              name="message"
              placeholder="Ask about fees, batch timings, placement, eligibility…"
              rows={3}
            />
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose
              render={<Button type="button" variant="outline" />}
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Request Callback"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
