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
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
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
      <fog attach="fog" args={["#0b0a09", 120, 620]} />
      <StarLayer count={1600} size={0.7} color="#f4f1ea" opacity={0.85} />
      <StarLayer count={500} size={1.25} color="#d4a574" opacity={0.6} drift={-0.004} />
      <StarLayer count={220} size={1.9} color="#ffffff" opacity={0.9} drift={0.003} />
      <TravellingCamera reduceMotion={reduceMotion} />
    </Canvas>
  );
}
