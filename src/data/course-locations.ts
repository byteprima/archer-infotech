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
];

/** Look up a course×location combo by slug. */
export function getCourseLocationCombo(
  slug: string,
): CourseLocationCombo | undefined {
  return courseLocations.find((c) => c.slug === slug);
}
