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
      title: "Linux Administration for DevOps",
      weekRange: "Week 1",
      description:
        "Every tool in this course runs on Linux, and the engineers who struggle later are always the ones who skipped this week. The file system hierarchy and what actually lives where, users, groups and permission bits including setuid and sticky, processes and signals, and how systemd starts and supervises everything on a modern distribution.\n\nThe lab work is deliberately diagnostic: you are given a broken service and asked to find it with `journalctl`, `systemctl status` and `ps`, rather than being shown the answer first.",
      topics: [
        "File system hierarchy and where things really live",
        "Users, groups, permissions, setuid and sticky bits",
        "Processes, signals, job control, nice and priorities",
        "systemd units, targets, timers and journalctl",
        "Package management — apt, dnf, snap",
        "Disk, filesystem and mount management",
        "Log locations and rotation with logrotate",
        "Diagnosing a broken service from first principles",
      ],
    },
    {
      title: "Networking, SSH & Bash Scripting",
      weekRange: "Week 2",
      description:
        "The second half of the foundation. TCP/IP addressing and subnetting, DNS resolution end to end, HTTP and HTTPS including what a TLS handshake actually exchanges, and the diagnostic toolkit — `curl`, `dig`, `ss`, `netcat`, `tcpdump` — used against real failures rather than in isolation.\n\nThen Bash as an engineering language, not a scratchpad: `set -euo pipefail`, quoting rules, exit codes and traps, argument parsing, and `shellcheck` in CI. Scripts you write this week are the ones you will reuse for the rest of the course.",
      topics: [
        "TCP/IP, subnetting, ports and routing basics",
        "DNS resolution, record types and caching",
        "HTTP, HTTPS and the TLS handshake",
        "SSH key management, ssh-agent, config and tunnels",
        "Diagnostics — curl, dig, ss, netcat, tcpdump",
        "Firewalls — iptables and nftables overview",
        "Bash scripting — set -euo pipefail, traps, exit codes",
        "Quoting, arrays, argument parsing",
        "shellcheck and script linting in CI",
      ],
    },
    {
      title: "Git, GitHub & Trunk-Based Development",
      weekRange: "Week 3",
      description:
        "Git taught as the working subset a DevOps engineer needs under pressure — commit, branch, merge, rebase, cherry-pick, reflog — plus conflict resolution done without losing work, which is the skill that separates confidence from fear.\n\nThen the team layer: trunk-based development versus Git Flow and why most teams moved, branch protection rules, CODEOWNERS, conventional commits, semantic versioning, and pre-commit hooks that catch problems before CI has to.",
      topics: [
        "Git working subset — commit, branch, merge, rebase",
        "Conflict resolution without data loss",
        "reflog, bisect and recovering from mistakes",
        "Trunk-based development vs Git Flow",
        "GitHub PRs, branch protection, CODEOWNERS",
        "Conventional commits and semantic versioning",
        "Pre-commit hooks and pre-push checks",
        "Monorepo vs polyrepo trade-offs",
      ],
    },
    {
      title: "Docker — Containers Done Right",
      weekRange: "Week 4",
      description:
        "Containers from the kernel features up — namespaces and cgroups — so that image layers, the build cache and copy-on-write filesystems are mechanisms you understand rather than behaviour you memorise. Dockerfile authoring with layer ordering that actually caches, multi-stage builds, distroless and Alpine base images, and BuildKit with Buildx for multi-platform output.\n\nSecurity is taught inline, not bolted on: non-root users, read-only root filesystems, dropped capabilities, healthchecks, and Trivy scanning wired into the build.",
      topics: [
        "Namespaces and cgroups — what a container really is",
        "Docker architecture, image layers and the build cache",
        "Dockerfile authoring and layer ordering",
        "Multi-stage builds, distroless and Alpine",
        "BuildKit, Buildx and multi-platform images",
        "Docker Compose for local-dev stacks",
        "Non-root users, read-only FS, dropped capabilities",
        "Healthchecks and container lifecycle",
        "Image scanning with Trivy",
        "Registries — Docker Hub, ECR, GHCR",
      ],
    },
    {
      title: "Kubernetes Architecture & Core Workloads",
      weekRange: "Week 5",
      description:
        "The control plane explained as a set of cooperating loops — API server, etcd, scheduler, controller manager, kubelet, kube-proxy — because almost every Kubernetes debugging question resolves to knowing which component owns the behaviour.\n\nThen the workload objects: Pods and why you rarely create them directly, Deployments and ReplicaSets, StatefulSets and their ordering guarantees, DaemonSets, Jobs and CronJobs. Rollouts, rollbacks and deployment strategies close the week.",
      topics: [
        "Control-plane components and reconciliation loops",
        "Pods, init containers, sidecars and lifecycle",
        "Deployments, ReplicaSets and rollout strategy",
        "Rollbacks, revision history and pause / resume",
        "StatefulSets and ordering guarantees",
        "DaemonSets, Jobs and CronJobs",
        "Labels, selectors and annotations",
        "kubectl for debugging — describe, logs, exec, port-forward",
      ],
    },
    {
      title: "Kubernetes Networking, Configuration & Storage",
      weekRange: "Week 6",
      description:
        "The three areas that generate the most production incidents. Services and the four types, DNS inside the cluster, Ingress with the NGINX controller and TLS termination, and Network Policies with Calico or Cilium for east-west control.\n\nConfiguration follows — ConfigMaps, Secrets and why Secrets are only base64 until you add encryption at rest — then storage: persistent volumes, claims, storage classes and dynamic provisioning. Namespaces, RBAC, resource quotas and the Horizontal Pod Autoscaler complete the picture.",
      topics: [
        "Services — ClusterIP, NodePort, LoadBalancer, ExternalName",
        "Cluster DNS and service discovery",
        "Ingress, the NGINX controller and TLS termination",
        "Network Policies with Calico / Cilium",
        "ConfigMaps and environment configuration",
        "Secrets, encryption at rest and their real limits",
        "PersistentVolumes, claims and storage classes",
        "Namespaces, RBAC and service accounts",
        "Resource requests, limits, QoS classes and quotas",
        "Horizontal Pod Autoscaler",
      ],
    },
    {
      title: "Helm, Operators & Cluster Operations",
      weekRange: "Week 7",
      description:
        "Packaging and running clusters rather than single workloads. Helm 3 charts, values files, templating, hooks and release lifecycle — then Kustomize, and an honest comparison of when each is the better answer instead of a preference stated as fact.\n\nOperators and Custom Resource Definitions explain how the ecosystem extends Kubernetes itself. Cluster operations closes the week: taints and tolerations, affinity rules, pod priority and preemption, cluster autoscaler and Karpenter, and node upgrades performed without dropping traffic.",
      topics: [
        "Helm 3 — charts, values, templates, hooks",
        "Chart dependencies, repositories and release lifecycle",
        "Kustomize overlays and bases",
        "Helm vs Kustomize — choosing per team",
        "Custom Resource Definitions and operators",
        "Taints, tolerations, affinity and anti-affinity",
        "Pod priority, preemption and disruption budgets",
        "Cluster autoscaler and Karpenter",
        "Node draining and zero-downtime upgrades",
      ],
    },
    {
      title: "CI/CD with GitHub Actions",
      weekRange: "Week 8",
      description:
        "Pipelines as the product a DevOps engineer is actually judged on. Workflow and job structure, matrix builds, reusable and composite workflows, self-hosted runners, and caching strategies that take a slow pipeline from fifteen minutes to three.\n\nOIDC federation to AWS and Azure is taught as the default rather than an advanced topic — long-lived cloud keys in CI are now a finding in any security review. The week ends with a complete build → test → scan → deploy pipeline for the container from week 4.",
      topics: [
        "Workflows, jobs, steps and the event model",
        "Matrix builds and fail-fast behaviour",
        "Reusable and composite workflows",
        "Caching strategies and pipeline performance",
        "OIDC federation to AWS and Azure",
        "Secrets, masked outputs and environment protection rules",
        "Self-hosted runners and when they are worth it",
        "A full build-test-scan-deploy pipeline",
      ],
    },
    {
      title: "Jenkins — Pipelines, Shared Libraries & Agents",
      weekRange: "Weeks 8–9",
      description:
        "Jenkins remains the incumbent across a large share of Pune enterprise and services accounts, so this course teaches it properly rather than treating it as legacy. Declarative pipeline syntax, stages and parallelism, credentials binding, and the multibranch pipeline model.\n\nShared libraries are the module's centre — how large organisations remove duplication across hundreds of pipelines — followed by running Jenkins agents on Kubernetes, and artefact management with Nexus, Artifactory or GHCR.",
      topics: [
        "Declarative pipeline syntax, stages and parallelism",
        "Jenkinsfile in version control and multibranch pipelines",
        "Credentials binding and secret handling",
        "Shared libraries — structure, versioning, reuse",
        "Jenkins agents on Kubernetes",
        "Pipeline patterns — build, test, scan, deploy",
        "Artefact management — Nexus, Artifactory, GHCR",
        "Migrating a Jenkins pipeline to GitHub Actions",
      ],
    },
    {
      title: "Terraform & Infrastructure as Code",
      weekRange: "Week 9",
      description:
        "Infrastructure defined, reviewed and versioned like application code. Terraform 1.7+ providers, resources, variables and outputs; remote state with locking and why state is the thing you protect above all else; modules for reuse; and workspaces for environment separation.\n\nThe operational half is what most courses omit — drift detection and remediation, importing resources someone created by hand, targeted applies during an incident, and `plan` output read as a code-review artefact. OpenTofu is covered as the licence-safe alternative.",
      topics: [
        "Providers, resources, variables, outputs, locals",
        "Remote state, locking and state security",
        "Modules — authoring, versioning, registry use",
        "Workspaces and environment separation",
        "terraform plan as a code-review artefact",
        "Drift detection and remediation",
        "Importing hand-created infrastructure",
        "Terragrunt overview for large estates",
        "OpenTofu as a licence-safe alternative",
      ],
    },
    {
      title: "GitOps with Argo CD",
      weekRange: "Week 10",
      description:
        "The deployment model most Kubernetes-first teams have converged on: Git as the single source of truth, with an in-cluster agent reconciling reality toward it. Argo CD Application CRDs, sync policies, automated versus manual sync, self-healing and pruning, and how drift surfaces in the UI.\n\nApplicationSets handle multi-cluster and multi-environment generation, and promotion patterns — dev to staging to production — are built as a repository structure rather than a set of manual steps. Flux is covered comparatively.",
      topics: [
        "GitOps principles and the reconciliation model",
        "Argo CD architecture and Application CRDs",
        "Sync policies, self-healing and pruning",
        "Health checks and sync waves",
        "ApplicationSets for multi-cluster generation",
        "Promotion patterns — dev, staging, production",
        "Secret handling in GitOps repositories",
        "Flux compared with Argo CD",
      ],
    },
    {
      title: "Metrics & Alerting — Prometheus and Grafana",
      weekRange: "Week 10",
      description:
        "Prometheus architecture, the pull model, exporters, scrape configuration and service discovery — then PromQL taught properly, because the difference between a useful alert and a noisy one is almost always the query. Operators, functions, rate versus increase, recording rules and their cost.\n\nAlertmanager covers routing, grouping, inhibition and silences. Grafana dashboards are built against the USE method and the Four Golden Signals rather than assembled from whatever panels look impressive.",
      topics: [
        "Prometheus architecture, storage and the pull model",
        "Exporters, scrape configs and service discovery",
        "PromQL — selectors, operators, functions",
        "rate, increase, histograms and quantiles",
        "Recording rules and query cost",
        "Alerting rules and alert design",
        "Alertmanager — routing, grouping, inhibition, silences",
        "Grafana dashboards — USE method and Four Golden Signals",
        "kube-prometheus-stack deployment",
      ],
    },
    {
      title: "Logs, Traces & OpenTelemetry",
      weekRange: "Week 11",
      description:
        "The other two pillars. Loki for logs with LogQL, label cardinality as the thing that decides whether a logging stack stays affordable, and structured logging conventions applied at the application side. Tempo for distributed traces, span context propagation, and reading a trace to find the slow hop.\n\nOpenTelemetry ties it together as the vendor-neutral instrumentation standard — SDKs, the collector, and correlating a metric spike to the logs and traces behind it. The week ends with an on-call simulation against a deliberately broken cluster.",
      topics: [
        "Loki architecture and LogQL",
        "Label cardinality and logging cost control",
        "Structured logging conventions",
        "Tempo and distributed tracing fundamentals",
        "Span context propagation across services",
        "OpenTelemetry SDKs and the collector",
        "Correlating metrics, logs and traces",
        "On-call simulation — debugging a controlled outage",
      ],
    },
    {
      title: "Kubernetes Security & Software Supply Chain",
      weekRange: "Week 11",
      description:
        "Security applied to everything already built. Pod Security Standards and Pod Security Admission, policy enforcement with OPA Gatekeeper or Kyverno, and runtime detection with Falco. RBAC revisited adversarially — what a compromised service account can actually reach.\n\nSecrets management moves beyond Kubernetes Secrets to Sealed Secrets and the External Secrets Operator. The supply-chain half covers image signing with Cosign, SBOM generation, dependency and image scanning in CI, and the admission controls that stop an unsigned image from ever running.",
      topics: [
        "Pod Security Standards and Pod Security Admission",
        "OPA Gatekeeper and Kyverno policy enforcement",
        "Falco for runtime threat detection",
        "RBAC reviewed from an attacker's perspective",
        "Sealed Secrets and the External Secrets Operator",
        "Image signing with Cosign and admission verification",
        "SBOM generation and dependency scanning",
        "Trivy and image scanning gates in CI",
        "Network Policies as a security control",
      ],
    },
    {
      title: "FinOps, Reliability & SRE Practice",
      weekRange: "Week 12",
      description:
        "The practices that turn a DevOps engineer into a platform or SRE hire. Cost visibility with tagging, cost allocation and Kubecost; right-sizing requests and limits from real utilisation data; spot and preemptible capacity for interruptible workloads; and the standard Kubernetes waste list.\n\nReliability follows: SLIs, SLOs and error budgets as a decision-making tool rather than a dashboard, incident response and severity levels, blameless postmortems, and runbooks written to be usable by someone who did not build the system.",
      topics: [
        "Tagging, cost allocation and showback",
        "Kubecost and per-namespace cost attribution",
        "Right-sizing requests and limits from real data",
        "Spot and preemptible capacity strategies",
        "Common Kubernetes waste and how to find it",
        "SLIs, SLOs and error budgets",
        "Incident response, severity levels and escalation",
        "Blameless postmortems",
        "Runbooks and operational documentation",
      ],
    },
    {
      title: "Capstone Project & Placement Preparation",
      weekRange: "Weeks 12–13 + 2 weeks placement prep",
      description:
        "Two weeks of full-time capstone work followed by structured interview preparation. You build and document a complete delivery platform — infrastructure in Terraform, workloads on Kubernetes, GitOps deployment through Argo CD, a full observability stack, and security policy enforced in CI.\n\nInterview preparation is run as three separate rounds because that is how Pune DevOps hiring actually works: a Linux and scripting round, a Kubernetes troubleshooting round against a broken cluster, and a system-design round. Resume, LinkedIn and GitHub polish included.",
      topics: [
        "Capstone implementation, deployment and README",
        "Architecture decision records for the capstone",
        "Linux and scripting mock interview round",
        "Kubernetes troubleshooting round on a broken cluster",
        "System-design round — pipelines, scaling, failure modes",
        "Resume and LinkedIn rewrite for DevOps / SRE / Platform JDs",
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

  roadmapImage: {
    src: "/images/courses/devops-engineering-path-v1.webp",
    width: 1400,
    height: 1064,
    alt: "Ten-stage DevOps Engineering learning path taught at Archer Infotech Pune: Linux and networking covering permissions, systemd, DNS and diagnostics; Bash and Git covering scripting, branching and trunk-based development; Docker covering images, multi-stage builds and registries; Kubernetes covering pods, deployments, services, ingress and RBAC; Helm and operators covering charts, Kustomize and cluster operations; CI/CD covering GitHub Actions, Jenkins pipelines and shared libraries; Terraform and GitOps covering state, modules and Argo CD; observability covering Prometheus, Grafana, Loki and Tempo; security and supply chain covering Kyverno, Falco, Cosign and SBOMs; and FinOps, SRE practice and the capstone platform build.",
    caption:
      "The order this course is taught in. Each stage expands into the modules below — nothing arrives before its prerequisite.",
  },

  syllabusDownload: {
    pdfUrl: "/downloads/devops-engineering-syllabus-v1.pdf",
    title: "DevOps Engineering Course Syllabus — Complete Module List",
    slug: "devops-engineering-syllabus",
    blurb:
      "The complete seventeen-module syllabus as a PDF — Linux administration, networking and Bash, Git and trunk-based development, Docker, Kubernetes workloads and networking, Helm and operators, GitHub Actions and Jenkins, Terraform, GitOps with Argo CD, Prometheus and Grafana, logs and tracing, Kubernetes security and supply chain, FinOps and SRE practice, and the capstone platform build. Everything in it is on this page; the PDF is the portable version.",
    asideBlocks: [
      {
        heading: "What is inside the PDF",
        items: [
          "All seventeen modules in teaching order, week by week across the four-month programme.",
          "The full toolchain topic by topic — Docker, Kubernetes, Helm, Terraform, Argo CD, Jenkins, GitHub Actions, Prometheus, Grafana, Loki and Tempo.",
          "Security and supply-chain coverage most DevOps syllabi omit: Pod Security Admission, Kyverno, Falco, Cosign image signing and SBOM generation.",
          "The three-round interview preparation structure — Linux and scripting, Kubernetes troubleshooting, and system design.",
        ],
      },
      {
        heading: "Roles this syllabus prepares you for",
        items: [
          "DevOps Engineer — the core build, deploy and operate role.",
          "Site Reliability Engineer — SLOs, error budgets and incident response.",
          "Platform Engineer — building the internal delivery platform other teams use.",
          "Cloud / Kubernetes Administrator — cluster operations at scale.",
        ],
      },
    ],
  },

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
