export interface OpenSourceWork {
  name: string
  description: string
  stack: string
  href: string
}

export const openSourceWork: OpenSourceWork[] = [
  {
    name: 'Hermes PMXT',
    description: 'A public repository exploring agent and developer tooling.',
    stack: 'Python · tooling',
    href: 'https://github.com/0xharryriddle/hermes-pmxt',
  },
  {
    name: 'Codex Field Kit',
    description: 'A public engineering repository for reusable agent workflows and tools.',
    stack: 'TypeScript · tooling',
    href: 'https://github.com/0xharryriddle/codex-field-kit',
  },
  {
    name: 'Coach Ticket Management Server',
    description: 'A public backend project focused on service and data-management work.',
    stack: 'Backend engineering',
    href: 'https://github.com/0xharryriddle/CoachTicketManagementApp-Server',
  },
]
