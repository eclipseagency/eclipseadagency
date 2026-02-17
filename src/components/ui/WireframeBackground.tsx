"use client";

import { useEffect, useRef, useCallback } from "react";

/*
 * Liquid Glass Background
 *
 * Uses the CSS metaball technique: canvas blobs rendered inside a parent
 * with filter: blur() contrast(). The blur makes nearby blobs merge,
 * and the contrast snaps edges back — creating organic liquid shapes.
 * Layered with frosted glass, specular highlights, caustics, and noise.
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
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<LiquidBlob[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initBlobs = useCallback((w: number, h: number) => {
    const s = Math.min(w, h);
    blobsRef.current = [
      { x: w * 0.2,  y: h * 0.25, vx:  0.35, vy:  0.25, r: s * 0.18, baseR: s * 0.18, color: [255, 107, 53],  phase: 0,   pulseSpeed: 0.008 },
      { x: w * 0.75, y: h * 0.3,  vx: -0.3,  vy:  0.35, r: s * 0.15, baseR: s * 0.15, color: [247, 147, 30],  phase: 1.5, pulseSpeed: 0.006 },
      { x: w * 0.5,  y: h * 0.7,  vx:  0.25, vy: -0.3,  r: s * 0.2,  baseR: s * 0.2,  color: [255, 130, 60],  phase: 3.0, pulseSpeed: 0.007 },
      { x: w * 0.85, y: h * 0.65, vx: -0.4,  vy: -0.2,  r: s * 0.12, baseR: s * 0.12, color: [255, 90,  40],  phase: 4.5, pulseSpeed: 0.009 },
      { x: w * 0.15, y: h * 0.8,  vx:  0.3,  vy: -0.25, r: s * 0.13, baseR: s * 0.13, color: [255, 160, 50],  phase: 2.2, pulseSpeed: 0.005 },
      { x: w * 0.4,  y: h * 0.15, vx: -0.2,  vy:  0.4,  r: s * 0.09, baseR: s * 0.09, color: [255, 107, 53],  phase: 5.5, pulseSpeed: 0.011 },
      { x: w * 0.65, y: h * 0.85, vx:  0.35, vy: -0.15, r: s * 0.1,  baseR: s * 0.1,  color: [247, 130, 35],  phase: 0.8, pulseSpeed: 0.01  },
      { x: w * 0.9,  y: h * 0.1,  vx: -0.25, vy:  0.3,  r: s * 0.08, baseR: s * 0.08, color: [255, 140, 60],  phase: 3.8, pulseSpeed: 0.012 },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    if (!canvas || !glowCanvas) return;
    const ctx = canvas.getContext("2d");
    const glowCtx = glowCanvas.getContext("2d");
    if (!ctx || !glowCtx) return;

    function resize() {
      if (!canvas || !glowCanvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Main canvas at reduced resolution for performance
      canvas.width = w;
      canvas.height = h;

      // Glow canvas — lower res for the soft halo
      glowCanvas.width = Math.round(w * 0.5);
      glowCanvas.height = Math.round(h * 0.5);

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
        // Organic pulsing radius
        blob.r = blob.baseR * (1 + Math.sin(t * blob.pulseSpeed + blob.phase) * 0.18);

        // Move
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Soft bounce with padding
        const pad = blob.r * 0.5;
        if (blob.x < -pad)     blob.vx = Math.abs(blob.vx);
        if (blob.x > w + pad)  blob.vx = -Math.abs(blob.vx);
        if (blob.y < -pad)     blob.vy = Math.abs(blob.vy);
        if (blob.y > h + pad)  blob.vy = -Math.abs(blob.vy);

        // Organic drift
        blob.vx += Math.sin(t * 0.002 + blob.phase) * 0.004;
        blob.vy += Math.cos(t * 0.003 + blob.phase) * 0.004;

        // Clamp speed
        const speed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
        if (speed > 0.55) {
          blob.vx = (blob.vx / speed) * 0.55;
          blob.vy = (blob.vy / speed) * 0.55;
        }
      }
    }

    function drawBlobs(targetCtx: CanvasRenderingContext2D, w: number, h: number, scale: number) {
      const blobs = blobsRef.current;
      targetCtx.clearRect(0, 0, w, h);

      // Black background for the contrast() metaball trick
      targetCtx.fillStyle = "rgb(10,10,10)";
      targetCtx.fillRect(0, 0, w, h);

      targetCtx.globalCompositeOperation = "screen";

      for (const blob of blobs) {
        const bx = blob.x * scale;
        const by = blob.y * scale;
        const br = blob.r * scale;

        const gradient = targetCtx.createRadialGradient(bx, by, 0, bx, by, br);
        const [r, g, b] = blob.color;

        gradient.addColorStop(0,   `rgba(${r},${g},${b},1)`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},0.7)`);
        gradient.addColorStop(0.7, `rgba(${r},${g},${b},0.25)`);
        gradient.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        targetCtx.fillStyle = gradient;
        targetCtx.beginPath();
        targetCtx.arc(bx, by, br, 0, Math.PI * 2);
        targetCtx.fill();
      }

      targetCtx.globalCompositeOperation = "source-over";
    }

    function animate() {
      if (!ctx || !glowCtx) return;
      timeRef.current++;
      updateBlobs();

      const { w, h } = sizeRef.current;

      // Main canvas — sharp metaballs (blur + contrast applied via CSS)
      drawBlobs(ctx, w, h, 1);

      // Glow canvas — soft halo at half resolution
      drawBlobs(glowCtx, Math.round(w * 0.5), Math.round(h * 0.5), 0.5);

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initBlobs]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* ── Layer 1: Deep glow halo ── */}
      <canvas
        ref={glowCanvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          filter: "blur(60px)",
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      />

      {/* ── Layer 2: Liquid metaballs ──
          The CSS metaball technique: blur merges the shapes,
          contrast snaps the edges back into organic liquid forms */}
      <div
        className="absolute inset-0"
        style={{
          filter: "blur(40px) contrast(12)",
          mixBlendMode: "screen",
          opacity: 0.2,
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
        />
      </div>

      {/* ── Layer 3: Frosted glass pane ── */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(80px) saturate(1.8) brightness(0.9)",
          WebkitBackdropFilter: "blur(80px) saturate(1.8) brightness(0.9)",
          background: "rgba(10,10,10,0.65)",
        }}
      />

      {/* ── Layer 4: Glass specular highlights ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 35% at 20% 15%, rgba(255,255,255,0.035) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 25%, rgba(255,255,255,0.025) 0%, transparent 70%),
            radial-gradient(ellipse 60% 25% at 50% 85%, rgba(255,107,53,0.02) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Layer 5: Animated caustic light ripples ── */}
      <div className="liquid-caustics absolute inset-0" />

      {/* ── Layer 6: Glass noise texture ── */}
      <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.035 }} />

      {/* ── Layer 7: Fine dot grid ── */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.018]" aria-hidden="true">
        <defs>
          <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.4" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* ── Layer 8: Edge vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 35%, rgba(10,10,10,0.5) 100%)",
        }}
      />
    </div>
  );
}
