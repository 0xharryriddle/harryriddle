import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { CustomMDX } from '@/components/mdx'
import { getBlogPostsFromNotion } from '@/lib/notion'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0xharryriddle.dev'

interface PostShape {
  slug: string
  title: string
  publishedAt: string
  summary: string
  tags?: string[]
  image?: string
  content: string
}

async function getAllPosts(): Promise<PostShape[]> {
  const notionPosts = await getBlogPostsFromNotion().catch(() => [])

  if (notionPosts.length > 0) {
    return notionPosts
  }

  return getBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags ?? [],
    image: post.metadata.image,
    content: post.content,
  }))
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts()
  const post = posts.find((post) => post.slug === params.slug)
  if (!post) return

  const { title, publishedAt: publishedTime, summary: description, image } = post

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

export default async function Blog({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts()
  const post = posts.find((post) => post.slug === params.slug)

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
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: post.image
              ? `${baseUrl}${post.image}`
              : `/og?title=${encodeURIComponent(post.title)}`,
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
          {post.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          {post.summary}
        </p>
        <div className="mt-7 flex flex-col gap-3 font-mono text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <time>{formatDate(post.publishedAt)}</time>
          {post.tags && post.tags.length > 0 && (
            <p className="leading-6 sm:text-right">{post.tags.join(' · ')}</p>
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