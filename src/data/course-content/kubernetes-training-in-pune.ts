import type { CourseRichContent } from "./types";

export const kubernetesTrainingInPune: CourseRichContent = {
  intro:
    "Kubernetes is the dominant container orchestrator in Pune product engineering and a core requirement on most senior DevOps / SRE / Platform Engineer roles — Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, plus most fintech and SaaS startups run their primary production workloads on it. Archer Infotech's Kubernetes training in Pune teaches the platform as it is actually used in 2026 — Kubernetes 1.30+ (extending toward 1.32 by mid-year), workloads (Deployments, StatefulSets, DaemonSets, Jobs), Services and Ingress (NGINX + Gateway API), Helm 3 and Kustomize, RBAC and Network Policies (Calico / Cilium), persistent storage, observability with Prometheus + Grafana + Loki + OpenTelemetry, plus GitOps with Argo CD. The course doubles as preparation for the Certified Kubernetes Administrator (CKA) exam. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Kubernetes in 2026",
    paragraphs: [
      "Kubernetes is no longer optional for Pune DevOps / SRE / Platform Engineer hiring — it is the single biggest separator between junior and mid-level candidates on every shortlist. Indeed Pune lists more than 700 active Kubernetes-specific roles as of May 2026, with another 1,000+ DevOps / SRE / Platform JDs that list Kubernetes as a hard requirement. The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, Cummins, John Deere ETC, plus the IT services majors with platform-engineering practices. Senior Kubernetes engineers in Pune regularly earn 1.5–2× equivalent-experience pure-developer salaries because the role bundles deep operational expertise with on-call accountability.",
      "What changed in 2026: Kubernetes 1.30+ is the production default, with Sidecar Containers now stable, ValidatingAdmissionPolicy (CEL-based admission control replacing many webhook use cases) GA, and improved native support for AI / GPU workloads via Dynamic Resource Allocation (DRA). Gateway API has eclipsed Ingress as the recommended traffic-routing API for new clusters. eBPF-based networking (Cilium) has become the default CNI in many production deployments, replacing Calico for new clusters. GitOps with Argo CD has become the deployment pattern of choice in Pune product engineering, replacing manual `kubectl apply` workflows. The CKA exam was refreshed to weight troubleshooting and security questions more heavily, with the 2024 changes largely baked in by 2026.",
      "What this means for hiring: 2026 Pune Kubernetes JDs expect K8s 1.28+ at depth (architecture, workloads, services, ConfigMaps / Secrets, RBAC, Network Policies), Helm fluency, basic Argo CD GitOps, one observability stack (Prometheus + Grafana + Loki), troubleshooting at the `kubectl describe / logs / exec / debug` level, and at least one production deployment story. Senior roles add Cilium / eBPF, service mesh basics (Istio / Linkerd), Pod Security Standards, and FinOps via Kubecost. Archer Infotech's curriculum is rebuilt around exactly these expectations — engineering-first, troubleshooting-heavy, certification-ready.",
    ],
    keyPoints: [
      "700+ active Kubernetes-specific roles on Indeed Pune (May 2026)",
      "Another 1,000+ DevOps / SRE / Platform JDs list K8s as a hard requirement",
      "Kubernetes 1.30+ — Sidecars stable, Gateway API, DRA for GPUs",
      "Argo CD GitOps + Cilium eBPF — the modern Pune production pattern",
      "Senior K8s engineers earn 1.5–2× equivalent-experience pure devs",
      "Certification path — CKA (Certified Kubernetes Administrator) included in curriculum",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Working developer wanting to add Kubernetes for senior backend / DevOps / Platform roles",
      "Working DevOps engineer wanting to deepen K8s and add CKA to your resume",
      "System / Linux administrator transitioning into modern Cloud / Container Platform engineering",
      "Working Docker user (production or hobby) wanting to graduate to orchestration",
      "Senior engineer at a Pune company that is migrating to Kubernetes — you need to lead the migration credibly",
      "DevOps practitioner targeting CKA / CKAD / CKS certification path with proper hands-on prep",
    ],
    notForYou: [
      "If you have no Linux command-line comfort — Linux fluency is required from day 1; we run kubectl + Bash + YAML constantly",
      "If you have no Docker experience — take our Docker course first; Kubernetes assumes container fluency from day 1",
      "If you have no programming or scripting background — at least basic Bash / Python is required for the operators / controllers / Helm chart work",
      "If you cannot put in 10–12 hours per week of lab work outside class — Kubernetes is the most lab-heavy of all our tracks",
      "If you only want a CKA certificate sticker with no production-engineering depth — there are cheaper exam-only courses; ours is engineering-first",
      "If you have 4+ years of production K8s with Helm + Argo + service mesh — you'll be under-stretched; talk to us about advanced specialisations (CKS, multi-cluster, service mesh deep dive)",
    ],
  },

  curriculum: [
    {
      title: "Kubernetes Architecture & First Cluster",
      weekRange: "Week 1",
      description:
        "What Kubernetes actually is, taught from first principles. Cover the architecture (control plane: API server, etcd, scheduler, controller manager; data plane: kubelet, kube-proxy, container runtime), the API as the foundation (every K8s feature is just an API resource), and the kubectl mental model. Stand up a local cluster with kind / Minikube and a small managed cluster (EKS or AKS — student's choice), then deploy your first workload. By the end of week 1 every student has two working clusters and can explain the request flow when they run `kubectl apply`.",
      topics: [
        "Kubernetes architecture — control plane and data plane",
        "API server, etcd, scheduler, controller manager",
        "kubelet, kube-proxy, container runtime (containerd)",
        "kubectl essentials and kubeconfig",
        "kind / Minikube for local clusters",
        "Managed clusters — EKS, AKS, GKE basics",
        "First workload — Deployment + Service + Ingress",
        "The K8s extensibility story — CRDs, controllers, operators preview",
      ],
    },
    {
      title: "Workloads — Pods, Deployments, StatefulSets, Jobs",
      weekRange: "Week 2",
      description:
        "The full workload landscape. Pods (the atomic unit), multi-container patterns (sidecars, ambassadors, adapters — and why Sidecar Containers being stable in 1.30 changed lifecycle management), Deployments (the default for stateless apps), ReplicaSets (the layer below), StatefulSets (for stateful workloads — databases, message brokers, anything with stable identity), DaemonSets (for node-level agents — logging, monitoring, networking), Jobs and CronJobs (for batch and scheduled work). Plus the Pod lifecycle (init containers, readiness vs liveness vs startup probes — and the production failure modes of getting these wrong).",
      topics: [
        "Pod basics — single and multi-container",
        "Sidecar Containers (stable in 1.30)",
        "Init containers and ephemeral containers",
        "Probes — readiness, liveness, startup",
        "Deployments — rolling updates, rollbacks, strategy",
        "ReplicaSets and ownership chains",
        "StatefulSets — stable identity, ordered deployment",
        "DaemonSets for node-level agents",
        "Jobs and CronJobs",
      ],
    },
    {
      title: "Services, Ingress, Gateway API & DNS",
      weekRange: "Week 3",
      description:
        "The networking layer that takes the most time to learn deeply. Services (ClusterIP / NodePort / LoadBalancer / Headless — when each fits), kube-proxy modes, Endpoints and EndpointSlices, Service mesh preview (Istio / Linkerd — covered fully in week 8). Ingress with the NGINX Ingress Controller (still the dominant Pune choice), then the new Gateway API (the recommended replacement for Ingress for new clusters in 2026) — Gateway, GatewayClass, HTTPRoute, GRPCRoute. Plus CoreDNS for cluster DNS, the Service / Endpoint resolution flow, and the practical patterns for debugging 'why can't service A talk to service B'.",
      topics: [
        "Service types — ClusterIP, NodePort, LoadBalancer, Headless",
        "Endpoints and EndpointSlices",
        "kube-proxy modes — iptables, ipvs",
        "Ingress with NGINX Ingress Controller",
        "Gateway API — Gateway, HTTPRoute, GRPCRoute",
        "CoreDNS and cluster DNS",
        "Network debugging — `kubectl describe`, `nslookup`, port-forward",
      ],
    },
    {
      title: "Configuration, Secrets & Storage",
      weekRange: "Week 4",
      description:
        "ConfigMaps and Secrets as the K8s configuration primitives, the discipline of separating config from code, immutable ConfigMaps / Secrets for safer rollouts, plus the modern external-secrets pattern (External Secrets Operator + AWS Secrets Manager / Azure Key Vault / Vault). Then storage — Persistent Volumes (PV) and Persistent Volume Claims (PVC), Storage Classes, dynamic provisioning, the CSI driver landscape (EBS / Azure Disk / GCE PD), volume snapshots, and the StatefulSet + Postgres / Kafka / Redis pattern with proper persistence.",
      topics: [
        "ConfigMaps and Secrets — basics and patterns",
        "Immutable ConfigMaps / Secrets",
        "External Secrets Operator + cloud secret stores",
        "Sealed Secrets for GitOps",
        "Persistent Volumes and Persistent Volume Claims",
        "Storage Classes and dynamic provisioning",
        "CSI drivers — EBS, Azure Disk, longhorn",
        "Volume snapshots and restore",
        "StatefulSet + Postgres / Redis / Kafka patterns",
      ],
    },
    {
      title: "Helm 3, Kustomize & Operators",
      weekRange: "Week 5",
      description:
        "The packaging and templating tools. Helm 3 (the de-facto package manager) — chart structure, values, templates, hooks, dependencies, OCI registry support, plus the discipline of writing Helm charts that scale to multi-environment deployment without copy-paste. Kustomize for the patches-and-overlays alternative pattern (built into kubectl, simpler for some teams). Operators and Custom Resource Definitions (CRDs) — what they are, when they are over-engineering, and when they are essential. We deploy kube-prometheus-stack via Helm as a real production observability install.",
      topics: [
        "Helm 3 — charts, values, templates, hooks",
        "Helm chart dependencies",
        "OCI registry support for Helm",
        "Kustomize — bases, overlays, patches",
        "Helm vs Kustomize — when to use which",
        "Custom Resource Definitions",
        "Operator pattern and operator SDK basics",
        "kube-prometheus-stack deployment via Helm",
      ],
    },
    {
      title: "RBAC, Network Policies & Pod Security",
      weekRange: "Week 6",
      description:
        "Security as the senior-DevOps differentiator. RBAC — Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, ServiceAccounts, the discipline of least-privilege role design. Network Policies — the deny-by-default pattern, namespace isolation, egress control, plus the Calico vs Cilium choice for the underlying CNI (Cilium with eBPF has become the production default for new clusters in 2026). Pod Security Standards (the replacement for the deprecated PodSecurityPolicy) and Pod Security Admission. Plus the new ValidatingAdmissionPolicy (CEL-based) which is replacing many webhook use cases.",
      topics: [
        "RBAC — Roles, ClusterRoles, bindings",
        "ServiceAccounts and tokens",
        "Network Policies — ingress and egress",
        "Calico vs Cilium — choosing the CNI",
        "Cilium / eBPF networking",
        "Pod Security Standards and Pod Security Admission",
        "ValidatingAdmissionPolicy (CEL-based, GA in 1.30)",
        "Image security — Trivy, cosign signatures",
      ],
    },
    {
      title: "Observability — Prometheus, Grafana, Loki, OpenTelemetry",
      weekRange: "Week 7",
      description:
        "The observability stack the Pune SRE community has settled on. Prometheus metrics with PromQL, recording rules, alerting rules, Alertmanager integration to PagerDuty / Opsgenie / Slack. Grafana dashboards (and the discipline of designing dashboards humans can actually use during an incident — Brendan Gregg's USE method, Google's Four Golden Signals, RED for services). Loki for logs with LogQL, Tempo for distributed traces, and OpenTelemetry as the instrumentation standard. We finish with a controlled-outage simulation — the trainer breaks something on the cluster and the class debugs it together using these tools.",
      topics: [
        "Prometheus architecture and exporters",
        "PromQL — operators, functions, recording rules",
        "ServiceMonitors and PodMonitors (Prometheus Operator)",
        "Alertmanager and on-call integration",
        "Grafana dashboards — USE / RED / Four Golden Signals",
        "Loki + LogQL for logs",
        "Tempo for distributed traces",
        "OpenTelemetry instrumentation",
        "On-call simulation — controlled outage",
      ],
    },
    {
      title: "GitOps with Argo CD, Service Mesh & Capstone Prep",
      weekRange: "Week 8",
      description:
        "The deployment pattern of choice in Pune product engineering — Argo CD with Application CRDs, ApplicationSets for multi-cluster fanout, sync policies, hooks, and the dev → staging → prod promotion pattern that mature teams actually use. Then a service mesh primer — Istio (the most-asked) and Linkerd (the simpler) — at the level you need to discuss them in interviews. Plus FinOps via Kubecost for cluster spend, Pod Disruption Budgets and Cluster Autoscaler / Karpenter for production resilience. Capstone project setup begins.",
      topics: [
        "Argo CD — Application CRDs, sync policies",
        "ApplicationSets for multi-cluster",
        "Promotion patterns — dev → staging → prod",
        "Sealed Secrets and External Secrets in GitOps",
        "Service mesh primer — Istio vs Linkerd",
        "FinOps via Kubecost",
        "Pod Disruption Budgets",
        "Cluster Autoscaler and Karpenter",
        "Capstone setup and scope review",
      ],
    },
    {
      title: "Capstone Project & CKA Exam Preparation",
      weekRange: "Weeks 9–10 + 1 week placement prep",
      description:
        "Two weeks of full-time capstone work plus structured CKA preparation. Pick one of three capstone projects (see Capstone Projects). For exam prep we run the CKA-style hands-on troubleshooting drills (the exam is 100% performance-based — fixing broken clusters under time pressure), two full-length mock exams under timed conditions, plus the kubectl shortcuts and aliases that save 10+ minutes on the real exam. Mock interviews target Pune Kubernetes hiring panels — Persistent, BMC, Bajaj Finserv, Synechron, BMW TechWorks. Includes a troubleshooting mock round, an architecture / scenario round, and a behavioural round. Resume / LinkedIn / GitHub polish included.",
      topics: [
        "Capstone implementation, deployment, README",
        "CKA-style hands-on troubleshooting drills",
        "Two full-length timed mock CKA exams",
        "kubectl shortcuts and aliases for time savings",
        "Cluster troubleshooting mock round",
        "K8s architecture / scenario mock round",
        "Resume + LinkedIn rewrite for K8s / Platform JDs",
        "GitHub portfolio polish — Helm charts, Argo apps, Grafana dashboards",
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
      title: "Production-Grade Cluster with kube-prometheus-stack + Argo CD",
      description:
        "A complete production-style Kubernetes cluster on EKS / AKS — cluster provisioned via Terraform, Argo CD installed via Helm and managing itself (the App-of-Apps pattern), three sample workloads (web frontend, REST API, worker) deployed via Helm charts in a Git repository, kube-prometheus-stack for metrics, Loki for logs, Sealed Secrets / External Secrets for credential management, NGINX Ingress with cert-manager for TLS, plus a small Network Policy baseline. The full cluster stands up via Terraform + Argo CD bootstrap and tears down clean. Outcome: a public GitHub repository with the cluster definition, Helm charts, and Grafana dashboards exported as JSON.",
      technologies: [
        "Terraform 1.7+",
        "EKS or AKS",
        "Argo CD with App-of-Apps",
        "Helm 3 charts",
        "kube-prometheus-stack",
        "Loki + Tempo",
        "Sealed Secrets / External Secrets",
        "cert-manager + NGINX Ingress",
      ],
    },
    {
      title: "Multi-Tenant Platform with Network Policies + Cilium",
      description:
        "A multi-tenant Kubernetes platform — three tenant namespaces with strict Network Policy isolation (deny-by-default ingress + egress), per-tenant RBAC and ResourceQuotas, Cilium as the CNI for eBPF observability (Hubble for live traffic visualisation), Pod Security Standards enforced, and a small admin Operator built with kubebuilder that manages tenant lifecycle. Demonstrates the patterns Pune Platform Engineer roles hire on — multi-tenant, secure, observable, extensible.",
      technologies: [
        "Cilium with Hubble",
        "Network Policies (deny-by-default)",
        "Pod Security Standards",
        "RBAC + ResourceQuotas",
        "Operator built with kubebuilder",
        "External Secrets Operator",
      ],
    },
    {
      title: "GitOps Multi-Environment Promotion with Argo CD",
      description:
        "A complete GitOps deployment platform — Argo CD with ApplicationSets managing dev / staging / prod environments, Helm charts with environment-specific values, automated promotion via PR-driven flow (PR for dev, tag for staging, manual approval for prod), Sealed Secrets for credential management in Git, plus a Slack notification integration on sync events. Demonstrates the deployment pattern of choice in Pune product engineering and is the artefact that opens senior Platform Engineer interviews.",
      technologies: [
        "Argo CD + ApplicationSets",
        "Helm 3 with multi-env values",
        "Sealed Secrets",
        "GitHub Actions for PR flow",
        "Slack notifications",
        "Optional: Argo Rollouts for canary",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the DevOps / Cloud-Native tracks at Archer Infotech). Amol ships Kubernetes manifests and Helm charts daily and personally leads every session of every batch — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Kubernetes Administrator, Platform Engineer, and SRE are among the highest-paid technical roles in Pune in 2026 — Indeed Pune lists 700+ active Kubernetes-specific openings, plus another 1,000+ DevOps / SRE / Platform JDs that list Kubernetes as a hard requirement. Senior compensation regularly exceeds equivalent-experience full-stack developer offers because the role bundles deep operational expertise with on-call accountability. The biggest Pune employers are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, Cummins, John Deere ETC, plus the IT services majors with platform-engineering practices.",
      "What pulls a Kubernetes engineer above the median band: a public GitHub repository with a real Argo CD GitOps deployment, demonstrable Helm chart authoring, one production observability stack you can defend, troubleshooting depth (the CKA-style hands-on skills), and the CKA certificate. Our capstone projects and certification track are designed exactly around these signals.",
      "Senior Platform Engineer / SRE bands at the top end are reported as national figures (Pune-specific Indeed pages do not exist for those roles); Pune trends within ±10% of these figures based on AmbitionBox and 6figr.",
    ],
    salaryBands: [
      {
        role: "Kubernetes Administrator (Pune)",
        band: "₹8,40,000 per year average",
        source: {
          label: "Indeed Pune (Kubernetes Administrator)",
          url: "https://in.indeed.com/career/kubernetes-administrator/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Junior Kubernetes Engineer (Pune entry, <2 years)",
        band: "₹5,00,000 – ₹8,00,000 per year",
        source: {
          label: "AmbitionBox Pune Kubernetes Engineer",
          url: "https://www.ambitionbox.com/profile/kubernetes-engineer-salary-in-pune",
        },
      },
      {
        role: "Mid-level Platform / DevOps Engineer with K8s (Pune, 3–5 years)",
        band: "₹14,00,000 – ₹22,00,000 per year",
        source: {
          label: "Glassdoor Pune Platform Engineer",
          url: "https://www.glassdoor.co.in/Salaries/pune-platform-engineer-salary-SRCH_IL.0,4_IM1072_KO5,22.htm",
        },
      },
      {
        role: "Senior Site Reliability Engineer (Pune, 5–8 years)",
        band: "₹18,00,000 – ₹30,00,000 per year",
        source: {
          label: "Glassdoor Pune SRE",
          url: "https://www.glassdoor.co.in/Salaries/pune-site-reliability-engineer-salary-SRCH_IL.0,4_IM1072_KO5,30.htm",
        },
      },
      {
        role: "Lead / Staff Platform Engineer (national, 8+ years)",
        band: "₹30,00,000 – ₹55,00,000 per year",
        source: {
          label: "6figr India Lead Platform Engineer (Pune ±10%)",
          url: "https://6figr.com/in/salary/lead-platform-engineer--t",
        },
      },
    ],
    hiringCompanies: [
      "Persistent Systems",
      "BMC Software",
      "Bajaj Finserv",
      "Synechron",
      "BMW TechWorks India",
      "Mercedes-Benz R&D India",
      "Mastercard Pune Tech Hub",
      "Cummins India",
      "John Deere ETC",
      "Honeywell",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
      "Atos / Eviden",
      "Mphasis",
    ],
    rolesAfterCourse: [
      "Kubernetes Administrator",
      "Site Reliability Engineer (SRE)",
      "Platform Engineer",
      "DevOps Engineer (Kubernetes-focused)",
      "Cloud-Native Engineer",
      "Junior Cluster Operator",
      "Container Platform Engineer",
    ],
  },

  modesAndDuration: {
    duration:
      "8 weeks of structured curriculum plus 2 weeks of capstone project work and CKA / interview preparation (~2.5 months total)",
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
        "Personal AWS / Azure sandbox for managed-cluster labs",
        "GitHub for code, Helm chart, and Argo CD manifest reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~4 months instead of 2.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's manifests and Helm charts personally. Classroom batches start every 4 weeks; weekend batches every 6 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. The CKA exam voucher (USD ~395 / ~₹33,000, often discounted via CNCF promotions) is paid directly by the student and is not part of our fee. Cloud sandbox spend (managed-cluster labs) typically runs ₹500–₹1,500 across the course.",
    range:
      "₹20,000 – ₹90,000 — the higher end covers placement-track classroom batches with full CKA mock-exam track, multi-tenant + GitOps capstones, and extended interview prep; the lower end covers concession-eligible online or weekend formats.",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2–3 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Placement support starts from week 6 of the course, not at the end. By the time you finish the curriculum, your resume highlights real Argo CD GitOps work, your GitHub has a deployable cluster + Helm + Grafana reference repository, and you have completed at least three mock technical interviews against question banks from Pune Kubernetes / Platform hiring teams.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, the institutes that do guarantee tend to bury the conditions in fine print. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions if your first round of interviews does not land.",
    ],
    process: [
      "Week 6 — resume and LinkedIn rewrite, calibrated for K8s / Platform / SRE JDs",
      "Week 7 — GitHub portfolio cleanup, Helm chart polish, Grafana dashboard exports",
      "Weeks 8–9 — CKA-style troubleshooting drills, architecture mock rounds",
      "Weeks 9–10 — three rounds of mock technical interviews",
      "Week 10 — HR mock interview and salary negotiation coaching",
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
      "Cummins",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
  },

  comparison: {
    intro:
      "We compare ourselves against typical Pune Kubernetes training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Personal cloud sandbox per student",
        archer: "Yes — managed cluster (EKS / AKS) + local kind / Minikube",
        typical: "Shared institute account or screen-share only",
      },
      {
        feature: "Kubernetes version covered",
        archer: "Kubernetes 1.30+ — Sidecars, Gateway API, ValidatingAdmissionPolicy",
        typical: "Often 1.24 or 1.26, no recent feature coverage",
      },
      {
        feature: "Helm 3 depth",
        archer: "Charts, dependencies, OCI registries, real production deployment",
        typical: "Helm install commands only, no chart authoring",
      },
      {
        feature: "GitOps coverage",
        archer: "Argo CD + ApplicationSets + promotion patterns hands-on",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Networking deep-dive",
        archer: "Cilium / eBPF, Network Policies, Gateway API",
        typical: "Calico basics only or skipped",
      },
      {
        feature: "Observability hands-on",
        archer: "Prometheus + Grafana + Loki + OpenTelemetry deployed and dashboarded",
        typical: "Slides on what Prometheus is, no actual deployment",
      },
      {
        feature: "Security + Pod Security Standards",
        archer: "RBAC + Network Policies + Pod Security Standards + Trivy + cosign",
        typical: "RBAC basics only or skipped",
      },
      {
        feature: "CKA preparation",
        archer: "CKA-style hands-on drills + two full-length mock exams",
        typical: "Topic list with no timed performance-based practice",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Helm charts + Argo apps + Grafana dashboards",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student Helm charts and Argo CD applications before you pay.",
  },

  versusAlternative: {
    heading: "Kubernetes vs Docker — Which Should You Learn First?",
    paragraphs: [
      "Kubernetes vs Docker is the most-asked question by candidates who have heard both buzzwords. The honest answer: they solve different problems. Docker (the container runtime + image format) is the prerequisite; Kubernetes (the orchestrator) is what you graduate to once you know Docker. You do not pick between them — you learn Docker first, then add Kubernetes.",
      "Pune market reality: pure Docker-only roles are rare; Kubernetes roles assume Docker fluency. Indeed Pune lists 700+ Kubernetes-specific openings vs 200+ Docker-only — and many of those Docker-only roles are at companies that haven't moved to Kubernetes yet (a shrinking pool).",
      "Honest recommendation: if you have no container experience, take our Docker course first — 1.5 months, foundational. Then take this Kubernetes course as the next step. Skipping Docker and going straight to Kubernetes wastes the first three weeks because everything in Kubernetes assumes Docker fluency. Many of our DevOps students take Docker → Kubernetes back-to-back; the combined learning is roughly 4 months and produces a hire-ready DevOps / Platform Engineer profile.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: Docker fluency (Dockerfile authoring, multi-stage builds, Compose at a working level — if you have not used Docker production-style, take our Docker course first), Linux command-line comfort, basic Bash / Python scripting, and willingness to commit 10–12 hours per week of lab work outside class. Working DevOps engineers, backend developers with Docker experience, and Linux administrators typically slot in well; pure Windows-administrator candidates with no container background should do Docker + Linux foundations first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 15% of K8s enquirers because Docker / Linux foundation isn't yet there)",
      "Confirm enrolment and complete pre-course orientation (Docker, kubectl, kind / Minikube install scripts; AWS / Azure account creation guide for managed-cluster labs)",
      "Show up to day one with a laptop running 64-bit Linux / macOS / Windows-with-WSL2, 16GB+ RAM (recommended for local clusters), and Docker Desktop or Docker Engine pre-installed",
    ],
  },

  faqs: [
    {
      question: "Which is the best Kubernetes training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student Helm charts and Argo CD applications on GitHub, and (3) name companies that hired their last 5 batches. Compare on those three.",
    },
    {
      question: "How long does Kubernetes training in Pune take at Archer Infotech?",
      answer:
        "Approximately 2.5 months — 8 weeks of structured curriculum plus 2 weeks of capstone project and CKA / interview preparation. The weekend batch stretches over ~4 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary of a Kubernetes Engineer in Pune?",
      answer:
        "Indeed Pune reports an average of ₹8.40 lakh per year for Kubernetes Administrator. Junior Kubernetes Engineer Pune entry sits at ₹5–8 lakh per year per AmbitionBox. Mid-level Platform / DevOps Engineers with K8s (3–5 years) earn ₹14–22 lakh per Glassdoor. Senior SREs (5–8 years) earn ₹18–30 lakh. Lead / Staff Platform Engineers earn ₹30–55 lakh nationally with Pune trending within ±10%.",
    },
    {
      question: "What is the fee for the Kubernetes course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. The higher end covers placement-track classroom batches with full CKA mock-exam track and extended interview prep; the lower end covers concession-eligible online or weekend formats. Cloud sandbox spend across the course typically runs ₹500–₹1,500 (paid directly to AWS / Azure). The CKA exam voucher (~₹33,000) is paid directly to CNCF.",
    },
    {
      question: "Does the course prepare me for the CKA certification?",
      answer:
        "Yes — CKA preparation is woven through the curriculum and concentrated in weeks 9–10. Two full-length timed mock exams plus CKA-style hands-on troubleshooting drills are part of the course. Most students who complete the lab work seriously pass the live exam on first attempt.",
    },
    {
      question: "Should I learn Docker first?",
      answer:
        "Yes — Docker fluency is required from day 1. We do not start from 'what is a container'. If you have not used Docker production-style (Dockerfile authoring, multi-stage builds, Compose), take our Docker course first; that is 1.5 months and ramps you up to the level this course assumes.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production-grade cluster with kube-prometheus-stack + Argo CD on EKS / AKS, (2) multi-tenant platform with Network Policies + Cilium + custom Operator, (3) GitOps multi-environment promotion with Argo CD + ApplicationSets. All three become public GitHub repositories with cluster manifests, Helm charts, and Grafana dashboard exports.",
    },
    {
      question: "Do I get my own cluster during the course?",
      answer:
        "Yes — every student runs a local kind / Minikube cluster from day 1 plus a managed cluster (EKS or AKS — student's choice) for production-realistic exercises. Cloud spend stays under ₹1,500 across the course if you tear down resources after labs (which we drill the discipline of).",
    },
    {
      question: "Is Argo CD / GitOps covered?",
      answer:
        "Yes — week 8 is dedicated to Argo CD with ApplicationSets and the dev → staging → prod promotion pattern. Capstone Projects #1 and #3 use Argo CD as the deployment driver. GitOps has become the deployment standard in Pune product engineering; we treat it as core, not advanced.",
    },
    {
      question: "What about service mesh — Istio / Linkerd?",
      answer:
        "Service mesh is covered at primer depth in week 8 — what it is, when it earns its complexity, what Istio and Linkerd each do. We do not deep-dive Istio in this course because it would deserve a separate 4-week track; service mesh interview questions at the primer level are what most Pune K8s panels ask, and we cover that fully.",
    },
    {
      question: "Are weekend Kubernetes classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~4 months instead of 2.5. Same content, same trainer, same labs and capstone. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "How does this course compare to your DevOps course?",
      answer:
        "The DevOps course is the broader programme — Linux + Git + Docker + K8s + CI/CD + Terraform + Observability + Security + FinOps over 3 months. This Kubernetes course is the focused deep-dive — 2.5 months on Kubernetes specifically with CKA prep included. Pick the DevOps course if you are starting fresh and need the broad foundation; pick this course if you already have Linux / Docker / CI/CD covered and want K8s depth + CKA.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for Kubernetes / SRE / Platform Engineer roles (troubleshooting + architecture + behavioural rounds), referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. If your first round of interviews does not land, you can sit in on a future batch's interview-prep sessions free of charge.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads every session of every batch from Day 1 through capstone — he ships Kubernetes manifests and Helm charts daily and brings real production patterns into the classroom. The same name on this page is the same person you meet on day one; his LinkedIn is on the trainer profile page, and we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Kubernetes training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 4–6 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course is right for you. Visit our Kothrud, Pune campus, see actual student Helm charts and Argo CD applications, meet a current batch, and decide with full information.",
  },
};
