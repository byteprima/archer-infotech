/**
 * Map a course (slug + category) to the most relevant tools / comparison /
 * guide pages built in this SEO cycle. Surfaces them in a contextual
 * "Related tools, comparisons & guides" block on the course detail page —
 * compounds internal-link authority and improves the journey from "I'm
 * researching this course" to "I'm sold on Archer".
 */

export interface RelatedAsset {
  title: string;
  href: string;
  type: "tool" | "compare" | "guide";
}

const TOOLS = {
  salaryCalc: {
    title: "Pune IT Salary Calculator",
    href: "/tools/pune-it-salary-calculator",
    type: "tool",
  },
  careerRoadmap: {
    title: "Pune IT Career Roadmap",
    href: "/tools/pune-it-career-roadmap",
    type: "tool",
  },
} as const satisfies Record<string, RelatedAsset>;

const COMPARES = {
  javaPython: {
    title: "Java vs Python for beginners",
    href: "/compare/java-vs-python-for-beginners",
    type: "compare",
  },
  mernJavaFs: {
    title: "MERN Stack vs Java Full Stack",
    href: "/compare/mern-vs-java-full-stack",
    type: "compare",
  },
  onlineOffline: {
    title: "Online vs offline IT training",
    href: "/compare/online-vs-offline-it-training",
    type: "compare",
  },
  pyDevDataSci: {
    title: "Python Developer vs Data Scientist",
    href: "/compare/python-developer-vs-data-scientist",
    type: "compare",
  },
  bootcampSelf: {
    title: "Coding bootcamp vs self-study",
    href: "/compare/coding-bootcamp-vs-self-study",
    type: "compare",
  },
  // DevOps cluster — built to feed the cloud-devops outcome push.
  // GSC showed 134 impressions / 0 clicks for DevOps queries at pos
  // 55-91 (all landing on /courses/cloud-devops). Surfacing these
  // spokes from the hub + course detail pages compounds the topic-
  // cluster authority signal.
  awsAzure: {
    title: "AWS vs Azure for Pune cloud careers",
    href: "/compare/aws-vs-azure-for-pune-cloud-careers-2026",
    type: "compare",
  },
  sreDevOps: {
    title: "SRE vs DevOps Engineer in Pune",
    href: "/compare/sre-vs-devops-engineer-career-pune-2026",
    type: "compare",
  },
  terraformAnsible: {
    title: "Terraform vs Ansible for Pune DevOps",
    href: "/compare/terraform-vs-ansible-for-pune-devops-2026",
    type: "compare",
  },
} as const satisfies Record<string, RelatedAsset>;

const GUIDES = {
  pythonProjects: {
    title: "10 Best Python projects for your resume",
    href: "/guides/best-python-projects-for-resume-2026",
    type: "guide",
  },
  freshSkills: {
    title: "Top 7 IT skills Pune freshers should learn",
    href: "/guides/top-it-skills-pune-freshers-2026",
    type: "guide",
  },
  javaFrameworks: {
    title: "12 Java frameworks every backend dev should know",
    href: "/guides/java-frameworks-every-backend-developer-should-know",
    type: "guide",
  },
  freeFullStack: {
    title: "8 free resources to learn full-stack",
    href: "/guides/free-resources-to-learn-full-stack-development",
    type: "guide",
  },
  highestPaying: {
    title: "5 highest-paying IT roles in Pune",
    href: "/guides/highest-paying-it-roles-pune-engineering-graduates",
    type: "guide",
  },
  // DevOps cluster guides — see COMPARES section comment for rationale.
  dockerBestPractices: {
    title: "10 Docker best practices for Pune DevOps",
    href: "/guides/docker-best-practices-pune-devops-engineers-2026",
    type: "guide",
  },
  githubActionsWorkflows: {
    title: "10 GitHub Actions workflows for Pune DevOps",
    href: "/guides/github-actions-workflows-pune-devops-engineers-2026",
    type: "guide",
  },
  kubernetesInterview: {
    title: "10 Kubernetes interview questions (Pune)",
    href: "/guides/kubernetes-interview-questions-pune-devops-freshers-2026",
    type: "guide",
  },
  linuxCommands: {
    title: "Top 25 Linux commands for Pune DevOps",
    href: "/guides/linux-commands-pune-devops-freshers-2026",
    type: "guide",
  },
} as const satisfies Record<string, RelatedAsset>;

