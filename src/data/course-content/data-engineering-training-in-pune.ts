import type { CourseRichContent } from "./types";

export const dataEngineeringTrainingInPune: CourseRichContent = {
  intro:
    "Data Engineering is the highest-paying entry-level data specialisation in Pune in 2026 — the engineers who build the pipelines, warehouses, and lakehouses that data scientists and analysts depend on. Pune teams at Tiger Analytics (significant data-engineering practice), Fractal Analytics, ZS Associates, MathCo, Persistent Data Engineering practice, BMW TechWorks autonomous-driving data pipelines, plus the captive analytics arms of Mercedes-Benz and John Deere ETC hire continuously. Archer Infotech's Data Engineering training in Pune teaches the discipline as it is actually practiced in 2026 — Apache Spark 3.5+ for distributed processing, Apache Kafka for streaming, Apache Airflow for orchestration, dbt for SQL-first transformations (the modern alternative to massive Spark jobs), Delta Lake / Apache Iceberg for lakehouse storage, plus the cloud data warehouses (BigQuery / Snowflake / Databricks Lakehouse). The course is the right depth specialisation for analytics-engineering careers. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Data Engineering in 2026",
    paragraphs: [
      "Data Engineer is the highest-paying entry-level data role in Pune — Indeed Pune lists 600+ active openings, with continuous hiring at Tiger Analytics (their data-engineering practice has grown substantially), Fractal, ZS, MathCo, Persistent Data Engineering, BMW TechWorks, Mercedes-Benz, John Deere ETC, plus most BFSI and product-engineering teams. Compensation runs noticeably above equivalent-experience Data Analyst and Software Engineer titles — junior Data Engineers in Pune start at ₹6–9 lakh (vs ₹3.5–6 for Data Analyst), and Senior Data Engineers earn ₹18–32 lakh.",
      "What changed in 2026: dbt (data build tool) has eclipsed massive Spark jobs for the SQL-transformation layer in Pune analytics shops — modern data engineering is increasingly 'SQL + dbt + cloud warehouse' rather than 'Spark cluster + Hadoop'. Apache Iceberg and Delta Lake have matured into the lakehouse table-format defaults, supporting ACID transactions on data-lake storage. Apache Spark 3.5+ remains the workhorse for heavy transformations. Apache Airflow 2.9+ is the orchestration default; Astronomer / Dagster are gaining ground for newer projects. Streaming has consolidated around Kafka + Flink for the high-throughput case and managed services (Kinesis, Pub/Sub) for everything else.",
      "What this means for hiring: 2026 Pune Data Engineer JDs expect Spark + Airflow + SQL fluency at depth, plus one cloud warehouse (BigQuery / Snowflake / Databricks), dbt for transformations, ideally Kafka for streaming. Senior roles add Iceberg / Delta lakehouse design, infrastructure-as-code, and data-quality tooling (Great Expectations, dbt tests). Archer Infotech's curriculum is rebuilt around exactly these expectations — modern stack, lakehouse-aware, dbt-first.",
    ],
    keyPoints: [
      "600+ active Data Engineer openings on Indeed Pune (May 2026) — highest-paid entry-level data role",
      "Pune Data Engineering scene — Tiger / Fractal / ZS / Persistent / BMW TechWorks",
      "Modern stack — Spark 3.5+, dbt, Airflow 2.9+, Iceberg / Delta lakehouse",
      "Cloud warehouses — BigQuery / Snowflake / Databricks",
      "Senior compensation runs above equivalent-experience analysts and developers",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working Data Analyst wanting to graduate to Data Engineer for the compensation premium",
      "Working backend / full-stack developer wanting to add data-engineering to your skill stack",
      "Working ETL Developer at a Pune services / BFSI shop wanting to migrate to modern data engineering (dbt / Airflow / cloud warehouse)",
      "Engineering / BCS / MCA student targeting senior-paying data-engineering roles in Pune",
      "Working Spark / Hadoop engineer wanting to update to the 2026 dbt + lakehouse stack",
    ],
    notForYou: [
      "If you have no Python experience — take our Python or Data Analytics course first",
      "If you have no SQL experience at the window-functions level — take our Data Analytics course first",
      "If you cannot put in 10–12 hours per week of practice outside class — data engineering is the most lab-heavy of our data tracks",
      "If you only want a certificate sticker with no portfolio — Pune Data Engineer hiring screens hard on real pipeline GitHub repos",
      "If your goal is data-science modelling specifically — pick our Machine Learning or Data Science course",
      "If you have 3+ years of production data-engineering experience with modern stack — talk to us about advanced lakehouse / streaming specialisations",
    ],
  },

  curriculum: [
    {
      title: "Foundations & Modern Data Engineering Landscape",
      weekRange: "Week 1",
      description:
        "What 'data engineering' actually is in 2026 — the journey from Hadoop / Spark monoliths to the 'modern data stack' (cloud warehouse + dbt + Airflow + ingestion tools like Fivetran / Airbyte). Cover the architectural patterns (Lambda vs Kappa, ETL vs ELT, lakehouse vs warehouse vs data mart), the major cloud-warehouse choices (BigQuery, Snowflake, Databricks Lakehouse, Redshift, Synapse), plus the toolchain — Python 3.13 with uv, dbt-core, Airflow, Postgres for local dev, plus Docker for the Spark / Kafka labs. By the end of week 1 every student has a working dev environment.",
      topics: [
        "Modern data stack landscape",
        "ETL vs ELT, lakehouse vs warehouse",
        "Lambda vs Kappa architectures",
        "Cloud warehouse choices",
        "Python 3.13 + uv setup",
        "dbt-core install",
        "Airflow local install",
        "Docker for Spark / Kafka labs",
      ],
    },
    {
      title: "SQL Mastery & Cloud Warehouse Patterns",
      weekRange: "Weeks 2–3",
      description:
        "SQL at production-data-engineering depth. Cover advanced window functions, CTEs (including recursive), MERGE / UPSERT patterns, slowly-changing dimensions (SCD Type 1 / 2 / 6), star vs snowflake schema, plus warehouse-specific patterns — BigQuery (partitioning, clustering, materialised views), Snowflake (zero-copy clones, time travel, micro-partitions), Databricks Lakehouse (Unity Catalog, Z-ordering). By the end of week 3 every student has built a complete dimensional model on a public dataset.",
      topics: [
        "Advanced window functions",
        "MERGE / UPSERT patterns",
        "Slowly-changing dimensions (SCD)",
        "Star vs snowflake schema",
        "BigQuery — partitioning, clustering, MV",
        "Snowflake — zero-copy clones, time travel",
        "Databricks Lakehouse — Unity Catalog, Z-ordering",
        "Dimensional modelling on public dataset",
      ],
    },
    {
      title: "dbt — SQL-First Transformations",
      weekRange: "Week 4",
      description:
        "dbt has become the standard transformation tool in Pune analytics shops. Cover dbt-core (the open-source library), models (staging / intermediate / mart layers), refs and sources, materialisations (table, view, incremental, snapshot), testing (generic + custom tests + dbt-utils), documentation generation, plus dbt Cloud overview for teams that use it. Build a complete dbt project against your warehouse from week 3 — staging → intermediate → mart layers — that produces a documented data product.",
      topics: [
        "dbt-core architecture",
        "Models — staging / intermediate / mart",
        "Refs and sources",
        "Materialisations — table / view / incremental / snapshot",
        "Tests — generic, custom, dbt-utils",
        "Documentation generation",
        "dbt Cloud overview",
      ],
    },
    {
      title: "Apache Spark 3.5+ for Distributed Processing",
      weekRange: "Weeks 5–6",
      description:
        "Spark for the cases dbt can't handle alone — heavy transformations on lake data, streaming, ML preprocessing. Cover the architecture (driver, executors, RDD vs DataFrame vs Dataset, Catalyst optimiser, Tungsten), DataFrame API in PySpark, Spark SQL, partitioning and shuffling (the topic where most production Spark performance problems live), broadcast joins, plus the Adaptive Query Execution improvements in Spark 3.5+. We finish with a complete Spark job processing 100M rows on Databricks Community Edition or local.",
      topics: [
        "Spark architecture — driver, executors, RDD / DataFrame",
        "Catalyst optimiser, Tungsten",
        "PySpark DataFrame API",
        "Spark SQL",
        "Partitioning and shuffle",
        "Broadcast joins",
        "Adaptive Query Execution",
        "Spark 3.5+ improvements",
      ],
    },
    {
      title: "Lakehouse — Delta Lake & Apache Iceberg",
      weekRange: "Week 7",
      description:
        "The 2026 storage default for analytics-data — open table formats that bring ACID transactions to data-lake storage. Cover Delta Lake (the Databricks-native format, also widely used elsewhere) — ACID transactions, schema enforcement, time travel, OPTIMIZE / VACUUM. Apache Iceberg (the vendor-neutral alternative gaining ground) — partitioning, schema evolution, hidden partitioning. Plus the bronze / silver / gold pattern that has become the de-facto medallion architecture for lakehouses.",
      topics: [
        "Delta Lake — ACID, schema enforcement, time travel",
        "OPTIMIZE / VACUUM / Z-ordering",
        "Apache Iceberg basics",
        "Iceberg vs Delta — when each fits",
        "Bronze / silver / gold medallion architecture",
      ],
    },
    {
      title: "Apache Airflow & Workflow Orchestration",
      weekRange: "Week 8",
      description:
        "Airflow 2.9+ at the level you actually use it. Cover DAG authoring (the Pythonic way — TaskFlow API and decorators), the major operators (PythonOperator, BashOperator, KubernetesPodOperator, plus the cloud-specific operators for BigQuery / Snowflake / Spark), scheduling and the discipline of idempotent tasks, XCom for inter-task data passing, sensors, plus the production patterns — Airflow on Astronomer / managed Cloud Composer, the alternatives (Dagster, Prefect) that newer Pune teams use.",
      topics: [
        "DAG authoring with TaskFlow API",
        "Operators — Python, Bash, KubernetesPod, cloud-specific",
        "Scheduling and idempotency",
        "XCom for inter-task data",
        "Sensors and waits",
        "Airflow on managed services",
        "Dagster / Prefect alternatives",
      ],
    },
    {
      title: "Streaming with Kafka & Flink",
      weekRange: "Week 9",
      description:
        "Streaming for the cases where batch isn't fast enough. Apache Kafka — topics, partitions, producers / consumers, Kafka Connect for source / sink integration, schema registry. Apache Flink for stream processing (the modern alternative to Spark Streaming for low-latency cases). Plus the managed alternatives — AWS Kinesis, GCP Pub/Sub, Azure Event Hubs — and when each fits.",
      topics: [
        "Kafka — topics, partitions, producers, consumers",
        "Kafka Connect",
        "Schema Registry",
        "Apache Flink basics",
        "Spark Streaming alternative",
        "Managed alternatives — Kinesis, Pub/Sub, Event Hubs",
      ],
    },
    {
      title: "Capstone Project & Interview Preparation",
      weekRange: "Weeks 10–11 + 1 week placement prep",
      description:
        "Two weeks of full-time capstone work plus structured interview preparation. Pick one of three capstone projects (see Capstone Projects). Mock interviews calibrated for Pune Data Engineer hiring panels — Tiger / Fractal / ZS / MathCo / Persistent Data Engineering. Includes a SQL + dbt mock round, a Spark performance-tuning round, and a system-design round on building a pipeline.",
      topics: [
        "Capstone implementation, deployment, README",
        "SQL + dbt mock round",
        "Spark performance-tuning round",
        "Pipeline system-design round",
        "Resume + LinkedIn rewrite for Data Engineer JDs",
        "GitHub portfolio polish",
        "HR mock interview and salary negotiation",
      ],
    },
  ],

  projects: [
    {
      title: "End-to-End Modern Data Stack Pipeline",
      description:
        "A complete modern-data-stack pipeline — ingest data from a public source (Indian government open data, Kaggle, or a CSV API) into your cloud warehouse via Airflow, transform with dbt (staging → intermediate → mart), test with dbt tests + Great Expectations, plus a small Streamlit or Looker Studio dashboard on top. Documented data lineage via dbt docs. Outcome: a public GitHub repository plus the deployed pipeline — exactly what Pune Data Engineer hiring panels interview on.",
      technologies: [
        "Airflow 2.9+ (Astronomer or self-hosted)",
        "dbt-core",
        "BigQuery / Snowflake / Databricks Community",
        "Great Expectations or dbt tests",
        "Streamlit or Looker Studio dashboard",
      ],
    },
    {
      title: "Spark + Lakehouse Heavy-Transformation Project",
      description:
        "A heavy-transformation project on the lakehouse — 100M+ row dataset processed with PySpark on Databricks Community Edition or local Spark, written to Delta Lake or Iceberg with proper partitioning, plus performance benchmarks (before / after AQE, partition tuning, broadcast joins). Demonstrates Spark performance-tuning depth — the artefact senior Pune Data Engineer panels test for.",
      technologies: [
        "Apache Spark 3.5+",
        "PySpark DataFrame API",
        "Delta Lake or Apache Iceberg",
        "Databricks Community Edition or local Spark",
        "Performance benchmarking",
      ],
    },
    {
      title: "Streaming Pipeline with Kafka + Flink",
      description:
        "A real-time streaming pipeline — Kafka as the message broker, simulated event source (transactions, IoT events, log events), Flink job for stream aggregation with windowing, plus a Postgres sink for analytics queries. Demonstrates streaming patterns Pune fintech / ad-tech / IoT teams test for.",
      technologies: [
        "Apache Kafka",
        "Apache Flink",
        "Schema Registry",
        "Postgres sink",
        "Docker Compose stack",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Data Engineering / Data Science / Data Analytics tracks at Archer Infotech). Amol writes Spark and dbt for a living and personally leads every session of every batch.",

  careerOutcomes: {
    paragraphs: [
      "Data Engineer is among the highest-paying technical roles in Pune in 2026 — Indeed Pune lists 600+ active openings, with senior compensation regularly exceeding equivalent-experience full-stack developer offers because the role bundles deep technical engineering with business-domain fluency. The biggest Pune employers are Tiger Analytics, Fractal Analytics, ZS Associates, MathCo, Persistent Data Engineering practice, BMW TechWorks autonomous-driving, plus the captive analytics arms of Mercedes-Benz and John Deere ETC. Compensation runs noticeably above equivalent-experience Data Analyst and general Software Engineer titles.",
      "What pulls a Data Engineer above the median band: a public GitHub repository with at least one end-to-end modern-data-stack pipeline (Airflow + dbt + cloud warehouse), demonstrable Spark performance-tuning experience, one lakehouse table-format project (Delta or Iceberg), and ideally one streaming project. Our capstone projects are designed exactly around these signals.",
      "Senior Data Engineer / Lead bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures.",
    ],
    salaryBands: [
      {
        role: "Data Engineer (Pune)",
        band: "₹9,80,000 per year average",
        source: {
          label: "Indeed Pune (Data Engineer)",
          url: "https://in.indeed.com/career/data-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Data Engineer (Pune entry, <2 years)",
        band: "₹6,00,000 – ₹9,00,000 per year",
        source: {
          label: "AmbitionBox Pune Data Engineer",
          url: "https://www.ambitionbox.com/profile/data-engineer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Data Engineer (Pune, 3–5 years)",
        band: "₹13,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune Data Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-data-engineer-salary-SRCH_IL.0,4_IM1072_KO5,18.htm",
        },
      },
      {
        role: "Senior Data Engineer (Pune, 5–8 years)",
        band: "₹18,00,000 – ₹32,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior Data Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-data-engineer-salary-SRCH_IL.0,4_IM1072_KO5,25.htm",
        },
      },
      {
        role: "Lead / Staff Data Engineer (national, 8+ years)",
        band: "₹28,00,000 – ₹50,00,000 per year",
        source: {
          label: "6figr India Lead Data Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-data-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems (Data Engineering)",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "John Deere ETC",
      "Cummins India",
      "Bajaj Finserv",
      "Mastercard Pune Tech Hub",
      "BMC Software",
      "Synechron",
      "TCS",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Data Engineer",
      "Analytics Engineer (dbt-focused)",
      "ETL / ELT Developer (modern stack)",
      "Pipeline Engineer",
      "Big Data Engineer (Spark)",
      "Streaming Engineer (Kafka / Flink)",
    ],
  },

  modesAndDuration: {
    duration:
      "11 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~3.5 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: ["Morning batch — 10:00 to 13:00", "Evening batch — 18:00 to 21:00"],
    },
    online: {
      timing: ["Same hours as classroom batches", "Recordings available for review"],
      tools: ["Zoom for live sessions", "BigQuery / Snowflake / Databricks Community sandbox", "GitHub for code reviews", "Slack / WhatsApp for async Q&A"],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~6 months instead of 3.5.",
    },
    batchPolicy: "Maximum 15 students per batch.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. Cloud warehouse usage (BigQuery / Snowflake free tier or trial credits) covers lab work for most students.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 9 of the course. By the time you finish the curriculum, your resume highlights real Airflow + dbt + Spark + lakehouse work, your GitHub has at least two production-style pipeline repositories, and you have completed at least three mock technical interviews against question banks from Pune Data Engineer hiring teams.",
      "We say placement support, not placement guarantee. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 9 — resume and LinkedIn rewrite for Data Engineer JDs",
      "Week 10 — GitHub portfolio cleanup, pipeline links, dbt docs",
      "Weeks 11–12 — SQL + dbt drills, Spark performance-tuning, pipeline system-design walkthroughs",
      "Week 12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support",
      "Free re-entry to future batch interview-prep sessions",
    ],
    partnerCompanies: [
      "Tiger Analytics",
      "Fractal Analytics",
      "ZS Associates",
      "MathCo",
      "Persistent Systems",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "John Deere ETC",
      "Bajaj Finserv",
      "Mastercard Pune Tech Hub",
      "TCS",
      "Cognizant",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Data Engineering training institutes on factual rows only.",
    rows: [
      { feature: "Trainer named with photo and LinkedIn", archer: "Yes — Amol Patil", typical: "No — generic branding" },
      { feature: "Stack version covered", archer: "Spark 3.5+, dbt-core, Airflow 2.9+, Iceberg / Delta", typical: "Hadoop + Spark 2 + Hive — pre-modern stack" },
      { feature: "dbt depth", archer: "Full week — staging / intermediate / mart, tests, docs, Cloud overview", typical: "Not covered or marketing mention" },
      { feature: "Lakehouse coverage", archer: "Delta Lake AND Iceberg hands-on, medallion architecture", typical: "Skipped or theory only" },
      { feature: "Cloud warehouse coverage", archer: "BigQuery + Snowflake + Databricks — three platforms", typical: "Hadoop / HDFS only" },
      { feature: "Streaming coverage", archer: "Kafka + Flink hands-on", typical: "Skipped" },
      { feature: "Public GitHub portfolio output", archer: "Yes — Airflow + dbt + Spark pipelines with deployment", typical: "Local code on hard drive" },
      { feature: "Salary data shown", archer: "Cited from Indeed Pune + AmbitionBox + Glassdoor + 6figr", typical: "Single number with no source" },
      { feature: "Course fee transparency", archer: "₹20,000 – ₹90,000 published range", typical: "Hidden behind enquiry form" },
      { feature: "Placement support", archer: "6 months, with free re-entry", typical: "1–3 months or vague" },
      { feature: "Batch size cap", archer: "15 students", typical: "25–40 students" },
    ],
    closing: "Compare with whoever you are considering. The right test is whether you can see actual student modern-data-stack pipelines before you pay.",
  },

  versusAlternative: {
    heading: "Data Engineering vs Data Analytics vs Data Science — Which Should You Pick in Pune?",
    paragraphs: [
      "Three roles in the same family with different sweet spots. Data Engineer builds the pipelines and warehouses (highest-paid entry-level data role, most-technical, deepest engineering). Data Scientist does the modelling and ML (mid-paid entry, broadest data role, business-communication-heavy). Data Analyst does descriptive analytics and reporting (lowest-paid entry, widest entry door, fastest time-to-first-job).",
      "Pune compensation reality (May 2026): Junior Data Engineer ₹6–9 lakh vs Junior Data Scientist ₹4.5–7.5 lakh vs Junior Data Analyst ₹3.5–6 lakh. Senior bands diverge similarly — Senior DE ₹18–32 lakh vs Senior DS ₹15–26 lakh vs Senior DA ₹10–15 lakh.",
      "Honest recommendation: pick Data Engineer if you have engineering background, like building systems, want the highest-paying entry-level data role. Pick Data Scientist if you have strong-quant background and want to do modelling. Pick Data Analyst if you have non-CS background and want the wider entry door. Many of our students take Data Analytics first (faster placement) and add Data Engineering 1–2 years later for the senior compensation jump.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Python fluency at the level of being able to write a 200-line script, SQL at the window-functions level (we level up in week 2 but expect basic JOIN / GROUP BY fluency on day 1), basic Linux, willingness to commit 10–12 hours per week of practice outside class. If you have done our Python or Data Analytics course, you are ready. Pure non-developers should do a foundation course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call",
      "Confirm enrolment and complete pre-course orientation (Python, Postgres, Docker install)",
      "Show up to day one with a laptop running 64-bit OS, 16GB+ RAM (recommended), and a credit card for cloud warehouse free trial",
    ],
  },

  faqs: [
    {
      question: "How long does Data Engineering training in Pune take at Archer Infotech?",
      answer:
        "Approximately 3.5 months — 11 weeks of structured curriculum plus 1 week of capstone and interview preparation. The original 4-month listing reflects the optional extended evening format. The weekend batch stretches over ~6 months at the same content depth.",
    },
    {
      question: "What is the salary of a Data Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹9.80 lakh per year for Data Engineer (May 2026). Junior Pune entry sits at ₹6–9 lakh. Mid-level (3–5 years) earns ₹13–22 lakh per Glassdoor. Senior (5–8 years) earns ₹18–32 lakh. Lead / Staff Data Engineers earn ₹28–50 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "Data Engineer or Data Analyst or Data Scientist — which?",
      answer:
        "Data Engineer for highest-paid entry, deepest engineering, building pipelines. Data Scientist for modelling work and broadest data role. Data Analyst for widest entry door from non-CS background.",
    },
    {
      question: "Do I need Python and SQL before joining?",
      answer:
        "Yes — Python fluency and basic SQL (JOIN / GROUP BY) are required from day 1. We level up SQL to advanced in week 2 but do not start from scratch. If you are new to either, take our Python or Data Analytics course first.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) end-to-end modern data stack pipeline (Airflow + dbt + warehouse), (2) Spark + lakehouse heavy-transformation, (3) streaming pipeline with Kafka + Flink. All become public GitHub repositories.",
    },
    {
      question: "Is dbt covered?",
      answer:
        "Yes — week 4 is dedicated to dbt-core (models, tests, docs, dbt Cloud overview). dbt has become the standard transformation tool in Pune analytics shops; we cover it deeply enough that you can interview for analytics-engineer roles.",
    },
    {
      question: "Are weekend Data Engineering classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~6 months instead of 3.5.",
    },
    {
      question: "What is the fee for the Data Engineering course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support, referrals via our alumni network at 12+ partner companies (extra emphasis on Pune analytics scene), resume / LinkedIn / GitHub rewrites, salary negotiation coaching.",
    },
    {
      question: "Is the named trainer actually teaching?",
      answer:
        "Amol Patil personally leads every session of every batch.",
    },
  ],

  finalCta: {
    heading: "Ready to start Data Engineering training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course fits your goal.",
  },
};
