"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeEvent,
} from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Group,
  MathUtils,
  Mesh,
  TubeGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { architectureLayers, type ArchitectureLayer } from "./architecture";

type Triplet = [number, number, number];
type Props = {
  active: ArchitectureLayer;
  pointer: [number, number];
  scrollProgress: number;
  paused: boolean;
  onHighlight: (layer: ArchitectureLayer) => void;
  onReady: () => void;
  onFailure: () => void;
};

const LIME = "#c5f477";
const POSITIONS: Record<ArchitectureLayer, Triplet> = {
  frontend: [-2.4, 0, -0.1],
  backend: [0, 0, -0.35],
  database: [2.4, 0, 0.15],
};

function Block({
  size,
  position = [0, 0, 0],
  color,
  light = false,
}: {
  size: Triplet;
  position?: Triplet;
  color: string;
  light?: boolean;
}) {
  const [width, height, depth] = size;
  const geometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        width,
        height,
        depth,
        2,
        Math.min(0.055, height * 0.3, width * 0.2, depth * 0.2),
      ),
    [width, height, depth],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh position={position}>
      <primitive attach="geometry" object={geometry} />
      <meshStandardMaterial
        color={color}
        roughness={0.72}
        metalness={0.15}
        emissive={light ? color : "#000000"}
        emissiveIntensity={light ? 0.2 : 0}
      />
    </mesh>
  );
}

function BrowserPanel({ selected }: { selected: boolean }) {
  return (
    <>
      <Block
        size={[2.45, 0.16, 1.45]}
        position={[0, -0.71, 0]}
        color={selected ? "#4e6838" : "#2a3e2b"}
      />
      <Block
        size={[0.15, 0.28, 0.22]}
        position={[0, -0.5, 0]}
        color="#698451"
      />
      <Block
        size={[0.9, 0.07, 0.48]}
        position={[0, -0.6, 0.04]}
        color="#536b43"
      />
      <Block
        size={[2.25, 1.8, 0.16]}
        position={[0, 0.44, 0]}
        color={selected ? "#8fae66" : "#607a4c"}
      />
      <Block
        size={[2.1, 1.64, 0.04]}
        position={[0, 0.44, 0.095]}
        color="#14251c"
      />
      <Block
        size={[2.05, 0.23, 0.045]}
        position={[0, 1.08, 0.12]}
        color="#3c5638"
      />
      {[-0.84, -0.7, -0.56].map((x) => (
        <mesh key={x} position={[x, 1.08, 0.16]}>
          <sphereGeometry args={[0.032, 10, 8]} />
          <meshBasicMaterial color={LIME} />
        </mesh>
      ))}
      <Block
        size={[0.36, 1.08, 0.03]}
        position={[-0.78, 0.32, 0.13]}
        color="#29452e"
      />
      <Block
        size={[1.12, 0.065, 0.025]}
        position={[0.15, 0.77, 0.14]}
        color={selected ? LIME : "#93ae72"}
        light
      />
      <Block
        size={[0.49, 0.38, 0.035]}
        position={[-0.19, 0.39, 0.14]}
        color="#44623b"
      />
      <Block
        size={[0.49, 0.38, 0.035]}
        position={[0.46, 0.39, 0.14]}
        color="#395434"
      />
      {[0.06, -0.13].map((y, index) => (
        <Block
          key={y}
          size={[index ? 0.78 : 1.12, 0.055, 0.025]}
          position={[index ? -0.02 : 0.15, y, 0.14]}
          color="#7f9866"
        />
      ))}
    </>
  );
}

