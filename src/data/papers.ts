/**
 * Academic publications and preprints.
 *
 * Add your papers here to display them on the /research page.
 * Each entry can include links to the paper, code, and project page.
 */
export interface Paper {
  title: string
  authors: string[]
  venue: string
  year: number
  url?: string
  codeUrl?: string
  projectUrl?: string
  preprintUrl?: string
  tags: string[]
  description?: string
  award?: string
}

export type ResearchInterest = {
  area: string
  description: string
}

export const researchInterests: ResearchInterest[] = [
  {
    area: 'Blockchain Interoperability',
    description:
      'Designing light client protocols and trust-minimized bridges for cross-chain communication in heterogeneous blockchain ecosystems',
  },
  {
    area: 'Zero-Knowledge Proofs',
    description:
      'Applying ZK-SNARKs and ZK-STARKs to privacy-preserving transactions, identity, and scalable verification in decentralized networks',
  },
  {
    area: 'Decentralized Systems',
    description:
      'Building resilient peer-to-peer networks, studying consensus mechanisms, and engineering fault-tolerant distributed applications',
  },
]

export const papers: Paper[] = [
  // Add your publications here:
  // {
  //   title: "Your Paper Title",
  //   authors: ["First Author", "Nguyen Thai Cong", "Last Author"],
  //   venue: "Conference/Journal Name",
  //   year: 2025,
  //   url: "https://arxiv.org/abs/...",
  //   codeUrl: "https://github.com/...",
  //   projectUrl: "https://...",
  //   tags: ["Blockchain", "Light Client"],
  //   description: "Brief description of the paper contribution.",
  // },
]
