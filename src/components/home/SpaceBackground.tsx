"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   Space Background - Full-page fixed starfield with parallax
   Creates a continuous space journey feel while scrolling
   ═══════════════════════════════════════════════════════════ */
export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Three parallax star layers - far (slow), mid, near (fast)
    const mobile = w < 768;
    let frameSkip = 0;
    const farStars = Array.from({ length: mobile ? 35 : 100 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.3 + Math.random() * 0.8,
      brightness: 0.12 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
    const midStars = Array.from({ length: mobile ? 20 : 60 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.5 + Math.random() * 1.2,
      brightness: 0.15 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
    const nearStars = Array.from({ length: mobile ? 8 : 25 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.8 + Math.random() * 1.5,
      brightness: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));

    // Subtle nebula wisps - very faint color patches
    const nebulae = [
      { x: 0.2, y: 0.25, rx: 250, ry: 150, color: "rgba(180,80,20,0.015)", parallax: 0.05 },
      { x: 0.75, y: 0.55, rx: 300, ry: 180, color: "rgba(255,80,30,0.012)", parallax: 0.08 },
      { x: 0.5, y: 0.8, rx: 200, ry: 130, color: "rgba(200,100,30,0.01)", parallax: 0.06 },
    ];

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let paused = false;
    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(animId);
      } else {
        paused = false;
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Only redraw when scroll position actually changes
    let lastScrollY = -1;
    let lastDrawTime = 0;

    function draw(now: number) {
      // Throttle: max 30fps on all devices, skip if scroll hasn't changed
      if (now - lastDrawTime < 33) {
        animId = requestAnimationFrame(draw);
        return;
      }
      // Skip redraw if scroll hasn't changed (static = no work)
      if (scrollY === lastScrollY && now - lastDrawTime < 200) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastScrollY = scrollY;
      lastDrawTime = now;
      ctx.clearRect(0, 0, w, h);
      const t = now * 0.001;
      const docH = Math.max(1, document.documentElement.scrollHeight - h);
      const scrollFrac = scrollY / docH;

      // ── Nebula wisps (parallax shifted) ──
      for (const n of nebulae) {
        const ny = (n.y - scrollFrac * n.parallax * 3) * h;
        const grad = ctx.createRadialGradient(n.x * w, ny, 0, n.x * w, ny, n.rx);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Far stars (slowest parallax) ──
      for (const s of farStars) {
        const sy = ((s.y - scrollFrac * 0.03) % 1.0 + 1.0) % 1.0;
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.4 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x * w, sy * h, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,235,${s.brightness * twinkle})`;
        ctx.fill();
      }

      // ── Mid stars ──
      for (const s of midStars) {
        const sy = ((s.y - scrollFrac * 0.08) % 1.0 + 1.0) % 1.0;
        const twinkle = 0.6 + 0.4 * Math.sin(t * 0.7 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x * w, sy * h, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,240,${s.brightness * twinkle})`;
        ctx.fill();
        // Subtle glow on brighter ones
        if (s.brightness > 0.3) {
          ctx.beginPath();
          ctx.arc(s.x * w, sy * h, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,220,180,${s.brightness * twinkle * 0.06})`;
          ctx.fill();
        }
      }

      // ── Near stars (fastest parallax) ──
      for (const s of nearStars) {
        const sy = ((s.y - scrollFrac * 0.15) % 1.0 + 1.0) % 1.0;
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.2 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x * w, sy * h, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,250,245,${s.brightness * twinkle})`;
        ctx.fill();
        // Soft glow
        ctx.beginPath();
        ctx.arc(s.x * w, sy * h, s.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,150,${s.brightness * twinkle * 0.04})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ willChange: "transform" }}
    />
  );
}