function BackendModule({ selected }: { selected: boolean }) {
  return (
    <>
      <Block
        size={[1.85, 0.16, 1.55]}
        position={[0, -0.71, 0]}
        color={selected ? "#4e6838" : "#2a3e2b"}
      />
      <Block
        size={[1.4, 1.8, 1.03]}
        position={[0, 0.26, 0]}
        color={selected ? "#668751" : "#455f3e"}
      />
      <Block
        size={[1.25, 1.6, 0.04]}
        position={[0, 0.26, 0.54]}
        color="#1c3023"
      />
      {[0.76, 0.29, -0.18].map((y, index) => (
        <group key={y}>
          <Block
            size={[1.1, 0.32, 0.055]}
            position={[0, y, 0.575]}
            color="#395437"
          />
          <Block
            size={[0.53, 0.045, 0.025]}
            position={[-0.17, y, 0.62]}
            color="#8aab6b"
          />
          <mesh position={[0.38, y, 0.63]}>
            <sphereGeometry args={[0.038, 10, 8]} />
            <meshBasicMaterial
              color={selected || index === 0 ? LIME : "#607c4d"}
            />
          </mesh>
        </group>
      ))}
      <Block
        size={[0.95, 0.04, 0.7]}
        position={[0, 1.18, 0]}
        color={selected ? LIME : "#8eaa6e"}
        light
      />
    </>
  );
}

function DatabaseStack({ selected }: { selected: boolean }) {
  return (
    <>
      <Block
        size={[1.95, 0.16, 1.85]}
        position={[0, -0.71, 0]}
        color={selected ? "#4e6838" : "#2a3e2b"}
      />
      {[-0.4, 0.04, 0.48].map((y) => (
        <group key={y}>
          <mesh position={[0, y, 0]}>
            <cylinderGeometry args={[0.76, 0.76, 0.37, 32]} />
            <meshStandardMaterial
              color={selected ? "#648950" : "#425f3e"}
              metalness={0.23}
              roughness={0.65}
            />
          </mesh>
          <mesh position={[0, y + 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.73, 0.018, 6, 32]} />
            <meshBasicMaterial color={selected ? LIME : "#91b06d"} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.43, 0.45, 32]} />
        <meshBasicMaterial color={selected ? LIME : "#91b06d"} />
      </mesh>
    </>
  );
}

function LayerNode({
  id,
  active,
  onHighlight,
  onNavigate,
}: {
  id: ArchitectureLayer;
  active: ArchitectureLayer;
  onHighlight: Props["onHighlight"];
  onNavigate: (id: ArchitectureLayer) => void;
}) {
  const gl = useThree((state) => state.gl);
  const over = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHighlight(id);
    gl.domElement.style.cursor = "pointer";
  };
  return (
    <group
      position={POSITIONS[id]}
      onPointerOver={over}
      onPointerOut={() => {
        gl.domElement.style.cursor = "default";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onNavigate(id);
      }}
    >
      {id === "frontend" ? (
        <BrowserPanel selected={active === id} />
      ) : id === "backend" ? (
        <BackendModule selected={active === id} />
      ) : (
        <DatabaseStack selected={active === id} />
      )}
    </group>
  );
}

function Flow({ active, paused }: Pick<Props, "active" | "paused">) {
  const progress = useRef(0);
  const packet = useRef<Mesh>(null);
  const invalidate = useThree((state) => state.invalidate);
  const curves = useMemo(
    () => [
      new CatmullRomCurve3([
        new Vector3(-2.4, -0.79, 0.55),
        new Vector3(-2.4, -0.79, 1.25),
        new Vector3(-0.4, -0.79, 1.25),
        new Vector3(0, -0.79, 0.55),
      ]),
      new CatmullRomCurve3([
        new Vector3(0, -0.79, 0.55),
        new Vector3(0.45, -0.79, 1.35),
        new Vector3(2.4, -0.79, 1.35),
        new Vector3(2.4, -0.79, 0.9),
      ]),
    ],
    [],
  );
  const tubes = useMemo(
    () => curves.map((curve) => new TubeGeometry(curve, 40, 0.025, 6, false)),
    [curves],
  );
  useEffect(() => () => tubes.forEach((tube) => tube.dispose()), [tubes]);
  useEffect(() => {
    progress.current = active === "frontend" ? 0 : 1;
    invalidate();
  }, [active, invalidate]);
  useFrame((_, delta) => {
    if (paused || !packet.current) return;
    progress.current = Math.min(
      2,
      progress.current + Math.min(delta, 0.05) * 1.1,
    );
    packet.current.visible = progress.current < 2;
    if (progress.current < 2) {
      const segment = Math.min(1, Math.floor(progress.current));
      packet.current.position.copy(
        curves[segment].getPoint(progress.current - segment),
      );
      invalidate();
    }
  });
  return (
    <>
      {tubes.map((tube, index) => (
        <mesh key={index}>
          <primitive attach="geometry" object={tube} />
          <meshBasicMaterial color="#88aa5f" />
        </mesh>
      ))}
      <mesh ref={packet}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshBasicMaterial color={LIME} />
      </mesh>
    </>
  );
}

