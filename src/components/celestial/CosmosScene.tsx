import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollLinkedProgress } from "../../hooks/useScrollLinkedProgress";
import { cssVariableNames, getCssVariable } from "../../theme/cssVariables";

const STAR_FIELD_DEPTH = 900;
const CAMERA_START_Z = 60;
const CAMERA_SCROLL_TRAVEL = 260;
const STAR_SPRITE_SIZE_PX = 64;

function createSoftStarSpriteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = STAR_SPRITE_SIZE_PX;
  canvas.height = STAR_SPRITE_SIZE_PX;
  const context = canvas.getContext("2d")!;

  const gradient = context.createRadialGradient(
    STAR_SPRITE_SIZE_PX / 2,
    STAR_SPRITE_SIZE_PX / 2,
    0,
    STAR_SPRITE_SIZE_PX / 2,
    STAR_SPRITE_SIZE_PX / 2,
    STAR_SPRITE_SIZE_PX / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, STAR_SPRITE_SIZE_PX, STAR_SPRITE_SIZE_PX);

  return new THREE.CanvasTexture(canvas);
}

const starSpriteTexture = createSoftStarSpriteTexture();

interface StarFieldLayerProps {
  starCount: number;
  pointSize: number;
  color: string;
  opacity: number;
  rotationDrift?: number;
}

function StarFieldLayer({
  starCount,
  pointSize,
  color,
  opacity,
  rotationDrift = 0.006,
}: StarFieldLayerProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positionBuffer = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let index = 0; index < starCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 340;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[index * 3 + 2] =
        CAMERA_START_Z + 40 - Math.random() * STAR_FIELD_DEPTH;
    }
    return positions;
  }, [starCount]);

  useFrame((_, deltaSeconds) => {
    if (!pointsRef.current) {
      return;
    }
    pointsRef.current.rotation.z += deltaSeconds * rotationDrift;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionBuffer, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starSpriteTexture}
        size={pointSize}
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

function ScrollLinkedCamera({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const scrollProgress = useScrollLinkedProgress();

  useFrame(({ camera }) => {
    if (prefersReducedMotion) {
      return;
    }
    camera.position.z =
      CAMERA_START_Z - scrollProgress.current * CAMERA_SCROLL_TRAVEL;
    camera.rotation.z = scrollProgress.current * 0.06;
  });

  return null;
}

export function CosmosScene() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [starColors, setStarColors] = useState({
    background: "#0a0f1a",
    ink: "#f4f1ea",
    accent: "#d4a574",
    bright: "#ffffff",
  });

  useLayoutEffect(() => {
    setStarColors({
      background: getCssVariable(cssVariableNames.background, "#0a0f1a"),
      ink: getCssVariable(cssVariableNames.ink, "#f4f1ea"),
      accent: getCssVariable(cssVariableNames.accent, "#d4a574"),
      bright: getCssVariable(cssVariableNames.starBright, "#ffffff"),
    });
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, CAMERA_START_Z],
        fov: 60,
        near: 0.5,
        far: 700,
      }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog
        attach="fog"
        args={[starColors.background, 120, 620]}
      />
      <StarFieldLayer
        starCount={1600}
        pointSize={0.8}
        color={starColors.ink}
        opacity={0.45}
      />
      <StarFieldLayer
        starCount={500}
        pointSize={1.3}
        color={starColors.accent}
        opacity={0.32}
        rotationDrift={-0.004}
      />
      <StarFieldLayer
        starCount={220}
        pointSize={1.8}
        color={starColors.bright}
        opacity={0.5}
        rotationDrift={0.003}
      />
      <ScrollLinkedCamera prefersReducedMotion={prefersReducedMotion} />
    </Canvas>
  );
}
