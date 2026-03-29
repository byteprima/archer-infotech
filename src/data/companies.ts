export interface Company {
  id: string;
  name: string;
  logo: string;
  category: "hiring-partner" | "corporate-client";
}

export const companies: Company[] = [
  // Hiring Partners
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    logo: "/images/companies/tech-mahindra.png",
    category: "hiring-partner",
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "/images/companies/tcs.png",
    category: "hiring-partner",
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "/images/companies/infosys.png",
    category: "hiring-partner",
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "/images/companies/wipro.png",
    category: "hiring-partner",
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logo: "/images/companies/cognizant.png",
    category: "hiring-partner",
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "/images/companies/accenture.png",
    category: "hiring-partner",
  },
  {
    id: "capgemini",
    name: "Capgemini",
    logo: "/images/companies/capgemini.png",
    category: "hiring-partner",
  },
  {
    id: "persistent",
    name: "Persistent Systems",
    logo: "/images/companies/persistent.png",
    category: "hiring-partner",
  },
  {
    id: "ezest",
    name: "e-Zest Solutions",
    logo: "/images/companies/ezest.png",
    category: "hiring-partner",
  },
  {
    id: "lt-infotech",
    name: "L&T Infotech",
    logo: "/images/companies/lt-infotech.png",
    category: "hiring-partner",
  },
  {
    id: "vspace",
    name: "VSpace Software",
    logo: "/images/companies/vspace.png",
    category: "hiring-partner",
  },
  {
    id: "ivision",
    name: "iVision Software",
    logo: "/images/companies/ivision.png",
    category: "hiring-partner",
  },
  {
    id: "ignify",
    name: "Ignify Software",
    logo: "/images/companies/ignify.png",
    category: "hiring-partner",
  },
  {
    id: "drivedge",
    name: "Drivedge Infosolutions",
    logo: "/images/companies/drivedge.png",
    category: "hiring-partner",
  },
  {
    id: "fidel",
    name: "Fidel Softech",
    logo: "/images/companies/fidel.png",
    category: "hiring-partner",
  },
  {
    id: "datamato",
    name: "Datamato Technologies",
    logo: "/images/companies/datamato.png",
    category: "hiring-partner",
  },
  {
    id: "ugam",
    name: "Ugam Software",
    logo: "/images/companies/ugam.png",
    category: "hiring-partner",
  },
  {
    id: "bizsense",
    name: "Bizsense Solutions",
    logo: "/images/companies/bizsense.png",
    category: "hiring-partner",
  },
  {
    id: "gradmener",
    name: "GradMener Technology",
    logo: "/images/companies/gradmener.png",
    category: "hiring-partner",
  },
];

export function getHiringPartners(): Company[] {
  return companies.filter((company) => company.category === "hiring-partner");
}

export function getCorporateClients(): Company[] {
  return companies.filter((company) => company.category === "corporate-client");
}

export function getAllCompanies(): Company[] {
  return companies;
}
