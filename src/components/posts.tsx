import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

export function BlogPosts({ limit }: { limit?: number }) {
  const allBlogs = getBlogPosts();

  const sorted = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const posts = limit ? sorted.slice(0, limit) : sorted;

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="
            group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4
            py-3 -mx-3 px-3 rounded-lg
            transition-colors duration-200
            hover:bg-neutral-100/80 dark:hover:bg-neutral-800/40
          "
          href={`/blog/${post.slug}`}
        >
          <p className="text-sm text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0 w-[140px]">
            {formatDate(post.metadata.publishedAt, false)}
          </p>
          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {post.metadata.title}
          </p>
        </Link>
      ))}
    </div>
  );
}
