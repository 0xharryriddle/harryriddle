import { MacWindow } from "@/components/mac-window";
import CompaniesFilter from "@/components/companies-filter";
import { companies } from "@/data/companies";

export const metadata = {
  title: "Companies",
  description: "Work experience and educational background.",
};

export default function CompaniesPage() {
  return (
    <section className="py-12">
      <MacWindow title="~/companies">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-semibold text-2xl mb-2 tracking-tight">
              Companies & Education
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              My work experience and educational background.
            </p>
          </div>

          {/* Companies with filtering */}
          <CompaniesFilter companies={companies} />
        </div>
      </MacWindow>
    </section>
  );
}
