"use client";

import { useEffect, useRef } from "react";

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
        import("./createDioScene")
          .then(({ createDioScene }) => {
            if (!disposed) cleanup = createDioScene(scene, host);
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
        aria-label="Tulisan DIO tiga dimensi dengan kamera interaktif"
        aria-describedby="playground-help"
      >
        <div className="playground-scene-label mono" aria-hidden="true">
          <span>Dio / Playground</span>
          <span>
            <span className="playground-live-label">3D · Camera parallax</span>
            <span className="playground-preview-label">Pratinjau statis</span>
          </span>
        </div>
        <div className="playground-fallback" aria-hidden="true">
          <div className="playground-grid" />
          <span>
            DIO<span className="playground-period">.</span>
          </span>
        </div>
        <div className="playground-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="playground-scene-footer mono" aria-hidden="true">
          <span>Full-Stack Developer</span>
          <span>React · Next.js · Python</span>
        </div>
      </div>
      <p className="playground-help" id="playground-help">
        <span className="playground-motion-help">
          Gerakkan mouse atau geser mendatar untuk melihat sisi tulisan. Dengan
          keyboard, fokuskan area ini dan gunakan tombol panah. Tekan Esc untuk
          kembali ke posisi awal.
        </span>
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
