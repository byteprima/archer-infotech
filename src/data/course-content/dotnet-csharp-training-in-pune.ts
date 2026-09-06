import type { CourseRichContent } from "./types";

export const dotnetCsharpTrainingInPune: CourseRichContent = {
  intro:
    "C# is the language of Microsoft's modern stack and a strong enterprise programming choice in Pune. Archer Infotech's C# training in Pune teaches the language itself in depth: C# 13 syntax, variables, control flow, methods, classes, object-oriented programming, records, interfaces, generics, collections, LINQ, exception handling, file and stream I/O, JSON handling, delegates, events, lambda expressions, async / await, testing and interview-ready projects. ASP.NET Core, Entity Framework, Azure and full-stack web development are separate follow-on courses; this page is the C# language foundation. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn C# in 2026",
    paragraphs: [
      "C# is widely used in Pune captives, BFSI teams, product companies and Microsoft-stack enterprise environments. Before a learner can write ASP.NET Core APIs or full-stack .NET applications, they need the language foundation: OOP, type system, collections, LINQ, exception handling, async programming and clean project structure.",
      "What changed in 2026: C# 13 builds on modern C# features such as nullable reference types, records, pattern matching, primary constructors, collection expressions and raw string literals. A C# course should not teach only old .NET Framework-era syntax. It should teach modern language features while keeping beginners grounded in fundamentals.",
      "What this means for hiring: Pune C# interviews still start with language questions before framework questions. Interviewers ask about classes, interfaces, generics, LINQ, IEnumerable, delegates, events, async / await, exception handling, file I/O, JSON, testing and small project design. This course focuses exactly there.",
    ],
    keyPoints: [
      "C# 13 language foundation with modern syntax and practical coding habits",
      "OOP, generics, collections, LINQ, delegates, events, async / await and testing",
      "Foundation for .NET Full Stack, ASP.NET Core, Azure and enterprise application tracks",
      "Useful for Pune captive, BFSI and Microsoft-stack hiring paths",
      "Modern C# syntax — records, pattern matching, nullable reference types, primary constructors",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting C# or Microsoft-stack roles in Pune",
      "Working programmer wanting to learn modern C# before ASP.NET Core or full-stack .NET",
      "Working developer in another language (Java, Python, JavaScript) wanting to add C# for the Pune captive / BFSI market",
      "Student preparing for our .NET Full Stack track — this C# foundation is the natural prerequisite",
      "Career restarter targeting Pune captive R&D centres where .NET is dominant",
      "First-time programmer with a strong Microsoft-ecosystem target (e.g., aiming at Microsoft Pune R&D)",
    ],
    notForYou: [
      "If your goal is web / frontend / mobile — JavaScript or Python is the better starting point",
      "If you cannot put in 8–10 hours per week of practice outside class — language fluency takes practice",
      "If you only want a certificate sticker with no portfolio — Pune .NET hiring screens hard on real PRs and deployed apps",
      "If you specifically want Pune SaaS / fintech startups — those skew Node.js / Python far more than .NET; pick MERN or Python Full Stack",
      "If you already write production C# confidently — you'll be under-stretched; jump directly to our .NET Full Stack track",
    ],
  },

  curriculum: [
    {
      title: "Syntax, Control Flow, Methods & Arrays",
      weekRange: "Week 1",
      description:
        "The procedural base of C#, covered precisely so nothing later rests on a guess. Value and reference types and the difference that actually matters when you assign one variable to another; `var` and implicit typing; constants and `readonly`; and the numeric types with their ranges and conversion rules.\n\nControl flow covers the full set including `switch` expressions, which are the modern form and appear throughout current C#. Methods cover parameters, `ref`, `out` and `in`, optional and named arguments, overloading and expression-bodied members. Arrays close the module alongside `List<T>`, with the honest note that you will use the list far more often.",
      topics: [
        "Value types versus reference types",
        "var, implicit typing and when to avoid it",
        "Constants, readonly and static readonly",
        "Numeric types, ranges and conversions",
        "if, switch statements and switch expressions",
        "Loops and foreach over collections",
        "Methods, parameters and return values",
        "ref, out and in parameters",
        "Optional, named arguments and overloading",
        "Arrays, multidimensional arrays and List<T>",
      ],
    },
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
      title: "Properties, Indexers & Encapsulation",
      weekRange: "Week 3",
      description:
        "C#'s answer to getters and setters, and one of the things it genuinely does better than Java. Auto-implemented properties, backing fields when you need logic, computed properties, `init`-only setters for immutable-after-construction objects, and required members.\n\nAccess modifiers are covered in full — including `internal` and `protected internal`, which most learners never use and every real codebase does. Object initialisers, indexers for classes that behave like collections, and the design judgement that runs through the module: a property should be cheap and side-effect free, and anything that is neither should be a method with a verb in its name.",
      topics: [
        "Auto-implemented properties and backing fields",
        "Computed and read-only properties",
        "init-only setters and required members",
        "Access modifiers, including internal",
        "Object and collection initialisers",
        "Indexers and collection-like types",
        "Encapsulation as design, not decoration",
        "Immutable object patterns",
        "When a property should be a method",
        "Validation inside a setter",
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
      title: "Interfaces, Abstract Classes & Records",
      weekRange: "Week 4",
      description:
        "The type-design half of C#. Interfaces including default implementations, explicit interface implementation for name collisions, and the standard interfaces you will implement constantly — `IEnumerable<T>`, `IComparable<T>`, `IEquatable<T>`, `IDisposable`.\n\nAbstract classes against interfaces with a clear rule for choosing, then records — reference and struct — which give value equality, deconstruction and non-destructive mutation with `with`, and are now the right default for DTOs and domain values. Structs and when a value type is genuinely the correct choice close the module, along with the boxing cost of getting that decision wrong in a hot loop.",
      topics: [
        "Interfaces and default implementations",
        "Explicit interface implementation",
        "IEnumerable, IComparable, IEquatable, IDisposable",
        "Abstract classes and abstract members",
        "Abstract class or interface — choosing correctly",
        "Records and value equality",
        "with expressions and non-destructive mutation",
        "Record structs and readonly structs",
        "When a struct is the right choice",
        "Boxing, unboxing and the cost of getting it wrong",
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
      title: "Delegates, Lambdas & Events",
      weekRange: "Week 5",
      description:
        "How C# treats behaviour as data, and the foundation LINQ is built on. Delegates as type-safe function references; `Func`, `Action` and `Predicate`; multicast delegates and their invocation order; and lambda expressions with their closure semantics — including capture of loop variables, which behaves differently from what beginners expect and produces a specific, memorable bug.\n\nEvents follow: the publisher-subscriber pattern, `EventHandler<T>`, raising events safely, and unsubscribing — because a subscriber that is never removed keeps its publisher alive and is the most common managed-memory leak in .NET applications.",
      topics: [
        "Delegates as type-safe function references",
        "Func, Action and Predicate",
        "Multicast delegates and invocation order",
        "Lambda expressions and expression-bodied members",
        "Closures and captured variables",
        "Events and the publisher-subscriber pattern",
        "EventHandler<T> and event conventions",
        "Raising events safely",
        "Unsubscribing and the listener leak",
        "Expression trees, and what LINQ providers do with them",
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
      title: "Pattern Matching, Tuples & Null Safety",
      weekRange: "Week 7",
      description:
        "The features that make current C# read very differently from C# of a few years ago, and that a 2026 interview panel expects you to have used. Pattern matching in full — type, constant, relational, logical, property, positional and list patterns — applied through `switch` expressions to replace chains of `if` that were never pleasant to read.\n\nTuples and deconstruction cover returning several values without inventing a class. Nullable reference types close the module: enabling the feature, reading its warnings, the null-forgiving operator and why reaching for it is usually an admission of defeat, and the migration path for an existing codebase.",
      topics: [
        "Type, constant and relational patterns",
        "Logical patterns with and, or, not",
        "Property and positional patterns",
        "List patterns and slices",
        "switch expressions over if chains",
        "Value tuples and deconstruction",
        "Named tuple elements",
        "Nullable value types and nullable reference types",
        "Null-conditional, null-coalescing and null-forgiving",
        "Enabling nullable checks on an existing codebase",
      ],
    },
    {
      title: "Serialization, Regex, Attributes & Reflection",
      weekRange: "Week 7",
      description:
        "How data leaves your program and how frameworks look inside it. `System.Text.Json` for serialisation — options, custom converters, naming policies and the round-trip problems that arise when a property has no setter. XML and binary formats are noted with their current status stated honestly.\n\nRegular expressions cover pattern syntax, the `Regex` class, compiled and source-generated regex. Attributes and reflection then explain the machinery behind ASP.NET Core, Entity Framework and every validation library you will use: reading metadata at runtime, instantiating types dynamically, and the performance cost that makes source generators the modern alternative.",
      topics: [
        "System.Text.Json — serialise, deserialise, options",
        "Custom converters and naming policies",
        "Round-trip problems and read-only properties",
        "Regex syntax and the Regex class",
        "Compiled and source-generated regex",
        "Built-in attributes and their meaning",
        "Writing custom attributes",
        "Reflection — types, members, instantiation",
        "Reading attributes at runtime",
        "Reflection cost and source generators",
      ],
    },
    {
      title: "Testing, Debugging & Code Quality in C#",
      weekRange: "Week 8",
      description:
        "Learn to prove that your C# code works. Cover debugger workflow in Visual Studio or VS Code, breakpoints, watches, call stack inspection, unit testing with xUnit, assertions with FluentAssertions, test naming, test data, mocking awareness, code coverage, nullable warnings, analyzers and refactoring repeated logic. The goal is to make small C# applications reliable before moving into ASP.NET Core or full-stack development.",
      topics: [
        "Visual Studio / VS Code debugger workflow",
        "Breakpoints, watches and call stack inspection",
        "xUnit unit testing",
        "FluentAssertions",
        "Test data and edge cases",
        "Mocking awareness",
        "Code coverage and analyzers",
        "Refactoring repeated logic",
      ],
    },
    {
      title: "SOLID Principles & Basic Design Patterns",
      weekRange: "Week 8",
      description:
        "The design layer that separates a C# developer from someone who writes C#. SOLID taught with concrete examples rather than definitions — single responsibility as a reason to split a class, open-closed through interfaces, Liskov through a substitution that breaks, interface segregation through a fat interface refactored, and dependency inversion as the principle behind every DI container you will use in ASP.NET Core.\n\nPatterns cover factory, strategy, repository, singleton and observer as they are actually written in C#, with an honest note on which are made largely unnecessary by delegates and dependency injection — because reciting patterns is easy and knowing when not to apply one is what interviews reward.",
      topics: [
        "Single responsibility as a splitting criterion",
        "Open-closed through interfaces",
        "Liskov substitution and where it breaks",
        "Interface segregation and fat interfaces",
        "Dependency inversion and DI containers",
        "Factory and abstract factory",
        "Strategy, and delegates as a lighter alternative",
        "Repository and unit of work",
        "Singleton, and why it is usually a lifetime setting",
        "Observer, and events as the built-in form",
      ],
    },
    {
      title: "Git, Solution Structure & Professional C# Practice",
      weekRange: "Week 8",
      description:
        "The habits and the project layout that make your work reviewable. Git as collaboration — branching, merging, conflicts, pull requests and a readable history — plus a `.gitignore` that keeps `bin` and `obj` out of the repository, which is the first thing a reviewer notices when it is missing.\n\nSolution structure covers projects, references, and separating a domain library from an application, so the solution reads as an architecture rather than one project with everything in it. NuGet covers packages, versioning and lock files; and code quality covers .editorconfig, analysers and the naming conventions that make C# look like C#.",
      topics: [
        "Branching, merging and resolving conflicts",
        "Commit messages a stranger can follow",
        "Pull requests and code review",
        ".gitignore for bin, obj and user files",
        "Solutions, projects and project references",
        "Separating a domain library from the application",
        "NuGet packages, versioning and lock files",
        ".editorconfig and shared style",
        "Roslyn analysers and warnings as errors",
        "C# naming conventions and readable structure",
      ],
    },
    {
      title: "DSA, Interview Patterns & C# Capstone",
      weekRange: "Week 9 + 1 week capstone",
      description:
        "Round out the C# course with problem-solving and a reviewed language-focused capstone. Practise arrays, strings, lists, dictionaries, sets, stacks, queues, recursion, sorting, searching and basic tree traversal using C#. Then build a console or class-library project that demonstrates OOP, records, LINQ, collections, async file I/O, JSON, error handling and tests. The final repository includes README, screenshots, setup instructions, tests and interview explanation notes.",
      topics: [
        "Arrays, strings, List<T>, Dictionary<TKey,TValue> and HashSet<T>",
        "Stacks, queues, recursion, sorting and searching",
        "Basic tree traversal",
        "Big-O time and space complexity",
        "C# capstone project implementation",
        "README, screenshots and setup notes",
        "GitHub Actions for build and test",
        "Resume + LinkedIn rewrite for C# JDs",
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

  roadmapImage: {
    src: "/images/courses/dotnet-csharp-programming-workflow-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage C sharp programming learning sequence at Archer Infotech Pune, covering C sharp foundations, object-oriented programming, records, interfaces, LINQ, collections, async await, task parallelism, file IO, JSON, delegates, events, lambda expressions, testing, DSA, capstone projects and interview preparation.",
    caption:
      "The C# course stays focused on the language: OOP, collections, LINQ, async programming, files, JSON, testing, DSA and a reviewed capstone.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/dotnet-csharp-programming-syllabus-v1.pdf",
    title: "C# Programming Course Syllabus — Complete Module List",
    slug: "dotnet-csharp-programming-syllabus",
    blurb:
      "The complete 59-module syllabus as a 30-page PDF — C# and .NET fundamentals, the full object-oriented sequence, properties and indexers, interfaces, records, nullable types, exception handling, collections and generics, delegates, lambdas and events, LINQ, pattern matching, file handling and serialisation, reflection, memory management, multithreading, the Task Parallel Library, async programming, testing, SOLID, design patterns, DSA, mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 30-page PDF",
        items: [
          "All 59 modules in teaching order, each with its topic list and practical exercises.",
          "LINQ across two modules — fundamentals and advanced concepts — plus delegates, lambdas, events and expression trees underneath it.",
          "Modern C#: records, pattern matching, tuples and deconstruction, nullable reference types, iterators and extension methods.",
          "Recommended lab assignments, suggested duration, prerequisites, tools, learning outcomes and the recommended progression after Core C#.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "C# Developer and Junior .NET Developer.",
          "The foundation before ASP.NET Core and .NET Full Stack.",
          "GCC captive and Microsoft-stack enterprise roles across Pune.",
          "Unity and game development, which assumes C# fluency.",
        ],
      },
    ],
  },

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
      title: "C# Async File and JSON Processing Tool",
      description:
        "A practical C# console tool that reads large text, CSV or JSON files, validates records, transforms data, writes reports and runs long file operations asynchronously with cancellation. It demonstrates language-level C# skill: async / await, streams, System.Text.Json, records, pattern matching, LINQ, exception handling and xUnit tests.",
      technologies: [
        "C# 13",
        ".NET SDK console app",
        "async / await",
        "System.Text.Json",
        "Streams",
        "LINQ",
        "xUnit + FluentAssertions",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Suraj Kudache (.NET Full Stack Trainer, 7+ years, Consultant at Capgemini, former Senior Software Developer at Archer Infotech). Suraj ships .NET for a living and personally leads every session of every batch — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "C# is a strong foundation for Pune Microsoft-stack careers. Salary rises with framework depth later, but beginners are first evaluated on language clarity: OOP, records, interfaces, generics, LINQ, async / await, exception handling, file/JSON work, tests and project explanation.",
      "What pulls a C# learner above the median fresher band: a public GitHub portfolio with language-focused C# projects, clean domain modelling, tested LINQ-heavy code, async file/JSON processing, and the ability to explain trade-offs. ASP.NET Core, Entity Framework, Azure and full-stack development can raise the ceiling later, but this course builds the language base.",
      "Senior .NET Developer bands below are included as longer-term context; this C# course prepares the prerequisite language foundation, not the full framework stack by itself.",
    ],
    salaryBands: [
      {
        role: "C# Developer (Pune)",
        band: "₹6,80,000 per year average",
        source: {
          label: "Indeed Pune (.NET Developer)",
          url: "https://in.indeed.com/career/.net-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior C# Developer (Pune entry, <2 years)",
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
      "Junior C# Developer",
      "C# Trainee Developer",
      "Software Engineer Trainee",
      "Application Support Engineer with C#",
      "Prerequisite met for our .NET Full Stack specialisation",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured C# language curriculum plus 1 week of capstone project and interview preparation (~2 months total). The 3-month listing reflects an extended evening format with more lab and interview-practice time.",
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
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession. This C# language course is also available as a stepping stone to .NET Full Stack.",
    range:
      "₹20,000 – ₹90,000 depending on format, lab support and placement-track option.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled C# + .NET Full Stack counselling available when that path fits",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6 of the course. By the time you finish the curriculum, your resume highlights modern C# fluency, your GitHub has language-focused repositories, and you have completed mock interviews focused on C# fundamentals and junior Microsoft-stack roles.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Many C# graduates progress to .NET Full Stack after this foundation.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewrite, calibrated for C# and junior .NET JDs",
      "Week 7 — GitHub portfolio cleanup, README polish and project explanation notes",
      "Weeks 8–9 — two rounds of mock technical interviews",
      "Week 9 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies (with extra emphasis on Pune captives, BFSI, Microsoft Pune)",
      "Next-path counselling for .NET Full Stack, ASP.NET Core and Azure after C#",
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
      "We compare ourselves against typical Pune C# training institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Suraj Kudache",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "C# version covered",
        archer: "C# 13 language features with modern syntax and practical console/class-library work",
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
        feature: "C# scope clarity",
        archer: "C# language only — ASP.NET Core, EF Core, Azure and full stack are routed to follow-on courses",
        typical: "Often mixes language, web APIs and database frameworks without a clear sequence",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — C# console tool, domain library and xUnit-tested DSA/capstone work",
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
    heading: "C# vs Java — Which Should You Pick in Pune?",
    paragraphs: [
      "C# vs Java is the most-asked question in Pune enterprise-language counselling. The honest answer: both have ample Pune jobs, both pay similarly at every band, and the choice should be by which Pune companies you want to work for — not by which language is 'better'.",
      "Choose C# if your goal is Pune captive R&D centres (Mercedes-Benz, Cummins, John Deere, Honeywell — all heavily .NET), Cognizant Pune Capital Markets, BFSI .NET shops, or Microsoft Pune R&D. C# also pairs naturally with Azure for cloud-deployment paths (most Pune captives standardise on Azure rather than AWS).",
      "Choose Java if your goal is the IT services majors (TCS, Infosys, Wipro, Cognizant — all run more Java than .NET), Pune product engineering (Persistent, BMC, Synechron), or BFSI Java shops. Java's Pune market is roughly 1.4× .NET in raw openings.",
      "Honest recommendation: pick C# if you have a specific captive / Cognizant Capital Markets / Microsoft target. Pick Java if you want broader market reach. Many of our students stick with one for 2–3 years and add the second as a side skill once placed.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, logical thinking and willingness to commit 8–10 hours per week of practice outside class. Prior programming helps, but the C# course begins with variables, control flow, methods and classes before moving into OOP, LINQ, async and testing.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Visual Studio install and .NET SDK setup)",
      "Show up to day one with a laptop running 64-bit Windows / macOS, 16GB+ RAM (recommended), and Visual Studio 2026 or VS Code with C# Dev Kit pre-installed",
    ],
  },

  faqs: [
    {
      question: "Which is the best C# training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with C# projects and tests, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does C# training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured C# language curriculum plus 1 week of capstone and interview preparation. Extended evening and weekend formats stretch the same content over a longer calendar.",
    },
    {
      question: "What is the salary of a C# Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.80 lakh per year for Microsoft-stack C# developer roles (May 2026). Junior Pune entry sits at ₹3.5–6.5 lakh per year per AmbitionBox. Mid-level C# developers with framework experience move into ₹9–16 lakh bands, but this course focuses on the C# language foundation first.",
    },
    {
      question: "C# or Java — which should I pick in Pune?",
      answer:
        "C# if your goal is Pune captives (Mercedes-Benz, Cummins, John Deere, Honeywell), Cognizant Pune Capital Markets, BFSI .NET, or Microsoft Pune. Java if your goal is the IT services majors, Pune product engineering, or broader market reach. Java has roughly 1.4× more Pune openings; both pay similarly at equivalent experience.",
    },
    {
      question: "Do I need C# experience to join the course?",
      answer:
        "No — week 1 covers C# from first principles. Prior programming helps, but the course begins with variables, data types, control flow, methods and classes before moving into OOP, LINQ, async and testing.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — C# language projects such as a console utility, reusable domain library, and async file/JSON processing tool. They use OOP, records, pattern matching, LINQ, collections, delegates/events, async / await, exception handling and xUnit tests.",
    },
    {
      question: "Are modern C# 11 / 12 / 13 features covered?",
      answer:
        "Yes — records, pattern matching (including list patterns from C# 11), nullable reference types, primary constructors (C# 12), file-scoped namespaces, raw string literals, and C# 13's params collections are all first-class throughout. We do not teach C# 6 / 7 as the default; that produces graduates who write 2017-style code.",
    },
    {
      question: "Should I take this course or jump straight to .NET Full Stack?",
      answer:
        "Take this course if you do not yet have C# fluency. The .NET Full Stack track assumes C# knowledge at the level this course produces; skipping ahead wastes the first weeks of the Full Stack course.",
    },
    {
      question: "Are weekend C# classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3.5 months instead of 2.",
    },
    {
      question: "What is the fee for the C# course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode, concession, lab support and placement-track option.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for C# fundamentals and entry-level Microsoft-stack roles, referrals via our alumni network, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Suraj Kudache personally leads every session of every batch from Day 1 through capstone — he ships .NET for a living at Capgemini. The same name on this page is the same person you meet on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start C# training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Suraj is happy to spend 30 minutes telling you whether C# is right for you, or whether another programming foundation fits your goal better. Visit our Kothrud, Pune campus, see actual student C# projects, meet a current batch, and decide with full information.",
  },
};
