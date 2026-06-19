"use client";

import { useState, useCallback } from "react";
import { BookOpen, Briefcase } from "lucide-react";
import Link from "next/link";
import { researchInterests } from "@/data/papers";
import { education } from "@/data/education";
import { companies } from "@/data/companies";
import { techStack } from "@/data/techStacks";
import type { Company } from "@/data/companies";

type ViewMode = "research" | "engineering";

export default function DualViewSection() {
  const [activeView, setActiveView] = useState<ViewMode>("research");
  const [transitioning, setTransitioning] = useState(false);

  const switchView = useCallback(
    (view: ViewMode) => {
      if (view === activeView || transitioning) return;
      setTransitioning(true);
      requestAnimationFrame(() => {
        setActiveView(view);
        requestAnimationFrame(() => {
          setTransitioning(false);
        });
      });
    },
    [activeView, transitioning],
  );

  const currentCompanies = companies.filter((c) => c.endDate === null);

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => switchView("research")}
          className={`
            inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
            transition-all duration-300 border
            ${
              activeView === "research"
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
                : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }
          `}
        >
          <BookOpen className="w-4 h-4" />
          Research
        </button>
        <button
          type="button"
          onClick={() => switchView("engineering")}
          className={`
            inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
            transition-all duration-300 border
            ${
              activeView === "engineering"
                ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm"
                : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }
          `}
        >
          <Briefcase className="w-4 h-4" />
          Engineering
        </button>
      </div>

      <div className="relative min-h-[320px]">
        <div
          className={`
            transition-all duration-400 ease-out
            ${
              activeView === "research"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
            }
          `}
        >
          {activeView === "research" && <ResearchContent />}
        </div>
        <div
          className={`
            transition-all duration-400 ease-out
            ${
              activeView === "engineering"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
            }
          `}
        >
          {activeView === "engineering" && (
            <EngineeringContent currentCompanies={currentCompanies} />
          )}
        </div>
      </div>
    </div>
  );
}

function ResearchContent() {
  return (
    <div className="space-y-5">
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Research Interests
        </h3>
        <div className="space-y-3">
          {researchInterests.map((interest) => (
            <div key={interest.area}>
              <p className="font-medium text-sm text-[var(--text-primary)]">
                {interest.area}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Academic Background
        </h3>
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
              <div>
                <p className="font-medium text-sm text-[var(--text-primary)]">
                  {item.degree}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {item.institution} &mdash;{" "}
                  {new Date(item.startDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric" })}
                  &ndash;
                  {item.endDate
                    ? new Date(item.endDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric" })
                    : "Present"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-1">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
        >
          View all research & publications
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function EngineeringContent({
  currentCompanies,
}: {
  currentCompanies: Company[];
}) {
  return (
    <div className="space-y-5">
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Current Role
        </h3>
        {currentCompanies.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-[var(--text-primary)]">
                {currentCompanies[0].role} @ {currentCompanies[0].name}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {currentCompanies[0].description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {techStack
            .flatMap((c) => c.items)
            .slice(0, 12)
            .map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20"
              >
                {item}
              </span>
            ))}
          <span className="px-2.5 py-1 text-xs font-medium rounded-full text-[var(--text-muted)]">
            +{techStack.flatMap((c) => c.items).length - 12} more
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
        >
          Full experience timeline
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          View projects
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
