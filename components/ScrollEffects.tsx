"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const mountedAt = performance.now();

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        const main = document.getElementById("main");
        if (!main) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        cleanup = () => media.revert();
        const revealed = new WeakSet<HTMLElement>();

        media.add(
          {
            animate: "(prefers-reduced-motion: no-preference)",
            desktop: "(min-width: 768px)",
          },
          (context) => {
            if (!context.conditions?.animate) return;
            const desktop = context.conditions.desktop;
            const tracked = new Map<HTMLElement, gsap.core.Tween>();
            const query = (selector: string) =>
              Array.from(main.querySelectorAll<HTMLElement>(selector));

            const reveal = (
              items: HTMLElement[],
              trigger: HTMLElement,
              distance = 20,
              delay = 0,
            ) => {
              const pending = items.filter((item) => {
                const rect = item.getBoundingClientRect();
                if (
                  revealed.has(item) ||
                  rect.bottom <= 0 ||
                  (rect.top < innerHeight &&
                    performance.now() - mountedAt > 700)
                ) {
                  revealed.add(item);
                  item.dataset.scrollReveal = "done";
                  return false;
                }
                item.dataset.scrollReveal = "pending";
                return true;
              });
              if (!pending.length) return;
              const tween = gsap.fromTo(
                pending,
                { opacity: 0, y: distance },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.075,
                  delay,
                  ease: "power2.out",
                  scrollTrigger: { trigger, start: "top 92%", once: true },
                  onComplete: () => {
                    pending.forEach((item) => {
                      revealed.add(item);
                      item.dataset.scrollReveal = "done";
                    });
                    gsap.set(pending, { clearProps: "opacity,transform" });
                  },
                },
              );
              pending.forEach((item) => tracked.set(item, tween));
            };
            const each = (selector: string, distance = 20) =>
              query(selector).forEach((element) =>
                reveal([element], element, distance),
              );

            const hero = main.querySelector<HTMLElement>(".hero-copy");
            if (hero)
              reveal(Array.from(hero.children) as HTMLElement[], hero, 16);
            query(".section-top").forEach((heading) =>
              reveal(Array.from(heading.children) as HTMLElement[], heading),
            );
            query(".project").forEach((project, index) =>
              reveal([project], project, 24, desktop && index === 2 ? 0.08 : 0),
            );
            each(".experience-entry");
            each(".about-heading");
            each(".about-copy > p", 16);
            query(".skill").forEach((skill, index) =>
              reveal([skill], skill, 16, desktop ? (index % 2) * 0.07 : 0),
            );
            each(".contact");

            query('[data-scroll-parallax="cover"]').forEach((cover) => {
              gsap.fromTo(
                cover,
                { y: desktop ? -8 : -3 },
                {
                  y: desktop ? 8 : 3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: cover.closest(".project-figure"),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
            const fill = main.querySelector<HTMLElement>(
              ".experience-progress",
            );
            if (fill)
              gsap.fromTo(
                fill,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".experience-list",
                    start: "top 65%",
                    end: "bottom 65%",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );

            const caseHeader =
              main.querySelector<HTMLElement>(".project-header");
            if (caseHeader)
              reveal(
                Array.from(caseHeader.children) as HTMLElement[],
                caseHeader,
                16,
              );
            each(".project-cover, .project-facts", 16);
            each(".prose > h2, .prose > p, .prose > ul, .next-project", 12);

            // Reveal keyboard focus immediately without moving a pointer target between down/up.
            const focus = (event: FocusEvent) => {
              if (
                !(event.target instanceof HTMLElement) ||
                !event.target.matches(":focus-visible")
              )
                return;
              for (const [element, tween] of tracked) {
                if (element.contains(event.target) && !revealed.has(element)) {
                  tween.progress(1);
                  tween.scrollTrigger?.kill();
                }
              }
            };
            main.addEventListener("focusin", focus);
            main.dataset.scrollMotion = "enabled";
            return () => {
              main.removeEventListener("focusin", focus);
              delete main.dataset.scrollMotion;
              tracked.forEach(
                (_, element) => delete element.dataset.scrollReveal,
              );
            };
          },
          main,
        );

        document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      })
      .catch(() => {
        cleanup?.(); /* Keep the default visible content if setup fails. */
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
