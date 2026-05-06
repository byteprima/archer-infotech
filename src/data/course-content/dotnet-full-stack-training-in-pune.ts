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
      "If you have no programming background — at least basic C / C++ / Java / JavaScript is required from week 1",
      "If you cannot put in 10–12 hours per week of practice outside class — full-stack is the most lab-heavy of the major tracks",
      "If you only want a certificate sticker with no portfolio — Pune enterprise hiring screens hard on real PRs and deployed apps",
      "If your goal is specifically Pune SaaS / fintech startups — those skew Node.js or Python far more than .NET; pick MERN or Python Full Stack",
      "If you have 4+ years of production ASP.NET Core + Angular / React experience — you'll be under-stretched; talk to us about advanced microservices / Azure architecture specialisations",
    ],
  },

  curriculum: [
    {
      title: "C# 13 & .NET 9 Foundations",
      weekRange: "Weeks 1–2",
      description:
        "C# 13 from first principles — primitive types, control flow, methods, classes, structs, records (now first-class for most domain types), pattern matching, nullable reference types, async / await, exception handling, plus the C# 13 additions (params collections, partial members). The .NET 9 runtime — projects, solutions, NuGet, minimal CLI use, performance characteristics, Native AOT for the cases where it fits. By the end of week 2 every student has Visual Studio 2026 (or VS Code with C# Dev Kit) configured, .NET 9 SDK installed, and a small console app deployed.",
      topics: [
        "C# 13 — primitive types, control flow, methods",
        "Classes, structs, records, sealed types",
        "Pattern matching and switch expressions",
        "Nullable reference types and the warning discipline",
        "Async / await and TaskCompletionSource",
        "Exception handling and the try-with style",
        "Generic types and constraints",
        "LINQ basics — Where, Select, Aggregate",
        "Visual Studio 2026 / VS Code with C# Dev Kit setup",
      ],
    },
    {
      title: "OOP, LINQ & Collections",
      weekRange: "Week 3",
      description:
        "Object-oriented C# done with the modern idioms — inheritance vs composition, interfaces with default implementations, abstract classes (when they still earn their place), the visitor / strategy / template-method patterns rendered in C# style. LINQ at the level you actually use it (deferred execution, IEnumerable vs IQueryable, the practical operator subset, custom extensions), plus the Collections world — List, Dictionary, HashSet, ConcurrentDictionary, ImmutableArray. We finish by refactoring a 200-line procedural method into clean OOP + LINQ.",
      topics: [
        "Classes, inheritance, polymorphism with modern C#",
        "Interfaces with default methods",
        "Abstract classes vs interfaces — when each wins",
        "Records as primary domain types",
        "LINQ — deferred execution, IEnumerable vs IQueryable",
        "LINQ operators that matter — Where, Select, GroupBy, Join",
        "Collections — List, Dictionary, HashSet, ConcurrentDictionary",
        "Immutable collections and value-style domain modelling",
      ],
    },
    {
      title: "ASP.NET Core MVC & Razor Pages",
      weekRange: "Week 4",
      description:
        "ASP.NET Core MVC for traditional server-rendered web applications — routing, controllers, actions, views with Razor syntax, model binding, validation with DataAnnotations and FluentValidation, tag helpers, view components, layouts, partial views. We cover Razor Pages alongside MVC for the smaller-team / page-focused use case, plus middleware, dependency injection (the integrated container — no third-party DI for new code), and configuration with Options pattern. Useful for Pune teams that ship internal tools and admin dashboards on server-rendered .NET.",
      topics: [
        "ASP.NET Core middleware pipeline",
        "MVC — routing, controllers, actions",
        "Razor syntax, layouts, partial views",
        "Tag helpers and view components",
        "Model binding and validation",
        "Razor Pages for page-focused apps",
        "Dependency Injection with the integrated container",
        "Configuration and Options pattern",
      ],
    },
    {
      title: "ASP.NET Core Web API & Minimal APIs",
      weekRange: "Week 5",
      description:
        "REST API design as Pune .NET teams actually do it. Cover Web API controllers with attribute routing, the new Minimal APIs (now the default for new microservices), model binding and validation with FluentValidation, exception handling middleware, OpenAPI / Swagger with Swashbuckle (or the built-in OpenAPI generation in .NET 9), versioning, content negotiation, plus the security middleware stack (authentication, authorization, CORS, rate limiting via the built-in middleware). We finish by building a complete RESTful API for a real domain with full validation, pagination, sorting, and filtering.",
      topics: [
        "Web API controllers with attribute routing",
        "Minimal APIs — the .NET 8 / 9 default for new services",
        "Model binding, validation, FluentValidation",
        "Exception handling middleware",
        "OpenAPI / Swagger with Swashbuckle",
        "API versioning",
        "CORS and rate limiting",
        "Content negotiation and ProblemDetails",
      ],
    },
    {
      title: "Entity Framework Core & SQL Server",
      weekRange: "Week 6",
      description:
        "Database access as it is actually written today. SQL Server fundamentals (the dominant database in Pune .NET shops) — joins, transactions, indexes, EXPLAIN plans equivalent, query store. Then Entity Framework Core 9 — code-first DbContext, migrations, relationships (one-to-many, many-to-many with skip navigations), query optimisation, projection with Select, AsNoTracking for read-only paths, the JSON-column support added in EF Core 8 / 9. We cover the N+1 query trap, AsSplitQuery, the EF Core query plan logger, and Dapper for the cases where EF Core's overhead is too much.",
      topics: [
        "SQL Server essentials — joins, transactions, indexes",
        "EF Core — DbContext, code-first, migrations",
        "Relationships and navigation properties",
        "Querying — Where / Select / Include / AsNoTracking",
        "JSON columns (EF Core 8 / 9)",
        "N+1 trap, AsSplitQuery",
        "Performance — query plans, compiled queries",
        "Dapper for hot paths",
      ],
    },
    {
      title: "Authentication, Authorization & Identity",
      weekRange: "Week 7",
      description:
        "JWT bearer authentication for APIs, cookie authentication for MVC / Razor Pages applications, ASP.NET Core Identity for user management, role-based and policy-based authorization (the .NET-idiomatic approach), then the modern external-IdP integration — Azure AD / Microsoft Entra ID (the dominant Pune enterprise IdP), Identity Server / Duende, OpenIddict (the open-source alternative). Plus the security baseline — anti-forgery tokens, data protection, password hashing defaults, secrets management with User Secrets and Azure Key Vault.",
      topics: [
        "JWT bearer authentication for APIs",
        "Cookie authentication for MVC",
        "ASP.NET Core Identity",
        "Role-based and policy-based authorization",
        "Azure AD / Microsoft Entra ID integration",
        "Identity Server / Duende, OpenIddict",
        "Anti-forgery tokens and data protection",
        "Secrets management — User Secrets, Azure Key Vault",
      ],
    },
    {
      title: "Frontend — Angular (with React Path)",
      weekRange: "Weeks 8–9",
      description:
        "The frontend half of full-stack. Angular as the primary frontend (dominant in Pune .NET enterprise hiring) — TypeScript foundations, Angular 19 standalone components, Signals, reactive forms, HttpClient with interceptors for JWT, RxJS at the operators-you-actually-use level, route guards, NgRx-light or Signal stores. React provided as a parallel path for students targeting Pune SaaS / fintech .NET shops (BharatPe Pune, Pine Labs Pune, etc.) — React 19 essentials, hooks, TanStack Query, Tailwind. We finish by wiring the Angular / React frontend to the ASP.NET Core API from week 5.",
      topics: [
        "TypeScript essentials for frontend",
        "Angular 19 standalone components and Signals",
        "Reactive forms and validation",
        "HttpClient with JWT interceptor",
        "RxJS operators that matter",
        "Route guards and lazy loading",
        "NgRx or Signal-based state",
        "(Parallel path) React 19, hooks, TanStack Query, Tailwind",
        "Wiring the frontend to the .NET API",
      ],
    },
    {
      title: "Microservices, Docker & Azure Deployment",
      weekRange: "Week 10",
      description:
        "Beyond the monolith. Decompose a .NET monolith into microservices using ASP.NET Core Minimal APIs, communicate via REST and message broker (RabbitMQ or Azure Service Bus), centralised configuration with Azure App Configuration, API gateway with YARP or Azure API Management, and resilience patterns with Polly (retry, circuit breaker, timeout). Containerise services with Docker (multi-stage Dockerfiles), then deploy — Azure App Service for traditional web apps, Azure Container Apps for serverless containers, Azure Kubernetes Service for full orchestration. Plus structured logging with Serilog, Application Insights for observability, and Azure Monitor dashboards.",
      topics: [
        ".NET microservice decomposition",
        "REST + message broker communication",
        "Polly — retry, circuit breaker, timeout",
        "YARP and Azure API Management",
        "Docker multi-stage Dockerfiles for .NET",
        "Azure App Service deployment",
        "Azure Container Apps",
        "Azure Kubernetes Service basics",
        "Serilog + Application Insights + Azure Monitor",
      ],
    },
    {
      title: "Testing, CI/CD & Production Practices",
      weekRange: "Week 11",
      description:
        "Testing as Pune enterprise teams actually do it. xUnit for unit tests (the .NET community default), FluentAssertions for readable expectations, Moq for mocking dependencies, in-memory EF Core for repository tests, WebApplicationFactory for integration tests against ASP.NET Core, Testcontainers for tests against real SQL Server, plus Playwright .NET for end-to-end. CI/CD with Azure DevOps Pipelines (the dominant choice in Pune .NET enterprise) and GitHub Actions (the modern alternative) — building, testing, scanning, and deploying to Azure with proper environment promotion.",
      topics: [
        "xUnit + FluentAssertions",
        "Moq for mocking",
        "In-memory EF Core for tests",
        "WebApplicationFactory integration tests",
        "Testcontainers for real SQL Server in tests",
        "Playwright .NET for end-to-end",
        "Azure DevOps Pipelines",
        "GitHub Actions for .NET",
        "Build, test, scan, deploy patterns",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 12–13 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune .NET enterprise hiring panels — Mercedes-Benz R&D, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Synechron, Microsoft Pune. Includes a coding round (LINQ + EF Core + Web API), a design round (decompose a feature, choose between MVC and Web API, structure DbContext access), and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Live-coding mock — LINQ + EF Core + API",
        "Design mock — feature decomposition",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite for .NET Full Stack JDs",
        "GitHub portfolio polish — deployed apps with Azure / GitHub Actions badges",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

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
      "13 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation (~3.5 months total). The original 6-month listing reflects the optional extended evening format with deeper Azure architecture work; both formats cover the core stack.",
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
        "Stretches over ~6 months instead of 3.5 to accommodate working professionals. Same content, lower weekly load.",
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
      "Placement support starts from week 9 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed .NET full-stack applications, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune .NET enterprise hiring teams.",
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
      "Prerequisites: at least basic programming background in any language (C, C++, Java, Python, JavaScript), basic understanding of OOP concepts, and willingness to commit 10–12 hours per week of practice outside class. We expect basic programming fluency on day 1; we do not start from 'what is a variable'. If you have done our Java or C++ course (or equivalent self-study), you are ready. Pure non-programmers should do a foundation course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Visual Studio install, .NET 9 SDK, Azure free-tier account creation)",
      "Show up to day one with a laptop running 64-bit Windows / macOS, 16GB+ RAM (recommended), and Visual Studio 2026 or VS Code with C# Dev Kit pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best .NET Full Stack training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed .NET apps and Azure / CI/CD badges, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does .NET Full Stack training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3.5 months — 13 weeks of structured curriculum plus 2 weeks of capstone and interview preparation. The original 6-month listing reflects an optional extended evening format. The weekend batch stretches over ~6 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a .NET Full Stack Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.18 lakh per year for .NET Developer (May 2026). Junior .NET Developer Pune entry sits at ₹3.5–6.5 lakh per year per AmbitionBox. Mid-level .NET Full Stack Developers (3–5 years) earn ₹10–17 lakh per Glassdoor. Senior .NET Full Stack Developers (5–8 years) earn ₹16–26 lakh. .NET Tech Leads / Architects earn ₹24–42 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the .NET Full Stack course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full microservices / Blazor United modules and extended interview prep; the lower end covers concession-eligible online or weekend formats. Azure sandbox spend across the course runs ₹500–₹1,000 (paid directly by the student).",
    },
    {
      question: "Do I need C# experience to join the course?",
      answer:
        "No — week 1 covers C# 13 from first principles. What we expect is at least basic programming background in any language (C, C++, Java, Python, JavaScript). If you have done our Java or C++ course (or equivalent self-study), you are ready.",
    },
    {
      question: ".NET or Java Full Stack — which should I pick in Pune?",
      answer:
        ".NET if your goal is Pune captives (Mercedes-Benz, Cummins, John Deere, Honeywell), Cognizant Pune Capital Markets, BFSI .NET, or Microsoft Pune. Java if your goal is the IT services majors (TCS / Infosys / Wipro / Cognizant), Pune product engineering, or broader market reach. Java Pune market is roughly 1.4× .NET in raw openings; both pay similarly at equivalent experience.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) enterprise full-stack app with ASP.NET Core API + Angular + SQL Server deployed to Azure, (2) microservices on Azure Container Apps with Service Bus + YARP + Polly, (3) Blazor United internal tool with Azure AD login. All three become public GitHub repositories with passing CI/CD badges and clickable demo URLs.",
    },
    {
      question: "Does the course cover Angular or React?",
      answer:
        "Both — Angular as the primary frontend (dominant in Pune .NET enterprise hiring) is taught deeply, with React as a parallel path for students targeting Pune SaaS / fintech .NET shops. Capstone Project #1 uses Angular; you can swap to React if your target market calls for it.",
    },
    {
      question: "Is Blazor covered?",
      answer:
        "Yes — week 8 includes a Blazor United primer (server + WebAssembly + auto interactivity in a single project, the .NET 8 / 9 model that has eliminated the awkward Server-vs-WebAssembly choice). Capstone Project #3 is a complete Blazor United internal tool. Blazor adoption is growing in Pune internal-tool work; we cover it deeply enough that you can interview for Blazor roles.",
    },
    {
      question: "Are weekend .NET classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~6 months instead of 3.5. Same content, same trainer, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Can I switch from .NET Framework 4.x to .NET 9 via this course?",
      answer:
        "Yes — and we have a sizable cohort doing exactly this. Working .NET Framework developers transitioning into modern .NET 8 / 9 typically slot in well; the C# language layer translates directly, and the course ramps you onto the modern hosting model, dependency injection, configuration, and Minimal APIs that have replaced the .NET Framework conventions. We adjust capstone scope for migration-path students to highlight your existing strengths.",
    },
    {
      question: "Does the course prepare me for Azure certifications?",
      answer:
        "Indirectly — the Azure App Service / Container Apps / AKS hands-on covered in weeks 10–11 maps to a meaningful subset of the AZ-204 (Azure Developer Associate) exam. We do not run a dedicated AZ-204 mock-exam track inside this course (we have a separate Azure track for that), but graduates typically take AZ-204 within 6–12 weeks after course end and pass first time.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for .NET Full Stack roles (live-coding + .NET conceptual + design rounds), referrals via our alumni network at 12+ partner companies (with extra emphasis on Pune captives and BFSI), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Suraj Kudache personally leads every session of every batch from Day 1 through capstone — he ships .NET for a living at Capgemini and brings real production patterns into the classroom. The same name on this page is the same person you meet on day one; his LinkedIn is on the trainer profile page, and we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start .NET Full Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 6–8 weeks. Reach out via the enquiry form or call us — Suraj is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed .NET apps, meet a current batch, and decide with full information.",
  },
};
