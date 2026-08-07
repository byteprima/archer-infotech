import type { SourceCitation } from "@/components/seo/source-citations";

/**
 * Per-comparison outbound citations, keyed by comparison slug.
 *
 * The 2026-08-06 crawl found all 30 /compare/* pages with zero editorial
 * external links. That is the worst place on the site to have none:
 * comparison content is the single most-cited format on ChatGPT, and
 * "cite sources" is the highest-lift intervention in the GEO literature.
 *
 * Rule specific to this route: cite BOTH sides. A comparison that links
 * only the option we happen to teach reads as promotional rather than
 * evaluative, and gives an engine no reason to treat the verdict as
 * balanced. Where a page compares two technologies, both official
 * references appear.
 *
 * Career/path comparisons (services vs product, campus vs off-campus,
 * degree vs bootcamp …) have no vendor documentation to cite. They get
 * industry-survey sources where one honestly applies, and nothing where
 * it does not — see the deliberately-absent list at the bottom.
 */

const JAVA: SourceCitation = {
  label: "Oracle Java SE documentation",
  href: "https://docs.oracle.com/en/java/javase/",
  supports: "the official Java language reference for the Java side of this comparison.",
};
const PYTHON: SourceCitation = {
  label: "Python Software Foundation documentation",
  href: "https://docs.python.org/3/",
  supports: "the official Python language reference for the Python side of this comparison.",
};
const REACT: SourceCitation = {
  label: "React documentation",
  href: "https://react.dev/",
  supports: "the official React reference for the React side of this comparison.",
};
const SPRING: SourceCitation = {
  label: "Spring Boot project documentation",
  href: "https://spring.io/projects/spring-boot",
  supports: "the official Spring Boot reference for the Java stack discussed here.",
};
const SKLEARN: SourceCitation = {
  label: "scikit-learn documentation",
  href: "https://scikit-learn.org/stable/",
  supports: "the official reference for the algorithms compared on this page.",
};
const SO_SURVEY: SourceCitation = {
  label: "Stack Overflow Developer Survey",
  href: "https://survey.stackoverflow.co/",
  supports: "industry-wide adoption and compensation data referenced in this comparison.",
};

