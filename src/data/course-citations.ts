import type { SourceCitation } from "@/components/seo/source-citations";

/**
 * Outbound citations for course detail pages.
 *
 * WHY THESE PAGES SPECIFICALLY. `SourceCitations` was already rendering on 36
 * routes, but not on the course detail pages — which are the longest on the
 * site at 3,000–5,000 words and make the most checkable claims. Every
 * statement about a framework's capabilities, an exam's structure or a
 * salary band was an uncorroborated assertion in our own voice.
 *
 * WHY IT MATTERS BEYOND TIDINESS. The Princeton/KDD '24 GEO study measured
 * "Cite Sources" at +27% citation visibility overall — and at **+115% for
 * pages ranking around position 5 or lower**, while it *reduced* visibility
 * for pages already ranking first. This site's money keywords sit near
 * position 50, which is the band where the method pays most. See
 * archer-obsidian/01-Archer-Infotech/seo-archerinfotech/llmo/.
 *
 * DISCIPLINE, inherited from the component's own doc comment: only cite a
 * source that actually backs a claim the page makes. Every entry names what
 * it supports. A decorative link to a well-known domain that supports
 * nothing is worse than no link at all — it is the citation equivalent of
 * keyword stuffing, which the same study measured as *below* doing nothing.
 *
 * Primary sources only: vendor documentation and official exam guides, never
 * a listicle about them. All URLs verified 200 on 2026-09-10.
 */

/** Sources every course page carries — the market and institute claims. */
const MARKET: SourceCitation[] = [
  {
    label: "AmbitionBox — salary data by role and city",
    href: "https://www.ambitionbox.com/profile",
    supports:
      "Fresher and mid-level salary bands quoted on this page are cross-checked against self-reported ranges for the same roles in Pune.",
  },
  {
    label: "Indeed India — Pune salary pages",
    href: "https://in.indeed.com/career/salaries",
    supports:
      "Pune-specific salary averages used to sanity-check the bands quoted for roles this course leads to.",
  },
  {
    label: "Archer Infotech Google Business Profile",
    href: "https://g.page/r/CTjK3JCeX55TEBM",
    supports:
      "The rating and review count shown on this site, verifiable by anyone with a Google account.",
  },
];

/**
 * Technical sources by topic. A course lists the topics it actually teaches;
 * the page renders the union of those plus MARKET.
 */
