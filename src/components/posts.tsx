import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/app/blog/utils'

export function BlogPosts({ limit }: { limit?: number }) {
  const allBlogs = getBlogPosts()

  const sorted = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  const posts = limit ? sorted.slice(0, limit) : sorted

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="
            group flex items-start justify-between gap-4
            py-3 -mx-3 px-3 rounded-lg
            transition-colors duration-200
            hover:bg-[var(--border)]/40
          "
          href={`/blog/${post.slug}`}
        >
          <p className="text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
            {post.metadata.title}
          </p>
          <p className="text-xs text-[var(--text-muted)] tabular-nums shrink-0 pt-0.5">
            {formatDate(post.metadata.publishedAt, false)}
          </p>
        </Link>
      ))}
    </div>
  )
}
