import type { CourseRichContent } from "./types";

export const dotnetCsharpTrainingInPune: CourseRichContent = {
  intro:
    "C# is the language of Microsoft's modern stack and a top-three enterprise programming language in Pune — Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, Cognizant Pune Capital Markets, Bajaj Finserv, Microsoft Pune R&D, plus the IT services majors all run substantial C# / .NET codebases. Archer Infotech's .NET / C# training in Pune teaches the language as it is actually used in 2026 — C# 13 with .NET 9 (annual cadence stable, .NET 10 LTS due late 2025), modern syntax (records, pattern matching, file-scoped namespaces, raw string literals, primary constructors), the .NET runtime mental model (CLR, JIT, GC, AOT), LINQ at the level you actually use it, async / await done right, plus a working primer on ASP.NET Core (you graduate to the full .NET Full Stack track for depth). The course is the right standalone introduction for first-time C# learners and the natural prerequisite for our .NET Full Stack track. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn .NET / C# in 2026",
    paragraphs: [
      "C# is among Pune's best-paid mainstream languages and the dominant choice in two major Pune segments — captive R&D centres (Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell — all heavily .NET) and BFSI / capital markets (Cognizant Pune Capital Markets, Bajaj Finserv .NET teams). Indeed Pune lists more than 1,300 active C# / .NET roles as of May 2026, including .NET Developer, ASP.NET Core Developer, Backend Developer (.NET), Software Engineer (Microsoft stack), and Full Stack (.NET) titles. Compensation tracks Java closely at every band; senior .NET roles in BFSI and captives often pay a small premium because the talent supply is thinner than Java.",
      "What changed in 2026: .NET 9 is the production default (Nov 2024 release; .NET 10 LTS due Nov 2025 — annual cadence is stable). C# 13 ships params collections and partial members. C# 12 (.NET 8 baseline) added primary constructors, collection expressions, and improved pattern matching. .NET has fully consolidated on cross-platform — Windows / macOS / Linux all production-ready. Native AOT is mature for command-line tools and small services. Visual Studio 2026 + VS Code with C# Dev Kit are both viable. The unification (one .NET, no more .NET Framework vs .NET Core split) is complete.",
      "What this means for hiring: 2026 Pune .NET / C# JDs expect C# 11+ syntax fluency (records, pattern matching, nullable reference types), .NET 8 / 9 runtime familiarity, LINQ depth, async / await done right, plus basic ASP.NET Core for backend roles. Senior roles add Entity Framework Core, identity / OAuth, Azure deployment, and microservices patterns (covered in our follow-on .NET Full Stack track). Archer Infotech's .NET / C# course covers the language depth that opens both standalone-C# roles and the full-stack track.",
    ],
    keyPoints: [
      "1,300+ active C# / .NET roles on Indeed Pune as of May 2026",
      ".NET 9 + C# 13 — annual cadence stable, .NET 10 LTS due late 2025",
      "Foundation for our .NET Full Stack track and Pune captive / BFSI hiring",
      "Cross-platform on Windows / macOS / Linux — no more .NET Framework lock-in",
      "C# 11+ modern syntax — records, pattern matching, nullable reference types",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting .NET / C# Developer roles in Pune",
      "Working .NET Framework (4.x) developer wanting to graduate to .NET 8 / 9",
      "Working developer in another language (Java, Python, JavaScript) wanting to add C# for the Pune captive / BFSI market",
      "Student preparing for our .NET Full Stack track — this course is the natural prerequisite",
      "Career restarter targeting Pune captive R&D centres where .NET is dominant",
      "First-time programmer with a strong Microsoft-ecosystem target (e.g., aiming at Microsoft Pune R&D)",
    ],
    notForYou: [
      "If your goal is web / frontend / mobile — JavaScript or Python is the better starting point",
      "If you cannot put in 8–10 hours per week of practice outside class — language fluency takes practice",
      "If you only want a certificate sticker with no portfolio — Pune .NET hiring screens hard on real PRs and deployed apps",
      "If you specifically want Pune SaaS / fintech startups — those skew Node.js / Python far more than .NET; pick MERN or Python Full Stack",
      "If you have 3+ years of production C# / .NET experience — you'll be under-stretched; jump directly to our .NET Full Stack track",
    ],
  },

  curriculum: [
    {
      title: "C# Foundations & .NET 9 Toolchain",
      weekRange: "Weeks 1–2",
      description:
        "C# from first principles. Cover the modern C# subset (variables, primitive types, control flow, methods, classes), nullable reference types (the discipline that prevents most C# bugs in 2026), the new top-level statements (no more `static void Main` ceremony), file-scoped namespaces, raw string literals, plus the .NET 9 toolchain — Visual Studio 2026 / VS Code with C# Dev Kit, the dotnet CLI, NuGet for packages, the difference between class libraries / console apps / web apps. By the end of week 2 every student has a working .NET 9 console project with passing tests.",
      topics: [
        "C# variables, primitive types, control flow",
        "Nullable reference types (`string?` vs `string`)",
        "Top-level statements and file-scoped namespaces",
        "Raw string literals and string interpolation",
        "Visual Studio 2026 / VS Code with C# Dev Kit",
        "dotnet CLI — new, build, run, test, publish",
        "NuGet packages and references",
        ".NET project types — console, library, web, worker",
      ],
    },
    {
      title: "Object-Oriented C#",
      weekRange: "Weeks 3–4",
      description:
        "OOP in C# the way modern teams write it. Classes — properties (including init-only and required), methods, constructors (including primary constructors from C# 12), records (the modern way to write 80% of domain types — value semantics, with-expressions, pattern matching), structs (when value-type semantics matter), abstract classes, interfaces with default implementations, plus the discipline of when to use each. Pattern matching at depth (switch expressions, property patterns, list patterns from C# 11), plus generic types and constraints.",
      topics: [
        "Classes — properties, methods, constructors",
        "Primary constructors (C# 12)",
        "Records — value semantics, with-expressions",
        "Structs and ref structs",
        "Inheritance, abstract classes, sealed types",
        "Interfaces with default implementations",
        "Pattern matching — switch expressions, property patterns, list patterns",
        "Generics and generic constraints",
      ],
    },
    {
      title: "LINQ & Collections",
      weekRange: "Week 5",
      description:
        "LINQ is the C# differentiator that separates working code from elegant code. Cover the query syntax vs method syntax (we teach method syntax as the default), the practical operator subset (Where, Select, OrderBy, GroupBy, Join, Aggregate, Any, All, First, Single, FirstOrDefault), deferred execution and the IEnumerable vs IQueryable distinction, plus the Collections world — List, Dictionary, HashSet, Queue, Stack, ConcurrentDictionary, ImmutableArray. We finish by refactoring a 200-line procedural method into clean LINQ.",
      topics: [
        "LINQ method syntax (the modern default)",
        "Operators that matter — Where, Select, OrderBy, GroupBy, Join, Aggregate",
        "Deferred execution",
        "IEnumerable vs IQueryable",
        "Collections — List, Dictionary, HashSet",
        "Concurrent collections — ConcurrentDictionary",
        "Immutable collections",
      ],
    },
    {
      title: "Async / Await & Task Parallelism",
      weekRange: "Week 6",
      description:
        "The model that defines modern .NET. Cover async / await (the right way — never `.Result` or `.Wait()` in production), Task vs Task<T>, ConfigureAwait, cancellation with CancellationToken, exception handling in async code, plus the parallel-work primitives (Parallel.For / Parallel.ForEach, PLINQ when it earns its place, Task.WhenAll for fan-out, Channel<T> for producer-consumer). Plus the discipline of avoiding the most common production failures — async-over-sync, sync-over-async, deadlocks from `.Result`.",
      topics: [
        "async / await — the modern default",
        "Task and Task<T>",
        "ConfigureAwait(false) — when it matters",
        "Cancellation with CancellationToken",
        "Parallel.For / Parallel.ForEach",
        "PLINQ — when to use, when not",
        "Task.WhenAll for fan-out",
        "Channel<T> for producer-consumer",
        "Common pitfalls — `.Result`, async-over-sync",
      ],
    },
    {
      title: "Exception Handling, IO & Modern Features",
      weekRange: "Week 7",
      description:
        "Exception handling the modern way — try / catch / finally / using, custom exceptions, exception filters, the discipline of catching specific exceptions over `catch (Exception)`. File and stream I/O — File / Directory / Path / Stream APIs, plus async file I/O for production code. JSON via System.Text.Json (the modern default — Newtonsoft.Json is legacy for new code). Plus the modern-C# features that round out the language — extension methods, delegates and events, lambda expressions, expression trees (briefly), and a primer on Source Generators.",
      topics: [
        "Exception handling — try / catch / finally / using",
        "Custom exceptions and exception filters",
        "File / Directory / Path / Stream APIs",
        "Async file I/O",
        "JSON via System.Text.Json",
        "Extension methods",
        "Delegates, events, lambda expressions",
        "Source Generators primer",
      ],
    },
    {
      title: "ASP.NET Core Primer & Capstone",
      weekRange: "Week 8 + 1 week capstone",
      description:
        "A working primer on ASP.NET Core — enough to build a small REST API and understand the dependency-injection pattern that defines modern .NET, but not the full backend depth (which is in our .NET Full Stack track). Cover Minimal APIs (the .NET 8 / 9 default), basic routing, dependency injection, Configuration / Options, plus async / streaming responses. Capstone project (see Capstone Projects). Mock interviews calibrated for entry-level .NET / C# Developer roles in Pune; resume / LinkedIn / GitHub polish included.",
      topics: [
        "ASP.NET Core — middleware pipeline overview",
        "Minimal APIs basics",
        "Dependency Injection (integrated container)",
        "Configuration and Options pattern",
        "Async / streaming responses",
        "Capstone project, code review, deployment",
        "Resume + LinkedIn rewrite for .NET / C# JDs",
        "Mock technical interviews",
        "HR mock and salary negotiation",
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
      title: "C# Console Application — Real-World Tool",
      description:
        "A useful command-line tool — pick a domain (file organiser, log analyser, simple ETL pipeline, JSON-to-CSV converter, Git-hooks helper). Built with .NET 9, C# 13, async file I/O, System.Text.Json, xUnit tests, plus a published NuGet package output. Demonstrates that C# is not just for big enterprise apps. Outcome: a public GitHub repository plus a NuGet listing — exactly what Pune .NET hiring panels look at first.",
      technologies: [
        ".NET 9 + C# 13",
        "Async file I/O",
        "System.Text.Json",
        "xUnit + FluentAssertions",
        "NuGet package publishing",
      ],
    },
    {
      title: "Domain Library with LINQ + Records + Pattern Matching",
      description:
        "A reusable C# library implementing a real-world domain (banking, inventory, scheduling). Records as primary domain types, pattern matching for state transitions, LINQ for queries, comprehensive xUnit tests, plus an example console app that demos the library. Demonstrates modern C# style and the discipline of writing testable, side-effect-free code.",
      technologies: [
        ".NET 9 + C# 13",
        "Records and pattern matching",
        "LINQ method syntax",
        "xUnit + FluentAssertions",
        "GitHub Actions CI",
      ],
    },
    {
      title: "ASP.NET Core Minimal API + JSON Service",
      description:
        "A small REST service using ASP.NET Core Minimal APIs — JWT auth (basic), dependency injection, Entity Framework Core in-memory or SQLite, OpenAPI / Swagger documentation, async endpoints, JSON via System.Text.Json. Deployed to Azure App Service or Render. Bridges into our .NET Full Stack track by introducing the patterns covered there at depth.",
      technologies: [
        ".NET 9 + ASP.NET Core",
        "Minimal APIs",
        "EF Core (in-memory / SQLite)",
        "Swashbuckle (OpenAPI)",
        "Azure App Service or Render",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Suraj Kudache (.NET Full Stack Trainer, 7+ years, Consultant at Capgemini, former Senior Software Developer at Archer Infotech). Suraj ships .NET for a living and personally leads every session of every batch — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "C# / .NET Developer is among the highest-demand enterprise roles in Pune in 2026 — Indeed Pune lists 1,300+ active openings, with the highest concentration in Pune captives (Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell), BFSI (Cognizant Pune Capital Markets, Bajaj Finserv .NET teams), Microsoft Pune R&D, and the IT services majors. Compensation tracks Java backend closely; BFSI .NET roles often pay a small premium.",
      "What pulls a C# developer above the median band: depth on LINQ + async / await, modern-C# fluency (records, pattern matching, nullable reference types), one production-style C# project on GitHub, and the discipline of writing testable, side-effect-free code. Our capstone projects are designed exactly around these signals. Most .NET / C# graduates progress directly to our .NET Full Stack track for the depth specialisation that turns C# fluency into a senior hireable role.",
      "Senior .NET / C# Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: ".NET / C# Developer (Pune)",
        band: "₹6,80,000 per year average",
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
        role: "Mid-level .NET Developer (Pune, 3–5 years)",
        band: "₹9,00,000 – ₹16,00,000 per year",
        source: {
          label: "Glassdoor Pune .NET Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-net-developer-salary-SRCH_IL.0,4_IM1072_KO5,18.htm",
        },
      },
      {
        role: "Senior .NET Developer (Pune, 5–8 years)",
        band: "₹15,00,000 – ₹26,00,000 per year",
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
      "Junior .NET / C# Developer",
      "ASP.NET Core Developer (with practice)",
      "Backend Developer (.NET)",
      "Software Engineer (Microsoft stack)",
      "Prerequisite met for our .NET Full Stack specialisation",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~2 months total). The original 3-month listing reflects an extended evening format with deeper ASP.NET / EF Core work.",
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
        "Same hours as classroom batches",
        "Recordings available for review",
        "Same code reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews",
        "Visual Studio 2026 or VS Code with C# Dev Kit",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~3.5 months instead of 2 to accommodate working professionals.",
    },
    batchPolicy: "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession. Most students take this as a stepping stone to .NET Full Stack — ask about the bundled C# + .NET Full Stack pricing.",
    range:
      "₹20,000 – ₹90,000 — bundled C# + .NET Full Stack enrolment offers significant savings.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled C# + .NET Full Stack enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6 of the course. By the time you finish the curriculum, your resume highlights modern C# fluency with at least one published NuGet package, your GitHub has at least two production-style repositories, and you have completed at least two mock technical interviews focused on entry-level .NET / C# Developer roles.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Most C# graduates progress directly to our .NET Full Stack course for the depth specialisation.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewrite, calibrated for .NET / C# JDs",
      "Week 7 — GitHub portfolio cleanup, NuGet listings, README polish",
      "Weeks 8–9 — two rounds of mock technical interviews",
      "Week 9 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune captives, BFSI, Microsoft Pune)",
      "Strong recommendation to enrol in our .NET Full Stack course as the natural next step",
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
      "We compare ourselves against typical Pune .NET / C# training institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Suraj Kudache",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: ".NET / C# version covered",
        archer: ".NET 9 + C# 13 — modern syntax, Native AOT, Minimal APIs",
        typical: "Often .NET Framework 4.8 with WCF / WebForms",
      },
      {
        feature: "Modern C# syntax",
        archer: "Records, pattern matching, nullable reference types, primary constructors",
        typical: "C# 6 / 7 only — pre-2020 syntax",
      },
      {
        feature: "LINQ depth",
        archer: "Method syntax + deferred execution + IEnumerable vs IQueryable",
        typical: "Query syntax basics only",
      },
      {
        feature: "Async / await depth",
        archer: "Cancellation + ConfigureAwait + Channel<T> + production failure modes",
        typical: "Basic async / await only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — published NuGet package + deployed Minimal API + xUnit-tested library",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Bundled pricing with .NET Full Stack",
        archer: "Yes — significant discount when combined",
        typical: "Per-course pricing only",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr with source URLs",
        typical: "Single number with no source",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student modern-C# code before you pay.",
  },

  versusAlternative: {
    heading: ".NET / C# vs Java — Which Should You Pick in Pune?",
    paragraphs: [
      ".NET / C# vs Java is the most-asked question in Pune enterprise-language counselling. The honest answer: both have ample Pune jobs, both pay similarly at every band, and the choice should be by which Pune companies you want to work for — not by which language is 'better'.",
      "Choose C# if your goal is Pune captive R&D centres (Mercedes-Benz, Cummins, John Deere, Honeywell — all heavily .NET), Cognizant Pune Capital Markets, BFSI .NET shops, or Microsoft Pune R&D. C# also pairs naturally with Azure for cloud-deployment paths (most Pune captives standardise on Azure rather than AWS).",
      "Choose Java if your goal is the IT services majors (TCS, Infosys, Wipro, Cognizant — all run more Java than .NET), Pune product engineering (Persistent, BMC, Synechron), or BFSI Java shops. Java's Pune market is roughly 1.4× .NET in raw openings.",
      "Honest recommendation: pick C# if you have a specific captive / Cognizant Capital Markets / Microsoft target. Pick Java if you want broader market reach. Many of our students stick with one for 2–3 years and add the second as a side skill once placed.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least basic programming background in any language (C, C++, Java, Python, JavaScript), basic understanding of OOP concepts, and willingness to commit 8–10 hours per week of practice outside class. We expect basic programming fluency on day 1; we do not start from 'what is a variable'. If you are an absolute beginner, do a Python or JavaScript foundation course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Visual Studio install, .NET 9 SDK)",
      "Show up to day one with a laptop running 64-bit Windows / macOS, 16GB+ RAM (recommended), and Visual Studio 2026 or VS Code with C# Dev Kit pre-installed",
    ],
  },

  faqs: [
    {
      question: "Which is the best .NET / C# training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed C# apps and CI badges, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does .NET / C# training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured curriculum plus 1 week of capstone and interview preparation. The original 3-month listing reflects an optional extended evening format. Weekend batches stretch over ~3.5 months at the same content depth.",
    },
    {
      question: "What is the salary of a C# / .NET Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.80 lakh per year for .NET / C# Developer (May 2026). Junior Pune entry sits at ₹3.5–6.5 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹9–16 lakh per Glassdoor. Senior .NET Developers (5–8 years) earn ₹15–26 lakh. .NET Tech Leads earn ₹24–42 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: ".NET / C# or Java — which should I pick in Pune?",
      answer:
        "C# if your goal is Pune captives (Mercedes-Benz, Cummins, John Deere, Honeywell), Cognizant Pune Capital Markets, BFSI .NET, or Microsoft Pune. Java if your goal is the IT services majors, Pune product engineering, or broader market reach. Java has roughly 1.4× more Pune openings; both pay similarly at equivalent experience.",
    },
    {
      question: "Do I need C# experience to join the course?",
      answer:
        "No — week 1 covers C# 13 from first principles. What we expect is at least basic programming background in any language. If you are an absolute beginner, do a Python or JavaScript foundation course first.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) C# console application with NuGet package publish, (2) reusable domain library with records + pattern matching + LINQ, (3) ASP.NET Core Minimal API service deployed to Azure or Render. All three become public GitHub repositories with passing CI badges.",
    },
    {
      question: "Are modern C# 11 / 12 / 13 features covered?",
      answer:
        "Yes — records, pattern matching (including list patterns from C# 11), nullable reference types, primary constructors (C# 12), file-scoped namespaces, raw string literals, and C# 13's params collections are all first-class throughout. We do not teach C# 6 / 7 as the default; that produces graduates who write 2017-style code.",
    },
    {
      question: "Should I take this course or jump straight to .NET Full Stack?",
      answer:
        "Take this course if you do not yet have C# fluency. The .NET Full Stack track assumes C# knowledge at the level this course produces; skipping ahead wastes the first weeks of the Full Stack course. Many students take this → .NET Full Stack as our bundled enrolment for combined savings.",
    },
    {
      question: "Are weekend .NET / C# classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months instead of 2.",
    },
    {
      question: "What is the fee for the .NET / C# course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. Bundled C# + .NET Full Stack enrolment offers significant savings.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for entry-level .NET / C# Developer roles, referrals via our alumni network (with extra emphasis on Pune captives, BFSI, Microsoft Pune), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. Strong recommendation and bundled discount to enrol in our .NET Full Stack course as the natural next step.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Suraj Kudache personally leads every session of every batch from Day 1 through capstone — he ships .NET for a living at Capgemini. The same name on this page is the same person you meet on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start .NET / C# training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Suraj is happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled C# + .NET Full Stack path makes more sense for your goal. Visit our Kothrud, Pune campus, see actual student deployed C# apps, meet a current batch, and decide with full information.",
  },
};
