import type { CourseRichContent } from "./types";

export const awsTrainingInPune: CourseRichContent = {
  intro:
    "AWS is the dominant cloud platform in Pune's product engineering and BFSI sectors — Synaptic, Persistent Systems, Bajaj Finserv, BMC Software, and Mastercard's Pune Tech Hub all run their primary workloads on it. Archer Infotech's AWS training in Pune teaches the platform as it is actually used in 2026 — VPC design with private subnets, EKS for containerised workloads, Lambda + API Gateway for serverless, Aurora and DynamoDB for data, IaC via Terraform and AWS CDK, and the Well-Architected Framework as the lens behind every design decision. The course doubles as preparation for the AWS Solutions Architect Associate (SAA-C03) certification. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn AWS in 2026",
    paragraphs: [
      "AWS holds roughly 31% of the global cloud infrastructure market (Synergy Research, Q1 2026), more than Azure (25%) and Google Cloud (11%) combined. In India the share is even higher in startups and product companies. Indeed Pune lists more than 1,500 active AWS-related roles as of May 2026, spanning Cloud Engineer, DevOps Engineer, Solutions Architect, SRE, and Cloud Developer titles. Pune is one of the three major AWS hiring cities in India alongside Bengaluru and Hyderabad, with strong demand from Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, and the Mastercard Pune Tech Hub.",
      "What changed in 2026: organisations are no longer 'lifting and shifting' to EC2 and calling it cloud — they are building cloud-native, with EKS, Lambda, Step Functions, EventBridge, and managed databases (Aurora, DynamoDB, OpenSearch). Generative AI on Bedrock has become a standard part of new AWS architectures. FinOps — controlling cloud spend — is now an expected skill on most senior cloud roles. The AWS Solutions Architect Associate exam (current code SAA-C03) was refreshed to weight serverless, container, and observability questions more heavily.",
      "What this means for hiring: Pune cloud job descriptions in 2026 expect Terraform or AWS CDK on top of console basics, container experience (ECS or EKS), one observability stack (CloudWatch + X-Ray, or Prometheus + Grafana), and at least one production deployment story. Archer Infotech's curriculum is rebuilt around exactly these expectations — modern AWS, IaC by default, container-aware, certification-ready.",
    ],
    keyPoints: [
      "AWS = 31% global cloud share (Synergy Q1 2026) — biggest by far",
      "1,500+ active AWS roles on Indeed Pune as of May 2026",
      "Modern stack — VPC + EKS + Lambda + Aurora + Bedrock, not EC2-only",
      "IaC by default — Terraform and AWS CDK, not click-ops",
      "Certification path — SAA-C03 (Solutions Architect Associate) included in curriculum",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student looking to enter cloud or DevOps roles in Pune",
      "Working software developer wanting to add cloud architecture to your skill stack",
      "System or network administrator transitioning into cloud engineering",
      "Java, Python, or .NET backend developer whose job descriptions now expect AWS knowledge",
      "Career restarter targeting cloud engineering as a high-demand re-entry path",
    ],
    notForYou: [
      "If you have no programming or scripting background — at least basic Python or Bash is required to follow the IaC and Lambda modules",
      "If you want a 30-day cert-only crash course — we run a separate exam-prep track; this 3-month programme is hands-on engineering, not exam tricks",
      "If you cannot put in 8–10 hours per week of lab work outside class — AWS is learned by clicking, breaking, and rebuilding, not by watching",
      "If your only goal is a single certificate sticker with no project work — Pune cloud hiring screens on hands-on portfolio, not just badges",
      "If you already hold AWS Solutions Architect Professional or have 4+ years of production AWS — you'll be under-stretched; talk to us about advanced specialisations",
    ],
  },

  curriculum: [
    {
      title: "Cloud Foundations & AWS Account Setup",
      weekRange: "Week 1",
      description:
        "Cloud computing concepts (IaaS / PaaS / SaaS, on-prem vs cloud trade-offs, shared responsibility model), the AWS global infrastructure (Regions, AZs, Edge locations, Wavelength zones), account creation, billing alarms, the AWS Free Tier, and IAM basics. By the end of week 1 every student has a personal AWS sandbox account, MFA enabled, a budget alarm at ₹1,000, and an IAM user with programmatic access. We deliberately spend a full session on cost — every horror story you have heard about a runaway AWS bill starts with what we cover this week.",
      topics: [
        "Cloud computing models — IaaS / PaaS / SaaS",
        "AWS global infrastructure — Regions, AZs, Edge locations",
        "Shared responsibility model",
        "Account setup, MFA, root vs IAM users",
        "Billing alarms, AWS Budgets, Cost Explorer",
        "AWS Free Tier — what's free and for how long",
        "AWS CLI v2 setup and named profiles",
      ],
    },
    {
      title: "IAM, Identity Federation & Security Baseline",
      weekRange: "Week 2",
      description:
        "Identity is the foundation of cloud security. Learn IAM users, groups, roles, and policies (managed, customer-managed, inline) — and the design principles that separate hobbyist accounts from production-grade ones. Cover IAM Identity Center (the successor to AWS SSO) for workforce identity, OIDC federation for CI/CD pipelines, and AWS Organizations + SCPs for multi-account governance. We finish the module by hardening the sandbox account using the AWS Security Hub baseline.",
      topics: [
        "IAM users, groups, roles, policies",
        "Policy evaluation logic — explicit deny, boundaries, conditions",
        "IAM roles for EC2, Lambda, and cross-account access",
        "IAM Identity Center for workforce SSO",
        "OIDC federation for GitHub Actions / Jenkins",
        "AWS Organizations and Service Control Policies",
        "Security Hub, GuardDuty, AWS Config baseline",
      ],
    },
    {
      title: "Networking — VPC, Subnets, Routing & Isolation",
      weekRange: "Week 3",
      description:
        "Cloud networking is where most certification candidates lose marks and most engineers lose production weekends. We build a VPC from scratch — public and private subnets across two AZs, a NAT Gateway, an Internet Gateway, route tables, security groups, and Network ACLs — and prove the design with a working three-tier application (ALB → EC2 → RDS).\n\nCIDR planning gets its own session, because a VPC range chosen badly in week one is the thing you cannot change later without rebuilding. We size subnets against realistic growth, reserve space for future AZs, and check the plan against the on-prem ranges an enterprise would need to peer with.",
      topics: [
        "VPC, subnets, CIDR planning and address exhaustion",
        "Internet Gateway, NAT Gateway, NAT Instance",
        "Route tables and the implicit local route",
        "Security groups vs Network ACLs — stateful vs stateless",
        "Public / private / isolated subnet tiers",
        "VPC Flow Logs for traffic troubleshooting",
        "Building a two-AZ three-tier VPC end to end",
      ],
    },
    {
      title: "Hybrid Connectivity, Endpoints & Route 53",
      weekRange: "Week 4",
      description:
        "The second half of AWS networking — connecting a VPC to other VPCs, to on-premises, and to AWS services without traversing the public internet. VPC Peering and its non-transitive limitation, Transit Gateway as the hub-and-spoke answer, Gateway and Interface endpoints, PrivateLink for exposing your own services, and Direct Connect versus Site-to-Site VPN.\n\nRoute 53 closes the module: hosted zones, record types, and the routing policies (weighted, latency, failover, geolocation) that appear in both the SAA-C03 exam and every real disaster-recovery design.",
      topics: [
        "VPC Peering and why it is not transitive",
        "Transit Gateway — hub-and-spoke at scale",
        "VPC endpoints — Gateway (S3, DynamoDB) and Interface",
        "AWS PrivateLink for private service exposure",
        "Site-to-Site VPN and Direct Connect trade-offs",
        "Route 53 hosted zones and record types",
        "Routing policies — weighted, latency, failover, geolocation",
        "Health checks and DNS-level failover",
      ],
    },
    {
      title: "Compute — EC2, AMIs & Auto Scaling",
      weekRange: "Week 5",
      description:
        "The compute service everything else is measured against. EC2 instance families and what each one is actually for, the four pricing models (on-demand, spot, savings plans, reserved) and how to combine them, storage-optimised versus compute-optimised selection, AMI lifecycle and EC2 Image Builder, and user data for bootstrapping.\n\nThen resilience: Auto Scaling groups with launch templates, target tracking and step scaling policies, health checks, and an Application Load Balancer in front. The lab ends with an application that survives an instance being terminated by hand.",
      topics: [
        "EC2 instance families and sizing",
        "Pricing models — on-demand, spot, savings plans, reserved",
        "Spot interruption handling and mixed-instance policies",
        "AMIs, snapshots, EC2 Image Builder",
        "User data, instance metadata and IMDSv2",
        "Launch templates and Auto Scaling groups",
        "Target tracking, step and scheduled scaling",
        "Application Load Balancer, target groups, health checks",
        "Elastic Beanstalk overview",
      ],
    },
    {
      title: "Serverless — Lambda, API Gateway & Event-Driven Design",
      weekRange: "Week 6",
      description:
        "Serverless as an architecture, not a trick. Lambda in depth — runtimes (Java 21, Python 3.13, Node 22), layers, memory-to-CPU coupling, timeouts, concurrency limits, and the cold-start behaviour that decides whether serverless suits a workload at all. Then the services Lambda is glued to: API Gateway REST and HTTP APIs, Step Functions for orchestration, EventBridge for routing, and SQS / SNS for decoupling.\n\nThe lab builds a small event-driven service end to end, so the trade-off against the EC2 design from the previous module is something you have measured rather than read about.",
      topics: [
        "Lambda runtimes, memory / CPU coupling, timeouts",
        "Layers, environment variables, versions and aliases",
        "Cold starts, provisioned concurrency, SnapStart",
        "API Gateway — REST vs HTTP APIs, authorisers, throttling",
        "Step Functions — standard vs express workflows",
        "EventBridge rules, buses and schemas",
        "SQS and SNS for decoupling and fan-out",
        "Building an event-driven service end to end",
      ],
    },
    {
      title: "Containers on AWS — ECR, ECS, Fargate & EKS",
      weekRange: "Week 7",
      description:
        "Where most Pune cloud roles actually spend their time. Push images to Amazon ECR with scanning enabled, then run them two ways: Amazon ECS with Fargate (task definitions, services, service discovery, autoscaling) and Amazon EKS (managed node groups, Fargate profiles, the AWS Load Balancer Controller, IRSA for pod-level IAM).\n\nWe are explicit about when each is the right answer — ECS for a team that wants AWS to hold the abstraction, EKS for a team that needs the Kubernetes ecosystem or portability. You build a Fargate-only EKS cluster you can run for under ₹100 a day.",
      topics: [
        "Amazon ECR — repositories, lifecycle policies, image scanning",
        "ECS task definitions, services and clusters",
        "Fargate versus EC2 launch types",
        "ECS service autoscaling and service discovery",
        "EKS cluster provisioning with eksctl",
        "Managed node groups versus Fargate profiles",
        "IAM Roles for Service Accounts (IRSA)",
        "AWS Load Balancer Controller and ingress",
        "Choosing between ECS and EKS",
      ],
    },
    {
      title: "Storage — S3, EBS, EFS & Data Lifecycle",
      weekRange: "Week 8",
      description:
        "S3 in the depth the exam and the job both require: storage classes and the retrieval cost that makes Glacier cheap only if you never read it, lifecycle rules, versioning and MFA delete, replication (same-region and cross-region), encryption modes, signed URLs, static website hosting, and S3 Object Lambda.\n\nBlock and file storage follow — EBS volume types and the gp3 baseline-versus-provisioned distinction, snapshots and fast snapshot restore, EFS for shared POSIX filesystems, and an overview of FSx. The module closes on choosing correctly between the three under a stated cost and latency budget.",
      topics: [
        "S3 storage classes and retrieval cost trade-offs",
        "Lifecycle policies, Intelligent-Tiering, expiry",
        "Versioning, MFA delete and Object Lock",
        "Same-region and cross-region replication",
        "S3 encryption — SSE-S3, SSE-KMS, SSE-C",
        "Signed URLs, bucket policies and Block Public Access",
        "S3 static hosting and CloudFront origin patterns",
        "EBS volume types — gp3, io2, st1, sc1",
        "Snapshots, fast snapshot restore, multi-attach",
        "EFS and FSx for Windows / Lustre overview",
      ],
    },
    {
      title: "Databases — RDS, Aurora, DynamoDB & Caching",
      weekRange: "Week 9",
      description:
        "Managed data services and the design decisions that outlast them. RDS engines, Multi-AZ for availability versus read replicas for scale (a distinction interviewers reliably probe), parameter groups, backups and point-in-time recovery. Aurora goes deeper — the shared storage layer, Serverless v2 scaling, and Aurora Global for cross-region.\n\nDynamoDB is taught as a modelling discipline rather than a key-value store: partition key design, hot partitions, single-table design, GSIs and LSIs, on-demand versus provisioned capacity, and Streams. ElastiCache and OpenSearch close the module.",
      topics: [
        "RDS engines, subnet groups, parameter groups",
        "Multi-AZ for availability vs read replicas for scale",
        "Automated backups and point-in-time recovery",
        "Aurora architecture and the shared storage layer",
        "Aurora Serverless v2 and Aurora Global",
        "DynamoDB partition key design and hot partitions",
        "Single-table design, GSIs and LSIs",
        "On-demand vs provisioned capacity and autoscaling",
        "DynamoDB Streams and TTL",
        "ElastiCache (Redis) and OpenSearch basics",
      ],
    },
    {
      title: "Infrastructure as Code — Terraform & AWS CDK",
      weekRange: "Week 10",
      description:
        "Modern cloud is code, not clicks. Terraform 1.7+ first — providers, resources, variables and outputs, remote state in S3 with DynamoDB locking, modules, workspaces, `plan` as a review artefact, and the import workflow for adopting resources someone created by hand. Then AWS CDK in TypeScript — constructs, stacks, and how synthesis produces CloudFormation underneath.\n\nWe teach both because Pune teams use both and you will be asked to read each. CloudFormation itself is covered at the level needed to debug what CDK emits: stacks, change sets, and drift detection.",
      topics: [
        "Terraform providers, resources, variables, outputs",
        "Remote state in S3 with DynamoDB locking",
        "Modules, workspaces and environment separation",
        "terraform plan as a code-review artefact",
        "Importing hand-created resources",
        "AWS CDK in TypeScript — constructs and stacks",
        "CDK synthesis and the CloudFormation output",
        "CloudFormation stacks, change sets, drift detection",
        "Choosing Terraform vs CDK on a real team",
      ],
    },
    {
      title: "CI/CD Pipelines & Deployment Strategies",
      weekRange: "Week 10",
      description:
        "Wiring the code you write to the infrastructure you defined. GitHub Actions deploying via OIDC federation — no static access keys anywhere, which is now the expected answer in interviews — plus AWS-native CodePipeline, CodeBuild and CodeDeploy for shops standardised on AWS tooling.\n\nDeployment strategy is the second half: rolling, blue/green with ALB target-group swaps, and canary releases with CodeDeploy traffic shifting. Every pattern is paired with its rollback path, because a deployment strategy without a rollback plan is just optimism.",
      topics: [
        "GitHub Actions with OIDC — no long-lived keys",
        "Build, test and artefact stages",
        "CodePipeline, CodeBuild, CodeDeploy",
        "Rolling, blue/green and canary deployments",
        "ALB target-group swaps for blue/green",
        "CodeDeploy traffic shifting and automatic rollback",
        "Secrets in pipelines — OIDC, Secrets Manager, masked outputs",
        "Environment promotion — dev, staging, production",
      ],
    },
    {
      title: "Observability — CloudWatch, X-Ray & OpenTelemetry",
      weekRange: "Week 11",
      description:
        "Observability the way SREs actually configure it, not the way marketing pages describe it. CloudWatch metrics and custom metrics, structured JSON logging queried with Logs Insights, alarms with sensible thresholds feeding SNS, composite alarms to suppress noise, and dashboards that a person on call can read at 3am.\n\nDistributed tracing follows with X-Ray and the AWS Distro for OpenTelemetry, plus a small Prometheus and Grafana stack on EKS for the cloud-native pattern you will meet in container-first teams.",
      topics: [
        "CloudWatch metrics, custom metrics and dimensions",
        "Structured JSON logging and Logs Insights queries",
        "Alarms, composite alarms and alarm fatigue",
        "Dashboards built for on-call readability",
        "AWS X-Ray — segments, subsegments, service maps",
        "AWS Distro for OpenTelemetry",
        "Prometheus and Grafana on EKS",
        "SNS, SQS and EventBridge for alert routing",
      ],
    },
    {
      title: "Security, Encryption & Well-Architected Review",
      weekRange: "Week 12",
      description:
        "The SAA-C03 exam weights security heavily, and so do real Pune hiring panels. Cover KMS in depth (CMKs, grants, envelope encryption, key rotation), AWS Secrets Manager and Parameter Store, ACM for TLS certificates, AWS WAF and AWS Shield (Standard and Advanced), Macie for data classification, and the Well-Architected Tool's six pillars.\n\nWe finish by reviewing each student's capstone architecture against the Well-Architected lens — a written review, in the format AWS partners actually produce.",
      topics: [
        "KMS — CMKs, grants, envelope encryption, key rotation",
        "Secrets Manager vs SSM Parameter Store",
        "ACM and TLS termination at ALB / CloudFront",
        "WAF rules, Shield Standard vs Advanced",
        "GuardDuty, Macie, Inspector overview",
        "Well-Architected Framework — six pillars",
        "Compliance — PCI DSS, HIPAA, SOC 2 baseline mapping",
        "Writing a Well-Architected review document",
      ],
    },
    {
      title: "Cost Optimisation & FinOps Practice",
      weekRange: "Week 12",
      description:
        "The skill that gets a cloud engineer promoted and the one most syllabi omit. Reading a bill properly with Cost Explorer and the Cost and Usage Report, allocating spend with tagging strategies and cost categories, and setting Budgets with actions that actually stop runaway resources rather than merely emailing about them.\n\nThen the levers: right-sizing from CloudWatch data, Savings Plans versus Reserved Instances, spot for interruptible work, S3 lifecycle and storage-class analysis, and the standard waste list — idle load balancers, unattached EBS volumes, orphaned snapshots, over-provisioned RDS.",
      topics: [
        "Cost Explorer and the Cost and Usage Report",
        "Tagging strategy and cost allocation tags",
        "AWS Budgets with budget actions",
        "Right-sizing from CloudWatch utilisation data",
        "Savings Plans vs Reserved Instances vs spot",
        "Storage-class analysis and S3 lifecycle savings",
        "Finding waste — idle ALBs, unattached EBS, orphaned snapshots",
        "Building a monthly FinOps review habit",
      ],
    },
    {
      title: "Generative AI on AWS — Bedrock & Vector Stores",
      weekRange: "Week 13",
      description:
        "Pune cloud architects in 2026 are expected to design AI features, not just classic three-tier apps. Cover Amazon Bedrock (Claude, Llama, Titan, Mistral, Stable Diffusion models on a single API), Bedrock Guardrails for content filtering, Bedrock Knowledge Bases backed by Amazon OpenSearch Serverless or Aurora pgvector, and Bedrock Agents for tool-using assistants. Build a small retrieval-augmented generation (RAG) service — S3 PDFs → Knowledge Base → Bedrock model → API Gateway endpoint — that you can demo end-to-end in interviews.",
      topics: [
        "Amazon Bedrock — model catalog, on-demand vs provisioned",
        "Bedrock Guardrails for safety filtering",
        "Vector storage — OpenSearch Serverless and Aurora pgvector",
        "Bedrock Knowledge Bases for managed RAG",
        "Bedrock Agents — tool calling, action groups",
        "SageMaker AI overview for custom training",
        "Cost and latency trade-offs across models",
      ],
    },
    {
      title: "Capstone Project & SAA-C03 Exam Preparation",
      weekRange: "Weeks 13–14 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work plus structured Solutions Architect Associate (SAA-C03) preparation. Pick one of three capstone architectures (see Capstone Projects). For exam prep we run question-bank drills, scenario walkthroughs, and two full-length mock exams under timed conditions — students typically score 75–85% on the second mock if they have done the lab work seriously. Mock interviews target Pune cloud hiring panels (Persistent, BMC, Bajaj Finserv, Synechron). Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "Architecture review against Well-Architected pillars",
        "SAA-C03 question-bank drills — 5 domains",
        "Two full-length timed mock exams",
        "Cloud-engineer interview prep — scenario design questions",
        "Resume, LinkedIn, GitHub portfolio polish",
        "HR mock interview and salary negotiation",
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
    src: "/images/courses/aws-cloud-path-v1.webp",
    width: 1400,
    height: 1064,
    alt: "Ten-stage AWS Cloud Computing learning path taught at Archer Infotech Pune: cloud foundations covering regions, availability zones, the shared responsibility model and billing; identity and access management covering users, roles, policies and federation; networking covering VPC, subnets, routing, endpoints and Route 53; compute covering EC2, Auto Scaling, Lambda and serverless; containers covering ECR, ECS, Fargate and EKS; storage and databases covering S3, EBS, RDS, Aurora and DynamoDB; infrastructure as code covering Terraform, CDK and CloudFormation; CI/CD and observability covering GitHub Actions, CloudWatch and X-Ray; security and cost covering KMS, WAF, Well-Architected and FinOps; and generative AI covering Bedrock, knowledge bases and the capstone project.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/aws-cloud-computing-syllabus-v1.pdf",
    title: "AWS Cloud Computing Course Syllabus — Complete Module List",
    slug: "aws-cloud-computing-syllabus",
    blurb:
      "The complete seventeen-module syllabus as a PDF — cloud foundations and account setup, IAM and federation, VPC networking and hybrid connectivity, EC2 and Auto Scaling, serverless, containers on ECS and EKS, storage, managed databases, Terraform and CDK, CI/CD, observability, security and KMS, FinOps, Bedrock and generative AI, and the capstone with SAA-C03 exam preparation. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All seventeen modules in teaching order, week by week, from the first sandbox account through to the SAA-C03 mock exams.",
          "Every AWS service taught, grouped the way the exam blueprint groups them — compute, storage, networking, database, security, and cost.",
          "The infrastructure-as-code track in full: Terraform state and modules, AWS CDK in TypeScript, and the CloudFormation underneath both.",
          "The lab and capstone list, including the three capstone architectures and what each one demonstrates to a hiring panel.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "Cloud Engineer — provisioning, automating and operating AWS workloads.",
          "AWS Solutions Architect — designing against the Well-Architected pillars.",
          "Cloud Support / Operations Engineer — the most common entry route in Pune.",
          "DevOps Engineer (AWS) — pairing this stack with CI/CD and Kubernetes.",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Three-Tier Production Architecture with Terraform",
      description:
        "A complete production-style three-tier architecture provisioned by Terraform — VPC across two AZs, public ALB, private EC2 / ECS application tier behind Auto Scaling, Aurora PostgreSQL Multi-AZ, ElastiCache for Redis caching, CloudFront in front of an S3 static-asset bucket, ACM TLS, WAF managed rules, and CloudWatch alarms feeding an SNS topic. The full stack stands up in under 15 minutes from `terraform apply` and tears down clean. Outcome: a public GitHub repository plus an architecture diagram you can talk through in any cloud interview.",
      technologies: [
        "Terraform 1.7+",
        "AWS VPC + ALB + Auto Scaling",
        "Aurora PostgreSQL Multi-AZ",
        "ElastiCache (Redis)",
        "CloudFront + S3",
        "ACM + WAF",
        "CloudWatch + SNS",
        "GitHub Actions with OIDC",
      ],
    },
    {
      title: "Serverless Event-Driven Application",
      description:
        "API Gateway → Lambda (Python 3.13 or Node.js 20) → DynamoDB single-table design, with Step Functions orchestrating a multi-stage workflow, EventBridge fanning events out to downstream consumers, and SQS DLQs handling failures. Cognito for user auth, X-Ray for distributed tracing, AWS SAM or CDK for deployment. Pick a real domain — order processing, ticket booking, IoT ingestion. Includes a one-page architecture review against the Well-Architected serverless lens.",
      technologies: [
        "AWS Lambda + API Gateway",
        "DynamoDB single-table",
        "Step Functions + EventBridge",
        "SQS + SNS",
        "Amazon Cognito",
        "AWS X-Ray",
        "AWS SAM or CDK",
      ],
    },
    {
      title: "Containerised Microservices on EKS with Bedrock RAG",
      description:
        "An EKS Fargate cluster running three microservices (frontend, API, worker) deployed via Helm, Application Load Balancer Controller for ingress, IAM Roles for Service Accounts (IRSA), and Aurora pgvector + Amazon Bedrock powering a retrieval-augmented chat endpoint. Includes Prometheus + Grafana for metrics, AWS Distro for OpenTelemetry for traces, and a GitHub Actions pipeline deploying via OIDC. Outcome: a 2026-relevant cloud-native + AI architecture that demos in 5 minutes.",
      technologies: [
        "Amazon EKS on Fargate",
        "Helm charts",
        "Aurora PostgreSQL + pgvector",
        "Amazon Bedrock + Knowledge Bases",
        "Prometheus + Grafana",
        "AWS Distro for OpenTelemetry",
        "GitHub Actions with OIDC",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Yogesh Patil (Founder & Director, 15+ years, hands-on AWS / Azure architect) and Vinod Patil (Solutions Architect & AI Trainer, 12 years, AWS / Azure / GCP plus Bedrock). Both personally take sessions — the names you see on this page are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Cloud Engineer and AWS Solutions Architect are among the highest-demand roles in Pune as of 2026 — Indeed Pune lists more than 1,500 active AWS-related openings, with Cloud Engineer salary trending materially higher than equivalent-experience pure-developer salaries. The biggest Pune employers are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mastercard Pune Tech Hub, Cognizant, Capgemini, and TCS.",
      "What pulls a cloud engineer above the median band in 2026: a public GitHub portfolio with at least one Terraform-deployed three-tier architecture, demonstrable container experience (ECS or EKS), one observability stack you can defend, and the SAA-C03 certificate. Our capstone projects and certification track are designed exactly around these signals.",
      "Senior Cloud Architect bands are reported as national figures (Pune-specific Indeed pages do not exist for those roles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr aggregations.",
    ],
    salaryBands: [
      {
        role: "AWS Cloud Engineer (Pune)",
        band: "₹6,72,490 per year average",
        source: {
          label: "Indeed Pune (AWS Cloud Engineer)",
          url: "https://in.indeed.com/career/cloud-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Cloud Engineer entry-level (<3 years, Pune)",
        band: "₹4,50,000 – ₹6,50,000 per year",
        source: {
          label: "AmbitionBox Pune Cloud Engineer",
          url: "https://www.ambitionbox.com/profile/cloud-engineer-salary-in-pune",
        },
      },
      {
        role: "AWS Solutions Architect (Pune mid-level, 3–6 years)",
        band: "₹12,00,000 – ₹18,00,000 per year",
        source: {
          label: "Glassdoor Pune AWS Solutions Architect",
          url: "https://www.glassdoor.co.in/Salaries/pune-aws-solutions-architect-salary-SRCH_IL.0,4_IM1072_KO5,28.htm",
        },
      },
      {
        role: "Senior Cloud Architect (national, 7–10 years)",
        band: "₹22,00,000 – ₹38,00,000 per year",
        source: {
          label: "6figr India Cloud Architect (national, Pune ±10%)",
          url: "https://6figr.com/in/salary/cloud-architect--t",
        },
      },
      {
        role: "Lead / Principal Cloud Engineer (national)",
        band: "₹35,00,000 – ₹60,00,000 per year",
        source: {
          label: "Industry aggregation 2026 (Pune ±10%)",
          url: "https://www.payscale.com/research/IN/Job=Cloud_Architect/Salary",
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
      "Atos / Eviden",
      "Cummins",
      "Honeywell",
      "John Deere ETC",
    ],
    rolesAfterCourse: [
      "AWS Cloud Engineer",
      "Cloud Developer",
      "DevOps Engineer (cloud-focused)",
      "Solutions Architect — Associate",
      "Site Reliability Engineer",
      "Platform Engineer",
      "Cloud Support Engineer",
      "Junior Cloud Architect",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks) plus 2 weeks of capstone project work and SAA-C03 / interview preparation",
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
        "Same lab reviews and project feedback as in-person batches",
      ],
      tools: [
        "Zoom for live sessions",
        "Personal AWS sandbox account per student",
        "GitHub for code and Terraform reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load — most working developers find this format easier to balance with their day job.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's Terraform code and architecture diagrams personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. The SAA-C03 exam voucher (USD ~150 / ~₹13,000) is paid directly to AWS by the student and is not part of our fee.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full SAA-C03 mock-exam track and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real Terraform and EKS work, your GitHub has a deployable three-tier reference architecture, and you have completed at least three mock technical interviews against question banks from Pune cloud-hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for cloud-engineer JDs",
      "Week 9 — GitHub portfolio cleanup, Terraform README polish, architecture diagrams",
      "Weeks 10–11 — SAA-C03 mock exams + scenario-design interview drills",
      "Weeks 11–12 — three rounds of mock technical interviews",
      "Week 12 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Up to 6 months of continued support after course end",
      "Free re-entry to future batch interview-prep sessions if first round does not land",
    ],
    partnerCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Mastercard Pune Tech Hub",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Cummins",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune AWS training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Yogesh Patil and Vinod Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Personal AWS sandbox account per student",
        archer: "Yes — provisioned in week 1, used through capstone",
        typical: "Shared institute account or screen-share only",
      },
      {
        feature: "Infrastructure as Code coverage",
        archer: "Terraform 1.7+ AND AWS CDK in TypeScript",
        typical: "Console click-through only, or Terraform-light",
      },
      {
        feature: "Container coverage on AWS",
        archer: "ECS Fargate AND EKS Fargate hands-on",
        typical: "Theoretical container slides only",
      },
      {
        feature: "Generative AI on AWS",
        archer: "Bedrock + Knowledge Bases + Aurora pgvector RAG project",
        typical: "Not covered, or marketing-only mention",
      },
      {
        feature: "SAA-C03 certification preparation",
        archer: "Two full-length timed mock exams + scenario drills",
        typical: "Topic list with no timed practice",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Terraform repos, architecture diagrams, READMEs",
        typical: "Rare",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student Terraform repos and named trainers before you pay.",
  },

  versusAlternative: {
    heading: "AWS vs Azure — Which Should You Learn First in Pune?",
    paragraphs: [
      "AWS vs Azure is the most-asked question in Pune cloud counselling sessions and the honest answer is — it depends on which Pune companies you want to work for. AWS dominates Pune product engineering (Persistent, BMC, Synechron, BMW TechWorks, Mastercard Pune Tech Hub, most fintechs and SaaS companies). Azure dominates Pune enterprise IT — large captives like Mercedes-Benz R&D, Cummins, John Deere, Honeywell, plus most Microsoft-stack consultancies and BFSI shops on .NET / SQL Server.",
      "On raw market share AWS is roughly 31% globally vs Azure 25% (Synergy Q1 2026); in India the gap is wider in startups and product, narrower in enterprise. On Indeed Pune the AWS listing count is around 1.4× Azure's. Both certifications carry similar weight on Pune resumes — Solutions Architect Associate (SAA-C03) on AWS, Azure Administrator Associate (AZ-104) on Azure.",
      "Honest recommendation: pick AWS first if your goal is product engineering, cloud-native development, or working at a Pune fintech or SaaS company. Pick Azure first if your goal is enterprise IT, .NET shops, or large captive R&D centres. Pune cloud engineers we have placed often add the second cloud as a side skill once placed — multi-cloud is increasingly expected at the senior level.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic Linux command line, basic Python or Bash scripting, and comfort with at least one programming language at a junior level. You do NOT need prior cloud experience — we start from creating an AWS account in week 1. If you have done our Java or Python training (or equivalent), you are ready. Working professionals from on-prem sysadmin or .NET / Java backgrounds typically slot in well.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers)",
      "Confirm enrolment and complete pre-course orientation (account checklist, IDE setup)",
      "Show up to day one with a laptop running 64-bit OS, a personal credit card or UPI mandate (for AWS account verification — billing alarms keep usage in Free Tier)",
    ],
  },

  faqs: [
    {
      question: "Which is the best AWS training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student Terraform GitHub repositories with deployable READMEs, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does AWS training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) for the regular classroom and online programmes, plus 2 weeks of capstone project and SAA-C03 / interview preparation. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of an AWS Cloud Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹6,72,490 per year for Cloud Engineer. Mid-level AWS Solutions Architects in Pune (3–6 years) earn ₹12–18 lakh per year per Glassdoor. Senior Cloud Architects (7–10 years) earn ₹22–38 lakh nationally with Pune trending within ±10% of those figures.",
    },
    {
      question: "What is the fee for the AWS course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full SAA-C03 mock-exam track and extended interview prep; the lower end covers concession-eligible online or weekend formats. The SAA-C03 exam voucher (USD ~150) is paid directly to AWS and is not part of our fee.",
    },
    {
      question: "Does the course prepare me for the AWS Solutions Architect Associate certification?",
      answer:
        "Yes — SAA-C03 preparation is woven through the curriculum and concentrated in weeks 11–12. Two full-length timed mock exams plus scenario drills are part of the course. Most students who complete the lab work seriously score 75–85% on the second mock and pass the live exam on first attempt.",
    },
    {
      question: "Do I need programming experience to learn AWS?",
      answer:
        "Yes — at least basic Python or Bash is required to follow the IaC, Lambda, and serverless modules. If you have done our Java or Python training (or equivalent), you are ready. Pure non-developers should consider our Data Analytics or Cloud Foundations track first.",
    },
    {
      question: "AWS or Azure — which should I learn first in Pune?",
      answer:
        "AWS first if your goal is product engineering, cloud-native development, fintech or SaaS. Azure first if your goal is enterprise IT, .NET shops, or large captive R&D centres. AWS has roughly 1.4× more Pune listings on Indeed; both certificates carry similar resume weight. Many Pune cloud engineers add the second cloud as a side skill once placed.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) three-tier production architecture provisioned by Terraform, (2) serverless event-driven application on Lambda + DynamoDB + Step Functions, (3) containerised microservices on EKS Fargate with a Bedrock RAG endpoint. All three become public GitHub repositories you reference in interviews.",
    },
    {
      question: "Do I get my own AWS account during the course?",
      answer:
        "Yes — every student creates their own personal AWS sandbox account in week 1 with a billing alarm set at ₹1,000. We use Free Tier wherever possible; the lab work for the full course typically costs each student under ₹500–₹1,000 in actual AWS charges across 14 weeks.",
    },
    {
      question: "What about cost? Will I get a runaway AWS bill?",
      answer:
        "No — week 1 covers AWS Budgets, billing alarms, and Cost Explorer before any chargeable resource is launched. Every lab uses the smallest Free-Tier-eligible instance type. Students who follow the runbooks finish the course having spent ₹500–₹1,000 in actual AWS charges; those who forget to tear down resources occasionally see ₹2,000–₹3,000 bills, which alarms catch within 24 hours.",
    },
    {
      question: "Is Generative AI / Bedrock covered in the course?",
      answer:
        "Yes — week 10 is a full module on Amazon Bedrock, Bedrock Knowledge Bases (managed RAG), and Bedrock Agents. Capstone Project #3 includes a Bedrock-powered chat endpoint backed by Aurora pgvector. This module is what separates 2026 Pune AWS hiring from 2022 Pune AWS hiring — most JDs now mention Bedrock or AI features.",
    },
    {
      question: "Are weekend AWS classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same labs and capstone. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for cloud roles, referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "How is this different from your AWS Solutions Architect Associate course?",
      answer:
        "This AWS Training in Pune programme is the foundation cloud-engineer course — 3 months of hands-on AWS engineering with SAA-C03 prep included. The AWS Solutions Architect course is a separate 2.5-month exam-focused track for candidates who already have AWS experience and want concentrated certification prep. Most freshers should start here.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Yogesh Patil (Founder & Director, 15+ years) personally leads the architecture, networking, and Well-Architected sessions. Vinod Patil (Solutions Architect & AI Trainer, 12 years) leads the IaC, serverless, and Bedrock weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start AWS training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Yogesh and Vinod are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see the lab setup, meet a current batch, and decide with full information.",
  },
};
