import { Sparkles, MessageSquare, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  listRecentCitationAudits,
  getMonthlyCitationRollup,
} from "../_actions/citations";
import { CitationForm } from "./citation-form";
import { RunAutomatedAuditButton } from "./run-automated-audit-button";

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  perplexity: "Perplexity",
  "google-aio": "Google AI Overviews",
  "bing-copilot": "Bing Copilot",
  gemini: "Gemini",
};

/**
 * AI Engine Citations tab — manual prompt-audit log with monthly
 * roll-ups by engine. The dashboard side: shows the trend; the form
 * side: lets you log a new audit row in seconds.
 *
 * Recommended cadence: monthly run of the canonical 25-prompt set
 * across 6 engines (~150 entries) to track Archer's mention rate +
 * citation rate over time. Pillar 8 P8-26 / Pillar 5 P5-29.
 */
export async function CitationsTab() {
  const [recent, rollup] = await Promise.all([
    listRecentCitationAudits(50),
    getMonthlyCitationRollup(),
  ]);

  // Group rollup rows by month for the matrix table
  const monthsSet = new Set(rollup.map((r) => r.month));
  const months = Array.from(monthsSet).sort().reverse();
  const engines = Array.from(new Set(rollup.map((r) => r.engine))).sort();
  const byMonthEngine = new Map<string, { mentioned: number; cited: number; total: number }>();
  for (const r of rollup) {
    byMonthEngine.set(`${r.month}|${r.engine}`, {
      mentioned: r.mentioned,
      cited: r.cited,
      total: r.total,
    });
  }

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50/40 border-blue-200">
        <CardContent className="pt-4 pb-4 text-sm">
          <strong>What this is:</strong> Manual log of monthly AI engine
          prompt audits. Pillar 8 P8-26 spec calls for a fixed 25-prompt
          set run across 6 AI engines monthly &mdash; tracks whether AI
          search surfaces mention Archer Infotech and cite{" "}
          <code className="text-xs">archerinfotech.in</code> as a source.
          Today&apos;s P8-07 / P8-08 / P8-09 / P8-13 work targets exactly
          this signal &mdash; expect first measurable changes 4-8 weeks
          out.
        </CardContent>
      </Card>

      {/* Monthly summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryTile
          icon={MessageSquare}
          label="Total entries"
          value={String(rollup.reduce((a, r) => a + r.total, 0))}
          tone="neutral"
        />
        <SummaryTile
          icon={Sparkles}
          label="Mention rate (all-time)"
          value={pct(
            rollup.reduce((a, r) => a + r.mentioned, 0),
            rollup.reduce((a, r) => a + r.total, 0),
          )}
          tone="info"
        />
        <SummaryTile
          icon={Quote}
          label="Citation rate (all-time)"
          value={pct(
            rollup.reduce((a, r) => a + r.cited, 0),
            rollup.reduce((a, r) => a + r.total, 0),
          )}
          tone="info"
        />
        <SummaryTile
          icon={Sparkles}
          label="Months tracked"
          value={String(months.length)}
          tone="neutral"
        />
      </div>

      {/* Monthly × Engine matrix */}
      {months.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Mention &amp; citation rate by engine, by month
          </h3>
          <div className="overflow-x-auto rounded-lg border bg-background">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold w-32">Month</th>
                  {engines.map((e) => (
                    <th key={e} className="text-center p-3 font-semibold">
                      {ENGINE_LABEL[e] ?? e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {months.map((m) => (
                  <tr key={m} className="border-b last:border-b-0">
                    <td className="p-3 font-mono text-xs">{m}</td>
                    {engines.map((e) => {
                      const cell = byMonthEngine.get(`${m}|${e}`);
                      if (!cell) {
                        return (
                          <td key={e} className="p-3 text-center text-xs text-muted-foreground">
                            —
                          </td>
                        );
                      }
                      const mentionRate = cell.total > 0 ? cell.mentioned / cell.total : 0;
                      const citeRate = cell.total > 0 ? cell.cited / cell.total : 0;
                      return (
                        <td key={e} className="p-3 text-center">
                          <div className="text-sm font-semibold">
                            {(mentionRate * 100).toFixed(0)}%
                            <span className="ml-1 text-xs text-muted-foreground">m</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {(citeRate * 100).toFixed(0)}% cited · n={cell.total}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="font-medium">m</span> = mention rate (Archer
            named in response). <span className="font-medium">cited</span> =
            archerinfotech.in linked as source. <span className="font-medium">n</span> =
            number of audit rows that month for that engine.
          </p>
        </div>
      )}

      {/* P8-26 / P5-29 — one-button automated Gemini audit. */}
      <RunAutomatedAuditButton />

      {/* The audit-entry form (manual rows for the other 5 engines). */}
      <CitationForm />

      {/* Recent log */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Recent audit log ({recent.length} of latest 200)
        </h3>
        {recent.length === 0 ? (
          <Card>
            <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground">
              No audit entries yet. Use the form above to log your
              first row &mdash; recommended starting point is the 25-prompt
              baseline run across all 6 engines this week, before
              today&apos;s schema changes have time to compound.
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-background">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-3 font-semibold w-28">Date</th>
                  <th className="text-left p-3 font-semibold w-32">Engine</th>
                  <th className="text-left p-3 font-semibold">Prompt</th>
                  <th className="text-center p-3 font-semibold w-24">Mention</th>
                  <th className="text-center p-3 font-semibold w-24">Cited</th>
                  <th className="text-left p-3 font-semibold w-28">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0 hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{row.auditDate}</td>
                    <td className="p-3 text-xs">
                      {ENGINE_LABEL[row.engine] ?? row.engine}
                    </td>
                    <td className="p-3 text-xs">
                      <div className="line-clamp-2 max-w-md" title={row.prompt}>
                        {row.prompt}
                      </div>
                      {row.notes && (
                        <div className="text-[11px] text-muted-foreground mt-1 line-clamp-1" title={row.notes}>
                          ↳ {row.notes}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.mentioned ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          Yes
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {row.cited ? (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800"
                          title={row.citedUrl ?? undefined}
                        >
                          Yes
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="p-3 text-xs">
                      {row.sentiment ? (
                        <SentimentBadge sentiment={row.sentiment} />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "good" | "warn" | "bad" | "neutral" | "info";
}) {
  const palette = {
    good: "text-emerald-700",
    warn: "text-amber-700",
    bad: "text-rose-700",
    neutral: "text-foreground",
    info: "text-blue-700",
  }[tone];
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs">{label}</span>
        </div>
        <div className={`text-2xl font-bold ${palette}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const palette = {
    positive: "bg-emerald-100 text-emerald-800",
    neutral: "bg-slate-100 text-slate-800",
    negative: "bg-rose-100 text-rose-800",
    inaccurate: "bg-amber-100 text-amber-800",
  }[sentiment as "positive" | "neutral" | "negative" | "inaccurate"] ??
    "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${palette}`}>
      {sentiment}
    </span>
  );
}

function pct(num: number, total: number): string {
  if (total === 0) return "—";
  return `${Math.round((num / total) * 100)}%`;
}