function Application({
  active,
  pointer,
  scrollProgress,
  paused,
  onHighlight,
  onNavigate,
}: Pick<
  Props,
  "active" | "pointer" | "scrollProgress" | "paused" | "onHighlight"
> & {
  onNavigate: (id: ArchitectureLayer) => void;
}) {
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate();
  }, [pointer, scrollProgress, paused, invalidate]);
  useFrame((_, delta) => {
    if (!group.current || paused) return;
    const targetX = -pointer[1] * 0.055 + scrollProgress * 0.08;
    const targetY = pointer[0] * 0.11 + scrollProgress * 0.24;
    const targetHeight = -scrollProgress * 0.3;
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      targetHeight,
      8,
      Math.min(delta, 0.05),
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      targetX,
      8,
      Math.min(delta, 0.05),
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      targetY,
      8,
      Math.min(delta, 0.05),
    );
    if (
      Math.abs(group.current.rotation.x - targetX) +
        Math.abs(group.current.rotation.y - targetY) +
        Math.abs(group.current.position.y - targetHeight) >
      0.0002
    )
      invalidate();
  });
  return (
    <group ref={group}>
      <Block
        size={[8.2, 0.16, 4]}
        position={[0, -0.96, 0.15]}
        color="#1b2b1e"
      />
      {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
        <Block
          key={x}
          size={[0.013, 0.01, 3.7]}
          position={[x, -0.87, 0.15]}
          color="#30442c"
        />
      ))}
      {[-1.3, -0.5, 0.3, 1.1].map((z) => (
        <Block
          key={z}
          size={[7.9, 0.01, 0.013]}
          position={[0, -0.87, z]}
          color="#30442c"
        />
      ))}
      <Flow active={active} paused={paused} />
      {architectureLayers.map((layer) => (
        <LayerNode
          key={layer.id}
          id={layer.id}
          active={active}
          onHighlight={onHighlight}
          onNavigate={onNavigate}
        />
      ))}
    </group>
  );
}

function SceneLifecycle({
  onReady,
  onFailure,
}: Pick<Props, "onReady" | "onFailure">) {
  const { gl, camera, size, invalidate } = useThree();
  const notified = useRef(false);
  const readyFrame = useRef<number | null>(null);
  useEffect(() => {
    if ("zoom" in camera) {
      camera.zoom = Math.min(size.width / 10.2, size.height / 7.2);
      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate]);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => {
      gl.domElement.removeEventListener("webglcontextlost", lost);
      if (readyFrame.current !== null) cancelAnimationFrame(readyFrame.current);
    };
  }, [gl, onFailure]);
  useFrame(() => {
    if (!notified.current) {
      notified.current = true;
      readyFrame.current = requestAnimationFrame(onReady);
    }
  });
  return null;
}

export default function ArchitectureScene(props: Props) {
  const router = useRouter();
  const navigate = useCallback(
    (id: ArchitectureLayer) => {
      const layer = architectureLayers.find((item) => item.id === id);
      if (layer) router.push(layer.href);
    },
    [router],
  );
  return (
    <Canvas
      orthographic
      camera={{ position: [7, 5.5, 10], zoom: 50, near: 0.1, far: 60 }}
      dpr={[1, 1.5]}
      frameloop={props.paused ? "never" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
      tabIndex={-1}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 7, 5]} intensity={2.4} color="#efffd6" />
      <directionalLight
        position={[-5, 2, -3]}
        intensity={1.2}
        color="#9caf8c"
      />
      <Application
        active={props.active}
        pointer={props.pointer}
        scrollProgress={props.scrollProgress}
        paused={props.paused}
        onHighlight={props.onHighlight}
        onNavigate={navigate}
      />
      <SceneLifecycle onReady={props.onReady} onFailure={props.onFailure} />
    </Canvas>
  );
}
