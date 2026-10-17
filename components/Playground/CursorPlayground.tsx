"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function CursorPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const host = canvasRef.current;
    if (!scene || !host) return;
    let disposed = false;
    let loading = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (loading || !entries.some((entry) => entry.isIntersecting)) return;
        loading = true;
        observer.disconnect();
        import("./createModelScene")
          .then(({ createModelScene }) => {
            if (!disposed) cleanup = createModelScene(scene, host);
          })
          .catch(() => {
            if (!disposed) scene.dataset.renderer = "unavailable";
          });
      },
      { rootMargin: "200px" },
    );
    observer.observe(scene);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <>
      <div
        className="playground-scene"
        ref={sceneRef}
        tabIndex={0}
        role="region"
        aria-label="Model Emilia tiga dimensi dengan kamera interaktif"
        aria-describedby="playground-help"
      >
        <div className="playground-garden" aria-hidden="true">
          <div className="playground-moon" />
          <div className="playground-trees" />
          <div className="playground-mist" />
        </div>
        <div className="playground-fireflies" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              style={{
                "--x": `${8 + ((index * 29) % 84)}%`,
                "--y": `${38 + ((index * 17) % 48)}%`,
                "--delay": `${index * -1.7}s`,
                "--duration": `${7 + (index % 4) * 2}s`,
              } as CSSProperties}
            />
          ))}
        </div>
        <div className="playground-scene-label mono" aria-hidden="true">
          <span>
            <span className="playground-live-label">3D · Camera parallax</span>
            <span className="playground-preview-label">Model Emilia</span>
          </span>
        </div>
        <div className="playground-fallback" aria-hidden="true">
          <span className="playground-loading">Memuat model Emilia…</span>
          <span className="playground-unavailable">Model 3D tidak tersedia.</span>
        </div>
        <div className="playground-canvas" ref={canvasRef} aria-hidden="true" />
      </div>
      <p className="playground-help" id="playground-help">
        <span className="playground-static-help">
          Tampilan statis mengikuti pengaturan pengurangan animasi di perangkat
          Anda.
        </span>
      </p>
      <noscript>
        <p className="playground-help">
          Aktifkan JavaScript untuk mencoba tampilan 3D.
        </p>
      </noscript>
    </>
  );
}
