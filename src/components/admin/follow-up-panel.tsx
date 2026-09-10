"use client";

/**
 * Follow-up log for a lead: the history, and the form that appends to it.
 *
 * The form and the timeline sit together deliberately. Logging a call is the
 * single most frequent action on this page, and the thing that makes it
 * accurate is seeing what was tried last time while you write.
 *
 * Nothing here edits or deletes. The log is append-only (see
 * lib/actions/follow-ups.ts) — a mistake is corrected by adding an entry.
 */

import { useState, useTransition } from "react";
import { Loader2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createFollowUp } from "@/lib/actions/follow-ups";
import {
  FOLLOW_UP_TYPES,
  FOLLOW_UP_TYPE_LABELS,
  FOLLOW_UP_OUTCOMES,
  FOLLOW_UP_OUTCOME_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  leadStatusLabel,
  type FollowUpType,
  type FollowUpOutcome,
} from "@/lib/leads/lifecycle";
import { toast } from "sonner";

interface FollowUpRow {
  id: number;
  followUpType: string;
  outcome: string;
  notes: string | null;
  followUpAt: Date | null;
  nextFollowUpAt: Date | null;
  createdByUserId: string | null;
}

const SELECT = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

function localDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatWhen(value: Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function FollowUpPanel({
  leadId,
  currentStatus,
  followUps,
}: {
  leadId: number;
  currentStatus: string;
  followUps: FollowUpRow[];
}) {
  const [pending, startTransition] = useTransition();
  const [, setTick] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const newStatus = String(fd.get("newStatus") || "");

    startTransition(async () => {
      const result = await createFollowUp({
        leadId,
        followUpType: String(fd.get("followUpType")) as FollowUpType,
        outcome: String(fd.get("outcome")) as FollowUpOutcome,
        notes: String(fd.get("notes") || ""),
        followUpAt: String(fd.get("followUpAt") || ""),
        nextFollowUpAt: String(fd.get("nextFollowUpAt") || ""),
        // Only sent when the counsellor actually chose to move the lead —
        // an empty select must not silently rewrite the status.
        ...(newStatus ? { newStatus: newStatus as (typeof LEAD_STATUSES)[number] } : {}),
      });
      if (result.success) {
        toast.success(result.message);
        form.reset();
        setTick((n) => n + 1);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-5">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Log a follow-up</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="followUpType">Type</Label>
            <select id="followUpType" name="followUpType" className={SELECT} required>
              {FOLLOW_UP_TYPES.map((t) => (
                <option key={t} value={t}>{FOLLOW_UP_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="outcome">Outcome</Label>
            <select id="outcome" name="outcome" className={SELECT} required>
              {FOLLOW_UP_OUTCOMES.map((o) => (
                <option key={o} value={o}>{FOLLOW_UP_OUTCOME_LABELS[o]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="followUpAt">When did this happen?</Label>
            <input
              id="followUpAt"
              name="followUpAt"
              type="datetime-local"
              defaultValue={localDateTime(new Date())}
              className={SELECT}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nextFollowUpAt">Next follow-up</Label>
            <input
              id="nextFollowUpAt"
              name="nextFollowUpAt"
              type="datetime-local"
              className={SELECT}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank if nothing is scheduled.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} placeholder="What was said?" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="newStatus">Move status (optional)</Label>
          <select id="newStatus" name="newStatus" className={SELECT} defaultValue="">
            <option value="">Leave as {leadStatusLabel(currentStatus)}</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>{LEAD_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {pending ? "Saving…" : "Record follow-up"}
        </Button>
      </form>

      <div>
        <h3 className="mb-3 font-semibold">
          History{followUps.length > 0 && ` (${followUps.length})`}
        </h3>
        {followUps.length === 0 ? (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No follow-ups logged yet.
          </p>
        ) : (
          <ol className="space-y-3">
            {followUps.map((f) => (
              <li key={f.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    {FOLLOW_UP_TYPE_LABELS[f.followUpType as FollowUpType] ?? f.followUpType}
                  </Badge>
                  <Badge variant="secondary">
                    {FOLLOW_UP_OUTCOME_LABELS[f.outcome as FollowUpOutcome] ?? f.outcome}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatWhen(f.followUpAt)}
                  </span>
                </div>
                {f.notes && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                    {f.notes}
                  </p>
                )}
                {f.nextFollowUpAt && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Next: {formatWhen(f.nextFollowUpAt)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
