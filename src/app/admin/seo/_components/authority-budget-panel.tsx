import { Card, CardContent } from "@/components/ui/card";
import { Link2, Wallet } from "lucide-react";
import type { BacklinkView, BudgetView } from "@/lib/seo-dashboard/dfs-read";
import { OUR_DOMAIN } from "@/lib/seo-dashboard/dataforseo-plan";
import { Sparkline } from "./status";

/**
 * Overview row: link authority vs the tracked competitors (monthly
 * DataForSEO backlink summary) and the DataForSEO budget meter.
 */
export function AuthorityBudgetPanel({
  backlinks,
  budget,
}: {
  backlinks: BacklinkView;
  budget: BudgetView;
}) {
  const ours = backlinks.ours[backlinks.ours.length - 1];
  const spendShare = budget.budgetUsd > 0 ? Math.min(1, budget.monthSpendUsd / budget.budgetUsd) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" /> Link authority
              </h3>
              <p className="text-xs text-muted-foreground">
                Referring domains, DataForSEO, monthly. Authority is the measured limit for this
                site — see reports/2026-10.
              </p>
            </div>
            {ours && (
              <div className="text-right">
                <div className="text-2xl font-bold leading-none">{ours.referringDomains}</div>
                <div className="text-xs text-muted-foreground mt-1">our referring domains</div>
                <div className="mt-2 flex justify-end">
                  <Sparkline values={backlinks.ours.map((p) => p.referringDomains)} />
                </div>
              </div>
            )}
          </div>
          {backlinks.latest.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No snapshot yet — the monthly backlink check runs with POST /api/seo/dataforseo.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b">
                <tr>
                  <th className="text-left py-2 font-medium">Domain</th>
                  <th className="text-right py-2 font-medium">Ref. domains</th>
                  <th className="text-right py-2 font-medium">Backlinks</th>
                  <th className="text-right py-2 font-medium">Rank</th>
                  <th className="text-right py-2 font-medium">Spam</th>
                </tr>
              </thead>
              <tbody>
                {backlinks.latest.map((r) => (
                  <tr
                    key={r.target}
                    className={`border-b last:border-b-0 ${r.target === OUR_DOMAIN ? "font-semibold bg-muted/30" : ""}`}
                  >
                    <td className="py-2">{r.target}</td>
                    <td className="py-2 text-right">{r.referringDomains.toLocaleString("en-IN")}</td>
                    <td className="py-2 text-right">{r.backlinks.toLocaleString("en-IN")}</td>
                    <td className="py-2 text-right">{r.domainRank}</td>
                    <td className="py-2 text-right">{r.spamScore ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" /> DataForSEO budget
          </h3>
          {!budget.configured ? (
            <p className="text-sm text-muted-foreground">
              Not connected. Set DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD as runtime-only variables.
            </p>
          ) : (
            <>
              <div>
                <div className="text-2xl font-bold leading-none">
                  ${budget.monthSpendUsd.toFixed(2)}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    of ${budget.budgetUsd.toFixed(2)} this month
                  </span>
                </div>
                <div className="h-2 rounded bg-muted mt-3 overflow-hidden">
                  <div
                    className={`h-full ${spendShare > 0.85 ? "bg-rose-500" : spendShare > 0.6 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${(spendShare * 100).toFixed(0)}%` }}
                  />
                </div>
              </div>
              <p className="text-sm">
                Balance:{" "}
                <span className="font-semibold">
                  {budget.balanceUsd === null ? "—" : `$${budget.balanceUsd.toFixed(2)}`}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Jobs that would exceed the monthly budget are skipped, not run. Change it with
                SEO_DFS_MONTHLY_BUDGET_USD.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
