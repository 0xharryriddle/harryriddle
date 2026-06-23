import { ArrowUpRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { education } from '@/data/education'
import { papers, researchInterests } from '@/data/papers'

export const metadata = {
  title: 'Research',
  description: 'Research interests and publications.',
}

function yearGroupLabel(year: number): string {
  const currentYear = new Date().getFullYear()
  const diff = currentYear - year
  if (diff === 0) return 'Current'
  return String(year)
}

export default function ResearchPage() {
  // Group papers by year
  const papersByYear = papers.reduce<Record<number, typeof papers>>((acc, paper) => {
    if (!acc[paper.year]) acc[paper.year] = []
    acc[paper.year].push(paper)
    return acc
  }, {})
  const years = Object.keys(papersByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <section className="py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Research
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          My research focuses on making blockchain interoperability practical and secure. I work on
          light client protocols, cross-chain communication, and zero-knowledge proofs —
          technologies that enable trust-minimized bridges between disparate networks. I believe the
          future of Web3 depends on seamless, secure interoperability, and I&apos;m committed to
          building the primitives that make it possible.
        </p>
      </div>

      {/* Research Interests */}
      <div className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Research Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {researchInterests.map((interest) => (
            <div
              key={interest.area}
              className="
                px-4 py-2 rounded-lg border border-[var(--border)]
                bg-[var(--card-bg)] shadow-sm
              "
            >
              <p className="font-medium text-sm text-[var(--text-primary)]">{interest.area}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Publications */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Publications
        </h2>

        {papers.length === 0 ? (
          <div
            className="
              p-10 rounded-xl border border-dashed border-[var(--border)]
              text-center
            "
          >
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-[var(--text-muted)]" />
            <p className="text-[var(--text-secondary)] text-sm">
              Publications will appear here once added.
            </p>
            <p className="text-[var(--text-muted)] text-xs mt-1">
              Edit <code className="text-xs">src/data/papers.ts</code> to add your papers.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year}>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-4">
                  {yearGroupLabel(year)}
                </h3>
                <div className="space-y-4">
                  {papersByYear[year].map((paper, idx) => (
                    <div
                      key={idx}
                      className="
                        p-5 rounded-xl border border-[var(--border)]
                        bg-[var(--card-bg)] shadow-sm
                      "
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="font-medium text-[var(--text-primary)]">{paper.title}</h4>
                          <p className="text-sm text-[var(--text-secondary)] mt-1">
                            {paper.authors.join(', ')}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{paper.venue}</p>
                          {paper.award && (
                            <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                              {paper.award}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {paper.url && (
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex items-center gap-1 text-xs font-medium
                              text-[var(--accent)] hover:text-[var(--accent-hover)]
                              transition-colors
                            "
                          >
                            Paper <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        {paper.codeUrl && (
                          <a
                            href={paper.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex items-center gap-1 text-xs font-medium
                              text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                              transition-colors
                            "
                          >
                            Code <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        {paper.projectUrl && (
                          <a
                            href={paper.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex items-center gap-1 text-xs font-medium
                              text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                              transition-colors
                            "
                          >
                            Project Page <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {paper.description && (
                        <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                          {paper.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Academic Background
        </h2>
        <div className="space-y-4">
          {education.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm hover:shadow-md transition-shadow">
                {item.logo ? (
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 flex items-center justify-center border border-[var(--border)] shrink-0">
                    <Image
                      src={item.logo}
                      alt={item.institution}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-[var(--border)] shrink-0">
                    <span className="text-base font-bold text-[var(--text-secondary)]">
                      {item.institution.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors text-sm">
                    {item.degree}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.institution}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {new Date(item.startDate + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric',
                      })}{' '}
                      &ndash;{' '}
                      {item.endDate
                        ? new Date(item.endDate + 'T00:00:00').toLocaleDateString('en-US', {
                            year: 'numeric',
                          })
                        : 'Present'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="
            inline-flex items-center gap-1.5 text-sm
            text-[var(--text-secondary)] hover:text-[var(--text-primary)]
            transition-colors
          "
        >
          &larr; Back to home
        </Link>
      </div>
    </section>
  )
}
