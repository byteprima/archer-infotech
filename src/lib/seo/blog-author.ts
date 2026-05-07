/**
 * Resolve a blog post to its real-trainer author. P5-12.
 *
 * Every post in the placeholder/CMS data is currently bylined "Archer
 * Infotech" (institutional). E-E-A-T best practice in 2026 — and the
 * way Perplexity / ChatGPT / Claude weight citations — is to tie posts
 * to a named human expert with Person schema and a verifiable LinkedIn.
 *
 * Approach taken here is the "review-by" middle-ground from the pillar
 * 5 spec: keep the institutional voice, but resolve a topic-matched
 * trainer at render time and surface them as the canonical author of
 * the post (shown in the visible byline + emitted as the Person in
 * BlogPosting JSON-LD). No invasive edits to the underlying placeholder
 * data; new posts authored as "Archer Infotech" automatically pick up a
 * matched trainer the moment they're tagged with relevant keywords.
 */
import { teamMembers, getTrainer, type TeamMember } from "@/data/team";

/**
 * Topic → trainer-id mapping. Each row is "if the post mentions any of
 * these tags or matches this category, this trainer is the canonical
 * author". Ordered by specificity — first match wins, so put narrower
 * topic keys (e.g. "spring-boot") above broader ones (e.g. "java").
 *
 * Keys are matched against the lowercased tags CSV + lowercased
 * category.
 */
interface AuthorRule {
  /** Substrings searched against tags + category (lowercase). */
  match: string[];
  /** TeamMember.id of the resolved author. */
  trainerId: string;
}

const AUTHOR_RULES: AuthorRule[] = [
  // Modern Web specialist — React, Angular, Next.js, mobile
  {
    match: [
      "react",
      "angular",
      "next js",
      "nextjs",
      "frontend",
      "front end",
      "modern web",
      "mobile",
      "android",
      "ios",
      "flutter",
      "react native",
    ],
    trainerId: "amol-chougule",
  },
  // AI / GenAI / LLM specialist — solution-architect background
  {
    match: [
      "generative ai",
      "genai",
      "ai engineer",
      "ai for beginners",
      "ai tools",
      "ai & genai",
      "llm",
      "llms",
      "chatgpt",
      "claude",
      "prompt engineering",
      "prompt engineer",
      "rag",
      "langchain",
      "ai engineering",
    ],
    trainerId: "vinod-patil",
  },
  // .NET / C# specialist
  {
    match: [".net", "dotnet", "c#", "asp.net", "aspnet"],
    trainerId: "suraj-kudache",
  },
  // Spring Boot / Java enterprise
  {
    match: ["spring boot", "spring", "microservices"],
    trainerId: "yogesh-patil",
  },
  // Java + database — Ankita owns Java Full Stack delivery
  {
    match: [
      "java",
      "java full stack",
      "full stack",
      "mern",
      "mean",
      "database",
      "sql",
      "nosql",
      "mongodb",
      "postgresql",
      "mysql",
      "backend",
    ],
    trainerId: "ankita-hartale",
  },
  // Cloud / DevOps — Yogesh leads cloud architecture; Vinod also active
  {
    match: [
      "aws",
      "azure",
      "cloud",
      "cloud computing",
      "devops",
      "docker",
      "kubernetes",
      "terraform",
      "jenkins",
    ],
    trainerId: "yogesh-patil",
  },
  // Data Science / ML / Python
  {
    match: [
      "python",
      "data science",
      "data scientist",
      "data analyst",
      "data analytics",
      "machine learning",
      "deep learning",
      "data engineering",
      "data engineer",
    ],
    trainerId: "amol-patil",
  },
  // Career-guide content authored by founder (firsthand industry voice)
  {
    match: [
      "career guide",
      "career",
      "fresher jobs",
      "fresher",
      "campus placements",
      "interviews",
      "placement",
      "resume",
      "projects",
      "portfolio",
    ],
    trainerId: "yogesh-patil",
  },
];

/** Fallback: founder. Always resolves to a named person, never institutional. */
const DEFAULT_AUTHOR_ID = "yogesh-patil";

/**
 * Resolve a blog post (by tags + category) to its real-trainer author.
 * Always returns a named trainer — never falls back to "Archer Infotech"
 * the institution.
 */
export function resolveBlogAuthor(
  tags: string | null | undefined,
  category: string | null | undefined,
): TeamMember {
  const haystack = `${(tags ?? "").toLowerCase()},${(category ?? "").toLowerCase()}`;

  for (const rule of AUTHOR_RULES) {
    if (rule.match.some((m) => haystack.includes(m))) {
      const t = getTrainer(rule.trainerId);
      if (t) return t;
    }
  }

  return getTrainer(DEFAULT_AUTHOR_ID) ?? teamMembers[0];
}
