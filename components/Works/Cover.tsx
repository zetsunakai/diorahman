"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";
import styles from "./Cover.module.css";

export type Pattern = "orbit" | "grid" | "wave" | "stripes";

type Props = {
  pattern: Pattern;
  /** Optional image; when set it replaces the generated pattern. */
  image?: string;
  title: string;
  priority?: boolean;
  className?: string;
};

/**
 * Project cover. Loops only while visible (PRD: "Loop animasi berhenti saat elemen tidak
 * terlihat"); prefers-reduced-motion freezes it via CSS.
 */
export function Cover({ pattern, image, title, priority, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "10% 0px" });

  return (
    <div
      ref={ref}
      className={`${styles.cover} ${className ?? ""}`}
      data-playing={inView}
      role="img"
      aria-label={`Sampul proyek ${title}`}
    >
      {image ? (
        <Image src={image} alt="" fill sizes="(max-width: 600px) 84vw, 62rem" priority={priority} />
      ) : (
        <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {patterns[pattern]}
        </svg>
      )}
    </div>
  );
}

const grid = Array.from({ length: 13 * 7 }, (_, i) => {
  const x = i % 13;
  const y = Math.floor(i / 13);
  return (
    <circle
      key={i}
      cx={8 + x * 12}
      cy={9 + y * 12}
      r={2.6}
      className={styles.dot}
      style={{ animationDelay: `${(x + y) * 0.09}s` }}
    />
  );
});

const wave = (() => {
  const period = 40;
  const pts = (amp: number) =>
    Array.from({ length: 81 }, (_, i) => {
      const x = i * 4 - period;
      return `${x},${(Math.sin((x / period) * Math.PI * 2) * amp).toFixed(2)}`;
    }).join(" ");
  return Array.from({ length: 9 }, (_, i) => (
    <g key={i} transform={`translate(0 ${10 + i * 9})`}>
      <polyline
        points={pts(2 + (i % 4) * 1.4)}
        className={i === 4 ? styles.waveAccent : styles.wave}
        style={{ animationDuration: `${3 + (i % 3)}s` }}
      />
    </g>
  ));
})();

const patterns: Record<Pattern, React.ReactNode> = {
  orbit: (
    <>
      <circle cx="80" cy="45" r="11" className={styles.sun} />
      {[20, 32, 44].map((r, i) => (
        <g key={r} className={styles.orbit} style={{ animationDuration: `${8 + i * 5}s` }}>
          <circle cx="80" cy="45" r={r} className={styles.ring} />
          <circle cx={80 + r} cy="45" r={i === 1 ? 4.5 : 3} className={i === 1 ? styles.pink : styles.lime} />
        </g>
      ))}
    </>
  ),
  grid: <>{grid}</>,
  wave: <>{wave}</>,
  stripes: (
    <>
      <defs>
        <pattern id="stripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="6" height="12" className={styles.stripe} />
        </pattern>
      </defs>
      <rect x="-24" y="0" width="208" height="90" fill="url(#stripes)" className={styles.slide} />
      <circle cx="118" cy="38" r="22" className={styles.bigLime} />
      <rect x="22" y="52" width="46" height="22" rx="11" className={styles.pill} />
    </>
  ),
};
