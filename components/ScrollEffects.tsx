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
            const tagged = new Set<HTMLElement>();
            const query = (selector: string) =>
              Array.from(main.querySelectorAll<HTMLElement>(selector));

            const reveal = (
              items: HTMLElement[],
              trigger: HTMLElement,
              {
                distance = 14,
                duration = 0.7,
                stagger = 0.09,
                delay = 0,
                image = false,
              } = {},
            ) => {
              const pending = items.filter((item) => {
                tagged.add(item);
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
                {
                  opacity: 0,
                  y: desktop ? distance : Math.min(distance, 10),
                  ...(image && {
                    clipPath: "inset(100% 0% 0% 0%)",
                    scale: desktop ? 0.97 : 0.99,
                  }),
                },
                {
                  opacity: 1,
                  y: 0,
                  ...(image && { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }),
                  duration,
                  stagger,
                  delay,
                  ease: "power3.out",
                  scrollTrigger: { trigger, start: "top 85%", once: true },
                  onComplete: () => {
                    pending.forEach((item) => {
                      revealed.add(item);
                      item.dataset.scrollReveal = "done";
                    });
                    gsap.set(pending, {
                      clearProps: image
                        ? "opacity,transform,clipPath"
                        : "opacity,transform",
                    });
                  },
                },
              );
              pending.forEach((item) => tracked.set(item, tween));
            };
            const hero = main.querySelector<HTMLElement>(".hero-copy");
            if (hero)
              reveal(Array.from(hero.children) as HTMLElement[], hero, {
                distance: 12,
                stagger: 0.1,
              });
            query(".section-top").forEach((heading) =>
              reveal(Array.from(heading.children) as HTMLElement[], heading),
            );

            const heroSection = main.querySelector<HTMLElement>(".hero");
            if (heroSection && desktop) {
              if (hero)
                gsap.to(hero, {
                  y: -24,
                  ease: "none",
                  scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.7,
                  },
                });
              const architecture = heroSection.querySelector(".architecture");
              if (architecture)
                gsap.to(architecture, {
                  y: 24,
                  ease: "none",
                  scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.7,
                  },
                });
            }

            query(".project").forEach((project, index) => {
              const image =
                project.querySelector<HTMLElement>(".project-image");
              const body = project.querySelector<HTMLElement>(".project-body");
              if (image)
                reveal([image], image, {
                  image: true,
                  distance: 0,
                  duration: index === 0 ? 0.85 : 0.75,
                });
              if (body)
                reveal(Array.from(body.children) as HTMLElement[], body, {
                  distance: 16,
                  delay: desktop && index === 0 ? 0.12 : 0,
                  stagger: 0.07,
                });
            });

            const entries = query(".experience-entry");
            entries.forEach((entry) => {
              const context = entry.querySelector<HTMLElement>(
                ".experience-context",
              );
              const content = entry.querySelector<HTMLElement>(
                ".experience-content",
              );
              if (context)
                reveal([context], entry, { distance: 8, duration: 0.6 });
              if (content)
                reveal(Array.from(content.children) as HTMLElement[], content);
              ScrollTrigger.create({
                trigger: entry,
                start: "top 60%",
                end: "bottom 60%",
                onToggle: (self) => {
                  entry.dataset.experienceActive = String(self.isActive);
                },
                onRefresh: (self) => {
                  entry.dataset.experienceActive = String(self.isActive);
                },
              });
            });

            query(".about-heading h2").forEach((heading) =>
              reveal([heading], heading, { distance: 10 }),
            );
            query(".about-portrait").forEach((portrait) =>
              reveal([portrait], portrait, { distance: 20, duration: 0.85 }),
            );
            query(".about-copy").forEach((copy) =>
              reveal(Array.from(copy.children) as HTMLElement[], copy, {
                distance: 12,
                stagger: 0.13,
              }),
            );
            query(".skill").forEach((skill, index) =>
              reveal([skill], skill, {
                distance: 12,
                delay: desktop ? (index % 2) * 0.09 : 0,
              }),
            );
            query(".contact").forEach((contact) => {
              reveal(
                Array.from(contact.querySelectorAll<HTMLElement>("h2, p")),
                contact,
                { distance: 12, stagger: 0.12 },
              );
              const actions =
                contact.querySelector<HTMLElement>(".contact-actions");
              if (actions)
                reveal(Array.from(actions.children) as HTMLElement[], actions, {
                  distance: 8,
                  delay: 0.15,
                  stagger: 0.1,
                });
            });

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
                    scrub: 0.5,
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
                    scrub: 0.35,
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
                { distance: 12, stagger: 0.1 },
              );
            query(".project-cover .project-image").forEach((image) =>
              reveal([image], image, {
                image: true,
                distance: 0,
                duration: 0.8,
              }),
            );
            query(".project-facts, .next-project").forEach((element) =>
              reveal([element], element, { distance: 10 }),
            );

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
              tagged.forEach((element) => delete element.dataset.scrollReveal);
              entries.forEach((entry) => delete entry.dataset.experienceActive);
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
