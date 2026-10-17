"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";

const links = [
  { id: "projects", label: "Proyek", href: "/#projects" },
  { id: "experience", label: "Pengalaman", href: "/#experience" },
  { id: "about", label: "Tentang", href: "/#about" },
  { id: "playground", label: "Playground", href: "/#playground" },
  { id: "contact", label: "Kontak", href: "/#contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const currentId =
    pathname === "/playground"
      ? "playground"
      : pathname.startsWith("/karya/")
        ? "projects"
        : pathname === "/"
          ? active
          : "home";

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("gsap")
      .then(({ gsap }) => {
        if (disposed || !container.current) return;
        const element = container.current;
        const media = gsap.matchMedia();
        cleanup = () => media.revert();
        media.add(
          "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)",
          () => {
            const cleanups: Array<() => void> = [];
            element.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
              const label = link.querySelector<HTMLElement>(".nav-label");
              if (!label) return;
              const x = gsap.quickTo(label, "x", {
                duration: 0.4,
                ease: "back.out(1.3)",
              });
              const y = gsap.quickTo(label, "y", {
                duration: 0.4,
                ease: "back.out(1.3)",
              });
              const scaleX = gsap.quickTo(label, "scaleX", {
                duration: 0.25,
                ease: "power2.out",
              });
              const scaleY = gsap.quickTo(label, "scaleY", {
                duration: 0.25,
                ease: "power2.out",
              });
              const move = (event: PointerEvent) => {
                if (event.pointerType === "touch") return;
                const rect = link.getBoundingClientRect();
                x(
                  gsap.utils.clamp(
                    -1,
                    1,
                    ((event.clientX - rect.left) / rect.width - 0.5) * 2,
                  ) * 10,
                );
                y(
                  gsap.utils.clamp(
                    -1,
                    1,
                    ((event.clientY - rect.top) / rect.height - 0.5) * 2,
                  ) *
                    6 -
                    4,
                );
                scaleX(1.08);
                scaleY(1.08);
              };
              const reset = () => {
                x(0);
                y(0);
                scaleX(1);
                scaleY(1);
              };
              link.addEventListener("pointerenter", move);
              link.addEventListener("pointermove", move);
              link.addEventListener("pointerleave", reset);
              link.addEventListener("pointercancel", reset);
              link.addEventListener("focus", reset);
              window.addEventListener("blur", reset);
              cleanups.push(() => {
                link.removeEventListener("pointerenter", move);
                link.removeEventListener("pointermove", move);
                link.removeEventListener("pointerleave", reset);
                link.removeEventListener("pointercancel", reset);
                link.removeEventListener("focus", reset);
                window.removeEventListener("blur", reset);
              });
            });
            element.dataset.navMotion = "enabled";
            return () => {
              cleanups.forEach((remove) => remove());
              delete element.dataset.navMotion;
            };
          },
          element,
        );
      })
      .catch(() => {
        /* Links and the active indicator work without motion. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    let pending: number | null = null;
    let disposed = false;
    const update = () => {
      pending = null;
      const boundary =
        (document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 80) +
        innerHeight * 0.2;
      let current = "home";
      for (const { id, href } of links) {
        if (!href.startsWith("/#")) continue;
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= boundary)
          current = id;
      }
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2)
        current = "contact";
      setActive(current);
    };
    const schedule = () => {
      if (pending === null && !disposed)
        pending = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (pending !== null) cancelAnimationFrame(pending);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const selected = element.querySelector<HTMLElement>(
        `[data-nav-id="${hovered || focused || currentId}"]`,
      );
      const next = selected
        ? { x: selected.offsetLeft, width: selected.offsetWidth }
        : { x: 0, width: 0 };
      setIndicator((previous) =>
        previous.x === next.x && previous.width === next.width
          ? previous
          : next,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [currentId, hovered, focused]);

  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Navigasi utama">
        <Logo />
        <div className="navlinks" ref={container}>
          {links.map(({ id, label, href }) => {
            const current = currentId === id;
            return (
              <Link
                key={id}
                href={href}
                className={current ? "active" : undefined}
                aria-current={
                  current
                    ? id === "playground" && pathname === "/playground"
                      ? "page"
                      : "location"
                    : undefined
                }
                data-nav-id={id}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHovered(id);
                }}
                onPointerLeave={() => setHovered(null)}
                onPointerCancel={() => setHovered(null)}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible"))
                    setFocused(id);
                }}
                onBlur={() => setFocused(null)}
              >
                <span className="nav-label">{label}</span>
              </Link>
            );
          })}
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.x}px)`,
              opacity: indicator.width ? 1 : 0,
            }}
          />
        </div>
        <Link href="/#contact" className="navcontact">
          Mari terhubung <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
