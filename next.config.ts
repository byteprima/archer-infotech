import type { NextConfig } from "next";

/* P-7 perf: bundle analysis via Turbopack-native flag —
 *   `npx next build --experimental-analyze`
 * emits a chunk treemap. @next/bundle-analyzer (webpack-only) does NOT
 * work under Next 16's Turbopack default. */

// Permanent redirects from legacy course slugs to SEO-targeted Pune slugs.
// Keep these live for at least 12 months per Google guidance.
const courseSlugRedirects = [
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
];

// Permanent redirects from legacy WordPress URLs that are still in Google's index.
// Each maps to the closest current page on the new site. Sources are written without
// trailing slashes — Next.js normalises trailing-slash variants automatically.
const legacyWpRedirects = [
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
  // Course pages — added 2026-05-07 from GSC 16-month impression data (URLs still
  // earning impressions but returning 404 on the new site).
  { from: "/best-mern-stack-training-classes-in-pune", to: "/courses/full-stack-development/mern-stack-training-in-pune" },
  { from: "/best-spring-hibernate-training-classes-in-pune", to: "/courses/programming/spring-boot-microservices-training-in-pune" },
  { from: "/full-stack-dot-net-developer-course-in-pune", to: "/courses/full-stack-development/dotnet-full-stack-training-in-pune" },
  { from: "/best-sql-training-classes-in-pune", to: "/courses/database-technologies/mysql-training-in-pune" },
  // NOTE: /best-c-c++-data-structures-course-in-kothrud-pune (70 impressions/16mo)
  // dropped — `++` triggers path-to-regexp MODIFIER parsing (Next.js redirect engine).
  // Escaping with `(\\+\\+)` works but adds maintenance debt for marginal traffic;
  // the closely-related /best-c-c-data-structures-course-in-kothrud-pune (no `++`)
  // is already mapped above and Google will canonicalize over time.
  { from: "/best-react-classes-in-pune", to: "/courses/modern-web/react-training-in-pune" },
  // Selenium has no equivalent course — send to /courses listing rather than 404.
  { from: "/best-selenium-training-classes-in-pune", to: "/courses" },
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
];

const nextConfig: NextConfig = {
  /**
   * P-7 perf: tree-shake barrel exports from large dependencies.
   *
   * Without this flag, an `import { ChevronLeft } from "lucide-react"` pulls
   * the full barrel module graph during bundling — PSI flagged 82.5 KiB of
   * unused 1st-party JS, much of it dead lucide-react icons and unused
   * @base-ui primitives that hitch a ride with their barrel siblings.
   *
   * Next.js rewrites these imports to direct subpath imports at build time,
   * which lets the bundler eliminate genuinely-unused exports. Universal
   * speed win — no behavioural change on any device.
   *
   * Verified safe for our deps:
   *   - lucide-react: official upstream support (Next 13+)
   *   - @base-ui/react: subpath exports already used in our shadcn primitives
   *   - posthog-js: tree-shakable; helps drop dead capture/replay code paths
   */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@base-ui/react",
      "posthog-js",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [...courseSlugRedirects, ...legacyWpRedirects].map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
  /**
   * Long-cache static assets. Next.js already sends the right Cache-Control
   * for /_next/static/* but PSI flagged ~153KiB savings from longer TTLs on
   * /images/* (logos, OG images, course thumbnails). These files are
   * content-hashed via Next.js or otherwise immutable in our deployment,
   * so 1-year cache + immutable is safe — we redeploy a fresh URL when
   * an image changes.
   */
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
