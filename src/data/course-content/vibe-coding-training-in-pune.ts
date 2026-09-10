import type { CourseRichContent } from "./types";

/**
 * Vibe Coding & AI-Assisted Software Development — rich content overlay.
 *
 * Built from the Archer Infotech Vibe Coding syllabus (15 modules plus a
 * Patient & Chemist Management System capstone).
 *
 * Editorial line, and it runs through every module: the selling point of this
 * course is not that AI writes the code. It is that the student can read what
 * it wrote. A course that only teaches prompting produces people who ship
 * things they cannot debug, and the market works that out within one
 * interview. The syllabus itself calls this "responsible AI-assisted
 * development" and the page keeps that framing rather than promising
 * software without programming.
 */

export const vibeCodingTrainingInPune: CourseRichContent = {
  intro:
    "Vibe coding is building software by describing what you want in plain language and letting an AI coding assistant write it — then reading, correcting, testing and securing what comes back. This course teaches the whole loop with the tools professionals actually use: Cursor, Claude Code, OpenAI Codex and GitHub Copilot. Over two months you turn an idea into requirements, generate a frontend, a backend, a database and REST APIs, debug AI-generated code, write tests, review and refactor, then deploy a complete Patient & Chemist Management System. Basic programming helps but is not required to start.",

  whyLearn: {
    heading: "Why Learn Vibe Coding in 2026",
    paragraphs: [
      "The way software gets written changed faster between 2024 and 2026 than in the decade before it. AI coding assistants moved from autocomplete to agents that scaffold whole features, and the developers who adapted are shipping several times faster than those who did not. Every hiring panel in Pune now asks how a candidate uses these tools — and the answer that impresses is never \"I let it write the code\", it is a specific account of how they check what it produced.",
      "That gap is the opportunity. There is a large and growing population of people who can prompt an assistant into producing something that runs, and a much smaller one who can read the result, spot the invented API call, notice the missing authorisation check, and fix the query that will collapse at ten thousand rows. The second group is employable. This course is built to put you in it.",
      "It is also the fastest realistic route from no professional coding background to a working, deployed application. That is a genuine claim and it needs an honest boundary attached: two months of AI-assisted building does not make you a senior engineer, and a course promising otherwise is selling something. What it does give you is a complete application you built and can explain, and a working method you keep using afterwards.",
    ],
    keyPoints: [
      "The tools professionals use — Cursor, Claude Code, Codex, Copilot",
      "Reading AI-generated code is the skill, not prompting it",
      "Frontend, backend, database, APIs, auth, tests and deployment",
      "A full capstone application you build and can explain",
      "Basic programming helpful, not mandatory",
      "Every hiring panel in 2026 asks how you use these tools",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCA, MCA and diploma students who want to ship something real before they graduate",
      "Fresh graduates who can follow code but have never built and deployed an application end to end",
      "Working developers who want a deliberate AI workflow rather than ad-hoc autocomplete",
      "Software testers moving toward development, where reading unfamiliar code is already half the job",
      "Entrepreneurs and technical founders building a first product without a team",
      "Anyone who has generated code with ChatGPT, watched it break, and had no idea why",
    ],
    notForYou: [
      "Anyone expecting to skip programming entirely — you will read code every single session, and the course says so before you pay",
      "Developers wanting deep computer-science foundations; take Java, Python or C++ for that and return here afterwards",
      "Candidates targeting roles that test data structures and algorithms on a whiteboard — this course does not cover them",
      "Anyone who wants a certificate more than a working application, since the application is the whole deliverable",
    ],
  },

  curriculum: [
    {
      title: "What Vibe Coding Is — and Where It Fails",
      weekRange: "Week 1",
      description:
        "The honest framing first, because it determines whether everything after it lands. Vibe coding is describing intent in natural language and having a model produce code; it is genuinely transformative for speed and genuinely dangerous when the person driving cannot evaluate the output.\n\nHow AI coding assistants actually work — tokens, context windows, why a model confidently invents a method that does not exist, and why it forgets a constraint you set twenty messages ago. The limitations module is taught before the tools, not after, so you meet each failure mode knowing it is expected rather than concluding you prompted badly.",
      topics: [
        "What vibe coding is, and what the term is being stretched to mean",
        "How AI coding assistants generate code",
        "Context windows, and why long sessions drift",
        "Hallucinated APIs, methods and packages",
        "Where AI speeds you up dramatically",
        "Where it produces confident, plausible, wrong code",
        "Why the developer stays accountable for the output",
        "Setting up VS Code and your working environment",
      ],
    },
    {
      title: "The Tools — Cursor, Claude Code, Codex & Copilot",
      weekRange: "Week 1",
      description:
        "Four tools, hands-on, with their differences made concrete rather than described. Cursor as an AI-native editor with codebase-wide context. Claude Code as a terminal agent that plans and executes multi-step changes. OpenAI Codex and GitHub Copilot for inline completion and chat inside the editor you already use.\n\nYou do the same small task in each and compare what came back. The judgement being built is tool selection: inline completion for a known change, an agent for a multi-file feature, and neither for something you have not yet decided the shape of.",
      topics: [
        "Cursor — setup, codebase context, inline and composer modes",
        "Claude Code — terminal agent, planning, multi-step edits",
        "OpenAI Codex — capabilities and usage",
        "GitHub Copilot — inline completion, chat, and its limits",
        "ChatGPT as a reasoning partner outside the editor",
        "Comparing all four on one task",
        "Choosing a tool by the shape of the job",
        "Cost, quotas and what a free tier realistically covers",
      ],
    },
    {
      title: "Prompt Engineering for Code",
      weekRange: "Week 2",
      description:
        "Prompting for code is a different discipline from prompting for prose, and the difference is specificity about constraints. A request that omits the framework version, the data shape and the error behaviour gets code that compiles and does the wrong thing.\n\nYou learn requirement-based prompting — stating inputs, outputs, edge cases and non-goals before asking for anything — then structured prompting with explicit format and file targets, then iteration: how to correct a wrong answer without starting over, and when starting over is genuinely faster.",
      topics: [
        "Why coding prompts differ from writing prompts",
        "Requirement-based prompting — inputs, outputs, edge cases",
        "Stating non-goals so the model stops adding things",
        "Structured prompting and output format control",
        "Giving the model the right context, and no more",
        "Iterative prompting and correcting a wrong answer",
        "Knowing when to discard and restart",
        "Prompt patterns worth reusing",
      ],
    },
    {
      title: "The AI-Assisted Development Workflow",
      weekRange: "Week 2",
      description:
        "Turning an idea into something buildable. The software development lifecycle in brief, then the specific loop this course uses: describe, generate, read, run, correct, commit — with reading placed deliberately before running, because code you execute without reading is code you cannot debug when it fails.\n\nApplication planning covers scoping a first version, identifying entities and screens, and writing requirements clear enough that a model produces the right thing. Most bad AI output traces back to a vague requirement rather than a weak model, and this module is where that becomes obvious.",
      topics: [
        "The software development lifecycle, briefly",
        "The describe-generate-read-run-correct loop",
        "Why reading precedes running",
        "Scoping a first version honestly",
        "Identifying entities, screens and flows",
        "Writing a requirement a model can build from",
        "Breaking a feature into promptable steps",
        "Tracking what you asked for and what you got",
      ],
    },
    {
      title: "Frontend Development with AI",
      weekRange: "Weeks 3–4",
      description:
        "Enough web fundamentals to evaluate what the assistant hands you — HTML structure, CSS layout, and what makes markup semantic — then React components, props and state at the level needed to read a generated component and change it deliberately.\n\nBuilding UI with AI covers generating components from a description, then the part that matters: reviewing them. Generated interfaces are frequently inaccessible, frequently unresponsive below 400 pixels, and frequently full of state that could have been derived. Forms get their own session because validation is where generated code is most often incomplete.",
      topics: [
        "HTML structure and semantic markup",
        "CSS layout — Flexbox and Grid, enough to read and fix",
        "React components, props and state",
        "Generating a component from a description",
        "Reviewing generated UI for accessibility",
        "Responsive behaviour the model did not consider",
        "Forms, controlled inputs and validation",
        "Iterating on a design with AI without losing the thread",
      ],
    },
    {
      title: "Backend Development & REST APIs with AI",
      weekRange: "Week 4",
      description:
        "The server side. What a backend does, how a request becomes a response, and REST as a set of conventions rather than a technology — enough to judge whether a generated endpoint is shaped correctly.\n\nYou build CRUD endpoints, then work on the parts assistants habitually skip: input validation, consistent error shapes and correct status codes. A generated API that returns 200 with an error message in the body is the single most common defect in AI backend code, and recognising it is a specific, teachable skill.",
      topics: [
        "What a backend does, and the request-response cycle",
        "REST conventions and resource modelling",
        "Building CRUD endpoints with AI",
        "Input validation the model left out",
        "Consistent error shapes and correct status codes",
        "Why 200-with-an-error-body keeps appearing",
        "API documentation generation",
        "Testing an endpoint before wiring a UI to it",
      ],
    },
    {
      title: "Databases & AI-Assisted Query Generation",
      weekRange: "Week 5",
      description:
        "Where the data lives, and the decisions that are hard to reverse. Tables, columns, keys and relationships; designing a schema from requirements rather than from whatever the first prompt produced; and normalisation at the level that stops a design collapsing later.\n\nSQL is taught to reading fluency — SELECT, JOIN, WHERE, GROUP BY — specifically so you can evaluate a generated query rather than trust it. AI-assisted query generation is genuinely excellent and genuinely capable of producing something that returns correct results on ten rows and times out on a hundred thousand.",
      topics: [
        "Tables, columns, keys and relationships",
        "Designing a schema from requirements",
        "Normalisation, and when to stop",
        "SQL to reading fluency — SELECT, JOIN, WHERE, GROUP BY",
        "Generating queries with AI and checking them",
        "Why a working query can still be a slow one",
        "Indexes, at the level of knowing they exist and why",
        "Connecting the application to the database",
        "SQL versus MongoDB for a first project",
      ],
    },
    {
      title: "Authentication & Authorization",
      weekRange: "Week 5",
      description:
        "The feature where a generated shortcut becomes a security incident. Authentication — registration, password hashing, sessions and tokens — and authorisation, which is the separate question of what a logged-in user may do.\n\nThe distinction is laboured deliberately, because assistants conflate them constantly: generated code that checks whether someone is logged in, and never checks whether this particular user owns the record they just requested. You will be shown that exact bug, in generated code, and asked to find it.",
      topics: [
        "Authentication versus authorisation",
        "Registration, login and password hashing",
        "Sessions and tokens, and how each behaves",
        "Role-based access control",
        "Checking ownership, not just identity",
        "The missing-authorisation bug, in real generated code",
        "Protecting routes on the client and on the server",
        "Why client-side checks are never enough",
      ],
    },
    {
      title: "Debugging AI-Generated Code",
      weekRange: "Week 6",
      description:
        "The module that decides whether the rest of the course produces a developer or an operator. Reading an error message properly, tracing a stack trace to the line that actually failed, and forming a hypothesis before changing anything.\n\nThen the failure patterns specific to generated code: methods that do not exist, packages that were never installed, versions that do not match, logic that is subtly inverted, and state that updates in the wrong order. You are given deliberately broken AI output and asked to fix it — which is closer to real AI-assisted work than writing anything from scratch.",
      topics: [
        "Reading an error message and a stack trace",
        "Forming a hypothesis before editing",
        "Hallucinated methods, packages and imports",
        "Version mismatches between generated and installed code",
        "Subtly inverted logic that passes a happy-path test",
        "Async and state-ordering bugs",
        "Using the assistant to debug its own output",
        "When to stop debugging and regenerate",
        "Fixing a deliberately broken generated application",
      ],
    },
    {
      title: "Testing with AI",
      weekRange: "Week 6",
      description:
        "Tests are what let you change AI-generated code without fear, and generating them is one of the things assistants do best. Testing fundamentals — what a unit test is, what it proves and what it does not — then generating tests from existing code and from a requirement.\n\nThe judgement taught is which generated tests to keep. An assistant will happily produce twenty tests asserting that a getter returns what was set, and none for the edge case that will actually break. Coverage is discussed honestly: it measures what ran, not what was checked.",
      topics: [
        "What a unit test proves, and what it does not",
        "Generating tests from existing code",
        "Generating tests from a requirement",
        "Which generated tests are worth keeping",
        "Edge cases the model did not consider",
        "Coverage, and why the number misleads",
        "Test automation basics",
        "Debugging a failing test with AI",
      ],
    },
    {
      title: "Code Review & Refactoring",
      weekRange: "Week 7",
      description:
        "Reviewing code you did not write is the core competency of AI-assisted development, and it is a skill that transfers to every job you will hold afterwards. Reading generated code systematically rather than skimming for obvious errors; recognising the patterns that mark AI output — over-engineering, unused abstractions, duplicated logic, comments restating the code.\n\nRefactoring covers improving structure without changing behaviour, and using the assistant to do it safely with tests in place. The standard set here is that you should be able to explain every line you ship.",
      topics: [
        "Reading unfamiliar code systematically",
        "The tells of AI-generated code",
        "Over-engineering and unnecessary abstraction",
        "Duplicated logic across generated files",
        "Reviewing with the assistant as a second reader",
        "Refactoring safely behind tests",
        "Naming, structure and readability",
        "The rule: ship nothing you cannot explain",
      ],
    },
    {
      title: "Git, GitHub & Working Safely with an Agent",
      weekRange: "Week 7",
      description:
        "Version control matters more in AI-assisted development than in ordinary development, because an agent can change fifteen files while you are reading the first one. Commits, branches, diffs and reverts — with the diff treated as the primary review surface for anything an agent produced.\n\nGitHub covers repositories, pull requests and a history someone else can follow. The working discipline taught here is committing before you let an agent loose, so that undoing a bad run is one command rather than an afternoon.",
      topics: [
        "Commits, branches and meaningful messages",
        "Reading a diff as the review surface",
        "Reverting an agent run cleanly",
        "Committing before you prompt",
        "Branching for experimental generation",
        "Pull requests and review",
        "A public repository and a README",
        "Never committing a key the assistant hardcoded",
      ],
    },
    {
      title: "Secure Vibe Coding",
      weekRange: "Week 8",
      description:
        "Generated code is not secure by default, and the vulnerabilities it introduces are consistent enough to teach as a checklist. Hardcoded secrets and API keys, which assistants produce constantly. Injection through unvalidated input. Missing authorisation. Sensitive data in logs and error messages. Dependencies pulled in without a second thought.\n\nYou audit your own generated application against this list and fix what you find. The framing is that the assistant optimises for working code, and secure code is a different target that only you are holding.",
      topics: [
        "Why generated code is not secure by default",
        "Hardcoded secrets and API keys",
        "Environment variables and keeping keys out of Git",
        "Injection through unvalidated input",
        "Missing authorisation checks, revisited",
        "Sensitive data in logs and error responses",
        "Dependency risk and what you just installed",
        "Auditing your own application against the list",
      ],
    },
    {
      title: "Deployment",
      weekRange: "Week 8",
      description:
        "Getting it in front of someone. Environments and why the thing that works locally fails in production — configuration, secrets, database connections and build steps. Deploying a frontend, deploying an API, and connecting a hosted database.\n\nThe module ends on the checks worth running after a deploy, because an application that is live and broken is worse than one that is not live. This is also the point where the capstone stops being an exercise and becomes a URL you can send someone.",
      topics: [
        "Environments and configuration",
        "Environment variables in production",
        "Deploying a frontend build",
        "Deploying an API",
        "Connecting a hosted database",
        "Why it worked locally and not in production",
        "Post-deploy checks",
        "Sharing a live URL and handling first feedback",
      ],
    },
    {
      title: "Advanced Vibe Coding & Agent Workflows",
      weekRange: "Week 8",
      description:
        "Getting more from the tools once the fundamentals hold. Working across a whole codebase rather than a file; giving an agent a plan and reviewing it before execution; multi-step tasks and knowing when to break them up.\n\nAlso the practices that keep long sessions coherent: project rules and context files, keeping the assistant informed of decisions already made, and recognising the point where a session has drifted far enough that a fresh start is cheaper than another correction.",
      topics: [
        "Working across a codebase, not a file",
        "Reviewing an agent's plan before it executes",
        "Breaking a large task into reviewable steps",
        "Project rules and context files",
        "Keeping an agent aligned with earlier decisions",
        "Recognising session drift",
        "Combining tools in one workflow",
        "Measuring whether AI actually made you faster",
      ],
    },
    {
      title: "Capstone — Patient & Chemist Management System",
      weekRange: "Weeks 9–10 + placement prep",
      description:
        "A complete application, built with the workflow the course teaches and defended afterwards. Multiple user roles, a real entity model — patients, prescriptions, medicines, stock, orders — screens for each role, and the REST APIs behind them.\n\nYou take it through the whole loop: requirements, generation, reading, debugging, tests, a security audit, deployment. The deliverable is a live URL, a public repository with a README, and the ability to walk someone through a decision you made and a bug you fixed. That last part is what interviewers actually probe, and rehearsing it is part of the module.",
      topics: [
        "Requirements and role definition",
        "Entity and database design",
        "Screens per role",
        "REST APIs behind each screen",
        "Authentication and role-based access",
        "Testing and a security audit pass",
        "Deployment and a live URL",
        "README and repository presentation",
        "Walking a panel through a decision and a bug",
        "Resume and portfolio positioning",
      ],
      highlight: true,
    },
  ],

  roadmapImage: {
    src: "/images/courses/vibe-coding-path-v1.webp",
    width: 1400,
    height: 982,
    alt: "Nine-stage Vibe Coding learning path taught at Archer Infotech Pune: foundations covering what vibe coding is and where it fails; the tools covering Cursor, Claude Code, OpenAI Codex and GitHub Copilot; prompting for code covering requirements, structure and iteration; frontend with AI covering HTML, CSS, React, forms and UI review; backend and APIs covering REST, CRUD, validation and documentation; data and authentication covering schema design, SQL, login and roles; debugging and testing covering reading AI code, fixing it and generating tests; review and security covering refactoring, secure coding and the Git workflow; and deployment followed by a full capstone application build.",
    caption:
      "The order this course is taught in — the tools before the prompting, and reading generated code before trusting any of it. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/vibe-coding-syllabus-v1.pdf",
    title: "Vibe Coding & AI-Assisted Development Syllabus",
    slug: "vibe-coding-syllabus",
    blurb:
      "The complete fifteen-module syllabus as a 20-page PDF — vibe coding foundations and limitations, the four AI coding tools, prompt engineering for code, frontend, backend, database, authentication, debugging, testing, code review, Git, secure coding, deployment, advanced agent workflows, and the full Patient & Chemist Management System capstone with its entity model, screens and API list. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the 20-page PDF",
        items: [
          "All fifteen modules in teaching order, each broken into its numbered sub-sections.",
          "The limitations of vibe coding set out before the tools, including hallucinated APIs, context drift and the failure modes to expect rather than be surprised by.",
          "The Responsible Vibe Coding workflow — the describe, generate, read, run, correct, commit loop the whole course is built around.",
          "The capstone specified in full: user roles, database entities, application screens and the APIs to build, so you can see the scope before enrolling.",
        ],
      },
      {
        heading: "Roles this course prepares you for",
        items: [
          "AI-Assisted Software Developer — the emerging title for this skill set.",
          "Junior Full Stack Developer, with a deployed application to show.",
          "Product engineer or technical founder building a first version alone.",
          "Software tester moving toward development, where reading unfamiliar code is already the job.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Patient & Chemist Management System (Capstone)",
      description:
        "A complete multi-role application: patients, doctors and chemists, with prescriptions, medicine catalogue, stock, orders and reporting. Built through the full AI-assisted loop — requirements, schema design, generated frontend and API, role-based authentication, tests, a security audit and deployment. The deliverable is a live URL and a public repository with a README explaining the architecture and one bug you fixed.",
      technologies: [
        "Cursor or Claude Code",
        "React",
        "REST APIs",
        "SQL or MongoDB",
        "Role-based auth",
        "Git & GitHub",
        "A deployment platform",
      ],
    },
    {
      title: "Rescue and Harden a Generated Application",
      description:
        "You are handed an application generated quickly and badly — hardcoded keys, a missing authorisation check, unvalidated input, an inverted condition that passes the happy path, and a query that dies at scale. Find the defects, fix them, add the tests that would have caught them, and write up what was wrong. Closer to real AI-assisted work than any greenfield build, and the exercise employers find most convincing.",
      technologies: [
        "Debugging workflow",
        "Security audit checklist",
        "Test generation",
        "Code review",
        "Git revert and branch discipline",
      ],
    },
  ],

  trainersIntro:
    "Sessions are led by trainers who use these assistants on production work rather than only in demonstrations — including the review habits that come from having shipped something an assistant got wrong. Your capstone is reviewed as code, not as a screenshot.",

  careerOutcomes: {
    paragraphs: [
      "There is no settled job title for this yet, and it would be misleading to imply otherwise. What exists is a fast-growing expectation inside ordinary developer roles: Pune employers increasingly ask candidates how they use AI assistants, and increasingly distinguish between people who can evaluate generated code and people who cannot. This course targets that distinction rather than a job board keyword.",
      "The realistic outcomes are a junior development role where your deployed capstone does the work your CV cannot, a product or founding-engineer position where shipping alone matters more than depth in one stack, or a lateral move from testing or support into development. Several learners use it as the fastest route to having something real to show before applying anywhere.",
      "The honest limit, stated because the alternative is a disappointed graduate: two months of AI-assisted building does not substitute for computer-science fundamentals, and roles that test data structures and algorithms will still test them. If that is your target, pair this with the Java or Python track rather than choosing between them.",
    ],
    salaryBands: [
      {
        role: "Junior developer, Pune (fresher band)",
        band: "₹3 – 6 LPA",
        source: {
          label: "Archer Infotech placement-team data, last 12 months of fresher offers",
          url: "/placements",
        },
      },
      {
        role: "Full Stack Developer overall — Pune",
        band: "₹10,61,661 per year average",
        source: {
          label: "Indeed Pune Full Stack (January 2026, n=35)",
          url: "https://in.indeed.com/career/full-stack-developer/salaries/Pune--Maharashtra",
        },
      },
    ],
    hiringCompanies: [
      "Pune product startups and SaaS firms",
      "Services majors adopting AI-assisted delivery",
      "Early-stage companies hiring generalist builders",
      "Internal tools and automation teams",
    ],
    rolesAfterCourse: [
      "AI-Assisted Software Developer",
      "Junior Full Stack Developer",
      "Product Engineer at an early-stage company",
      "Technical Founder building a first version",
      "Software Tester moving into development",
    ],
  },

  modesAndDuration: {
    duration:
      "2 months — 6 to 8 weeks of taught content across 45 to 60 hours, plus the capstone build",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
        "Lab access outside class hours for capstone work",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available for review",
        "Same code review on your repository as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "Cursor, Claude Code, Copilot — free tiers cover the course",
        "GitHub for code review",
        "Slack batch channel",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Runs over 10 weeks rather than 8 to keep total contact hours the same.",
    },
    batchPolicy:
      "Maximum 15 students per batch. New batches roughly every 4 weeks. Bring a laptop that can run VS Code — the tools are cloud-backed but the editor is local.",
  },

  fees: {
    note:
      "Vibe Coding sits in the lower-mid band of our catalogue, reflecting a two-month duration. Assistant subscriptions are not included and are not required — the free tiers of Cursor, Copilot and Claude Code cover everything taught here, and the course says which paid features are genuinely worth it rather than assuming you will buy them. EMI available; contact admissions for the current figure.",
    range: "₹22,000 – ₹35,000 (typical band); AI tool subscriptions optional and not included",
    paymentOptions: [
      "One-time payment with early-bird discount",
      "EMI in 2 instalments",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is included with no separate charge. For this course the emphasis differs from our language tracks: the capstone is the artefact, and the preparation is about being able to walk someone through it — the decisions, the bug you fixed, the check you added after the security audit.",
      "We do not guarantee placement. The institute-records rate is 90% across all tracks, measured on learners who complete training and clear at least one mock-interview round. For this track specifically, graduates who deploy the capstone and can explain it place substantially faster than those who finish the modules without shipping.",
    ],
    process: [
      "Week 7 — resume and LinkedIn rewritten around the deployed project",
      "Week 8 — repository and README reviewed by the trainer",
      "Week 9 — mock interview on your own code: decisions, bugs, trade-offs",
      "Week 10 — mock interview on AI-assisted workflow, which panels now ask about directly",
      "Post-course weeks 1–4 — introductions to partner companies",
      "Post-course weeks 5–24 — continued placement-cell support",
    ],
    partnerCompanies: [
      "Raja Software Labs",
      "FindingPi",
      "Persistent Systems",
      "Cognizant",
      "Capgemini Pune",
      "100+ partner companies across the hiring network",
    ],
  },

  comparison: {
    intro:
      "Factual rows only. Worth using as a checklist against any course advertising AI-assisted development, including this one.",
    rows: [
      {
        feature: "Tools taught hands-on",
        archer: "Cursor, Claude Code, OpenAI Codex and GitHub Copilot, compared on one task",
        typical: "One tool, usually ChatGPT, demonstrated on slides",
      },
      {
        feature: "Reading generated code",
        archer: "A full debugging module plus a deliberately broken application to fix",
        typical: "Not covered — the course ends at generation",
      },
      {
        feature: "Limitations taught",
        archer: "Before the tools, so failures read as expected rather than as your mistake",
        typical: "A disclaimer at the end, if at all",
      },
      {
        feature: "Security",
        archer: "A dedicated module and an audit of your own generated code",
        typical: "Absent, which is how hardcoded keys reach public repositories",
      },
      {
        feature: "Capstone",
        archer: "A specified multi-role system, deployed, with a public repository",
        typical: "A to-do list app built in the final session",
      },
      {
        feature: "Honest scope",
        archer: "States plainly that this does not replace CS fundamentals",
        typical: "Implies you will not need to learn programming",
      },
      {
        feature: "Downloadable syllabus",
        archer: "Yes — 20 pages, including the full capstone specification",
        typical: "A module list, or nothing",
      },
      {
        feature: "Tool subscription required",
        archer: "No — free tiers cover the course, and we say which paid features earn their cost",
        typical: "Paid subscription assumed",
      },
    ],
    closing:
      "The question worth asking any AI-coding course: do they teach you to read what it wrote? If the syllabus stops at prompting, you will ship things you cannot fix.",
  },

  versusAlternative: {
    heading: "Vibe Coding or a full-stack course — which should you take?",
    paragraphs: [
      "A full-stack course teaches you to write the code. This course teaches you to specify, evaluate and correct code an assistant writes. They produce different developers, and the difference matters most under pressure: a full-stack graduate can build a feature from nothing more slowly; a vibe-coding graduate can build it faster and is more dependent on being able to recognise when it is wrong.",
      "Take Vibe Coding if you want something real and deployed in two months, if you are validating a product idea alone, or if you already develop and want a deliberate AI workflow rather than ad-hoc autocomplete. Take a full-stack track if you are targeting roles that will test you on fundamentals — which most services-major fresher pipelines still do.",
      "The strongest position is both, in that order or this one. Learners who take a language track first read generated code far more confidently; learners who take this first arrive at the language track already knowing what they need it for. What does not work is treating this as a way to avoid learning to program — the course is built on the opposite assumption, and says so in the first session.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Basic computer knowledge is genuinely all that is required to begin. Programming knowledge is helpful and not mandatory — learners who already code will push further into architecture, debugging and review, and learners who do not will spend more time on the reading skills, which is the right allocation for both. What is required from everyone is willingness to read code every session. If the appeal is producing software without ever looking at code, this course will disappoint you and we would rather say so now.",
    ],
    suggestedSteps: [
      "Install VS Code and create a free GitHub account",
      "Try one free AI assistant on a small task, and notice where it goes wrong",
      "Download the full syllabus above and read the capstone specification",
      "Check batch dates and pick a mode — classroom, live online or weekend",
      "Book a free counselling session if you are choosing between this and a full-stack track",
    ],
  },

  faqs: [
    {
      question: "What is vibe coding?",
      answer:
        "Vibe coding is building software by describing what you want in natural language and letting an AI coding assistant write the code, then reading, correcting, testing and securing what it produces. The term was popularised in 2025. It speeds development up substantially, and it makes the ability to evaluate generated code more important than before, not less.",
    },
    {
      question: "Do I need to know programming to join the Vibe Coding course in Pune?",
      answer:
        "No. Basic computer knowledge is the only requirement, and basic programming knowledge is helpful but not mandatory. You will read code in every session, though — the course teaches you to evaluate what the AI writes. If you want to produce software without ever looking at code, this course is not that.",
    },
    {
      question: "Which AI coding tools does the course teach?",
      answer:
        "Cursor, Claude Code, OpenAI Codex and GitHub Copilot, all hands-on, plus ChatGPT as a reasoning partner outside the editor. You do the same task in each and compare the results, so you learn tool selection rather than one vendor's workflow. The free tiers cover everything taught in the course.",
    },
    {
      question: "How long is the Vibe Coding course and what does it cost?",
      answer:
        "Two months — 6 to 8 weeks of taught content across 45 to 60 hours, plus the capstone build. Weekend batches run over 10 weeks with the same contact hours. Fees sit in the ₹22,000 to ₹35,000 band with EMI available; contact admissions on 9822052088 for the current figure and batch dates.",
    },
    {
      question: "Is vibe coding going to replace programmers?",
      answer:
        "No, and courses implying otherwise are selling something. AI assistants generate code quickly and produce confident errors — hallucinated APIs, missing authorisation checks, queries that fail at scale. Someone has to catch those, and that someone needs to read code. What is changing is which skills matter most, which is why this course weights reading and debugging heavily.",
    },
    {
      question: "What will I build in this course?",
      answer:
        "A Patient & Chemist Management System as the capstone — multiple user roles, prescriptions, medicine stock, orders and reporting, with a React frontend, REST APIs, a database, role-based authentication, tests and a live deployment. You also rescue a deliberately broken generated application, which is closer to real AI-assisted work than any greenfield build.",
    },
    {
      question: "Should I take Vibe Coding or a full stack development course?",
      answer:
        "Take Vibe Coding to have something real and deployed in two months, or if you already code and want a deliberate AI workflow. Take a full stack track if you are targeting roles that test data structures and fundamentals, which most services-major fresher pipelines still do. Many learners take both, in either order.",
    },
    {
      question: "Do I need to pay for Cursor, Copilot or Claude subscriptions?",
      answer:
        "No. The free tiers of Cursor, GitHub Copilot and Claude Code cover everything taught in this course. The syllabus notes which paid features are genuinely worth buying once you are working professionally, but no subscription is required to complete the course or the capstone.",
    },
    {
      question: "Is placement support included with the Vibe Coding course?",
      answer:
        "Yes, at no extra charge — resume and LinkedIn rewritten around your deployed capstone, a repository review, two mock interviews including one on AI-assisted workflow, and introductions to partner companies. Placement is not guaranteed. The institute-wide rate is 90% across all tracks, measured on learners who complete training and clear a mock-interview round.",
    },
    {
      question: "How is this different from watching AI coding tutorials on YouTube?",
      answer:
        "Tutorials show you generation. This course spends entire modules on what happens next — debugging AI output, finding the missing authorisation check, auditing generated code for hardcoded keys, and refactoring it. Your capstone repository is reviewed as code by a trainer, and you are asked to explain the decisions in it, which is what interviewers actually probe.",
    },
    {
      question: "Where is the Vibe Coding course conducted in Pune?",
      answer:
        "At Archer Infotech in Kothrud, Pune, with morning and evening classroom batches, live online batches, and weekend batches for working professionals. Online learners get the same trainer code review on their GitHub repository as classroom learners. Batch size is capped at 15.",
    },
    {
      question: "Can I take this course while working full-time?",
      answer:
        "Yes. The weekend batch runs Saturday and Sunday mornings over 10 weeks with the same total contact hours, and the evening classroom batch runs 18:00 to 21:00. The capstone is the part that needs consistent time outside class — plan for a few hours a week beyond the sessions.",
    },
  ],

  finalCta: {
    heading: "Build something real in two months — and be able to explain every line of it",
    paragraph:
      "Download the full 20-page syllabus, including the complete capstone specification, or book a free counselling call to work out whether Vibe Coding or a full stack track fits what you are aiming at. Batches are capped at 15 and run roughly every four weeks.",
  },
};
