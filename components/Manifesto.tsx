"use client";

import { useRef } from "react";
import {
  m,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./About.module.css";

const TEXT =
  "Saya percaya situs yang baik tidak hanya dibaca, tapi dirasakan. Setiap gerakan harus punya alasan: menjawab tangan pengguna, menuntun mata, lalu diam saat tidak dibutuhkan. Saya menulis kode seperti menata huruf — rapi, cepat, dan sedikit usil.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <m.span style={{ opacity }}>{word} </m.span>;
}

/** F9: words light up as the manifesto scrolls through the viewport. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <p ref={ref} className={styles.manifesto}>
      {reduced
        ? TEXT
        : words.map((w, i) => (
            <Word
              key={i}
              word={w}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
    </p>
  );
}
