"use client";

import { useEffect, useRef } from "react";

export function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Blob configuration - large, soft gradient orbs
    const blobs = [
      { x: 0.15, y: 0.2, r: 0.35, color: "255,107,53", speed: 0.0003, phase: 0, opacity: 0.12 },
      { x: 0.75, y: 0.15, r: 0.3, color: "247,147,30", speed: 0.00025, phase: 2, opacity: 0.08 },
      { x: 0.5, y: 0.7, r: 0.4, color: "255,107,53", speed: 0.00035, phase: 4, opacity: 0.1 },
      { x: 0.85, y: 0.6, r: 0.28, color: "255,140,60", speed: 0.0002, phase: 1, opacity: 0.07 },
      { x: 0.3, y: 0.85, r: 0.32, color: "247,147,30", speed: 0.0003, phase: 3, opacity: 0.09 },
      { x: 0.1, y: 0.55, r: 0.25, color: "255,80,40", speed: 0.00028, phase: 5, opacity: 0.06 },
    ];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw each blob
      for (const blob of blobs) {
        const bx = (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.08) * w;
        const by = (blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.06) * h;
        const br = blob.r * Math.max(w, h);

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        gradient.addColorStop(0, `rgba(${blob.color},${blob.opacity})`);
        gradient.addColorStop(0.5, `rgba(${blob.color},${blob.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      time++;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Animated gradient blobs */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ filter: "blur(80px)" }}
      />

      {/* Frosted glass overlay */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(100px) saturate(1.5)",
          WebkitBackdropFilter: "blur(100px) saturate(1.5)",
          background: "rgba(10,10,10,0.75)",
        }}
      />

      {/* Subtle noise texture */}
      <div className="page-hero-noise absolute inset-0" />

      {/* Fine dot grid pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
    </div>
  );
}
