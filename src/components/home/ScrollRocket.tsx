"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   Scroll Rocket - Canvas rocket that flies naturally between sections
   Reveals content as it swoops through, with fire trail + smoke
   ═══════════════════════════════════════════════════════════ */
export function ScrollRocket({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useRef(0);
  const visibleRef = useRef(false);
  // Sync ref on every render - this runs synchronously during render
  if (visible) visibleRef.current = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = 1;
    let animId = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    let prevProgress = 0;
    let isScrolling = false;
    let scrollTimeout = 0;
    let scrollDir: "down" | "up" = "down";
    let hasInitialized = false;

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) {
        scrollProgress.current = Math.min(Math.max(window.scrollY / docH, 0), 1);
      } else {
        scrollProgress.current = 0;
      }
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => { isScrolling = false; }, 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── Trail particles ──
    const trail: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; type: "fire" | "smoke" }[] = [];

    // ── Rocket path - natural flight weaving between sections ──
    // Uses cubic bezier interpolation for smooth, organic curves
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function ease(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    // Waypoints the rocket flies through (normalized x,y in viewport)
    // Each: [scrollT, x%, y%, rotation hint]
    // Descending path (scrolling down)
    const waypointsDown = [
      [0.001, 0.50, 0.26],  // start: above eclipse text
      [0.01, 0.55, 0.20],   // rise up-right immediately
      [0.07, 0.70, 0.15],   // arc toward top-right
      [0.12, 0.85, 0.30],  // swoop right
      [0.18, 0.75, 0.60],  // dive down toward About section
      [0.25, 0.55, 0.75],  // sweep across center-bottom
      [0.32, 0.25, 0.55],  // curve up to the left
      [0.39, 0.15, 0.30],  // rise up-left (Services area)
      [0.46, 0.30, 0.15],  // arc across top
      [0.53, 0.60, 0.20],  // glide right (Portfolio area)
      [0.60, 0.80, 0.45],  // dive right-center
      [0.67, 0.70, 0.70],  // swoop down
      [0.74, 0.40, 0.80],  // sweep left-bottom (Process)
      [0.80, 0.20, 0.60],  // curve up-left
      [0.86, 0.30, 0.35],  // rise (Testimonials)
      [0.92, 0.50, 0.20],  // center top
      [0.97, 0.50, -0.30], // blast off to space!
    ];

    // Ascending path (scrolling up) - y INCREASES with t so that
    // when t decreases (scroll up), the rocket consistently moves UPWARD.
    // Gentle horizontal weaving for visual interest.
    const waypointsUp = [
      [0.001, 0.50, 0.26],  // park position (top of page)
      [0.01, 0.45, 0.28],
      [0.07, 0.35, 0.32],
      [0.12, 0.25, 0.38],
      [0.18, 0.30, 0.44],
      [0.25, 0.40, 0.50],
      [0.32, 0.55, 0.56],
      [0.39, 0.65, 0.62],
      [0.46, 0.70, 0.68],
      [0.53, 0.60, 0.73],
      [0.60, 0.45, 0.78],
      [0.67, 0.30, 0.82],
      [0.74, 0.35, 0.86],
      [0.80, 0.50, 0.90],
      [0.86, 0.60, 0.94],
      [0.92, 0.55, 0.98],
      [0.97, 0.50, 1.10],  // off-screen bottom
    ];

    // Active waypoints - switches based on scroll direction
    let activeWaypoints = waypointsDown;

    function getRocketPos(t: number): { x: number; y: number; angle: number } {
      const wps = activeWaypoints;
      if (t < wps[0][0]) {
        return { x: w * 0.5, y: h * 0.26, angle: -Math.PI / 2 };
      }
      if (t >= wps[wps.length - 1][0]) {
        const last = wps[wps.length - 1];
        return { x: w * last[1], y: h * last[2], angle: -Math.PI / 2 };
      }

      // Find segment
      let seg = 0;
      for (let i = 0; i < wps.length - 1; i++) {
        if (t >= wps[i][0] && t < wps[i + 1][0]) { seg = i; break; }
      }

      const wp0 = wps[Math.max(0, seg - 1)];
      const wp1 = wps[seg];
      const wp2 = wps[seg + 1];
      const wp3 = wps[Math.min(wps.length - 1, seg + 2)];

      const segT = (t - wp1[0]) / (wp2[0] - wp1[0]);
      const p = ease(segT);

      // Catmull-Rom spline for smooth curves through waypoints
      function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
        return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
      }

      const x = catmull(wp0[1], wp1[1], wp2[1], wp3[1], p) * w;
      const y = catmull(wp0[2], wp1[2], wp2[2], wp3[2], p) * h;

      // Calculate angle from nearby points
      const dp = 0.002;
      const p2t = Math.min(1, p + dp);
      const nx = catmull(wp0[1], wp1[1], wp2[1], wp3[1], p2t) * w;
      const ny = catmull(wp0[2], wp1[2], wp2[2], wp3[2], p2t) * h;
      const angle = Math.atan2(ny - y, nx - x);

      return { x, y, angle };
    }

    // ── Draw rocket shape ──
    function drawRocket(x: number, y: number, angle: number, scale: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2); // nose points in direction of travel
      const s = scale;

      // ── Rocket body ──
      ctx.beginPath();
      ctx.moveTo(0, -22 * s);        // nose
      ctx.quadraticCurveTo(8 * s, -14 * s, 8 * s, 5 * s);   // right side
      ctx.lineTo(14 * s, 18 * s);    // right fin
      ctx.lineTo(5 * s, 12 * s);     // fin join right
      ctx.lineTo(-5 * s, 12 * s);    // fin join left
      ctx.lineTo(-14 * s, 18 * s);   // left fin
      ctx.lineTo(-8 * s, 5 * s);     // left side
      ctx.quadraticCurveTo(-8 * s, -14 * s, 0, -22 * s);
      ctx.closePath();

      // Body gradient
      const bodyGrad = ctx.createLinearGradient(-8 * s, 0, 8 * s, 0);
      bodyGrad.addColorStop(0, "#d4d4d4");
      bodyGrad.addColorStop(0.3, "#ffffff");
      bodyGrad.addColorStop(0.7, "#e8e8e8");
      bodyGrad.addColorStop(1, "#b0b0b0");
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Nose cone ──
      ctx.beginPath();
      ctx.moveTo(0, -22 * s);
      ctx.quadraticCurveTo(6 * s, -16 * s, 6 * s, -8 * s);
      ctx.lineTo(-6 * s, -8 * s);
      ctx.quadraticCurveTo(-6 * s, -16 * s, 0, -22 * s);
      ctx.fillStyle = "#ff6b35";
      ctx.fill();

      // ── Window ──
      ctx.beginPath();
      ctx.arc(0, -4 * s, 3 * s, 0, Math.PI * 2);
      ctx.fillStyle = "#1a3a5c";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-0.8 * s, -4.8 * s, 1.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150,200,255,0.4)";
      ctx.fill();

      // ── Fins accent ──
      ctx.beginPath();
      ctx.moveTo(14 * s, 18 * s);
      ctx.lineTo(5 * s, 12 * s);
      ctx.lineTo(7 * s, 5 * s);
      ctx.fillStyle = "#ff6b35";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-14 * s, 18 * s);
      ctx.lineTo(-5 * s, 12 * s);
      ctx.lineTo(-7 * s, 5 * s);
      ctx.fillStyle = "#ff6b35";
      ctx.fill();

      // ── Eclipse logo "E" on body ──
      ctx.fillStyle = "rgba(255, 107, 53, 0.6)";
      ctx.font = `bold ${8 * s}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("E", 0, 4 * s);

      ctx.restore();
    }

    let lastTime = performance.now();

    function draw(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, w, h);

      // Don't render until preloader is done
      if (!visibleRef.current) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Recalculate scroll on first visible frame to avoid stale values
      if (!hasInitialized) {
        hasInitialized = true;
        onScroll();
      }

      const t = scrollProgress.current;

      // ── Detect scroll direction from progress delta ──
      const rawDelta = t - prevProgress;
      const scrollDelta = Math.abs(rawDelta);
      if (scrollDelta > 0.0001) {
        scrollDir = rawDelta > 0 ? "down" : "up";
      }
      prevProgress = t;
      const moving = isScrolling && scrollDelta > 0.0001;

      // Switch path based on scroll direction
      activeWaypoints = scrollDir === "up" ? waypointsUp : waypointsDown;

      const pos = getRocketPos(t);
      const x = pos.x, y = pos.y;
      // Flip angle when scrolling up so rocket nose faces direction of travel
      const angle = scrollDir === "up" ? pos.angle + Math.PI : pos.angle;
      const visible = y > -80 && y < h + 80 && x > -80 && x < w + 80;

      if (visible && t > 0.002 && moving) {
        const thrustX = -Math.cos(angle) * 2;
        const thrustY = -Math.sin(angle) * 2;
        // Fire particles
        for (let i = 0; i < 3; i++) {
          trail.push({
            x: x + thrustX * 12 + (Math.random() - 0.5) * 6,
            y: y + thrustY * 12 + (Math.random() - 0.5) * 6,
            vx: thrustX * (80 + Math.random() * 60) + (Math.random() - 0.5) * 30,
            vy: thrustY * (80 + Math.random() * 60) + (Math.random() - 0.5) * 30,
            life: 0, maxLife: 0.3 + Math.random() * 0.4,
            size: 2 + Math.random() * 4,
            type: "fire",
          });
        }
        // Smoke particles (less frequent)
        if (Math.random() > 0.5) {
          trail.push({
            x: x + thrustX * 16 + (Math.random() - 0.5) * 10,
            y: y + thrustY * 16 + (Math.random() - 0.5) * 10,
            vx: thrustX * (30 + Math.random() * 20) + (Math.random() - 0.5) * 15,
            vy: thrustY * (30 + Math.random() * 20) + (Math.random() - 0.5) * 15,
            life: 0, maxLife: 0.8 + Math.random() * 0.8,
            size: 4 + Math.random() * 8,
            type: "smoke",
          });
        }
      }

      // ── Update and draw trail ──
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life += dt;
        if (p.life > p.maxLife) { trail.splice(i, 1); continue; }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.type === "smoke") { p.size += dt * 12; }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : Math.max(0, 1 - (progress - 0.1) / 0.9);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);

        if (p.type === "fire") {
          const r = 255;
          const g = Math.floor(80 + (180 - 80) * progress);
          const b = Math.floor(20 + progress * 40);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`;
          // Inner glow
          ctx.shadowColor = `rgba(255, 107, 53, ${alpha * 0.5})`;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(180, 160, 140, ${alpha * 0.15})`;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Engine glow (only while moving) ──
      if (visible && t > 0.002 && moving) {
        const glowX = x + -Math.cos(angle) * 18;
        const glowY = y + -Math.sin(angle) * 18;
        const engineGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 35);
        engineGlow.addColorStop(0, "rgba(255, 160, 50, 0.6)");
        engineGlow.addColorStop(0.3, "rgba(255, 107, 53, 0.3)");
        engineGlow.addColorStop(1, "transparent");
        ctx.fillStyle = engineGlow;
        ctx.fillRect(glowX - 40, glowY - 40, 80, 80);
      }

      // ── Draw rocket ──
      if (visible) {
        const rocketScale = w < 640 ? 0.9 : 1.3;
        drawRocket(x, y, angle, rocketScale);
      }

      // Limit trail array
      if (trail.length > 300) trail.splice(0, trail.length - 300);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[50]"
    />
  );
}
