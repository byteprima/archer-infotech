"use client";

import { useState, useTransition } from "react";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Quote,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  runAutomatedGeminiAudit,
  type AutomatedAuditResult,
} from "../_actions/automated-gemini-audit";

/**
 * P8-26 / P5-29 — "Run free Gemini audit" button.
 *
 * Single-click monthly trigger. Fires the 25 canonical prompts at
 * Gemini 2.0 Flash + Google Search grounding, auto-detects mention +
 * citation, inserts as 25 rows in the same table the manual form uses.
 *
 * Cost: free (Gemini free tier).
 * Other 5 engines stay manual via the form below.
 */
export function RunAutomatedAuditButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<AutomatedAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run() {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const r = await runAutomatedGeminiAudit();
        if (!r.ok) {
          setError(r.error ?? "Unknown error");
        }
        setResult(r);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    });
  }

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Automated Gemini audit
              <span className="text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                Free
              </span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              One click runs the 25 canonical prompts through Gemini 2.0
              Flash with Google Search grounding. Auto-detects mention +
              citation, inserts as 25 rows. Takes ~30-60 seconds. Free
              tier handles this volume easily.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              The other 5 engines (ChatGPT / Claude / Perplexity / Google
              AI Overviews / Bing Copilot) stay manual — use the form
              below for those.
            </p>
          </div>
          <Button onClick={run} disabled={pending} className="shrink-0">
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running 25 prompts…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Run free Gemini audit
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded border border-rose-200 bg-rose-50 text-sm text-rose-900 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {result?.ok && (
          <div className="mt-4">
            <ResultsSummary result={result} onDismiss={() => setResult(null)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ResultsSummary({
  result,
  onDismiss,
}: {
  result: AutomatedAuditResult;
  onDismiss: () => void;
}) {
  const mentionRate =
    result.summary.inserted > 0
      ? Math.round((result.summary.mentioned / result.summary.inserted) * 100)
      : 0;
  const citeRate =
    result.summary.inserted > 0
      ? Math.round((result.summary.cited / result.summary.inserted) * 100)
      : 0;

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Run complete — {result.summary.inserted} rows inserted on {result.auditDate}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
        <Stat label="Prompts run" value={result.summary.total} />
        <Stat
          label="Mention rate"
          value={`${mentionRate}%`}
          tone={mentionRate >= 50 ? "good" : "warn"}
        />
        <Stat
          label="Citation rate"
          value={`${citeRate}%`}
          tone={citeRate >= 30 ? "good" : "warn"}
        />
        <Stat
          label="Failed"
          value={result.summary.failed}
          tone={result.summary.failed === 0 ? "good" : "warn"}
        />
      </div>

      <div className="text-xs text-muted-foreground mb-2">
        Per-prompt outcomes (already saved to DB — review for accuracy):
      </div>
      <div className="overflow-x-auto max-h-96 rounded border bg-muted/20">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-muted/60 border-b">
            <tr>
              <th className="text-left p-2 font-semibold w-16">ID</th>
              <th className="text-left p-2 font-semibold">Prompt</th>
              <th className="text-center p-2 font-semibold w-16">M</th>
              <th className="text-center p-2 font-semibold w-16">C</th>
              <th className="text-left p-2 font-semibold w-40">URL / error</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.promptId} className="border-b last:border-b-0">
                <td className="p-2 font-mono">{row.promptId}</td>
                <td className="p-2">
                  <span className="line-clamp-1" title={row.prompt}>
                    {row.prompt}
                  </span>
                </td>
                <td className="p-2 text-center">
                  {row.error ? (
                    <span className="text-rose-700">—</span>
                  ) : row.mentioned ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Yes
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="p-2 text-center">
                  {row.error ? (
                    <span className="text-rose-700">—</span>
                  ) : row.cited ? (
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800"
                      title={row.citedUrl ?? undefined}
                    >
                      <Quote className="h-2.5 w-2.5" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="p-2 text-[11px]">
                  {row.error ? (
                    <span className="text-rose-700 line-clamp-1" title={row.error}>
                      {row.error}
                    </span>
                  ) : row.citedUrl ? (
                    <a
                      href={row.citedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline line-clamp-1"
                    >
                      {row.citedUrl.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Rows are already saved. The matrix table at the top of this tab
        reflects them after the page reloads. If a row is wrong (false
        negative / wrong URL detected), edit it from the recent log
        below or run the manual form to log a correction.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "good" | "warn" | "neutral";
}) {
  const palette =
    tone === "good"
      ? "text-emerald-700"
      : tone === "warn"
        ? "text-amber-700"
        : "text-foreground";
  return (
    <div className="rounded border bg-muted/10 p-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={`text-lg font-bold ${palette}`}>{value}</div>
    </div>
  );
}
