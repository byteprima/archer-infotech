import type { CourseRichContent } from "./types";

export const awsSolutionsArchitectTrainingInPune: CourseRichContent = {
  intro:
    "The AWS Solutions Architect Associate (SAA-C03) certification is the most widely-respected entry-level cloud architecture credential — Pune product engineering teams (Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks) routinely list it as a hard requirement for senior Cloud Engineer / Solutions Architect roles. Archer Infotech's AWS Solutions Architect training in Pune is the focused exam-mastery track — distinct from our broader AWS course — designed for candidates who already have working AWS experience and want concentrated certification preparation. The track covers the four SAA-C03 exam domains in depth (Design Resilient Architectures, Design High-Performing Architectures, Design Secure Applications, Design Cost-Optimised Architectures), with two full-length timed mock exams, scenario-based question drills, plus the architecture-pattern fluency Pune Solutions Architect interviews test for. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Get AWS Solutions Architect Associate Certified in 2026",
    paragraphs: [
      "The SAA-C03 certificate is the cleanest signal a Pune cloud-hiring panel reads — it tells them you understand AWS architecture broadly, can reason about resilience / performance / security / cost trade-offs, and have invested in your craft. Indeed Pune lists more than 800 active openings that explicitly list 'AWS Solutions Architect Associate' or 'SAA-C03' as required or preferred. The biggest employers asking for it are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks India, plus the IT services majors with cloud-architect practices (TCS, Infosys, Wipro, Cognizant, Capgemini).",
      "What changed in 2026: the SAA-C03 exam (current code, updated August 2022 with smaller refreshes since) emphasises real-world architecture scenarios over pure service knowledge — questions are mostly 'given this requirement, choose the right combination of services'. The 2024 minor refresh weighted serverless (Lambda + Step Functions + EventBridge), container (ECS Fargate + EKS), and observability (CloudWatch + X-Ray) questions more heavily. The exam remains 65 questions in 130 minutes, with a passing score around 720 / 1000. The voucher is USD ~150 (~₹13,000), exam delivered via Pearson VUE online or test centre.",
      "What this means for hiring: certified SAA-C03 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate of equivalent uncertified candidates on Pune Solutions Architect roles. Senior Solutions Architect roles in Pune typically expect SAA-C03 plus one specialty (Networking, Security, or Database) and at least one Professional-level credential within 2–3 years.",
    ],
    keyPoints: [
      "800+ active Pune openings list SAA-C03 as required or preferred (May 2026)",
      "Cleanest hiring signal Pune cloud panels read",
      "1.5–2× interview-conversion rate vs equivalent uncertified candidates",
      "65 questions, 130 minutes, ~720 / 1000 passing score",
      "Voucher: USD ~150 (~₹13,000), Pearson VUE online or centre",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working AWS engineer (6+ months hands-on) wanting concentrated SAA-C03 preparation",
      "Cloud Engineer / DevOps Engineer targeting Solutions Architect career progression",
      "Software developer at a Pune product / SaaS company that requires SAA-C03 for senior roles",
      "Working professional preparing for a Pune Solutions Architect interview where SAA-C03 is on the JD",
      "Career restarter targeting cloud architecture as a credentialed re-entry path",
    ],
    notForYou: [
      "If you have NO hands-on AWS experience — take our broader AWS course first; this is exam-prep, not introductory",
      "If you are looking for end-to-end engineering training across deployment / IaC / observability — take our broader 3-month AWS course",
      "If you want a 7-day cram course — passing SAA-C03 reliably needs 2.5 months of structured prep, not crash-course",
      "If you cannot put in 8–10 hours per week of practice exams + reading — exam mastery requires repeated exposure",
      "If you already hold SAA-C03 — talk to us about the Solutions Architect Professional or specialty tracks",
    ],
  },

  curriculum: [
    {
      title: "Exam Strategy, Account Setup & Foundations Review",
      weekRange: "Week 1",
      description:
        "How the SAA-C03 exam actually scores you (the four domains and their weightings), the question-writing patterns AWS uses (best vs least-bad answers, scenario keywords that signal which service is expected), test-day logistics. Then a foundations review — IAM principals / policies / roles, AWS Organizations + SCPs, Control Tower for multi-account, plus the shared responsibility model. By the end of week 1 every student has done their first 50-question diagnostic exam to establish baseline.",
      topics: [
        "SAA-C03 exam structure and domain weighting",
        "Question patterns — best, least-bad, scenario keywords",
        "Test-day logistics — Pearson VUE",
        "IAM principals, policies, roles in depth",
        "AWS Organizations and SCPs",
        "AWS Control Tower",
        "First diagnostic exam",
      ],
    },
    {
      title: "Core Services Refresher — EC2, S3, VPC, IAM",
      weekRange: "Week 1",
      description:
        "SAA-C03 is a design exam, not a services exam — but it assumes you already know what each service does, and a candidate who is still learning what an internet gateway is cannot evaluate an architecture that contains one. This week levels that floor in the console and the CLI rather than in slides.\n\nYou launch instances and understand the families and pricing models, work through S3 buckets, versioning and lifecycle, build a small VPC by hand, and set up IAM users, groups and roles. Anyone arriving from the AWS Cloud Computing course can treat this as revision; anyone arriving from a Cloud Practitioner background will need it.",
      topics: [
        "AWS global infrastructure — regions, AZs, edge locations",
        "EC2 instance families, sizing and purchase options",
        "AMIs, user data and instance metadata",
        "S3 buckets, versioning, lifecycle and storage classes",
        "VPC, subnets, route tables, internet and NAT gateways",
        "Security groups and network ACLs",
        "IAM users, groups, roles and policy structure",
        "The AWS CLI, profiles and credential precedence",
        "CloudFormation as the baseline IaC tool",
        "Reading the AWS documentation efficiently",
      ],
    },
    {
      title: "Multi-AZ, Multi-Region & Disaster Recovery Patterns",
      weekRange: "Week 2",
      description:
        "The resilience material the exam tests hardest, framed the way its questions are framed: given an RTO and an RPO, which architecture meets them at the lowest cost. That pairing is the key — almost every resilience question is really a cost question with a constraint attached.\n\nYou work through the four documented DR strategies — backup and restore, pilot light, warm standby, multi-site active-active — and their real recovery times and price. Then Multi-AZ against read replicas and why they solve different problems, Route 53 failover and health checks, cross-region replication, and the difference between a highly available architecture and a fault-tolerant one, which the exam distinguishes and most candidates do not.",
      topics: [
        "RTO and RPO as the deciding constraints",
        "Backup and restore, pilot light, warm standby, active-active",
        "Multi-AZ versus read replicas — different problems",
        "Auto Scaling groups, health checks and lifecycle hooks",
        "Elastic Load Balancing — ALB, NLB and GWLB selection",
        "Route 53 routing policies and failover",
        "Cross-region replication for S3 and RDS",
        "Aurora global database and failover behaviour",
        "High availability versus fault tolerance",
        "Choosing the cheapest architecture that meets the target",
      ],
    },
    {
      title: "Domain 1 — Design Resilient Architectures (~26%)",
      weekRange: "Weeks 2–3",
      description:
        "Resilience is the largest exam domain. Cover Multi-AZ vs Multi-Region patterns, Auto Scaling with target tracking and step scaling, Application Load Balancer + Network Load Balancer use cases, Route 53 routing policies (simple, weighted, latency, failover, geolocation, multi-value), RDS Multi-AZ vs read replicas vs Aurora Global, S3 replication (CRR, SRR, RTC), DynamoDB Global Tables, plus the disaster-recovery patterns (backup-restore, pilot light, warm standby, multi-site active-active). Domain-specific question drills throughout.",
      topics: [
        "Multi-AZ vs Multi-Region",
        "Auto Scaling — target tracking, step, scheduled",
        "ALB vs NLB vs Gateway Load Balancer",
        "Route 53 routing policies",
        "RDS Multi-AZ vs read replicas",
        "Aurora Global Database",
        "S3 replication — CRR, SRR, RTC",
        "DynamoDB Global Tables",
        "Disaster recovery patterns",
      ],
    },
    {
      title: "Decoupling — SQS, SNS, EventBridge & Step Functions",
      weekRange: "Week 3",
      description:
        "The pattern the exam rewards more than any other. A question that describes a tightly coupled system with a failing component almost always has a queue in the correct answer, and recognising that shape quickly is worth several marks.\n\nSQS standard against FIFO, visibility timeout, dead-letter queues and long polling; SNS fan-out and the SNS-to-SQS pattern; EventBridge for event-driven routing and scheduled rules; and Step Functions for orchestration where a state machine beats application code. Kinesis is covered for streaming, with the distinction from SQS made explicit, because the exam tests exactly that boundary.",
      topics: [
        "Recognising a coupling problem in a scenario",
        "SQS standard versus FIFO",
        "Visibility timeout, dead-letter queues and long polling",
        "SNS topics, subscriptions and fan-out",
        "The SNS-to-SQS fan-out pattern",
        "EventBridge rules, buses and scheduled events",
        "Step Functions for orchestration",
        "Kinesis Data Streams versus SQS",
        "Idempotency and duplicate delivery",
        "Asynchronous processing and buffering under load",
      ],
    },
    {
      title: "Domain 2 — Design High-Performing Architectures (~24%)",
      weekRange: "Weeks 3–4",
      description:
        "Performance domain. Cover compute selection (EC2 instance families and when each fits, Lambda performance tuning, ECS / EKS / Fargate trade-offs), storage selection (EBS volume types — gp3 / io2 / st1 / sc1, S3 storage classes and Intelligent-Tiering, EFS performance modes, FSx options), database performance (RDS instance scaling vs read replicas vs caching, DynamoDB capacity modes and DAX, ElastiCache Redis vs Memcached), plus content delivery and caching (CloudFront, Global Accelerator, ElastiCache). Domain-specific question drills throughout.",
      topics: [
        "EC2 instance families and selection",
        "Lambda performance tuning",
        "ECS / EKS / Fargate trade-offs",
        "EBS volume types",
        "S3 storage classes and Intelligent-Tiering",
        "RDS performance and read replicas",
        "DynamoDB capacity, DAX",
        "ElastiCache Redis vs Memcached",
        "CloudFront and Global Accelerator",
      ],
    },
    {
      title: "Storage Selection — S3 Classes, EBS, EFS & FSx",
      weekRange: "Week 4",
      description:
        "Storage questions are among the most reliably answerable on the exam, provided you know the selection criteria rather than the marketing. Block, file and object storage and which problems each is actually for; EBS volume types and the IOPS and throughput each delivers; EFS for shared POSIX access; and FSx for Windows and Lustre workloads.\n\nS3 storage classes get the most time, including the retrieval charges and minimum durations that make Glacier Deep Archive the wrong answer for anything accessed monthly. Lifecycle policies, Intelligent-Tiering, Transfer Acceleration and Storage Gateway close the module, along with the migration services the exam expects you to distinguish.",
      topics: [
        "Block, file and object storage — choosing correctly",
        "EBS volume types, IOPS and throughput",
        "EBS snapshots, encryption and multi-attach",
        "Instance store and its trade-offs",
        "EFS performance and throughput modes",
        "FSx for Windows and FSx for Lustre",
        "S3 storage classes, retrieval cost and minimum duration",
        "Lifecycle policies and Intelligent-Tiering",
        "S3 Transfer Acceleration and multipart upload",
        "Storage Gateway, DataSync and Snow family",
      ],
    },
    {
      title: "Database Selection — RDS, Aurora, DynamoDB & Caching",
      weekRange: "Week 4",
      description:
        "The other reliably answerable family, and the one where a wrong choice in a scenario costs the whole question. Relational against non-relational and the access patterns that decide it; RDS engines, Multi-AZ, read replicas and backup behaviour; Aurora's storage architecture and why its failover characteristics differ.\n\nDynamoDB gets proper treatment because the exam probes it: partition keys and hot partitions, on-demand against provisioned capacity, global and local secondary indexes, DynamoDB Streams and global tables. ElastiCache for Redis and Memcached covers caching strategies, and the module closes on the purpose-built services — Redshift, Neptune, DocumentDB, Timestream — at the level the exam actually tests, which is knowing which one a scenario is describing.",
      topics: [
        "Relational versus non-relational access patterns",
        "RDS engines, Multi-AZ and read replicas",
        "Automated backups, snapshots and point-in-time recovery",
        "Aurora architecture, replicas and failover",
        "DynamoDB partition keys and hot partitions",
        "On-demand versus provisioned capacity",
        "Global and local secondary indexes",
        "DynamoDB Streams and global tables",
        "ElastiCache Redis and Memcached, and caching strategies",
        "Redshift, Neptune, DocumentDB and Timestream — recognising the fit",
      ],
    },
    {
      title: "IAM in Depth — Policies, Roles, SCPs & Federation",
      weekRange: "Week 5",
      description:
        "The single largest scored domain rests on this, and it is where careless candidates lose marks they could have kept. Policy evaluation logic taught precisely — explicit deny beats everything, then organisation SCPs, then permission boundaries, then identity and resource policies — because the exam writes questions that turn on exactly this order.\n\nRoles and `sts:AssumeRole` for cross-account access; instance profiles so an application never holds a key; resource-based policies and where they differ from identity-based; Organizations, service control policies and permission boundaries; and identity federation with SAML, Cognito and IAM Identity Center. The rule enforced throughout is least privilege, which is also the exam's default correct answer.",
      topics: [
        "Policy evaluation logic and explicit deny",
        "Identity-based versus resource-based policies",
        "Roles, sts:AssumeRole and cross-account access",
        "Instance profiles and never embedding keys",
        "Organizations, OUs and service control policies",
        "Permission boundaries and their interaction",
        "IAM Identity Center and SAML federation",
        "Cognito user pools and identity pools",
        "Least privilege and policy conditions",
        "Reading a policy and predicting the outcome",
      ],
    },
    {
      title: "Domain 3 — Design Secure Applications (~30%)",
      weekRange: "Weeks 5–6",
      description:
        "The largest exam domain. IAM in depth — policy evaluation logic, permission boundaries, conditions, IAM Access Analyzer. Network security — Security Groups, NACLs, VPC endpoints (Gateway and Interface), PrivateLink, Direct Connect, VPN. Data security — KMS (CMKs, key rotation, envelope encryption), Secrets Manager vs Parameter Store, ACM, S3 encryption options, RDS encryption. Plus AWS WAF, Shield Standard / Advanced, GuardDuty, Macie, Inspector, Security Hub, plus the compliance baselines (PCI DSS, HIPAA, SOC 2). Domain-specific question drills throughout.",
      topics: [
        "IAM policy evaluation, permission boundaries, conditions",
        "Security Groups and NACLs in depth",
        "VPC endpoints — Gateway and Interface",
        "PrivateLink, Direct Connect, VPN",
        "KMS — CMKs, rotation, envelope encryption",
        "Secrets Manager vs Parameter Store",
        "ACM and TLS termination",
        "WAF, Shield Standard / Advanced",
        "GuardDuty, Macie, Inspector, Security Hub",
        "Compliance baselines",
      ],
    },
    {
      title: "Data Protection — KMS, Secrets, and Encryption in Transit",
      weekRange: "Week 6",
      description:
        "The rest of the security domain, and the part that appears in scenario questions about compliance. KMS keys — AWS-managed, customer-managed and customer-provided — key policies, envelope encryption, rotation and multi-region keys, plus CloudHSM and the narrow set of cases that genuinely require it.\n\nEncryption at rest across S3, EBS, RDS and DynamoDB; encryption in transit with ACM, TLS termination choices and where the exam expects it terminated. Secrets Manager against Parameter Store, including the rotation difference that is usually the deciding factor. The module closes on the detective controls — CloudTrail, Config, GuardDuty, Security Hub, Macie and WAF — at the level of knowing which one a scenario needs.",
      topics: [
        "KMS key types, key policies and grants",
        "Envelope encryption and data keys",
        "Key rotation and multi-region keys",
        "CloudHSM and when it is genuinely required",
        "Encryption at rest across S3, EBS, RDS and DynamoDB",
        "ACM, TLS termination and certificate management",
        "Secrets Manager versus Parameter Store",
        "CloudTrail, Config and AWS Organizations trails",
        "GuardDuty, Security Hub, Macie and Inspector",
        "WAF, Shield and protecting an edge",
      ],
    },
    {
      title: "Domain 4 — Design Cost-Optimised Architectures (~20%)",
      weekRange: "Week 7",
      description:
        "Cost optimisation. Compute pricing (on-demand, spot, savings plans, reserved instances), storage tiering (S3 Intelligent-Tiering, lifecycle rules, Glacier classes), data-transfer costs (the often-forgotten exam topic), plus cost-optimisation tooling (Cost Explorer, Trusted Advisor, AWS Budgets, Cost Anomaly Detection). Domain-specific question drills throughout. Plus the discipline of reading exam questions for cost-optimisation keywords ('most cost-effective', 'minimise cost').",
      topics: [
        "EC2 pricing — on-demand, spot, savings, reserved",
        "Spot strategies — Fleet, mixed instances",
        "S3 Intelligent-Tiering and lifecycle",
        "Glacier classes — Instant, Flexible, Deep Archive",
        "Data-transfer cost optimisation",
        "Cost Explorer and Cost Anomaly Detection",
        "AWS Budgets and Trusted Advisor",
      ],
    },
    {
      title: "Well-Architected Framework & Architecture Review",
      weekRange: "Week 7",
      description:
        "The framework the exam is written against, used as the review instrument it is meant to be. The six pillars — operational excellence, security, reliability, performance efficiency, cost optimisation and sustainability — and the design principles under each, which is where a surprising number of question stems come from directly.\n\nYou then run a review on your own architecture from earlier weeks: identify the risks, propose remediation, and state the trade-off each one costs. That exercise is the closest thing the course has to the actual job, and it is also the best preparation for the exam's recurring shape — several technically valid answers, one that best matches a stated priority.",
      topics: [
        "The six pillars and their design principles",
        "Trade-offs between pillars, stated explicitly",
        "Running a Well-Architected review",
        "Identifying and prioritising risks",
        "Cost optimisation as a design activity",
        "Right-sizing, Savings Plans and Reserved Instances",
        "Spot capacity and interruption-tolerant design",
        "Recognising the priority a question is testing",
        "Eliminating technically valid but wrong answers",
        "Documenting an architecture decision",
      ],
    },
    {
      title: "Mock Exam 1, Architecture Walkthroughs & Gap Closure",
      weekRange: "Week 8",
      description:
        "First full-length timed mock exam (65 questions, 130 minutes) under real exam conditions — including the Pearson VUE-style interface. Detailed answer review for every question, focusing on why the wrong options are wrong (the SAA-C03 grading model rewards understanding-of-trade-offs more than memorisation). Plus 5 architecture walkthroughs of common scenarios — three-tier web app, serverless event-driven app, BFSI compliance-aware setup, multi-region active-active, hybrid cloud — at whiteboard depth.",
      topics: [
        "Mock exam 1 — full 65 questions, 130 minutes timed",
        "Detailed answer review",
        "Architecture walkthroughs — 5 common scenarios",
        "Whiteboard scenario practice",
        "Gap-closure plan based on mock exam scores",
      ],
    },
    {
      title: "Mock Exam 2, Booking & Test-Day Prep",
      weekRange: "Week 9 + 1 week buffer",
      description:
        "Second full-length mock exam under real exam conditions — students who score 75–85% on this mock typically pass the real exam first attempt. Final gap-closure on weak domains, exam-booking guidance (Pearson VUE registration, ID requirements, online vs centre considerations), test-day mental-prep, plus a 30-minute strategy session on time management during the exam. Includes 'what to do if you don't pass on first attempt' coaching.",
      topics: [
        "Mock exam 2 — full 65 questions, 130 minutes timed",
        "Final gap-closure",
        "Pearson VUE booking — online vs test centre",
        "Test-day logistics and ID requirements",
        "Time-management strategy during the exam",
        "Retake strategy if first attempt fails",
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

  roadmapImage: {
    src: "/images/courses/aws-saa-path-v1.webp",
    width: 1400,
    height: 900,
    alt: "Eight-stage AWS Solutions Architect Associate learning path taught at Archer Infotech Pune: foundations covering account setup and an EC2, S3, VPC and IAM refresher; resilient architectures as domain one at about 26 percent covering high availability, disaster recovery and decoupling; high-performing architectures as domain two at about 24 percent covering compute, storage and database selection; secure applications as domain three at about 30 percent covering IAM, KMS and detective controls; cost-optimised architectures as domain four at about 20 percent covering right-sizing and purchase options; a Well-Architected review applying the six pillars to your own design; mock exams with timed papers, gap closure and question technique; and exam day covering booking, proctoring, pacing and result.",
    caption:
      "The SAA-C03 exam domains with their weightings, in the order this course teaches them. Each stage expands into the modules below.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/aws-solutions-architect-syllabus-v1.pdf",
    title: "AWS Solutions Architect (SAA-C03) Syllabus — Complete Module List",
    slug: "aws-solutions-architect-syllabus",
    blurb:
      "All sixteen modules as a 7-page PDF — the foundations refresher, every SAA-C03 exam domain with its weighting, the depth modules on resilience and disaster recovery, decoupling, storage and database selection, IAM and data protection, the Well-Architected review, and both mock-exam weeks. Generated from this page, so the two cannot disagree.",
    asideBlocks: [
      {
        heading: "What is inside the 7-page PDF",
        items: [
          "All sixteen modules in teaching order, each with its schedule, description and full topic list.",
          "The four SAA-C03 domains with their published weightings, so you can plan study time against what is actually scored.",
          "The depth modules that sit alongside the domains: disaster-recovery patterns by RTO and RPO, decoupling with SQS and EventBridge, storage and database selection criteria, IAM policy evaluation order, and KMS.",
          "The exam-technique material — Well-Architected review, timed mocks, gap closure, and how to eliminate technically valid but wrong answers.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "AWS Solutions Architect — the role the certification is written for.",
          "Cloud Engineer at Pune GCC captives and product companies.",
          "Cloud Consultant on AWS partner engagements, where certification is often contractual.",
          "DevOps or Platform Engineer adding a design credential.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "SAA-C03 Architecture Reference Repo",
      description:
        "A reference repository documenting 10 common SAA-C03 architecture patterns — three-tier web app, serverless event-driven, hybrid cloud (DX + VPN), BFSI compliance-aware (PCI DSS / RBI guidelines), multi-region active-active, multi-region active-passive, ML inference at scale, IoT data ingestion, real-time analytics, plus a static website with CDN. Each pattern includes an architecture diagram (drawn in draw.io / Excalidraw), a one-page description, and Terraform that stands it up where applicable. Demonstrates the architectural fluency that opens senior Pune Solutions Architect interviews.",
      technologies: [
        "Architecture diagrams via draw.io / Excalidraw",
        "Terraform reference modules",
        "AWS CLI scripts",
        "GitHub repository with README",
      ],
    },
    {
      title: "Cost-Optimisation Audit of a Sample Workload",
      description:
        "A written cost-optimisation audit of a hypothetical 50-server / 10TB-storage / 5-database workload. Students identify spot-instance opportunities, S3 storage-class transitions, RI / Savings Plans recommendations, data-transfer reductions, and the resulting saved cost (typically 30–50% of the original bill). Demonstrates the FinOps thinking that Pune Solutions Architect panels test for.",
      technologies: [
        "AWS Pricing Calculator",
        "Cost Explorer analysis",
        "Spot Fleet design",
        "Reserved Instance / Savings Plans modelling",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on AWS / Azure architect with multiple cloud certifications) and Vinod Patil (Solutions Architect & AI Trainer, 12 years). Both have personally cleared the SAA-C03 exam and lead every batch.",

  careerOutcomes: {
    paragraphs: [
      "Certified SAA-C03 candidates with hands-on portfolio see roughly 1.5–2× the interview-conversion rate vs equivalent uncertified candidates on Pune Solutions Architect roles. Indeed Pune lists 800+ active openings that list SAA-C03 as required or preferred, with continuous hiring at Persistent Systems, BMC Software, Bajaj Finserv, Synechron, Mastercard Pune Tech Hub, BMW TechWorks India, plus the IT services majors with cloud-architect practices.",
      "What pulls a certified Solutions Architect above the median band: the certificate alone gets you to interviews; the offer comes from depth on at least one architecture pattern (multi-region, serverless event-driven, or BFSI compliance), one IaC fluency (Terraform), and demonstrable hands-on AWS experience (the SAA-C03 + zero-portfolio combination is widely seen as a red flag in Pune product engineering hiring).",
      "Senior Solutions Architect bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "AWS Cloud Engineer with SAA-C03 (Pune)",
        band: "₹8,00,000 – ₹12,00,000 per year",
        source: {
          label: "Indeed Pune (AWS Solutions Architect)",
          url: "https://in.indeed.com/career/aws-solutions-architect/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Mid-level Solutions Architect (Pune, 3–6 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune AWS Solutions Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-aws-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,28.htm",
        },
      },
      {
        role: "Senior Solutions Architect (Pune, 6–9 years)",
        band: "₹20,00,000 – ₹35,00,000 per year",
        source: {
          label: "Glassdoor Pune Senior SA",
          url: "https://www.glassdoor.co.in/Salaries/pune-senior-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,31.htm",
        },
      },
      {
        role: "Principal / Lead Solutions Architect (national, 9+ years)",
        band: "₹35,00,000 – ₹65,00,000 per year",
        source: {
          label: "6figr India Lead SA (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-solutions-architect--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "AWS Solutions Architect — Associate",
      "Senior Cloud Engineer (cert-required)",
      "Cloud Solutions Engineer",
      "Pre-sales Solutions Architect (with sales aptitude)",
      "DevOps Architect (with K8s experience)",
    ],
  },

  modesAndDuration: {
    duration:
      "9 weeks of structured exam preparation plus 1 week buffer for booking and final review (~2.5 months total)",
    classroom: {
      location: "Archer Infotech, Kothrud, Pune",
      timing: [
        "Morning batch — 10:00 to 13:00",
        "Evening batch — 18:00 to 21:00",
      ],
    },
    online: {
      timing: [
        "Same hours as classroom batches",
        "Recordings available for review",
      ],
      tools: [
        "Zoom for live sessions",
        "Personal AWS sandbox per student",
        "Mock exam platform (provided)",
        "Slack / WhatsApp for async Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote: "Stretches over ~4 months instead of 2.5.",
    },
    batchPolicy:
      "Maximum 15 students per batch. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode and concession. The SAA-C03 exam voucher (USD ~150 / ~₹13,000) is paid directly to AWS / Pearson VUE by the student.",
    range: "₹20,000 – ₹90,000",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts after exam-pass (~week 10). Most candidates targeting this cert already have an AWS-track job or are mid-track at one; the cert is the unblock for senior roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of post-cert interviews does not land.",
    ],
    process: [
      "After exam-pass — resume + LinkedIn rewrite emphasising the new credential",
      "GitHub portfolio cleanup",
      "Two rounds of mock Solutions Architect interviews",
      "HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune SAA-C03 prep institutes on factual rows only — no logos, no opinions.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Exam version targeted",
        archer: "SAA-C03 (current as of 2026)",
        typical: "Often outdated (SAA-C02) materials",
      },
      {
        feature: "Full-length timed mock exams",
        archer: "Two — under real Pearson-VUE-style conditions",
        typical: "Question banks but no full-length timed practice",
      },
      {
        feature: "Domain-by-domain coverage",
        archer: "Aligned to the four official domains with weightings",
        typical: "Topic-by-topic, no exam-domain mapping",
      },
      {
        feature: "Hands-on labs alongside exam prep",
        archer: "Yes — personal AWS sandbox, Terraform reference repos",
        typical: "Slides only",
      },
      {
        feature: "Architecture walkthroughs",
        archer: "5 common scenarios at whiteboard depth",
        typical: "Not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — architecture-pattern reference repo + cost-audit document",
        typical: "Rare",
      },
      {
        feature: "Test-day prep coaching",
        archer: "Pearson VUE walkthrough + time-management strategy",
        typical: "Not covered",
      },
      {
        feature: "Pass-rate transparency",
        archer: "Most students who score 75–85% on mock 2 pass first attempt",
        typical: "No data shared",
      },
      {
        feature: "Placement support duration after course",
        archer: "6 months, with free re-entry to interview prep",
        typical: "1–3 months or vaguely 'until placed'",
      },
    ],
    closing:
      "Compare with whoever you are considering. The right test is whether the institute will run a real timed mock for you before you pay.",
  },

  versusAlternative: {
    heading: "SAA-C03 Standalone or Bundled With Our Broader AWS Course?",
    paragraphs: [
      "If you have NO hands-on AWS experience, take our broader AWS course (3 months) first — it includes SAA-C03 prep concentrated in the last 2 weeks and is the right path for cloud-engineering breadth. If you have 6+ months of working AWS experience and need concentrated certification preparation, this focused 2.5-month track is right — it skips the broad engineering teaching and concentrates on exam mastery + architecture patterns.",
      "Honest recommendation: take our broader AWS course first if you are new to cloud. Take this exam-focused track if you already have AWS hands-on experience and want the SAA-C03 unblock. Combined enrolment (broader AWS + SAA-C03 prep) is available with bundled discount — talk to us if you want both.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: at least 6 months of hands-on AWS experience (created VPCs, deployed EC2 / Lambda / ECS, configured IAM, used the AWS Console / CLI), basic Linux, basic Python or Bash. We do NOT teach AWS from scratch in this course — that is our broader 3-month AWS course. If you have no AWS experience, take that course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom, online live, or weekend",
      "Check the upcoming batch dates",
      "Book a free 30-minute counselling call — we will honestly tell you whether you are exam-ready or whether you should take the broader AWS course first",
      "Confirm enrolment and complete pre-course orientation (sandbox setup, mock exam platform access)",
      "Show up to day one ready to take a 50-question diagnostic",
    ],
  },

  faqs: [
    {
      question: "How long does SAA-C03 preparation take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 9 weeks of structured exam preparation plus 1 week buffer for booking and final review. The weekend batch stretches over ~4 months at the same content depth.",
    },
    {
      question: "What is the SAA-C03 exam fee?",
      answer:
        "The SAA-C03 exam voucher is USD ~150 (~₹13,000), paid directly to AWS via Pearson VUE. Our course fee is separate and ranges ₹20,000 – ₹90,000.",
    },
    {
      question: "Do I need to take your broader AWS course first?",
      answer:
        "Yes if you have no hands-on AWS experience. If you have 6+ months of working AWS, this focused track is right. We honestly assess your level in the counselling call.",
    },
    {
      question: "What is the pass rate?",
      answer:
        "Most students who score 75–85% on the second mock exam pass the real SAA-C03 first attempt. Mock-exam scores are the best leading indicator; we will tell you honestly when you are exam-ready.",
    },
    {
      question: "What if I fail the first attempt?",
      answer:
        "Free re-entry to our interview-prep sessions for 6 months. We help you analyse the score report, identify weak domains, and plan a focused 4-week prep before retaking. AWS allows retakes after 14 days.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — two capstone artefacts: (1) architecture-pattern reference repository covering 10 common SAA-C03 scenarios, (2) cost-optimisation audit of a sample workload. Both become public GitHub repositories.",
    },
    {
      question: "Are weekend SAA-C03 classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5.",
    },
    {
      question: "What support do I get after the exam?",
      answer:
        "Six months of active placement support after course completion — mock Solutions Architect interviews, referrals via our alumni network, resume / LinkedIn / GitHub rewrites highlighting the new credential, and salary negotiation coaching.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil and Vinod Patil personally lead every session of every batch, both have cleared SAA-C03.",
    },
    {
      question: "Is the certification exam fee included in the course fee?",
      answer:
        "No, and no honest institute includes it. The exam is booked and paid directly with AWS through their own portal, at their published price, and the voucher is issued in your name. Our fee covers the training, labs, mock exams and the guidance to book — separating the two is the only arrangement that lets you sit the exam whenever you are ready rather than whenever a batch ends.",
    },
    {
      question: "What happens if I fail the exam?",
      answer:
        "AWS sets the retake policy — there is a waiting period before a resit and the full fee applies again, so it is worth sitting only when your mock scores are consistently clear of the pass mark. From our side, you keep access to the mock papers and can rejoin a later batch's revision sessions at no cost. We would rather you delay a booking by three weeks than pay twice.",
    },
    {
      question: "How long does the certification stay valid?",
      answer:
        "AWS certifications are valid for three years, after which you recertify by passing the current version of the exam or a higher-level one. Plan for that from the start: the recertification is considerably easier than the first attempt if you have been using the platform, and considerably harder if the certificate has been sitting on a CV while you worked on something else.",
    },
    {
      question: "Will I get hands-on practice, or only theory and practice questions?",
      answer:
        "Hands-on throughout, in your own AWS account, inside the free tier wherever possible. Every module has lab work, and the course builds a reference architecture you deploy yourself rather than watch. That matters beyond the exam: a certification with no deployed work behind it does not survive the first practical interview question, and Pune hiring panels ask them.",
    },
    {
      question: "Do I need experience before taking this course?",
      answer:
        "Not formally — AWS states no prerequisite for the Associate level. Realistically, this course assumes you already know what EC2, S3, VPC and IAM are; week one is a refresher, not an introduction. If you are entirely new to cloud, the Cloud & DevOps category covers the ground concepts first — a certification syllabus tests breadth across a platform rather than teaching what a virtual network or an identity policy is, and starting here without that background turns the course into memorisation.",
    },
    {
      question: "Is a certification enough to get hired in Pune?",
      answer:
        "It gets your CV read, which is a real and narrow benefit. Many Pune employers and staffing partners filter on it, and consulting partners often need certified staff contractually. What converts it into an offer is being able to answer the follow-up about something you actually built — so treat the certificate and the deployed project as one deliverable, not two.",
    },
  ],

  finalCta: {
    heading: "Ready to start AWS Solutions Architect (SAA-C03) preparation in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to assess your readiness and tell you whether to start with the broader AWS course or jump into this exam-focused track.",
  },
};
