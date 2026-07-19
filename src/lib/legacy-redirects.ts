// Single source of truth for permanent redirects from legacy URLs (old course
// slugs + WordPress-era URLs still in Google's index) to current pages.
//
// These are applied in middleware (not next.config `redirects()`) so a request
// to the trailing-slash variant Google indexed — e.g. `/best-angular-classes-in-pune/`
// — collapses to a SINGLE 308 straight to the destination. Config-level redirects
// can't do that: Next's built-in trailing-slash normalisation runs first and
// turns it into a 2-hop chain (`/x/` → `/x` → destination). Middleware runs
// before normalisation, so it issues one hop for both `/x` and `/x/`.
//
// Keep these live for at least 12 months per Google guidance.

interface LegacyRedirect {
  from: string;
  to: string;
}

// Legacy course slugs → SEO-targeted Pune slugs.
const courseSlugRedirects: LegacyRedirect[] = [
  // Programming
  { from: "/courses/programming/java", to: "/courses/programming/java-training-in-pune" },
  { from: "/courses/programming/python", to: "/courses/programming/python-training-in-pune" },
  { from: "/courses/programming/javascript", to: "/courses/programming/javascript-training-in-pune" },
  { from: "/courses/programming/c-cpp", to: "/courses/programming/c-training-in-pune" },
  { from: "/courses/programming/dotnet-csharp", to: "/courses/programming/dotnet-csharp-training-in-pune" },
  // Full Stack Development
  { from: "/courses/full-stack-development/java-full-stack", to: "/courses/full-stack-development/java-full-stack-training-in-pune" },
  { from: "/courses/full-stack-development/mern-stack", to: "/courses/full-stack-development/mern-stack-training-in-pune" },
  { from: "/courses/full-stack-development/python-full-stack", to: "/courses/full-stack-development/python-full-stack-training-in-pune" },
  { from: "/courses/full-stack-development/dotnet-full-stack", to: "/courses/full-stack-development/dotnet-full-stack-training-in-pune" },
  // Modern Web
  { from: "/courses/modern-web/react", to: "/courses/modern-web/react-training-in-pune" },
  { from: "/courses/modern-web/angular", to: "/courses/modern-web/angular-training-in-pune" },
  { from: "/courses/modern-web/nextjs", to: "/courses/modern-web/nextjs-training-in-pune" },
  { from: "/courses/modern-web/typescript", to: "/courses/modern-web/typescript-training-in-pune" },
  { from: "/courses/modern-web/nodejs", to: "/courses/modern-web/nodejs-training-in-pune" },
  // Cloud & DevOps
  { from: "/courses/cloud-devops/aws", to: "/courses/cloud-devops/aws-training-in-pune" },
  { from: "/courses/cloud-devops/azure", to: "/courses/cloud-devops/azure-training-in-pune" },
  { from: "/courses/cloud-devops/google-cloud", to: "/courses/cloud-devops/google-cloud-training-in-pune" },
  { from: "/courses/cloud-devops/devops", to: "/courses/cloud-devops/devops-training-in-pune" },
  { from: "/courses/cloud-devops/kubernetes", to: "/courses/cloud-devops/kubernetes-training-in-pune" },
  { from: "/courses/cloud-devops/docker", to: "/courses/cloud-devops/docker-training-in-pune" },
  // Cloud Certifications
  { from: "/courses/cloud-certifications/aws-solutions-architect", to: "/courses/cloud-certifications/aws-solutions-architect-training-in-pune" },
  { from: "/courses/cloud-certifications/azure-administrator", to: "/courses/cloud-certifications/azure-administrator-training-in-pune" },
  { from: "/courses/cloud-certifications/gcp-associate-cloud-engineer", to: "/courses/cloud-certifications/gcp-associate-cloud-engineer-training-in-pune" },
  // Data & AI
  { from: "/courses/data-ai/machine-learning", to: "/courses/data-ai/machine-learning-training-in-pune" },
  { from: "/courses/data-ai/data-science", to: "/courses/data-ai/data-science-training-in-pune" },
  { from: "/courses/data-ai/data-analytics", to: "/courses/data-ai/data-analytics-training-in-pune" },
  { from: "/courses/data-ai/data-engineering", to: "/courses/data-ai/data-engineering-training-in-pune" },
  // Generative AI
  { from: "/courses/generative-ai/generative-ai", to: "/courses/generative-ai/genai-training-in-pune" },
  { from: "/courses/generative-ai/chatgpt-llms", to: "/courses/generative-ai/chatgpt-llms-training-in-pune" },
  { from: "/courses/generative-ai/prompt-engineering", to: "/courses/generative-ai/prompt-engineering-training-in-pune" },
  { from: "/courses/generative-ai/ai-tools", to: "/courses/generative-ai/ai-tools-training-in-pune" },
  // Mobile App Development
  { from: "/courses/mobile-app-development/android-development", to: "/courses/mobile-app-development/android-development-training-in-pune" },
  { from: "/courses/mobile-app-development/flutter-development", to: "/courses/mobile-app-development/flutter-development-training-in-pune" },
  { from: "/courses/mobile-app-development/react-native", to: "/courses/mobile-app-development/react-native-training-in-pune" },
  { from: "/courses/mobile-app-development/ios-swift", to: "/courses/mobile-app-development/ios-swift-training-in-pune" },
  // Database Technologies
  { from: "/courses/database-technologies/mysql", to: "/courses/database-technologies/mysql-training-in-pune" },
  { from: "/courses/database-technologies/postgresql", to: "/courses/database-technologies/postgresql-training-in-pune" },
  { from: "/courses/database-technologies/mongodb", to: "/courses/database-technologies/mongodb-training-in-pune" },
  { from: "/courses/database-technologies/oracle-database", to: "/courses/database-technologies/oracle-database-training-in-pune" },
  { from: "/courses/database-technologies/firebase", to: "/courses/database-technologies/firebase-training-in-pune" },
  // Missing/wrong course-path slugs surfaced by the 2026-07-19 404 reconstruction
  // (crawl of all 439 live pages + candidate testing). These 404'd — no prior redirect.
  { from: "/courses/programming/spring-boot", to: "/courses/programming/spring-boot-microservices-training-in-pune" },
  { from: "/courses/generative-ai/agentic-ai", to: "/courses/generative-ai/agentic-ai-training-in-pune" },
  { from: "/courses/testing-qa/selenium-with-java-training-in-pune", to: "/courses/testing-qa/selenium-training-in-pune" },
  // Wrong category "data-analytics" (the real category is "data-ai") — these slugs are
  // linked from blog posts (7 references) and were returning 404.
  { from: "/courses/data-analytics/data-science-classes-in-pune", to: "/courses/data-ai/data-science-training-in-pune" },
  { from: "/courses/data-analytics/data-analytics-in-pune", to: "/courses/data-ai/data-analytics-training-in-pune" },
];

