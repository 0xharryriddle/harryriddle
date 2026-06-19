import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <p className="text-6xl font-mono font-bold text-[var(--text-primary)] mb-4">
          404
        </p>
        <p className="text-[var(--text-secondary)] mb-8">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-[var(--text-primary)] text-[var(--bg-primary)]
            hover:opacity-90 transition-opacity
          "
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
