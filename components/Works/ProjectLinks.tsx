import type { ProjectMeta } from "@/lib/projects";

export function ProjectLinks({
  project,
}: {
  project: Pick<ProjectMeta, "link" | "repo">;
}) {
  if (!project.link && !project.repo) return null;
  return (
    <div className="project-links" aria-label="Tautan proyek">
      {project.link && (
        <a
          className="secondary"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          Lihat Demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.repo && (
        <a
          className="secondary"
          href={project.repo}
          target="_blank"
          rel="noreferrer"
        >
          Lihat Source <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
