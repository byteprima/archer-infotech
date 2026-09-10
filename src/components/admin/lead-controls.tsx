"use client";

/**
 * Assignment, priority and status, as three controls that save on change.
 *
 * Separate from LeadForm deliberately. These are the fields a counsellor
 * changes many times over a lead's life, usually without touching anything
 * else, and burying them in a form with a Save button at the bottom means
 * either scrolling past twenty inputs or forgetting to submit. Each saves on
 * its own.
 */

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  assignLead,
  setLeadPriority,
  setLeadStatus,
} from "@/lib/actions/lead-assignment";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABELS,
  LOSS_REASONS,
  LOSS_REASON_LABELS,
  lossReasonLabel,
  requiresClosureReason,
  type LeadPriority,
  type LeadStatus,
  type LossReason,
} from "@/lib/leads/lifecycle";
import { toast } from "sonner";

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm disabled:opacity-60";

export interface StaffOption {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function LeadControls({
  leadId,
  status,
  priority,
  assignedToUserId,
  closureReason,
  closureNote,
  staff,
  canAssign,
}: {
  leadId: number;
  status: string;
  priority: string | null;
  assignedToUserId: string | null;
  closureReason: string | null;
  closureNote: string | null;
  staff: StaffOption[];
  /** Server already enforces this; the control is hidden to avoid offering
   *  an action that will only be refused. */
  canAssign: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(status);
  // A status that needs a reason is not saved on change like the others: the
  // select stages it, and the reason form below commits it. Nothing is written
  // until a reason is chosen, so the lead cannot end up closed-with-no-reason.
  const [pendingClose, setPendingClose] = useState<LeadStatus | null>(null);
  const [reason, setReason] = useState<LossReason>("NOT_INTERESTED");
  const [reasonNote, setReasonNote] = useState("");
  const [localPriority, setLocalPriority] = useState(priority ?? "");
  const [localAssignee, setLocalAssignee] = useState(assignedToUserId ?? "");

  function run(
    action: () => Promise<{ success: boolean; message: string }>,
    revert: () => void,
  ) {
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        toast.success(result.message);
      } else {
        // Put the control back to what the server still believes, so the
        // screen never shows a value that was not saved.
        revert();
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="space-y-4 rounded-xl border p-5">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Pipeline</h3>
        {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-status">Status</Label>
        <select
          id="lead-status"
          className={SELECT}
          value={localStatus}
          disabled={pending}
          onChange={(event) => {
            const previous = localStatus;
            const next = event.target.value as LeadStatus;
            setLocalStatus(next);
            if (requiresClosureReason(next)) {
              setPendingClose(next);
              return;
            }
            setPendingClose(null);
            run(
              () => setLeadStatus({ leadId, status: next }),
              () => setLocalStatus(previous),
            );
          }}
        >
          {LEAD_STATUSES.map((value) => (
            <option key={value} value={value}>
              {LEAD_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      {pendingClose && (
        <div className="space-y-2 rounded-md border border-amber-300 bg-amber-50 p-3">
          <p className="text-xs font-medium text-amber-900">
            Closing as {LEAD_STATUS_LABELS[pendingClose]}. Why?
          </p>
          <select
            aria-label="Closure reason"
            className={SELECT}
            value={reason}
            disabled={pending}
            onChange={(event) => setReason(event.target.value as LossReason)}
          >
            {LOSS_REASONS.map((value) => (
              <option key={value} value={value}>
                {LOSS_REASON_LABELS[value]}
              </option>
            ))}
          </select>
          <Textarea
            rows={2}
            placeholder="Anything worth remembering (optional)"
            value={reasonNote}
            disabled={pending}
            onChange={(event) => setReasonNote(event.target.value)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              disabled={pending}
              onClick={() =>
                run(
                  async () => {
                    const result = await setLeadStatus({
                      leadId,
                      status: pendingClose,
                      closureReason: reason,
                      closureNote: reasonNote,
                    });
                    if (result.success) {
                      setPendingClose(null);
                      setReasonNote("");
                    }
                    return result;
                  },
                  () => setLocalStatus(status),
                )
              }
            >
              Close lead
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() => {
                setPendingClose(null);
                setLocalStatus(status);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {!pendingClose && closureReason && (
        <p className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
          Closed: <span className="font-medium">{lossReasonLabel(closureReason)}</span>
          {closureNote ? ` — ${closureNote}` : ""}
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="lead-priority">Priority</Label>
        <select
          id="lead-priority"
          className={SELECT}
          value={localPriority}
          disabled={pending}
          onChange={(event) => {
            const previous = localPriority;
            const next = event.target.value;
            setLocalPriority(next);
            run(
              () =>
                setLeadPriority({
                  leadId,
                  priority: next ? (next as LeadPriority) : null,
                }),
              () => setLocalPriority(previous),
            );
          }}
        >
          <option value="">Not set</option>
          {LEAD_PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {LEAD_PRIORITY_LABELS[value]}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          Independent of status — a lead can be hot and still only contacted.
        </p>
      </div>

      {canAssign && (
        <div className="space-y-1.5">
          <Label htmlFor="lead-assignee">Assigned to</Label>
          <select
            id="lead-assignee"
            className={SELECT}
            value={localAssignee}
            disabled={pending}
            onChange={(event) => {
              const previous = localAssignee;
              const next = event.target.value;
              setLocalAssignee(next);
              run(
                () => assignLead({ leadId, userId: next }),
                () => setLocalAssignee(previous),
              );
            }}
          >
            <option value="">Unassigned</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
