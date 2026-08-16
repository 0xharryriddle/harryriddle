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
    <section className="mx-auto max-w-3xl pb-8 pt-10 sm:pt-16">
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

      <Link
        href="/blog"
        className="editorial-link text-sm"
      >
        ← Writing
      </Link>

      <header className="mb-14 mt-14 border-b border-[var(--border)] pb-10 sm:mb-16 sm:mt-20 sm:pb-12">
        <h1 className="title max-w-[18ch] text-4xl font-medium leading-[1.08] tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          {post.metadata.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          {post.metadata.summary}
        </p>
        <div className="mt-7 flex flex-col gap-3 font-mono text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <time>{formatDate(post.metadata.publishedAt)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <p className="leading-6 sm:text-right">{post.metadata.tags.join(' · ')}</p>
          )}
        </div>
      </header>

      <article className="prose max-w-[44rem]">
        <CustomMDX source={post.content} />
      </article>

      <footer className="mt-20 border-t border-[var(--border)] pt-8">
        <Link href="/blog" className="editorial-link text-sm">
          ← More writing
        </Link>
      </footer>
    </section>
  )
}
