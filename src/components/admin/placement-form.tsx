"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  Eye,
  EyeOff,
  Star,
  Building,
  Briefcase,
  Link2,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
// lucide-react ships no GitHub mark; the repo keeps its own.
import { GitHubIcon } from "@/components/common/social-icons";
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
import { CoursePickerField } from "@/components/admin/course-picker-field";
import {
  createPlacement,
  updatePlacement,
  fetchPlacementGithubPhoto,
  uploadPlacementPhoto,
  uploadPlacementProof,
  type PlacementFormData,
} from "@/lib/actions/placements";
import { parseGithubUsername } from "@/lib/github-username";
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
  githubUrl: string;
  testimonial: string;
  instituteNote: string;
  proofFilename: string;
  proofType: string;
  verified: boolean;
  consentDisplayName: boolean;
  consentDisplaySalary: boolean;
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
  const [proofUploading, setProofUploading] = useState(false);
  const [proofMessage, setProofMessage] = useState<string | null>(null);
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
    githubUrl: placement?.githubUrl || "",
    testimonial: placement?.testimonial || "",
    instituteNote: placement?.instituteNote || "",
    proofFilename: placement?.proofFilename || "",
    proofType: placement?.proofType || "",
    verified: Boolean(placement?.verifiedAt),
    consentDisplayName: placement?.consentDisplayName ?? false,
    consentDisplaySalary: placement?.consentDisplaySalary ?? false,
    isHighlighted: placement?.isHighlighted ?? false,
    isPublished: placement?.isPublished ?? true,
  });

  // Photo resolution. Both the GitHub copy and the local upload end up as a
  // stored URL in `photoUrl`, so the save payload stays plain JSON.
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoBusy, setPhotoBusy] = useState<false | "github" | "upload">(false);
  const [photoStatus, setPhotoStatus] = useState<
    { ok: boolean; message: string } | null
  >(null);

  const githubUser = parseGithubUsername(formData.githubUrl);

  const handleGithubPhoto = async () => {
    setPhotoBusy("github");
    setPhotoStatus(null);
    const result = await fetchPlacementGithubPhoto(formData.githubUrl);
    if (result.success) {
      setFormData((prev) => ({ ...prev, photoUrl: result.url }));
    }
    setPhotoStatus({ ok: result.success, message: result.message });
    setPhotoBusy(false);
  };

  const handlePhotoUpload = async (file: File) => {
    setPhotoBusy("upload");
    setPhotoStatus(null);
    const fd = new FormData();
    fd.append("photo", file);
    const result = await uploadPlacementPhoto(fd);
    if (result.success) {
      setFormData((prev) => ({ ...prev, photoUrl: result.url }));
    }
    setPhotoStatus({ ok: result.success, message: result.message });
    setPhotoBusy(false);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

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
      githubUrl: formData.githubUrl,
      testimonial: formData.testimonial,
      instituteNote: formData.instituteNote,
      proofFilename: formData.proofFilename,
      proofType: formData.proofType,
      verified: formData.verified,
      consentDisplayName: formData.consentDisplayName,
      consentDisplaySalary: formData.consentDisplaySalary,
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
                <CoursePickerField
                  id="courseTaken"
                  label="Course Taken"
                  value={formData.courseTaken}
                  onChange={(courseTaken) =>
                    setFormData((prev) => ({ ...prev, courseTaken }))
                  }
                  customHint="Historical or one-off course names that aren't in the catalogue."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">Student&rsquo;s own words</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, testimonial: e.target.value }))
                  }
                  placeholder="Quote from the student, in their voice"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  What the student says about us. This is kept as a record of
                  the submission — to show it on the site, add it as a
                  Testimonial, which is what reaches the home page, the
                  testimonials page and the course pages.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instituteNote">Our note about this placement</Label>
                <Textarea
                  id="instituteNote"
                  value={formData.instituteNote}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, instituteNote: e.target.value }))
                  }
                  placeholder="What we want to say about this student, their placement and the course they took"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Written by us, in our voice. Shown only on the spotlight
                  card, which requires &ldquo;Highlight&rdquo; below.
                </p>
              </div>

              {/* Proof of employment. Private by construction: the file goes
                  into the "offer-letters" collection, which the public /media
                  route 404s, and only the admin media route can read it. The
                  document is never published — the public record carries the
                  attestation that it was checked, not the document. */}
              <div className="space-y-3 rounded-lg border border-primary/40 bg-primary/[0.05] p-4">
                <div>
                  <p className="text-sm font-medium">Proof of employment</p>
                  <p className="text-xs text-muted-foreground">
                    Offer letter, ID card, salary slip or similar. PDF or
                    image, up to 5 MB. Stored privately — never shown on the
                    site, and never served to anyone who is not signed in
                    here.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofType">What is it?</Label>
                  <select
                    id="proofType"
                    value={formData.proofType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, proofType: e.target.value }))
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="">Select…</option>
                    <option value="Offer letter">Offer letter</option>
                    <option value="Employee ID card">Employee ID card</option>
                    <option value="Salary slip">Salary slip</option>
                    <option value="Appointment letter">Appointment letter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proofFile">Upload</Label>
                  <Input
                    id="proofFile"
                    type="file"
                    accept="application/pdf,image/jpeg,image/png,image/webp,image/avif"
                    disabled={proofUploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setProofUploading(true);
                      setProofMessage(null);
                      const fd = new FormData();
                      fd.append("proof", file);
                      const res = await uploadPlacementProof(fd);
                      setProofUploading(false);
                      setProofMessage(res.message);
                      if (res.success) {
                        setFormData((prev) => ({
                          ...prev,
                          proofFilename: res.filename,
                        }));
                      }
                    }}
                  />
                  {proofUploading && (
                    <p className="text-xs text-muted-foreground">Uploading…</p>
                  )}
                  {proofMessage && (
                    <p className="text-xs text-muted-foreground">{proofMessage}</p>
                  )}
                  {formData.proofFilename && (
                    <p className="text-xs">
                      On file:{" "}
                      <a
                        href={`/admin/media/offer-letters/${formData.proofFilename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline underline-offset-4"
                      >
                        view (admin only)
                      </a>
                    </p>
                  )}
                </div>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    checked={formData.verified}
                    disabled={!formData.proofFilename}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, verified: e.target.checked }))
                    }
                  />
                  <span>
                    I have checked this document against the details above
                    <span className="block text-xs text-muted-foreground">
                      Only this tick makes the placement count as verified on
                      the public record. It cannot be set without a document
                      on file.
                    </span>
                  </span>
                </label>
              </div>

              {/* Consent is recorded per-row rather than assumed. A placement
                  typed in here has no submission behind it, so nothing may be
                  published under the student's real name or with their salary
                  unless someone confirms the student agreed. */}
              <div className="space-y-3 rounded-lg border border-amber-500/40 bg-amber-500/[0.06] p-4">
                <p className="text-sm font-medium">Student consent</p>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    checked={formData.consentDisplayName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        consentDisplayName: e.target.checked,
                      }))
                    }
                  />
                  <span>
                    Student agreed we may show their full name and photo
                    <span className="block text-xs text-muted-foreground">
                      Unticked, the record still appears but as
                      &ldquo;Rutuja G.&rdquo; with no photo.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    checked={formData.consentDisplaySalary}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        consentDisplaySalary: e.target.checked,
                      }))
                    }
                  />
                  <span>
                    Student agreed we may publish their salary figure
                    <span className="block text-xs text-muted-foreground">
                      Our public submission form promises the salary is never
                      published, so leave this unticked for anyone who applied
                      through it. The cohort range still includes them.
                    </span>
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order matters here: the two profile links come first because
                  the photo block reads the GitHub URL to offer its avatar —
                  asking for it after the button that depends on it read
                  backwards. Status sits at the end, reporting on whichever
                  photo route was used. */}
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))
                  }
                  placeholder="https://linkedin.com/in/..."
                  className={fieldErrors.linkedinUrl ? "border-red-500" : ""}
                />
                {fieldErrors.linkedinUrl && (
                  <p className="text-sm text-red-500">{fieldErrors.linkedinUrl[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
                  }
                  placeholder="https://github.com/..."
                  className={fieldErrors.githubUrl ? "border-red-500" : ""}
                />
                {fieldErrors.githubUrl && (
                  <p className="text-sm text-red-500">{fieldErrors.githubUrl[0]}</p>
                )}
              </div>

              {/* Photo — pull it from the GitHub profile above, or browse for
                  a file. Either route stores the image on the media volume and
                  writes its URL into the field below. */}
              <div className="space-y-3 rounded-lg border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Photo</p>
                    <p className="text-xs text-muted-foreground">
                      Stored on the media volume, so it survives redeploys.
                    </p>
                  </div>
                  {formData.photoUrl ? (
                    <Avatar className="h-12 w-12 shrink-0 border">
                      <AvatarImage src={formData.photoUrl} alt="" />
                      <AvatarFallback>{fallbackInitials || "?"}</AvatarFallback>
                    </Avatar>
                  ) : null}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!githubUser || photoBusy !== false}
                  onClick={handleGithubPhoto}
                >
                  {photoBusy === "github" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <GitHubIcon className="mr-2 h-4 w-4" />
                  )}
                  {githubUser
                    ? `Use photo from github.com/${githubUser}`
                    : "Add a GitHub URL above to pull the photo"}
                </Button>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  disabled={photoBusy !== false}
                  onClick={() => photoInputRef.current?.click()}
                >
                  {photoBusy === "upload" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Browse for a photo…
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Photo URL</Label>
                  <Input
                    id="photoUrl"
                    value={formData.photoUrl}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, photoUrl: e.target.value }));
                      setPhotoStatus(null);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className={fieldErrors.photoUrl ? "border-red-500" : ""}
                  />
                  {fieldErrors.photoUrl && (
                    <p className="text-sm text-red-500">{fieldErrors.photoUrl[0]}</p>
                  )}
                </div>
              </div>

              {/* Status — below the whole links section. */}
              {photoStatus && (
                <div
                  role="status"
                  className={`flex items-start gap-2 rounded-md border p-2 text-xs ${
                    photoStatus.ok
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
                  }`}
                >
                  {photoStatus.ok ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  <span>{photoStatus.message}</span>
                </div>
              )}
            </CardContent>
          </Card>

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
                {formData.linkedinUrl && (
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{formData.linkedinUrl}</span>
                  </div>
                )}
                {formData.githubUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{formData.githubUrl}</span>
                  </div>
                )}
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
