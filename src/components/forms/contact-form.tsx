"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .max(10, "Please enter a valid 10-digit phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  courses: z.array(z.string()).optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const inputClassName = "h-12 px-4";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFormStart = () => {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    captureAnalyticsEvent("contact_form_started", {
      form_name: "contact",
      source: "contact_form",
      current_path: window.location.pathname,
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;
    const analyticsDistinctId = getAnalyticsDistinctId();
    const currentPath = window.location.pathname;
    const referrer = document.referrer || undefined;
    const courseInterest =
      selectedCourses.length > 0 ? selectedCourses.join(", ") : undefined;

    try {
      const result = await submitLead({
        name: data.name,
        email: data.email || "",
        phone: data.phone,
        message: data.message,
        course: courseInterest,
        source: "contact_form",
        utmSource,
        utmMedium,
        utmCampaign,
        analyticsDistinctId,
        currentPath,
        referrer,
      });

      if (result.success) {
        captureAnalyticsEvent("contact_form_submitted", {
          form_name: "contact",
          source: "contact_form",
          current_path: currentPath,
          course_count: selectedCourses.length,
          has_email: Boolean(data.email),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
        });
        toast.success("Thank you for contacting us!", {
          description: result.message,
        });
        reset();
        setSelectedCourses([]);
        setHasStarted(false);
      } else {
        captureAnalyticsEvent("contact_form_submission_failed", {
          form_name: "contact",
          source: "contact_form",
          current_path: currentPath,
          error_message: result.message,
        });
        toast.error("Error", {
          description: result.message,
        });
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={handleFormStart}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            className={inputClassName}
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={inputClassName}
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            className={inputClassName}
            {...register("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="course">Courses Interested In</Label>
          <CourseSelect
            value={selectedCourses}
            onValueChange={(value) => {
              setSelectedCourses(value);
              setValue("courses", value);
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your requirements..."
          rows={5}
          className="px-4 py-3"
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full px-6 text-base font-semibold md:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground"
      >
        {isSubmitting ? (
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
