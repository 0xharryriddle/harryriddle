import Link from 'next/link'
import { companies } from '@/data/companies'
import { competitiveWork } from '@/data/competitiveWork'
import { education } from '@/data/education'
import { experiments } from '@/data/experiments'
import { openSourceWork } from '@/data/openSourceWork'
import { BlogPosts } from '@/components/posts'

const destinations = [
  { label: 'Research', detail: 'Questions and current work', href: '/research' },
  { label: 'Experience', detail: 'Production work and education', href: '/experience' },
  { label: 'Experiments', detail: 'Prototypes with evidence and limits', href: '/projects' },
  { label: 'Writing', detail: 'Technical notes from the workbench', href: '/blog' },
]

const experienceSnapshot = [
  ...companies.map((entry) => ({
    kind: entry.role === 'Blockchain Developer Student' ? 'Training' : 'Work',
    title: entry.role,
    organization: entry.name,
    period: formatPeriod(entry.startDate, entry.endDate),
    description: entry.description,
    href: entry.url,
  })),
  ...education.map((entry) => ({
    kind: 'Education',
    title: entry.degree,
    organization: entry.institution,
    period: formatPeriod(entry.startDate, entry.endDate),
    description: entry.description,
    href: entry.url,
  })),
]

function formatPeriod(startDate: string, endDate: string | null): string {
  const start = new Date(`${startDate}T00:00:00`).getFullYear()
  const end = endDate ? new Date(`${endDate}T00:00:00`).getFullYear() : 'Present'
  return `${start} — ${end}`
}

export default function Home() {
  return (
    <section className="pb-10 pt-12 sm:pt-20">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:gap-24">
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Nguyen Thai Cong · Vietnam
          </p>
          <h1 className="mt-7 max-w-[13ch] text-[3.25rem] font-medium leading-[0.95] tracking-[-0.07em] sm:text-[5rem]">
            Make the trust boundary visible.
          </h1>
          <p className="mt-8 max-w-[38rem] text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
            I research and build software around light clients, cross-chain systems, and the
            interfaces that show what a network actually proves.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a className="editorial-link" href="https://github.com/0xharryriddle">
              GitHub ↗
            </a>
            <a className="editorial-link" href="https://x.com/0xHarryNguyenVN">
              X ↗
            </a>
          </div>
        </header>

        <nav aria-label="Explore the site" className="self-end border-y border-[var(--border)]">
          {destinations.map((destination) => (
            <Link
              key={destination.label}
              href={destination.href}
              className="group flex items-baseline justify-between gap-5 border-b border-[var(--border)] py-5 last:border-b-0"
            >
              <span className="text-lg font-medium tracking-tight group-hover:text-[var(--accent)]">
                {destination.label} →
              </span>
              <span className="text-right text-xs text-[var(--text-muted)]">
                {destination.detail}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <section className="mt-24 border-t border-[var(--text-primary)] pt-8 sm:mt-32" aria-labelledby="experience-snapshot-title">
        <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Experience snapshot
          </p>
          <div>
            <h2 id="experience-snapshot-title" className="max-w-[24ch] text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
              Where I work, learn, and build.
            </h2>
            <div className="mt-9 border-b border-[var(--border)]">
              {experienceSnapshot.map((entry) => (
                <Link
                  key={`${entry.kind}-${entry.organization}`}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-t border-[var(--border)] py-5"
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                    <span className="text-base font-medium group-hover:text-[var(--accent)] sm:text-lg">
                      {entry.title} · {entry.organization} ↗
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">{entry.period}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
                    {entry.kind} · {entry.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-[var(--text-primary)] pt-8 sm:mt-32" aria-labelledby="experiments-title">
        <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Experiments
          </p>
          <div>
            <div className="flex items-baseline justify-between gap-5">
              <h2 id="experiments-title" className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
                Questions I am testing in code.
              </h2>
              <Link className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="/projects">
                All →
              </Link>
            </div>
            <div className="mt-9 border-b border-[var(--border)]">
              {experiments.map((experiment) => (
                <Link
                  key={experiment.slug}
                  href={`/projects/${experiment.slug}`}
                  className="group block border-t border-[var(--border)] py-5"
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                    <span className="text-base font-medium group-hover:text-[var(--accent)] sm:text-lg">
                      {experiment.title} →
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">{experiment.status}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
                    {experiment.summary}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-[var(--text-primary)] pt-8 sm:mt-32" aria-labelledby="open-source-title">
        <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Open-source work
          </p>
          <div>
            <div className="flex items-baseline justify-between gap-5">
              <h2 id="open-source-title" className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
                Public repositories and tools.
              </h2>
              <a className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="https://github.com/0xharryriddle" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>
            <div className="mt-9 border-b border-[var(--border)]">
              {openSourceWork.map((work) => (
                <a
                  key={work.name}
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-t border-[var(--border)] py-5"
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                    <span className="text-base font-medium group-hover:text-[var(--accent)] sm:text-lg">
                      {work.name} ↗
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">{work.stack}</span>
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
                    {work.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-[var(--text-primary)] pt-8 sm:mt-32" aria-labelledby="competitive-work-title">
        <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
            Competitive work
          </p>
          <div>
            <h2 id="competitive-work-title" className="text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-3xl">
              Building under a clock.
            </h2>
            {competitiveWork.length > 0 ? (
              <div className="mt-9 border-b border-[var(--border)]">
                {competitiveWork.map((entry) => (
                  <div key={`${entry.name}-${entry.year}`} className="border-t border-[var(--border)] py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                      {entry.href ? (
                        <a className="text-base font-medium hover:text-[var(--accent)] sm:text-lg" href={entry.href} target="_blank" rel="noopener noreferrer">
                          {entry.name} ↗
                        </a>
                      ) : (
                        <span className="text-base font-medium sm:text-lg">{entry.name}</span>
                      )}
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        {entry.year} · {entry.result ?? entry.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{entry.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-7 max-w-xl border-t border-[var(--border)] pt-5 text-sm leading-6 text-[var(--text-secondary)]">
                Competition entries will appear here as the results, role, and submission are ready to publish.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-24 max-w-3xl sm:mt-32" aria-labelledby="recent-writing-title">
        <div className="mb-6 flex items-baseline justify-between border-b border-[var(--border)] pb-3">
          <h2 id="recent-writing-title" className="text-lg font-medium tracking-tight">
            Recent writing
          </h2>
          <Link className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]" href="/blog">
            Archive →
          </Link>
        </div>
        <BlogPosts limit={3} />
      </section>
    </section>
  )
}