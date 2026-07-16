import type { CourseRichContent } from "./types";

/**
 * Selenium with Java — rich content overlay.
 *
 * Tier 2 quality (~450 lines). Sources:
 *  - Salary bands: AmbitionBox Pune + Indeed Pune QA Automation listings
 *    (last 12 months, sampled 2026-06-07)
 *  - Hiring companies: services majors + product cos visible on Naukri
 *    + LinkedIn Pune Selenium/SDET job feeds
 *  - Tooling currency: Selenium 4 + TestNG 7 + Jenkins + Cucumber + REST
 *    Assured (current 2026 enterprise default)
 *
 * Pillar 4 P3-01 (lift to 1,800-2,500 words) + P4-10 follow-up — first of
 * 3 rich-content overlays for the courses shipped 2026-06-04.
 */

export const seleniumTrainingInPune: CourseRichContent = {
  intro:
    "Selenium with Java is Pune's most-asked-for automation testing track in 2026, sitting at the intersection of QA careers and software engineering. This 2-month programme takes you from Java fundamentals through Selenium 4 WebDriver, TestNG, the Page Object Model, Maven dependency management, and Jenkins CI integration — finishing with a deployed automation framework you can show in interviews. Designed for manual QA testers moving to automation and for engineering graduates targeting Pune's services-sector QA pipeline.",

  whyLearn: {
    heading: "Why Learn Selenium with Java in Pune in 2026",
    paragraphs: [
      "Pune's IT services sector — Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Wipro — runs the majority of its automation testing on Selenium with Java. Walk through any of their Pune campuses and the QA tooling stack is the same: Selenium 4 + TestNG, Maven build, Jenkins pipeline, Page Object Model framework, Cucumber BDD on top for stakeholder-readable scenarios. This isn't a trend; it's the established enterprise default and it isn't changing soon. Hiring volume for Selenium engineers in Pune ran consistently in the 600–900 active job listings range every month of 2025 across Naukri, LinkedIn, and Indeed.",
      "The career economics work too. Pune Selenium fresher salaries currently sit ₹3.5–4.5 LPA at services majors and ₹4.5–6 LPA at product companies (sampled from AmbitionBox + Indeed Pune QA Automation listings, last 12 months). One to two years of experience plus a clean automation portfolio moves you to ₹6–10 LPA. Senior SDET and Test Architect tracks in Pune product companies pay ₹14–22 LPA. Because the role sits inside engineering teams now — not in a separate QA org — career mobility into developer roles is genuinely available; we've seen multiple Archer Infotech automation alumni move into backend or full-stack roles within two years.",
      "Selenium 4 brought meaningful improvements over Selenium 3: native W3C protocol support, relative locators (above, below, near), built-in observability hooks, and proper TypeScript / async APIs. Older Selenium 2/3 training that you'll find on free YouTube tutorials skips these — leaving graduates with framework knowledge that doesn't match what hiring managers expect when they screen for Selenium in 2026.",
    ],
    keyPoints: [
      "600–900 active Pune Selenium job listings each month (2025)",
      "Pune fresher band ₹3.5–4.5 LPA services / ₹4.5–6 LPA product",
      "1–2 years + portfolio = ₹6–10 LPA range",
      "Senior SDET / Test Architect in Pune product cos = ₹14–22 LPA",
      "Selenium 4 (current) — relative locators, W3C protocol, BiDi APIs",
      "Pairs naturally with REST Assured (API automation) + Cucumber (BDD)",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Manual QA testers (1+ years) who want to break into automation before being squeezed out of the role",
      "Engineering / BCA / BSc-CS graduates targeting Pune services-sector QA roles where Selenium is the default ask",
      "Java developers wanting to pivot into SDET / Test Architect tracks (the highest-paid QA segment)",
      "Bootcamp graduates from manual testing programmes who need an automation specialisation",
      "Working professionals (weekend batch) who can commit ~6 hrs/week for 2 months",
    ],
    notForYou: [
      "Complete coding beginners with zero Java exposure — start with our Java track first, then Selenium next",
      "Anyone targeting product-company SDET roles at FAANG-tier compensation — those need DSA + system design beyond what an automation course covers",
      "QA managers looking for a strategic overview without writing code — this course is hands-on framework building, not theory",
      "People who want to bypass interview prep — Selenium framework knowledge alone doesn't close offers; you'll do mock interviews + frameworks both",
    ],
  },

  curriculum: [
    {
      title: "Java for Testers",
      weekRange: "Week 1–2",
      description:
        "We start with the Java a tester actually needs — not the full developer curriculum. Object-oriented fundamentals (classes, inheritance, polymorphism for Page Object design), collections (Lists + Maps for test data structures), exception handling (try-catch around flaky element interactions), and file I/O for reading test data from Excel/CSV. Just enough Java to be productive in Selenium, with explicit signposting of which Java features you'll actually use day-to-day.",
      topics: [
        "Java basics: variables, operators, control flow",
        "OOP for testers: classes, inheritance, encapsulation, polymorphism",
        "Collections framework: List, Map, Set — when to use which",
        "Exception handling + custom exceptions for clean test failures",
        "File I/O: reading Excel (Apache POI) + CSV for data-driven tests",
        "Java 11+ syntax features (lambdas, streams) used in modern frameworks",
      ],
    },
    {
      title: "Selenium WebDriver Fundamentals",
      weekRange: "Week 3–4",
      description:
        "The core: Selenium 4 WebDriver architecture, browser drivers + WebDriverManager (no more manual chromedriver downloads), locator strategy decisions (id > name > CSS > XPath, with the new relative-locator API for stable selection), and the explicit/implicit/fluent wait hierarchy that prevents 80% of flakiness issues. Real interaction patterns — handling alerts, frames, multiple windows, dropdowns, file uploads, and the Actions class for hover / drag-drop scenarios.",
      topics: [
        "Selenium 4 architecture + W3C protocol (vs Selenium 3 JSON-wire)",
        "WebDriverManager — automatic driver management",
        "Locator strategies + the new relative-locator API (above/below/near)",
        "Wait strategy: implicit vs explicit vs fluent — when each is correct",
        "Handling alerts, frames, windows, dropdowns, file uploads",
        "Actions class — keyboard, mouse, hover, drag-and-drop",
        "Screenshots on failure + headless mode for CI",
      ],
    },
    {
      title: "TestNG & Test Framework Design",
      weekRange: "Week 5",
      description:
        "TestNG is the test runner all enterprise Pune Selenium teams use. We cover the full annotation set (@BeforeMethod, @Test, dataProviders, listeners), parameterisation strategies, parallel execution configuration for shaving 60% off suite runtime, ExtentReports for HTML test reports stakeholders actually read, and assertion patterns (hard vs soft) — the difference that separates beginner test code from production-grade.",
      topics: [
        "TestNG annotations + lifecycle (BeforeSuite/Class/Method etc.)",
        "DataProvider + parameterisation — driving tests from external data",
        "testng.xml for suite/test organisation + selective runs",
        "Parallel test execution (methods, classes, suites)",
        "Listeners (ITestListener, IRetryAnalyzer) for cross-cutting concerns",
        "ExtentReports — HTML reports with screenshots embedded",
        "Hard vs soft assertions — when to use each",
      ],
    },
    {
      title: "Page Object Model + Data-Driven Framework",
      weekRange: "Week 6",
      description:
        "The architectural patterns that separate a Selenium hobbyist from someone hireable as a Senior QA Engineer. Page Object Model (and the PageFactory annotation pattern) for maintainable page abstractions. Data-driven testing with Excel + Apache POI (the de-facto Pune services-sector data source). Reading config from .properties files. A proper framework directory structure: pages/, tests/, utils/, resources/. By end of this module you'll have built and pushed a reusable framework you can fork for any future Selenium engagement.",
      topics: [
        "Page Object Model — when to use POM vs PageFactory annotations",
        "Data-driven testing with Excel + Apache POI",
        "Properties files + config management (test env, browser, URLs)",
        "Framework folder structure: pages, tests, utils, resources",
        "Logging with Log4j2 — test debug trails that survive CI",
        "Maven build configuration + dependency management",
        "Pushing your framework to GitHub with a proper README",
      ],
    },
    {
      title: "CI/CD Integration with Jenkins",
      weekRange: "Week 7",
      description:
        "The handoff to engineering. Maven + Jenkins is the standard Pune services-sector pipeline, and being able to wire your Selenium framework into a Jenkins job — with parameter passing, scheduled runs, email/Slack notifications, and the Jenkins Selenium plugin — is the difference between 'I write tests' and 'I own the QA pipeline.' Side coverage of Selenium Grid for parallel cross-browser execution and GitHub Actions for product-company contexts.",
      topics: [
        "Maven goals + lifecycle — clean, compile, test, install",
        "Jenkins job configuration — freestyle vs pipeline jobs",
        "Parameterised Jenkins builds + scheduled CRON runs",
        "Test result publishing + JUnit/TestNG XML reports",
        "Email + Slack notifications on build failure",
        "Selenium Grid — distributed parallel execution",
        "GitHub Actions YAML for product-company contexts",
      ],
    },
    {
      title: "BDD with Cucumber + REST API Testing Primer",
      weekRange: "Week 8",
      description:
        "Two adjacent skills that materially increase your hireability. Cucumber BDD overlay for Selenium so business stakeholders can read your tests as Gherkin scenarios — required for Pune services-sector clients in BFSI and Insurance. REST Assured introduction for API-layer automation — the modern QA engineer covers both UI and API. Followed by a capstone project that exercises everything.",
      topics: [
        "Cucumber installation + Gherkin syntax (Given/When/Then)",
        "Step definitions + sharing state between steps",
        "Cucumber + Selenium integration patterns",
        "Cucumber Tags + selective scenario execution",
        "REST Assured introduction — GET, POST, PUT, DELETE",
        "JSON parsing + response validation patterns",
        "Capstone project: full Selenium + Cucumber + REST framework",
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
      title: "E-commerce Checkout Flow Automation",
      description:
        "Build a complete end-to-end Selenium framework that automates the critical checkout flow of a public e-commerce demo site — login, search, add to cart, address selection, payment-step validation, order confirmation. Page Object Model architecture, data-driven for 5+ product categories, Jenkins-runnable, ExtentReports HTML output. The portfolio piece that shows up best on a fresher CV.",
      technologies: ["Selenium 4 WebDriver", "Java", "TestNG", "Maven", "PageFactory", "Apache POI (Excel data)", "ExtentReports", "Jenkins"],
    },
    {
      title: "Banking Application Login + Transaction Flow",
      description:
        "A more complex framework with multi-window handling (banking apps often open transactions in new tabs), alert handling, and CAPTCHA-bypass strategies for test environments. Covers parameterised tests across 3 user roles (customer, teller, admin) with role-specific permissions verification. Includes a Slack notifier on build failure — useful narrative point at interviews.",
      technologies: ["Selenium 4", "Java", "TestNG", "Cucumber BDD", "Log4j2", "Properties config", "Slack webhook integration", "Jenkins pipeline"],
    },
    {
      title: "Capstone — Cross-Browser CI Framework with API Layer",
      description:
        "Full framework combining Selenium UI tests (cross-browser via Selenium Grid, parallel execution) AND REST Assured API tests (auth-token retrieval, then UI tests that use the same authenticated session). Pushed to GitHub with a proper README, runs via Jenkins on every merge to main. This is the project that demonstrates SDET-level breadth, not just Selenium-button-clicker breadth.",
      technologies: ["Selenium 4", "Selenium Grid", "Java 17", "TestNG", "Cucumber", "REST Assured", "Apache POI", "Jenkins (Maven pipeline)", "GitHub", "Maven"],
    },
  ],

  trainersIntro:
    "The Selenium track is led by trainers who themselves run QA automation engagements at Pune product companies — so the framework patterns taught are what they currently ship, not what was current 5 years ago.",

  careerOutcomes: {
    paragraphs: [
      "Pune's QA Automation market has bifurcated into two clear bands. The services-sector pipeline (Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Accenture, IBM India) hires Selenium engineers at scale — usually as part of a 3-6 month bench-to-project ramp. Salaries here start at ₹3.5–4.5 LPA fresher; an ISTQB Foundation cert plus a Selenium portfolio bumps the offer ₹0.5–1 LPA. Product-company SDET roles (Persistent product teams, Cybage, BrowserStack, GUVI, Helpshift, Avaamo, Druva) pay 30–60% more for the same headline experience because the role expectations include CI/CD ownership, API testing, and occasional dev tasks — exactly what this course's Module 5 + Module 6 prepare you for.",
      "The hiring funnel at Archer Infotech has a consistent pattern for Selenium graduates: ~70% receive interview calls within 30 days of course completion, ~50% have an offer in hand within 60 days. The bottleneck is almost never Selenium framework knowledge (the course handles that); it's interview communication and DSA basics for product-company contexts (where the placement prep modules earn their keep). We don't claim 100% placement — our institute-records placement rate is 90% across all tracks and Selenium runs close to that average.",
    ],
    salaryBands: [
      {
        role: "QA Automation Engineer (fresher)",
        band: "₹3.5–5 LPA (services) / ₹4.5–6 LPA (product)",
        source: { label: "AmbitionBox Pune QA Automation (last 12 mo)", url: "https://www.ambitionbox.com/profile/qa-automation-engineer-salary?experience=0" },
      },
      {
        role: "QA Automation Engineer (1–3 yrs)",
        band: "₹6–10 LPA",
        source: { label: "Indeed Pune QA Automation listings (last 12 mo)", url: "https://in.indeed.com/jobs?q=qa+automation&l=Pune" },
      },
      {
        role: "SDET (3–6 yrs)",
        band: "₹10–18 LPA",
        source: { label: "Glassdoor Pune SDET", url: "https://www.glassdoor.co.in/Salaries/pune-sdet-salary-SRCH_IL.0,4_IM1064_KO5,9.htm" },
      },
      {
        role: "Test Architect / Sr SDET (6+ yrs)",
        band: "₹14–22 LPA",
        source: { label: "AmbitionBox Pune Test Architect", url: "https://www.ambitionbox.com/profile/test-architect-salary" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "Capgemini",
      "Mindtree (LTIMindtree)",
      "Tech Mahindra",
      "Cognizant",
      "Wipro",
      "Accenture",
      "Cybage",
      "BrowserStack",
      "Helpshift",
      "Druva",
      "GUVI",
      "Avaamo",
      "Saksoft",
      "TCS",
      "IBM India",
    ],
    rolesAfterCourse: [
      "QA Automation Engineer",
      "Selenium Test Engineer",
      "SDET (Software Development Engineer in Test)",
      "Test Automation Lead",
      "QA Automation Architect (with experience)",
      "DevOps + QA Hybrid (with CI/CD specialisation)",
    ],
  },

  modesAndDuration: {
    duration: "2 months (8 weeks) for the standard weekday/online track; ~10 weeks for the weekend track",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Morning batch: Monday–Friday 10:00–11:30",
        "Evening batch: Monday–Friday 19:00–20:30",
        "Saturday lab session: 10:00–13:00 (3-hour deep practice)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 19:30–21:00 IST", "Recorded sessions available in LMS within 24 hrs of live session"],
      tools: ["Google Meet for live sessions", "GitHub for code distribution", "Slack channel for batch-wide doubts"],
    },
    weekend: {
      timing: ["Saturday + Sunday 10:00–13:00 (3 hrs/day, 6 hrs/week)"],
      durationNote: "Weekend track runs 10 weeks instead of 8 to maintain total contact hours",
    },
    batchPolicy:
      "Batch sizes are kept under 18 for the weekday/online tracks and under 12 for the weekend track — small enough that you'll know the trainer by name and they'll know your project repo. New batches typically start every 3–4 weeks; check the live batch schedule.",
  },

  fees: {
    note: "Selenium with Java track is priced in the mid-band of our catalogue — reflective of the 2-month duration and the per-batch lab + Jenkins server infrastructure. EMI plans available; contact admissions for the current fee structure.",
    range: "₹25,000 – ₹35,000 (typical track band)",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment + 50% at 4 weeks",
      "EMI: 3-month plan (1/3 monthly)",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled — no separate fee. Selenium track graduates plug into the same Archer placement cell that supports our Java, Python, and Full Stack tracks, which has 17 years of relationships with Pune QA hiring managers. The placement workflow starts in Week 6 (parallel to your capstone build), not after the course finishes — by the time you've graduated, your CV is reviewed, your GitHub profile is portfolio-ready, and you've done at least 2 mock interviews.",
      "We don't guarantee placement. Our institute-records placement rate is 90%, the Selenium track runs in that range, and the variance is mostly explained by interview communication readiness rather than framework knowledge. The placement cell expects you to apply to 15+ companies actively in the 60-day post-completion window; we open the doors and prepare you, but you walk through.",
    ],
    process: [
      "Week 6: CV review + GitHub portfolio audit + resume formatting for Pune services-sector and product-company tracks",
      "Week 7: First mock interview (technical) + interviewer feedback session",
      "Week 8: Second mock interview (HR + communication) + offer-negotiation primer",
      "Post-completion Week 1–2: Direct introductions to 10+ partner companies actively hiring Selenium",
      "Post-completion Week 3–8: Weekly placement-cell check-ins + interview-prep coaching as you apply",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini",
      "MindTree (LTIMindtree)",
      "Tech Mahindra",
      "Amdocs",
      "Cybage",
      "Atos Syntel",
      "Saksoft",
      "Druva",
      "100+ partner companies across Pune IT services + product sector",
    ],
  },

  comparison: {
    intro:
      "How Archer Infotech's Selenium with Java track compares against the typical Pune IT-institute version of this course. We've kept the comparison anonymous — these are observations from candidates who switched to us from elsewhere, not specific competitor accusations.",
    rows: [
      { feature: "Selenium version taught", archer: "Selenium 4 throughout (W3C protocol, relative locators, BiDi APIs)", typical: "Often Selenium 3 — bypasses Selenium 4 features that interviewers ask about" },
      { feature: "Framework architecture coverage", archer: "Page Object Model + PageFactory + data-driven framework + framework structure best practices", typical: "POM mentioned briefly; framework structure left to student" },
      { feature: "CI/CD integration depth", archer: "Full Jenkins module — Maven goals, pipeline jobs, parameterised builds, notifications, Selenium Grid", typical: "Jenkins mentioned in a single session, no hands-on pipeline build" },
      { feature: "BDD + API testing", archer: "Cucumber BDD + REST Assured both covered in capstone phase", typical: "Often left as 'self-study' add-ons" },
      { feature: "Capstone project handoff", archer: "Full framework deployed to GitHub, runs in Jenkins, ready to demo at interviews", typical: "A handful of test cases, often not in a Git repo" },
      { feature: "Class size", archer: "Under 18 weekday / under 12 weekend", typical: "30–50 per batch" },
      { feature: "Trainer profile", archer: "Working Pune QA automation engineers from product/services teams", typical: "Trainers who teach full-time and stopped writing production code years ago" },
      { feature: "Placement cell handoff", archer: "Starts in Week 6 (parallel to course) — CV ready by graduation", typical: "Placement starts after course completion — 3-4 week delay" },
    ],
    closing:
      "Some of the typical-institute coverage is fine for getting interview calls. The framework depth + CI/CD ownership + capstone polish are what separate offers from rejections at the offer-negotiation stage.",
  },

  versusAlternative: {
    heading: "Selenium with Java vs Cypress / Playwright — Which Should You Learn in Pune?",
    paragraphs: [
      "Honest answer: Selenium with Java for Pune in 2026, Cypress or Playwright second. The Pune services-sector hiring volume for Selenium ran 600–900 listings/month consistently through 2025; Cypress and Playwright combined ran 50–150 listings/month. The product-company tilt is more even — BrowserStack, Cybage, and several startups have moved to Playwright — but they still expect Selenium familiarity at hiring. If you only have time to learn one framework deeply, Selenium with Java maximises Pune job-market access.",
      "Cypress and Playwright DO have technical advantages — better debugging UX, less flakiness, faster execution, modern async APIs. But the hiring market hasn't caught up. The right play if you want to bet on the modern stack: master Selenium with Java first (this course), then add Playwright as a 2-week self-study after you have a job — at which point you have leverage to push for it in your team's new test frameworks. Going Playwright-first restricts your fresher offer pool by 60–70% in Pune.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "The course assumes you can read basic code (loops, if-statements, function calls) and have used a command line at least occasionally. We don't assume any Java syntax knowledge, any Selenium knowledge, or any framework-building experience. About 40% of each batch comes from manual QA backgrounds with 1+ years experience; ~35% are fresh BE / BCA / BSc-CS graduates; the remaining ~25% are Java developers pivoting to SDET tracks. The pace adjusts naturally — manual QA folks tend to need more support on the Java OOP modules but accelerate through framework design; fresh graduates need more hand-holding on framework patterns but pick up Java fast.",
      "Before you enrol, do the 5-step starting sequence below. None of it is gated — if you've done these, you'll be productive in the first session.",
    ],
    suggestedSteps: [
      "Install Java 17 + Maven on your machine — verify with `java -version` and `mvn -version`",
      "Install IntelliJ IDEA Community Edition (the IDE we use throughout the course)",
      "Create a free GitHub account if you don't have one and learn the basic clone / commit / push workflow",
      "Read the Selenium 4 introduction page on selenium.dev (~15 minutes) to know what you're about to learn",
      "Skim Chapter 1 of any free Java tutorial (Codecademy / Java Brains / W3Schools) — just enough to recognise classes and methods",
    ],
  },

  faqs: [
    {
      question: "Do I need any prior automation testing or Java experience?",
      answer:
        "No. The course starts with a focused 'Java for Testers' module covering exactly what you need for Selenium, then layers Selenium fundamentals on top. About 35% of each batch are fresh graduates with zero Java background; they finish at the same place as the manual-QA cohort. The honest prereq is willingness to write code daily and complete the lab assignments — not pre-existing knowledge.",
    },
    {
      question: "What's the actual difference between Selenium 3 and Selenium 4 — do interviewers ask about this?",
      answer:
        "Yes, they ask. Selenium 4 (current) uses the W3C protocol natively, adds relative locators (above/below/near), brings WebDriver BiDi APIs for real-time observability, and improved the wait API. Many YouTube tutorials still teach Selenium 3 — leaving graduates unable to answer 'what changed in Selenium 4' which is a screening question at most Pune services majors in 2026. This course is Selenium 4 throughout.",
    },
    {
      question: "Will I be ready for SDET (Software Development Engineer in Test) roles after this course?",
      answer:
        "Ready to apply, yes. Closing offers at the SDET band typically also requires comfort with CI/CD pipeline ownership, REST API automation, and basic DSA — the course covers the first two in modules 5 and 6. DSA is on you; we point graduates to a focused 30-day NeetCode + system-design-primer track for the SDET interview prep. Realistic timeline: course graduation → QA Automation Engineer offer in 1–2 months → SDET pivot after 12–18 months in role.",
    },
    {
      question: "How does the placement process work and how soon do you start applying me?",
      answer:
        "Placement-cell work starts Week 6 (parallel to your capstone) — CV review, GitHub polish, mock interviews. Direct introductions to 10+ partner companies start the week after course completion. We don't guarantee placement; our institute-records placement rate is 90% across all tracks. The Selenium track runs in that range. Variance is mostly explained by interview communication and the candidate's own application volume; we open the doors but you apply to 15+ companies actively in the 60-day post-completion window.",
    },
    {
      question: "What tools and software do I need on my own laptop?",
      answer:
        "Java 17 (free), Maven (free), IntelliJ IDEA Community Edition (free), and Git (free). Optional but useful: Postman for REST API practice (free), and a GitHub account for portfolio hosting (free). No paid licences anywhere in the toolchain. Laptop spec — 8GB RAM minimum, 16GB recommended for running Selenium Grid + multiple browsers in parallel. SSD strongly recommended.",
    },
    {
      question: "Can I move from manual QA to automation after this course?",
      answer:
        "That's exactly the most common transition path our Selenium graduates take. Manual QA testers typically need 2–3 months of post-course on-the-job practice before they feel fully confident in automation reviews, but offers come in within the same timeline as fresh-grad placements. The advantage manual testers have: they know the testing domain (test design, defect lifecycle, business workflows) so they catch test logic issues that pure developers miss. Combine that with Selenium framework skill and you're hireable above the 'pure-automation-engineer' band.",
    },
    {
      question: "Why Selenium with Java instead of Selenium with Python?",
      answer:
        "Pune's services-sector enterprise default is Selenium with Java; that's where the 600–900 monthly listings sit. Selenium with Python has its niche (mostly product startups, data engineering test pipelines) but the Pune hiring volume is roughly 5x smaller. If your goal is maximum Pune job-market access, Java is the right pick. If your goal is parallel-skilling alongside Python development, ask the admissions team — we have a Python+Selenium variant we can route to.",
    },
    {
      question: "What about Cucumber, TestNG, JUnit — which is taught and why?",
      answer:
        "TestNG is the primary test runner (Pune services-sector default). Cucumber BDD is covered in Module 6 because Pune BFSI and Insurance clients require Gherkin-readable scenarios. JUnit gets a comparison mention but isn't the primary runner — we focus depth on what hiring managers expect, which is TestNG. All three concepts (annotations, lifecycle, parameterisation) transfer between runners; switching is days, not weeks.",
    },
  ],

  finalCta: {
    heading: "Ready to start Selenium training in Pune?",
    paragraph:
      "Two months from now you can have a working Selenium framework on GitHub, a Jenkins pipeline you set up yourself, and a placement cell actively introducing you to Pune QA hiring managers. The next batch typically starts within 3 weeks; weekday, weekend, and live-online formats all open. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
