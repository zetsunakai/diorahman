/** Remembers where the home gallery was so "kembali" can return there (F15). */
const POS = "karya:scroll";
const RESTORE = "karya:restore";

function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

export function rememberGalleryScroll() {
  safe(() => sessionStorage.setItem(POS, String(window.scrollY)));
}

export function hasGalleryScroll() {
  return safe(() => sessionStorage.getItem(POS) !== null) ?? false;
}

export function requestGalleryRestore() {
  safe(() => sessionStorage.setItem(RESTORE, "1"));
}

/** Returns the saved position once, if a restore was requested. */
export function takeGalleryRestore(): number | null {
  return (
    safe(() => {
      if (sessionStorage.getItem(RESTORE) !== "1") return null;
      sessionStorage.removeItem(RESTORE);
      const y = Number(sessionStorage.getItem(POS));
      return Number.isFinite(y) ? y : null;
    }) ?? null
  );
}
