import type { CourseRichContent } from "./types";

/**
 * MEAN Stack — rich content overlay.
 *
 * Written from the Archer Infotech MEAN Stack syllabus (122 numbered
 * sections). The course is MERN's sibling in stack terms — same MongoDB,
 * Express and Node — so the deliberate editorial line here is to spend the
 * page's weight on what actually differs: TypeScript as a requirement rather
 * than an option, Angular as a framework rather than a library, RxJS, and the
 * enterprise hiring pattern that follows from both.
 */

export const meanStackTrainingInPune: CourseRichContent = {
  intro:
    "MEAN is the JavaScript stack Pune's enterprise teams standardise on — MongoDB, Express, Angular and Node.js, written in TypeScript from end to end. Where MERN gives you a library and a set of choices, Angular gives you a framework with routing, forms, HTTP, dependency injection and testing already decided, which is exactly why large codebases and long-lived enterprise applications favour it. This five-month programme runs from web fundamentals and JavaScript through TypeScript, Angular with RxJS and NgRx, Node and Express REST APIs, MongoDB schema design, authentication, testing, Docker and cloud deployment, closing with a deployed capstone and interview preparation. Classroom batches in Kothrud, live online and weekend formats.",

  whyLearn: {
    heading: "Why Learn MEAN Stack in Pune in 2026",
    paragraphs: [
      "Angular's position in the Pune market is misread constantly. React has more total openings, which people take to mean Angular is fading — but the Angular openings sit disproportionately in enterprise engineering: GCC captives, banking and insurance platforms, healthcare systems, and the long-lived internal applications that services majors maintain for years. Those roles are less visible on job boards aimed at startups and considerably more stable. Capgemini, Cognizant, Persistent Systems, Tech Mahindra, Emerson and the BFSI captives across Kharadi and Hinjewadi all run Angular estates.",
      "The second reason is structural, and it is the honest argument for learning Angular rather than only React. Angular is opinionated: routing, forms, HTTP, dependency injection, testing and the build pipeline arrive in the box and work the same way in every codebase. That is a constraint on a solo developer and an advantage on a team of forty, which is why enterprises pick it. A developer who has worked through Angular's structure — modules, services, injectors, reactive forms, RxJS streams — has seen a set of software-engineering patterns that transfer well beyond the framework.",
      "The third is TypeScript, and it is not optional here. Angular is written in TypeScript and assumes it, so a MEAN developer arrives fluent in types, interfaces, generics and decorators rather than treating them as an add-on. In 2026 that is a hiring advantage across the whole JavaScript market — including React roles, where TypeScript is now the default and candidates who learned JavaScript-only are visibly behind.",
    ],
    keyPoints: [
      "One language — TypeScript — across frontend, backend and tooling",
      "Angular concentrated in Pune enterprise, BFSI and GCC captive hiring",
      "Framework conventions that hold up on large, long-lived codebases",
      "RxJS and reactive programming — a genuinely transferable skill",
      "MongoDB, Express and Node shared with the MERN track",
      "TypeScript fluency that lifts your value in React roles too",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Students and graduates who want one language across the entire application rather than two",
      "Developers targeting enterprise, BFSI, healthcare or GCC captive engineering teams in Pune",
      "Frontend developers who want backend depth without learning a second language",
      "Java or .NET developers moving to JavaScript who will find Angular's structure familiar",
      "Anyone who prefers a framework that makes decisions over a library that defers them",
      "Working professionals who want TypeScript fluency as the transferable outcome",
    ],
    notForYou: [
      "Anyone targeting early-stage startups specifically — those roles skew heavily React, so take the MERN track instead",
      "Learners who want the shortest possible route to a deployed project — Angular's structure costs time before it pays it back",
      "Developers who dislike opinionated tooling; Angular's conventions are the point, and resenting them makes the whole course harder",
      "Anyone hoping to avoid TypeScript — it is not optional in Angular and this course does not pretend otherwise",
      "Complete beginners unwilling to commit 8–10 hours of practice a week outside class",
    ],
  },

  curriculum: [
    {
      title: "Programming & Web Development Fundamentals",
      weekRange: "Week 1",
      description:
        "The mental model before the syntax. How a web application actually works — client and server, the request-response lifecycle, what HTTP and HTTPS do, why three-tier architecture exists, and what separates a static site from a dynamic one. You set up the toolchain properly on day one (VS Code, Node, npm, Git) rather than fixing environment problems in week six, and make your first commits.\n\nThis week also fixes the vocabulary the rest of the course leans on: what an API is, what REST means, and what development, staging and production environments are for. Learners who skip this arrive at Express in week fourteen still unsure what a status code is.",
      topics: [
        "How web applications work — client, server, database",
        "Client-server architecture and the request-response lifecycle",
        "HTTP and HTTPS, methods, status codes and headers",
        "Three-tier architecture — presentation, application, data",
        "Frontend versus backend responsibilities",
        "Static versus dynamic websites",
        "REST API fundamentals",
        "Development, staging and production environments",
        "VS Code setup, extensions and the integrated terminal",
        "Node.js and npm installation",
        "Git and GitHub — first repository, first commits",
      ],
    },
    {
      title: "HTML5 & CSS3 Foundations",
      weekRange: "Weeks 1–2",
      description:
        "Semantic markup and the styling model underneath every Angular template you will later write. HTML5 structure, forms and their input types, tables, media and accessibility attributes — written semantically, because Angular renders into this and a component built on div soup is unreadable and unindexable alike.\n\nCSS then goes deeper than most courses take it: selectors and specificity, the cascade, the box model, positioning and stacking contexts. Specificity in particular is where beginners lose hours to styles that will not apply, and it is worth understanding rather than defeating with `!important`.",
      topics: [
        "Semantic HTML5 structure and document outline",
        "Text, lists, links, images and tables",
        "Forms — input types, labels, validation attributes",
        "Media elements — audio, video, iframe",
        "Accessibility attributes and why they matter",
        "CSS selectors, specificity and the cascade",
        "The box model — margin, border, padding, content",
        "Display, positioning and stacking contexts",
        "Colours, units, typography and web fonts",
        "Backgrounds, borders, shadows and gradients",
        "Transitions and transforms",
      ],
    },
    {
      title: "Modern CSS Layouts & Responsive Design",
      weekRange: "Week 2",
      description:
        "Flexbox and Grid taught as the two tools they are, with a clear rule for choosing between them: Flexbox for one dimension, Grid for two. You build real layouts — navigation bars, card grids, dashboards, holy-grail page shells — rather than reading property lists.\n\nResponsive design then covers the mobile-first method, breakpoints chosen from content rather than device names, fluid typography and responsive images. The deliverable is a layout that holds together from a 360-pixel phone to a wide desktop, which is the standard every later Angular component is held to.",
      topics: [
        "Flexbox — axes, alignment, growth, shrink and basis",
        "CSS Grid — template areas, tracks, gaps, auto-placement",
        "Choosing between Flexbox and Grid",
        "Mobile-first methodology and breakpoint strategy",
        "Media queries and container queries",
        "Fluid typography with clamp()",
        "Responsive images and srcset",
        "CSS variables and design tokens",
        "Common layout patterns — nav, sidebar, card grid, dashboard",
        "Debugging layout with browser dev tools",
      ],
    },
    {
      title: "Bootstrap & Tailwind CSS",
      weekRange: "Week 3",
      description:
        "Two different answers to the same problem, both taught because Pune teams use both. Bootstrap gives you a component library and a grid — fast for admin panels, internal tools and anything where consistency beats distinctiveness, and still extremely common in enterprise Angular projects. Tailwind gives you utility classes and no components, which suits custom interfaces and is what most new work starts with.\n\nThe judgement taught here is when each is right, and how to customise either without fighting it — Bootstrap through Sass variables, Tailwind through its config file.",
      topics: [
        "Bootstrap grid system and breakpoints",
        "Bootstrap components — navbar, cards, modals, forms",
        "Bootstrap utilities and customisation through Sass variables",
        "Tailwind utility-first methodology",
        "Tailwind configuration, theming and design tokens",
        "Responsive and state variants in Tailwind",
        "Component extraction and avoiding class soup",
        "Angular Material as the third option, and where it fits",
        "Choosing a UI approach for a project",
      ],
    },
    {
      title: "JavaScript Fundamentals",
      weekRange: "Weeks 3–4",
      description:
        "The language itself, taught properly, because every problem later in the course is a JavaScript problem wearing an Angular or Node costume. Variables and the difference `let`, `const` and `var` actually make; data types and the coercion rules that produce JavaScript's famous surprises; operators, conditionals and loops; and functions in all their forms.\n\nScope, hoisting and closures get real time rather than a mention. Closures are the concept that separates a developer who can read framework source from one who cannot, and they arrive again in week twelve when RxJS operators start looking like magic.",
      topics: [
        "Variables — let, const, var and the differences that matter",
        "Data types, type coercion and strict equality",
        "Operators — arithmetic, logical, comparison, ternary",
        "Conditionals and switch",
        "Loops — for, while, for...of, for...in",
        "Function declarations, expressions and arrow functions",
        "Parameters, default values and rest arguments",
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
        "The data-handling half of JavaScript, and the part you use every single day. Arrays and their mutating versus non-mutating methods; objects, nesting, references and how copying actually behaves. Then the functional array methods — map, filter, reduce, find, some, every — taught until transforming a data structure is reflex rather than effort.\n\nThis matters disproportionately in Angular. Every list you render, every HTTP response you reshape and every RxJS stream you transform is this material applied. Learners who are shaky here write loops where a map would do, and it shows in code review.",
      topics: [
        "Array creation, indexing and iteration",
        "Mutating versus non-mutating array methods",
        "map, filter, reduce — with real transformations",
        "find, findIndex, some, every, includes",
        "sort and the comparator function",
        "Objects, nested objects and property access",
        "Reference versus value, and shallow versus deep copy",
        "Destructuring arrays and objects",
        "Spread and rest with arrays and objects",
        "Optional chaining and nullish coalescing",
        "JSON — parse, stringify and common pitfalls",
      ],
    },
    {
      title: "Object-Oriented & Modern JavaScript (ES6+)",
      weekRange: "Week 5",
      description:
        "Classes, prototypes, inheritance and encapsulation — the object model Angular's services and components are built on, so that `@Injectable` and `@Component` later read as decorated classes rather than incantations. Prototypal inheritance is covered honestly, including why it confuses people arriving from Java or C#.\n\nThe ES6+ half covers everything modern JavaScript added that you will see in every Angular codebase: modules with import and export, template literals, symbols, iterators and generators, maps and sets, and the syntax that makes current code look nothing like the JavaScript of ten years ago.",
      topics: [
        "Classes, constructors, methods and fields",
        "Inheritance, super and method overriding",
        "Getters, setters and private fields",
        "Static members and utility classes",
        "Prototypes and the prototype chain",
        "ES modules — import, export, default exports",
        "Template literals and tagged templates",
        "Map, Set, WeakMap and WeakSet",
        "Iterators, generators and Symbol.iterator",
        "Object and array methods added in ES2020+",
        "Immutability patterns and structured cloning",
      ],
    },
    {
      title: "DOM, Events, Forms & Browser Storage",
      weekRange: "Weeks 5–6",
      description:
        "How JavaScript actually reaches the page — and why Angular exists. You manipulate the DOM directly first: selecting, creating, updating and removing elements, handling events, delegating them, and understanding bubbling and capturing. Then form handling and validation by hand, which is genuinely tedious.\n\nThat tedium is the point. Building the same form twice — once by hand here, once with Angular's reactive forms in week eleven — is the fastest way to understand what a framework buys you and why its abstractions are shaped the way they are.",
      topics: [
        "Selecting elements — querySelector and friends",
        "Creating, updating and removing nodes",
        "Attributes, properties, classList and dataset",
        "Event listeners, the event object, bubbling and capturing",
        "Event delegation and why it scales",
        "Preventing default behaviour and stopping propagation",
        "Form submission, field access and constraint validation",
        "Custom validation and error display by hand",
        "localStorage, sessionStorage and their limits",
        "Cookies, and when to use which storage",
        "A small project built with no framework at all",
      ],
    },
    {
      title: "Asynchronous JavaScript & API Communication",
      weekRange: "Week 6",
      description:
        "The concept most beginners get wrong and every interviewer asks about. The single-threaded model, the call stack, the event loop, the task and microtask queues — worked through with code you run and predict, because the theory only sticks when you have got the ordering wrong once yourself.\n\nThen callbacks and their nesting problem, promises and chaining, async/await, and error handling across all three. The module closes on fetch, request and response handling, HTTP status codes in practice, CORS and the errors it produces, and consuming a real third-party API — which is the ground Angular's HttpClient stands on.",
      topics: [
        "Single-threaded execution and the call stack",
        "The event loop, task queue and microtask queue",
        "Callbacks and callback nesting",
        "Promises — states, chaining, catch and finally",
        "Promise.all, allSettled, race and any",
        "async/await and error handling with try/catch",
        "fetch — requests, responses, headers, JSON",
        "HTTP status codes in practice",
        "CORS, and reading the error it produces",
        "AJAX history and why XMLHttpRequest still appears",
        "Consuming a real third-party API end to end",
      ],
    },
    {
      title: "TypeScript",
      weekRange: "Week 7",
      description:
        "Not an optional extra here — Angular is written in TypeScript and assumes it, so this week is a prerequisite rather than an enhancement. Types, inference, unions, literals and the primitive set; interfaces and type aliases and when each is right; functions with typed parameters, returns, overloads and generics.\n\nThe Angular-specific material gets particular attention: decorators, which are how `@Component`, `@Injectable` and `@Input` work; access modifiers and constructor parameter properties, which is why Angular services are injected the way they are; and the compiler options that decide how strict your codebase is. By the end, Angular's syntax has no unexplained magic in it.",
      topics: [
        "Types, inference and the primitive set",
        "Union, intersection and literal types",
        "Interfaces versus type aliases",
        "Optional, readonly and index signatures",
        "Typed functions, overloads and return types",
        "Generics — functions, interfaces and constraints",
        "Classes, access modifiers and parameter properties",
        "Decorators — the mechanism behind Angular's annotations",
        "Enums, tuples, never, unknown and any",
        "Type narrowing and type guards",
        "tsconfig, strict mode and compiler options",
        "Utility types — Partial, Pick, Omit, Record",
      ],
    },
    {
      title: "Angular Fundamentals & Components",
      weekRange: "Weeks 8–9",
      description:
        "Angular proper. The CLI, project structure, the build pipeline and what standalone components changed about how applications are organised. Then components as the unit of everything: templates, styles, encapsulation, the lifecycle hooks and what each is actually for.\n\nComponent communication gets careful treatment — `@Input`, `@Output`, EventEmitter, content projection, view and content children — because getting data flow right is what keeps an Angular application maintainable at forty components and what makes it unmaintainable at four hundred if you get it wrong. You build a component library of your own rather than only consuming one.",
      topics: [
        "Angular CLI, project structure and the build pipeline",
        "Standalone components and NgModules",
        "Component decorator, templates and styles",
        "View encapsulation and style scoping",
        "Lifecycle hooks and what each is for",
        "@Input and @Output with EventEmitter",
        "Content projection with ng-content",
        "ViewChild, ContentChild and template references",
        "Change detection — default and OnPush",
        "Signals and the modern reactivity model",
        "Building a reusable component library",
      ],
    },
    {
      title: "Data Binding, Directives & Pipes",
      weekRange: "Week 9",
      description:
        "Angular's template language, which is where most of the framework's day-to-day expressiveness lives. All four binding forms — interpolation, property, event and two-way — with a clear account of when two-way binding is convenient and when it quietly makes state impossible to reason about.\n\nBuilt-in structural and attribute directives, the modern control-flow syntax, and then writing your own directives, which is the point at which Angular stops feeling like a set of rules and starts feeling like a toolkit. Pipes cover the built-in set, custom pipes, and the pure-versus-impure distinction that decides whether a pipe is a performance win or a performance bug.",
      topics: [
        "Interpolation and property binding",
        "Event binding and the $event object",
        "Two-way binding with ngModel, and its trade-offs",
        "Attribute, class and style bindings",
        "Structural directives — ngIf, ngFor, ngSwitch",
        "The modern @if, @for and @switch control flow",
        "trackBy and list rendering performance",
        "Built-in attribute directives",
        "Writing custom attribute and structural directives",
        "Built-in pipes — date, currency, async and others",
        "Custom pipes, pure versus impure",
      ],
    },
    {
      title: "Services, Dependency Injection & Routing",
      weekRange: "Week 10",
      description:
        "The architectural half of Angular, and the part that transfers furthest as a software-engineering idea. Services as the place logic lives when it does not belong to a component; the injector hierarchy; provider scopes; and why dependency injection makes code testable rather than merely fashionable.\n\nRouting then covers configuration, parameters, query strings, child and lazy-loaded routes, guards for protecting pages, and resolvers for loading data before a route activates. Lazy loading gets emphasis because it is the difference between an enterprise application that loads in two seconds and one that loads in nine.",
      topics: [
        "Services and the single-responsibility boundary",
        "@Injectable, providedIn and provider scopes",
        "The injector hierarchy and resolution",
        "Injection tokens and useValue, useClass, useFactory",
        "Router configuration and RouterOutlet",
        "Route parameters, query parameters and fragments",
        "Child routes and nested outlets",
        "Lazy loading feature areas",
        "Route guards — canActivate, canDeactivate, canMatch",
        "Resolvers and preloading strategies",
        "Programmatic navigation and route state",
      ],
    },
    {
      title: "Forms & HTTP Client",
      weekRange: "Week 11",
      description:
        "Both Angular form systems, and an honest rule for choosing. Template-driven forms are quicker for simple cases; reactive forms are explicit, testable and the right default for anything with real validation. You build the same form both ways and compare, which settles the question better than any recommendation.\n\nValidation covers the built-in validators, custom synchronous and asynchronous validators, cross-field rules and error display that a user can act on. HttpClient then covers requests, typed responses, headers, parameters, error handling with retry, and interceptors — the mechanism you will use in week fourteen to attach JWTs to every outgoing request without touching a single service.",
      topics: [
        "Template-driven forms and ngModel",
        "Reactive forms — FormControl, FormGroup, FormArray",
        "FormBuilder and typed forms",
        "Built-in validators and custom validators",
        "Async validators and cross-field validation",
        "Form state, dirty and touched, and error display",
        "Dynamic forms built from configuration",
        "HttpClient — GET, POST, PUT, PATCH, DELETE",
        "Typed responses, headers and query parameters",
        "Error handling, catchError and retry",
        "HTTP interceptors — auth tokens, logging, loaders",
      ],
    },
    {
      title: "RxJS & Reactive Programming",
      weekRange: "Week 12",
      description:
        "The part of Angular that people either love or avoid, taught until it is neither mysterious nor scary. Observables as streams over time, and the genuine difference between an observable and a promise — cancellation, multiple values, laziness. Subjects, BehaviorSubject and ReplaySubject and what each is actually for.\n\nThe operators are taught by problem rather than by list: debounce a search box, switch to a new request and cancel the old one, combine two streams, retry a failed call. Subscription management and the unsubscribe patterns get their own time, because leaked subscriptions are the most common real bug in Angular applications and they never announce themselves.",
      topics: [
        "Observables, observers and subscriptions",
        "Observable versus promise — cancellation and multiple values",
        "Creating observables — of, from, interval, fromEvent",
        "Subject, BehaviorSubject, ReplaySubject",
        "Transformation operators — map, pluck, scan",
        "Filtering — filter, debounceTime, distinctUntilChanged, take",
        "Flattening — switchMap, mergeMap, concatMap, exhaustMap",
        "Combination — combineLatest, forkJoin, withLatestFrom",
        "Error handling — catchError, retry, retryWhen",
        "Subscription management, takeUntil and async pipe",
        "Typeahead search built end to end with RxJS",
      ],
    },
    {
      title: "State Management & Angular UI Engineering",
      weekRange: "Week 13",
      description:
        "When an application outgrows services holding state, and what to do about it. Service-with-a-BehaviorSubject is covered first and honestly — it is the right answer more often than the ecosystem admits. NgRx is then taught properly: actions, reducers, selectors, effects and the store, along with a clear statement of what it costs in ceremony and when that cost is worth paying.\n\nThe UI half covers Angular Material and the CDK, theming, accessibility, animation, and the practical work of building an interface that is usable rather than merely complete — loading states, empty states, error states and the details that separate a student project from a product.",
      topics: [
        "State in services with BehaviorSubject",
        "Signals as application state",
        "NgRx store, actions and reducers",
        "Selectors and memoisation",
        "Effects for side effects and API calls",
        "NgRx DevTools and time-travel debugging",
        "When NgRx is overkill — an honest rule",
        "Angular Material components and theming",
        "The Angular CDK — overlays, portals, a11y",
        "Accessibility — focus, roles, keyboard navigation",
        "Loading, empty and error states as first-class UI",
      ],
    },
    {
      title: "Node.js & Express REST APIs",
      weekRange: "Weeks 14–15",
      description:
        "The backend half, in the same language. Node's runtime model — the event loop again, now on the server — modules, the file system, streams, buffers, and npm as a dependency manager rather than a magic folder. Then Express: routing, middleware and the request pipeline, controllers, and how a real project is structured once it outgrows a single file.\n\nREST API design is treated as design rather than typing: resource modelling, correct status codes, consistent error shapes, pagination, filtering, validation and versioning. You build an API that an Angular application can consume cleanly, and document it with Swagger so that consuming it does not require reading the source.",
      topics: [
        "Node runtime, event loop and non-blocking I/O",
        "CommonJS and ES modules in Node",
        "File system, path, streams and buffers",
        "npm, package.json, scripts and semantic versioning",
        "Environment configuration and secrets",
        "Express routing, routers and controllers",
        "Middleware, the request pipeline and error middleware",
        "REST resource modelling and status codes",
        "Request validation and consistent error shapes",
        "Pagination, filtering, sorting and searching",
        "File uploads with Multer",
        "API documentation with Swagger and OpenAPI",
      ],
    },
    {
      title: "MongoDB & Mongoose",
      weekRange: "Week 16",
      description:
        "The database, taught as a design problem rather than a syntax one. Documents, collections, BSON types and the CRUD operations; then the modelling decision that actually determines whether a MongoDB application performs — embedding versus referencing, and the trade-off between read speed and update cost that sits behind it.\n\nMongoose adds schemas, validation, middleware, virtuals and population. Indexing and the aggregation pipeline get real time, because an application that works on two hundred documents and collapses on two hundred thousand is the characteristic MongoDB failure, and it is always an index or a pipeline that was never thought about.",
      topics: [
        "Documents, collections and BSON types",
        "CRUD operations and query operators",
        "Embedding versus referencing — the modelling decision",
        "Mongoose schemas, types and validation",
        "Schema middleware, virtuals and methods",
        "Population and working across collections",
        "Indexes — single, compound, text and TTL",
        "Reading an explain plan",
        "The aggregation pipeline — match, group, lookup, project",
        "Transactions and when you need them",
        "MongoDB Atlas, replica sets and backups",
      ],
    },
    {
      title: "Authentication, Security & Testing",
      weekRange: "Week 17",
      description:
        "The three things student projects skip and interviewers ask about. Authentication is built end to end — registration, password hashing with bcrypt, JWT issue and verification, refresh tokens, and role-based authorisation enforced on the server rather than hidden in the UI. On the Angular side, route guards and an HTTP interceptor complete the loop.\n\nSecurity covers the OWASP issues that actually appear in MEAN applications: injection through unvalidated queries, XSS and how Angular's sanitisation helps, CSRF, insecure direct object references, rate limiting and dependency vulnerabilities. Testing then covers Jasmine and Karma for Angular units, TestBed for components and services, and Jest with Supertest for the API.",
      topics: [
        "Registration, login and password hashing with bcrypt",
        "JWT — structure, signing, verification, expiry",
        "Refresh tokens and session strategy",
        "Role-based authorisation enforced server-side",
        "Angular route guards and HTTP interceptors for auth",
        "Injection risks and input validation",
        "XSS, Angular sanitisation and bypass pitfalls",
        "CSRF, CORS and secure headers with Helmet",
        "Rate limiting and brute-force protection",
        "Unit testing Angular with Jasmine, Karma and TestBed",
        "API testing with Jest and Supertest",
        "End-to-end testing with Cypress or Playwright",
      ],
    },
    {
      title: "Full-Stack Integration, Real-Time & Deployment",
      weekRange: "Week 18",
      description:
        "Everything joined up and put somewhere real. Wiring the Angular client to the Express API properly — environment configuration per build, proxying in development, CORS in production, typed API models shared as interfaces, and a loading and error strategy that is consistent across the application rather than invented per component.\n\nReal-time features with Socket.IO cover notifications, live updates and presence. Then deployment: Docker images for the API, multi-stage builds, Docker Compose for local parity, CI/CD with GitHub Actions, deploying the Angular build to a static host and the API to a cloud service, environment secrets, logging, monitoring and a production-readiness checklist.",
      topics: [
        "Angular environments and build configurations",
        "Dev proxying and production CORS",
        "Shared TypeScript interfaces between client and API",
        "Consistent loading, error and retry handling",
        "Socket.IO — events, rooms, presence, live updates",
        "Docker images and multi-stage builds",
        "Docker Compose for API, database and client",
        "CI/CD pipelines with GitHub Actions",
        "Deploying Angular to a static host or CDN",
        "Deploying the API and managing secrets",
        "Logging, monitoring and health checks",
        "Production-readiness checklist",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 19–20 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work, then structured preparation for how MEAN roles are actually assessed in Pune. You take one project (see Capstone Projects) to a deployed, tested, documented state with a README that explains the architecture and the decisions inside it.\n\nMock rounds cover JavaScript and TypeScript fundamentals, Angular specifics — change detection, RxJS operators, guards, DI — Node and Express, MongoDB modelling and aggregation, and a system-design round. You rehearse walking a panel through your own repository, which is the round that decides most fresher outcomes and the one candidates prepare for least.",
      topics: [
        "Capstone implementation, deployment and README",
        "Architecture diagram and decision record",
        "Code review with the lead trainer",
        "JavaScript and TypeScript interview questions",
        "Angular interview questions — change detection, RxJS, DI, guards",
        "Node, Express and MongoDB interview questions",
        "System-design mock round",
        "DSA refresher targeting screening patterns",
        "Walking a panel through your own repository",
        "Resume, LinkedIn and GitHub polish",
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

  posterImage: {
    src: "/images/courses/mean-stack-poster-v1.webp",
    width: 836,
    height: 941,
    alt: "MEAN Stack Developer course poster for Archer Infotech: MongoDB stores data, Express.js handles APIs, Angular builds the user interface and Node.js runs JavaScript, shown as a four-stage flow. Key skills listed are JavaScript ES6+, Angular with components, services and RxJS, Express.js REST APIs and middleware, MongoDB data modelling and aggregation, Node.js event loop, NPM and deployment, TypeScript, Git and GitHub, and DevOps basics with CI/CD and Docker. Real-world solutions listed are enterprise web applications, single-page applications, e-commerce platforms, and dashboards and analytics tools.",
    caption:
      "The four parts of MEAN and what each one does. Every skill on the poster is covered as a module below.",
  },

  roadmapImage: {
    src: "/images/courses/mean-stack-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage MEAN Stack learning path taught at Archer Infotech Pune: web fundamentals with HTML5, CSS3, Flexbox, Grid and Tailwind; JavaScript covering functions, arrays, objects, object-oriented programming and ES6+; DOM and asynchronous programming covering events, forms, storage, promises and fetch; TypeScript covering types, interfaces, decorators and generics; Angular covering components, services, dependency injection, routing, forms and RxJS; Node.js and Express covering modules, middleware, REST APIs and authentication; MongoDB covering schemas, Mongoose, aggregation and indexing; and deployment and career covering Docker, CI/CD, cloud, projects and interviews.",
    caption:
      "The order this course is taught in. Each stage below expands into the modules that cover it — nothing is skipped and nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/mean-stack-syllabus-v1.pdf",
    title: "MEAN Stack Course Syllabus — Complete Module List",
    slug: "mean-stack-syllabus",
    blurb:
      "The complete 122-section syllabus as a 40-page PDF — web fundamentals, JavaScript, TypeScript, the full Angular surface including RxJS and NgRx, Node.js and Express, MongoDB and Mongoose, security, testing, DevOps, four project tiers and a full interview-preparation section. Everything in it is on this page; the PDF is the portable version you can read offline or send to whoever approves the fee.",
    asideBlocks: [
      {
        heading: "What is inside the 40-page PDF",
        items: [
          "All 122 numbered sections in teaching order, grouped into thirty parts from web fundamentals through to mock interviews.",
          "The Angular surface in full — components, directives, pipes, services, dependency injection, routing, both form systems, HttpClient, interceptors, RxJS and NgRx.",
          "Four tiers of project work: JavaScript mini projects, Angular mini projects, Node and Express API projects, MongoDB projects, then three full-stack builds and an industry-style capstone.",
          "A complete interview-preparation section with separate question sets for JavaScript, TypeScript, Angular, Node.js, Express, MongoDB, web and API topics, and system design.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "MEAN Stack Developer — the full TypeScript-first stack, end to end.",
          "Angular Developer — the frontend specialisation, which is where Pune enterprise demand concentrates.",
          "Node.js Backend Developer — Express APIs, MongoDB and authentication.",
          "Full Stack JavaScript Developer — the general title most listings use for this skill set.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Enterprise Admin Platform — Angular + Express + MongoDB",
      description:
        "A role-based internal platform of the kind Pune enterprise teams actually build: multi-role authentication with JWT and refresh tokens, an Angular Material dashboard with lazy-loaded feature areas, reactive forms with cross-field validation, server-side pagination and filtering over a large collection, audit logging, and an admin area gated by route guards and enforced again on the API. The project that most closely matches what an Angular hiring panel will recognise.",
      technologies: [
        "Angular + TypeScript",
        "Angular Material + CDK",
        "NgRx",
        "Node.js + Express",
        "MongoDB + Mongoose",
        "JWT + refresh tokens",
        "Docker",
      ],
    },
    {
      title: "Real-Time Collaboration Application",
      description:
        "A multi-user application with live state — a project tracker, a support console or a collaborative editor. Socket.IO for real-time events, rooms and presence; RxJS on the client to merge live updates into existing streams without re-fetching; optimistic UI with rollback on failure; and a reconnection strategy that survives a dropped network. The build that forces you to genuinely understand observables rather than copy operator chains.",
      technologies: [
        "Angular + RxJS",
        "Socket.IO",
        "Node.js + Express",
        "MongoDB + Mongoose",
        "JWT auth",
        "Docker Compose",
      ],
    },
    {
      title: "E-commerce Platform with Payments",
      description:
        "Catalogue, search and filtering, cart, checkout with Razorpay for India, order lifecycle, and an admin area for inventory and fulfilment. Reactive forms for address and payment capture, MongoDB aggregation for reporting, transactions for order integrity, and deployment end to end. The classic breadth capstone — payments, roles, transactions, file uploads and search all in one repository.",
      technologies: [
        "Angular + TypeScript",
        "Node.js + Express",
        "MongoDB aggregation + transactions",
        "Razorpay",
        "Role-based access control",
        "GitHub Actions CI/CD",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Chougule (Technical Trainer specialising in modern web and mobile, 5+ yrs, ex-Mindstix) with Amol Patil (Senior Corporate Trainer, 10+ yrs full-stack and Node) leading the Node, Express and MongoDB weeks. Both write production TypeScript daily and personally run the Angular, RxJS and capstone sessions.",

  careerOutcomes: {
    paragraphs: [
      "MEAN hiring in Pune concentrates differently from MERN. The openings sit with GCC captives, BFSI and insurance platforms, healthcare systems, and the services majors maintaining long-lived enterprise front-ends — Capgemini, Cognizant, Persistent Systems, Tech Mahindra, Emerson and the Kharadi and Hinjewadi captive centres. These roles advertise less loudly than startup postings but turn over less and pay predictably.",
      "The title you are hired under is usually 'Angular Developer' or 'Full Stack Developer' rather than 'MEAN Stack Developer' — worth knowing when you search, because filtering on the stack name alone hides most of the market. Indeed's Pune Full Stack Developer average sits at ₹10.61 lakh (n=35, January 2026), and AmbitionBox's Angular Developer aggregation captures the entry-level skew considerably lower.",
      "What lifts a MEAN candidate above the band is specific and checkable: demonstrable RxJS fluency beyond `subscribe`, an application using reactive forms with real validation, evidence you understand change detection, and a deployed repository someone can open. TypeScript depth is assumed rather than credited — but its absence is disqualifying, which is why it gets a full week here rather than a mention.",
    ],
    salaryBands: [
      {
        role: "Junior Angular / MEAN — 0–2 yrs (Pune)",
        band: "₹3,00,000 – ₹5,50,000 per year",
        source: {
          label: "AmbitionBox Angular Developer Pune aggregation (2026 entry band)",
          url: "https://www.ambitionbox.com/profile/angular-developer-salary",
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
        role: "Mid Angular / MEAN — 3–6 yrs",
        band: "₹8,00,000 – ₹15,00,000 per year",
        source: {
          label: "AmbitionBox Angular Developer national aggregation (2026)",
          url: "https://www.ambitionbox.com/profile/angular-developer-salary",
        },
      },
      {
        role: "Senior Angular / Frontend Lead — 7+ yrs",
        band: "₹16,00,000 – ₹28,00,000 per year",
        source: {
          label: "AmbitionBox senior Angular / frontend lead aggregation (2026)",
          url: "https://www.ambitionbox.com/profile/angular-developer-salary",
        },
      },
    ],
    hiringCompanies: [
      "Capgemini Pune",
      "Cognizant",
      "Persistent Systems",
      "Tech Mahindra",
      "Emerson Pune",
      "Eaton",
      "Mphasis Pune",
      "Raja Software Labs",
      "nCircle Tech",
      "Bajaj Finserv",
      "Synechron",
      "Amdocs",
      "Wipro",
      "Infosys Pune",
      "FindingPi",
      "Tekit Solutions",
    ],
    rolesAfterCourse: [
      "MEAN Stack Developer",
      "Angular Developer",
      "Full Stack Developer (JavaScript / TypeScript)",
      "Node.js Backend Developer",
      "Frontend Engineer (enterprise applications)",
      "Junior Software Engineer at GCC captives and services majors",
    ],
  },

  modesAndDuration: {
    duration:
      "5 months of structured curriculum (20 weeks, web fundamentals through deployment) plus 2 weeks of capstone and interview preparation",
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
        "GitHub for code reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 7–8 months instead of 5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹25,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote.",
    range:
      "₹25,000 – ₹90,000 — the higher end covers placement-track classroom batches with extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 16 of the course, not at the end. By the time you finish the curriculum, your resume is written, your GitHub is presentable, and you have completed at least three mock technical interviews against question banks drawn from Pune enterprise, GCC captive and services-major panels.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound at six months after course completion, and includes free re-entry to a future batch's interview-preparation sessions if your first round does not land.",
    ],
    process: [
      "Week 16 — resume and LinkedIn rewrite, reviewed by a trainer who has hired",
      "Week 17 — GitHub portfolio cleanup, public READMEs, live deployment links",
      "Week 18 — DSA refresher targeting the screening patterns Pune panels use",
      "Weeks 19–20 — three rounds of mock technical interviews across Angular, Node and MongoDB",
      "Week 20 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals through the 17-year alumni network at partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if the first round does not land",
    ],
    partnerCompanies: [
      "Capgemini Pune",
      "Cognizant",
      "Persistent Systems",
      "Tech Mahindra",
      "Emerson Pune",
      "Mphasis Pune",
      "Raja Software Labs",
      "Synechron",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune MEAN and Angular training institutes on factual rows only — no logos, no opinions. Use it as a checklist when evaluating any institute, including this one.",
    rows: [
      {
        feature: "Trainers named on the course page with photos and LinkedIn",
        archer: "Yes — Amol Chougule and Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "TypeScript coverage",
        archer: "A full dedicated week before Angular begins",
        typical: "A short chapter, or assumed knowledge",
      },
      {
        feature: "RxJS depth",
        archer: "A full week — operators taught by problem, plus subscription management",
        typical: "subscribe() and map, then moving on",
      },
      {
        feature: "Both Angular form systems",
        archer: "Template-driven and reactive, built side by side and compared",
        typical: "Template-driven only",
      },
      {
        feature: "State management",
        archer: "Signals, service-with-BehaviorSubject and NgRx, with an honest rule for choosing",
        typical: "NgRx demo, or omitted",
      },
      {
        feature: "Testing",
        archer: "Jasmine, Karma and TestBed for Angular; Jest and Supertest for the API",
        typical: "Rarely covered",
      },
      {
        feature: "Downloadable full syllabus",
        archer: "Yes — the complete 122-section syllabus as a 40-page PDF",
        typical: "A one-page module list, or nothing",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — a public repository per student with a deployed link",
        typical: "Rare",
      },
      {
        feature: "Salary data with sources",
        archer: "Cited from Indeed Pune and AmbitionBox with URLs",
        typical: "A single number with no source",
      },
      {
        feature: "Course fee transparency",
        archer: "₹25,000 – ₹90,000 published range with mode breakdown",
        typical: "Hidden behind an enquiry form",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months, or a vague 'until placed'",
      },
      {
        feature: "Batch size cap",
        archer: "15 students",
        typical: "25–40 students",
      },
    ],
    closing:
      "Compare us with whoever else you are considering — we welcome it. The right test is whether you can see actual student work and named trainers before you pay anything.",
  },

  versusAlternative: {
    heading: "MEAN vs MERN — Which Should You Take?",
    paragraphs: [
      "The stacks are three-quarters identical. MongoDB, Express and Node.js are the same in both; the difference is Angular against React on the frontend, and TypeScript being mandatory in one and optional in the other. Anyone telling you one stack is technically superior is selling something.",
      "Choose MEAN if you are targeting enterprise engineering — GCC captives, BFSI, insurance, healthcare, or a services major maintaining a large front-end. Angular's conventions are what those organisations want, and its structure is easier to defend in a code review than a React codebase where every team invented its own patterns. You will also come out with TypeScript fluency as a matter of course.",
      "Choose MERN if you are targeting product startups and SaaS companies, where React dominates and hiring volume is higher. It is also the faster route to a first deployed project, because React asks you to learn less before you can build something.",
      "The honest note on volume: React openings in Pune outnumber Angular openings, so if you optimise purely for the number of listings, MERN wins. If you optimise for stability, enterprise pay progression, and less competition per posting, MEAN is the better trade. Either way you will know MongoDB, Express and Node — so switching later costs you a frontend framework, not a career.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites are minimal — comfortable computer use, logical thinking, and a willingness to commit 8–10 hours of practice a week outside class. No prior programming experience is required; the course starts from the very beginning of JavaScript. That said, Angular is a structured framework and this is a five-month programme for a reason: learners who skip the JavaScript and TypeScript weeks to reach Angular sooner consistently struggle from week eleven onwards, and we will tell you so rather than let it happen quietly.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, live online, or weekend",
      "Check the upcoming batch dates on the batch schedule page",
      "Download the full 40-page syllabus from this page and read the Angular parts",
      "Book a free 30-minute counselling call with the lead trainer to confirm MEAN over MERN",
      "Confirm enrolment and arrive at day one with a laptop — Node and IDE setup is part of session one",
    ],
  },

  faqs: [
    {
      question: "What is the difference between MEAN and MERN stack?",
      answer:
        "Both use MongoDB for the database, Express.js for the web layer and Node.js for the runtime. The only substantial difference is the frontend: MEAN uses Angular, MERN uses React. Angular is a full framework that arrives with routing, forms, HTTP and dependency injection decided; React is a library that leaves those choices to you. MEAN also makes TypeScript mandatory, where MERN treats it as optional.",
    },
    {
      question: "Should I learn MEAN or MERN in Pune?",
      answer:
        "MEAN if you are targeting enterprise engineering — GCC captives, BFSI, insurance, healthcare and services majors, where Angular estates are large and long-lived. MERN if you are targeting product startups and SaaS firms, where React dominates and there are more total openings. Volume favours MERN; stability, pay progression and less competition per posting favour MEAN. Both teach you MongoDB, Express and Node, so a later switch costs you one framework rather than a career.",
    },
    {
      question: "Do I need to know JavaScript before joining the MEAN course?",
      answer:
        "No. The course starts from the beginning — variables, functions, arrays, objects, the DOM and asynchronous JavaScript get five full weeks before TypeScript and Angular begin. If you already write JavaScript you will move faster through those weeks, but nothing is assumed. What is genuinely required is committing the practice hours; Angular is unforgiving of shaky JavaScript.",
    },
    {
      question: "Is TypeScript compulsory for Angular?",
      answer:
        "In practice, yes. Angular is written in TypeScript, its documentation is in TypeScript, and decorators such as @Component and @Injectable depend on it. You can technically write Angular in JavaScript and no professional codebase does. This course gives TypeScript a full dedicated week before Angular starts, which is why the framework's syntax later has no unexplained magic in it.",
    },
    {
      question: "Is Angular still in demand in 2026, or has React replaced it?",
      answer:
        "Angular is in demand, in different places. React has more total openings, particularly at startups and product companies. Angular concentrates in enterprise — GCC captives, banking and insurance platforms, healthcare systems, and the long-lived internal applications services majors maintain. Those roles are less visible on startup-oriented job boards and considerably more stable. Capgemini, Cognizant, Persistent, Tech Mahindra and the BFSI captives across Pune all run Angular estates.",
    },
    {
      question: "How long does the MEAN Stack course take?",
      answer:
        "Five months of curriculum across twenty weeks, plus two weeks of capstone and interview preparation. Weekend batches cover identical content over seven to eight months at a lower weekly load. The length reflects the syllabus honestly: Angular has a larger surface than React, and TypeScript and RxJS each need real time rather than a passing chapter.",
    },
    {
      question: "What is RxJS and why does it need a whole week?",
      answer:
        "RxJS is the reactive programming library Angular is built on — HttpClient returns observables, the router exposes them, and forms emit them. Treating it as a footnote is how developers end up copying operator chains they cannot explain and leaking subscriptions they cannot find. A week gets you to genuine fluency: switchMap versus mergeMap, when to use a BehaviorSubject, and how to manage unsubscription so an application does not degrade the longer it runs.",
    },
    {
      question: "Will I build real projects, and will they be deployed?",
      answer:
        "Yes, and deployment is part of the requirement rather than a bonus. You build an enterprise admin platform, a real-time collaboration application and an e-commerce platform with payments, then take one to capstone standard — deployed, tested, documented, with a README that explains the architecture. Every project ends up in a public GitHub repository with a live link, because Pune interviewers ask for the URL.",
    },
    {
      question: "Can I get the full MEAN syllabus before enrolling?",
      answer:
        "Yes. The complete 122-section syllabus is available as a 40-page PDF from the download block on this page — every section in teaching order, the four tiers of project work, and the full interview-preparation set covering JavaScript, TypeScript, Angular, Node, Express, MongoDB and system design. Everything in the PDF is also on this page as text; the PDF is simply the portable copy.",
    },
    {
      question: "What roles can I apply for after the MEAN course?",
      answer:
        "MEAN Stack Developer, Angular Developer, Full Stack Developer, Node.js Backend Developer and Frontend Engineer. Worth knowing when you search: most listings for this skill set are titled 'Angular Developer' or 'Full Stack Developer' rather than 'MEAN Stack Developer', so filtering on the stack name alone hides most of the market.",
    },
    {
      question: "Are weekend or online MEAN batches available?",
      answer:
        "Yes. Weekend batches run Saturday and Sunday mornings across seven to eight months, and live online batches run the same hours as classroom batches with the same code reviews and project feedback. Recordings are available for review in both. Batch schedules are shared on request through the contact form, on WhatsApp, or on +91 9850 678451.",
    },
    {
      question: "Is placement assistance included in the fee?",
      answer:
        "Yes, with no separate placement charge. Support begins in week 16 and covers resume and LinkedIn rewriting, GitHub portfolio cleanup, a DSA refresher, three rounds of mock technical interviews, HR and negotiation coaching, and referrals through the alumni network. It runs for six months after the course ends and includes free re-entry to a later batch's interview-prep sessions if your first round does not land.",
    },
  ],

  finalCta: {
    heading: "Ready to start MEAN Stack training in Pune?",
    paragraph:
      "Five months from now you can have a deployed Angular and Node application on GitHub, genuine TypeScript and RxJS fluency, three mock interviews behind you, and the placement team introducing you to Pune enterprise and GCC captive teams hiring Angular developers. The next batch typically starts within four weeks; weekday, weekend and live-online formats all run the same curriculum. Download the full syllabus above, visit the contact page, message us on WhatsApp, or call admissions on +91 9850 678451.",
  },
};
