"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectLinks } from "./ProjectLinks";

export function ProjectGallery({ projects }: { projects: ProjectMeta[] }) {
  const [selected, setSelected] = useState<ProjectMeta | null>(null);
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-top">
        <div>
          <p className="eyebrow mono">01 / PROYEK PILIHAN</p>
          <h2 id="projects-title">Tiga konteks. Satu cara berpikir.</h2>
        </div>
        <p>
          Dari website layanan hingga transaksi gudang. Lihat kebutuhan,
          keputusan teknis, dan cakupan setiap proyek.
        </p>
      </div>
      <div className="projects">
        {projects.map((project, index) => (
          <article
            className={`project${index === 0 ? " project-featured" : ""}`}
            key={project.slug}
          >
            <ProjectVisual project={project} />
            <div className="project-body">
              <p className="project-category mono">
                {index === 0 ? "PROYEK UTAMA / " : ""}
                {project.category}
              </p>
              <h3>
                <Link href={`/karya/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="project-summary">
                {index === 0 ? project.description : project.summary}
              </p>
              {index === 0 && (
                <ul className="project-highlights">
                  {project.features.slice(0, 2).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              <div className="tags">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <div className="project-actions">
                <Link
                  className={index === 0 ? "primary" : "secondary"}
                  href={`/karya/${project.slug}`}
                  aria-label={`Baca Studi Kasus ${project.title}`}
                >
                  Baca Studi Kasus <span aria-hidden="true">↗</span>
                </Link>
                <button
                  className="text-link"
                  type="button"
                  aria-label={`Ringkasan ${project.title}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelected(project)}
                >
                  Ringkasan <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        labelledBy="project-title"
      >
        {selected && (
          <>
            <p className="eyebrow mono">RINGKASAN PROYEK</p>
            <h2 id="project-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <ul>
              {selected.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="tags">
              {selected.detailTools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <div className="dialog-actions">
              <Link
                className="primary"
                href={`/karya/${selected.slug}`}
                onClick={() => setSelected(null)}
              >
                Baca Studi Kasus <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ProjectLinks project={selected} />
          </>
        )}
      </Dialog>
    </section>
  );
}
