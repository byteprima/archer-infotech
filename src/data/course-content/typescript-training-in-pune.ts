import type { CourseRichContent } from "./types";

export const typescriptTrainingInPune: CourseRichContent = {
  intro:
    "TypeScript has crossed 80% adoption on new Pune product code in 2026 — every Pune SaaS, fintech, and product engineering team writes TypeScript by default; pure-JavaScript projects are increasingly a refactor target rather than a starting point. Archer Infotech's TypeScript training in Pune teaches the language as it is actually used in 2026 — TypeScript 5.5+, the type system at the depth real engineers use (generics, conditional types, mapped types, template literal types, the utility-types library), TypeScript with React + Node + Next, declaration files for untyped npm packages, plus the modern toolchain (tsx for fast TS-on-Node, the Node 22 type-stripping mode that runs TS without a compile step, ESLint + Prettier). The course is the right standalone deepening for working JavaScript developers and the natural prerequisite-extender for our React, Angular, Node.js, and Next.js tracks. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn TypeScript in 2026",
    paragraphs: [
      "TypeScript is no longer optional in Pune product engineering — Indeed Pune lists 1,800+ active openings that explicitly require TypeScript, and another ~2,500 React / Angular / Node openings list it as 'preferred' (which in Pune product engineering means 'expected'). The biggest employers asking for TypeScript at depth are Persistent Systems, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, BMC Software, Amagi, Fyllo, BharatPe Pune, Razorpay Pune, plus most Pune fintech and SaaS startups. Compensation for typed-codebase engineers tracks 10–20% above pure-JavaScript engineers at equivalent experience.",
      "What changed in 2026: TypeScript 5.5+ ships isolatedDeclarations, regular-expression syntax checking, inferred type predicates, plus continued improvements to inference. The toolchain has matured significantly — tsx for fast TypeScript-on-Node development, Node 22 LTS's experimental type-stripping mode (run TS files directly), Vite for browsers (TS as default), Bun's native TS support. Decorators are stable. The discipline has settled — `strict: true` with all strict flags enabled is the production default; non-strict TypeScript is increasingly seen as an anti-pattern.",
      "What this means for hiring: 2026 Pune frontend / backend JDs expect TypeScript fluency at a level that lets you read real production code (mapped types, conditional types, type guards), and ideally one library / framework integration depth (React with TS, Express / Fastify with TS, or NestJS). Senior roles add advanced type modelling, declaration-file authoring, and the discipline of designing APIs that produce useful errors at the type level. Archer Infotech's curriculum is rebuilt around exactly these expectations — production-realistic types, framework-aware, tooling-current.",
    ],
    keyPoints: [
      "1,800+ active openings on Indeed Pune that explicitly require TypeScript (May 2026)",
      "TypeScript adoption crossed 80% on new Pune product code",
      "10–20% compensation premium for typed-codebase engineers at equivalent experience",
      "TypeScript 5.5+ — inferred type predicates, isolatedDeclarations, decorators stable",
      "Node 22 type-stripping + tsx — run TS without a compile step",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working JavaScript developer wanting to add TypeScript to your toolkit",
      "Frontend / backend / full-stack engineer at a Pune team that is migrating to TypeScript",
      "Engineering or BCS / MCA student preparing for our React / Angular / Node / Next.js tracks (where TypeScript is the default)",
      "Working developer in another language (Python, .NET, Java) who needs to onboard a TypeScript codebase quickly",
      "Senior JavaScript engineer wanting to lead a TS migration credibly",
    ],
    notForYou: [
      "If you have no JavaScript experience — take our JavaScript course first; TypeScript is a layer on top",
      "If you cannot put in 6–8 hours per week of practice outside class — type-system depth requires practice on real codebases",
      "If you only want a certificate sticker with no portfolio — Pune product engineering screens hard on real typed code",
      "If you have 2+ years of production TypeScript experience with `strict: true` — you'll be under-stretched; jump to advanced React / NestJS / Next.js tracks",
    ],
  },

  curriculum: [
    {
      title: "TypeScript Foundations & Toolchain",
      weekRange: "Week 1",
      description:
        "TypeScript from a JavaScript-aware starting point. Cover the type system foundations (primitives, arrays, tuples, objects, functions, the type vs interface distinction), strict null checks, type inference (where it works, where you need explicit annotations), the modern toolchain — tsx for fast TypeScript-on-Node, the Node 22 type-stripping mode that runs TS without a compile step, Vite for browsers with TypeScript as default, ESLint + Prettier configured for typed code. By the end of week 1 every student has a TypeScript-only project running on Node 22 with passing CI.",
      topics: [
        "Type vs interface — when each fits",
        "Primitives, arrays, tuples, objects, functions",
        "Strict null checks and `strict: true`",
        "Type inference vs explicit annotations",
        "tsx and Node 22 type-stripping",
        "Vite + TypeScript",
        "ESLint + Prettier for typed code",
      ],
    },
    {
      title: "Core Types, Tuples, Enums & Assertions",
      weekRange: "Week 1",
      description:
        "The type system's ground floor, covered properly so that nothing later rests on a guess. Primitives and inference; arrays and tuples and when a fixed-length tuple genuinely says more than an array; object types with optional and readonly members; and the four special types that beginners misuse most — `any`, `unknown`, `never` and `void`.\n\n`any` versus `unknown` gets particular attention, because reaching for `any` is how a TypeScript codebase quietly becomes a JavaScript codebase with extra syntax. Enums, `as const`, and type assertions close the module, along with a clear statement of when an assertion is a legitimate escape hatch and when it is a lie you will pay for at runtime.",
      topics: [
        "Primitives, inference and explicit annotation",
        "Arrays, readonly arrays and tuples",
        "Object types, optional and readonly members",
        "any versus unknown — and why the difference matters",
        "never and void, and where each appears",
        "Union and intersection types",
        "Literal types and literal widening",
        "Enums, const enums and their trade-offs",
        "as const and literal inference",
        "Type assertions and non-null assertions, used honestly",
      ],
    },
    {
      title: "Generics, Utility Types & Type Manipulation",
      weekRange: "Week 2",
      description:
        "Generics are where TypeScript stops being 'JS with types' and becomes a real type system. Cover function generics, class generics, generic constraints (`<T extends Foo>`), the utility types every TypeScript developer uses (Pick, Omit, Partial, Required, ReturnType, Parameters, Awaited, NonNullable), plus the type-level operations that build them — keyof, typeof, the indexed-access type. We finish by reading the type definitions of a real npm package so you internalise what production type-modelling looks like.",
      topics: [
        "Function and class generics",
        "Generic constraints",
        "Utility types — Pick, Omit, Partial, Required",
        "ReturnType, Parameters, Awaited",
        "keyof, typeof, indexed access types",
        "Reading real npm package types",
      ],
    },
    {
      title: "Classes, Inheritance & Object-Oriented TypeScript",
      weekRange: "Week 2",
      description:
        "The object model, and the parts TypeScript adds on top of JavaScript's. Classes, fields, constructors and parameter properties; access modifiers and the genuine difference between TypeScript's `private` and JavaScript's `#private`; inheritance and abstract classes; and implementing interfaces.\n\nThis material is what makes Angular, NestJS and much of the Node ecosystem legible — decorators, injectable services and controller classes are all built on it. The module also covers when not to reach for a class, since a good deal of TypeScript is better written as functions over plain data.",
      topics: [
        "Classes, fields, constructors and parameter properties",
        "public, private, protected and readonly",
        "TypeScript private versus JavaScript #private",
        "Inheritance, super and method overriding",
        "Abstract classes and abstract members",
        "Implementing interfaces with classes",
        "Static members and static blocks",
        "Getters, setters and computed access",
        "Decorators and metadata",
        "When a class is the wrong tool",
      ],
    },
    {
      title: "Conditional, Mapped & Template Literal Types",
      weekRange: "Week 3",
      description:
        "The advanced type-system features that separate TS readers from TS authors. Cover conditional types (`T extends U ? X : Y`), the `infer` keyword for type extraction, distributive conditional types and how `T extends infer U` distributes over unions, mapped types (`{ [K in keyof T]: ... }`), key remapping with `as`, plus template literal types (the source of TypeScript's expressive route-type / API-type modelling). We finish by reading and authoring small chunks of a real type-heavy library (zod / drizzle / trpc style).",
      topics: [
        "Conditional types",
        "infer keyword for type extraction",
        "Distributive conditional types",
        "Mapped types",
        "Key remapping with `as`",
        "Template literal types",
        "Reading type-heavy libraries (zod / drizzle / trpc style)",
      ],
    },
    {
      title: "Modules, Declaration Files & Third-Party Typings",
      weekRange: "Week 3",
      description:
        "How TypeScript understands code it did not compile. ES modules, import and export forms, and module resolution — which is the source of a large share of the confusing errors beginners hit, because the compiler is looking somewhere you did not expect.\n\nDeclaration files are then demystified: what a `.d.ts` actually contains, how DefinitelyTyped and `@types` packages work, how to write typings for an untyped library rather than giving up and using `any`, module augmentation, and declaration merging. Namespaces are covered as legacy you will meet in older codebases and should not write new.",
      topics: [
        "ES modules — named, default and re-exports",
        "Module resolution and path mapping",
        "Reading a module-not-found error properly",
        "Declaration files and what .d.ts contains",
        "DefinitelyTyped and @types packages",
        "Writing typings for an untyped library",
        "Module augmentation and global declarations",
        "Declaration merging",
        "Namespaces as legacy",
        "Publishing types alongside a package",
      ],
    },
    {
      title: "Type Guards, Narrowing & Discriminated Unions",
      weekRange: "Week 4",
      description:
        "Real production TypeScript spends a lot of time refining types. Cover type narrowing (typeof, instanceof, in operator, equality narrowing, control-flow analysis), user-defined type guards (with `is`-predicates), the new TypeScript 5.5+ inferred type predicates, assertion functions, plus discriminated unions — the design pattern that makes most production TypeScript types pleasant. We finish by modelling a real domain (a state machine, a parsed expression tree, an API response variant) using discriminated unions.",
      topics: [
        "Type narrowing — typeof, instanceof, in",
        "Equality narrowing and control-flow analysis",
        "User-defined type guards (`is` predicates)",
        "Inferred type predicates (TS 5.5+)",
        "Assertion functions",
        "Discriminated unions",
        "Exhaustiveness checking",
      ],
    },
    {
      title: "Async, Errors & Custom Error Types",
      weekRange: "Week 4",
      description:
        "Typing the parts of a program that fail. Promises and their generic parameter, async/await with correct return types, and concurrent operations with `Promise.all` and `allSettled` — including the typing subtleties that make the difference between a useful result type and a union you have to unpick by hand.\n\nError handling is where TypeScript is least helpful by default: a caught value is `unknown`, and narrowing it is your job. You build a custom error hierarchy, learn to type-guard errors properly, and meet the Result type pattern — returning failures as values rather than throwing — which is increasingly common in TypeScript codebases and worth being able to argue about either way.",
      topics: [
        "Promise<T> and typed async functions",
        "Promise.all, allSettled, race — and their result types",
        "Typing a caught error, which is unknown",
        "Custom error classes and an error hierarchy",
        "instanceof narrowing for errors",
        "The Result and Either pattern",
        "Errors as values versus thrown exceptions",
        "Typed retries and timeouts",
        "Async iterators and generators",
        "Error handling across module boundaries",
      ],
    },
    {
      title: "DOM, Events & Runtime Validation",
      weekRange: "Week 4",
      description:
        "The boundary where types stop being guaranteed. TypeScript checks what you compile; it cannot check the JSON that arrives from an API, the value in a form field, or an environment variable — and code that assumes otherwise fails in production while type-checking perfectly.\n\nYou type DOM queries and events properly, then move to the real subject: runtime validation with Zod, parsing rather than asserting external data, and deriving static types from a validation schema so the type and the check can never drift apart. Type-safe environment variables and configuration close the module — a small pattern that prevents a specific and very common production failure.",
      topics: [
        "Typing DOM queries and element types",
        "Event types and typed handlers",
        "Why external data is not type-safe",
        "Runtime validation with Zod",
        "Parsing versus asserting",
        "Inferring static types from a schema",
        "Typing fetch responses honestly",
        "Type-safe environment variables",
        "Type-safe configuration objects",
        "Validating at the boundary, trusting inside",
      ],
    },
    {
      title: "TypeScript with React & Next",
      weekRange: "Week 5",
      description:
        "TypeScript in the React ecosystem. Cover typing component props (with default values, with required vs optional, with children), useState / useEffect / useReducer with proper types, custom hooks with generics, refs, event handlers, plus the integration with libraries (TanStack Query types, React Hook Form + Zod inference, React Router 7 types). For Next.js — typed routes (the App Router type augmentation), Server Components types, Server Actions with FormData types. By the end of week 5 every student has a typed React + Next app deployed.",
      topics: [
        "Component props — required, optional, children",
        "Hook types — useState, useEffect, useReducer",
        "Custom hooks with generics",
        "Event handler types",
        "TanStack Query + React Hook Form + Zod integration",
        "Next.js — typed routes, Server Components",
        "Server Actions and FormData types",
      ],
    },
    {
      title: "TypeScript with Node, Express, Fastify & NestJS",
      weekRange: "Week 6",
      description:
        "TypeScript on the backend. Cover Node.js + TypeScript (tsx for dev, esbuild / tsc for prod, declaration-file authoring), Express + TypeScript (typing middleware, request / response, async error handling), Fastify with its schema-driven validation that turns Zod schemas into both runtime validation AND inferred TypeScript types, plus NestJS — the framework whose dependency-injection patterns showcase TypeScript at its best. Finish with declaration-file authoring (.d.ts files) for the cases when an npm package lacks types.",
      topics: [
        "Node.js + TypeScript build / dev workflow",
        "Express + TypeScript",
        "Fastify with schema-driven types",
        "NestJS dependency injection",
        "Declaration files (.d.ts) for untyped packages",
        "tRPC overview — end-to-end typesafe RPC",
      ],
    },
    {
      title: "Domain Modelling, Immutability & Functional TypeScript",
      weekRange: "Week 6",
      description:
        "Using the type system to make wrong states unrepresentable, which is the point at which TypeScript stops being annotation and starts being design. Branded and opaque types so a `UserId` cannot be passed where an `OrderId` is expected; discriminated unions that model a workflow's real states; and exhaustive checks that fail compilation when a new state is added and not handled.\n\nImmutability covers `readonly`, `as const` and deep-readonly patterns. The functional half covers composition, currying and typed pipelines — not as a doctrine, but because these techniques are common in modern TypeScript and reading them should not require guesswork.",
      topics: [
        "Making illegal states unrepresentable",
        "Branded and opaque types",
        "Discriminated unions for domain states",
        "Exhaustive checking with never",
        "readonly, as const and deep immutability",
        "Immutable update patterns",
        "Function composition and typed pipelines",
        "Currying and partial application",
        "Typed higher-order functions",
        "Modelling a real domain end to end",
      ],
    },
    {
      title: "Design Patterns, SOLID & Clean Architecture",
      weekRange: "Week 6",
      description:
        "The senior-developer layer, and the material that separates a TypeScript course from a syntax tutorial. The classic patterns as they are actually written in TypeScript — factory, strategy, adapter, repository, observer, builder — with an honest note on which are worth the ceremony in a language with first-class functions and which are Java habits in disguise.\n\nSOLID is taught with concrete TypeScript examples rather than definitions. Clean architecture covers layering, the dependency rule, and keeping domain logic free of framework imports — the thing that makes a codebase survivable when the framework changes, which it always eventually does.",
      topics: [
        "Factory, strategy and adapter in TypeScript",
        "Repository and unit-of-work patterns",
        "Observer, builder and decorator",
        "Which patterns functions make unnecessary",
        "Single responsibility and interface segregation",
        "Dependency inversion in practice",
        "Layering and the dependency rule",
        "Keeping domain logic framework-free",
        "Dependency injection without a container",
        "Refactoring a tangled module into layers",
      ],
    },
    {
      title: "Testing, Monorepos & Library Development",
      weekRange: "Week 7",
      description:
        "The last mile — making typed code testable, shareable and maintainable at scale. Testing with Vitest and Jest, testing typed APIs, type-level tests that assert a type is what you think it is, and mocking without discarding type safety in the process.\n\nMonorepos cover workspace layout, project references, shared type packages and the incremental builds that make a large TypeScript repository tolerable. Library development covers package typing, dual ESM and CommonJS output, versioning a public type surface, and API contract sharing — including OpenAPI and GraphQL codegen, which is how most teams keep frontend and backend types in step.",
      topics: [
        "Vitest and Jest with TypeScript",
        "Testing typed APIs and inferred returns",
        "Type-level tests and expect-type assertions",
        "Type-safe mocking",
        "Monorepo layout and workspaces",
        "Project references and incremental builds",
        "Shared type packages across apps",
        "Publishing a typed npm package",
        "Dual ESM and CommonJS output",
        "OpenAPI and GraphQL type generation",
        "Versioning a public type surface",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Week 7 + 1 week capstone",
      description:
        "Two weeks of capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune frontend / backend hiring panels — Persistent, BMW TechWorks, Mercedes-Benz, Synechron, plus the Pune SaaS / fintech scene. Includes a TypeScript-specific mock round (type modelling on a whiteboard / shared editor — the most common 2026 senior interview question), and resume / LinkedIn / GitHub polish.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "TypeScript live-coding mock round",
        "Type-modelling whiteboard exercises",
        "Resume + LinkedIn rewrite for typed-codebase JDs",
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
    src: "/images/courses/typescript-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage TypeScript learning path taught at Archer Infotech Pune: JavaScript refresher covering ES6+, closures, modules and async; types and inference covering primitives, unions, literals and narrowing; interfaces and type aliases covering objects, optional and readonly members and index signatures; functions and generics covering overloads, constraints and generic components; classes and decorators covering access modifiers, abstract classes and decorators; advanced types covering conditional, mapped, template literal and utility types; configuration and tooling covering tsconfig, strict mode, ESLint and build setup; and TypeScript in practice covering React, Node, testing and migrating an existing codebase.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/typescript-syllabus-v1.pdf",
    title: "TypeScript Course Syllabus — Complete Module List",
    slug: "typescript-syllabus",
    blurb:
      "The complete 125-section syllabus as a 33-page PDF — the whole type system from primitives to conditional and mapped types, classes and decorators, modules and declaration files, runtime validation, TypeScript with React, Node, Express and Angular, domain modelling, SOLID and clean architecture, testing, monorepos, library development, seven mini projects, a capstone and interview preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 33-page PDF",
        items: [
          "All 125 numbered sections in teaching order, from prerequisites through to career roles after training.",
          "The advanced type system given real space — conditional types, infer, mapped types, template literal types and the full utility-type set, each with its own section.",
          "TypeScript applied across the stack: React, hooks, forms, Next.js, Angular, Express, Fastify, NestJS, databases, GraphQL and WebSockets.",
          "The design material that separates senior TypeScript from annotated JavaScript — domain modelling, immutability, SOLID, clean architecture and type-design best practice.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "TypeScript Developer — across frontend and backend.",
          "Frontend Developer — React or Angular with strong typing.",
          "Backend Developer — Node, Express, Fastify or NestJS in TypeScript.",
          "Full Stack Developer — with shared types across the whole application.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Type-Safe API Layer with Zod + Drizzle + Inference",
      description:
        "A type-safe full-stack API layer — Zod schemas for request validation that also infer the TypeScript types you use, Drizzle ORM with full type inference from schema, Express or Fastify backend with typed middleware, plus a small React frontend that consumes the API with typed responses (no `any` in the entire codebase). Outcome: a public GitHub repository with `tsc --noEmit` and `eslint --max-warnings 0` passing in CI — exactly what Pune typed-codebase hiring panels look at first.",
      technologies: [
        "TypeScript 5.5+",
        "Zod for runtime validation",
        "Drizzle ORM",
        "Express or Fastify",
        "React + TanStack Query",
        "GitHub Actions with type-check + lint",
      ],
    },
    {
      title: "Library / npm Package with Public Type Definitions",
      description:
        "Pick a useful utility (date-formatting, validation helpers, small state library, async-utility helpers) and ship it as a public npm package with first-class TypeScript types. Includes proper declaration-file output, tsd or vitest type-tests, dual ESM + CJS publishing, plus a small README documenting the API. Demonstrates declaration-file authoring depth — the artefact that signals senior TypeScript thinking on the resume.",
      technologies: [
        "TypeScript 5.5+",
        "tsup or unbuild for dual ESM / CJS",
        "tsd or vitest type-tests",
        "Public npm package",
      ],
    },
    {
      title: "Type-Heavy Domain Library — State Machine or DSL",
      description:
        "A library demonstrating advanced type-system features — a typed state machine (where impossible transitions are compile errors), a typed query builder (where invalid queries don't compile), or a small DSL with typed parsing. Uses conditional types, mapped types, template literal types, and discriminated unions extensively. Demonstrates the depth that opens senior TypeScript / library-author interviews at Pune product companies.",
      technologies: [
        "TypeScript 5.5+",
        "Conditional + mapped + template literal types",
        "Discriminated unions",
        "Vitest unit + type tests",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships TypeScript across React / Angular / Next every day). Amol personally leads every TypeScript session from Day 1 through capstone — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "TypeScript fluency is increasingly a hard requirement on Pune product engineering JDs — Indeed Pune lists 1,800+ openings explicitly requiring TypeScript, and another ~2,500 React / Angular / Node openings expect it. Compensation tracks 10–20% above pure-JavaScript engineers at equivalent experience. The biggest employers are Persistent Systems, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, BMC Software, plus the Pune SaaS / fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune).",
      "What pulls a TypeScript-fluent candidate above the median band: a public GitHub repository with a `strict: true` codebase and zero `any`, demonstrable type-modelling depth (discriminated unions, generics, conditional types where they earn their place), one library / framework integration project, and the discipline of writing types that produce useful error messages at the type level. Our capstone projects are designed exactly around these signals.",
      "TypeScript alone is uncommon as a job title — it is typically paired with React, Node, or NestJS. Our graduates target Frontend Developer / Backend Developer / Full Stack Developer roles where TypeScript is the default; this course is the layer that makes those roles accessible.",
    ],
    salaryBands: [
      {
        role: "TypeScript Developer (Pune)",
        band: "₹7,80,000 per year average",
        source: {
          label: "Indeed Pune (TypeScript Developer)",
          url: "https://in.indeed.com/career/typescript-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Frontend / Full Stack with TypeScript (Pune entry, <2 years)",
        band: "₹4,50,000 – ₹7,50,000 per year",
        source: {
          label: "AmbitionBox Pune TypeScript Developer",
          url: "https://www.ambitionbox.com/profile/typescript-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Typed-Codebase Developer (Pune, 3–5 years)",
        band: "₹11,00,000 – ₹18,00,000 per year",
        source: {
          label: "Glassdoor Pune TypeScript Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-typescript-developer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm",
        },
      },
      {
        role: "Senior Frontend / Backend Engineer with TS (national, 5–8 years)",
        band: "₹20,00,000 – ₹34,00,000 per year",
        source: {
          label: "6figr India Senior TS Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-typescript-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMC Software",
      "Bajaj Finserv",
      "Amagi",
      "Fyllo",
      "BharatPe (Pune)",
      "Razorpay (Pune)",
      "Pine Labs (Pune)",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Frontend Developer (TypeScript)",
      "Backend Developer (Node.js + TypeScript)",
      "Full Stack Developer",
      "React / Angular / Next.js Developer",
      "Library / SDK Developer",
    ],
  },

  modesAndDuration: {
    duration:
      "6 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~1.5 months total)",
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
        "GitHub for code reviews and PRs",
        "Vercel / Render for capstone deployments",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~2.5 months instead of 1.5 to accommodate working professionals.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 3 weeks; weekend batches every 5 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession — TypeScript as a 1.5-month focused course typically lands at the lower end. Bundled JavaScript + TypeScript + React enrolment offers significant savings.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled JavaScript + TypeScript + React enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "TypeScript alone is uncommon as a job title; placement focus is calibrated for typed-codebase Frontend / Backend / Full Stack roles. By the end of the curriculum your resume highlights TypeScript depth with a published npm package or sealed-types capstone, your GitHub has at least two `strict: true` codebases, and you have completed at least two mock technical interviews focused on typed-codebase roles.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Most TypeScript graduates progress directly into our React, Angular, Node.js, or Next.js track for the framework specialisation that turns TS fluency into a hireable role.",
    ],
    process: [
      "Week 5 — resume and LinkedIn rewrite, calibrated for typed-codebase JDs",
      "Week 6 — GitHub portfolio cleanup, type-test badges, npm listings",
      "Weeks 7 — two rounds of mock technical interviews",
      "Week 7 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Strong recommendation to enrol in our React / Angular / Node.js track as the natural next step",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMC Software",
      "Amagi",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune TypeScript training institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "TypeScript version covered",
        archer: "TypeScript 5.5+ — inferred type predicates, isolatedDeclarations",
        typical: "TypeScript 4.x — pre-2024 features only",
      },
      {
        feature: "Advanced type-system depth",
        archer: "Conditional + mapped + template literal types, full week",
        typical: "Basic interfaces and types only",
      },
      {
        feature: "Framework integration coverage",
        archer: "React + Next.js + Node + Express + Fastify + NestJS",
        typical: "JS-only or React-only",
      },
      {
        feature: "Tooling coverage",
        archer: "tsx + Node 22 type-stripping + Vite + tsup + tsd",
        typical: "tsc + ts-node only",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — published npm package + type-tested codebase",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Bundled pricing with frameworks",
        archer: "Yes — JS + TS + React / Angular / Node bundle discount",
        typical: "Per-course pricing only",
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
      "Compare with whoever you are considering. The right test is whether you can see actual student `strict: true` codebases before you pay.",
  },

  versusAlternative: {
    heading: "TypeScript Standalone or Bundled With React / Node?",
    paragraphs: [
      "TypeScript as a standalone 1.5-month course is the right fit if you (1) are a working JavaScript developer who needs to onboard a typed codebase quickly, (2) are preparing for our React / Angular / Node / Next.js track and want a focused TS layer first, or (3) are a senior engineer leading a team's TS migration.",
      "Bundling TypeScript with React (combined ~4 months) is the right fit if your goal is Frontend Developer / React Developer roles. Bundling with Node (combined ~4 months) is the right fit if your goal is full-stack JavaScript or NestJS roles. Bundling with both (JavaScript + TypeScript + React + Node, combined ~6 months) is our most popular path for fresher full-stack engineers and offers the largest combined discount.",
      "Honest recommendation: take this course standalone if you are a working developer adding TS depth. Take the bundled path if you are targeting Pune product engineering full-stack roles — the combined enrolment is significantly more cost-effective.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: working JavaScript at the ES2020+ level (we expect this from day 1), basic understanding of HTTP / REST, and willingness to commit 6–8 hours per week of practice outside class. If you have done our JavaScript course or equivalent self-study, you are ready. Pure JavaScript beginners should do our JavaScript course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS and Node.js 22 LTS pre-installed",
    ],
  },

  faqs: [
    {
      question: "How long does TypeScript training in Pune take at Archer Infotech?",
      answer:
        "Approximately 1.5 months — 6 weeks of structured curriculum plus 1 week of capstone and interview preparation. The weekend batch stretches over ~2.5 months at the same content depth.",
    },
    {
      question: "What is the salary impact of learning TypeScript?",
      answer:
        "TypeScript fluency adds a 10–20% premium over pure JavaScript at equivalent experience. Indeed Pune reports an average of ₹7.80 lakh per year for TypeScript Developer (May 2026). Mid-level (3–5 years) earns ₹11–18 lakh per Glassdoor. Senior Frontend / Backend Engineers with TypeScript earn ₹20–34 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Do I need JavaScript before TypeScript?",
      answer:
        "Yes — TypeScript is a layer on top of JavaScript. We expect ES2020+ JS fluency from day 1. If you are new to JS, take our JavaScript course first.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) type-safe API layer with Zod + Drizzle + inference, (2) public npm package with first-class types, (3) type-heavy domain library (state machine or DSL). All three become public GitHub repositories with type-test CI passing.",
    },
    {
      question: "Are advanced type-system features covered?",
      answer:
        "Yes — week 3 is dedicated to conditional types, mapped types, template literal types, the `infer` keyword, and distributive conditional types. Capstone Project #3 uses these extensively. This depth is what separates TypeScript readers from TypeScript authors.",
    },
    {
      question: "Are weekend TypeScript classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2.5 months instead of 1.5.",
    },
    {
      question: "What is the fee for the TypeScript course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. Bundled JavaScript + TypeScript + React / Angular / Node enrolment offers significant savings.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for typed-codebase Frontend / Backend / Full Stack roles, referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. Strong recommendation and bundled discount to enrol in our React / Angular / Node.js track.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Chougule personally leads every session of every batch from Day 1 through capstone. The same name on this page is the same person you meet on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start TypeScript training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 3–5 weeks. Reach out via the enquiry form or call us — Amol Chougule is happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled JS + TS + React / Node path makes more sense for your goal.",
  },
};
