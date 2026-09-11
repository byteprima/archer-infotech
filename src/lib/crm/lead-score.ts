/**
 * Lead scoring — deterministic, explainable, and not an LLM.
 *
 * The specification's own example of an AI insight is a score followed by
 * REASONS: "Demo attended · Asked about upcoming batch · Multiple
 * interactions". That is a rules engine, and it is the right tool here for
 * three reasons:
 *
 *  1. The score decides who gets called first. A counsellor who cannot see why
 *     a lead scored 82 cannot tell when it is wrong, and a wrong score
 *     silently misallocates their day.
 *  2. It cannot hallucinate. The spec's hard rule is not to fabricate insights
 *     where no scoring implementation exists; every number here traces to a
 *     row in the database.
 *  3. It costs nothing, runs instantly, needs no provider, and sends no
 *     student's personal data anywhere.
 *
 * Weights are constants rather than buried in the arithmetic so the office can
 * see what the system believes, and argue with it.
 *
 * The counsellor's own HOT/WARM/COLD priority is deliberately NOT an input.
 * Feeding a human judgement into a score that is then shown next to that
 * judgement is circular — it would agree with itself and tell nobody anything.
 * The two are displayed side by side precisely so a disagreement is visible.
 */

import { CLOSED_LEAD_STATUSES } from "@/lib/leads/lifecycle";

export interface ScoreSignals {
  status: string;
  createdAt: Date | null;
  /** Logged follow-ups — interactions that actually happened. */
  followUpCount: number;
  /** When the last one was, if any. */
  lastFollowUpAt: Date | null;
  /** Registered for a demo, and whether they turned up. */
  demoRegistered: boolean;
  demoAttended: boolean;
  /** Told us which batch they want. */
  batchInterestCount: number;
  courseInterest: string | null;
  email: string | null;
  /** Counsellor-gathered detail — somebody who answered these engaged. */
  qualification: string | null;
  expectedJoining: string | null;
  modePreference: string | null;
}

export interface ScoreReason {
  label: string;
  points: number;
}

export interface LeadScore {
  score: number;
  /**
   * The sum of the reasons, before clamping to 0-100.
   *
   * Kept because the panel lists the reasons and a counsellor can add them up.
   * When the raw total is 117 and the score reads 100, saying so is the
   * difference between a cap and an arithmetic error.
   */
  rawScore: number;
  band: "HOT" | "WARM" | "COLD";
  reasons: ScoreReason[];
  /** True when the lead is closed and a score would be meaningless. */
  notApplicable: boolean;
}

/**
 * What each signal is worth.
 *
 * Roughly: what somebody DID outranks what they SAID, and what they did
 * recently outranks what they did in March.
 */
export const SCORE_WEIGHTS = {
  /**
   * Every open lead starts here. Without a baseline the floor at zero hides
   * the penalties: a brand-new enquiry and one forgotten for a month both
   * score 0, and the list cannot tell them apart — which is exactly the
   * distinction the score exists to make.
   */
  enquired: 10,
  demoAttended: 30,
  demoRegistered: 12,
  batchInterest: 14,
  statusInterested: 18,
  statusCounselling: 10,
  statusContacted: 4,
  followUpEach: 6,
  followUpMax: 18,
  recentContact7d: 12,
  recentContact30d: 5,
  staleOver60d: -15,
  neverContactedOver14d: -12,
  expectedJoiningKnown: 8,
  qualificationKnown: 4,
  courseStated: 5,
  modeStated: 3,
  emailGiven: 2,
} as const;

export const HOT_THRESHOLD = 65;
export const WARM_THRESHOLD = 35;

const DAY = 864e5;

function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / DAY);
}

/**
 * Score a lead from its signals.
 *
 * `now` is a parameter so tests do not depend on the day they run.
 */
