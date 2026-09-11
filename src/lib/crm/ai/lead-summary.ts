/**
 * The prompt for an AI lead summary, and the redaction that happens first.
 *
 * Kept pure and separate from the provider call so the prompt — and above all
 * what is left OUT of it — can be tested without a network.
 */

export interface SummaryInput {
  courseInterest: string | null;
  status: string;
  priority: string | null;
  createdAt: Date | null;
  qualification: string | null;
  currentStatus: string | null;
  expectedJoining: string | null;
  modePreference: string | null;
  source: string | null;
  demoAttended: boolean;
  batchInterest: string | null;
  followUps: Array<{
    type: string;
    outcome: string;
    notes: string | null;
    at: Date | null;
  }>;
  scoreBand: string;
  scoreReasons: string[];
}

function day(value: Date | null): string {
  if (!value) return "unknown date";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Build the prompt.
 *
 * The lead's NAME, PHONE, EMAIL and enquiry number are deliberately absent.
 * The summary is about what happened and what to do next, and none of that
 * needs an identity — so the identity does not leave the building. The
 * counsellor is looking at the name on the same screen anyway.
 */
export function buildSummaryPrompt(input: SummaryInput): string {
  const history = input.followUps.length
    ? input.followUps
        .slice(0, 12)
        .map(
          (f) =>
            `- ${day(f.at)}: ${f.type.toLowerCase()}, outcome ${f.outcome.toLowerCase()}${
              f.notes ? ` — "${f.notes.replace(/"/g, "'")}"` : ""
            }`,
        )
        .join("\n")
    : "- No conversations have been recorded.";

  const facts = [
    `Course of interest: ${input.courseInterest ?? "not stated"}`,
    `Enquiry received: ${day(input.createdAt)} via ${input.source ?? "unknown source"}`,
    `Current pipeline status: ${input.status}`,
    input.priority ? `Counsellor's priority: ${input.priority}` : null,
    `Computed score band: ${input.scoreBand} (${input.scoreReasons.join("; ") || "no signals"})`,
    input.qualification ? `Education: ${input.qualification}` : null,
    input.currentStatus ? `Currently: ${input.currentStatus}` : null,
    input.expectedJoining ? `Expected joining: ${input.expectedJoining}` : null,
    input.modePreference ? `Preferred mode: ${input.modePreference}` : null,
    `Attended a demo: ${input.demoAttended ? "yes" : "no"}`,
    input.batchInterest ? `Interested in batch: ${input.batchInterest}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `You are helping a counsellor at an IT training institute in Pune prepare for a call.

Below is the record of one enquiry. No names or contact details are included, and you do not need them.

FACTS
${facts}

CONVERSATION HISTORY
${history}

Write a briefing of at most 90 words, in two short paragraphs:
1. Where this enquiry stands and what the person seems to want.
2. What to do on the next call.

Rules you must follow:
- Use ONLY the facts above. If something is not stated, do not guess it.
- If the history is empty, say plainly that nobody has spoken to them yet.
- Do not invent names, dates, fees, promises or conversations.
- Do not repeat the score back; the counsellor can already see it.
- Plain British English, no bullet points, no headings, no preamble.`;
}

/** Fields that must never appear in a prompt, for the test to assert on. */
export const REDACTED_FIELDS = ["name", "phone", "email", "enquiryNumber"] as const;
