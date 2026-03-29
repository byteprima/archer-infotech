export const siteConfig = {
  name: "Archer Infotech",
  tagline: "Best IT Training Institute in Pune",
  description:
    "Archer Infotech is a leading IT training institute in Pune offering courses in Java, Python, AWS, DevOps, Full Stack Development, Data Science, and more. placement assistance.",
  url: "https://archerinfotech.in",
  ogImage: "/images/og-image.jpg",

  // Contact Information
  contact: {
    email: "info@archerinfotech.in",
    phone: "+91 9850 678451",
    whatsapp: "+919850678451",
    address: {
      line1: "Flat No. 12, Divyadarshan Housing Society",
      line2: "Behind Kothrud Bus Stand Road, Near Natraj Gas Agency, Londhe Wada, Chaitanya Nagar",
      city: "Kothrud, Pune",
      state: "Maharashtra",
      pincode: "411029",
      country: "India",
    },
  },

  // Social Links
  social: {
    facebook: "https://facebook.com/archerinfotech",
    instagram: "https://instagram.com/archerinfotech",
    linkedin: "https://linkedin.com/company/archerinfotech",
    twitter: "https://twitter.com/archerinfotech",
    youtube: "https://youtube.com/@archerinfotech",
  },

  // Google Maps
  googleMaps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.91455931541!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMzJzQzLjQiTiA3M8KwNTUnMDIuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
    placeId: "",
  },

  // Stats
  stats: {
    studentsPlaced: "5000+",
    yearsExperience: "15+",
    corporatePartners: "100+",
    courses: "30+",
    batchesCompleted: "1000+",
    placementRate: "100%",
  },

  // Key Highlights
  highlights: [
    "15+ Years of IT Training Experience",
    "1000+ Batches Successfully Completed",
    "100% Placement Assistance",
    "Industry Expert Trainers",
    "Real-time Project Training",
    "24/7 Support Team",
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
      { name: "Contact", href: "/contact" },
    ],
    courses: [
      { name: "Java Full Stack", href: "/courses/full-stack-development/java-full-stack" },
      { name: "Python", href: "/courses/programming/python" },
      { name: "AWS", href: "/courses/cloud-devops/aws" },
      { name: "DevOps", href: "/courses/cloud-devops/devops" },
      { name: "MERN Stack", href: "/courses/full-stack-development/mern-stack" },
      { name: "Machine Learning", href: "/courses/data-ai/machine-learning" },
      { name: "Data Science", href: "/courses/data-ai/data-science" },
      { name: "View All Courses", href: "/courses" },
    ],
  },

  // SEO Keywords
  keywords: [
    "IT training in Pune",
    "Java training Pune",
    "Python course Pune",
    "AWS training Pune",
    "DevOps training Pune",
    "Full stack developer course Pune",
    "Best IT training institute Pune",
    "Machine learning course Pune",
    "Data science course Pune",
    "Cloud computing training Pune",
    ".NET training Pune",
    "Generative AI course Pune",
    "MERN stack training Pune",
    "Placement guarantee courses Pune",
  ],
};

export type SiteConfig = typeof siteConfig;
