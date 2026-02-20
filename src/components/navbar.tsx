"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/projects", name: "projects" },
  { path: "/companies", name: "companies" },
  { path: "/community", name: "community" },
  { path: "/resume", name: "resume" },
  { path: "/about", name: "about" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="
          mx-auto
          border-b border-neutral-200/50 dark:border-neutral-700/50
          bg-white/72 dark:bg-neutral-900/72
          backdrop-blur-xl backdrop-saturate-150
        "
      >
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo / Name */}
          <Link
            href="/"
            className="
              font-mono text-sm font-semibold tracking-tight
              text-neutral-900 dark:text-neutral-100
              hover:text-neutral-600 dark:hover:text-neutral-300
              transition-colors
            "
          >
            0xharryriddle
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className={`
                  px-3 py-1.5 rounded-lg text-sm transition-all duration-200
                  ${
                    isActive(path)
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
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
  );
}
