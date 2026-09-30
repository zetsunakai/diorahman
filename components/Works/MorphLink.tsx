"use client";

import Link from "next/link";
import { ViewTransition, useEffect, type ComponentProps, type ReactNode } from "react";
import { setMorphTarget, useMorphTarget } from "@/lib/morph";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { slug: string };

/** Link to a project that marks its cover as the one to morph (F12). */
export function MorphLink({ slug, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={`/karya/${slug}`}
      onClick={(e) => {
        setMorphTarget(slug);
        onClick?.(e);
      }}
    />
  );
}

/**
 * Named only while it is the morph target; otherwise it is plain page content. The `key` swaps
 * in a fresh ViewTransition instead of renaming a mounted one: React registers a name on mount
 * and forgets it by the name at unmount, so a rename leaves a stale entry behind (and a false
 * "two <ViewTransition> with the same name" error later).
 */
export function MorphCover({ slug, children }: { slug: string; children: ReactNode }) {
  const named = useMorphTarget() === slug;
  return (
    <ViewTransition
      key={named ? "morph" : "still"}
      name={named ? `cover-${slug}` : undefined}
      share="morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

/** On a detail page, its own cover is the one that morphs back, however the visitor arrived. */
export function MorphTargetSync({ slug }: { slug: string }) {
  useEffect(() => setMorphTarget(slug), [slug]);
  return null;
}
