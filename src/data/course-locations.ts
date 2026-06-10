/**
 * P4-16 — Course × Location combination landing pages.
 *
 * Programmatic-SEO matrix that pairs flagship courses with Pune
 * neighbourhoods where the query intent is highest. Each combo entry
 * is a single landing page at `/courses/in/[slug]` that:
 *   - Targets the specific compound query ("java full stack training
 *     in hinjewadi", "mern stack classes in kothrud", etc.)
 *   - References the canonical course + location pages so the link
 *     graph compounds (course detail → combo → location hub and
 *     reverse via internal links)
 *   - Carries a localised intro paragraph + FAQs tuned to the
 *     specific neighbourhood
 *
 * Spec: 40 pages (P4-16 60h target). First batch ships 5 high-impact
 * combos picked from the GSC opportunity buckets:
 *   - DevOps queries → /courses/cloud-devops at pos 61, 134i/0c
 *   - Full Stack queries → /courses/full-stack-development at 74, 114i/1c
 *   - Java queries → /courses/programming/java-training-in-pune at 49
 *   Plus the Hinjewadi/Kothrud/Baner location pages that already get
 *   impressions for "<course> course in <location>" tail queries.
 *
 * Route: /courses/in/[slug] (server-rendered, sitemap-included).
 */

export interface CourseLocationCombo {
  slug: string;
  /** Matches courses[].slug — used to resolve canonical course data. */
  courseSlug: string;
  /** Matches neighbourhoods[].slug — used to resolve canonical
   *  location data. */
  locationSlug: string;
  /** Short display name for cards, e.g. "Java Full Stack in Hinjewadi". */
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 2-3 paragraph intro localising the course to the neighbourhood. */
  intro: string[];
  /** Why-Pune-area context: hiring partners, GCC captives, employer
   *  proximity, transit patterns. */
  whyHere: string[];
  /** Combo-specific FAQs (commute, batch format fit for the area,
   *  local employer mention). */
  faqs: { question: string; answer: string }[];
}

