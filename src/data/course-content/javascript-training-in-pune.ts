import type { CourseRichContent } from "./types";

export const javascriptTrainingInPune: CourseRichContent = {
  intro:
    "JavaScript is the most-deployed programming language on the planet — it runs in every browser, on every modern backend, on edge runtimes (Cloudflare Workers, Vercel Edge), in mobile apps via React Native, and in desktop apps via Electron. Archer Infotech's JavaScript training in Pune teaches the language as it is actually written in 2026 — modern ECMAScript (ES2024 + ES2025 staged proposals where they matter), the runtime mental model (event loop, microtasks, the async / await flow), browser APIs that real product teams use (Fetch, IntersectionObserver, ResizeObserver, Web Storage, Web Workers), and the disciplined patterns (immutable updates, error boundaries, structured concurrency) that produce code mid-level engineers actually trust. The course is the right standalone introduction for first-time programmers AND the natural prerequisite for our React, Angular, Node.js, and TypeScript tracks. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn JavaScript in 2026",
    paragraphs: [
      "JavaScript is no longer a 'frontend only' language — it is the lingua franca of modern software. Every Pune product engineering, SaaS, and fintech company writes JavaScript or TypeScript daily; even Pune .NET / Java enterprise teams write JS for the frontend tier. The State of JS 2025 survey shows JavaScript / TypeScript is the second-most-used language in India after Python and ahead of Java, Go, and PHP. Indeed Pune lists more than 2,500 active openings that require JavaScript at a working level, including Frontend Developer, Full Stack Developer, Node.js Developer, React Developer, Angular Developer, and React Native Developer titles.",
      "What changed in 2026: ECMAScript 2024 shipped Object.groupBy, Promise.withResolvers, Array.prototype.findLast / findLastIndex, RegExp /v flag, and resizable ArrayBuffers. ES2025 staged proposals (Iterator helpers, decorators, immutable Records / Tuples) are starting to land in Node 22 LTS, Bun, and modern browsers. The async / await flow is now the default for asynchronous code — Promise.all + Promise.allSettled handle most concurrency cleanly. The browser API landscape has matured around Fetch (replacing XMLHttpRequest), IntersectionObserver (replacing scroll listeners), ResizeObserver, and the View Transitions API for smooth single-page navigation. TypeScript adoption has crossed 80% on new Pune product code, making 'JavaScript fluency' a stepping stone to TypeScript fluency.",
      "What this means for hiring: Pune frontend / full-stack JDs in 2026 expect modern JS (ES2020+ minimum), async / await fluency, comfort with one framework (React, Angular, Vue, or Next.js), and the ability to graduate to TypeScript within 30 days. Senior roles add deep runtime understanding (event loop, memory model, garbage collection awareness), browser performance (Core Web Vitals), and Node.js production patterns. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern stack, runtime-aware, framework-ready.",
    ],
    keyPoints: [
      "2,500+ active openings on Indeed Pune that require JavaScript (May 2026)",
      "Modern ECMAScript — ES2024 + staged ES2025 — runs natively in Node 22 LTS",
      "Foundation for React, Angular, Node, Next.js, React Native (every Tier 1+3 frontend track)",
      "Async / await flow + Fetch + Observers — the 2026 browser API stack",
      "TypeScript graduation expected within 30 days — we set you up for it",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking to enter frontend / full-stack / Node.js roles in Pune",
      "First-time programmer who wants to learn the most-deployed language as their entry point",
      "Working developer in another language (Java, Python, .NET, PHP) wanting to add JavaScript to your stack",
      "Designer or web professional with HTML / CSS background looking to add programming",
      "Working professional preparing for our React / Angular / Node.js / Next.js track — JavaScript is the prerequisite",
      "Career restarter targeting frontend / web development as a flexible re-entry path",
    ],
    notForYou: [
      "If you are already comfortable with modern JS (ES2020+) and TypeScript — jump directly to React, Angular, or Node.js",
      "If you cannot put in 6–8 hours per week of practice outside class — programming is learned by writing code, not watching",
      "If you only want a certificate sticker with no portfolio — Pune frontend hiring screens hard on real GitHub repos",
      "If you have 4+ years of JS / TS production experience — you'll be under-stretched; consider our advanced React / Next.js / Node.js tracks",
    ],
  },

  curriculum: [
    {
      title: "JavaScript Foundations",
      weekRange: "Weeks 1–2",
      description:
        "JavaScript from first principles. Cover variables (let / const, never var in new code), primitive types and the type-coercion rules (strict equality `===` is the only equality operator we teach), control flow, functions (declarations, expressions, arrow functions — and when each fits), the call stack, scope (block, function, module), closures (the foundation of every framework's hooks system). By the end of week 2 every student has Node.js 22 LTS installed, can write a 200-line script confidently, and understands `this` binding well enough to debug React or Angular code.",
      topics: [
        "let / const — never var in new code",
        "Primitive types and type coercion (== vs ===)",
        "Control flow — if, else, switch, ternary",
        "Functions — declarations, expressions, arrow functions",
        "The call stack and execution context",
        "Scope — block, function, module",
        "Closures and lexical scope",
        "this binding — call, apply, bind, arrow-function lexical this",
      ],
    },
    {
      title: "Modern ECMAScript & Idiomatic JS",
      weekRange: "Week 3",
      description:
        "The modern JavaScript subset every framework expects you to know. Cover destructuring (object and array), spread / rest operators, default parameters, template literals (with tagged templates briefly), modules (import / export, dynamic imports), nullish coalescing (??) and optional chaining (?.), Array methods that matter (map, filter, reduce, find, findLast, some, every, flat, flatMap, Object.groupBy from ES2024), plus the ES2025 staged proposals already shipping in Node 22 (Iterator helpers, structured cloning).",
      topics: [
        "Destructuring — object, array, parameter, nested",
        "Spread / rest operators",
        "Default parameters",
        "Template literals and tagged templates",
        "Modules — import, export, dynamic import",
        "Nullish coalescing and optional chaining",
        "Array methods — map, filter, reduce, findLast",
        "Object methods — groupBy, fromEntries, Object.hasOwn",
        "Iterator helpers (ES2025 staged)",
      ],
    },
    {
      title: "Object-Oriented & Functional JavaScript",
      weekRange: "Week 4",
      description:
        "Two paradigms, both alive in production JS. OOP — classes (the ES6+ syntax — never the prototype-mucking pattern), inheritance, static members, private fields (#name), getters / setters, the discipline of when to use a class vs a factory function. Functional — first-class functions, higher-order functions, immutability (Object.freeze, structuredClone, the discipline of never mutating arguments), composition over inheritance, currying, partial application. We cover the React-favoured pure-function style and the Angular-favoured class style side-by-side.",
      topics: [
        "Classes — ES6+ syntax, constructors, methods",
        "Inheritance, super, static members",
        "Private fields (#name) and private methods",
        "Getters and setters",
        "First-class and higher-order functions",
        "Immutability — Object.freeze, structuredClone",
        "Composition over inheritance",
        "Currying and partial application",
      ],
    },
    {
      title: "Asynchronous JavaScript — Promises, async / await",
      weekRange: "Week 5",
      description:
        "The model that defines JavaScript. The event loop (call stack + microtask queue + macrotask queue + render step), why setTimeout(0) is not 'immediate', when work blocks the UI thread. Promises (the chained .then / .catch style — taught for code-reading, not new code), the modern async / await flow (taught as the default for new code), Promise.all / Promise.allSettled / Promise.race / Promise.any, AbortController for cancellation, and the discipline that prevents the most common production failure modes — unhandled promise rejections, sequential awaits where parallel was right.",
      topics: [
        "The event loop — microtasks, macrotasks, render",
        "Why setTimeout(0) is not immediate",
        "Promises — then / catch / finally",
        "async / await — the modern default",
        "Promise.all / allSettled / race / any",
        "AbortController and cancellation",
        "Sequential vs parallel awaits",
        "Error handling and unhandled rejection traps",
      ],
    },
    {
      title: "Browser APIs — Fetch, DOM, Storage, Observers",
      weekRange: "Week 6",
      description:
        "The browser as a runtime. DOM selection (querySelector, querySelectorAll — never getElementById in new code), DOM manipulation, event handling and event delegation, the difference between 'capture' and 'bubble' phases. Modern browser APIs that mid-level engineers actually use — Fetch (replacing XMLHttpRequest), Web Storage (localStorage, sessionStorage), IndexedDB for offline data, IntersectionObserver (replacing scroll listeners), ResizeObserver, MutationObserver, View Transitions API for smooth navigation, plus Web Workers for off-main-thread work.",
      topics: [
        "DOM selection — querySelector, querySelectorAll",
        "DOM manipulation and traversal",
        "Event handling — capture, bubble, delegation",
        "Fetch API — request, response, streaming",
        "Web Storage — localStorage, sessionStorage",
        "IndexedDB basics for offline",
        "IntersectionObserver, ResizeObserver, MutationObserver",
        "View Transitions API",
        "Web Workers for CPU-bound tasks",
      ],
    },
    {
      title: "TypeScript Primer & Tooling",
      weekRange: "Week 7",
      description:
        "TypeScript is no longer optional in 2026 Pune product engineering. Cover the type system (primitives, unions, intersections, literal types, generics, utility types), interfaces vs types (with the honest distinction), strict null checks, the discipline of `strict: true`, plus the TypeScript ecosystem — tsx for fast TypeScript-on-Node development, the Node 22 type-stripping mode that runs TS without a compile step, and ESLint + Prettier configured to enforce idiomatic typed code. By the end of week 7 every student has a small TypeScript app deployed.",
      topics: [
        "Types, interfaces, unions, intersections",
        "Generics and utility types",
        "Strict null checks and `strict: true`",
        "Type narrowing and type guards",
        "tsx and Node 22 type-stripping",
        "ESLint + Prettier setup",
        "TypeScript with React / Angular / Node — preview",
      ],
    },
    {
      title: "Testing & Modern Tooling",
      weekRange: "Week 8",
      description:
        "Tests as Pune product teams actually write them. Vitest as the modern default (Jest-compatible API, faster, ESM-native), the Node 22 native test runner for zero-dependency tests, plus Testing Library for DOM assertions. Cover the discipline of testing what users see (not implementation details), MSW for HTTP mocking, and the testing pyramid that produces coverage senior engineers trust. Plus the modern toolchain — Vite for development, Playwright for end-to-end, and the GitHub Actions CI pattern for running tests on every PR.",
      topics: [
        "Vitest essentials",
        "Node 22 native test runner",
        "Testing Library — getByRole, queryByText",
        "MSW for HTTP mocking",
        "Coverage — useful metrics vs theatre",
        "Vite for development",
        "Playwright for end-to-end",
        "GitHub Actions for CI",
      ],
    },
    {
      title: "Capstone Project & Framework Onboarding",
      weekRange: "Week 9 + 1 week placement / framework prep",
      description:
        "One week of full-time capstone work plus a focused 'next-step' framework onboarding session. Pick one of three capstone projects (see Capstone Projects). The final week previews React or Angular or Node.js based on your target — enough to make your next-track enrolment frictionless. Mock interviews are calibrated for entry-level frontend / web-developer roles in Pune; resume / LinkedIn / GitHub polish included. Most JavaScript graduates progress into our React or Angular track within 4 weeks of completion.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Framework preview — React or Angular or Node.js",
        "Resume + LinkedIn rewrite for entry-level web JDs",
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

  projects: [
    {
      title: "Interactive Single-Page Application (Vanilla JS)",
      description:
        "A complete client-side application built without frameworks — pick a domain (todo manager, expense tracker, recipe finder, weather dashboard with public API). Uses modern modules, Fetch API for data, IntersectionObserver for infinite scroll, IndexedDB for offline support, and the View Transitions API for smooth navigation. Deployed to Vercel or Netlify with a GitHub Actions pipeline. Outcome: a public GitHub repository plus a clickable demo URL — exactly the artefact that signals 'JavaScript fluency without framework crutches' to Pune hiring panels.",
      technologies: [
        "Vanilla ES2024 modules",
        "Fetch API",
        "IndexedDB",
        "IntersectionObserver",
        "View Transitions API",
        "Vite",
        "Vercel or Netlify",
      ],
    },
    {
      title: "Node.js CLI Tool with TypeScript",
      description:
        "A useful command-line tool — pick a domain (PR / issue analyser, file-system organiser, text utility, simple API client). Built with TypeScript on Node 22 LTS, using the native test runner, fs/promises for file operations, and a published npm package output. Demonstrates that JavaScript is not just for browsers and that you can ship production-grade Node CLI tools — exactly the artefact that signals senior-junior level on Pune backend / developer-tools resumes.",
      technologies: [
        "Node.js 22 LTS",
        "TypeScript with type-stripping",
        "Native test runner",
        "Commander.js or yargs",
        "npm package publishing",
      ],
    },
    {
      title: "Real-Time Multi-User Mini-App",
      description:
        "A small real-time application — collaborative todo list, live chat room, or multiplayer drawing canvas. Vanilla JavaScript on the client, Node.js + WebSocket (ws library) on the server, presence and broadcast patterns, optimistic UI updates with reconciliation on sync. Deployed to Render or Fly.io. Demonstrates the patterns that translate directly to React + Socket.io and Angular + WebSocket roles.",
      technologies: [
        "Vanilla JS + WebSocket client",
        "Node.js + ws library server",
        "Optimistic UI patterns",
        "Render or Fly.io deployment",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships React / Angular / Next every day) and Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Full Stack and MERN tracks). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "JavaScript fluency is foundational rather than a standalone hireable specialisation — but it is the prerequisite for every modern frontend / full-stack / Node.js role in Pune. Indeed Pune lists 2,500+ active openings that require JavaScript, with the highest hiring volumes at Persistent Systems, BMC Software, BMW TechWorks India, Mercedes-Benz R&D India, Synechron, Mastercard Pune Tech Hub, Bajaj Finserv, plus the Pune SaaS / fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune, Pine Labs Pune).",
      "What pulls a JavaScript-fluent candidate above the median band: TypeScript graduation, depth on at least one framework (React, Angular, or Node), a public GitHub repository with at least one deployed app, Vitest or Testing Library coverage, and demonstrable browser-API fluency (Fetch, Observers). Our capstone projects are designed exactly around these signals.",
      "JavaScript alone rarely lands the offer — it is the foundation that strengthens applications for Frontend Developer, Full Stack Developer, Node.js Developer, React / Angular / Vue Developer, and React Native Developer roles. Most of our JavaScript graduates progress into our React or Angular track within 4 weeks of completion.",
    ],
    salaryBands: [
      {
        role: "JavaScript Developer (Pune)",
        band: "₹5,68,000 per year average",
        source: {
          label: "Indeed Pune (JavaScript Developer)",
          url: "https://in.indeed.com/career/javascript-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Frontend Developer (Pune)",
        band: "₹6,16,772 per year average",
        source: {
          label: "Indeed Pune (Frontend Developer)",
          url: "https://in.indeed.com/career/frontend-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Web Developer (Pune entry, <2 years)",
        band: "₹3,00,000 – ₹5,50,000 per year",
        source: {
          label: "AmbitionBox Pune Junior Web Developer",
          url: "https://www.ambitionbox.com/profile/junior-web-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Frontend / Full Stack JS Developer (Pune, 3–5 years)",
        band: "₹9,00,000 – ₹16,00,000 per year",
        source: {
          label: "Glassdoor Pune Frontend Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-frontend-developer-salary-SRCH_IL.0,4_IM1072_KO5,23.htm",
        },
      },
      {
        role: "Senior Frontend Engineer (national, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: {
          label: "6figr India Senior Frontend Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-frontend-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
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
      "Junior JavaScript Developer",
      "Junior Frontend Developer",
      "Junior Web Developer",
      "Prerequisite met for React / Angular / Node.js / React Native specialisations",
      "Junior Full Stack Developer (with framework follow-up)",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured curriculum plus 2 weeks of capstone project and framework-onboarding (~2 months total)",
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
        "Vercel / Netlify free tier for capstone deployments",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~3 months instead of 2 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and any applicable concession — JavaScript as a 2-month foundational course typically lands at the lower end of that range. Most students take JavaScript as a stepping stone to React, Angular, or Node; ask about the bundled JavaScript + framework pricing for combined enrolment.",
    range:
      "₹20,000 – ₹90,000 (JavaScript, as a focused 2-month course, typically lands at the lower end of the range; combined JS + React / JS + Angular / JS + Node enrolment offers significant bundle savings)",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled JavaScript + React / Angular / Node enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "JavaScript alone is foundational rather than a standalone hireable specialisation; placement focus is calibrated accordingly. By the end of the curriculum your resume highlights modern JS fluency with TypeScript graduation, your GitHub has at least two production-style repositories, and you have completed at least two mock technical interviews focused on entry-level frontend / web developer roles.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, JavaScript alone rarely lands the offer; it is the foundation that strengthens applications for framework-specific roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Most JavaScript graduates progress directly to our React, Angular, or Node.js course for the depth specialisation that turns JS fluency into a hireable role.",
    ],
    process: [
      "Week 7 — resume and LinkedIn rewrite, highlighting JS fluency for entry-level frontend / web JDs",
      "Week 8 — GitHub portfolio cleanup, deployed demo links, framework-readiness signals",
      "Weeks 9–10 — two rounds of mock technical interviews calibrated for entry-level roles",
      "Week 10 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Strong recommendation to enrol in our React, Angular, or Node.js course as the natural next step",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "Bajaj Finserv",
      "Amagi",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune JavaScript training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Chougule and Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "JavaScript version covered",
        archer: "Modern ES2024 + ES2025 staged proposals (Node 22 LTS)",
        typical: "ES6 (2015) basics only",
      },
      {
        feature: "TypeScript primer included",
        archer: "Yes — full week, with strict null checks",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Browser API depth",
        archer: "Fetch + IndexedDB + Observers + View Transitions hands-on",
        typical: "DOM manipulation only",
      },
      {
        feature: "Async / await depth",
        archer: "Event loop + Promise.all/allSettled + AbortController",
        typical: "Callbacks → Promises only, no concurrency patterns",
      },
      {
        feature: "Testing in the curriculum",
        archer: "Vitest + Testing Library + native Node test runner",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed apps + npm package + WebSocket app",
        typical: "Local code on a hard drive",
      },
      {
        feature: "Bundled pricing with React / Angular / Node",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed apps before you pay.",
  },

  versusAlternative: {
    heading: "JavaScript as Standalone Course or Bundled With React / Angular / Node?",
    paragraphs: [
      "JavaScript as a standalone 2-month course is the right fit if you (1) are a first-time programmer who wants the broadest-applicable language as your entry point, (2) are preparing for our React / Angular / Node.js track but want a focused JS foundation first, or (3) are a working developer in another language who needs solid JS fluency before adding a framework.",
      "Bundling JavaScript with React (combined ~4.5 months) is the right fit if your goal is Frontend Developer / React Developer roles — JS alone won't get you there, and the JS → React path is what hiring panels actually shortlist for. Bundling with Node.js (combined ~4.5 months) is the right fit if your goal is full-stack JavaScript or Node.js Developer roles. Bundling with Angular (combined ~4.5 months) is the right fit if your goal is enterprise / BFSI Angular Developer roles.",
      "Honest recommendation: if you are a working developer wanting JS-only depth, take this course standalone. If you are targeting framework-specific roles, talk to us about the bundled path — it is significantly more cost-effective than enrolling separately and produces a stronger hireable profile.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic computer use, willingness to commit 6–8 hours per week of practice outside class, and ideally basic HTML / CSS comfort (we cover a lightning HTML / CSS primer in the pre-course orientation if needed). No prior programming experience required; we start from `console.log('Hello')` on day one. If you have done a 12th-standard computer-science course or basic Python, you will move slightly faster.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal",
      "Confirm enrolment and complete pre-course orientation (Node.js install, GitHub account, VS Code setup)",
      "Show up to day one with a laptop running 64-bit OS and Node.js 22 LTS pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best JavaScript training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed apps, and (3) name companies that hired their last 5 batches (or the framework-specific tracks their JavaScript graduates went on to). Compare on those three.",
    },
    {
      question: "How long does JavaScript training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2 months — 8 weeks of structured curriculum plus 2 weeks of capstone and framework-onboarding. The weekend batch stretches over ~3 months at the same content depth.",
    },
    {
      question: "What is the salary impact of learning JavaScript?",
      answer:
        "JavaScript fluency is foundational rather than a standalone specialisation — but it strengthens applications for Frontend Developer (Pune average ₹6.17 lakh on Indeed), Full Stack Developer, Node.js Developer (₹6.68 lakh), and React / Angular Developer roles. Senior Frontend Engineers (5–8 years) earn ₹18–32 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the JavaScript course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode, batch type, and applicable concession. JavaScript as a 2-month focused course typically lands at the lower end. We offer significant bundle discounts when JavaScript is enrolled alongside our React, Angular, or Node.js courses — talk to us about combined pricing.",
    },
    {
      question: "Do I need any prior programming experience?",
      answer:
        "No — we start from `console.log('Hello')` on day one. The course is designed for first-time programmers. What you do need is 6–8 hours per week of practice outside class.",
    },
    {
      question: "Should I take JavaScript before React / Angular / Node?",
      answer:
        "Yes — JavaScript fluency is the prerequisite. Our React / Angular / Node courses assume modern JS (ES2020+) fluency from day 1; skipping JavaScript and going straight to a framework wastes the first 2–3 weeks because everything in the framework builds on JS fundamentals.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) interactive single-page application built with vanilla ES2024 (no framework), (2) Node.js CLI tool with TypeScript published as an npm package, (3) real-time multi-user mini-app with WebSocket. All three become public GitHub repositories with clickable demo URLs.",
    },
    {
      question: "Is TypeScript covered or only JavaScript?",
      answer:
        "JavaScript is the focus, but week 7 includes a full TypeScript primer (types, interfaces, generics, strict null checks, the TS toolchain). TypeScript adoption has crossed 80% on new Pune product code; we set you up to graduate to TS within 30 days of finishing this course.",
    },
    {
      question: "JavaScript or Python — which should I learn first in Pune?",
      answer:
        "JavaScript if your goal is frontend / full-stack / web work — Pune product engineering, SaaS / fintech, mobile via React Native. Python if your goal is data / AI / backend — Pune analytics, AI platforms, Python full-stack. Both have ample Pune jobs; many of our students learn the second language as a side skill once placed.",
    },
    {
      question: "Are weekend JavaScript classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~3 months instead of 2. Same content, same trainers, same projects.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for entry-level frontend / web roles, referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. Most importantly, strong recommendation and bundled discount to enrol in our React, Angular, or Node.js course as the natural depth specialisation.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Chougule personally leads the foundations, modern ECMAScript, browser-API, and TypeScript-primer weeks. Amol Patil leads the OOP, async, testing, and capstone weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start JavaScript training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule and Amol Patil are happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled JavaScript + React / Angular / Node path makes more sense for your goal. Visit our Kothrud, Pune campus, see actual student deployed apps, meet a current batch, and decide with full information.",
  },
};
