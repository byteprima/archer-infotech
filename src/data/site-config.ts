export const siteConfig = {
  name: "Archer Infotech",
  tagline: "Best IT Training Institute in Pune",
  description:
    "Archer Infotech is Pune's trusted IT training institute since 2009 — Java, Python, AWS, DevOps, Full Stack, Data Science, AI/ML and Cloud courses with placement assistance. 10,000+ students trained and 5,000+ placed.",
  url: "https://archerinfotech.in",
  ogImage: "/images/og-image.jpg",
  foundingYear: 2009,

  // Contact Information
  contact: {
    email: "info@archerinfotech.in",
    phone: "+91 9850 678451",
    whatsapp: "+919850678451",
    address: {
      line1: "Flat No. 12, Divyadarshan Housing Society",
      line2: "behind Kothrud Bus Stand Road, near Natraj Gas Agency, Londhe Wada, Chaitanya Nagar",
      city: "Kothrud, Pune",
      state: "Maharashtra",
      pincode: "411038",
      country: "India",
    },
  },

  // Social Links + canonical knowledge-graph URLs (P6-06 — Wikidata 2026-06-11).
  social: {
    facebook: "https://facebook.com/archerinfotech",
    instagram: "https://instagram.com/archerinfotech",
    linkedin: "https://www.linkedin.com/in/archer-infotech-0714a5404/",
    twitter: "https://x.com/archerinfotech",
    youtube: "https://youtube.com/@archerinfotech2022",
    github: "https://github.com/archerinfotech",
    reddit: "https://www.reddit.com/user/archerinfotech/",
    // Wikidata entity — the entity is the canonical machine-readable
    // identifier Google + AI engines map back to our brand. Submitted
    // 2026-06-11 via wikidata_submit.py (P6-06).
    wikidata: "https://www.wikidata.org/wiki/Q140177819",
  },

  // Google Maps
  googleMaps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.810452!3d18.5002215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfe592dccbf1%3A0x539e5f9e90dcca38!2sArcher%20Infotech!5e0!3m2!1sen!2sin!4v1711712400000",
    placeId: "0x3bc2bfe592dccbf1:0x539e5f9e90dcca38",
    url: "https://www.google.com/maps/place/Archer+Infotech/@18.5002215,73.810452,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bfe592dccbf1:0x539e5f9e90dcca38!8m2!3d18.5002215!4d73.8130269",
    // Destination for /review (P7-04). The official GBP one-tap review link
    // (from GBP → "Ask for reviews") — opens the Google review dialog (stars +
    // text box) DIRECTLY, no panel/scroll. The /review route serves this as a
    // permanent 308 (it auto-detects the g.page host). Single source of truth
    // for the review CTA used on QR cards, email signatures, and posters.
    reviewUrl: "https://g.page/r/CTjK3JCeX55TEBM/review",
  },

  // Stats — kept truthful and source-of-truth for hero counters, schema, llms.txt.
  // yearsExperience derived from foundingYear (2009) — currently 17+.
  stats: {
    studentsTrained: "10000+",
    studentsPlaced: "5000+",
    yearsExperience: "17+",
    corporatePartners: "100+",
    courses: "40+",
    batchesCompleted: "1000+",
    placementRate: "90%",
  },

  // Opening hours — used by LocalBusiness schema and contact page.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
  ],

  // Key Highlights
  highlights: [
    "17+ Years of IT Training Experience",
    "10,000+ Students Trained, 5,000+ Placed",
    "1000+ Batches Successfully Completed",
    "Placement Assistance",
    "Industry Expert Trainers",
    "Real-time Project Training",
    "Both Online & Offline Classes",
    "Corporate Training Solutions",
  ],

  // Unique Selling Points
  usps: [
    {
      title: "Expert Trainers",
      description: "Learn from industry professionals with 10+ years of experience",
      icon: "Users",
    },
    {
      title: "Placement Assistance",
      description: "Complete placement assistance with top IT companies",
      icon: "Briefcase",
    },
    {
      title: "Real Projects",
      description: "Work on live projects and build your portfolio",
      icon: "FolderOpen",
    },
    {
      title: "Flexible Learning",
      description: "Choose from online or offline batches as per your convenience",
      icon: "Clock",
    },
    {
      title: "Updated Curriculum",
      description: "Courses aligned with current industry requirements",
      icon: "BookOpen",
    },
    {
      title: "AI Enabled Courses",
      description: "Learn with AI-powered tools and modern teaching methods",
      icon: "Sparkles",
    },
  ],

  // Navigation Links
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Placements", href: "/placements" },
      { name: "Internships", href: "/internships" },
      { name: "Corporate Training", href: "/corporate-training" },
      { name: "Batch Schedule", href: "/batch-schedule" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    courses: [
      { name: "Java Full Stack", href: "/courses/full-stack-development/java-full-stack-training-in-pune" },
      { name: "Python", href: "/courses/programming/python-training-in-pune" },
      { name: "AWS", href: "/courses/cloud-devops/aws-training-in-pune" },
      { name: "DevOps", href: "/courses/cloud-devops/devops-training-in-pune" },
      { name: "MERN Stack", href: "/courses/full-stack-development/mern-stack-training-in-pune" },
      { name: "Machine Learning", href: "/courses/data-ai/machine-learning-training-in-pune" },
      { name: "Data Science", href: "/courses/data-ai/data-science-training-in-pune" },
      { name: "View All Courses", href: "/courses" },
    ],
  },

};

export type SiteConfig = typeof siteConfig;
