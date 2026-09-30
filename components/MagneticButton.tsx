"use client";

import { useRef, type ReactNode } from "react";
import { m, useSpring, useTransform } from "motion/react";
import { springOpts } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** How far the button follows the pointer (0–1). */
  strength?: number;
};

/** F11: button that leans toward the pointer with a bouncy spring. */
export function MagneticButton({ href, children, className, strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, springOpts.bouncy);
  const y = useSpring(0, springOpts.bouncy);
  const labelX = useTransform(x, (v) => v * 0.4);
  const labelY = useTransform(y, (v) => v * 0.4);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="halo"
    >
      <m.span style={{ x: labelX, y: labelY, display: "inline-block" }}>{children}</m.span>
    </m.a>
  );
}
