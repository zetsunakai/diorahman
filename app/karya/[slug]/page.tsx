import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ProjectArt } from "@/components/Works/ProjectArt";
import { getProject, getProjects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) return {};
  const { project } = found;
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/karya/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const { project, next } = found;

  return (
    <article className="project-page">
      <Link className="secondary" href="/#projects">
        ← Kembali ke proyek
      </Link>
      <header className="project-header">
        <div className="eyebrow mono">PROJECT NOTES / {project.year}</div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="tags">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </header>
      <div className="project-cover">
        <ProjectArt kind={project.kind} />
      </div>
      <dl className="project-facts">
        <div>
          <dt>Peran</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Teknologi</dt>
          <dd>{project.tools.join(" · ")}</dd>
        </div>
        <div>
          <dt>Tahun</dt>
          <dd>{project.year}</dd>
        </div>
      </dl>
      <div className="prose">
        <MDXRemote source={project.content} />
      </div>
      {next.slug !== project.slug && (
        <Link className="next-project" href={`/karya/${next.slug}`}>
          <span className="eyebrow mono">PROYEK BERIKUTNYA</span>
          <span>{next.title} ↗</span>
        </Link>
      )}
    </article>
  );
}
