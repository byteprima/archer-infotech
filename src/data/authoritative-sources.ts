import type { SourceCitation } from "@/components/seo/source-citations";

/**
 * Canonical registry of authoritative external sources, keyed by technology.
 *
 * Why this exists: the 2026-08-06 crawl found 194 pages across the course
 * and guide route families with zero editorial outbound links, so every
 * factual claim on them read as uncorroborated to a crawler. Retrieval-based
 * engines weight corroborated claims far more heavily than bare assertions.
 *
 * Why keyed on technology rather than inherited from the parent course's
 * rich content: the rich-content sources are salary references (Glassdoor,
 * AmbitionBox, Indeed, 6figr). Those are exactly right on a course detail
 * page, which publishes salary bands — but a course x location page renders
 * `intro` / `whyHere` / `faqs` and makes no salary claim at all. Citing a
 * salary source there would back nothing on the page, which is worse than
 * citing nothing. What every one of those pages *does* discuss is the
 * technology being taught, so that is what gets cited.
 *
 * Discipline for adding entries:
 *   - Official/primary sources only — vendor documentation, standards
 *     bodies, certification programmes. Not blogs, not aggregators.
 *   - Stable URLs. Prefer a docs root over a deep-linked page that will
 *     404 after the next version bump.
 *   - `supports` must name a claim the page actually makes. If you cannot
 *     write that sentence honestly, the source does not belong here.
 */

