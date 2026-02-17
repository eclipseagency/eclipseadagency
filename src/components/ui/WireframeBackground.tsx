"use client";

import { useEffect, useRef, useCallback } from "react";

/*
 * Liquid Glass Background — Performance-Optimized
 *
 * Single canvas at ¼ resolution, 4 blobs, throttled to ~24 fps.
 * The heavy CSS blur+contrast filter is applied once on a static
 * wrapper, and the canvas is pre-blurred so the CSS filter cost
 * stays low. Layers trimmed from 8 to 5.
 */

interface LiquidBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseR: number;
  color: [number, number, number];
  phase: number;
  pulseSpeed: number;
}

export function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<LiquidBlob[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lastFrameRef = useRef(0);

  // Render at quarter resolution — the blur hides aliasing
  const SCALE = 0.25;
  // Target ~24 fps (≈42ms per frame)
  const FRAME_INTERVAL = 42;

  const initBlobs = useCallback((w: number, h: number) => {
    const s = Math.min(w, h);
    blobsRef.current = [
      { x: w * 0.2,  y: h * 0.25, vx:  0.35, vy:  0.25, r: s * 0.2,  baseR: s * 0.2,  color: [255, 107, 53],  phase: 0,   pulseSpeed: 0.008 },
      { x: w * 0.75, y: h * 0.3,  vx: -0.3,  vy:  0.35, r: s * 0.17, baseR: s * 0.17, color: [247, 147, 30],  phase: 1.5, pulseSpeed: 0.006 },
      { x: w * 0.5,  y: h * 0.7,  vx:  0.25, vy: -0.3,  r: s * 0.22, baseR: s * 0.22, color: [255, 130, 60],  phase: 3.0, pulseSpeed: 0.007 },
      { x: w * 0.85, y: h * 0.65, vx: -0.4,  vy: -0.2,  r: s * 0.14, baseR: s * 0.14, color: [255, 90,  40],  phase: 4.5, pulseSpeed: 0.009 },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.round(w * SCALE);
      canvas.height = Math.round(h * SCALE);

      sizeRef.current = { w, h };

      if (blobsRef.current.length === 0) {
        initBlobs(w, h);
      }
    }

    function updateBlobs() {
      const { w, h } = sizeRef.current;
      const blobs = blobsRef.current;
      const t = timeRef.current;

      for (const blob of blobs) {
        blob.r = blob.baseR * (1 + Math.sin(t * blob.pulseSpeed + blob.phase) * 0.18);

        blob.x += blob.vx;
        blob.y += blob.vy;

        const pad = blob.r * 0.5;
        if (blob.x < -pad)     blob.vx = Math.abs(blob.vx);
        if (blob.x > w + pad)  blob.vx = -Math.abs(blob.vx);
        if (blob.y < -pad)     blob.vy = Math.abs(blob.vy);
        if (blob.y > h + pad)  blob.vy = -Math.abs(blob.vy);

        blob.vx += Math.sin(t * 0.002 + blob.phase) * 0.004;
        blob.vy += Math.cos(t * 0.003 + blob.phase) * 0.004;

        const speed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
        if (speed > 0.55) {
          blob.vx = (blob.vx / speed) * 0.55;
          blob.vy = (blob.vy / speed) * 0.55;
        }
      }
    }

    function draw() {
      if (!ctx) return;
      const cw = canvas!.width;
      const ch = canvas!.height;
      const blobs = blobsRef.current;

      ctx.fillStyle = "rgb(10,10,10)";
      ctx.fillRect(0, 0, cw, ch);

      ctx.globalCompositeOperation = "screen";

      for (const blob of blobs) {
        const bx = blob.x * SCALE;
        const by = blob.y * SCALE;
        const br = blob.r * SCALE;

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const [r, g, b] = blob.color;

        gradient.addColorStop(0,   `rgba(${r},${g},${b},1)`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.7)`);
        gradient.addColorStop(0.7, `rgba(${r},${g},${b},0.25)`);
        gradient.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    }

    function animate(now: number) {
      rafRef.current = requestAnimationFrame(animate);

      // Throttle to ~24 fps
      if (now - lastFrameRef.current < FRAME_INTERVAL) return;
      lastFrameRef.current = now;

      timeRef.current++;
      updateBlobs();
      draw();
    }

    resize();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initBlobs, SCALE, FRAME_INTERVAL]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* ── Layer 1: Liquid metaballs ──
          CSS metaball technique: blur merges shapes, contrast snaps edges.
          Canvas at ¼ res keeps GPU load manageable. */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(30px) contrast(10)",
          mixBlendMode: "screen",
          opacity: 0.18,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
        />
      </div>

      {/* ── Layer 2: Frosted glass pane ── */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(40px) saturate(1.6)",
          WebkitBackdropFilter: "blur(40px) saturate(1.6)",
          background: "rgba(10,10,10,0.7)",
        }}
      />

      {/* ── Layer 3: Static specular + caustic highlights ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 35% at 20% 15%, rgba(255,255,255,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 25%, rgba(255,255,255,0.02) 0%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 25% 30%, rgba(255,107,53,0.015) 0%, transparent 60%),
            radial-gradient(ellipse 35% 25% at 70% 55%, rgba(247,147,30,0.012) 0%, transparent 60%)
          `,
          mixBlendMode: "screen",
        }}
      />

      {/* ── Layer 4: Glass noise texture ── */}
      <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.03 }} />

      {/* ── Layer 5: Edge vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(10,10,10,0.5) 100%)",
        }}
      />
    </div>
  );
}
