"use client";

import { MacWindowInline } from "./mac-window";

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  language?: string;
  languageColor?: string;
  updatedAt: string;
  stars?: number;
  forks?: number;
  isPinned?: boolean;
}

export function ProjectCard({
  name,
  description,
  url,
  language,
  languageColor,
  updatedAt,
  stars = 0,
  forks = 0,
  isPinned = false,
}: ProjectCardProps) {
  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCount = (n: number): string => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <MacWindowInline className="h-full transition-all duration-300 hover:shadow-md hover:border-neutral-300/60 dark:hover:border-neutral-600/40 hover:-translate-y-0.5">
        <div className="p-5 flex flex-col h-full">
          {/* Header: repo name + pinned badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <svg
                className="w-4 h-4 shrink-0 text-neutral-400"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
              </svg>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {name}
              </h3>
            </div>

            {isPinned && (
              <span
                className="
                  shrink-0 inline-flex items-center gap-1 px-2 py-0.5
                  text-[10px] font-semibold uppercase tracking-wider rounded-full
                  bg-amber-100 dark:bg-amber-900/30
                  text-amber-700 dark:text-amber-400
                  border border-amber-200/60 dark:border-amber-700/40
                "
              >
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8.568.75a.75.75 0 0 0-1.136 0l-1.5 2a.75.75 0 0 0-.032.093L3.28 6.016a.75.75 0 0 0 .276 1.082l1.97.984-.354 2.828-1.423 1.423a.75.75 0 0 0 1.06 1.06L6.22 11.98l2.44 1.22a.75.75 0 0 0 .68 0l2.44-1.22 1.41 1.413a.75.75 0 1 0 1.06-1.06l-1.423-1.424-.354-2.828 1.97-.984a.75.75 0 0 0 .276-1.082L11.1 2.843a.75.75 0 0 0-.032-.093l-1.5-2ZM8 2.34 9.179 4H6.821L8 2.34ZM6.21 5.5h3.58l2.04 3.4-1.828.914a.75.75 0 0 0-.424.83l.44 3.52L8 15.22l-2.018-1.056.44-3.52a.75.75 0 0 0-.424-.83L4.17 8.9 6.21 5.5Z" />
                </svg>
                Pinned
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-1 mb-4">
            {description || "No description available"}
          </p>

          {/* Footer: language · stars · forks · date */}
          <div className="flex items-center flex-wrap gap-3 text-xs text-neutral-400 dark:text-neutral-500">
            {language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: languageColor || "#858585" }}
                />
                <span>{language}</span>
              </div>
            )}

            {stars > 0 && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                </svg>
                <span>{formatCount(stars)}</span>
              </div>
            )}

            {forks > 0 && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                </svg>
                <span>{formatCount(forks)}</span>
              </div>
            )}

            <span className="ml-auto">{formatDate(updatedAt)}</span>
          </div>
        </div>
      </MacWindowInline>
    </a>
  );
}

export function ProjectCardSkeleton() {
  return (
    <MacWindowInline>
      <div className="p-5 space-y-3 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-700 rounded ml-auto" />
        </div>
      </div>
    </MacWindowInline>
  );
}
