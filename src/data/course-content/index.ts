import type { CourseRichContent } from "./types";

// Tier 1
import { javaTrainingInPune } from "./java-training-in-pune";
import { pythonTrainingInPune } from "./python-training-in-pune";
import { javaFullStackTrainingInPune } from "./java-full-stack-training-in-pune";
import { mernStackTrainingInPune } from "./mern-stack-training-in-pune";
import { springBootMicroservicesTrainingInPune } from "./spring-boot-microservices-training-in-pune";

// Tier 2
import { awsTrainingInPune } from "./aws-training-in-pune";
import { dataScienceTrainingInPune } from "./data-science-training-in-pune";
import { machineLearningTrainingInPune } from "./machine-learning-training-in-pune";
import { devopsTrainingInPune } from "./devops-training-in-pune";
import { genaiTrainingInPune } from "./genai-training-in-pune";

// Tier 3
import { reactTrainingInPune } from "./react-training-in-pune";
import { angularTrainingInPune } from "./angular-training-in-pune";
import { nodejsTrainingInPune } from "./nodejs-training-in-pune";
import { dotnetFullStackTrainingInPune } from "./dotnet-full-stack-training-in-pune";
import { pythonFullStackTrainingInPune } from "./python-full-stack-training-in-pune";
import { azureTrainingInPune } from "./azure-training-in-pune";
import { kubernetesTrainingInPune } from "./kubernetes-training-in-pune";
import { dockerTrainingInPune } from "./docker-training-in-pune";

// Tier 4 — Programming + Modern Web
import { javascriptTrainingInPune } from "./javascript-training-in-pune";
import { cTrainingInPune } from "./c-training-in-pune";
import { cppTrainingInPune } from "./cpp-training-in-pune";
import { dotnetCsharpTrainingInPune } from "./dotnet-csharp-training-in-pune";
import { typescriptTrainingInPune } from "./typescript-training-in-pune";
import { nextjsTrainingInPune } from "./nextjs-training-in-pune";

// Tier 4 — Cloud + Cert prep
import { googleCloudTrainingInPune } from "./google-cloud-training-in-pune";
import { awsSolutionsArchitectTrainingInPune } from "./aws-solutions-architect-training-in-pune";
import { azureAdministratorTrainingInPune } from "./azure-administrator-training-in-pune";
import { gcpAssociateCloudEngineerTrainingInPune } from "./gcp-associate-cloud-engineer-training-in-pune";

// Tier 4 — Data & AI
import { dataAnalyticsTrainingInPune } from "./data-analytics-training-in-pune";
import { dataEngineeringTrainingInPune } from "./data-engineering-training-in-pune";
import { chatgptLlmsTrainingInPune } from "./chatgpt-llms-training-in-pune";
import { promptEngineeringTrainingInPune } from "./prompt-engineering-training-in-pune";
import { aiToolsTrainingInPune } from "./ai-tools-training-in-pune";

// Tier 4 — Mobile
import { androidDevelopmentTrainingInPune } from "./android-development-training-in-pune";
import { flutterDevelopmentTrainingInPune } from "./flutter-development-training-in-pune";
import { reactNativeTrainingInPune } from "./react-native-training-in-pune";
import { iosSwiftTrainingInPune } from "./ios-swift-training-in-pune";

// Tier 4 — Database
import { mysqlTrainingInPune } from "./mysql-training-in-pune";
import { postgresqlTrainingInPune } from "./postgresql-training-in-pune";
import { mongodbTrainingInPune } from "./mongodb-training-in-pune";
import { oracleDatabaseTrainingInPune } from "./oracle-database-training-in-pune";
import { firebaseTrainingInPune } from "./firebase-training-in-pune";

// P4-10 follow-up — rich content for the 4 courses shipped 2026-06-04/06
import { seleniumTrainingInPune } from "./selenium-training-in-pune";
import { softwareTestingTrainingInPune } from "./software-testing-training-in-pune";
import { salesforceTrainingInPune } from "./salesforce-training-in-pune";
import { agenticAITrainingInPune } from "./agentic-ai-training-in-pune";

