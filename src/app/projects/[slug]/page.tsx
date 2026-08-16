import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExperiment, experiments } from '@/data/experiments'

interface ExperimentPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }))
}

export function generateMetadata({ params }: ExperimentPageProps) {
  const experiment = getExperiment(params.slug)

  return experiment
    ? {
        title: experiment.title,
        description: experiment.summary,
      }
    : {}
}

export default function ExperimentPage({ params }: ExperimentPageProps) {
  const experiment = getExperiment(params.slug)

  if (!experiment) notFound()

  return (
    <article className="mx-auto max-w-4xl pb-12 pt-12 sm:pt-20">
      <Link href="/projects" className="editorial-link text-sm">
        ← All experiments
      </Link>

      <header className="mt-14 max-w-3xl border-b border-[var(--text-primary)] pb-12 sm:mt-20 sm:pb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Experiment {experiment.index}
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">{experiment.status}</p>
        </div>
        <h1 className="mt-7 max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl">
          {experiment.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
          {experiment.summary}
        </p>
        <p className="mt-7 font-mono text-[10px] leading-5 text-[var(--text-muted)]">
          {experiment.tags.join(' · ')}
        </p>
      </header>

      <div className="mt-12 grid max-w-3xl gap-x-10 gap-y-10 sm:grid-cols-[8rem_1fr] sm:mt-16">
        <SectionLabel>Question</SectionLabel>
        <p className="text-lg leading-8 text-[var(--text-primary)]">{experiment.question}</p>

        <SectionLabel>Method</SectionLabel>
        <p className="leading-8 text-[var(--text-secondary)]">{experiment.method}</p>

        <SectionLabel>Evidence</SectionLabel>
        <p className="leading-8 text-[var(--text-secondary)]">{experiment.evidence}</p>

        <SectionLabel>Current limit</SectionLabel>
        <p className="leading-8 text-[var(--text-secondary)]">{experiment.limitation}</p>

        <SectionLabel>Next step</SectionLabel>
        <p className="leading-8 text-[var(--text-secondary)]">{experiment.nextStep}</p>
      </div>

      <footer className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border)] pt-7 text-sm sm:mt-20">
        {experiment.links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              {link.label} ↗
            </a>
          ) : (
            <Link key={link.href} href={link.href} className="editorial-link">
              {link.label} →
            </Link>
          ),
        )}
      </footer>
    </article>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)] sm:pt-2">
      {children}
    </h2>
  )
}
