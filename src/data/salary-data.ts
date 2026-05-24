/**
 * Pune IT Salary Calculator dataset (P6-11 — Linkable Asset 1).
 *
 * Figures are expressed in ₹ lakh per annum (LPA) and are consistent with
 * the per-course salary bands already cited across the course-content files
 * (aggregated from AmbitionBox, Glassdoor, Indeed and PayScale Pune data).
 * This is a Pune-specific tool — the whole point of its link-earning value
 * is that it answers "what does X earn in PUNE", which generic national
 * calculators don't.
 *
 * Refresh discipline: revisit annually against the same sources; bump
 * SALARY_DATA_YEAR and the figures together. Never inflate numbers.
 */

export const SALARY_DATA_YEAR = 2026;

export interface ExperienceTier {
  /** Stable key used by the calculator <select>. */
  level: "fresher" | "mid" | "senior" | "lead";
  label: string;
  years: string;
  /** Pune range, ₹ LPA. */
  min: number;
  max: number;
}

export interface SalaryRole {
  id: string;
  title: string;
  /** High-level grouping for the table. */
  track: string;
  /** Course pages that lead to this role (slugs, resolved at render). */
  courseSlugs: string[];
  /** Pune market average for the role, ₹ LPA (cited "overall — Pune" figure). */
  puneAverage: number;
  /** One-line description of the role in the Pune market. */
  blurb: string;
  tiers: ExperienceTier[];
}

/** The four experience levels, in order — drives the calculator selector. */
export const EXPERIENCE_LEVELS: { level: ExperienceTier["level"]; label: string; years: string }[] = [
  { level: "fresher", label: "Fresher", years: "0–2 years" },
  { level: "mid", label: "Mid-level", years: "3–5 years" },
  { level: "senior", label: "Senior", years: "5–8 years" },
  { level: "lead", label: "Lead / Architect", years: "8+ years" },
];

function tiers(
  f: [number, number],
  m: [number, number],
  s: [number, number],
  l: [number, number],
): ExperienceTier[] {
  return [
    { level: "fresher", label: "Fresher", years: "0–2 years", min: f[0], max: f[1] },
    { level: "mid", label: "Mid-level", years: "3–5 years", min: m[0], max: m[1] },
    { level: "senior", label: "Senior", years: "5–8 years", min: s[0], max: s[1] },
    { level: "lead", label: "Lead / Architect", years: "8+ years", min: l[0], max: l[1] },
  ];
}

