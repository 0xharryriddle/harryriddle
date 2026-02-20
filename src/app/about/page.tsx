import { MacWindow } from "@/components/mac-window";
import { companies } from "@/data/companies";
import { techStack } from "@/data/techStacks";
import Image from "next/image";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const metadata = {
  title: "About",
  description:
    "About 0xharryriddle - Software Engineer & Blockchain Developer.",
};

// const timelineData = [
//   {
//     company: "University of Information Technology (UIT)",
//     position: "Software Engineering Student",
//     period: "Aug 2021 — Present",
//     description:
//       "Studying Software Engineering with a focus on Web3 and Blockchain technologies. Building knowledge in distributed systems and decentralized applications.",
//     url: "https://www.uit.edu.vn/",
//   },
//   {
//     company: "LearnWeb3",
//     position: "Blockchain Developer Student",
//     period: "Jun 2023 — Present",
//     description:
//       "Learning and building in the Web3 space. Exploring smart contract development, DeFi protocols, and decentralized application architecture.",
//     url: "https://learnweb3.io/",
//   },
// ];

export default function AboutPage() {
  return (
    <section className="py-12 space-y-8">
      {/* Bio */}
      <MacWindow title="~/about">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center overflow-hidden">
              <Image
                src={"/0xharryriddle.jpg"}
                alt={"Harry Riddle"}
                className="object-cover"
                fill
              />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              0xharryriddle
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Software Engineer & Blockchain Developer based in Vietnam.
              I&apos;m passionate about building decentralized applications and
              contributing to open-source projects in the Web3 ecosystem.
              Currently focused on Polkadot, Substrate, and cross-chain
              technologies.
            </p>
            <p className="text-neutral-500 dark:text-neutral-500 leading-relaxed text-sm">
              Feel free to reach out — you can find me on GitHub or just call me
              Harry.
            </p>
          </div>
        </div>
      </MacWindow>

      {/* Tech Stack */}
      <MacWindow title="~/tech-stack">
        <h2 className="text-lg font-semibold tracking-tight mb-5">
          Tech Stack
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {techStack.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2.5">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="
                      px-3 py-1.5 text-xs font-medium rounded-lg
                      bg-neutral-100 dark:bg-neutral-800
                      text-neutral-700 dark:text-neutral-300
                      border border-neutral-200/60 dark:border-neutral-700/40
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MacWindow>

      {/* Timeline */}
      <MacWindow title="~/timeline">
        <h2 className="text-lg font-semibold tracking-tight mb-5">Timeline</h2>
        <div className="space-y-6">
          {companies.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center pt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors" />
                  {index < companies.length - 1 && (
                    <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-700 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {formatDate(item.startDate)} —{" "}
                      {item.endDate ? formatDate(item.endDate) : "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1.5">
                    {item.role}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </MacWindow>

      {/* Social */}
      <MacWindow title="~/links">
        <h2 className="text-lg font-semibold tracking-tight mb-5">Connect</h2>
        <div className="flex flex-wrap gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/0xharryriddle"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
              bg-neutral-100 dark:bg-neutral-800
              border border-neutral-200/60 dark:border-neutral-700/40
              hover:bg-neutral-200 dark:hover:bg-neutral-700
              transition-colors
            "
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/0xHarryNguyenVN"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
              bg-neutral-100 dark:bg-neutral-800
              border border-neutral-200/60 dark:border-neutral-700/40
              hover:bg-neutral-200 dark:hover:bg-neutral-700
              transition-colors
            "
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
        </div>
      </MacWindow>
    </section>
  );
}
