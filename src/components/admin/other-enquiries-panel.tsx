/**
 * Other enquiries reachable on this lead's number.
 *
 * A server component and a live query, not a stored flag: the moment the other
 * lead is closed as DUPLICATE or its number corrected, this stops showing it.
 * A stale duplicate warning teaches people to ignore the warning.
 *
 * It reports; it does not merge. Merging two enquiries means choosing which
 * course interest, which counsellor and which follow-up history survives, and
 * that is a judgement the counsellor makes by reading both — usually by
 * closing one as Duplicate, which the pipeline control already does.
 */

import Link from "next/link";
import { Copy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { leadStatusLabel } from "@/lib/leads/lifecycle";
import { formatPhone } from "@/lib/leads/phone";
import type { DuplicateMatch } from "@/lib/actions/lead-duplicates";

function when(value: Date | null): string {
  if (!value) return "unknown date";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function OtherEnquiriesPanel({
  matches,
  phone,
}: {
  matches: DuplicateMatch[];
  phone: string;
}) {
  if (matches.length === 0) return null;

  return (
    <section className="rounded-lg border border-amber-300 bg-amber-50 p-4">
      <h2 className="mb-1 flex items-center gap-2 font-semibold text-amber-900">
        <Copy className="h-4 w-4" />
        {matches.length === 1
          ? "1 other enquiry on this number"
          : `${matches.length} other enquiries on this number`}
      </h2>
      <p className="mb-3 text-xs text-amber-900">
        {formatPhone(phone)} — the same person may have asked more than once.
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
                {match.courseInterest || "No course stated"} · {when(match.createdAt)}
                {match.assignedTo ? ` · ${match.assignedTo}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{leadStatusLabel(match.status)}</Badge>
              <Link
                href={`/admin/leads/${match.id}`}
                className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
              >
                Open
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-amber-900">
        To close one as a duplicate, set its status to Duplicate in the Pipeline
        panel — the reason is recorded and it drops out of the follow-up queues.
      </p>
    </section>
  );
}
