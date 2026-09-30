import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BackButton } from "@/components/BackButton";
import { Cover } from "@/components/Works/Cover";
import { getProject, getProjects } from "@/lib/projects";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
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
      ...(project.cover ? { images: [project.cover] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const { project, next } = found;

  return (
    <article className={styles.page}>
      <div className={styles.top}>
        <BackButton />
        <span className={styles.year}>{project.year}</span>
      </div>

      <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
        <Cover
          pattern={project.pattern}
          image={project.cover}
          title={project.title}
          priority
          className={styles.cover}
        />
      </ViewTransition>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>
      </header>

      <dl className={styles.facts}>
        <div>
          <dt>peran</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>tools</dt>
          <dd>{project.tools.join(", ")}</dd>
        </div>
        <div>
          <dt>tahun</dt>
          <dd>{project.year}</dd>
        </div>
        {(project.link || project.repo) && (
          <div>
            <dt>tautan</dt>
            <dd className={styles.links}>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  lihat live ↗
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer">
                  repo ↗
                </a>
              )}
            </dd>
          </div>
        )}
      </dl>

      <div className={styles.prose}>
        <MDXRemote source={project.content} />
      </div>

      {next.slug !== project.slug && (
        <Link href={`/karya/${next.slug}`} className={styles.next} data-cursor="lanjut">
          <span className={styles.nextLabel}>proyek berikutnya</span>
          <span className={styles.nextTitle}>
            {next.title} <span aria-hidden="true">→</span>
          </span>
          <ViewTransition name={`cover-${next.slug}`} share="morph" default="none">
            <Cover pattern={next.pattern} image={next.cover} title={next.title} className={styles.nextCover} />
          </ViewTransition>
        </Link>
      )}
    </article>
  );
}
