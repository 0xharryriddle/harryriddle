"use client";

import { useState } from "react";
import Image from "next/image";
import type { Company } from "@/data/companies";

type FilterType = "all" | "current" | "past";

export default function CompaniesFilter({
  companies,
}: {
  companies: Company[];
}) {
  const [filter, setFilter] = useState<FilterType>("all");

  const currentCompanies = companies.filter((c) => c.endDate === null);
  const pastCompanies = companies.filter((c) => c.endDate !== null);

  const displayedCompanies =
    filter === "current"
      ? currentCompanies
      : filter === "past"
        ? pastCompanies
        : companies;

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200/60 dark:border-neutral-700/40 pb-1">
        <button
          onClick={() => setFilter("all")}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              filter === "all"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          All
          <span className="ml-1.5 text-xs opacity-60">
            ({companies.length})
          </span>
        </button>
        <button
          onClick={() => setFilter("current")}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              filter === "current"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          Current
          <span className="ml-1.5 text-xs opacity-60">
            ({currentCompanies.length})
          </span>
        </button>
        <button
          onClick={() => setFilter("past")}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              filter === "past"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }
          `}
        >
          Past
          <span className="ml-1.5 text-xs opacity-60">
            ({pastCompanies.length})
          </span>
        </button>
      </div>

      {/* Companies List */}
      <div className="space-y-6">
        {displayedCompanies.map((company, index) => (
          <a
            key={index}
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center pt-1.5">
                {company.logo ? (
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-700/40">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                )}
                {index < displayedCompanies.length - 1 && (
                  <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-700 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {company.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                      {company.startDate} — {company.endDate || "Present"}
                    </span>
                    {company.endDate === null && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>
          </a>
        ))}

        {displayedCompanies.length === 0 && (
          <div className="text-center py-12 text-neutral-400 dark:text-neutral-500">
            No {filter} companies found.
          </div>
        )}
      </div>
    </>
  );
}
