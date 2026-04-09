"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Eye, EyeOff, Star, Building, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  createPlacement,
  updatePlacement,
  type PlacementFormData,
} from "@/lib/actions/placements";
import type { Placement } from "@/db";
import { toast } from "sonner";

type PlacementFormState = {
  studentName: string;
  company: string;
  designation: string;
  package: string;
  courseTaken: string;
  batchYear: number | "";
  photoUrl: string;
  linkedinUrl: string;
  testimonial: string;
  isHighlighted: boolean;
  isPublished: boolean;
};

interface PlacementFormProps {
  placement?: Placement | null;
}

export function PlacementForm({ placement }: PlacementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<PlacementFormState>({
    studentName: placement?.studentName || "",
    company: placement?.company || "",
    designation: placement?.designation || "",
    package: placement?.package || "",
    courseTaken: placement?.courseTaken || "",
    batchYear: placement?.batchYear ?? "",
    photoUrl: placement?.photoUrl || "",
    linkedinUrl: placement?.linkedinUrl || "",
    testimonial: placement?.testimonial || "",
    isHighlighted: placement?.isHighlighted ?? false,
    isPublished: placement?.isPublished ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    const payload: PlacementFormData = {
      studentName: formData.studentName,
      company: formData.company,
      designation: formData.designation,
      package: formData.package,
      courseTaken: formData.courseTaken,
      batchYear: formData.batchYear === "" ? undefined : formData.batchYear,
      photoUrl: formData.photoUrl,
      linkedinUrl: formData.linkedinUrl,
      testimonial: formData.testimonial,
      isHighlighted: formData.isHighlighted,
      isPublished: formData.isPublished,
    };

    try {
      const result = placement
        ? await updatePlacement(placement.id, payload)
        : await createPlacement(payload);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/placements");
        router.refresh();
      } else {
        setError(result.message);
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        toast.error(result.message);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!placement;
  const fallbackInitials = formData.studentName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
              <CardTitle>Placement Details</CardTitle>
              <CardDescription>
                Capture the student, company, and role information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, studentName: e.target.value }))
                  }
                  placeholder="Enter student name"
                  className={fieldErrors.studentName ? "border-red-500" : ""}
                />
                {fieldErrors.studentName && (
                  <p className="text-sm text-red-500">{fieldErrors.studentName[0]}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="Placed company"
                    className={fieldErrors.company ? "border-red-500" : ""}
                  />
                  {fieldErrors.company && (
                    <p className="text-sm text-red-500">{fieldErrors.company[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, designation: e.target.value }))
                    }
                    placeholder="Job title"
                    className={fieldErrors.designation ? "border-red-500" : ""}
                  />
                  {fieldErrors.designation && (
                    <p className="text-sm text-red-500">{fieldErrors.designation[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="package">Package</Label>
                  <Input
                    id="package"
                    value={formData.package}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, package: e.target.value }))
                    }
                    placeholder="e.g. 8 LPA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchYear">Batch Year</Label>
                  <Input
                    id="batchYear"
                    type="number"
                    value={formData.batchYear}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        batchYear: e.target.value === "" ? "" : Number(e.target.value),
                      }))
                    }
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseTaken">Course Taken</Label>
                <Input
                  id="courseTaken"
                  value={formData.courseTaken}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, courseTaken: e.target.value }))
                  }
                  placeholder="e.g. Full Stack Development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, testimonial: e.target.value }))
                  }
                  placeholder="Optional student quote or placement note"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="isPublished">Publish</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isPublished ? "Visible on the site" : "Saved as draft"}
                  </p>
                </div>
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isPublished: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="isHighlighted">Highlight</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isHighlighted ? "Shown as featured" : "Regular placement"}
                  </p>
                </div>
                <Switch
                  id="isHighlighted"
                  checked={formData.isHighlighted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isHighlighted: checked }))
                  }
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
                    {isEditing ? "Update Placement" : "Save Placement"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={formData.photoUrl || undefined} alt={formData.studentName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {fallbackInitials || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold">{formData.studentName || "Student name"}</div>
                  <div className="text-sm text-muted-foreground">
                    {formData.designation || "Designation"} at {formData.company || "Company"}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.company || "Company"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.designation || "Designation"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.isHighlighted ? "Highlighted" : "Standard listing"}</span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.isPublished ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{formData.isPublished ? "Published" : "Draft"}</span>
                </div>
              </div>

              {formData.photoUrl && (
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={formData.photoUrl}
                    alt={formData.studentName || "Placement preview"}
                    className="h-40 w-full object-cover"
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
