import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { MacWindow } from "@/components/mac-window";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://0xharryriddle.dev";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "0xharryriddle",
            },
          }),
        }}
      />

      <MacWindow title={`~/blog/${post.slug}`}>
        {/* Back link */}
        <Link
          href="/blog"
          className="
            inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400
            hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-6
          "
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to blog
        </Link>

        {/* Title */}
        <h1 className="title font-semibold text-2xl tracking-tight mb-2">
          {post.metadata.title}
        </h1>

        {/* Meta row: date */}
        <div className="flex flex-wrap items-center gap-3 mt-2 mb-4 text-sm">
          <p className="text-neutral-500 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>

        {/* Tags */}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="
                  px-2.5 py-1 text-xs font-medium rounded-full
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-600 dark:text-neutral-400
                  border border-neutral-200/60 dark:border-neutral-700/40
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  transition-colors
                "
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Article body */}
        <article className="prose max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </MacWindow>
    </section>
  );
}
