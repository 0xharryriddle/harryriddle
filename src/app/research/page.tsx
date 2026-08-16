import Link from 'next/link'
import { education } from '@/data/education'
import { papers, researchInterests } from '@/data/papers'

export const metadata = {
  title: 'Research',
  description:
    'Research questions, technical notes, and ongoing work on verifiable decentralized systems.',
}

const currentWork = [
  {
    index: '01',
    title: 'How a Polkadot light client verifies the chain',
    kind: 'Technical study',
    description:
      'A source-led investigation of Smoldot’s networking, synchronization, GRANDPA finality, BABE block production, and the chain information required to verify state.',
    href: '/blog/light-client-polkadot',
  },
  {
    index: '02',
    title: 'Integrating a light client into a Polkadot application',
    kind: 'Implementation note',
    description:
      'A practical path from chain specifications to Substrate Connect, Dedot, application context, and browser-side chain interaction.',
    href: '/blog/integrate-light-client-polkadot',
  },
  {
    index: '03',
    title: 'Voting escrow over an in-browser light client',
    kind: 'Prototype',
    description:
      'A public implementation that connects account, transfer, staking, and voting surfaces to a Substrate-based chain through a local light client.',
    href: '/projects',
  },
]

function formatYear(date: string | null): string {
  return date ? String(new Date(`${date}T00:00:00`).getFullYear()) : 'Present'
}

export default function ResearchPage() {
  const papersByYear = papers.reduce<Record<number, typeof papers>>((groups, paper) => {
    if (!groups[paper.year]) groups[paper.year] = []
    groups[paper.year].push(paper)
    return groups
  }, {})
  const publicationYears = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <section className="mx-auto max-w-3xl pb-8 pt-16 sm:pt-24">
      <header className="mb-20 max-w-2xl sm:mb-28">
        <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">
          Verification · Interoperability · Distributed systems
        </p>
        <h1 className="max-w-[16ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          Research should make a system easier to verify, not merely easier to describe.
        </h1>
        <p className="mt-8 text-lg leading-8 text-[var(--text-secondary)]">
          I study how decentralized applications can preserve the trust model of the protocols
          beneath them. My current work centers on light clients, cross-chain verification, and the
          boundary between a protocol claim and the software that demonstrates it.
        </p>
      </header>

      <section className="mb-24 sm:mb-32" aria-labelledby="questions-title">
        <div className="section-heading">
          <h2 id="questions-title">Research questions</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {researchInterests.map((interest, index) => (
            <article key={interest.area} className="grid gap-4 py-7 sm:grid-cols-[3rem_11rem_1fr]">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-medium tracking-tight text-[var(--text-primary)]">
                {interest.area}
              </h3>
              <p className="leading-7 text-[var(--text-secondary)]">{interest.description}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-24 sm:mb-32" aria-labelledby="current-work-title">
        <div className="section-heading">
          <h2 id="current-work-title">Current work</h2>
          <Link href="/projects">Experiments →</Link>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {currentWork.map((work) => (
            <Link
              key={work.index}
              href={work.href}
              className="group grid gap-4 py-7 sm:grid-cols-[3rem_1fr_9rem]"
            >
              <p className="font-mono text-xs text-[var(--text-muted)]">{work.index}</p>
              <div>
                <h3 className="font-medium tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                  {work.title} <span aria-hidden="true">→</span>
                </h3>
                <p className="mt-2 leading-7 text-[var(--text-secondary)]">{work.description}</p>
              </div>
              <p className="font-mono text-xs text-[var(--text-muted)] sm:text-right">{work.kind}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-24 sm:mb-32" aria-labelledby="publications-title">
        <div className="section-heading">
          <h2 id="publications-title">Publications</h2>
        </div>
        {papers.length === 0 ? (
          <div className="max-w-2xl border-b border-[var(--border)] pb-8">
            <p className="leading-7 text-[var(--text-secondary)]">
              I do not have a formal publication to list yet. Until that changes, I publish the
              technical notes and implementations above with their assumptions and current limits
              visible.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {publicationYears.flatMap((year) =>
              papersByYear[year].map((paper) => (
                <article key={`${year}-${paper.title}`} className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr]">
                  <p className="font-mono text-xs text-[var(--text-muted)]">{year}</p>
                  <div>
                    <h3 className="font-medium tracking-tight text-[var(--text-primary)]">
                      {paper.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      {paper.authors.join(', ')} · {paper.venue}
                    </p>
                    {paper.description && (
                      <p className="mt-3 leading-7 text-[var(--text-secondary)]">
                        {paper.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-5 text-sm">
                      {paper.url && (
                        <a className="editorial-link" href={paper.url}>
                          Paper ↗
                        </a>
                      )}
                      {paper.preprintUrl && (
                        <a className="editorial-link" href={paper.preprintUrl}>
                          Preprint ↗
                        </a>
                      )}
                      {paper.codeUrl && (
                        <a className="editorial-link" href={paper.codeUrl}>
                          Code ↗
                        </a>
                      )}
                      {paper.projectUrl && (
                        <a className="editorial-link" href={paper.projectUrl}>
                          Project ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )),
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="background-title">
        <div className="section-heading">
          <h2 id="background-title">Academic background</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {education.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-4 py-7 sm:grid-cols-[8rem_1fr]"
            >
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {formatYear(item.startDate)}–{formatYear(item.endDate)}
              </p>
              <div>
                <h3 className="font-medium tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                  {item.degree} ↗
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.institution}</p>
                <p className="mt-3 leading-7 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </section>
  )
}