import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { CustomMDX } from '@/components/mdx'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0xharryriddle.dev'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) return

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata

  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
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

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: '0xharryriddle',
            },
          }),
        }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to blog
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="title font-semibold text-3xl tracking-tight text-[var(--text-primary)] mb-3">
          {post.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <time className="text-[var(--text-muted)]">{formatDate(post.metadata.publishedAt)}</time>
        </div>

        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20 hover:opacity-80 transition-opacity"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Article body */}
      <article className="prose max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
