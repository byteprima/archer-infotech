import type { CourseRichContent } from "./types";

/**
 * Agentic AI Testing & AI Quality Engineering — rich content overlay.
 *
 * The distinction that has to carry through every section: an LLM says
 * things and an agent DOES things. That single difference is why this is a
 * separate course rather than a module of the LLM one — a wrong sentence is
 * a quality defect, a wrong tool call with the right-looking arguments is a
 * refunded order, a deleted record, an email that cannot be recalled.
 *
 * The second distinction, stated wherever a reader could confuse them: the
 * Agentic AI course under AI & GenAI teaches BUILDING agents. This teaches
 * validating them. Cross-linked, never merged.
 *
 * Vendor discipline: agent frameworks turn over faster than any other part
 * of this stack. Patterns lead; named products appear as illustration.
 */

export const agenticAiTestingTrainingInPune: CourseRichContent = {
  intro:
    "An LLM says things; an agent does things — calls tools, changes records, sends messages, spends money. This two-month advanced course teaches you to validate that behaviour: tool selection and argument correctness, trajectory evaluation, memory and cross-user isolation, multi-agent handoffs, indirect prompt injection and excessive agency, agent metrics from task success to cost per completed task, offline golden-task harnesses with mocked tools, and the production quality engineering that keeps an agent trustworthy after release.",

  whyLearn: {
    heading: "Why Agent Testing Is the Hardest Problem in QA Right Now",
    paragraphs: [
      "The gap between an LLM defect and an agent defect is the gap between an embarrassment and an incident. A model that produces a wrong sentence has given a bad answer. An agent that selects the right tool with subtly wrong arguments has issued a refund, cancelled a booking, deleted a record or sent an email — and the output that preceded it read perfectly. Everything that makes agents useful is what makes them consequential to test.",
      "It is also genuinely harder. There is no single correct path: two trajectories can both complete the task, one in four steps and one in eleven, and both are passes by end-state and very different by cost. The agent may recover from an error you never intended to inject. It may loop. It may finish early and declare success. Testing has to judge the journey as well as the destination, which is a form of assertion no traditional QA course teaches.",
      "The scarcity follows from the difficulty. Companies deploying agents are discovering that their existing QA cannot evaluate them and their AI team is optimising for capability rather than for failure. The role that sits between — AI quality engineering — is thinly staffed and paid accordingly. This is the most advanced course in the Testing & QA category and it is honest about that: it expects automation experience, Python, and LLM evaluation fundamentals before you start.",
    ],
    keyPoints: [
      "Trajectory evaluation — judging the path, not only the final answer",
      "Tool-call testing: wrong tool, bad arguments, tool failures, retries, idempotency",
      "Memory testing, including cross-user and cross-session leakage",
      "Indirect prompt injection and excessive agency — the agent-specific security surface",
      "Golden-task harness with mocked tools, run as a CI release gate",
      "Production quality engineering — tracing, drift, failed-task capture, review queues",
      "Vendor-neutral: patterns over frameworks, so it survives the churn",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Senior QA and automation engineers whose company has deployed or is deploying agents",
      "SDETs who already own framework and CI decisions",
      "LLM testers who have done evaluation work and now face tool calls and state",
      "QA leads who have to sign off a release where an agent can take real actions",
      "AI developers moving into evaluation, who can build agents and need to break them",
      "Anyone who has been asked to guarantee an agent will not do something irreversible",
    ],
    notForYou: [
      "Testers new to AI quality — take Generative AI, LLM & RAG Testing first; this course assumes all of it",
      "Anyone wanting to build agents rather than test them; the Agentic AI course under AI & GenAI is the right one",
      "Learners without Python and automation experience, who will not keep up with the harness modules",
      "Teams looking for a tool demonstration — this is deliberately framework-neutral, because agent tooling turns over faster than any other part of the stack",
    ],
  },

  curriculum: [
    {
      title: "Agentic AI Architecture for Testers",
      weekRange: "Week 1",
      description:
        "What an agent is, defined by what it can do rather than by marketing. An agent versus a chatbot, and an agent versus a deterministic workflow — the second distinction matters most, because a great deal of what is sold as agentic is a scripted pipeline with a model in one step, and it should be tested as a pipeline.\n\nThen the reasoning loop: plan, act, observe, repeat. Tools and function calling, state, memory, human-in-the-loop checkpoints and multi-agent topologies, each introduced with the question a tester should ask about it.",
      topics: [
        "What an AI agent is",
        "Agent versus chatbot",
        "Agent versus deterministic workflow with a model in it",
        "The reasoning loop — plan, act, observe",
        "Tools and function calling",
        "State and how it accumulates",
        "Short-term and long-term memory",
        "Human-in-the-loop checkpoints",
        "Multi-agent systems in outline",
        "Agent frameworks at a conceptual level",
      ],
    },
    {
      title: "Agent Test Strategy",
      weekRange: "Week 1",
      description:
        "The decision that shapes every suite you will write: which parts of this system are deterministic and must be asserted, and which are probabilistic and must be evaluated. Tools are code and get unit tests. Tool selection is a judgement and gets evaluation. Confusing the two produces either a flaky suite or one that tests nothing.\n\nFrom there: the test pyramid for agents, golden tasks with defined success criteria, rubrics, and the environment question — mock tools, sandboxed execution, and why an agent test that touches a real system is a test you will eventually regret.",
      topics: [
        "What must be deterministic, and what must be evaluated",
        "Unit testing tools and functions",
        "Integration testing the agent against its tools",
        "End-to-end agent tests and their cost",
        "Scenario-based evaluation",
        "Golden tasks and success criteria",
        "Rubrics for partial success",
        "Test environments for agents",
        "Mock tools versus sandboxed real tools",
        "Why agent tests should not touch production systems",
      ],
    },
    {
      title: "Tool-Calling Testing",
      weekRange: "Week 2",
      description:
        "The highest-value test surface in the whole course, because this is where an agent's mistakes become actions. Correct tool selection, wrong tool selection, and the underrated no-tool case — an agent that calls a tool when it should simply have answered is a defect, and it is rarely caught.\n\nThen arguments: correct, missing, invalid, and the dangerous middle case of plausible but wrong. Schema validation, tool permissions, tool errors, retry logic, idempotency and timeouts follow, with mocking taught as the mechanism that makes all of it testable.",
      topics: [
        "Correct tool selection under ambiguity",
        "Wrong tool selection and how to detect it",
        "The no-tool case — answering without acting",
        "Correct, missing and invalid arguments",
        "Plausible but wrong arguments",
        "Argument schema validation",
        "Tool permissions and allowlists",
        "Tool errors and how the agent responds",
        "Retry logic and idempotency",
        "Timeout behaviour",
        "External dependency failure",
        "Building tool mocks that behave badly on purpose",
      ],
      highlight: true,
    },
    {
      title: "Workflow and Trajectory Evaluation",
      weekRange: "Weeks 2–3",
      description:
        "Judging the path. A successful trajectory is not simply one that reached the end state — it took a reasonable number of steps, in a defensible order, without repeating calls or looping, and it did the critical steps rather than skipping to a plausible conclusion.\n\nYou learn to specify expected critical steps while permitting alternative valid paths, and to detect the specific pathologies: missing steps, duplicates, repeated identical calls, infinite loops, premature completion and wrong ordering. Recovery behaviour is evaluated too, since an agent that errs and corrects itself may be better than one that never erred by luck.",
      topics: [
        "What makes a trajectory successful",
        "Expected critical steps versus alternative valid paths",
        "Missing and duplicate steps",
        "Repeated identical calls",
        "Infinite loops and step budgets",
        "Premature completion and false success",
        "Wrong ordering with a correct end state",
        "Error recovery as a positive signal",
        "Step-level versus end-state evaluation",
        "Writing a trajectory evaluator",
      ],
      highlight: true,
    },
    {
      title: "Memory and Context Testing",
      weekRange: "Week 3",
      description:
        "State is what makes agent bugs irreproducible, and memory is state that persists past the conversation. Session context, conversation history, short-term and long-term memory, and retrieval from memory — each with its failure mode.\n\nStale memory, incorrect memory and conflicting memories are the quality defects; the correction case matters most in practice, because a user who says \"no, my address changed\" and is ignored has lost trust permanently. Cross-session isolation and cross-user leakage are the security defects, and they are the ones that stop a release.",
      topics: [
        "Session context and conversation history",
        "Short-term versus long-term memory",
        "Memory retrieval and its relevance",
        "Stale memory",
        "Incorrect memory",
        "Conflicting memories",
        "User correction — and being ignored",
        "Cross-session isolation",
        "Cross-user leakage",
        "PII held in memory",
        "Deletion and retention behaviour",
      ],
    },
    {
      title: "Multi-Agent Testing",
      weekRange: "Week 4",
      description:
        "When one agent delegates to another, the failure surface stops being linear. Roles, supervisor and worker patterns, delegation, handoffs and the message contract between agents — which is the interface most worth testing, because it is rarely specified anywhere.\n\nThe distributed-systems pathologies arrive with the topology: context lost in transfer, shared state written twice, agents that disagree, duplicated work, deadlocks, and failures that propagate silently rather than surfacing. Escalation to a human is treated as a required path and tested as one.",
      topics: [
        "Agent roles and responsibilities",
        "Supervisor and worker patterns",
        "Delegation and handoffs",
        "Message contracts between agents",
        "Context transfer and what gets lost",
        "Shared state and write conflicts",
        "Conflicting agents",
        "Duplicate work",
        "Deadlocks and stalls",
        "Failure propagation",
        "Escalation to a human as a tested path",
        "End-to-end task completion across agents",
      ],
    },
    {
      title: "Agent Security and Safety",
      weekRange: "Weeks 4–5",
      description:
        "The security surface that only exists because the agent can act. Direct prompt injection is the familiar case; indirect injection is the serious one — instructions arriving inside a retrieved document, a web page, a support ticket or a tool's own output, aimed at an agent that has permission to do something about them.\n\nData exfiltration, secret leakage, unauthorised actions and privilege boundaries follow, then excessive agency: an agent permitted to do more than the task needs. Tool allowlists, confirmation gates for sensitive actions and auditability are the controls you test for, with red-team scenarios as the method.",
      topics: [
        "Direct prompt injection",
        "Indirect injection from documents, web content and tickets",
        "Malicious tool output",
        "Untrusted content in the agent's context",
        "Data exfiltration paths",
        "Secret leakage",
        "Unauthorised actions",
        "Privilege boundaries between users and agents",
        "Tool allowlists",
        "Confirmation gates for irreversible actions",
        "Excessive agency — permission beyond the task",
        "Unsafe loops and runaway cost",
        "Auditability and what a trace must record",
        "Red-team scenarios for action-taking agents",
      ],
      highlight: true,
    },
    {
      title: "Agent Evaluation Metrics",
      weekRange: "Week 5",
      description:
        "What you report, and what each number hides. Task success rate is the headline and the most misleading in isolation — an agent succeeding 90% of the time at four times the cost of the alternative is not obviously better.\n\nTool-selection and argument accuracy, step count, trajectory quality, error-recovery rate, escalation quality and final-response quality give the shape of behaviour; latency, token consumption and cost per completed task give the economics; and reliability across repeated runs gives the confidence interval, because a single run of a probabilistic system is an anecdote.",
      topics: [
        "Task success rate, and what it conceals",
        "Tool-selection accuracy",
        "Argument accuracy",
        "Step count and efficiency",
        "Trajectory quality scoring",
        "Error-recovery rate",
        "Human-escalation quality",
        "Final-response quality",
        "Safety adherence rate",
        "Latency and token consumption",
        "Cost per completed task",
        "Reliability across repeated runs",
      ],
    },
    {
      title: "Offline Evaluation",
      weekRange: "Week 6",
      description:
        "The repeatable suite that gates a release. Golden task datasets, simulation, mock tools and deterministic fixtures — enough control that a run difference means the agent changed rather than the world did.\n\nRepeat runs and baselines make the results comparable; model, prompt and agent-version comparison make them actionable. Release gates close the module: a threshold that blocks a deploy, which is where all of this stops being analysis and becomes quality engineering.",
      topics: [
        "Golden task datasets for agents",
        "Simulation and scripted environments",
        "Mock tools and deterministic fixtures",
        "Repeat runs and variance",
        "Baselines and stored results",
        "Model comparison",
        "Prompt comparison",
        "Agent-version comparison",
        "Release gates and thresholds",
      ],
    },
    {
      title: "Online and Production Quality Engineering",
      weekRange: "Week 6",
      description:
        "Offline evaluation cannot cover the input distribution of real users, so production becomes a test surface. Tracing, sampling, online evaluators and user feedback, with failed-task capture feeding the regression dataset — the loop that makes a suite get better instead of going stale.\n\nDrift and change detection, incident review, cost and latency monitoring, quality dashboards and human review queues complete the picture. This is the module that turns a tester into a quality engineer, and it is the part most teams have not built.",
      topics: [
        "Tracing an agent run in production",
        "Sampling strategies",
        "Online evaluators",
        "User feedback signals and their bias",
        "Failed-task capture",
        "Growing the regression dataset from production",
        "Drift and change detection",
        "Incident review for agent failures",
        "Cost and latency monitoring",
        "Quality dashboards",
        "Human review queues",
      ],
    },
    {
      title: "Test Automation for Agents",
      weekRange: "Week 7",
      description:
        "Building the harness. A Python agent-test framework with pytest scenarios, tool mocks, structured trace capture, and evaluators for the properties earlier modules defined.\n\nAssertions come in two kinds and both are used: hard assertions on tool calls and final state, and model judges for the soft criteria that cannot be asserted. Result storage, quality thresholds and CI execution make it a release gate rather than a script someone runs when they remember to.",
      topics: [
        "Python agent-test harness structure",
        "pytest scenarios for agent tasks",
        "Tool mocks and controllable failure injection",
        "Capturing structured traces",
        "Writing evaluators for trajectory and outcome",
        "Assertions on tool calls",
        "Assertions on final state",
        "LLM judges for soft criteria",
        "CI regression execution",
        "Test result storage and history",
        "Quality thresholds that block a deploy",
      ],
    },
    {
      title: "Modern Agent Interfaces and the Capstone",
      weekRange: "Weeks 7–8",
      description:
        "The interface layer, kept conceptual so it ages well: function and tool-calling patterns, the Model Context Protocol as an example of an agent-to-tool contract, browser and computer-use testing, external connectors, permission boundaries and auditing.\n\nThen the capstone: a full quality-engineering deliverable for an agent — golden task dataset, mocked tools, trajectory evaluator, task-success evaluator, safety tests, CI regression suite and a quality report someone can make a release decision from without reading your code.",
      topics: [
        "Function and tool-calling patterns",
        "Model Context Protocol concepts",
        "Agent-to-tool contracts",
        "Browser and computer-use testing concepts",
        "External API connectors",
        "Permission boundaries at the interface",
        "Auditing action-oriented agents",
        "Capstone — golden tasks, mocks, evaluators, safety suite",
        "Capstone — CI regression run and quality report",
        "Presenting agent quality to a release decision",
      ],
      highlight: true,
    },
  ],

  roadmapImage: {
    src: "/images/courses/agentic-ai-testing-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage Agentic AI Testing learning path taught at Archer Infotech Pune: agent architecture for testers covering the plan-act-observe loop, tools, state and memory; agent test strategy covering what to assert and what to evaluate, golden tasks and mock tools; tool-call testing covering wrong tool selection, invalid arguments, permissions, retries and idempotency; trajectory evaluation covering critical steps, loops, premature completion and error recovery; memory and multi-agent testing covering stale memory, cross-user leakage, handoffs and deadlocks; agent security covering indirect prompt injection, exfiltration, excessive agency and confirmation gates; metrics and offline evaluation covering task success, cost per task, baselines and release gates; and production quality engineering plus the capstone covering tracing, drift, review queues and a CI regression harness.",
    caption:
      "Two months, in this order — architecture and strategy before tool calls, and offline evaluation before production. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/agentic-ai-testing-syllabus-v1.pdf",
    title: "Agentic AI Testing & AI Quality Engineering Syllabus",
    slug: "agentic-ai-testing-syllabus",
    blurb:
      "The complete twelve-module syllabus as a PDF — agent architecture for testers, test strategy, tool-call testing, trajectory evaluation, memory and context, multi-agent systems, agent security and excessive agency, evaluation metrics, offline evaluation, production quality engineering, the Python test harness, and modern agent interfaces with the capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "Why agents need their own testing course",
        items: [
          "An LLM says things; an agent does things — a wrong tool call is a refund issued, a record deleted, an email sent.",
          "There is no single correct path, so success has to be judged on the trajectory as well as the end state.",
          "Memory makes failures irreproducible, and cross-user memory leakage is a release-stopping defect.",
          "Indirect prompt injection targets an agent that has permission to act on what it just read.",
        ],
      },
      {
        heading: "This course versus the Agentic AI developer course",
        items: [
          "Agentic AI (AI & GenAI category) teaches building agents — planning loops, tools, memory, orchestration.",
          "This course teaches validating them — tool calls, trajectories, safety, metrics and release gates.",
          "The skills overlap less than people expect: building rewards making it work, evaluating rewards finding where it does not.",
          "Learners take both, in either order, and the courses cross-link rather than repeat each other.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Customer Support Agent",
      description:
        "Test an agent that routes intents, retrieves knowledge, creates and updates tickets, escalates to a human and remembers the customer across sessions. Covers correct and incorrect tool selection, argument accuracy on ticket updates, escalation quality, memory correctness after a customer correction, and safe handling of customer data in memory.",
      technologies: [
        "Python",
        "pytest",
        "Tool mocks",
        "Trajectory evaluator",
        "Memory isolation tests",
      ],
    },
    {
      title: "Travel and Booking Agent",
      description:
        "The action-taking case, where mistakes cost money. Search tools, a multi-step plan, parameter correctness on dates and passenger counts, retry behaviour when availability calls fail, and confirmation gates before anything is booked. Includes deliberately failing tools, because how an agent behaves when a dependency breaks is the untested half of most systems.",
      technologies: [
        "Failure injection",
        "Idempotency tests",
        "Confirmation-gate tests",
        "Step budgets",
        "Cost per completed task",
      ],
    },
    {
      title: "Agent Quality Engineering Capstone",
      description:
        "The full deliverable: a golden task dataset, mocked tools, a trajectory evaluator, a task-success evaluator, a safety suite covering indirect injection and excessive agency, a CI regression run with thresholds that block a deploy, and a quality report a release manager can act on without reading the code.",
      technologies: [
        "Python harness",
        "pytest",
        "CI pipeline",
        "Baseline storage",
        "Safety regression suite",
        "Quality reporting",
      ],
    },
  ],

  trainersIntro:
    "Taught by engineers who have put agents into production and then had to prove they were safe to leave there. Your capstone harness is reviewed as code, as a test strategy, and as a document a release manager would have to trust.",

  careerOutcomes: {
    paragraphs: [
      "This is the thinnest-staffed skill in the category, and the reason is structural rather than temporary. Organisations deploying agents have a QA function that cannot evaluate them and an AI team optimising for capability rather than for failure. The person who sits between — who can say what the agent did, how often, at what cost, and what it must never be allowed to do — is doing a job neither existing team is set up for.",
      "Titles have not settled. Agentic AI Test Engineer, AI Quality Engineer, AI Evaluation Engineer and Senior AI QA Engineer describe overlapping work, and you should read responsibilities rather than headings. Where the work concentrates is clearer: product companies and GCC captives with agents in production, AI-first startups facing enterprise security reviews, and platform teams inside services firms building agent practices for clients.",
      "The honest constraint is the entry bar. This course assumes automation experience, working Python, and LLM evaluation fundamentals — realistically the LLM & RAG Testing course or equivalent work experience. It is the most advanced course in this category and it will not convert a fresher into an AI quality engineer. Placement support is included; placement is not guaranteed, and the institute-records rate is 90% across all tracks.",
    ],
    salaryBands: [
      {
        role: "SDET (3–6 yrs) — the base this builds on",
        band: "₹10–18 LPA",
        source: {
          label: "Glassdoor Pune SDET",
          url: "https://www.glassdoor.co.in/Salaries/pune-sdet-salary-SRCH_IL.0,4_IM1064_KO5,9.htm",
        },
      },
      {
        role: "Test Architect / Senior SDET (6+ yrs)",
        band: "₹18–28 LPA",
        source: {
          label: "AmbitionBox Pune Test Architect",
          url: "https://www.ambitionbox.com/profile/test-architect-salary",
        },
      },
      {
        role: "AI / GenAI engineering roles — Pune band for comparison",
        band: "₹8–22 LPA depending on experience",
        source: {
          label: "Archer Infotech placement-team data, last 12 months",
          url: "/placements",
        },
      },
    ],
    hiringCompanies: [
      "Product companies running agents in production",
      "GCC captives with in-house AI platform teams",
      "AI-first startups facing enterprise security review",
      "Services firms building agent practices for clients",
    ],
    rolesAfterCourse: [
      "Agentic AI Test Engineer",
      "AI Quality Engineer",
      "AI Evaluation Engineer",
      "Senior AI QA Engineer",
      "AI Test Lead or Quality Architect, with relevant experience",
    ],
  },

  modesAndDuration: {
    duration: "2 months — 8 weeks of taught content, plus the capstone harness build",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Evening batch — 19:00 to 21:30, three days a week",
        "Weekend batch — Saturday and Sunday, 09:30 to 13:30",
        "Lab access outside class hours for evaluation runs",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available — every learner on this track is working",
        "Capstone harness reviewed on your GitHub repository",
      ],
      tools: [
        "Zoom for live sessions",
        "Python 3 and pytest",
        "Model API access with tool calling — low-cost tiers are sufficient",
        "A tracing or observability tool for the production module",
        "GitHub for code review",
      ],
    },
    batchPolicy:
      "Maximum 12 per batch on this track, because the capstone review is individual and substantial. New batches roughly every 8 weeks. Entry is by prerequisite check — the LLM & RAG Testing course, or a short assessment if your experience is from work.",
  },

  fees: {
    note:
      "The most advanced course in this category, priced at the top of its band. Model API usage is not included; the course uses mocked tools for most exercises precisely so the bill stays small, which is also the correct engineering practice. Corporate batches for teams that have put an agent into production are quoted separately and are how most of this course is bought. EMI available.",
    range: "₹25,000 – ₹40,000 (typical band); model API usage not included, kept low by design",
    paymentOptions: [
      "One-time payment with early-bird discount",
      "EMI in 2 instalments",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is included at no separate charge. On this track the capstone does most of the persuading: a golden task dataset, a trajectory evaluator, a safety suite and a CI gate is not a portfolio piece most candidates can produce, and it moves an interview from theory to a walkthrough of your own work.",
      "We do not guarantee placement. The institute-records rate is 90% across all tracks, measured on learners who complete training and clear at least one mock-interview round. On this track the most common outcome is an internal move into an AI quality role, because the organisations that need this skill are usually the ones already employing the learner.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewritten around AI quality engineering, not general QA",
      "Week 7 — capstone harness reviewed as code, as a strategy and as a release document",
      "Week 8 — mock interview on trajectory and tool-call evaluation design",
      "Week 8 — mock interview on agent safety: indirect injection and excessive agency",
      "Post-course weeks 1–4 — introductions to partner companies running agents",
      "Post-course weeks 5–24 — continued placement-cell support",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini Pune",
      "LTIMindtree",
      "Cognizant",
      "Pune product companies running agents in production",
      "100+ partner companies across the hiring network",
    ],
  },

  comparison: {
    intro:
      "Factual rows. Worth using as a checklist against any agent-testing course, including this one.",
    rows: [
      {
        feature: "Trajectory evaluation",
        archer: "A full module plus a working evaluator — critical steps, loops, premature completion, recovery",
        typical: "End-state pass/fail only, which scores a lucky four-step path and an eleven-step one identically",
      },
      {
        feature: "Tool-call testing",
        archer: "Wrong tool, no-tool, invalid and plausible-but-wrong arguments, permissions, retries, idempotency",
        typical: "Checks that the expected tool was called",
      },
      {
        feature: "Memory",
        archer: "Stale, incorrect and conflicting memory, user correction, and cross-user leakage",
        typical: "Not covered — memory is treated as an implementation detail",
      },
      {
        feature: "Security",
        archer: "Indirect injection, exfiltration, excessive agency, confirmation gates, auditability",
        typical: "Direct prompt injection, demonstrated once",
      },
      {
        feature: "Framework dependence",
        archer: "Patterns first; agent frameworks and MCP shown as illustration",
        typical: "Tied to one orchestration framework, and dated within a year",
      },
      {
        feature: "Deliverable",
        archer: "A CI-gated harness with golden tasks, evaluators, safety suite and a quality report",
        typical: "Notebook exercises against a demo agent",
      },
      {
        feature: "Entry honesty",
        archer: "Prerequisite check before enrolment; states plainly this will not convert a fresher",
        typical: "Open to all, with the drop-out rate that implies",
      },
    ],
    closing:
      "The question worth asking: does the course test what the agent did, or only what it finally said? Everything that costs money sits in the first half.",
  },

  versusAlternative: {
    heading: "Agentic AI Testing or the Agentic AI developer course — which do you want?",
    paragraphs: [
      "They share a subject and almost nothing else. The Agentic AI course under AI & GenAI teaches you to build agents: planning loops, tool design, memory, orchestration, deployment. This course teaches you to validate them: whether the right tool was called with the right arguments, whether the path was defensible, whether memory leaked across users, and whether the agent can be talked into an action by a document it read.",
      "Take the developer course if you want to build the product. Take this one if you want to be the person who can say it is safe to ship — a role that is currently scarcer and, in organisations with agents in production, more urgently needed. Many people eventually do both, and the order does not much matter; each makes the other easier.",
      "The prerequisite question is separate and firmer. Whichever you choose, this testing course expects LLM evaluation fundamentals first, from our LLM & RAG Testing course or from equivalent work. Agent evaluation uses golden datasets, rubrics and validated judges throughout and adds trajectory analysis on top of them.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Entry is checked before enrolment rather than discovered in week three. You need automation and API testing experience, working Python and pytest, and LLM testing fundamentals — realistically our Generative AI, LLM & RAG Testing course, or equivalent experience from work, in which case a short assessment substitutes. This is the most advanced course in the Testing & QA category and the prerequisites are real ones, not recommendations. If your team already runs an agent, bring it: the course works far better against a system you own than against a teaching example, and corporate batches are built around exactly that.",
    ],
    suggestedSteps: [
      "Confirm you can write pytest fixtures and mock an external dependency",
      "Complete LLM & RAG Testing, or book an assessment if your experience is from work",
      "Write down every irreversible action your agent can take — that list is your safety suite",
      "Download the full syllabus above and check modules 3, 4 and 7 against your gaps",
      "Book a free counselling call, or ask about a corporate batch if your team ships agents",
    ],
  },

  faqs: [
    {
      question: "What is agentic AI testing?",
      answer:
        "It evaluates AI agents that use tools, hold memory and run multi-step workflows — checking tool selection and arguments, the trajectory the agent took, its recovery from errors, memory correctness and isolation, safety against prompt injection, and whether the task actually completed. It judges what the agent did, not only what it finally said.",
    },
    {
      question: "How is testing an agent different from testing an LLM?",
      answer:
        "An LLM produces text; an agent takes actions — calling tools, changing records, sending messages, spending money. A wrong sentence is a quality defect. A tool call with plausible but wrong arguments is a refund issued or a record deleted. Agents also have no single correct path, so the trajectory has to be evaluated alongside the outcome.",
    },
    {
      question: "What is trajectory evaluation?",
      answer:
        "Judging the path an agent took, not just its end state. It checks that critical steps happened, permits alternative valid paths, and detects missing or duplicate steps, repeated identical calls, loops, premature completion and wrong ordering. Error recovery counts positively — an agent that erred and corrected itself can be better than one that succeeded by luck.",
    },
    {
      question: "Do I need to complete the LLM & RAG Testing course first?",
      answer:
        "Realistically yes, or equivalent experience from work with a short assessment. Agent evaluation uses golden datasets, rubrics and validated judges throughout and adds trajectory and tool-call analysis on top. Learners who skip it spend the first fortnight here learning that material at a worse pace.",
    },
    {
      question: "What is the difference between this and the Agentic AI developer course?",
      answer:
        "The Agentic AI course under AI & GenAI teaches building agents — planning loops, tool design, memory, orchestration. This course teaches validating them — tool calls, trajectories, memory isolation, safety and release gates. Both are legitimate careers; the skills overlap less than people expect, and the two courses cross-link rather than repeat each other.",
    },
    {
      question: "What is excessive agency, and why does it matter?",
      answer:
        "An agent permitted to do more than its task requires — read access it never needs, a delete tool present for a read-only workflow, no confirmation before an irreversible action. It converts a reasoning mistake into a real-world consequence. Testing for it means checking tool allowlists, permission boundaries and confirmation gates, not just outputs.",
    },
    {
      question: "How long is the Agentic AI Testing course and what does it cost?",
      answer:
        "Two months — eight weeks plus the capstone harness, in evening or weekend batches, with batches capped at 12 because capstone review is individual. Fees sit in the ₹25,000 to ₹40,000 band with EMI available. Model API usage is not included and is kept small by using mocked tools. Call 9822052088 for batch dates.",
    },
    {
      question: "Which agent frameworks does the course teach?",
      answer:
        "None as a dependency. Agent tooling turns over faster than any other part of this stack, so patterns lead and named products — including Model Context Protocol — appear as illustration. You build a Python test harness with pytest and tool mocks that works against whatever framework your team chose.",
    },
    {
      question: "Can you test an agent without connecting it to real systems?",
      answer:
        "Yes, and you should. Most of the course uses mocked tools with deliberate failure injection — that is what makes runs repeatable, keeps API costs near zero, and avoids an agent test that books a real flight. Sandboxed real tools are covered for the cases that genuinely need them, with the risks stated.",
    },
    {
      question: "Is this course suitable for AI developers rather than testers?",
      answer:
        "Yes, and developers moving into evaluation are a growing part of these batches. You will already know the architecture and will find the evaluation discipline new — golden tasks, trajectory scoring, safety regression and release thresholds. The course assumes testing fundamentals, so expect the strategy and test-design modules to be the work.",
    },
    {
      question: "Is placement assistance included?",
      answer:
        "Yes, at no extra charge — resume rewriting around AI quality engineering, capstone review, two mock interviews covering evaluation design and agent safety, and introductions to partner companies running agents. Placement is not guaranteed; the institute-records rate is 90% across all tracks. On this track internal moves are as common as external ones.",
    },
    {
      question: "Where is the Agentic AI Testing course conducted in Pune?",
      answer:
        "At Archer Infotech in Kothrud, Pune, with evening and weekend classroom batches and live online batches for working professionals. Online learners get the same individual review of their capstone harness repository. Batch size is capped at 12 and entry is by prerequisite check.",
    },
  ],

  finalCta: {
    heading: "Your agent can take real actions. Someone has to be able to prove it is safe.",
    paragraph:
      "Download the full twelve-module syllabus, or book a prerequisite check if you are coming from work experience rather than from the LLM & RAG Testing course. Teams with agents already in production should ask about a corporate batch.",
  },
};
