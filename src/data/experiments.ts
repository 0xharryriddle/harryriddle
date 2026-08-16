export interface ExperimentLink {
  label: string
  href: string
  external?: boolean
}

export interface Experiment {
  slug: string
  index: string
  title: string
  status: string
  summary: string
  question: string
  method: string
  evidence: string
  limitation: string
  nextStep: string
  tags: string[]
  links: ExperimentLink[]
}

export const experiments: Experiment[] = [
  {
    slug: 'voting-escrow-light-client',
    index: '01',
    title: 'Voting escrow over a Polkadot light client',
    status: 'Prototype',
    summary:
      'A browser-based experiment in keeping chain verification close to the application instead of delegating the view of state to a hosted RPC provider.',
    question:
      'Can a browser application interact with a Substrate-based chain without treating a hosted RPC endpoint as its source of truth?',
    method:
      'Run Smoldot through Substrate Connect, connect the application with Dedot, and carry chain specifications into the browser for local consensus and finality verification.',
    evidence:
      'The repository contains light-client configuration, Substrate Connect hooks, chain specifications, account queries, transfers, staking, and voting surfaces.',
    limitation:
      'The implementation is public, but its repository documentation and reproducible evaluation still need to be brought up to the standard of the technical notes.',
    nextStep:
      'Document a reproducible setup and measure the boundary between browser UX, synchronization, and local verification.',
    tags: ['Polkadot', 'Smoldot', 'Substrate Connect', 'TypeScript'],
    links: [
      { label: 'Technical study', href: '/blog/light-client-polkadot' },
      { label: 'Integration note', href: '/blog/integrate-light-client-polkadot' },
      {
        label: 'Source',
        href: 'https://github.com/0xharryriddle/Voting-Escrow-Light-Client',
        external: true,
      },
    ],
  },
  {
    slug: 'axon-cluster',
    index: '02',
    title: 'Axon Cluster',
    status: 'Working prototype',
    summary:
      'A private local network for delegating AI inference from lower-power devices to a stronger machine without exposing the cluster as a public service.',
    question:
      'Can low-power machines securely delegate local AI inference to a stronger machine without exposing the cluster as a public service?',
    method:
      'Use a private libp2p network with a pre-shared key, Noise-encrypted transport, mDNS discovery, and a leader/subordinate request protocol backed by Ollama.',
    evidence:
      'The Rust implementation includes leader and subordinate modes, protocol framing, Ollama integration, an HTTP bridge, a web interface, and a recorded demo.',
    limitation:
      'The current design targets trusted devices on one local network; it does not claim Byzantine fault tolerance, public discovery, or multi-leader scheduling.',
    nextStep:
      'Test failure and reconnect behavior across multiple local devices before expanding the trust or scheduling model.',
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
    slug: 'kaizen',
    index: '03',
    title: 'Kaizen',
    status: 'Early exploration',
    summary:
      'An architectural scaffold for exploring the boundaries of an EVM-compatible Layer 2 node in Go.',
    question:
      'What are the minimum architectural boundaries needed to assemble an EVM-compatible Layer 2 node in Go?',
    method:
      'Separate node lifecycle, batching, execution, proof, and bridge concerns behind a small command-line node scaffold before committing to a proving or settlement design.',
    evidence:
      'The repository contains a Go CLI and initial packages for node composition, L2 batching, EVM execution, zero-knowledge proving, and an L1 bridge.',
    limitation:
      'This is a work-in-progress architecture scaffold, not a functioning rollup. Its proving, settlement, data-availability, and security claims remain unvalidated.',
    nextStep:
      'Choose one narrow execution-to-settlement path and define the evidence required before adding more protocol surface area.',
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

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug)
}