export function scoreLead(signals: ScoreSignals, now: Date = new Date()): LeadScore {
  // A closed lead has an outcome; ranking it against live ones is noise.
  if ((CLOSED_LEAD_STATUSES as readonly string[]).includes(signals.status)) {
    return { score: 0, rawScore: 0, band: "COLD", reasons: [], notApplicable: true };
  }

  const reasons: ScoreReason[] = [];
  const add = (label: string, points: number) => {
    if (points !== 0) reasons.push({ label, points });
  };

  add("Raised an enquiry", SCORE_WEIGHTS.enquired);

  if (signals.demoAttended) {
    add("Attended a demo", SCORE_WEIGHTS.demoAttended);
  } else if (signals.demoRegistered) {
    add("Registered for a demo", SCORE_WEIGHTS.demoRegistered);
  }

  if (signals.batchInterestCount > 0) {
    add("Asked about a specific batch", SCORE_WEIGHTS.batchInterest);
  }

  if (signals.status === "INTERESTED") {
    add("Marked interested", SCORE_WEIGHTS.statusInterested);
  } else if (signals.status === "COUNSELLING" || signals.status === "DEMO_ATTENDED") {
    add("In counselling", SCORE_WEIGHTS.statusCounselling);
  } else if (signals.status === "CONTACTED" || signals.status === "FOLLOW_UP") {
    add("Contacted", SCORE_WEIGHTS.statusContacted);
  }

  if (signals.followUpCount > 0) {
    const points = Math.min(
      signals.followUpCount * SCORE_WEIGHTS.followUpEach,
      SCORE_WEIGHTS.followUpMax,
    );
    add(
      signals.followUpCount === 1
        ? "One recorded conversation"
        : `${signals.followUpCount} recorded conversations`,
      points,
    );
  }

  if (signals.lastFollowUpAt) {
    const age = daysBetween(signals.lastFollowUpAt, now);
    if (age <= 7) add("Spoken to in the last week", SCORE_WEIGHTS.recentContact7d);
    else if (age <= 30) add("Spoken to this month", SCORE_WEIGHTS.recentContact30d);
    else if (age > 60) add("No contact in over two months", SCORE_WEIGHTS.staleOver60d);
  } else if (signals.createdAt && daysBetween(signals.createdAt, now) > 14) {
    // Never contacted at all, and not new. This is the one the queue loses.
    add("Never contacted since enquiring", SCORE_WEIGHTS.neverContactedOver14d);
  }

  if (signals.expectedJoining) add("Gave a joining timeline", SCORE_WEIGHTS.expectedJoiningKnown);
  if (signals.qualification) add("Shared their background", SCORE_WEIGHTS.qualificationKnown);
  if (signals.courseInterest) add("Named a course", SCORE_WEIGHTS.courseStated);
  if (signals.modePreference) add("Stated a preferred mode", SCORE_WEIGHTS.modeStated);
  if (signals.email) add("Gave an email address", SCORE_WEIGHTS.emailGiven);

  const rawScore = reasons.reduce((sum, r) => sum + r.points, 0);
  const score = Math.max(0, Math.min(100, rawScore));

  return {
    score,
    rawScore,
    band: score >= HOT_THRESHOLD ? "HOT" : score >= WARM_THRESHOLD ? "WARM" : "COLD",
    // Biggest contributors first — the counsellor reads the top two and stops.
    reasons: [...reasons].sort((a, b) => Math.abs(b.points) - Math.abs(a.points)),
    notApplicable: false,
  };
}

export const SCORE_BAND_LABELS: Record<LeadScore["band"], string> = {
  HOT: "Hot",
  WARM: "Warm",
  COLD: "Cold",
};

/**
 * The suggested next action.
 *
 * Rules, not a language model, and phrased as a suggestion — the counsellor
 * knows things the database does not.
 */
export function suggestNextAction(
  signals: ScoreSignals,
  score: LeadScore,
  now: Date = new Date(),
): string | null {
  if (score.notApplicable) return null;

  if (signals.demoAttended && signals.status !== "INTERESTED") {
    return "They attended the demo — ask directly whether they want to confirm a seat.";
  }
  if (signals.demoRegistered && !signals.demoAttended) {
    return "Demo booked but not yet attended — send a reminder the day before.";
  }
  if (signals.batchInterestCount > 0) {
    return "They asked about a specific batch — confirm the start date and hold a seat.";
  }
  if (signals.followUpCount === 0 && signals.createdAt) {
    const age = daysBetween(signals.createdAt, now);
    if (age >= 1) {
      return `Nobody has spoken to them yet, ${age} day${age === 1 ? "" : "s"} after enquiring — call today.`;
    }
    return "New enquiry — call while it is still warm.";
  }
  if (signals.lastFollowUpAt && daysBetween(signals.lastFollowUpAt, now) > 14) {
    return "Two weeks since the last conversation — a short check-in message would restart it.";
  }
  if (score.band === "HOT") {
    return "Scoring hot — worth a call today rather than a message.";
  }
  return null;
}
