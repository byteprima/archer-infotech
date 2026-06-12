/**
 * Gemini API wrapper for the AI Citations auto-audit.
 *
 * Uses the Generative Language API v1beta with Google Search grounding
 * (so responses carry source-URL citations the same way Perplexity does
 * for its own engine). Free tier covers our 25-prompt monthly run by a
 * wide margin (free tier ~1,500 req/day; we use 25/month).
 *
 * Reuses GOOGLE_API_KEY env var (same key as PSI/CrUX). Requires the
 * Generative Language API to be enabled on the Cloud project. If the
 * key isn't authorised, the function throws a descriptive error caught
 * by the calling server action.
 */

// gemini-2.5-flash chosen over 2.0-flash because some Google accounts
// have the 2.0-flash free tier quota zero'd while 2.5-flash still works.
// 2.5 is also the newest stable model with grounding support.
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const TARGET_BRAND_PATTERNS = [
  /\barcher\s*infotech\b/i,
  /\barcher\s*info\s*tech\b/i,
];
const TARGET_HOSTS = new Set([
  "archerinfotech.in",
  "www.archerinfotech.in",
]);

export interface GeminiAuditResult {
  prompt: string;
  responseText: string;
  groundingChunks: Array<{ uri: string; title?: string }>;
  mentioned: boolean;
  cited: boolean;
  citedUrl?: string;
  /** Raw error if the call failed; empty string when ok. */
  error: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    groundingMetadata?: {
      groundingChunks?: Array<{
        web?: { uri?: string; title?: string };
      }>;
    };
  }>;
  error?: { code?: number; message?: string };
}

function detectMention(text: string): boolean {
  return TARGET_BRAND_PATTERNS.some((p) => p.test(text));
}

function detectCitation(
  chunks: Array<{ uri: string; title?: string }>,
): { cited: boolean; citedUrl?: string } {
  // Gemini's grounding API returns `uri` as a redirect URL through
  // vertexaisearch.cloud.google.com — the real source host is in the
  // `title` field instead. Check both: title for the host match (since
  // we can't follow the redirect synchronously), uri as the canonical
  // recorded URL for the audit row.
  for (const c of chunks) {
    const titleLower = (c.title ?? "").toLowerCase();
    // Title is typically just the hostname (e.g. "archerinfotech.in").
    // Match it against our target hosts.
    if (
      titleLower &&
      Array.from(TARGET_HOSTS).some(
        (h) => titleLower === h || titleLower.endsWith(`.${h}`),
      )
    ) {
      return { cited: true, citedUrl: c.uri };
    }
    // Fallback: try to extract hostname from URI in case Google ever
    // returns direct URLs in the future.
    try {
      const u = new URL(c.uri);
      if (TARGET_HOSTS.has(u.hostname.toLowerCase())) {
        return { cited: true, citedUrl: c.uri };
      }
    } catch {
      // Skip malformed URLs.
    }
  }
  return { cited: false };
}

/**
 * Send one prompt to Gemini with Google Search grounding.
 *
 * Returns a structured result with both the raw text + the extracted
 * grounding URLs. Mention + citation detection are pre-computed so the
 * server action can insert directly without re-parsing.
 */
export async function callGemini(prompt: string): Promise<GeminiAuditResult> {
  // Prefer GEMINI_API_KEY (dedicated Gemini key with free-tier quota) over
  // GOOGLE_API_KEY (used for PSI/CrUX, may share a project with capped
  // Gemini quota). Either works if the project has free-tier enabled.
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      prompt,
      responseText: "",
      groundingChunks: [],
      mentioned: false,
      cited: false,
      error: "GEMINI_API_KEY (or GOOGLE_API_KEY) not configured",
    };
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    tools: [
      {
        // Enable Google Search grounding. Gemini returns grounding
        // metadata when this tool is present.
        google_search: {},
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
    },
  };

  let parsed: GeminiResponse;
  try {
    const r = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Generous timeout — grounded queries take 5-20 sec each.
      signal: AbortSignal.timeout(45_000),
    });
    parsed = (await r.json()) as GeminiResponse;
    if (!r.ok) {
      return {
        prompt,
        responseText: "",
        groundingChunks: [],
        mentioned: false,
        cited: false,
        error: `HTTP ${r.status}: ${parsed.error?.message ?? "unknown"}`,
      };
    }
  } catch (e) {
    return {
      prompt,
      responseText: "",
      groundingChunks: [],
      mentioned: false,
      cited: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  const candidate = parsed.candidates?.[0];
  const responseText = (candidate?.content?.parts ?? [])
    .map((p) => p.text ?? "")
    .join("")
    .trim();
  const groundingChunks = (candidate?.groundingMetadata?.groundingChunks ?? [])
    .map((c) => ({
      uri: c.web?.uri ?? "",
      title: c.web?.title,
    }))
    .filter((c) => c.uri);

  const mentioned = detectMention(responseText);
  const { cited, citedUrl } = detectCitation(groundingChunks);

  return {
    prompt,
    responseText,
    groundingChunks,
    mentioned,
    cited,
    citedUrl,
    error: "",
  };
}
