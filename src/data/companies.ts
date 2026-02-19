export interface Company {
  id: number;
  name: string;
  role: string;
  startDate: string;
  endDate: string | null; // null means current
  description: string;
  url: string;
  logo?: string;
}

export const companies: Company[] = [
  {
    id: 1,
    name: "Sense ERP",
    role: "Junior Fullstack Developer",
    startDate: "2025-03-01",
    endDate: null,
    description:
      "Developed and maintained fullstack applications using C# with ASP.NET Core and Flutter for mobile. Collaborated with cross-functional teams to deliver scalable solutions.",
    url: "https://www.senseerp.com/",
    logo: "/SenseERP.svg",
  },
  {
    id: 2,
    name: "University of Information Technology (UIT)",
    role: "Software Engineering Student",
    startDate: "2021-08-01",
    endDate: "2025-11-30",
    description:
      "Studying Software Engineering with a focus on Web3 and Blockchain technologies. Building knowledge in distributed systems and decentralized applications.",
    url: "https://www.uit.edu.vn/",
    logo: "/Logo_UIT_updated.ico",
  },
  {
    id: 3,
    name: "LearnWeb3",
    role: "Blockchain Developer Student",
    startDate: "2023-06-01",
    endDate: null,
    description:
      "Learning and building in the Web3 space. Exploring smart contract development, DeFi protocols, and decentralized application architecture.",
    url: "https://learnweb3.io/",
    logo: "/Learnweb3.png",
  },
];
