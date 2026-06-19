import { companies } from "@/data/companies";
import { education } from "@/data/education";
import { techStack } from "@/data/techStacks";
import Image from "next/image";

export const metadata = {
  title: "Experience",
  description: "Professional experience and skills.",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatYear(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return String(date.getFullYear());
}

export default function ExperiencePage() {
  return (
    <section className="py-8">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Curriculum Vitae
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Software engineer and blockchain researcher with experience in
          fullstack development, distributed systems, and Web3 infrastructure.
        </p>
      </div>

      {/* ─── WORK EXPERIENCE ─── */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6 pb-2 border-b border-[var(--border)]">
          Experience
        </h2>
        <div className="space-y-8">
          {companies.map((item, idx) => (
            <div key={item.id}>
              {/* Header row: role · company · dates */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-base">
                    {item.role}
                  </h3>
                  <p className="text-sm text-[var(--accent)] font-medium">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.name}
                    </a>
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  {item.logo ? (
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-white dark:bg-neutral-800 flex items-center justify-center border border-[var(--border)]">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-[var(--border)]">
                      <span className="text-xs font-bold text-[var(--text-secondary)]">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Date line */}
              <p className="text-xs font-mono text-[var(--text-muted)] mb-2">
                {formatDate(item.startDate)} &mdash;{" "}
                {item.endDate ? formatDate(item.endDate) : "Present"}
                {item.endDate === null && (
                  <span className="ml-2 px-1.5 py-0.5 text-[9px] font-medium rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                    Current
                  </span>
                )}
              </p>

              {/* Bullet points */}
              <ul className="space-y-1.5">
                {item.highlights.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative"
                  >
                    <span className="absolute left-0 top-[0.6em] w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EDUCATION ─── */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6 pb-2 border-b border-[var(--border)]">
          Education
        </h2>
        <div className="space-y-6">
          {education.map((item) => (
            <div key={item.id}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-base">
                    {item.degree}
                  </h3>
                  <p className="text-sm text-[var(--accent)] font-medium">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {item.institution}
                    </a>
                  </p>
                </div>
                {item.logo && (
                  <div className="shrink-0 pt-0.5">
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-white dark:bg-neutral-800 flex items-center justify-center border border-[var(--border)]">
                      <Image
                        src={item.logo}
                        alt={item.institution}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] mb-2">
                {item.startDate && formatYear(item.startDate)} &mdash;{" "}
                {item.endDate ? formatYear(item.endDate) : "Present"}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SKILLS ─── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-6 pb-2 border-b border-[var(--border)]">
          Skills
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {techStack.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                {category}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
