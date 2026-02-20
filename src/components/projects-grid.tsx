"use client";

import { useState, useEffect } from "react";
import { ProjectCard, ProjectCardSkeleton } from "./project-card";
import { pinnedRepos } from "@/data/pinnedRepos";

const GITHUB_USERNAME = "0xharryriddle";

interface Repository {
  name: string;
  description: string;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
  stars: number;
  forks: number;
  isPinned: boolean;
}

export default function ProjectsGrid() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mapped: Repository[] = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || "",
            url: repo.html_url,
            primaryLanguage: repo.language
              ? {
                  name: repo.language,
                  color: getLanguageColor(repo.language),
                }
              : null,
            updatedAt: repo.updated_at,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            isPinned: pinnedRepos.includes(repo.name),
          }));

        // Pinned repos first, then sort by updated date
        mapped.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        setRepos(mapped);
      } catch (err) {
        console.error("Failed to fetch repos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => (
          <ProjectCardSkeleton key={id} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="w-10 h-10 text-neutral-300 dark:text-neutral-600 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          Could not load repositories. Check back later.
        </p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center py-16">
        No public repositories found.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {repos.map((repo) => (
        <ProjectCard
          key={repo.name}
          name={repo.name}
          description={repo.description}
          url={repo.url}
          language={repo.primaryLanguage?.name}
          languageColor={repo.primaryLanguage?.color}
          updatedAt={repo.updatedAt}
          stars={repo.stars}
          forks={repo.forks}
          isPinned={repo.isPinned}
        />
      ))}
    </div>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Solidity: "#AA6746",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    Move: "#4a137a",
  };
  return colors[language] || "#858585";
}
