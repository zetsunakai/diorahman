"use client";

import type { Ref } from "react";
import { m, useSpring, useTransform, type MotionValue, type Variants } from "motion/react";
import { springOpts } from "@/lib/motion";
import styles from "./Hero.module.css";

type Props = {
  char: string;
  /** 0 = thin & condensed, 1 = heavy & wide. */
  intensity: MotionValue<number>;
  variants: Variants;
  ref: Ref<HTMLSpanElement>;
};

export function ReactiveLetter({ char, intensity, variants, ref }: Props) {
  const v = useSpring(intensity, springOpts.hover);
  const fontVariationSettings = useTransform(
    v,
    (t) => `"wght" ${Math.round(260 + t * 540)}, "wdth" ${Math.round(75 + t * 25)}, "opsz" 96`,
  );

  return (
    <m.span
      ref={ref}
      className={styles.glyph}
      variants={variants}
      style={{ fontVariationSettings }}
    >
      {char}
    </m.span>
  );
}
