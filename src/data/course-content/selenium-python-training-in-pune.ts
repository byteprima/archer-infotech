import type { CourseRichContent } from "./types";

/**
 * Selenium with Python — rich content overlay.
 *
 * Curriculum follows the four-course Testing & QA plan verbatim (module
 * order and topic lists), with teaching prose and week ranges added. The
 * plan is the syllabus authority for this track; this file is the page.
 *
 * Sources:
 *  - Salary bands: AmbitionBox + Indeed Pune QA Automation (last 12 months)
 *  - Hiring companies: services majors + product cos on Naukri / LinkedIn
 *    Pune QA and SDET feeds
 *  - Tooling currency: Selenium 4 + PyTest 8 + Behave + Allure + Jenkins
 */

export const seleniumPythonTrainingInPune: CourseRichContent = {
  intro:
    "Selenium with Python is the fastest route from manual testing into automation for anyone who found Java a barrier. This 2-month programme starts with testing fundamentals, teaches Python from setup through object-oriented programming, then builds up Selenium 4 WebDriver, PyTest, and a Page Object Model framework wired to Jenkins — closing with a full module on AI-assisted testing. Designed for manual QA testers moving to automation and for graduates targeting Pune's QA pipeline.",

  whyLearn: {
    heading: "Why Learn Selenium with Python in 2026",
    paragraphs: [
      "Selenium remains the most widely deployed browser-automation tool in the world, and Python has become its fastest-growing binding. The reason is practical rather than ideological: a manual tester can be productive in Python in weeks rather than months, and the same language then carries over to API testing with PyTest, data validation, and the scripting that QA work constantly demands. Pune's services sector — Persistent, Capgemini, LTIMindtree, Tech Mahindra, Cognizant, Wipro — hires Selenium engineers at volume, and an increasing share of those requisitions now say 'Java or Python'.",
      "What changed recently is the expectation attached to the role. A 2020 Selenium job description asked for WebDriver and TestNG. A 2026 one asks for a framework you designed, tests running in CI on every merge, reporting a manager can read, and — increasingly — evidence that you can use AI tooling to produce and maintain tests without shipping nonsense into the suite. This course is built to that specification: the framework module and the CI module are not appendices, and AI-assisted testing gets a full module rather than a closing mention.",
      "Python's specific advantage in QA is leverage. PyTest fixtures make setup and teardown genuinely composable, parameterisation is a single decorator, and the plugin ecosystem covers parallelism, retries, HTML and Allure reporting without custom code. Teams that adopt Python for Selenium usually find their API tests migrate to PyTest too, which is exactly the breadth that turns a QA Automation Engineer into an SDET.",
    ],
    keyPoints: [
      "Python is taught from zero — no programming background assumed",
      "Selenium 4 with the W3C protocol and modern waits, not Selenium 3 habits",
      "PyTest to production depth — fixtures, markers, parallel runs, plugins",
      "A framework you design, not a folder of scripts",
      "Jenkins CI and Allure reporting included, not left as self-study",
      "A full AI-assisted testing module, with validation discipline",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Manual QA testers with 1+ years of experience moving into automation",
      "BE, BCA, BSc-CS or MCA graduates targeting QA and SDET roles in Pune",
      "Testers who started Java, found it heavy going, and want a faster route in",
      "Python developers who want to move into test engineering",
      "Support or operations staff with scripting exposure looking to move into QA",
    ],
    notForYou: [
      "Anyone wanting a pure manual-testing course — take Software Testing & QA instead",
      "Engineers who need Java specifically because their target team is Java-only",
      "Anyone expecting to avoid writing code — this is a programming-led track",
      "Testers looking only for a certificate rather than a working framework and portfolio",
    ],
  },

  curriculum: [
    {
      title: "Software Testing Fundamentals",
      weekRange: "Week 1",
      description:
        "The grounding every automation engineer is assumed to have and is quietly judged on in interviews. What testing is for, SDLC and STLC as processes rather than acronyms, verification versus validation, and the functional and non-functional testing types.\n\nThen the daily working vocabulary: smoke, sanity and regression testing and when each runs; writing test scenarios and test cases that someone else can execute; the defect life cycle; and severity versus priority, which candidates routinely conflate. Agile, Scrum and Jira close the module, since that is the process every Pune QA role actually runs inside.",
      topics: [
        "Introduction to software testing",
        "SDLC and STLC",
        "Testing levels and types",
        "Functional and non-functional testing",
        "Smoke, sanity and regression testing",
        "Test cases and test scenarios",
        "Defect management and the defect life cycle",
        "Severity and priority",
        "Agile testing and Scrum",
        "Jira for test management",
      ],
    },
    {
      title: "Python for Test Automation",
      weekRange: "Weeks 1–2",
      description:
        "Python from installation onward, scoped to what test automation actually uses. Setup and interpreter basics, variables and data types, operators, conditionals and loops, then the collection types — strings, lists, tuples, sets and dictionaries — which is where most test-data handling lives.\n\nFunctions, modules and packages follow, then classes, objects and the object-oriented programming that the Page Object Model depends on entirely. Exception handling and file handling cover reading test data and failing informatively. Virtual environments close the module so every student's project is reproducible.",
      topics: [
        "Python setup and the interpreter",
        "Variables, data types and operators",
        "Conditional statements and loops",
        "Strings and string methods",
        "Lists, tuples, sets and dictionaries",
        "Functions, arguments and return values",
        "Modules and packages",
        "Classes, objects and object-oriented programming",
        "Exception handling",
        "File handling",
        "Virtual environments and dependency isolation",
      ],
    },
    {
      title: "Selenium WebDriver with Python",
      weekRange: "Weeks 3–4",
      description:
        "The core automation skill. Selenium's architecture and the W3C WebDriver protocol, driver setup and browser automation, then locators in depth — id, name, class, link text, CSS selectors and XPath — with the discipline of choosing locators that survive a UI change rather than ones that merely work today.\n\nThe module then works through everything a real page throws at you: forms, dropdowns, alerts, frames, multiple windows and tabs, web tables, and mouse and keyboard actions. Synchronisation gets particular attention — implicit versus explicit waits, and why `time.sleep` is the first thing a reviewer will flag. JavaScript execution, screenshots and file upload and download close it.",
      topics: [
        "Selenium architecture and the W3C protocol",
        "WebDriver setup and browser automation",
        "Locators — id, name, class, link text",
        "XPath — absolute, relative, axes and functions",
        "CSS selectors",
        "Web elements and element interactions",
        "Forms, dropdowns, checkboxes and radio buttons",
        "Alerts, frames, windows and tabs",
        "Web tables and dynamic content",
        "Mouse and keyboard operations",
        "Explicit and implicit waits, and why sleep is not a wait",
        "JavaScript execution",
        "Screenshots, file upload and download",
      ],
    },
    {
      title: "PyTest",
      weekRange: "Weeks 4–5",
      description:
        "The test runner that makes Python's automation story compelling. Test discovery and naming conventions, plain `assert` statements with PyTest's introspection, and the fixture model — the feature that genuinely distinguishes PyTest from TestNG once you understand scope and composition.\n\nFixture scope (function, class, module, session) is taught against real cost: a browser launched per test versus per session changes suite runtime by an order of magnitude. Parameterisation, markers for selective runs, test classes, `conftest.py` for shared fixtures, parallel execution with pytest-xdist, and the plugin ecosystem close the module.",
      topics: [
        "Introduction to PyTest and test discovery",
        "Test functions and naming conventions",
        "Assertions and assertion introspection",
        "Fixtures — setup and teardown done properly",
        "Fixture scope — function, class, module, session",
        "Parameterisation for data-driven tests",
        "Markers and selective execution",
        "Test classes and grouping",
        "conftest.py and shared fixtures",
        "Parallel testing with pytest-xdist",
        "PyTest plugins and PyTest reports",
      ],
    },
    {
      title: "Automation Framework Development",
      weekRange: "Weeks 5–6",
      description:
        "The module that separates someone who writes tests from someone who owns a suite. The Page Object Model implemented properly — page classes, locators as class attributes, methods that express user intent rather than clicks — plus base classes carrying shared driver behaviour.\n\nThen the surrounding structure: reusable utilities, configuration files and environment management, test-data management and data-driven testing, logging that makes a CI failure diagnosable, error handling, and screenshot capture on failure. Folder structure is treated as a design decision, because a framework a new joiner cannot navigate is a framework that gets rewritten.",
      topics: [
        "Page Object Model design",
        "Base classes and shared driver behaviour",
        "Reusable utilities and helper modules",
        "Configuration files and environment management",
        "Test data management",
        "Data-driven testing",
        "Logging for diagnosable CI failures",
        "Error handling and custom exceptions",
        "Screenshot handling on failure",
        "Framework folder structure as a design decision",
      ],
    },
    {
      title: "BDD with Behave",
      weekRange: "Week 6",
      description:
        "Behaviour-driven development as it is actually practised, including an honest account of when it earns its overhead and when it is ceremony. BDD fundamentals and the three-amigos idea, then Gherkin syntax — Given, When, Then — and feature files written to be readable by someone who is not a programmer.\n\nScenarios and scenario outlines for data variation, step definitions that map plain language to Python, hooks for setup and teardown, and tags for selective execution. The module ends by integrating Behave with the Selenium framework built in the previous module, so BDD is a layer on top rather than a parallel universe.",
      topics: [
        "BDD fundamentals and the three-amigos practice",
        "Gherkin syntax — Given, When, Then",
        "Feature files written for non-programmers",
        "Scenarios and scenario outlines",
        "Step definitions and step reuse",
        "Hooks for setup and teardown",
        "Tags and selective execution",
        "Integrating Behave with the Selenium framework",
        "When BDD earns its overhead, and when it does not",
      ],
    },
    {
      title: "Reporting",
      weekRange: "Week 7",
      description:
        "Reports are how a QA engineer communicates with people who will never read the code, so they are treated as a deliverable rather than a switch. PyTest HTML reports for the quick local view, then Allure — the report format most Pune teams standardise on — with suites, steps, attachments and history.\n\nScreenshot and log attachment on failure turns a red test into an actionable one. The module also covers custom reporting, environment and build metadata in the report, and the practical question of what a test-execution summary should say to a delivery manager versus a developer.",
      topics: [
        "PyTest HTML reports",
        "Allure reports — suites, steps and history",
        "Attaching screenshots on failure",
        "Attaching logs and request data",
        "Environment and build metadata",
        "Custom reporting and report customisation",
        "Writing a summary a delivery manager can read",
      ],
    },
    {
      title: "Git and GitHub",
      weekRange: "Week 7",
      description:
        "Version control as the automation engineer uses it. Git fundamentals — the working tree, staging and commits — then the commands that matter day to day: status, diff, log, add, commit, push and pull.\n\nBranching and merging with conflict resolution done without losing work, then the GitHub layer: repositories, pull requests, code review on test code, and project management. The module closes on maintaining an automation project as a shared asset — `.gitignore` for drivers and reports, meaningful commit messages, and a README that lets a reviewer run your suite.",
      topics: [
        "Version control fundamentals",
        "Core Git commands — status, diff, log, add, commit",
        "Repository management and remotes",
        "Branching and merging",
        "Conflict resolution without losing work",
        "Pull requests and code review on test code",
        "GitHub project management",
        "gitignore, commit hygiene and a runnable README",
      ],
    },
    {
      title: "CI/CD with Jenkins",
      weekRange: "Week 8",
      description:
        "Getting the suite running without you. CI/CD fundamentals and why an automation suite that only runs on the author's laptop delivers a fraction of its value. Jenkins setup, job creation, and running PyTest through Jenkins with the right Python environment.\n\nGitHub integration triggers runs on push and on pull request; scheduled builds cover nightly regression. Test-report publishing surfaces Allure output in Jenkins itself, and the module ends on pipeline fundamentals plus the operational reality of a suite that fails at 2am — notifications, retries and triage.",
      topics: [
        "CI/CD fundamentals for test automation",
        "Jenkins setup and job creation",
        "Running PyTest through Jenkins",
        "Managing the Python environment on an agent",
        "GitHub integration and build triggers",
        "Scheduled builds for nightly regression",
        "Publishing test reports in Jenkins",
        "Pipeline fundamentals",
        "Notifications, retries and failure triage",
      ],
    },
    {
      title: "AI-Assisted Testing",
      weekRange: "Week 8 + capstone",
      highlight: true,
      description:
        "The capability Pune QA panels now probe for directly, taught with the validation discipline that makes it professional rather than reckless. Generative AI applied across the testing workflow: producing test scenarios from requirements, generating test cases, and turning manual test cases into runnable PyTest automation.\n\nThen the code-level uses — generating Selenium Python scripts, locator suggestions, page objects and framework scaffolding — followed by the analytical ones: AI-assisted debugging, code explanation and refactoring, documentation generation, defect classification, and log and error analysis. The module is explicit throughout that an AI-generated test is a draft: it closes on prompt engineering for QA, coding assistants in an automation workflow, and how to validate output before it enters a suite that other people trust.",
      topics: [
        "Generative AI for software testing — where it helps and where it does not",
        "AI-based test scenario generation",
        "Test case generation from requirements",
        "Generating Selenium Python scripts using AI",
        "AI-assisted locator generation",
        "Converting manual tests into PyTest automation",
        "Synthetic test data generation",
        "AI-assisted debugging",
        "Code explanation and refactoring",
        "Automated documentation generation",
        "Defect classification using AI",
        "Log and error analysis",
        "AI-assisted framework generation",
        "Prompt engineering for QA professionals",
        "Coding assistants for Python automation",
        "Responsible use and validation of AI-generated tests",
      ],
    },
  ],

  roadmapImage: {
    src: "/images/courses/selenium-python-path-v1.webp",
    width: 1400,
    height: 1064,
    alt: "Ten-stage Selenium with Python learning path taught at Archer Infotech Pune: testing fundamentals covering SDLC, STLC, test cases and defect management; Python covering data types, collections, functions and object-oriented programming; Selenium WebDriver covering locators, XPath, waits, frames and web tables; PyTest covering fixtures, parameterisation, markers and parallel runs; framework development covering the Page Object Model, utilities, configuration and logging; BDD with Behave covering Gherkin, feature files and step definitions; reporting covering PyTest HTML and Allure with screenshots; Git and GitHub covering branching, pull requests and code review; CI/CD with Jenkins covering build triggers, scheduled runs and report publishing; and AI-assisted testing covering script generation, debugging and validating AI-generated tests.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/selenium-python-syllabus-v1.pdf",
    title: "Selenium with Python Course Syllabus — Complete Module List",
    slug: "selenium-python-syllabus",
    blurb:
      "The complete ten-module syllabus as a PDF — software testing fundamentals, Python for test automation, Selenium WebDriver, PyTest, framework development with the Page Object Model, BDD with Behave, Allure reporting, Git and GitHub, CI/CD with Jenkins, and a full AI-assisted testing module. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All ten modules in teaching order, week by week across the two-month programme.",
          "Python taught from setup through object-oriented programming — the prerequisite the Page Object Model actually depends on.",
          "PyTest to production depth: fixture scope, parameterisation, markers, conftest.py and parallel execution with xdist.",
          "The sixteen-topic AI-assisted testing module, including the validation discipline for AI-generated tests.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "QA Automation Engineer — the core automation role in Pune services and product teams.",
          "Selenium Python Automation Engineer — where Python-first QA teams hire.",
          "SDET — pairing this with API testing for the broader engineering-in-test role.",
          "Test Automation Lead — framework ownership and suite health.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "E-commerce Regression Suite with Page Object Model",
      description:
        "A complete PyTest and Selenium framework automating the critical path of a public e-commerce demo site — search, product selection, cart, address, payment-step validation and order confirmation. Page Object Model architecture, data-driven across multiple product categories, Allure reporting with screenshots on failure, and a Jenkins job that runs it nightly. The portfolio piece that reads best on a QA fresher CV.",
      technologies: ["Selenium 4", "Python", "PyTest", "Page Object Model", "Allure", "Jenkins", "Git"],
    },
    {
      title: "Multi-Role Banking Application Framework",
      description:
        "A harder framework exercising multi-window handling, alerts, frames and web tables, with parameterised runs across three user roles and role-specific permission verification. Configuration-driven environment switching, structured logging, and a failure notification hook. Demonstrates that you can handle the messy pages real applications actually have.",
      technologies: ["Selenium 4", "Python", "PyTest", "Behave", "Logging", "Config management", "Jenkins"],
    },
    {
      title: "Capstone — BDD Suite with CI and AI-Assisted Maintenance",
      description:
        "The capstone combines a Behave BDD layer over the Page Object framework, cross-browser execution, parallel runs with pytest-xdist, Allure reporting published in Jenkins, and a documented AI-assisted workflow — scenarios drafted with AI, then reviewed, corrected and validated by you, with the review notes kept in the repository. Pushed to GitHub with a README a reviewer can follow.",
      technologies: ["Selenium 4", "Python", "PyTest", "pytest-xdist", "Behave", "Allure", "Jenkins", "GitHub", "AI coding assistants"],
    },
  ],

  trainersIntro:
    "The Python automation track is led by trainers who run QA automation engagements at Pune product and services companies, so the framework patterns taught are the ones they currently ship rather than ones that were current five years ago.",

  careerOutcomes: {
    paragraphs: [
      "Pune's QA automation market splits into two bands. The services pipeline — Persistent, Capgemini, LTIMindtree, Tech Mahindra, Cognizant, Wipro, Accenture, IBM India — hires automation engineers at scale, typically through a bench-to-project ramp; fresher offers start around ₹3.5–5 LPA and a working framework portfolio moves the number. Product-company SDET roles at Cybage, BrowserStack, Druva, Helpshift and similar pay meaningfully more for the same headline experience, because the expectation includes CI ownership, API testing and occasional development work — which is exactly what the framework, CI and AI modules prepare you for.",
      "Python-specific demand has grown fastest where a team wants one language across UI automation, API testing and test data work. That breadth is the practical route from QA Automation Engineer to SDET, and it is why this course teaches PyTest to a depth that carries over to API automation rather than stopping at browser scripts. We do not claim guaranteed placement: our institute-records placement rate is 90% across all tracks, and this track runs in that range.",
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
      "LTIMindtree",
      "Tech Mahindra",
      "Cognizant",
      "Wipro",
      "Accenture",
      "Cybage",
      "BrowserStack",
      "Druva",
      "Helpshift",
      "Saksoft",
      "TCS",
      "IBM India",
      "Amdocs",
    ],
    rolesAfterCourse: [
      "QA Automation Engineer",
      "Selenium Python Automation Engineer",
      "SDET (Software Development Engineer in Test)",
      "Test Automation Lead",
      "API + UI Automation Engineer",
    ],
  },

  modesAndDuration: {
    duration: "2 months (8 weeks) for the weekday and online tracks; about 10 weeks for the weekend track",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Morning batch: Monday–Friday 10:00–11:30",
        "Evening batch: Monday–Friday 19:00–20:30",
        "Saturday lab session: 10:00–13:00 (three-hour deep practice)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 19:30–21:00 IST", "Recordings available in the LMS within 24 hours"],
      tools: ["Google Meet for live sessions", "GitHub for code distribution", "Batch Slack channel for doubts"],
    },
    weekend: {
      timing: ["Saturday and Sunday 10:00–13:00 (3 hours per day, 6 hours per week)"],
      durationNote: "The weekend track runs about 10 weeks instead of 8 to keep total contact hours the same",
    },
    batchPolicy:
      "Batch sizes stay under 18 for weekday and online tracks and under 12 at weekends — small enough that the trainer knows your project repository. New batches typically start every three to four weeks; check the live batch schedule.",
  },

  fees: {
    note: "The Selenium with Python track is priced in the mid band of our catalogue, reflecting the two-month duration and the per-batch lab and Jenkins infrastructure. EMI plans are available; contact admissions for the current fee structure.",
    range: "₹25,000 – ₹35,000 (typical track band)",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment, 50% at four weeks",
      "EMI: three-month plan",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled with the course, with no separate fee. Graduates plug into the same Archer placement cell that supports our Java, Python and Full Stack tracks, built on seventeen years of relationships with Pune hiring managers. The process starts in Week 6, in parallel with your capstone, so your CV is reviewed and your GitHub portfolio is presentable by the time you finish rather than weeks afterwards.",
      "We do not guarantee placement. Our institute-records placement rate is 90% and this track runs in that range; the variance is explained far more often by interview communication than by framework knowledge. The placement cell expects you to apply actively in the sixty-day window after completion — we open doors and prepare you, but you walk through them.",
    ],
    process: [
      "Week 6: CV review, GitHub portfolio audit and resume formatting for services and product tracks",
      "Week 7: First mock interview (technical) with structured feedback",
      "Week 8: Second mock interview (HR and communication) plus an offer-negotiation primer",
      "Post-completion weeks 1–2: Direct introductions to partner companies hiring automation engineers",
      "Post-completion weeks 3–8: Weekly placement-cell check-ins and interview coaching as you apply",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini",
      "LTIMindtree",
      "Tech Mahindra",
      "Amdocs",
      "Cybage",
      "Cognizant",
      "Wipro",
      "Saksoft",
      "TCS",
    ],
  },

  comparison: {
    intro:
      "How this track compares with the typical Pune institute version of a Selenium Python course. The comparison is deliberately anonymous — these are observations from candidates who moved to us from elsewhere, not accusations about named competitors.",
    rows: [
      { feature: "Python coverage", archer: "Full module from setup through OOP, exceptions, file handling and virtual environments", typical: "A short syntax overview that leaves students unable to write a page class" },
      { feature: "Selenium version", archer: "Selenium 4 throughout — W3C protocol, modern wait strategy", typical: "Often Selenium 3 habits, including sleep-based synchronisation" },
      { feature: "PyTest depth", archer: "Fixtures and scope, parameterisation, markers, conftest, xdist parallelism, plugins", typical: "Basic test functions and assertions only" },
      { feature: "Framework architecture", archer: "Page Object Model, base classes, utilities, config, logging, folder design", typical: "POM mentioned; structure left to the student" },
      { feature: "CI/CD integration", archer: "Hands-on Jenkins module — jobs, triggers, scheduled runs, report publishing", typical: "One session of theory, no pipeline actually built" },
      { feature: "AI-assisted testing", archer: "A full sixteen-topic module including validating AI-generated tests", typical: "A closing demonstration, or nothing at all" },
      { feature: "Capstone handoff", archer: "Framework on GitHub, running in Jenkins, ready to demonstrate at interview", typical: "A handful of scripts, often not in a repository" },
      { feature: "Class size", archer: "Under 18 weekday, under 12 weekend", typical: "30–50 per batch" },
    ],
    closing:
      "The fundamentals coverage is broadly comparable across institutes. Framework depth, CI ownership and a demonstrable capstone are what separate an offer from a rejection once you reach the technical round.",
  },

  versusAlternative: {
    heading: "Selenium with Python or Selenium with Java — which should you choose in Pune?",
    paragraphs: [
      "Java still carries more Pune Selenium listings, largely because the services sector's existing frameworks are Java-based and migrating them is nobody's priority. If your target is a large services company and you have no language preference, Java marginally widens your first-job pool. That is the honest position, and it is why we run both tracks.",
      "Python wins on time-to-productivity and on breadth. A manual tester with no programming background typically writes useful Python automation weeks earlier than useful Java automation, and the same PyTest skills carry straight into API testing and test-data work — the combination that moves you from QA Automation Engineer towards SDET. Teams building new suites in 2026 choose Python or TypeScript far more often than Java. If you are switching careers and want momentum, or you already know some Python, this is the better route; if you are specifically targeting a Java-shop role, take the Java track.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "The course assumes you understand what testing is for and can navigate a computer confidently. It does not assume any Python syntax, any Selenium knowledge, or any framework experience. A typical batch is roughly 40% manual QA testers with a year or more of experience, 35% recent graduates, and 25% people moving across from support, operations or development. The pace adjusts naturally — manual testers usually need more support through the Python module and then accelerate through framework design, while graduates pick up Python quickly and need more help with framework patterns.",
      "None of the starting steps below are gated. Doing them before the first session means you spend that session learning rather than installing.",
    ],
    suggestedSteps: [
      "Install Python 3.12 or later and confirm it with `python --version`",
      "Install Visual Studio Code or PyCharm Community Edition — either is fine for this course",
      "Create a free GitHub account and practise the clone, commit and push cycle once",
      "Read the Selenium introduction on selenium.dev for about fifteen minutes so the first session has context",
      "Work through any free Python basics tutorial as far as loops and lists — enough to recognise the syntax",
    ],
  },

  faqs: [
    {
      question: "Do I need any programming experience before joining?",
      answer: "No. Module 2 teaches Python from installation through object-oriented programming, which is everything the rest of the course needs. Manual testers with no coding background make up a large share of every batch.",
    },
    {
      question: "Should I learn Selenium with Python or with Java?",
      answer: "Java has slightly more Pune listings because of existing services-sector frameworks. Python gets you productive faster and carries into API testing and data work. If you are switching from manual testing and want momentum, choose Python; if you are targeting a specifically Java team, choose Java.",
    },
    {
      question: "Is PyTest better than TestNG?",
      answer: "They solve the same problem in different languages. PyTest's fixtures compose more flexibly and its parameterisation is terser; TestNG has richer built-in suite XML. This course teaches PyTest to production depth including parallel execution and plugins.",
    },
    {
      question: "How much of the course is actually AI-related?",
      answer: "One full module of sixteen topics, plus AI-assisted work threaded through the capstone. It covers generating scenarios, scripts, locators and page objects, debugging and log analysis, and — importantly — how to validate AI output before it enters a suite others depend on.",
    },
    {
      question: "Will I finish with something I can show an interviewer?",
      answer: "Yes. You build three projects, ending with a capstone framework on GitHub that runs in Jenkins with Allure reporting. Interviewers ask to see a repository far more often than they ask for a certificate.",
    },
    {
      question: "Can I take this if I already did the Selenium with Java course?",
      answer: "You can, and some students do, but it is usually not the best use of your time. The framework concepts transfer directly. Adding API Testing and Automation or Playwright with TypeScript broadens your profile more than repeating Selenium in a second language.",
    },
    {
      question: "Do you cover mobile automation with Appium?",
      answer: "No. This track stays focused on web automation with Selenium. Appium is a separate specialisation, and we would rather teach one framework to production depth than two superficially.",
    },
    {
      question: "What is the batch size and how often do batches start?",
      answer: "Under 18 for weekday and online batches, under 12 at weekends. New batches typically start every three to four weeks across weekday, weekend and live-online formats.",
    },
  ],

  finalCta: {
    heading: "Ready to start Selenium Python training in Pune?",
    paragraph:
      "Two months from now you can have a working PyTest and Selenium framework on GitHub, a Jenkins job you configured yourself, a documented AI-assisted workflow, and a placement cell introducing you to Pune QA hiring managers. The next batch typically starts within three weeks, in weekday, weekend and live-online formats. Visit the contact page, message us on WhatsApp, or call admissions for the current schedule.",
  },
};
