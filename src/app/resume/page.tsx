import { MacWindow } from "@/components/mac-window";
import Link from "next/link";

export const metadata = {
  title: "Resume",
  description:
    "Professional resume and CV for 0xharryriddle — Blockchain Researcher & Engineer.",
};

export default function ResumePage() {
  return (
    <section className="py-12 space-y-8">
      {/* Header */}
      <MacWindow title="~/resume">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Resume / CV
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            A full PDF version of my resume is on its way. In the meantime, you
            can find a snapshot of my experience below or explore the{" "}
            <Link
              href="/companies"
              className="text-[var(--mac-accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Companies
            </Link>{" "}
            and{" "}
            <Link
              href="/projects"
              className="text-[var(--mac-accent)] underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Projects
            </Link>{" "}
            pages for more detail.
          </p>
        </div>
      </MacWindow>

      {/* Download placeholder */}
      <MacWindow title="~/resume/download">
        <div
          className="
            flex flex-col items-center justify-center py-12 px-6 rounded-xl
            bg-white/40 dark:bg-neutral-900/40
            border border-dashed border-neutral-300/60 dark:border-neutral-700/40
            text-center
          "
        >
          {/* PDF icon */}
          <svg
            className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <h3 className="font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Resume PDF
          </h3>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 max-w-sm mb-4">
            The downloadable PDF will be available here shortly.
          </p>

          <span
            className="
              px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full
              bg-neutral-100 dark:bg-neutral-800
              text-neutral-500 dark:text-neutral-400
              border border-neutral-200/60 dark:border-neutral-700/40
            "
          >
            Coming Soon
          </span>
        </div>
      </MacWindow>

      {/* Quick-glance info cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Experience */}
        <MacWindow title="~/exp">
          <div className="space-y-1">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Experience
            </p>
            <p className="text-2xl font-semibold tracking-tight">2+ yrs</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Blockchain &amp; Fullstack
            </p>
          </div>
        </MacWindow>

        {/* Focus */}
        <MacWindow title="~/focus">
          <div className="space-y-1">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Focus
            </p>
            <p className="text-2xl font-semibold tracking-tight">Web3</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Polkadot &amp; Substrate
            </p>
          </div>
        </MacWindow>

        {/* Location */}
        <MacWindow title="~/location">
          <div className="space-y-1">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Based in
            </p>
            <p className="text-2xl font-semibold tracking-tight">VN</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Vietnam 🇻🇳
            </p>
          </div>
        </MacWindow>
      </div>

      {/* Explore links */}
      <MacWindow title="~/resume/explore">
        <h2 className="text-lg font-semibold tracking-tight mb-4">
          Explore More
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/about",
              label: "About Me",
              description: "Bio, tech stack, and full timeline",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              ),
            },
            {
              href: "/companies",
              label: "Work & Education",
              description: "Current and past roles",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              ),
            },
            {
              href: "/projects",
              label: "Projects",
              description: "Open-source repos and demos",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              ),
            },
            {
              href: "/blog",
              label: "Blog",
              description: "Technical writing & research",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              ),
            },
          ].map(({ href, label, description, icon }) => (
            <Link
              key={href}
              href={href}
              className="
                group flex items-start gap-3 p-4 rounded-xl
                bg-neutral-50/60 dark:bg-neutral-800/40
                border border-neutral-200/40 dark:border-neutral-700/30
                hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80
                hover:border-neutral-300/60 dark:hover:border-neutral-600/50
                transition-all duration-200
              "
            >
              <svg
                className="w-5 h-5 mt-0.5 shrink-0 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                {icon}
              </svg>
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors text-sm">
                  {label}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </MacWindow>
    </section>
  );
}
