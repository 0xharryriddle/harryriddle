import Link from "next/link";
import { formatDate } from "@/app/blog/utils";
import type {
  TutorialMetadata,
  TutorialDifficulty,
  TutorialStatus,
} from "@/app/community/utils";

function DifficultyBadge({ difficulty }: { difficulty: TutorialDifficulty }) {
  const styles: Record<TutorialDifficulty, string> = {
    beginner:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
    intermediate:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40",
    advanced:
      "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/40",
  };

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

function StatusIndicator({ status }: { status: TutorialStatus }) {
  const config: Record<
    TutorialStatus,
    { label: string; dot: string; text: string }
  > = {
    published: {
      label: "Published",
      dot: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    "in-progress": {
      label: "In Progress",
      dot: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
    },
    "coming-soon": {
      label: "Coming Soon",
      dot: "bg-neutral-400 dark:bg-neutral-500",
      text: "text-neutral-500 dark:text-neutral-400",
    },
  };

  const { label, dot, text } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

interface TutorialCardProps {
  slug: string;
  metadata: TutorialMetadata;
}

function TutorialCard({ slug, metadata }: TutorialCardProps) {
  const isClickable = metadata.status !== "coming-soon";

  const content = (
    <div
      className={`
        group p-4 rounded-xl
        bg-white/60 dark:bg-neutral-900/60
        border border-neutral-200/40 dark:border-neutral-700/30
        shadow-sm
        backdrop-blur-sm
        transition-all duration-200
        ${isClickable ? "hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:border-neutral-300/60 dark:hover:border-neutral-600/50 hover:shadow-md cursor-pointer" : "opacity-75"}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3
          className={`font-medium text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug ${
            isClickable
              ? "group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
              : ""
          } transition-colors`}
        >
          {metadata.title}
        </h3>
        <StatusIndicator status={metadata.status} />
      </div>

      {/* Summary */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
        {metadata.summary}
      </p>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-2">
        <DifficultyBadge difficulty={metadata.difficulty} />

        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
          {metadata.duration}
        </span>

        <span className="text-neutral-200 dark:text-neutral-700">·</span>

        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
          {formatDate(metadata.publishedAt, false)}
        </span>
      </div>

      {/* Tags */}
      {metadata.tags && metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="
                px-2 py-0.5 text-[10px] font-medium rounded-md
                bg-neutral-100 dark:bg-neutral-800
                text-neutral-600 dark:text-neutral-400
                border border-neutral-200/40 dark:border-neutral-700/30
              "
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (!isClickable) return content;

  return (
    <Link href={`/community/tutorials/${slug}`} className="block">
      {content}
    </Link>
  );
}

interface TutorialListProps {
  tutorials: {
    metadata: TutorialMetadata;
    slug: string;
    content: string;
  }[];
}

export function TutorialList({ tutorials }: TutorialListProps) {
  const statusOrder: Record<TutorialStatus, number> = {
    published: 0,
    "in-progress": 1,
    "coming-soon": 2,
  };

  const sorted = [...tutorials].sort((a, b) => {
    const statusDiff =
      statusOrder[a.metadata.status] - statusOrder[b.metadata.status];
    if (statusDiff !== 0) return statusDiff;
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  if (sorted.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400 dark:text-neutral-500 text-sm">
        No tutorials yet. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sorted.map((tutorial) => (
        <TutorialCard
          key={tutorial.slug}
          slug={tutorial.slug}
          metadata={tutorial.metadata}
        />
      ))}
    </div>
  );
}
