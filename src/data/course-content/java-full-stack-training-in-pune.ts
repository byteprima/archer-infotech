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
      "Career switcher with a non-tech degree willing to commit 6 months to a serious curriculum",
      "Mid-career engineer in PHP, .NET, or older Java wanting to move to Spring Boot 3 + cloud-native",
      "Out-of-state candidate planning to settle in Pune for a stable IT-services or banking role",
    ],
    notForYou: [
      "If you hate static typing or verbose syntax — MERN Stack will feel kinder",
      "If your goal is AI/ML jobs — Python is the right path",
      "If you want to ship a SaaS in 2 months — MERN ships faster",
      "If you don't have 6 months of runway — Java Full Stack genuinely needs that time, honestly delivered",
      "If you refuse to learn DSA — Cognizant, Synechron, and Bajaj Finserv Pune interviews still gate on it",
    ],
  },

  /**
   * Curriculum restructured 2026-08-17 to follow the Java + AI Roadmap 2026
   * progression (Levels 1–12), with two deliberate deviations:
   *
   *   1. FRONTEND IS ADDED. The roadmap is a backend-and-AI roadmap and
   *      carries no frontend at all. This is a Full Stack course, so React
   *      (with the Angular alternative) sits after REST APIs — the point at
   *      which there is an API worth building a UI against.
   *
   *   2. AI-ASSISTED DEVELOPMENT IS WOVEN, NOT TERMINAL. The roadmap's core
   *      principle is that AI accelerates Java work rather than replacing it,
   *      which makes it a working practice rather than a final-week topic.
   *
   * The roadmap's Level 12 ("AI for Java Developers") is a genuinely new
   * module. It is about BUILDING AI features in Java — Spring AI, RAG,
   * vector search, tool calling, agents — which is a different skill from
   * using an AI assistant to write code. Both are now taught.
   *
   * Per roadmap §4, JSP/Servlets and legacy Java EE patterns are no longer
   * taught as core. They were removed from the Advanced Java module.
   *
   * 26 weeks total: 22 taught + 4 capstone. Duration is unchanged at 6 months.
   */
  curriculum: [
    {
      title: "Programming Fundamentals",
      weekRange: "Week 1",
      description:
        "Before any Java syntax, the thinking. What a program actually is, how to decompose a problem, how memory holds a value, and how to read your own code back when it misbehaves. We work through algorithms and flowcharts, then the vocabulary you will use for the next six months — variables, data types, operators, conditions, loops, functions, input/output. Closes with debugging as a taught skill rather than something you pick up by accident, and a first look at time and space complexity so 'is this fast enough?' has a real answer.",
      topics: [
        "What a program is — algorithms and flowcharts",
        "Variables and how memory holds them",
        "Data types, operators, expressions",
        "Conditions, loops, and control flow",
        "Functions and methods, input/output",
        "Debugging as a method, not a reflex",
        "Basic algorithms — search and sort",
        "Time and space complexity — Big-O in practice",
      ],
    },
    {
      title: "Java Platform and Fundamentals",
      weekRange: "Week 2",
      description:
        "What actually happens between the .java file you write and the program that runs. JDK, JRE and JVM as three distinct things, source to bytecode to execution, and why classpath problems are the single most common thing that breaks a new developer's first build. Then the language surface — primitives against references, casting, methods, overloading, varargs, recursion and static. We set up JDK 21 with a path to Java 25, IntelliJ IDEA, and Maven, matching the toolchain in real Pune codebases.",
      topics: [
        "JDK, JRE, JVM — what each one is and does",
        "Source files, bytecode, compilation and execution",
        "Classpath and packages",
        "Primitive vs reference types, type casting",
        "Operators, conditions and loops in Java",
        "Methods, method overloading, varargs",
        "Recursion and the static keyword",
        "JDK 21+ setup, IntelliJ IDEA, Maven",
      ],
    },
    {
      title: "OOP and Modern Java",
      weekRange: "Weeks 3–4",
      description:
        "Object orientation done properly, then everything Java has added since 8. Classes, constructors, encapsulation, inheritance, polymorphism and abstraction — followed by the parts most courses skip: composition against inheritance, association and aggregation, and the equals/hashCode contract that quietly breaks HashMap lookups when you get it wrong. The modern half covers records, enums, sealed classes, lambdas, functional interfaces, method references, the Stream API, Optional, pattern matching, switch expressions and text blocks. This is the module that lets you read any Spring Boot codebase without hesitating.",
      topics: [
        "Classes, objects, constructors, this",
        "Encapsulation, inheritance, polymorphism, abstraction",
        "Abstract classes and interfaces",
        "Composition vs inheritance, association, aggregation",
        "Object, equals(), hashCode(), toString()",
        "final, immutability, records, enums, nested classes",
        "Lambdas, functional interfaces, method references",
        "Stream API and Optional",
        "Pattern matching, switch expressions, sealed classes, text blocks",
      ],
    },
    {
      title: "Exceptions and Collections",
      weekRange: "Week 5",
      description:
        "The two APIs you will touch every single working day. Exceptions first — checked against unchecked, try/catch/finally, throw against throws, custom exception types, propagation, and the handling practices that separate a readable stack trace from a swallowed failure nobody can diagnose. Then the collections framework in full: List, Set, Map, Queue and Deque with their concrete implementations, and — the part interviews actually probe — when to reach for each. Closes with iterators, Comparable and Comparator, generics and wildcards.",
      topics: [
        "Checked vs unchecked exceptions, exception hierarchy",
        "try, catch, finally, try-with-resources",
        "throw, throws, custom exceptions, propagation",
        "Exception-handling practices that survive code review",
        "List — ArrayList, LinkedList",
        "Set — HashSet, LinkedHashSet, TreeSet",
        "Map — HashMap, LinkedHashMap, TreeMap",
        "Queue, Deque, PriorityQueue",
        "Iterators, Comparable, Comparator",
        "Generics, bounded types and wildcards",
      ],
    },
    {
      title: "JVM, Memory and Concurrency",
      weekRange: "Week 6",
      description:
        "Why your service slowed down at 3am, and how to answer that in an interview. JVM architecture — stack, heap, metaspace, code cache — object references, garbage collection and its generations, class loading, JIT compilation, and how memory leaks happen in a language with a garbage collector. Then concurrency: threads and their lifecycle, synchronization, locks, race conditions, deadlocks, volatile, atomics, ExecutorService and thread pools, Callable and Future, CompletableFuture, concurrent collections, and virtual threads from Java 21.",
      topics: [
        "JVM architecture — stack, heap, metaspace, code cache",
        "Garbage collection, GC generations, JVM tuning basics",
        "Class loading, JIT compilation, memory leaks",
        "Process vs thread, thread lifecycle",
        "Synchronization, locks, race conditions, deadlocks",
        "volatile and atomic classes",
        "ExecutorService, thread pools, Callable, Future",
        "CompletableFuture and concurrent collections",
        "Virtual threads (Java 21+) and structured concurrency",
      ],
    },
    {
      title: "I/O, Tools and Database Foundations",
      weekRange: "Weeks 7–8",
      description:
        "Java I/O and the SQL depth that most full-stack courses shortchange. File handling, NIO, Paths and Files, readers and writers, JSON, the Date/Time API and regular expressions. Then databases taken seriously: the full SELECT vocabulary through GROUP BY, HAVING, JOINs, subqueries, CTEs and window functions; then indexes, transactions, ACID, isolation levels, locking, query optimisation and normalisation. Finish with JDBC — Connection, Statement, PreparedStatement, ResultSet, transactions and connection pooling — plus Maven or Gradle and a real Git and GitHub workflow.",
      topics: [
        "File handling, NIO, Paths, Files, readers and writers",
        "JSON, Date/Time API, regular expressions",
        "SELECT, WHERE, GROUP BY, HAVING, ORDER BY",
        "JOINs, subqueries, CTEs, window functions, views",
        "Indexes, query optimisation, normalisation, keys",
        "Transactions, ACID, isolation levels, locking",
        "JDBC — Connection, PreparedStatement, ResultSet",
        "Connection pooling with HikariCP",
        "Maven or Gradle, Git and GitHub workflow",
      ],
    },
    {
      title: "Spring and Spring Boot",
      weekRange: "Weeks 9–10",
      description:
        "The framework behind the majority of Pune backend hiring. Spring Core first so the magic is explicable — inversion of control, dependency injection, beans, ApplicationContext, component scanning, configuration and profiles. Then Spring Boot: starters, auto-configuration, externalised configuration, profiles, Actuator, logging and environment variables. We build with constructor injection throughout, because that is what passes code review, and cover what auto-configuration is actually doing so you can debug it when it does the wrong thing.",
      topics: [
        "Inversion of control and dependency injection",
        "Beans, ApplicationContext, component scanning",
        "Configuration classes and profiles",
        "Spring Boot starters and auto-configuration",
        "Externalised configuration and environment variables",
        "Actuator and production endpoints",
        "Logging — structured JSON via SLF4J and Logback",
        "Constructor-injection style and why it wins reviews",
      ],
    },
    {
      title: "REST APIs and Persistence",
      weekRange: "Weeks 11–12",
      description:
        "Build the API the rest of the course consumes. HTTP properly — methods, status codes, headers, JSON — then REST principles, DTOs, validation, pagination, sorting, filtering and centralised exception handling. Persistence in the same breath: JPA and Hibernate, entities, persistence context, EntityManager, Spring Data repositories, all four relationship cardinalities, lazy against eager loading, cascading, transactions, JPQL and native queries. Closes on the N+1 problem — how to spot it in logs and how to fix it — which is asked in Pune mid-level interviews more reliably than almost anything else.",
      topics: [
        "HTTP — GET, POST, PUT, PATCH, DELETE, status codes, headers",
        "REST principles, DTOs, content negotiation",
        "Validation with Jakarta Bean Validation",
        "Pagination, sorting, filtering",
        "Exception handling with @ControllerAdvice",
        "JPA and Hibernate — entities, persistence context, EntityManager",
        "Spring Data repositories and derived queries",
        "One-to-one, one-to-many, many-to-one, many-to-many",
        "Lazy vs eager loading, cascading, transactions",
        "JPQL, native queries, and the N+1 problem",
        "OpenAPI / Swagger via springdoc",
      ],
    },
    {
      title: "Frontend — React 19 + Next.js 15",
      weekRange: "Weeks 13–15",
      description:
        "The full-stack half, placed here deliberately: you now have a real API to build against rather than a mock. Modern React — function components, Hooks including use(), Server Components, Actions and Suspense — with TypeScript, state management via Redux Toolkit or Zustand, routing with the Next.js App Router, REST integration against your own Spring Boot service, the JWT auth flow wired front-to-back, real-time updates over WebSocket, and Tailwind CSS. You build the frontend half of your capstone in this module.",
      topics: [
        "React 19 — function components, Hooks, use(), Server Components",
        "TypeScript essentials for React",
        "Next.js 15 App Router — server vs client components",
        "State management — Redux Toolkit or Zustand",
        "REST integration with Axios / fetch",
        "JWT auth flow front-to-back against your Spring Boot API",
        "WebSocket real-time updates",
        "Tailwind CSS, form handling and validation",
      ],
    },
    {
      title: "Angular Track (opt-in alternative to React)",
      weekRange: "Weeks 13–15 alternate",
      description:
        "For students targeting IT-services hiring — Cognizant, Infosys, TCS — where Angular remains the preferred frontend, we run an opt-in Angular 18+ track in place of React. Components, services, RxJS, dependency injection, routing, template-driven and reactive forms, HTTP client and interceptors, integrated against the same Spring Boot backend. Identical project deliverables, different framework. Choose on your target employers, not on preference.",
      topics: [
        "Angular 18+ — components, services, modules",
        "TypeScript with Angular",
        "RxJS — Observables, operators, async pipe",
        "Dependency injection",
        "Routing and lazy loading",
        "Forms — template-driven and reactive",
        "HTTP client and interceptors",
        "REST integration with the Spring Boot backend",
      ],
    },
    {
      title: "Security and Testing",
      weekRange: "Weeks 16–17",
      description:
        "Two things juniors are expected to already know and usually do not. Security: authentication against authorisation, password hashing, roles and permissions, JWT, OAuth 2.0 and OpenID Connect, CORS, CSRF, and the Spring Security 6 filter chain — understood rather than copy-pasted. Testing: JUnit and Mockito for unit tests, integration testing against a real database with Testcontainers, API testing with REST Assured and Postman, and where end-to-end testing fits. By the end your capstone has a test suite you can point an interviewer at.",
      topics: [
        "Authentication vs authorisation, password hashing",
        "Roles, permissions, and method-level security",
        "JWT, OAuth 2.0, OpenID Connect",
        "CORS, CSRF, and the Spring Security 6 filter chain",
        "JUnit — unit testing structure and assertions",
        "Mockito — mocking collaborators",
        "Integration testing with Testcontainers",
        "REST Assured and Postman for API testing",
        "JaCoCo coverage and what a useful number looks like",
      ],
    },
    {
      title: "Production Engineering",
      weekRange: "Weeks 18–19",
      description:
        "The layer between 'it works on my machine' and a system that survives real traffic. Docker properly — Dockerfiles, images, containers, volumes, networks, Compose and environment variables. Redis and caching: the cache-aside pattern, TTLs, and what distributed caching changes about correctness. Then Kafka as more than a buzzword — producers and consumers, topics, partitions, consumer groups, event ordering and idempotency, which is the concept that decides whether your retry logic corrupts data or not.",
      topics: [
        "Docker — Dockerfile, images, containers, volumes, networks",
        "Docker Compose and environment variables",
        "Redis and the cache-aside pattern",
        "TTL strategy and distributed caching",
        "Kafka — producers, consumers, topics",
        "Partitions, consumer groups, event ordering",
        "Idempotency and safe retries",
        "Messaging patterns and when not to use them",
      ],
    },
    {
      title: "Microservices, Cloud and DevOps",
      weekRange: "Weeks 20–21",
      description:
        "Split the monolith the way Pune banking and product teams actually do. Service boundaries, API Gateway, service discovery, inter-service communication with OpenFeign, resilience and circuit breakers, distributed transactions and the Saga pattern, event-driven architecture. Then cloud and delivery: AWS or Azure with containers, managed databases, storage, IAM and monitoring; GitHub Actions for CI/CD with automated builds, tests, deployment and secrets management. Observability closes it out — logging, metrics, tracing, health checks, OpenTelemetry, and the Prometheus and Grafana concepts you will be asked about.",
      topics: [
        "Service boundaries and decomposition strategy",
        "API Gateway, service discovery, OpenFeign",
        "Resilience4j — circuit breaker, retry, bulkhead",
        "Distributed transactions and the Saga pattern",
        "Event-driven architecture",
        "AWS or Azure — containers, managed DBs, storage, IAM",
        "GitHub Actions — CI/CD, automated tests, secrets management",
        "Kubernetes basics — pods, services, deployments",
        "Observability — logging, metrics, tracing, health checks",
        "OpenTelemetry, Prometheus and Grafana concepts",
      ],
    },
    {
      title: "AI for Java Developers",
      weekRange: "Weeks 22–23",
      highlight: true,
      description:
        "Building AI features in Java — a different skill from using an AI assistant to write code, and the one that is starting to separate candidates. Deliberately placed last, because the roadmap this follows is explicit that AI comes after solid backend foundations. Start with LLM mechanics — prompts, system instructions, tokens, context windows, structured output, streaming, tool calling, model parameters and selection. Then Spring AI: chat models, prompt templates, structured outputs, embeddings, vector stores. Build a full RAG pipeline — ingestion, chunking, embeddings, vector storage in PostgreSQL with pgvector, similarity search, context retrieval, grounded generation. Then agents: tool selection, multi-step workflows, memory, state, human approval, and exposing your own APIs and database as tools. Closes on the two things production teams get wrong — AI security (prompt injection, data leakage, excessive permissions, tool authorisation, rate limiting, audit logging) and AI evaluation (groundedness, hallucination, retrieval quality, latency, token usage and cost).",
      topics: [
        "LLM mechanics — prompts, system instructions, tokens, context windows",
        "Structured output, streaming, function/tool calling",
        "Model parameters and choosing a model",
        "Spring AI — chat models, prompt templates, structured outputs",
        "Embeddings and vector stores",
        "RAG — ingestion, chunking, similarity search, grounded generation",
        "PostgreSQL + pgvector for vector search",
        "Agents — tool selection, multi-step workflows, memory, state",
        "Human approval and internal API/database tools",
        "AI security — prompt injection, data leakage, tool authorisation",
        "AI evaluation — groundedness, hallucination, retrieval quality, cost",
      ],
    },
    {
      title: "Capstone Project and Interview Preparation",
      weekRange: "Weeks 24–26 (plus placement prep from Week 12)",
      description:
        "Full-time capstone work plus placement preparation. Mock technical interviews against question banks from Pune companies — TCS, Infosys, Persistent, Synechron, Bajaj Finserv, BMC. A DSA refresher targeting the 30–40 patterns that screen candidates out at IT-services and BFSI. Resume and LinkedIn rewrite, GitHub portfolio cleanup, and HR mock interviews including salary negotiation. Your capstone ships as a deployed Java + React or Angular application with a test suite and at least one AI-backed feature.",
      topics: [
        "Capstone — deployed full-stack build with an AI feature",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA refresher — the patterns that screen out",
        "Resume and LinkedIn rewrite",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Woven throughout — dedicated sessions in Weeks 5, 12 and 21",
      description:
        "Using AI to build faster without losing control of what you ship. This runs alongside the curriculum rather than at the end, because it is a working practice, not a topic — the guiding principle of the roadmap this course follows is that AI should accelerate Java development, never replace Java knowledge. You drive GitHub Copilot, Claude, Cursor and IDE-native assistants to scaffold, generate tests, explain unfamiliar code and cut boilerplate, with heavy emphasis on guardrails: reviewing every suggestion, spotting hallucinated APIs, and handling licensing and data privacy. The standard you are held to is the professional one — you must be able to explain, test, debug, secure, optimise and modify anything AI writes for you.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for this stack — scaffolding, boilerplate, config",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring and modernising unfamiliar code",
        "AI-driven review, error detection and quality checks",
        "AI debugging — interpreting errors, logs and failing output",
        "Guardrails — hallucinated APIs, licensing, data privacy",
        "Team workflow — AI in the editor, in reviews, in delivery pipelines",
        "The standard — explain, test, debug, secure, optimise, modify",
      ],
    },
  ],

  roadmapImage: {
    src: "/images/courses/java-ai-roadmap-2026-v1.webp",
    width: 864,
    height: 1821,
    alt:
      "Java + AI Roadmap 2026 — a 30-step visual learning path from programming fundamentals through core Java, JVM and concurrency, SQL and JDBC, Spring Boot and REST APIs, security, testing, Docker, Redis, Kafka, microservices, cloud and CI/CD, ending in LLM APIs, Spring AI, embeddings and vector databases, RAG and AI agents.",
    caption:
      "The full progression at a glance. Every step is covered in the module list below —",
    fullSizeHref: "/images/courses/java-ai-roadmap-2026-v1.png",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/java-ai-roadmap-2026-v1.pdf",
    title: "Java + AI Roadmap 2026 — Complete Syllabus",
    slug: "java-full-stack-syllabus",
    blurb:
      "The complete 12-level learning sequence this course follows, as a 12-page PDF you can keep or share — every topic from programming fundamentals through Spring AI, RAG and AI agents, plus the project progression and the 2026 stack. Everything in it is already on this page; the PDF is just the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 12-page PDF",
        items: [
          "All twelve levels in order, from programming fundamentals and core Java through Spring Boot, JPA and Hibernate, Spring Security, microservices and cloud, ending in AI application development with Spring AI.",
          "A fifteen-project progression, from a Student Management System in plain Java to a RAG document assistant and an enterprise AI-powered Java platform.",
          "The recommended 2026 stack named tool by tool — Java, Spring Boot, PostgreSQL, JPA/Hibernate, Docker, Redis, Kafka, AWS or Azure, GitHub Actions, Spring AI and pgvector.",
          "What not to spend your first year on: JSP-heavy development, applets, and old Java EE patterns still taught elsewhere in Pune.",
          "The evaluation and security checklist for AI features — prompt injection, tool authorisation, groundedness, hallucination and token cost.",
        ],
      },
      {
        heading: "Roles this sequence prepares you for",
        items: [
          "Java Developer",
          "Backend Developer",
          "Java Full Stack Developer",
          "Spring Boot Developer",
          "Microservices Developer",
          "Cloud Developer",
          "AI-integrated Java Developer",
          "Enterprise Application Developer",
        ],
      },
    ],
  },

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
      title: "RAG-Powered Document Assistant in Java",
      description:
        "The capstone of the AI module — a Spring AI service that ingests your own documents, chunks and embeds them, stores the vectors in PostgreSQL via pgvector, and answers questions grounded in that corpus rather than in whatever the model happens to remember. Adds tool calling so the assistant can query your existing REST APIs and database, memory so a conversation holds context, and a human-approval step before any write action. Ships with the guardrails that matter in production: prompt-injection handling, tool authorisation, rate limiting, audit logging, and an evaluation harness measuring groundedness, retrieval quality, latency and token cost. The part of the stack most 2026 Java candidates cannot yet demonstrate.",
      technologies: [
        "Spring AI",
        "LLM APIs — chat, embeddings, structured output",
        "PostgreSQL + pgvector",
        "RAG — chunking, similarity search, grounded generation",
        "Tool calling and agent workflows",
        "Prompt-injection and tool-authorisation guardrails",
        "Evaluation — groundedness, retrieval quality, token cost",
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
      "6 months of structured curriculum (22 weeks, Programming Fundamentals through AI for Java Developers, plus 4 weeks of capstone and interview preparation)",
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
        "Stretches over 8–9 months instead of 6 to accommodate working professionals. Same content, lower weekly load.",
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

  /**
   * FAQs — expanded and extended 2026-08-17.
   *
   * Rendered through the shared <FaqSection>, which makes every question a
   * real <h3> with its answer as the immediate next sibling, and leads with
   * the direct answer. The bespoke <details> markup this replaced put each
   * question inside a <span> in a <summary>, so the page emitted FAQPage
   * schema for eighteen questions while having no question-shaped headings
   * at all — the same defect already fixed on trainers and location pages.
   *
   * Two answers were stale after the curriculum restructure and are
   * corrected here: Core Java foundations now run weeks 1–5 rather than 1–3,
   * and the DSA refresher sits in the weeks 23–26 capstone block rather than
   * weeks 14–15.
   *
   * The last ten questions cover the syllabus added in the Java + AI Roadmap
   * 2026 restructure — Spring AI and RAG, testing, JVM internals, production
   * engineering, security depth, and what is deliberately no longer taught.
   */
  faqs: [
    {
      question: "What is the Java Full Stack developer salary in Pune?",
      answer:
        "Indeed Pune reports an average of ₹10.61 lakh per year for Full Stack Developer (n=35, January 2026) and ₹8.32 lakh per year for Java Developer overall. Junior Java Developer averages ₹3.62 lakh; Senior averages ₹9.95 lakh; Lead Java Software Engineer averages ₹23.19 lakh. Your number depends on framework depth and project quality far more than on years served. In practice the candidates who clear ₹8 lakh early are the ones who can explain a Spring Boot service end to end — persistence, security, caching, and how they tested it — rather than those who list the most technologies on a resume.",
    },
    {
      question: "How long does the Java Full Stack course take?",
      answer:
        "Six months — 22 weeks of structured curriculum plus 4 weeks of capstone and interview preparation, 26 weeks in total. The curriculum runs from programming fundamentals and core Java through JVM internals, SQL, Spring Boot, REST APIs and persistence, React or Angular, security and testing, production engineering, microservices and cloud, and finishes with AI application development in Java. Weekend batches cover identical content at a lower weekly load and stretch over 8–9 months, which suits working professionals travelling in from Hinjewadi, Kharadi or Pimpri-Chinchwad.",
    },
    {
      question: "Java Full Stack vs MERN Stack — which has more jobs in Pune?",
      answer:
        "Java Full Stack has roughly 3–4× the openings of MERN in Pune. Indeed lists 1,000+ Java and 922+ Full Stack openings against roughly 100–200 MERN-specific roles. Pick Java if you are targeting IT services, banking and the GCC belt — TCS, Infosys, Cognizant, Barclays, Citibank, Synechron. Pick MERN if you are aiming at product startups where JavaScript everywhere is the norm. Volume bias favours Java in Pune, and the Java roles tend to survive downturns better because the codebases behind them are long-lived enterprise systems rather than funded experiments.",
    },
    {
      question: "Which frontend (React or Angular) is better with Java in Pune?",
      answer:
        "Pune Java Full Stack hiring splits roughly 60% React (product and fintech) against 30% Angular (IT services such as Cognizant, Infosys and TCS). React 19 with Next.js is the default track in our Java Full Stack course in Pune; Angular 18+ is an opt-in alternative running the same weeks with the same project deliverables against the same Spring Boot backend. Choose on your target employers rather than on preference — if your shortlist is campus IT-services hiring, Angular is the safer signal on a fresher resume.",
    },
    {
      question: "Is Java Full Stack a good career in 2026?",
      answer:
        "Yes — it remains the most stable backend hiring track in Pune. Java codebases live for decades, so the maintenance and new-feature pipeline produces steady work rather than boom-and-bust cycles. The 2026 modernisation wave keeps it technically current: Java 21 and 25, Spring Boot 3.5 and 4.0, virtual threads, microservices on cloud, and now AI features built directly into Java services with Spring AI. The combination that is genuinely scarce in 2026 is a developer who can build a Spring Boot service and add a grounded AI feature to it, which is exactly what this course now covers.",
    },
    {
      question: "What is the fee for Java Full Stack training in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom, online or weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches at our Kothrud centre with extended interview preparation and the 4-week capstone; the lower end covers concession-eligible online or weekend formats. EMI across 2–3 instalments is available at no extra cost, and corporate sponsorship can be invoiced to your employer with GST. Reach us for the current 2026 quote — fees are confirmed in writing before you enrol, never revised mid-course.",
    },
    {
      question: "Do I need to know Core Java before joining Full Stack?",
      answer:
        "No — the Java Full Stack course in Pune starts from the beginning. Weeks 1 and 2 cover programming fundamentals and the Java platform (JDK, JRE, JVM, bytecode, classpath), weeks 3 and 4 cover object orientation and modern Java through records, sealed classes, lambdas and the Stream API, and week 5 covers exceptions and collections. If you already know core Java well you can join from week 6 with a fee adjustment, but sit the assessment first — most self-taught learners are solid on syntax and weak on the equals/hashCode contract and collection choice, which is precisely what interviews probe.",
    },
    {
      question: "Which companies in Pune hire Java Full Stack freshers?",
      answer:
        "TCS, Infosys, Wipro, Cognizant, Capgemini, LTIMindtree, HCLTech, Synechron Hinjawadi, Persistent Systems, BMC Software, Citibank Pune, Barclays Pune, Bajaj Finserv, Mercedes-Benz R&D India, Volkswagen IT Services, Cummins and Honeywell are among the Pune employers actively hiring Java Full Stack developers in 2026. The IT-services names hire in volume through campus and walk-in drives and weight DSA screening heavily; the product and BFSI names hire in smaller numbers and interview far harder on Spring Boot internals, SQL and system design. Our interview preparation splits along that line rather than treating all employers the same.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — four capstone projects, each a public GitHub repository you can hand an interviewer. A Spring Boot and React full-stack SaaS application with JWT authentication and Spring Security 6; a microservices system on Docker and Kubernetes with Spring Cloud Gateway, Resilience4j and distributed tracing; a RAG-powered document assistant built with Spring AI and pgvector; and, for Angular-track students, the same backend fronted by Angular 18+. Every project ships with a test suite, which matters more than most students expect — an untested repository reads as a tutorial follow-along to anyone reviewing it.",
    },
    {
      question: "What is Spring Boot, and why is it the focus?",
      answer:
        "Spring Boot is the Spring Framework plus auto-configuration, an embedded server and opinionated defaults, and it powers roughly 70% of Pune backend hiring. Every active Pune banking, fintech and product job description names Spring Boot rather than plain Spring. We teach Spring Boot 3.5 and 4.0 on a Java 21 baseline, and we teach Spring Core first — inversion of control, dependency injection, beans, component scanning — so that auto-configuration is explicable rather than magical. That distinction is what separates a candidate who can debug a failing context from one who can only scaffold from Spring Initializr.",
    },
    {
      question: "Do I need data structures and algorithms before joining?",
      answer:
        "No — DSA is covered in the weeks 23–26 capstone and interview-preparation block, timed deliberately for technical screening rounds at companies such as TCS, Cognizant, Synechron and Bajaj Finserv. We work the 30–40 patterns that actually appear in Pune company interviews rather than open-ended LeetCode grinding, because the screening rounds at IT-services employers are pattern-recognition tests on a narrow set of problems. Placing DSA at the end also means you practise it while actively interviewing, when retention is highest, rather than six months before you need it.",
    },
    {
      question: "Are weekend Java Full Stack classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00 to 13:00, stretched over 8–9 months instead of 6. Same syllabus, same trainers, same projects and the same placement support; only the weekly load differs. Weekend batches are the format most working professionals choose, particularly those commuting from Hinjewadi, Wakad, Kharadi and Pimpri-Chinchwad where a weekday evening trip to Kothrud is not realistic. Live online is the other option for that group, and many students combine the two — online through the week, classroom on Saturday for the lab-heavy sessions.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support: mock interviews, referrals through our alumni network at partner companies, resume and LinkedIn rewrites, and salary negotiation coaching. Support starts at week 12 of the course rather than at the end, so by the time you finish, your resume is written, your GitHub is presentable and you have completed at least three mock technical interviews against Pune company question banks. If your first round of interviews does not land, you can sit in on a future batch's interview-preparation sessions free of charge.",
    },
    {
      question: "Is virtual-threads coverage really useful in 2026 Pune interviews?",
      answer:
        "Yes — virtual threads (Java 21 with Spring Boot 3.2+) are now a standard topic in Pune senior Spring Boot interviews. The one-line `spring.threads.virtual.enabled=true` switch, and more importantly when not to enable it, are routinely tested at Synechron, Bajaj Finserv and BMC Software. We cover them inside the JVM, memory and concurrency module alongside the platform threads and thread pools they replace, plus structured concurrency, because the interview question is almost always comparative — what changes, what breaks, and which workloads see no benefit at all.",
    },
    {
      question: "Are the named trainers actually teaching, or just on the brochure?",
      answer:
        "Yogesh Patil personally leads the core programming and architecture and microservices weeks. Amol Patil leads Spring Boot and the project weeks. Ankita Hartale leads Spring Framework and the database modules. The names on this page are the people you meet on day one of your batch. Batches are capped at 15 students, which is what makes that possible — a 60-seat batch cannot be taught by senior trainers at a sustainable cost, which is why institutes that run them substitute junior staff after the first week.",
    },
    {
      question: "Do you offer Java Full Stack classes near me in Pune?",
      answer:
        "Our classroom is in Kothrud, Pune, and students travel in for Java Full Stack classes from Karve Nagar, Deccan, Shivaji Nagar, Erandwane, Warje, Hinjewadi, Wakad, Baner, Aundh, Kharadi and Pimpri-Chinchwad. If a daily commute is hard, the live online batch is identical in content, trainers and project reviews, so \"Java classes near me\" effectively means anywhere in Pune or beyond. Each neighbourhood has its own page on this site with commute detail and an honest view of which batch format actually works from there.",
    },
    {
      question: "What is the eligibility for the Java Full Stack course in Pune?",
      answer:
        "Anyone with basic computer skills and logical aptitude can join — BE, BTech, BCA, BCS, MCA and BSc-CS students, freshers, and working professionals or career switchers from non-technical backgrounds. No prior programming experience is required; the course starts from programming fundamentals in week one. The honest filter is time rather than background: this needs six months of consistent effort, and career switchers who cannot protect that time are better served by a shorter, narrower course than by starting this one and falling behind by week eight.",
    },
    {
      question: "Is EMI available for the Java Full Stack course fees in Pune?",
      answer:
        "Yes — EMI is available. Fees can be split across 2–3 instalments at no extra cost, alongside a single-payment early-bird discount and corporate-sponsorship invoicing with GST. There is no third-party lender, no interest and no credit check involved; it is a direct instalment arrangement with us. Reach out for the current 2026 fee quote for classroom, online or weekend batches, and ask about the concession criteria — they apply more often than most applicants expect, particularly for final-year students and recent graduates.",
    },

    {
      question: "Does the Java Full Stack course cover AI and Spring AI?",
      answer:
        "Yes — weeks 22 and 23 are a full module on building AI features in Java, and it is the part of this syllabus most Pune courses do not have. You cover LLM mechanics (prompts, tokens, context windows, structured output, streaming, tool calling), then Spring AI for chat models, prompt templates and embeddings, then a complete RAG pipeline — document ingestion, chunking, vector storage in PostgreSQL with pgvector, similarity search and grounded generation. It closes on AI agents with tool calling and memory, AI security, and AI evaluation. Deliberately placed last, because it only makes sense on top of solid backend foundations.",
    },
    {
      question: "What is the difference between AI-assisted coding and building AI features in Java?",
      answer:
        "They are two different skills and this course teaches both. AI-assisted coding is using GitHub Copilot, Claude or Cursor to scaffold, generate tests and refactor faster — a working practice, so it runs woven through the course with dedicated sessions in weeks 5, 12 and 21. Building AI features in Java is engineering: calling LLM APIs from a Spring Boot service, storing embeddings, retrieving context, grounding an answer and evaluating whether it was correct. Most candidates in 2026 can do the first. Very few can do the second, which is why interviews are starting to separate on it.",
    },
    {
      question: "Is RAG and vector database work included in the Java syllabus?",
      answer:
        "Yes — RAG is built end to end rather than described. You ingest a document corpus, choose a chunking strategy, generate embeddings, store vectors in PostgreSQL using the pgvector extension, run similarity search, construct context and produce grounded answers. The capstone for this module is a RAG-powered document assistant that also exposes your own REST APIs and database as callable tools, with a human-approval step before any write action. Vector search is taught on Postgres rather than a dedicated vector database because most Pune teams already run Postgres and adding pgvector is a far easier internal sell.",
    },
    {
      question: "Which testing tools does the Java Full Stack course teach?",
      answer:
        "JUnit and Mockito for unit testing, Testcontainers for integration tests against a real database rather than an in-memory substitute, REST Assured and Postman for API testing, and JaCoCo for coverage. Testing sits in weeks 16 and 17 alongside security, and it is not optional — your capstone ships with a test suite. This matters commercially: testing is the most common gap on fresher resumes in Pune, and the fastest way to look experienced in a code review is a repository where the tests explain what the code is supposed to do.",
    },
    {
      question: "Do you cover Kafka, Redis and caching in the Java course?",
      answer:
        "Yes — weeks 18 and 19 are a production engineering module. Redis and the cache-aside pattern, TTL strategy and what distributed caching changes about correctness. Kafka beyond the buzzword: producers and consumers, topics, partitions, consumer groups, event ordering, and idempotency — the concept that decides whether your retry logic corrupts data or not. Docker, Dockerfiles, volumes, networks and Compose sit in the same module. These are the topics that separate a candidate who has built a service from one who has only built an application.",
    },
    {
      question: "Do you teach JVM internals and garbage collection?",
      answer:
        "Yes — week 6 covers JVM architecture (stack, heap, metaspace, code cache), garbage collection and its generations, class loading, JIT compilation, how memory leaks happen in a garbage-collected language, and the basics of JVM tuning. This is a frequent interview topic at Pune product and BFSI employers and a common gap for self-taught candidates. The practical framing is the one interviewers actually use: your service slowed down at 3am — what do you look at, in what order, and what does the answer tell you.",
    },
    {
      question: "What security topics does the Spring Boot part of the course cover?",
      answer:
        "Authentication against authorisation, password hashing, roles and permissions, method-level security, JWT, OAuth 2.0 and OpenID Connect, CORS, CSRF, and the Spring Security 6 filter chain understood rather than copy-pasted. Weeks 16 and 17 cover it alongside testing. Spring Security is the module most students find hardest and most interviewers ask about, largely because the common learning path is pasting a configuration that works and never learning why — so we build the filter chain up rather than starting from a working template.",
    },
    {
      question: "Do you still teach JSP and Servlets in 2026?",
      answer:
        "No, not as core content. JSP-heavy development, applets and older Java EE patterns are deliberately out of the main syllabus — they consume weeks that are better spent on Spring Boot, testing, cloud and AI integration, and they no longer appear in the Pune job descriptions this course targets. Some Pune institutes still teach a Servlets-and-JSP-first curriculum because the material is old and cheap to deliver. If a specific employer or a maintenance project genuinely requires it, we cover it on request, which is the right time to learn legacy technology.",
    },
    {
      question: "Can I download the Java Full Stack syllabus as a PDF?",
      answer:
        "Yes — the complete 12-level syllabus is available as a 12-page PDF from the download block on this page. It contains everything shown here: all twelve levels in order, the fifteen-project progression from a Student Management System to an enterprise AI-powered Java platform, the recommended 2026 stack named tool by tool, what not to prioritise in your first year, and the AI evaluation and security checklist. Everything in the PDF is already on this page — the download is simply the portable version you can keep, print or share with a parent or employer sponsoring the fees.",
    },
    {
      question: "What is the Java + AI Roadmap 2026 this course follows?",
      answer:
        "It is a twelve-level progression from programming fundamentals to AI-integrated Java development, and this course is structured around it. Levels 1 to 6 build the language and the platform — fundamentals, modern Java, collections, JVM and concurrency, SQL and JDBC. Levels 7 to 11 build the working developer — Spring and Spring Boot, REST and persistence, security and testing, production engineering, microservices and cloud. Level 12 is AI application development. Its guiding principle is the one we teach to: AI should accelerate Java development, never replace Java knowledge, and you must be able to explain, test, debug and secure anything it writes for you.",
    },
    {
      question: "Do you cover microservices, Docker and Kubernetes for Pune jobs?",
      answer:
        "Yes — weeks 20 and 21 cover service boundaries, API Gateway, service discovery, OpenFeign, Resilience4j circuit breakers, distributed transactions and the Saga pattern, and event-driven architecture, then AWS or Azure deployment with GitHub Actions CI/CD and secrets management, and finally observability with OpenTelemetry, Prometheus and Grafana concepts. Docker and Compose come earlier in production engineering; Kubernetes basics — pods, services, deployments — sit here. Pune banking and product teams interview on this material specifically, and the Saga question in particular is a reliable filter at Synechron and Barclays.",
    },
  ],

  finalCta: {
    heading: "Ready to start Java Full Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 5–8 weeks. Reach out via the enquiry form or call us — Yogesh, Amol, or Ankita are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
