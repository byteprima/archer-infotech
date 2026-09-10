"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  createPlacementDrive,
  updatePlacementDrive,
  type PlacementDriveFormData,
} from "@/lib/actions/placement-drives";
import { DRIVE_MODES, DRIVE_STATUSES } from "@/lib/records-constants";
import type { PlacementDrive } from "@/db/schema";

const MODE_LABEL: Record<string, string> = {
  campus: "On campus",
  virtual: "Virtual",
  walk_in: "Walk-in",
  partner_office: "At the company",
};
const STATUS_LABEL: Record<string, string> = {
  upcoming: "Upcoming",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function PlacementDriveForm({ drive }: { drive?: PlacementDrive }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState(drive?.status ?? "upcoming");
  const [allowJob, setAllowJob] = useState(drive?.allowJobPostingSchema ?? false);
  const [published, setPublished] = useState(drive?.isPublished ?? false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      company: String(fd.get("company") ?? ""),
      role: String(fd.get("role") ?? ""),
      description: String(fd.get("description") ?? ""),
      packageBand: String(fd.get("packageBand") ?? ""),
      location: String(fd.get("location") ?? ""),
      skills: String(fd.get("skills") ?? ""),
      eligibility: String(fd.get("eligibility") ?? ""),
      mode: String(fd.get("mode") ?? "campus"),
      driveDate: String(fd.get("driveDate") ?? ""),
      status,
      studentsAppeared: String(fd.get("studentsAppeared") ?? ""),
      studentsSelected: String(fd.get("studentsSelected") ?? ""),
      applyNote: String(fd.get("applyNote") ?? ""),
      allowJobPostingSchema: allowJob,
      validThrough: String(fd.get("validThrough") ?? ""),
      isPublished: published,
    } as unknown as PlacementDriveFormData;

    const result = drive
      ? await updatePlacementDrive(drive.id, payload)
      : await createPlacementDrive(payload);

    setBusy(false);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/placement-drives");
      router.refresh();
    } else {
      setErrors(result.errors ?? {});
      toast.error(result.message);
    }
  }

  const err = (k: string) =>
    errors[k]?.[0] ? <p className="mt-1 text-xs text-destructive">{errors[k][0]}</p> : null;

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input id="company" name="company" defaultValue={drive?.company ?? ""} required />
          {err("company")}
        </div>
        <div>
          <Label htmlFor="role">Role *</Label>
          <Input id="role" name="role" defaultValue={drive?.role ?? ""} required />
          {err("role")}
        </div>
        <div>
          <Label htmlFor="packageBand">Package band</Label>
          <Input
            id="packageBand"
            name="packageBand"
            placeholder="₹4.5–6 LPA"
            defaultValue={drive?.packageBand ?? ""}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            A band, not a single figure — a lone top number reads as a claim.
          </p>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={drive?.location ?? ""} />
        </div>
        <div>
          <Label htmlFor="driveDate">Drive date</Label>
          <Input id="driveDate" name="driveDate" type="date" defaultValue={drive?.driveDate ?? ""} />
        </div>
        <div>
          <Label htmlFor="mode">Mode</Label>
          <select
            id="mode"
            name="mode"
            defaultValue={drive?.mode ?? "campus"}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {DRIVE_MODES.map((m) => (
              <option key={m} value={m}>
                {MODE_LABEL[m]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="eligibility">Eligibility</Label>
        <Input
          id="eligibility"
          name="eligibility"
          placeholder="Java Full Stack batches, 2026 passouts"
          defaultValue={drive?.eligibility ?? ""}
        />
      </div>

      <div>
        <Label htmlFor="skills">Skills screened</Label>
        <Input
          id="skills"
          name="skills"
          placeholder="Java, Spring Boot, SQL"
          defaultValue={drive?.skills ?? ""}
        />
      </div>

      <div>
        <Label htmlFor="description">Job description</Label>
        <Textarea id="description" name="description" rows={6} defaultValue={drive?.description ?? ""} />
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {DRIVE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>

        {/* Outcome fields only matter once the drive has run. Showing them on
            an upcoming drive invites someone to fill in a guess. */}
        {status === "completed" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="studentsAppeared">Students appeared</Label>
              <Input
                id="studentsAppeared"
                name="studentsAppeared"
                type="number"
                min={0}
                defaultValue={drive?.studentsAppeared ?? ""}
              />
              {err("studentsAppeared")}
            </div>
            <div>
              <Label htmlFor="studentsSelected">Students selected</Label>
              <Input
                id="studentsSelected"
                name="studentsSelected"
                type="number"
                min={0}
                defaultValue={drive?.studentsSelected ?? ""}
              />
              {err("studentsSelected")}
              <p className="mt-1 text-xs text-muted-foreground">
                Leave blank if nobody recorded it. Blank shows as &quot;not
                recorded&quot;; 0 shows as nobody selected.
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="applyNote">How students apply</Label>
        <Input
          id="applyNote"
          name="applyNote"
          placeholder="Register with the placement cell by 10 August"
          defaultValue={drive?.applyNote ?? ""}
        />
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50/60 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Label htmlFor="allowJob" className="font-semibold">
              Publish with JobPosting schema
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Only for a drive genuinely open to outside applicants, with a way
              for a stranger to apply. Google can issue a manual action removing
              every job on this domain from Google Jobs if a posting is left
              live after it closes — so an expiry date is required below.
            </p>
          </div>
          <Switch id="allowJob" checked={allowJob} onCheckedChange={setAllowJob} />
        </div>
        {allowJob && (
          <div className="mt-4">
            <Label htmlFor="validThrough">Expires on *</Label>
            <Input
              id="validThrough"
              name="validThrough"
              type="date"
              defaultValue={drive?.validThrough ?? ""}
            />
            {err("validThrough")}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="isPublished" className="font-semibold">
            Published
          </Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Off until you are ready — drafts stay out of the public page.
          </p>
        </div>
        <Switch id="isPublished" checked={published} onCheckedChange={setPublished} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {drive ? "Save changes" : "Create drive"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
