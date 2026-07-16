import type { CourseRichContent } from "./types";

export const javaFullStackTrainingInPune: CourseRichContent = {
  intro:
    "Java Full Stack is the highest-volume backend hiring track in Pune — Indeed alone lists 1,000+ active Java Developer openings and 35+ Full Stack Developer openings, dominated by IT services (TCS, Infosys, Wipro, Cognizant, Capgemini, LTIMindtree), banking technology (Synechron, Citibank, Barclays, Bajaj Finserv), and product engineering (Persistent, BMC Software, Veritas). Archer Infotech's Java Full Stack training in Pune teaches the stack as it is actually used in 2026 — Java 21 LTS or Java 25, Spring Boot 3.5 or 4.0, React 19 (or Angular for IT-services tracks), Postgres or Oracle, deployed on Docker + Kubernetes with GitHub Actions or Jenkins CI/CD. Classroom in Kothrud, online live, and weekend batches available. Students searching for Java Full Stack classes in Pune, Java classes in Pune, or simply \"Java classes near me\" join us from Kothrud, Karve Nagar, Deccan, Shivaji Nagar, Hinjewadi, Wakad, Baner, and Pimpri-Chinchwad. Whether you call it Full Stack Java training or a Java Full Stack developer course in Pune, the curriculum is the same — and we are widely rated among the best Java Full Stack developer course options in Pune for placement support.",

  whyLearn: {
    heading: "Why Learn Java Full Stack in 2026",
    paragraphs: [
      "Java Full Stack has roughly 3–4 times the open-role count of MERN in Pune — banks, Fortune-500 backends, BFSI, and IT-services majors are still Java-first. Indeed Pune lists more than 1,000 Java roles and 922+ Full Stack Developer roles as of early 2026. Synechron's Hinjawadi office actively recruits Java Full Stack Developers backend-focused; Bajaj Finserv, Citibank Pune, Barclays Pune, and Cognizant all run continuous Java Full Stack hiring funnels. The role is also one of the most stable — Java codebases live for decades, and the maintenance + new-feature pipeline keeps producing jobs even when hiring tightens elsewhere.",
      "What changed in 2026: Java 21 LTS is the current enterprise baseline; Java 25 LTS is the new target for greenfield. Spring Boot 3.4 reached end-of-life on 31 December 2025, so Spring Boot 3.5 and the new 4.0 (4.0.5 stable, March 2026) are now the production targets — including first-class virtual-thread support via `spring.threads.virtual.enabled=true`, GraalVM native-image AOT compilation, and the new `spring-boot-starter-opentelemetry` for observability. On the frontend side, Pune Java Full Stack hiring splits roughly 60% React (with Hooks, Server Components, and Next.js 15 in product/fintech) and 30% Angular (with TypeScript and RxJS in IT-services and Cognizant/Infy heritage codebases).",
      "What this means for hiring: Pune job descriptions in 2026 explicitly call out Spring Boot 3.x, microservices on AWS or AKS, virtual threads, Docker + Kubernetes, GitHub Actions or Jenkins, SonarQube + OWASP gates, and observability via Micrometer + OpenTelemetry. Archer Infotech's curriculum is rebuilt around this exact 2026 reality, not a 2018 Spring 4 syllabus retitled.",
    ],
    keyPoints: [
      "Java 21 LTS plus Java 25 LTS coverage",
      "Spring Boot 3.5 / 4.0 with virtual threads and GraalVM native",
      "React 19 + Next.js 15 (with Angular as an opt-in track for IT-services targeting)",
      "Postgres / Oracle, Spring Data JPA, Liquibase / Flyway migrations",
      "Docker + Kubernetes, GitHub Actions / Jenkins CI/CD, Micrometer + OTel",
      "Pune market reality — 1,000+ Java + 922+ Full Stack openings as of Q1 2026",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting Pune IT-services or BFSI campus hiring",
      "Working professional already in a Java backend role wanting to add frontend depth",
      "Career switcher with non-tech degree willing to commit 4–5 months to a serious curriculum",
      "Mid-career engineer in PHP, .NET, or older Java wanting to move to Spring Boot 3 + cloud-native",
      "Out-of-state candidate planning to settle in Pune for a stable IT-services or banking role",
    ],
    notForYou: [
      "If you hate static typing or verbose syntax — MERN Stack will feel kinder",
      "If your goal is AI/ML jobs — Python is the right path",
      "If you want to ship a SaaS in 2 months — MERN ships faster",
      "If you don't have 4–5 months of runway — Java Full Stack genuinely needs that time, honestly delivered",
      "If you refuse to learn DSA — Cognizant, Synechron, and Bajaj Finserv Pune interviews still gate on it",
    ],
  },

  curriculum: [
    {
      title: "Core Java Foundations",
      weekRange: "Weeks 1–3",
      description:
        "Set up JDK 21 (with a path to upgrade to Java 25), then move through the language properly — primitive vs reference types, control flow, methods, arrays, exception handling, OOP fundamentals (inheritance, polymorphism, encapsulation, abstraction), generics, collections, and streams. We use IntelliJ IDEA as the IDE and Maven for builds, mirroring real Pune codebases. By the end of week 3, you can read any Spring Boot project's domain code without hesitation.",
      topics: [
        "JDK 21+ installation, IntelliJ IDEA, Maven",
        "Primitive types, references, control flow",
        "OOP — inheritance, polymorphism, encapsulation, abstraction",
        "Records and sealed classes (Java 17+)",
        "Generics, bounded wildcards, type erasure",
        "Collections — List, Set, Map, Queue",
        "Stream API — filter, map, reduce, collect",
        "Exception hierarchy and try-with-resources",
      ],
    },
    {
      title: "Advanced Java — Concurrency, JDBC, JPA",
      weekRange: "Weeks 4–5",
      description:
        "Threads, ExecutorService, virtual threads (Java 21), structured concurrency (Java 25), JDBC for direct SQL access, then JPA / Hibernate for the modern enterprise pattern. Build a small repository pattern from scratch before introducing Spring Data, so you appreciate what Spring Data is doing under the hood. Cover the N+1 query problem and HikariCP connection pooling — both routinely tested in Pune mid-level interviews.",
      topics: [
        "Thread, Runnable, ExecutorService, ForkJoinPool",
        "Virtual threads (Java 21+) and structured concurrency",
        "JDBC API and PreparedStatement",
        "Connection pooling with HikariCP",
        "JPA — entities, relationships, EntityManager",
        "Hibernate — first-level and second-level cache",
        "N+1 queries and how to fix them",
      ],
    },
    {
      title: "Spring Boot 3.5 / 4.0 — REST APIs",
      weekRange: "Weeks 6–7",
      description:
        "The framework powering 70%+ of Pune backend hiring. Build a Spring Boot 3.5 / 4.0 REST API from project init to production-ready: controllers, services, repositories, validation, exception handling, OpenAPI spec via springdoc, JWT-based authentication with Spring Security 6, and full CRUD against PostgreSQL via Spring Data JPA. Includes profile-based configuration, externalised secrets, and switching the application to virtual threads with the one-line `spring.threads.virtual.enabled=true` property.",
      topics: [
        "Spring Boot 3.5 / 4.0 project setup with Spring Initializr",
        "Constructor-injection dependency injection style",
        "REST controllers, request mapping, content negotiation",
        "Validation with Jakarta Bean Validation",
        "Exception handling with @ControllerAdvice",
        "Spring Data JPA — derived queries, JPQL",
        "Spring Security 6 with JWT",
        "OpenAPI / Swagger via springdoc",
        "Profiles and externalised configuration",
        "Virtual threads in Spring Boot 3+",
      ],
    },
    {
      title: "Microservices & Cloud Deployment",
      weekRange: "Week 8",
      description:
        "Split a monolith into microservices the way Pune banking and product teams actually do it — Spring Cloud Gateway for routing, Eureka or Kubernetes for service discovery, Resilience4j for circuit-breaking, RabbitMQ or Kafka for async messaging, Micrometer + OpenTelemetry (`spring-boot-starter-opentelemetry` in Spring Boot 4) for distributed tracing. Containerise each service with Docker, run via Docker Compose locally, deploy to AWS EC2 + RDS plus a Minikube cluster.",
      topics: [
        "Microservice decomposition strategy",
        "Spring Cloud Gateway, Eureka",
        "Resilience4j circuit breaker, retry, bulkhead",
        "RabbitMQ for async messaging, Kafka basics",
        "Distributed tracing — Micrometer + OpenTelemetry",
        "Docker, Docker Compose",
        "Kubernetes basics — pods, services, deployments",
        "AWS EC2 + RDS deployment walkthrough",
      ],
    },
    {
      title: "Frontend — React 19 + Next.js 15",
      weekRange: "Weeks 9–11",
      description:
        "The dominant frontend in Pune product / fintech hiring. Cover modern React (function components, Hooks including `use()`, Server Components, Actions, Suspense), TypeScript, state management with Redux Toolkit or Zustand, routing with Next.js App Router, REST and tRPC integration with the Spring Boot backend, JWT auth flow front-to-back, real-time updates via WebSocket, and styling with Tailwind CSS. Build the frontend half of your capstone project here.",
      topics: [
        "React 19 — function components, Hooks, use(), Server Components",
        "TypeScript essentials for React",
        "Next.js 15 App Router — server vs client components",
        "State management — Redux Toolkit or Zustand",
        "REST integration with Axios / fetch",
        "JWT auth flow front-to-back",
        "WebSocket real-time updates",
        "Tailwind CSS",
        "Form handling and validation",
      ],
    },
    {
      title: "Angular Track (opt-in alternative to React)",
      weekRange: "Weeks 9–11 alternate",
      description:
        "For students targeting IT-services hiring (Cognizant, Infosys, TCS) where Angular is the preferred frontend, we offer an opt-in Angular 18+ track in place of React. Cover Angular components, services, RxJS, dependency injection, routing, forms (template + reactive), HTTP client, and integration with the same Spring Boot backend. Same project deliverables, different framework — choose based on your target employers.",
      topics: [
        "Angular 18+ — components, services, modules",
        "TypeScript with Angular",
        "RxJS — Observables, operators, async pipe",
        "Dependency injection",
        "Routing and lazy loading",
        "Forms — template-driven and reactive",
        "HTTP client and interceptors",
        "REST integration with Spring Boot backend",
      ],
    },
    {
      title: "DevOps, CI/CD & Production Practices",
      weekRange: "Week 12",
      description:
        "Make your project look like real Pune enterprise code. GitHub Actions or Jenkins for CI/CD, SonarQube for code-quality gates, OWASP dependency-check for security scanning, JaCoCo for code coverage, Docker images pushed to ECR or Docker Hub, Kubernetes deployment manifests. Cover environment promotion (dev → staging → prod) and the one round of production troubleshooting every Pune mid-level interview asks about.",
      topics: [
        "GitHub Actions / Jenkins pipeline basics",
        "SonarQube quality gates",
        "OWASP dependency-check",
        "JaCoCo code coverage",
        "Docker image build and push",
        "Kubernetes deployment YAML",
        "Environment promotion strategy",
        "Logging — structured JSON via SLF4J + Logback",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 13–16 (4 weeks total)",
      description:
        "Two weeks of full-time capstone project work plus two weeks of placement preparation. Mock technical interviews using question banks from Pune companies — TCS, Infosys, Persistent, Synechron, Bajaj Finserv, BMC. DSA refresher targeting the 30–40 patterns that screen out at IT-services and BFSI. Resume + LinkedIn polish, GitHub portfolio cleanup, HR mock interviews including salary negotiation.",
      topics: [
        "Capstone — full Java + React/Angular implementation, deployed",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA quick refresher — patterns that screen out",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Final Week",
      highlight: true,
      description:
        "The skill every 2026 hiring panel now probes for — building real work with AI in the loop, responsibly. Learn to drive AI assistants (GitHub Copilot, Claude, Cursor, and IDE-native AI) to scaffold and accelerate the tools and stack this course covers, generate tests, explain and refactor unfamiliar code, and cut the boilerplate — while keeping you firmly in control of every decision. Heavy focus on guardrails: reviewing each AI suggestion, spotting hallucinated APIs or wrong answers, and handling licensing and data-privacy concerns. Close with a mini-project that takes a deliverable end-to-end using an AI-assisted workflow, then fold the same tooling into version control and everyday team practice.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for this course's stack — scaffolding, boilerplate, config",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring, and modernising unfamiliar code with AI",
        "AI-driven review, error detection, and quality checks",
        "Generating and maintaining documentation with AI",
        "AI debugging — interpreting errors, logs, and failing output",
        "Guardrails — reviewing output, avoiding hallucinations, licensing & data privacy",
        "Team workflow — AI in the editor, in reviews, and in delivery pipelines",
        "Mini-project — a deliverable built end-to-end with an AI-assisted workflow",
      ],
    },
  ],

  projects: [
    {
      title: "Spring Boot + React Full-Stack SaaS Application",
      description:
        "Build a production-grade full-stack SaaS — Spring Boot 3.5 / 4.0 backend with JWT auth and Spring Security 6, PostgreSQL via Spring Data JPA, OpenAPI spec, exposed to a React 19 + Next.js 15 frontend with TypeScript, Redux Toolkit for state, JWT carried through, real-time updates via WebSocket. CI/CD via GitHub Actions, Docker images, deployed to AWS (backend) and Vercel (frontend). The combination Pune product and fintech hiring actually wants to see.",
      technologies: [
        "Spring Boot 3.5 / 4.0",
        "Spring Security 6 + JWT",
        "Spring Data JPA",
        "PostgreSQL",
        "React 19 + Next.js 15",
        "TypeScript",
        "Redux Toolkit",
        "WebSocket",
        "Docker + AWS",
        "Vercel",
      ],
    },
    {
      title: "Microservices System on Docker + Kubernetes",
      description:
        "Decompose a monolith into 4 microservices (user, catalog, order, payment) communicating via REST and RabbitMQ. Wire up Spring Cloud Gateway, Eureka, Resilience4j circuit breakers, Micrometer + OpenTelemetry distributed tracing. Containerise each service, run via Docker Compose locally, then deploy to a Minikube cluster (or EKS if you have AWS credits). Includes one fully-tested async messaging flow.",
      technologies: [
        "Spring Boot 3.5",
        "Spring Cloud Gateway",
        "Eureka",
        "RabbitMQ",
        "Resilience4j",
        "Micrometer + OpenTelemetry",
        "Docker, Docker Compose",
        "Kubernetes (Minikube / EKS)",
      ],
    },
    {
      title: "Java Full Stack with Angular Track",
      description:
        "For the Angular-track students: Spring Boot 3.5 backend (same as above) with an Angular 18+ frontend, RxJS for async, reactive forms, HTTP interceptors for JWT, Tailwind for styling. Deployed to Netlify or Azure Static Web Apps. The combination Pune IT-services hiring (Cognizant, Infosys, TCS) prefers.",
      technologies: [
        "Spring Boot 3.5",
        "Angular 18+",
        "TypeScript + RxJS",
        "Reactive forms",
        "PostgreSQL",
        "Docker + Azure",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by a three-trainer panel — Amol Patil (Senior Corporate Trainer, 10+ yrs full-stack), Yogesh Patil (Founder & Director, 15+ yrs enterprise Java + cloud), and Ankita Hartale (Java Full Stack, 5+ yrs Wipro). No other Pune institute names a three-trainer panel for Java Full Stack — verify on competitor pages before you enrol.",

  careerOutcomes: {
    paragraphs: [
      "Java Full Stack is the most reliable hiring track in Pune. Indeed Pune reports an average of ₹10.61 lakh per year for Full Stack Developer (n=35, January 2026) and ₹8.32 lakh per year for Java Developer overall. Senior Java Developer Pune averages ₹9.95 lakh; Lead Java Software Engineer Pune averages ₹23.19 lakh.",
      "What pulls a Java Full Stack developer above the average band: a public GitHub portfolio with one deployed Spring Boot + React/Angular project, demonstrable Spring Boot 3 + microservices experience, and one cloud deployment (AWS or Azure) you can talk through end-to-end. Our capstone projects are designed exactly around these signals.",
    ],
    salaryBands: [
      {
        role: "Junior Java Developer (Pune)",
        band: "₹3,62,182 per year",
        source: {
          label: "Indeed Pune (December 2025)",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Entry-Level Java Developer (Pune)",
        band: "₹5,55,263 per year",
        source: {
          label: "Indeed Pune",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Java Developer overall — Pune",
        band: "₹8,31,751 per year",
        source: {
          label: "Indeed Pune",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Full Stack Developer overall — Pune",
        band: "₹10,61,661 per year",
        source: {
          label: "Indeed Pune Full Stack (January 2026, n=35)",
          url: "https://in.indeed.com/career/full-stack-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Senior Java Developer (Pune)",
        band: "₹9,95,292 per year",
        source: {
          label: "Indeed Pune (April 2026, n=19)",
          url: "https://in.indeed.com/career/senior-java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Lead Java Software Engineer (Pune)",
        band: "₹23,19,145 per year",
        source: {
          label: "Indeed Pune",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
    ],
    hiringCompanies: [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
      "LTIMindtree",
      "HCLTech",
      "Tech Mahindra",
      "Synechron Hinjawadi",
      "Persistent Systems",
      "BMC Software",
      "Citibank Pune",
      "Barclays Pune",
      "Bajaj Finserv",
      "Mercedes-Benz R&D India",
      "Volkswagen IT Services",
      "Cummins",
      "Honeywell",
      "Veritas",
    ],
    rolesAfterCourse: [
      "Java Full Stack Developer",
      "Java Backend Engineer",
      "Spring Boot Developer",
      "Microservices Engineer",
      "Software Engineer at IT services",
      "Application Developer at BFSI",
      "Frontend-leaning Full Stack Developer (React or Angular)",
    ],
  },

  modesAndDuration: {
    duration:
      "5 months of structured curriculum (16 weeks Core Java through DevOps + 4 weeks capstone and interview prep)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
        "Lab access available outside class hours",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches — morning or evening",
        "Recordings available for review",
        "Same code reviews and project feedback as in-person batches",
      ],
      tools: ["Zoom for live sessions", "GitHub for code reviews", "Slack / WhatsApp for asynchronous Q&A"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 7–8 months instead of 5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 5 weeks; weekend batches every 7–8 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep and the 4-week capstone; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 12 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product, services, and BFSI companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 12 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 13 — GitHub portfolio cleanup, public READMEs, deployment links",
      "Weeks 14–15 — DSA quick refresher targeting screening patterns at TCS, Cognizant, Synechron, Bajaj Finserv",
      "Weeks 15–16 — three rounds of mock technical interviews",
      "Week 16 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
      "LTIMindtree",
      "Synechron",
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Mercedes-Benz R&D India",
      "Volkswagen IT Services",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Java Full Stack training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — three-trainer panel (Amol Patil, Yogesh Patil, Ankita Hartale)",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Java version covered",
        archer: "Java 21 LTS plus Java 25 features",
        typical: "Often Java 8 or Java 11",
      },
      {
        feature: "Spring Boot version covered",
        archer: "Spring Boot 3.5 / 4.0 — including virtual threads, GraalVM, OTel",
        typical: "Spring Boot 2.x or 'Spring Framework' generic",
      },
      {
        feature: "Frontend coverage",
        archer: "React 19 + Next.js 15 (default) or Angular 18+ (opt-in track)",
        typical: "One framework, often outdated version",
      },
      {
        feature: "Microservices and cloud deployment",
        archer: "Included — Spring Cloud, Docker, Kubernetes, AWS",
        typical: "Often a separate paid module",
      },
      {
        feature: "DevOps and CI/CD",
        archer: "Included — GitHub Actions, SonarQube, OWASP, JaCoCo",
        typical: "Marketing mention only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Salary data",
        archer: "Cited from Indeed Pune with source URLs (₹3.6L → ₹23.2L progression)",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹20,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind enquiry form",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
      {
        feature: "Batch size cap",
        archer: "15 students",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student work and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "Java Full Stack vs MERN Stack — Which Is Better for Pune Jobs",
    paragraphs: [
      "Volume answer: Java Full Stack has roughly 3–4× the open-role count of MERN in Pune. Indeed lists 1,000+ Java + 922+ Full Stack openings versus ~100–200 MERN-specific openings. Banks, Fortune-500 backends, and IT-services majors in Pune are still Java-first. Synechron Hinjawadi alone runs continuous Java Full Stack hiring.",
      "Speed answer: MERN gets you a working full-stack app in weeks, not months — single language (JavaScript/TypeScript) end-to-end, npm ecosystem, fewer moving parts. Better for switchers who need a portfolio fast. The MERN ceiling in Pune product startups can match or beat Java mid-level — but the volume bias is real.",
      "Honest answer: if your goal is the predictable IT-services / banking pipeline (Cognizant, TCS, Synechron, Bajaj Finserv) or BFSI work, pick Java Full Stack. If your goal is product startups and you can self-drive, pick MERN. If undecided, default to Java in Pune — the volume bias is real. Many of our students learn one stack, get placed, then add the other as a side study.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 10–12 hours per week of practice outside class. No prior programming experience required; we start from `public static void main(String[] args)` on day one. If you have done a 12th-standard computer-science course or basic C/C++/Java, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Decide your frontend track — React (default) or Angular (for IT-services targeting)",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call with the lead trainer",
      "Confirm enrolment and complete pre-course orientation",
    ],
  },

  faqs: [
    {
      question: "What is the Java Full Stack developer salary in Pune?",
      answer:
        "Indeed Pune reports an average of ₹10.61 lakh per year for Full Stack Developer (n=35, January 2026) and ₹8.32 lakh per year for Java Developer overall. Junior Java Developer averages ₹3.62 lakh; Senior averages ₹9.95 lakh; Lead Java Software Engineer averages ₹23.19 lakh. Your number depends on framework depth and project quality.",
    },
    {
      question: "How long does the Java Full Stack course take?",
      answer:
        "Five months — 16 weeks of structured curriculum (Core Java through DevOps and frontend) plus 4 weeks of capstone and interview preparation. Weekend batches stretch over 7–8 months at the same content depth, designed for working professionals.",
    },
    {
      question: "Java Full Stack vs MERN Stack — which has more jobs in Pune?",
      answer:
        "Java Full Stack has roughly 3–4× the openings of MERN in Pune. Indeed lists 1,000+ Java and 922+ Full Stack openings versus ~100–200 MERN-specific roles. Pick Java for IT-services and banking, MERN for product startups. Volume bias favours Java in Pune.",
    },
    {
      question: "Which frontend (React or Angular) is better with Java in Pune?",
      answer:
        "Pune Java Full Stack hiring splits roughly 60% React (product/fintech) and 30% Angular (IT-services like Cognizant, Infosys, TCS). React is the default in our course; Angular is offered as an opt-in alternative for students targeting IT-services campus hiring.",
    },
    {
      question: "Is Java Full Stack a good career in 2026?",
      answer:
        "Yes — it is the most stable backend hiring track in Pune. Java codebases live for decades, the maintenance and new-feature pipeline produces steady jobs, and 2026 modernisation (Java 21/25, Spring Boot 3.5/4.0, virtual threads, microservices on cloud) keeps the role technically interesting.",
    },
    {
      question: "What is the fee for Java Full Stack training in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep and the 4-week capstone; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Do I need to know Core Java before joining Full Stack?",
      answer:
        "No — the course starts with 3 weeks of Core Java foundations before moving to advanced Java, Spring Boot, microservices, and frontend. If you already know Core Java well, you can skip the foundation weeks and join from week 4 (with a small fee adjustment); kindly discuss with the lead trainer.",
    },
    {
      question: "Which companies in Pune hire Java Full Stack freshers?",
      answer:
        "TCS, Infosys, Wipro, Cognizant, Capgemini, LTIMindtree, HCLTech, Synechron Hinjawadi, Persistent Systems, BMC Software, Citibank Pune, Barclays Pune, Bajaj Finserv, Mercedes-Benz R&D India, Volkswagen IT Services, Cummins, and Honeywell are among the top Pune employers actively hiring Java Full Stack developers in 2026.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) Spring Boot + React full-stack SaaS application with JWT, (2) microservices system on Docker + Kubernetes with Spring Cloud, (3) Java Full Stack with the Angular track for students targeting IT-services. All three become public GitHub repositories.",
    },
    {
      question: "What is Spring Boot, and why is it the focus?",
      answer:
        "Spring Boot is plain Spring Framework plus auto-configuration, embedded server, and opinionated defaults — it powers ~70% of Pune backend hiring. Every active Pune banking, fintech, and product job description says 'Spring Boot,' not 'Spring.' We teach Spring Boot 3.5 / 4.0 directly with Java 21 baseline.",
    },
    {
      question: "Do I need data structures and algorithms before joining?",
      answer:
        "No — DSA is reviewed in weeks 14–15 specifically for technical screening rounds at companies like TCS, Cognizant, Synechron, and Bajaj Finserv. We focus on the 30–40 patterns that actually appear in Pune company interviews, not generic LeetCode-grinding.",
    },
    {
      question: "Are weekend Java Full Stack classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 7–8 months instead of 5. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network at 12 partner companies, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is virtual-threads coverage really useful in 2026 Pune interviews?",
      answer:
        "Yes — virtual threads (Java 21 + Spring Boot 3.2+) are now a standard topic in Pune senior Spring Boot interviews. The one-line `spring.threads.virtual.enabled=true` switch and when to enable it are routinely tested at Synechron, Bajaj Finserv, and BMC Software interviews in 2026.",
    },
    {
      question: "Are the named trainers actually teaching, or just on the brochure?",
      answer:
        "Yogesh Patil personally leads core programming and architecture / microservices weeks. Amol Patil leads Spring Boot and the project weeks. Ankita Hartale leads Spring Framework and database modules. The same names you see on this page are the same people you meet on day one of your batch.",
    },
    {
      question: "Do you offer Java Full Stack classes near me in Pune?",
      answer:
        "Our classroom is in Kothrud, Pune, and students travel in for Java Full Stack classes from Karve Nagar, Deccan, Shivaji Nagar, Hinjewadi, Wakad, Baner, Aundh, and Pimpri-Chinchwad. If a daily commute is hard, the online live batch is identical in content, trainers, and project reviews — so \"Java classes near me\" effectively means anywhere in Pune or beyond.",
    },
    {
      question: "What is the eligibility for the Java Full Stack course in Pune?",
      answer:
        "Anyone with basic computer skills and logical aptitude can join — BE, BTech, BCA, BCS, MCA, BSc-CS students, freshers, and working professionals or career switchers from non-tech backgrounds. No prior programming experience is required; the course starts from Core Java foundations in week one.",
    },
    {
      question: "Is EMI available for the Java Full Stack course fees in Pune?",
      answer:
        "Yes — EMI is available. Fees can be split across 2–3 instalments at no extra cost, alongside a single-payment early-bird discount and corporate-sponsorship invoicing with GST. Reach out for the current 2026 fee quote for classroom, online, or weekend batches.",
    },
  ],

  finalCta: {
    heading: "Ready to start Java Full Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 5–8 weeks. Reach out via the enquiry form or call us — Yogesh, Amol, or Ankita are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
