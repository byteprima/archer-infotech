import type { SourceCitation } from "@/components/seo/source-citations";

/**
 * Per-guide outbound citations, keyed by listicle slug.
 *
 * The 2026-08-06 crawl found 33 of 34 guides with zero editorial external
 * links. `ListicleEntry` already carries an optional `href`/`external` pair,
 * but only 6 entries across the whole corpus used it, so in practice the
 * guides cited nothing.
 *
 * Kept in its own module rather than as a field on `Listicle` because
 * `listicles.ts` is already ~3k lines; threading a new array through 34
 * inline entries there is harder to review and easier to get wrong than a
 * flat slug -> sources map.
 *
 * Discipline (same as authoritative-sources.ts): primary sources only, and
 * `supports` must describe a claim the guide actually makes. Guides whose
 * subject has no honest primary source are deliberately absent from this
 * map — `sourcesForGuide` returns [] and the block does not render. An
 * empty citation list is correct; a decorative one is not.
 */

const PY_DOCS: SourceCitation = {
  label: "Python Software Foundation documentation",
  href: "https://docs.python.org/3/",
  supports: "the official language reference for the Python APIs discussed here.",
};
const PYPI: SourceCitation = {
  label: "Python Package Index (PyPI)",
  href: "https://pypi.org/",
  supports: "the official registry for the libraries listed on this page.",
};
const MDN_JS: SourceCitation = {
  label: "MDN Web Docs — JavaScript",
  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  supports: "the standards reference for the JavaScript behaviour described here.",
};
const JAVA_DOCS: SourceCitation = {
  label: "Oracle Java SE documentation",
  href: "https://docs.oracle.com/en/java/javase/",
  supports: "the official Java language and API reference for the topics covered.",
};
const SPRING_BOOT: SourceCitation = {
  label: "Spring Boot project documentation",
  href: "https://spring.io/projects/spring-boot",
  supports: "the official Spring Boot reference for the patterns described here.",
};
const REACT_DOCS: SourceCitation = {
  label: "React documentation",
  href: "https://react.dev/",
  supports: "the official React reference for the hooks and rendering behaviour discussed.",
};
const NODE_DOCS: SourceCitation = {
  label: "Node.js API documentation",
  href: "https://nodejs.org/docs/latest/api/",
  supports: "the official Node.js runtime reference for the concepts covered.",
};
const K8S_DOCS: SourceCitation = {
  label: "Kubernetes documentation",
  href: "https://kubernetes.io/docs/home/",
  supports: "the official Kubernetes reference for the objects and behaviour described.",
};
const DOCKER_DOCS: SourceCitation = {
  label: "Docker documentation",
  href: "https://docs.docker.com/",
  supports: "the official Docker reference for the commands and image behaviour described.",
};
const PG_DOCS: SourceCitation = {
  label: "PostgreSQL documentation",
  href: "https://www.postgresql.org/docs/",
  supports: "the official PostgreSQL reference for the SQL semantics described here.",
};
const SKLEARN: SourceCitation = {
  label: "scikit-learn documentation",
  href: "https://scikit-learn.org/stable/",
  supports: "the official reference for the modelling and preprocessing APIs discussed.",
};
const AWS_DOCS: SourceCitation = {
  label: "AWS Documentation",
  href: "https://docs.aws.amazon.com/",
  supports: "the official AWS service reference for the architectures described here.",
};
/**
 * India-specific pay data. Readable for humans, but AmbitionBox returns no
 * response at all to Googlebot (and Glassdoor / Indeed / Naukri all return
 * 403), so it corroborates nothing for an AI crawler. Kept for reader value
 * and always paired with a crawler-accessible source below. Checked
 * 2026-08-06.
 */
const AMBITIONBOX: SourceCitation = {
  label: "AmbitionBox salary data",
  href: "https://www.ambitionbox.com/salaries",
  supports: "the India-specific market salary bands quoted on this page.",
};

/** Crawler-accessible (200 to Googlebot), unlike every India salary aggregator. */
const SO_SURVEY: SourceCitation = {
  label: "Stack Overflow Developer Survey",
  href: "https://survey.stackoverflow.co/",
  supports: "the industry-wide pay and technology-adoption data referenced here.",
};

