import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate } from "@/app/blog/utils";
import { getTutorials } from "@/app/community/utils";
import { MacWindow } from "@/components/mac-window";
import type { TutorialDifficulty } from "@/app/community/utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://0xharryriddle.dev";

export async function generateStaticParams() {
  const tutorials = getTutorials();
  return tutorials
    .filter((t) => t.metadata.status !== "coming-soon")
    .map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tutorial = getTutorials().find((t) => t.slug === params.slug);
  if (!tutorial) return;

  const { title, summary: description } = tutorial.metadata;
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/community/tutorials/${tutorial.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

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

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = getTutorials().find((t) => t.slug === params.slug);

  if (!tutorial || tutorial.metadata.status === "coming-soon") {
    notFound();
  }

  return (
    <section className="py-12">
      <MacWindow title={`~/tutorials/${tutorial.slug}`}>
        <h1 className="title font-semibold text-2xl tracking-tight mb-2">
          {tutorial.metadata.title}
        </h1>

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          <DifficultyBadge difficulty={tutorial.metadata.difficulty} />

          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs">
            {tutorial.metadata.duration}
          </span>

          <span className="text-neutral-300 dark:text-neutral-700">·</span>

          <span className="text-neutral-500 dark:text-neutral-400 text-xs">
            {formatDate(tutorial.metadata.publishedAt)}
          </span>
        </div>

        {/* Tags */}
        {tutorial.metadata.tags && tutorial.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {tutorial.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-2.5 py-1 text-xs font-medium rounded-lg
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

        <article className="prose max-w-none">
          <CustomMDX source={tutorial.content} />
        </article>
      </MacWindow>
    </section>
  );
}