const TOPIC: Record<string, SourceCitation> = {
  java: {
    label: "Oracle — Java SE 21 documentation",
    href: "https://docs.oracle.com/en/java/javase/21/",
    supports:
      "The Java language and standard-library behaviour described in the curriculum, including the LTS release this course teaches against.",
  },
  spring: {
    label: "Spring Boot — official project documentation",
    href: "https://spring.io/projects/spring-boot",
    supports:
      "Spring Boot's auto-configuration, starters and application model as taught in the framework modules.",
  },
  python: {
    label: "Python Software Foundation — language documentation",
    href: "https://docs.python.org/3/",
    supports:
      "Python syntax, standard library and language behaviour covered in the curriculum.",
  },
  django: {
    label: "Django — official documentation",
    href: "https://docs.djangoproject.com/en/stable/",
    supports:
      "Django's ORM, admin, forms and REST patterns described in the backend modules.",
  },
  react: {
    label: "React — official documentation (react.dev)",
    href: "https://react.dev/learn",
    supports:
      "React components, hooks and rendering behaviour as taught in the frontend modules.",
  },
  angular: {
    label: "Angular — official documentation (angular.dev)",
    href: "https://angular.dev/overview",
    supports:
      "Angular components, dependency injection, routing and signals as covered in the curriculum.",
  },
  node: {
    label: "Node.js — official API documentation",
    href: "https://nodejs.org/docs/latest/api/",
    supports:
      "The Node.js runtime, event loop and core module behaviour described in the backend modules.",
  },
  typescript: {
    label: "TypeScript — official handbook",
    href: "https://www.typescriptlang.org/docs/",
    supports:
      "The TypeScript type system, generics and compiler options taught in the course.",
  },
  mongodb: {
    label: "MongoDB — official manual",
    href: "https://www.mongodb.com/docs/manual/",
    supports:
      "MongoDB document modelling, indexing and the aggregation pipeline as taught in the database modules.",
  },
  selenium: {
    label: "Selenium — official documentation",
    href: "https://www.selenium.dev/documentation/",
    supports:
      "Selenium WebDriver behaviour, locators and waits described in the automation modules.",
  },
  dotnet: {
    label: "Microsoft Learn — C# documentation",
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    supports:
      "C# language features and .NET behaviour described in the curriculum.",
  },
  nextjs: {
    label: "Next.js — official documentation",
    href: "https://nextjs.org/docs",
    supports:
      "App Router, Server Components, caching and rendering behaviour as taught in the course.",
  },
  aws: {
    label: "AWS — official service documentation",
    href: "https://docs.aws.amazon.com/",
    supports:
      "The AWS services, limits and architectural behaviour described across the curriculum.",
  },
  azure: {
    label: "Microsoft Learn — Azure documentation",
    href: "https://learn.microsoft.com/en-us/azure/",
    supports:
      "Azure services, resource hierarchy and platform behaviour covered in the modules.",
  },
  gcp: {
    label: "Google Cloud — official documentation",
    href: "https://cloud.google.com/docs",
    supports:
      "Google Cloud services, the resource hierarchy and gcloud behaviour taught in the course.",
  },
  docker: {
    label: "Docker — official documentation",
    href: "https://docs.docker.com/",
    supports:
      "Docker images, containers, registries and Compose behaviour as taught in the course.",
  },
  kubernetes: {
    label: "Kubernetes — official documentation",
    href: "https://kubernetes.io/docs/home/",
    supports:
      "Kubernetes pods, deployments, services and scaling behaviour described in the curriculum.",
  },
  flutter: {
    label: "Flutter — official documentation",
    href: "https://docs.flutter.dev/",
    supports:
      "Flutter widgets, the Dart language and the build-and-release process taught in the course.",
  },
  android: {
    label: "Android Developers — official documentation",
    href: "https://developer.android.com/docs",
    supports:
      "Android SDK, Kotlin, Jetpack Compose and Play Store release requirements covered in the modules.",
  },
  ios: {
    label: "Apple Developer — Swift documentation",
    href: "https://developer.apple.com/documentation/swift",
    supports:
      "Swift language behaviour and the Apple toolchain requirements described in the course.",
  },
  reactNative: {
    label: "React Native — official documentation",
    href: "https://reactnative.dev/docs/getting-started",
    supports:
      "React Native components, native modules and the build process taught in the course.",
  },
  postgres: {
    label: "PostgreSQL — official documentation",
    href: "https://www.postgresql.org/docs/current/",
    supports:
      "PostgreSQL SQL behaviour, indexing and query planning as covered in the database modules.",
  },
  oracleDb: {
    label: "Oracle — Database documentation",
    href: "https://docs.oracle.com/en/database/",
    supports:
      "Oracle Database features and administration behaviour described in the curriculum.",
  },
  firebase: {
    label: "Firebase — official documentation",
    href: "https://firebase.google.com/docs",
    supports:
      "Firestore, authentication and Cloud Functions behaviour taught in the course.",
  },
  sklearn: {
    label: "scikit-learn — user guide",
    href: "https://scikit-learn.org/stable/user_guide.html",
    supports:
      "The machine-learning algorithms, evaluation metrics and pipeline behaviour taught in the modules.",
  },
  pytorch: {
    label: "PyTorch — official documentation",
    href: "https://pytorch.org/docs/stable/index.html",
    supports:
      "Deep-learning model construction and training behaviour covered in the curriculum.",
  },
  pandas: {
    label: "pandas — official documentation",
    href: "https://pandas.pydata.org/docs/",
    supports:
      "DataFrame operations, indexing and data-cleaning behaviour taught in the analytics modules.",
  },
  spark: {
    label: "Apache Spark — official documentation",
    href: "https://spark.apache.org/docs/latest/",
    supports:
      "Spark and PySpark distributed-processing behaviour described in the data-engineering modules.",
  },
  powerbi: {
    label: "Microsoft Learn — Power BI documentation",
    href: "https://learn.microsoft.com/en-us/power-bi/",
    supports:
      "Power BI modelling, DAX and dashboard behaviour taught in the analytics modules.",
  },
  openai: {
    label: "OpenAI — platform documentation",
    href: "https://platform.openai.com/docs",
    supports:
      "The chat-completions and responses APIs, structured outputs and tool calling taught in the course.",
  },
  anthropic: {
    label: "Anthropic — Claude platform documentation",
    href: "https://docs.anthropic.com/en/docs/overview",
    supports:
      "Claude tool use, the Model Context Protocol and agent patterns covered in the curriculum.",
  },
  awsSaa: {
    label: "AWS — Solutions Architect Associate exam guide",
    href: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    supports:
      "The SAA-C03 exam domains and their published weightings that this course is structured around.",
  },
  azureAz104: {
    label: "Microsoft Learn — Azure Administrator (AZ-104) certification",
    href: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    supports:
      "The AZ-104 exam domains and weightings this course is structured around, and the renewal requirement.",
  },
  gcpAce: {
    label: "Google Cloud — Associate Cloud Engineer certification",
    href: "https://cloud.google.com/learn/certification/cloud-engineer",
    supports:
      "The Associate Cloud Engineer exam domains and the experience Google recommends before sitting it.",
  },
  salesforce: {
    label: "Salesforce Trailhead — Administrator credential",
    href: "https://trailhead.salesforce.com/credentials/administrator",
    supports:
      "The Salesforce credential this course prepares for, issued by Salesforce rather than by any training institute.",
  },
  cursor: {
    label: "Cursor — official documentation",
    href: "https://docs.cursor.com/",
    supports:
      "Cursor's codebase context, inline editing and composer behaviour as taught in the AI coding tools module.",
  },
  claudeCode: {
    label: "Anthropic — Claude Code documentation",
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    supports:
      "Claude Code's terminal agent workflow, planning and multi-file editing as taught in the tools and agent-workflow modules.",
  },
  copilot: {
    label: "GitHub Copilot — official documentation",
    href: "https://docs.github.com/en/copilot",
    supports:
      "GitHub Copilot's inline completion and chat features, and the editor integrations used in class.",
  },
  openaiPlatform: {
    label: "OpenAI — platform documentation",
    href: "https://platform.openai.com/docs",
    supports:
      "How OpenAI models generate code, including context windows and the limitations covered before the tools are introduced.",
  },
  vscode: {
    label: "Visual Studio Code — official documentation",
    href: "https://code.visualstudio.com/docs",
    supports:
      "The editor every tool in this course runs inside, including its debugging and source-control surfaces.",
  },
};

