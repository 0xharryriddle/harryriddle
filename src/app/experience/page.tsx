import { companies } from '@/data/companies'
import { education } from '@/data/education'
import { getExperienceFromNotion, type NotionExperienceEntry } from '@/lib/notion'

export const metadata = {
  title: 'Experience',
  description: 'Professional work, technical training, and the engineering practice behind it.',
}

const workingSet = [
  {
    area: 'Protocol and systems',
    tools: 'Rust · Go · TypeScript · Solidity · Polkadot · Ethereum',
  },
  {
    area: 'Product engineering',
    tools: 'C# · ASP.NET Core · Flutter · React · Next.js',
  },
  {
    area: 'Data and services',
    tools: 'PostgreSQL · Redis · MongoDB · REST APIs',
  },
  {
    area: 'Delivery',
    tools: 'Docker · GitHub Actions · Linux · Vercel · Cloudflare',
  },
]

interface TimelineEntryProps {
  index: string
  title: string
  organization: string
  url: string
  startDate: string
  endDate: string | null
  description: string
  highlights?: string[]
}

function formatPeriod(startDate: string, endDate: string | null): string {
  const start = new Date(`${startDate}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
  const end = endDate
    ? new Date(`${endDate}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'Present'
  return `${start} — ${end}`
}

function TimelineEntry({
  index,
  title,
  organization,
  url,
  startDate,
  endDate,
  description,
  highlights = [],
}: TimelineEntryProps) {
  const period = formatPeriod(startDate, endDate)

  return (
    <article className="grid gap-5 py-9 sm:grid-cols-[3rem_1fr_9rem] sm:py-10">
      <p className="font-mono text-xs text-[var(--text-muted)]">{index}</p>
      <div>
        <h3 className="text-xl font-medium tracking-tight text-[var(--text-primary)]">{title}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link mt-2 inline-block text-sm"
        >
          {organization} ↗
        </a>
        <p className="mt-3 font-mono text-xs text-[var(--text-muted)] sm:hidden">{period}</p>
        <p className="mt-5 leading-7 text-[var(--text-secondary)]">{description}</p>
        {highlights.length > 0 && (
          <ul className="mt-5 space-y-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="grid grid-cols-[1rem_1fr] gap-2 text-sm leading-7 text-[var(--text-secondary)]"
              >
                <span aria-hidden="true" className="text-[var(--text-muted)]">
                  —
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="hidden font-mono text-xs leading-5 text-[var(--text-muted)] sm:block sm:text-right">
        {period}
      </p>
    </article>
  )
}

export default async function ExperiencePage() {
  const notionEntries = await getExperienceFromNotion().catch(() => [])

  const entries: NotionExperienceEntry[] = notionEntries.length
    ? notionEntries
    : [
        ...companies.map((entry) => ({
          kind: (entry.role === 'Blockchain Developer Student'
            ? 'Training'
            : 'Work') as NotionExperienceEntry['kind'],
          title: entry.role,
          organization: entry.name,
          startDate: entry.startDate,
          endDate: entry.endDate,
          description: entry.description,
          highlights: entry.highlights,
          href: entry.url,
        })),
        ...education.map((entry) => ({
          kind: 'Education' as NotionExperienceEntry['kind'],
          title: entry.degree,
          organization: entry.institution,
          startDate: entry.startDate,
          endDate: entry.endDate,
          description: entry.description,
          highlights: [] as string[],
          href: entry.url,
        })),
      ]

  const professionalWork = entries.filter((entry) => entry.kind === 'Work')
  const technicalTraining = entries.filter((entry) => entry.kind === 'Training')
  const educationEntries = entries.filter((entry) => entry.kind === 'Education')

  return (
    <section className="mx-auto max-w-3xl pb-8 pt-16 sm:pt-24">
      <header className="mb-20 max-w-2xl sm:mb-28">
        <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">
          Production systems · Protocols · Product engineering
        </p>
        <h1 className="max-w-[16ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          Engineering is where a technical claim meets operational reality.
        </h1>
        <p className="mt-8 text-lg leading-8 text-[var(--text-secondary)]">
          My experience spans production full-stack systems and independent blockchain work. I care
          about the boundary between architecture and the details that make it survive real users,
          real data, and imperfect infrastructure.
        </p>
      </header>

      <section className="mb-24 sm:mb-32" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Professional work</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {professionalWork.map((entry, index) => (
            <TimelineEntry
              key={`${entry.kind}-${entry.organization}`}
              index={String(index + 1).padStart(2, '0')}
              title={entry.title}
              organization={entry.organization}
              url={entry.href}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              highlights={entry.highlights}
            />
          ))}
        </div>
      </section>

      <section className="mb-24 sm:mb-32" aria-labelledby="training-title">
        <div className="section-heading">
          <h2 id="training-title">Technical training</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {technicalTraining.map((entry, index) => (
            <TimelineEntry
              key={`${entry.kind}-${entry.organization}`}
              index={String(index + 1).padStart(2, '0')}
              title={entry.title}
              organization={entry.organization}
              url={entry.href}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              highlights={entry.highlights}
            />
          ))}
        </div>
      </section>

      <section className="mb-24 sm:mb-32" aria-labelledby="education-title">
        <div className="section-heading">
          <h2 id="education-title">Education</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {educationEntries.map((entry, index) => (
            <TimelineEntry
              key={`${entry.kind}-${entry.organization}`}
              index={String(index + 1).padStart(2, '0')}
              title={entry.title}
              organization={entry.organization}
              url={entry.href}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              highlights={entry.highlights}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="working-set-title">
        <div className="section-heading">
          <h2 id="working-set-title">Working set</h2>
        </div>
        <div className="divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {workingSet.map((group, index) => (
            <div key={group.area} className="grid gap-4 py-6 sm:grid-cols-[3rem_11rem_1fr]">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-medium tracking-tight text-[var(--text-primary)]">{group.area}</h3>
              <p className="leading-7 text-[var(--text-secondary)]">{group.tools}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
