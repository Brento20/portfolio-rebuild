import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  A true 3D starfield. The camera travels forward along z as the
  page scrolls, so parallax falls out of real perspective instead
  of faked layer offsets.
*/

const FIELD_DEPTH = 900;
const CAMERA_START = 60;
const CAMERA_TRAVEL = 260;

/*
  PointsMaterial draws hard-edged squares by default. A soft round alpha
  mask turns each point into a gently feathered dot instead.
*/
function createStarSprite() {
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
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const starSprite = createStarSprite();

function useScrollProgress() {
  const progress = useRef(0);

  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const raw = max > 0 ? window.scrollY / max : 0;
    // critically damped chase — smooth without spring overshoot
    progress.current += (raw - progress.current) * 0.055;
  });

  return progress;
}

interface StarLayerProps {
  count: number;
  size: number;
  color: string;
  opacity: number;
  drift?: number;
}

function StarLayer({ count, size, color, opacity, drift = 0.006 }: StarLayerProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 340;
      array[i * 3 + 1] = (Math.random() - 0.5) * 200;
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
        map={starSprite}
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
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
    camera.rotation.z = progress.current * 0.06;
  });

  return null;
}

export function CosmosScene() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_START], fov: 60, near: 0.5, far: 700 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* must match --color-bg in tokens.css so the field fades into the page, not a seam */}
      <fog attach="fog" args={["#0a0f1a", 120, 620]} />
      <StarLayer count={1600} size={0.8} color="#f4f1ea" opacity={0.45} />
      <StarLayer count={500} size={1.3} color="#d4a574" opacity={0.32} drift={-0.004} />
      <StarLayer count={220} size={1.8} color="#ffffff" opacity={0.5} drift={0.003} />
      <TravellingCamera reduceMotion={reduceMotion} />
    </Canvas>
  );
}
