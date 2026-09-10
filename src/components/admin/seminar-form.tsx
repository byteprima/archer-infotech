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
  createSeminar,
  updateSeminar,
  type SeminarFormData,
} from "@/lib/actions/seminars";
import { HOST_TYPES, SEMINAR_FORMATS } from "@/lib/records-constants";
import { teamMembers } from "@/data/team";
import type { Seminar } from "@/db/schema";

const HOST_LABEL: Record<string, string> = {
  corporate: "Corporate",
  college: "College",
  public: "Public",
  online: "Online",
};
const FORMAT_LABEL: Record<string, string> = {
  seminar: "Seminar",
  workshop: "Workshop",
  corporate_batch: "Corporate batch",
  guest_lecture: "Guest lecture",
  bootcamp: "Bootcamp",
};

export function SeminarForm({ seminar }: { seminar?: Seminar }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [published, setPublished] = useState(seminar?.isPublished ?? false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      hostOrganisation: String(fd.get("hostOrganisation") ?? ""),
      hostType: String(fd.get("hostType") ?? "corporate"),
      city: String(fd.get("city") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      technologies: String(fd.get("technologies") ?? ""),
      format: String(fd.get("format") ?? "seminar"),
      heldOn: String(fd.get("heldOn") ?? ""),
      duration: String(fd.get("duration") ?? ""),
      attendees: String(fd.get("attendees") ?? ""),
      trainerId: String(fd.get("trainerId") ?? ""),
      summary: String(fd.get("summary") ?? ""),
      outcome: String(fd.get("outcome") ?? ""),
      isPublished: published,
    } as unknown as SeminarFormData;

    const result = seminar
      ? await updateSeminar(seminar.id, payload)
      : await createSeminar(payload);

    setBusy(false);
    if (result.success) {
      toast.success(result.message);
      router.push("/admin/seminars");
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
          <Label htmlFor="hostOrganisation">Host organisation *</Label>
          <Input
            id="hostOrganisation"
            name="hostOrganisation"
            placeholder="Amdocs"
            defaultValue={seminar?.hostOrganisation ?? ""}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            The real name. &quot;A leading MNC&quot; proves nothing.
          </p>
          {err("hostOrganisation")}
        </div>
        <div>
          <Label htmlFor="hostType">Host type</Label>
          <select
            id="hostType"
            name="hostType"
            defaultValue={seminar?.hostType ?? "corporate"}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {HOST_TYPES.map((h) => (
              <option key={h} value={h}>
                {HOST_LABEL[h]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="topic">Topic *</Label>
          <Input
            id="topic"
            name="topic"
            placeholder="Spring Boot microservices"
            defaultValue={seminar?.topic ?? ""}
            required
          />
          {err("topic")}
        </div>
        <div>
          <Label htmlFor="technologies">Technologies</Label>
          <Input
            id="technologies"
            name="technologies"
            placeholder="Java, Spring Boot, Docker"
            defaultValue={seminar?.technologies ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={seminar?.city ?? ""} />
        </div>
        <div>
          <Label htmlFor="format">Format</Label>
          <select
            id="format"
            name="format"
            defaultValue={seminar?.format ?? "seminar"}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {SEMINAR_FORMATS.map((f) => (
              <option key={f} value={f}>
                {FORMAT_LABEL[f]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="heldOn">Held on</Label>
          <Input
            id="heldOn"
            name="heldOn"
            placeholder="2025-03 or 2025-03-14"
            defaultValue={seminar?.heldOn ?? ""}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Month is fine — YYYY-MM. Better than inventing a day you do not have.
          </p>
          {err("heldOn")}
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            placeholder="2 days / 16 hours"
            defaultValue={seminar?.duration ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="attendees">Approx. attendees</Label>
          <Input
            id="attendees"
            name="attendees"
            type="number"
            min={0}
            defaultValue={seminar?.attendees ?? ""}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Leave blank if nobody counted — the page then says so, rather than
            showing a number we made up.
          </p>
        </div>
        <div>
          <Label htmlFor="trainerId">Delivered by</Label>
          <select
            id="trainerId"
            name="trainerId"
            defaultValue={seminar?.trainerId ?? ""}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">— not recorded —</option>
            {teamMembers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="summary">What happened</Label>
        <Textarea id="summary" name="summary" rows={4} defaultValue={seminar?.summary ?? ""} />
      </div>

      <div>
        <Label htmlFor="outcome">What followed</Label>
        <Input
          id="outcome"
          name="outcome"
          placeholder="Led to a 12-week corporate batch"
          defaultValue={seminar?.outcome ?? ""}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="isPublished" className="font-semibold">
            Published
          </Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Off until you are ready.
          </p>
        </div>
        <Switch id="isPublished" checked={published} onCheckedChange={setPublished} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {seminar ? "Save changes" : "Record session"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
