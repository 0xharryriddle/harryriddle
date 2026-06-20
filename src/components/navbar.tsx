'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/research', name: 'Research' },
  { path: '/experience', name: 'Experience' },
  { path: '/projects', name: 'Projects' },
  { path: '/blog', name: 'Blog' },
]

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="
          mx-auto
          border-b border-[var(--border)]
          bg-[var(--bg-secondary)]/80
          backdrop-blur-xl
        "
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="
              font-mono text-sm font-semibold tracking-tight
              text-[var(--text-primary)]
              hover:text-[var(--text-secondary)]
              transition-colors
            "
          >
            Nguyen Thai Cong
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={`
                  px-3 py-1.5 rounded-lg text-sm transition-all duration-200
                  ${
                    isActive(path)
                      ? 'bg-[var(--accent)] text-white font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)]/40'
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
