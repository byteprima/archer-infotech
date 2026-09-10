/**
 * The UTM parameters on the current URL.
 *
 * Read from the address bar, never asked for: a visitor enquiring about a
 * course fills in name, mobile, email, mode and fresher/experienced, and
 * nothing else. This only picks up what the marketing link already carried.
 *
 * One helper because the forms were each parsing three of the five by hand,
 * so utm_content and utm_term — the two that identify which creative and which
 * keyword produced the lead — were dropped on the floor at every entry point.
 */
export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export function readUtmParams(search?: string): UtmParams {
  if (typeof window === "undefined" && search === undefined) return {};
  const params = new URLSearchParams(
    search ?? (typeof window === "undefined" ? "" : window.location.search),
  );
  const pick = (key: string) => params.get(key) || undefined;
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmContent: pick("utm_content"),
    utmTerm: pick("utm_term"),
  };
}
