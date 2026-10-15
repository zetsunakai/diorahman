"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Beranda" },
  { id: "projects", label: "Proyek" },
  { id: "about", label: "Tentang" },
  { id: "contact", label: "Kontak" },
];

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    for (const { id } of links) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="site-header">
      <nav className="wrap" aria-label="Navigasi utama">
        <Link className="logo" href="/#home" aria-label="Dio beranda">
          dio<span>.</span>
        </Link>
        <div className="navlinks">
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
        </div>
        <Link href="/#contact" className="navcontact">
          Mari terhubung <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
