import { MacWindow } from "@/components/mac-window";
import { TutorialList } from "@/components/tutorial-list";
import { getTutorials } from "@/app/community/utils";

export const metadata = {
  title: "Community",
  description:
    "Tutorials, speaking engagements, and mentorship — learning and building together in the blockchain ecosystem.",
};

function ComingSoonSection({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        flex flex-col items-center justify-center py-10 px-6 rounded-xl
        bg-white/40 dark:bg-neutral-900/40
        border border-dashed border-neutral-300/60 dark:border-neutral-700/40
        text-center
      "
    >
      <div className="mb-3 text-neutral-300 dark:text-neutral-600">{icon}</div>
      <h3 className="font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-neutral-400 dark:text-neutral-500 max-w-sm">
        {description}
      </p>
      <span
        className="
          mt-4 px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-500 dark:text-neutral-400
          border border-neutral-200/60 dark:border-neutral-700/40
        "
      >
        Coming Soon
      </span>
    </div>
  );
}

export default function CommunityPage() {
  const tutorials = getTutorials();

  return (
    <section className="py-12 space-y-8">
      {/* Header */}
      <MacWindow title="~/community">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Learning & Community
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Step-by-step tutorials for building on Polkadot & Substrate,
            speaking engagements, and mentorship opportunities. Let&apos;s learn
            and build together.
          </p>
        </div>
      </MacWindow>

      {/* Tutorial Series */}
      <MacWindow title="~/tutorials">
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight mb-1">
              Tutorial Series
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Step-by-step guides for building on Polkadot, Substrate, and the
              broader Web3 ecosystem.
            </p>
          </div>
          <TutorialList tutorials={tutorials} />
        </div>
      </MacWindow>

      {/* Speaking Engagements */}
      <MacWindow title="~/speaking">
        <h2 className="text-lg font-semibold tracking-tight mb-5">
          Speaking Engagements
        </h2>
        <ComingSoonSection
          title="Conferences & Workshops"
          description="A list of conferences, workshops, and webinars I've presented at will appear here as events are confirmed."
          icon={
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              role="img"
              aria-label="Microphone"
            >
              <title>Microphone</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          }
        />
      </MacWindow>

      {/* Mentorship */}
      <MacWindow title="~/mentorship">
        <h2 className="text-lg font-semibold tracking-tight mb-5">
          Mentorship
        </h2>
        <ComingSoonSection
          title="Mentoring & Consulting"
          description="Availability for blockchain development mentorship and consulting sessions will be listed here."
          icon={
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              role="img"
              aria-label="People"
            >
              <title>People</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          }
        />
      </MacWindow>
    </section>
  );
}
