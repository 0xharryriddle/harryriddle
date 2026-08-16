'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/research', name: 'Research' },
  { path: '/experience', name: 'Experience' },
  { path: '/projects', name: 'Experiments' },
  { path: '/blog', name: 'Writing' },
]

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="relative z-50">
      <nav className="mx-auto bg-[var(--bg-primary)]">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 border-b border-[var(--border)] px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="
              shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.06em] sm:text-[11px] sm:tracking-[0.08em]
              text-[var(--text-primary)]
              hover:text-[var(--text-secondary)]
              transition-colors
            "
          >
            <span className="sm:hidden">0xHR / notes</span>
            <span className="hidden sm:inline">0xharryriddle / protocol notes</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-7">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={`
                  -my-3 whitespace-nowrap py-3 text-[10px] transition-colors duration-200 sm:text-xs
                  ${
                    isActive(path)
                      ? 'text-[var(--text-primary)] font-medium'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }
                `}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
