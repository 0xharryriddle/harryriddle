import Link from 'next/link'
import { getBlogPosts } from '@/app/blog/utils'
import { formatDate } from '@/lib/utils'
import { getBlogPostsFromNotion } from '@/lib/notion'

export const metadata = {
  title: 'Writing',
  description:
    'Technical notes on light clients, blockchain infrastructure, and systems built through research.',
}

export default async function BlogPage() {
  const notionPosts = await getBlogPostsFromNotion().catch(() => [])
  const staticPosts = getBlogPosts()

  const posts =
    notionPosts.length > 0
      ? notionPosts
      : staticPosts.map((post) => ({
          slug: post.slug,
          title: post.metadata.title,
          publishedAt: post.metadata.publishedAt,
          summary: post.metadata.summary,
          tags: post.metadata.tags ?? [],
          image: post.metadata.image,
          content: post.content,
        }))

  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <section className="mx-auto max-w-3xl pb-8 pt-16 sm:pt-24">
      <header className="mb-16 max-w-2xl sm:mb-20">
        <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">Notes from the workbench</p>
        <h1 className="text-4xl font-medium tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          Writing
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
          Technical studies, implementation notes, and field observations from learning how
          decentralized systems work below their public interfaces.
        </p>
      </header>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-4 py-8 sm:grid-cols-[3rem_1fr_8.5rem] sm:py-10"
          >
            <p className="font-mono text-xs text-[var(--text-muted)]">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div>
              <h2 className="text-xl font-medium tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {post.title} <span aria-hidden="true">→</span>
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--text-secondary)]">
                {post.summary}
              </p>
              <div className="mt-4 font-mono text-xs leading-6 text-[var(--text-muted)]">
                {post.tags && post.tags.length > 0 && (
                  <span>{post.tags.join(' · ')}</span>
                )}
                <span className="sm:hidden">
                  {post.tags && post.tags.length > 0 ? ' · ' : ''}
                  <time className="tabular-nums">
                    {formatDate(post.publishedAt, false)}
                  </time>
                </span>
              </div>
            </div>
            <time className="hidden font-mono text-xs tabular-nums text-[var(--text-muted)] sm:block sm:text-right">
              {formatDate(post.publishedAt, false)}
            </time>
          </Link>
        ))}
      </div>
    </section>
  )
}