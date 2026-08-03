import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  Quiet 3D field. Round, soft-edged points — kept subtle so
  type always wins. Camera drifts forward as the page scrolls.
*/

const FIELD_DEPTH = 900;
const CAMERA_START = 60;
const CAMERA_TRAVEL = 220;

function makeStarSprite() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.45)");
  gradient.addColorStop(0.55, "rgba(255,255,255,0.12)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function useScrollProgress() {
  const progress = useRef(0);

  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const raw = max > 0 ? window.scrollY / max : 0;
    progress.current += (raw - progress.current) * 0.05;
  });

  return progress;
}

interface StarLayerProps {
  count: number;
  size: number;
  color: string;
  opacity: number;
  sprite: THREE.Texture;
  drift?: number;
}

function StarLayer({
  count,
  size,
  color,
  opacity,
  sprite,
  drift = 0.003,
}: StarLayerProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 360;
      array[i * 3 + 1] = (Math.random() - 0.5) * 220;
      array[i * 3 + 2] = CAMERA_START + 40 - Math.random() * FIELD_DEPTH;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * drift;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.01}
      />
    </points>
  );
}

function TravellingCamera({ reduceMotion }: { reduceMotion: boolean }) {
  const progress = useScrollProgress();

  useFrame(({ camera }) => {
    if (reduceMotion) return;
    camera.position.z = CAMERA_START - progress.current * CAMERA_TRAVEL;
    camera.rotation.z = progress.current * 0.04;
  });

  return null;
}

export function CosmosScene() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sprite = useMemo(() => makeStarSprite(), []);

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_START], fov: 58, near: 0.5, far: 700 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#131b24"]} />
      <fog attach="fog" args={["#131b24", 90, 520]} />
      <StarLayer
        sprite={sprite}
        count={900}
        size={0.55}
        color="#e9e2cf"
        opacity={0.32}
      />
      <StarLayer
        sprite={sprite}
        count={220}
        size={0.9}
        color="#d3bd8b"
        opacity={0.22}
        drift={-0.002}
      />
      <StarLayer
        sprite={sprite}
        count={80}
        size={1.15}
        color="#9fc0bc"
        opacity={0.18}
        drift={0.0015}
      />
      <TravellingCamera reduceMotion={reduceMotion} />
    </Canvas>
  );
}