const COMPARISON_SOURCES: Record<string, SourceCitation[]> = {
  // ── Languages & runtimes ───────────────────────────────────────────────
  "java-vs-python-for-beginners": [JAVA, PYTHON],
  "java-vs-kotlin-for-pune-backend-developers-2026": [
    JAVA,
    {
      label: "Kotlin documentation",
      href: "https://kotlinlang.org/docs/home.html",
      supports: "the official Kotlin language reference for the Kotlin side of this comparison.",
    },
  ],

  // ── Web frameworks ─────────────────────────────────────────────────────
  "django-vs-fastapi-for-python-web-2026": [
    {
      label: "Django documentation",
      href: "https://docs.djangoproject.com/en/stable/",
      supports: "the official Django reference for the Django side of this comparison.",
    },
    {
      label: "FastAPI documentation",
      href: "https://fastapi.tiangolo.com/",
      supports: "the official FastAPI reference for the FastAPI side of this comparison.",
    },
  ],
  "django-vs-flask-for-pune-python-web-2026": [
    {
      label: "Django documentation",
      href: "https://docs.djangoproject.com/en/stable/",
      supports: "the official Django reference for the Django side of this comparison.",
    },
    {
      label: "Flask documentation",
      href: "https://flask.palletsprojects.com/",
      supports: "the official Flask reference for the Flask side of this comparison.",
    },
  ],
  "react-vs-angular-for-pune-frontend-2026": [
    REACT,
    {
      label: "Angular documentation",
      href: "https://angular.dev/",
      supports: "the official Angular reference for the Angular side of this comparison.",
    },
  ],
  "mern-vs-java-full-stack": [
    REACT,
    {
      label: "MongoDB Manual",
      href: "https://www.mongodb.com/docs/manual/",
      supports: "the official MongoDB reference for the MERN side of this comparison.",
    },
    SPRING,
    JAVA,
  ],
  "tailwind-vs-bootstrap-for-pune-frontend-2026": [
    {
      label: "Tailwind CSS documentation",
      href: "https://tailwindcss.com/docs",
      supports: "the official Tailwind reference for the Tailwind side of this comparison.",
    },
    {
      label: "Bootstrap documentation",
      href: "https://getbootstrap.com/docs/",
      supports: "the official Bootstrap reference for the Bootstrap side of this comparison.",
    },
  ],
  "rest-vs-graphql-for-pune-full-stack-2026": [
    {
      label: "GraphQL specification",
      href: "https://graphql.org/learn/",
      supports: "the official GraphQL reference for the GraphQL side of this comparison.",
    },
    {
      label: "MDN — HTTP and REST semantics",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      supports: "the standards reference for the REST/HTTP side of this comparison.",
    },
  ],

  // ── Architecture ───────────────────────────────────────────────────────
  "monolithic-vs-microservices-for-pune-java-developers-2026": [
    {
      label: "microservices.io pattern catalogue",
      href: "https://microservices.io/patterns/index.html",
      supports: "the canonical catalogue for the microservice patterns weighed here.",
    },
    SPRING,
  ],

  // ── Cloud ──────────────────────────────────────────────────────────────
  "aws-vs-azure-for-pune-cloud-careers-2026": [
    {
      label: "AWS Certification",
      href: "https://aws.amazon.com/certification/",
      supports: "the official AWS certification paths compared on this page.",
    },
    {
      label: "Microsoft Credentials",
      href: "https://learn.microsoft.com/en-us/credentials/",
      supports: "the official Azure certification paths compared on this page.",
    },
  ],
  "eks-vs-ecs-for-pune-aws-engineers-2026": [
    {
      label: "Amazon EKS documentation",
      href: "https://docs.aws.amazon.com/eks/",
      supports: "the official EKS reference for the EKS side of this comparison.",
    },
    {
      label: "Amazon ECS documentation",
      href: "https://docs.aws.amazon.com/ecs/",
      supports: "the official ECS reference for the ECS side of this comparison.",
    },
  ],
  "terraform-vs-ansible-for-pune-devops-2026": [
    {
      label: "Terraform documentation",
      href: "https://developer.hashicorp.com/terraform/docs",
      supports: "the official Terraform reference for the Terraform side of this comparison.",
    },
    {
      label: "Ansible documentation",
      href: "https://docs.ansible.com/",
      supports: "the official Ansible reference for the Ansible side of this comparison.",
    },
  ],

  // ── Java build & test tooling ──────────────────────────────────────────
  "maven-vs-gradle-for-pune-java-developers-2026": [
    {
      label: "Apache Maven documentation",
      href: "https://maven.apache.org/guides/",
      supports: "the official Maven reference for the Maven side of this comparison.",
    },
    {
      label: "Gradle User Manual",
      href: "https://docs.gradle.org/current/userguide/userguide.html",
      supports: "the official Gradle reference for the Gradle side of this comparison.",
    },
  ],
  "junit-vs-testng-for-pune-java-developers-2026": [
    {
      label: "JUnit 5 User Guide",
      href: "https://junit.org/junit5/docs/current/user-guide/",
      supports: "the official JUnit reference for the JUnit side of this comparison.",
    },
    {
      label: "TestNG documentation",
      href: "https://testng.org/",
      supports: "the official TestNG reference for the TestNG side of this comparison.",
    },
  ],

  // ── Data & ML ──────────────────────────────────────────────────────────
  "pandas-vs-numpy-when-to-use-which-2026": [
    {
      label: "pandas documentation",
      href: "https://pandas.pydata.org/docs/",
      supports: "the official pandas reference for the pandas side of this comparison.",
    },
    {
      label: "NumPy documentation",
      href: "https://numpy.org/doc/stable/",
      supports: "the official NumPy reference for the NumPy side of this comparison.",
    },
  ],
  "tensorflow-vs-pytorch-for-pune-ml-engineers-2026": [
    {
      label: "TensorFlow documentation",
      href: "https://www.tensorflow.org/api_docs",
      supports: "the official TensorFlow reference for the TensorFlow side of this comparison.",
    },
    {
      label: "PyTorch documentation",
      href: "https://docs.pytorch.org/docs/stable/index.html",
      supports: "the official PyTorch reference for the PyTorch side of this comparison.",
    },
  ],
  "random-forest-vs-xgboost-for-pune-data-scientists-2026": [
    SKLEARN,
    {
      label: "XGBoost documentation",
      href: "https://xgboost.readthedocs.io/en/stable/",
      supports: "the official XGBoost reference for the XGBoost side of this comparison.",
    },
  ],
  "supervised-vs-unsupervised-learning-pune-data-scientists-2026": [SKLEARN],
  "power-bi-vs-tableau-for-pune-data-analysts-2026": [
    {
      label: "Microsoft Power BI documentation",
      href: "https://learn.microsoft.com/en-us/power-bi/",
      supports: "the official Power BI reference for the Power BI side of this comparison.",
    },
    {
      label: "Tableau Help",
      href: "https://help.tableau.com/current/pro/desktop/en-us/default.htm",
      supports: "the official Tableau reference for the Tableau side of this comparison.",
    },
  ],
  "pydantic-vs-dataclasses-for-pune-python-developers-2026": [
    {
      label: "Pydantic documentation",
      href: "https://docs.pydantic.dev/latest/",
      supports: "the official Pydantic reference for the Pydantic side of this comparison.",
    },
    {
      label: "Python dataclasses documentation",
      href: "https://docs.python.org/3/library/dataclasses.html",
      supports: "the standard-library reference for the dataclasses side of this comparison.",
    },
  ],

  // ── Roles (vendor-neutral, but with a defensible primary source) ───────
  "sre-vs-devops-engineer-career-pune-2026": [
    {
      label: "Google SRE Book",
      href: "https://sre.google/sre-book/table-of-contents/",
      supports: "the canonical definition of the SRE discipline used on this page.",
    },
    SO_SURVEY,
  ],
  "python-developer-vs-data-scientist": [PYTHON, SKLEARN, SO_SURVEY],
  "frontend-vs-backend-developer-career-pune": [
    {
      label: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web",
      supports: "the standards reference for the front-end skill set described.",
    },
    {
      label: "Node.js API documentation",
      href: "https://nodejs.org/docs/latest/api/",
      supports: "the official reference for the server-side skill set described.",
    },
    SO_SURVEY,
  ],
  "data-analyst-vs-data-scientist-career-pune": [SKLEARN, SO_SURVEY],

  // Deliberately absent — no honest primary source exists for these, so they
  // render no citation block rather than a decorative one. All are
  // India-market career-path judgements, and the salary aggregators that
  // cover them (Glassdoor, AmbitionBox, Naukri, Indeed) all refuse crawlers,
  // so citing them would corroborate nothing for an engine:
  //   online-vs-offline-it-training
  //   coding-bootcamp-vs-self-study
  //   services-vs-product-company-first-it-job-pune
  //   campus-vs-off-campus-placement-pune-2026
  //   internship-vs-direct-fresher-it-job-pune-2026
  //   bachelors-degree-vs-bootcamp-for-pune-it-careers-2026
};

/** Sources for a comparison, or [] when none are curated. */
export function sourcesForComparison(slug: string): SourceCitation[] {
  return COMPARISON_SOURCES[slug] ?? [];
}
