"use client";

import type { ProjectMeta } from "@/lib/projects";
import { rememberGalleryScroll } from "@/lib/scroll";
import { Cover } from "./Cover";
import { MorphCover, MorphLink } from "./MorphLink";
import styles from "./Works.module.css";

export function WorkCard({ project, index }: { project: ProjectMeta; index: number }) {
  return (
    <MorphLink
      slug={project.slug}
      className={styles.card}
      data-cursor="lihat"
      onClick={rememberGalleryScroll}
    >
      {/* Shared element: morphs into the detail page header (F12). */}
      <MorphCover slug={project.slug}>
        <Cover
          pattern={project.pattern}
          image={project.cover}
          title={project.title}
          priority={index === 0}
        />
      </MorphCover>
      <div className={styles.meta}>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.year}>{project.year}</span>
      </div>
      <p className={styles.summary}>{project.summary}</p>
    </MorphLink>
  );
}
