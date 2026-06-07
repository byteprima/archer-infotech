import type { CourseRichContent } from "./types";

/**
 * Software Testing & QA — rich content overlay.
 *
 * Tier 2 quality. The most common entry-point into Pune's IT services
 * sector for non-CS graduates. Anchors:
 *  - ISTQB Foundation Level (global standard for QA)
 *  - Manual testing tooling: Jira, Postman, TestRail
 *  - Salary bands from AmbitionBox + Indeed Pune QA listings
 *  - Career path: Manual QA → Selenium/SDET
 *
 * Pillar 4 P3-01 rich content + P4-10 follow-up — second of 3.
 */

export const softwareTestingTrainingInPune: CourseRichContent = {
  intro:
    "Software Testing & QA is the single most accessible entry point into Pune's IT services sector for graduates without a CS or programming background. This 2-month programme builds the SDLC + STLC foundation, test design discipline (boundary value, equivalence, decision tables), defect lifecycle workflows in Jira, REST API testing in Postman, and ISTQB Foundation Level certification preparation. By the end you have a Jira-based defect portfolio, a Postman API test collection, and the ISTQB study material ready for the global QA cert exam.",

  whyLearn: {
    heading: "Why Learn Software Testing in Pune in 2026",
    paragraphs: [
      "Pune's IT services majors — Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Accenture, IBM — hire manual QA engineers at scale every quarter as the lowest-barrier-to-entry technical role on offer. The hiring isn't slowing despite the rise of automation. Reason: services-sector projects still need humans to design test cases, run exploratory testing, manage UAT cycles with business stakeholders, and own the defect-triage discussion. Automation handles repeatable regression suites; humans still own the testing strategy. Pune QA fresher listings ran 800–1,200 per month consistently through 2025 across Naukri + LinkedIn.",
      "What makes this course matter in 2026 specifically: ISTQB Foundation Level has become near-mandatory at services majors for fresher QA hiring. Five years ago you could break in without it; now most JD filters explicitly require ISTQB Foundation or 'equivalent.' Free YouTube ISTQB prep exists but skips the practice-test depth that actually clears the exam — the syllabus has 6 chapters and exam questions test cross-chapter reasoning, not single-fact recall. We prep with 200+ MCQs aligned to current ISTQB v4 syllabus.",
      "The salary math: Pune QA fresher offers currently sit ₹2.5–4 LPA at services majors; ₹3.5–5 LPA at product companies and Salesforce/SAP consulting partners. ISTQB Foundation bumps the offer ₹0.5–1 LPA. With 1–2 years experience + Postman/API testing + Jira proficiency, the band moves to ₹4–6 LPA. From there the natural next move is Selenium automation (60–80% salary bump) — exactly the path most of our QA graduates follow inside 18–24 months.",
    ],
    keyPoints: [
      "800–1,200 active Pune manual QA listings each month (2025)",
      "ISTQB Foundation now near-mandatory at services majors",
      "Pune fresher band ₹2.5–4 LPA services / ₹3.5–5 LPA product",
      "+₹0.5–1 LPA bump on ISTQB Foundation certification",
      "Natural path to ₹6–10 LPA in 18–24 months via Selenium",
      "Most accessible IT role for non-CS / non-engineering graduates",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Non-IT graduates (BCom, BSc, BA, mechanical, electrical) wanting a structured entry into the IT services sector",
      "Engineering graduates who don't want a pure-development role and prefer the testing/quality side",
      "Career changers from banking, education, or operations who want a tech career without a coding-first commitment",
      "Manual testers without ISTQB certification who need a structured cert + portfolio push",
      "Working professionals seeking a weekend track to pivot into QA within 3 months",
    ],
    notForYou: [
      "People targeting senior automation/SDET roles immediately — start with the Selenium track instead",
      "Folks who specifically want a developer role — this is QA, not dev (though many graduates pivot to dev later)",
      "Anyone allergic to documentation discipline — testing is heavy on test-case writing + defect-report writing",
      "Candidates expecting a ₹10+ LPA fresher offer in 8 weeks — that's not how the QA entry band works in Pune",
    ],
  },

  curriculum: [
    {
      title: "Testing Fundamentals + SDLC/STLC",
      weekRange: "Week 1–2",
      description:
        "The conceptual foundation hiring managers screen for in the first interview round. SDLC models (Waterfall, V-Model, Agile) with explicit guidance on which models you'll actually see at Pune services clients (Agile dominates; V-Model survives in BFSI compliance contexts). STLC phases — requirement analysis, test planning, design, environment setup, execution, closure — mapped to Jira workflows. Levels of testing (unit, integration, system, UAT) and types (functional, smoke, sanity, regression, exploratory) with realistic decision rules for which to apply when.",
      topics: [
        "SDLC models — Waterfall, V-Model, Spiral, Agile / Scrum",
        "STLC phases + entry/exit criteria",
        "Levels of testing — unit, integration, system, UAT",
        "Types of testing — functional vs non-functional, smoke vs sanity, regression",
        "Verification vs validation — the textbook distinction that interviewers ask",
        "7 principles of testing (ISTQB syllabus alignment)",
      ],
    },
    {
      title: "Test Design Techniques",
      weekRange: "Week 3–4",
      description:
        "The technical core of manual testing competence. Equivalence partitioning + boundary value analysis (the two techniques most test-case-design interview questions probe). Decision tables for business-rule heavy domains (BFSI, Insurance). State transition for workflow-heavy applications. Use case + exploratory testing for the realistic test-design contexts where formal techniques alone underdeliver. You'll write professionally-structured test cases throughout and end the module with a 50+ case test suite for a sample application.",
      topics: [
        "Equivalence partitioning — valid + invalid class identification",
        "Boundary value analysis — the +1/-1 discipline",
        "Decision table testing — for business-rule scenarios",
        "State transition testing — workflow + status-driven apps",
        "Use case testing — scenario derivation",
        "Exploratory testing — charters + session-based test management",
        "Writing professional test cases (preconditions, steps, expected/actual)",
      ],
    },
    {
      title: "Test Execution + Defect Management with Jira",
      weekRange: "Week 5–6",
      description:
        "Where the practical skills sit. Test planning + test strategy documents (the artefacts hiring managers ask you to walk through at interview). Defect lifecycle workflows in real Jira instances — new → assigned → fixed → verified → closed, with realistic edge cases (re-opened, deferred, rejected). Severity vs priority distinction (the most-missed answer in junior QA interviews). JQL basics for filtering defect queues. Test reporting dashboards stakeholders actually read.",
      topics: [
        "Test plan structure + test strategy document",
        "Defect lifecycle — full state machine including edge cases",
        "Severity vs priority — clear framework with examples",
        "Jira hands-on — projects, workflows, custom fields",
        "JQL basics for defect queue filtering",
        "Test reporting + metrics (defect density, defect leakage)",
        "Building stakeholder-readable test reports",
      ],
    },
    {
      title: "API Testing with Postman + ISTQB Foundation Prep",
      weekRange: "Week 7–8",
      description:
        "Two distinct value-adds in one module. Postman API testing — the modern QA engineer covers both UI and API layers, and Postman fluency materially differentiates you in interviews. REST fundamentals, collections, environment variables, pre/post-request scripts, response assertions. Parallel track: ISTQB Foundation Level v4 syllabus walkthrough with 200+ practice MCQs and 2 full mock exams. The combination — Postman portfolio + ISTQB cert prep — is what differentiates this course from cheaper alternatives.",
      topics: [
        "REST API fundamentals — methods, headers, status codes",
        "Postman collections + environments + variables",
        "Pre-request + test scripts (JavaScript-based assertions)",
        "Response validation + chaining requests",
        "Agile + Scrum testing — sprint cadence, story-level testing",
        "ISTQB Foundation v4 syllabus — full 6-chapter walkthrough",
        "200+ ISTQB practice MCQs + 2 full mock exams",
      ],
    },
  ],

  projects: [
    {
      title: "End-to-End Test Suite for a Sample E-commerce Application",
      description:
        "Build a complete manual test artefact set for a sample e-commerce demo: test plan document, 80+ test cases across all priority pages (login, search, cart, checkout, payment, order), executed run results, and a defect log of 20+ bugs filed in a real Jira instance with severity/priority justifications. The portfolio piece you walk through at interview.",
      technologies: ["Manual test design (EP, BVA, decision tables)", "Jira (cloud free tier)", "TestRail / Excel for test execution", "Sample demo e-commerce site"],
    },
    {
      title: "Postman REST API Test Collection",
      description:
        "A 30+ request Postman collection exercising a public REST API (e.g. ReqRes, JSONPlaceholder), with environment variable parameterisation, pre-request scripts for auth-token retrieval, post-request test assertions on status codes + response body shape, and chained-request scenarios. Exported as a JSON Postman collection on GitHub — interviewers love this artefact.",
      technologies: ["Postman", "REST", "JSON", "JavaScript assertions", "GitHub"],
    },
    {
      title: "ISTQB Foundation Mock-Exam Portfolio",
      description:
        "Not a build project but a study artefact: the 2 full ISTQB mock exams (40 questions each, time-bound) plus a tracked weak-area analysis covering all 6 chapters. Most graduates clear ISTQB Foundation within 6 weeks of course completion if they put in 4–6 hrs/week with this material.",
      technologies: ["ISTQB v4 syllabus", "200+ practice MCQs", "2 timed mocks"],
    },
  ],

  careerOutcomes: {
    paragraphs: [
      "Pune's manual QA hiring funnel runs at consistent volume — services majors hire 4 quarterly intake batches per year typically. Fresher salaries land ₹2.5–4 LPA at the services majors (Persistent, Capgemini, Mindtree, Tech Mahindra, Cognizant, Accenture, IBM) and ₹3.5–5 LPA at product companies + Salesforce/SAP consulting partners (Cybage, Atos Syntel, Saksoft, BrowserStack QA teams). ISTQB Foundation pushes the offer up ₹0.5–1 LPA at most services clients. Postman API testing is the second strongest CV signal — call it out explicitly.",
      "The realistic career arc: Year 1 = Manual QA Tester at ₹3–4 LPA. Year 1.5 = pick up Selenium on the side (our students typically come back for the Selenium track). Year 2 = QA Automation Engineer at ₹6–8 LPA. Year 4 = SDET at ₹10–14 LPA. Year 6+ = QA Architect or pivot to QA Lead / Engineering Manager at ₹14–22 LPA. This is the established Pune QA path and the math holds across the services + product split.",
    ],
    salaryBands: [
      {
        role: "Manual QA Tester (fresher)",
        band: "₹2.5–4 LPA (services) / ₹3.5–5 LPA (product)",
        source: { label: "AmbitionBox Pune Manual QA", url: "https://www.ambitionbox.com/profile/manual-test-engineer-salary?experience=0" },
      },
      {
        role: "Manual QA + ISTQB cert + Postman",
        band: "₹3.5–5.5 LPA fresher / ₹5–7 LPA at 1 yr",
        source: { label: "Indeed Pune QA listings", url: "https://in.indeed.com/jobs?q=manual+qa+istqb&l=Pune" },
      },
      {
        role: "Sr Manual QA / Test Lead (3–5 yrs)",
        band: "₹6–10 LPA",
        source: { label: "AmbitionBox Pune Test Lead", url: "https://www.ambitionbox.com/profile/test-lead-salary" },
      },
      {
        role: "QA Lead / Engineering Manager (6+ yrs)",
        band: "₹12–20 LPA",
        source: { label: "Glassdoor Pune QA Manager", url: "https://www.glassdoor.co.in/Salaries/pune-qa-manager-salary-SRCH_IL.0,4_IM1064_KO5,15.htm" },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "Capgemini",
      "MindTree (LTIMindtree)",
      "Tech Mahindra",
      "Cognizant",
      "Wipro",
      "Accenture",
      "IBM India",
      "Cybage",
      "Atos Syntel",
      "Saksoft",
      "TCS",
      "Infosys",
      "BrowserStack (QA team)",
      "Druva",
      "GUVI",
    ],
    rolesAfterCourse: [
      "Manual QA Tester",
      "Quality Analyst",
      "Test Engineer (Entry-level)",
      "QA Associate",
      "Functional Test Analyst",
      "API Test Engineer (with Postman portfolio)",
    ],
  },

  modesAndDuration: {
    duration: "2 months (8 weeks) for the standard weekday/online track; 10 weeks for the weekend track",
    classroom: {
      location: "Archer Infotech Kothrud campus (Flat No. 12, Divyadarshan Housing Society, Kothrud, Pune 411038)",
      timing: [
        "Morning batch: Monday–Friday 09:00–10:30",
        "Evening batch: Monday–Friday 18:30–20:00",
        "Saturday lab session: 10:00–13:00 (full-batch test-design practice + defect-filing drills)",
      ],
    },
    online: {
      timing: ["Live sessions: Monday–Friday 19:00–20:30 IST", "Session recordings in LMS within 24 hrs"],
      tools: ["Google Meet for live sessions", "Jira Cloud free tier for defect-management labs", "Postman free tier for API testing", "Shared Slack channel for batch doubts"],
    },
    weekend: {
      timing: ["Saturday + Sunday 10:00–13:00"],
      durationNote: "Weekend track runs 10 weeks for total contact-hour parity with weekday tracks",
    },
    batchPolicy:
      "Batch sizes under 20 for weekday + online tracks, under 12 for weekend. New batches start every 3–4 weeks. The Software Testing track is among our highest-enrolment programmes; book early for popular slots.",
  },

  fees: {
    note: "Software Testing & QA is priced in the entry band of our catalogue — reflecting the 2-month duration and the absence of paid software licences (Jira free tier, Postman free tier, free ISTQB study material). EMI available; contact admissions for current fee.",
    range: "₹18,000 – ₹28,000 (typical track band)",
    sourceCitation: { label: "Archer Infotech 2026 fee schedule", url: "/contact" },
    paymentOptions: [
      "One-time payment (5% discount)",
      "EMI: 50% at enrolment + 50% at week 4",
      "EMI: 3-month plan (1/3 monthly)",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is bundled — no separate fee. The Software Testing track is our highest-volume placement pipeline because Pune services majors run 4 quarterly fresher intakes each year and our placement cell is in the rotation for all of them. The placement workflow starts in Week 5 (parallel to the test execution module) — CV review, ISTQB-cert readiness check, mock interview prep — so by graduation week your portfolio is reviewed and you've done 2 mock interviews.",
      "We don't guarantee placement. Our institute-records placement rate is 90% across all tracks; the Software Testing pipeline runs slightly above average because the entry-level supply-demand math in Pune QA is favourable. Variance is mostly explained by ISTQB completion (graduates who sit for the exam within 6 weeks of course completion place 30% faster), interview communication, and application volume.",
    ],
    process: [
      "Week 5: CV review + Jira/Postman portfolio audit + ISTQB readiness check",
      "Week 6: First mock interview (technical — SDLC/STLC, test design, defect lifecycle)",
      "Week 7: Second mock interview (HR + communication) + ISTQB final-mock-exam check",
      "Week 8: Direct introductions to 10+ services-major + product partner companies",
      "Post-completion: Weekly placement-cell check-ins + interview-prep coaching for 8 weeks",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini",
      "MindTree (LTIMindtree)",
      "Tech Mahindra",
      "Cognizant",
      "Amdocs",
      "Wipro",
      "Cybage",
      "Atos Syntel",
      "Saksoft",
      "100+ partner companies hiring Pune QA freshers each quarter",
    ],
  },

  comparison: {
    intro:
      "How Archer Infotech's Software Testing & QA track compares against the typical Pune training-institute version. Anonymous comparison from candidates who switched in from elsewhere.",
    rows: [
      { feature: "ISTQB Foundation prep depth", archer: "Aligned to current v4 syllabus, 200+ MCQs, 2 full timed mocks", typical: "Older v3 material, 50–100 MCQs, no full mocks" },
      { feature: "Jira hands-on", archer: "Real Jira cloud instance, full defect-lifecycle drills, JQL basics", typical: "Jira screenshots in slides, no real instance access" },
      { feature: "Postman API testing coverage", archer: "Full module with 30+ request portfolio collection on GitHub", typical: "Often skipped or covered in single session" },
      { feature: "Test case writing discipline", archer: "80+ professional test cases written by graduation, peer-reviewed", typical: "10–20 test cases, no peer review" },
      { feature: "Defect portfolio for interview", archer: "20+ bugs filed in Jira with severity/priority justifications", typical: "Test cases only — no defect portfolio" },
      { feature: "Class size", archer: "Under 20 weekday / under 12 weekend", typical: "30–50 per batch" },
      { feature: "Trainer profile", archer: "Working Pune QA engineers from services + product teams", typical: "Trainers who stopped writing test cases at client sites years ago" },
      { feature: "Placement cell handoff", archer: "Starts Week 5 — CV ready by graduation", typical: "Placement starts after course completion" },
    ],
    closing:
      "The two differentiators that matter most at interview: Postman portfolio + 80+ test cases artefact. These are what 'I know testing' becomes 'here's what I built' in conversation with hiring managers.",
  },

  prerequisitesAndStart: {
    paragraphs: [
      "No prior IT or coding experience required. The course assumes basic computer literacy (web browser, document editing, file management) and the discipline for documentation-heavy work. About 60% of each batch comes from non-IT backgrounds — commerce, science, mechanical, banking, education sectors. The remaining ~40% are engineering or BSc-CS graduates entering QA rather than development. The pace accommodates both; the test-design module is the gating concept and both cohorts cross it inside 2 weeks.",
      "Before you enrol, the 5-step starting sequence below makes Week 1 smoother but isn't required.",
    ],
    suggestedSteps: [
      "Create a free Jira Cloud account (jira.com → free tier) — we'll use this throughout the defect-management module",
      "Install Postman desktop app (postman.com/downloads) — free for individual use",
      "Read the ISTQB Foundation v4 syllabus overview (istqb.org) — knowing the chapter list in advance helps pacing",
      "Set up a free GitHub account — you'll push your Postman collection here as a portfolio artefact",
      "Skim a sample test case from any free QA blog to know the structure — preconditions, steps, expected result",
    ],
  },

  faqs: [
    {
      question: "Do I really need no coding background?",
      answer:
        "Correct — manual testing is the standard entry point into QA careers and requires zero coding. About 60% of each batch has no programming experience at all and finishes the course at the same level as the CS graduates. The skills that matter are logical thinking, attention to detail, and clear written communication. If you do have light coding exposure, Module 4 (Postman scripts) becomes slightly easier — but it's not a gate.",
    },
    {
      question: "What is ISTQB and do I need to pay extra for the exam?",
      answer:
        "ISTQB (International Software Testing Qualifications Board) Foundation Level is the global QA entry-level certification — explicitly listed as preferred or required in most Pune services-major QA job descriptions in 2026. The course prep is included; the exam fee (~₹4,500) is paid separately to ISTQB when you sit for it. Most graduates clear it within 6 weeks of course completion if they put in 4–6 hrs/week with the mock-exam material.",
    },
    {
      question: "Can I move from manual testing to Selenium automation later?",
      answer:
        "Yes — and this is the most common career arc our QA graduates follow. Manual testing teaches you what to test and why, which is exactly what automation engineers need but most lack. Recommended path: Manual QA → 6–12 months of services-sector experience → enrol in our Selenium track → pivot to Automation/SDET role. Salary delta on that pivot is typically ₹2–4 LPA bump.",
    },
    {
      question: "What is the typical fresher salary and how soon do offers come?",
      answer:
        "Pune QA fresher salaries: ₹2.5–4 LPA at services majors; ₹3.5–5 LPA at product companies and Salesforce/SAP consulting partners. ISTQB cert + Postman portfolio bump that by ₹0.5–1 LPA. ~70% of our graduates receive first interview calls within 30 days of course completion; ~50% have an offer in 60 days. Source: AmbitionBox + Indeed Pune QA listings, last 12 months.",
    },
    {
      question: "How does placement work — is it guaranteed?",
      answer:
        "Not guaranteed; supported. The placement cell starts working with you in Week 5 — CV review, Jira/Postman portfolio audit, mock interviews — and continues with weekly check-ins for 8 weeks post-completion. We don't claim 100% placement; institute-records rate is 90% across all tracks. The Software Testing pipeline runs slightly above average because Pune QA fresher demand is favourable. We open the doors; you apply to 15+ companies actively.",
    },
    {
      question: "How does this compare to a free YouTube QA course?",
      answer:
        "Free YouTube content is fine for the conceptual SDLC/STLC modules but typically skips three things that matter at interview: (1) ISTQB Foundation v4 practice depth — current syllabus, 200+ MCQs, full timed mocks; (2) hands-on Jira + Postman portfolio with real artefacts on GitHub; (3) mock interview prep + direct introductions to Pune hiring partners. The salary delta from those three things alone usually exceeds the course fee within 6 months of placement.",
    },
    {
      question: "Will this course teach automation testing (Selenium, Cypress)?",
      answer:
        "No — this is a focused manual testing course. Automation is its own deep track (our Selenium with Java programme is 2 months on top of this). We cover API testing with Postman in this course because Postman is increasingly part of even the manual-QA role spec. UI automation is deferred — and that's deliberate. Trying to learn manual + Selenium in 8 weeks underdelivers both.",
    },
    {
      question: "What if I want to move from QA into a developer role eventually?",
      answer:
        "It's a known path and several of our QA graduates have done it. Realistic timeline: Year 1–2 = Manual QA → Year 2 = pick up Selenium + Java basics → Year 3 = automation engineer / SDET → Year 4–5 = pivot to backend developer with the Java foundation. Earlier transitions are possible but require strong self-study commitment alongside the QA day-job. Don't expect a clean QA→Dev pivot inside the first 12 months.",
    },
  ],

  finalCta: {
    heading: "Ready to start Software Testing training in Pune?",
    paragraph:
      "Two months from now you can have ISTQB Foundation prep complete, a 30+ request Postman collection on GitHub, an 80+ test-case artefact, and 20+ defects filed in Jira — plus a placement cell actively introducing you to Pune services-major QA hiring managers. The next batch starts in 3 weeks; weekday, weekend, and live-online formats all open. Visit the contact page, message us on WhatsApp, or call admissions for the current batch schedule.",
  },
};
