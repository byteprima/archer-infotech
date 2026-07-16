import type { CourseRichContent } from "./types";

export const angularTrainingInPune: CourseRichContent = {
  intro:
    "Angular remains the dominant enterprise frontend framework in Pune's BFSI, large-captive, and IT-services segments — Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, plus the major IT services majors (TCS, Infosys, Cognizant, Capgemini) ship most of their internal tools and customer portals in Angular. Archer Infotech's Angular training in Pune teaches the framework as it is actually practiced in 2026 — Angular 19 with standalone components by default, the new control-flow syntax (@if / @for / @switch), Signals as the default reactivity model, deferrable views (@defer), built-in SSR via Hydration, RxJS where it still earns its place, plus TypeScript discipline and the testing / deployment patterns Pune enterprise teams expect. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Angular in 2026",
    paragraphs: [
      "Angular is the framework most underrated by tutorial culture and most over-represented in Pune enterprise hiring. Indeed Pune lists more than 700 active Angular Developer / Frontend Developer (Angular) roles as of May 2026, with the highest concentration in BFSI (Bajaj Finserv, Synechron, Cognizant Pune Capital Markets), large captives (Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, BMW TechWorks India for some teams), and IT services majors building large internal portals. Angular's TypeScript-first design, integrated routing / forms / DI, and strong patterns for large teams make it the default for enterprise dashboards that several engineers ship over multiple years.",
      "What changed in 2026: Angular 19 is the production default and consolidates the renaissance that started with v14 — standalone components are now the default (ngModule retired for new projects), Signals are the recommended reactivity model (replacing the chunkier zone.js / change-detection model), the new control-flow syntax (@if / @for / @switch / @defer) replaces *ngIf / *ngFor with better performance and TypeScript ergonomics, deferrable views (@defer) deliver granular code-splitting at the template level, and Hydration ships built-in SSR support. RxJS is still important but no longer mandatory for state — Signals cover most cases.",
      "What this means for hiring: 2026 Pune Angular JDs expect Angular 17+ (most companies have migrated), standalone components, Signals fluency, RxJS at the operators-you-actually-use level, reactive forms, NgRx or Signal-based stores for state, and one production deployment story. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern Angular, no legacy NgModules left over, enterprise-pattern aware.",
    ],
    keyPoints: [
      "700+ active Angular Developer roles on Indeed Pune (May 2026)",
      "Angular 19 — standalone by default, Signals reactivity, @if / @for / @defer",
      "RxJS is still important but no longer the only state pattern — Signals cover most cases",
      "Strongest framework for enterprise / BFSI / large-captive Pune hiring",
      "TypeScript-first by design — every Angular dev is a typed-codebase dev",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting frontend roles in Pune enterprise / BFSI / large captives",
      "Working backend developer (.NET, Java) wanting to add a strong typed frontend to your stack",
      "Working AngularJS (1.x) developer wanting to migrate skills to modern Angular 19",
      "Designer or web developer with HTML / CSS / JS background looking to graduate into framework work",
      "Career restarter targeting frontend in Pune BFSI / .NET shops where Angular is the default",
    ],
    notForYou: [
      "If you have no JavaScript experience at all — take a JavaScript course first; we expect ES2020+ fluency from week 1",
      "If you cannot put in 8–10 hours per week of practice outside class — Angular is the most pattern-heavy of the major frontend frameworks",
      "If you only want a certificate sticker with no portfolio — Pune Angular hiring screens hard on real PRs and deployed dashboards",
      "If you specifically want to work at Pune SaaS / fintech startups — those skew React; pick our React course unless you have a specific Angular target",
      "If you have 4+ years of production Angular experience — you'll be under-stretched; talk to us about advanced enterprise / Nx monorepo / state architecture specialisations",
    ],
  },

  curriculum: [
    {
      title: "Modern JavaScript & TypeScript Foundations",
      weekRange: "Week 1",
      description:
        "Angular is TypeScript-first; we level the floor in week 1. Cover the modern JavaScript subset (destructuring, spread, optional chaining, async / await, modules, Promise) plus TypeScript at the level you actually need for Angular — types, interfaces, generics, utility types, decorators (because Angular still uses them), strict null checks, and the discipline of writing code that passes `strict: true`. By the end of week 1 every student has Node.js 22 LTS, Angular CLI, and a Hello-World Angular 19 app deployed.",
      topics: [
        "Modern JS — destructuring, spread, optional chaining, async / await",
        "JS modules, dynamic imports, tree-shaking",
        "TypeScript — types, interfaces, generics, utility types",
        "Decorators (TypeScript / Angular usage)",
        "Strict null checks and `strict: true`",
        "Angular CLI installation and project scaffolding",
        "VS Code + Angular Language Service setup",
      ],
    },
    {
      title: "Angular 19 Components & Templates",
      weekRange: "Weeks 2–3",
      description:
        "Angular 19 from first principles — standalone components (the new default; we don't teach NgModules except as a 'reading legacy code' note), the component lifecycle, inputs / outputs / signal inputs, the new control-flow syntax (@if / @for / @switch), built-in pipes vs custom pipes, attribute / structural directives, and content projection with ng-content. Cover Signals as the reactivity primitive (signal, computed, effect) and how they replace the chunky change-detection workflow that defined Angular 1–14.",
      topics: [
        "Standalone components — bootstrapping, configuration",
        "Inputs, outputs, signal inputs (Angular 17.1+)",
        "Component lifecycle hooks",
        "Control-flow syntax — @if, @for, @switch, @empty",
        "Signals — signal, computed, effect",
        "Built-in pipes and custom pipes",
        "Structural and attribute directives",
        "Content projection with ng-content",
      ],
    },
    {
      title: "Services, Dependency Injection & Application State",
      weekRange: "Week 4",
      description:
        "Dependency Injection is the heart of Angular and the pattern most under-explained in tutorial courses. Cover providers (the new providedIn: 'root' default, providedIn: 'platform', providedIn: any), inject() function vs constructor injection (the 2026 default is inject()), hierarchical injectors, and the discipline of writing services that test cleanly. State management — Signal-based stores for the simple case, NgRx for the enterprise case, and the honest comparison of when each earns its complexity.",
      topics: [
        "Services and `providedIn: 'root'`",
        "inject() function vs constructor injection",
        "Hierarchical injectors and component-scoped providers",
        "Pure and impure pipes",
        "Signal-based state management",
        "NgRx — store, actions, reducers, effects, selectors",
        "When NgRx earns its complexity vs when it doesn't",
      ],
    },
    {
      title: "Forms — Reactive Forms & Typed Forms",
      weekRange: "Week 5",
      description:
        "Forms are where Angular shines and where most enterprise dashboards live. Cover reactive forms (the dominant choice in Pune enterprise — strongly typed, testable, composable), template-driven forms (when they fit, which is rarely in production), strongly-typed forms (Angular 14+ feature now standard), validators (built-in and custom), async validators, FormArray for dynamic forms, and the discipline of wiring forms to APIs without prop-drilling state. We finish with a multi-step wizard.",
      topics: [
        "Reactive forms — FormControl, FormGroup, FormArray",
        "Strongly-typed forms (Angular 14+)",
        "Validators — built-in and custom, sync and async",
        "FormArray for dynamic / repeating forms",
        "Cross-field validation",
        "Multi-step wizards with state preservation",
        "Form accessibility — labels, error announcement, focus management",
      ],
    },
    {
      title: "Routing, Lazy Loading & @defer",
      weekRange: "Week 6",
      description:
        "Angular Router done properly — standalone-route configuration (functional Routes array, no NgModules), nested / child routes, route parameters, query params, route guards (CanActivate, CanMatch — the 2026 default), route data, lazy loading via dynamic import, and Angular 17+'s @defer block for granular template-level code splitting. Plus the discipline of designing a route tree that scales to 100+ routes without a refactor.",
      topics: [
        "Standalone routes — functional configuration",
        "Nested routes, child routes, named outlets",
        "Route parameters and query params",
        "Route guards — CanActivate, CanMatch, CanDeactivate",
        "Lazy loading via dynamic import",
        "@defer block — when, on, prefetch",
        "Route tree design for large applications",
      ],
    },
    {
      title: "HTTP Client, Interceptors & RxJS for Real Work",
      weekRange: "Week 7",
      description:
        "HTTP and RxJS together — the integration layer where Angular meets the backend. Cover HttpClient (the 2026 default with the standalone provideHttpClient() bootstrap), functional HTTP interceptors (the new pattern, replacing class-based interceptors), and RxJS at the level you actually use — map, switchMap, mergeMap, concatMap, debounceTime, distinctUntilChanged, catchError, retry. Plus the discipline of when to use a Signal vs an Observable and how to interop (toSignal, toObservable). We finish with a small dashboard consuming a real API with proper error handling and loading states.",
      topics: [
        "HttpClient with provideHttpClient()",
        "Functional HTTP interceptors (Angular 15+)",
        "RxJS — Observables, Subjects, BehaviorSubject",
        "Operators that matter — map, switchMap, debounceTime, catchError",
        "switchMap vs mergeMap vs concatMap — the practical guide",
        "Signal / Observable interop — toSignal, toObservable",
        "Error handling and retry patterns",
      ],
    },
    {
      title: "Authentication, Authorization & Security",
      weekRange: "Week 8",
      description:
        "JWT authentication flows (login, refresh, logout), HTTP interceptors for auth headers, route guards for role-based access, secure storage (httpOnly cookies vs localStorage — and why the answer matters in production), CSRF protection, XSS defences, and the Angular built-in sanitisation that covers most innerHTML risks. Plus the integration patterns for Pune enterprise SSO (Azure AD / Entra ID, OAuth2 with PKCE, OIDC) that come up on every BFSI / large-captive interview.",
      topics: [
        "JWT auth flow — login, refresh, logout",
        "Auth-header interceptor",
        "Route guards for role-based access",
        "Secure storage — httpOnly cookies vs localStorage",
        "CSRF, XSS, clickjacking — Angular defences",
        "Angular sanitisation and DomSanitizer",
        "OAuth2 + PKCE, OIDC, Azure AD / Entra ID integration",
      ],
    },
    {
      title: "Testing — Karma, Jasmine, Vitest & Playwright",
      weekRange: "Week 9",
      description:
        "Testing as Pune enterprise teams actually do it. Unit tests with Jasmine + the Angular TestBed (the historical default in BFSI / IT services), Vitest for newer projects (faster, ESM-native, gaining adoption), component / integration tests, marble testing for RxJS, and Playwright for end-to-end flows. We cover the discipline of testing what users see (not implementation details), MSW for HTTP mocking, and the testing pyramid that produces the coverage senior engineers actually trust.",
      topics: [
        "Jasmine + Karma + TestBed — the historical default",
        "Vitest for newer Angular projects",
        "Component testing — querying, interaction, async",
        "Marble testing for RxJS streams",
        "MSW for HTTP mocking in tests",
        "Playwright for end-to-end flows",
        "Coverage — useful metrics vs theatre",
      ],
    },
    {
      title: "Performance, SSR & Production Deployment",
      weekRange: "Week 10",
      description:
        "Performance — Core Web Vitals (LCP, INP, CLS) and how Angular's change detection / OnPush / Signals affect each, bundle analysis with source-map-explorer, the discipline of measuring before optimising, lazy loading and @defer for code splitting. Server-Side Rendering with Angular Universal / Hydration (now built-in), the Pune enterprise deployment patterns (Nginx + Node.js for SSR, Azure Static Web Apps, AWS S3 + CloudFront for SPA), GitHub Actions / Azure Pipelines for CI/CD, plus error tracking and analytics integration.",
      topics: [
        "Core Web Vitals — LCP, INP, CLS, TTFB",
        "OnPush change detection vs Signals",
        "Bundle analysis with source-map-explorer",
        "Server-Side Rendering with Hydration",
        "Pune enterprise deployment patterns",
        "Azure Static Web Apps / S3 + CloudFront",
        "GitHub Actions / Azure Pipelines CI/CD",
        "Error tracking — Sentry, Application Insights",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune Angular hiring panels — Bajaj Finserv, Cognizant, Capgemini, Mercedes-Benz R&D, Cummins, BMW TechWorks. Includes a live-coding round (build a small component / form / pipe in 30 minutes), an Angular conceptual round (DI, change detection, Signals vs Observables, route guards), and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Live-coding mock — component / form / pipe",
        "Angular conceptual mock round",
        "Behavioural and product-thinking round",
        "Resume + LinkedIn rewrite for Angular Developer JDs",
        "GitHub portfolio polish — deployed apps, Lighthouse scores",
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
      title: "Enterprise Dashboard with Reactive Forms + RxJS + NgRx",
      description:
        "A complete enterprise dashboard — a domain you choose (loan application portal, employee onboarding, asset tracking, ticketing system) — with reactive forms (multi-step wizards, dynamic FormArray fields, async validation), RxJS-driven data flow with switchMap / debounceTime / catchError, NgRx for global state (auth, notifications, current entity), role-based route guards, JWT auth with refresh-token interceptor, and full Jasmine + Playwright test coverage. Deployed to Azure Static Web Apps or AWS S3 + CloudFront with GitHub Actions CI/CD. Outcome: a public GitHub repository with a clickable demo URL — exactly what Pune Angular enterprise hiring panels interview on.",
      technologies: [
        "Angular 19 (standalone, Signals)",
        "Reactive forms with strongly-typed forms",
        "RxJS",
        "NgRx",
        "Tailwind or Angular Material",
        "Jasmine + Playwright",
        "Azure Static Web Apps or AWS S3 + CloudFront",
        "GitHub Actions",
      ],
    },
    {
      title: "Real-Time BFSI-Style Trading / Live-Data Dashboard",
      description:
        "A real-time data-heavy dashboard — live price ticker via WebSocket, charts via ngx-charts or Highcharts, multi-tab synchronised state via BroadcastChannel, virtual scrolling for 10,000+ rows via @angular/cdk, OnPush + Signals for performance, full keyboard navigation. Includes a Sentry-instrumented error boundary equivalent and Application Insights telemetry. Demonstrates the patterns Pune BFSI and Capital Markets teams hire on — high data volume, low latency, accessible, observable.",
      technologies: [
        "Angular 19 + Signals + OnPush",
        "WebSocket / Socket.io",
        "ngx-charts / Highcharts",
        "@angular/cdk virtual scrolling",
        "BroadcastChannel for tab sync",
        "Sentry + Application Insights",
        "Tailwind + Angular Material",
      ],
    },
    {
      title: "Authenticated SSR Application with Hydration",
      description:
        "A full Server-Side Rendering Angular application with built-in Hydration — public pages SSR'd for SEO and TTFB, authenticated routes hydrated client-side, OAuth2 + PKCE login (via Auth0 or Azure AD test tenant), full @defer-based code splitting, structured logging via pino, and the Pune enterprise deployment story (Nginx + Node + PM2 or Azure App Service). Outcome: a 2026-relevant SSR-first Angular project that demos in 5 minutes and signals senior-Angular thinking on the resume.",
      technologies: [
        "Angular 19 with SSR + Hydration",
        "OAuth2 + PKCE / Azure AD",
        "@defer for code splitting",
        "Express + Angular Universal",
        "Tailwind / Angular Material",
        "Azure App Service or Nginx + PM2",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer — Modern Web & Mobile, hands-on at Mindstix Software Labs, ships Angular / React / Next every day). Amol personally leads every Angular session from Day 1 through capstone — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Angular Developer is one of the most-hired enterprise frontend roles in Pune in 2026 — Indeed Pune lists 700+ active openings, with the highest concentration in BFSI, large captives, and IT services. The biggest employers are Bajaj Finserv, Cognizant Pune Capital Markets, Capgemini, TCS, Infosys, Synechron, Mercedes-Benz R&D India, Cummins, John Deere ETC, Honeywell, plus the Pune-based teams of Atos / Eviden, Wipro, and Mphasis. Compensation is comparable to React at junior / mid level and slightly higher at senior in BFSI specifically (Pune Capital Markets pays a premium for Angular + financial-domain depth).",
      "What pulls an Angular developer above the median band: depth on at least one state-management approach (NgRx or Signal-based stores), demonstrable RxJS fluency at the operators-you-actually-use level, one production deployment with SSR or strict CI/CD, and TypeScript discipline. Our capstone projects are designed exactly around these signals.",
      "Senior Angular Developer bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Angular Developer (Pune)",
        band: "₹6,40,000 per year average",
        source: {
          label: "Indeed Pune (Angular Developer)",
          url: "https://in.indeed.com/career/angular-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Angular Developer (Pune entry, <2 years)",
        band: "₹3,50,000 – ₹6,00,000 per year",
        source: {
          label: "AmbitionBox Pune Angular Developer",
          url: "https://www.ambitionbox.com/profile/angular-developer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Angular Developer (Pune, 3–5 years)",
        band: "₹9,00,000 – ₹16,00,000 per year",
        source: {
          label: "Glassdoor Pune Angular Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-angular-developer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm",
        },
      },
      {
        role: "Senior Angular Developer (Pune BFSI, 5–8 years)",
        band: "₹16,00,000 – ₹26,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Angular Developer",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-angular-developer-salary-SRCH_IL.0,4_IM1072_KO5,29.htm",
        },
      },
      {
        role: "Lead / Staff Frontend Engineer — Angular (national)",
        band: "₹22,00,000 – ₹40,00,000 per year",
        source: {
          label: "6figr India Lead Frontend Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-frontend-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Bajaj Finserv",
      "Cognizant Pune Capital Markets",
      "Capgemini",
      "TCS",
      "Infosys",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins India",
      "John Deere ETC",
      "Honeywell",
      "BMW TechWorks India",
      "Atos / Eviden",
      "Wipro",
      "Mphasis",
      "Persistent Systems",
      "BMC Software",
    ],
    rolesAfterCourse: [
      "Angular Developer",
      "Frontend Developer (Angular-focused)",
      "UI Developer",
      "Web Application Developer",
      "Junior Full Stack Developer (.NET + Angular / Java + Angular)",
      "Senior Frontend Developer (with experience)",
    ],
  },

  modesAndDuration: {
    duration:
      "10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation (~2.5 months total)",
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
        "Azure Static Web Apps free tier for capstone deployments",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~4 months instead of 2.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's PR personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full SSR / Hydration module and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 7 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed Angular dashboards, your GitHub has at least two production-style repositories, and you have completed at least three mock technical interviews against question banks from Pune Angular hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 7 — resume and LinkedIn rewrite, calibrated for Angular Developer JDs",
      "Week 8 — GitHub portfolio cleanup, deployed demo URLs, Lighthouse score badges",
      "Weeks 9–10 — Angular conceptual drills (DI, change detection, Signals, RxJS), live-coding mock rounds, behavioural prep",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies, with extra emphasis on BFSI / IT services",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Bajaj Finserv",
      "Cognizant",
      "Capgemini",
      "TCS",
      "Infosys",
      "Synechron",
      "Mercedes-Benz R&D India",
      "Cummins",
      "John Deere ETC",
      "Honeywell",
      "Atos / Eviden",
      "Wipro",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Angular training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Chougule",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Angular version covered",
        archer: "Angular 19 — standalone components, Signals, @if / @for / @defer",
        typical: "Often Angular 13 or 14, with NgModules as the default",
      },
      {
        feature: "Standalone components by default",
        archer: "Yes — NgModules taught only as a 'reading legacy code' note",
        typical: "NgModules-first, standalone treated as 'advanced'",
      },
      {
        feature: "Signals reactivity covered",
        archer: "Yes — signal, computed, effect, toSignal interop, full module",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "RxJS depth",
        archer: "Operators-you-actually-use level — switchMap, debounceTime, catchError, marble testing",
        typical: "Slide deck of operator names, no real practice",
      },
      {
        feature: "State management approach",
        archer: "Signal-based stores AND NgRx — honest comparison of when each fits",
        typical: "NgRx-only or no state-management coverage",
      },
      {
        feature: "Testing in the curriculum",
        archer: "Jasmine + Vitest + Playwright with real coverage",
        typical: "Theory-only or skipped entirely",
      },
      {
        feature: "SSR / Hydration covered",
        archer: "Full week dedicated, capstone option uses it",
        typical: "Mentioned briefly or skipped",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed apps with Lighthouse scores",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student deployed Angular dashboards before you pay.",
  },

  versusAlternative: {
    heading: "Angular vs React — Which Should You Learn First in Pune?",
    paragraphs: [
      "Angular vs React is the most-asked question in Pune frontend counselling — and the wrong question. Both have ample Pune jobs, both pay similarly at equivalent experience, and the right choice depends on which Pune companies you want to work for and what kind of frontend work you enjoy.",
      "Choose Angular if your goal is enterprise IT, BFSI dashboards, large captive R&D centres (Mercedes-Benz, Cummins, John Deere ETC, Honeywell), or .NET / Java enterprise full-stack roles where Angular is the institutional default. Pune BFSI and Capital Markets teams (especially Bajaj Finserv, Cognizant Pune Capital Markets, Synechron) hire Angular far more than React. Angular's TypeScript-first design, integrated routing / forms / DI, and strong patterns for large teams make it the natural fit for these environments.",
      "Choose React if your goal is product engineering, Pune SaaS or fintech startups, React Native mobile down the road, or remote / global hiring. Indeed Pune lists 1,300+ React openings vs 700+ Angular — the React job market is wider and growing faster, but Angular roles often pay a small premium at senior in BFSI specifically.",
      "Honest recommendation: pick Angular if you have a specific BFSI / enterprise / .NET target. Pick React if you are unsure or skew toward product / startup. Many of our students learn the second framework as a side skill once placed; senior frontend engineers in Pune often know both at a working level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: working JavaScript at the ES2020+ level (functions, closures, async / await, modules, destructuring), HTML and CSS basics, and willingness to commit 8–10 hours per week of practice outside class. We expect basic JS fluency on day 1; week 1 levels up to TypeScript and the Angular toolchain. If you have done our JavaScript course or equivalent self-study, you are ready. Pure non-developers should do a JavaScript course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (Node / npm install, Angular CLI, GitHub account, VS Code setup)",
      "Show up to day one with a laptop running 64-bit OS, 8GB+ RAM, and Node.js 22 LTS pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Angular training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed Angular apps and Lighthouse scores, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Angular training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 10 weeks of structured curriculum plus 2 weeks of capstone project and interview preparation. The weekend batch stretches over ~4 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of an Angular Developer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6.40 lakh per year for Angular Developer (May 2026). Junior Angular Developer Pune entry sits at ₹3.5–6 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹9–16 lakh per Glassdoor. Senior Angular Developers in Pune BFSI (5–8 years) earn ₹16–26 lakh. Lead / Staff Frontend Engineers earn ₹22–40 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the Angular course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full SSR / Hydration module and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    },
    {
      question: "Do I need TypeScript before learning Angular?",
      answer:
        "No — week 1 covers TypeScript at the level you actually need for Angular (types, interfaces, generics, decorators, strict null checks). What we do expect is basic JavaScript (ES2020+) fluency. If you are new to JavaScript, take our JavaScript course or equivalent self-study first.",
    },
    {
      question: "Angular or React — which should I learn first in Pune?",
      answer:
        "Angular if your goal is enterprise IT, BFSI dashboards, large captive R&D centres, or .NET / Java enterprise full-stack roles — Pune BFSI hires Angular far more than React. React if your goal is product engineering, SaaS / fintech startups, or React Native mobile work — Indeed Pune lists 1,300+ React vs 700+ Angular openings. Both pay similarly at equivalent experience.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) enterprise dashboard with reactive forms + RxJS + NgRx, (2) real-time BFSI-style trading / live-data dashboard with WebSocket and virtual scrolling, (3) authenticated SSR application with Hydration. All three become public GitHub repositories with clickable demo URLs.",
    },
    {
      question: "Do you cover Signals and the new control-flow syntax?",
      answer:
        "Yes — Signals (signal, computed, effect, toSignal interop) and the new @if / @for / @switch / @defer control-flow syntax are first-class throughout the course. We do not teach NgModules or *ngIf / *ngFor as the default; those are covered as 'reading legacy code' notes only. Modern Angular is what Pune hiring panels in 2026 expect.",
    },
    {
      question: "Do you cover NgRx?",
      answer:
        "Yes — week 4 covers NgRx (store, actions, reducers, effects, selectors) alongside Signal-based stores. We give an honest comparison of when NgRx earns its complexity (large teams, complex async flows, time-travel debugging) vs when it is over-engineering for the use case. Most Pune BFSI Angular roles ask about NgRx at interview, so we cover it deeply.",
    },
    {
      question: "Is RxJS covered?",
      answer:
        "Yes — week 7 covers RxJS at the level you actually use in production (Observables, Subjects, switchMap / mergeMap / concatMap, debounceTime, catchError, retry, marble testing). We don't run through every operator name; we focus on the 15–20 operators that handle 95% of real Angular work.",
    },
    {
      question: "Are weekend Angular classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5. Same content, same trainer, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Can I switch from AngularJS (1.x) to modern Angular via this course?",
      answer:
        "Yes — and we have a sizable cohort doing exactly this. Working AngularJS 1.x developers transitioning into modern Angular 19 typically slot in well; the dependency-injection mental model and TypeScript / RxJS layers translate. We adjust capstone scope for migration-path students to highlight your existing strengths.",
    },
    {
      question: "Does this course prepare me for Angular SSR / Universal?",
      answer:
        "Yes — week 10 covers Server-Side Rendering with Angular's built-in Hydration (the 2026 default, replacing the older Angular Universal pattern). Capstone Project #3 is a complete SSR application with OAuth2 + PKCE login. SSR is increasingly expected on senior Angular interviews.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for Angular Developer roles (live-coding + Angular conceptual + behavioural rounds), referrals via our alumni network at 12+ partner companies (with extra emphasis on BFSI / IT services where Angular is dominant), resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Chougule personally leads every Angular session from Day 1 through capstone — he ships Angular for a living at Mindstix Software Labs and brings real production patterns into the classroom. The same name on this page is the same person you meet on day one; his LinkedIn is on the trainer profile page, and we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Angular training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol Chougule is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed Angular dashboards, meet a current batch, and decide with full information.",
  },
};
