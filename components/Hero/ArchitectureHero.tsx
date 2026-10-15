"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { ArchitectureFallback } from "./ArchitectureFallback";
import { architectureLayers, type ArchitectureLayer } from "./architecture";

const ArchitectureScene = dynamic(() => import("./ArchitectureScene"), {
  ssr: false,
});

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function ArchitectureHero() {
  const frame = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<ArchitectureLayer>("frontend");
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pendingPointer = useRef<[number, number]>([0, 0]);
  const pointerFrame = useRef<number | null>(null);

  useEffect(() => {
    const wide = matchMedia("(min-width: 768px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let supported: boolean | undefined;
    const update = () => {
      if (!wide.matches || motion.matches || connection?.saveData) {
        setEligible(false);
        setReady(false);
        return;
      }
      if (supported === undefined) {
        try {
          const probe = document.createElement("canvas");
          const context = probe.getContext("webgl2");
          supported = Boolean(context);
          context?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          supported = false;
        }
      }
      setEligible(supported);
    };
    update();
    wide.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!frame.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    });
    observer.observe(frame.current);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(
    () => () => {
      if (pointerFrame.current !== null)
        cancelAnimationFrame(pointerFrame.current);
    },
    [],
  );
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  useEffect(() => {
    if (!eligible || !hasEntered || failed) {
      setScrollProgress(0);
      return;
    }
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        const hero = frame.current?.closest(".hero");
        if (!hero) return;
        gsap.registerPlugin(ScrollTrigger);
        const trigger = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => setScrollProgress(self.progress),
          onRefresh: (self) => setScrollProgress(self.progress),
        });
        cleanup = () => trigger.kill();
      })
      .catch(() => {
        /* Pointer interaction remains usable without scroll enhancement. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [eligible, hasEntered, failed]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!eligible || failed || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pendingPointer.current = [
      ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    ];
    if (pointerFrame.current === null)
      pointerFrame.current = requestAnimationFrame(() => {
        setPointer(pendingPointer.current);
        pointerFrame.current = null;
      });
  };
  const resetPointer = () => {
    if (pointerFrame.current !== null)
      cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
    setPointer([0, 0]);
  };

  return (
    <figure className="architecture" aria-labelledby="architecture-title">
      <div className="architecture-header">
        <p className="mono" id="architecture-title">
          ALUR APLIKASI
        </p>
        <span>Frontend → backend → database</span>
      </div>
      <div
        className="architecture-stage"
        ref={frame}
        onPointerMove={move}
        onPointerLeave={resetPointer}
        data-renderer={eligible && !failed && ready ? "webgl" : "static"}
      >
        <div
          className={`architecture-static${eligible && !failed && ready ? " is-hidden" : ""}`}
        >
          <ArchitectureFallback active={active} />
        </div>
        {eligible && hasEntered && !failed && (
          <SceneBoundary onFailure={onFailure}>
            <div className="architecture-canvas" aria-hidden="true">
              <ArchitectureScene
                active={active}
                pointer={pointer}
                scrollProgress={scrollProgress}
                paused={!inView || !pageVisible}
                onHighlight={setActive}
                onReady={onReady}
                onFailure={onFailure}
              />
            </div>
          </SceneBoundary>
        )}
      </div>
      <div
        className="architecture-layers"
        aria-label="Tautan proyek dan pengalaman"
      >
        {architectureLayers.map((layer, index) => (
          <Link
            key={layer.id}
            href={layer.href}
            className={`architecture-link${active === layer.id ? " is-active" : ""}`}
            onFocus={() => setActive(layer.id)}
            onPointerEnter={() => setActive(layer.id)}
            aria-label={`${layer.label}: ${layer.stack}. ${layer.linkLabel}`}
          >
            <span className="architecture-layer-number" aria-hidden="true">
              0{index + 1}
            </span>
            <span>
              <strong>{layer.label}</strong>
              <small>{layer.stack}</small>
            </span>
            <span className="architecture-link-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </figure>
  );
}
