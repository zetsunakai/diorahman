"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectArt } from "./ProjectArt";

type Props = {
  project: Pick<
    ProjectMeta,
    "title" | "kind" | "screenshot" | "screenshotAlt" | "screenshotCaption"
  >;
  priority?: boolean;
};

export function ProjectVisual({ project, priority = false }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasScreenshot = Boolean(
    project.screenshot &&
    project.screenshotAlt &&
    failedSource !== project.screenshot,
  );

  return (
    <figure className="project-figure">
      <div className="project-image">
        <div
          className={`project-media-content${hasScreenshot ? "" : " is-illustration"}`}
          data-scroll-parallax={hasScreenshot ? undefined : "cover"}
        >
          {hasScreenshot ? (
            <Image
              src={project.screenshot!}
              alt={project.screenshotAlt!}
              fill
              sizes={
                priority
                  ? "(max-width: 720px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 56px), 900px"
                  : "(max-width: 720px) calc(100vw - 78px), (max-width: 1000px) 50vw, 600px"
              }
              preload={priority}
              onError={() => setFailedSource(project.screenshot!)}
            />
          ) : (
            <ProjectArt kind={project.kind} />
          )}
        </div>
      </div>
      <figcaption>
        {hasScreenshot
          ? project.screenshotCaption || `Tangkapan layar ${project.title}.`
          : "Ilustrasi antarmuka · bukan screenshot aplikasi."}
      </figcaption>
    </figure>
  );
}
