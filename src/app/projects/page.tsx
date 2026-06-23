import ProjectsGrid from '@/components/projects-grid'

export const metadata = {
  title: 'Projects',
  description: 'Open source projects and repositories.',
}

export default function ProjectsPage() {
  return (
    <section className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Projects
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Open source projects and repositories from GitHub.
        </p>
      </div>
      <ProjectsGrid />
    </section>
  )
}
