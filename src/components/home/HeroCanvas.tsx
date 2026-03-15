"use client";

import { useRef, useEffect, useMemo } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   Hero Canvas - Interactive space eclipse with mouse reactivity
   ═══════════════════════════════════════════════════════════ */
function useHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = 1;
    let animId = 0;

    // ── Resize ──
    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse ──
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / w;
      mouse.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // ── Reduce particle counts on mobile to save CPU/battery ──
    const isMobile = w < 768;
    const STAR_COUNT = isMobile ? 40 : 120;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      size: 0.3 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      brightness: 0.3 + Math.random() * 0.7,
    }));

    // ── Orbiting particles around eclipse ──
    const ORBIT_COUNT = isMobile ? 15 : 50;
    const orbitals = Array.from({ length: ORBIT_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 80 + Math.random() * 160,
      speed: (0.2 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
      size: 0.5 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.5,
      tilt: -0.3 + Math.random() * 0.6,
      eccentricity: 0.5 + Math.random() * 0.5,
    }));

    // ── Shooting stars ──
    const shooters: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];
    let nextShoot = 2000 + Math.random() * 4000;
    let shootTimer = 0;

    // ── Floating dust/particles that react to mouse ──
    const DUST_COUNT = isMobile ? 10 : 35;
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      vx: 0, vy: 0,
      size: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.25,
      hue: Math.random() > 0.6 ? 25 : 15, // orange range
    }));

    let lastTime = performance.now();

    // ── Render loop ──
    function draw(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth mouse
      mouse.current.sx += (mouse.current.x - mouse.current.sx) * 0.03;
      mouse.current.sy += (mouse.current.y - mouse.current.sy) * 0.03;
      const mx = mouse.current.sx;
      const my = mouse.current.sy;

      ctx.clearRect(0, 0, w, h);

      // ── Deep space gradient ──
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.8);
      bgGrad.addColorStop(0, "rgba(20, 8, 4, 0.4)");
      bgGrad.addColorStop(0.4, "rgba(8, 4, 12, 0.2)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Stars ──
      const t = now * 0.001;
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const alpha = s.brightness * twinkle;
        // Parallax shift with mouse
        const px = s.x * w + (mx - 0.5) * -30 * s.speed;
        const py = s.y * h + (my - 0.5) * -20 * s.speed;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 230, ${alpha})`;
        ctx.fill();
        // Glow on brighter stars
        if (s.brightness > 0.7 && s.size > 1) {
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 150, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      // ── Eclipse center position ──
      const cx = w * 0.5 + (mx - 0.5) * 20;
      const cy = h * 0.42 + (my - 0.5) * 15;
      const eclipseR = Math.min(w, h) * 0.18;

      // ── Outer glow / atmosphere ──
      for (let i = 5; i >= 1; i--) {
        const gr = eclipseR + i * eclipseR * 0.35;
        const glow = ctx.createRadialGradient(cx, cy, eclipseR * 0.9, cx, cy, gr);
        glow.addColorStop(0, `rgba(255, 107, 53, ${0.03 * (6 - i)})`);
        glow.addColorStop(0.5, `rgba(247, 147, 30, ${0.015 * (6 - i)})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Corona ring (animated) ──
      ctx.save();
      ctx.translate(cx, cy);
      const coronaSegments = 120;
      for (let i = 0; i < coronaSegments; i++) {
        const a = (i / coronaSegments) * Math.PI * 2;
        const wave = 1 + 0.15 * Math.sin(a * 8 + t * 2) + 0.08 * Math.sin(a * 13 - t * 3.5);
        const flare = 1 + 0.3 * Math.pow(Math.sin(a * 3 + t * 0.7), 4);
        const r = eclipseR * (1.05 + 0.12 * wave * flare);
        const r2 = eclipseR * (1.05 + 0.25 * wave * flare);
        const x1 = Math.cos(a) * r;
        const y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * r2;
        const y2 = Math.sin(a) * r2;
        const alpha = 0.15 + 0.25 * wave * flare;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, ${80 + Math.floor(67 * wave)}, 35, ${alpha})`;
        ctx.lineWidth = 1.5 + wave;
        ctx.stroke();
      }
      ctx.restore();

      // ── Eclipse body (dark sphere) ──
      ctx.beginPath();
      ctx.arc(cx, cy, eclipseR, 0, Math.PI * 2);
      const bodyGrad = ctx.createRadialGradient(cx - eclipseR * 0.3, cy - eclipseR * 0.3, 0, cx, cy, eclipseR);
      bodyGrad.addColorStop(0, "#0a0a0a");
      bodyGrad.addColorStop(0.7, "#050505");
      bodyGrad.addColorStop(1, "#080808");
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // ── Inner edge glow ──
      ctx.beginPath();
      ctx.arc(cx, cy, eclipseR, 0, Math.PI * 2);
      const edgeGrad = ctx.createRadialGradient(cx, cy, eclipseR * 0.85, cx, cy, eclipseR * 1.02);
      edgeGrad.addColorStop(0, "transparent");
      edgeGrad.addColorStop(0.6, "rgba(255, 107, 53, 0.04)");
      edgeGrad.addColorStop(1, "rgba(255, 107, 53, 0.12)");
      ctx.fillStyle = edgeGrad;
      ctx.fill();

      // ── Orbital rings ──
      ctx.save();
      ctx.translate(cx, cy);
      const rings = [
        { rx: eclipseR * 1.8, ry: eclipseR * 0.5, rotation: t * 0.15 + 0.3, opacity: 0.08, width: 0.8 },
        { rx: eclipseR * 2.3, ry: eclipseR * 0.45, rotation: -t * 0.1 + 1.2, opacity: 0.05, width: 0.6 },
        { rx: eclipseR * 2.9, ry: eclipseR * 0.35, rotation: t * 0.06 + 2.5, opacity: 0.03, width: 0.5 },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.rotate(ring.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 107, 53, ${ring.opacity})`;
        ctx.lineWidth = ring.width;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // ── Orbiting particles ──
      ctx.save();
      ctx.translate(cx, cy);
      for (const o of orbitals) {
        o.angle += o.speed * dt;
        const px = Math.cos(o.angle) * o.radius;
        const py = Math.sin(o.angle) * o.radius * o.eccentricity + o.tilt * o.radius * Math.sin(o.angle * 0.5);
        const dist = Math.sqrt(px * px + py * py);
        // Fade particles behind the eclipse body
        const behindEclipse = dist < eclipseR * 1.1 ? 0.1 : 1;
        ctx.beginPath();
        ctx.arc(px, py, o.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${140 + Math.floor(Math.random() * 40)}, 60, ${o.opacity * behindEclipse})`;
        ctx.fill();
      }
      ctx.restore();

      // ── Mouse-reactive dust particles ──
      for (const d of dust) {
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.2) {
          const force = (0.2 - dist) * 0.008;
          d.vx -= dx * force;
          d.vy -= dy * force;
        }
        d.vx *= 0.96;
        d.vy *= 0.96;
        d.x += d.vx;
        d.y += d.vy;
        // Wrap
        if (d.x < -0.05) d.x = 1.05;
        if (d.x > 1.05) d.x = -0.05;
        if (d.y < -0.05) d.y = 1.05;
        if (d.y > 1.05) d.y = -0.05;

        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${130 + d.hue}, 60, ${d.opacity})`;
        ctx.fill();
      }

      // ── Shooting stars ──
      shootTimer += dt * 1000;
      if (shootTimer > nextShoot) {
        shootTimer = 0;
        nextShoot = 3000 + Math.random() * 5000;
        const angle = -0.3 - Math.random() * 0.5;
        shooters.push({
          x: Math.random() * w * 0.8 + w * 0.1,
          y: Math.random() * h * 0.3,
          vx: Math.cos(angle) * (300 + Math.random() * 200),
          vy: Math.sin(angle) * (300 + Math.random() * 200) * -1,
          life: 0, maxLife: 0.4 + Math.random() * 0.4,
          size: 1 + Math.random() * 1.5,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += dt;
        if (s.life > s.maxLife) { shooters.splice(i, 1); continue; }
        s.x += s.vx * dt;
        s.y -= s.vy * dt;
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;
        // Trail
        const trailLen = 6;
        for (let j = 0; j < trailLen; j++) {
          const tt = j / trailLen;
          const tx = s.x - s.vx * dt * j * 1.5;
          const ty = s.y + s.vy * dt * j * 1.5;
          ctx.beginPath();
          ctx.arc(tx, ty, s.size * (1 - tt * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 220, 180, ${alpha * (1 - tt) * 0.6})`;
          ctx.fill();
        }
      }

      // ── Light rays from eclipse (subtle) ──
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const rayCount = 8;
      for (let i = 0; i < rayCount; i++) {
        const a = (i / rayCount) * Math.PI * 2 + t * 0.05;
        const len = eclipseR * (2.5 + 0.8 * Math.sin(t * 0.5 + i * 1.3));
        const spread = 0.04 + 0.02 * Math.sin(t + i);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a - spread) * len, cy + Math.sin(a - spread) * len);
        ctx.lineTo(cx + Math.cos(a + spread) * len, cy + Math.sin(a + spread) * len);
        ctx.closePath();
        const rayGrad = ctx.createRadialGradient(cx, cy, eclipseR, cx, cy, len);
        rayGrad.addColorStop(0, `rgba(255, 107, 53, ${0.02 + 0.01 * Math.sin(t + i)})`);
        rayGrad.addColorStop(1, "transparent");
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return canvasRef;
}

/* ═══════════════════════════════════════════════════════════
   Orbiting Solutions - Labels orbiting the eclipse
   ═══════════════════════════════════════════════════════════ */
function OrbitingSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const solutions = useMemo(() => [
    { label: "Branding", href: "/solutions/branding", color: "#ff6b35", size: 44 },
    { label: "Web & Apps", href: "/solutions/web-apps", color: "#e8621e", size: 40 },
    { label: "Marketing", href: "/solutions/digital-marketing", color: "#f7931e", size: 46 },
    { label: "Production", href: "/solutions/production", color: "#d4551a", size: 38 },
    { label: "Animation", href: "/solutions/animation", color: "#ffad66", size: 36 },
    { label: "3D Creations", href: "/solutions/3d-creations", color: "#cc4a15", size: 42 },
  ], []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-orbit-item]");
    let animId = 0;
    const startTime = performance.now();

    function animate(now: number) {
      const t = (now - startTime) * 0.001;
      items.forEach((el, i) => {
        const baseAngle = (i / items.length) * Math.PI * 2;
        const angle = baseAngle + t * 0.12; // slow rotation
        // Elliptical orbit
        const rx = Math.min(window.innerWidth * 0.32, 320);
        const ry = rx * 0.38;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        // Depth effect - items at back are smaller and dimmer
        const depth = Math.sin(angle); // -1 = back, 1 = front
        const scale = 0.55 + (depth + 1) * 0.25;
        const opacity = 0.15 + (depth + 1) * 0.35;
        const zIndex = depth > 0 ? 5 : 1;
        // Subtle wobble for floating feel
        const wobbleY = Math.sin(t * 1.5 + i * 1.2) * 4;
        el.style.transform = `translate(${x}px, ${y + wobbleY}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="hidden sm:block absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[3]">
      {solutions.map((s, i) => (
        <Link
          key={i}
          href={s.href}
          data-orbit-item
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="group/planet flex flex-col items-center gap-1.5 cursor-pointer">
            {/* Planet sphere */}
            <div
              className="relative rounded-full transition-all duration-500 group-hover/planet:scale-[1.2]"
              style={{
                width: s.size,
                height: s.size,
                background: `radial-gradient(circle at 35% 30%, ${s.color}dd, ${s.color}88 50%, ${s.color}33 80%, transparent)`,
                boxShadow: `0 0 ${s.size * 0.6}px ${s.color}40, inset -${s.size * 0.15}px -${s.size * 0.1}px ${s.size * 0.3}px rgba(0,0,0,0.5), inset ${s.size * 0.08}px ${s.size * 0.08}px ${s.size * 0.15}px rgba(255,255,255,0.15)`,
              }}
            >
              {/* Highlight/shine on planet */}
              <div
                className="absolute rounded-full"
                style={{
                  width: s.size * 0.3,
                  height: s.size * 0.25,
                  top: "18%",
                  left: "22%",
                  background: "radial-gradient(ellipse, rgba(255,255,255,0.35), transparent)",
                  filter: "blur(1px)",
                }}
              />
              {/* Hover ring */}
              <div
                className="absolute inset-[-6px] rounded-full border border-transparent transition-all duration-500 group-hover/planet:border-current opacity-0 group-hover/planet:opacity-40"
                style={{ color: s.color }}
              />
              {/* Outer glow on hover */}
              <div
                className="absolute inset-[-12px] rounded-full opacity-0 transition-opacity duration-500 group-hover/planet:opacity-100"
                style={{ background: `radial-gradient(circle, ${s.color}20, transparent 70%)` }}
              />
            </div>
            {/* Label below planet */}
            <span
              className="text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group-hover/planet:tracking-[0.2em]"
              style={{ color: `${s.color}`, textShadow: `0 0 12px ${s.color}60, 0 1px 3px rgba(0,0,0,0.8)` }}
            >
              {s.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero CTA - Primary and secondary action buttons
   ═══════════════════════════════════════════════════════════ */
function HeroCTA() {
  return (
    <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <Link
          href="/contact"
          className="group relative px-7 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#ff6b35] to-[#f7931e] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,107,53,0.4)] hover:scale-105"
        >
          Book a Consultation
        </Link>
        <Link
          href="/portfolio"
          className="px-7 py-3 rounded-full text-sm font-medium text-white/50 border border-white/15 transition-all duration-300 hover:border-[#ff6b35]/30 hover:text-white/70"
        >
          View Our Work
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Hero
   ═══════════════════════════════════════════════════════════ */
export function HeroSection() {
  const canvasRef = useHeroCanvas();

  return (
    <section id="hero" data-hero className="relative h-[100svh] overflow-hidden bg-[#050508]">
      {/* ── Animated canvas background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* ── Orbiting solutions around the eclipse ── */}
      <OrbitingSolutions />

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 200px 80px rgba(5,5,8,0.8)",
      }} />

      {/* ── Title centered inside the eclipse sphere ── */}
      <div data-hero-content className="absolute inset-0 z-10 pointer-events-none" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div data-hero-text className="text-center" style={{ marginTop: "-10vh" }}>
          <p className="text-white/60 text-[clamp(0.6rem,1.2vw,0.85rem)] font-semibold uppercase tracking-[0.4em] mb-3">Eclipse Agency</p>
          <h1 className="font-heading text-[clamp(1.4rem,3.5vw,2.8rem)] font-bold leading-[1.15] tracking-tight">
            <span className="text-white">From Shadow</span>
            <br />
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
              to Spotlight
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-[280px] text-[10px] leading-relaxed text-white/40 md:text-xs">
            Marketing Built on Strategy,<br />Driven by Creativity.
          </p>
        </div>
      </div>

      {/* ── CTA buttons ── */}
      <HeroCTA />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
