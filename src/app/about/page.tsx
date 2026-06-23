import Image from 'next/image'
import { companies } from '@/data/companies'
import { education } from '@/data/education'
import { techStack } from '@/data/techStacks'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export const metadata = {
  title: 'About',
  description: 'About Nguyen Thai Cong — Blockchain Researcher & Engineer.',
}

export default function AboutPage() {
  return (
    <section className="py-8 space-y-10">
      {/* Bio */}
      <div>
        <div className="flex items-start gap-5 mb-5">
          <div className="shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
              <Image
                src="/0xharryriddle.jpg"
                alt="Nguyen Thai Cong"
                className="object-cover"
                fill
                sizes="80px"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Nguyen Thai Cong
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Software Engineer &amp; Blockchain Researcher
            </p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          I&apos;m a software engineer and blockchain researcher based in Ho Chi Minh City, Vietnam.
          I build things that live on chains — light clients, cross-chain bridges, production APIs —
          and I write about what I learn along the way. I recently graduated from UIT with a degree
          in Software Engineering, where I spent most of my time deep in Polkadot and Substrate
          internals. When I&apos;m not coding, I&apos;m probably reading about distributed systems
          or tinkering with ZK proofs.
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Tech Stack
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {techStack.map(({ category, items }) => (
            <div
              key={category}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="
                      px-2.5 py-1 text-xs font-medium rounded-full
                      bg-[var(--accent-light)] text-[var(--accent)]
                      border border-[var(--accent)]/20
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Timeline
        </h2>
        <div className="space-y-4">
          {companies.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                  {index < companies.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--border)] mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">{item.role}</p>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                      {formatDate(item.startDate)} &mdash;{' '}
                      {item.endDate ? formatDate(item.endDate) : 'Present'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
          {education.map((item) => (
            <a
              key={`edu-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.institution}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">{item.degree}</p>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                      {formatDate(item.startDate)} &mdash;{' '}
                      {item.endDate ? formatDate(item.endDate) : 'Present'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Connect */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Connect
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/0xharryriddle"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              border border-[var(--border)] text-[var(--text-secondary)]
              hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
              transition-colors
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://x.com/0xHarryNguyenVN"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              border border-[var(--border)] text-[var(--text-secondary)]
              hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
              transition-colors
            "
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
        </div>
      </div>
    </section>
  )
}
