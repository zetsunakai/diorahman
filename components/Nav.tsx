"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";

const links = [
  { id: "projects", label: "Proyek" },
  { id: "experience", label: "Pengalaman" },
  { id: "about", label: "Tentang" },
  { id: "contact", label: "Kontak" },
];

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const container = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

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
      for (const { id } of links) {
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
        '[aria-current="location"]',
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
  }, [active, pathname]);

  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Navigasi utama">
        <Logo />
        <div className="navlinks" ref={container}>
          {links.map(({ id, label }) => {
            const current =
              pathname === "/" ? active === id : id === "projects";
            return (
              <Link
                key={id}
                href={`/#${id}`}
                className={current ? "active" : undefined}
                aria-current={current ? "location" : undefined}
              >
                {label}
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
