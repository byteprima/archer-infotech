import type { CourseRichContent } from "./types";

export const devopsTrainingInPune: CourseRichContent = {
  intro:
    "DevOps Engineer and Site Reliability Engineer (SRE) are among the highest-demand technical roles in Pune in 2026 — Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D, Cummins, and the Mastercard Pune Tech Hub all run dedicated platform-engineering teams. Archer Infotech's DevOps training in Pune teaches the discipline as it is actually practiced in 2026 — Linux fundamentals, Git workflows, Docker, Kubernetes 1.30+, Terraform 1.7+, GitHub Actions and Jenkins, the modern observability stack (Prometheus + Grafana + Loki + Tempo), GitOps with Argo CD, plus the security and FinOps habits that separate junior DevOps from production-grade Platform Engineers. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn DevOps in 2026",
    paragraphs: [
      "DevOps is no longer a niche — it is the connective tissue between every modern software team and the systems they ship. Indeed Pune lists more than 1,200 active DevOps Engineer / SRE / Platform Engineer / Cloud Engineer openings as of May 2026, with continuous hiring at Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mastercard Pune Tech Hub, and the captive engineering centres of Mercedes-Benz, Cummins, and John Deere ETC. Pune SRE compensation is at the top end of the city's IT corridor — Senior DevOps Engineers and SREs frequently earn more than equivalent-experience full-stack developers because the role bundles operations expertise with on-call accountability.",
      "What changed in 2026: the discipline has settled. Kubernetes 1.30+ is the default orchestrator (not optional, not aspirational). Terraform 1.7+ has eclipsed pure CloudFormation / ARM for multi-cloud teams; OpenTofu is gaining traction as a license-safe alternative. The observability stack has standardised around Prometheus + Grafana + Loki + Tempo (the 'PLG / OpenTelemetry' stack) replacing scattered ELK / DataDog-only deployments. GitOps with Argo CD has become the deployment pattern of choice for Pune product engineering teams. And FinOps — controlling cloud spend — is now an expected skill on senior DevOps roles, not a nice-to-have.",
      "What this means for hiring: Pune DevOps JDs in 2026 expect Docker + Kubernetes hands-on, one cloud (AWS or Azure) at a working level, Terraform IaC, one CI/CD tool (GitHub Actions or Jenkins), and basic Prometheus / Grafana literacy. Senior roles add Argo CD GitOps, service mesh (Istio / Linkerd), security hardening (Trivy / Falco / OPA), and FinOps fluency. Archer Infotech's curriculum is rebuilt around exactly these expectations — engineering-first, production-realistic, and honest about the on-call reality of the role.",
    ],
    keyPoints: [
      "1,200+ active DevOps / SRE / Platform Engineer roles on Indeed Pune (May 2026)",
      "Kubernetes 1.30+ + Terraform 1.7+ + Prometheus stack — the 2026 default",
      "GitOps with Argo CD is now the deployment pattern of choice in Pune",
      "Senior DevOps / SRE compensation often exceeds equivalent-experience devs",
      "FinOps and on-call discipline now expected on senior roles",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student targeting DevOps Engineer / SRE / Platform Engineer roles",
      "Working backend / full-stack developer wanting to add Docker / Kubernetes / IaC to your skill stack",
      "Linux / system administrator transitioning into modern Cloud DevOps",
      "QA or Build Engineer wanting to formalise into DevOps Engineer",
      "Working DevOps practitioner wanting to update from a Jenkins-Bash-Ansible 2018 stack to the 2026 K8s + GitOps stack",
    ],
    notForYou: [
      "If you have no Linux command-line comfort — work through a basic Linux course first; we move fast from week 1",
      "If you have never written a script in any language — at least basic Python or Bash is required",
      "If you expect a guaranteed ₹15L+ DevOps offer with no portfolio — Pune fresher DevOps entry sits at ₹4–₹7 lakh; the ₹15L+ roles need 2–3 years of real production work",
      "If you cannot put in 10–12 hours per week of lab work outside class — DevOps is the most lab-heavy of all our tracks",
      "If you cannot tolerate things breaking — DevOps is a discipline of breaking things on purpose to learn how to fix them; if that frustrates you, this is not your path",
      "If you already have 4+ years of production DevOps with K8s and IaC — talk to us about a focused SRE / Platform Engineer specialisation instead",
    ],
  },

  curriculum: [
    {
      title: "Linux, Networking & Bash Foundations",
      weekRange: "Weeks 1–2",
      description:
        "DevOps without Linux fluency is fragile. Start with the working subset of Linux — file system layout, permissions, processes, signals, systemd units, package management on Ubuntu / Rocky, log files, cron, SSH key management. Then networking — TCP/IP basics, DNS resolution, HTTP / HTTPS, the curl / dig / netcat / tcpdump quartet, firewalls (ufw, iptables briefly), and how to debug a failing connection from first principles. Finish with Bash scripting at the level you actually need — variables, control flow, functions, error handling with `set -euo pipefail`, and the discipline of writing scripts that pass shellcheck.",
      topics: [
        "Linux file system, permissions, processes, signals",
        "systemd units and journalctl",
        "Package management — apt, dnf, snap",
        "SSH key management and ssh-agent",
        "Networking — TCP/IP, DNS, HTTP/HTTPS",
        "Debugging tools — curl, dig, netcat, tcpdump, ss",
        "Bash scripting — set -euo pipefail, error handling",
        "shellcheck and script linting",
      ],
    },
    {
      title: "Git, GitHub & Trunk-Based Development",
      weekRange: "Week 3",
      description:
        "Git as engineers actually use it, not as tutorials describe it. Covers the working subset (commit, branch, merge, rebase, cherry-pick, stash, reflog), the conflict-resolution workflow that does not lose work, and trunk-based development as the dominant Pune product-engineering pattern. GitHub workflow — pull requests, code reviews, branch protection, required checks, CODEOWNERS, conventional commits, semantic versioning. We finish the week with a small open-source-style project workflow that mirrors what Pune product teams actually run.",
      topics: [
        "Git working subset — commit, branch, merge, rebase",
        "Conflict resolution without data loss",
        "Trunk-based development vs Git Flow",
        "GitHub PRs, branch protection, CODEOWNERS",
        "Conventional commits, semantic versioning",
        "Pre-commit hooks and pre-push checks",
      ],
    },
    {
      title: "Docker — Containers Done Right",
      weekRange: "Week 4",
      description:
        "Docker as a production tool, not a demo trick. Image vs container, the layered filesystem and how cache busting works, multi-stage builds for minimal images, distroless and Alpine for security-conscious shops, BuildKit / Docker Buildx for cross-platform images, Docker Compose for local-dev stacks. The discipline that separates working containers from secure containers — non-root users, read-only filesystems, healthchecks, .dockerignore, image scanning with Trivy. By the end of the week every student has containerised one stateful and one stateless application end-to-end.",
      topics: [
        "Docker architecture, image layers, cache",
        "Dockerfile authoring and best practices",
        "Multi-stage builds, distroless, Alpine",
        "BuildKit and Docker Buildx",
        "Docker Compose for local-dev stacks",
        "Non-root users, read-only FS, healthchecks",
        "Container security scanning with Trivy",
        "Container registry — Docker Hub, ECR, GHCR",
      ],
    },
    {
      title: "Kubernetes 1.30+ — Workloads, Services, Ingress",
      weekRange: "Weeks 5–6",
      description:
        "Kubernetes is the default orchestrator in Pune product engineering and the single biggest separator between junior and mid-level DevOps. Cover the architecture (control plane, etcd, kubelet, kube-proxy), Pods, Deployments, ReplicaSets, StatefulSets, DaemonSets, Services (ClusterIP / NodePort / LoadBalancer), Ingress with NGINX ingress controller, ConfigMaps and Secrets, persistent volumes, namespaces, RBAC, Network Policies, and Horizontal Pod Autoscaler. We work hands-on against a Minikube / kind cluster locally, then a small managed cluster (EKS / AKS / GKE) for the production-realistic exercises.",
      topics: [
        "Kubernetes architecture and components",
        "Pods, Deployments, ReplicaSets, StatefulSets, DaemonSets",
        "Services and Ingress (NGINX ingress controller)",
        "ConfigMaps, Secrets, environment configuration",
        "Persistent volumes and storage classes",
        "Namespaces and RBAC",
        "Network Policies (Calico / Cilium basics)",
        "Horizontal Pod Autoscaler",
        "kubectl debugging — describe, logs, exec, port-forward",
      ],
    },
    {
      title: "Helm, Operators & Cluster Operations",
      weekRange: "Week 7",
      description:
        "Helm 3 as the de facto package manager — chart structure, values, templates, hooks, and the Helm-vs-Kustomize debate (we teach both, with honest trade-offs). Then operators and Custom Resource Definitions (CRDs) — what they are, when they are over-engineering, and when they are essential. Cluster operations — node taints and tolerations, pod priority, resource requests / limits, eviction policies, cluster autoscaler. Finish with kube-prometheus-stack as a real production observability deployment via Helm.",
      topics: [
        "Helm 3 — charts, values, templates, hooks",
        "Helm vs Kustomize — when to use which",
        "Custom Resource Definitions and operators",
        "Node taints, tolerations, pod priority",
        "Resource requests / limits and QoS classes",
        "Cluster autoscaler and Karpenter overview",
        "kube-prometheus-stack deployment",
      ],
    },
    {
      title: "CI/CD — GitHub Actions & Jenkins",
      weekRange: "Week 8",
      description:
        "Two pipelines, two pillars of the Pune market. GitHub Actions for Pune product engineering and modern teams — workflows, jobs, matrix builds, OIDC federation to AWS / Azure (no static keys), reusable workflows, and the discipline of caching to keep pipelines under 5 minutes. Jenkins for Pune enterprise / BFSI shops where Jenkins is institutional — declarative pipelines, shared libraries, agent management on Kubernetes via the Kubernetes Jenkins plugin. Both delivered hands-on with a real microservice deployed end-to-end.",
      topics: [
        "GitHub Actions — workflows, jobs, matrix, reusable",
        "OIDC federation to AWS / Azure",
        "Caching strategies and pipeline performance",
        "Jenkins declarative pipelines",
        "Jenkins shared libraries",
        "Jenkins agents on Kubernetes",
        "Pipeline patterns — build-test-scan-deploy",
        "Artifact management — Nexus, Artifactory, GHCR",
      ],
    },
    {
      title: "Terraform & GitOps with Argo CD",
      weekRange: "Week 9",
      description:
        "Terraform 1.7+ as the dominant IaC tool in Pune multi-cloud teams. Cover providers, state management (remote state in S3 / Azure Blob with DynamoDB / Cosmos locking), modules, workspaces, terragrunt overview, drift detection, and the discipline of module design that does not become an unmaintainable mess. Then GitOps with Argo CD — the deployment pattern of choice in Pune product engineering — Application CRDs, ApplicationSets, sync policies, hooks, and the promotion pattern (dev → staging → prod) that mature teams actually use.",
      topics: [
        "Terraform 1.7+ — providers, state, modules",
        "Remote state with locking",
        "Terraform workspaces and terragrunt",
        "Drift detection and remediation",
        "Argo CD — Application CRDs, sync policies",
        "ApplicationSets for multi-cluster",
        "Promotion patterns — dev → staging → prod",
        "OpenTofu overview (Terraform license-safe alt)",
      ],
    },
    {
      title: "Observability — Prometheus, Grafana, Loki, Tempo",
      weekRange: "Week 10",
      description:
        "The observability stack the Pune SRE community has settled on — the PLG (Prometheus / Loki / Grafana) plus Tempo and OpenTelemetry. Prometheus metrics with PromQL, recording rules, alerting rules, Alertmanager integration to PagerDuty / Opsgenie / Slack. Grafana dashboards (and the discipline of designing dashboards that humans can actually use during an incident — Brendan Gregg's USE / Google's Four Golden Signals). Loki for logs with LogQL, Tempo for distributed traces, and OpenTelemetry as the instrumentation standard. Finish with a real on-call simulation — a controlled outage that the class debugs together.",
      topics: [
        "Prometheus architecture, exporters, scrape configs",
        "PromQL — operators, functions, recording rules",
        "Alertmanager and on-call integration",
        "Grafana dashboards — USE / Four Golden Signals",
        "Loki + LogQL for logs",
        "Tempo for distributed traces",
        "OpenTelemetry instrumentation",
        "On-call simulation — controlled outage debugging",
      ],
    },
    {
      title: "Security, FinOps & Capstone Project",
      weekRange: "Weeks 11–12 + 2 weeks placement prep",
      description:
        "The senior-DevOps differentiators. Container and Kubernetes security — Trivy for image scanning, Falco for runtime detection, Open Policy Agent (OPA) / Kyverno for policy as code, sealed-secrets and external-secrets for secret management. FinOps — tagging strategy, cost allocation, AWS Cost Explorer and Azure Cost Management, Kubecost for cluster spend, and the practical patterns that cut a runaway cloud bill by 30–50% without breaking workloads. Capstone project (see Capstone Projects). Mock interviews calibrated for Pune DevOps panels — Persistent, BMC, Bajaj Finserv, Synechron, Mercedes-Benz R&D — including a Linux command-line round, a Kubernetes troubleshooting round, and an architecture / scenario round.",
      topics: [
        "Trivy, Falco, OPA / Kyverno for K8s security",
        "Sealed-secrets, External Secrets Operator",
        "Pod Security Standards and Pod Security Admission",
        "FinOps — tagging, cost allocation, Kubecost",
        "Capstone implementation, deployment, README",
        "Linux mock round, Kubernetes troubleshooting round, system-design round",
        "Resume + LinkedIn rewrite for DevOps / SRE / Platform JDs",
        "GitHub portfolio polish",
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

  projects: [
    {
      title: "End-to-End GitHub Actions CI/CD with EKS / AKS Deployment",
      description:
        "Take a small microservice (Spring Boot, FastAPI, or Node.js — your choice), containerise it with a multi-stage Dockerfile, write a GitHub Actions pipeline that lints, tests, scans (Trivy), builds, signs (cosign), and deploys via Helm to an EKS or AKS cluster using OIDC federation (no static keys). Add Prometheus annotations on the service and a Grafana dashboard. Outcome: a public GitHub repository with passing CI badges plus a clickable demo URL — exactly what Pune DevOps hiring panels ask for.",
      technologies: [
        "Docker (multi-stage, distroless)",
        "GitHub Actions with OIDC",
        "Trivy + cosign",
        "Helm 3",
        "Amazon EKS or Azure AKS",
        "Prometheus + Grafana",
      ],
    },
    {
      title: "Terraform + Argo CD GitOps Multi-Environment Setup",
      description:
        "Provision a complete multi-environment Kubernetes platform with Terraform — VPC / VNet networking, EKS / AKS cluster, RDS / Azure SQL database, IAM / RBAC, ACM / Key Vault — then layer Argo CD on top with ApplicationSets for dev / staging / prod environments and a clean promotion pattern (PR-driven for dev, tag-driven for staging, manual approval for prod). Includes a one-page architecture review against the Well-Architected Framework. Outcome: a production-style platform-engineering reference that demos in 5 minutes.",
      technologies: [
        "Terraform 1.7+",
        "AWS or Azure (your choice)",
        "Argo CD + ApplicationSets",
        "Helm charts",
        "GitHub Actions",
        "Prometheus + Grafana stack",
      ],
    },
    {
      title: "Production Observability Stack with On-Call Runbook",
      description:
        "Deploy the full PLG + Tempo stack via kube-prometheus-stack on a real cluster, instrument three sample services with OpenTelemetry, build USE-method and Four-Golden-Signals dashboards in Grafana, write Prometheus alerting rules with sane thresholds, configure Alertmanager → Slack / PagerDuty, and document a 5-page on-call runbook covering common failure modes. Optional — extend with Falco runtime security alerts and Kubecost dashboards for FinOps signal. Outcome: an SRE-grade observability portfolio piece, the differentiator on most senior Pune SRE JDs.",
      technologies: [
        "kube-prometheus-stack (Prometheus + Grafana + Alertmanager)",
        "Loki for logs",
        "Tempo for traces",
        "OpenTelemetry SDKs",
        "Alertmanager + Slack / PagerDuty",
        "Falco + Kubecost (optional FinOps extension)",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the Python / Data Science / DevOps tracks, hands-on with Kubernetes and Docker daily) and Yogesh Patil (Founder & Director, 15+ years, AWS / Azure architect with deep production DevOps strategy). Both personally take sessions in every batch — the names you see here are the names you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "DevOps Engineer, SRE, and Platform Engineer are among the highest-paid technical roles in Pune in 2026 — Indeed Pune lists 1,200+ active openings, and senior compensation regularly exceeds equivalent-experience full-stack developer offers because the role bundles operations expertise with on-call accountability. The biggest Pune employers are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mastercard Pune Tech Hub, Mercedes-Benz R&D India, Cummins, John Deere ETC, plus the IT services majors with platform-engineering practices (TCS, Infosys, Cognizant, Capgemini).",
      "What pulls a DevOps engineer above the median band: a public GitHub repository with a real GitHub Actions CI/CD pipeline deploying via Helm to a cloud Kubernetes cluster, demonstrable Terraform IaC work (not just snippets), one observability stack you have actually deployed and dashboarded, and one on-call / runbook artefact. Our capstone projects are designed exactly around these signals.",
      "Senior DevOps / SRE bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for these specific titles); Pune trends within ±10% of these figures based on AmbitionBox, 6figr, and direct alumni feedback.",
    ],
    salaryBands: [
      {
        role: "DevOps Engineer (Pune)",
        band: "₹7,07,950 per year average",
        source: {
          label: "Indeed Pune (DevOps Engineer)",
          url: "https://in.indeed.com/career/devops-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior DevOps Engineer (Pune entry, <2 years)",
        band: "₹4,00,000 – ₹7,00,000 per year",
        source: {
          label: "AmbitionBox Pune DevOps Engineer",
          url: "https://www.ambitionbox.com/profile/devops-engineer-salary-in-pune",
        },
      },
      {
        role: "Mid-level DevOps Engineer (Pune, 3–5 years)",
        band: "₹12,00,000 – ₹20,00,000 per year",
        source: {
          label: "Glassdoor Pune DevOps Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-devops-engineer-salary-SRCH_IL.0,4_IM1072_KO5,20.htm",
        },
      },
      {
        role: "Site Reliability Engineer (Pune, 4–7 years)",
        band: "₹16,00,000 – ₹28,00,000 per year",
        source: {
          label: "Glassdoor Pune SRE",
          url: "https://www.glassdoor.co.in/Salaries/pune-site-reliability-engineer-salary-SRCH_IL.0,4_IM1072_KO5,30.htm",
        },
      },
      {
        role: "Lead / Staff DevOps / Platform Engineer (national, 7+ years)",
        band: "₹26,00,000 – ₹50,00,000 per year",
        source: {
          label: "6figr India Lead DevOps / Platform (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-devops-engineer--t",
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
      "Cummins India",
      "John Deere ETC",
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
      "Honeywell",
    ],
    rolesAfterCourse: [
      "DevOps Engineer",
      "Site Reliability Engineer (SRE)",
      "Platform Engineer",
      "Cloud Engineer",
      "Build / Release Engineer",
      "Kubernetes Administrator",
      "Infrastructure Engineer",
      "Junior DevSecOps Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "3 months of structured curriculum (12 weeks, 4-month listing reflects optional extended evening format) plus 2 weeks of capstone project work and interview preparation",
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
        "Personal AWS / Azure sandbox account per student",
        "GitHub for code and Terraform reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over 5 months instead of 3 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's pipeline and Helm chart personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. Cloud sandbox spend (AWS / Azure Free Tier mostly covers it) typically runs ₹500–₹1,500 across the course and is paid by the student directly.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full GitOps + observability + FinOps modules and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 8 of the course, not at the end. By the time you finish the curriculum, your resume highlights real GitOps and observability work, your GitHub has a deployable Terraform + Argo CD reference repository, and you have completed at least three mock technical interviews against question banks from Pune DevOps hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 8 — resume and LinkedIn rewrite, calibrated for DevOps / SRE / Platform JDs",
      "Week 9 — GitHub portfolio cleanup, Terraform README polish, dashboard screenshots",
      "Weeks 10–11 — Linux + Kubernetes troubleshooting drills, system-design walkthroughs, on-call scenario simulations",
      "Weeks 11–12 — three rounds of mock technical interviews (Linux + K8s + system-design)",
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
      "Mastercard Pune Tech Hub",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Cummins",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune DevOps training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainers named on course page with photos and LinkedIn",
        archer: "Yes — Amol Patil and Yogesh Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Personal cloud sandbox account per student",
        archer: "Yes — AWS or Azure, used end-to-end through capstone",
        typical: "Shared institute account or screen-share only",
      },
      {
        feature: "Kubernetes depth covered",
        archer: "Architecture + workloads + Helm + operators + cluster ops + RBAC + Network Policies",
        typical: "Deployments + Services only, no operators or RBAC",
      },
      {
        feature: "Infrastructure as Code coverage",
        archer: "Terraform 1.7+ deeply, OpenTofu and Argo CD GitOps",
        typical: "Console click-through or Terraform-light",
      },
      {
        feature: "Observability stack covered",
        archer: "Prometheus + Grafana + Loki + Tempo + OpenTelemetry hands-on",
        typical: "Slides on what Prometheus is, no actual deployment",
      },
      {
        feature: "GitOps and modern deployment patterns",
        archer: "Argo CD ApplicationSets + promotion patterns + sealed-secrets",
        typical: "Not covered, or marketing-only mention",
      },
      {
        feature: "Security and FinOps coverage",
        archer: "Trivy + Falco + OPA + Kubecost — hands-on senior-DevOps differentiators",
        typical: "Not covered",
      },
      {
        feature: "On-call simulation in the course",
        archer: "Yes — controlled outage debugging in week 10",
        typical: "Not covered",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — CI/CD pipelines + Terraform repos + Grafana dashboards",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student CI/CD pipelines and Grafana dashboards before you pay.",
  },

  versusAlternative: {
    heading: "DevOps vs Cloud (AWS / Azure) — Which Should You Learn First in Pune?",
    paragraphs: [
      "DevOps vs Cloud is the most-asked question in Pune infrastructure-track counselling. The honest distinction: Cloud (AWS / Azure) is platform-specific knowledge — services, architecture patterns, certification paths. DevOps is platform-agnostic discipline — automation, CI/CD, IaC, containers, orchestration, observability — that uses cloud as the underlying substrate. They overlap heavily; mature engineers do both.",
      "Pune market reality: pure 'AWS Cloud Engineer' titles outnumber pure 'DevOps Engineer' titles, but DevOps Engineer compensation is typically 10–20% higher at equivalent experience because the role is broader. Senior SRE compensation runs noticeably above senior Cloud Engineer compensation. Most Pune product engineering teams hire DevOps / SRE rather than 'pure' Cloud Engineer for new platform-engineering roles.",
      "Honest recommendation: pick AWS first if your goal is product engineering, the Solutions Architect Associate certificate is a hard requirement on your shortlist, or your current employer is a heavy AWS shop. Pick DevOps first if your goal is the broader Platform Engineer / SRE career arc, or you already have one cloud at a working level. Many of our students do AWS first and DevOps 6–12 months later — these stack well, and senior platform roles need both.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: comfortable on a Linux command line, basic Bash or Python scripting, and at least one programming language at a junior level. You do NOT need prior cloud or container experience — we start from `apt update` and `docker pull` in week 1. Working developers from any backend stack (Java, Python, .NET, Node) typically slot in well; pure Windows-administrator candidates may find weeks 1–2 a stretch and should consider an introductory Linux course first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 15% of DevOps enquirers because Linux foundation isn't yet there)",
      "Confirm enrolment and complete pre-course orientation (laptop checklist, AWS / Azure account creation guide)",
      "Show up to day one with a laptop running 64-bit Linux / macOS / Windows-with-WSL2, and a personal credit card or UPI mandate (for cloud account verification — billing alarms keep usage in Free Tier)",
    ],
  },

  faqs: [
    {
      question: "Which is the best DevOps training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student CI/CD pipelines and Terraform repositories, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does DevOps training in Pune take at Archer Infotech?",
      answer:
        "Three months (12 weeks) of structured curriculum plus 2 weeks of capstone project and interview preparation. The original 4-month listing reflects an optional extended evening format. The weekend batch stretches over 5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a DevOps Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹7.08 lakh per year for DevOps Engineer (May 2026). Junior DevOps Engineer Pune entry sits at ₹4–7 lakh per year per AmbitionBox. Mid-level DevOps Engineers (3–5 years) earn ₹12–20 lakh per Glassdoor. SREs (4–7 years) earn ₹16–28 lakh. Lead / Staff DevOps / Platform Engineers earn ₹26–50 lakh nationally with Pune trending within ±10% of those figures.",
    },
    {
      question: "What is the fee for the DevOps course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full GitOps + observability + FinOps modules and extended interview prep; the lower end covers concession-eligible online or weekend formats. Cloud sandbox spend across the course typically runs ₹500–₹1,500 (paid directly by the student to AWS / Azure).",
    },
    {
      question: "Do I need programming experience to learn DevOps?",
      answer:
        "Yes — at least basic Python or Bash is required to follow the IaC, scripting, and pipeline modules. You do not need to be a senior developer; junior fluency is enough. If you have done our Java or Python training (or equivalent), you are ready. Pure non-developers should do a Linux + scripting course first.",
    },
    {
      question: "Do I need Linux knowledge before joining?",
      answer:
        "Yes — basic Linux command-line comfort is required from week 1. We level up Linux knowledge in weeks 1–2 (file system, processes, networking, Bash) but we do not start from 'what is a terminal'. If you are new to Linux, work through a basic course first; we politely turn away candidates who are not yet at the basic-Linux level.",
    },
    {
      question: "DevOps or AWS — which should I learn first in Pune?",
      answer:
        "AWS first if your goal is product engineering, you want the Solutions Architect Associate certificate, or your shortlisted employers are heavy AWS shops. DevOps first if your goal is the broader Platform Engineer / SRE career arc, or you already know one cloud. Many Pune engineers do AWS first and DevOps 6–12 months later — both are needed at senior platform-engineering level.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) end-to-end GitHub Actions CI/CD with EKS or AKS deployment via Helm, (2) Terraform + Argo CD GitOps multi-environment platform, (3) production observability stack with Prometheus + Grafana + Loki + Tempo plus on-call runbook. All three become public GitHub repositories with passing CI badges.",
    },
    {
      question: "Do I get my own AWS / Azure account during the course?",
      answer:
        "Yes — every student creates their own personal cloud sandbox account in week 4 (Docker week, when we move beyond local) with a billing alarm set at ₹1,000. We use Free Tier wherever possible; total cloud charges across the 14 weeks typically run ₹500–₹1,500 if you follow the runbooks (and tear down resources after labs).",
    },
    {
      question: "Is Kubernetes covered in depth or just briefly?",
      answer:
        "Kubernetes is covered in depth across weeks 5–7 — architecture, all major workload types, Helm, operators, RBAC, Network Policies, cluster operations, and the kube-prometheus-stack deployment. It is the single biggest module in the curriculum because it is the single biggest separator between junior and mid-level DevOps in Pune hiring.",
    },
    {
      question: "Are Argo CD and GitOps included?",
      answer:
        "Yes — week 9 covers Argo CD with ApplicationSets and the dev → staging → prod promotion pattern that mature Pune product-engineering teams use. Capstone Project #2 includes a full GitOps deployment. This pattern has become the deployment standard in Pune product engineering, replacing manual Helm-apply workflows.",
    },
    {
      question: "Are weekend DevOps classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over 5 months instead of 3. Same content, same trainers, same labs and capstone. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "What about on-call experience?",
      answer:
        "Week 10 includes a controlled-outage simulation — the trainer breaks something on the cluster (a bad deploy, a misconfigured network policy, an OOM-killed pod) and the class debugs it together using Prometheus, Grafana, Loki, kubectl describe, and the runbook patterns we teach. Real on-call experience comes after you are placed; this exercise gets you to the level where you can handle the first 30 days of on-call without panic.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for DevOps / SRE / Platform roles (Linux command-line round + Kubernetes troubleshooting + system-design), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Are the named trainers actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads the Docker, Kubernetes, Helm, CI/CD, observability, and FinOps weeks. Yogesh Patil leads the Linux foundations, Terraform / GitOps, and security / capstone weeks. The same names you see on this page show up in your batch on day one.",
    },
  ],

  finalCta: {
    heading: "Ready to start DevOps training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol and Yogesh are happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student CI/CD pipelines and Grafana dashboards, meet a current batch, and decide with full information.",
  },
};
