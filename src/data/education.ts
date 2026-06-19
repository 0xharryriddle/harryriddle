/**
 * Education entries shown on the /research page and homepage Research view.
 *
 * Add new entries here to scale the education timeline.
 */
export interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description: string;
  url: string;
  logo?: string;
}

export const education: Education[] = [
  {
    id: 1,
    degree: "B.S. in Software Engineering",
    institution: "University of Information Technology (UIT)",
    startDate: "2021-08-01",
    endDate: "2025-11-30",
    description:
      "Focused on Web3 and blockchain technologies — studied distributed systems, decentralized application architecture, and cross-chain protocols. Thesis work on light client integration for Substrate-based chains.",
    url: "https://www.uit.edu.vn/",
    logo: "/Logo_UIT_updated.ico",
  },
];
