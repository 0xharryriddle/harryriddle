export interface Company {
  name: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string | null; // null means current
  description: string;
  url: string;
  logo?: string;
}

export const companies: Company[] = [
  {
    name: "University of Information Technology (UIT)",
    role: "Software Engineering Student",
    period: "Aug 2021 — Present",
    startDate: "2021-08-01",
    endDate: null,
    description:
      "Studying Software Engineering with a focus on Web3 and Blockchain technologies. Building knowledge in distributed systems and decentralized applications.",
    url: "https://www.uit.edu.vn/",
    logo: "/Logo_UIT_updated.ico",
  },
  {
    name: "LearnWeb3",
    role: "Blockchain Developer Student",
    period: "Jun 2023 — Present",
    startDate: "2023-06-01",
    endDate: null,
    description:
      "Learning and building in the Web3 space. Exploring smart contract development, DeFi protocols, and decentralized application architecture.",
    url: "https://learnweb3.io/",
    logo: "/Learnweb3.png",
  },
  // Add more companies here with endDate: 'YYYY-MM-DD' for past companies
];
