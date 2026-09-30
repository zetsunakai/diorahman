"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { hasGalleryScroll, requestGalleryRestore } from "@/lib/scroll";

/** F15: back to the home gallery at the position the visitor left it. */
export function BackButton() {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // Opened directly (no saved position): fall through to a plain link to /#karya.
    if (!hasGalleryScroll()) return;
    e.preventDefault();
    requestGalleryRestore();
    router.push("/", { scroll: false });
  };

  return (
    <Link
      href="/#karya"
      onClick={onClick}
      style={{ fontFamily: "var(--font-display)", textDecoration: "none" }}
    >
      <span aria-hidden="true">←</span> kembali ke karya
    </Link>
  );
}
