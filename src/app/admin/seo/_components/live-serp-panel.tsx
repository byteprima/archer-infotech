import { Card, CardContent } from "@/components/ui/card";
import { Radar, Sparkles, MapPin } from "lucide-react";
import type { SerpView } from "@/lib/seo-dashboard/dfs-read";
import { positionStatus } from "@/lib/seo-dashboard/targets";
import { StatusDot } from "./status";

/**
 * Live Google rank for the tracked keywords (DataForSEO, Pune, mobile),
 * next to what the AI Overview and local pack show. Written weekly by
 * POST /api/seo/dataforseo. GSC's position is an all-locations average;
 * this is one real Pune search, so the two can differ.
 */
export function LiveSerpPanel({ serp, configured }: { serp: SerpView; configured: boolean }) {
  if (!serp.date) {
    return (
      <Card className="border-amber-200 bg-amber-50/40">
        <CardContent className="pt-5 pb-5 text-sm space-y-1">
          <p className="font-semibold flex items-center gap-2">
            <Radar className="h-4 w-4" /> Live Google rank (Pune, mobile): no data yet
          </p>
          <p className="text-muted-foreground">
            {configured
              ? "DataForSEO is connected. The first weekly check is posted on the next run of POST /api/seo/dataforseo and lands on the run after (the cheap queue takes 5–20 minutes)."
              : "Not connected. Set DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (runtime-only) and schedule POST /api/seo/dataforseo."}
          </p>
        </CardContent>
      </Card>
    );
  }

  const ranked = serp.rows.filter((r) => r.position !== null);
  const aio = serp.rows.filter((r) => r.aioPresent);
  const packs = serp.rows.filter((r) => r.localPackPresent);
  const opportunities = [...serp.rows].filter((r) => r.opportunity > 0).sort((a, b) => b.opportunity - a.opportunity);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Radar className="h-5 w-5 text-muted-foreground" />
          Live Google rank — Pune, mobile
        </h2>
        <p className="text-sm text-muted-foreground">
          DataForSEO check of {serp.date}
          {serp.previousDate ? ` (movement vs ${serp.previousDate})` : ""}. “—” = not among the
          results Google returned. ⚠ = a page other than the target is ranking.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tile label="Keywords ranking" value={`${ranked.length} / ${serp.rows.length}`} />
        <Tile label="In top 10" value={String(ranked.filter((r) => (r.position ?? 99) <= 10).length)} />
        <Tile
          label="AI Overviews citing us"
          value={`${aio.filter((r) => r.aioCitesUs).length} / ${aio.length}`}
        />
        <Tile
          label="Local packs we're in"
          value={`${packs.filter((r) => r.localPackUs).length} / ${packs.length}`}
        />
      </div>

      {opportunities.length > 0 && (
        <p className="text-sm">
          <span className="font-semibold">Top opportunities</span> (volume × closeness to page 1):{" "}
          {opportunities
            .slice(0, 5)
            .map((r) => `${r.keyword} (#${r.position}, ${r.volumePune}/mo)`)
            .join(" · ")}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-3 font-semibold">Keyword</th>
              <th className="text-right p-3 font-semibold w-20">Rank</th>
              <th className="text-right p-3 font-semibold w-20">Vol/mo</th>
              <th className="text-center p-3 font-semibold w-24">
                <Sparkles className="h-4 w-4 inline" /> AIO
              </th>
              <th className="text-center p-3 font-semibold w-24">
                <MapPin className="h-4 w-4 inline" /> Pack
              </th>
              <th className="text-left p-3 font-semibold">Top 3 organic</th>
            </tr>
          </thead>
          <tbody>
            {serp.rows.map((r) => {
              const move =
                r.position !== null && r.previousPosition !== null ? r.previousPosition - r.position : null;
              return (
                <tr key={r.keyword} className="border-b last:border-b-0 hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <StatusDot status={positionStatus(r.position)} />
                      <div>
                        <div>{r.keyword}</div>
                        {r.url && (
                          <div className="font-mono text-xs text-muted-foreground truncate max-w-xs">
                            {r.urlMatchesTarget ? "" : "⚠ "}
                            {r.url}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-medium">
                    {r.position ?? "—"}
                    {move !== null && move !== 0 && (
                      <span className={`ml-1 text-xs ${move > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {move > 0 ? `▲${move}` : `▼${-move}`}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right text-muted-foreground">{r.volumePune ?? "—"}</td>
                  <td className="p-3 text-center text-xs" title={r.aioDomains.join(", ")}>
                    {!r.aioPresent ? "—" : r.aioCitesUs ? "✓ cites us" : "not us"}
                  </td>
                  <td className="p-3 text-center text-xs">
                    {!r.localPackPresent ? "—" : r.localPackUs ? "✓ in pack" : "not us"}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{r.top3.join(", ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-5 pb-5">
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-2">{label}</div>
      </CardContent>
    </Card>
  );
}