/**
 * Registry of long-form rich content keyed by course slug.
 *
 * Add a new course here once its content file is written. Courses without
 * an entry continue to render the existing simple layout unchanged, so
 * the rollout is incremental and zero-risk.
 *
 * Tier 1 (shipped 2026-05-06): Java, Python, Java Full Stack, MERN, Spring Boot Microservices.
 * Tier 2 (shipped 2026-05-06): AWS, Data Science, Machine Learning, DevOps, Generative AI.
 * Tier 3 (shipped 2026-05-06): React, Angular, Node.js, .NET FS, Python FS, Azure, Kubernetes, Docker.
 * Tier 4 (this batch — 24 courses): JavaScript, C, C++, .NET / C#, TypeScript, Next.js,
 *   Google Cloud, AWS Solutions Architect, Azure Administrator, GCP Associate Cloud Engineer,
 *   Data Analytics, Data Engineering, ChatGPT & LLMs, Prompt Engineering, AI Tools,
 *   Android, Flutter, React Native, iOS / Swift,
 *   MySQL, PostgreSQL, MongoDB, Oracle Database, Firebase.
 *
 * P4-10 follow-up (added 2026-06-07): Selenium with Java, Software Testing & QA,
 *   Salesforce Admin + Developer, Agentic AI — all 4 rich-content overlays for
 *   the courses shipped 2026-06-04/06.
 *
 * Total: 45 of 45 tech-course slugs now have rich content
 * (modulo the 3 bootcamps in bootcamps.ts).
 */
export const courseRichContent: Record<string, CourseRichContent> = {
  // Tier 1
  "java-training-in-pune": javaTrainingInPune,
  "python-training-in-pune": pythonTrainingInPune,
  "java-full-stack-training-in-pune": javaFullStackTrainingInPune,
  "mern-stack-training-in-pune": mernStackTrainingInPune,
  "spring-boot-microservices-training-in-pune": springBootMicroservicesTrainingInPune,

  // Tier 2
  "aws-training-in-pune": awsTrainingInPune,
  "data-science-training-in-pune": dataScienceTrainingInPune,
  "machine-learning-training-in-pune": machineLearningTrainingInPune,
  "devops-training-in-pune": devopsTrainingInPune,
  "genai-training-in-pune": genaiTrainingInPune,

  // Tier 3
  "react-training-in-pune": reactTrainingInPune,
  "angular-training-in-pune": angularTrainingInPune,
  "nodejs-training-in-pune": nodejsTrainingInPune,
  "dotnet-full-stack-training-in-pune": dotnetFullStackTrainingInPune,
  "python-full-stack-training-in-pune": pythonFullStackTrainingInPune,
  "azure-training-in-pune": azureTrainingInPune,
  "kubernetes-training-in-pune": kubernetesTrainingInPune,
  "docker-training-in-pune": dockerTrainingInPune,

  // Tier 4 — Programming + Modern Web
  "javascript-training-in-pune": javascriptTrainingInPune,
  "c-training-in-pune": cTrainingInPune,
  "cpp-training-in-pune": cppTrainingInPune,
  "dotnet-csharp-training-in-pune": dotnetCsharpTrainingInPune,
  "typescript-training-in-pune": typescriptTrainingInPune,
  "nextjs-training-in-pune": nextjsTrainingInPune,

  // Tier 4 — Cloud + Cert prep
  "google-cloud-training-in-pune": googleCloudTrainingInPune,
  "aws-solutions-architect-training-in-pune": awsSolutionsArchitectTrainingInPune,
  "azure-administrator-training-in-pune": azureAdministratorTrainingInPune,
  "gcp-associate-cloud-engineer-training-in-pune": gcpAssociateCloudEngineerTrainingInPune,

  // Tier 4 — Data & AI
  "data-analytics-training-in-pune": dataAnalyticsTrainingInPune,
  "data-engineering-training-in-pune": dataEngineeringTrainingInPune,
  "chatgpt-llms-training-in-pune": chatgptLlmsTrainingInPune,
  "prompt-engineering-training-in-pune": promptEngineeringTrainingInPune,
  "ai-tools-training-in-pune": aiToolsTrainingInPune,

  // Tier 4 — Mobile
  "android-development-training-in-pune": androidDevelopmentTrainingInPune,
  "flutter-development-training-in-pune": flutterDevelopmentTrainingInPune,
  "react-native-training-in-pune": reactNativeTrainingInPune,
  "ios-swift-training-in-pune": iosSwiftTrainingInPune,

  // Tier 4 — Database
  "mysql-training-in-pune": mysqlTrainingInPune,
  "postgresql-training-in-pune": postgresqlTrainingInPune,
  "mongodb-training-in-pune": mongodbTrainingInPune,
  "oracle-database-training-in-pune": oracleDatabaseTrainingInPune,
  "firebase-training-in-pune": firebaseTrainingInPune,

  // P4-10 follow-up — courses shipped 2026-06-04/06
  "selenium-training-in-pune": seleniumTrainingInPune,
  "software-testing-training-in-pune": softwareTestingTrainingInPune,
  "salesforce-training-in-pune": salesforceTrainingInPune,
  "agentic-ai-training-in-pune": agenticAITrainingInPune,
};

export function getCourseRichContent(slug: string): CourseRichContent | null {
  return courseRichContent[slug] ?? null;
}

export type { CourseRichContent };
