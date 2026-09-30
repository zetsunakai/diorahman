"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import type { ProjectMeta } from "@/lib/projects";
import { rememberGalleryScroll } from "@/lib/scroll";
import { Cover } from "./Cover";
import styles from "./Works.module.css";

export function WorkCard({ project, index }: { project: ProjectMeta; index: number }) {
  return (
    <Link
      href={`/karya/${project.slug}`}
      className={styles.card}
      data-cursor="lihat"
      onClick={rememberGalleryScroll}
    >
      {/* Shared element: morphs into the detail page header (F12). */}
      <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
        <Cover
          pattern={project.pattern}
          image={project.cover}
          title={project.title}
          priority={index === 0}
        />
      </ViewTransition>
      <div className={styles.meta}>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.year}>{project.year}</span>
      </div>
      <p className={styles.summary}>{project.summary}</p>
    </Link>
  );
}
