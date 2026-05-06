import type { CourseRichContent } from "./types";

export const machineLearningTrainingInPune: CourseRichContent = {
  intro:
    "Machine Learning has matured from research speciality to production engineering discipline — Pune teams at Tiger Analytics, Fractal Analytics, Persistent Systems, BMC Software, Bajaj Finserv, BMW TechWorks India, and Mercedes-Benz R&D ship ML models into customer-facing systems daily. Archer Infotech's Machine Learning training in Pune teaches the discipline as it is actually practiced in 2026 — Python 3.13, scikit-learn 1.5+, XGBoost / LightGBM / CatBoost, PyTorch 2.4+ for deep learning, MLflow for experiment tracking, FastAPI + Docker for model serving, and a working understanding of LLM fine-tuning and RAG pipelines. The curriculum is engineering-first, not theorem-first. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Machine Learning in 2026",
    paragraphs: [
      "ML Engineer, Applied Scientist, and AI Engineer titles are among the highest-paid technical roles in Pune — Indeed Pune lists more than 600 active ML / AI Engineer openings as of May 2026, with Tiger Analytics, Fractal, ZS Associates, Persistent Systems, BMC Software, BMW TechWorks India, and Mercedes-Benz R&D India hiring continuously. Pune product engineering and BFSI sectors run production ML for fraud detection, credit scoring, recommendation, demand forecasting, and increasingly LLM-powered features. Compensation has separated from generic Data Scientist titles — Senior ML Engineers in Pune often earn 1.5–2× equivalent-experience Data Scientist offers because the role requires production engineering plus modelling.",
      "What changed in 2026: scikit-learn 1.5+ ships better defaults and stronger pipelines, PyTorch 2.4+ has eclipsed TensorFlow as the dominant deep-learning framework for new work, MLflow has become the default experiment-tracking layer in Indian analytics shops, and the inference stack has standardised around FastAPI + Docker + (optionally) NVIDIA Triton for GPU-served models. Most importantly, the ML Engineer role now expects working knowledge of LLM fine-tuning (LoRA / QLoRA / PEFT) and retrieval-augmented generation, not just classical supervised learning.",
      "What this means for hiring: Pune ML Engineer JDs in 2026 expect demonstrable model deployment (not just notebooks), MLOps fundamentals (MLflow, model registry, basic monitoring), one production-style end-to-end project, and either a fine-tuned LLM or a working RAG pipeline. Archer Infotech's curriculum is rebuilt around exactly these expectations — production-engineering depth plus modern modelling.",
    ],
    keyPoints: [
      "600+ active ML / AI Engineer roles on Indeed Pune as of May 2026",
      "PyTorch 2.4+ is the default — TensorFlow is legacy for new Pune work",
      "MLflow + FastAPI + Docker — the production inference stack",
      "LLM fine-tuning (LoRA / QLoRA) is now expected, not optional",
      "ML Engineer compensation runs 1.5–2× equivalent Data Scientist titles",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting ML Engineer, Applied Scientist, or AI Engineer roles",
      "Working data scientist or analyst wanting to graduate from notebooks to production ML",
      "Working backend / full-stack developer who wants to add ML to your skill stack",
      "Statistics or applied-math graduate looking to convert theory into deployable systems",
      "Domain expert (BFSI, pharma, retail, manufacturing) wanting algorithmic depth on top of business knowledge",
    ],
    notForYou: [
      "If you have no Python experience — take our Python or Data Science course first; this course assumes Python fluency from week 1",
      "If you expect a guaranteed ₹20L+ ML Engineer offer with no portfolio — Pune fresher ML Engineer entry sits at ₹6–₹10 lakh; the ₹20L+ roles need 3+ years and demonstrable production deployments",
      "If you cannot put in 10–12 hours per week of practice outside class — ML is the most portfolio-heavy of all our tracks",
      "If you want certificate-only learning with no projects — Pune ML hiring screens hard on actual deployed work",
      "If your goal is purely academic / research publications — pick a research programme; this course is engineering-focused",
      "If you have done a Master's in CS with a thesis in ML and 2+ years of production work — you'll be under-stretched; talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Python, NumPy & pandas Refresher for ML",
      weekRange: "Week 1",
      description:
        "A targeted refresher rather than an introduction — vectorised NumPy 2 operations, pandas 2 with Arrow backend (10–100× faster than legacy pandas on common joins and groupbys), idiomatic Python with type hints, and the discipline of writing reproducible Jupyter notebooks. We assume Python fluency on day 1; this week levels the floor on data-engineering vocabulary that the rest of the course depends on. By the end of week 1 every student has a clean development environment with uv / poetry, ruff, mypy, and Jupyter Lab.",
      topics: [
        "Python 3.13, virtual environments with uv / poetry",
        "NumPy 2 — vectorisation, broadcasting, performance",
        "pandas 2 with Arrow backend",
        "Idiomatic Python — type hints, dataclasses, ruff, mypy",
        "Reproducible Jupyter notebooks — papermill, nbconvert",
        "git + GitHub workflow for ML projects",
      ],
    },
    {
      title: "Mathematics for Machine Learning",
      weekRange: "Week 2",
      description:
        "The math that hiring panels actually test for and that you will use weekly — not full graduate-level proofs. Linear algebra (vectors, matrices, eigenvalues, SVD with intuition), calculus for ML (gradients, partial derivatives, the chain rule applied to backpropagation), probability and statistics (distributions, MLE, Bayesian basics), and information theory primitives (entropy, cross-entropy, KL divergence). Worked through Python rather than chalkboard — every concept illustrated by code that you run.",
      topics: [
        "Linear algebra — vectors, matrices, eigenvalues, SVD intuition",
        "Calculus for ML — gradients, partial derivatives, chain rule",
        "Probability — distributions, joint / conditional, Bayes",
        "Maximum likelihood estimation",
        "Information theory — entropy, cross-entropy, KL divergence",
        "Numerical stability and the log-sum-exp trick",
      ],
    },
    {
      title: "Supervised Learning — Regression & Classification",
      weekRange: "Weeks 3–4",
      description:
        "scikit-learn 1.5+ as a production library, not a tutorial toy. Linear and logistic regression with regularisation (L1, L2, ElasticNet), tree-based models (CART, Random Forest, gradient boosting). Boosting libraries — XGBoost, LightGBM, CatBoost — and the honest comparison of when each is best. Support Vector Machines, k-NN, naive Bayes for completeness. Throughout the module we drill the discipline that prevents the leak-and-overfit failure mode that ends most fresher ML interviews — proper cross-validation, leak-free pipelines via Pipeline + ColumnTransformer, target leakage detection, and cross-validation strategies for time-series, grouped, and stratified data.",
      topics: [
        "Linear / logistic regression with regularisation",
        "Decision trees, Random Forest",
        "Gradient boosting — XGBoost, LightGBM, CatBoost",
        "SVM, k-NN, naive Bayes",
        "scikit-learn Pipeline + ColumnTransformer",
        "Cross-validation strategies — stratified, time-series, group",
        "Hyperparameter tuning with Optuna",
        "Model evaluation — confusion matrix, ROC AUC, PR AUC, calibration",
        "Class imbalance — SMOTE, class weights, threshold tuning",
      ],
    },
    {
      title: "Unsupervised Learning & Feature Engineering",
      weekRange: "Week 5",
      description:
        "Clustering (k-means, hierarchical, DBSCAN, HDBSCAN), dimensionality reduction (PCA, t-SNE, UMAP), and density estimation. Then the higher-leverage skill — feature engineering — where most production-model performance gains come from. Numerical encoding choices, categorical encoding (one-hot, target, frequency, ordered target), date / time features, text features (TF-IDF, hashing trick), interaction features, and the Featuretools / tsfresh libraries for automated feature engineering on tabular and time-series data.",
      topics: [
        "Clustering — k-means, hierarchical, DBSCAN, HDBSCAN",
        "Dimensionality reduction — PCA, t-SNE, UMAP",
        "Numerical and categorical encoding strategies",
        "Date / time and text feature engineering",
        "Featuretools and tsfresh for automation",
        "Feature selection — RFE, mutual information, SHAP-based",
      ],
    },
    {
      title: "Deep Learning Foundations with PyTorch 2.4+",
      weekRange: "Weeks 6–7",
      description:
        "PyTorch 2.4+ as the dominant framework for new deep-learning work. Build neural networks from scratch (forward / backward pass, autograd, optimisers, schedulers), then move to convolutional networks for image classification (transfer learning with ResNet / EfficientNet / ViT), and recurrent / transformer architectures for sequence work. Cover regularisation (dropout, batch norm, layer norm, weight decay), training stability (gradient clipping, mixed-precision, learning-rate warmup), and the discipline of debugging a deep network when training stalls — which it will.",
      topics: [
        "PyTorch 2.4+ — tensors, autograd, training loop",
        "Optimisers (Adam, AdamW), learning-rate schedules",
        "Regularisation — dropout, BN/LN, weight decay",
        "CNNs — transfer learning with torchvision models",
        "Transformer architecture and attention",
        "Mixed-precision training (bf16, fp16)",
        "Debugging stalled training (the practical checklist)",
      ],
    },
    {
      title: "Modern NLP & Computer Vision with Hugging Face",
      weekRange: "Week 8",
      description:
        "Hugging Face Transformers as the default library for using pre-trained models. Fine-tune a BERT / RoBERTa model for classification, build sentence embeddings for semantic search, do named-entity recognition with token-classification heads, and on the vision side fine-tune a ViT or EfficientNet for image classification. Cover the Hugging Face training stack (Trainer, datasets, tokenizers, accelerate) and the inference stack (pipelines, optimum, ONNX export).",
      topics: [
        "Hugging Face transformers, datasets, tokenizers",
        "Fine-tuning BERT / RoBERTa for classification",
        "Sentence embeddings and semantic similarity",
        "Token classification (NER) and span prediction",
        "Vision transformers (ViT) and CNN fine-tuning",
        "Hugging Face Accelerate and ONNX export",
      ],
    },
    {
      title: "LLM Fine-Tuning & Retrieval-Augmented Generation",
      weekRange: "Week 9",
      description:
        "The 2026 differentiator on Pune ML Engineer resumes. Cover parameter-efficient fine-tuning (LoRA, QLoRA, PEFT) on open-source models (Llama 3.x, Mistral, Phi-3) running on a single consumer GPU or Colab Pro. Then RAG — chunking strategies, embedding models, vector databases (pgvector, Chroma, Weaviate), retrieval techniques (BM25 + dense hybrid, reranking with cross-encoders), and a small production-style RAG service. Includes evaluation — RAGAS, retrieval recall, end-to-end answer correctness — because LLM-augmented systems without evaluation are theatre, not engineering.",
      topics: [
        "Parameter-efficient fine-tuning — LoRA, QLoRA, PEFT",
        "Open-source LLMs — Llama 3.x, Mistral, Phi-3",
        "Embedding models — sentence-transformers, BAAI BGE",
        "Vector databases — pgvector, Chroma, Weaviate",
        "Hybrid retrieval — BM25 + dense + reranking",
        "RAGAS evaluation framework",
        "Production cost / latency considerations",
      ],
    },
    {
      title: "MLOps — Production ML Engineering",
      weekRange: "Week 10",
      description:
        "The week that separates ML Engineer titles from Data Scientist titles. MLflow for experiment tracking, model registry, and model versioning. FastAPI for inference endpoints (sync and async, with Pydantic v2 schema validation, JWT auth, structured logging). Docker for inference containers, GitHub Actions CI/CD pipelines, basic monitoring (Prometheus + Grafana), and an honest discussion of model drift, data drift, and the human cost of silent model failures in production.",
      topics: [
        "MLflow — tracking, registry, model versioning",
        "FastAPI inference endpoints with Pydantic v2",
        "Docker containers for inference",
        "GitHub Actions for ML pipelines",
        "Basic monitoring — latency, errors, drift",
        "Data versioning with DVC",
        "Feature stores overview (Feast, Tecton)",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 11–12 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune ML hiring panels — Tiger Analytics, Fractal, Persistent, BMC, BMW TechWorks, Mercedes-Benz R&D. Includes an algorithm round (questions on bias-variance, overfitting, regularisation, evaluation metrics — the 30-question core that every Pune panel asks), a coding round (NumPy / pandas / scikit-learn live coding), and a system-design round on serving a model at scale. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Code review with the lead trainer",
        "Algorithm mock round — bias-variance, regularisation, metrics",
        "Live coding mock round — NumPy / pandas / scikit-learn",
        "ML system-design mock round",
        "Resume + LinkedIn rewrite for ML Engineer / Applied Scientist roles",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "End-to-End ML System with MLflow + FastAPI Deployment",
      description:
        "Pick a real public dataset (financial fraud, credit risk, demand forecasting, customer churn). Build a leak-free scikit-learn Pipeline with proper cross-validation, tune hyperparameters with Optuna, track experiments in MLflow, serve the best model via a FastAPI inference endpoint with Pydantic schema validation and JWT auth, containerise with Docker, and deploy to AWS or Render with a GitHub Actions CI/CD pipeline. Outcome: a public GitHub repository with a clickable demo URL — exactly the artefact Pune ML hiring panels interview on.",
      technologies: [
        "Python 3.13",
        "pandas 2 + Arrow",
        "scikit-learn 1.5+",
        "XGBoost / LightGBM",
        "Optuna",
        "MLflow",
        "FastAPI + Pydantic v2",
        "Docker + GitHub Actions",
        "AWS or Render",
      ],
    },
    {
      title: "Computer Vision or NLP Deep-Learning Project",
      description:
        "Pick a real domain problem — defect detection on a manufacturing dataset, document classification on a public Indian-language corpus, medical image triage, or sentiment / intent classification on customer-support transcripts. Fine-tune an appropriate Hugging Face model (ViT, EfficientNet, RoBERTa, IndicBERT), evaluate properly (per-class metrics, calibration, confusion matrix), export to ONNX for inference, and deploy as a FastAPI endpoint. Outcome: a deployed deep-learning model with documented metrics — the differentiator on most Pune deep-learning JDs.",
      technologies: [
        "PyTorch 2.4+",
        "Hugging Face Transformers / Datasets",
        "torchvision or transformers depending on domain",
        "ONNX for inference export",
        "FastAPI + Docker",
        "Streamlit demo frontend",
      ],
    },
    {
      title: "RAG Service with Open-Source LLM Fine-Tuning",
      description:
        "Build a production-style retrieval-augmented generation service against a real domain corpus (legal documents, medical guidelines, internal product documentation, or Indian government regulations). Fine-tune a small open-source LLM (Llama 3.1 8B or Mistral 7B) with LoRA / QLoRA on Colab Pro for the domain register, hybrid retrieval over pgvector (BM25 + dense + reranker), RAGAS-based evaluation, and a FastAPI endpoint with structured logging. Outcome: a 2026-relevant LLM project that demos in 5 minutes and signals Applied AI Engineer level on the resume.",
      technologies: [
        "Llama 3.1 / Mistral / Phi-3",
        "PEFT — LoRA / QLoRA",
        "sentence-transformers + BAAI BGE",
        "pgvector + PostgreSQL",
        "Hybrid retrieval — BM25 + dense + reranker",
        "RAGAS evaluation",
        "FastAPI + Docker",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Data Science / ML / DevOps tracks) and Vinod Patil (Solutions Architect & AI Trainer, 12 years, AI/ML and AWS specialisation). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "ML Engineer, Applied Scientist, and AI Engineer are among the highest-paid technical roles in Pune in 2026 — Indeed Pune lists 600+ active openings, and compensation runs materially above equivalent-experience pure Data Scientist titles because the role bundles modelling depth with production engineering. The biggest Pune employers are Tiger Analytics, Fractal Analytics, ZS Associates, Persistent Systems, BMC Software, BMW TechWorks India, Mercedes-Benz R&D India, Bajaj Finserv, and the captive R&D arms of Cummins and John Deere ETC.",
      "What pulls an ML Engineer above the median band: a deployed end-to-end ML system on GitHub (not just a notebook), demonstrable MLflow + FastAPI + Docker production pattern, one deep-learning project with documented metrics, and one LLM fine-tune or RAG project. Our capstone projects are designed exactly around these signals.",
      "Senior ML Engineer and Applied Scientist bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox, 6figr, and direct alumni feedback.",
    ],
    salaryBands: [
      {
        role: "Machine Learning Engineer (Pune)",
        band: "₹10,32,710 per year average",
        source: {
          label: "Indeed Pune (Machine Learning Engineer)",
          url: "https://in.indeed.com/career/machine-learning-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior ML Engineer (Pune entry, <2 years)",
        band: "₹6,00,000 – ₹10,00,000 per year",
        source: {
          label: "AmbitionBox Pune ML Engineer",
          url: "https://www.ambitionbox.com/profile/machine-learning-engineer-salary-in-pune",
        },
      },
      {
        role: "Mid-level ML Engineer (Pune, 3–5 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune ML Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-machine-learning-engineer-salary-SRCH_IL.0,4_IM1072_KO5,30.htm",
        },
      },
      {
        role: "Senior ML Engineer / Applied Scientist (national, 5–8 years)",
        band: "₹24,00,000 – ₹42,00,000 per year",
        source: {
          label: "6figr India Senior ML Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-machine-learning-engineer--t",
        },
      },
      {
        role: "Lead / Principal ML Engineer (national, 8+ years)",
        band: "₹40,00,000 – ₹70,00,000 per year",
        source: {
          label: "Industry aggregation 2026 (Pune ±10%)",
          url: "https://www.payscale.com/research/IN/Job=Senior_Machine_Learning_Engineer/Salary",
        },
      },
    ],
    hiringCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "Persistent Systems",
      "BMC Software",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Bajaj Finserv",
      "Cummins India",
      "John Deere ETC",
      "MathCo",
      "Synechron",
      "TCS Research and Innovation",
      "Infosys Topaz",
      "Mastercard Pune Tech Hub",
    ],
    rolesAfterCourse: [
      "Machine Learning Engineer",
      "Applied Scientist",
      "AI Engineer",
      "Data Scientist (modelling-heavy)",
      "Computer Vision Engineer",
      "NLP Engineer",
      "MLOps Engineer",
      "Junior Research Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks, 4-month listing reflects the optional extended evening format) plus 2 weeks of capstone project work and interview preparation",
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
        "Same notebook reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "GitHub for code reviews",
        "Google Colab Pro / Kaggle GPU for compute-heavy modules",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's training runs and deployment artefacts personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. GPU compute (Colab Pro for the LLM fine-tuning week) is approximately ₹1,000 / month and is paid by the student directly — we use Free Tier and Kaggle GPU wherever possible.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full LLM fine-tuning module, GPU-assisted labs, and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real deployed ML systems with metrics, your GitHub has at least one production-style repository with MLflow tracking and a FastAPI endpoint, and you have completed at least three mock technical interviews against question banks from Pune ML hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for ML Engineer / Applied Scientist JDs",
      "Week 9 — GitHub portfolio cleanup, model deployment links, MLflow run badges",
      "Weeks 10–11 — algorithm drills (bias-variance, regularisation, metrics), live-coding mock rounds, ML system-design walkthroughs",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "Persistent Systems",
      "BMC Software",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Bajaj Finserv",
      "Cummins",
      "John Deere ETC",
      "TCS",
      "Infosys",
      "Cognizant",
      "Synechron",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Machine Learning training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Stack version covered",
        archer: "Python 3.13, scikit-learn 1.5+, PyTorch 2.4+, Hugging Face current",
        typical: "Often scikit-learn 0.24, TensorFlow 1.x or 2.x as the default",
      },
      {
        feature: "Production deployment in the curriculum",
        archer: "MLflow + FastAPI + Docker + GitHub Actions per project",
        typical: "Notebook-only — no deployment artefact",
      },
      {
        feature: "LLM fine-tuning coverage",
        archer: "LoRA / QLoRA / PEFT on Llama / Mistral, RAGAS evaluation",
        typical: "Not covered, or marketing-only mention",
      },
      {
        feature: "Compute model for deep-learning labs",
        archer: "Google Colab Pro / Kaggle GPU — production-realistic constraints",
        typical: "CPU-only or screen-share demo",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — deployed ML systems with clickable demo URLs",
        typical: "Notebook screenshots or unpublished local code",
      },
      {
        feature: "Interview prep specificity",
        archer: "Algorithm + live-coding + ML system-design rounds, separately",
        typical: "Generic 'mock interview' with no role-specific calibration",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student MLflow run pages and deployed inference endpoints before you pay.",
  },

  versusAlternative: {
    heading: "Machine Learning vs Data Science — Which Should You Pick in Pune?",
    paragraphs: [
      "Machine Learning vs Data Science is the second-most-asked question after 'AI vs ML'. The honest distinction: Data Science is the broader business-facing discipline (statistics + analytics + ML + dashboards + business communication); Machine Learning is the deeper engineering specialisation (algorithms, model tuning, deployment, MLOps, scalable inference). Pune Data Scientist roles spend more time in SQL and dashboards; Pune ML Engineer roles spend more time in Python, PyTorch, and production engineering.",
      "Compensation reality in Pune (May 2026): Data Scientist averages ₹10.82 lakh on Indeed; ML Engineer averages ₹10.32 lakh, but Senior ML Engineer pulls ahead — ₹14–22 lakh mid-level vs ₹15–26 lakh for Senior Data Scientist on Glassdoor — and Lead ML Engineer / Applied Scientist titles run noticeably higher (₹40–70 lakh national) because the role bundles modelling depth with production engineering. The market premium is for engineers who can both model AND deploy.",
      "Honest recommendation: pick Machine Learning if you have engineering / strong-quant background, can commit to 10–12 hours of practice per week, and want algorithmic plus production-engineering depth. Pick Data Science if you want the broader role with a wider entry door, more dashboard / SQL work, and stronger business-communication framing. Either way, our Data Science course graduates often take this Machine Learning course 6–12 months later as their depth specialisation.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Python fluency at the level of being able to write a 200-line script without lookup, basic SQL, and comfort with school-level math (means, medians, basic linear algebra). If you have done our Python or Data Science course (or equivalent), you are ready. We recommend taking the Data Science course first if you are coming from non-CS background — that course covers the Python and statistics foundation we assume on day one of this Machine Learning course.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 15% of ML enquirers because the foundation is not yet in place)",
      "Confirm enrolment and complete pre-course orientation (Python self-check, environment setup)",
      "Show up to day one with a laptop running 64-bit OS and a Google account (for Colab Pro / Kaggle GPU access in deep-learning weeks)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Machine Learning training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student GitHub repositories with deployed inference endpoints (not just notebooks), and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Machine Learning training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone and interview preparation. The original 4-month listing reflects an optional extended evening format. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of an ML Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹10.32 lakh per year for Machine Learning Engineer (May 2026). Junior ML Engineer Pune (entry, <2 years) earns ₹6–10 lakh per year per AmbitionBox. Mid-level (3–5 years) earns ₹14–22 lakh per Glassdoor. Senior ML Engineers / Applied Scientists earn ₹24–42 lakh nationally (Pune ±10%).",
    },
    {
      question: "Do I need a math or statistics degree?",
      answer:
        "No degree requirement, but we expect comfort with school-level math (means, medians, basic linear algebra). Week 2 covers the math you actually need for ML — linear algebra, calculus, probability — at a level that engineering, statistics, or applied-math graduates can absorb with practice. What matters more is consistent practice and portfolio quality.",
    },
    {
      question: "Do I need Python before joining the course?",
      answer:
        "Yes — Python fluency is required from week 1. If you have done our Python or Data Science course (or equivalent), you are ready. If you do not have Python yet, we recommend taking the Data Science course first; that course covers the Python and statistics foundation we assume here.",
    },
    {
      question: "Machine Learning or Data Science — which course should I pick?",
      answer:
        "Data Science is the broader discipline (statistics + analytics + ML + dashboards + business communication); Machine Learning is the deeper engineering specialisation (algorithms, deployment, MLOps, LLM fine-tuning). For a first job in Pune analytics, Data Science is usually the right starting point. Pick this Machine Learning course if you already have analytics or strong engineering background and want algorithmic depth plus production-engineering pattern.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) end-to-end ML system with MLflow tracking and FastAPI deployment, (2) computer vision or NLP deep-learning project with Hugging Face, (3) RAG service with open-source LLM fine-tuning (LoRA / QLoRA on Llama or Mistral). All three become public GitHub repositories with clickable demo URLs.",
    },
    {
      question: "Do you cover TensorFlow or PyTorch?",
      answer:
        "PyTorch 2.4+ as the primary framework — it has eclipsed TensorFlow as the dominant deep-learning framework for new Pune work. We cover TensorFlow at a 'reading legacy code' level so you can navigate a TF-2 codebase if your employer has one. New deep-learning work in 2026 is overwhelmingly PyTorch.",
    },
    {
      question: "Is LLM fine-tuning covered or extra?",
      answer:
        "Included in every batch. Week 9 is a full module on parameter-efficient fine-tuning (LoRA, QLoRA, PEFT) on open-source models (Llama 3.x, Mistral, Phi-3) plus retrieval-augmented generation with hybrid retrieval and RAGAS evaluation. Capstone Project #3 is a complete RAG service. This is what separates 2026 Pune ML hiring from 2022 hiring.",
    },
    {
      question: "Which companies in Pune hire ML Engineers?",
      answer:
        "Tiger Analytics, Fractal Analytics, ZS Associates, Persistent Systems, BMC Software, BMW TechWorks India, Mercedes-Benz R&D India, Bajaj Finserv, Cummins India, John Deere ETC, MathCo, Synechron, TCS Research and Innovation, Infosys Topaz, and Mastercard Pune Tech Hub are the main Pune ML / AI Engineer employers in 2026.",
    },
    {
      question: "Are weekend Machine Learning classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same projects. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What is the fee for the ML course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full LLM fine-tuning module, GPU-assisted labs, and extended interview prep; the lower end covers concession-eligible online or weekend formats. GPU compute (~₹1,000 / month for Colab Pro during the LLM week) is paid by the student directly.",
    },
    {
      question: "What about GPU access — do I need expensive hardware?",
      answer:
        "No — we use Google Colab Pro (~₹1,000 / month) and Kaggle's free GPU tier for compute-heavy modules. The LLM fine-tuning week works on a single T4 or A100 GPU which Colab Pro provides. Students do not need to own a GPU laptop; a 16GB-RAM laptop with a modern CPU is sufficient for the first 8 weeks.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for ML Engineer / Applied Scientist roles (algorithm + live-coding + ML system-design rounds), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads the Python, scikit-learn, deep-learning fundamentals, and MLOps weeks. Vinod Patil leads the math foundations, modern NLP, LLM fine-tuning, and capstone weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start Machine Learning training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol and Vinod are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student deployed ML systems, meet a current batch, and decide with full information.",
  },
};
