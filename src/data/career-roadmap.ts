/**
 * Pune IT Career Roadmap dataset (P6-12 — Linkable Asset 2).
 *
 * A roadmap ties together pieces that already exist on the site into one
 * navigable journey per starting point:
 *   starting point → recommended bootcamp → core courses → target roles →
 *   salary trajectory.
 *
 * Roles reference `salary-data.ts` (so the salary trajectory stays a single
 * source of truth) and courses/bootcamps resolve against the catalogue at
 * render time. The whole roadmap is server-rendered for crawlability — its
 * link-earning value (college counsellors, career blogs, parent forums)
 * depends on the content being in the HTML, not behind JS.
 */

export interface CareerPath {
  /** Anchor id + key. */
  id: string;
  /** Headline starting point, e.g. "Just finished 12th". */
  startingPoint: string;
  /** Short who-you-are label for the nav, e.g. "After 12th". */
  navLabel: string;
  /** Matching audience landing page slug (/courses/for/<slug>). */
  audienceSlug: string;
  /** 1–2 sentence framing of the journey from here. */
  intro: string;
  bootcamp: { slug: string; name: string; why: string };
  /** Core course slugs for this path (resolved via getCourse). */
  courseSlugs: string[];
  /** Target salary-data role ids reachable on this path. */
  targetRoleIds: string[];
  /** The role whose fresher→lead bands illustrate the salary trajectory. */
  trajectoryRoleId: string;
  /** Qualitative journey stages (timeframe + what happens). */
  stages: { timeframe: string; title: string; detail: string }[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "after-12th",
    startingPoint: "Just finished 12th",
    navLabel: "After 12th",
    audienceSlug: "students-after-12th",
    intro:
      "You've completed 12th (any stream) with no coding background. The plan: build foundations now, pick a direction, then layer specialisation onto your degree so you graduate already employable.",
    bootcamp: {
      slug: "codeleap",
      name: "CodeLeap",
      why: "A 2-month hybrid vacation programme for 12th passouts — zero-to-first-project across web, Python or AI tracks.",
    },
    courseSlugs: [
      "python-training-in-pune",
      "javascript-training-in-pune",
      "java-training-in-pune",
    ],
    targetRoleIds: ["python-developer", "java-full-stack-developer", "data-analyst"],
    trajectoryRoleId: "python-developer",
    stages: [
      {
        timeframe: "Now (months 0–2)",
        title: "Foundations with CodeLeap",
        detail: "Learn to code from scratch and finish a real project before college starts.",
      },
      {
        timeframe: "Years 1–3 (during your degree)",
        title: "Specialise with CareerCode",
        detail: "Add a job-ready stack (full-stack, Python or data) semester by semester alongside your BE/BCA/BSc.",
      },
      {
        timeframe: "Final year → first job",
        title: "Placement & first role",
        detail: "Portfolio + interview prep + placement support convert your degree into a fresher IT offer.",
      },
    ],
  },
  {
    id: "engineering-student",
    startingPoint: "Engineering student",
    navLabel: "Engineering",
    audienceSlug: "engineering-students",
    intro:
      "You're in a BE/BTech and want industry-ready skills the syllabus skips. The plan: build a real stack across semesters and arrive at campus placements with projects and interview practice behind you.",
    bootcamp: {
      slug: "careercode",
      name: "CareerCode",
      why: "A semester-by-semester track that runs alongside your degree, with internship + placement preparation.",
    },
    courseSlugs: [
      "java-full-stack-training-in-pune",
      "mern-stack-training-in-pune",
      "data-science-training-in-pune",
    ],
    targetRoleIds: ["java-full-stack-developer", "mern-stack-developer", "data-scientist"],
    trajectoryRoleId: "java-full-stack-developer",
    stages: [
      {
        timeframe: "Years 1–2",
        title: "Build fundamentals",
        detail: "Start early with one strong language and your first projects via CareerCode.",
      },
      {
        timeframe: "Years 3–4",
        title: "Specialise + intern",
        detail: "Go deep on a full-stack or data track and do an internship to prove it.",
      },
      {
        timeframe: "Campus placements",
        title: "Convert to an offer",
        detail: "Mock interviews + a real portfolio + 100+ hiring partners turn skills into a fresher package.",
      },
    ],
  },
  {
    id: "graduate",
    startingPoint: "Graduate seeking a job",
    navLabel: "Graduate",
    audienceSlug: "graduates",
    intro:
      "You've graduated (any degree) and want a real IT job, not just a certificate. The plan: an intensive, full-time, placement-assisted programme that takes you to interview-ready in months.",
    bootcamp: {
      slug: "techready",
      name: "TechReady",
      why: "Full-time, 6–8 months, real projects daily + direct hiring connections with 100+ companies. Any-degree welcome.",
    },
    courseSlugs: [
      "java-full-stack-training-in-pune",
      "python-training-in-pune",
      "data-science-training-in-pune",
    ],
    targetRoleIds: ["java-full-stack-developer", "python-developer", "data-scientist"],
    trajectoryRoleId: "java-full-stack-developer",
    stages: [
      {
        timeframe: "Months 0–8",
        title: "Go all-in with TechReady",
        detail: "Build production-style projects full-time and develop genuine interview depth.",
      },
      {
        timeframe: "Placement phase",
        title: "Interview & get hired",
        detail: "Resume, mock interviews and direct drives with 100+ partners land your first IT role.",
      },
      {
        timeframe: "Years 1–3",
        title: "Grow into mid-level",
        detail: "Ship real work, deepen your stack, and move from fresher to mid-level pay.",
      },
    ],
  },
  {
    id: "working-professional",
    startingPoint: "Working professional / career switch",
    navLabel: "Working / Switch",
    audienceSlug: "working-professionals",
    intro:
      "You're already working — possibly outside IT — and want to upskill or switch. The plan: weekend/online learning around your job, targeting the highest-paid Pune tracks (cloud, DevOps, data, AI).",
    bootcamp: {
      slug: "techready",
      name: "TechReady",
      why: "For a full switch, the intensive placement-assisted format is the deepest path; for targeted upskilling, take individual courses in weekend/online batches.",
    },
    courseSlugs: [
      "aws-training-in-pune",
      "devops-training-in-pune",
      "data-science-training-in-pune",
      "genai-training-in-pune",
    ],
    targetRoleIds: ["aws-cloud-engineer", "devops-engineer", "data-scientist", "ai-genai-engineer"],
    trajectoryRoleId: "aws-cloud-engineer",
    stages: [
      {
        timeframe: "Months 0–6 (around your job)",
        title: "Upskill on weekends / online",
        detail: "Learn a high-demand track (cloud, DevOps, data or AI) without quitting your current role.",
      },
      {
        timeframe: "Transition",
        title: "Switch or get promoted",
        detail: "Use projects + placement support to move into the target role or earn the promotion.",
      },
      {
        timeframe: "Years 1–4 after switch",
        title: "Climb the senior bands",
        detail: "Cloud, DevOps and AI tracks reach the highest senior salary bands in Pune.",
      },
    ],
  },
];

export function getCareerPath(id: string): CareerPath | undefined {
  return careerPaths.find((p) => p.id === id);
}
