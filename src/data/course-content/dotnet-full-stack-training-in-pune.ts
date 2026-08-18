import type { CourseRichContent } from "./types";

export const dotnetFullStackTrainingInPune: CourseRichContent = {
  intro:
    ".NET is the dominant enterprise stack in Pune captives, BFSI, and Microsoft-ecosystem product engineering — Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv (significant .NET footprint alongside Java), Synechron, plus Microsoft's own Pune R&D center all run substantial .NET workloads. Archer Infotech's .NET Full Stack training in Pune teaches the stack as it is actually used in 2026 — .NET 9 with C# 13, ASP.NET Core MVC and Web API, Entity Framework Core 9 against SQL Server, Blazor United for full-stack-on-.NET teams, Angular or React on the frontend (the dominant Pune choices), Azure deployment via App Service / Container Apps / AKS, plus Microservices patterns, Identity Server / Duende / Entra ID, Redis caching, and the testing + CI/CD discipline Pune enterprise teams expect. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn .NET Full Stack in 2026",
    paragraphs: [
      ".NET has rebuilt itself completely over the last six years, from Windows-only legacy framework to cross-platform performance-leading runtime. Indeed Pune lists more than 1,100 active .NET / C# / ASP.NET Core roles as of May 2026. The biggest employers are Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Synechron, plus Microsoft's Pune teams (now substantially larger after recent expansions), Capgemini, TCS, Infosys, and many BFSI / manufacturing captives. Pune .NET compensation tracks Java closely at every experience band — when local hiring panels say 'enterprise backend' they typically mean Java OR .NET, depending on which stack the company already runs.",
      "What changed in 2026: .NET 9 is the production default (Nov 2024 release; .NET 10 LTS due Nov 2025) — annual release cadence stable, performance gains substantial, Native AOT mature for command-line tools and small services. C# 13 ships params collections and partial members. ASP.NET Core's Minimal APIs are now the default for new microservices. Entity Framework Core 9 brings major performance and JSON-column improvements. Blazor United (server + WebAssembly + auto interactivity) eliminated the awkward Server-vs-WebAssembly choice and is gaining adoption for internal-tool work. Identity Server is now Duende (commercial) for production, with OpenIddict as the open-source alternative.",
      "What this means for hiring: 2026 Pune .NET Full Stack JDs expect .NET 8 or 9 (most teams have migrated from .NET Framework / .NET Core 3.1), C# fluency at the modern-syntax level, ASP.NET Core Web API or Minimal APIs, Entity Framework Core, SQL Server depth, one frontend framework at depth (Angular or React — the two dominant Pune choices), Azure or AWS deployment, and one observability story. Senior roles add microservices, Identity / OAuth depth, Azure DevOps or GitHub Actions, and SQL performance tuning. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern .NET, no .NET Framework legacy, deployment-ready.",
    ],
    keyPoints: [
      "1,100+ active .NET / C# / ASP.NET Core roles on Indeed Pune (May 2026)",
      ".NET 9 / C# 13 — performance leading, cross-platform, modern syntax",
      "Mercedes-Benz / Cummins / John Deere / Honeywell — Pune captive .NET strongholds",
      "Compensation tracks Java backend closely; BFSI .NET pays a small premium",
      "Pairs with Angular or React frontend — both Pune defaults for .NET full-stack roles",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting .NET Full Stack / C# Developer roles in Pune",
      "Working .NET Framework (4.x) developer wanting to migrate to .NET 8 / 9",
      "Working backend developer in another stack wanting to add .NET for the Pune captive / BFSI market",
      "Frontend developer wanting to add a strong typed backend stack for full-stack roles",
      "Working professional targeting Pune captive R&D centres (Mercedes-Benz, Cummins, John Deere, Honeywell) where .NET is dominant",
      "Career restarter targeting enterprise full-stack as a stable re-entry path",
    ],
    notForYou: [
      "If you cannot commit six months — the sequence runs from programming fundamentals to AI integration and does not compress well",
      "If you cannot put in 10–12 hours per week of practice outside class — full-stack is the most lab-heavy of the major tracks",
      "If you only want a certificate sticker with no portfolio — Pune enterprise hiring screens hard on real PRs and deployed apps",
      "If your goal is specifically Pune SaaS / fintech startups — those skew Node.js or Python far more than .NET; pick MERN or Python Full Stack",
      "If you have 4+ years of production ASP.NET Core + Angular / React experience — you'll be under-stretched; talk to us about advanced microservices / Azure architecture specialisations",
    ],
  },

  /**
   * Curriculum restructured 2026-08-18 to follow the .NET + AI Roadmap 2026
   * progression (Levels 1–16), matching the treatment already applied to the
   * Java Full Stack course.
   *
   * Unlike the Java roadmap, this one CARRIES ITS OWN FRONTEND (Level 10,
   * "Full Stack, Testing and Dev Tools"), so nothing had to be added. Level 10
   * is split here into a three-week frontend module and a one-week testing
   * module, because bundling a first encounter with a frontend framework into
   * the same week as xUnit and Playwright is how students end up weak at both.
   *
   * FRONTEND ORDER. The roadmap lists React under "frontend option". This
   * course keeps ANGULAR primary with React as the opt-in alternative — the
   * inverse of the Java Full Stack course — because Angular is the dominant
   * frontend in Pune enterprise and BFSI .NET teams, and because every other
   * claim on this page already says so: the comparison table ("Angular 19
   * (primary) + React parallel path"), the capstone projects (Angular 19 +
   * NgRx) and the FAQs. Flipping the modules to match the roadmap literally
   * would have left the page contradicting itself in four places.
   *
   * Two AI levels are merged: L14 (Embeddings, RAG, Agents) and L15 (AI
   * Security and Evaluation) run as one module, since evaluation and
   * injection-handling are taught against the RAG pipeline you just built
   * rather than in the abstract.
   *
   * Per roadmap §5, ASP.NET Web Forms, .NET Framework-first development and
   * legacy MVC patterns are not core content.
   *
   * DURATION. courses.ts published "6 Months" while this file said "13 weeks
   * plus 2 weeks (~3.5 months total)" and then explained the gap away as "the
   * original 6-month listing reflects the optional extended evening format".
   * A course page cannot state two durations and expect either to be
   * believed. Six months is the published figure and the one used here: 24
   * taught weeks plus 2 weeks of capstone and interview preparation, 26 in
   * total.
   */
  curriculum: [
    {
      title: "Programming Fundamentals",
      weekRange: "Week 1",
      description:
        "Before any C# syntax, the thinking. What an algorithm is, how to decompose a problem, how memory holds a value, and how to read your own code back when it misbehaves. Flowcharts, variables, data types, operators, conditions, loops, functions and input/output, then debugging taught as a method rather than picked up by accident. Closes with a first look at data structures and at time and space complexity, so \"is this fast enough?\" has a real answer rather than a shrug.",
      topics: [
        "Algorithms and flowcharts",
        "Variables, data types, operators",
        "Conditions, loops, functions",
        "Input/output and program structure",
        "Debugging as a method",
        "Core data structures",
        "Time and space complexity",
        "Practice builds — calculator, ATM, billing, banking",
      ],
    },
    {
      title: ".NET Platform and Tooling",
      weekRange: "Week 2",
      description:
        "What actually happens between the .cs file you write and the process that runs. The .NET SDK against the runtime, the CLR, C# compiled to IL and then JIT-compiled, assemblies, and NuGet as the dependency system you will live inside. Then the CLI properly — dotnet new, build, run, test and publish — because every CI pipeline you meet later is those five commands in a YAML file, and students who only ever pressed F5 in Visual Studio are the ones who cannot debug a failing build.",
      topics: [
        ".NET SDK vs .NET Runtime",
        "CLR, IL and JIT compilation",
        "Assemblies and project structure",
        "NuGet package management",
        "dotnet CLI — new, build, run, test, publish",
        "Solution and project layout conventions",
        "Visual Studio and VS Code workflows",
      ],
    },
    {
      title: "C# Fundamentals and OOP",
      weekRange: "Weeks 3–4",
      description:
        "The language, then object orientation done properly. Value against reference types, nullable types, conversion, methods, optional and named parameters, and the ref/out/in/params modifiers that appear in every interview and half of all confused code. Then classes, constructors, fields against properties, access modifiers, encapsulation, inheritance, polymorphism, abstraction and interfaces — followed by the part most courses skip: composition, association and aggregation, and when to reach for each instead of inheriting.",
      topics: [
        "Value vs reference types, nullable types, conversion",
        "Methods, optional and named parameters",
        "ref, out, in and params",
        "Classes, objects, constructors",
        "Fields vs properties, access modifiers",
        "Encapsulation, inheritance, polymorphism, abstraction",
        "Interfaces and interface-based design",
        "Composition, association, aggregation",
      ],
    },
    {
      title: "Modern C#",
      weekRange: "Week 5",
      description:
        "Everything C# has added since the version most tutorials still teach. Delegates, Action, Func and Predicate, lambda expressions, events and extension methods, then the modern surface: records, init and required members, nullable reference types, pattern matching, tuples, primary constructors, collection expressions, file-scoped namespaces and global usings. This is the module that decides whether your code reads like 2026 or like 2014 — and reviewers notice within about thirty seconds.",
      topics: [
        "Delegates, Action, Func, Predicate",
        "Lambda expressions and events",
        "Extension methods",
        "Records, init and required members",
        "Nullable reference types",
        "Pattern matching and tuples",
        "Primary constructors and collection expressions",
        "File-scoped namespaces and global usings",
      ],
    },
    {
      title: "Collections, Generics and LINQ",
      weekRange: "Week 6",
      description:
        "The three APIs you will touch every working day. Arrays, List, Dictionary, HashSet, Queue and Stack, plus the interfaces behind them — IEnumerable, ICollection, IList and the read-only variants — and, the part interviews actually probe, when to reach for each. Generics with constraints, covariance and contravariance. Then LINQ in full, ending on the two things that separate confident users from cargo-cult ones: deferred execution, and the difference between IEnumerable and IQueryable when a database is on the other end.",
      topics: [
        "Arrays, List, Dictionary, HashSet, Queue, Stack",
        "IEnumerable, ICollection, IList, read-only collections",
        "Generic classes and methods, constraints",
        "Covariance and contravariance",
        "LINQ — Where, Select, SelectMany, GroupBy, Join",
        "Ordering, aggregation, Skip/Take, Distinct",
        "Deferred execution",
        "IEnumerable vs IQueryable and why it matters",
      ],
    },
    {
      title: "Exceptions, Runtime and Async",
      weekRange: "Week 7",
      description:
        "How .NET manages memory, and how not to block it. Exceptions and custom exception types, propagation, then the runtime — stack against heap, garbage collection and its generations, IDisposable and using, IAsyncDisposable, resource lifetime, and how memory leaks still happen in a garbage-collected language. Then async: Task and Task-of-T, async/await, CancellationToken, WhenAll and WhenAny, the thread pool, locks, concurrent collections, Channels, background services and async streams with IAsyncEnumerable.",
      topics: [
        "Exceptions, custom exceptions, propagation",
        "Stack vs heap, garbage collection and GC generations",
        "IDisposable, using, IAsyncDisposable, resource lifetime",
        "Memory leaks in a managed runtime",
        "Task, async/await, CancellationToken",
        "Task.WhenAll and Task.WhenAny",
        "ThreadPool, locks, concurrent collections",
        "Channels, background services, IAsyncEnumerable",
      ],
    },
    {
      title: "SQL and Data Access",
      weekRange: "Weeks 8–9",
      description:
        "SQL taken seriously, then two ways of reaching it. The full query vocabulary through JOINs, GROUP BY, HAVING, subqueries, CTEs and window functions, then views, indexes, transactions, ACID, isolation levels, locking and query optimisation. ADO.NET next — Connection, Command, DataReader, parameters, transactions, connection pooling and parameterised queries as the actual defence against SQL injection. Then EF Core: DbContext, entities, relationships, migrations, tracking against no-tracking, loading strategies and concurrency handling.",
      topics: [
        "SELECT, JOIN, GROUP BY, HAVING, subqueries",
        "CTEs, window functions, views",
        "Indexes, transactions, ACID, isolation, locking",
        "Query optimisation",
        "ADO.NET — Connection, Command, DataReader, parameters",
        "Connection pooling and SQL-injection prevention",
        "EF Core — DbContext, entities, relationships, migrations",
        "Tracking vs no-tracking, loading strategies, concurrency",
      ],
    },
    {
      title: "Dependency Injection and ASP.NET Core",
      weekRange: "Weeks 10–11",
      description:
        "Inversion of control first, so the framework is explicable rather than magical. Service registration and the three lifetimes — singleton, scoped and transient — plus what actually goes wrong when you inject a scoped service into a singleton, which is a favourite interview question because it is a real production bug. Then ASP.NET Core itself: the middleware pipeline, routing, configuration and environments, logging, the options pattern, the application lifecycle, and both Minimal APIs and controllers with an honest view of when each fits.",
      topics: [
        "Inversion of control and dependency injection",
        "Service registration and resolution",
        "Singleton, scoped and transient lifetimes",
        "Captive-dependency bugs and how to spot them",
        "Middleware pipeline and routing",
        "Configuration, environments and the options pattern",
        "Logging and application lifecycle",
        "Minimal APIs vs controllers",
      ],
    },
    {
      title: "REST APIs and Security",
      weekRange: "Weeks 12–13",
      description:
        "Build the API the rest of the course consumes, then secure it properly. HTTP methods, status codes, headers and JSON, then REST principles, DTOs, validation, pagination, filtering, sorting and versioning. Security in the same breath because bolting it on later is how vulnerabilities ship: authentication against authorisation, ASP.NET Core Identity, password hashing, roles, claims and policies, JWT with refresh tokens, OAuth 2.0 and OpenID Connect, CORS, CSRF and security headers — the filter pipeline understood rather than copied from a blog post that worked.",
      topics: [
        "HTTP methods, status codes, headers, JSON",
        "REST principles, DTOs, validation",
        "Pagination, filtering, sorting, API versioning",
        "Authentication vs authorisation",
        "ASP.NET Core Identity and password hashing",
        "Roles, claims and policy-based authorisation",
        "JWT and refresh tokens",
        "OAuth 2.0 and OpenID Connect",
        "CORS, CSRF and security headers",
      ],
    },
    {
      title: "Frontend — Angular 19 + TypeScript",
      weekRange: "Weeks 14–16",
      description:
        "The full-stack half, placed here deliberately: you now have a real secured API to build against rather than a mock. HTML, CSS and JavaScript brought to a working level, then TypeScript, then Angular 19 — components, services, RxJS, dependency injection, routing and lazy loading, template-driven and reactive forms, HttpClient with a JWT interceptor and route guards, and NgRx for global state. Angular leads on this course because it is the dominant frontend in Pune enterprise and BFSI .NET teams, which is where most .NET hiring here happens. You build the frontend half of your capstone in this module rather than treating it as a demo.",
      topics: [
        "HTML, CSS and modern JavaScript",
        "TypeScript essentials",
        "Angular 19 — components, services, modules",
        "RxJS — Observables, operators, async pipe",
        "Dependency injection, routing and lazy loading",
        "Template-driven and reactive forms",
        "HttpClient, JWT interceptors and route guards",
        "NgRx for global state",
        "Blazor United primer — the .NET-native full-stack option",
      ],
    },
    {
      title: "React Track (opt-in alternative to Angular)",
      weekRange: "Weeks 14–16 alternate",
      description:
        "For students targeting Pune product companies and startups, where React is the default rather than Angular, the same three weeks run as a React track. React 19 with TypeScript — components, props, state, hooks, forms, routing, API integration and the JWT auth flow — built against the same ASP.NET Core backend, with identical project deliverables. Choose on your target employers rather than on preference: Angular for enterprise .NET and BFSI teams, React for product and startup hiring.",
      topics: [
        "React 19 — components, props, state, hooks",
        "TypeScript with React",
        "Forms and validation",
        "Routing and navigation",
        "State management",
        "API integration with the ASP.NET Core backend",
        "JWT auth flow front-to-back",
      ],
    },
    {
      title: "Testing and Dev Tools",
      weekRange: "Week 17",
      description:
        "The gap that shows up fastest on a fresher resume. xUnit for unit tests with the NUnit differences covered, assertions, mocking, integration tests against a real database with Testcontainers rather than an in-memory substitute, REST testing with Postman, and Playwright for end-to-end. Alongside it the working practices: Git and GitHub, branching, pull requests, code review as something you both give and receive, and GitHub Actions. Your capstone ships with a test suite, because a repository without one reads as a tutorial follow-along.",
      topics: [
        "xUnit — structure, assertions, fixtures",
        "NUnit concepts and differences",
        "Mocking collaborators",
        "Integration testing with Testcontainers",
        "Postman and REST testing",
        "Playwright for end-to-end tests",
        "Git, GitHub, pull requests, code review",
        "GitHub Actions basics",
      ],
    },
    {
      title: "Production Engineering",
      weekRange: "Weeks 18–19",
      description:
        "The layer between \"it runs locally\" and a system that survives real traffic. Docker properly — Dockerfiles, images, containers, volumes, networks, Compose, environment variables and health checks. Redis for caching: cache-aside, TTL strategy, distributed caching, sessions, rate limiting and distributed locks. Messaging with RabbitMQ and Kafka — producers, consumers, topics, partitions, consumer groups, offsets, ordering and idempotency, the concept that decides whether a retry corrupts data. Closes with gRPC and Protocol Buffers for service-to-service calls.",
      topics: [
        "Docker — Dockerfile, images, volumes, networks, health checks",
        "Docker Compose and environment configuration",
        "Redis — cache-aside, TTL, distributed caching",
        "Sessions, rate limiting, distributed locks",
        "RabbitMQ and Kafka — producers, consumers, topics",
        "Partitions, consumer groups, offsets, ordering",
        "Idempotency and safe retries",
        "gRPC and Protocol Buffers",
      ],
    },
    {
      title: "Microservices, Azure and DevOps",
      weekRange: "Weeks 20–21",
      description:
        "Distributed systems the way Pune enterprise .NET teams actually build them — including the honest caveat that a modular monolith is often the better answer. Service boundaries, API Gateway, service discovery, REST and gRPC between services, resilience and circuit breakers, distributed transactions and the Saga pattern, event-driven architecture. Then Azure: App Service, Container Apps, Functions, Storage, Azure SQL and PostgreSQL, Key Vault, Service Bus, Container Registry and Entra ID. CI/CD with GitHub Actions, and observability through structured logging, metrics, tracing, health checks, OpenTelemetry and Application Insights.",
      topics: [
        "Service boundaries and the modular-monolith alternative",
        "API Gateway, service discovery, REST and gRPC",
        "Resilience, circuit breakers, retries",
        "Distributed transactions and the Saga pattern",
        "Azure App Service, Container Apps, Functions",
        "Azure SQL, PostgreSQL, Storage, Key Vault, Service Bus",
        "Entra ID and Container Registry",
        "GitHub Actions CI/CD, secrets and environments",
        "Observability — OpenTelemetry, Application Insights, Prometheus/Grafana concepts",
      ],
    },
    {
      title: "AI for .NET Developers",
      weekRange: "Week 22",
      highlight: true,
      description:
        "Building AI features in ASP.NET Core — a different skill from using an AI assistant to write code, and the one starting to separate candidates in 2026. Deliberately placed late, because the roadmap this follows is explicit that AI comes after solid engineering fundamentals. Start with LLM mechanics: tokens, context windows, prompts, system instructions, structured outputs, streaming, tool calling and model selection. Then the Microsoft AI stack specifically — Microsoft.Extensions.AI as the abstraction layer, Semantic Kernel, and Azure OpenAI. Then build the feature itself into a real API: chat with streaming, conversation history, structured output, tool calling, and the parts most tutorials skip — authentication, logging and rate limiting on an endpoint that costs money per call.",
      topics: [
        "LLM mechanics — tokens, context windows, prompts",
        "System instructions and structured outputs",
        "Streaming and function/tool calling",
        "Model selection and cost trade-offs",
        "Microsoft.Extensions.AI abstractions",
        "Semantic Kernel",
        "Azure OpenAI integration",
        "Chat, streaming and conversation history in ASP.NET Core",
        "Auth, logging and rate limiting on AI endpoints",
      ],
    },
    {
      title: "Embeddings, RAG, Agents and AI Safety",
      weekRange: "Week 23",
      highlight: true,
      description:
        "Grounding a model in your own data, then proving it worked. Embeddings and vector representation, cosine similarity and semantic search, with vector storage on PostgreSQL and pgvector or Azure AI Search. A full RAG pipeline built end to end: ingestion, parsing, chunking, embedding, retrieval, reranking, context construction, grounded answers and citations. Then tool calling against your own database, search, CRM and internal APIs, and agents with planning, memory, state, multi-step workflows and a human-in-the-loop step. Security and evaluation are taught here rather than separately, because prompt injection, tool authorisation, groundedness and token cost only mean anything against a pipeline you have actually built.",
      topics: [
        "Embeddings, cosine similarity, semantic search",
        "Vector storage — PostgreSQL + pgvector, Azure AI Search",
        "RAG — ingestion, parsing, chunking, retrieval, reranking",
        "Context construction, grounded answers, citations",
        "Tool calling — database, search, internal APIs",
        "Agents — planning, memory, state, multi-step workflows",
        "Human-in-the-loop approval",
        "AI security — prompt injection, data leakage, tool authorisation",
        "Evaluation — groundedness, hallucination, retrieval quality, cost",
      ],
    },
    {
      title: "Architecture and Design Principles",
      weekRange: "Week 24",
      description:
        "The vocabulary senior interviews are conducted in. SOLID, DRY and KISS applied to code you have already written rather than to toy examples, then layered, Clean and Hexagonal architecture, the modular monolith, microservices and event-driven architecture as choices with trade-offs instead of a hierarchy. CQRS concepts and the Saga pattern revisited now that you have built distributed services. Closes on the properties that decide production outcomes — scalability, fault tolerance and load balancing — and on being able to defend an architectural decision rather than name-drop one.",
      topics: [
        "SOLID, DRY, KISS in practice",
        "Layered, Clean and Hexagonal architecture",
        "Modular monolith vs microservices",
        "Event-driven architecture",
        "CQRS concepts",
        "Saga and distributed transactions revisited",
        "Scalability, fault tolerance, load balancing",
        "Defending an architectural decision in interview",
      ],
    },
    {
      title: "Capstone Project and Interview Preparation",
      weekRange: "Weeks 25–26 (plus placement prep from Week 12)",
      description:
        "Full-time capstone work plus placement preparation. Mock technical interviews against question banks from Pune .NET employers — Cybage, Persistent Systems, Amdocs, Capgemini, Synechron, BMC Software and the BFSI captives. A DSA refresher targeting the patterns that screen candidates out, resume and LinkedIn rewrites, GitHub portfolio cleanup, and HR mock interviews including salary negotiation. Your capstone ships as a deployed ASP.NET Core and React or Angular application with a test suite and at least one AI-backed feature.",
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
      weekRange: "Woven throughout — dedicated sessions in Weeks 5, 13 and 21",
      description:
        "Using AI to build faster without losing control of what you ship. This runs alongside the curriculum rather than at the end, because it is a working practice rather than a topic — the guiding principle of the roadmap this course follows is that AI should accelerate .NET development, never replace C# and software-engineering fundamentals. You drive GitHub Copilot, Claude, Cursor and IDE-native assistants to scaffold, generate tests, explain unfamiliar code and cut boilerplate, with heavy emphasis on guardrails: reviewing every suggestion, spotting hallucinated APIs, and handling licensing and data privacy. The standard is the professional one — you must be able to explain, test, debug, secure and modify anything AI writes for you.",
      topics: [
        "AI assistants — GitHub Copilot, Claude, Cursor, IDE-native AI",
        "Effective prompting for C# and ASP.NET Core",
        "AI-assisted test generation and coverage",
        "Explaining, refactoring and modernising unfamiliar code",
        "AI debugging — interpreting errors, logs and failing output",
        "Guardrails — hallucinated APIs, licensing, data privacy",
        "Team workflow — AI in the editor, in reviews, in pipelines",
        "The standard — explain, test, debug, secure, modify",
      ],
    },
  ],

  /**
   * Visual roadmap, generated 2026-08-18 from the source markdown rather than
   * hand-designed, so it cannot drift from the syllabus it summarises.
   *
   * Laid out 4x4 and landscape (1680x1317, aspect 1.28) rather than following
   * the Java diagram's tall 864x1821 portrait shape. That one is unreadable
   * at 390px and needs a "full-size version" escape hatch in its caption;
   * this one holds up scaled into a phone-width column.
   *
   * A SUMMARY, NOT THE SOURCE OF TRUTH. Every word inside this image is
   * invisible to crawlers and AI engines, so the curriculum array above
   * carries the same information as text and is the thing that must stay
   * correct. If you add a topic here, add it there.
   */
  roadmapImage: {
    src: "/images/courses/dotnet-ai-roadmap-2026-v1.webp",
    width: 1680,
    height: 1317,
    alt:
      ".NET + AI Roadmap 2026 — a 16-level visual learning path from programming fundamentals and the .NET platform through C# and OOP, modern C#, collections and LINQ, the runtime and async model, SQL and EF Core, dependency injection and ASP.NET Core, REST APIs and security, full stack with Angular or React, testing, production engineering, microservices on Azure and DevOps, ending in AI for .NET developers with Semantic Kernel, embeddings, RAG, agents, AI security and evaluation, and software architecture.",
    caption:
      "The full progression at a glance. Every level is covered in the module list below —",
    fullSizeHref: "/images/courses/dotnet-ai-roadmap-2026-v1.png",
  },

  /**
   * Gated syllabus PDF. Served noindex via X-Robots-Tag (next.config.ts) —
   * it duplicates this page's content by design, so the HTML page stays the
   * canonical, indexable copy and the PDF is a post-click convenience.
   */
  syllabusDownload: {
    pdfUrl: "/downloads/dotnet-ai-roadmap-2026-v1.pdf",
    title: ".NET + AI Roadmap 2026 — Complete Syllabus",
    slug: "dotnet-full-stack-syllabus",
    blurb:
      "The complete 16-level learning sequence this course follows, as a 14-page PDF you can keep or share — every topic from programming fundamentals through Semantic Kernel, RAG and AI agents, plus the fifteen-project progression and the recommended 2026 stack. Everything in it is already on this page; the PDF is just the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 14-page PDF",
        items: [
          "All sixteen levels in order, from programming fundamentals and the .NET platform through C#, ASP.NET Core, EF Core, Angular or React, Azure and microservices, ending in AI integration and architecture.",
          "A fifteen-project progression, from a banking console application in plain C# to a company knowledge assistant and an enterprise AI-powered .NET platform.",
          "The recommended 2026 stack named tool by tool — C# and modern .NET, ASP.NET Core, EF Core, PostgreSQL or SQL Server, React, Redis, Kafka, Docker, Azure, GitHub Actions, Microsoft.Extensions.AI and Semantic Kernel.",
          "What not to spend your first year on: ASP.NET Web Forms, .NET Framework-first development, and legacy MVC patterns still taught elsewhere in Pune.",
          "The AI security and evaluation checklist — prompt injection, tool authorisation, groundedness, hallucination, retrieval quality and token cost.",
        ],
      },
      {
        heading: "Roles this sequence prepares you for",
        items: [
          "C# Developer",
          ".NET Developer",
          "ASP.NET Core Developer",
          "Backend Developer",
          ".NET Full Stack Developer",
          "Cloud Developer",
          "Azure Developer",
          "Microservices Developer",
          "AI-enabled .NET Developer",
          "Enterprise Application Developer",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Enterprise Full-Stack App — ASP.NET Core API + Angular + SQL Server",
      description:
        "A complete enterprise-style full-stack application — pick a real domain (loan application portal, asset management, employee onboarding, or HR ticketing). ASP.NET Core 9 Web API backend with FluentValidation, Entity Framework Core 9 against SQL Server, JWT auth via ASP.NET Core Identity, role-based authorization, OpenAPI / Swagger documentation, Serilog structured logging. Angular 19 frontend with reactive forms, HttpClient + JWT interceptor, route guards, and NgRx for global state. Deployed to Azure App Service + Azure SQL with Azure DevOps Pipelines or GitHub Actions. Outcome: a public GitHub repository plus a clickable demo URL — exactly what Pune .NET enterprise hiring panels interview on.",
      technologies: [
        ".NET 9 + C# 13",
        "ASP.NET Core Web API + Minimal APIs",
        "Entity Framework Core 9 + SQL Server",
        "ASP.NET Core Identity + JWT",
        "Angular 19 + Signals + NgRx",
        "Azure App Service + Azure SQL",
        "Azure DevOps Pipelines or GitHub Actions",
      ],
    },
    {
      title: "Microservices on Azure with Docker + Container Apps",
      description:
        "A microservices system — three services (user, catalog, order) using ASP.NET Core Minimal APIs, communicating via REST and Azure Service Bus, centralised config via Azure App Configuration, gateway via YARP, resilience via Polly, plus Application Insights for distributed tracing. Containerised with Docker multi-stage builds, deployed to Azure Container Apps (the right balance of orchestration and simplicity for most teams). Includes a small admin dashboard and Application Insights dashboards. Demonstrates the patterns Pune .NET enterprise teams hire on — distributed, observable, deployable, resilient.",
      technologies: [
        ".NET 9 + Minimal APIs",
        "Azure Service Bus",
        "Azure App Configuration",
        "YARP API gateway",
        "Polly for resilience",
        "Docker multi-stage",
        "Azure Container Apps",
        "Application Insights",
      ],
    },
    {
      title: "Blazor United Internal Tool with Azure AD Login",
      description:
        "A 2026-relevant Blazor United application showcasing server + WebAssembly + auto interactivity in a single project — pick a real internal-tool domain (CRM, asset register, document management). Azure AD / Entra ID authentication for SSO, EF Core 9 against SQL Server with the JSON-column improvements, role-based authorization, file uploads to Azure Blob Storage. Demonstrates the modern Blazor United approach that has eliminated the awkward Server-vs-WebAssembly choice and is gaining adoption for Pune internal-tool work.",
      technologies: [
        ".NET 9 + Blazor United",
        "Entity Framework Core 9 + SQL Server",
        "Azure AD / Microsoft Entra ID",
        "Azure Blob Storage",
        "Azure App Service",
        "Application Insights",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Suraj Kudache (.NET Full Stack Trainer, 7+ years, Consultant at Capgemini, former Senior Software Developer at Archer Infotech). Suraj ships .NET for a living and personally leads every session of every batch — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      ".NET Full Stack Developer is one of the highest-demand enterprise roles in Pune in 2026 — Indeed Pune lists 1,100+ active .NET / C# / ASP.NET Core openings, with the highest concentration in Pune captives (Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell), BFSI (Cognizant Pune Capital Markets, Bajaj Finserv .NET teams), Microsoft Pune R&D, and the IT services majors. Compensation tracks Java backend closely at every band; BFSI .NET roles often pay a small premium because the talent supply is thinner.",
      "What pulls a .NET Full Stack developer above the median band: depth on Entity Framework Core (most freshers know it superficially, hiring panels test it deeply), ASP.NET Core Web API + Minimal API fluency, one frontend at depth (Angular usually), Azure deployment story, and SQL Server performance literacy (query plans, indexes). Our capstone projects are designed exactly around these signals.",
      "Senior .NET Full Stack and Tech Lead bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: ".NET Developer (Pune)",
        band: "₹7,18,000 per year average",
        source: {
          label: "Indeed Pune (.NET Developer)",
          url: "https://in.indeed.com/career/.net-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior .NET / C# Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,50,000 per year",
        source: {
          label: "AmbitionBox Pune .NET Developer",
          url: "https://www.ambitionbox.com/profile/dot-net-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level .NET Full Stack Developer (Pune, 3–5 years)",
        band: "₹10,00,000 – ₹17,00,000 per year",
        source: {
          label: "Glassdoor Pune .NET Full Stack Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-.net-full-stack-developer-salary-SRCH_IL.0,4_IM1072_KO5,30.htm",
        },
      },
      {
        role: "Senior .NET Full Stack Developer (Pune, 5–8 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior .NET Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-net-developer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm",
        },
      },
      {
        role: ".NET Tech Lead / Architect (national, 8+ years)",
        band: "₹24,00,000 – ₹42,00,000 per year",
        source: {
          label: "6figr India .NET Tech Lead (Pune ±10%)",
          url: "https://6figr.com/in/salary/dotnet-tech-lead--t",
        },
      },
    ],
    hiringCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "Honeywell",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Microsoft (Pune R&D)",
      "Synechron",
      "Capgemini",
      "TCS",
      "Infosys",
      "Wipro",
      "Atos / Eviden",
      "Mphasis",
      "BMC Software",
      "Persistent Systems",
    ],
    rolesAfterCourse: [
      ".NET Full Stack Developer",
      ".NET Developer",
      "C# Developer",
      "ASP.NET Core Developer",
      "Backend Developer (.NET)",
      "Junior .NET Engineer",
      "Software Engineer (Microsoft stack)",
    ],
  },

  modesAndDuration: {
    duration:
      "6 months of structured curriculum — 24 taught weeks running from programming fundamentals through architecture and design principles, plus 2 weeks of capstone project and interview preparation, 26 weeks in total.",
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
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews and PRs",
        "Azure free-tier sandbox per student",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 8–9 months instead of 6 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's PR personally. Classroom batches start every 6 weeks; weekend batches every 8 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. Azure sandbox spend (Azure free tier mostly covers it) typically runs ₹500–₹1,000 across the course and is paid by the student directly.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full microservices / Blazor United modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 12 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed .NET full-stack applications, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune .NET enterprise hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 9 — resume and LinkedIn rewrite, calibrated for .NET Full Stack JDs",
      "Week 10 — GitHub portfolio cleanup, Azure deployment links, CI/CD badges",
      "Weeks 11–12 — LINQ + EF Core drills, ASP.NET Core mock rounds, design walkthroughs",
      "Weeks 13–14 — three rounds of mock technical interviews",
      "Week 14 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies, with extra emphasis on Pune captives and BFSI",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Mercedes-Benz R&D India",
      "Cummins",
      "John Deere ETC",
      "Honeywell",
      "Cognizant Pune Capital Markets",
      "Bajaj Finserv",
      "Synechron",
      "Capgemini",
      "TCS",
      "Infosys",
      "Atos / Eviden",
      "Mphasis",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune .NET training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Suraj Kudache",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: ".NET version covered",
        archer: ".NET 9 + C# 13 — modern syntax, Native AOT, Minimal APIs",
        typical: "Often .NET 6 or .NET Framework 4.8 with WCF / WebForms",
      },
      {
        feature: "EF Core version and depth",
        archer: "EF Core 9 — JSON columns, performance tuning, N+1 prevention",
        typical: "EF6 or EF Core basics with no performance work",
      },
      {
        feature: "Frontend coverage",
        archer: "Angular 19 (primary) + React parallel path",
        typical: "ASP.NET Web Forms / MVC views only, no SPA frontend",
      },
      {
        feature: "Cloud deployment",
        archer: "Azure App Service + Container Apps + AKS hands-on",
        typical: "On-prem IIS only, no cloud",
      },
      {
        feature: "Microservices coverage",
        archer: "Full week — Minimal APIs + Service Bus + YARP + Polly",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Testing in the curriculum",
        archer: "xUnit + Moq + WebApplicationFactory + Testcontainers + Playwright",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "Identity / OAuth coverage",
        archer: "ASP.NET Core Identity + Azure AD + Identity Server / Duende",
        typical: "Cookie auth basics only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed apps with Azure / GitHub Actions badges",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed .NET apps before you pay.",
  },

  versusAlternative: {
    heading: ".NET Full Stack vs Java Full Stack — Which Should You Pick in Pune?",
    paragraphs: [
      ".NET vs Java is the most-asked question in Pune enterprise full-stack counselling. The honest answer: both have ample Pune jobs, both pay similarly at every experience band, and the choice should be by which Pune companies you want to work for — not by which language is 'better'.",
      "Choose .NET Full Stack if your goal is Pune captive R&D centres (Mercedes-Benz, Cummins, John Deere ETC, Honeywell — all heavily .NET), Cognizant Pune Capital Markets, BFSI .NET shops (Bajaj Finserv has substantial .NET alongside Java), or Microsoft's Pune R&D. .NET also pairs naturally with Azure for cloud-deployment paths (most Pune captives standardise on Azure rather than AWS). The 1,100+ Pune .NET / C# openings on Indeed are heavily concentrated in these segments.",
      "Choose Java Full Stack if your goal is the IT services majors (TCS, Infosys, Wipro, Cognizant — all run more Java than .NET), Pune product engineering (Persistent, BMC, Synechron), or BFSI Java shops. Java Pune market is roughly 1.4× .NET in raw openings; the trade-off is more competition for the larger pool.",
      "Honest recommendation: pick .NET if you have a specific captive / Cognizant Capital Markets / Microsoft target, or you already know C# from college. Pick Java if you want broader market reach or you are starting fresh and want the largest Pune backend pool. Many of our students stick with one for 2–3 years and add the second as a side skill once placed; senior enterprise engineers often work across both at the design level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: none beyond basic computer skills, logical aptitude, and the willingness to commit 10–12 hours per week of practice outside class. This changed with the 2026 curriculum — week 1 is now programming fundamentals and week 2 is the .NET platform, so the course genuinely starts from 'what is a variable' rather than assuming it. If you already program in C, C++, Java, Python or JavaScript, sit the assessment and join from week 3 with a fee adjustment; most self-taught applicants are fluent in syntax and weak on OOP boundaries and collection choice, which is exactly what interviews test.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Visual Studio install, .NET 9 SDK, Azure free-tier account creation)",
      "Show up to day one with a laptop running 64-bit Windows / macOS, 16GB+ RAM (recommended), and Visual Studio 2026 or VS Code with C# Dev Kit pre-installed (we provide an install script)",
    ],
  },

  /**
   * FAQs — expanded and extended 2026-08-18, matching the treatment applied
   * to the Java Full Stack course.
   *
   * Rendered through the shared <FaqSection> (the course template was
   * switched over on 2026-08-17), so each question is a real <h3> with its
   * answer as the immediate next sibling and the direct answer sentence
   * always visible.
   *
   * One answer was stale after the curriculum restructure and is corrected
   * here: weekend batches ran "~6 months instead of 3.5" when the weekday
   * course itself was 3.5 months. The weekday course is 6 months, so weekend
   * batches are 8-9.
   *
   * The last eleven questions cover the syllabus this course gained in the
   * .NET + AI Roadmap 2026 restructure, which previously had no FAQ coverage
   * at all — the AI layer, testing, production engineering, the runtime and
   * async model, security depth, architecture, and what is deliberately no
   * longer taught.
   */
  faqs: [
    {
      question: "Which is the best .NET Full Stack training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves, and you should distrust any institute that does. The test that works: ask anyone you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed .NET apps carrying Azure and CI/CD badges, and (3) name the companies that hired their last five batches. Compare on those three answers. Most places fail the first one — the demo is taken by a senior trainer and the batch is handed to someone else in week two. Our batches are capped at 15 students, which is what makes a named trainer economically possible in the first place.",
    },
    {
      question: "How long does .NET Full Stack training in Pune take at Archer Infotech?",
      answer:
        "Six months — 24 weeks of structured curriculum plus 2 weeks of capstone and interview preparation, 26 weeks in total. The sequence runs from programming fundamentals and the .NET platform through C# and OOP, modern C#, collections and LINQ, the runtime and async model, SQL and EF Core, dependency injection and ASP.NET Core, REST APIs and security, Angular or React, testing, production engineering, microservices and Azure, AI integration, and finally architecture. Weekend batches cover identical content at a lower weekly load and stretch over 8–9 months, which is what most working professionals from Hinjewadi, Kharadi and Magarpatta take.",
    },
    {
      question: "What is the salary of a .NET Full Stack Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.18 lakh per year for .NET Developer (May 2026). Junior .NET Developer entry sits at ₹3.5–6.5 lakh per AmbitionBox. Mid-level .NET Full Stack Developers at 3–5 years earn ₹10–17 lakh per Glassdoor, seniors at 5–8 years earn ₹16–26 lakh, and .NET Tech Leads or Architects earn ₹24–42 lakh nationally with Pune trending within ±10%. The band you land in depends far more on whether you can discuss EF Core query performance, DI lifetimes and an Azure deployment you actually built than on years served. Captive R&D centres and BFSI pay a small premium over IT services at the same experience.",
    },
    {
      question: "What is the fee for the .NET Full Stack course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom, online or weekend), batch type and any applicable concession. The higher end covers placement-track classroom batches at our Kothrud centre with the full microservices, Azure and AI modules plus extended interview preparation; the lower end covers concession-eligible online or weekend formats. Azure sandbox spend across the course runs ₹500–₹1,000 and is paid by the student directly — the Azure free tier covers most of it. EMI across 2–3 instalments is available at no extra cost, and fees are confirmed in writing before you enrol, never revised mid-course.",
    },
    {
      question: "Do I need C# experience to join the course?",
      answer:
        "No, and you no longer need prior programming experience either — this changed with the 2026 curriculum. Week 1 is programming fundamentals: algorithms, variables, conditions, loops, functions, debugging and complexity, before any C# syntax appears. Week 2 is the .NET platform itself — SDK against runtime, CLR, IL, JIT and the dotnet CLI. C# and OOP start in week 3. If you already program in C, C++, Java, Python or JavaScript, sit the assessment and join from week 3 with a fee adjustment; most self-taught applicants are fluent in syntax and weak on OOP boundaries and collection choice, which is exactly what interviews test.",
    },
    {
      question: ".NET or Java Full Stack — which should I pick in Pune?",
      answer:
        "Pick .NET if you are targeting Pune captive R&D centres — Mercedes-Benz, Cummins, John Deere, Honeywell — plus Cognizant Pune Capital Markets, BFSI .NET teams and Microsoft's own Pune teams. Pick Java if you are targeting the IT services majors, Pune product engineering or the widest possible reach. The Java market in Pune is roughly 1.4× .NET in raw openings, but .NET roles are concentrated in fewer, larger, more stable employers, and they pay similarly at equivalent experience. If you have no strong preference, the deciding question is usually which shortlist you can realistically reach — commute and referral network matter more than framework at fresher level.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects, each a public GitHub repository with passing CI/CD badges and a clickable demo URL. An enterprise full-stack application with an ASP.NET Core API, Angular and SQL Server deployed to Azure; a microservices system on Azure Container Apps with Service Bus, YARP and Polly; and a Blazor United internal tool with Entra ID login. From the 2026 curriculum your capstone also ships with a test suite and at least one AI-backed feature, because an untested repository reads as a tutorial follow-along to anyone reviewing it, and an AI feature is currently the fastest way to stand out in a stack of .NET resumes.",
    },
    {
      question: "Does the course cover Angular or React?",
      answer:
        "Both, with Angular as the primary track. Angular 19 is taught deeply across weeks 14–16 — components, services, RxJS, dependency injection, routing and lazy loading, reactive forms, HttpClient with JWT interceptors and route guards, and NgRx for global state — because Angular is the dominant frontend in Pune enterprise and BFSI .NET hiring. React 19 runs as a full opt-in alternative in the same weeks with identical project deliverables, for students targeting Pune SaaS and fintech shops where React is the default. Choose on your target employers rather than on preference.",
    },
    {
      question: "Is Blazor covered?",
      answer:
        "Yes — the frontend module in weeks 14–16 includes a Blazor United primer (server plus WebAssembly plus auto interactivity in a single project, the .NET 8 and 9 model that removed the awkward Server-versus-WebAssembly choice), taught alongside the Angular or React track rather than instead of it. Capstone Project #3 is a complete Blazor United internal tool with Entra ID login. Blazor adoption is growing in Pune internal-tool and line-of-business work, and we cover it deeply enough that you can interview for Blazor roles — but it is a complement to a mainstream frontend framework on your resume, not a replacement for one.",
    },
    {
      question: "Are weekend .NET classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00 to 13:00, stretched over 8–9 months instead of 6. Same syllabus, same trainer, same projects and the same placement support; only the weekly load differs. Weekend batches are the format most working professionals choose, particularly those commuting from Hinjewadi, Wakad, Kharadi and Pimpri-Chinchwad where a weekday evening trip to Kothrud is not realistic. Live online is the other option for that group, and many students combine the two — online through the week, classroom on Saturday for the lab-heavy Azure and microservices sessions.",
    },
    {
      question: "Can I switch from .NET Framework 4.x to .NET 9 via this course?",
      answer:
        "Yes, and there is a sizable cohort doing exactly this. Working .NET Framework developers slot in well: the C# language layer translates directly, so the real work is the modern hosting model, dependency injection, configuration, Minimal APIs and the async model that replaced the .NET Framework conventions. We adjust capstone scope for migration-path students so the project highlights your existing domain strength rather than pretending you are a fresher. The parts that most often catch experienced Framework developers are DI lifetimes, the middleware pipeline, and EF Core's tracking behaviour — all covered explicitly rather than assumed.",
    },
    {
      question: "Does the course prepare me for Azure certifications?",
      answer:
        "Indirectly. The Azure App Service, Container Apps, Functions, Key Vault and Service Bus hands-on in weeks 20–21 maps to a meaningful subset of AZ-204 (Azure Developer Associate). We do not run a dedicated AZ-204 mock-exam track inside this course — there is a separate Azure track for that — but graduates typically sit AZ-204 within 6 to 12 weeks of finishing and pass first time. The practical point for hiring is that a deployed Azure application in your GitHub carries more weight in a Pune .NET interview than the certificate does; the certificate helps most when it is paired with one.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support: mock interviews calibrated for .NET Full Stack roles across live-coding, .NET conceptual and design rounds, referrals through our alumni network at partner companies with extra emphasis on Pune captives and BFSI, resume, LinkedIn and GitHub rewrites, and salary negotiation coaching. Support starts at week 12 of the course rather than at the end, so by the time you finish, your resume is written and you have completed at least three mock technical interviews. If your first round of interviews does not land, you can sit in on a future batch's interview-preparation sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Suraj Kudache personally leads every session of every batch from day one through capstone — he ships .NET for a living at Capgemini and brings production patterns into the classroom rather than textbook examples. The name on this page is the person you meet on day one. His LinkedIn is on the trainer profile page, and we will arrange a 30-minute conversation with him before you enrol. Batches are capped at 15 students, which is what makes a single named trainer sustainable; a 40-seat batch cannot be taught this way at any honest price.",
    },

    {
      question: "Does the .NET Full Stack course cover AI and Semantic Kernel?",
      answer:
        "Yes — weeks 22 and 23 are a full module on building AI features in ASP.NET Core, and it is the part of this syllabus most Pune .NET courses do not have. Week 22 covers LLM mechanics (tokens, context windows, prompts, system instructions, structured outputs, streaming, tool calling, model selection) and then the Microsoft AI stack specifically: Microsoft.Extensions.AI as the abstraction layer, Semantic Kernel, and Azure OpenAI. You then build the feature into a real API — chat with streaming, conversation history, structured output and tool calling, plus authentication, logging and rate limiting on an endpoint that costs money per call.",
    },
    {
      question: "What is Microsoft.Extensions.AI and why does the course teach it?",
      answer:
        "Microsoft.Extensions.AI is the abstraction layer Microsoft shipped so .NET code can talk to different AI providers through one set of interfaces, in the same way Microsoft.Extensions.Logging abstracts logging providers. It matters commercially because it is the difference between an AI feature wired directly to one vendor's SDK and one you can move, test and mock. We teach it before Semantic Kernel and Azure OpenAI for the same reason we teach dependency injection before ASP.NET Core — the abstraction is what makes the concrete thing explicable, and it is what a reviewer will ask about.",
    },
    {
      question: "Is RAG and vector search included in the .NET syllabus?",
      answer:
        "Yes — week 23 builds a RAG pipeline end to end rather than describing one. Embeddings and vector representation, cosine similarity and semantic search, vector storage on PostgreSQL with pgvector or on Azure AI Search, then ingestion, parsing, chunking, retrieval, reranking, context construction, grounded answers and citations. It continues into tool calling against your own database, search and internal APIs, and agents with planning, memory, state, multi-step workflows and a human-in-the-loop approval step. AI security and evaluation are taught in the same module, against the pipeline you just built rather than in the abstract.",
    },
    {
      question: "What is the difference between AI-assisted coding and building AI features in .NET?",
      answer:
        "They are two different skills and this course teaches both. AI-assisted coding is using GitHub Copilot, Claude or Cursor to scaffold, generate tests and refactor faster — a working practice, so it runs woven through the course with dedicated sessions in weeks 5, 13 and 21. Building AI features in .NET is engineering: calling models from an ASP.NET Core service, storing embeddings, retrieving context, grounding an answer, authorising which tools the model may call, and evaluating whether the output was correct. Most candidates in 2026 can do the first. Very few can do the second, which is where interviews are starting to separate.",
    },
    {
      question: "Which testing tools does the .NET course teach?",
      answer:
        "xUnit as the primary framework with NUnit differences covered, assertions and fixtures, mocking of collaborators, integration testing with Testcontainers against a real database rather than an in-memory substitute, Postman for REST testing, and Playwright for end-to-end. Testing sits in week 17 alongside Git, pull requests, code review and GitHub Actions, and it is not optional — your capstone ships with a test suite. This matters commercially: testing is the most common gap on fresher .NET resumes in Pune, and a repository whose tests explain what the code is supposed to do is the fastest way to look experienced in a review.",
    },
    {
      question: "Do you cover Kafka, Redis and gRPC in the .NET course?",
      answer:
        "Yes — weeks 18 and 19 are a production engineering module. Docker with Dockerfiles, volumes, networks, Compose and health checks. Redis for caching: cache-aside, TTL strategy, distributed caching, sessions, rate limiting and distributed locks. Messaging with RabbitMQ and Kafka — producers, consumers, topics, partitions, consumer groups, offsets, ordering and idempotency, the concept that decides whether a retry corrupts data. Then gRPC with Protocol Buffers, unary and streaming calls and service contracts, which is how Pune .NET microservices usually talk to each other rather than over REST.",
    },
    {
      question: "Does the course cover the .NET runtime, garbage collection and async?",
      answer:
        "Yes — week 7 covers exceptions and custom exception types, then the runtime itself: stack against heap, garbage collection and its generations, IDisposable and using, IAsyncDisposable, resource lifetime, and how memory leaks still happen in a managed runtime. The async half covers Task and Task-of-T, async/await, CancellationToken, WhenAll and WhenAny, the thread pool, locks, concurrent collections, Channels, background services and async streams with IAsyncEnumerable. These are frequent interview topics at Pune product and captive employers and a common gap for developers who learned .NET from tutorials rather than from production.",
    },
    {
      question: "What security topics does the ASP.NET Core part of the course cover?",
      answer:
        "Authentication against authorisation, ASP.NET Core Identity, password hashing, roles, claims and policy-based authorisation, JWT with refresh tokens, OAuth 2.0 and OpenID Connect, CORS, CSRF and security headers. It sits in weeks 12 and 13 alongside REST API design, deliberately, because bolting security on after the API exists is how vulnerabilities ship. Identity is the module most students find hardest and most interviewers ask about, largely because the common learning path is pasting a configuration that works and never learning why — so we build the pipeline up rather than starting from a working template.",
    },
    {
      question: "Is software architecture taught, or just frameworks?",
      answer:
        "Week 24 is a dedicated architecture module, and it is deliberately placed after you have built distributed services rather than before. SOLID, DRY and KISS applied to code you have already written, then layered, Clean and Hexagonal architecture, the modular monolith, microservices and event-driven architecture presented as choices with trade-offs instead of a hierarchy. CQRS concepts and the Saga pattern revisited with real context. It closes on scalability, fault tolerance and load balancing, and on being able to defend an architectural decision in an interview rather than name-drop one — which is what actually separates senior candidates.",
    },
    {
      question: "Do you still teach ASP.NET Web Forms or .NET Framework?",
      answer:
        "No, not as core content. ASP.NET Web Forms, .NET Framework-first development and legacy MVC patterns without current relevance are deliberately out of the main syllabus. They consume weeks better spent on ASP.NET Core, testing, Azure and AI integration, and they no longer appear in the Pune job descriptions this course targets — most Pune teams migrated off .NET Framework and .NET Core 3.1 years ago. Some institutes still teach a Web Forms curriculum because the material is old and cheap to deliver. If a specific maintenance project or employer requires it, we cover it on request, which is the right time to learn legacy technology.",
    },
    {
      question: "Which Azure services does the course actually use?",
      answer:
        "App Service and Container Apps for hosting, Functions for event-driven work, Azure SQL and PostgreSQL for data, Storage, Key Vault for secrets, Service Bus for messaging, Container Registry for images, Entra ID for identity, and Monitor with Application Insights for observability. Weeks 20 and 21 deploy real services onto them rather than watching a walkthrough, with GitHub Actions handling build, test, containerise and deploy plus secrets and environment management. Azure sandbox spend across the course runs ₹500–₹1,000 and the free tier covers most of it.",
    },
    {
      question: "Which companies in Pune hire .NET Full Stack developers?",
      answer:
        "Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Synechron, Microsoft's Pune teams, Cybage, Persistent Systems, Amdocs, Capgemini, TCS and Infosys, plus a long tail of BFSI and manufacturing captives. Indeed Pune listed more than 1,100 active .NET, C# and ASP.NET Core roles as of May 2026. The captives hire in smaller numbers and interview hard on C# internals, EF Core performance and design; the services firms hire in volume and weight DSA screening more heavily. Our interview preparation splits along that line rather than treating all employers the same.",
    },
  ],

  finalCta: {
    heading: "Ready to start .NET Full Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 6–8 weeks. Reach out via the enquiry form or call us — Suraj is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed .NET apps, meet a current batch, and decide with full information.",
  },
};
