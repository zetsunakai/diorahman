import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import fontData from "./fonts/dio-display.typeface.json";

/** A fixed text mesh at the origin, viewed by a camera orbiting that origin. */
export function createDioScene(
  container: HTMLDivElement,
  host: HTMLDivElement,
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  if (!context) {
    container.dataset.renderer = "unavailable";
    return () => {
      delete container.dataset.renderer;
    };
  }
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x171d14, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  const font = new FontLoader().parse(fontData);
  const geometry = new TextGeometry("DIO.", {
    font,
    size: 2.8,
    depth: 0.7,
    curveSegments: 32,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.045,
    bevelSegments: 3,
  });
  geometry.center();
  geometry.computeBoundingSphere();
  const subjectRadius = geometry.boundingSphere!.radius;
  const materials = [
    new THREE.MeshStandardMaterial({
      color: "#c5f477",
      roughness: 0.38,
      metalness: 0.18,
    }),
    new THREE.MeshStandardMaterial({
      color: "#456b28",
      roughness: 0.45,
      metalness: 0.25,
    }),
  ];
  scene.add(new THREE.Mesh(geometry, materials));
  const grid = new THREE.GridHelper(30, 60, "#6b8d49", "#4e6537");
  grid.rotation.x = Math.PI / 2;
  grid.position.z = -1.4;
  const gridMaterial = grid.material as THREE.LineBasicMaterial;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.16;
  gridMaterial.depthWrite = false;
  scene.add(grid);
  scene.add(new THREE.HemisphereLight("#f6ffde", "#17200f", 1.5));
  const key = new THREE.DirectionalLight("#ffffff", 3);
  key.position.set(3, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#d5f5ac", 1.8);
  fill.position.set(-4, 1, 2);
  scene.add(fill);
  const lowerFill = new THREE.DirectionalLight("#b5cf96", 0.9);
  lowerFill.position.set(-2, -4, 3);
  scene.add(lowerFill);
  const rim = new THREE.DirectionalLight("#c5f477", 2);
  rim.position.set(1, 3, -4);
  scene.add(rim);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const target = new THREE.Vector2();
  const current = new THREE.Vector2();
  let radius = 8;
  let frame = 0;
  let previousTime = 0;
  let disposed = false;
  let contextLost = false;

  const render = (time: number) => {
    frame = 0;
    if (disposed || contextLost || document.hidden) return;
    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 1 / 60;
    previousTime = time;
    current.x = THREE.MathUtils.damp(current.x, target.x, 8, delta);
    current.y = THREE.MathUtils.damp(current.y, target.y, 8, delta);
    if (current.distanceTo(target) < 0.0001) current.copy(target);
    // Reach a clear side view before the pointer reaches the panel's edge.
    const yaw =
      Math.sin((current.x * Math.PI) / 2) * THREE.MathUtils.degToRad(80);
    const pitch =
      -Math.sin((current.y * Math.PI) / 2) * THREE.MathUtils.degToRad(60);
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * radius,
      Math.sin(pitch) * radius,
      Math.cos(yaw) * Math.cos(pitch) * radius,
    );
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    container.dataset.renderer = "webgl";
    if (!current.equals(target)) requestRender();
  };
  const requestRender = () => {
    if (!frame && !disposed && !contextLost && !document.hidden)
      frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const horizontalHalfFov = Math.atan(Math.tan(halfFov) * camera.aspect);
    // Fit every orbit angle without changing the camera distance while moving.
    radius =
      (subjectRadius / Math.sin(Math.min(halfFov, horizontalHalfFov))) * 1.1;
    renderer.setSize(width, height, false);
    requestRender();
  };
  const move = (x: number, y: number) => {
    if (reduced.matches) return;
    target.set(
      THREE.MathUtils.clamp(x, -1, 1),
      THREE.MathUtils.clamp(y, -1, 1),
    );
    requestRender();
  };
  const pointer = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    move(
      ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    );
  };
  const reset = () => {
    target.set(0, 0);
    requestRender();
  };
  const releaseTouch = (event: PointerEvent) => {
    if (event.pointerType === "touch") reset();
  };
  const keyboard = (event: KeyboardEvent) => {
    if (reduced.matches) return;
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-0.25, 0],
      ArrowRight: [0.25, 0],
      ArrowUp: [0, -0.25],
      ArrowDown: [0, 0.25],
    };
    if (event.key === "Escape" || event.key === "Home") {
      event.preventDefault();
      reset();
    } else if (steps[event.key]) {
      event.preventDefault();
      const [x, y] = steps[event.key];
      move(target.x + x, target.y + y);
    }
  };
  const motionChange = () => {
    if (!reduced.matches) return;
    target.set(0, 0);
    current.set(0, 0);
    requestRender();
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      target.set(0, 0);
    } else requestRender();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    container.dataset.renderer = "unavailable";
  };
  const restored = () => {
    contextLost = false;
    reset();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  container.addEventListener("pointerenter", pointer);
  container.addEventListener("pointerdown", pointer);
  container.addEventListener("pointermove", pointer);
  container.addEventListener("pointerleave", reset);
  container.addEventListener("pointercancel", reset);
  container.addEventListener("pointerup", releaseTouch);
  container.addEventListener("keydown", keyboard);
  container.addEventListener("blur", reset);
  window.addEventListener("blur", reset);
  document.addEventListener("visibilitychange", visibility);
  reduced.addEventListener("change", motionChange);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  resize();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    container.removeEventListener("pointerenter", pointer);
    container.removeEventListener("pointerdown", pointer);
    container.removeEventListener("pointermove", pointer);
    container.removeEventListener("pointerleave", reset);
    container.removeEventListener("pointercancel", reset);
    container.removeEventListener("pointerup", releaseTouch);
    container.removeEventListener("keydown", keyboard);
    container.removeEventListener("blur", reset);
    window.removeEventListener("blur", reset);
    document.removeEventListener("visibilitychange", visibility);
    reduced.removeEventListener("change", motionChange);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    renderer.domElement.removeEventListener("webglcontextrestored", restored);
    geometry.dispose();
    materials.forEach((material) => material.dispose());
    grid.geometry.dispose();
    gridMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    delete container.dataset.renderer;
  };
}
