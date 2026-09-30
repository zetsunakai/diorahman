"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  m,
  motionValue,
  useAnimationFrame,
  useInView,
} from "motion/react";
import { heroLetter, heroName } from "@/lib/motion";
import { ReactiveLetter } from "./ReactiveLetter";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Hero.module.css";

type Props = { label: string; lines: string[] };

/** Pointer idle time before the automatic wave takes over (ms). */
const IDLE_MS = 2500;
/** Static intensity used when the user prefers reduced motion. */
const STATIC_INTENSITY = 0.55;

export function SplitName({ label, lines }: Props) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(rootRef);

  const letters = useMemo(
    () =>
      lines.map((line) =>
        [...line].map((char) => ({ char, space: char === " " })),
      ),
    [lines],
  );
  const count = letters.flat().length;
  const intensities = useMemo(
    () => Array.from({ length: count }, () => motionValue(0)),
    [count],
  );

  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centers = useRef<{ x: number; y: number }[]>([]);
  const radius = useRef(200);
  const lastPointer = useRef(0);
  const [ready, setReady] = useState(false);

  // Cache letter centres (page coordinates); recompute only on resize (PRD risk mitigation).
  useEffect(() => {
    if (!ready || reduced) return;
    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(rootRef.current!).fontSize);
      radius.current = fontSize * 1.4;
      centers.current = glyphRefs.current.map((el) => {
        if (!el) return { x: -1e5, y: -1e5 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY };
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ready, reduced]);

  // Pointer → per-letter intensity.
  useEffect(() => {
    if (!ready || reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      lastPointer.current = performance.now();
      const px = e.clientX;
      const py = e.clientY + window.scrollY;
      const r = radius.current;
      centers.current.forEach((c, i) => {
        const d = Math.hypot(px - c.x, py - c.y);
        const t = Math.max(0, 1 - d / r);
        intensities[i].set(t * t * (3 - 2 * t));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [ready, reduced, intensities]);

  // Without a pointer: automatic wave, paused while the hero is off-screen.
  useAnimationFrame((time) => {
    if (!ready || reduced || !inView) return;
    if (performance.now() - lastPointer.current < IDLE_MS) return;
    for (let i = 0; i < count; i++) {
      const v = (Math.sin(time / 650 - i * 0.5) + 1) / 2;
      intensities[i].set(v * v * v * 0.9);
    }
  });

  useEffect(() => {
    if (reduced) intensities.forEach((mv) => mv.set(STATIC_INTENSITY));
  }, [reduced, intensities]);

  let index = 0;
  return (
    <m.h1
      ref={rootRef}
      className={styles.name}
      aria-label={label}
      variants={heroName}
      initial={reduced ? false : "hidden"}
      animate="show"
      onAnimationComplete={() => setReady(true)}
    >
      {letters.map((line, li) => (
        <span key={li} className={styles.line} aria-hidden="true">
          {line.map(({ char, space }) => {
            const i = index++;
            if (space) return <span key={i} className={styles.space} />;
            return (
              <ReactiveLetter
                key={i}
                char={char}
                intensity={intensities[i]}
                variants={heroLetter}
                ref={(el) => {
                  glyphRefs.current[i] = el;
                }}
              />
            );
          })}
        </span>
      ))}
    </m.h1>
  );
}
