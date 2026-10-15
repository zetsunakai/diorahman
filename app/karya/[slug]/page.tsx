import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ProjectVisual } from "@/components/Works/ProjectVisual";
import { ProjectLinks } from "@/components/Works/ProjectLinks";
import { getProject, getProjects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };
const sections = [
  "Ringkasan",
  "Kebutuhan",
  "Peran dan kontribusi",
  "Implementasi",
  "Tantangan teknis",
  "Hasil",
];
const sectionId = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} id={sectionId(String(children))}>
      {children}
    </h2>
  ),
};

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
      ...(project.screenshot
        ? { images: [{ url: project.screenshot, alt: project.screenshotAlt }] }
        : {}),
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
      <Link className="text-link" href="/#projects">
        ← Kembali ke proyek
      </Link>
      <header className="project-header">
        <p className="eyebrow mono">STUDI KASUS / {project.category}</p>
        <h1>{project.title}</h1>
        <p className="project-lead">{project.summary}</p>
        <ProjectLinks project={project} />
      </header>
      <div className="project-cover">
        <ProjectVisual project={project} priority />
      </div>
      <dl className="project-facts">
        <div>
          <dt>Peran</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Teknologi</dt>
          <dd>{project.detailTools.join(" · ")}</dd>
        </div>
        <div>
          <dt>Tahun</dt>
          <dd>{project.year}</dd>
        </div>
      </dl>
      <div className="case-layout">
        <aside className="case-index">
          <p className="mono">DALAM STUDI KASUS INI</p>
          <nav aria-label="Isi studi kasus">
            {sections.map((title, index) => (
              <a href={`#${sectionId(title)}`} key={title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="prose">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>
      </div>
      {next.slug !== project.slug && (
        <Link className="next-project" href={`/karya/${next.slug}`}>
          <span className="eyebrow mono">STUDI KASUS BERIKUTNYA</span>
          <span>{next.title} ↗</span>
        </Link>
      )}
    </article>
  );
}
