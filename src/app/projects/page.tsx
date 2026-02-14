import { MacWindow } from "@/components/mac-window";
import ProjectsGrid from "@/components/projects-grid";

export const metadata = {
  title: "Projects",
  description: "Open source projects and repositories.",
};

export default function ProjectsPage() {
  return (
    <section className="py-12">
      <MacWindow title="~/projects">
        <h1 className="font-semibold text-2xl mb-2 tracking-tight">Projects</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm">
          Open source projects and repositories from GitHub.
        </p>
      </MacWindow>

      <div className="mt-8">
        <ProjectsGrid />
      </div>
    </section>
  );
}
