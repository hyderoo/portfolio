"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { isSoftwareGL, prefersReducedMotion } from "@/lib/gl";

// The page-long particle field: a fixed canvas behind the content whose
// particles break out of the hero orb and reassemble into a constellation, a
// heart and a spiral galaxy as you scroll, then settle back into an orb at
// the contact section. Reduced-motion and software-GL clients never mount
// this; they keep the hero's pre-rendered still instead.

const ACCENT = [0.894, 0.341, 0.18] as const; // #e4572e
const INK = [0.949, 0.929, 0.89] as const; //    #f2ede3

const SHAPE_COUNT = 5;
// rotation.x tilt per shape, and whether the shape is a flat XY drawing that
// must face the camera (its rotation.y snaps to the nearest full turn).
const SHAPE_TILT = [0.3, 0.0, 0.0, 0.55, 0.3];
const SHAPE_FLAT = [false, true, true, false, false];

// Keyframes mapping scroll progress (0-1 over the whole page) to the shape
// parameter (0..SHAPE_COUNT-1). Flat segments hold a shape; sloped segments
// morph between two.
const KEYS: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [0.1, 0],
  [0.26, 1], [0.38, 1],
  [0.52, 2], [0.62, 2],
  [0.76, 3], [0.84, 3],
  [0.95, 4], [1, 4],
];

function shapeParam(p: number): number {
  if (p <= KEYS[0][0]) return KEYS[0][1];
  for (let i = 1; i < KEYS.length; i++) {
    const [p1, s1] = KEYS[i];
    if (p <= p1) {
      const [p0, s0] = KEYS[i - 1];
      if (p1 === p0 || s1 === s0) return s1;
      return s0 + ((p - p0) / (p1 - p0)) * (s1 - s0);
    }
  }
  return KEYS[KEYS.length - 1][1];
}

// Deterministic RNG so every particle lands in the same place on every load.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

function gauss(rng: Rng): number {
  return rng() + rng() + rng() - 1.5; // approx normal in [-1.5, 1.5]
}

function putColor(col: Float32Array, i: number, base: readonly [number, number, number] | readonly number[], rng: Rng, vary = 0.12) {
  const v = 1 - vary / 2 + rng() * vary;
  col[i * 3] = base[0] * v;
  col[i * 3 + 1] = base[1] * v;
  col[i * 3 + 2] = base[2] * v;
}

function buildSphere(n: number, r: number, rng: Rng, pos: Float32Array, col: Float32Array) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const j = 1 + (rng() - 0.5) * 0.04;
    pos[i * 3] = Math.cos(theta) * rad * r * j;
    pos[i * 3 + 1] = y * r * j;
    pos[i * 3 + 2] = Math.sin(theta) * rad * r * j;
    putColor(col, i, rng() < 0.84 ? ACCENT : INK, rng);
  }
}

// Big Dipper: seven stars and the links between them, so the "rasi bintang"
// reads as an actual constellation, not random dots.
const STARS: ReadonlyArray<readonly [number, number]> = [
  [1.62, 0.92], // Dubhe
  [1.58, 0.18], // Merak
  [0.82, 0.06], // Phecda
  [0.76, 0.72], // Megrez
  [0.08, 0.95], // Alioth
  [-0.56, 1.12], // Mizar
  [-1.34, 1.38], // Alkaid
];
const LINKS: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6],
];

function buildConstellation(n: number, scale: number, rng: Rng, pos: Float32Array, col: Float32Array) {
  const starShare = 0.55;
  const starCount = Math.floor(n * starShare);
  const linkLens = LINKS.map(([a, b]) =>
    Math.hypot(STARS[b][0] - STARS[a][0], STARS[b][1] - STARS[a][1])
  );
  const totalLen = linkLens.reduce((s, x) => s + x, 0);
  for (let i = 0; i < n; i++) {
    let x: number, y: number;
    if (i < starCount) {
      const [sx, sy] = STARS[i % STARS.length];
      x = sx + gauss(rng) * 0.055;
      y = sy + gauss(rng) * 0.055;
      putColor(col, i, rng() < 0.8 ? INK : ACCENT, rng, 0.08);
    } else {
      // pick a link weighted by length, then a point along it
      let pick = rng() * totalLen;
      let li = 0;
      while (li < LINKS.length - 1 && pick > linkLens[li]) { pick -= linkLens[li]; li++; }
      const [a, b] = LINKS[li];
      const t = rng();
      x = STARS[a][0] + (STARS[b][0] - STARS[a][0]) * t + gauss(rng) * 0.018;
      y = STARS[a][1] + (STARS[b][1] - STARS[a][1]) * t + gauss(rng) * 0.018;
      putColor(col, i, ACCENT, rng, 0.25);
    }
    pos[i * 3] = x * scale;
    pos[i * 3 + 1] = (y - 0.72) * scale; // center vertically
    pos[i * 3 + 2] = gauss(rng) * 0.09;
  }
}

