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
    <div className="flex flex-col items-center justify-center py-10 px-6 rounded-xl border border-dashed border-[var(--border)] text-center">
      <div className="mb-3 text-[var(--text-muted)]">{icon}</div>
      <h3 className="font-medium text-[var(--text-primary)] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-sm">
        {description}
      </p>
      <span className="mt-4 px-3 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent)]/20">
        Coming Soon
      </span>
    </div>
  );
}

export default function CommunityPage() {
  const tutorials = getTutorials();

  return (
    <section className="py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Learning &amp; Community
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Tutorials and guides for building on Polkadot, Substrate, and the
          broader Web3 ecosystem. I believe the best way to learn is by
          building — so these are hands-on, step-by-step, and designed to get
          you from zero to something real. I also speak at events and mentor
          developers entering the space.
        </p>
      </div>

      {/* Tutorial Series */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Tutorial Series
        </h2>
        <TutorialList tutorials={tutorials} />
      </div>

      {/* Speaking Engagements */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Speaking Engagements
        </h2>
        <ComingSoonSection
          title="Conferences &amp; Workshops"
          description="A list of conferences, workshops, and webinars I've presented at will appear here as events are confirmed."
          icon={
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} role="img" aria-label="Microphone">
              <title>Microphone</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          }
        />
      </div>

      {/* Mentorship */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
          Mentorship
        </h2>
        <ComingSoonSection
          title="Mentoring &amp; Consulting"
          description="Availability for blockchain development mentorship and consulting sessions will be listed here."
          icon={
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} role="img" aria-label="People">
              <title>People</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          }
        />
      </div>
    </section>
  );
}
