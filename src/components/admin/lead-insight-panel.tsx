"use client";

/**
 * Score, reasons, suggested action — and the AI briefing, when it is switched
 * on.
 *
 * The score is always shown because it is computed from this database and
 * cannot be wrong in an interesting way; the reasons are listed so a
 * counsellor can tell when it IS wrong. The AI summary is only ever shown when
 * a real model produced it. If the provider is missing or the office has not
 * switched it on, the panel says so rather than showing something that looks
 * like an insight.
 */

import { useState, useTransition } from "react";
import { Info, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateLeadSummary } from "@/lib/actions/lead-insights";
import { AI_UNAVAILABLE_MESSAGES } from "@/lib/crm/ai/provider";
import {
  SCORE_BAND_LABELS,
  type LeadScore,
} from "@/lib/crm/lead-score";
import { leadPriorityLabel } from "@/lib/leads/lifecycle";

const BAND_COLORS: Record<LeadScore["band"], string> = {
  HOT: "bg-red-100 text-red-800",
  WARM: "bg-amber-100 text-amber-800",
  COLD: "bg-sky-100 text-sky-800",
};

export function LeadInsightPanel({
  leadId,
  score,
  suggestion,
  priority,
  aiEnabled,
  aiReason,
}: {
  leadId: number;
  score: LeadScore;
  suggestion: string | null;
  priority: string | null;
  aiEnabled: boolean;
  aiReason: keyof typeof AI_UNAVAILABLE_MESSAGES | null;
}) {
  const [pending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (score.notApplicable) return null;

  // The counsellor's own priority and the computed band shown together, so a
  // disagreement is visible rather than one quietly overwriting the other.
  const disagrees =
    priority && priority !== score.band && !(priority === "HOT" && score.band === "HOT");

  return (
    <section className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-semibold">
          <TrendingUp className="h-4 w-4" />
          Lead score
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tabular-nums" title={
            score.rawScore > 100 ? `Signals total ${score.rawScore}, capped at 100` : undefined
          }>
            {score.score}
          </span>
          <Badge className={BAND_COLORS[score.band]}>
            {SCORE_BAND_LABELS[score.band]}
          </Badge>
        </div>
      </div>

      {disagrees && (
        <p className="mb-3 rounded-md bg-muted p-2 text-xs text-muted-foreground">
          You marked this lead {leadPriorityLabel(priority)}. The score says{" "}
          {SCORE_BAND_LABELS[score.band]} — your judgement is not changed by it.
        </p>
      )}

      {score.rawScore > 100 && (
        <p className="mb-2 text-xs text-muted-foreground">
          The signals below total {score.rawScore}; the score is capped at 100.
        </p>
      )}

      <ul className="mb-3 space-y-1">
        {score.reasons.map((reason) => (
          <li key={reason.label} className="flex items-center justify-between gap-3 text-sm">
            <span className={reason.points < 0 ? "text-muted-foreground" : ""}>
              {reason.label}
            </span>
            <span
              className={`shrink-0 tabular-nums text-xs ${
                reason.points < 0 ? "text-red-700" : "text-muted-foreground"
              }`}
            >
              {reason.points > 0 ? "+" : ""}
              {reason.points}
            </span>
          </li>
        ))}
      </ul>

      {suggestion && (
        <p className="mb-3 flex items-start gap-2 rounded-md bg-primary/5 p-2 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{suggestion}</span>
        </p>
      )}

      <div className="border-t pt-3">
        {summary ? (
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              AI briefing
            </p>
            {summary.split(/\n{2,}/).map((para, i) => (
              <p key={i} className="text-sm">
                {para}
              </p>
            ))}
            <p className="text-xs text-muted-foreground">
              Generated from this lead&apos;s record. Check anything it claims
              before acting on it.
            </p>
          </div>
        ) : aiEnabled ? (
          <>
            <Button
              size="sm"
              variant="outline"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  setError(null);
                  const result = await generateLeadSummary(leadId);
                  if (result.summary) setSummary(result.summary);
                  else
                    setError(
                      result.detail ??
                        (result.unavailable
                          ? AI_UNAVAILABLE_MESSAGES[result.unavailable]
                          : "No summary was produced."),
                    );
                })
              }
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Write a briefing
            </Button>
            {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
          </>
        ) : (
          <p className="text-xs text-muted-foreground">
            {aiReason ? AI_UNAVAILABLE_MESSAGES[aiReason] : ""} The score above
            is computed from this database and does not use AI.
          </p>
        )}
      </div>
    </section>
  );
}
