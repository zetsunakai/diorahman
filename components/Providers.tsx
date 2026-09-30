"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/** `m` components + only the DOM animation features keep Motion's share of the bundle small. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