/** Ordered most-specific first — `resolve` stops at the first match. */
const REGISTRY: Array<{ match: RegExp; sources: SourceCitation[] }> = [
  // ── Full-stack composites (before their constituent languages) ─────────
  {
    match: /java-full-stack/,
    sources: [
      {
        label: "Oracle Java SE documentation",
        href: "https://docs.oracle.com/en/java/javase/",
        supports: "the official Java language reference behind the backend half of this track.",
      },
      {
        label: "Spring Boot project documentation",
        href: "https://spring.io/projects/spring-boot",
        supports: "the official reference for the Spring Boot framework taught in this course.",
      },
      {
        label: "MDN Web Docs — JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        supports: "the standards reference for the front-end half of this track.",
      },
    ],
  },
  {
    match: /python-full-stack/,
    sources: [
      {
        label: "Python Software Foundation documentation",
        href: "https://docs.python.org/3/",
        supports: "the official Python language reference behind this track.",
      },
      {
        label: "Django documentation",
        href: "https://docs.djangoproject.com/en/stable/",
        supports: "the official reference for the Python web framework taught here.",
      },
      {
        label: "MDN Web Docs — JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        supports: "the standards reference for the front-end half of this track.",
      },
    ],
  },
  {
    match: /dotnet-full-stack/,
    sources: [
      {
        label: "Microsoft .NET documentation",
        href: "https://learn.microsoft.com/en-us/dotnet/",
        supports: "the official .NET platform reference behind this track.",
      },
      {
        label: "ASP.NET Core documentation",
        href: "https://learn.microsoft.com/en-us/aspnet/core/",
        supports: "the official reference for the web framework taught in this course.",
      },
    ],
  },
  {
    match: /mern-stack/,
    sources: [
      {
        label: "React documentation",
        href: "https://react.dev/",
        supports: "the official React reference — the R in the MERN stack.",
      },
      {
        label: "MongoDB Manual",
        href: "https://www.mongodb.com/docs/manual/",
        supports: "the official MongoDB reference — the M in the MERN stack.",
      },
      {
        label: "Node.js API documentation",
        href: "https://nodejs.org/docs/latest/api/",
        supports: "the official Node.js reference — the N in the MERN stack.",
      },
    ],
  },

  // ── Cloud & certification tracks ───────────────────────────────────────
  {
    match: /aws-solutions-architect|aws/,
    sources: [
      {
        label: "AWS Certification",
        href: "https://aws.amazon.com/certification/",
        supports: "the official AWS certification paths this course prepares for.",
      },
      {
        label: "AWS Documentation",
        href: "https://docs.aws.amazon.com/",
        supports: "the official AWS service reference used throughout the curriculum.",
      },
    ],
  },
  {
    match: /azure/,
    sources: [
      {
        label: "Microsoft Credentials",
        href: "https://learn.microsoft.com/en-us/credentials/",
        supports: "the official Azure certification paths this course prepares for.",
      },
      {
        label: "Microsoft Azure documentation",
        href: "https://learn.microsoft.com/en-us/azure/",
        supports: "the official Azure service reference used throughout the curriculum.",
      },
    ],
  },
  {
    match: /gcp|google-cloud/,
    sources: [
      {
        label: "Google Cloud certification",
        href: "https://cloud.google.com/learn/certification",
        supports: "the official Google Cloud certification paths this course prepares for.",
      },
      {
        label: "Google Cloud documentation",
        href: "https://cloud.google.com/docs",
        supports: "the official Google Cloud service reference used in the curriculum.",
      },
    ],
  },
  {
    match: /kubernetes/,
    sources: [
      {
        label: "Kubernetes documentation",
        href: "https://kubernetes.io/docs/home/",
        supports: "the official Kubernetes reference for the concepts taught here.",
      },
      {
        label: "CNCF certification programmes",
        href: "https://www.cncf.io/training/certification/",
        supports: "the CKA certification this course prepares for.",
      },
    ],
  },
  {
    match: /docker/,
    sources: [
      {
        label: "Docker documentation",
        href: "https://docs.docker.com/",
        supports: "the official Docker reference for the containerisation topics taught here.",
      },
    ],
  },
  {
    match: /devops/,
    sources: [
      {
        label: "Docker documentation",
        href: "https://docs.docker.com/",
        supports: "the official reference for the containerisation half of this track.",
      },
      {
        label: "Kubernetes documentation",
        href: "https://kubernetes.io/docs/home/",
        supports: "the official reference for the orchestration half of this track.",
      },
      {
        label: "Jenkins User Documentation",
        href: "https://www.jenkins.io/doc/",
        supports: "the official reference for the CI/CD tooling taught in this course.",
      },
    ],
  },

  // ── Data & AI ──────────────────────────────────────────────────────────
  {
    match: /data-engineering/,
    sources: [
      {
        label: "Apache Spark documentation",
        href: "https://spark.apache.org/docs/latest/",
        supports: "the official reference for the distributed processing engine taught here.",
      },
      {
        label: "Apache Airflow documentation",
        href: "https://airflow.apache.org/docs/",
        supports: "the official reference for the pipeline orchestration tooling in this course.",
      },
    ],
  },
  {
    match: /data-analytics/,
    sources: [
      {
        label: "pandas documentation",
        href: "https://pandas.pydata.org/docs/",
        supports: "the official reference for the analysis library used throughout the course.",
      },
      {
        label: "Microsoft Power BI documentation",
        href: "https://learn.microsoft.com/en-us/power-bi/",
        supports: "the official reference for the BI tooling taught in this course.",
      },
    ],
  },
  {
    match: /data-science|machine-learning/,
    sources: [
      {
        label: "scikit-learn documentation",
        href: "https://scikit-learn.org/stable/",
        supports: "the official reference for the machine-learning library used in the curriculum.",
      },
      {
        label: "NumPy documentation",
        href: "https://numpy.org/doc/stable/",
        supports: "the official reference for the numerical computing foundation of this track.",
      },
      {
        label: "Python Software Foundation documentation",
        href: "https://docs.python.org/3/",
        supports: "the official Python language reference this course builds on.",
      },
    ],
  },
  {
    match: /agentic-ai|genai|chatgpt|llms|prompt-engineering|ai-tools/,
    sources: [
      {
        label: "OpenAI API documentation",
        href: "https://platform.openai.com/docs",
        supports: "the official reference for the model APIs used in this course.",
      },
      {
        label: "Anthropic Claude documentation",
        href: "https://docs.anthropic.com/",
        supports: "the official reference for the Claude API and tool use covered in the curriculum.",
      },
      {
        label: "LangChain documentation",
        href: "https://python.langchain.com/docs/introduction/",
        supports: "the official reference for the orchestration framework taught here.",
      },
    ],
  },

  // ── Databases ──────────────────────────────────────────────────────────
  {
    match: /postgresql/,
    sources: [
      {
        label: "PostgreSQL documentation",
        href: "https://www.postgresql.org/docs/",
        supports: "the official PostgreSQL reference for the SQL and administration topics taught here.",
      },
    ],
  },
  {
    match: /mysql/,
    sources: [
      {
        label: "MySQL Reference Manual",
        href: "https://dev.mysql.com/doc/",
        supports: "the official MySQL reference for the SQL and administration topics taught here.",
      },
    ],
  },
  {
    match: /mongodb/,
    sources: [
      {
        label: "MongoDB Manual",
        href: "https://www.mongodb.com/docs/manual/",
        supports: "the official MongoDB reference for the document-database topics taught here.",
      },
    ],
  },
  {
    match: /oracle-database/,
    sources: [
      {
        label: "Oracle Database documentation",
        href: "https://docs.oracle.com/en/database/",
        supports: "the official Oracle Database reference for the SQL and PL/SQL topics taught here.",
      },
    ],
  },

  // ── Testing ────────────────────────────────────────────────────────────
  {
    match: /selenium/,
    sources: [
      {
        label: "Selenium documentation",
        href: "https://www.selenium.dev/documentation/",
        supports: "the official Selenium reference for the automation topics taught here.",
      },
      {
        label: "TestNG documentation",
        href: "https://testng.org/",
        supports: "the official reference for the test framework used alongside Selenium.",
      },
    ],
  },
  {
    match: /software-testing/,
    sources: [
      {
        label: "ISTQB syllabi",
        href: "https://www.istqb.org/certifications/certified-tester-foundation-level",
        supports: "the international standard whose Foundation-Level syllabus this course tracks.",
      },
      {
        label: "Selenium documentation",
        href: "https://www.selenium.dev/documentation/",
        supports: "the official reference for the automation portion of the curriculum.",
      },
    ],
  },

  // ── Mobile ─────────────────────────────────────────────────────────────
  {
    match: /flutter/,
    sources: [
      {
        label: "Flutter documentation",
        href: "https://docs.flutter.dev/",
        supports: "the official Flutter reference for the widgets and tooling taught here.",
      },
      {
        label: "Dart language documentation",
        href: "https://dart.dev/guides",
        supports: "the official reference for the language Flutter is written in.",
      },
    ],
  },
  {
    match: /react-native/,
    sources: [
      {
        label: "React Native documentation",
        href: "https://reactnative.dev/docs/getting-started",
        supports: "the official React Native reference for the components taught here.",
      },
    ],
  },
  {
    match: /android/,
    sources: [
      {
        label: "Android Developers documentation",
        href: "https://developer.android.com/docs",
        supports: "the official Android platform reference for the APIs taught here.",
      },
    ],
  },
  {
    match: /ios-swift/,
    sources: [
      {
        label: "Apple Swift documentation",
        href: "https://developer.apple.com/documentation/swift",
        supports: "the official Swift language reference for this track.",
      },
      {
        label: "Apple Developer documentation",
        href: "https://developer.apple.com/documentation/",
        supports: "the official iOS platform reference for the frameworks taught here.",
      },
    ],
  },
  {
    match: /firebase/,
    sources: [
      {
        label: "Firebase documentation",
        href: "https://firebase.google.com/docs",
        supports: "the official Firebase reference for the services taught in this course.",
      },
    ],
  },

  // ── Web frameworks & languages ─────────────────────────────────────────
  {
    match: /nextjs/,
    sources: [
      {
        label: "Next.js documentation",
        href: "https://nextjs.org/docs",
        supports: "the official Next.js reference for the routing and rendering topics taught here.",
      },
      {
        label: "React documentation",
        href: "https://react.dev/",
        supports: "the official React reference Next.js is built on.",
      },
    ],
  },
  {
    match: /nodejs/,
    sources: [
      {
        label: "Node.js API documentation",
        href: "https://nodejs.org/docs/latest/api/",
        supports: "the official Node.js runtime reference for this course.",
      },
      {
        label: "Express documentation",
        href: "https://expressjs.com/en/4x/api.html",
        supports: "the official reference for the web framework taught alongside Node.",
      },
    ],
  },
  {
    match: /angular/,
    sources: [
      {
        label: "Angular documentation",
        href: "https://angular.dev/",
        supports: "the official Angular reference for the components and DI topics taught here.",
      },
      {
        label: "TypeScript documentation",
        href: "https://www.typescriptlang.org/docs/",
        supports: "the official reference for the language Angular applications are written in.",
      },
    ],
  },
  {
    // Safe as a bare /react/ because the react-native entry sits earlier in
    // the registry and therefore wins for that slug.
    match: /react/,
    sources: [
      {
        label: "React documentation",
        href: "https://react.dev/",
        supports: "the official React reference for the hooks and component topics taught here.",
      },
      {
        label: "MDN Web Docs — JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        supports: "the standards reference for the JavaScript foundation this course builds on.",
      },
    ],
  },
  {
    match: /spring-boot|microservices/,
    sources: [
      {
        label: "Spring Boot project documentation",
        href: "https://spring.io/projects/spring-boot",
        supports: "the official Spring Boot reference for the topics taught in this course.",
      },
      {
        label: "Oracle Java SE documentation",
        href: "https://docs.oracle.com/en/java/javase/",
        supports: "the official Java language reference Spring Boot builds on.",
      },
    ],
  },
  {
    match: /typescript/,
    sources: [
      {
        label: "TypeScript documentation",
        href: "https://www.typescriptlang.org/docs/",
        supports: "the official TypeScript language reference for this course.",
      },
      {
        label: "MDN Web Docs — JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        supports: "the standards reference for the JavaScript foundation TypeScript compiles to.",
      },
    ],
  },
  {
    match: /javascript/,
    sources: [
      {
        label: "MDN Web Docs — JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        supports: "the standards reference for the language taught in this course.",
      },
      {
        label: "ECMAScript specification",
        href: "https://tc39.es/ecma262/",
        supports: "the language standard the curriculum follows.",
      },
    ],
  },
  {
    match: /dotnet|csharp/,
    sources: [
      {
        label: "Microsoft C# documentation",
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        supports: "the official C# language reference for this course.",
      },
      {
        label: "Microsoft .NET documentation",
        href: "https://learn.microsoft.com/en-us/dotnet/",
        supports: "the official .NET platform reference used throughout the curriculum.",
      },
    ],
  },
  {
    match: /salesforce/,
    sources: [
      {
        label: "Salesforce Trailhead",
        href: "https://trailhead.salesforce.com/",
        supports: "Salesforce's own learning platform and credential paths this course prepares for.",
      },
      {
        label: "Salesforce Developer documentation",
        href: "https://developer.salesforce.com/docs",
        supports: "the official reference for the Apex and Lightning topics taught here.",
      },
    ],
  },
  {
    match: /cpp/,
    sources: [
      {
        label: "cppreference.com",
        href: "https://en.cppreference.com/w/",
        supports: "the standard C++ language and library reference used in this course.",
      },
      {
        label: "ISO C++ standard",
        href: "https://isocpp.org/std/the-standard",
        supports: "the language standard the curriculum follows.",
      },
    ],
  },
  {
    // Word boundary keeps this off "agentic-ai-training" and friends; the
    // cpp entry sits earlier so "cpp-training" never reaches here.
    match: /\bc-training/,
    sources: [
      {
        label: "cppreference.com — C reference",
        href: "https://en.cppreference.com/w/c",
        supports: "the standard C language and library reference used in this course.",
      },
    ],
  },
  {
    match: /python/,
    sources: [
      {
        label: "Python Software Foundation documentation",
        href: "https://docs.python.org/3/",
        supports: "the official Python language reference for this course.",
      },
      {
        label: "Python Package Index (PyPI)",
        href: "https://pypi.org/",
        supports: "the official registry for the libraries used throughout the curriculum.",
      },
    ],
  },
  {
    match: /java/,
    sources: [
      {
        label: "Oracle Java SE documentation",
        href: "https://docs.oracle.com/en/java/javase/",
        supports: "the official Java language reference for this course.",
      },
      {
        // education.oracle.com refuses connections outright (not a 403 —
        // it fails at the transport layer, for Googlebot too), so the
        // certification landing page is not citable. dev.java is Oracle's
        // maintained developer portal and resolves cleanly. Verified
        // 2026-08-06.
        label: "dev.java — Oracle's Java developer portal",
        href: "https://dev.java/",
        supports: "Oracle's official Java developer resources and release track.",
      },
    ],
  },
];

/**
 * Resolve authoritative sources for a course slug (or any technology-bearing
 * string, e.g. a category slug or guide slug). Returns [] when nothing
 * matches — callers must render nothing rather than fall back to a generic
 * source, since a citation that backs no claim is worse than none.
 */
export function sourcesForTopic(key: string, limit = 3): SourceCitation[] {
  const k = key.toLowerCase();
  for (const entry of REGISTRY) {
    if (entry.match.test(k)) return entry.sources.slice(0, limit);
  }
  return [];
}

/**
 * Resolve sources across several keys (e.g. every course in a category),
 * de-duplicated by href and capped. Used by hub and audience pages, which
 * summarise many courses at once.
 */
export function sourcesForTopics(keys: string[], limit = 4): SourceCitation[] {
  const seen = new Set<string>();
  const out: SourceCitation[] = [];
  for (const key of keys) {
    for (const s of sourcesForTopic(key)) {
      if (seen.has(s.href)) continue;
      seen.add(s.href);
      out.push(s);
      if (out.length >= limit) return out;
    }
  }
  return out;
}
