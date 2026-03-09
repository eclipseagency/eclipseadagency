"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ── Shared pointer (zero re-renders) ── */
const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

function Pointer() {
  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useFrame(() => {
    pointer.sx += (pointer.x - pointer.sx) * 0.04;
    pointer.sy += (pointer.y - pointer.sy) * 0.04;
  });
  return null;
}

/* ── Camera parallax ── */
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.sx * 0.5 - camera.position.x) * 0.015;
    camera.position.y += (pointer.sy * 0.3 + 0.15 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Eclipse Orb with GLSL corona ── */
function EclipseOrb() {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  const coronaMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#ff6b35") },
          uColor2: { value: new THREE.Color("#f7931e") },
          uIntensity: { value: 1 },
        },
        vertexShader: `
          varying vec3 vNormal; varying vec3 vViewPos; varying vec2 vUv;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vViewPos = mv.xyz;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform float uTime, uIntensity;
          uniform vec3 uColor1, uColor2;
          varying vec3 vNormal, vViewPos; varying vec2 vUv;
          void main() {
            vec3 view = normalize(-vViewPos);
            float f = 1.0 - dot(view, vNormal);
            float c1 = pow(f, 2.0), c2 = pow(f, 4.0), c3 = pow(f, 8.0);
            float flicker = 0.9 + 0.1 * sin(uTime * 1.2 + vUv.x * 30.0);
            float wave = 0.04 * sin(vUv.y * 40.0 + uTime * 3.0);
            vec3 col = mix(uColor2, uColor1, c2) * (c1 * 1.5 + c3 * 3.0) * flicker;
            col += uColor1 * wave * c1;
            col *= uIntensity;
            float a = (c1 * 0.6 + c2 * 0.3 + c3 * 0.8) * flicker;
            gl_FragColor = vec4(col, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += (pointer.sx * 0.4 - groupRef.current.rotation.y) * 0.015;
      groupRef.current.rotation.x += (-pointer.sy * 0.25 - groupRef.current.rotation.x) * 0.015;
    }
    coronaMat.uniforms.uTime.value = t;
    coronaMat.uniforms.uIntensity.value = 1 + Math.sqrt(pointer.sx ** 2 + pointer.sy ** 2) * 0.5;
    if (outerRef.current) outerRef.current.scale.setScalar(1.35 + Math.sin(t * 0.5) * 0.06);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#060606" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh material={coronaMat}>
        <sphereGeometry args={[1.02, 64, 64]} />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.035} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#ff6b35" intensity={3} distance={10} decay={2} />
      <pointLight color="#f7931e" intensity={1.5} distance={6} decay={2} position={[0, 0, 1.5]} />
    </group>
  );
}

/* ── Interactive Particles ── */
function ParticleField({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { geometry, material, originals, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 5.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1.5;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      orig[i * 3] = x; orig[i * 3 + 1] = y; orig[i * 3 + 2] = z;
      sz[i] = 1.0 + Math.random() * 3.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uPixelRatio: { value: dpr } },
      vertexShader: `
        attribute float aSize; varying float vDist; uniform float uPixelRatio;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aSize * uPixelRatio * (100.0 / -mv.z), 1.0, 40.0);
          vDist = -mv.z;
        }
      `,
      fragmentShader: `
        varying float vDist;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, d) * 0.55 * smoothstep(12.0, 3.0, vDist);
          vec3 col = mix(vec3(1.0, 0.42, 0.13), vec3(1.0, 0.75, 0.35), d * 1.8);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return { geometry: geo, material: mat, originals: orig, velocities: vel };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const pos = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const t = clock.elapsedTime;
    const mx = pointer.sx * 3.5, my = pointer.sy * 2.5;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const drift = Math.sin(t * 0.15 + i * 0.04) * 0.002;
      const dx = pos[i3] - mx, dy = pos[i3 + 1] - my, dz = pos[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 3.0) {
        const f = ((3.0 - dist) / 3.0) * 0.06;
        velocities[i3] += (dx / (dist || 1)) * f;
        velocities[i3 + 1] += (dy / (dist || 1)) * f;
        velocities[i3 + 2] += (dz / (dist || 1)) * f * 0.3;
      }
      velocities[i3] += (originals[i3] - pos[i3]) * 0.006 + drift;
      velocities[i3 + 1] += (originals[i3 + 1] - pos[i3 + 1]) * 0.006 + drift;
      velocities[i3 + 2] += (originals[i3 + 2] - pos[i3 + 2]) * 0.006;
      velocities[i3] *= 0.955; velocities[i3 + 1] *= 0.955; velocities[i3 + 2] *= 0.955;
      pos[i3] += velocities[i3]; pos[i3 + 1] += velocities[i3 + 1]; pos[i3 + 2] += velocities[i3 + 2];
    }
    (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/* ── Orbital Rings ── */
function OrbitalRings() {
  const ringsRef = useRef<(THREE.Mesh | null)[]>([]);
  const configs = useMemo(() => [
    { r: 1.8, tube: 0.004, tilt: [Math.PI / 3, 0, 0], speed: 0.12, opacity: 0.12 },
    { r: 2.3, tube: 0.003, tilt: [-Math.PI / 4, Math.PI / 6, 0], speed: -0.08, opacity: 0.07 },
    { r: 3.0, tube: 0.003, tilt: [0, Math.PI / 5, Math.PI / 8], speed: 0.05, opacity: 0.04 },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ringsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const c = configs[i];
      mesh.rotation.x = c.tilt[0] + pointer.sy * 0.1;
      mesh.rotation.y = c.tilt[1] + pointer.sx * 0.12;
      mesh.rotation.z = c.tilt[2] + t * c.speed;
    });
  });

  return (
    <>
      {configs.map((c, i) => (
        <mesh key={i} ref={(el) => { ringsRef.current[i] = el; }}>
          <torusGeometry args={[c.r, c.tube, 16, 128]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={c.opacity} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

/* ── Main Canvas ── */
export default function EclipseScene() {
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0 z-[1]" style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease-in" }}>
      <Canvas
        camera={{ position: [0, 0.15, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
        onCreated={() => setTimeout(() => setReady(true), 100)}
      >
        <Pointer />
        <CameraRig />
        <ambientLight intensity={0.08} />
        <EclipseOrb />
        <OrbitalRings />
        <ParticleField count={1200} />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
