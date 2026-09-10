import type { CourseRichContent } from "./types";

/**
 * Generative AI, LLM & RAG Testing — rich content overlay.
 *
 * The intellectual centre of this course, and the thing every section has
 * to keep returning to: the assertion no longer works. A tester's entire
 * training says compare actual to expected and fail on difference. An LLM
 * gives a different, equally correct answer every time you ask. Everything
 * here — quality dimensions, rubrics, golden datasets, judges, similarity
 * — exists because `assertEquals` has nothing to compare against.
 *
 * Vendor discipline: tools are named as examples and never as the syllabus.
 * The evaluation-framework landscape turns over faster than a course page
 * can be maintained, so concepts lead and products follow.
 */

export const llmRagTestingTrainingInPune: CourseRichContent = {
  intro:
    "This two-month course teaches testers to evaluate software that answers differently every time it is asked. You move from deterministic assertions to evaluation: quality dimensions for LLM responses, hallucination and grounding tests, golden datasets and rubrics, LLM-as-a-Judge, semantic similarity, full RAG evaluation covering retrieval and faithfulness, prompt-injection and PII-leakage safety suites, and latency, token and cost measurement — all automated in Python with pytest and run as release gates in CI.",

  whyLearn: {
    heading: "Why LLM and RAG Testing Is a Separate Discipline",
    paragraphs: [
      "Every testing skill you have assumes determinism. Given this input, expect that output; if they differ, fail. An LLM breaks the assumption at the root — ask the same question twice and you get two different sentences, both of which may be entirely correct. The reflex of writing an exact-match assertion produces a suite that fails constantly while telling you nothing, and this is the single most common way teams' first attempt at AI testing collapses.",
      "What replaces it is evaluation, and it is a genuine discipline with its own vocabulary: quality dimensions rather than pass and fail, rubrics rather than expected values, golden datasets rather than test cases, judges — human and model — rather than assertions, and statistical baselines rather than single runs. None of it is exotic; all of it has to be learned deliberately, because none of it is in a testing syllabus written before 2023.",
      "The commercial pressure is straightforward. Companies across Pune shipped AI features quickly and are now being asked how they know the features are correct, safe and not leaking data — often by a customer's security review rather than by their own QA team. Testers who can answer that are scarce, and the scarcity is why this specialisation pays above the general automation band. It is also why the course spends a full module on safety, which is the question that comes up first in those reviews.",
    ],
    keyPoints: [
      "Evaluation replaces assertion — taught as the central shift",
      "Golden datasets, rubrics and regression baselines you build yourself",
      "LLM-as-a-Judge, including where judges are biased and wrong",
      "Full RAG evaluation — retrieval, grounding, citations, tenant isolation",
      "Prompt injection, PII and secret leakage, safety regression",
      "Latency, tokens and cost as first-class test metrics",
      "Tool-neutral: DeepEval, RAGAS, Promptfoo and LangSmith as examples only",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "QA automation engineers and SDETs whose company has shipped an AI feature",
      "Senior manual testers with automation exposure moving into AI quality",
      "QA leads being asked to sign off releases containing LLM behaviour",
      "API testers — the mental model transfers better than UI automation does",
      "Developers and AI engineers who build these systems and need to evaluate them",
      "Anyone who has been asked \"how will you test the chatbot\" and had no method to offer",
    ],
    notForYou: [
      "Testers looking to use AI as a productivity tool for ordinary testing — that is the AI-Assisted Software Testing course, one month, no Python needed",
      "Anyone without testing fundamentals; this is an advanced course and assumes you already design tests well",
      "Learners with no Python at all — you need to write functions and run pytest before you start, and Selenium with Python covers that",
      "People wanting to build LLM applications rather than evaluate them; the Generative AI developer course under AI & GenAI is the right one",
    ],
  },

  curriculum: [
    {
      title: "AI Application Architecture for Testers",
      weekRange: "Week 1",
      description:
        "What you are actually testing, described at the level a tester needs to design tests against it. The prompt-to-model-to-response path, system prompts versus user prompts, tokens and context windows, temperature and sampling, structured output, and tool or function calling in outline.\n\nThe module closes on non-determinism and its consequence, which is the thesis of the course: exact expected-value assertions do not work here, and understanding why they fail is what makes everything in the following eleven modules make sense rather than feel arbitrary.",
      topics: [
        "Generative AI concepts for testers",
        "LLM application architecture end to end",
        "Prompt → model → response",
        "System prompts versus user prompts",
        "Tokens and context windows",
        "Temperature and sampling",
        "Structured output and schema-constrained generation",
        "Tool and function calling in outline",
        "Model APIs and what a test actually calls",
        "Non-determinism, and why assertEquals fails",
      ],
    },
    {
      title: "Quality Dimensions for LLM Responses",
      weekRange: "Week 1",
      description:
        "If you cannot assert equality, you have to say what \"good\" means — precisely enough that two people grading the same answer agree. This module builds that vocabulary: correctness, relevance, completeness, conciseness, coherence, consistency, instruction following, format compliance, tone, groundedness, faithfulness, safety and refusal correctness.\n\nEach is defined operationally, with the boundaries drawn where they blur — groundedness against faithfulness, correctness against relevance — because a rubric whose dimensions overlap produces scores nobody can act on.",
      topics: [
        "Correctness, relevance and completeness",
        "Conciseness and coherence",
        "Consistency across repeated runs",
        "Instruction following as a measurable property",
        "Format compliance and schema validity",
        "Tone and style adherence",
        "Groundedness versus faithfulness",
        "Safety and harm categories",
        "Refusal correctness — refusing the right things, not everything",
        "Writing a dimension definition two graders will agree on",
      ],
    },
    {
      title: "LLM Test Design",
      weekRange: "Week 2",
      description:
        "Test design for probabilistic systems. The input space is natural language, so the equivalent of boundary value analysis is prompt variation: paraphrases, typographical errors, ambiguity, conflicting instructions, missing context, and context long enough to push earlier instructions out of the window.\n\nMulti-turn conversations, persona and language variation, and adversarial cases follow. The output is a regression suite structured so it can be re-run against a new model or a changed prompt, which is the event this whole discipline exists to survive.",
      topics: [
        "Functional test scenarios for an AI feature",
        "Prompt variation as the boundary-analysis equivalent",
        "Paraphrasing and typographical robustness",
        "Ambiguous prompts and conflicting instructions",
        "Long context and missing context",
        "Multi-turn conversation tests",
        "Persona and language variation",
        "Edge cases and adversarial cases",
        "Structuring a regression suite for model and prompt changes",
      ],
    },
    {
      title: "Hallucination and Grounding Tests",
      weekRange: "Week 2",
      description:
        "The defect class that made AI testing a job. Hallucination defined precisely — unsupported claims, fabricated facts, fabricated citations — and distinguished from ordinary incorrectness, because the mitigations differ.\n\nYou test knowledge-boundary behaviour, which is where good systems separate from bad ones: a system that says it does not know when it does not know is often more valuable than one that is right more often and confident always. Source-grounded answers, citation validation and ground-truth comparison give you the mechanics for catching it.",
      topics: [
        "What hallucination is, and what it is not",
        "Unsupported claims and fabricated facts",
        "Fabricated citations and how to detect them",
        "Contradictory responses across runs",
        "Knowledge-boundary behaviour",
        "Testing for a correct \"I don't know\"",
        "Source-grounded answers",
        "Citation validation against the source",
        "Ground-truth comparison methods",
      ],
    },
    {
      title: "Evaluation Datasets",
      weekRange: "Week 3",
      description:
        "The golden dataset is the artefact this discipline runs on, and building a good one is most of the work. Reference answers, expected characteristics where a reference answer is impossible, rubrics, and the curation of edge cases that matter rather than edge cases that are easy to write.\n\nProduction-derived cases are treated as the highest-value source — real user prompts contain phrasings nobody on the team would invent — alongside the privacy handling that requires. Dataset versioning and regression baselines close the module, because an evaluation you cannot compare to last week's is not a regression test.",
      topics: [
        "Test datasets versus golden datasets",
        "Reference answers and expected characteristics",
        "Writing rubrics that grade consistently",
        "Production-derived test cases, and the privacy handling",
        "Synthetic test-case generation",
        "Curating edge cases that matter",
        "Dataset versioning",
        "Train, dev and test separation in outline",
        "Regression baselines and what they must record",
      ],
    },
    {
      title: "Evaluation Methods",
      weekRange: "Weeks 3–4",
      description:
        "The methods themselves, cheapest and most reliable first. Deterministic assertions still apply to more than testers expect — schema validity, required keywords, forbidden content, length and format constraints — and every check you can make deterministic is one you do not have to judge.\n\nThen semantic similarity and embedding comparison, human evaluation with rubrics, and LLM-as-a-Judge: pairwise, reference-based and reference-free. Judge bias gets its own treatment — position bias, verbosity bias, self-preference — because a judge you have not validated is an unvalidated test tool making release decisions.",
      topics: [
        "Deterministic assertions that still apply",
        "Regex, rule-based and constraint checks",
        "Schema validation of structured output",
        "Semantic similarity and embedding comparison",
        "Human evaluation and rubric scoring",
        "LLM-as-a-Judge: pairwise, reference-based, reference-free",
        "Judge bias — position, verbosity, self-preference",
        "Validating a judge against human grades",
        "Evaluation repeatability and run counts",
      ],
      highlight: true,
    },
    {
      title: "Python-Based AI Test Automation",
      weekRange: "Week 4",
      description:
        "Turning the methods into a suite that runs. Calling model APIs from tests, pytest structure for AI tests, parametrised prompt tests, and handling structured outputs.\n\nThe operational details that separate a demo from a working harness get proper time: retry policy for rate limits and transient failures, capturing model metadata so a result is reproducible, token and cost tracking, persisting results, and comparing against a stored baseline. CI execution is covered in concept here and built out in the capstone.",
      topics: [
        "Calling model APIs from tests",
        "pytest structure for evaluation suites",
        "Parametrised prompt tests",
        "Handling and validating structured outputs",
        "Retry policy for rate limits and transient errors",
        "Capturing model, version and parameters with every result",
        "Token and cost tracking per test",
        "Persisting results for comparison",
        "Baseline comparison and diff reporting",
        "Test reports a release manager can read",
      ],
    },
    {
      title: "RAG Fundamentals for Testers",
      weekRange: "Week 5",
      description:
        "Retrieval-Augmented Generation explained as a pipeline with failure points, which is the useful framing for a tester. Why RAG exists, then documents, chunking, embeddings, vector stores, similarity search, hybrid retrieval, reranking, context assembly, generation and citation.\n\nThe module ends by mapping every stage to how it fails — retrieved nothing, retrieved the wrong thing, retrieved the right thing and ignored it, retrieved a stale version, retrieved another tenant's document. That map is what the next module tests against.",
      topics: [
        "Why RAG exists and what it fixes",
        "Documents, chunking and chunk boundaries",
        "Embeddings and vector stores",
        "Similarity search and hybrid retrieval",
        "Reranking in concept",
        "Context assembly and the prompt that results",
        "Generation and citation",
        "RAG failure modes, stage by stage",
      ],
    },
    {
      title: "RAG Evaluation",
      weekRange: "Week 5",
      description:
        "Two systems, evaluated separately and together, because a RAG answer can be wrong for opposite reasons. Retrieval metrics — relevance, context precision, context recall, coverage — tell you whether the right material was found. Generation metrics — answer relevance, faithfulness, groundedness, correctness, citation correctness — tell you whether it was used.\n\nThe adversarial cases follow: the missing document, the contradictory document, the stale document, and access-control tests for whether one tenant's query can surface another tenant's data. That last one is the finding that stops releases.",
      topics: [
        "Retrieval relevance and context precision",
        "Context recall and coverage",
        "Answer relevance and correctness",
        "Faithfulness and groundedness of the answer",
        "Citation correctness against retrieved context",
        "Missing-document behaviour",
        "Contradictory-document behaviour",
        "Stale-document and freshness tests",
        "Access-control and tenant-isolation tests",
        "RAG regression across index rebuilds",
      ],
      highlight: true,
    },
    {
      title: "AI Safety and Security Testing",
      weekRange: "Week 6",
      description:
        "The module that answers the question a customer's security review asks first. Prompt injection — direct, and the harder indirect case where the payload arrives inside a retrieved document — jailbreak patterns, and unsafe output.\n\nThen the leakage categories: sensitive data, PII, secrets, and system-prompt disclosure. Policy adherence, role and permission boundaries and data isolation follow, with red-team thinking taught as a habit and safety regression suites as the deliverable, since a safety fix that is not regression-tested does not stay fixed.",
      topics: [
        "Direct prompt injection",
        "Indirect injection through retrieved content",
        "Jailbreak patterns and why they keep working",
        "Unsafe output categories",
        "Sensitive data and PII leakage",
        "Secret leakage",
        "System-prompt disclosure",
        "Policy adherence testing",
        "Role, permission and data-isolation boundaries",
        "Red-team thinking as a testing habit",
        "Building a safety regression suite",
      ],
    },
    {
      title: "Performance, Reliability and Cost",
      weekRange: "Week 6",
      description:
        "Non-functional testing for AI systems, where cost is a first-class metric in a way it never was for a web application. End-to-end latency, time to first token and total generation time; token usage and cost per request and per test.\n\nReliability covers rate limits, retries, timeouts, API errors, concurrent load, model availability and fallback behaviour — a fallback to a cheaper model that nobody tested is a silent quality regression. The module closes on the quality-versus-cost trade-off, which is the conversation these numbers are collected for.",
      topics: [
        "End-to-end latency and time to first token",
        "Total generation time under load",
        "Token usage measurement",
        "Cost per request and per test run",
        "Rate limits and retry behaviour",
        "Timeouts and API error handling",
        "Concurrent users and throughput",
        "Model availability and fallback testing",
        "Quality versus cost trade-offs",
      ],
    },
    {
      title: "Evaluation Frameworks and the Capstone",
      weekRange: "Weeks 7–8",
      description:
        "Concepts first, tools second, and deliberately so — the evaluation-framework landscape turns over faster than any curriculum, and a course built on one vendor's API ages badly. You write custom Python evaluators first, then look at DeepEval, RAGAS, Promptfoo and LangSmith as examples of the same patterns packaged differently.\n\nCI-based evaluation gates, model and prompt comparison reporting, and then the capstone: a working evaluation harness for an LLM feature and a RAG system, with golden datasets, safety tests, baselines and a report a release manager can act on.",
      topics: [
        "Writing custom Python evaluators",
        "DeepEval concepts",
        "RAGAS concepts",
        "Promptfoo concepts",
        "LangSmith evaluation concepts",
        "Open-source evaluation patterns",
        "CI-based evaluation gates and thresholds",
        "Model and prompt comparison reporting",
        "Capstone — golden dataset, evaluators, safety suite, baselines",
        "Presenting a quality report to a release decision",
      ],
      highlight: true,
    },
  ],

  roadmapImage: {
    src: "/images/courses/llm-rag-testing-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage LLM and RAG Testing learning path taught at Archer Infotech Pune: AI architecture for testers covering prompts, tokens, context and non-determinism; quality dimensions covering correctness, groundedness, faithfulness and refusal; LLM test design covering prompt variation, multi-turn and adversarial cases; hallucination and grounding covering fabricated facts and citation validation; evaluation datasets covering golden datasets, rubrics and baselines; evaluation methods covering deterministic checks, semantic similarity and LLM-as-a-Judge; Python automation covering pytest, retries, token cost and baseline comparison; and RAG evaluation, safety and the capstone covering retrieval metrics, prompt injection, PII leakage and CI evaluation gates.",
    caption:
      "Two months, in this order — architecture and vocabulary before methods, and methods before tools. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/llm-rag-testing-syllabus-v1.pdf",
    title: "Generative AI, LLM & RAG Testing Syllabus",
    slug: "llm-rag-testing-syllabus",
    blurb:
      "The complete twelve-module syllabus as a PDF — AI application architecture, quality dimensions, LLM test design, hallucination and grounding, golden datasets, evaluation methods including LLM-as-a-Judge, Python test automation, RAG fundamentals and evaluation, safety and prompt-injection testing, performance and cost, evaluation frameworks and the capstone. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "The shift this course teaches",
        items: [
          "Assertion becomes evaluation: no expected value exists, so you define quality dimensions and grade against them.",
          "Test cases become golden datasets, versioned and compared against a baseline rather than passed or failed once.",
          "Safety becomes functional testing — prompt injection, PII leakage and system-prompt disclosure are defects, not policy questions.",
          "Cost and latency become test metrics, because a fallback to a cheaper model is a silent quality change.",
        ],
      },
      {
        heading: "Roles this course prepares you for",
        items: [
          "GenAI Test Engineer and LLM QA Engineer.",
          "AI Evaluation Engineer — building the harness the release gate runs on.",
          "RAG Quality Engineer, in teams shipping document assistants and search.",
          "AI Test Lead, with the relevant experience behind it.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "LLM Chatbot Evaluation Suite",
      description:
        "Build a golden dataset for a conversational feature and an automated suite that grades relevance, correctness, instruction following, format compliance and safety. Includes a validated LLM judge — you check its grades against your own on a sample before you trust it with a release decision, which is the step most teams skip.",
      technologies: [
        "Python",
        "pytest",
        "Model APIs",
        "Rubrics and golden datasets",
        "LLM-as-a-Judge",
      ],
    },
    {
      title: "RAG Quality Evaluation",
      description:
        "Evaluate a retrieval-augmented system end to end: retrieval relevance and context precision, then answer faithfulness, groundedness and citation correctness. Adversarial cases included — the missing document, the contradictory document, the stale document, and a tenant-isolation test for whether one user's query can surface another's data.",
      technologies: [
        "Vector store",
        "Embeddings",
        "RAGAS-style metrics",
        "Python evaluators",
        "Access-control tests",
      ],
    },
    {
      title: "AI Regression Harness (Capstone)",
      description:
        "The deliverable that makes this employable: a harness comparing prompt v1 against v2, model A against model B, and RAG configuration A against B — tracking quality scores, latency, token consumption and every failed case, run in CI as a release gate with defined thresholds, and producing a report a release manager can act on without reading the code.",
      technologies: [
        "Python",
        "pytest",
        "CI pipeline",
        "Baseline storage",
        "Comparison reporting",
        "Quality thresholds",
      ],
    },
  ],

  trainersIntro:
    "Taught by engineers who have built evaluation harnesses for shipped AI features, including the ones where the judge disagreed with the humans and the humans were right. Your capstone harness is reviewed as code and as a test strategy.",

  careerOutcomes: {
    paragraphs: [
      "This is a scarce skill with real demand behind it. Pune companies shipped AI features at speed between 2024 and 2026, and are now facing the consequence: customers' security reviews, regulators and their own release processes all ask how the AI behaviour is verified, and most QA teams have no method to offer. A tester who can build a golden dataset, run an evaluation suite and produce a defensible quality report is answering a question the organisation currently cannot.",
      "The roles this leads to sit above the general automation band, because the supply is thin rather than because the work is harder than SDET work. GenAI Test Engineer, LLM QA Engineer, AI Evaluation Engineer and RAG Quality Engineer are all titles in current use, with the caveat that naming has not settled — the same job appears under four labels, and you should read the responsibilities rather than the title. Product companies and GCC captives hire for this well ahead of services firms.",
      "The honest constraint is that this is an advanced course and the market treats it that way. It rewards testers who already have automation and API experience; a fresher with no testing background will not convert this into a job, and we would rather say so at enrolment than at graduation. Placement support is included; we do not guarantee placement, and the institute-records rate is 90% across all tracks.",
    ],
    salaryBands: [
      {
        role: "QA Automation Engineer (1–3 yrs) — the base this builds on",
        band: "₹6–10 LPA",
        source: {
          label: "Indeed Pune QA Automation listings (last 12 mo)",
          url: "https://in.indeed.com/jobs?q=qa+automation&l=Pune",
        },
      },
      {
        role: "SDET (3–6 yrs)",
        band: "₹10–18 LPA",
        source: {
          label: "Glassdoor Pune SDET",
          url: "https://www.glassdoor.co.in/Salaries/pune-sdet-salary-SRCH_IL.0,4_IM1064_KO5,9.htm",
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
      "Pune product companies shipping AI features",
      "GCC captives with in-house AI platform teams",
      "AI-first startups needing evaluation before enterprise sales",
      "Services firms building AI practices for clients",
    ],
    rolesAfterCourse: [
      "GenAI Test Engineer",
      "LLM QA Engineer",
      "AI Evaluation Engineer",
      "RAG Quality Engineer",
      "AI Test Lead, with relevant experience",
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
        "Recordings available — most learners here are working",
        "Capstone harness reviewed on your GitHub repository",
      ],
      tools: [
        "Zoom for live sessions",
        "Python 3 and pytest",
        "Model API access — free and low-cost tiers are sufficient",
        "A vector store for the RAG modules",
        "GitHub for code review",
      ],
    },
    batchPolicy:
      "Maximum 15 per batch. New batches roughly every 6 weeks. Model API usage across the whole course costs a few hundred rupees at most on pay-as-you-go tiers; we show you how to keep it there.",
  },

  fees: {
    note:
      "Priced in the same band as the two-month automation tracks in this category. Model API usage is not included and is not significant — the course is deliberately built around small, cheap models for most exercises, with the larger ones reserved for the judge-validation work where they matter. Corporate batches for QA teams that have inherited an AI feature are quoted separately. EMI available.",
    range: "₹25,000 – ₹35,000 (typical band); model API usage not included, typically under ₹500",
    paymentOptions: [
      "One-time payment with early-bird discount",
      "EMI in 2 instalments",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support is included at no separate charge, and for this course the capstone harness does most of the work. It is an unusual artefact — very few candidates arrive with a working evaluation suite, a validated judge and a CI release gate — and it converts the interview from a discussion about whether you understand AI testing into a walkthrough of something you built.",
      "We do not guarantee placement. The institute-records rate is 90% across all tracks, measured on learners who complete training and clear at least one mock-interview round. For this track the realistic pattern is an internal move into an AI quality role at your current employer as often as an external one, because the teams that need this skill usually already employ you.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewritten around evaluation and AI quality work",
      "Week 7 — capstone harness reviewed as code and as a test strategy",
      "Week 8 — mock interview on evaluation design: rubrics, judges, baselines",
      "Week 8 — mock interview on AI safety, the question security reviews open with",
      "Post-course weeks 1–4 — introductions to partner companies hiring for AI quality",
      "Post-course weeks 5–24 — continued placement-cell support",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "Capgemini Pune",
      "LTIMindtree",
      "Cognizant",
      "Pune product companies shipping AI features",
      "100+ partner companies across the hiring network",
    ],
  },

  comparison: {
    intro:
      "Factual rows. Worth using as a checklist against any LLM testing course, including this one.",
    rows: [
      {
        feature: "Vendor dependence",
        archer: "Concepts first; DeepEval, RAGAS, Promptfoo and LangSmith shown as examples of shared patterns",
        typical: "Built around one framework's API, and dated within a year",
      },
      {
        feature: "LLM-as-a-Judge",
        archer: "Taught with its failure modes — position, verbosity and self-preference bias — and validated against human grades",
        typical: "Presented as the answer, unvalidated",
      },
      {
        feature: "RAG evaluation",
        archer: "Retrieval and generation evaluated separately, plus stale, contradictory and cross-tenant cases",
        typical: "One end-to-end accuracy number",
      },
      {
        feature: "Safety testing",
        archer: "A full module — direct and indirect injection, PII, secrets, system-prompt disclosure, regression suite",
        typical: "A slide on prompt injection",
      },
      {
        feature: "Cost and latency",
        archer: "First-class test metrics, including fallback-model testing",
        typical: "Not measured",
      },
      {
        feature: "Deliverable",
        archer: "A working CI evaluation harness with baselines and thresholds",
        typical: "Notebook exercises",
      },
      {
        feature: "Entry honesty",
        archer: "States that automation and Python experience are genuinely required",
        typical: "Open to anyone, which produces a high drop-out rate",
      },
    ],
    closing:
      "The question worth asking: does the course make you validate the judge? An unvalidated judge is an untested test tool making release decisions, and that is the failure mode this field keeps repeating.",
  },

  versusAlternative: {
    heading: "LLM & RAG Testing or Agentic AI Testing — which comes first?",
    paragraphs: [
      "This one, almost always. LLM and RAG testing is about evaluating what a model says; agentic testing is about evaluating what an agent does — the tools it calls, the path it takes, the state it changes. Everything in the agentic course assumes you can already define a quality dimension, build a golden dataset and validate a judge, because agent evaluation uses all three and adds trajectory and tool-call analysis on top.",
      "Take Agentic AI Testing first only if your product is already an agent and you have LLM evaluation experience from work rather than from a course. Otherwise the sequence is this course, then agentic. Learners who invert it spend the first fortnight of the agentic course learning what this one teaches, at a worse pace.",
      "A different question is whether you want the developer side instead. Our Generative AI and Agentic AI courses under AI & GenAI teach building these systems. This course teaches evaluating them. Both are legitimate careers and the skills overlap less than people expect — building rewards making it work, evaluating rewards finding where it does not.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "You need software-testing fundamentals, basic Python — writing functions, running pytest — and API-testing familiarity with REST, JSON and authentication. You do not need machine-learning knowledge, mathematics, or any experience building AI systems; the architecture module covers what a tester needs and stops there. A candidate with strong automation experience but no Python can enter after a short assessment, though we would usually suggest Selenium with Python first. If your team has already shipped an AI feature, bring a real example — the course works considerably better against your own system than against ours.",
    ],
    suggestedSteps: [
      "Confirm you can write a Python function and run a pytest file",
      "Call a model API once from a script, so the first week is not spent on setup",
      "Write down how your team currently verifies its AI feature — that gap is the course",
      "Download the full syllabus above and check module 6 and module 9 against what you need",
      "Book a free counselling call if you are unsure between this and AI-Assisted Testing",
    ],
  },

  faqs: [
    {
      question: "What is LLM testing?",
      answer:
        "LLM testing evaluates software whose behaviour depends on a language model. Because the same prompt can produce different valid answers, exact-match assertions do not work. Instead you define quality dimensions — correctness, relevance, groundedness, safety, format — build golden datasets with rubrics, and grade responses using deterministic checks, semantic similarity, human review and model judges.",
    },
    {
      question: "What is RAG testing?",
      answer:
        "RAG testing evaluates both halves of a retrieval-augmented system: whether retrieval found the right context, measured by relevance, context precision and recall; and whether the answer used it, measured by faithfulness, groundedness and citation correctness. It also covers missing, contradictory and stale documents, and tenant-isolation tests for cross-user data exposure.",
    },
    {
      question: "How is this different from the AI-Assisted Software Testing course?",
      answer:
        "AI-Assisted Testing uses AI as a helper to test ordinary software — one month, no Python required. This course tests software that is itself built on AI: hallucination, grounding, RAG quality, safety and model regression. Different jobs. If your product has a chatbot or document assistant, this is the course you need.",
    },
    {
      question: "Do I need Python for this course?",
      answer:
        "Yes — enough to write functions and run pytest. The automation, RAG evaluation and capstone modules are all Python. You do not need machine-learning knowledge or mathematics. If you have strong automation experience in another language, take a short assessment with us, or take Selenium with Python first.",
    },
    {
      question: "What is LLM-as-a-Judge, and can you trust it?",
      answer:
        "It uses one model to grade another's output against a rubric. It scales where human review cannot, and it has real biases — position bias, verbosity bias and self-preference. The course teaches validating a judge against human grades on a sample before trusting it. An unvalidated judge is an untested tool making release decisions.",
    },
    {
      question: "How do you test something that gives a different answer every time?",
      answer:
        "You stop asserting equality and start evaluating properties. Some checks stay deterministic — schema validity, required or forbidden content, format and length. The rest are graded on defined dimensions against a golden dataset, run multiple times, and compared to a stored baseline. Regression means the score moved, not that a string changed.",
    },
    {
      question: "How long is the LLM & RAG Testing course and what does it cost?",
      answer:
        "Two months — eight weeks of taught content plus the capstone harness, in evening or weekend batches. Fees sit in the ₹25,000 to ₹35,000 band with EMI available. Model API usage is not included and typically costs under ₹500 across the whole course. Call 9822052088 for current batch dates.",
    },
    {
      question: "Which evaluation frameworks does the course teach?",
      answer:
        "You write custom Python evaluators first, then study DeepEval, RAGAS, Promptfoo and LangSmith as examples of the same patterns packaged differently. That order is deliberate: this tooling turns over quickly, and a course built on one vendor's API stops being useful within a year. The concepts transfer; the APIs will change.",
    },
    {
      question: "Does the course cover AI safety and prompt injection?",
      answer:
        "Yes, as a full module — direct injection, indirect injection through retrieved documents, jailbreaks, unsafe output, PII and secret leakage, system-prompt disclosure, and role and data-isolation boundaries. You build a safety regression suite, because a safety fix that is not regression-tested does not stay fixed. This is the first question customers' security reviews ask.",
    },
    {
      question: "Should I take this before or after Agentic AI Testing?",
      answer:
        "Before, in almost every case. Agent evaluation assumes you can define a quality dimension, build a golden dataset and validate a judge, then adds trajectory and tool-call analysis. Learners who take the agentic course first spend its first fortnight learning what this course teaches, at a worse pace.",
    },
    {
      question: "Is this course for testers or for AI developers?",
      answer:
        "Both attend, and the mix is useful. Testers bring test design and adversarial instinct and need the AI architecture. Developers and AI engineers know the architecture and need evaluation discipline — golden datasets, rubrics, baselines and regression. The course assumes testing fundamentals, so developers should expect the test-design modules to be new.",
    },
    {
      question: "Where is the LLM & RAG Testing course conducted in Pune?",
      answer:
        "At Archer Infotech in Kothrud, Pune, with evening and weekend classroom batches and live online batches for working professionals. Online learners get the same code review on their capstone harness repository. Batch size is capped at 15, and new batches run roughly every six weeks.",
    },
  ],

  finalCta: {
    heading: "Your company shipped an AI feature. Somebody has to be able to sign it off.",
    paragraph:
      "Download the full twelve-module syllabus, or book a free counselling call to check whether you should start here or with AI-Assisted Testing. If your team has inherited an AI feature and needs this together, ask about a corporate batch.",
  },
};
