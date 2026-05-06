import type { CourseRichContent } from "./types";

export const javaTrainingInPune: CourseRichContent = {
  intro:
    "Java is among the most heavily-deployed enterprise programming languages globally — powering 90%+ of Fortune 500 backends, the Android platform, and the majority of Pune's IT-services and product-engineering hiring. Archer Infotech's Java training in Pune teaches the language as it is actually used in 2026 — Java 21 LTS with virtual threads, Spring Boot 3.x, microservices on Kubernetes, and direct hiring connections with companies like Persistent Systems, TCS, Infosys, Wipro, BMC Software, and Bajaj Finserv. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Java in 2026",
    paragraphs: [
      "Java is foundational, not legacy. Stack Overflow's enterprise survey shows roughly 60% of large-scale enterprise systems run on the JVM, and over 90% of Fortune 500 companies still maintain mission-critical Java codebases. LinkedIn India lists approximately 14% more open Java positions than Python ones, with around 1.1 lakh active Java postings as of early 2026. In Pune specifically, Java is the dominant backend language for the BFSI sector, the IT services majors (TCS, Infosys, Wipro, Cognizant), and product engineering teams at Persistent Systems, BMC Software, Bajaj Finserv, and Synechron.",
      "What changed is the language itself. Java 21 LTS (September 2023) shipped virtual threads via Project Loom — write synchronous-looking code that runs at asynchronous scale, no callback nesting required. Pattern matching for switch is now final. Sequenced collections give proper ordering guarantees on Set and Map. Generational ZGC delivers sub-millisecond pause times on multi-GB heaps. Java 25 LTS (September 2025) graduated scoped values, refined structured concurrency, and added flexible constructor bodies. Spring Boot 3.x exposes virtual threads with a one-line property switch.",
      "What this means for hiring: Pune job postings increasingly call out Spring Boot 3.x, microservices on AWS or GCP, and integration with LLM APIs as standard requirements rather than nice-to-haves. Archer Infotech's curriculum is rebuilt around this 2026 reality — modern Java, modern Spring, real cloud deployment, and AI-aware backend design — not a Java 8 syllabus retitled.",
    ],
    keyPoints: [
      "Java 21 LTS — virtual threads, pattern matching, sequenced collections",
      "Spring Boot 3.x — Java 21 baseline, GraalVM native images, virtual-thread switch",
      "Pune market reality — ~14% more Java jobs than Python on LinkedIn India",
      "BFSI + product engineering hiring — Persistent, BMC, Bajaj Finserv, Synechron",
      "AI integration — Spring Boot services calling LLM APIs is the new normal",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA or BSc-CS student looking for your first full-time IT role in Pune",
      "Working professional in a non-Java stack wanting to switch into enterprise backend",
      "BSc graduate or 12th-passout willing to commit 3 months to a structured curriculum",
      "Career restarter (took a break, raising a family, switching from a non-tech role) re-entering software",
      "International student or out-of-state candidate planning to settle in Pune for IT work",
    ],
    notForYou: [
      "If you want a 30-day course with no project work — backend engineering needs at least 3 months to internalise",
      "If you cannot put in 8–10 hours of coding practice per week outside class — coding is a contact sport",
      "If you only want theory or certification stickers — we use real projects, code reviews, and a public GitHub portfolio",
      "If you expect a placement guarantee with no effort — we offer placement support, not magic; about 10% of enquirers we politely turn away",
      "If you already have 5+ years of Java production experience — you'll be bored; consider our Spring Boot & Microservices specialisation instead",
    ],
  },

  curriculum: [
    {
      title: "Java Fundamentals",
      weekRange: "Weeks 1–2",
      description:
        "Set up JDK 21+ on your machine, write your first program, and learn how the JVM actually executes Java — bytecode, class loading, garbage collection at a high level. Cover primitive vs reference types, control flow, methods, arrays, and exception handling. By the end of this module you'll be comfortable reading any Java codebase's basic flow and writing 100-line programs without lookup.",
      topics: [
        "JDK installation and IDE setup (IntelliJ IDEA / VS Code)",
        "Primitive types and reference types",
        "Control flow — if / switch / loops",
        "Methods, parameters, method overloading",
        "Arrays and arrays vs collections",
        "Exception hierarchy, checked vs unchecked",
        "Try-with-resources for safe I/O",
      ],
    },
    {
      title: "Object-Oriented Programming",
      weekRange: "Weeks 3–4",
      description:
        "The four pillars — encapsulation, inheritance, polymorphism, abstraction — taught with real refactoring exercises, not toy Animal/Dog examples. Build a small banking domain (Account, Customer, Transaction) and refactor it through three design iterations. Cover access modifiers, the records keyword (Java 16+), sealed classes (Java 17+), and how interfaces with default methods replaced abstract-class hierarchies in modern code.",
      topics: [
        "Classes, objects, constructors",
        "Inheritance and the protected modifier",
        "Polymorphism — compile-time and runtime",
        "Encapsulation and access control",
        "Abstraction — interfaces and abstract classes",
        "Records and sealed classes",
        "Default methods on interfaces",
      ],
    },
    {
      title: "Collections, Generics & Streams",
      weekRange: "Weeks 5–6",
      description:
        "The Collections Framework — List, Set, Map, Queue, Deque — with practical guidance on which to choose for which use case. Generics in depth (bounded wildcards, type erasure). Stream API for declarative data processing — filter, map, reduce, collect — and how it interacts with parallel streams. Sequenced collections (Java 21) for proper ordering guarantees on Set and Map. We finish the module by re-implementing a small subset of Collections from scratch so you understand the cost trade-offs.",
      topics: [
        "ArrayList vs LinkedList — when each wins",
        "HashSet, TreeSet, LinkedHashSet",
        "HashMap internals (buckets, hashing, treeified bins)",
        "Generics, bounded wildcards, type erasure",
        "Stream API — filter, map, reduce, collect",
        "Optional and null safety",
        "Sequenced collections (Java 21)",
      ],
    },
    {
      title: "Multithreading & Virtual Threads",
      weekRange: "Week 7",
      description:
        "Threads, ExecutorService, synchronisation, the volatile and atomic primitives, and the modern alternative — virtual threads (Java 21). We teach when classic threads are right (CPU-bound parallel work) versus when virtual threads are right (I/O-bound services handling thousands of concurrent requests). Includes the structured concurrency API (preview in Java 21, stable in Java 25) which is the recommended pattern for new code.",
      topics: [
        "Thread, Runnable, Callable",
        "ExecutorService and ForkJoinPool",
        "Synchronisation, volatile, AtomicInteger",
        "java.util.concurrent — locks, latches, semaphores",
        "Virtual threads (Project Loom)",
        "Structured concurrency",
      ],
    },
    {
      title: "JDBC, JPA & Hibernate",
      weekRange: "Week 8",
      description:
        "Connect Java to MySQL and PostgreSQL using JDBC, then graduate to JPA / Hibernate. Understand connection pooling (HikariCP), prepared statements, transactions, and the N+1 query problem that bites every junior developer in their first production sprint. Build a small repository pattern from scratch before introducing Spring Data, so you appreciate what Spring Data is doing under the hood.",
      topics: [
        "JDBC API and PreparedStatement",
        "Connection pooling with HikariCP",
        "Transactions and isolation levels",
        "JPA basics — entities, relationships, EntityManager",
        "Hibernate — first-level and second-level cache",
        "N+1 queries and how to fix them",
        "Repository pattern from scratch",
      ],
    },
    {
      title: "Spring Boot 3.x — REST APIs",
      weekRange: "Weeks 9–10",
      description:
        "The framework powering the majority of Pune backend hiring. Build a Spring Boot 3 REST API from project init to production-ready: controllers, services, repositories, validation, exception handling, OpenAPI spec via springdoc, JWT-based authentication, and full CRUD against PostgreSQL via Spring Data JPA. Includes profile-based configuration, externalised secrets, and switching the application to virtual threads with a single property — `spring.threads.virtual.enabled=true`.",
      topics: [
        "Spring Boot 3 project setup with Spring Initializr",
        "Dependency injection — constructor injection style",
        "REST controllers, request mapping, content negotiation",
        "Validation with Jakarta Bean Validation",
        "Exception handling with @ControllerAdvice",
        "Spring Data JPA — derived queries, JPQL",
        "Spring Security with JWT",
        "OpenAPI / Swagger via springdoc",
        "Profiles and externalised configuration",
        "Virtual threads in Spring Boot 3",
      ],
    },
    {
      title: "Microservices & Cloud Deployment",
      weekRange: "Week 11",
      description:
        "Split a monolith into microservices the way enterprise teams actually do it — Spring Cloud (config server, service discovery via Eureka, gateway routing), service-to-service communication via REST and RabbitMQ, distributed tracing via Micrometer + OpenTelemetry. Containerise each service with Docker, run via Docker Compose locally, and deploy to AWS (EC2 + RDS) plus a free-tier Kubernetes cluster (Minikube locally, then EKS).",
      topics: [
        "Microservice decomposition strategy",
        "Spring Cloud Config and service discovery",
        "API gateway routing",
        "Async messaging with RabbitMQ",
        "Resilience patterns — circuit breaker (Resilience4j)",
        "Distributed tracing — Micrometer + Zipkin",
        "Docker and Docker Compose",
        "Kubernetes basics — pods, services, deployments",
        "AWS EC2 + RDS deployment walkthrough",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 12 + 2 weeks placement prep",
      description:
        "Two weeks of full-time project work plus interview preparation. Pick one of three capstone projects (see Capstone Projects section). Mock technical interviews using question banks from Pune companies — TCS, Infosys, Persistent Systems, BMC Software, Bajaj Finserv. DSA refresher targeting the 30–40 patterns that actually appear in screening rounds. Resume and LinkedIn polish, GitHub portfolio cleanup, and HR mock interviews including salary negotiation.",
      topics: [
        "Capstone project — full implementation, deployment, README",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA quick refresher — patterns that screen-out, not LeetCode-grinding",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "Spring Boot REST API + JWT Auth + PostgreSQL",
      description:
        "Build a production-grade backend service from scratch — user registration, JWT login, role-based access, full CRUD on a domain entity (expense tracker, library system, or ticket booking — your choice), input validation, exception handling with proper HTTP status codes, OpenAPI spec, and integration tests with JUnit 5 + RestAssured. Deploy to AWS EC2 + RDS for PostgreSQL with a GitHub Actions pipeline. Outcome: a public GitHub repo with a CI badge — exactly what Pune product companies want to see in interviews.",
      technologies: [
        "Spring Boot 3",
        "Spring Security",
        "JWT",
        "Spring Data JPA",
        "PostgreSQL",
        "AWS EC2 + RDS",
        "JUnit 5",
        "GitHub Actions",
      ],
    },
    {
      title: "Microservices System on Docker + Kubernetes",
      description:
        "Decompose a monolith into four microservices (user, catalog, order, payment) communicating via REST and RabbitMQ. Wire up Spring Cloud Gateway for routing, Eureka for service discovery, Micrometer + Zipkin for distributed tracing. Containerise each service with Docker, run via Docker Compose locally, then deploy to a Minikube cluster. Includes one circuit-breaker pattern (Resilience4j) and one async messaging flow that you can demo end-to-end in interviews.",
      technologies: [
        "Spring Boot 3",
        "Spring Cloud",
        "RabbitMQ",
        "Resilience4j",
        "Micrometer + Zipkin",
        "Docker",
        "Docker Compose",
        "Kubernetes (Minikube)",
      ],
    },
    {
      title: "Java + React Full-Stack Application",
      description:
        "Spring Boot REST API + React frontend + PostgreSQL — the stack roughly 60% of Pune product companies hire for. Real-time updates via WebSocket, JWT auth carried through to the frontend, Redux Toolkit for state, deployed Spring Boot to AWS and React to Netlify or Vercel. Includes basic monitoring (Spring Boot Actuator + Prometheus metrics) and structured JSON logging via SLF4J + Logback.",
      technologies: [
        "Spring Boot 3",
        "React",
        "Redux Toolkit",
        "WebSocket",
        "PostgreSQL",
        "JWT",
        "AWS + Netlify",
        "Prometheus + Logback",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by trainers who write production Java for a living, not full-time educators reading from a slide deck. Both lead trainers below personally take sessions in every batch — the names on this page are the names you will meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Java backend developers are among the most-hired roles in Pune's IT corridor. Salary depends heavily on framework depth (Spring Boot, microservices, cloud) and project quality, not raw years of experience. Below are real Pune-market figures from Indeed and PayScale — we show you both because they differ by roughly 35% and the truth sits between the two.",
      "What pulls a Java developer above the average band: a public GitHub portfolio with deployed projects, demonstrable Spring Boot 3 + microservices experience, and one cloud deployment (AWS or GCP) you can talk through end-to-end. Our capstone projects are designed exactly around these signals.",
    ],
    salaryBands: [
      {
        role: "Junior Java Developer (Pune)",
        band: "₹3,62,182 per year",
        source: {
          label: "Indeed Pune (updated Dec 2025)",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Java Developer entry-level (<1 yr)",
        band: "₹3,07,863 per year average",
        source: {
          label: "PayScale Pune (Aug 2025, 33 profiles)",
          url: "https://www.payscale.com/research/IN/Job=Java_Developer/Salary/05b94eba/Pune",
        },
      },
      {
        role: "Java Developer (1–4 years)",
        band: "₹5,80,503 per year average",
        source: {
          label: "PayScale Pune (113 profiles)",
          url: "https://www.payscale.com/research/IN/Job=Java_Developer/Salary/05b94eba/Pune",
        },
      },
      {
        role: "Java Developer overall average — Pune",
        band: "₹6,12,760 base (PayScale) / ₹8,31,751 (Indeed)",
        source: {
          label: "PayScale + Indeed Pune",
          url: "https://www.payscale.com/research/IN/Job=Java_Developer/Salary/05b94eba/Pune",
        },
      },
      {
        role: "Senior Java Developer (Pune)",
        band: "₹9,95,292 per year",
        source: {
          label: "Indeed Pune",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
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
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "BMC Software",
      "Bajaj Finserv",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Zensar Technologies",
      "Capgemini",
      "Volkswagen IT Services",
      "Bajaj Auto",
      "Cummins",
      "Honeywell",
      "Atlas Copco",
    ],
    rolesAfterCourse: [
      "Java Developer",
      "Backend Engineer",
      "Spring Boot Developer",
      "Microservices Engineer",
      "Java Full Stack Developer (with frontend self-study)",
      "Software Engineer at IT services",
      "Junior Backend Engineer at product companies",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and interview preparation",
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
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer remembers your code by sight. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product and services companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes a free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 9 — GitHub portfolio cleanup, public README, deployment links",
      "Weeks 10–11 — DSA quick refresher targeting 30–40 patterns that screen out at TCS, Persistent, BMC",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referral via our 17-year alumni network at 12 partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "BMC Software",
      "Bajaj Finserv",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Zensar",
      "Capgemini",
      "Volkswagen IT Services",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Java training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn profiles",
        archer: "Yes — Yogesh Patil and Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Latest Java version covered in the curriculum",
        archer: "Java 21 LTS plus Java 25 features",
        typical: "Often Java 8 with brief Java 11 mention",
      },
      {
        feature: "Spring Boot version covered",
        archer: "Spring Boot 3.x — including virtual threads",
        typical: "Spring Boot 2.x or generic 'Spring framework'",
      },
      {
        feature: "Microservices and cloud deployment",
        archer: "Included in the base curriculum",
        typical: "Often a separate paid module or not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Verifiable hiring company list",
        archer: "Named companies with public 2026 job postings",
        typical: "Generic logos with no verifiable links",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed and PayScale with source URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "Honest market range with source citation",
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
      {
        feature: "Founder or director teaches flagship batches",
        archer: "Yes — Yogesh Patil personally leads core sessions",
        typical: "No — founder is a brand, not a teacher",
      },
    ],
    closing:
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student work and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "Java vs Python — Which Should You Learn First in Pune?",
    paragraphs: [
      "Java vs Python is the wrong question for most students — both have jobs in Pune, both pay well, and learning the second once you know the first is straightforward. The right question is which fits your goal in 2026.",
      "Choose Java if your goal is enterprise backend, BFSI (Pune is a major BFSI hub), Android development, or a Pune services-company role at TCS, Infosys, Wipro, or Cognizant. Java has roughly 14% more open positions than Python in India on LinkedIn, the average mid-level salary is similar (₹6L–₹9L), and Pune product companies like Persistent Systems, BMC Software, and Bajaj Finserv hire Java more often than Python.",
      "Choose Python if your goal is data science, ML or AI engineering, scripting, or a startup role where you will write multiple stacks. Python wins decisively for data tooling and is essential if you plan to work with LLM APIs day-to-day. For an engineer who plans to live and work in Pune long-term, the most common path is to start with Java, become job-ready in 3 months, and add Python as a side skill once placed. The investment compounds.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `public static void main(String[] args)` on day one. If you have done a 12th-standard computer-science course or basic C / C++, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS — JDK installation is part of session 1",
    ],
  },

  faqs: [
    {
      question: "Which is the best Java training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories, and (3) name companies that hired their last 5 batches with verifiable placement records. Compare on those three.",
    },
    {
      question: "How long does Java training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) for the regular classroom and online programmes, plus 2 weeks of capstone project and interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a Java developer in Pune?",
      answer:
        "Indeed Pune (December 2025) reports ₹3.62 lakh for Junior Java Developer, ₹8.32 lakh overall average, ₹9.95 lakh for Senior Java Developer, and ₹23.19 lakh for Lead Java Software Engineer. PayScale's averages run about 35% lower (₹6.13 lakh overall). Your actual number depends on framework depth and project quality, not raw years.",
    },
    {
      question: "Is Java still relevant in 2026?",
      answer:
        "Yes — more than ever. Java 21 LTS (2023) shipped virtual threads, pattern matching, and sequenced collections, making Java competitive with Go and Kotlin for modern backend work. Over 90% of Fortune 500 still run Java; LinkedIn India shows roughly 14% more Java jobs than Python.",
    },
    {
      question: "What is the fee for the Java course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with extended interview prep; the lower end covers concession-eligible online or weekend formats. Placement support is included in every fee tier, not a bolt-on.",
    },
    {
      question: "Can I learn Java without a programming background?",
      answer:
        "Yes — we start from 'Hello World'. The curriculum is designed for absolute beginners. What you do need is 8–10 hours per week of practice outside class. Coding is learned by writing code; passive watching does not transfer.",
    },
    {
      question: "Java or Python — which should I learn first in Pune?",
      answer:
        "Java first if your goal is enterprise backend, BFSI, Android, or Pune services-company roles. Python first if your goal is data science, ML, or startup scripting. Java has slightly more open jobs in Pune today; Python is growing faster. Many of our students learn Java first, get placed, then add Python as a side skill.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) Spring Boot REST API with JWT and PostgreSQL, deployed to AWS, (2) microservices on Docker and Kubernetes, (3) Spring Boot + React full-stack. All three end up as public GitHub repositories that you reference in interviews.",
    },
    {
      question: "What is covered in Spring Boot training?",
      answer:
        "Spring Boot 3.x — dependency injection, REST controllers, Spring Data JPA, Spring Security with JWT, validation, exception handling, OpenAPI specification, profiles and externalised config, and the modern bits — virtual-thread support via `spring.threads.virtual.enabled`, GraalVM native images, observability via Micrometer and OpenTelemetry.",
    },
    {
      question: "Do I need data structures and algorithms before joining?",
      answer:
        "No — DSA is reviewed in weeks 10–11 specifically for technical screening rounds at companies like TCS, Persistent, and BMC Software. We focus on the 30–40 patterns that actually appear in Pune company interviews, not generic LeetCode-grinding.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network at 12 partner companies, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are weekend Java classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What's the difference between Core Java and Advanced Java in your course?",
      answer:
        "Core Java is modules 1–4 (fundamentals, OOP, collections, multithreading) — the language. Advanced is modules 5–7 (JDBC and JPA, Spring Boot, microservices and cloud) — what makes you employable. We teach both. Core-Java-only courses do not get you hired in 2026.",
    },
    {
      question: "How is this different from your Java Full Stack course?",
      answer:
        "This Java Training in Pune programme is the foundation course — 3 months focused on Java, Spring Boot, and microservices. The Java Full Stack course is a separate 4-month programme that adds React frontend, full UI/UX, and DevOps. Many students start here and then add the frontend track later.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil (Founder & Director, 15+ years) personally leads the core programming sessions and the architecture / microservices weeks. Amol Patil (Senior Corporate Trainer, 10+ years) leads Spring Boot, JDBC, and the project weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Java training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Amol are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, meet a current batch, and decide with full information.",
  },
};