/** Topic keys per course slug. Only list what the course genuinely teaches. */
const COURSE_TOPICS: Record<string, (keyof typeof TOPIC)[]> = {
  "java-training-in-pune": ["java"],
  "vibe-coding-training-in-pune": [
    "cursor",
    "claudeCode",
    "copilot",
    "openaiPlatform",
    "vscode",
  ],
  "spring-boot-microservices-training-in-pune": ["java", "spring"],
  "java-full-stack-training-in-pune": ["java", "spring", "react"],
  "python-training-in-pune": ["python"],
  "python-full-stack-training-in-pune": ["python", "django", "react"],
  "javascript-training-in-pune": ["typescript"],
  "dotnet-csharp-training-in-pune": ["dotnet"],
  "dotnet-full-stack-training-in-pune": ["dotnet", "angular", "react"],
  "react-training-in-pune": ["react", "typescript"],
  "angular-training-in-pune": ["angular", "typescript"],
  "nextjs-training-in-pune": ["nextjs", "react"],
  "typescript-training-in-pune": ["typescript"],
  "nodejs-training-in-pune": ["node", "typescript"],
  "mern-stack-training-in-pune": ["react", "node", "mongodb", "typescript"],
  "mean-stack-training-in-pune": ["angular", "node", "mongodb", "typescript"],
  "mongodb-training-in-pune": ["mongodb"],
  "selenium-training-in-pune": ["selenium", "java"],
  "software-testing-training-in-pune": ["selenium"],
  "aws-training-in-pune": ["aws", "docker"],
  "azure-training-in-pune": ["azure", "docker"],
  "google-cloud-training-in-pune": ["gcp", "docker"],
  "devops-training-in-pune": ["docker", "kubernetes", "aws"],
  "docker-training-in-pune": ["docker"],
  "kubernetes-training-in-pune": ["kubernetes", "docker"],
  "flutter-development-training-in-pune": ["flutter"],
  "android-development-training-in-pune": ["android"],
  "ios-swift-training-in-pune": ["ios"],
  "react-native-training-in-pune": ["reactNative", "react"],
  "postgresql-training-in-pune": ["postgres"],
  "oracle-database-training-in-pune": ["oracleDb"],
  "firebase-training-in-pune": ["firebase"],
  "data-analytics-training-in-pune": ["pandas", "powerbi", "python"],
  "data-science-training-in-pune": ["python", "pandas", "sklearn"],
  "machine-learning-training-in-pune": ["sklearn", "pytorch", "python"],
  "data-engineering-training-in-pune": ["spark", "python", "postgres"],
  "genai-training-in-pune": ["openai", "anthropic", "python"],
  "agentic-ai-training-in-pune": ["anthropic", "openai", "python"],
  "chatgpt-llms-training-in-pune": ["openai"],
  "prompt-engineering-training-in-pune": ["openai", "anthropic"],
  "ai-tools-training-in-pune": ["openai"],
  "aws-solutions-architect-training-in-pune": ["awsSaa"],
  "azure-administrator-training-in-pune": ["azureAz104"],
  "gcp-associate-cloud-engineer-training-in-pune": ["gcpAce"],
  "salesforce-training-in-pune": ["salesforce"],
  "salesforce-administrator-training-in-pune": ["salesforce"],
  "salesforce-developer-training-in-pune": ["salesforce"],
};

/**
 * Citations for one course page. Returns the market sources every course
 * carries plus any topic sources that course actually teaches.
 */
export function getCourseCitations(slug: string): SourceCitation[] {
  const topics = COURSE_TOPICS[slug] ?? [];
  return [...topics.map((t) => TOPIC[t]), ...MARKET];
}
