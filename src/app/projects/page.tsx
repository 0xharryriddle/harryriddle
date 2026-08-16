import Link from 'next/link'

const experiments = [
  {
    index: '01',
    title: 'Voting escrow over a Polkadot light client',
    status: 'Prototype',
    question:
      'Can a browser application interact with a Substrate-based chain without treating a hosted RPC endpoint as its source of truth?',
    method:
      'Run Smoldot through Substrate Connect, connect the application with Dedot, and carry chain specifications into the browser for local consensus and finality verification.',
    evidence:
      'The repository contains light-client configuration, Substrate Connect hooks, chain specifications, account queries, transfers, staking, and voting surfaces.',
    limitation:
      'The implementation is public, but its repository documentation and reproducible evaluation still need to be brought up to the standard of the technical notes.',
    tags: ['Polkadot', 'Smoldot', 'Substrate Connect', 'TypeScript'],
    links: [
      {
        label: 'Technical study',
        href: '/blog/light-client-polkadot',
      },
      {
        label: 'Integration note',
        href: '/blog/integrate-light-client-polkadot',
      },
      {
        label: 'Source',
        href: 'https://github.com/0xharryriddle/Voting-Escrow-Light-Client',
        external: true,
      },
    ],
  },
  {
    index: '02',
    title: 'Axon Cluster',
    status: 'Working prototype',
    question:
      'Can low-power machines securely delegate local AI inference to a stronger machine without exposing the cluster as a public service?',
    method:
      'Use a private libp2p network with a pre-shared key, Noise-encrypted transport, mDNS discovery, and a leader/subordinate request protocol backed by Ollama.',
    evidence:
      'The Rust implementation includes leader and subordinate modes, protocol framing, Ollama integration, an HTTP bridge, a web interface, and a recorded demo.',
    limitation:
      'The current design targets trusted devices on one local network; it does not claim Byzantine fault tolerance, public discovery, or multi-leader scheduling.',
    tags: ['Rust', 'libp2p', 'Ollama', 'Local AI'],
    links: [
      {
        label: 'Source and demo',
        href: 'https://github.com/0xharryriddle/axon_cluster',
        external: true,
      },
    ],
  },
  {
    index: '03',
    title: 'Kaizen',
    status: 'Early exploration',
    question:
      'What are the minimum architectural boundaries needed to assemble an EVM-compatible Layer 2 node in Go?',
    method:
      'Separate node lifecycle, batching, execution, proof, and bridge concerns behind a small command-line node scaffold before committing to a proving or settlement design.',
    evidence:
      'The repository contains a Go CLI and initial packages for node composition, L2 batching, EVM execution, zero-knowledge proving, and an L1 bridge.',
    limitation:
      'This is a work-in-progress architecture scaffold, not a functioning rollup. Its proving, settlement, data-availability, and security claims remain unvalidated.',
    tags: ['Go', 'Ethereum', 'Layer 2', 'Architecture'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/0xharryriddle/kaizen',
        external: true,
      },
    ],
  },
]

export const metadata = {
  title: 'Experiments',
  description: 'Research implementations, technical experiments, and open-source systems.',
}

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-3xl pb-8 pt-16 sm:pt-24">
      <header className="mb-16 max-w-2xl sm:mb-20">
        <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">Research through code</p>
        <h1 className="text-4xl font-medium tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl">
          Experiments
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
          Small systems built to answer a technical question. I record the method, the evidence that
          exists today, and the boundary between a working result and an unfinished claim.
        </p>
      </header>

      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {experiments.map((experiment) => (
          <article key={experiment.index} className="grid gap-6 py-10 sm:grid-cols-[3rem_1fr] sm:py-12">
            <p className="font-mono text-xs text-[var(--text-muted)]">{experiment.index}</p>
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-medium tracking-tight text-[var(--text-primary)]">
                  {experiment.title}
                </h2>
                <p className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
                  {experiment.status}
                </p>
              </div>

              <dl className="mt-8 grid gap-6 text-sm leading-7 sm:grid-cols-[7rem_1fr] sm:gap-y-5">
                <dt className="font-mono text-xs text-[var(--text-muted)]">Question</dt>
                <dd className="text-[var(--text-primary)]">{experiment.question}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Method</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.method}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Evidence</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.evidence}</dd>

                <dt className="font-mono text-xs text-[var(--text-muted)]">Current limit</dt>
                <dd className="text-[var(--text-secondary)]">{experiment.limitation}</dd>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                {experiment.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      className="editorial-link"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link key={link.href} className="editorial-link" href={link.href}>
                      {link.label} →
                    </Link>
                  ),
                )}
              </div>

              <p className="mt-6 font-mono text-xs leading-6 text-[var(--text-muted)]">
                {experiment.tags.join(' · ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
