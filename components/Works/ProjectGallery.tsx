"use client";

import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectArt } from "./ProjectArt";

export function ProjectGallery({ projects }: { projects: ProjectMeta[] }) {
  const [selected, setSelected] = useState<ProjectMeta | null>(null);

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-top">
        <div>
          <div className="eyebrow mono">01 / PROYEK PILIHAN</div>
          <h2 id="projects-title">Dari kebutuhan ke implementasi.</h2>
        </div>
        <p>
          Website layanan, aplikasi inventory, dan pengembangan ERP. Dibangun
          dari kebutuhan nyata, dari antarmuka sampai database.
        </p>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <article className="project" key={project.slug}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`Lihat detail ${project.title}`}
              aria-haspopup="dialog"
            >
              <ProjectArt kind={project.kind} />
              <div className="project-meta">
                <h3>{project.title}</h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p>{project.summary}</p>
              <div className="tags">
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </button>
          </article>
        ))}
      </div>
      <p className="illustration-note">
        * Visual antarmuka merupakan ilustrasi proyek. Klik proyek untuk membaca
        detail.
      </p>
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        labelledBy="project-title"
      >
        {selected && (
          <>
            <div className="eyebrow mono">PROJECT NOTES</div>
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
            <p className="dialog-note">
              Visual pada portfolio ini adalah ilustrasi, bukan tangkapan layar
              aplikasi produksi.
            </p>
          </>
        )}
      </Dialog>
    </section>
  );
}
