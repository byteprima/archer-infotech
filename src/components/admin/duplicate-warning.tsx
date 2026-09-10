"use client";

/**
 * "Existing enquiry found" — shown on the Add Lead form once a phone number is
 * typed, before anything is created.
 *
 * It offers, never blocks. A repeat enquiry is a real enquiry: somebody who
 * asked in March and asks again in September is warmer than a stranger, and
 * losing that second enquiry to a duplicate check is worse than holding two
 * rows. The counsellor decides.
 */

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  checkForDuplicatePhone,
  type DuplicateMatch,
} from "@/lib/actions/lead-duplicates";
import { leadStatusLabel } from "@/lib/leads/lifecycle";
import { formatPhone } from "@/lib/leads/phone";

function when(value: Date | null): string {
  if (!value) return "unknown date";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DuplicateWarning({
  phone,
  onDismiss,
}: {
  phone: string;
  /** Called when the counsellor chooses to create anyway. */
  onDismiss?: () => void;
}) {
  // The result is keyed to the phone it was fetched for, so a stale answer is
  // simply not rendered rather than needing to be cleared. That also keeps the
  // effect free of synchronous setState.
  const [result, setResult] = useState<{ forPhone: string; matches: DuplicateMatch[] }>({
    forPhone: "",
    matches: [],
  });
  const [dismissedFor, setDismissedFor] = useState("");
  const [pending, startTransition] = useTransition();

  const trimmed = phone.trim();
  const longEnough = trimmed.replace(/\D/g, "").length >= 10;

  useEffect(() => {
    if (!longEnough) return;
    if (trimmed === result.forPhone) return;

    const timer = setTimeout(() => {
      startTransition(async () => {
        const found = await checkForDuplicatePhone(trimmed);
        setResult({ forPhone: trimmed, matches: found.matches });
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [trimmed, longEnough, result.forPhone]);

  const fresh = result.forPhone === trimmed;
  const matches = fresh ? result.matches : [];
  const dismissed = dismissedFor === trimmed;

  if (longEnough && pending && matches.length === 0) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        Checking for an existing enquiry…
      </p>
    );
  }

  if (matches.length === 0 || dismissed) return null;

  return (
    <div className="space-y-3 rounded-md border border-amber-300 bg-amber-50 p-3">
      <p className="flex items-center gap-2 text-sm font-medium text-amber-900">
        <AlertTriangle className="h-4 w-4" />
        {matches.length === 1
          ? "Existing enquiry found on this number"
          : `${matches.length} existing enquiries on this number`}
      </p>

      <ul className="space-y-2">
        {matches.map((match) => (
          <li
            key={match.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded border border-amber-200 bg-background p-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {match.name}
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {match.enquiryNumber ?? `#${match.id}`}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {match.courseInterest || "No course stated"} ·{" "}
                {formatPhone(match.phone)} · last enquiry {when(match.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{leadStatusLabel(match.status)}</Badge>
              <Link href={`/admin/leads/${match.id}`} target="_blank">
                <Button type="button" variant="outline" size="sm">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Open
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setDismissedFor(trimmed);
            onDismiss?.();
          }}
        >
          Create new enquiry anyway
        </Button>
        <span className="text-xs text-amber-900">
          A repeat enquiry is still an enquiry — this only warns.
        </span>
      </div>
    </div>
  );
}