function heartXY(t: number): [number, number] {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return [x, y];
}

function buildHeart(n: number, rng: Rng, pos: Float32Array, col: Float32Array) {
  const k = 0.135; // raw curve is ~±17 units
  for (let i = 0; i < n; i++) {
    const t = rng() * Math.PI * 2;
    const [hx, hy] = heartXY(t);
    if (i % 5 < 2) {
      // interior fill, denser toward the outline
      const u = 0.25 + 0.72 * Math.sqrt(rng());
      pos[i * 3] = hx * k * u + gauss(rng) * 0.02;
      pos[i * 3 + 1] = (hy * k + 0.15) * u + gauss(rng) * 0.02;
      putColor(col, i, ACCENT, rng, 0.35);
    } else {
      // outline
      pos[i * 3] = hx * k + gauss(rng) * 0.03;
      pos[i * 3 + 1] = hy * k + 0.15 + gauss(rng) * 0.03;
      putColor(col, i, rng() < 0.75 ? ACCENT : INK, rng, 0.15);
    }
    pos[i * 3 + 2] = gauss(rng) * 0.08;
  }
}

function buildGalaxy(n: number, rng: Rng, pos: Float32Array, col: Float32Array) {
  const arms = 3;
  for (let i = 0; i < n; i++) {
    const arm = i % arms;
    const r = 0.22 + Math.pow(rng(), 0.72) * 2.15;
    const spread = 0.3 * (1.35 - r / 2.4);
    const angle = (arm * Math.PI * 2) / arms + r * 2.15 + gauss(rng) * spread;
    pos[i * 3] = Math.cos(angle) * r;
    pos[i * 3 + 1] = gauss(rng) * 0.3 * Math.max(0.12, 1 - r / 2.6);
    pos[i * 3 + 2] = Math.sin(angle) * r;
    const inner = r < 0.75;
    putColor(col, i, inner ? INK : rng() < 0.85 ? ACCENT : INK, rng, 0.2);
  }
}