/**
 * Return up to 6 contextually-relevant assets for a course, ordered:
 * tools → comparisons → guides. Always includes the two tools (universal
 * value), then picks topic-matched comparisons/guides, then back-fills with
 * always-relevant choices (online-vs-offline, fresher-skills) until cap.
 */
export function getRelatedAssetsForCourse(
  courseSlug: string,
  categorySlug: string,
): RelatedAsset[] {
  const slug = courseSlug.toLowerCase();
  const cat = categorySlug.toLowerCase();

  const isJava = slug.includes("java") || slug.includes("spring") || slug.includes("dotnet");
  const isPython = slug.includes("python");
  const isFullStack = cat === "full-stack-development";
  const isFrontend = cat === "modern-web";
  const isData = cat === "data-ai";
  const isAi = cat === "generative-ai";
  const isCloud = cat === "cloud-devops" || cat === "cloud-certifications";
  const isMobile = cat === "mobile-app-development";

  const picks: RelatedAsset[] = [TOOLS.salaryCalc, TOOLS.careerRoadmap];

  // Comparisons — topic-matched first
  if (isJava || isPython) picks.push(COMPARES.javaPython);
  if (isFullStack || slug.includes("mern")) picks.push(COMPARES.mernJavaFs);
  if (isPython || isData) picks.push(COMPARES.pyDevDataSci);
  if (isCloud) {
    // DevOps push — these surface on every cloud-devops course detail
    // page so the cluster's internal-link graph compounds.
    picks.push(COMPARES.awsAzure);
    picks.push(COMPARES.sreDevOps);
    if (slug.includes("devops") || slug.includes("terraform") || slug.includes("ansible")) {
      picks.push(COMPARES.terraformAnsible);
    }
  }
  picks.push(COMPARES.onlineOffline);
  if (isMobile || isFrontend) picks.push(COMPARES.bootcampSelf);

  // Guides — topic-matched first
  if (isPython || isData || isAi) picks.push(GUIDES.pythonProjects);
  if (isJava) picks.push(GUIDES.javaFrameworks);
  if (isFullStack || isFrontend) picks.push(GUIDES.freeFullStack);
  if (isData || isAi || isCloud) picks.push(GUIDES.highestPaying);
  if (isCloud) {
    // DevOps outcome push — pick the cluster's spoke guides so the
    // course detail page distributes link equity downward.
    if (slug.includes("devops") || cat === "cloud-devops") {
      picks.push(GUIDES.dockerBestPractices);
      picks.push(GUIDES.githubActionsWorkflows);
      picks.push(GUIDES.kubernetesInterview);
      picks.push(GUIDES.linuxCommands);
    }
  }
  picks.push(GUIDES.freshSkills);

  // Dedupe + cap at 6.
  const seen = new Set<string>();
  return picks
    .filter((a) => (seen.has(a.href) ? false : (seen.add(a.href), true)))
    .slice(0, 6);
}

/**
 * Category-hub variant — surfaces the SAME cluster spokes (guides,
 * compares, tools) on /courses/[category] hub pages, not just the per-
 * course detail pages. Currently scoped to cloud-devops where the GSC
 * data showed 134 impressions / 0 clicks at depth-of-funnel positions
 * 55-91 — internal-link compounding is the cheapest way to shift the
 * hub up the SERP. Expand to other clusters as opportunity buckets
 * surface in kpi_report.py.
 */
export function getRelatedAssetsForCategory(
  categorySlug: string,
): RelatedAsset[] {
  const cat = categorySlug.toLowerCase();
  const picks: RelatedAsset[] = [TOOLS.salaryCalc, TOOLS.careerRoadmap];

  if (cat === "cloud-devops" || cat === "cloud-certifications") {
    picks.push(COMPARES.awsAzure);
    picks.push(COMPARES.sreDevOps);
    picks.push(COMPARES.terraformAnsible);
    picks.push(GUIDES.dockerBestPractices);
    picks.push(GUIDES.githubActionsWorkflows);
    picks.push(GUIDES.kubernetesInterview);
    picks.push(GUIDES.linuxCommands);
    picks.push(GUIDES.highestPaying);
  }

  // Future buckets — wire up when KPI report identifies them. For now,
  // return tools-only on categories without a curated cluster so the
  // section still renders something useful.

  const seen = new Set<string>();
  return picks
    .filter((a) => (seen.has(a.href) ? false : (seen.add(a.href), true)))
    .slice(0, 8);
}
