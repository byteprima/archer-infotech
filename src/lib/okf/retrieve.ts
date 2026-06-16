/**
 * Keyless retrieval "bot" over the OKF knowledge data.
 *
 * No LLM, no API key, no per-message cost, zero hallucination: visitor
 * questions are matched against the canonical FAQ + course data (the same
 * source as the OKF bundle) by intent rules + keyword/synonym scoring, and
 * the stored answer is returned verbatim. Powers /api/chat whenever
 * XAI_API_KEY is absent; when a key is set the route uses Grok instead and
 * this module is the graceful fallback.
 */

import { siteConfig } from "@/data/site-config";
import { courses, categories } from "@/data/courses";
import {
  homeFaqs,
  aboutFaqs,
  coursesFaqs,
  bootcampsFaqs,
  contactFaqs,
  trainersFaqs,
  internshipsFaqs,
  corporateTrainingFaqs,
  batchScheduleFaqs,
  placementsFaqs,
} from "@/data/faqs";

export interface RetrieveResult {
  reply: string;
  /** "lead" tells the widget to show the name+phone callback form. */
  intent?: "lead";
  /** Clickable follow-up chips. */
  suggestions?: string[];
}

const PHONE = siteConfig.contact.phone;
const WA = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;

const STOPWORDS = new Set(
  "a an the is are am do does did i you we they it to of for in on at my me our your can could would will what which who whom how when where why and or with about please tell want need have has having there any this that these those give get got take join your you're im i'm".split(
    /\s+/,
  ),
);

// Map raw tokens to canonical tags so synonyms score together.
const SYNONYMS: Record<string, string[]> = {
  fee: ["fee", "cost", "price"],
  fees: ["fee", "cost", "price"],
  cost: ["fee", "cost", "price"],
  price: ["fee", "cost", "price"],
  charges: ["fee", "cost", "price"],
  fis: ["fee"],
  emi: ["fee", "emi"],
  placement: ["placement", "job", "salary"],
  placements: ["placement", "job", "salary"],
  job: ["placement", "job"],
  jobs: ["placement", "job"],
  hiring: ["placement", "job"],
  salary: ["placement", "salary"],
  package: ["placement", "salary"],
  lpa: ["placement", "salary"],
  timing: ["batch", "schedule"],
  timings: ["batch", "schedule"],
  schedule: ["batch", "schedule"],
  batch: ["batch", "schedule"],
  batches: ["batch", "schedule"],
  duration: ["batch", "duration"],
  weekend: ["batch", "weekend"],
  address: ["address", "location", "visit"],
  location: ["address", "location", "visit"],
  located: ["address", "location"],
  where: ["address", "location"],
  reach: ["address", "contact"],
  visit: ["address", "visit"],
  directions: ["address", "location"],
  map: ["address", "location"],
  phone: ["contact"],
  call: ["contact"],
  contact: ["contact"],
  number: ["contact"],
  whatsapp: ["contact"],
  email: ["contact"],
  demo: ["demo"],
  trial: ["demo"],
  certificate: ["certificate"],
  certification: ["certificate"],
  eligibility: ["eligibility"],
  prerequisite: ["eligibility"],
  prerequisites: ["eligibility"],
  requirement: ["eligibility"],
  qualify: ["eligibility"],
  internship: ["internship"],
  internships: ["internship"],
  online: ["online"],
  offline: ["offline"],
  fresher: ["fresher"],
  beginner: ["beginner"],
};

