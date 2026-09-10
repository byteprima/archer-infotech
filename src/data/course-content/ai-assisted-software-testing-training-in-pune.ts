import type { CourseRichContent } from "./types";

/**
 * AI-Assisted Software Testing — rich content overlay.
 *
 * The distinction this page has to hold, because it is the single thing
 * learners get wrong when choosing between the three AI courses in this
 * category: THIS course uses AI to test ordinary software. The LLM & RAG
 * Testing course tests software that is itself built on AI. They sound
 * similar in a course listing and they are entirely different jobs.
 *
 * Every section that could blur the two states the boundary explicitly.
 */

export const aiAssistedSoftwareTestingTrainingInPune: CourseRichContent = {
  intro:
    "This one-month course teaches testers to use Generative AI across the work they already do: analysing requirements, designing test cases, generating test data, drafting automation, reading stack traces and writing QA documentation. It is about testing conventional software with AI help — not about testing AI systems, which is a separate specialisation covered by our LLM & RAG Testing course. You finish with a reusable QA prompt library and the judgement to tell a useful AI answer from a plausible wrong one.",

  whyLearn: {
    heading: "Why AI-Assisted Testing Is Worth One Month of Your Time",
    paragraphs: [
      "Testing has more work than hours, and always has. The backlog is never the interesting work — it is the eighty boundary cases nobody wrote down, the test data that has to be regenerated every sprint, the defect report that takes fifteen minutes to write properly and two minutes to write badly. That is exactly the shape of work that AI assistants handle well, and it is why testers were among the earliest professional adopters.",
      "What the adoption exposed is that the benefit is uneven. Testers who prompt carelessly get plausible test cases that miss the real risk, test data that violates the schema, and defect reports that describe a bug that does not exist. Testers who prompt well — with the requirement attached, the constraints stated and the output format specified — get a genuine multiple on their output. The difference is a learnable skill and it takes about a month.",
      "The career effect is quieter than a job title change. There is no large market for an \"AI-assisted tester\" as a distinct role; there is a rapidly growing expectation that QA engineers work this way, and it shows up in appraisal conversations and interview questions rather than in job boards. This course is designed for that reality: it upgrades the role you have rather than promising a new one, and it says so rather than implying otherwise.",
    ],
    keyPoints: [
      "One month, part-time — designed around a working QA job",
      "Requirements, test design, test data, automation, triage, documentation",
      "Reviewing AI output taught as the core skill, not an afterthought",
      "A QA prompt library you keep and your team can reuse",
      "Responsible use — PII, secrets, proprietary code, enterprise policy",
      "Tool-neutral, so it survives your employer's tooling decisions",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Manual testers who want more output from the same working hours",
      "Automation engineers who use AI ad-hoc and want a deliberate workflow",
      "QA leads and test managers evaluating AI for their team, who need to know what it is actually good at",
      "Business analysts who write acceptance criteria and want them tested for ambiguity before development starts",
      "SDETs who spend real time on test data and defect triage",
      "Experienced professionals who want AI productivity without first becoming AI developers",
    ],
    notForYou: [
      "Anyone who wants to test AI applications — hallucinations, RAG quality, model regression. That is the LLM & RAG Testing course, and this one will not cover it",
      "Complete beginners to testing; you need to already know what a good test case looks like, because the whole course is about judging AI-generated ones",
      "Anyone looking for a tool tutorial tied to one vendor — this is deliberately tool-neutral so it still applies after your employer switches assistants",
      "Testers whose organisation prohibits AI assistants outright, unless you are the person building the case to change that",
    ],
  },

  curriculum: [
    {
      title: "Generative AI for QA Professionals",
      weekRange: "Week 1",
      description:
        "The mental model first, kept at exactly the depth a tester needs. AI, machine learning and Generative AI as distinct things; what a large language model actually does; prompts, system and user instructions, tokens and context.\n\nThen the properties that matter operationally: the same prompt can give different answers, the model will state something false with complete confidence, and it has no way to signal uncertainty reliably. Human-in-the-loop is introduced here as the governing principle for everything that follows — the tester approves, always.",
      topics: [
        "AI vs machine learning vs Generative AI",
        "What a large language model is, in tester's terms",
        "Prompts, system instructions and user instructions",
        "Tokens and context, and why long chats drift",
        "Model variability — why the same prompt differs twice",
        "Hallucination: confident, fluent and wrong",
        "Structured output and why it matters for QA",
        "The human-in-the-loop principle",
      ],
    },
    {
      title: "Prompt Engineering for Testing",
      weekRange: "Week 1",
      description:
        "Prompting as a QA skill rather than a general one. A prompt that produces good test cases contains the requirement, the constraints, the acceptance criteria and the output format — and most weak AI output traces to a prompt missing one of those.\n\nYou build reusable prompt templates for the tasks you repeat every sprint, and learn role prompting and iterative refinement. The module ends on evaluation: how to read an AI answer critically before you use it, which is the habit that separates the two groups of adopters.",
      topics: [
        "Clear task definition and stated constraints",
        "Supplying context — how much, and what to leave out",
        "Acceptance criteria inside the prompt",
        "Examples and few-shot patterns",
        "Output schemas and format control",
        "Role prompting for QA tasks",
        "Iterative refinement without starting over",
        "Building a reusable QA prompt template",
        "Evaluating an AI answer before you use it",
      ],
    },
    {
      title: "AI-Assisted Requirement Analysis",
      weekRange: "Week 1",
      description:
        "The highest-leverage use, and the least obvious one. Testers find defects in requirements more cheaply than anyone finds them in code, and an assistant is genuinely good at surfacing ambiguity, contradiction and omission in a specification.\n\nYou practise on real, imperfect requirements: summarising them, listing what is undefined, spotting rules that contradict each other, generating the clarification questions to take to the BA, and deriving acceptance criteria. Comparing two versions of a specification to find what silently changed is included, because that is where regressions are born.",
      topics: [
        "Summarising a specification without losing detail",
        "Identifying ambiguity and undefined behaviour",
        "Finding missing rules and edge conditions",
        "Detecting contradictions between requirements",
        "Generating clarification questions for the BA",
        "Deriving acceptance criteria from prose",
        "Producing a risk list from a specification",
        "Tracing requirements to tests",
        "Diffing two versions of a requirement",
      ],
    },
    {
      title: "AI-Assisted Test Design",
      weekRange: "Week 2",
      description:
        "Generating test scenarios and cases, and — the part that carries the module — deciding which ones to keep. An assistant will readily produce forty cases, of which perhaps twenty-five are genuine, ten are duplicates in different words and five test something the system does not do.\n\nThe classical techniques are used as the check: if the generated set has no boundary values, no negative cases and no state transitions, it is incomplete regardless of how long it is. Risk-based prioritisation and regression selection follow, because the constraint is never how many cases you can write.",
      topics: [
        "Generating test scenarios from a requirement",
        "Functional, negative and boundary cases",
        "Decision tables and state-transition cases with AI",
        "Exploratory charters generated as starting points",
        "Spotting duplicates and non-existent behaviour",
        "Using classical techniques to audit the generated set",
        "Risk-based prioritisation",
        "Regression selection for a release",
        "Cross-browser, device and accessibility test ideas",
        "API test scenarios from a contract",
      ],
    },
    {
      title: "AI-Assisted Test Data",
      weekRange: "Week 2",
      description:
        "Test data is where AI saves the most unglamorous hours. Synthetic datasets, positive and negative sets, boundary sets, JSON payloads, CSV files and SQL seed scripts — generated in minutes rather than an afternoon of typing.\n\nThe discipline is privacy. Pasting a production extract into a public assistant to \"make more like this\" is a data-protection incident, and it happens. You learn masking, synthetic generation from a schema rather than from real records, and how to get genuinely diverse data — names, scripts, address formats — rather than fifty rows of near-identical filler.",
      topics: [
        "Synthetic data generated from a schema",
        "Positive, negative and boundary datasets",
        "JSON payloads and CSV files",
        "SQL seed scripts",
        "Masking and de-identification",
        "Why production extracts must never be pasted in",
        "PII considerations and what your policy likely says",
        "Getting real diversity, not fifty similar rows",
        "Validating generated data against the schema",
      ],
    },
    {
      title: "AI-Assisted Automation",
      weekRange: "Week 3",
      description:
        "Drafting automation code with AI across the stacks this category teaches — Selenium with Java or Python, Playwright with TypeScript, API assertions, pytest and TestNG. Generating locators, converting manual cases into automation candidates, producing Page Objects, and explaining unfamiliar legacy test code.\n\nReviewing generated test code closes the module and is weighted accordingly. Automation code that passes for the wrong reason is worse than no automation, because it creates confidence without coverage — and generated tests fail this way more often than hand-written ones.",
      topics: [
        "Selenium test skeletons in Java and Python",
        "Playwright tests in TypeScript",
        "API assertions and response validation",
        "pytest and TestNG test generation",
        "Locator candidates and their trade-offs",
        "Converting manual cases to automation candidates",
        "Page Object generation and refactoring",
        "Explaining legacy test code you inherited",
        "Test maintenance with AI",
        "Reviewing generated test code — passing for the wrong reason",
      ],
    },
    {
      title: "AI-Assisted Failure Analysis",
      weekRange: "Week 3",
      description:
        "Triage, which is where testers lose the most time to the least interesting work. Interpreting stack traces, explaining application logs, and narrowing a failure to a likely cause — with AI as a fast first reader rather than the decision-maker.\n\nThe judgement being built is the distinction between a test failure and an application failure, because reporting the wrong one wastes a developer's day and your credibility. Flaky-test investigation, locator repair, screenshot comparison and drafting a reproducible defect report from evidence complete the module.",
      topics: [
        "Interpreting a stack trace",
        "Explaining application and server logs",
        "Narrowing to a likely root cause",
        "Test failure versus application failure",
        "Flaky-test investigation patterns",
        "Locator repair after a UI change",
        "Analysing screenshots and visual diffs",
        "Comparing expected and actual API responses",
        "Drafting a reproducible defect report from evidence",
      ],
    },
    {
      title: "QA Documentation and Team Workflow",
      weekRange: "Week 4",
      description:
        "The written output QA owes everyone else. Test plans, test summary reports, defect descriptions, release notes, traceability matrices and status updates — all of them tasks where a good first draft in ninety seconds changes what actually gets written.\n\nThen the team layer: AI-assisted code review, AI in pull requests, and building a shared prompt library so the whole QA team benefits rather than one enthusiast. Knowledge-base creation from scattered documents is included, because most QA teams have that problem and few solve it.",
      topics: [
        "Test plans and test summary reports",
        "Defect descriptions that a developer can act on",
        "Release notes from a defect list",
        "Traceability matrices",
        "Status updates and stakeholder summaries",
        "AI-assisted code review",
        "AI in pull requests",
        "Building a shared QA prompt library",
        "Knowledge-base creation from scattered documents",
      ],
    },
    {
      title: "Responsible AI for QA",
      weekRange: "Week 4",
      description:
        "The module that keeps the rest of the course usable at work. Data privacy and PII, credentials and secrets, proprietary code and the licensing questions around generated code — each with the practical version of the rule rather than the legal abstraction.\n\nOver-reliance is treated as a real risk rather than a caution: a tester who stops reading is worse than a tester who never started prompting. Prompt-injection awareness, human approval gates and aligning with enterprise AI policy close the course, so you can take this back to a team that has rules.",
      topics: [
        "Data privacy and PII in prompts",
        "Credentials and secrets — the rule and why it is absolute",
        "Proprietary code and what leaves your network",
        "Licensing questions around generated code",
        "Hallucination risk in QA artefacts specifically",
        "Over-reliance, and the tester who stopped reading",
        "Prompt-injection awareness",
        "Human approval gates",
        "Aligning with enterprise AI policy",
      ],
      highlight: true,
    },
  ],

  roadmapImage: {
    src: "/images/courses/ai-assisted-testing-path-v1.webp",
    width: 1400,
    height: 818,
    alt: "Seven-stage AI-Assisted Software Testing learning path taught at Archer Infotech Pune: GenAI foundations covering LLMs, tokens, context and hallucination; prompt engineering for testing covering constraints, schemas and reusable templates; requirement analysis covering ambiguity, contradictions and acceptance criteria; test design covering scenarios, boundary and negative cases and risk-based prioritisation; test data covering synthetic generation, masking and PII rules; automation and triage covering generated Selenium, Playwright and API tests plus stack-trace and flaky-test analysis; and documentation and responsible use covering test plans, prompt libraries, secrets and enterprise policy.",
    caption:
      "One month, in this order — the model first, then prompting, then the six QA tasks AI genuinely helps with. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/ai-assisted-software-testing-syllabus-v1.pdf",
    title: "AI-Assisted Software Testing Syllabus",
    slug: "ai-assisted-software-testing-syllabus",
    blurb:
      "The complete nine-module syllabus as a PDF — GenAI foundations for QA, prompt engineering for testing, requirement analysis, test design, test data, automation, failure analysis, QA documentation and responsible AI use, with the four projects specified. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What this course is, and is not",
        items: [
          "It is: using AI to test conventional software faster and more thoroughly.",
          "It is not: testing AI systems. Hallucination testing, RAG evaluation and model regression belong to the LLM & RAG Testing course.",
          "One month, aimed at people already working in QA rather than at beginners.",
          "Tool-neutral by design, so it still applies when your employer changes assistant.",
        ],
      },
      {
        heading: "What you take back to work",
        items: [
          "A QA prompt library covering requirements, test design, data, triage and documentation.",
          "A review checklist for AI-generated test cases and test code.",
          "A defensible position on PII, secrets and proprietary code in prompts.",
          "A worked before-and-after on one of your own real testing tasks.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Requirement-to-Test-Case AI Workflow",
      description:
        "Take a real, imperfect requirements document. Use AI to summarise it, list its ambiguities and contradictions, generate the clarification questions, derive acceptance criteria, and produce a test-scenario set — then audit that set against boundary, negative and state-transition coverage and defend what you kept and what you deleted.",
      technologies: [
        "AI assistant of your choice",
        "Prompt templates",
        "Test design techniques",
        "Traceability matrix",
      ],
    },
    {
      title: "Manual-to-Automation Conversion",
      description:
        "Convert a suite of manual test cases into automation candidates, generate the scripts in Selenium or Playwright, and review every one. The deliverable includes the tests you rejected and why — a generated test that passes for the wrong reason is the specific defect this project trains you to catch.",
      technologies: ["Selenium", "Playwright", "pytest or TestNG", "Code review checklist"],
    },
    {
      title: "AI-Assisted Defect Triage",
      description:
        "Work a set of real failures — stack traces, logs, screenshots and API responses — using AI as a first reader. Classify each as test failure or application failure, identify the likely cause, and produce defect reports a developer can reproduce from. Accuracy of the classification is what is graded.",
      technologies: ["Log analysis", "Stack traces", "Jira", "Evidence capture"],
    },
    {
      title: "End-to-End AI-Enabled QA Mini Project",
      description:
        "One feature, taken from requirement through test design, test data, automation, execution, triage and the test summary report — with AI used deliberately at each stage and a written account of where it helped, where it misled you, and what you changed as a result.",
      technologies: ["Full QA workflow", "Prompt library", "Automation stack", "Reporting"],
    },
  ],

  trainersIntro:
    "Taught by QA practitioners who use these assistants on live projects, including the ones where the AI-generated suite looked complete and was not. Your prompt library and your reviewed test code both get feedback.",

  careerOutcomes: {
    paragraphs: [
      "This course upgrades an existing QA role rather than creating a new one, and it is worth being precise about that. There is no meaningful volume of Pune job listings for an \"AI-assisted tester\"; there is a fast-growing number of QA and SDET listings that mention AI tooling in the responsibilities, and a much larger number of interviews where the question comes up unprompted. The value shows in what you are trusted with and what you are paid, rather than in a new title.",
      "Where it matters most immediately is at the senior end of manual QA. A tester with eight years of domain knowledge and no automation has a compression problem in the Pune market; the same tester who can drive requirement analysis, generate and audit test sets, and produce automation drafts for someone else to harden is materially more valuable, and gets there in one month rather than one year. For automation engineers the gain is narrower but real — mostly in triage and test data.",
      "Placement support is included, though for a one-month upgrade course most learners are already employed and use it for internal positioning rather than a job change. We do not guarantee placement; the institute-records rate is 90% across all tracks, measured on learners who complete training and clear at least one mock-interview round.",
    ],
    salaryBands: [
      {
        role: "QA Engineer (1–3 yrs)",
        band: "₹4–7 LPA",
        source: {
          label: "AmbitionBox Pune QA Engineer",
          url: "https://www.ambitionbox.com/profile/qa-engineer-salary",
        },
      },
      {
        role: "QA Automation Engineer (1–3 yrs)",
        band: "₹6–10 LPA",
        source: {
          label: "Indeed Pune QA Automation listings (last 12 mo)",
          url: "https://in.indeed.com/jobs?q=qa+automation&l=Pune",
        },
      },
      {
        role: "QA Lead / Test Manager (5+ yrs)",
        band: "₹10–18 LPA",
        source: {
          label: "Glassdoor Pune QA Lead",
          url: "https://www.glassdoor.co.in/Salaries/pune-qa-lead-salary-SRCH_IL.0,4_IM1064_KO5,12.htm",
        },
      },
    ],
    hiringCompanies: [
      "Services majors running large QA pipelines",
      "GCC captives in Hinjewadi and Kharadi",
      "Pune product companies with small, senior QA teams",
      "Consultancies advising clients on AI adoption",
    ],
    rolesAfterCourse: [
      "AI-Enabled QA Engineer",
      "Senior QA Engineer",
      "Automation Engineer using AI",
      "QA Lead running AI-assisted workflows",
      "Foundation for progression into AI Test Engineer roles",
    ],
  },

  modesAndDuration: {
    duration: "1 month — around 24 to 30 contact hours, designed to fit around a working QA job",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Evening batch — 19:00 to 21:00, three days a week",
        "Weekend batch — Saturday and Sunday mornings",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available, since most learners are working",
        "Prompt library and reviewed work returned individually",
      ],
      tools: [
        "Zoom for live sessions",
        "An AI assistant — free tiers are sufficient",
        "Jira or an equivalent tracker",
        "Whichever automation stack you already use",
      ],
    },
    batchPolicy:
      "Maximum 15 per batch. New batches roughly every 4 weeks. Bring a laptop and, if your employer restricts AI tools, tell us before you enrol — we will map the course to what you are allowed to use.",
  },

  fees: {
    note:
      "This is a one-month upgrade course, priced accordingly and well below the two-month automation tracks in this category. No AI tool subscription is required; the free tiers cover everything taught. Corporate batches for a whole QA team are quoted separately and are the most common way this course is bought. Contact admissions for the current figure.",
    range: "₹15,000 – ₹22,000 (typical band); no tool subscription required",
    paymentOptions: [
      "One-time payment",
      "Corporate sponsorship — invoiced with GST",
      "Team booking for a full QA team, quoted separately",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Most learners on this course are already employed, so support is weighted toward internal positioning: how to present the work to your lead, how to answer the AI-workflow question that now appears in appraisal and interview conversations, and how to propose a team prompt library without it reading as a hobby project.",
      "For learners who are between roles, the standard support applies — resume and LinkedIn rewriting, mock interviews, and introductions to partner companies. Placement is not guaranteed. The institute-records rate is 90% across all tracks.",
    ],
    process: [
      "Week 3 — resume and LinkedIn updated with the AI-assisted workflow stated concretely",
      "Week 4 — mock interview on the AI-workflow question specifically",
      "Week 4 — your prompt library and reviewed test code assessed by the trainer",
      "Post-course — introductions to partner companies for learners seeking a move",
      "Post-course — continued placement-cell access for six months",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini Pune",
      "LTIMindtree",
      "Cognizant",
      "Tech Mahindra",
      "100+ partner companies across the hiring network",
    ],
  },

  comparison: {
    intro:
      "Worth using as a checklist against any AI-for-testing course, including this one.",
    rows: [
      {
        feature: "Scope stated clearly",
        archer: "Testing conventional software with AI — the AI-testing specialisation is a separate course we name",
        typical: "\"AI testing\" used to mean both, so learners buy the wrong one",
      },
      {
        feature: "Reviewing AI output",
        archer: "Taught in every module and graded in three of the four projects",
        typical: "Generation demonstrated; evaluation left to the learner",
      },
      {
        feature: "Test data privacy",
        archer: "A rule you can take to a compliance team, with masking practised",
        typical: "Not addressed, which is how production data reaches public assistants",
      },
      {
        feature: "Tool dependence",
        archer: "Vendor-neutral — the method survives a tooling change",
        typical: "Built around one assistant's current interface",
      },
      {
        feature: "Deliverable",
        archer: "A prompt library, a review checklist and four worked projects",
        typical: "A certificate and a set of screenshots",
      },
      {
        feature: "Honesty about the market",
        archer: "States that this upgrades your role rather than creating a new one",
        typical: "Implies a new, higher-paid job title exists",
      },
      {
        feature: "Downloadable syllabus",
        archer: "Yes — full module and project detail before you pay",
        typical: "A module list, or nothing",
      },
    ],
    closing:
      "The question worth asking: does the course teach you to judge what the AI produced, or only to produce it? Everything expensive about getting this wrong sits on the judging side.",
  },

  versusAlternative: {
    heading: "AI-Assisted Testing or LLM & RAG Testing — which do you need?",
    paragraphs: [
      "These are the two courses learners most often confuse, and choosing wrong wastes a month. The rule is short: AI-Assisted Testing uses AI as a helper to test ordinary software. LLM & RAG Testing evaluates software whose own behaviour depends on AI. One is a productivity skill; the other is a specialisation.",
      "Take AI-Assisted Testing if your product is a banking portal, an e-commerce site, an ERP, an API — anything deterministic — and you want to test it faster and more thoroughly. Take LLM & RAG Testing if your product has a chatbot, a document assistant, a summarisation feature or a retrieval system, and someone has asked you how you plan to test it.",
      "If both apply, take this one first. It is one month, it needs no Python, and the prompting and evaluation habits it builds are assumed by the LLM course. Almost nobody benefits from the reverse order.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "You need working testing knowledge — you should already know what a good test case looks like, because the entire course is about judging generated ones against that standard. Coding is helpful and not mandatory: the requirement, test design, test data, triage and documentation modules need none, and the automation module is taught so a non-coder can still evaluate and brief rather than write. If your employer restricts which AI tools you may use, tell us at enrolment and we will map the course onto what is permitted.",
    ],
    suggestedSteps: [
      "Pick one AI assistant you are allowed to use at work and get access",
      "Take one real requirement from your current project and try generating test cases from it",
      "Note what the AI got wrong — that list is what this course is built around",
      "Download the full syllabus above and check the module list against your gaps",
      "Book a free counselling call if you are unsure whether you need this or LLM & RAG Testing",
    ],
  },

  faqs: [
    {
      question: "What is AI-assisted software testing?",
      answer:
        "It means using Generative AI to do conventional QA work faster and more thoroughly — analysing requirements, designing test cases, generating test data, drafting automation code, interpreting failures and writing QA documentation. The software under test stays ordinary, deterministic software. The AI is your assistant, not the thing being tested.",
    },
    {
      question: "What is the difference between AI-Assisted Testing and LLM Testing?",
      answer:
        "AI-Assisted Testing uses AI as a helper to test normal software. LLM Testing evaluates software whose own behaviour depends on AI — response quality, hallucination, grounding, safety and regression. They sound similar and are different jobs. Our LLM & RAG Testing course covers the second one.",
    },
    {
      question: "Do I need to know programming for this course?",
      answer:
        "Not for most of it. Requirement analysis, test design, test data, failure analysis and documentation need no coding. The automation module is taught so a non-coder can still evaluate and brief generated code rather than write it. Automation engineers will get more from that module, and that is expected.",
    },
    {
      question: "How long is the AI-Assisted Software Testing course and what does it cost?",
      answer:
        "One month — roughly 24 to 30 contact hours in evening or weekend batches, designed to fit around a working QA job. Fees sit in the ₹15,000 to ₹22,000 band, below the two-month automation tracks. No AI tool subscription is needed. Call 9822052088 for the current figure and batch dates.",
    },
    {
      question: "Which AI tools does the course use?",
      answer:
        "It is deliberately tool-neutral. You work with whichever assistant you are permitted to use — ChatGPT, Claude, Copilot or an enterprise deployment — because the method has to survive your employer changing tools. Free tiers cover everything taught. Tell us at enrolment if your organisation restricts AI tools.",
    },
    {
      question: "Will AI replace software testers?",
      answer:
        "No, and the failure modes explain why. Generated test sets miss real risk, generated data violates schemas, and generated defect reports describe bugs that do not exist — all confidently. Someone has to judge the output against what the system actually does. What changes is that testers who work this way produce considerably more than those who do not.",
    },
    {
      question: "Can I use AI on my company's code and requirements?",
      answer:
        "That depends on your organisation's policy, and the responsible-use module is built around exactly this. Proprietary code, credentials and production data with PII are the three categories that cause incidents. You will leave with a defensible position and practical alternatives, including generating test data from a schema rather than from real records.",
    },
    {
      question: "Is this course useful for a manual tester with no automation experience?",
      answer:
        "Yes, and it is where the gain is largest. A senior manual tester who can drive requirement analysis, generate and audit test sets, and produce automation drafts for someone else to harden becomes materially more valuable in one month. It does not replace learning automation properly — pair it with Selenium with Python if that is your direction.",
    },
    {
      question: "Does this course cover testing chatbots or RAG applications?",
      answer:
        "No. That is the Generative AI, LLM & RAG Testing course, which covers hallucination testing, golden datasets, LLM-as-a-Judge, retrieval and faithfulness evaluation, and AI safety testing. If your product has a chatbot or a document assistant, that is the course you need.",
    },
    {
      question: "Can my whole QA team take this together?",
      answer:
        "Yes, and it is the most common way this course is bought. Corporate batches are quoted separately, run at your premises or ours, and are mapped onto your permitted tool set and your actual project artefacts, so the prompt library the team builds is one they can use the following week.",
    },
    {
      question: "Is placement assistance included?",
      answer:
        "Yes, at no extra charge, though most learners here are already employed and use it for internal positioning. Support covers resume and LinkedIn updates, a mock interview on the AI-workflow question, and introductions to partner companies. Placement is not guaranteed; the institute-records rate is 90% across all tracks.",
    },
    {
      question: "Where is this course conducted in Pune?",
      answer:
        "At Archer Infotech in Kothrud, Pune, with evening and weekend classroom batches and live online batches for working professionals. Online learners get the same individual feedback on their prompt library and reviewed test code. Batch size is capped at 15.",
    },
  ],

  finalCta: {
    heading: "One month to change how you test — starting with the work you already have",
    paragraph:
      "Download the full syllabus, or book a free counselling call if you are choosing between this and the LLM & RAG Testing course. Corporate batches for a whole QA team are quoted on request.",
  },
};
