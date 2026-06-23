import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/app/blog/utils'
import type { TutorialDifficulty } from '@/app/community/utils'
import { getTutorials } from '@/app/community/utils'
import { CustomMDX } from '@/components/mdx'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0xharryriddle.dev'

export async function generateStaticParams() {
  const tutorials = getTutorials()
  return tutorials.filter((t) => t.metadata.status !== 'coming-soon').map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tutorial = getTutorials().find((t) => t.slug === params.slug)
  if (!tutorial) return

  const { title, summary: description } = tutorial.metadata
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/community/tutorials/${tutorial.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

function DifficultyBadge({ difficulty }: { difficulty: TutorialDifficulty }) {
  const styles: Record<TutorialDifficulty, string> = {
    beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  }

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  )
}

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = getTutorials().find((t) => t.slug === params.slug)

  if (!tutorial || tutorial.metadata.status === 'coming-soon') {
    notFound()
  }

  return (
    <section className="py-8">
      {/* Back link */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to community
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="title font-semibold text-3xl tracking-tight text-[var(--text-primary)] mb-3">
          {tutorial.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <DifficultyBadge difficulty={tutorial.metadata.difficulty} />
          <span className="text-[var(--text-muted)] font-mono text-xs">
            {tutorial.metadata.duration}
          </span>
          <span className="text-[var(--border)]">·</span>
          <time className="text-[var(--text-muted)] text-xs">
            {formatDate(tutorial.metadata.publishedAt)}
          </time>
        </div>

        {tutorial.metadata.tags && tutorial.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tutorial.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <article className="prose max-w-none">
        <CustomMDX source={tutorial.content} />
      </article>
    </section>
  )
}