function buildShapes(n: number, scale: number) {
  const positions: Float32Array[] = [];
  const colors: Float32Array[] = [];
  const makers: Array<(n: number, rng: Rng, pos: Float32Array, col: Float32Array) => void> = [
    (n, rng, p, c) => buildSphere(n, 2.2 * scale, rng, p, c),
    (n, rng, p, c) => buildConstellation(n, 1.55 * scale, rng, p, c),
    (n, rng, p, c) => buildHeart(n, rng, p, c),
    (n, rng, p, c) => buildGalaxy(n, rng, p, c),
    (n, rng, p, c) => buildSphere(n, 1.7 * scale, rng, p, c),
  ];
  makers.forEach((make, si) => {
    const rng = mulberry32(1234 + si * 999);
    const p = new Float32Array(n * 3);
    const c = new Float32Array(n * 3);
    make(n, rng, p, c);
    if (si >= 2 && si <= 3) {
      // heart and galaxy were built unscaled; scale them here
      for (let i = 0; i < n * 3; i++) p[i] *= scale;
    }
    positions.push(p);
    colors.push(c);
  });
  return { positions, colors };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Particles({ count, scale, pointSize }: { count: number; scale: number; pointSize: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const spin = useRef(0.4);

  const { positions, colors } = useMemo(() => buildShapes(count, scale), [count, scale]);

  const seeds = useMemo(() => {
    const rng = mulberry32(777);
    const stagger = new Float32Array(count);
    const burst = new Float32Array(count * 3);
    const phase = new Float32Array(count * 2);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      stagger[i] = rng() * 0.3;
      // random unit vector for the mid-morph burst
      const th = rng() * Math.PI * 2;
      const ph = Math.acos(2 * rng() - 1);
      burst[i * 3] = Math.sin(ph) * Math.cos(th);
      burst[i * 3 + 1] = Math.cos(ph);
      burst[i * 3 + 2] = Math.sin(ph) * Math.sin(th);
      phase[i * 2] = rng() * Math.PI * 2;
      phase[i * 2 + 1] = rng() * Math.PI * 2;
      speed[i] = 0.5 + rng() * 0.9;
    }
    return { stagger, burst, phase, speed };
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions[0].slice(), 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors[0].slice(), 3));
    return g;
  }, [positions, colors]);

  const wireGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(2.26 * scale, 1),
    [scale]
  );

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    const s = Math.min(SHAPE_COUNT - 1, shapeParam(p));
    const i0 = Math.min(SHAPE_COUNT - 2, Math.floor(s));
    const f = Math.min(1, s - i0);
    const posA = positions[i0], posB = positions[i0 + 1];
    const colA = colors[i0], colB = colors[i0 + 1];
    const posAttr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = points.geometry.getAttribute("color") as THREE.BufferAttribute;
    const out = posAttr.array as Float32Array;
    const outC = colAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const n = out.length / 3;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      let lt = (f - seeds.stagger[i]) / 0.7;
      lt = lt < 0 ? 0 : lt > 1 ? 1 : lt;
      const e = easeInOutCubic(lt);
      const burst = Math.sin(Math.PI * e) * 1.15;
      const wobble = 0.035 * (1 - burst * 0.6);
      const ph = seeds.phase;
      const sp = seeds.speed[i];
      out[i3] =
        posA[i3] + (posB[i3] - posA[i3]) * e +
        seeds.burst[i3] * burst +
        Math.sin(t * sp + ph[i * 2]) * wobble;
      out[i3 + 1] =
        posA[i3 + 1] + (posB[i3 + 1] - posA[i3 + 1]) * e +
        seeds.burst[i3 + 1] * burst +
        Math.cos(t * sp * 0.9 + ph[i * 2 + 1]) * wobble;
      out[i3 + 2] =
        posA[i3 + 2] + (posB[i3 + 2] - posA[i3 + 2]) * e +
        seeds.burst[i3 + 2] * burst +
        Math.sin(t * sp * 0.7 + ph[i * 2] * 1.7) * wobble * 0.6;
      outC[i3] = colA[i3] + (colB[i3] - colA[i3]) * e;
      outC[i3 + 1] = colA[i3 + 1] + (colB[i3 + 1] - colA[i3 + 1]) * e;
      outC[i3 + 2] = colA[i3 + 2] + (colB[i3 + 2] - colA[i3 + 2]) * e;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // slow spin, livelier while a morph is in flight. Flat shapes (the
    // constellation and the heart) snap back to face the camera as their
    // weight grows; the galaxy gets a stronger tilt so the disk reads.
    const eG = easeInOutCubic(f);
    spin.current += delta * (0.045 + 0.5 * Math.sin(Math.PI * f));
    const flatW = SHAPE_FLAT[i0] && SHAPE_FLAT[i0 + 1]
      ? 1
      : SHAPE_FLAT[i0]
        ? 1 - eG
        : SHAPE_FLAT[i0 + 1]
          ? eG
          : 0;
    const twoPi = Math.PI * 2;
    const nearest = Math.round(spin.current / twoPi) * twoPi;
    const rotY = spin.current + (nearest - spin.current) * flatW;
    const tilt = SHAPE_TILT[i0] + (SHAPE_TILT[i0 + 1] - SHAPE_TILT[i0]) * eG;
    const group = points.parent;
    if (group) {
      group.rotation.y = rotY + state.pointer.x * 0.22 * (1 - flatW * 0.6);
      group.rotation.x = tilt + state.pointer.y * 0.1;
    }

    // the faint wireframe only belongs to the orb shapes (first and last)
    if (wireRef.current) {
      const w = Math.max(0, 1 - s) + Math.max(0, s - (SHAPE_COUNT - 2));
      const mat = wireRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 * Math.min(1, w);
      wireRef.current.visible = w > 0.02;
    }
  });

  return (
    <>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={pointSize}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={wireRef} geometry={wireGeometry}>
        <meshBasicMaterial color="#f2ede3" wireframe transparent opacity={0.06} />
      </mesh>
    </>
  );
}

function CameraRig() {
  useFrame((state) => {
    const aspect = state.size.width / state.size.height;
    const z = aspect < 0.8 ? 9.5 : 6.4;
    if (state.camera.position.z !== z) {
      state.camera.position.z = z;
      state.camera.updateProjectionMatrix();
    }
  });
  return null;
}

export default function ParticleField({ started }: { started: boolean }) {
  // Client-only component (dynamic import, ssr: false), so the capability
  // check can run in the state initializer.
  const [stage, setStage] = useState<"pending" | "off" | "on">(() =>
    prefersReducedMotion() || isSoftwareGL() ? "off" : "pending"
  );
  const [tabVisible, setTabVisible] = useState(true);

  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );
  const count = isMobile ? 2400 : 3200;
  const scale = isMobile ? 0.85 : 1;

  // Same gating as the old hero scene: mount the WebGL chunk late and only
  // for clients that can actually run it.
  useEffect(() => {
    if (!started) return;
    if (stage === "off") return;
    let idleId: number | undefined;
    const t = setTimeout(() => {
      const mount = () => setStage("on");
      if (window.requestIdleCallback) {
        idleId = window.requestIdleCallback(mount, { timeout: 1200 });
      } else {
        mount();
      }
    }, 1500);
    return () => {
      clearTimeout(t);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
  }, [started, stage]);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (stage !== "on") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={tabVisible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <CameraRig />
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.7}>
          <group rotation={[0.3, 0.4, 0]}>
            <Particles count={count} scale={scale} pointSize={isMobile ? 0.04 : 0.03} />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
