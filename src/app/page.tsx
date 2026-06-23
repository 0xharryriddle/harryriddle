import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import DualViewSection from '@/components/dual-view'
import { BlogPosts } from '@/components/posts'

export default function Home() {
  return (
    <section className="py-8">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mb-5">
          <div className="shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
              <Image
                src="/0xharryriddle.jpg"
                alt="Nguyen Thai Cong"
                className="object-cover"
                fill
                sizes="64px"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Nguyen Thai Cong
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Blockchain Researcher &amp; Software Engineer
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-5">
          I&apos;m a blockchain researcher and software engineer from Vietnam. My work sits at the
          intersection of decentralized systems and practical engineering — building light clients
          for Substrate-based chains, exploring zero-knowledge proofs, and shipping production
          applications. I recently completed my B.S. at the University of Information Technology
          (UIT), where my focus was on Web3 and cross-chain technologies.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="https://github.com/0xharryriddle"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
              bg-[var(--text-primary)] text-[var(--bg-primary)]
              hover:opacity-90 transition-opacity
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Link>
          <Link
            href="https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
              border border-[var(--border)] text-[var(--text-secondary)]
              hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
              transition-colors
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
            Scholar
          </Link>
          <Link
            href="https://x.com/0xHarryNguyenVN"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
              border border-[var(--border)] text-[var(--text-secondary)]
              hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
              transition-colors
            "
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </Link>
        </div>
      </div>

      {/* Dual View: Research / Engineering */}
      <div className="mb-14">
        <div className="border-b border-[var(--border)] pb-1 mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            What I Do
          </h2>
        </div>
        <DualViewSection />
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-1 mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="
              text-sm text-[var(--text-secondary)]
              hover:text-[var(--text-primary)]
              transition-colors inline-flex items-center gap-1
            "
          >
            View all
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <BlogPosts limit={5} />
      </div>
    </section>
  )
}
