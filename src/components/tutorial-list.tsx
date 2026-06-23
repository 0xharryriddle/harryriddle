import type { TutorialDifficulty, TutorialMetadata } from '@/app/community/utils'

interface TutorialListProps {
  tutorials: Array<{
    slug: string
    metadata: TutorialMetadata
  }>
}

const difficultyColor: Record<TutorialDifficulty, string> = {
  beginner: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  advanced: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
}

function DifficultyBadge({ difficulty }: { difficulty: TutorialDifficulty }) {
  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${difficultyColor[difficulty]}`}
    >
      {difficulty}
    </span>
  )
}

function StatusIndicator({ status }: { status: string }) {
  const colors: Record<string, string> = {
    published: 'bg-green-500',
    'in-progress': 'bg-amber-500',
    'coming-soon': 'bg-neutral-400',
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status] || 'bg-neutral-400'}`} />
      {status}
    </span>
  )
}

export function TutorialList({ tutorials }: TutorialListProps) {
  const published = tutorials.filter((t) => t.metadata.status === 'published')
  const inProgress = tutorials.filter((t) => t.metadata.status === 'in-progress')
  const comingSoon = tutorials.filter(
    (t) => t.metadata.status === 'coming-soon' || !t.metadata.status,
  )

  const renderCards = (items: typeof tutorials, clickable: boolean) =>
    items.map((tutorial) => {
      const card = (
        <div
          className={`
            p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm
            ${clickable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
          `}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-medium text-[var(--text-primary)] text-sm">
              {tutorial.metadata.title}
            </h3>
            <DifficultyBadge difficulty={tutorial.metadata.difficulty} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">
            {tutorial.metadata.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              {tutorial.metadata.duration && <span>{tutorial.metadata.duration}</span>}
              <span>{tutorial.metadata.publishedAt}</span>
            </div>
            <StatusIndicator status={tutorial.metadata.status} />
          </div>
        </div>
      )

      if (clickable) {
        return (
          <a key={tutorial.slug} href={`/community/tutorials/${tutorial.slug}`} className="block">
            {card}
          </a>
        )
      }

      return <div key={tutorial.slug}>{card}</div>
    })

  return (
    <div className="space-y-6">
      {published.length > 0 && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
            Published
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">{renderCards(published, true)}</div>
        </div>
      )}

      {inProgress.length > 0 && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
            In Progress
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">{renderCards(inProgress, false)}</div>
        </div>
      )}

      {comingSoon.length > 0 && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
            Coming Soon
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">{renderCards(comingSoon, false)}</div>
        </div>
      )}

      {tutorials.length === 0 && (
        <p className="text-sm text-[var(--text-muted)] py-6 text-center">
          No tutorials yet. Coming soon!
        </p>
      )}
    </div>
  )
}
