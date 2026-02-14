"use client";

import { useState, useEffect } from "react";
import { ProjectCard, ProjectCardSkeleton } from "./project-card";

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
}

export default function ProjectsGrid() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=owner`,
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mapped = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || "",
            url: repo.html_url,
            primaryLanguage: repo.language
              ? { name: repo.language, color: getLanguageColor(repo.language) }
              : null,
            updatedAt: repo.updated_at,
          }));

        setRepos(mapped);
      } catch (err) {
        console.error("Failed to fetch repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
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
