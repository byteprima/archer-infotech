import type { CourseRichContent } from "./types";

export const javaTrainingInPune: CourseRichContent = {
  intro:
    "Java is among the most heavily-deployed enterprise programming languages globally — powering Fortune 500 backends, Android foundations, banking systems, product platforms, and the majority of Pune's IT-services hiring. Archer Infotech's Core Java training in Pune teaches the language itself in depth: Java 21 LTS syntax, JVM fundamentals, object-oriented programming, exception handling, collections, generics, streams, file handling, multithreading, JDBC, and interview-ready problem solving. Spring Boot and microservices are taught in the separate Spring Boot & Microservices course; this page is the Core Java foundation. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Java in 2026",
    paragraphs: [
      "Java is foundational, not legacy. Stack Overflow's enterprise survey shows roughly 60% of large-scale enterprise systems run on the JVM, and over 90% of Fortune 500 companies still maintain mission-critical Java codebases. LinkedIn India lists approximately 14% more open Java positions than Python ones, with around 1.1 lakh active Java postings as of early 2026. In Pune specifically, Java is the dominant backend language for the BFSI sector, the IT services majors (TCS, Infosys, Wipro, Cognizant), and product engineering teams at Persistent Systems, BMC Software, Bajaj Finserv, and Synechron.",
      "What changed is the language itself. Java 21 LTS (September 2023) shipped virtual threads via Project Loom, pattern matching for switch, sequenced collections, records, sealed classes and better garbage-collection behaviour. Java 25 LTS (September 2025) continues that modernisation. A Core Java course in 2026 should therefore not stop at Java 8-era syntax; it should teach the modern language while making the foundations clear enough for beginners.",
      "What this means for hiring: Pune job postings still screen beginners on Core Java before they test frameworks. Interviewers ask about OOP, collection internals, exception handling, strings, immutability, generics, multithreading, JDBC, SQL basics and problem solving. Archer Infotech's Core Java curriculum is rebuilt around that sequence, so learners can either apply for Java trainee / junior developer roles or move confidently into Java Full Stack, Spring Boot, Android or automation tracks.",
    ],
    keyPoints: [
      "Java 21 LTS — virtual threads, pattern matching, sequenced collections",
      "Core Java depth — OOP, exceptions, collections, generics, streams, I/O, JDBC",
      "Pune market reality — ~14% more Java jobs than Python on LinkedIn India",
      "BFSI + product engineering hiring — Persistent, BMC, Bajaj Finserv, Synechron",
      "Foundation for Java Full Stack, Spring Boot, Android, Selenium and enterprise backend paths",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA or BSc-CS student looking for your first full-time IT role in Pune",
      "Working professional in a non-Java stack wanting a strong Java foundation before Spring Boot or full stack",
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
      title: "Strings, Wrapper Classes, Enums & Autoboxing",
      weekRange: "Week 3",
      description:
        "The types Java programs actually spend their time on. Strings get proper treatment — immutability and why it exists, the string pool, `equals` against `==` (the interview question that eliminates more candidates than any other), and `StringBuilder` for the loops where concatenation quietly becomes quadratic.\n\nWrapper classes and autoboxing follow, including the caching behaviour that makes `Integer` comparison with `==` work for small numbers and fail for large ones — a bug that survives code review because it passes the test data. Enums are taught as full types with fields, constructors and methods, not as named constants, because that is what makes them worth using.",
      topics: [
        "String immutability and the string pool",
        "equals versus == and why it matters",
        "String methods, formatting and text blocks",
        "StringBuilder, StringBuffer and concatenation cost",
        "Wrapper classes and the primitive-object boundary",
        "Autoboxing, unboxing and the Integer cache trap",
        "Parsing, conversion and NumberFormatException",
        "Enums with fields, constructors and methods",
        "EnumMap, EnumSet and switch over enums",
        "Choosing the right type for a value",
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
      title: "Interfaces, Abstraction & Nested Classes",
      weekRange: "Week 4",
      description:
        "The design half of object orientation, where most learners' understanding stops being syntax and starts being judgement. Abstract classes against interfaces, and the honest rule for choosing: an abstract class models what something *is*, an interface models what it *can do*. Default and static methods in interfaces, and why they were added.\n\nNested, inner, static-nested, local and anonymous classes are covered because you will meet all five in real codebases, and because the difference between a static nested class and an inner class — one holds a reference to the enclosing instance, one does not — is a genuine source of memory leaks. Functional interfaces close the module and set up lambdas.",
      topics: [
        "Abstract classes and abstract methods",
        "Interfaces, default methods and static methods",
        "Abstract class or interface — choosing correctly",
        "Multiple inheritance of type through interfaces",
        "Marker interfaces and their role",
        "Static nested versus inner classes",
        "Local and anonymous classes",
        "Anonymous classes as a precursor to lambdas",
        "Functional interfaces and @FunctionalInterface",
        "Designing an API around interfaces",
      ],
    },
    {
      title: "Exception Handling, Packages & File I/O",
      weekRange: "Week 5",
      description:
        "Move from writing small programs to organising real Java code. Learn packages, imports, access control across packages, JAR structure, and the discipline of separating model, service and utility classes. Then go deep on exception handling — checked vs unchecked exceptions, custom exceptions, try-with-resources and meaningful error messages. File handling covers java.io and java.nio, text files, CSV-style data, serialization awareness, and safe resource management so your programs can read, write and recover cleanly.",
      topics: [
        "Packages, imports and project structure",
        "Access modifiers across classes and packages",
        "Checked vs unchecked exceptions",
        "Custom exception classes",
        "try, catch, finally and try-with-resources",
        "java.io and java.nio file handling",
        "Reading and writing text and CSV-style files",
        "Serialization awareness and safe resource cleanup",
      ],
    },
    {
      title: "Date-Time API, Regular Expressions & Text Processing",
      weekRange: "Week 5",
      description:
        "Two everyday jobs that Java made genuinely pleasant only recently. The `java.time` API replaced a legacy design so error-prone that its replacement is one of the strongest arguments for keeping a codebase current: `LocalDate`, `LocalDateTime`, `Instant`, `Duration`, `Period`, time zones and formatting, all immutable and thread-safe.\n\nRegular expressions cover pattern syntax, groups, quantifiers, greedy versus lazy matching, and the `Pattern` and `Matcher` API — plus the discipline of knowing when a regex is the wrong tool, which is more often than enthusiasts admit. You build a text-processing utility that parses, validates and reformats real input.",
      topics: [
        "LocalDate, LocalTime, LocalDateTime and Instant",
        "Duration, Period and date arithmetic",
        "Time zones, offsets and ZonedDateTime",
        "Formatting and parsing with DateTimeFormatter",
        "Why the legacy Date and Calendar API was replaced",
        "Regex syntax — character classes, anchors, quantifiers",
        "Groups, capturing and back-references",
        "Greedy versus lazy matching",
        "Pattern and Matcher in practice",
        "When a regular expression is the wrong tool",
      ],
    },
    {
      title: "Lambda Expressions & Functional Interfaces",
      weekRange: "Week 6",
      description:
        "The shift from writing loops to describing transformations, and the foundation the Stream API is built on. Lambda syntax and the type inference behind it; method references in all four forms; and the built-in functional interfaces — `Function`, `Predicate`, `Consumer`, `Supplier`, `BiFunction` and the primitive specialisations that exist to avoid boxing in hot code.\n\nEffectively-final capture is covered carefully, because it is the source of the compiler error every learner hits and few can explain. The module closes on composing functions with `andThen` and `compose`, and writing your own functional interface when the built-in set does not fit.",
      topics: [
        "Lambda syntax and target typing",
        "Method references — static, instance, arbitrary, constructor",
        "Function, Predicate, Consumer, Supplier",
        "BiFunction and the primitive specialisations",
        "Effectively-final capture and the compiler error",
        "Composing with andThen and compose",
        "Writing custom functional interfaces",
        "Lambdas versus anonymous classes",
        "Where lambdas hurt readability",
        "Debugging code written with lambdas",
      ],
    },
    {
      title: "Collections, Generics & Streams",
      weekRange: "Weeks 6–7",
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
      weekRange: "Week 8",
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
      title: "Memory Management & Garbage Collection",
      weekRange: "Week 8",
      description:
        "What the JVM is doing while your program runs, and why it matters in interviews and in production. The runtime memory areas — heap, stack, metaspace — and what lives where; object lifecycle and reachability; and generational collection with the young and old generations and why most objects die young.\n\nThe collectors are compared as engineering choices rather than trivia: G1 as the default, ZGC and Shenandoah for low-pause requirements, and what each trades away. Memory leaks in a garbage-collected language get their own section, because they absolutely happen — static collections that grow, listeners never removed, inner classes holding an enclosing reference — and finding one is a genuine skill.",
      topics: [
        "Heap, stack and metaspace",
        "Object lifecycle and reachability",
        "Generational collection and the weak generational hypothesis",
        "Minor, major and full collections",
        "G1, ZGC and Shenandoah compared",
        "Stop-the-world pauses and latency",
        "Memory leaks in a garbage-collected language",
        "Strong, soft, weak and phantom references",
        "Reading heap dumps and using a profiler",
        "JVM flags worth knowing and ones to leave alone",
      ],
    },
    {
      title: "JDBC & SQL Connectivity",
      weekRange: "Week 9",
      description:
        "Connect Core Java programs to relational databases using JDBC. Learn the driver model, Connection, Statement, PreparedStatement, ResultSet, transactions, commit / rollback, and connection-pool awareness. The goal is not to hide SQL behind a framework; it is to understand how Java talks to a database before you ever touch Hibernate or Spring Data. You will build a small DAO layer for a student or inventory database and practise the SQL queries that Pune junior Java interviews commonly test.",
      topics: [
        "JDBC driver setup for MySQL or PostgreSQL",
        "Connection, Statement and PreparedStatement",
        "ResultSet handling and type mapping",
        "Transactions — commit, rollback and isolation awareness",
        "DAO pattern in plain Core Java",
        "SQL joins, filters and aggregate queries for interviews",
        "Connection-pool awareness before frameworks",
      ],
    },
    {
      title: "Annotations, Reflection & Modern Java Features",
      weekRange: "Week 9",
      description:
        "How frameworks do what they appear to do by magic. Annotations — built-in, custom, retention policies and targets — then reflection: inspecting classes at runtime, reading annotations, and instantiating objects dynamically. Once you have written a tiny dependency-injection container of your own, Spring stops being mysterious, and that is the point of this module.\n\nModern Java closes it: records for data carriers, sealed classes for closed hierarchies, pattern matching for `instanceof` and `switch`, text blocks, and `var`. These are the features a 2026 interview panel expects you to have used, and the ones that make current Java read very differently from Java 8.",
      topics: [
        "Built-in annotations and their meaning",
        "Custom annotations, retention and targets",
        "Reflection — classes, fields, methods, constructors",
        "Reading annotations at runtime",
        "Building a miniature DI container",
        "The performance and safety cost of reflection",
        "Records as transparent data carriers",
        "Sealed classes and closed hierarchies",
        "Pattern matching for instanceof and switch",
        "Text blocks and var",
      ],
    },
    {
      title: "Data Structures, Algorithms & Problem Solving in Java",
      weekRange: "Week 10",
      description:
        "Use Java to solve the patterns that appear in fresher and junior-developer screening rounds. This is not random LeetCode grinding. We connect data-structure theory to Java implementation: arrays, strings, lists, stacks, queues, hash maps, sets, recursion, sorting, searching and basic tree traversal. Each problem is reviewed for time complexity, space complexity, edge cases, naming and testability. By the end of the module, students can explain not only the answer but why the chosen collection or algorithm is appropriate.",
      topics: [
        "Arrays and strings interview patterns",
        "Linked lists, stacks and queues",
        "HashMap and HashSet problem patterns",
        "Sorting, searching and two-pointer techniques",
        "Recursion and backtracking basics",
        "Tree traversal fundamentals",
        "Big-O time and space complexity",
        "JUnit tests for algorithmic code",
      ],
    },
    {
      title: "Debugging, Unit Testing & Build Tools",
      weekRange: "Week 10",
      description:
        "The working practices that separate someone who writes Java from someone employable as a Java developer. Debugging as a method — breakpoints, conditional breakpoints, watches, stepping, evaluating expressions live, and reading a stack trace properly instead of pasting it into a search engine.\n\nJUnit 5 covers test structure, assertions, parameterised tests and lifecycle; Mockito covers mocking collaborators without pretending it is a substitute for design. Maven and Gradle are then taught as what they are — dependency management, the build lifecycle, and reproducible builds — because \"it works on my machine\" stops being acceptable the moment you join a team.",
      topics: [
        "Breakpoints, conditional breakpoints and watches",
        "Stepping, frames and live expression evaluation",
        "Reading a stack trace and finding the real cause",
        "JUnit 5 structure, assertions and lifecycle",
        "Parameterised and nested tests",
        "Mockito — stubbing, verifying and when not to mock",
        "Test coverage and what it does not prove",
        "Maven — POM, dependencies, build lifecycle",
        "Gradle basics and when teams choose it",
        "Reproducible builds and dependency conflicts",
      ],
    },
    {
      title: "Git, GitHub & Professional Java Practices",
      weekRange: "Week 10",
      description:
        "The habits that make your work reviewable, and your portfolio credible. Git as collaboration rather than as three memorised commands: branching, merging, rebasing, resolving conflicts calmly, pull requests and review etiquette, and a commit history a stranger can follow.\n\nProfessional practice covers Java naming and code conventions, package structure, Javadoc worth writing, static analysis with SonarLint or SpotBugs, and the readability habits that get code approved rather than sent back. You finish with a public repository containing a README that explains how to build and run the project — which is the artefact a Pune hiring panel actually opens.",
      topics: [
        "Branching strategy and pull-request workflow",
        "Merging, rebasing and resolving conflicts",
        "Writing commits a stranger can follow",
        "Code review — giving and receiving",
        "Java naming and code conventions",
        "Package structure and layering",
        "Javadoc that is worth writing",
        "Static analysis with SonarLint and SpotBugs",
        "README and project documentation",
        "Building a credible public portfolio repository",
      ],
    },
    {
      title: "Core Java Capstone & Interview Preparation",
      weekRange: "Weeks 11–12 + placement prep",
      description:
        "Bring the Core Java syllabus together in a reviewed capstone project. Pick a student management system, inventory and billing application, banking transaction simulator, library management system or file-backed utility. The trainer reviews class design, package structure, exception handling, collections usage, JDBC layer, test cases and README quality. Interview preparation covers Core Java viva questions, coding rounds, OOP design explanations, collection internals, multithreading basics, JDBC questions, resume cleanup and GitHub portfolio polish.",
      topics: [
        "Core Java capstone implementation",
        "Class design, package structure and layered code",
        "JDBC-backed or file-backed persistence",
        "JUnit test cases for key flows",
        "Code review with the lead trainer",
        "Core Java technical mock interviews",
        "DSA quick refresher for screening rounds",
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

  roadmapImage: {
    src: "/images/courses/java-programming-workflow-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Core Java learning sequence at Archer Infotech Pune, starting with Java fundamentals and object-oriented programming, then exception handling, packages, file input output, collections, generics, streams, multithreading, JDBC, SQL connectivity, data structures, algorithms, capstone projects and interview preparation.",
    caption:
      "The Java course stays focused on Core Java: JVM fundamentals, OOP, exceptions, collections, threads, JDBC, DSA and a reviewed capstone.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/java-programming-syllabus-v1.pdf",
    title: "Core Java Programming Course Syllabus — Complete Module List",
    slug: "java-programming-syllabus",
    blurb:
      "The complete 60-module syllabus as a 31-page PDF — Java fundamentals and architecture, the full object-oriented sequence, exception handling, the Collections Framework, generics, I/O and NIO, the Date-Time API, lambdas and the Stream API, multithreading and concurrency, memory management, reflection, modern Java features, JDBC, testing, build tools, DSA, mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 31-page PDF",
        items: [
          "All 60 modules in teaching order, each with its topic list and practical exercises.",
          "The full Collections Framework broken out module by module — List, Set, Map, Queue and Deque implementations, generics, Comparable and Comparator.",
          "Modern Java given real space: lambdas, functional interfaces, the Stream API, Optional, records, sealed classes and virtual threads.",
          "Recommended lab assignments, suggested duration, prerequisites, tools, learning outcomes and the recommended progression after Core Java.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Core Java Trainee and Junior Java Developer.",
          "Software Engineer fresher at Pune services majors and GCC captives.",
          "A clean foundation before Spring Boot, Java Full Stack, Android or Selenium.",
          "Backend Developer once Spring and databases are added.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Core Java Student Management System",
      description:
        "Build a layered Core Java application for student admissions, courses, marks and reports. The project uses OOP domain classes, packages, validation, custom exceptions, collections, file import/export and a JDBC-backed database option. Outcome: a public GitHub repository with clean package structure, README, screenshots, sample data and JUnit tests for the important flows.",
      technologies: [
        "Core Java 21",
        "OOP",
        "Collections Framework",
        "Custom Exceptions",
        "File I/O",
        "JDBC",
        "MySQL or PostgreSQL",
        "JUnit 5",
      ],
    },
    {
      title: "Inventory and Billing Application",
      description:
        "Create an inventory and billing system that manages products, suppliers, purchase entries, sale invoices and low-stock reports. The emphasis is Core Java design: classes, interfaces, collections, sorting/filtering, exception-safe operations, JDBC transactions and report generation. This project gives interviewers something concrete to ask about without requiring Spring Boot.",
      technologies: [
        "Core Java 21",
        "Interfaces",
        "Generics",
        "Streams",
        "JDBC Transactions",
        "SQL Joins",
        "JUnit 5",
      ],
    },
    {
      title: "Collections and DSA Practice Library",
      description:
        "Implement a small learning library of Java data-structure and algorithm examples: custom stack, queue, linked list, hash-map usage patterns, sorting/searching utilities, recursion examples and tree traversal exercises. Each implementation includes complexity notes and tests, turning interview preparation into a reusable GitHub asset.",
      technologies: [
        "Core Java 21",
        "Collections",
        "Generics",
        "Algorithms",
        "Big-O Notes",
        "JUnit 5",
        "GitHub README",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by trainers who write production Java for a living, not full-time educators reading from a slide deck. Both lead trainers below personally take sessions in every batch — the names on this page are the names you will meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Core Java is the entry foundation for many Pune developer roles. Salary depends on interview performance, OOP clarity, collection internals, JDBC basics, problem-solving ability and project quality. Below are real Pune-market Java salary figures from Indeed and PayScale — we show both because published salary sources vary and the truth usually sits between them.",
      "What pulls a Core Java learner above the average fresher band: a public GitHub portfolio with clean Core Java projects, confidence explaining OOP decisions, collections usage, exception handling, JDBC transactions and DSA trade-offs. Spring Boot, microservices and cloud can raise the ceiling later, but this course is where that base is built.",
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
      "Core Java Developer",
      "Junior Software Engineer",
      "Java Trainee Developer",
      "Software Engineer at IT services",
      "Application Support Engineer with Java",
      "Automation Tester with Java foundation",
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
        feature: "Core Java scope clarity",
        archer: "Core Java only — Spring Boot and microservices are routed to the separate specialisation course",
        typical: "Often mixes Core Java, Advanced Java and framework claims without a clear sequence",
      },
      {
        feature: "JDBC and database connectivity",
        archer: "Covered through plain JDBC, PreparedStatement, ResultSet, transactions and DAO pattern",
        typical: "Often skipped or replaced too quickly by framework demos",
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
        "Indeed Pune (December 2025) reports ₹3.62 lakh for Junior Java Developer, ₹8.32 lakh overall average, ₹9.95 lakh for Senior Java Developer, and ₹23.19 lakh for Lead Java Software Engineer. PayScale's averages run about 35% lower (₹6.13 lakh overall). For freshers, your actual number depends on Core Java clarity, problem-solving ability, project quality and interview performance.",
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
        "Yes — Core Java projects such as a Student Management System, Inventory and Billing Application, and Collections/DSA Practice Library. The projects use OOP, collections, exception handling, file I/O, JDBC, SQL and JUnit. They end up as public GitHub repositories that you can reference in interviews.",
    },
    {
      question: "Is Spring Boot included in this Core Java course?",
      answer:
        "No. This page is for Core Java training: Java syntax, OOP, exceptions, packages, file I/O, collections, generics, streams, multithreading, JDBC, SQL basics, DSA and capstone work. Spring Boot, REST APIs, Spring Security, microservices and cloud deployment are covered in the separate Spring Boot & Microservices course.",
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
        "Core Java is the language foundation: syntax, OOP, exceptions, packages, collections, generics, streams, multithreading, file I/O, JDBC and problem solving. Advanced Java usually means frameworks and enterprise layers such as servlets, Spring Boot, JPA/Hibernate, REST APIs and microservices. This course stays focused on Core Java; the advanced/framework path is handled in separate courses.",
    },
    {
      question: "How is this different from your Java Full Stack course?",
      answer:
        "This Java Training in Pune programme is the Core Java foundation course. It focuses on the language, OOP, collections, threads, JDBC, DSA and Core Java projects. The Java Full Stack course is longer and adds Spring Boot, REST APIs, frontend development, databases, deployment and full-stack capstone work. Many students start with Core Java and then choose Java Full Stack or Spring Boot based on their target role.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil (Founder & Director, 15+ years) personally leads the core programming sessions. Amol Patil (Senior Corporate Trainer, 10+ years) supports Java, JDBC, project review and interview-prep sessions. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Java training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Amol are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, meet a current batch, and decide with full information.",
  },
};