function tokenize(text: string): string[] {
  // '.' is a separator so "React.js"→react js, "Node.js"→node js, ".NET"→net,
  // "Next.js"→next js. '+' and '#' are kept for "c++" / "c#".
  const raw = text
    .toLowerCase()
    .replace(/[^a-z0-9+#\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
  const out = new Set<string>();
  for (const t of raw) {
    out.add(t);
    for (const syn of SYNONYMS[t] ?? []) out.add(syn);
  }
  return [...out];
}

type Entry = {
  titleTokens: Set<string>;
  bodyTokens: Set<string>;
  answer: string;
  topic: string;
};

// Build the searchable index once at module load.
const FAQ_GROUPS = [
  homeFaqs,
  aboutFaqs,
  coursesFaqs,
  bootcampsFaqs,
  contactFaqs,
  trainersFaqs,
  internshipsFaqs,
  corporateTrainingFaqs,
  batchScheduleFaqs,
  placementsFaqs,
];

const INDEX: Entry[] = [];

for (const group of FAQ_GROUPS) {
  for (const f of group) {
    INDEX.push({
      titleTokens: new Set(tokenize(f.question)),
      bodyTokens: new Set(tokenize(`${f.question} ${f.answer}`)),
      answer: f.answer,
      topic: "faq",
    });
  }
}

function courseAnswer(c: (typeof courses)[number]): string {
  const careers = (c.careerOpportunities ?? []).slice(0, 3).join(", ");
  return `Yes — we offer **${c.title}** (${c.duration} · ${c.level} · ${c.mode.join("/")}). ${c.shortDescription} See details: ${siteConfig.url}/courses/${c.categorySlug}/${c.slug}${careers ? `\n\nCareer paths: ${careers}.` : ""}\n\nWant a counsellor to call you about this course?`;
}

// Name-only tokens (NOT category) so "devops" matches the DevOps Engineering
// course, not every "Cloud & DevOps" category course; ties resolve to the
// course whose NAME contains the keyword.
const COURSE_ENTRIES = courses.map((c) => ({
  course: c,
  titleTokens: new Set(tokenize(`${c.title} ${c.shortTitle}`)),
}));

for (const { course: c, titleTokens } of COURSE_ENTRIES) {
  INDEX.push({
    titleTokens,
    bodyTokens: new Set(
      tokenize(
        `${c.title} ${c.shortDescription} ${c.category} ${(c.tools ?? []).join(" ")} ${(c.careerOpportunities ?? []).join(" ")}`,
      ),
    ),
    answer: courseAnswer(c),
    topic: "course",
  });
}

// Significant tokens that name a specific course (so a generic "what courses
// do you offer" goes to the overview, but "java course" goes to retrieval).
const COURSE_KEYWORDS = new Set<string>();
for (const c of courses) for (const t of tokenize(`${c.title} ${c.shortTitle}`)) COURSE_KEYWORDS.add(t);
for (const generic of ["programming", "course", "courses", "training", "development", "developer", "fundamentals", "complete"])
  COURSE_KEYWORDS.delete(generic);

// Deliberately narrow: only an explicit "courses / programs / catalogue" ask
// triggers the overview. Words like "offer", "training", "classes" are too
// generic ("do you offer internships", "corporate training") and would steal
// queries that belong to a specific FAQ.
const COURSE_LIST_RE = /\b(courses?|programs?|programmes?|catalog|catalogue|syllabus)\b/i;

function coursesOverviewReply(): RetrieveResult {
  const cats = categories.map((c) => c.name).join(", ");
  const pop = courses
    .filter((c) => c.isPopular)
    .slice(0, 6)
    .map((c) => c.shortTitle || c.title)
    .join(", ");
  return {
    reply: `We offer ${siteConfig.stats.courses} courses across: ${cats}.${pop ? ` Popular picks: ${pop}.` : ""} Which area interests you — or tell me a specific course (e.g. "Java", "Python", "Data Science")?`,
    suggestions: ["Java Full Stack", "Data Science", "Cloud / DevOps", "Talk to a counsellor"],
  };
}

function score(queryTokens: string[], e: Entry): number {
  let s = 0;
  for (const t of queryTokens) {
    if (e.titleTokens.has(t)) s += 3;
    else if (e.bodyTokens.has(t)) s += 1;
  }
  return s;
}

const LEAD_INTENT =
  /\b(call me|callback|call back|counsel|counsell|enroll|enrol|admission|admissions|register|registration|sign up|signup|join|talk to|speak to|contact me|reach me|book)\b/i;
const GREETING = /^(hi|hii+|hey+|hello|helo|hola|namaste|good (morning|afternoon|evening))\b/i;
const THANKS = /\b(thanks|thank you|thx|great|cool|awesome|nice)\b/i;

function contactReply(): string {
  const a = siteConfig.contact.address;
  return [
    "Here's how to reach Archer Infotech:",
    "",
    `📞 Call: ${PHONE}`,
    `💬 WhatsApp: ${WA}`,
    `📧 Email: ${siteConfig.contact.email}`,
    `📍 ${a.line1}, ${a.line2}, ${a.city}, ${a.state} - ${a.pincode}`,
    `🕘 ${siteConfig.openingHours[0].opens}–${siteConfig.openingHours[0].closes}, Mon–Sat (Sun closed)`,
    "",
    "Walk-ins are welcome during working hours.",
  ].join("\n");
}

function placementsReply(): string {
  const s = siteConfig.stats;
  return `We provide genuine **placement assistance** with a **${s.placementRate} placement rate** — over ${s.yearsExperience} years we've trained ${s.studentsTrained} students and placed ${s.studentsPlaced}, with ${s.corporatePartners} hiring partners (including Amdocs, Capgemini, MindTree, Tech Mahindra). It covers interview prep, resume building, mock interviews and referrals. Shall I have a counsellor call you with placement details for a specific course?`;
}

function feesReply(): RetrieveResult {
  return {
    reply:
      "Course fees depend on the program and any current offers, and EMI options are available for several courses. Tell me which course you're interested in, or share your name and phone number and a counsellor will share the exact fees and EMI plans.",
    intent: "lead",
  };
}

const DEFAULT_SUGGESTIONS = ["Our courses", "Placements", "Visit / contact", "Talk to a counsellor"];

/** Main entry point: answer a single visitor message with no LLM. */
export function retrieveAnswer(query: string): RetrieveResult {
  const q = query.trim();
  if (!q) return { reply: "How can I help you today?", suggestions: DEFAULT_SUGGESTIONS };

  // 1. Conversational intents
  if (GREETING.test(q)) {
    return {
      reply:
        "Hello! 👋 I can help with our courses, batches, placements, fees enquiries and visiting Archer Infotech. What would you like to know?",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }
  if (THANKS.test(q) && q.split(/\s+/).length <= 4) {
    return {
      reply: "You're welcome! 😊 Anything else I can help you with?",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }
  if (LEAD_INTENT.test(q)) {
    return {
      reply:
        "Happy to arrange that! Please share your name and 10-digit phone number and a counsellor will call you back during working hours.",
      intent: "lead",
    };
  }

  const tokens = tokenize(q);
  const tagSet = new Set(tokens);

  // 2. Generic "what courses do you offer" → overview (before specific lookup).
  // Skipped when a specific course keyword, fee, or batch/mode word is present
  // so those route to the right handler instead.
  if (
    COURSE_LIST_RE.test(q) &&
    !tokens.some((t) => COURSE_KEYWORDS.has(t)) &&
    !tagSet.has("fee") &&
    !tagSet.has("online") &&
    !tagSet.has("offline") &&
    !tagSet.has("batch")
  ) {
    return coursesOverviewReply();
  }

  // 3. Topic shortcuts (canonical tags from the synonym map)
  if (tagSet.has("fee")) return feesReply();
  if (tagSet.has("contact") || tagSet.has("address") || tagSet.has("visit")) {
    return { reply: contactReply(), suggestions: ["Talk to a counsellor", "Our courses"] };
  }
  if (tagSet.has("placement")) {
    return { reply: placementsReply(), intent: undefined, suggestions: ["Talk to a counsellor"] };
  }

  // 4. Specific course named by a distinctive keyword (e.g. "python",
  // "java full stack") wins over generic FAQ matches.
  let bestCourse: (typeof courses)[number] | null = null;
  let bestCourseScore = 0;
  for (const { course, titleTokens } of COURSE_ENTRIES) {
    let sc = 0;
    for (const t of tokens) if (titleTokens.has(t) && COURSE_KEYWORDS.has(t)) sc++;
    if (sc > bestCourseScore) {
      bestCourseScore = sc;
      bestCourse = course;
    }
  }
  if (bestCourse && bestCourseScore >= 1) {
    return { reply: courseAnswer(bestCourse), suggestions: ["Talk to a counsellor", "Fees & EMI"] };
  }

  // 5. Keyword retrieval over FAQ + course index
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of INDEX) {
    const sc = score(tokens, e);
    if (sc > bestScore) {
      bestScore = sc;
      best = e;
    }
  }

  if (best && bestScore >= 3) {
    const sug = best.topic === "course" ? ["Talk to a counsellor", "Fees & EMI"] : DEFAULT_SUGGESTIONS;
    return { reply: best.answer, suggestions: sug };
  }

  // 4. Fallback
  return {
    reply: `I'm not fully sure about that one — I don't want to give you wrong information. You can call us on ${PHONE} or WhatsApp ${WA}, or share your name and phone and a counsellor will reach out.`,
    intent: "lead",
  };
}

/** Maps a quick-reply chip label to the query it should run. */
export function chipToQuery(label: string): string {
  const map: Record<string, string> = {
    "Our courses": "what courses do you offer",
    Courses: "what courses do you offer",
    Placements: "placement",
    "Fees & EMI": "fees",
    Fees: "fees",
    "Visit / contact": "contact address",
    "Visit us": "contact address",
    "Talk to a counsellor": "call me back",
  };
  return map[label] ?? label;
}
