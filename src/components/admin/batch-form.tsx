"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, ArrowLeft, MapPin, Monitor } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteBatchButton } from "@/components/admin/batch-actions";
import { createBatch, updateBatch } from "@/lib/actions/batches";
import { batchFormSchema, type BatchFormData } from "@/lib/validations/batches";
import type { Batch } from "@/db/schema";
import { generateSlug } from "@/lib/utils/slug";
import { cn } from "@/lib/utils";
import { formatBatchStartDate } from "@/lib/utils/batches";

interface BatchFormProps {
  batch?: Batch | null;
}

function toDefaultValues(batch?: Batch | null): BatchFormData {
  return {
    courseSlug: batch?.courseSlug || "",
    courseName: batch?.courseName || "",
    startDate: formatBatchStartDate(batch?.startDate) || "",
    timing: batch?.timing || "",
    duration: batch?.duration || "",
    mode: batch?.mode || "offline",
    totalSeats: batch?.totalSeats ?? 15,
    seatsAvailable: batch?.seatsAvailable ?? batch?.totalSeats ?? 15,
    status: batch?.status || "upcoming",
    instructor: batch?.instructor || "",
    location: batch?.location || "",
    meetingLink: batch?.meetingLink || "",
  };
}

export function BatchForm({ batch }: BatchFormProps) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(Boolean(batch?.courseSlug));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BatchFormData>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: toDefaultValues(batch),
  });

  const watchedCourseName = watch("courseName");
  const watchedTotalSeats = watch("totalSeats");
  const watchedMode = watch("mode");
  const watchedCourseSlug = watch("courseSlug");
  const watchedSeatsAvailable = watch("seatsAvailable");
  const courseSlugField = register("courseSlug");
  const isEditing = Boolean(batch);

  useEffect(() => {
    if (slugTouched) {
      return;
    }

    const generatedSlug = generateSlug(watchedCourseName || "");
    setValue("courseSlug", generatedSlug);
  }, [watchedCourseName, setValue, slugTouched]);

  useEffect(() => {
    if (
      typeof watchedTotalSeats === "number" &&
      typeof watchedSeatsAvailable === "number" &&
      watchedSeatsAvailable > watchedTotalSeats
    ) {
      setValue("seatsAvailable", watchedTotalSeats);
    }
  }, [watchedTotalSeats, watchedSeatsAvailable, setValue]);

  useEffect(() => {
    if (!batch) {
      return;
    }

    reset(toDefaultValues(batch));
  }, [batch, reset]);

  const onSubmit = async (data: BatchFormData) => {
    try {
      const result = batch ? await updateBatch(batch.id, data) : await createBatch(data);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/batches");
        router.refresh();
      } else {
        toast.error(result.message);
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (messages.length > 0) {
              setError(field as keyof BatchFormData, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
              <CardDescription>Core information shown to students and admins.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="courseName">Course Name *</Label>
                <Input
                  id="courseName"
                  {...register("courseName")}
                  placeholder="Full Stack Java Development"
                  aria-invalid={errors.courseName ? "true" : "false"}
                />
                {errors.courseName && <p className="text-sm text-destructive">{errors.courseName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseSlug">Course Slug *</Label>
                <Input
                  id="courseSlug"
                  {...courseSlugField}
                  onChange={(e) => {
                    courseSlugField.onChange(e);
                    setSlugTouched(true);
                    setValue(
                      "courseSlug",
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      { shouldDirty: true, shouldValidate: true }
                    );
                  }}
                  placeholder="full-stack-java-development"
                  aria-invalid={errors.courseSlug ? "true" : "false"}
                />
                <p className="text-xs text-muted-foreground">Used to group batches under the same course.</p>
                {errors.courseSlug && <p className="text-sm text-destructive">{errors.courseSlug.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register("startDate")}
                  aria-invalid={errors.startDate ? "true" : "false"}
                />
                {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timing">Timing *</Label>
                <Input
                  id="timing"
                  {...register("timing")}
                  placeholder="9:00 AM - 12:00 PM"
                  aria-invalid={errors.timing ? "true" : "false"}
                />
                {errors.timing && <p className="text-sm text-destructive">{errors.timing.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  {...register("duration")}
                  placeholder="3 Months"
                  aria-invalid={errors.duration ? "true" : "false"}
                />
                {errors.duration && <p className="text-sm text-destructive">{errors.duration.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  {...register("instructor")}
                  placeholder="Faculty or trainer name"
                  aria-invalid={errors.instructor ? "true" : "false"}
                />
                {errors.instructor && <p className="text-sm text-destructive">{errors.instructor.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">Mode *</Label>
                <select
                  id="mode"
                  className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...register("mode")}
                  aria-invalid={errors.mode ? "true" : "false"}
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
                {errors.mode && <p className="text-sm text-destructive">{errors.mode.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...register("status")}
                  aria-invalid={errors.status ? "true" : "false"}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacity</CardTitle>
              <CardDescription>Track the size of the batch and how many seats are open.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="totalSeats">Total Seats *</Label>
                <Input
                  id="totalSeats"
                  type="number"
                  min="1"
                  {...register("totalSeats", { valueAsNumber: true })}
                  aria-invalid={errors.totalSeats ? "true" : "false"}
                />
                {errors.totalSeats && <p className="text-sm text-destructive">{errors.totalSeats.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seatsAvailable">Seats Available *</Label>
                <Input
                  id="seatsAvailable"
                  type="number"
                  min="0"
                  {...register("seatsAvailable", { valueAsNumber: true })}
                  aria-invalid={errors.seatsAvailable ? "true" : "false"}
                />
                {errors.seatsAvailable && <p className="text-sm text-destructive">{errors.seatsAvailable.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
              <CardDescription>Provide location or meeting details based on the batch mode.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {watchedMode === "online" ? (
                    <Monitor className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                  {watchedMode === "online" ? "Online batch" : "Offline batch"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {watchedMode === "online"
                    ? "Use a meeting link that students can join directly."
                    : "Use a physical location such as your training center or classroom."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location {watchedMode === "offline" ? "*" : ""}
                </Label>
                <Textarea
                  id="location"
                  rows={3}
                  {...register("location")}
                  placeholder="Kothrud, Pune"
                  className={cn(errors.location && "border-destructive")}
                  aria-invalid={errors.location ? "true" : "false"}
                />
                {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingLink">
                  Meeting Link {watchedMode === "online" ? "*" : ""}
                </Label>
                <Input
                  id="meetingLink"
                  type="url"
                  {...register("meetingLink")}
                  placeholder="https://meet.google.com/..."
                  aria-invalid={errors.meetingLink ? "true" : "false"}
                />
                {errors.meetingLink && <p className="text-sm text-destructive">{errors.meetingLink.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publish Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Editing status</p>
                  <p className="text-sm text-muted-foreground">
                    {isEditing ? "Update the selected batch" : "Create a new batch"}
                  </p>
                </div>
                <Badge variant="outline">{watchedMode}</Badge>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Batch slug preview</p>
                <p>/courses/{watchedCourseSlug || "batch-slug"}</p>
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
                    {isEditing ? "Update Batch" : "Create Batch"}
                  </>
                )}
              </Button>

              <Link href="/admin/batches" className="block">
                <Button variant="outline" type="button" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to batches
                </Button>
              </Link>

              {isEditing && batch && (
                <DeleteBatchButton
                  id={batch.id}
                  label={batch.courseName}
                  compact={false}
                  redirectTo="/admin/batches"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
