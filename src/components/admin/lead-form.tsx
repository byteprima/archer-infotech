"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CoursePickerField } from "@/components/admin/course-picker-field";
import { EXPERIENCE_LEVEL_OPTIONS } from "@/lib/leads/experience-level";
import { createLead, updateLead, type LeadUpdateData } from "@/lib/actions/admin-leads";
import type { Lead } from "@/db/schema";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  isLeadStatus,
  type LeadStatus,
} from "@/lib/leads/lifecycle";
import {
  MODE_PREFERENCE_OPTIONS,
  MODE_PREFERENCE_LABELS,
} from "@/components/forms/mode-preference-field";

interface LeadFormProps {
  lead?: Lead;
}

function formatDateTimeLocal(value: Date | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function LeadForm({ lead }: LeadFormProps) {
  const router = useRouter();
  const isEditing = Boolean(lead);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<LeadUpdateData>({
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    courseInterest: lead?.courseInterest || "",
    experienceLevel: (lead?.experienceLevel as LeadUpdateData["experienceLevel"]) || "",
    message: lead?.message || "",
    source: lead?.source || (isEditing ? "" : "manual"),
    // Unknown values fall back to NEW rather than being preserved: the
    // select below can only render known statuses, so keeping an unmatched
    // one would silently rewrite it to the first option on the next save.
    status: isLeadStatus(lead?.status ?? "") ? (lead!.status as LeadStatus) : "NEW",
    notes: lead?.notes || "",
    assignedTo: lead?.assignedTo || "",
    followUpDate: formatDateTimeLocal(lead?.followUpDate ?? null),
    // Counsellor-filled. The website never asks a visitor for any of these —
    // see counsellorFields in lib/actions/admin-leads.ts.
    altPhone: lead?.altPhone || "",
    qualification: lead?.qualification || "",
    college: lead?.college || "",
    passingYear: lead?.passingYear ?? "",
    currentStatus: lead?.currentStatus || "",
    preferredTiming: lead?.preferredTiming || "",
    expectedJoining: lead?.expectedJoining || "",
    modePreference: lead?.modePreference || "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const result = lead ? await updateLead(lead.id, formData) : await createLead(formData);

      if (!result.success) {
        setError(result.message);
        setFieldErrors(result.errors || {});
        return;
      }

      if (lead) {
        router.refresh();
      } else if (result.id) {
        router.push(`/admin/leads/${result.id}`);
      } else {
        router.push("/admin/leads");
      }
    } catch {
      setError("Something went wrong while saving the lead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, name: event.target.value }))
                  }
                />
                {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, email: event.target.value }))
                  }
                />
                {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, phone: event.target.value }))
                  }
                />
                {fieldErrors.phone && <p className="text-sm text-red-500">{fieldErrors.phone[0]}</p>}
              </div>
              <div className="space-y-2">
                <CoursePickerField
                  id="courseInterest"
                  label="Course Interest"
                  value={formData.courseInterest || ""}
                  onChange={(courseInterest) =>
                    setFormData((current) => ({ ...current, courseInterest }))
                  }
                  customHint="Anything the caller asked about that isn't in the catalogue."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Fresher / Experienced</Label>
                <select
                  id="experienceLevel"
                  value={formData.experienceLevel || ""}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      experienceLevel: event.target
                        .value as LeadUpdateData["experienceLevel"],
                    }))
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {/* Blank stays available: leads captured before this field
                      existed, and phone enquiries where nobody asked. */}
                  <option value="">Not recorded</option>
                  {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {fieldErrors.experienceLevel && (
                  <p className="text-sm text-red-500">{fieldErrors.experienceLevel[0]}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, message: event.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Everything below comes out of the counselling call, never from a
              website form: a visitor enquiring about a course gives name,
              mobile, email, mode and fresher/experienced, and nothing else. */}
          <Card>
            <CardHeader>
              <CardTitle>Education &amp; Preferences</CardTitle>
              <p className="text-sm text-muted-foreground">
                Filled in by the counsellor. Not asked on the website.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={formData.qualification || ""}
                  placeholder="B.E. Computer Science"
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, qualification: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  value={formData.college || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, college: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingYear">Passing year</Label>
                <Input
                  id="passingYear"
                  type="number"
                  min={1950}
                  max={2100}
                  value={formData.passingYear === "" ? "" : String(formData.passingYear)}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      passingYear: event.target.value === "" ? "" : Number(event.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentStatus">Current status</Label>
                <Input
                  id="currentStatus"
                  value={formData.currentStatus || ""}
                  placeholder="Final year student / Working / Career break"
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, currentStatus: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="altPhone">Alternate phone</Label>
                <Input
                  id="altPhone"
                  value={formData.altPhone || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, altPhone: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modePreference">Mode preference</Label>
                <select
                  id="modePreference"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={formData.modePreference || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, modePreference: event.target.value }))
                  }
                >
                  <option value="">Not stated</option>
                  {MODE_PREFERENCE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {MODE_PREFERENCE_LABELS[option] ?? option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTiming">Preferred timing</Label>
                <Input
                  id="preferredTiming"
                  value={formData.preferredTiming || ""}
                  placeholder="Weekend / Evening after 7pm"
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, preferredTiming: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedJoining">Expected joining</Label>
                <Input
                  id="expectedJoining"
                  value={formData.expectedJoining || ""}
                  placeholder="Next month / After exams"
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, expectedJoining: event.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      status: event.target.value as LeadUpdateData["status"],
                    }))
                  }
                  className="h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {LEAD_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {LEAD_STATUS_LABELS[value]}
                    </option>

                  ))}

                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, source: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  value={formData.assignedTo || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, assignedTo: event.target.value }))
                  }
                  placeholder="Counselor or team member"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="datetime-local"
                  value={formData.followUpDate || ""}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      followUpDate: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={6}
                  value={formData.notes || ""}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, notes: event.target.value }))
                  }
                  placeholder="Internal notes about this lead"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Save Changes" : "Add Lead"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