const GUIDE_SOURCES: Record<string, SourceCitation[]> = {
  // ── Python ─────────────────────────────────────────────────────────────
  "best-python-projects-for-resume-2026": [PY_DOCS, PYPI],
  "top-python-libraries-every-developer-should-know-2026": [PYPI, PY_DOCS],
  "python-interview-questions-pune-freshers-2026": [PY_DOCS],
  "python-async-patterns-pune-engineers-2026": [
    {
      label: "Python asyncio documentation",
      href: "https://docs.python.org/3/library/asyncio.html",
      supports: "the official reference for the coroutine and event-loop behaviour described.",
    },
    PY_DOCS,
  ],
  "python-testing-strategies-pune-engineers-2026": [
    {
      label: "pytest documentation",
      href: "https://docs.pytest.org/en/stable/",
      supports: "the official reference for the test framework used in these examples.",
    },
    {
      label: "Python unittest documentation",
      href: "https://docs.python.org/3/library/unittest.html",
      supports: "the standard-library testing reference discussed alongside pytest.",
    },
  ],

  // ── Java / Spring ──────────────────────────────────────────────────────
  "java-frameworks-every-backend-developer-should-know": [
    SPRING_BOOT,
    JAVA_DOCS,
    {
      label: "Jakarta EE specifications",
      href: "https://jakarta.ee/specifications/",
      supports: "the specification behind the enterprise Java frameworks listed.",
    },
  ],
  "best-spring-boot-projects-for-pune-resume-2026": [SPRING_BOOT, JAVA_DOCS],
  "spring-boot-interview-questions-pune-java-freshers-2026": [SPRING_BOOT, JAVA_DOCS],
  "java-concurrency-patterns-pune-developers-2026": [
    {
      label: "Java concurrency utilities documentation",
      href: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/package-summary.html",
      supports: "the official API reference for the concurrency primitives described.",
    },
    JAVA_DOCS,
  ],
  "java-streams-api-patterns-pune-developers-2026": [
    {
      label: "Java Stream API documentation",
      href: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html",
      supports: "the official API reference for the stream operations described.",
    },
    JAVA_DOCS,
  ],
  "microservices-patterns-pune-java-developers-2026": [
    {
      label: "microservices.io pattern catalogue",
      href: "https://microservices.io/patterns/index.html",
      supports: "the canonical catalogue for the microservice patterns named here.",
    },
    SPRING_BOOT,
  ],

  // ── Web / full stack ───────────────────────────────────────────────────
  "free-resources-to-learn-full-stack-development": [
    MDN_JS,
    {
      label: "The Odin Project",
      href: "https://www.theodinproject.com/",
      supports: "one of the free curricula recommended on this page.",
    },
    {
      label: "freeCodeCamp",
      href: "https://www.freecodecamp.org/",
      supports: "one of the free curricula recommended on this page.",
    },
  ],
  "best-full-stack-projects-for-pune-resume-2026": [MDN_JS, REACT_DOCS, NODE_DOCS],
  "react-interview-questions-pune-freshers-2026": [REACT_DOCS, MDN_JS],
  "nodejs-concepts-pune-full-stack-developers-2026": [
    NODE_DOCS,
    {
      label: "Express API reference",
      href: "https://expressjs.com/en/4x/api.html",
      supports: "the official reference for the web framework used in these examples.",
    },
  ],
  "authentication-authorization-patterns-pune-full-stack-2026": [
    {
      label: "OWASP Authentication Cheat Sheet",
      href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      supports: "the security guidance behind the authentication practices recommended here.",
    },
    {
      label: "OAuth 2.0 (oauth.net)",
      href: "https://oauth.net/2/",
      supports: "the specification for the authorisation flows described.",
    },
  ],

  // ── Data / AI ──────────────────────────────────────────────────────────
  "best-data-science-projects-pune-freshers-2026": [
    SKLEARN,
    {
      label: "pandas documentation",
      href: "https://pandas.pydata.org/docs/",
      supports: "the official reference for the data-manipulation library used in these projects.",
    },
  ],
  "top-statistics-concepts-pune-data-scientists-2026": [
    {
      label: "SciPy statistics documentation",
      href: "https://docs.scipy.org/doc/scipy/reference/stats.html",
      supports: "the official reference for the statistical tests described here.",
    },
    SKLEARN,
  ],
  "feature-engineering-techniques-pune-data-scientists-2026": [
    {
      label: "scikit-learn preprocessing guide",
      href: "https://scikit-learn.org/stable/modules/preprocessing.html",
      supports: "the official reference for the transformations described on this page.",
    },
    {
      label: "pandas documentation",
      href: "https://pandas.pydata.org/docs/",
      supports: "the official reference for the dataframe operations used in the examples.",
    },
  ],
  "langchain-tips-for-pune-ai-engineers-2026": [
    {
      label: "LangChain documentation",
      href: "https://python.langchain.com/docs/introduction/",
      supports: "the official reference for the chains and agents described here.",
    },
    {
      label: "OpenAI API documentation",
      href: "https://platform.openai.com/docs",
      supports: "the official reference for the model APIs these patterns call.",
    },
  ],

  // ── SQL / databases ────────────────────────────────────────────────────
  "sql-interview-questions-pune-data-freshers-2026": [
    PG_DOCS,
    {
      label: "MySQL Reference Manual",
      href: "https://dev.mysql.com/doc/",
      supports: "the official reference for the MySQL-specific syntax discussed.",
    },
  ],
  "postgresql-queries-pune-full-stack-developers-2026": [
    PG_DOCS,
    {
      label: "PostgreSQL EXPLAIN documentation",
      href: "https://www.postgresql.org/docs/current/sql-explain.html",
      supports: "the official reference for the query-plan analysis shown here.",
    },
  ],

  // ── DevOps / cloud ─────────────────────────────────────────────────────
  "kubernetes-interview-questions-pune-devops-freshers-2026": [
    K8S_DOCS,
    {
      label: "CNCF certification programmes",
      href: "https://www.cncf.io/training/certification/",
      supports: "the CKA/CKAD certifications these questions map to.",
    },
  ],
  "docker-best-practices-pune-devops-engineers-2026": [
    {
      label: "Dockerfile best-practices guide",
      href: "https://docs.docker.com/build/building/best-practices/",
      supports: "Docker's own guidance behind the build practices recommended here.",
    },
    DOCKER_DOCS,
  ],
  "github-actions-workflows-pune-devops-engineers-2026": [
    {
      label: "GitHub Actions documentation",
      href: "https://docs.github.com/en/actions",
      supports: "the official reference for the workflow syntax used in these examples.",
    },
  ],
  "linux-commands-pune-devops-freshers-2026": [
    {
      label: "Linux man-pages project",
      href: "https://man7.org/linux/man-pages/",
      supports: "the canonical manual pages for the commands listed here.",
    },
    {
      label: "GNU Coreutils manual",
      href: "https://www.gnu.org/software/coreutils/manual/coreutils.html",
      supports: "the official reference for the core utilities described.",
    },
  ],
  "best-aws-projects-for-pune-resume-2026": [
    AWS_DOCS,
    {
      label: "AWS Well-Architected Framework",
      href: "https://aws.amazon.com/architecture/well-architected/",
      supports: "AWS's own design guidance behind the architectures suggested here.",
    },
  ],

  // ── Careers / market (soft topics — market data, not vendor docs) ───────
  "highest-paying-it-roles-pune-engineering-graduates": [
    AMBITIONBOX,
    SO_SURVEY,
  ],
  "salary-negotiation-tips-pune-it-freshers-2026": [
    AMBITIONBOX,
    SO_SURVEY,
  ],
  "linkedin-optimisation-tips-pune-it-freshers-2026": [
    {
      label: "LinkedIn Help — profile best practices",
      href: "https://www.linkedin.com/help/linkedin",
      supports: "LinkedIn's own guidance on the profile features described here.",
    },
  ],
  "top-it-skills-pune-freshers-2026": [SO_SURVEY, AMBITIONBOX],
  "top-pune-it-companies-hiring-freshers-2026": [
    {
      label: "AmbitionBox company reviews",
      href: "https://www.ambitionbox.com/list-of-companies",
      supports: "the employer-level data behind the companies profiled here.",
    },
    AMBITIONBOX,
  ],

  // Deliberately absent — these render no citation block rather than a
  // decorative one:
  //   year-one-mistakes-pune-it-freshers-make-2026
  //     A first-person reflection piece; no primary source to cite.
  //   leetcode-patterns-pune-fresher-it-interviews-2026
  //     LeetCode returns 403 to every client including Googlebot, so a link
  //     to it corroborates nothing and cannot even be verified. No other
  //     primary source covers the pattern taxonomy. Checked 2026-08-06.
};

/** Sources for a guide, or [] when none are curated. */
export function sourcesForGuide(slug: string): SourceCitation[] {
  return GUIDE_SOURCES[slug] ?? [];
}

/** Exposed for the coverage test. */
export const curatedGuideSlugs = Object.keys(GUIDE_SOURCES);

/**
 * The most-cited sources across all guides, deduped by href. Used by the
 * /guides hub, which summarises the whole corpus rather than one topic.
 */
export function topGuideSources(limit = 4): SourceCitation[] {
  const counts = new Map<string, { n: number; s: SourceCitation }>();
  for (const list of Object.values(GUIDE_SOURCES)) {
    for (const s of list) {
      const hit = counts.get(s.href);
      if (hit) hit.n += 1;
      else counts.set(s.href, { n: 1, s });
    }
  }
  return [...counts.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.s);
}
