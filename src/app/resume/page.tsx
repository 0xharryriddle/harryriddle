import Link from "next/link";

export const metadata = {
  title: "Resume",
  description: "Professional resume and CV.",
};

export default function ResumePage() {
  return (
    <section className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Resume / CV
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          A full PDF version of my CV is on its way — I want to get it right
          before putting it up. In the meantime, you can find the highlights
          across my{" "}
          <Link
            href="/experience"
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
          >
            experience
          </Link>
          ,{" "}
          <Link
            href="/projects"
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
          >
            projects
          </Link>
          , and{" "}
          <Link
            href="/research"
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
          >
            research
          </Link>{" "}
          pages.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Experience
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            2+ yrs
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Blockchain &amp; Fullstack
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Focus
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Web3
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Polkadot &amp; Substrate
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Based in
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            VN
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Vietnam
          </p>
        </div>
      </div>

      {/* Download placeholder */}
      <div className="p-10 rounded-xl border border-dashed border-[var(--border)] text-center">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-[var(--text-muted)]"
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
        <h3 className="font-medium text-[var(--text-primary)] mb-1">
          Resume PDF
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          The downloadable PDF will be available here shortly.
        </p>
        <span className="inline-block mt-4 px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20">
          Coming Soon
        </span>
      </div>
    </section>
  );
}
