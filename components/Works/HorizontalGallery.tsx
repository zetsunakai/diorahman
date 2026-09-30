"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
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
  const distance = useRef(0);
  const x = useMotionValue(0);
  const [active, setActive] = useState(1);
  const n = projects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /** Page progress through the pinned section, computed directly (no frame delay). */
  const progressNow = () => {
    const section = sectionRef.current!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, (window.scrollY - top) / range)) : 0;
  };

  /** Applies the track offset synchronously, so a view-transition snapshot sees it too. */
  const place = (p: number) => {
    const v = -p * distance.current;
    x.set(v);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${v}px)`;
    setActive(Math.round(p * (n - 1)) + 1);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    x.set(-v * distance.current);
    setActive(Math.round(v * (n - 1)) + 1);
  });

  // Measure in a layout effect: section height, track position and the restored scroll (F15)
  // must all be in place before the browser captures the new page for the view transition.
  useLayoutEffect(() => {
    const restore = takeGalleryRestore();
    if (reduced) {
      if (restore !== null) window.scrollTo({ top: restore, behavior: "instant" });
      return;
    }
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const measure = () => {
      distance.current = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `calc(100svh + ${distance.current}px)`;
      place(progressNow());
    };
    measure();
    if (restore !== null) {
      window.scrollTo({ top: restore, behavior: "instant" });
      place(progressNow());
    }
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Keyboard focus on an off-screen card scrolls the page so the card slides into view.
  const focusCard = (i: number) => {
    const section = sectionRef.current;
    if (!section || reduced || n < 2) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (n - 1)) * distance.current, behavior: "instant" });
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
      style={{ height: `${n * 90}svh` }}
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
