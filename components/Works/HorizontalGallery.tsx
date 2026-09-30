"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import type { ProjectMeta } from "@/lib/projects";
import { takeGalleryRestore } from "@/lib/scroll";
import { WorkCard } from "./WorkCard";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Works.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export function HorizontalGallery({ projects }: { projects: ProjectMeta[] }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(1);
  const n = projects.length;

  // Horizontal distance the track travels while the section is pinned.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  // Back from a detail page: return to where the gallery was (F15).
  useEffect(() => {
    if (!reduced && distance === 0) return;
    const y = takeGalleryRestore();
    if (y !== null) window.scrollTo({ top: y, behavior: "instant" });
  }, [distance, reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.round(v * (n - 1)) + 1);
  });

  // Keyboard focus on an off-screen card scrolls the page so the card slides into view.
  const focusCard = (i: number) => {
    const section = sectionRef.current;
    if (!section || reduced || n < 2) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (n - 1)) * distance, behavior: "instant" });
  };

  const heading = (
    <div className={styles.head}>
      <h2 className={styles.heading}>karya pilihan</h2>
      {!reduced && (
        <p className={styles.counter} aria-hidden="true">
          {pad(active)} <span>/ {pad(n)}</span>
        </p>
      )}
    </div>
  );

  if (reduced) {
    return (
      <section id="karya" className={styles.listSection} aria-label="Karya pilihan">
        {heading}
        <div className={styles.list}>
          {projects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="karya"
      ref={sectionRef}
      className={styles.section}
      style={{ height: distance ? `calc(100svh + ${distance}px)` : `${n * 90}svh` }}
      aria-label="Karya pilihan"
    >
      <div className={styles.sticky}>
        {heading}
        <m.div ref={trackRef} className={styles.track} style={{ x }}>
          {projects.map((p, i) => (
            <div key={p.slug} className={styles.slot} onFocus={() => focusCard(i)}>
              <WorkCard project={p} index={i} />
            </div>
          ))}
        </m.div>
        <div className={styles.progress} aria-hidden="true">
          <m.div className={styles.bar} style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
