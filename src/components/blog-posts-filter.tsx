'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatDate } from '@/lib/utils'

interface PostMetadata {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string[]
}

interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}

interface BlogPostsFilterProps {
  posts: Post[]
}

export default function BlogPostsFilter({ posts }: BlogPostsFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap((p) => p.metadata.tags ?? []))).sort()

  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  )

  const filtered =
    selectedTag == null ? sorted : sorted.filter((p) => p.metadata.tags?.includes(selectedTag))

  return (
    <div>
      {/* Tag filter chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium border transition-all',
              selectedTag === null
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]',
            ].join(' ')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={[
                'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                selectedTag === tag
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-6 text-center">
          No posts found for &ldquo;{selectedTag}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="
                group flex flex-col gap-2
                py-4 -mx-3 px-3 rounded-lg
                transition-colors duration-200
                hover:bg-[var(--border)]/40
                border-b border-[var(--border)] last:border-0
              "
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[var(--text-primary)] font-medium tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {post.metadata.title}
                </p>
                <p className="text-xs text-[var(--text-muted)] tabular-nums shrink-0 pt-0.5">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>

              {post.metadata.summary && (
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {post.metadata.summary}
                </p>
              )}

              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className={[
                        'px-2 py-0.5 text-[10px] font-medium rounded-full border transition-colors',
                        tag === selectedTag
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                          : 'bg-[var(--accent-light)] text-[var(--accent)] border-[var(--accent)]/20',
                      ].join(' ')}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
