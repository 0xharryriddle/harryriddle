import Link from 'next/link'
import { experiments } from '@/data/experiments'

export const metadata = {
  title: 'Experiments',
  description: 'Research implementations, technical experiments, and open-source systems.',
}

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-3xl pb-8 pt-16 sm:pt-24">
      <header className="mb-16 max-w-2xl sm:mb-20">
        <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">Research through code</p>
        <h1 className="text-4xl font-medium tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          Experiments
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
          Small systems built to answer a technical question. I record the method, the evidence that
          exists today, and the boundary between a working result and an unfinished claim.
        </p>
      </header>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {experiments.map((experiment) => (
          <article key={experiment.index} className="grid gap-6 py-10 sm:grid-cols-[3rem_1fr] sm:py-12">
            <p className="font-mono text-xs text-[var(--text-muted)]">{experiment.index}</p>
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-medium tracking-tight text-[var(--text-primary)]">
                  {experiment.title}
                </h2>
                <p className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
                  {experiment.status}
                </p>
              </div>

              <dl className="mt-8 grid gap-6 text-sm leading-7 sm:grid-cols-[7rem_1fr] sm:gap-y-5">
                <dt className="font-mono text-xs text-[var(--text-muted)]">Question</dt>
                <dd className="text-[var(--text-primary)]">{experiment.question}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Method</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.method}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Evidence</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.evidence}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Current limit</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.limitation}</dd>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                <Link className="editorial-link" href={`/projects/${experiment.slug}`}>
                  Read full experiment →
                </Link>
                {experiment.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      className="editorial-link"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link key={link.href} className="editorial-link" href={link.href}>
                      {link.label} →
                    </Link>
                  ),
                )}
              </div>

              <p className="mt-6 font-mono text-xs leading-6 text-[var(--text-muted)]">
                {experiment.tags.join(' · ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
