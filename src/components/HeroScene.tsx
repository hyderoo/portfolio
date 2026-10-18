"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function ParticleGlobe({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const detail = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? 24 : 48),
    []
  );
  const pointsGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.35, detail), [detail]);
  const wireGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.36, 1), []);

  useFrame((state, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.x += delta * 0.02;
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    group.current.rotation.y += (pointer.current.x * 0.35 - group.current.rotation.y % 0.001) * 0.002;
    group.current.rotation.x += pointer.current.y * 0.002;
  });

  return (
    <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.9}>
      <group ref={group} rotation={[0.35, 0.4, 0]}>
        <points geometry={pointsGeometry}>
          <pointsMaterial
            size={0.022}
            color="#e4572e"
            transparent
            opacity={0.75}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
        <mesh geometry={wireGeometry}>
          <meshBasicMaterial color="#f2ede3" wireframe transparent opacity={0.07} />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.z = aspect < 0.8 ? 9.5 : 6.2;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export default function HeroScene() {
  const reduced = useReducedMotion() ?? false;
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "never" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <CameraRig />
      <ParticleGlobe reduced={reduced} />
    </Canvas>
  );
}
