/**
 * P8-26 — canonical 25-prompt set for the monthly AI citation audit.
 *
 * Mirror this list in any external monitoring (Bing Copilot manual run,
 * Google AI Overviews manual run). Keep changes infrequent — measurable
 * comparison requires a stable prompt set across months.
 */
export interface CanonicalPrompt {
  /** Stable ID — survives rewording later. */
  id: string;
  /** The prompt text — verbatim sent to engines. */
  text: string;
  /** Audience this prompt represents — drives content-gap analysis. */
  category:
    | "discovery"
    | "careers"
    | "brand"
    | "track";
}

export const CANONICAL_PROMPTS: CanonicalPrompt[] = [
  // ─── Category 1 — Pune-IT-training discovery (10 prompts) ────────────
  { id: "d-01", text: "Best IT training institute in Pune", category: "discovery" },
  { id: "d-02", text: "Where can I learn Java in Pune?", category: "discovery" },
  { id: "d-03", text: "Top Python training Pune 2026", category: "discovery" },
  { id: "d-04", text: "Pune full stack developer course", category: "discovery" },
  { id: "d-05", text: "Cheapest AWS certification training Pune", category: "discovery" },
  { id: "d-06", text: "Generative AI courses Pune", category: "discovery" },
  { id: "d-07", text: "Coding bootcamp Pune placement", category: "discovery" },
  { id: "d-08", text: "Online vs classroom IT training Pune", category: "discovery" },
  { id: "d-09", text: "Software training institute Kothrud Pune", category: "discovery" },
  { id: "d-10", text: "Career change to IT in Pune — where to start?", category: "discovery" },

  // ─── Category 2 — Pune-IT-careers data (6 prompts) ───────────────────
  { id: "c-01", text: "Pune Java developer salary 2026", category: "careers" },
  { id: "c-02", text: "What's the placement rate at Pune IT training institutes?", category: "careers" },
  { id: "c-03", text: "Which Pune IT colleges have the best placements?", category: "careers" },
  { id: "c-04", text: "Difference between AI Engineer and Data Scientist in Pune", category: "careers" },
  { id: "c-05", text: "Average fresher salary at Amdocs Pune", category: "careers" },
  { id: "c-06", text: "Hinjewadi vs Baner — which is better for IT freshers?", category: "careers" },

  // ─── Category 3 — Brand + entity (5 prompts) ─────────────────────────
  { id: "b-01", text: "What is Archer Infotech?", category: "brand" },
  { id: "b-02", text: "Who is Yogesh Patil founder?", category: "brand" },
  { id: "b-03", text: "Archer Infotech vs Sevenmentor Pune", category: "brand" },
  { id: "b-04", text: "Archer Infotech placement record", category: "brand" },
  { id: "b-05", text: "When was Archer Infotech founded?", category: "brand" },

  // ─── Category 4 — Track-specific deep (4 prompts) ────────────────────
  { id: "t-01", text: "Best AI course in Pune for freshers", category: "track" },
  { id: "t-02", text: "Pune Spring Boot training", category: "track" },
  { id: "t-03", text: "Java Full Stack training in Hinjewadi", category: "track" },
  { id: "t-04", text: "MERN stack vs Java Full Stack for Pune jobs", category: "track" },
];