// Legacy WordPress URLs still in Google's index. Each maps to the closest
// current page on the new site.
const legacyWpRedirects: LegacyRedirect[] = [
  // Course pages — direct slug equivalents
  { from: "/python-training-in-pune", to: "/courses/programming/python-training-in-pune" },
  { from: "/best-java-classes-in-pune", to: "/courses/programming/java-training-in-pune" },
  { from: "/c-programming-training-in-pune", to: "/courses/programming/c-training-in-pune" },
  { from: "/best-c-c-data-structures-course-in-kothrud-pune", to: "/courses/programming/cpp-training-in-pune" },
  { from: "/best-springboot-microservices-training-classes-in-pune", to: "/courses/programming/spring-boot-microservices-training-in-pune" },
  { from: "/full-stack-java-developer-course-in-pune", to: "/courses/full-stack-development/java-full-stack-training-in-pune" },
  { from: "/java-full-stack-training-in-pune", to: "/courses/full-stack-development/java-full-stack-training-in-pune" },
  { from: "/full-stack-python-developer-course-in-pune", to: "/courses/full-stack-development/python-full-stack-training-in-pune" },
  { from: "/python-full-stack-training-in-pune", to: "/courses/full-stack-development/python-full-stack-training-in-pune" },
  { from: "/best-angular-classes-in-pune", to: "/courses/modern-web/angular-training-in-pune" },
  { from: "/best-ui-developer-course-in-kothrud-pune", to: "/courses/modern-web/react-training-in-pune" },
  { from: "/node-js-training-in-pune", to: "/courses/modern-web/nodejs-training-in-pune" },
  { from: "/devops-training-in-pune", to: "/courses/cloud-devops/devops-training-in-pune" },
  { from: "/best-data-science-training-class-in-pune", to: "/courses/data-ai/data-science-training-in-pune" },
  { from: "/best-tableau-training-in-pune", to: "/courses/data-ai/data-analytics-training-in-pune" },
  { from: "/best-power-bi-training-in-pune", to: "/courses/data-ai/data-analytics-training-in-pune" },
  { from: "/best-android-training-in-pune", to: "/courses/mobile-app-development/android-development-training-in-pune" },
  { from: "/best-mern-stack-training-classes-in-pune", to: "/courses/full-stack-development/mern-stack-training-in-pune" },
  { from: "/best-spring-hibernate-training-classes-in-pune", to: "/courses/programming/spring-boot-microservices-training-in-pune" },
  { from: "/full-stack-dot-net-developer-course-in-pune", to: "/courses/full-stack-development/dotnet-full-stack-training-in-pune" },
  { from: "/best-sql-training-classes-in-pune", to: "/courses/database-technologies/mysql-training-in-pune" },
  // `++` is a literal Map key here (middleware does exact-string lookup, not
  // path-to-regexp), so no escaping is needed — safe to redirect directly.
  { from: "/best-c-c++-data-structures-course-in-kothrud-pune", to: "/courses/programming/cpp-training-in-pune" },
  { from: "/best-react-classes-in-pune", to: "/courses/modern-web/react-training-in-pune" },
  // Selenium now has a dedicated course page — send its accrued authority there.
  { from: "/best-selenium-training-classes-in-pune", to: "/courses/testing-qa/selenium-training-in-pune" },
  // Listing / program pages
  { from: "/all-courses", to: "/courses" },
  { from: "/boot-camps", to: "/bootcamps" },
  { from: "/codeleapfor12thpassout", to: "/bootcamps/codeleap" },
  { from: "/techready-for-graduate-job-seekers", to: "/bootcamps/techready" },
  { from: "/programming-bootcamps-in-pune-for-engineering-students", to: "/bootcamps/careercode" },
  { from: "/internship-with-certification-in-pune", to: "/internships" },
  { from: "/pricing-faq", to: "/corporate-training" },
  { from: "/best-software-training-institute-in-pune", to: "/" },
  { from: "/full-stack-development-course-with-placement-assistance", to: "/courses/full-stack-development" },
  { from: "/about-us", to: "/about" },
  // Top-level legacy slugs surfaced by the 2026-07-19 404 reconstruction
  { from: "/courses/java", to: "/courses/programming/java-training-in-pune" },
  { from: "/courses/python", to: "/courses/programming/python-training-in-pune" },
  { from: "/java-training-in-pune", to: "/courses/programming/java-training-in-pune" },
  { from: "/blog/page/1", to: "/blog" },
  { from: "/contact-us", to: "/contact" },
  { from: "/course", to: "/courses" },
];

export const legacyRedirects: LegacyRedirect[] = [
  ...courseSlugRedirects,
  ...legacyWpRedirects,
];

// Path → destination lookup. Keys are normalised slash-less paths.
export const legacyRedirectMap: Map<string, string> = new Map(
  legacyRedirects.map(({ from, to }) => [from, to]),
);