export const salaryRoles: SalaryRole[] = [
  {
    id: "java-developer",
    title: "Java Developer",
    track: "Programming",
    courseSlugs: ["java-training-in-pune", "spring-boot-microservices-training-in-pune"],
    puneAverage: 8.3,
    blurb: "Backend and enterprise services at Pune MNCs and GCC captives — the largest fresher-hiring volume in Pune.",
    tiers: tiers([3.5, 6], [8, 14], [14, 22], [22, 35]),
  },
  {
    id: "java-full-stack-developer",
    title: "Java Full Stack Developer",
    track: "Full Stack",
    courseSlugs: ["java-full-stack-training-in-pune"],
    puneAverage: 10.6,
    blurb: "End-to-end web applications on a Java/Spring backend with a modern frontend — strong, steady Pune demand.",
    tiers: tiers([4, 7], [9, 16], [16, 26], [26, 40]),
  },
  {
    id: "python-developer",
    title: "Python Developer",
    track: "Programming",
    courseSlugs: ["python-training-in-pune", "python-full-stack-training-in-pune"],
    puneAverage: 7.6,
    blurb: "Backend, automation and data-pipeline work at product startups and captives; a natural on-ramp to data/AI.",
    tiers: tiers([3.5, 6], [8, 14], [15, 25], [25, 38]),
  },
  {
    id: "mern-stack-developer",
    title: "MERN Stack Developer",
    track: "Full Stack",
    courseSlugs: ["mern-stack-training-in-pune"],
    puneAverage: 7.5,
    blurb: "JavaScript end-to-end (MongoDB, Express, React, Node) at Pune product, SaaS and fintech teams.",
    tiers: tiers([3.2, 5.8], [8, 14], [14, 24], [24, 36]),
  },
  {
    id: "dotnet-full-stack-developer",
    title: ".NET Full Stack Developer",
    track: "Full Stack",
    courseSlugs: ["dotnet-full-stack-training-in-pune", "dotnet-csharp-training-in-pune"],
    puneAverage: 7.2,
    blurb: "ASP.NET Core full-stack engagements at GCC captives and Microsoft-stack product firms across Pune.",
    tiers: tiers([3.5, 6.5], [10, 17], [16, 26], [26, 38]),
  },
  {
    id: "react-frontend-developer",
    title: "React / Frontend Developer",
    track: "Modern Web",
    courseSlugs: ["react-training-in-pune", "angular-training-in-pune"],
    puneAverage: 6.2,
    blurb: "User interfaces in React/Angular at Pune product companies, SaaS and startups.",
    tiers: tiers([3.5, 6], [9, 16], [15, 24], [24, 36]),
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    track: "Data & AI",
    courseSlugs: ["data-analytics-training-in-pune"],
    puneAverage: 5.8,
    blurb: "Reporting, dashboards and business insight at Pune analytics teams and GCC captives.",
    tiers: tiers([3.5, 6], [7, 11], [10, 15], [16, 28]),
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    track: "Data & AI",
    courseSlugs: ["data-science-training-in-pune"],
    puneAverage: 10.8,
    blurb: "Modelling, experimentation and ML at Pune product engineering and analytics firms.",
    tiers: tiers([4.5, 7.5], [10, 18], [15, 26], [26, 45]),
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    track: "Data & AI",
    courseSlugs: ["machine-learning-training-in-pune"],
    puneAverage: 10.3,
    blurb: "Productionising ML systems at Pune product companies and captives — among the highest-paid IC tracks.",
    tiers: tiers([6, 10], [14, 22], [24, 42], [42, 60]),
  },
  {
    id: "ai-genai-engineer",
    title: "AI / GenAI Engineer",
    track: "Generative AI",
    courseSlugs: ["genai-training-in-pune", "chatgpt-llms-training-in-pune"],
    puneAverage: 9.9,
    blurb: "LLM integration, RAG and applied-AI work — the fastest-rising pay band in Pune in 2026.",
    tiers: tiers([6, 12], [16, 26], [28, 50], [50, 70]),
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    track: "Cloud & DevOps",
    courseSlugs: ["devops-training-in-pune", "kubernetes-training-in-pune"],
    puneAverage: 7.1,
    blurb: "CI/CD, Kubernetes and platform engineering at Pune product and BFSI teams.",
    tiers: tiers([4, 7], [12, 20], [16, 28], [28, 45]),
  },
  {
    id: "aws-cloud-engineer",
    title: "AWS Cloud Engineer",
    track: "Cloud & DevOps",
    courseSlugs: ["aws-training-in-pune", "aws-solutions-architect-training-in-pune"],
    puneAverage: 6.7,
    blurb: "Cloud infrastructure and architecture (often AWS-certified) at Pune product engineering and BFSI firms.",
    tiers: tiers([4.5, 6.5], [12, 18], [20, 35], [35, 55]),
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer (Flutter / Android)",
    track: "Mobile",
    courseSlugs: ["flutter-development-training-in-pune", "android-development-training-in-pune"],
    puneAverage: 6.8,
    blurb: "Cross-platform and native mobile apps at Pune product, consumer and services companies.",
    tiers: tiers([3.5, 6.5], [10, 17], [16, 28], [26, 45]),
  },
];

export function getSalaryRole(id: string): SalaryRole | undefined {
  return salaryRoles.find((r) => r.id === id);
}

/** Format a ₹ LPA number for display: 3.5 → "₹3.5 LPA", 14 → "₹14 LPA". */
export function formatLpa(value: number): string {
  const n = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  return `₹${n} LPA`;
}

/** Format a tier range, e.g. "₹3.5–6 LPA". */
export function formatRange(min: number, max: number): string {
  const fmt = (v: number) => (Number.isInteger(v) ? v.toString() : v.toFixed(1));
  return `₹${fmt(min)}–${fmt(max)} LPA`;
}
