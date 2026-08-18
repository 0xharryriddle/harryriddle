import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { getBlogPostsFromNotion } from '@/lib/notion'

export async function BlogPosts({ limit }: { limit?: number }) {
  const notionPosts = await getBlogPostsFromNotion().catch(() => [])
  const staticPosts = getBlogPosts()

  const allPosts =
    notionPosts.length > 0
      ? notionPosts.map((post) => ({
          slug: post.slug,
          title: post.title,
          publishedAt: post.publishedAt,
        }))
      : staticPosts.map((post) => ({
          slug: post.slug,
          title: post.metadata.title,
          publishedAt: post.metadata.publishedAt,
        }))

  const sorted = allPosts.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

  const posts = limit ? sorted.slice(0, limit) : sorted

  return (
    <div className="flex flex-col divide-y divide-[var(--border)] border-b border-[var(--border)]">
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="
            group grid gap-2 py-5 transition-colors duration-200
            sm:grid-cols-[8.5rem_1fr] sm:items-baseline
          "
          href={`/blog/${post.slug}`}
        >
          <p className="order-2 text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors sm:order-2">
            {post.title} <span aria-hidden="true">↗</span>
          </p>
          <p className="order-1 font-mono text-xs text-[var(--text-muted)] tabular-nums sm:order-1">
            {formatDate(post.publishedAt, false)}
          </p>
        </Link>
      ))}
    </div>
  )
}