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
  // Full Stack cluster — 2nd opportunity bucket per kpi_report.py
  // (114 impressions / 1 click for /courses/full-stack-development at
  // pos 74.6 — same pattern as cloud-devops).
  reactAngular: {
    title: "React vs Angular for Pune frontend",
    href: "/compare/react-vs-angular-for-pune-frontend-2026",
    type: "compare",
  },
  frontendBackend: {
    title: "Frontend vs Backend developer career",
    href: "/compare/frontend-vs-backend-developer-career-pune",
    type: "compare",
  },
  monoMicroservices: {
    title: "Monolith vs Microservices for Pune Java",
    href: "/compare/monolithic-vs-microservices-for-pune-java-developers-2026",
    type: "compare",
  },
  restGraphQL: {
    title: "REST vs GraphQL for Pune Full Stack",
    href: "/compare/rest-vs-graphql-for-pune-full-stack-2026",
    type: "compare",
  },
  tailwindBootstrap: {
    title: "Tailwind vs Bootstrap for Pune frontend",
    href: "/compare/tailwind-vs-bootstrap-for-pune-frontend-2026",
    type: "compare",
  },
  // Java cluster — 3rd opportunity bucket (programming category, 31i
  // / 1c pos 49.8). Most queries are "java training in pune".
  javaKotlin: {
    title: "Java vs Kotlin for Pune backend",
    href: "/compare/java-vs-kotlin-for-pune-backend-developers-2026",
    type: "compare",
  },
  mavenGradle: {
    title: "Maven vs Gradle for Pune Java devs",
    href: "/compare/maven-vs-gradle-for-pune-java-developers-2026",
    type: "compare",
  },
  // Data-AI cluster — 4th opportunity bucket (data-ai category, 19i /
  // 0c pos 60.7 for /courses/data-ai/data-engineering-training-in-pune).
  pandasNumpy: {
    title: "Pandas vs NumPy for Pune Python data",
    href: "/compare/pandas-vs-numpy-when-to-use-which-2026",
    type: "compare",
  },
  tensorflowPytorch: {
    title: "TensorFlow vs PyTorch for Pune ML",
    href: "/compare/tensorflow-vs-pytorch-for-pune-ml-engineers-2026",
    type: "compare",
  },
  supervisedUnsupervised: {
    title: "Supervised vs Unsupervised ML in Pune",
    href: "/compare/supervised-vs-unsupervised-learning-pune-data-scientists-2026",
    type: "compare",
  },
  randomForestXgboost: {
    title: "Random Forest vs XGBoost for Pune DS",
    href: "/compare/random-forest-vs-xgboost-for-pune-data-scientists-2026",
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
  // Full Stack cluster guides — see COMPARES.reactAngular comment.
  fullStackProjects: {
    title: "Best Full Stack projects for Pune resumes",
    href: "/guides/best-full-stack-projects-for-pune-resume-2026",
    type: "guide",
  },
  springBootProjects: {
    title: "Best Spring Boot projects for Pune resumes",
    href: "/guides/best-spring-boot-projects-for-pune-resume-2026",
    type: "guide",
  },
  springBootInterview: {
    title: "10 Spring Boot interview questions (Pune Java)",
    href: "/guides/spring-boot-interview-questions-pune-java-freshers-2026",
    type: "guide",
  },
  microservicesPatterns: {
    title: "10 Microservices patterns for Pune Java devs",
    href: "/guides/microservices-patterns-pune-java-developers-2026",
    type: "guide",
  },
  nodeJsConcepts: {
    title: "10 Node.js concepts for Pune Full Stack devs",
    href: "/guides/nodejs-concepts-pune-full-stack-developers-2026",
    type: "guide",
  },
  postgresqlQueries: {
    title: "10 PostgreSQL queries for Pune Full Stack devs",
    href: "/guides/postgresql-queries-pune-full-stack-developers-2026",
    type: "guide",
  },
  authPatterns: {
    title: "10 Auth patterns for Pune Full Stack devs",
    href: "/guides/authentication-authorization-patterns-pune-full-stack-2026",
    type: "guide",
  },
  // Java cluster guides
  javaConcurrency: {
    title: "10 Java concurrency patterns for Pune devs",
    href: "/guides/java-concurrency-patterns-pune-developers-2026",
    type: "guide",
  },
  javaStreams: {
    title: "10 Java Streams API patterns for Pune devs",
    href: "/guides/java-streams-api-patterns-pune-developers-2026",
    type: "guide",
  },
  // Modern Web cluster guides
  reactInterview: {
    title: "10 React interview questions (Pune Freshers)",
    href: "/guides/react-interview-questions-pune-freshers-2026",
    type: "guide",
  },
  // Data-AI cluster guides
  pythonInterview: {
    title: "10 Python interview questions (Pune Freshers)",
    href: "/guides/python-interview-questions-pune-freshers-2026",
    type: "guide",
  },
  sqlInterview: {
    title: "10 SQL interview questions (Pune Data)",
    href: "/guides/sql-interview-questions-pune-data-freshers-2026",
    type: "guide",
  },
  statisticsConcepts: {
    title: "Top 10 statistics concepts for Pune DS",
    href: "/guides/top-statistics-concepts-pune-data-scientists-2026",
    type: "guide",
  },
  pythonTesting: {
    title: "10 Python testing strategies for Pune devs",
    href: "/guides/python-testing-strategies-pune-engineers-2026",
    type: "guide",
  },
  featureEngineering: {
    title: "10 Feature engineering techniques (Pune DS)",
    href: "/guides/feature-engineering-techniques-pune-data-scientists-2026",
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
  if (isFullStack || isFrontend) {
    // Full Stack push — 2nd opportunity bucket. Surface frontend/full-
    // stack-specific compares so the cluster's internal-link graph
    // compounds the same way the DevOps push does for cloud-devops.
    picks.push(COMPARES.reactAngular);
    picks.push(COMPARES.frontendBackend);
    if (slug.includes("java") || slug.includes("spring") || slug.includes("microservice")) {
      picks.push(COMPARES.monoMicroservices);
    }
    if (isFullStack) {
      picks.push(COMPARES.restGraphQL);
    }
    if (isFrontend) {
      picks.push(COMPARES.tailwindBootstrap);
    }
  }
  // Java cluster (programming category) — 3rd opportunity push
  if (cat === "programming" && isJava) {
    picks.push(COMPARES.javaKotlin);
    picks.push(COMPARES.mavenGradle);
  }
  // Data-AI cluster — 4th opportunity push
  if (isData) {
    picks.push(COMPARES.pandasNumpy);
    if (slug.includes("machine-learning") || slug.includes("ml") || slug.includes("data-science")) {
      picks.push(COMPARES.tensorflowPytorch);
      picks.push(COMPARES.supervisedUnsupervised);
      picks.push(COMPARES.randomForestXgboost);
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
  if (isFullStack) {
    // Full Stack outcome push — 2nd opportunity bucket. Each FS course
    // page distributes link equity to the cluster's spoke guides.
    picks.push(GUIDES.fullStackProjects);
    picks.push(GUIDES.nodeJsConcepts);
    if (slug.includes("java") || slug.includes("spring")) {
      picks.push(GUIDES.springBootProjects);
      picks.push(GUIDES.springBootInterview);
      picks.push(GUIDES.microservicesPatterns);
    }
    if (slug.includes("postgres") || slug.includes("sql") || slug.includes("database")) {
      picks.push(GUIDES.postgresqlQueries);
    }
    picks.push(GUIDES.authPatterns);
  }
  // Java cluster — 3rd opportunity push
  if (cat === "programming" && isJava) {
    picks.push(GUIDES.javaConcurrency);
    picks.push(GUIDES.javaStreams);
    if (slug.includes("spring")) {
      picks.push(GUIDES.springBootInterview);
    }
  }
  // Modern Web (frontend) cluster
  if (isFrontend) {
    picks.push(GUIDES.reactInterview);
  }
  // Data-AI cluster — 4th opportunity push
  if (isData) {
    picks.push(GUIDES.pythonInterview);
    if (slug.includes("sql") || slug.includes("data-engineering")) {
      picks.push(GUIDES.sqlInterview);
    }
    if (slug.includes("data-science") || slug.includes("machine-learning") || slug.includes("ml")) {
      picks.push(GUIDES.statisticsConcepts);
      picks.push(GUIDES.featureEngineering);
    }
  }
  // Python guides — for python course pages even outside data-ai
  if (isPython) {
    picks.push(GUIDES.pythonInterview);
    picks.push(GUIDES.pythonTesting);
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

  // Full Stack cluster — 2nd opportunity bucket per kpi_report.py
  // (114 impressions / 1 click for /courses/full-stack-development at
  // pos 74.6, queries dominated by "full stack developer classes in
  // pune" + "full stack java developer course in pune").
  if (cat === "full-stack-development") {
    picks.push(COMPARES.mernJavaFs);
    picks.push(COMPARES.reactAngular);
    picks.push(COMPARES.frontendBackend);
    picks.push(COMPARES.restGraphQL);
    picks.push(GUIDES.fullStackProjects);
    picks.push(GUIDES.nodeJsConcepts);
    picks.push(GUIDES.springBootProjects);
    picks.push(GUIDES.authPatterns);
  }

  // Java cluster (programming category) — 3rd opportunity bucket
  // (31 impressions / 1 click for /courses/programming/java-training-
  // in-pune at pos 49.8).
  if (cat === "programming") {
    picks.push(COMPARES.javaPython);
    picks.push(COMPARES.javaKotlin);
    picks.push(COMPARES.mavenGradle);
    picks.push(COMPARES.monoMicroservices);
    picks.push(GUIDES.javaFrameworks);
    picks.push(GUIDES.javaConcurrency);
    picks.push(GUIDES.javaStreams);
    picks.push(GUIDES.springBootInterview);
  }

  // Modern Web cluster — 4th opportunity bucket (32i / 1c pos 23.1
  // for /courses/modern-web/react-training-in-pune; promising
  // because position is already top-of-page-2).
  if (cat === "modern-web") {
    picks.push(COMPARES.reactAngular);
    picks.push(COMPARES.frontendBackend);
    picks.push(COMPARES.tailwindBootstrap);
    picks.push(GUIDES.reactInterview);
    picks.push(GUIDES.freeFullStack);
    picks.push(GUIDES.nodeJsConcepts);
    picks.push(GUIDES.fullStackProjects);
  }

  // Data + AI cluster — 5th opportunity bucket (19i / 0c pos 60.7
  // for /courses/data-ai/data-engineering-training-in-pune; queries
  // include "data engineering training pune", "cloud data engineer
  // course in pune").
  if (cat === "data-ai") {
    picks.push(COMPARES.pyDevDataSci);
    picks.push(COMPARES.pandasNumpy);
    picks.push(COMPARES.tensorflowPytorch);
    picks.push(COMPARES.supervisedUnsupervised);
    picks.push(GUIDES.pythonInterview);
    picks.push(GUIDES.sqlInterview);
    picks.push(GUIDES.statisticsConcepts);
    picks.push(GUIDES.featureEngineering);
  }

  // Future buckets — wire up when KPI report identifies them. For now,
  // return tools-only on categories without a curated cluster so the
  // section still renders something useful.

  const seen = new Set<string>();
  return picks
    .filter((a) => (seen.has(a.href) ? false : (seen.add(a.href), true)))
    .slice(0, 8);
}
