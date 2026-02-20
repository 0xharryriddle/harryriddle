"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
}

interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

interface BlogPostsFilterProps {
  posts: Post[];
}

export default function BlogPostsFilter({ posts }: BlogPostsFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique tags across all posts, preserving insertion order
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.metadata.tags ?? [])),
  ).sort();

  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const filtered =
    selectedTag == null
      ? sorted
      : sorted.filter((p) => p.metadata.tags?.includes(selectedTag));

  return (
    <div>
      {/* ── Tag filter chips ── */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={[
              "px-3 py-1 rounded-full text-xs font-medium border transition-all",
              selectedTag === null
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent"
                : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500",
            ].join(" ")}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={[
                "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                selectedTag === tag
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500",
              ].join(" ")}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* ── Post list ── */}
      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-400 dark:text-neutral-500 py-6 text-center">
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
                hover:bg-neutral-100/80 dark:hover:bg-neutral-800/40
                border-b border-neutral-100 dark:border-neutral-800/60 last:border-0
              "
            >
              {/* Date + title row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <p className="text-sm text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0 w-[140px]">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors font-medium">
                  {post.metadata.title}
                </p>
              </div>

              {/* Summary */}
              {post.metadata.summary && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 sm:pl-[156px]">
                  {post.metadata.summary}
                </p>
              )}

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:pl-[156px]">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className={[
                        "px-2 py-0.5 text-[10px] font-medium rounded-full border transition-colors",
                        tag === selectedTag
                          ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-neutral-200/60 dark:border-neutral-700/40",
                      ].join(" ")}
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
  );
}
