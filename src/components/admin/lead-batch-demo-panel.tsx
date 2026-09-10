"use client";

/**
 * Batch interest and demo registration for one lead.
 *
 * Both are lists rather than fields. Someone can be interested in two batches
 * and sit two demos, and what they chose last time is what the next
 * conversation starts from — a single column would keep only the latest and
 * throw away the part that matters.
 */

import { useTransition } from "react";
import { CalendarPlus, GraduationCap, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  addBatchInterest,
  removeBatchInterest,
  registerLeadForDemo,
  setDemoAttendance,
} from "@/lib/actions/lead-batch-demo";
import { DEMO_ATTENDANCE, type DemoAttendance } from "@/db/schema";
import { toast } from "sonner";

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:opacity-60";

const ATTENDANCE_LABELS: Record<DemoAttendance, string> = {
  scheduled: "Scheduled",
  attended: "Attended",
  no_show: "No show",
  cancelled: "Cancelled",
};

const ATTENDANCE_COLORS: Record<DemoAttendance, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  attended: "bg-emerald-100 text-emerald-800",
  no_show: "bg-amber-100 text-amber-800",
  cancelled: "bg-gray-100 text-gray-800",
};

function formatDate(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export interface BatchOption {
  id: number;
  batchName: string | null;
  courseName: string;
  startDate: Date | null;
  timing: string | null;
  mode: string;
  seatsAvailable: number | null;
}

export interface DemoOption {
  id: number;
  courseName: string;
  scheduledAt: Date | null;
  mode: string;
  trainer: string | null;
}

export interface InterestRow {
  id: number;
  batchId: number;
  batchName: string | null;
  courseName: string;
  startDate: Date | null;
  timing: string | null;
  mode: string;
  status: string;
}

export interface DemoRow {
  id: number;
  attendance: string;
  courseName: string;
  scheduledAt: Date | null;
  mode: string;
  trainer: string | null;
}

export function LeadBatchDemoPanel({
  leadId,
  batches,
  demos,
  interests,
  registrations,
}: {
  leadId: number;
  batches: BatchOption[];
  demos: DemoOption[];
  interests: InterestRow[];
  registrations: DemoRow[];
}) {
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<{ success: boolean; message: string }>) {
    startTransition(async () => {
      const result = await action();
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <div className="space-y-6 rounded-xl border p-5">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary" />
        <h3 className="font-semibold">Batches &amp; demos</h3>
        {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      </div>

      {/* --- batch interest --- */}
      <div className="space-y-2">
        <Label htmlFor="batch-interest">Interested in a batch</Label>
        {batches.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No upcoming batches to offer. Create one under Batches first.
          </p>
        ) : (
          <select
            id="batch-interest"
            className={SELECT}
            disabled={pending}
            defaultValue=""
            onChange={(event) => {
              const batchId = Number(event.target.value);
              event.target.value = "";
              if (batchId) run(() => addBatchInterest({ leadId, batchId }));
            }}
          >
            <option value="">Add a batch…</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.batchName || batch.courseName} — {formatDate(batch.startDate)}
                {batch.seatsAvailable !== null ? ` (${batch.seatsAvailable} seats)` : ""}
              </option>
            ))}
          </select>
        )}

        {interests.length > 0 && (
          <ul className="space-y-2 pt-1">
            {interests.map((interest) => (
              <li
                key={interest.id}
                className="flex items-start justify-between gap-3 rounded-lg border p-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {interest.batchName || interest.courseName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(interest.startDate)}
                    {interest.timing ? ` · ${interest.timing}` : ""} · {interest.mode}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Remove batch interest"
                  disabled={pending}
                  onClick={() => run(() => removeBatchInterest(interest.id, leadId))}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- demo registration + attendance --- */}
      <div className="space-y-2 border-t pt-4">
        <Label htmlFor="demo-register">Register for a demo</Label>
        {demos.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No upcoming demo sessions. Schedule one under Demos first.
          </p>
        ) : (
          <select
            id="demo-register"
            className={SELECT}
            disabled={pending}
            defaultValue=""
            onChange={(event) => {
              const demoSessionId = Number(event.target.value);
              event.target.value = "";
              if (demoSessionId) run(() => registerLeadForDemo({ leadId, demoSessionId }));
            }}
          >
            <option value="">Add a demo…</option>
            {demos.map((demo) => (
              <option key={demo.id} value={demo.id}>
                {demo.courseName} — {formatDate(demo.scheduledAt)}
                {demo.trainer ? ` · ${demo.trainer}` : ""}
              </option>
            ))}
          </select>
        )}

        {registrations.length > 0 && (
          <ul className="space-y-2 pt-1">
            {registrations.map((registration) => (
              <li key={registration.id} className="space-y-2 rounded-lg border p-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{registration.courseName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(registration.scheduledAt)} · {registration.mode}
                      {registration.trainer ? ` · ${registration.trainer}` : ""}
                    </p>
                  </div>
                  <Badge
                    className={
                      ATTENDANCE_COLORS[registration.attendance as DemoAttendance] || ""
                    }
                  >
                    {ATTENDANCE_LABELS[registration.attendance as DemoAttendance] ??
                      registration.attendance}
                  </Badge>
                </div>
                <select
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs"
                  value={registration.attendance}
                  disabled={pending}
                  onChange={(event) =>
                    run(() =>
                      setDemoAttendance({
                        registrationId: registration.id,
                        leadId,
                        attendance: event.target.value as DemoAttendance,
                      }),
                    )
                  }
                >
                  {DEMO_ATTENDANCE.map((value) => (
                    <option key={value} value={value}>
                      {ATTENDANCE_LABELS[value]}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <CalendarPlus className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Registering moves the lead to Demo Scheduled; marking one attended
        moves it to Demo Attended. A no-show is left alone — why they missed
        it is the next conversation, not a status change.
      </p>
    </div>
  );
}