export const courseLocations: CourseLocationCombo[] = [
  // ─── 1. Java Full Stack in Hinjewadi ──────────────────────────────────────
  // Hinjewadi is THE Pune IT corridor — Infosys, TCS, Wipro, Cognizant
  // and 100+ GCC captives. "Java Full Stack" is the most-hired pattern
  // for Hinjewadi MNC drives.
  {
    slug: "java-full-stack-in-hinjewadi",
    courseSlug: "java-full-stack-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "Java Full Stack in Hinjewadi",
    metaTitle: "Java Full Stack Training in Hinjewadi (2026)",
    metaDescription:
      "Java Full Stack Training in Hinjewadi area — Archer Infotech. Spring Boot + microservices + React + placement assistance at Pune's largest IT corridor MNCs. Online + classroom batches.",
    h1: "Java Full Stack Training in Hinjewadi, Pune",
    intro: [
      "Hinjewadi is Pune's largest IT corridor — home to Infosys, TCS, Wipro, Cognizant, Capgemini, Tech Mahindra, Persistent Systems and 100+ Global Capability Centres (GCCs). The Java Full Stack stack — core Java + Spring Boot + microservices + React + MongoDB/PostgreSQL — is the single most-hired pattern at Hinjewadi MNC drives. Archer Infotech runs the same flagship Java Full Stack track that Hinjewadi-bound students from COEP, PICT, VIT, PCCOE and JSPM RSCOE consistently complete and convert into Hinjewadi placements.",
      "Our Kothrud centre is about 25 km from Hinjewadi (40-50 min by two-wheeler off-peak, longer in peak hours). Most Hinjewadi-area learners join our live-online (live instructor-led) batches — same curriculum, same projects, same placement support as classroom. For students who want occasional in-person time, Saturday classroom + weekday online is a common pattern.",
      "Whether you're an engineering student at a Hinjewadi-belt college, a working professional in a Hinjewadi MNC looking to up-skill, or a fresher targeting Hinjewadi placements, this track gives you the production-grade Java + Spring Boot + React depth that hiring panels at Infosys, TCS, Wipro, Persistent and the GCC captives actually screen on.",
    ],
    whyHere: [
      "Java Full Stack is the single most-hired Pune pattern — 70%+ of Hinjewadi MNC fresher offers in 2024-25 went to Java/Spring Boot candidates",
      "Live-online format eliminates the Hinjewadi-Kothrud commute so you can attend classes from home or the Hinjewadi co-working space",
      "Trainers have 10+ years at Pune MNCs including the exact Hinjewadi-belt companies you're targeting — interview prep maps to their question patterns",
      "100+ active hiring partner network includes the major Hinjewadi MNCs and GCCs — referrals come from our placement team, not bulk applications",
      "Pune's Java Full Stack fresher band is ₹4-6 LPA with top performers crossing ₹10 LPA at Hinjewadi GCC captives",
    ],
    faqs: [
      {
        question: "Where exactly does Archer run Java Full Stack classes in Hinjewadi?",
        answer:
          "Our classroom centre is in Kothrud (10 km from central Hinjewadi, ~25 km from Hinjewadi Phase 1/2). Most Hinjewadi-area students attend live-online batches — same instructors, projects, Q&A and placement support as classroom. For occasional in-person time, Saturday classroom + weekday online is a common pattern.",
      },
      {
        question: "Which Hinjewadi companies hire Java Full Stack freshers?",
        answer:
          "Infosys, TCS, Wipro, Cognizant, Capgemini, Tech Mahindra, Persistent Systems, plus 100+ GCC captives operating from Hinjewadi Phase 1, 2 and 3. Java + Spring Boot + microservices is the single most-screened stack at their fresher drives.",
      },
      {
        question: "Will live-online cover the same content as classroom?",
        answer:
          "Yes — exactly the same curriculum, project work, mock interviews and placement support. Multi-year placement data shows identical outcomes when students engage consistently. Most Hinjewadi-area students prefer online for the commute savings.",
      },
      {
        question: "How long does the Java Full Stack course take?",
        answer:
          "Flagship Java Full Stack runs 4-6 months (depending on batch pace), including 8-10 production-quality projects, GitHub workflow, mock interview reps, and placement assistance. Most students join the placement pipeline immediately after completion.",
      },
      {
        question: "Will Archer help me with Hinjewadi-belt placement drives?",
        answer:
          "Yes. Hinjewadi MNC drives are exactly the placement path our flagship Java Full Stack track is optimised for. Mock interviews, resume polish, recruiter introductions and 100+ hiring partner referrals are included.",
      },
      {
        question: "What does Java Full Stack training in Hinjewadi cost?",
        answer:
          "Our flagship Java Full Stack track has the same fee structure regardless of student location — competitive Pune market rates with EMI options. Ask the admissions team during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 2. MERN Stack in Kothrud ─────────────────────────────────────────────
  // Kothrud is Archer's home neighbourhood — easy classroom commute,
  // strong product startup + GCC presence in adjacent Karve Nagar / Bavdhan.
  {
    slug: "mern-stack-in-kothrud",
    courseSlug: "mern-stack-training-in-pune",
    locationSlug: "it-training-in-kothrud",
    shortLabel: "MERN Stack in Kothrud",
    metaTitle: "MERN Stack Training in Kothrud, Pune (2026)",
    metaDescription:
      "MERN Stack Training in Kothrud — Archer Infotech (Kothrud centre). MongoDB + Express + React + Node.js with placement assistance at Pune product startups and GCCs. Classroom + online batches.",
    h1: "MERN Stack Training in Kothrud, Pune",
    intro: [
      "Kothrud is one of Pune's densest education belts — MIT-WPU, Cummins COE for Women, multiple coaching centres, and now Archer Infotech's flagship centre. The MERN Stack — MongoDB, Express, React, Node.js — is the modern JavaScript pattern that Pune product startups and GCC captives screen for most often. Archer Infotech's MERN Stack track runs from our Kothrud centre with both classroom and live-online batches.",
      "Living in Kothrud means classroom batches are typically 5-15 minutes away — the most common pattern for Kothrud students is 2 evenings + Saturday morning at our centre, with LMS lifetime access for exam-week catchup. The Kothrud→Karve Nagar→Bavdhan belt also concentrates Pune's product-startup ecosystem (Druva, Quick Heal, MindTickle, plus newer GCCs), so career proximity is part of the value here.",
      "Whether you're a student at MIT-WPU or Cummins COE, a Kothrud-resident working professional pivoting into modern JS, or a fresher targeting Pune product startups, MERN Stack is the closest-aligned full-stack track for that target list.",
    ],
    whyHere: [
      "Kothrud students can attend in-person 2-3 times a week with minimal commute — typical 5-15 min from anywhere in Kothrud",
      "MERN Stack is the most-hired pattern at Pune product startups + GCC captives in the Kothrud-Bavdhan-Hinjewadi corridor",
      "Trainers have 10+ years of MERN production work at Pune product companies and GCC captives — what they teach maps directly to those hiring panels",
      "100+ hiring partner network includes product startups + GCCs that hire MERN freshers; placement team runs targeted introductions",
      "Pune MERN fresher band is ₹4-6 LPA with top performers at product companies crossing ₹10 LPA",
    ],
    faqs: [
      {
        question: "Where is Archer's Kothrud centre exactly?",
        answer:
          "Our centre is just off Karve Road in Kothrud, near Natraj Gas Agency in the Londhe Wada / Chaitanya Nagar area. Most Kothrud students reach us in 5-15 minutes by two-wheeler, rickshaw or PMPML. Walking is feasible from many parts of Kothrud.",
      },
      {
        question: "Which Pune companies hire MERN Stack freshers?",
        answer:
          "Pune product startups (Druva, Quick Heal, MindTickle, plus newer Y-Combinator and Sequoia-backed startups), GCC captives in Hinjewadi and Kharadi, and many of the 100+ active hiring partners in our placement network. MERN is most popular at product-focused employers; Java FS dominates services MNC hiring.",
      },
      {
        question: "How does the MERN track compare to Java Full Stack for Pune jobs?",
        answer:
          "Java Full Stack opens the widest Pune services-MNC pipeline (TCS, Infosys, Persistent enterprise teams). MERN is sharper for product startups, GCC captives, and modern engineering teams. For Kothrud-based students specifically, MERN has slightly stronger proximity-fit because of the local product ecosystem.",
      },
      {
        question: "Can I switch between classroom and online batches?",
        answer:
          "Yes. Format-switching is supported during the course based on your schedule. Most Kothrud students start classroom + LMS catchup, and shift to live-online during exam weeks or work crunches.",
      },
      {
        question: "How long does the MERN Stack course take?",
        answer:
          "Flagship MERN Stack runs 4-6 months including 8-10 production-quality projects, GitHub workflow, mock interview reps, and placement assistance. Pacing fits semester-by-semester for student learners.",
      },
      {
        question: "What does MERN Stack training in Kothrud cost?",
        answer:
          "Same fee structure as our other flagship tracks — competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 3. DevOps in Hinjewadi ───────────────────────────────────────────────
  // DevOps + Cloud is the fastest-growing Hinjewadi hiring track.
  {
    slug: "devops-in-hinjewadi",
    courseSlug: "devops-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "DevOps in Hinjewadi",
    metaTitle: "DevOps Training in Hinjewadi, Pune (2026)",
    metaDescription:
      "DevOps Training in Hinjewadi area — Archer Infotech. Docker, Kubernetes, Jenkins, Terraform, AWS with placement assistance at Hinjewadi MNCs and GCCs. Live-online + classroom batches.",
    h1: "DevOps Training in Hinjewadi, Pune",
    intro: [
      "DevOps + Cloud is the fastest-growing hiring track in Hinjewadi — Infosys, TCS, Wipro, Cognizant and the Hinjewadi GCC captives have all scaled DevOps + Site Reliability Engineering (SRE) teams aggressively in 2024-25. The stack — Docker, Kubernetes, Jenkins, Terraform, AWS, Linux, Git — is what hiring panels at these companies screen for at fresher DevOps drives. Archer Infotech's flagship DevOps track covers exactly this stack with production-style labs.",
      "Hinjewadi is about 25 km from our Kothrud centre, so most Hinjewadi-area DevOps learners join live-online batches — same curriculum, same hands-on labs, same placement support as classroom. Saturday classroom + weekday online is a common pattern for students who want some in-person time on the harder Kubernetes / Terraform modules.",
      "Whether you're a Hinjewadi MNC employee transitioning from development to DevOps, a fresher targeting DevOps drives, or an engineering student building a DevOps portfolio before campus placements, this track gives you the production stack depth those hiring panels actually screen on.",
    ],
    whyHere: [
      "DevOps + Cloud is the fastest-growing Hinjewadi hiring track — fresher DevOps band is ₹4-6.5 LPA, top performers at GCC captives crossing ₹11 LPA",
      "Live-online format eliminates the Hinjewadi-Kothrud commute; hands-on labs run in cloud sandboxes accessible from anywhere",
      "Trainers have production DevOps experience at Pune MNCs and GCCs — what they teach maps directly to Hinjewadi hiring panels",
      "100+ hiring partner network includes the major Hinjewadi MNCs + GCCs scaling DevOps teams",
      "DevOps + Cloud certifications (AWS Solutions Architect, Kubernetes CKA) pair well with this track — many students stack one or two for additional ROI",
    ],
    faqs: [
      {
        question: "Where exactly does Archer run DevOps classes in Hinjewadi?",
        answer:
          "Our classroom centre is in Kothrud (~25 km from Hinjewadi). Most Hinjewadi-area DevOps students attend live-online batches — same instructors, hands-on labs, projects and placement support. For occasional in-person time, Saturday classroom + weekday online is common.",
      },
      {
        question: "Which Hinjewadi companies hire DevOps freshers?",
        answer:
          "Infosys, TCS, Wipro, Cognizant, Capgemini, Tech Mahindra and 100+ GCC captives in Hinjewadi Phase 1, 2 and 3 — all have scaled DevOps + SRE teams aggressively. Fresher hiring patterns now include Docker + Kubernetes + CI/CD + Cloud as standard screens.",
      },
      {
        question: "Do you cover AWS, Azure or GCP in the DevOps track?",
        answer:
          "AWS is the primary cloud in our DevOps track because it's the most-hired in Hinjewadi. We also cover Azure fundamentals. Students who want deeper cloud specialisation typically pair DevOps with our AWS Solutions Architect track for stronger Hinjewadi GCC applications.",
      },
      {
        question: "How are hands-on labs delivered in live-online format?",
        answer:
          "Labs run in cloud sandboxes — students get their own AWS/Linux/Kubernetes environments accessible from any browser. Hands-on work is identical to classroom; the only difference is you're typing on your own machine instead of a centre desktop.",
      },
      {
        question: "How long does the DevOps course take?",
        answer:
          "Flagship DevOps runs 3-4 months including Docker, Kubernetes, Jenkins, Terraform, AWS, Linux, Git, plus production-style projects and CKA / AWS certification prep. Placement support starts immediately after completion.",
      },
      {
        question: "What does DevOps training in Hinjewadi cost?",
        answer:
          "Same fee structure as our other flagship tracks. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 4. Python in Pimpri-Chinchwad ────────────────────────────────────────
  // Pimpri-Chinchwad belt students often target the Hinjewadi MNCs but
  // start with Python (data, automation, basic web). Strong fit.
  {
    slug: "python-in-pimpri-chinchwad",
    courseSlug: "python-training-in-pune",
    locationSlug: "it-training-in-pimpri-chinchwad",
    shortLabel: "Python in Pimpri-Chinchwad",
    metaTitle: "Python Training in Pimpri-Chinchwad, Pune (2026)",
    metaDescription:
      "Python Training in Pimpri-Chinchwad belt — Archer Infotech. Core Python + Django/Flask + data libraries + interview prep for Hinjewadi MNCs. Live-online + Saturday classroom batches.",
    h1: "Python Training in Pimpri-Chinchwad, Pune",
    intro: [
      "Pimpri-Chinchwad is one of Pune's largest student catchments — PCCOE, DYPCOE, MIT-AOE Alandi and a dense network of engineering and IT colleges, all within striking distance of the Hinjewadi corridor. Python is one of the most accessible entry points into the Pimpri-Chinchwad-to-Hinjewadi career pipeline — it covers Django/Flask backends, FastAPI APIs, Pandas/NumPy data work, and the foundational layer most Data Science and ML roles build on.",
      "Pimpri-Chinchwad is about 30 km from our Kothrud centre, so most students in this belt join our live-online batches (same curriculum, instructors, projects and placement support as classroom). Saturday classroom + weekday online works well for students who want occasional in-person time on harder modules.",
      "Whether you're a college student at PCCOE, DYPCOE or MIT-AOE looking to layer Python on top of your degree, a Pimpri-Chinchwad working professional pivoting into data or backend roles, or a fresher targeting Hinjewadi services-MNC drives, Python is a strong primary or secondary stack pick.",
    ],
    whyHere: [
      "Python is the most accessible entry point for Pimpri-Chinchwad students targeting Hinjewadi MNC and GCC hiring drives",
      "Pairs naturally with Data Science / ML for AI&DS branch students at PCCOE, DYPCOE and MIT-AOE",
      "Live-online format eliminates the 30 km Pimpri-Chinchwad-Kothrud commute; LMS access covers exam-week catchup",
      "Trainers have 10+ years of Python production experience at Pune MNCs and product companies",
      "100+ hiring partner network includes services MNCs (Python automation roles, Django backends), GCC captives (FastAPI APIs, data tooling) and product startups",
    ],
    faqs: [
      {
        question: "Where does Archer run Python classes for Pimpri-Chinchwad students?",
        answer:
          "Our classroom centre is in Kothrud (~30 km from Pimpri-Chinchwad). Most students in this belt attend live-online batches — same instructors, projects and placement support. Saturday classroom + weekday online is also a popular pattern.",
      },
      {
        question: "Will Python alone get me a Pune fresher offer?",
        answer:
          "Python alone is solid for backend (Django/FastAPI), data automation, and entry-level data analyst roles. For higher-band offers, students typically stack Python with one of: a Data Science specialisation, a Django/FastAPI backend specialisation, or AWS for cloud-deployed Python work. We map your target list to the right stack pair in your free demo.",
      },
      {
        question: "Which Pimpri-Chinchwad belt colleges send students to Archer?",
        answer:
          "We see consistent cohorts from PCCOE, DYPCOE, MIT-AOE Alandi, JSPM RSCOE, plus several other colleges in the Hinjewadi-Wakad-Akurdi corridor. The live-online format makes the commute a non-issue.",
      },
      {
        question: "Do you cover the AI&DS branch syllabus?",
        answer:
          "Yes — our Data Science, Machine Learning, and Generative AI tracks pair well with Python and AI&DS coursework. Students typically pick Python as primary + Data Science / ML as a specialisation.",
      },
      {
        question: "How long does the Python course take?",
        answer:
          "Flagship Python runs 2-3 months for core (fundamentals + OOP + data libraries + Django/Flask basics). Add 2 more months if you stack a Data Science or backend specialisation. Pacing is flexible for college students.",
      },
      {
        question: "What does Python training cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 5. AWS in Baner ──────────────────────────────────────────────────────
  // Baner-Balewadi corridor has dense GCC + product startup presence.
  // AWS Solutions Architect is the most-hired cloud certification.
  {
    slug: "aws-in-baner",
    courseSlug: "aws-training-in-pune",
    locationSlug: "it-training-in-baner",
    shortLabel: "AWS in Baner",
    metaTitle: "AWS Training in Baner, Pune (2026)",
    metaDescription:
      "AWS Training in Baner-Balewadi area — Archer Infotech. AWS Solutions Architect cert prep + hands-on labs + placement assistance at Pune GCCs and product startups. Live-online + classroom.",
    h1: "AWS Training in Baner, Pune",
    intro: [
      "Baner-Balewadi is one of Pune's densest GCC and product-startup belts — multiple Fortune 500 GCC captives, dozens of mid-stage product companies, and a growing engineering-team concentration around the Mumbai-Bangalore Expressway corridor. AWS is by a wide margin the most-hired cloud platform across these companies, and AWS Solutions Architect Associate (SAA) is the single most-requested cloud certification for fresher and 0-3 year roles.",
      "Baner is about 15 km from our Kothrud centre — most Baner-area students mix Saturday classroom batches with weekday live-online, which gives the right balance of in-person collaboration on the harder cloud architecture modules and flexibility for hands-on labs done from home or office.",
      "Whether you're a Baner-resident working professional adding AWS to your stack, a developer transitioning to cloud architect roles, or a fresher targeting AWS-heavy hiring panels at the local GCCs and product companies, this track covers the SAA certification curriculum end-to-end plus 10+ production-style architectures.",
    ],
    whyHere: [
      "AWS is the most-hired cloud platform across the Baner-Balewadi GCC and product-startup belt",
      "Solutions Architect Associate (SAA) is the most-screened cloud certification at fresher and 0-3 year hiring panels in this area",
      "Mixed classroom + live-online format fits Baner residents' typical schedule — Saturday in-person, weekday online from home/office",
      "Trainers have production AWS architecture experience at Pune MNCs, GCCs and product companies — what they teach maps to local hiring panels",
      "100+ hiring partner network includes the major Baner-Balewadi GCC captives + product startups hiring AWS-skilled engineers",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from Baner?",
        answer:
          "Roughly 15 km via Pune University Road or NH-48 — typically 25-35 minutes by two-wheeler depending on traffic. Many Baner-area students attend Saturday classroom + weekday live-online for the best balance.",
      },
      {
        question: "Which Baner-Balewadi companies hire AWS-skilled engineers?",
        answer:
          "Multiple Fortune 500 GCC captives, mid-stage product companies (including unicorns and newer Y-Combinator startups), plus the major Pune MNCs running Baner offices. AWS Solutions Architect Associate is the most-screened cert at their fresher and 0-3 year drives.",
      },
      {
        question: "Does the AWS track prep me for the SAA certification exam?",
        answer:
          "Yes — the flagship AWS track is built around the SAA-C03 exam blueprint. Curriculum covers all six exam domains plus 10+ hands-on architectures (VPC, EC2, S3, RDS, Lambda, ECS, CloudFormation, IAM, monitoring, well-architected framework). Most students attempt the exam within 4-6 weeks of completion.",
      },
      {
        question: "How are hands-on labs delivered for AWS?",
        answer:
          "Labs run in your own AWS Free Tier account — we provide step-by-step lab guides and budget controls so you don't accidentally over-spend. Live instructor support during weekday online sessions for blockers.",
      },
      {
        question: "Do you also cover AWS DevOps or Solutions Architect Professional?",
        answer:
          "Our flagship AWS track focuses on SAA (Associate) because that's what local hiring panels screen on. Students who want SAP (Professional) or DevOps Pro can take advanced modules after SAA. Ask admissions during your free demo.",
      },
      {
        question: "What does AWS training in Baner cost?",
        answer:
          "Same fee structure as our other flagship tracks — competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 6. Java in Kothrud ───────────────────────────────────────────────────
  {
    slug: "java-in-kothrud",
    courseSlug: "java-training-in-pune",
    locationSlug: "it-training-in-kothrud",
    shortLabel: "Java in Kothrud",
    metaTitle: "Java Training in Kothrud, Pune (2026)",
    metaDescription:
      "Java Training in Kothrud — Archer Infotech (Kothrud centre). Core Java + OOP + Streams + Concurrency + collections with classroom batches. Foundation for Spring Boot, Android, and Pune Java roles.",
    h1: "Java Training in Kothrud, Pune",
    intro: [
      "Core Java is the foundation that every Pune Java career — Java Full Stack, Spring Boot microservices, Android, enterprise integration — builds on. The MIT-WPU, Cummins COE for Women, and dense Kothrud student population means short-commute Java classes have always been in demand here. Archer Infotech runs the flagship Java track from our Kothrud centre with classroom and live-online formats.",
      "Living or studying in Kothrud means the classroom commute is typically 5-15 minutes — most Kothrud students attend 2 evenings + Saturday morning at the centre with LMS lifetime access for exam-week catchup. This is one of the most popular entry points for students who want strong fundamentals before adding Full Stack, Spring Boot, or Android tracks on top.",
    ],
    whyHere: [
      "Core Java is the foundation layer — solid Java unlocks Java Full Stack, Spring Boot, Android, and enterprise integration paths",
      "Kothrud students reach the centre in 5-15 minutes — easy to attend in-person 2-3 times a week without sacrificing study time",
      "Most-hired skill at Pune services MNCs (TCS, Infosys, Wipro, Persistent enterprise teams)",
      "Trainers have 10+ years of production Java experience at Pune MNCs — what they teach maps directly to hiring panels",
      "Strong base for stacking — many Kothrud students continue from Java into Spring Boot, Java Full Stack, or Android tracks",
    ],
    faqs: [
      {
        question: "Where is Archer's Kothrud centre for Java classes?",
        answer:
          "Off Karve Road, near Natraj Gas Agency in the Londhe Wada / Chaitanya Nagar area. Most Kothrud students reach us in 5-15 minutes by two-wheeler, rickshaw or PMPML.",
      },
      {
        question: "Should I take Core Java or jump straight to Java Full Stack?",
        answer:
          "If you have zero Java exposure, start with Core Java first — Spring Boot and Full Stack become much more learnable once the foundations are solid. If you already have Core Java (college coursework counts if you did the labs), Java Full Stack is the more direct path.",
      },
      {
        question: "Which Pune companies hire Core Java freshers?",
        answer:
          "TCS, Infosys, Wipro, Persistent, Tech Mahindra, Cognizant, Capgemini — all major services MNCs screen on Core Java fundamentals. Pure Java roles are less common than Java Full Stack, but Core Java is the screening gate for both.",
      },
      {
        question: "How long does the Core Java course take?",
        answer:
          "Flagship Core Java runs 2-3 months covering fundamentals, OOP, Collections, Streams, Concurrency, JDBC and basic Spring exposure. Most students continue from here into Spring Boot or Java Full Stack tracks.",
      },
      {
        question: "Will Core Java prepare me for Spring Boot later?",
        answer:
          "Yes — that's exactly the design. Strong Core Java fundamentals (Collections, Streams, Lambdas, Concurrency basics) make Spring Boot dramatically more learnable. Most Kothrud students continue from Core Java into Spring Boot or Java Full Stack.",
      },
      {
        question: "What does Java training in Kothrud cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 7. Python in Hinjewadi ───────────────────────────────────────────────
  {
    slug: "python-in-hinjewadi",
    courseSlug: "python-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "Python in Hinjewadi",
    metaTitle: "Python Training in Hinjewadi, Pune (2026)",
    metaDescription:
      "Python Training for Hinjewadi-area learners — Archer Infotech. Core Python + Django/Flask + Pandas + Hinjewadi MNC interview prep. Live-online + classroom batches.",
    h1: "Python Training in Hinjewadi, Pune",
    intro: [
      "Python's footprint at Hinjewadi MNCs has grown substantially — Infosys, TCS, Wipro, Cognizant, Capgemini and Tech Mahindra all hire Python freshers for automation, Django backends, FastAPI APIs, and data tooling roles. The Hinjewadi GCC captives use Python heavily for data engineering, ML pipelines, and product-team scripting. Archer Infotech's flagship Python track covers the stack hiring panels actually screen on.",
      "Most Hinjewadi-area Python learners join our live-online batches (25 km commute from Kothrud), with Saturday classroom + weekday online a common alternative. The curriculum covers Core Python, OOP, Data Structures, Django, Flask, Pandas, NumPy, and the interview-question patterns Hinjewadi hiring panels use.",
    ],
    whyHere: [
      "Python is one of the highest-volume entry points for Hinjewadi MNC fresher hiring — automation, backend, data tooling",
      "Strong pairing with Data Science / ML for AI&DS branch students targeting Hinjewadi product captives",
      "Live-online format eliminates the 25 km Hinjewadi-Kothrud commute",
      "Trainers have 10+ years of production Python experience at Pune MNCs and product companies",
      "Pune Python fresher band is ₹3.5-6 LPA with top performers crossing ₹10 LPA at GCC captives",
    ],
    faqs: [
      {
        question: "Where does Archer run Python classes for Hinjewadi students?",
        answer:
          "Most Hinjewadi-area Python students attend live-online batches — same instructors, projects, Q&A and placement support as classroom. Saturday classroom + weekday online works for students wanting some in-person time.",
      },
      {
        question: "Which Hinjewadi companies hire Python freshers?",
        answer:
          "Infosys, TCS, Wipro, Cognizant, Capgemini, Tech Mahindra — Python automation and Django backends — plus 100+ GCC captives running data engineering, ML pipelines, and product-team Python work.",
      },
      {
        question: "Python vs Java for a Hinjewadi MNC fresher?",
        answer:
          "Java Full Stack has higher MNC volume; Python opens more breadth across automation, data, and backend roles. Many Hinjewadi-bound students learn Python first (faster onboarding), then add Java FS for the MNC services pipeline.",
      },
      {
        question: "Does the Python track include Django and Flask?",
        answer:
          "Yes — both Django and Flask are covered in the flagship Python track, plus FastAPI fundamentals. Students who want deeper backend focus continue into Python Full Stack.",
      },
      {
        question: "How long is the Python course?",
        answer:
          "Flagship Python runs 2-3 months for core (fundamentals + OOP + data libraries + Django/Flask basics). Add 2 more months for Python Full Stack or Data Science specialisation.",
      },
      {
        question: "What does Python training cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 8. Data Science in Baner ────────────────────────────────────────────
  {
    slug: "data-science-in-baner",
    courseSlug: "data-science-training-in-pune",
    locationSlug: "it-training-in-baner",
    shortLabel: "Data Science in Baner",
    metaTitle: "Data Science Training in Baner, Pune (2026)",
    metaDescription:
      "Data Science Training in Baner — Archer Infotech. Python + Pandas + scikit-learn + TensorFlow + production ML pipelines. Targeting Baner-Balewadi GCCs and product startup data teams.",
    h1: "Data Science Training in Baner, Pune",
    intro: [
      "The Baner-Balewadi corridor concentrates Pune's product-startup data ecosystem — multiple Fortune 500 GCC captives running data engineering and ML platforms, plus mid-stage product companies with dedicated data and analytics teams. Data Science fresher demand here is steady and well-paid — ₹4-7 LPA fresher band with top performers crossing ₹12 LPA at product captives. Archer Infotech's Data Science track covers the end-to-end ML pipeline these companies actually use.",
      "Baner is about 15 km from our Kothrud centre via Pune University Road. The most common pattern for Baner-area Data Science students is Saturday classroom (for the harder ML modules — model architecture, hyperparameter tuning) plus weekday live-online for Python + Pandas + practical assignments. Cloud sandboxes run from any browser.",
    ],
    whyHere: [
      "Baner-Balewadi has the densest Pune concentration of product-startup data teams and Fortune 500 GCC data captives",
      "Data Science fresher band is ₹4-7 LPA with top performers crossing ₹12 LPA at product captives — among the highest-paid fresher roles",
      "Mixed classroom + live-online format fits Baner residents' typical schedule",
      "Trainers have production ML/DS experience at Pune product companies — what they teach maps to local hiring panels",
      "Stacks well with Generative AI track for students targeting the GenAI/RAG hiring wave",
    ],
    faqs: [
      {
        question: "How far is Archer Kothrud from Baner?",
        answer:
          "Roughly 15 km via Pune University Road or NH-48 — typically 25-35 min by two-wheeler. Many Baner students attend Saturday classroom + weekday live-online.",
      },
      {
        question: "Which Baner-Balewadi companies hire Data Science freshers?",
        answer:
          "Multiple Fortune 500 GCC captives (financial services, retail, healthcare analytics), product startups (including unicorns), plus Pune MNCs running their Baner data engineering centres. Both DS roles and ML engineering roles are screened on the same fundamentals.",
      },
      {
        question: "Do I need Python before joining Data Science?",
        answer:
          "Basic Python helps, but the Data Science track includes Python fundamentals as a refresher. Students with zero Python typically add a 1-month Python primer; students with college Python exposure can start directly.",
      },
      {
        question: "Does the track cover deep learning + neural networks?",
        answer:
          "Yes — TensorFlow + PyTorch are covered in the Machine Learning specialisation that follows core Data Science. Many Baner students stack ML on top of DS for the product captive applications.",
      },
      {
        question: "Does this prepare for Generative AI / LLM roles?",
        answer:
          "Data Science + ML is the foundation; for GenAI-specific work (LangChain, RAG pipelines, fine-tuning), students continue into our Generative AI track. The combination is popular among Baner students aiming at the AI product startup wave.",
      },
      {
        question: "How long is the Data Science course?",
        answer:
          "Flagship Data Science runs 4-6 months covering Python, Pandas, NumPy, scikit-learn, deep learning fundamentals, production pipelines and 8-10 portfolio projects. ML specialisation adds 2 more months.",
      },
    ],
  },

  // ─── 9. React in Hinjewadi ────────────────────────────────────────────────
  {
    slug: "react-in-hinjewadi",
    courseSlug: "react-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "React in Hinjewadi",
    metaTitle: "React Training in Hinjewadi, Pune (2026)",
    metaDescription:
      "React Training for Hinjewadi-area learners — Archer Infotech. Modern React + hooks + Redux + Next.js + TypeScript with placement assistance at Hinjewadi product teams. Live-online + classroom.",
    h1: "React Training in Hinjewadi, Pune",
    intro: [
      "Modern React is the dominant frontend stack at Hinjewadi product captives and the engineering teams of Hinjewadi-area MNCs. Hooks, Redux, Next.js, TypeScript and component-driven design are exactly what Hinjewadi hiring panels screen on for frontend and full-stack roles. Archer Infotech's flagship React track covers this stack with production-style project work and modern best practices.",
      "Hinjewadi is about 25 km from our Kothrud centre, so most React learners in this belt join live-online batches. The curriculum covers React fundamentals, hooks, Redux Toolkit, Next.js (App Router), TypeScript, testing patterns, and 6-8 production-style projects students can put in a recruiter-ready GitHub portfolio.",
    ],
    whyHere: [
      "React is the dominant frontend at Hinjewadi product captives — fresher demand and pay are both strong",
      "Pairs naturally with Node.js + MongoDB for MERN Stack progression (most Hinjewadi React devs grow into full-stack roles)",
      "Live-online format eliminates the 25 km Hinjewadi-Kothrud commute",
      "Trainers have production React + Next.js experience at Pune MNCs and product companies",
      "Pune React fresher band is ₹4-6 LPA with top performers at product captives crossing ₹10 LPA",
    ],
    faqs: [
      {
        question: "Does the React track cover Next.js and TypeScript?",
        answer:
          "Yes — modern React with hooks, Next.js (App Router), TypeScript, Redux Toolkit, and testing patterns. The curriculum maps to what Hinjewadi product captives actually screen on at fresher and 0-3 year drives.",
      },
      {
        question: "React alone or full MERN — what's right for a Hinjewadi target list?",
        answer:
          "If you're aiming at pure frontend roles, React alone is sharp. For broader full-stack hiring panels (product captives often want full-stack), MERN Stack (React + Node + Express + Mongo) is a stronger pick. Many students start with React, then add the Node + DB layer.",
      },
      {
        question: "Which Hinjewadi companies hire React freshers?",
        answer:
          "Multiple Hinjewadi GCC captives (BFSI, retail, SaaS), product startups (including unicorns), plus the engineering teams of Pune MNCs running Hinjewadi offices. Product-team React roles tend to pay higher than services-MNC frontend roles.",
      },
      {
        question: "Do I need JavaScript before starting React?",
        answer:
          "Basic JavaScript helps; the React track includes a JS refresher covering ES6+ syntax, async/await, modules, and the patterns React relies on. Students with zero JS typically add a 2-3 week JS primer first.",
      },
      {
        question: "How long is the React course?",
        answer:
          "Flagship React runs 2-3 months covering React, hooks, Redux, Next.js, TypeScript and 6-8 production-style projects. Add 2-3 more months for MERN Stack progression.",
      },
      {
        question: "What does React training cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 10. DevOps in Baner ──────────────────────────────────────────────────
  {
    slug: "devops-in-baner",
    courseSlug: "devops-training-in-pune",
    locationSlug: "it-training-in-baner",
    shortLabel: "DevOps in Baner",
    metaTitle: "DevOps Training in Baner, Pune (2026)",
    metaDescription:
      "DevOps Training in Baner — Archer Infotech. Docker, Kubernetes, Jenkins, Terraform, AWS with placement assistance at Baner GCCs and product startups. Mixed classroom + live-online.",
    h1: "DevOps Training in Baner, Pune",
    intro: [
      "The Baner-Balewadi GCC and product-startup belt has scaled DevOps and Site Reliability Engineering teams aggressively — Fortune 500 GCC captives and mid-stage product companies all hire DevOps freshers in this corridor. The stack is Docker, Kubernetes, Jenkins (or GitHub Actions), Terraform, AWS, Linux, Git, and increasingly observability tools (Datadog, Prometheus, Grafana). Archer Infotech's flagship DevOps track covers this with production-style cloud sandbox labs.",
      "Baner is about 15 km from our Kothrud centre via Pune University Road. Most Baner DevOps students mix Saturday classroom (for the harder Kubernetes and Terraform modules) with weekday live-online for hands-on labs done from home or office. Cloud labs run in students' own AWS Free Tier accounts.",
    ],
    whyHere: [
      "Baner-Balewadi GCCs + product startups have scaled DevOps/SRE teams aggressively — fresher demand is strong and growing",
      "Pune DevOps fresher band is ₹4-6.5 LPA with top performers at GCC captives crossing ₹11 LPA",
      "Mixed classroom + live-online format fits Baner residents' schedule patterns",
      "Trainers have production DevOps experience at Pune GCCs and product companies — interview prep maps to local hiring panels",
      "AWS Solutions Architect Associate is the most-screened cloud cert at Baner DevOps drives — pairs well with the flagship DevOps track",
    ],
    faqs: [
      {
        question: "Which Baner-Balewadi companies hire DevOps freshers?",
        answer:
          "Fortune 500 GCC captives (BFSI, retail, healthcare), product startups (including unicorns), and Pune MNCs running Baner offices — all screen on Docker + Kubernetes + CI/CD + Cloud as standard.",
      },
      {
        question: "Does the DevOps track include hands-on Kubernetes?",
        answer:
          "Yes — Kubernetes is covered via hands-on cluster setup, deployment patterns, services, ingress, scaling and basic operators. Students run real K8s workloads in cloud sandboxes.",
      },
      {
        question: "Do I need development experience before DevOps?",
        answer:
          "Basic Linux + Git + scripting helps a lot. Pure freshers with zero coding background can still start, but the learning curve is steeper. Students with even basic Java or Python coursework usually find DevOps more learnable.",
      },
      {
        question: "Does the track prep me for AWS Solutions Architect Associate?",
        answer:
          "DevOps covers AWS fundamentals (VPC, EC2, S3, IAM, basic networking) sufficient to start SAA prep. Students who want full SAA certification typically add our AWS Solutions Architect track after DevOps — pairing is common.",
      },
      {
        question: "How long is the DevOps course?",
        answer:
          "Flagship DevOps runs 3-4 months covering Docker, Kubernetes, Jenkins, Terraform, AWS, Linux, Git, plus production-style projects and certification prep.",
      },
      {
        question: "What does DevOps training cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 11. MERN Stack in Hinjewadi ─────────────────────────────────────────
  {
    slug: "mern-stack-in-hinjewadi",
    courseSlug: "mern-stack-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "MERN Stack in Hinjewadi",
    metaTitle: "MERN Stack Training in Hinjewadi, Pune (2026)",
    metaDescription:
      "MERN Stack Training for Hinjewadi-area learners — Archer Infotech. MongoDB + Express + React + Node.js with placement assistance at Hinjewadi product captives and GCCs. Live-online + classroom.",
    h1: "MERN Stack Training in Hinjewadi, Pune",
    intro: [
      "MERN Stack is the second-most-hired full-stack pattern at Hinjewadi after Java Full Stack — especially strong at Hinjewadi product captives (BFSI, retail, SaaS), GCC engineering teams, and the modern engineering wings of Pune MNCs. The stack — MongoDB + Express + React + Node.js + TypeScript — is exactly what these hiring panels screen on. Archer Infotech's flagship MERN Stack track covers it end-to-end.",
      "Hinjewadi is about 25 km from our Kothrud centre, so most Hinjewadi-area MERN learners join live-online batches. The curriculum builds React + Node + Express + MongoDB through 8-10 production-style projects (including auth, payments, real-time, deployment), the patterns recruiters at Hinjewadi product captives actually screen for.",
    ],
    whyHere: [
      "MERN is the dominant full-stack at Hinjewadi product captives + GCC engineering teams",
      "Higher product-company pay than services-MNC Java FS — Hinjewadi MERN top performers cross ₹12 LPA",
      "Modern stack (TypeScript, Next.js, modern Node) maps to current Hinjewadi hiring trends",
      "Live-online format eliminates the 25 km Hinjewadi-Kothrud commute",
      "Trainers have production MERN experience at Pune product companies — interview prep maps to product captive question patterns",
    ],
    faqs: [
      {
        question: "MERN vs Java Full Stack for a Hinjewadi target list?",
        answer:
          "Java Full Stack opens more Hinjewadi services MNC volume (Infosys/TCS/Wipro/Persistent). MERN opens more Hinjewadi product captive + GCC engineering offers. Pick based on company tier — services vs product — you're targeting.",
      },
      {
        question: "Which Hinjewadi companies hire MERN freshers?",
        answer:
          "Hinjewadi GCC captives (BFSI, retail, SaaS), product startups, and the modern engineering teams of Pune MNCs running Hinjewadi offices. Product-team MERN roles tend to pay higher than services-MNC frontend or backend roles.",
      },
      {
        question: "Does the MERN track include TypeScript and Next.js?",
        answer:
          "Yes — TypeScript is woven throughout, and Next.js (App Router) is covered as the modern React deployment pattern. Plus Express + Node fundamentals and MongoDB design patterns.",
      },
      {
        question: "How long is the MERN Stack course?",
        answer:
          "Flagship MERN runs 4-6 months covering React, Node, Express, MongoDB, TypeScript, Next.js, 8-10 production-style projects, GitHub workflow and placement support.",
      },
      {
        question: "What outcome should I expect from MERN training?",
        answer:
          "Pune MERN fresher band is ₹4-6 LPA with top performers at Hinjewadi product captives crossing ₹12 LPA. Outcomes scale with stack depth + interview prep consistency.",
      },
      {
        question: "What does MERN Stack training cost?",
        answer:
          "Competitive Pune market rates with EMI options. Ask admissions during your free demo for current fee + EMI partners + seasonal offers.",
      },
    ],
  },

  // ─── 12. AWS in Hinjewadi ────────────────────────────────────────────────
  {
    slug: "aws-in-hinjewadi",
    courseSlug: "aws-training-in-pune",
    locationSlug: "it-training-in-hinjewadi",
    shortLabel: "AWS in Hinjewadi",
    metaTitle: "AWS Training in Hinjewadi, Pune (2026)",
    metaDescription:
      "AWS Training for Hinjewadi-area learners — Archer Infotech. AWS Solutions Architect Associate prep + hands-on labs + placement support at Hinjewadi MNCs and GCC captives. Live-online + classroom.",
    h1: "AWS Training in Hinjewadi, Pune",
    intro: [
      "AWS is the dominant cloud platform across the Hinjewadi corridor — every major Hinjewadi MNC (Infosys, TCS, Wipro, Cognizant, Capgemini, Tech Mahindra) and most Hinjewadi GCC captives run primary workloads on AWS. AWS Solutions Architect Associate (SAA-C03) is the single most-screened cloud certification at fresher and 0-3 year hiring panels in this corridor. Archer Infotech's flagship AWS track covers the SAA curriculum end-to-end plus 10+ production-style architectures.",
      "Hinjewadi is about 25 km from our Kothrud centre, so most Hinjewadi-area AWS students join live-online batches. The cloud labs run in students' own AWS Free Tier accounts — same hands-on experience as classroom, accessible from anywhere with a browser.",
    ],
    whyHere: [
      "AWS is the dominant cloud at Hinjewadi MNCs + GCC captives — by a wide margin over Azure or GCP",
      "Solutions Architect Associate (SAA-C03) is the most-screened cert at Hinjewadi fresher and 0-3 year drives",
      "Live-online format eliminates the 25 km Hinjewadi-Kothrud commute; cloud labs run in your own AWS Free Tier",
      "Pairs well with DevOps for cloud-deployed infrastructure roles (rapidly growing at Hinjewadi)",
      "Pune Cloud Engineer fresher band is ₹4-6.5 LPA with top performers at GCC captives crossing ₹11 LPA",
    ],
    faqs: [
      {
        question: "Which Hinjewadi companies hire AWS-skilled engineers?",
        answer:
          "Every major Hinjewadi MNC + 100+ Hinjewadi GCC captives. AWS Solutions Architect Associate is the most-screened cert at fresher and 0-3 year drives across both services MNCs and product captives.",
      },
      {
        question: "Does the track fully prepare me for the SAA-C03 exam?",
        answer:
          "Yes — the flagship AWS track is built around the SAA-C03 exam blueprint, covering all six exam domains plus 10+ hands-on architectures. Most students attempt the exam within 4-6 weeks of completing the track.",
      },
      {
        question: "Should I take DevOps before or after AWS?",
        answer:
          "AWS gives you the cloud platform fundamentals; DevOps adds the automation and deployment layer. Many Hinjewadi-bound students take AWS first (faster SAA certification), then add DevOps for full cloud-engineer roles.",
      },
      {
        question: "Does it cover Azure or GCP?",
        answer:
          "The flagship AWS track is AWS-only because Hinjewadi hiring panels screen on AWS by a wide margin. Students wanting Azure or GCP can add specialised tracks after AWS.",
      },
      {
        question: "How long is the AWS course?",
        answer:
          "Flagship AWS runs 2-3 months covering all six SAA-C03 exam domains plus 10+ hands-on architectures. Most students take the SAA exam within 4-6 weeks of completion.",
      },
      {
        question: "What does AWS training cost?",
        answer:
          "Competitive Pune market rates with EMI options. AWS exam fee (~₹12,000 for SAA-C03) is paid separately to AWS. Ask admissions during your free demo for current course fee + EMI partners.",
      },
    ],
  },
];

/** Look up a course×location combo by slug. */
export function getCourseLocationCombo(
  slug: string,
): CourseLocationCombo | undefined {
  return courseLocations.find((c) => c.slug === slug);
}
