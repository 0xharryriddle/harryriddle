export interface TechStackCategory {
  category: string;
  items: string[];
}

export const techStack = [
  {
    category: "Languages",
    items: ["Javascript", "TypeScript", "Rust*", "Solidity", "Python", "C#"],
  },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.Js",
      "Fastify",
      "Nest.Js",
      "FastAPI",
      "ASP.NET Core",
      "Axum",
    ],
  },
  { category: "Blockchain", items: ["Ethereum", "Polkadot & Substrate"] },
  {
    category: "DevOps",
    items: ["GitHub Actions", "Docker", "Vercel", "Cloudflare"],
  },
  { category: "Mobile", items: ["React Native", "Flutter"] },
  { category: "Cloud", items: ["AWS", "Vercel", "Cloudflare"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "Tools", items: ["Git", "Docker", "Linux", "VS Code"] },
];
