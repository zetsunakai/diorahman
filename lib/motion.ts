import type { Transition, Variants } from "motion/react";

/** Spring tokens — PRD "Token spring". */
export const springs = {
  snappy: { type: "spring", stiffness: 600, damping: 40, mass: 0.4 },
  bouncy: { type: "spring", stiffness: 220, damping: 14, mass: 0.6 },
  drop: { type: "spring", stiffness: 120, damping: 14, mass: 1 },
  layout: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
} satisfies Record<string, Transition>;

/** Options for useSpring (no `type` key). */
export const springOpts = {
  snappy: { stiffness: 600, damping: 40, mass: 0.4 },
  bouncy: { stiffness: 220, damping: 14, mass: 0.6 },
  hover: { stiffness: 180, damping: 20, mass: 0.5 },
};

export const heroName: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

export const heroLetter: Variants = {
  hidden: { y: "-110%", rotate: -35, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: springs.drop },
};
