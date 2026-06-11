/**
 * SEO Dashboard — server-side auth resolver. Powers /admin/seo data
 * pulls from GSC + PSI + CrUX + Indexing API.
 *
 * Two-tier auth resolution:
 *
 *   1. Production: read from environment variables. The full
 *      lifecycle works without any filesystem access. Required vars:
 *        - GOOGLE_API_KEY                  (PSI + CrUX, no OAuth needed)
 *        - GSC_OAUTH_CLIENT_ID             (from oauth_client.json
 *          .installed.client_id)
 *        - GSC_OAUTH_CLIENT_SECRET         (from oauth_client.json
 *          .installed.client_secret)
 *        - GSC_OAUTH_REFRESH_TOKEN         (from oauth_token.json
 *          .refresh_token — long-lived, doesn't expire unless OAuth
 *          app is in Testing mode in Google Cloud)
 *        - GSC_DEFAULT_PROPERTY            (e.g. "sc-domain:archerinfotech.in")
 *
 *   2. Local dev: when the env vars aren't set, fall back to the
 *      shared config at ~/.config/claude-seo/ that the gsc.py helper
 *      already uses. Same files, no duplication.
 *
 * The OAuth flow is the standard installed-app refresh:
 *   refresh_token + client_id + client_secret  →  access_token (1h)
 *
 * Access tokens are cached in module-level memory for 50 minutes (10m
 * safety margin under the 1h Google expiry) so successive admin-page
 * loads don't hammer the token endpoint.
 */
import { readFileSync, existsSync } from "fs";
import { homedir } from "os";
import { join } from "path";

interface OAuthClientFile {
  installed?: { client_id: string; client_secret: string };
  web?: { client_id: string; client_secret: string };
}

interface OAuthTokenFile {
  refresh_token: string;
  access_token?: string;
  _obtained_at?: number;
  expires_in?: number;
}

interface ApiConfigFile {
  api_key: string;
  default_property?: string;
}

const CONFIG_DIR = join(homedir(), ".config", "claude-seo");

function readJsonFileIfExists<T>(path: string): T | null {
  try {
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

/**
 * Resolve all required SEO API credentials from env vars first, then
 * the local config dir as a dev fallback. Throws when a credential is
 * missing — caller decides whether to render a "setup required" UI or
 * propagate.
 */
export function getSeoApiConfig() {
  const apiKey =
    process.env.GOOGLE_API_KEY ||
    readJsonFileIfExists<ApiConfigFile>(join(CONFIG_DIR, "google-api.json"))?.api_key;

  const oauthClient =
    process.env.GSC_OAUTH_CLIENT_ID && process.env.GSC_OAUTH_CLIENT_SECRET
      ? {
          clientId: process.env.GSC_OAUTH_CLIENT_ID,
          clientSecret: process.env.GSC_OAUTH_CLIENT_SECRET,
        }
      : (() => {
          const file = readJsonFileIfExists<OAuthClientFile>(
            join(CONFIG_DIR, "oauth_client.json"),
          );
          const sect = file?.installed ?? file?.web;
          return sect
            ? { clientId: sect.client_id, clientSecret: sect.client_secret }
            : null;
        })();

  const refreshToken =
    process.env.GSC_OAUTH_REFRESH_TOKEN ||
    readJsonFileIfExists<OAuthTokenFile>(join(CONFIG_DIR, "oauth_token.json"))
      ?.refresh_token;

  const defaultProperty =
    process.env.GSC_DEFAULT_PROPERTY ||
    readJsonFileIfExists<ApiConfigFile>(join(CONFIG_DIR, "google-api.json"))
      ?.default_property ||
    "sc-domain:archerinfotech.in";

  return {
    apiKey,
    oauthClient,
    refreshToken,
    defaultProperty,
    /** True when at least the API key (used for PSI/CrUX) is present. */
    hasPsiCrux: !!apiKey,
    /** True when GSC OAuth is fully wired. */
    hasGscOauth: !!(oauthClient && refreshToken),
  };
}

interface CachedAccessToken {
  token: string;
  expiresAt: number;
}

let cachedAccessToken: CachedAccessToken | null = null;

/**
 * Exchange the long-lived refresh token for a short-lived access
 * token. Caches in module memory for 50 minutes. Throws when GSC
 * OAuth isn't configured — caller should render a setup-required UI.
 */
export async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.token;
  }

  const cfg = getSeoApiConfig();
  if (!cfg.hasGscOauth || !cfg.oauthClient || !cfg.refreshToken) {
    throw new Error(
      "GSC OAuth not configured — set GSC_OAUTH_CLIENT_ID + GSC_OAUTH_CLIENT_SECRET + GSC_OAUTH_REFRESH_TOKEN env vars (or run the OAuth flow once locally to populate ~/.config/claude-seo/oauth_token.json)",
    );
  }

  const body = new URLSearchParams({
    client_id: cfg.oauthClient.clientId,
    client_secret: cfg.oauthClient.clientSecret,
    refresh_token: cfg.refreshToken,
    grant_type: "refresh_token",
  });

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(15_000),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`OAuth refresh failed (${resp.status}): ${txt}`);
  }
  const json = (await resp.json()) as { access_token: string; expires_in: number };

  cachedAccessToken = {
    token: json.access_token,
    // 50-minute window vs Google's 1h expiry — 10m safety margin.
    expiresAt: Date.now() + Math.min(json.expires_in - 600, 3000) * 1000,
  };
  return json.access_token;
}
