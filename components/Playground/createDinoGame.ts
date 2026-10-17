export type DinoPhase = "ready" | "running" | "paused" | "over";
type Hazard = { x: number; width: number; height: number; bird: boolean; high: boolean };

export function createDinoGame(
  canvas: HTMLCanvasElement,
  onPhase: (phase: DinoPhase) => void,
  onScore: (score: number) => void,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 0;
  let height = 0;
  let phase: DinoPhase = "ready";
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let travel = 0;
  let score = 0;
  let altitude = 0;
  let velocity = 0;
  let ducking = false;
  let spawnIn = 1.4;
  let hazards: Hazard[] = [];
  const ground = () => height - 64;
  const playerX = () => Math.max(36, Math.min(84, width * 0.07));
  const theme = getComputedStyle(canvas);
  const ink = theme.getPropertyValue("--text").trim() || "#f2f3eb";
  const accent = theme.getPropertyValue("--accent").trim() || "#c5f477";
  const muted = theme.getPropertyValue("--muted").trim() || "#b0b6a7";
  const line = theme.getPropertyValue("--line").trim() || "#343b2f";
  const panel = theme.getPropertyValue("--panel").trim() || "#191d17";

  function setPhase(next: DinoPhase) {
    phase = next;
    onPhase(next);
  }
  function drawDino() {
    if (!ctx) return;
    ctx.save();
    ctx.translate(Math.round(playerX()), Math.round(ground() - altitude));
    ctx.fillStyle = accent;
    const rect = (x: number, y: number, w: number, h: number) => ctx.fillRect(x, y, w, h);
    const step = phase === "running" && altitude === 0 ? Math.floor(elapsed * 12) % 2 : 0;
    if (ducking && altitude === 0) {
      rect(24, -26, 24, 14); rect(8, -20, 30, 14);
      rect(0, -24, 6, 10); rect(4, -18, 10, 10);
      rect(12 + step * 12, -6, 6, 6); rect(30 - step * 12, -6, 6, 4);
      ctx.clearRect(40, -23, 2, 2);
    } else {
      rect(22, -44, 20, 4); rect(20, -40, 24, 14);
      rect(20, -26, 14, 6); rect(14, -22, 20, 12);
      rect(8, -18, 20, 12); rect(4, -22, 8, 12);
      rect(0, -28, 4, 14); rect(12, -10, 14, 4);
      rect(30, -22, 8, 4); rect(36, -20, 2, 6);
      rect(12, -6, 4, step ? 3 : 6); rect(12, step ? -5 : -2, 8, 2);
      rect(24, -6, 4, step ? 6 : 3); rect(24, step ? -2 : -5, 8, 2);
      ctx.clearRect(26, -40, 2, 2);
      ctx.clearRect(32, -29, 12, 2);
    }
    if (phase === "over") {
      ctx.fillStyle = panel;
      rect(25, ducking ? -24 : -41, 5, 5);
      ctx.fillStyle = accent;
      rect(27, ducking ? -23 : -40, 1, 3);
    }
    ctx.restore();
  }
  function draw() {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = line;
    const cloud = (x: number, y: number, scale: number) => {
      ctx.save(); ctx.translate(Math.round(x), y); ctx.scale(scale, scale);
      ctx.fillRect(12, 0, 16, 4); ctx.fillRect(6, 4, 28, 4); ctx.fillRect(0, 8, 44, 4);
      ctx.restore();
    };
    for (let i = 0; i < 3; i++) {
      const x = ((width * (0.26 + i * 0.39) - travel * 0.12) % (width + 100) + width + 100) % (width + 100) - 50;
      cloud(x, 48 + (i % 2) * 28, i === 1 ? 1.5 : 1.2);
    }
    ctx.fillStyle = line;
    ctx.fillRect(width - 72, 36, 28, 28);
    ctx.fillStyle = ink;
    ctx.fillRect(8, ground(), width - 16, 2);
    ctx.fillStyle = muted;
    for (let i = 0; i < Math.ceil(width / 57) + 1; i++) {
      const x = Math.round(i * 57 - travel % 57);
      ctx.fillRect(x, ground() + 8 + (i % 3) * 3, i % 3 === 0 ? 8 : 3, 2);
    }
    ctx.fillStyle = ink;
    for (const obstacle of hazards) {
      const x = Math.round(obstacle.x);
      if (obstacle.bird) {
        const y = ground() - (obstacle.high ? 94 : 47);
        ctx.fillRect(x, y + 6, 32, 6); ctx.fillRect(x + 8, y + 12, 14, 6);
        ctx.fillRect(x + 28, y + 2, 6, 6);
        const wing = Math.floor(elapsed * 6) % 2;
        ctx.fillRect(x + 10, y + (wing ? 14 : -6), 10, 12);
      } else {
        const y = ground() - obstacle.height;
        ctx.fillRect(x + 8, y, 6, obstacle.height);
        ctx.fillRect(x, y + 12, 5, 18); ctx.fillRect(x, y + 26, 10, 5);
        ctx.fillRect(x + 18, y + 8, 5, 19); ctx.fillRect(x + 12, y + 23, 11, 5);
        if (obstacle.width > 26) {
          ctx.fillRect(x + 34, y + 8, 6, obstacle.height - 8);
          ctx.fillRect(x + 27, y + 20, 5, 16); ctx.fillRect(x + 27, y + 32, 10, 5);
          ctx.fillRect(x + 44, y + 18, 5, 14); ctx.fillRect(x + 38, y + 28, 11, 5);
        }
      }
    }
    drawDino();
  }
  function tick(time: number) {
    frame = 0;
    if (phase !== "running") return;
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.035) : 0;
    lastTime = time;
    elapsed += dt;
    const speed = Math.min(width < 600 ? 310 : 490, (width < 600 ? 200 : 285) + elapsed * 3);
    travel += speed * dt;
    const nextScore = Math.floor(travel / 10);
    if (nextScore !== score) {
      score = nextScore;
      onScore(score);
    }
    if (altitude > 0 || velocity > 0) {
      velocity -= (ducking ? 2400 : 1500) * dt;
      altitude = Math.max(0, altitude + velocity * dt);
      if (!altitude && velocity < 0) velocity = 0;
    }
    spawnIn -= dt;
    if (spawnIn <= 0) {
      const bird = elapsed > 12 && Math.random() < 0.35;
      hazards.push({ x: width + 30, width: bird ? 34 : Math.random() < 0.3 ? 49 : 23,
        height: bird ? 24 : 40 + Math.floor(Math.random() * 16), bird, high: Math.random() < 0.4 });
      spawnIn = 1.3 + Math.random() * 0.8;
    }
    const playerHeight = ducking && !altitude ? 25 : 42;
    const px = playerX() + 7;
    const py = ground() - altitude - playerHeight;
    for (const obstacle of hazards) {
      obstacle.x -= speed * dt;
      const oy = ground() - (obstacle.bird ? obstacle.high ? 94 : 47 : obstacle.height);
      const oh = obstacle.bird ? 24 : obstacle.height;
      if (px < obstacle.x + obstacle.width - 3 && px + 27 > obstacle.x + 3 &&
          py < oy + oh - 3 && py + playerHeight - 3 > oy + 3) {
        ducking = false;
        setPhase("over");
        break;
      }
    }
    hazards = hazards.filter((obstacle) => obstacle.x + obstacle.width > -20);
    draw();
    if (phase === "running") frame = requestAnimationFrame(tick);
  }
  function run() {
    lastTime = 0;
    setPhase("running");
    frame = requestAnimationFrame(tick);
  }
  function jump() {
    if (phase === "ready" || phase === "over") {
      hazards = []; elapsed = travel = altitude = velocity = 0;
      score = 0; onScore(score);
      spawnIn = 1.4; ducking = false; run();
    } else if (phase === "paused") {
      run();
    }
    if (!altitude && phase === "running") {
      ducking = false;
      velocity = 560;
    }
  }
  function pause() {
    if (phase !== "running") return;
    cancelAnimationFrame(frame); frame = 0; ducking = false;
    setPhase("paused"); draw();
  }
  function togglePause() {
    if (phase === "paused") run();
    else pause();
  }
  function duck(active: boolean) {
    ducking = active && phase === "running";
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (width && (width !== bounds.width || height !== bounds.height)) pause();
    width = bounds.width; height = bounds.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx!.imageSmoothingEnabled = false;
    draw();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) pause();
  });
  visibilityObserver.observe(canvas);
  const onVisibility = () => { if (document.hidden) pause(); };
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("blur", pause);
  resize();
  return { jump, duck, togglePause, pause,
    dispose() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect(); visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", pause);
    },
  };
}
