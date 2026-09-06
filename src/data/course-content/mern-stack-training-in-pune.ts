import type { CourseRichContent } from "./types";

export const mernStackTrainingInPune: CourseRichContent = {
  intro:
    "MERN Stack — MongoDB, Express, React, Node.js — is the fastest path to a deployed full-stack web application using a single language end-to-end (JavaScript or TypeScript). Pune product startups, SaaS teams, and edtech / fintech companies actively hire MERN developers; Naukri, Cutshort, and Indeed Pune list 100–200 active MERN-specific roles in 2026 across Raja Software Labs, FindingPi, Scry Analytics, nCircle Tech, IAMOPS, Cognizant Sogeti, Mphasis, Emerson, and Eaton's digital teams. Archer Infotech's MERN Stack training in Pune teaches the stack as it is actually used in 2026 — Node.js 24 LTS with native TypeScript support, Express 5 (with NestJS introduced as the senior-track alternative), React 19 with Server Components and Actions, MongoDB 8 with Atlas Vector Search, all glued with JWT auth and deployed via Docker. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn MERN Stack in 2026",
    paragraphs: [
      "MERN is the speed stack. Single language top-to-bottom (JavaScript / TypeScript), unified npm ecosystem, modern tooling — you can ship a deployed full-stack project in 8–10 weeks of disciplined work, where Java Full Stack typically needs 16+ weeks. That speed advantage matters for two audiences: career switchers who need a portfolio fast, and product startups who hire on shipped work, not on years of experience. Pune's product engineering, SaaS, fintech (CRED, Niyo, Jupiter offshoots), and edtech teams (BYJU's Pune offshoot and similar) all hire MERN developers in 2026.",
      "What changed in 2026: Node.js 24 LTS (Krypton, October 2025) is now the recommended baseline for greenfield work — npm v11 makes installs 65% faster, and native TypeScript type-stripping graduated to stable, so you can run TS files directly in Node 24 without a build step. React 19 shipped Server Components, Actions, the new `use()` hook, and form-action improvements; Next.js 15 with App Router is the dominant frontend wrapper. MongoDB 8 made queryable encryption stable and improved time-series performance. Express 5 (released late 2024) is still the dominant Node web framework in Pune JDs, with Fastify gaining ground in performance-critical product roles and NestJS appearing in ~25% of senior MERN postings.",
      "What this means for hiring: 2026 Pune MERN job descriptions explicitly call out Node 22+ (often 24), React 19 with Server Components, TypeScript, MongoDB Atlas, Docker, and increasingly LLM API integration. Archer Infotech's curriculum is rebuilt around this 2026 reality — TypeScript-first, Server Components from week one of the React module, and a real LLM-integrated capstone option.",
    ],
    keyPoints: [
      "Node.js 24 LTS with native TypeScript and 65%-faster npm",
      "React 19 — Server Components, Actions, `use()` hook",
      "Next.js 15 App Router as the production frontend wrapper",
      "MongoDB 8 with Atlas Vector Search for AI-adjacent features",
      "Express 5 default, NestJS introduced for senior-track readers",
      "Pune market — 100–200 active MERN-specific Pune roles in 2026",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, BSc-CS, or BCA student wanting to ship a full-stack project fast",
      "Career switcher with 2–3 months runway who needs a working portfolio for Pune product hiring",
      "Working professional in a non-JS stack wanting to move to product / SaaS roles",
      "Designer, content creator, or product person who wants to build their own ideas end-to-end",
      "Final-year student preparing for product startup placements in Pune (Raja Software Labs, FindingPi, Scry Analytics, fintech)",
    ],
    notForYou: [
      "If you refuse to write JavaScript or TypeScript — MERN is JS top to bottom",
      "If you target Cognizant / Infosys / TCS Pune mass-hire pipelines — they prefer Java Full Stack",
      "If your goal is data, ML, or AI engineering — Python is the right stack, not MERN",
      "If you want a deeply-OOP, statically-typed enterprise codebase feel — Java is your stack",
      "If you cannot tolerate a fast-moving ecosystem — React, Node, and npm churn yearly",
    ],
  },

  curriculum: [
    {
      title: "Programming & Web Development Fundamentals",
      weekRange: "Week 1",
      description:
        "The mental model before the syntax. How a web application actually works — client and server, the request-response lifecycle, what HTTP and HTTPS do, why three-tier architecture exists, and what separates a static site from a dynamic one. You set up the toolchain properly on day one (VS Code, Node, npm, Git) rather than fixing environment problems in week six.\n\nThis week also fixes the vocabulary the rest of the course leans on: what an API is, what REST means, and what development, staging and production environments are for. Learners who skip it arrive at Express still unsure what a status code is.",
      topics: [
        "How web applications work — client, server, database",
        "Client-server architecture and the request-response lifecycle",
        "HTTP and HTTPS, methods, status codes and headers",
        "Three-tier architecture — presentation, application, data",
        "Frontend versus backend responsibilities",
        "REST API fundamentals",
        "Development, staging and production environments",
        "VS Code setup, extensions and the integrated terminal",
        "Node.js and npm installation",
        "Git and GitHub — first repository, first commits",
      ],
    },
    {
      title: "HTML5, CSS3 & Modern Layouts",
      weekRange: "Weeks 1–2",
      description:
        "Semantic markup and the styling model underneath every React component you will later write. HTML5 structure, forms and input types, media and accessibility attributes — written semantically, because JSX renders into this and a component built on div soup is unreadable and unindexable alike.\n\nCSS covers selectors and specificity, the cascade and the box model, then Flexbox and Grid as the two layout tools they are, with a clear rule for choosing: Flexbox for one dimension, Grid for two. Responsive design closes the module — mobile-first, breakpoints chosen from content rather than device names, fluid typography and responsive images.",
      topics: [
        "Semantic HTML5 structure and document outline",
        "Forms — input types, labels, validation attributes",
        "Accessibility attributes and why they matter",
        "CSS selectors, specificity and the cascade",
        "The box model, display and positioning",
        "Flexbox — axes, alignment, growth and shrink",
        "CSS Grid — template areas, tracks and auto-placement",
        "Mobile-first methodology and breakpoint strategy",
        "Fluid typography and responsive images",
        "CSS variables and design tokens",
        "Transitions, transforms and animation basics",
      ],
    },
    {
      title: "Tailwind CSS & UI Foundations",
      weekRange: "Week 2",
      description:
        "Tailwind is the styling default in current React work, so it is taught properly rather than mentioned. Utility-first methodology and why it initially looks wrong and then stops looking wrong; configuration and theming; responsive and state variants; and component extraction, which is how you avoid the class soup that critics reasonably complain about.\n\nBootstrap is covered briefly as the alternative you will meet in existing projects and admin panels, along with an honest account of when a component library beats utilities.",
      topics: [
        "Tailwind utility-first methodology",
        "Configuration, theming and design tokens",
        "Responsive, hover, focus and dark variants",
        "Component extraction and avoiding class soup",
        "Arbitrary values and when to reach for them",
        "Bootstrap grid and components as the alternative",
        "Choosing utilities versus a component library",
        "Building an accessible, responsive UI shell",
      ],
    },
    {
      title: "JavaScript Fundamentals",
      weekRange: "Weeks 3–4",
      description:
        "The language itself, taught properly, because every problem later in this course is a JavaScript problem wearing a React or Node costume. Variables and the difference `let`, `const` and `var` actually make; data types and the coercion rules that produce JavaScript's famous surprises; operators, conditionals and loops; and functions in all their forms.\n\nScope, hoisting and closures get real time rather than a mention. Closures are what separate a developer who can read React's source from one who cannot, and they return in week seven when hooks and stale closures start causing bugs that look like magic.",
      topics: [
        "Variables — let, const, var and the differences that matter",
        "Data types, coercion and strict equality",
        "Operators, conditionals and switch",
        "Loops — for, while, for...of, for...in",
        "Function declarations, expressions and arrow functions",
        "Parameters, defaults and rest arguments",
        "Scope, hoisting and the temporal dead zone",
        "Closures and practical uses for them",
        "The `this` keyword and how it is bound",
        "Error handling with try, catch and finally",
      ],
    },
    {
      title: "Arrays, Objects & Functional JavaScript",
      weekRange: "Week 4",
      description:
        "The data-handling half of JavaScript, and the part you use every single day in React. Arrays and their mutating versus non-mutating methods; objects, nesting, references and how copying actually behaves. Then the functional array methods — map, filter, reduce, find, some, every — until transforming a data structure is reflex.\n\nThis matters disproportionately here. Every list you render, every API response you reshape and every piece of immutable state you update in React is this material applied, and the immutability rules in particular are why `push` on a state array silently does nothing.",
      topics: [
        "Array creation, indexing and iteration",
        "Mutating versus non-mutating array methods",
        "map, filter, reduce — with real transformations",
        "find, findIndex, some, every, includes, sort",
        "Objects, nested objects and property access",
        "Reference versus value, shallow versus deep copy",
        "Destructuring arrays and objects",
        "Spread and rest with arrays and objects",
        "Optional chaining and nullish coalescing",
        "Immutability patterns for state updates",
        "JSON — parse, stringify and common pitfalls",
      ],
    },
    {
      title: "Object-Oriented & Modern JavaScript (ES6+)",
      weekRange: "Week 5",
      description:
        "Classes, prototypes, inheritance and encapsulation — the object model underneath the ecosystem, so that library source stops looking opaque. Prototypal inheritance is covered honestly, including why it confuses developers arriving from Java or C#.\n\nThe ES6+ half covers everything modern JavaScript added that appears in every React and Node codebase: modules with import and export, template literals, maps and sets, iterators and generators, symbols, and the syntax that makes current code look nothing like the JavaScript of ten years ago.",
      topics: [
        "Classes, constructors, methods and fields",
        "Inheritance, super and method overriding",
        "Getters, setters, private fields and static members",
        "Prototypes and the prototype chain",
        "ES modules — import, export, default exports",
        "Template literals and tagged templates",
        "Map, Set, WeakMap and WeakSet",
        "Iterators, generators and Symbol.iterator",
        "Object and array methods added in ES2020+",
        "Structured cloning and immutability helpers",
      ],
    },
    {
      title: "DOM, Events, Forms & Browser Storage",
      weekRange: "Weeks 5–6",
      description:
        "How JavaScript actually reaches the page — and why React exists. You manipulate the DOM directly first: selecting, creating, updating and removing elements, handling events, delegating them, and understanding bubbling and capturing. Then form handling and validation entirely by hand, which is genuinely tedious.\n\nThat tedium is the point. Building the same form twice — once by hand here, once with React in week eight — is the fastest way to understand what a framework buys you and why declarative rendering is worth the abstraction.",
      topics: [
        "Selecting elements — querySelector and friends",
        "Creating, updating and removing nodes",
        "Attributes, properties, classList and dataset",
        "Event listeners, the event object, bubbling and capturing",
        "Event delegation and why it scales",
        "preventDefault and stopPropagation",
        "Form submission and constraint validation",
        "Custom validation and error display by hand",
        "localStorage, sessionStorage and their limits",
        "Cookies, and choosing between storage options",
        "A small project built with no framework at all",
      ],
    },
    {
      title: "Asynchronous JavaScript & API Communication",
      weekRange: "Week 6",
      description:
        "The concept most beginners get wrong and every interviewer asks about. The single-threaded model, the call stack, the event loop, the task and microtask queues — worked through with code you run and predict, because the theory only sticks after you have got the ordering wrong yourself once.\n\nThen callbacks and their nesting problem, promises and chaining, async/await, and error handling across all three. The module closes on fetch, response handling, HTTP status codes in practice, CORS and the errors it produces, and consuming a real third-party API end to end.",
      topics: [
        "Single-threaded execution and the call stack",
        "The event loop, task queue and microtask queue",
        "Callbacks and callback nesting",
        "Promises — states, chaining, catch and finally",
        "Promise.all, allSettled, race and any",
        "async/await and error handling",
        "fetch — requests, responses, headers, JSON",
        "HTTP status codes in practice",
        "CORS, and reading the error it produces",
        "AbortController and cancelling requests",
        "Consuming a real third-party API end to end",
      ],
    },
    {
      title: "TypeScript for React Developers",
      weekRange: "Week 7",
      description:
        "TypeScript is the professional default in React work, and candidates who learned JavaScript-only are visibly behind in 2026 interviews. Types and inference, unions and literals, interfaces versus type aliases, and generics — which is what makes a reusable component genuinely reusable rather than typed as `any`.\n\nThe React-specific half is where it pays off: typing props and children, typing hooks including `useState` and `useReducer`, typing events, discriminated unions for component variants, and the utility types that remove most of the boilerplate people complain about.",
      topics: [
        "Types, inference and the primitive set",
        "Union, intersection and literal types",
        "Interfaces versus type aliases",
        "Typed functions, overloads and return types",
        "Generics — functions, components and constraints",
        "Typing props, children and component variants",
        "Typing hooks — useState, useReducer, useRef",
        "Typing events and form handlers",
        "Discriminated unions and exhaustive checks",
        "Type narrowing and type guards",
        "tsconfig, strict mode and compiler options",
        "Utility types — Partial, Pick, Omit, Record",
      ],
    },
    {
      title: "React 19 + Next.js 15",
      weekRange: "Weeks 8–10",
      description:
        "Modern React — function components and Hooks (`useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`), the new `use()` hook, Suspense, Error Boundaries. Server Components and the App Router — the model Pune 2026 product hiring expects. Forms with Actions, server actions for write operations, and Tailwind CSS for styling. State management with Zustand (recommended for new code) or Redux Toolkit (for heritage codebases).",
      topics: [
        "React 19 — function components and Hooks",
        "use() hook, Suspense, Error Boundaries",
        "Next.js 15 App Router — server vs client components",
        "Server Actions for write operations",
        "Forms with Actions",
        "State management — Zustand or Redux Toolkit",
        "Tailwind CSS",
        "REST integration with TanStack Query",
      ],
    },
    {
      title: "React State, Data Fetching & Performance",
      weekRange: "Week 11",
      description:
        "The half of React that separates a working application from a good one. State management in layers — local state, lifted state, Context for genuinely global values, and Redux Toolkit when an application has outgrown all three, with an honest rule for when it has not. Most React projects reach for a store far earlier than they need one.\n\nServer state is treated as its own problem, because it is: TanStack Query for caching, background refetching, invalidation and optimistic updates removes an entire category of hand-written `useEffect` bugs. Performance closes the module — memoisation and when it helps, the React Compiler, list virtualisation, code splitting and lazy loading, and profiling to find the actual bottleneck rather than the guessed one.",
      topics: [
        "Local state, lifted state and prop drilling",
        "Context API — what it is for and what it is not",
        "Redux Toolkit — slices, reducers, selectors",
        "When a global store is genuinely warranted",
        "Server state versus client state",
        "TanStack Query — caching, invalidation, refetching",
        "Optimistic updates and rollback",
        "useMemo, useCallback and React.memo — and their cost",
        "The React Compiler and what it automates",
        "List virtualisation for large data sets",
        "Code splitting, lazy and Suspense",
        "Profiling with React DevTools",
      ],
    },
    {
      title: "Node.js 24 & Backend Fundamentals",
      weekRange: "Week 12",
      description:
        "How Node actually works — event loop, libuv, async I/O, streams, buffers — at a useful level (no kernel-level rabbit holes). Build a small HTTP server from scratch using the `http` module before introducing Express, so you appreciate what Express is doing. Cover environment variables, dotenv, package.json scripts, and the npm vs pnpm vs yarn choice (we recommend pnpm for new projects).",
      topics: [
        "Node event loop and async I/O",
        "Streams and buffers (just enough)",
        "HTTP module from scratch",
        "package.json, npm scripts, dotenv",
        "pnpm vs npm vs yarn",
        "Native fetch in Node 24",
      ],
    },
    {
      title: "Express 5 — REST APIs",
      weekRange: "Weeks 12–13",
      description:
        "Express 5 — middleware, routing, error handling (much improved in v5), request validation with Zod or Joi, structured logging with Pino, and JWT-based authentication. Build a real REST API with full CRUD against MongoDB. Cover the basics of testing with Vitest or Jest. Includes a brief introduction to NestJS for students considering senior product-engineering tracks.",
      topics: [
        "Express 5 middleware and routing",
        "Error handling (Express 5 async error propagation)",
        "Request validation with Zod or Joi",
        "Structured logging with Pino",
        "JWT auth with jsonwebtoken",
        "Testing with Vitest / Jest",
        "Brief NestJS introduction (controllers, providers, modules)",
      ],
    },
    {
      title: "MongoDB 8 — Database & ODM",
      weekRange: "Week 14",
      description:
        "MongoDB schema design, indexing, aggregation pipelines, and the ODM choice (Mongoose vs Prisma — we cover both with honest trade-offs). Includes the patterns Pune SaaS teams actually use — embedded vs referenced documents, two-phase commits in single-document transactions, and the Atlas-specific features (Vector Search, Search Index) that keep showing up in 2026 MERN + AI JDs. Cover Postgres briefly as a pragmatic alternative since some Pune product teams use Postgres with Prisma instead of MongoDB.",
      topics: [
        "MongoDB schema design — embedded vs referenced",
        "Indexes, query optimisation",
        "Aggregation pipelines",
        "Mongoose vs Prisma",
        "Atlas Vector Search basics",
        "Brief Postgres + Prisma alternative",
      ],
    },
    {
      title: "Full Stack Integration & Real-time Features",
      weekRange: "Week 15",
      description:
        "Connect the pieces — frontend ↔ backend with REST and TanStack Query for caching, JWT carried through, real-time updates via WebSocket or Server-Sent Events. Cover file upload to S3-compatible storage, image optimisation with Next/Image, and the deployment topology (Vercel for the frontend, Render or AWS for the backend). Includes a mini-project end-to-end before the capstone.",
      topics: [
        "REST integration with TanStack Query",
        "JWT auth flow front-to-back",
        "WebSocket and Server-Sent Events",
        "File upload to S3-compatible storage",
        "Next.js Image optimisation",
        "Deployment topology — Vercel + Render / AWS",
      ],
    },
    {
      title: "DevOps, Docker & Production Practices",
      weekRange: "Week 16",
      description:
        "Containerise your Express + Node service with Docker, a multi-stage build for size optimisation, and Docker Compose for local Mongo + backend + frontend. CI/CD via GitHub Actions, environment promotion (dev → staging → prod), structured logging that ships to a free-tier observability service. Cover the OWASP top-10 for Node specifically — JWT signing-key handling, npm audit, supply-chain attacks (recent npm supply-chain incidents are an interview topic in Pune product roles).",
      topics: [
        "Docker multi-stage build",
        "Docker Compose for local dev",
        "GitHub Actions CI/CD",
        "Environment promotion — dev / staging / prod",
        "OWASP top-10 for Node",
        "npm audit and supply-chain hygiene",
      ],
    },
    {
      title: "AI Integration (Bonus) + Capstone & Interview Prep",
      weekRange: "Weeks 17–18 + 2 weeks placement prep",
      description:
        "Add an LLM-integrated feature to your capstone — for example, a 'summarise this thread' button that calls OpenAI or Anthropic, or a vector-search feature using MongoDB Atlas Vector Search. Two weeks of capstone work plus mock interviews with Pune company question banks (Raja Software Labs, FindingPi, Scry Analytics, Cognizant, Mphasis). DSA refresher, resume + LinkedIn polish, GitHub cleanup, HR mock interviews.",
      topics: [
        "OpenAI / Anthropic SDK in Node",
        "MongoDB Atlas Vector Search",
        "Capstone — full implementation, deployment, README",
        "Code review with the lead trainer",
        "Technical mock interviews — 3 rounds",
        "DSA quick refresher",
        "Resume + LinkedIn rewrite",
        "GitHub portfolio polish",
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

  posterImage: {
    src: "/images/courses/mern-stack-poster-v1.webp",
    width: 836,
    height: 941,
    alt: "MERN Stack Developer course poster for Archer Infotech: MongoDB stores data, Express.js handles APIs, React builds the user interface and Node.js runs JavaScript, shown as a four-stage flow. Key skills listed are JavaScript ES6+, React with hooks, context and routing, Express.js REST APIs and middleware, MongoDB data modelling and aggregation, Node.js event loop, NPM and deployment, Tailwind CSS and modern UI development, Git and GitHub, and DevOps basics with CI/CD and Docker. Real-world solutions listed are modern web applications, real-time applications, e-commerce platforms, and social media and community apps.",
    caption:
      "The four parts of MERN and what each one does. Every skill on the poster is covered as a module below.",
  },

  roadmapImage: {
    src: "/images/courses/mern-stack-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage MERN Stack learning path taught at Archer Infotech Pune: web fundamentals with HTML5, CSS3, Flexbox, Grid and Tailwind; JavaScript covering functions, arrays, objects, object-oriented programming and ES6+; DOM and asynchronous programming covering events, forms, storage, promises and fetch; TypeScript covering types, interfaces, generics and typed React; React covering hooks, routing, context, Redux Toolkit and performance; Node.js and Express covering modules, middleware, REST APIs and authentication; MongoDB covering schemas, Mongoose, aggregation and indexing; and deployment and career covering Docker, CI/CD, cloud, projects and interviews.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/mern-stack-syllabus-v1.pdf",
    title: "MERN Stack Course Syllabus — Complete Module List",
    slug: "mern-stack-syllabus",
    blurb:
      "The complete 124-section syllabus as a 40-page PDF — web fundamentals, JavaScript, TypeScript, the full React surface including hooks, Redux Toolkit and performance, Node.js and Express, MongoDB and Mongoose, security, testing, DevOps, four project tiers and a full interview-preparation section. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 40-page PDF",
        items: [
          "All 124 numbered sections in teaching order, grouped into thirty-one parts from web fundamentals through to mock interviews.",
          "The React surface in full — components, hooks, routing, Context, Redux Toolkit, server state, forms and performance optimisation.",
          "Four tiers of project work: JavaScript mini projects, React mini projects, Node and Express API projects, MongoDB projects, then three full-stack builds and an industry-style capstone.",
          "A complete interview-preparation section with separate question sets for JavaScript, React, Node.js, Express, MongoDB, web and API topics, and system design.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "MERN Stack Developer — the full TypeScript-first stack, end to end.",
          "React Developer — the frontend specialisation with the highest opening count in Pune.",
          "Node.js Backend Developer — Express APIs, MongoDB and authentication.",
          "Full Stack JavaScript Developer — the general title most listings use for this skill set.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Real-Time Collaborative SaaS Application",
      description:
        "Build a multi-user real-time application — Express 5 + MongoDB 8 backend with JWT auth, WebSocket for real-time updates, React 19 + Next.js 15 frontend with Server Components and Actions, Tailwind for styling, deployed Vercel (frontend) + Render or AWS (backend). Pick a real domain — collaborative whiteboard, real-time chat, live polling app, project management tool. Includes file upload, optimistic updates, and offline-first considerations.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB 8",
        "React 19 + Next.js 15",
        "WebSocket",
        "JWT auth",
        "Tailwind CSS",
        "Vercel + Render",
      ],
    },
    {
      title: "AI-Powered MERN Application",
      description:
        "MERN application with an LLM-integrated feature — a document Q&A app, a meeting-notes summariser, a content-generation tool, or a search-with-AI experience. Uses MongoDB Atlas Vector Search for embeddings, OpenAI or Anthropic API for generation, Server Components for SEO-friendly rendering. The combination Pune AI-adjacent product startups want to see in 2026.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB Atlas + Vector Search",
        "React 19 + Next.js 15",
        "OpenAI / Anthropic SDK",
        "Tailwind CSS",
      ],
    },
    {
      title: "E-commerce Platform with Stripe / Razorpay",
      description:
        "Full-feature e-commerce backend with cart, checkout, payment integration (Razorpay for India, Stripe for international), order management, and an admin dashboard. React 19 + Next.js 15 storefront with Server Components for SEO, MongoDB for catalogue and orders. Deployed end-to-end. The classic capstone that demonstrates breadth — payments, transactions, user roles, file uploads, and search.",
      technologies: [
        "Node.js 24 + TypeScript",
        "Express 5",
        "MongoDB 8",
        "React 19 + Next.js 15",
        "Razorpay / Stripe",
        "JWT auth + role-based access",
        "Vercel + Render",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ yrs full-stack and Node) and Amol Chougule (Technical Trainer specialising in modern web and mobile, 5+ yrs ex-Mindstix). Both write production JavaScript / TypeScript every day across product engineering work and personally lead the React, Node, and capstone weeks.",

  careerOutcomes: {
    paragraphs: [
      "MERN Stack hiring in Pune is concentrated in product engineering, SaaS, fintech, and edtech — sectors that hire on shipped work over years of experience. Salary depends heavily on portfolio quality and TypeScript fluency.",
      "Pune-specific Indeed page for 'MERN Stack Developer' does not exist; the role is hired under 'Full Stack Developer' (Pune average ₹10.61 lakh per year, n=35, January 2026). AmbitionBox Pune lists ₹4.2 lakh average for MERN developers (range ₹1.2L–₹8L) which captures the entry-level skew. 6figr 2026 reports senior MERN (10–20 yrs) at ₹18 lakh average.",
      "What pulls a MERN developer above the average band: a public GitHub portfolio with at least one deployed Next.js project, demonstrable TypeScript fluency, and one production-shaped feature (real-time, payment integration, or AI). Our capstone projects are designed exactly around these signals.",
    ],
    salaryBands: [
      {
        role: "Junior MERN / 0–2 yrs (Pune-aligned)",
        band: "₹3,20,000 – ₹5,80,000 per year",
        source: {
          label: "Internshala India + 6figr 2026 (national fresher band, Pune midpoint similar)",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "MERN Stack Developer Pune (overall)",
        band: "₹4,20,000 per year average (range ₹1.2L–₹8L)",
        source: {
          label: "AmbitionBox Pune aggregation (March 2026)",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "Full Stack Developer overall — Pune (Indeed proxy)",
        band: "₹10,61,661 per year",
        source: {
          label: "Indeed Pune Full Stack (January 2026, n=35)",
          url: "https://in.indeed.com/career/full-stack-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid MERN — 4–9 years (national)",
        band: "₹13,20,000 per year average",
        source: {
          label: "6figr / scholarhat 2026",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
      {
        role: "Senior MERN — 10–20 years (national)",
        band: "₹18,00,000 per year average",
        source: {
          label: "6figr 2026",
          url: "https://6figr.com/in/salary/mern-stack--s",
        },
      },
    ],
    hiringCompanies: [
      "Raja Software Labs",
      "FindingPi",
      "Scry Analytics",
      "nCircle Tech",
      "IAMOPS",
      "Cognizant Sogeti",
      "Mphasis Pune",
      "Capgemini Pune",
      "Emerson Pune",
      "Eaton",
      "BYJU's (Pune)",
      "CRED (engineering)",
      "Niyo",
      "Jupiter",
      "Tekit Solutions",
      "Bharti Share Market",
    ],
    rolesAfterCourse: [
      "MERN Stack Developer",
      "Full Stack Developer (JavaScript / TypeScript)",
      "Frontend Developer (React + Next.js)",
      "Node.js Backend Developer",
      "Junior Software Engineer at product startups",
      "Software Engineer at SaaS / fintech / edtech",
    ],
  },

  modesAndDuration: {
    duration:
      "3.5 months of structured curriculum (14 weeks, JavaScript through DevOps) plus 2 weeks of capstone and interview preparation",
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
        "Stretches over 5–6 months instead of 3.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep and the AI-integration module; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 10 of the course, not at the end. By the time you finish the curriculum, your resume is ready, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks from Pune product, SaaS, and IT-services companies.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 10 — resume and LinkedIn rewrite, with feedback from a trainer who has hired",
      "Week 11 — GitHub portfolio cleanup, public READMEs, deployment links",
      "Week 12 — DSA quick refresher targeting screening patterns at Pune product companies",
      "Weeks 13–14 — three rounds of mock technical interviews",
      "Week 14 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Raja Software Labs",
      "FindingPi",
      "Scry Analytics",
      "Cognizant",
      "Mphasis Pune",
      "Capgemini Pune",
      "Persistent Systems",
      "Emerson Pune",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune MERN training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Node.js version covered",
        archer: "Node.js 24 LTS with native TypeScript support",
        typical: "Often Node 18 or generic 'latest Node'",
      },
      {
        feature: "React version covered",
        archer: "React 19 — Server Components, Actions, use() hook",
        typical: "React 18 or 'modern React' generic",
      },
      {
        feature: "TypeScript-first",
        archer: "Yes — TS from week 2 onwards",
        typical: "JavaScript only or TypeScript as add-on",
      },
      {
        feature: "MongoDB version + Atlas features",
        archer: "MongoDB 8 with Atlas Vector Search",
        typical: "Generic MongoDB chapter",
      },
      {
        feature: "AI / LLM integration module",
        archer: "Included — OpenAI / Anthropic + Atlas Vector Search",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — public repository per student",
        typical: "Rare",
      },
      {
        feature: "Salary data with sources",
        archer: "Cited from Indeed Pune + AmbitionBox + 6figr with URLs",
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
    heading: "MERN Stack vs Java Full Stack — Which Fits Your Goal",
    paragraphs: [
      "Speed answer: MERN is the fastest path from 'I know nothing' to a deployed full-stack project — single language (TypeScript) end-to-end, npm ecosystem, React 19 + Node 24 means modern resume in weeks, not months.",
      "Ceiling answer: Pune product startups pay MERN seniors ₹15–25 lakh, comparable to Java seniors. But MERN openings in Pune are roughly one-third to one-quarter of Java openings — banks, IT-services majors, and Fortune-500 backends in Pune are still Java-first.",
      "Honest answer: if you want maximum job count and a stable, predictable hiring funnel (Cognizant, TCS, Synechron, Bajaj Finserv), pick Java Full Stack. If you want to ship fast, build a portfolio, and target product startup / SaaS / fintech culture, pick MERN. If undecided after both, default to Java in Pune — the volume bias is real. Many of our students do one stack first, get placed, then add the other as a side study.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — basic computer use, logical thinking, and willingness to commit 8–10 hours per week of practice outside class. No prior programming experience required; we start from `console.log('Hello, world!')` on day one. If you already know JavaScript or have done a 12th-standard CS course, you will move slightly faster but won't be ahead of where the course expects.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call with the lead trainer",
      "Confirm enrolment and complete pre-course orientation",
      "Show up to day one with a laptop running 64-bit OS — Node and IDE setup is part of session 1",
    ],
  },

  faqs: [
    {
      question: "What is the MERN Stack developer salary in Pune?",
      answer:
        "Indeed Pune's Full Stack Developer page (Jan 2026, n=35) reports ₹10.61 lakh per year average. AmbitionBox Pune lists MERN developer average at ₹4.2 lakh (range ₹1.2L–₹8L) which captures the entry-level skew. Senior MERN (10–20 yrs) averages ₹18 lakh nationally per 6figr 2026.",
    },
    {
      question: "How long does the MERN stack course take?",
      answer:
        "Three and a half months — 14 weeks of structured curriculum (JavaScript through DevOps and AI integration) plus 2 weeks of capstone and interview preparation. Weekend batches stretch over 5–6 months at the same content depth, designed for working professionals.",
    },
    {
      question: "Is MERN stack still in demand in 2026?",
      answer:
        "Yes — particularly in Pune product engineering, SaaS, fintech, and edtech. Naukri and Indeed Pune list 100–200 active MERN-specific roles. The 2026 trend is MERN + TypeScript + AI-integration, which is what our curriculum teaches.",
    },
    {
      question: "Do I need to know JavaScript before joining MERN?",
      answer:
        "No — we start with two weeks of modern JavaScript and TypeScript foundations before introducing Node and Express. If you already know JS, those weeks let you go deeper on TypeScript and modern ES2024+ features.",
    },
    {
      question: "MERN vs MEAN — which is better in Pune?",
      answer:
        "MERN (with React) has more Pune product-startup demand than MEAN (with Angular) in 2026. MEAN is mostly seen in IT-services tracks where Angular is preferred. We teach MERN by default; if your target employer mandates Angular, take our Java Full Stack with the Angular track instead.",
    },
    {
      question: "Can a fresher get a MERN job in Pune?",
      answer:
        "Yes — Pune product startups (Raja Software Labs, FindingPi, Scry Analytics, nCircle Tech, IAMOPS) actively hire MERN freshers, and IT-services like Cognizant Sogeti and Mphasis run MERN-specific tracks. Junior Pune MERN entry typically starts ₹3.2L–₹5.8L per year.",
    },
    {
      question: "Which is better, MERN or Java Full Stack, for jobs in Pune?",
      answer:
        "Java Full Stack has roughly 3–4× the open-role count of MERN in Pune — better for IT-services, banking, and Fortune-500 backend hiring. MERN is faster to ship and better for product startups, SaaS, and fintech. Default to Java if undecided; volume bias is real.",
    },
    {
      question: "What is the fee of MERN training in Pune at Archer Infotech?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. The higher end covers placement-track classroom batches with extended interview prep and the AI-integration module; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Is the AI/LLM module included or extra?",
      answer:
        "Included in every batch. You add an LLM-integrated feature to your capstone — for example, summarisation via OpenAI / Anthropic, or vector search via MongoDB Atlas. This is what separates 2026 Pune MERN hiring from 2022 Pune MERN hiring.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects to choose from: (1) real-time collaborative SaaS, (2) AI-powered MERN application, (3) e-commerce platform with Razorpay / Stripe. All three become public GitHub repositories with deployed URLs you reference in interviews.",
    },
    {
      question: "Do you cover Express only, or NestJS too?",
      answer:
        "Express 5 is the default and covered in depth. NestJS is introduced briefly for students considering senior product-engineering tracks where ~25% of Pune JDs now mention it. We cover NestJS basics — controllers, providers, modules — without forcing you to switch from Express.",
    },
    {
      question: "Are weekend MERN classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5–6 months instead of 3.5. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews, referrals via our alumni network, resume and LinkedIn rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Why TypeScript-first instead of plain JavaScript?",
      answer:
        "Pune 2026 MERN job descriptions increasingly say 'TypeScript' explicitly. Node 24 ships with native TypeScript type-stripping, so you can run TS files directly without a build step. Starting in TS from week 2 means you graduate with the right habit for production codebases.",
    },
    {
      question: "Are the named trainers actually teaching, or just on the brochure?",
      answer:
        "Amol Patil personally leads Node, Express, and the capstone weeks. Amol Chougule personally leads JavaScript / TypeScript foundations, React 19, and the frontend integration weeks. The same names you see on this page are the same people you meet on day one of your batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start MERN Stack training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Patil or Amol Chougule are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the classroom, and decide with full information.",
  },
};
