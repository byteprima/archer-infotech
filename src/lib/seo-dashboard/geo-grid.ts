/**
 * SEO Dashboard — local map-pack geo-grid (#5).
 *
 * For a local institute, the Google **map-pack** position for "X
 * training in pune / kothrud" often matters more than the blue-link
 * average GSC reports. The monthly DataForSEO job (dfs-jobs.ts) runs
 * each planned keyword at every point of a 3×3 grid around each centre
 * and stores our Maps rank in seo_geo_grid; this module defines the
 * plan and reads the latest grid back. No fake data is ever returned —
 * with nothing collected yet, `getLatestGeoGrid` returns null.
 */
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { seoGeoGrid } from "@/db/schema";
import { dfsConfigured } from "./dataforseo";
import { gridPoints, type GridCentre } from "./dataforseo-plan";

export interface GeoGridPoint {
  /** Grid cell label, e.g. "Kothrud#4". */
  location: string;
  lat: number;
  lng: number;
  /** Maps rank (1–100), or null if we weren't in the listings. */
  rank: number | null;
}

export interface GeoGridResult {
  keyword: string;
  capturedAt: string;
  points: GeoGridPoint[];
  /** Share of grid points where we're in the top 3, i.e. the map pack (0–1). */
  shareOfLocalVoice: number;
}

export interface GeoGridStatus {
  enabled: boolean;
  /** Why it's not enabled, for the UI to surface honestly. */
  reason?: string;
  /** Grid the dashboard tracks. */
  plannedKeywords: string[];
  plannedGrid: (GridCentre & { points: number })[];
}

/** Pune-area grid: 9 points around each centre. */
export const PLANNED_GRID: GridCentre[] = [
  { center: "Pune (Shivajinagar)", lat: 18.5308, lng: 73.8475, radiusKm: 8 },
  { center: "Kothrud", lat: 18.5074, lng: 73.8077, radiusKm: 5 },
  { center: "Hinjawadi (IT hub)", lat: 18.5912, lng: 73.7389, radiusKm: 6 },
];

export const PLANNED_KEYWORDS = [
  "it training institute in pune",
  "python training in pune",
  "java classes in pune",
  "software training in kothrud",
];

/** Every grid point the monthly job queries. */
export function plannedPoints() {
  return PLANNED_GRID.flatMap(gridPoints);
}

export function geoGridStatus(): GeoGridStatus {
  const enabled = dfsConfigured();
  return {
    enabled,
    reason: enabled
      ? undefined
      : "No SERP provider connected. Set DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (runtime-only) and schedule POST /api/seo/dataforseo.",
    plannedKeywords: PLANNED_KEYWORDS,
    plannedGrid: PLANNED_GRID.map((g) => ({ ...g, points: 9 })),
  };
}

/** The most recent complete grid, one result per keyword, or null. */
export async function getLatestGeoGrid(): Promise<GeoGridResult[] | null> {
  const [latest] = await db
    .select({ date: seoGeoGrid.date })
    .from(seoGeoGrid)
    .orderBy(desc(seoGeoGrid.date))
    .limit(1);
  if (!latest) return null;

  const rows = await db.select().from(seoGeoGrid).where(eq(seoGeoGrid.date, latest.date));
  return PLANNED_KEYWORDS.map((keyword) => {
    const points = rows
      .filter((r) => r.keyword === keyword)
      .map((r) => ({ location: r.location, lat: r.lat, lng: r.lng, rank: r.rank }));
    const inPack = points.filter((p) => p.rank !== null && p.rank <= 3).length;
    return {
      keyword,
      capturedAt: latest.date,
      points,
      shareOfLocalVoice: points.length ? inPack / points.length : 0,
    };
  }).filter((g) => g.points.length > 0);
}
