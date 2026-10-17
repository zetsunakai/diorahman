"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createDinoGame, type DinoPhase } from "./createDinoGame";
import "./dino-playground.css";

export function DinoPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<ReturnType<typeof createDinoGame>>(undefined);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<DinoPhase>("ready");

  useEffect(() => {
    if (!canvasRef.current) return;
    const game = createDinoGame(canvasRef.current, setPhase, setScore);
    gameRef.current = game;
    return () => { game?.dispose(); gameRef.current = undefined; };
  }, []);

  const jump = () => {
    sceneRef.current?.focus({ preventScroll: true });
    gameRef.current?.jump();
  };
  const togglePause = () => {
    sceneRef.current?.focus({ preventScroll: true });
    gameRef.current?.togglePause();
  };

  const keyDown = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLButtonElement && ["Space", "Enter"].includes(event.code)) return;
    if (["Space", "ArrowUp", "ArrowDown", "KeyP", "Escape"].includes(event.code)) {
      event.preventDefault();
      if (event.repeat) return;
      if (event.code === "Space" || event.code === "ArrowUp") gameRef.current?.jump();
      if (event.code === "ArrowDown") gameRef.current?.duck(true);
      if (event.code === "KeyP") gameRef.current?.togglePause();
      if (event.code === "Escape") gameRef.current?.pause();
    }
  };

  return (
    <div
      ref={sceneRef}
      className="playground-scene dino-scene"
      role="region"
      aria-label="Dino Runner, permainan lompat rintangan"
      aria-describedby="dino-controls"
      tabIndex={0}
      data-phase={phase}
      onKeyDown={keyDown}
      onKeyUp={(event) => { if (event.code === "ArrowDown") gameRef.current?.duck(false); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) gameRef.current?.pause();
        gameRef.current?.duck(false);
      }}
    >
      <canvas
        ref={canvasRef}
        className="dino-canvas"
        aria-label="Arena Dino Runner dengan kaktus dan burung yang harus dihindari"
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.parentElement?.focus({ preventScroll: true });
          gameRef.current?.jump();
        }}
      />
      <div className="dino-toolbar">
        <button type="button" className="dino-pause" onClick={togglePause}
          disabled={phase === "ready" || phase === "over"}>
          {phase === "paused" ? "▶ RESUME [P]" : "Ⅱ HALT [P]"}
        </button>
        <button type="button" onClick={jump}>JUMP [SPACE]</button>
        <button type="button" aria-label="Tahan untuk menunduk" onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          gameRef.current?.duck(true);
        }} onPointerUp={() => gameRef.current?.duck(false)}
          onPointerCancel={() => gameRef.current?.duck(false)}
          onLostPointerCapture={() => gameRef.current?.duck(false)}
          onKeyDown={(event) => {
            if (event.code === "Space" || event.code === "Enter") {
              event.preventDefault(); gameRef.current?.duck(true);
            }
          }} onKeyUp={() => gameRef.current?.duck(false)} onBlur={() => gameRef.current?.duck(false)}>
          DUCK [↓]
        </button>
      </div>
      <div className="dino-score" aria-label="Skor permainan">
        <span>SCORE</span>
        <span className="dino-score-value">{String(score).padStart(5, "0")}</span>
      </div>
      {phase !== "running" && (
        <div className="dino-overlay" aria-live="polite">
          {phase === "over" && <strong>GAME OVER</strong>}
          {phase === "paused" && <strong>PAUSED</strong>}
          <button type="button" onClick={jump}>
            {phase === "over" ? "↻ TRY AGAIN" : phase === "paused" ? "▶ RESUME" : "▶ START RUN"}
          </button>
          <span>SPACE / TAP</span>
        </div>
      )}
      <p className="dino-controls" id="dino-controls">
        <span>COMMAND:</span> <kbd>SPACE</kbd> / <kbd>↑</kbd> <span>TO JUMP</span>
        <span className="dino-control-divider">·</span> <kbd>↓</kbd> <span>TO DUCK</span>
      </p>
      <noscript><p className="dino-noscript">Aktifkan JavaScript untuk bermain Dino Runner.</p></noscript>
    </div>
  );
}
