"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Eye, EyeOff, Star, Quote, Link2, ExternalLink } from "lucide-react";
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
  createTestimonial,
  updateTestimonial,
  type TestimonialFormData,
} from "@/lib/actions/testimonials";
import type { Testimonial } from "@/db";
import { toast } from "sonner";

type TestimonialFormState = {
  name: string;
  role: string;
  company: string;
  courseTaken: string;
  content: string;
  rating: number | "";
  photoUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  placedAt: string;
  isHighlighted: boolean;
  isPublished: boolean;
};

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState<TestimonialFormState>({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    company: testimonial?.company || "",
    courseTaken: testimonial?.courseTaken || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating ?? 5,
    photoUrl: testimonial?.photoUrl || "",
    linkedinUrl: testimonial?.linkedinUrl || "",
    githubUrl: testimonial?.githubUrl || "",
    placedAt: testimonial?.placedAt || "",
    isHighlighted: testimonial?.isHighlighted ?? false,
    isPublished: testimonial?.isPublished ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    const payload: TestimonialFormData = {
      name: formData.name,
      role: formData.role,
      company: formData.company,
      courseTaken: formData.courseTaken,
      content: formData.content,
      rating: formData.rating === "" ? undefined : formData.rating,
      photoUrl: formData.photoUrl,
      linkedinUrl: formData.linkedinUrl,
      githubUrl: formData.githubUrl,
      placedAt: formData.placedAt,
      isHighlighted: formData.isHighlighted,
      isPublished: formData.isPublished,
    };

    try {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, payload)
        : await createTestimonial(payload);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/testimonials");
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

  const isEditing = !!testimonial;
  const fallbackInitials = formData.name
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
              <CardTitle>Testimonial Content</CardTitle>
              <CardDescription>
                Capture the student quote and supporting details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter student name"
                    className={fieldErrors.name ? "border-red-500" : ""}
                  />
                  {fieldErrors.name && (
                    <p className="text-sm text-red-500">{fieldErrors.name[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rating: e.target.value === "" ? "" : Number(e.target.value),
                      }))
                    }
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, role: e.target.value }))
                    }
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="Placed company"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                  <Label htmlFor="placedAt">Placed At</Label>
                  <Input
                    id="placedAt"
                    value={formData.placedAt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, placedAt: e.target.value }))
                    }
                    placeholder="e.g. Capgemini"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonial *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Write the testimonial content"
                  rows={6}
                  className={fieldErrors.content ? "border-red-500" : ""}
                />
                {fieldErrors.content && (
                  <p className="text-sm text-red-500">{fieldErrors.content[0]}</p>
                )}
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
                    {formData.isHighlighted ? "Shown as featured" : "Regular testimonial"}
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
                    {isEditing ? "Update Testimonial" : "Save Testimonial"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, photoUrl: e.target.value }))
                  }
                  placeholder="https://example.com/photo.jpg"
                  className={fieldErrors.photoUrl ? "border-red-500" : ""}
                />
                {fieldErrors.photoUrl && (
                  <p className="text-sm text-red-500">{fieldErrors.photoUrl[0]}</p>
                )}
              </div>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={formData.photoUrl || undefined} alt={formData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {fallbackInitials || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold">{formData.name || "Student name"}</div>
                  <div className="text-sm text-muted-foreground">
                    {formData.role || "Role"}{formData.company ? ` at ${formData.company}` : ""}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-4">
                &ldquo;{formData.content || "Testimonial preview"}&rdquo;
              </p>

              <div className="flex items-center gap-1">
                {Array.from({ length: formData.rating || 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {formData.isPublished ? (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{formData.isPublished ? "Published" : "Draft"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.isHighlighted ? "Highlighted" : "Standard listing"}</span>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
