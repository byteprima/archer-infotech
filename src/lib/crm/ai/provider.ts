/**
 * The seam where a language model would plug in.
 *
 * The specification asks for the ARCHITECTURE to be prepared, not for AI
 * features to ship, and adds one hard rule: do not fabricate AI insights where
 * no implementation exists. So this module has exactly two honest answers —
 * a real generated string, or an explicit reason why there is none. It never
 * invents a plausible-looking summary.
 *
 * Two independent gates, and both must be open:
 *
 *   1. A provider key exists (GEMINI_API_KEY / GOOGLE_API_KEY).
 *   2. The office has switched AI insights ON.
 *
 * The second gate exists because of what these features send. Summarising a
 * lead means posting a real student's name, phone number, education and the
 * counsellor's private notes about them to Google. That is a decision about
 * other people's personal data, and it is the institute's to make knowingly —
 * not something to inherit by default because a key happened to be set for
 * the SEO audit tool.
 */

// Matching lib/ai-engines/gemini.ts, which chose 2.5-flash because some
// Google accounts have the 2.0-flash free-tier quota zeroed while 2.5 works.
const GEMINI_MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export type AiUnavailableReason = "no_provider" | "disabled" | "error";

export interface AiResult {
  text: string | null;
  unavailable: AiUnavailableReason | null;
  detail?: string;
}

/** Whether a provider key is configured at all. Says nothing about consent. */
export function hasAiProvider(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

/**
 * One plain text completion. No search grounding — the existing
 * lib/ai-engines/gemini.ts is for SEO audits and grounds against the web,
 * which is wrong here: the answer must come from the lead's own record and
 * nothing else.
 */
export async function generateText(
  prompt: string,
  options: { maxOutputTokens?: number } = {},
): Promise<AiResult> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return { text: null, unavailable: "no_provider" };
  }

  try {
    const response = await fetch(`${ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          // Low temperature: this summarises a record, it does not write copy.
          temperature: 0.1,
          maxOutputTokens: options.maxOutputTokens ?? 400,
        },
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const parsed = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return {
        text: null,
        unavailable: "error",
        detail: parsed.error?.message ?? `HTTP ${response.status}`,
      };
    }

    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      // An empty completion is not a summary. Saying so beats showing a blank
      // panel that looks like "this lead has nothing worth noting".
      return { text: null, unavailable: "error", detail: "Empty response" };
    }

    return { text, unavailable: null };
  } catch (error) {
    return {
      text: null,
      unavailable: "error",
      detail: error instanceof Error ? error.message : "Request failed",
    };
  }
}

export const AI_UNAVAILABLE_MESSAGES: Record<AiUnavailableReason, string> = {
  no_provider:
    "No AI provider is configured. Set GEMINI_API_KEY to enable this.",
  disabled:
    "AI insights are switched off. An admin can enable them under CRM → Automation.",
  error: "The AI provider could not be reached.",
};
