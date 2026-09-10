"use client";

/**
 * Create or edit a demo session.
 *
 * The course comes from a select over the catalogue rather than a typed
 * slug + name pair, so the two can never disagree — courses are static (see
 * docs/lead-crm.md) and the slug is what every other table keys on.
 */

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  cancelDemoSession,
  createDemoSession,
  updateDemoSession,
} from "@/lib/actions/demo-sessions";
import { BATCH_MODE, DEMO_SESSION_STATUS, type DemoSession } from "@/db/schema";
import type { DemoSessionFormData } from "@/lib/validations/demo-sessions";

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:opacity-60";

const MODE_LABELS: Record<string, string> = {
  offline: "Offline (Classroom)",
  online: "Online",
  hybrid: "Hybrid",
};

const STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

export interface DemoBatchOption {
  id: number;
  batchName: string | null;
  courseName: string;
  startDate: Date | null;
}

export interface DemoCourseOption {
  slug: string;
  title: string;
}

/** A Date as the value a datetime-local input wants, in local time. */
function toLocalInput(value: Date | null | undefined): string {
  const d = value ? new Date(value) : new Date(Date.now() + 24 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function DemoSessionForm({
  demo,
  courses,
  batches,
  registeredCount = 0,
}: {
  demo?: DemoSession | null;
  courses: DemoCourseOption[];
  batches: DemoBatchOption[];
  registeredCount?: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState<DemoSessionFormData>({
    courseSlug: demo?.courseSlug ?? courses[0]?.slug ?? "",
    batchId: demo?.batchId ? String(demo.batchId) : "",
    scheduledAt: toLocalInput(demo?.scheduledAt),
    mode: (demo?.mode ?? "offline") as DemoSessionFormData["mode"],
    status: (demo?.status ?? "scheduled") as DemoSessionFormData["status"],
    trainer: demo?.trainer ?? "",
    capacity: demo?.capacity ?? "",
    location: demo?.location ?? "",
    meetingLink: demo?.meetingLink ?? "",
    notes: demo?.notes ?? "",
  });

  function set<K extends keyof DemoSessionFormData>(
    key: K,
    value: DemoSessionFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function fieldError(name: string) {
    const message = errors[name]?.[0];
    return message ? (
      <p className="mt-1 text-xs text-destructive">{message}</p>
    ) : null;
  }

  function submit() {
    startTransition(async () => {
      const result = demo
        ? await updateDemoSession(demo.id, form)
        : await createDemoSession(form);
      setErrors(result.errors ?? {});
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/demos");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  const needsLocation = form.mode === "offline" || form.mode === "hybrid";
  const needsLink = form.mode === "online" || form.mode === "hybrid";

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{demo ? "Edit demo" : "Schedule a demo"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="demo-course">Course</Label>
          <select
            id="demo-course"
            className={SELECT}
            value={form.courseSlug}
            disabled={pending}
            onChange={(e) => set("courseSlug", e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
          {fieldError("courseSlug")}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="demo-when">Date and time</Label>
            <Input
              id="demo-when"
              type="datetime-local"
              value={form.scheduledAt}
              disabled={pending}
              onChange={(e) => set("scheduledAt", e.target.value)}
            />
            {fieldError("scheduledAt")}
          </div>
          <div>
            <Label htmlFor="demo-mode">Mode</Label>
            <select
              id="demo-mode"
              className={SELECT}
              value={form.mode}
              disabled={pending}
              onChange={(e) =>
                set("mode", e.target.value as DemoSessionFormData["mode"])
              }
            >
              {BATCH_MODE.map((value) => (
                <option key={value} value={value}>
                  {MODE_LABELS[value] ?? value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {needsLocation && (
          <div>
            <Label htmlFor="demo-location">Location</Label>
            <Input
              id="demo-location"
              value={form.location}
              disabled={pending}
              placeholder="Archer Infotech, Kothrud — Lab 2"
              onChange={(e) => set("location", e.target.value)}
            />
            {fieldError("location")}
          </div>
        )}

        {needsLink && (
          <div>
            <Label htmlFor="demo-link">Meeting link</Label>
            <Input
              id="demo-link"
              value={form.meetingLink}
              disabled={pending}
              placeholder="https://meet.google.com/..."
              onChange={(e) => set("meetingLink", e.target.value)}
            />
            {fieldError("meetingLink")}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="demo-trainer">Trainer</Label>
            <Input
              id="demo-trainer"
              value={form.trainer}
              disabled={pending}
              onChange={(e) => set("trainer", e.target.value)}
            />
            {fieldError("trainer")}
          </div>
          <div>
            <Label htmlFor="demo-capacity">Capacity</Label>
            <Input
              id="demo-capacity"
              type="number"
              min={1}
              value={form.capacity === "" ? "" : String(form.capacity)}
              disabled={pending}
              placeholder="Leave blank for no limit"
              onChange={(e) =>
                set(
                  "capacity",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            />
            {registeredCount > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                {registeredCount} already registered
              </p>
            )}
            {fieldError("capacity")}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="demo-batch">Batch (optional)</Label>
            <select
              id="demo-batch"
              className={SELECT}
              value={form.batchId}
              disabled={pending}
              onChange={(e) => set("batchId", e.target.value)}
            >
              <option value="">Not tied to a batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batchName || batch.courseName}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              A demo often runs before a batch exists.
            </p>
          </div>
          <div>
            <Label htmlFor="demo-status">Status</Label>
            <select
              id="demo-status"
              className={SELECT}
              value={form.status}
              disabled={pending}
              onChange={(e) =>
                set("status", e.target.value as DemoSessionFormData["status"])
              }
            >
              {DEMO_SESSION_STATUS.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value] ?? value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="demo-notes">Notes</Label>
          <Textarea
            id="demo-notes"
            rows={3}
            value={form.notes}
            disabled={pending}
            onChange={(e) => set("notes", e.target.value)}
          />
          {fieldError("notes")}
        </div>

        <div className="flex flex-wrap gap-2 border-t pt-4">
          <Button disabled={pending} onClick={submit}>
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {demo ? "Save demo" : "Schedule demo"}
          </Button>
          <Button
            variant="outline"
            disabled={pending}
            onClick={() => router.push("/admin/demos")}
          >
            Cancel
          </Button>
          {demo && demo.status !== "cancelled" && (
            <Button
              variant="ghost"
              className="text-destructive"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  const result = await cancelDemoSession(demo.id);
                  toast[result.success ? "success" : "error"](result.message);
                  if (result.success) {
                    router.push("/admin/demos");
                    router.refresh();
                  }
                })
              }
            >
              Cancel this demo
            </Button>
          )}
        </div>
        {demo && (
          <p className="text-xs text-muted-foreground">
            Demos are cancelled, never deleted — registrations reference them and
            leads have been moved to Demo Scheduled on the strength of them.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
