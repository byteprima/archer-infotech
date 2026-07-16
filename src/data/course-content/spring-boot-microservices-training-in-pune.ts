import type { CourseRichContent } from "./types";

export const springBootMicroservicesTrainingInPune: CourseRichContent = {
  intro:
    "Spring Boot is the framework powering 70%+ of Pune backend hiring. Foundit alone reports 409 active Pune Spring Boot Microservices roles as of May 2026 — concentrated in BFSI (Bajaj Finserv, Citibank Pune, Barclays Pune, Deutsche Bank Pune, JPMC, HSBC, Bank of America), IT services (Cognizant, TCS, Infosys, LTIMindtree, Capgemini), and product engineering (Synechron Hinjawadi, Persistent, BMC, Veritas, Atlassian Pune). Archer Infotech's Spring Boot & Microservices training in Pune is a focused, modern programme — Spring Boot 3.5 / 4.0 on Java 21 LTS or Java 25, virtual threads enabled, GraalVM native images, microservices on Kubernetes, full observability via Micrometer and OpenTelemetry. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Spring Boot & Microservices in 2026",
    paragraphs: [
      "Spring Boot is the single most-mentioned framework in Pune backend job descriptions. Plain Spring (the original Spring Framework) is the engine; Spring Boot is the car everybody actually drives — auto-configuration, embedded server, opinionated defaults, and tight integration with Spring Cloud, Spring Security, Spring Data JPA, and Micrometer + OpenTelemetry. Foundit's Pune microservices feed shows 409 active 2026 roles, with named hiring at Bajaj Finserv (verified active senior SWE postings), Cognizant (Spring Boot Microservices JDs), Synechron Hinjawadi BFSI delivery centre, and product teams at BMC, Atlassian Pune, Persistent, and Veritas.",
      "What changed in 2026: Spring Boot 3.4 reached end-of-life on 31 December 2025. The current production targets are Spring Boot 3.5 (LTS-aligned) and Spring Boot 4.0 — version 4.0.5 went stable in March 2026. Java 21 LTS is the enterprise baseline; Java 25 LTS is the new greenfield target. Virtual threads (Java 21) are now production-ready and a one-line property switch in Spring Boot — `spring.threads.virtual.enabled=true` — and they are interview table-stakes for Pune senior Spring Boot roles. GraalVM native-image AOT compilation cuts cold-start to milliseconds and is actively shipped to production by Pune fintech and serverless teams. The new `spring-boot-starter-opentelemetry` (groupId `org.springframework.boot`) makes OTel a first-class citizen in Spring Boot 4.",
      "What this means for hiring: Pune 2026 Spring Boot job descriptions explicitly call out Spring Boot 3.5+, Java 21, virtual threads, GraalVM (in fintech / cold-start-sensitive paths), Spring Cloud Gateway, Resilience4j, Kafka, Micrometer + OpenTelemetry, Docker, Kubernetes, AWS or Azure deployment, SonarQube + OWASP gates. Archer Infotech's curriculum is rebuilt around this exact 2026 reality — modern Spring Boot, modern Java, real cloud-native microservices, full observability stack.",
    ],
    keyPoints: [
      "Spring Boot 3.5 and 4.0 — the current production targets after 3.4 EOL",
      "Java 21 LTS baseline with Java 25 features",
      "Virtual threads — `spring.threads.virtual.enabled=true` interview table-stakes",
      "GraalVM native images for cold-start-sensitive paths",
      "Micrometer + OpenTelemetry observability via spring-boot-starter-opentelemetry",
      "Pune market — 409 active Pune Spring Boot Microservices roles on Foundit (May 2026)",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Java developer with 6 months to 3 years of Core Java who wants to move into modern Spring Boot + microservices",
      "Working professional in PHP, .NET, or older Java targeting Pune BFSI or fintech roles",
      "Java Full Stack graduate (from our course or elsewhere) wanting to specialise in backend / distributed systems",
      "Senior engineer in another stack (Node, Python, Go) who needs Spring Boot for a Pune BFSI / banking opportunity",
      "Engineering / MCA graduate with a strong Java foundation targeting Synechron, Bajaj Finserv, or Cognizant Spring Boot Microservices teams",
    ],
    notForYou: [
      "If you don't know Java already — kindly do our Java Training course first; Spring Boot expects Java fluency (collections, generics, streams, Lambdas, exceptions). The course will outpace you.",
      "If you target frontend / React / mobile development — wrong path",
      "If you cannot commit 8–10 weeks of runway — Spring Boot + microservices + Spring Cloud + Docker + Kubernetes is genuinely a long curriculum honestly delivered",
      "If you want a quick-fresher offer at any cost — Spring Boot Pune entry is around ₹4 lakh, similar to plain Java; there is no shortcut premium",
      "If you have no interest in distributed systems, observability, or DevOps adjacency — microservices live or die on infra and observability literacy",
    ],
  },

  curriculum: [
    {
      title: "Modern Java Refresher (Java 21 LTS)",
      weekRange: "Week 1",
      description:
        "Compressed refresher covering the Java features you must be fluent in before Spring Boot makes sense — generics with bounded wildcards, the Stream API, Optional, records (Java 16+), sealed classes (Java 17+), pattern matching for switch (Java 21), virtual threads (Java 21), and structured concurrency (Java 25). If you are already strong on these, you can skip this week (with fee adjustment); if you are shaky, this week is essential before Spring Boot can help.",
      topics: [
        "Generics, bounded wildcards, type erasure",
        "Stream API — filter, map, reduce, collect",
        "Optional and null-safe patterns",
        "Records and sealed classes",
        "Pattern matching for switch (Java 21)",
        "Virtual threads — Project Loom",
        "Structured concurrency (Java 25)",
      ],
    },
    {
      title: "Spring Framework Core",
      weekRange: "Week 2",
      description:
        "Spring's heart is dependency injection — the IoC container, beans, scopes, and configuration. We cover it briefly because Spring Boot uses it under the hood, not because you need to write Spring XML in 2026. Includes the discipline that hiring panels test — constructor injection over field injection, when to use @Component vs @Configuration vs @Bean, and Spring profiles for environment-specific config.",
      topics: [
        "IoC container and dependency injection",
        "Beans, scopes (singleton, prototype, request, session)",
        "@Component, @Service, @Repository, @Configuration",
        "Constructor injection vs field injection",
        "Spring profiles",
        "Spring AOP basics",
      ],
    },
    {
      title: "Spring Boot 3.5 / 4.0 — REST APIs",
      weekRange: "Weeks 3–4",
      description:
        "Build a Spring Boot 3.5 / 4.0 REST API from project init to production-ready. Controllers, services, repositories, validation, exception handling with @ControllerAdvice, OpenAPI spec via springdoc, JWT-based authentication with Spring Security 6, full CRUD against PostgreSQL via Spring Data JPA. Profile-based configuration, externalised secrets, and the one-line virtual-threads switch — `spring.threads.virtual.enabled=true`. Brief introduction to Spring Boot Actuator endpoints for health checks and metrics.",
      topics: [
        "Spring Boot 3.5 / 4.0 project setup with Spring Initializr",
        "REST controllers, request mapping",
        "Validation with Jakarta Bean Validation",
        "Exception handling with @ControllerAdvice",
        "Spring Data JPA — derived queries, JPQL, specifications",
        "Spring Security 6 with JWT",
        "OpenAPI / Swagger via springdoc",
        "Profiles, externalised configuration, dotenv-style overrides",
        "Virtual threads in Spring Boot 3.2+",
        "Actuator endpoints",
      ],
    },
    {
      title: "Microservices Architecture & Patterns",
      weekRange: "Week 5",
      description:
        "Theory week — the patterns Pune banking and product teams actually use. Decomposition by business capability, the BFF (backend-for-frontend) pattern, API gateway responsibilities, service-to-service communication choices (REST vs gRPC vs async messaging), the Saga pattern for distributed transactions, the Outbox pattern for reliable event publication, and circuit-breaking with Resilience4j. We cover these as design-discussion topics because Pune senior Spring Boot interviews always have a 'design a microservices system for X' round.",
      topics: [
        "Service decomposition by business capability",
        "API gateway and BFF patterns",
        "REST vs gRPC vs async messaging",
        "Saga pattern for distributed transactions",
        "Outbox pattern for reliable events",
        "Circuit breaker, retry, bulkhead (Resilience4j)",
        "Service discovery — Eureka vs Kubernetes-native",
      ],
    },
    {
      title: "Spring Cloud — Gateway, Discovery, Config",
      weekRange: "Week 6",
      description:
        "The Spring Cloud subsystems that wire microservices together. Spring Cloud Gateway for routing, rate limiting, and request transformation; Eureka or Kubernetes-native service discovery; Spring Cloud Config for centralised configuration (with Git backing); Resilience4j for the circuit-breaker patterns covered in week 5. Build a small 3-service system from scratch — user, catalog, order — in this module.",
      topics: [
        "Spring Cloud Gateway — routes, predicates, filters",
        "Rate limiting and request transformation",
        "Eureka service discovery",
        "Spring Cloud Config (Git-backed)",
        "Resilience4j — circuit breaker, retry, bulkhead, time limiter",
      ],
    },
    {
      title: "Async Messaging — Kafka & RabbitMQ",
      weekRange: "Week 7",
      description:
        "Async messaging is half of every real microservices system. Apache Kafka for event-streaming and event-sourced architectures; RabbitMQ for traditional async messaging. Cover producer / consumer patterns, partitioning and ordering guarantees in Kafka, dead-letter queues, exactly-once vs at-least-once delivery, and the Outbox pattern with Spring Data + transactional message publication. Pune banking and fintech teams rely on these patterns daily.",
      topics: [
        "Kafka — topics, partitions, consumer groups",
        "Spring Kafka producer and consumer",
        "RabbitMQ — exchanges, queues, bindings",
        "Spring AMQP",
        "Dead-letter queues and retry topics",
        "Outbox pattern with Spring Data",
        "Exactly-once vs at-least-once delivery",
      ],
    },
    {
      title: "Observability — Micrometer & OpenTelemetry",
      weekRange: "Week 8",
      description:
        "Observability is now first-class in Spring Boot 4 via the new `spring-boot-starter-opentelemetry`. Cover the three pillars — metrics (Micrometer + Prometheus), distributed tracing (OTel), and structured logging (SLF4J + Logback with JSON encoder). Wire your microservices to a free-tier observability stack (Grafana Cloud or Honeycomb) and demonstrate end-to-end tracing across the gateway, three services, and the message bus. This module alone differentiates you from 90% of Pune Spring Boot candidates.",
      topics: [
        "Micrometer for application metrics",
        "Prometheus scraping",
        "OpenTelemetry distributed tracing",
        "spring-boot-starter-opentelemetry (Spring Boot 4)",
        "Structured JSON logging",
        "Grafana Cloud or Honeycomb integration",
        "End-to-end trace across multiple services",
      ],
    },
    {
      title: "Containerisation & Kubernetes",
      weekRange: "Week 9",
      description:
        "Containerise each Spring Boot service with Docker (multi-stage builds for size optimisation), run via Docker Compose locally, then deploy to Kubernetes — Minikube locally, AKS or EKS for the optional cloud-deployment exercise. Cover Kubernetes basics (pods, services, deployments, ConfigMaps, Secrets) and the Spring Boot–Kubernetes integration (`spring-cloud-starter-kubernetes` for service discovery without Eureka).",
      topics: [
        "Docker multi-stage builds",
        "Docker Compose for local microservices",
        "Kubernetes — pods, services, deployments",
        "ConfigMaps and Secrets",
        "Health probes — liveness and readiness",
        "spring-cloud-starter-kubernetes",
        "Helm charts (introduction)",
      ],
    },
    {
      title: "GraalVM Native Images & Performance Tuning",
      weekRange: "Week 10",
      description:
        "GraalVM native-image AOT compilation cuts cold-start from seconds to milliseconds, making Spring Boot competitive with Go and Rust for serverless and cold-start-sensitive paths. Pune fintech and edge-computing teams ship native binaries to production. Cover Spring Native, the trade-offs (build time, reflection limits, configuration hints), and JVM tuning for non-native deployments — heap sizing, GC tuning, ZGC for sub-millisecond pauses.",
      topics: [
        "GraalVM and native-image basics",
        "Spring Native + ahead-of-time compilation",
        "Reflection hints for native images",
        "Build-time vs run-time configuration",
        "JVM tuning — heap, GC, ZGC",
        "Container memory tuning",
      ],
    },
    {
      title: "Capstone & Interview Preparation",
      weekRange: "Weeks 11–12",
      description:
        "Two weeks of full-time capstone project (microservices system end-to-end on a public Kubernetes cluster) plus interview prep. Mock technical interviews with Pune company question banks (Bajaj Finserv, Cognizant, Synechron, BMC, Citibank Pune). System design rounds — 'design a microservices architecture for an e-commerce / banking / SaaS system' — are now standard at the senior Pune Spring Boot interview level.",
      topics: [
        "Capstone — full microservices system, deployed",
        "Code review with the lead trainer",
        "System design mock interviews",
        "Technical mock interviews — Spring Boot, microservices patterns, Java",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
    {
      title: "AI-Assisted Development Workflow",
      weekRange: "Week 13",
      highlight: true,
      description:
        "The skill every Pune 2026 backend hiring panel now probes for — building Spring Boot services with AI in the loop, responsibly. Learn to drive AI coding assistants (GitHub Copilot, Claude Code, Cursor, JetBrains AI Assistant) to scaffold controllers, services, DTOs, and JPA entities, generate JUnit 5 + Mockito + Testcontainers tests, and modernise legacy Spring code — while keeping the engineer firmly in control. Heavy focus on guardrails: reviewing every AI suggestion, spotting hallucinated APIs, and handling licensing and data-privacy concerns. Close with a mini-project that takes a Spring Boot microservice end-to-end using an AI-assisted workflow, then integrate the same tooling into pull requests and CI/CD.",
      topics: [
        "AI coding assistants for Java/Spring — Copilot, Claude Code, Cursor, JetBrains AI",
        "Effective prompting for backend code — controllers, services, DTOs, JPA entities",
        "AI-assisted test generation — JUnit 5, Mockito, Testcontainers",
        "Explaining, refactoring, and modernising legacy Spring code with AI",
        "AI-driven code review, bug detection, and security scanning",
        "Generating docs — Javadoc, OpenAPI specs, README files",
        "AI debugging — interpreting stack traces, logs, and failing tests",
        "Guardrails — reviewing output, avoiding hallucinated APIs, licensing & data privacy",
        "Team workflow — AI in the IDE, in pull requests, and in CI/CD",
        "Mini-project — a Spring Boot microservice built end-to-end with an AI-assisted workflow",
      ],
    },
  ],

  projects: [
    {
      title: "Production-Grade Microservices System on Kubernetes",
      description:
        "Build a 4-service microservices system (user, catalog, order, payment) communicating via REST and Kafka. Spring Cloud Gateway for routing, Eureka or Kubernetes-native service discovery, Resilience4j circuit breakers, Micrometer + OpenTelemetry observability, Spring Security 6 + JWT for auth. Containerised with Docker, deployed to a Kubernetes cluster (Minikube locally, optional EKS / AKS for cloud deployment). Includes one full Saga implementation for distributed transactions and one Outbox-pattern event publication.",
      technologies: [
        "Spring Boot 3.5 / 4.0",
        "Java 21 LTS",
        "Spring Cloud Gateway",
        "Spring Security 6 + JWT",
        "Apache Kafka",
        "Resilience4j",
        "Micrometer + OpenTelemetry",
        "PostgreSQL",
        "Docker, Docker Compose",
        "Kubernetes (Minikube / EKS / AKS)",
      ],
    },
    {
      title: "Cold-Start-Optimised Serverless Microservices",
      description:
        "Build a smaller microservices system optimised for serverless or cold-start-sensitive deployment using GraalVM native images. Two services compiled to native binaries, deployed to AWS Lambda (with Lambda SnapStart for JVM comparison) or Cloud Run. Demonstrate the cold-start difference, the build-time vs run-time trade-offs, and the reflection-hint configuration. Includes the JVM-tuning side — same services running on JVM with ZGC for comparison.",
      technologies: [
        "Spring Boot 3.5 / 4.0",
        "GraalVM native-image",
        "Spring Native + AOT",
        "Java 21 LTS",
        "AWS Lambda or Google Cloud Run",
        "Spring Cloud",
      ],
    },
    {
      title: "Event-Driven Banking-Style System",
      description:
        "A small banking-domain capstone — accounts, transactions, fraud-detection — with strict consistency requirements. Use the Outbox pattern with PostgreSQL and Kafka for reliable event publication, Saga pattern for cross-service transactions (transfer between accounts), and Spring Security with role-based access. Demonstrates the patterns Pune BFSI teams (Bajaj Finserv, Citibank, Barclays) interview on every round.",
      technologies: [
        "Spring Boot 3.5",
        "Apache Kafka",
        "PostgreSQL with Outbox pattern",
        "Spring Security 6",
        "Saga pattern implementation",
        "Resilience4j",
        "Docker + Kubernetes",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Ankita Hartale (Java Full Stack Trainer with deep Spring Framework expertise, currently at Wipro) and Yogesh Patil (Founder & Director, 15+ years enterprise Java and cloud architecture). Both write and review production Spring Boot code regularly and personally lead the architecture, security, and microservices weeks.",

  careerOutcomes: {
    paragraphs: [
      "Spring Boot + Microservices is one of the most premium-paying backend specialisations in Pune. Foundit reports 409 active Pune Spring Boot Microservices roles in May 2026, concentrated in BFSI (Bajaj Finserv, Citibank Pune, Barclays Pune, Deutsche Bank, JPMC, HSBC, Bank of America), product engineering (Synechron, Persistent, BMC, Atlassian Pune, Veritas), and IT services (Cognizant, TCS, Infosys).",
      "Pune-specific Indeed page for 'Spring Boot Developer' redirects to the generic Developer salary; we triangulate via Indeed's Java Developer Pune (₹8.32L overall, ₹9.95L senior, ₹23.19L lead) plus Glassdoor Pune Spring Boot data — Pune Spring Boot averages ₹5 lakh per year, with the 90th percentile at ₹10.69 lakh. Senior Spring Boot Microservices engineers in Pune BFSI / fintech reach ₹15–25 lakh per year.",
      "What pulls a Spring Boot engineer above the average band: a deployed microservices project on Kubernetes (not just Docker Compose), demonstrable observability (Micrometer + OTel), and one production-shaped pattern — Saga, Outbox, or GraalVM native. Our capstones are designed exactly around these signals.",
    ],
    salaryBands: [
      {
        role: "Junior Spring Boot Developer (Pune)",
        band: "~₹4,00,000 per year (25th percentile)",
        source: {
          label: "Glassdoor Pune Spring Boot",
          url: "https://www.glassdoor.co.in/Job/pune-spring-boot-developer-jobs-SRCH_IL.0,4_IC2856202_KO5,26.htm",
        },
      },
      {
        role: "Java Spring Boot Developer Pune (overall)",
        band: "₹5,00,000 per year average",
        source: {
          label: "Glassdoor Pune (April 2026)",
          url: "https://www.glassdoor.co.in/Job/pune-spring-boot-developer-jobs-SRCH_IL.0,4_IC2856202_KO5,26.htm",
        },
      },
      {
        role: "90th-percentile Spring Boot Pune",
        band: "₹10,69,000 per year",
        source: {
          label: "Glassdoor Pune",
          url: "https://www.glassdoor.co.in/Job/pune-spring-boot-developer-jobs-SRCH_IL.0,4_IC2856202_KO5,26.htm",
        },
      },
      {
        role: "Senior Java Developer (Pune Spring Boot proxy)",
        band: "₹9,95,292 per year",
        source: {
          label: "Indeed Pune Senior Java Developer (n=19)",
          url: "https://in.indeed.com/career/senior-java-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Lead Java Software Engineer (Pune microservices proxy)",
        band: "₹23,19,145 per year",
        source: {
          label: "Indeed Pune",
          url: "https://in.indeed.com/career/java-developer/salaries/Pune--Maharashtra",
        },
      },
    ],
    hiringCompanies: [
      "Bajaj Finserv",
      "Citibank Pune",
      "Barclays Pune",
      "Deutsche Bank Pune",
      "JPMorgan Chase Pune",
      "HSBC Pune",
      "Bank of America Pune",
      "Cognizant",
      "TCS",
      "Infosys",
      "LTIMindtree",
      "Capgemini",
      "Wipro",
      "Synechron Hinjawadi",
      "Persistent Systems",
      "BMC Software",
      "Atlassian Pune",
      "Veritas",
      "Volkswagen IT Services",
      "Mercedes-Benz R&D India",
    ],
    rolesAfterCourse: [
      "Spring Boot Developer",
      "Microservices Engineer",
      "Backend Engineer (Java)",
      "Senior Java Developer",
      "Software Engineer at BFSI",
      "Cloud-Native Application Developer",
      "Platform Engineer (with infra adjacency)",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks Java refresher through capstone) plus optional placement-prep extension",
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
      "Maximum 12 students per batch (smaller than other tracks because the architecture and design-discussion segments need real conversation). Classroom batches start every 5 weeks; weekend batches every 6–7 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep, the GraalVM native-image module, and one real cloud (AWS / Azure) deployment exercise; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9 of the course. By the time you finish the curriculum, your resume is ready, your GitHub has a deployed microservices project, and you have completed at least three mock technical interviews including one full system-design round — the round that screens senior Pune Spring Boot candidates every time.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 9 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 10 — GitHub portfolio cleanup, public READMEs, deployed microservices URL",
      "Week 11 — DSA quick refresher targeting Pune BFSI screening patterns",
      "Weeks 11–12 — three rounds of mock technical interviews including one system-design round",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at BFSI and product partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Bajaj Finserv",
      "Cognizant",
      "Synechron Hinjawadi",
      "Persistent Systems",
      "BMC Software",
      "Capgemini",
      "LTIMindtree",
      "Wipro",
      "Atlassian Pune",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Spring Boot training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Ankita Hartale and Yogesh Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Spring Boot version covered",
        archer: "Spring Boot 3.5 and 4.0 (current production targets after 3.4 EOL)",
        typical: "Spring Boot 2.x or generic 'Spring' coverage",
      },
      {
        feature: "Java version",
        archer: "Java 21 LTS baseline plus Java 25 features",
        typical: "Java 8 or Java 11",
      },
      {
        feature: "Virtual threads coverage",
        archer: "Yes — when to enable, when not to, with worked examples",
        typical: "Not covered or marketing mention only",
      },
      {
        feature: "GraalVM native image",
        archer: "Yes — full module on Spring Native and AOT",
        typical: "Not covered",
      },
      {
        feature: "Observability — Micrometer + OpenTelemetry",
        archer: "Full week with Spring Boot 4 spring-boot-starter-opentelemetry",
        typical: "Brief mention or skipped",
      },
      {
        feature: "Real Kubernetes deployment",
        archer: "Yes — Minikube minimum, optional EKS/AKS",
        typical: "Docker Compose at most",
      },
      {
        feature: "System design mock interview round",
        archer: "Included — the round that screens Pune senior candidates",
        typical: "Not offered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed microservices URL per student",
        typical: "Rare",
      },
      {
        feature: "Salary data with sources",
        archer: "Glassdoor Pune + Indeed Pune Senior Java with URLs",
        typical: "Single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹20,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind enquiry form",
      },
      {
        feature: "Batch size cap",
        archer: "12 students (smaller for design discussions)",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual deployed student work and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "Spring Boot vs Plain Spring — What Enterprise Pune Teams Actually Use",
    paragraphs: [
      "Plain Spring (the original Spring Framework) is XML-config or Java-config heavy and is rarely the starting point in 2026 Pune teams; it is the engine, but not the car. Spring Boot is plain Spring plus auto-configuration, embedded Tomcat / Jetty / Netty, and opinionated defaults — every active Pune banking, fintech, and product job description in 2026 says 'Spring Boot,' not 'Spring.'",
      "In 2026 the actual production stack is Spring Boot 3.5 / 4.0 + Spring Cloud + Spring Security 6 + Micrometer + OpenTelemetry, on Java 21 / 25 LTS, often with virtual threads enabled and increasingly with GraalVM native compilation for cold-start-sensitive paths. Spring Cloud Gateway for routing, Resilience4j for circuit breaking, Apache Kafka for async messaging, Kubernetes for orchestration.",
      "Honest answer: learn Spring Boot directly. You will absorb plain Spring concepts (DI, AOP, beans, profiles) along the way because Spring Boot uses all of them under the hood. Don't waste 4 weeks on standalone Spring XML config — that is last decade's curriculum and serves no 2026 Pune hiring.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are real for this course — you must already know Java at a working level (collections, generics, streams, Lambdas, exceptions, basic OOP). If you are not yet comfortable with these, kindly join our Java Training course first; the Spring Boot course will outpace you otherwise. The Java refresher in week 1 of this course is a refresher, not a from-scratch Java module.",
    ],
    suggestedSteps: [
      "Self-assess your Java fluency — can you read a Spring Boot controller's domain code without lookup? If no, do Java Training first",
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits you (we say no to roughly 15% of enquirers for this course)",
      "Confirm enrolment and complete pre-course orientation",
    ],
  },

  faqs: [
    {
      question: "What is the Spring Boot developer salary in Pune?",
      answer:
        "Glassdoor Pune reports ₹5 lakh per year average for Spring Boot Developer (April 2026), with 90th percentile at ₹10.69 lakh. Indeed Pune Senior Java Developer (Spring Boot proxy) averages ₹9.95 lakh; Lead Java Software Engineer averages ₹23.19 lakh. Senior Spring Boot Microservices engineers in Pune BFSI / fintech reach ₹15–25 lakh.",
    },
    {
      question: "Is Spring Boot in demand in 2026?",
      answer:
        "Yes — overwhelmingly. Foundit reports 409 active Pune Spring Boot Microservices roles as of May 2026. Bajaj Finserv, Citibank Pune, Barclays Pune, Cognizant, Synechron Hinjawadi, BMC Software, and most Pune BFSI / fintech / product teams hire Spring Boot continuously.",
    },
    {
      question: "Spring Boot vs plain Spring — what's the difference?",
      answer:
        "Spring is the framework (DI, AOP, beans). Spring Boot is Spring plus auto-configuration, embedded server, and opinionated defaults — what every active Pune 2026 job description actually requires. Learn Spring Boot directly; you absorb plain Spring concepts along the way. Don't waste time on standalone Spring XML config — that's last decade's curriculum.",
    },
    {
      question: "Do I need Java before learning Spring Boot?",
      answer:
        "Yes — Spring Boot expects Java fluency (collections, generics, streams, Lambdas, exceptions, basic OOP). If you are not yet comfortable with these, kindly do our Java Training course first. The Java refresher in week 1 of this Spring Boot course is a refresher, not a from-scratch Java module.",
    },
    {
      question: "How long does it take to learn Spring Boot and Microservices?",
      answer:
        "Three months — 12 weeks of structured curriculum from Java refresher through capstone. Weekend batches stretch over 5 months at the same content depth, designed for working professionals. Strong Java background means you absorb faster but won't skip weeks.",
    },
    {
      question: "Which Pune companies hire Spring Boot developers?",
      answer:
        "BFSI: Bajaj Finserv, Citibank Pune, Barclays Pune, Deutsche Bank, JPMC, HSBC, Bank of America. IT services: Cognizant, TCS, Infosys, LTIMindtree, Capgemini, Wipro. Product engineering: Synechron Hinjawadi, Persistent Systems, BMC Software, Atlassian Pune, Veritas. Foundit's Pune microservices feed shows 409 active roles in May 2026.",
    },
    {
      question: "What is the fee for Spring Boot training in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep, the GraalVM native-image module, and one real cloud deployment; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Is Spring Boot required for microservices, or are alternatives okay?",
      answer:
        "Spring Boot is the dominant Java microservices framework in Pune (and globally). Quarkus and Micronaut are alternatives with stronger native-image support but appear in less than 5% of Pune JDs. Learn Spring Boot first; the patterns transfer. Pune hiring is overwhelmingly Spring-first.",
    },
    {
      question: "Will I deploy a real microservices system?",
      answer:
        "Yes — your capstone is a 4-service microservices system on Kubernetes (Minikube minimum, optional EKS / AKS for the cloud-deployment exercise) with Spring Cloud Gateway, Kafka async messaging, Resilience4j circuit breakers, and full Micrometer + OpenTelemetry observability. The deployed URL goes on your GitHub README.",
    },
    {
      question: "Are virtual threads really useful in 2026 Pune interviews?",
      answer:
        "Yes — virtual threads (Java 21 + Spring Boot 3.2+) are now standard topic in Pune senior Spring Boot interviews. The one-line `spring.threads.virtual.enabled=true` switch and when to enable it are routinely tested at Synechron, Bajaj Finserv, BMC Software, and Citibank Pune interviews in 2026.",
    },
    {
      question: "Do you cover GraalVM native images?",
      answer:
        "Yes — full week on GraalVM native-image AOT compilation, Spring Native, reflection hints, and the build-time vs run-time trade-offs. Pune fintech and edge / serverless teams ship native binaries to production. Capstone option 2 is an explicitly cold-start-optimised serverless microservices system.",
    },
    {
      question: "Are weekend Spring Boot classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews including one full system-design round (the round that screens senior Pune Spring Boot candidates), referrals via our alumni network at BFSI and product partner companies, resume and LinkedIn rewrites, and salary negotiation coaching. Free re-entry to future batch interview prep if first round does not land.",
    },
    {
      question: "Is system design covered for senior Pune interviews?",
      answer:
        "Yes — Week 5 covers microservices architecture and patterns as design-discussion topics, and the placement-prep weeks include explicit system-design mock rounds. Pune senior Spring Boot interviews always have a 'design a microservices system for X' round; we prepare you for it specifically.",
    },
    {
      question: "Are the named trainers actually teaching, or just on the brochure?",
      answer:
        "Yogesh Patil personally leads the architecture, security, and microservices weeks (his enterprise-Java + cloud-architecture background fits these directly). Ankita Hartale leads Spring Framework, Spring Boot REST APIs, JPA, and the database modules. The same names you see on this page are the same people you meet on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Spring Boot & Microservices training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 5–7 weeks. Reach out via the enquiry form or call us — Yogesh or Ankita are happy to spend 30 minutes telling you whether the course is right for you and assessing your Java readiness. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
