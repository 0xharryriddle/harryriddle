import { BlogPosts } from "@/components/posts";
import { MacWindow } from "@/components/mac-window";
import Link from "next/link";

export default function Home() {
  return (
    <section className="py-12">
      {/* Hero */}
      <MacWindow title="~/ 0xharryriddle" className="mb-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Hey, I&apos;m <span className="font-mono">0xharryriddle</span>{" "}
            <span className="inline-block animate-bounce">✌️</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Blockchain Researcher & Engineer. I&apos;m passionate about Web3,
            decentralized systems, and building tools that matter. Currently
            exploring the intersection of software engineering and blockchain
            technology.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/about"
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900
                hover:bg-neutral-700 dark:hover:bg-neutral-300
                transition-colors
              "
            >
              About me
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="https://github.com/0xharryriddle"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                border border-neutral-200 dark:border-neutral-700
                hover:bg-neutral-100 dark:hover:bg-neutral-800
                transition-colors
              "
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </MacWindow>

      {/* Recent Posts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1"
          >
            View all
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <BlogPosts limit={5} />
      </div>
    </section>
  );
}
