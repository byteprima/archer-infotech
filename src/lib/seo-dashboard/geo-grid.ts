/**
 * SEO Dashboard — local map-pack geo-grid (#5, scaffold).
 *
 * For a local institute, the Google **map-pack** position for "X
 * training in pune / kothrud" often matters more than the blue-link
 * average GSC reports. Measuring it needs a SERP API that supports
 * geo-located queries (DataForSEO's geo-grid), which is NOT wired up in
 * this environment yet.
 *
 * This module defines the data model + a single resolver so the Trends
 * tab can render a real grid the moment a provider is connected — no
 * fake data is ever returned. To enable: install the DataForSEO
 * extension, set DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD, and implement
 * `fetchGeoGrid` against the SERP endpoint.
 */

export interface GeoGridPoint {
  /** Grid cell label, e.g. "Kothrud", or a lat,lng. */
  location: string;
  lat: number;
  lng: number;
  /** Map-pack rank (1–20, or null if not in the local pack). */
  rank: number | null;
}

export interface GeoGridResult {
  keyword: string;
  capturedAt: string;
  points: GeoGridPoint[];
  /** Share of grid points where we appear in the local pack (0–1). */
  shareOfLocalVoice: number;
}

export interface GeoGridStatus {
  enabled: boolean;
  /** Why it's not enabled, for the UI to surface honestly. */
  reason?: string;
  /** Grid the dashboard would track once a provider is connected. */
  plannedKeywords: string[];
  plannedGrid: { center: string; lat: number; lng: number; radiusKm: number; points: number }[];
}

/** Pune-area grid the geo-tracker is pre-configured to measure. */
const PLANNED_GRID = [
  { center: "Pune (Shivajinagar)", lat: 18.5308, lng: 73.8475, radiusKm: 8, points: 9 },
  { center: "Kothrud", lat: 18.5074, lng: 73.8077, radiusKm: 5, points: 9 },
  { center: "Hinjawadi (IT hub)", lat: 18.5912, lng: 73.7389, radiusKm: 6, points: 9 },
];

const PLANNED_KEYWORDS = [
  "it training institute in pune",
  "python training in pune",
  "java classes in pune",
  "software training in kothrud",
];

/**
 * Returns whether geo-grid tracking is live. Wire a DataForSEO (or
 * equivalent) SERP client in here to flip `enabled` to true.
 */
export function geoGridStatus(): GeoGridStatus {
  const enabled = Boolean(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD);
  return {
    enabled,
    reason: enabled
      ? undefined
      : "No SERP provider connected. Set DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD and implement fetchGeoGrid() to enable map-pack geo-grid tracking.",
    plannedKeywords: PLANNED_KEYWORDS,
    plannedGrid: PLANNED_GRID,
  };
}

/**
 * Placeholder resolver — throws until a SERP provider is implemented.
 * Kept as the single integration point so enabling the feature is a
 * one-function change.
 */
export async function fetchGeoGrid(_keyword: string): Promise<GeoGridResult> {
  void _keyword;
  throw new Error("geo-grid provider not configured");
}
