"use client";

import { useSyncExternalStore } from "react";

/**
 * The project whose cover should morph on the next navigation. Only that one cover carries a
 * view-transition name, so neighbouring covers never pair with something on the other page.
 */
let active: string | null = null;
const listeners = new Set<() => void>();

export function setMorphTarget(slug: string) {
  active = slug;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useMorphTarget() {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => null,
  );
}
