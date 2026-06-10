/**
 * P8-12 + DevOps-outcome push — map a /guides/[slug] page to the
 * Archer course category most relevant to the guide's topic.
 *
 * Used at the bottom of each guide page to add a "Recommended Archer
 * course" link block alongside the generic "Book a Free Demo" CTA.
 * This reverse-links the spoke → hub direction so the topic-cluster
 * link graph compounds: each /guides/* DevOps post passes link equity
 * UP to /courses/cloud-devops, which is the hub Google is currently
 * ranking at depth-of-funnel positions 55-91 (per GSC May 2026 data,
 * 134 impressions / 0 clicks).
 *
 * Returns null when no confident category match exists — the guide
 * page falls back to the generic CTA only.
 */

interface RecommendedCourseLink {
  /** Display title for the link block. */
  title: string;
  /** Path to the course category hub. */
  href: string;
  /** One-line context for the link. */
  blurb: string;
}

const KEYWORD_RULES: Array<{
  match: (slug: string) => boolean;
  rec: RecommendedCourseLink;
}> = [
  // DevOps cluster — slug must include explicit DevOps keyword OR a
  // tool that's primarily DevOps-domain. The order matters because the
  // first match wins.
  {
    match: (s) =>
      /\b(devops|kubernetes|docker|terraform|ansible|github-actions|jenkins|ci-cd)\b/.test(s),
    rec: {
      title: "Cloud + DevOps Courses in Pune",
      href: "/courses/cloud-devops",
      blurb:
        "Hands-on Docker, Kubernetes, Terraform, Jenkins and CI/CD — classroom + online batches with placement assistance.",
    },
  },
  // AWS / Azure / GCP — separate category (cloud certifications)
  {
    match: (s) => /\b(aws|azure|gcp|cloud)\b/.test(s) && !/\b(devops)\b/.test(s),
    rec: {
      title: "Cloud Certification Courses in Pune",
      href: "/courses/cloud-certifications",
      blurb:
        "AWS Solutions Architect, Azure Administrator, and Google Cloud certs with hands-on labs and exam prep.",
    },
  },
  // Java Full Stack (Spring + microservices guides) — route to the
  // Full Stack track which is the natural sales path for these topics.
  {
    match: (s) => /\b(spring|spring-boot|microservic)\b/.test(s),
    rec: {
      title: "Java Full Stack Training in Pune",
      href: "/courses/full-stack-development/java-full-stack-training-in-pune",
      blurb:
        "Core Java + Spring Boot + microservices + React, with the Pune-MNC interview prep we cover end-to-end.",
    },
  },
  // Generic Java (concurrency, streams, fundamentals) — route to the
  // Java training detail page in the programming category, which is
  // the 3rd opportunity bucket per kpi_report.py (31 impressions /
  // 1 click at pos 49.8 for /courses/programming/java-training-in-pune).
  {
    match: (s) => /\b(java)\b/.test(s),
    rec: {
      title: "Java Training in Pune",
      href: "/courses/programming/java-training-in-pune",
      blurb:
        "Core Java fundamentals + OOP + Streams + Concurrency + collections — the foundation for every Pune Java role.",
    },
  },
  // Python / Django / FastAPI / Pandas
  {
    match: (s) => /\b(python|django|fastapi|pandas|numpy|pytest|pydantic)\b/.test(s),
    rec: {
      title: "Python Training in Pune",
      href: "/courses/programming/python-training-in-pune",
      blurb:
        "Python from fundamentals to Django/FastAPI + data libraries (Pandas, NumPy) + interview prep.",
    },
  },
  // Data / ML / AI / Data engineering — 4th opportunity bucket per
  // kpi_report.py (data-ai category at pos 60.7 with 19i / 0c for
  // /courses/data-ai/data-engineering-training-in-pune).
  {
    match: (s) =>
      /\b(data-science|machine-learning|ml|statistics|feature-engineering|data-engineering|tensorflow|pytorch|xgboost|supervised|unsupervised)\b/.test(
        s,
      ),
    rec: {
      title: "Data Science & AI Courses in Pune",
      href: "/courses/data-ai",
      blurb:
        "Python, Pandas, scikit-learn, TensorFlow, PyTorch and the end-to-end ML pipeline used in Pune product roles.",
    },
  },
  // GenAI / LLMs
  {
    match: (s) => /\b(generative-ai|genai|llm|prompt|rag|langchain)\b/.test(s),
    rec: {
      title: "Generative AI Courses in Pune",
      href: "/courses/generative-ai",
      blurb:
        "ChatGPT/Claude APIs, LangChain, RAG pipelines, Agentic AI — the GenAI stack Pune product teams are hiring for.",
    },
  },
  // Frontend
  {
    match: (s) => /\b(react|angular|vue|frontend|html|css|tailwind|bootstrap)\b/.test(s),
    rec: {
      title: "Modern Web Development Courses in Pune",
      href: "/courses/modern-web",
      blurb:
        "React, Angular, Next.js and Node.js — the modern web stack Pune product companies hire from.",
    },
  },
  // Node / Backend / Full Stack — covers the 2nd opportunity bucket
  // surfaced by kpi_report.py (full-stack-development category at pos
  // 74.6 with 114 impressions / 1 click). Matches both Node-specific
  // guides AND general full-stack-development guides.
  {
    match: (s) =>
      /\b(node|nodejs|express|backend|full-stack|full_stack|fullstack|mern|microservices|rest|graphql|authentication|authorization|postgresql|postgres)\b/.test(
        s,
      ),
    rec: {
      title: "Full Stack Development Courses in Pune",
      href: "/courses/full-stack-development",
      blurb:
        "Node.js, Express, MongoDB and the MERN stack — paired with placement-focused project work.",
    },
  },
  // SQL / DB
  {
    match: (s) => /\b(sql|postgresql|mysql|mongodb|database)\b/.test(s),
    rec: {
      title: "Database Technologies in Pune",
      href: "/courses/database-technologies",
      blurb:
        "MySQL, PostgreSQL, MongoDB and the design + tuning skills Pune backend roles screen on.",
    },
  },
];

export function getRecommendedCourseForGuide(
  slug: string,
): RecommendedCourseLink | null {
  const s = slug.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.match(s)) return rule.rec;
  }
  return null;
}
