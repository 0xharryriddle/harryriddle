"use client";

import { MacWindowInline } from "./mac-window";

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  language?: string;
  languageColor?: string;
  updatedAt: string;
}

export function ProjectCard({
  name,
  description,
  url,
  language,
  languageColor,
  updatedAt,
}: ProjectCardProps) {
  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <MacWindowInline className="h-full transition-all duration-300 hover:shadow-md hover:border-neutral-300/60 dark:hover:border-neutral-600/40 hover:-translate-y-0.5">
        <div className="p-5 flex flex-col h-full">
          {/* Repo name */}
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-neutral-400"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
            </svg>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-1 mb-4">
            {description || "No description available"}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
            {language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: languageColor || "#858585" }}
                />
                <span>{language}</span>
              </div>
            )}
            <span>{formatDate(updatedAt)}</span>
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
        <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
      </div>
    </MacWindowInline>
  );
}
