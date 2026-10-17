import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/** A centered GLB model viewed by a camera orbiting its bounds. */
export function createModelScene(
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
  renderer.setClearColor(0x111322, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  let subjectRadius = 3;
  let model: THREE.Group | undefined;
  const disposeModel = (root: THREE.Object3D) => {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    root.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      geometries.add(object.geometry);
      const meshMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      meshMaterials.forEach((material) => {
        materials.add(material);
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
      });
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => {
      const source = texture.source.data;
      if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap)
        source.close();
      texture.dispose();
    });
  };
  // A soft contact shadow anchors the existing grass base in the glade.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext("2d")!;
  const gradient = shadowContext.createRadialGradient(64, 64, 8, 64, 64, 64);
  gradient.addColorStop(0, "rgba(7, 10, 22, 0.65)");
  gradient.addColorStop(0.5, "rgba(7, 10, 22, 0.3)");
  gradient.addColorStop(1, "rgba(7, 10, 22, 0)");
  shadowContext.fillStyle = gradient;
  shadowContext.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeometry = new THREE.PlaneGeometry(4.5, 4.5);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.visible = false;
  scene.add(shadow);
  scene.add(new THREE.HemisphereLight("#dbe5ff", "#383449", 1.8));
  const key = new THREE.DirectionalLight("#f5f0ff", 2.6);
  key.position.set(3, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#c4b5ed", 1.3);
  fill.position.set(-4, 1, 2);
  scene.add(fill);
  const lowerFill = new THREE.DirectionalLight("#bcc9de", 0.6);
  lowerFill.position.set(-2, -4, 3);
  scene.add(lowerFill);
  const rim = new THREE.DirectionalLight("#b8cfff", 2.4);
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
    container.style.setProperty("--garden-x", `${-current.x * 10}px`);
    container.style.setProperty("--garden-y", `${current.y * 6}px`);
    renderer.render(scene, camera);
    if (model) container.dataset.renderer = "webgl";
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
  container.dataset.renderer = "loading";
  new GLTFLoader().load(
    "/models/emilia.glb",
    (gltf) => {
      if (disposed) {
        disposeModel(gltf.scene);
        return;
      }
      model = gltf.scene;
      model.rotation.y -= Math.PI / 2;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const scale = 6 / Math.max(size.x, size.y, size.z);
      const center = bounds.getCenter(new THREE.Vector3());
      const subject = new THREE.Group();
      subject.add(model);
      subject.scale.setScalar(scale);
      subject.position.copy(center).multiplyScalar(-scale);
      const subjectBounds = new THREE.Box3().setFromObject(subject);
      subjectRadius = subjectBounds.getBoundingSphere(new THREE.Sphere()).radius;
      shadow.position.y = subjectBounds.min.y - 0.02;
      shadow.visible = true;
      scene.add(subject);
      resize();
    },
    undefined,
    () => {
      if (!disposed) container.dataset.renderer = "unavailable";
    },
  );

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
    if (model) disposeModel(model);
    shadowGeometry.dispose();
    shadowMaterial.dispose();
    shadowTexture.dispose();
    container.style.removeProperty("--garden-x");
    container.style.removeProperty("--garden-y");
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    delete container.dataset.renderer;
  };
}
