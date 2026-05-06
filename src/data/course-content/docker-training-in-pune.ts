import type { CourseRichContent } from "./types";

export const dockerTrainingInPune: CourseRichContent = {
  intro:
    "Docker is the foundational container technology every modern Pune software team ships with — from product engineering at Persistent Systems and BMC Software to BFSI workloads at Bajaj Finserv and Synechron, fintech / SaaS startups, and the captive engineering centres of BMW TechWorks, Mercedes-Benz R&D, Cummins, and John Deere ETC. Archer Infotech's Docker training in Pune teaches the platform as it is actually used in 2026 — Docker Engine and Docker Desktop, modern Dockerfile authoring with BuildKit and Buildx, multi-stage builds, distroless and Alpine-based minimal images, Docker Compose for local-dev stacks, plus container security with Trivy, image signing with cosign, and the production hygiene that prevents the most common 'works on my machine' failure modes. The course is the right standalone introduction for developers and the natural prerequisite for our Kubernetes and DevOps tracks. Classroom in Kothrud, online live, and weekend batches available.",

  whyLearn: {
    heading: "Why Learn Docker in 2026",
    paragraphs: [
      "Docker is no longer a tool — it is the lingua franca of how software is shipped. Every Pune backend developer JD lists Docker as expected (not preferred); every DevOps / SRE / Platform Engineer JD lists it as a hard requirement; every Pune product company packages services in containers as the production default. Indeed Pune lists more than 1,500 active openings that mention Docker as a required skill, spanning Backend Developer, Full Stack Developer, DevOps Engineer, SRE, Cloud Engineer, and ML Engineer titles. The biggest employers are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, Cummins, John Deere ETC, plus the Pune SaaS / fintech scene (Amagi, Fyllo, BharatPe Pune, Razorpay Pune).",
      "What changed in 2026: BuildKit is the production default for image builds (faster, parallel, secret-aware, cache-efficient), Docker Buildx ships multi-platform image builds out of the box (linux/amd64 + linux/arm64 for Apple Silicon and Graviton), distroless and Alpine-based minimal images have eclipsed full Ubuntu / Debian for production use cases, Docker Compose v2 (YAML-spec stable, no more docker-compose vs docker compose confusion), and Docker Scout has matured for built-in image scanning. Trivy remains the open-source default for security scans, and cosign is the standard for signing images in supply-chain-aware production. Apple Silicon native support is fully stable.",
      "What this means for hiring: 2026 Pune Docker JDs expect Dockerfile authoring at the multi-stage level (not just `FROM ubuntu` and `apt install`), Docker Compose for local-dev fluency, image security awareness (non-root user, minimal base, vulnerability scanning), basic registry usage (Docker Hub, ECR, ACR, GHCR), and the ability to debug 'why doesn't my container start' from first principles. Senior roles add multi-platform builds, supply-chain hygiene (cosign, SBOM), and containerised CI/CD patterns. Archer Infotech's curriculum is rebuilt around exactly these expectations — production-realistic, security-aware, multi-platform-ready.",
    ],
    keyPoints: [
      "1,500+ Pune Indeed JDs list Docker as a required skill (May 2026)",
      "BuildKit + Buildx multi-platform — the 2026 production default",
      "Distroless / Alpine minimal images — security and image-size discipline",
      "Trivy + cosign + SBOM — supply-chain security baseline",
      "Right standalone course OR prerequisite for our Kubernetes / DevOps tracks",
    ],
  },

  whoIsThisFor: {
    forYou: [
      "Engineering, BCS, MCA, or BSc-CS student who wants to add Docker before joining a backend or DevOps role",
      "Working backend / full-stack developer wanting to add containerisation to your skill stack",
      "Working developer at a Pune company that is migrating to containers — you need to lead packaging credibly",
      "DevOps / sysadmin practitioner wanting Docker depth before tackling Kubernetes",
      "Working professional preparing to take our Kubernetes or DevOps course — Docker is the prerequisite",
      "QA engineer wanting to containerise test environments and CI pipelines",
    ],
    notForYou: [
      "If you have no Linux command-line comfort — basic Linux fluency is required from day 1; we run docker / bash / Linux constantly",
      "If you have no programming background — at least basic familiarity with one language is required",
      "If you cannot put in 6–8 hours per week of practice outside class — Docker is learned by building and breaking, not watching",
      "If you only want a certificate sticker with no portfolio — Pune hiring screens hard on real Dockerfiles and deployed images",
      "If you have 2+ years of production Docker / multi-stage build authoring with BuildKit — you'll be under-stretched; jump directly to our Kubernetes or DevOps course",
    ],
  },

  curriculum: [
    {
      title: "Containers, Images & Docker Engine",
      weekRange: "Week 1",
      description:
        "What containers actually are, taught from first principles. Cover containers vs virtual machines (the practical difference, not the slide deck), Linux namespaces and cgroups (just enough to demystify), Docker Engine architecture (daemon, CLI, containerd, runc), images vs containers (the immutable vs mutable distinction), and the OCI image format that has standardised the ecosystem. Set up Docker Desktop or Docker Engine on Linux, then build the mental model — pull, run, exec, logs, ps, inspect — until every student can navigate Docker without a cheat sheet. We finish with a small exercise running and inspecting 5 real-world images (Postgres, Redis, NGINX, Node, Python).",
      topics: [
        "Containers vs VMs — the practical distinction",
        "Linux namespaces and cgroups (intuition only)",
        "Docker Engine architecture — daemon, containerd, runc",
        "OCI image format — what's in an image",
        "Docker Desktop vs Docker Engine — Linux / macOS / Windows",
        "Core CLI — pull, run, exec, logs, ps, inspect, stop, rm",
        "Volume bind mounts vs named volumes",
        "Network basics — bridge, host, none",
      ],
    },
    {
      title: "Dockerfile Authoring & BuildKit",
      weekRange: "Week 2",
      description:
        "Writing Dockerfiles the way production engineers actually write them. Cover every instruction (FROM, RUN, COPY, ADD, ENTRYPOINT, CMD, ENV, ARG, WORKDIR, EXPOSE, HEALTHCHECK, USER, LABEL), the layer cache and how to design Dockerfiles that maximise cache hits (the order of COPY and RUN matters more than you think), .dockerignore, and BuildKit (the modern build engine — parallel layer builds, secret-aware build args, build-time mounts). Plus the discipline that separates working containers from production-ready ones — pinning versions, using non-root users, providing healthchecks, setting proper signal handlers.",
      topics: [
        "Every Dockerfile instruction — when each is right",
        "Layer cache and instruction ordering",
        ".dockerignore and what to exclude",
        "BuildKit features — parallel builds, secrets, mounts",
        "ARG vs ENV — build-time vs runtime",
        "ENTRYPOINT vs CMD — when each fits",
        "HEALTHCHECK and graceful shutdown",
        "USER and the non-root discipline",
      ],
    },
    {
      title: "Multi-Stage Builds, Minimal Images & Multi-Platform",
      weekRange: "Week 3",
      description:
        "The week that separates senior Docker authors from copy-paste authors. Multi-stage builds — using a builder stage with the full toolchain and a runtime stage with only the binary, the pattern that takes a 1.2GB Java / Node / Python image down to under 100MB. Distroless images (gcr.io/distroless) for the security-first path. Alpine-based images and the musl libc trade-offs. Then multi-platform builds with Buildx — building linux/amd64 + linux/arm64 (the latter is increasingly important for Apple Silicon dev and AWS Graviton production). We finish with the patterns for popular language runtimes — Java with jlink, Node with the slim base, Python with the wheel-pre-built path, Go with the static-binary distroless pattern.",
      topics: [
        "Multi-stage builds — builder + runtime separation",
        "Distroless images for minimal attack surface",
        "Alpine vs distroless vs slim — choosing the base",
        "Buildx for multi-platform builds (amd64 + arm64)",
        "Language-specific patterns — Java, Node, Python, Go, .NET",
        "Image size diet — measuring and reducing",
        "Reproducible builds — lock files and pinned tags",
      ],
    },
    {
      title: "Docker Compose for Local Development",
      weekRange: "Week 4",
      description:
        "The local-dev backbone every Pune developer uses. Docker Compose v2 (the docker compose plugin, no more standalone docker-compose) — services, networks, volumes, depends_on with health-conditioned waiting, healthchecks, secrets, profiles for opt-in services, override files for env-specific config. Build a complete local-dev stack — Postgres + Redis + your app + Adminer for DB inspection — that mirrors what you would deploy to production. We cover the patterns for common stacks (Node + Postgres, Java + Postgres + Kafka, Python + Postgres + Celery + Redis) and the discipline of keeping Compose files small and reviewable.",
      topics: [
        "docker compose v2 — services, networks, volumes",
        "depends_on with health-conditioned waits",
        "Healthchecks and graceful startup ordering",
        "Compose secrets and env files",
        "Profiles for opt-in services",
        "Override files for env-specific config",
        "Reference stacks — Node + PG, Java + PG + Kafka, Python + Celery",
        "Production-grade `docker compose up` patterns",
      ],
    },
    {
      title: "Networking, Volumes & Storage",
      weekRange: "Week 5",
      description:
        "Container networking and storage at the level you will use daily. Network drivers (bridge — the default, host — when it's right, none — when it's right, overlay — for Swarm, macvlan — for advanced cases), user-defined bridge networks (the right default for multi-container apps, automatic DNS resolution between containers), port publishing, plus the discipline of not using `--network host` when bridge would do. Volumes — named volumes vs bind mounts, the data-only-container pattern (largely retired), volume drivers, plus the patterns for stateful services (Postgres, Redis, Elasticsearch) where data persistence matters.",
      topics: [
        "Bridge, host, overlay, macvlan, none — when each fits",
        "User-defined bridge networks",
        "Container-to-container DNS resolution",
        "Port publishing and -p flag",
        "Named volumes vs bind mounts",
        "Volume drivers and remote storage",
        "Stateful container patterns — Postgres, Redis, ES",
        "Backup and restore via volumes",
      ],
    },
    {
      title: "Security, Registries, CI/CD & Production",
      weekRange: "Week 6 + 1 week capstone / interview prep",
      description:
        "The senior-Docker differentiators that separate production-ready containers from working-on-my-machine ones. Container security — non-root users (covered earlier, deepened here), read-only root filesystems, capability dropping, seccomp profiles, image vulnerability scanning with Trivy and Docker Scout, image signing with cosign, SBOM generation. Registries — Docker Hub, Amazon ECR, Azure Container Registry, Google Artifact Registry, GitHub Container Registry — when each fits, authentication patterns, retention and lifecycle. CI/CD — GitHub Actions building and pushing multi-platform images via OIDC, Docker layer caching to keep CI under 5 minutes. Plus the capstone project (see Capstone Projects).",
      topics: [
        "Non-root users and read-only root filesystems",
        "Capability dropping and seccomp",
        "Trivy + Docker Scout for image scanning",
        "cosign for image signing",
        "SBOM generation (syft / docker scout)",
        "Registries — Docker Hub, ECR, ACR, GAR, GHCR",
        "GitHub Actions with OIDC for image publish",
        "Docker layer caching in CI",
        "Capstone implementation, deployment, README",
        "Resume + LinkedIn rewrite + HR mock interview",
      ],
    },
  ],

  projects: [
    {
      title: "Production-Grade Containerisation of a Real Application",
      description:
        "Take a real backend application (Spring Boot, FastAPI, Node.js / Express, or .NET — your choice or one we provide) and containerise it from scratch the production-correct way — multi-stage Dockerfile (builder + runtime), distroless or Alpine runtime image, non-root user, healthcheck, signal handling for graceful shutdown, multi-platform build (linux/amd64 + linux/arm64 via Buildx), Trivy scan in the CI pipeline, cosign-signed image pushed to GHCR via GitHub Actions OIDC. Plus a Docker Compose stack pairing the app with Postgres + Redis for local dev. Outcome: a public GitHub repository with the Dockerfile, Compose file, GitHub Actions pipeline, and a clickable image registry link — exactly what Pune backend / DevOps hiring panels look at first.",
      technologies: [
        "Docker Engine + BuildKit",
        "Docker Buildx for multi-platform",
        "Distroless or Alpine runtime images",
        "Docker Compose v2",
        "Trivy + Docker Scout",
        "cosign for signing",
        "GitHub Actions with OIDC",
        "GitHub Container Registry (GHCR)",
      ],
    },
    {
      title: "Local-Dev Compose Stack for a Microservices Application",
      description:
        "A complete docker compose stack for a small microservices system — three services (web frontend, API backend, worker), Postgres + Redis + RabbitMQ, healthchecks driving service-startup ordering via depends_on conditions, Compose profiles for optional services (Adminer for DB inspection, MailHog for email testing), .env-driven configuration, plus a small bootstrap script that seeds the database. The stack must come up in under 60 seconds with `docker compose up`. Demonstrates the patterns Pune product engineering teams hire on for local-dev tooling.",
      technologies: [
        "Docker Compose v2",
        "Multi-service stack with healthchecks",
        "Postgres + Redis + RabbitMQ",
        "Compose profiles",
        "Adminer + MailHog for dev tooling",
        "Bootstrap scripts",
      ],
    },
    {
      title: "Multi-Architecture Image Pipeline for OSS Project",
      description:
        "Pick or fork a real open-source project and add a complete container image pipeline — multi-stage Dockerfile, multi-platform builds via Buildx (linux/amd64 + linux/arm64 + linux/arm/v7 for IoT), GitHub Actions matrix-build pipeline that publishes signed images to GHCR on every release tag, automated Trivy + cosign workflow, and an SBOM attached to each image. Includes a small README that shows users how to pull and verify the signature. Optional: contribute the pipeline back to the upstream project. Demonstrates the patterns Pune product engineering teams expect on senior containerisation work.",
      technologies: [
        "Docker Buildx multi-platform",
        "GitHub Actions matrix builds",
        "GHCR with signed images",
        "Trivy + cosign in CI",
        "SBOM generation",
        "Conventional Commits + semantic-release",
      ],
    },
  ],

  trainersIntro:
    "Your batch is led by Amol Patil (Senior Corporate Trainer, 10+ years, lead for the DevOps / Kubernetes / Cloud-Native tracks at Archer Infotech). Amol writes Dockerfiles and Compose stacks daily and personally leads every session of every batch — the name you see here is the name you meet on day one.",

  careerOutcomes: {
    paragraphs: [
      "Docker fluency is now expected on every modern Pune developer JD, not optional. Indeed Pune lists 1,500+ active openings that list Docker as required, spanning backend, full-stack, DevOps, SRE, Cloud Engineer, and ML Engineer titles. Docker alone rarely makes you a 'Docker engineer' — but it is the foundation that opens all of those job families. The biggest employers across that range are Persistent Systems, BMC Software, Bajaj Finserv, Synechron, BMW TechWorks India, Mercedes-Benz R&D India, Mastercard Pune Tech Hub, Cummins, John Deere ETC, plus the Pune SaaS / fintech scene.",
      "What pulls a candidate above the median band on Docker fluency: a public GitHub repository with a real multi-stage Dockerfile + multi-platform build pipeline, demonstrable security awareness (non-root, minimal base, Trivy scan), and one production deployment story. Our capstone projects are designed exactly around these signals.",
      "Docker is the prerequisite for higher-paying specialisations — Kubernetes Engineer, Platform Engineer, SRE — where compensation runs significantly above generic Backend / Cloud titles. Most of our Docker graduates take our Kubernetes or DevOps course within 3–6 months as the depth specialisation.",
    ],
    salaryBands: [
      {
        role: "Backend Developer (Pune, Docker required)",
        band: "₹6,93,500 per year average",
        source: {
          label: "Indeed Pune (Backend Developer)",
          url: "https://in.indeed.com/career/back-end-developer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "DevOps Engineer (Pune)",
        band: "₹7,07,950 per year average",
        source: {
          label: "Indeed Pune (DevOps Engineer)",
          url: "https://in.indeed.com/career/devops-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Cloud Engineer (Pune)",
        band: "₹6,72,490 per year average",
        source: {
          label: "Indeed Pune (Cloud Engineer)",
          url: "https://in.indeed.com/career/cloud-engineer/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Kubernetes Administrator (Pune, Docker prerequisite)",
        band: "₹8,40,000 per year average",
        source: {
          label: "Indeed Pune (Kubernetes Administrator)",
          url: "https://in.indeed.com/career/kubernetes-administrator/salaries/Pune--Maharashtra",
        },
      },
      {
        role: "Senior SRE / Platform Engineer (national, 5–8 years)",
        band: "₹18,00,000 – ₹30,00,000 per year",
        source: {
          label: "6figr India Senior SRE (Pune ±10%)",
          url: "https://6figr.com/in/salary/senior-site-reliability-engineer--t",
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
      "Amagi",
      "Fyllo",
      "TCS",
      "Infosys",
      "Cognizant",
      "Capgemini",
    ],
    rolesAfterCourse: [
      "Backend Developer (with Docker fluency)",
      "Junior DevOps Engineer",
      "Junior Cloud Engineer",
      "Build / Release Engineer",
      "QA Automation Engineer (with containerised tests)",
      "Software Engineer with platform-engineering trajectory",
      "Prerequisite met for Kubernetes / DevOps / SRE specialisations",
    ],
  },

  modesAndDuration: {
    duration:
      "6 weeks of structured curriculum plus 1 week of capstone project and interview preparation (~1.5 months total)",
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
        "Docker Desktop or Docker Engine per student",
        "GitHub for Dockerfile and Compose reviews",
        "Slack / WhatsApp for asynchronous Q&A",
      ],
    },
    weekend: {
      timing: ["Saturday + Sunday, 09:00 to 13:00"],
      durationNote:
        "Stretches over ~2.5 months instead of 1.5 to accommodate working professionals. Same content, lower weekly load.",
    },
    batchPolicy:
      "Maximum 15 students per batch — small enough that the trainer reviews every student's Dockerfiles and Compose stacks personally. Classroom batches start every 3 weeks; weekend batches every 5 weeks.",
  },

  fees: {
    note:
      "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and any applicable concession — Docker as a 1.5-month foundational course typically lands at the lower-mid end of that range. Kindly reach us for the current 2026 quote — we calibrate by early-bird timing, group enrolment, and returning-alumni concessions. Most students take Docker as a stepping stone to Kubernetes / DevOps; ask about the bundled Docker + Kubernetes pricing for combined enrolment.",
    range:
      "₹20,000 – ₹90,000 (Docker, as a focused 1.5-month course, typically lands at the lower end of the range; combined Docker + Kubernetes / DevOps enrolment offers significant bundle savings)",
    paymentOptions: [
      "Single payment with early-bird discount",
      "EMI in 2 instalments at no extra cost",
      "Corporate sponsorship — invoiced to your employer with GST",
      "Bundled Docker + Kubernetes or Docker + DevOps enrolment with discount",
    ],
  },

  placementSupport: {
    paragraphs: [
      "Docker alone is a foundational skill rather than a standalone hireable specialisation; placement focus for Docker graduates is calibrated accordingly. By the end of the curriculum your resume highlights real multi-stage Dockerfile authoring, your GitHub has at least one production-style containerisation repository, and you have completed at least two mock technical interviews focused on backend / DevOps roles where Docker is part of the broader stack.",
      "We say placement support, not placement guarantee — for two honest reasons. First, no institute can guarantee a hire when the final decision is the company's. Second, Docker alone rarely lands the offer; it is the foundation that strengthens applications for backend, DevOps, or platform roles. Our support is unconditional, time-bound (six months after course completion), and includes free re-entry to a future batch's interview-prep sessions. Most Docker graduates progress directly to our Kubernetes or DevOps course for the depth specialisation that turns Docker fluency into a hireable role.",
    ],
    process: [
      "Week 5 — resume and LinkedIn rewrite, highlighting Docker fluency for backend / DevOps JDs",
      "Week 6 — GitHub portfolio cleanup, Dockerfile / Compose / image registry links",
      "Week 7 — two rounds of mock technical interviews (Docker-aware backend / DevOps angles)",
      "Week 7 — HR mock interview and salary negotiation coaching",
      "Post-course — referrals via our 17-year alumni network at 12+ partner companies",
      "Strong recommendation to enrol in our Kubernetes or DevOps course as the natural next step",
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
      "We compare ourselves against typical Pune Docker training institutes on factual rows only — no logos, no opinions. Use this as a checklist when evaluating any institute.",
    rows: [
      {
        feature: "Trainer named on course page with photo and LinkedIn",
        archer: "Yes — Amol Patil",
        typical: "No — generic 'expert trainers' branding",
      },
      {
        feature: "Docker engine version covered",
        archer: "Modern Docker with BuildKit + Buildx + Compose v2 default",
        typical: "Older Docker with docker-compose v1 still demonstrated",
      },
      {
        feature: "Multi-stage build authoring",
        archer: "Full week — builder + runtime, distroless, language-specific patterns",
        typical: "Mentioned as 'advanced', skipped or rushed",
      },
      {
        feature: "Multi-platform builds with Buildx",
        archer: "Yes — linux/amd64 + linux/arm64 hands-on with Apple Silicon students",
        typical: "Not covered",
      },
      {
        feature: "Image security",
        archer: "Trivy + Docker Scout + cosign + non-root + read-only root FS — full module",
        typical: "Not covered or marketing-only mention",
      },
      {
        feature: "Production patterns covered",
        archer: "Healthchecks, signal handling, layer-cache discipline, registry hygiene",
        typical: "Demo-app focus only, no production discipline",
      },
      {
        feature: "CI/CD integration with Docker",
        archer: "GitHub Actions with OIDC + signed image publish to GHCR",
        typical: "Not covered or generic CI/CD overview",
      },
      {
        feature: "Public GitHub portfolio output",
        archer: "Yes — Dockerfiles + Compose + signed images on GHCR",
        typical: "Local Dockerfiles never published",
      },
      {
        feature: "Bundled pricing with Kubernetes / DevOps",
        archer: "Yes — Docker + K8s / Docker + DevOps bundles with discount",
        typical: "Per-course pricing only",
      },
      {
        feature: "Salary data shown",
        archer: "Cited from Indeed Pune + 6figr with source URLs",
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
      "Compare with whoever you are considering — we welcome the comparison. The right test is whether you can see actual student Dockerfiles and signed images on a public registry before you pay.",
  },

  versusAlternative: {
    heading: "Should I Take Docker as a Standalone Course or Bundle With Kubernetes / DevOps?",
    paragraphs: [
      "Docker as a standalone 1.5-month course is the right fit if you (1) are a working backend developer who needs to containerise existing services and ship production-grade Dockerfiles, (2) are preparing for our Kubernetes or DevOps course but want a focused Docker foundation first, or (3) have a specific Docker-heavy role coming up where you need to be production-ready in 6 weeks.",
      "Bundling Docker with Kubernetes (combined ~4 months) is the right fit if your goal is a Kubernetes Administrator, Platform Engineer, or SRE role — Docker alone won't get you there, and the combined Docker → Kubernetes path is what hiring panels actually shortlist for. Bundling Docker with our DevOps course (combined ~4.5 months) is the right fit if your goal is a broader DevOps Engineer / SRE role that includes CI/CD, IaC, observability, and security alongside containers.",
      "Honest recommendation: if you are a working developer wanting Docker-only depth, take this course standalone. If you are targeting DevOps / Platform / SRE roles, talk to us about the bundled path — it is significantly more cost-effective than enrolling separately and produces a stronger hireable profile.",
    ],
  },

  prerequisitesAndStart: {
    paragraphs: [
      "Prerequisites: basic Linux command-line comfort, basic familiarity with at least one programming language (any — C, C++, Java, Python, JavaScript, Go, .NET), and willingness to commit 6–8 hours per week of practice outside class. We do NOT require prior container experience — we start from `docker pull hello-world` in week 1. If you are a working backend or full-stack developer, you are well-prepared; pure non-developers should do a Linux + scripting foundation first.",
    ],
    suggestedSteps: [
      "Decide your mode — classroom in Kothrud, online live, or weekend",
      "Check the upcoming batch dates on our batch schedule page",
      "Book a free 30-minute counselling call — we will honestly tell you whether the course fits your goal (we say no to roughly 10% of enquirers because Linux foundation isn't yet there)",
      "Confirm enrolment and complete pre-course orientation (Docker Desktop or Docker Engine install scripts, GitHub account, VS Code setup)",
      "Show up to day one with a laptop running 64-bit Linux / macOS / Windows-with-WSL2, 8GB+ RAM, and Docker Desktop or Docker Engine pre-installed (we provide an install script)",
    ],
  },

  faqs: [
    {
      question: "Which is the best Docker training institute in Pune?",
      answer:
        "We can't honestly answer 'best' for ourselves. The test that works: ask any institute you are considering to (1) name the trainer who will teach your batch and show their LinkedIn, (2) show real student Dockerfiles and signed images published to a public registry, and (3) name companies that hired their last 5 batches (or where their Docker graduates went on to take Kubernetes / DevOps). Compare on those three.",
    },
    {
      question: "How long does Docker training in Pune take at Archer Infotech?",
      answer:
        "Approximately 1.5 months — 6 weeks of structured curriculum plus 1 week of capstone project and interview preparation. The weekend batch stretches over ~2.5 months at the same content depth, designed for working professionals.",
    },
    {
      question: "What is the salary impact of learning Docker?",
      answer:
        "Docker fluency is foundational rather than a standalone specialisation — but it strengthens applications for Backend Developer (Pune average ₹6.94 lakh on Indeed), DevOps Engineer (₹7.08 lakh), Cloud Engineer (₹6.72 lakh), and as the prerequisite for Kubernetes Administrator (₹8.40 lakh). Senior SRE / Platform Engineer roles where Docker / Kubernetes are core run ₹18–30 lakh nationally.",
    },
    {
      question: "What is the fee for the Docker course in Pune?",
      answer:
        "Course fees range from ₹20,000 to ₹90,000 depending on mode (classroom / online / weekend), batch type, and applicable concession. Docker as a 1.5-month focused course typically lands at the lower end of this range. We offer significant bundle discounts when Docker is enrolled alongside our Kubernetes or DevOps courses — talk to us about combined pricing.",
    },
    {
      question: "Do I need Linux experience to learn Docker?",
      answer:
        "Yes — basic Linux command-line comfort is required from day 1. We do not start from 'what is a terminal'. If you are new to Linux, work through a basic Linux course first; we politely turn away candidates who are not yet at the basic-Linux level.",
    },
    {
      question: "Should I take Docker before Kubernetes?",
      answer:
        "Yes — Docker is the prerequisite. Our Kubernetes course assumes Docker fluency from day 1; skipping Docker and going straight to Kubernetes wastes the first three weeks because every Kubernetes concept builds on container fundamentals. Many of our DevOps students take Docker → Kubernetes back-to-back; the combined learning is ~4 months and produces a hire-ready DevOps / Platform Engineer profile.",
    },
    {
      question: "Will I work on real projects?",
      answer:
        "Yes — three capstone projects: (1) production-grade containerisation of a real backend application with multi-stage build, multi-platform image, signed publish to GHCR, (2) local-dev Compose stack for a microservices system, (3) multi-architecture image pipeline for an OSS project. All three become public GitHub repositories with images published to a public registry that you can reference in interviews.",
    },
    {
      question: "Are BuildKit and Buildx covered?",
      answer:
        "Yes — BuildKit (the modern build engine) is treated as the production default throughout the course, not as 'advanced'. Buildx for multi-platform builds (linux/amd64 + linux/arm64 + linux/arm/v7) is covered hands-on, with Apple Silicon students cross-building amd64 images and amd64 students cross-building arm64. Multi-platform builds are increasingly expected on Pune product engineering JDs.",
    },
    {
      question: "Is image security / supply-chain coverage included?",
      answer:
        "Yes — week 6 covers Trivy and Docker Scout for vulnerability scanning, cosign for image signing, SBOM generation, plus the run-time defences (non-root user, read-only root filesystem, capability dropping, seccomp). Image security has become a standard ask on Pune DevSecOps and senior backend interviews; we cover it deeply enough that you can defend the choices.",
    },
    {
      question: "Is Docker Compose covered?",
      answer:
        "Yes — week 4 is a full module on Docker Compose v2 (the modern docker compose plugin, no more standalone docker-compose v1). Capstone Project #2 is a complete multi-service Compose stack. Compose remains the right tool for local-dev and small-scale production deployments; we cover it deeply enough that you can stand up reference stacks for any common backend pattern.",
    },
    {
      question: "Are weekend Docker classes available in Pune?",
      answer:
        "Yes — Saturday and Sunday, 09:00–13:00, stretched over ~2.5 months instead of 1.5. Same content, same trainer, same labs and capstone. Designed for working professionals who cannot attend weekday batches.",
    },
    {
      question: "Should I take this course or your DevOps course?",
      answer:
        "Take this Docker course if you want a focused 1.5-month foundational on containers specifically. Take our DevOps course (3 months) if you want the broader programme — Linux + Git + Docker + Kubernetes + CI/CD + Terraform + Observability + Security + FinOps. Most candidates targeting DevOps / Platform / SRE roles take the DevOps course; Docker as a standalone fits working backend developers who need containerisation depth without the broader DevOps scope.",
    },
    {
      question: "What about Docker Swarm?",
      answer:
        "Docker Swarm is briefly covered as a comparison point with Kubernetes but is not the focus. Pune production deployments have overwhelmingly standardised on Kubernetes (Swarm has effectively been retired by Mirantis, the current Docker maintainer). We cover Swarm at the level of 'know what it is, why teams have moved off it' — not as a production tool you should adopt in 2026.",
    },
    {
      question: "What support do I get after course completion?",
      answer:
        "Six months of active placement support — mock interviews calibrated for backend / DevOps roles where Docker fluency is part of the stack, referrals via our alumni network at 12+ partner companies, resume / LinkedIn / GitHub rewrites, and salary negotiation coaching. Most importantly, strong recommendation and bundled discount to enrol in our Kubernetes or DevOps course as the natural depth specialisation.",
    },
    {
      question: "Is the named trainer actually teaching, or are they just on the brochure?",
      answer:
        "Amol Patil personally leads every session of every batch from Day 1 through capstone — he writes Dockerfiles and Compose stacks daily and brings real production patterns into the classroom. The same name on this page is the same person you meet on day one; his LinkedIn is on the trainer profile page, and we welcome a 30-minute conversation with him before you enrol.",
    },
  ],

  finalCta: {
    heading: "Ready to start Docker training in Pune?",
    paragraph:
      "We have classroom, online, and weekend batches starting every 3–5 weeks. Reach out via the enquiry form or call us — Amol is happy to spend 30 minutes telling you whether the course is right for you, or whether the bundled Docker + Kubernetes / Docker + DevOps path makes more sense for your goal. Visit our Kothrud, Pune campus, see actual student Dockerfiles and signed images on public registries, meet a current batch, and decide with full information.",
  },
};
