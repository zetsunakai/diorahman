"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { springOpts } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Cursor.module.css";

/** F2: spring cursor; grows with a label over [data-cursor] elements. Off on touch devices. */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, springOpts.snappy);
  const y = useSpring(my, springOpts.snappy);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduced);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <m.div
      className={styles.cursor}
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <m.div
        className={styles.blob}
        animate={{ scale: label ? 1 : 0.18 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <m.span
              key={label}
              className={styles.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
