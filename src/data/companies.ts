export interface Company {
  id: number
  name: string
  role: string
  startDate: string
  endDate: string | null // null means current
  description: string // summary line for compact views
  highlights: string[] // bullet points for the full CV view
  url: string
  logo?: string
}

export const companies: Company[] = [
  {
    id: 1,
    name: 'Sense ERP',
    role: 'Junior Fullstack Developer',
    startDate: '2025-03-01',
    endDate: null,
    description:
      'Building production-grade fullstack applications with C# / ASP.NET Core and Flutter.',
    highlights: [
      'Developed fullstack enterprise ERP modules using C# with ASP.NET Core and Flutter for mobile',
      'Designed and implemented RESTful APIs integrating with PostgreSQL and Redis for data persistence and caching',
      'Collaborated with cross-functional teams across product, design, and QA to deliver end-to-end features',
      'Contributed to system architecture decisions, improving API response times through query optimization',
    ],
    url: 'https://www.senseerp.com/',
    logo: '/SenseERP.svg',
  },
  {
    id: 2,
    name: 'LearnWeb3',
    role: 'Blockchain Developer Student',
    startDate: '2023-06-01',
    endDate: null,
    description:
      'Studied smart contract development, DeFi protocols, and decentralized application architecture.',
    highlights: [
      'Built smart contracts in Solidity covering token standards (ERC-20, ERC-721), DeFi primitives, and access control patterns',
      'Developed and deployed dApps interacting with Ethereum and test networks using Hardhat and ethers.js',
      'Analyzed DeFi protocol architectures including AMMs, lending pools, and governance mechanisms',
      'Authored technical documentation and walkthroughs for blockchain development patterns',
    ],
    url: 'https://learnweb3.io/',
    logo: '/Learnweb3.png',
  },
]
