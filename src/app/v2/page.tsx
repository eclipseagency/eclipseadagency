"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  siteConfig,
  servicesOverview,
  processSteps,
  portfolioItems,
  testimonials,
  aboutContent,
} from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   Smooth Scroll (Lenis)
   ═══════════════════════════════════════════════════════════ */
function useSmoothScroll() {
  useEffect(() => {
    let lenis: InstanceType<typeof import("@studio-freight/lenis").default> | undefined;
    let tickerCb: ((time: number) => void) | undefined;

    async function init() {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

      lenis.on("scroll", ScrollTrigger.update);
      tickerCb = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    init();
    return () => {
      if (lenis) lenis.destroy();
      if (tickerCb) gsap.ticker.remove(tickerCb);
    };
  }, []);
}


/* ═══════════════════════════════════════════════════════════
   GSAP Scroll Animations Hook
   ═══════════════════════════════════════════════════════════ */
function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text reveals ──
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)",
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });

      // ── Fade ups ──
      document.querySelectorAll("[data-fade]").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, delay: Number((el as HTMLElement).dataset.fade) || i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ── Parallax elements ──
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number((el as HTMLElement).dataset.parallax) || 50;
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // ── Horizontal scroll for portfolio ──
      const hScroll = document.querySelector("[data-h-scroll]");
      const hTrack = document.querySelector("[data-h-track]");
      if (hScroll && hTrack) {
        const totalWidth = (hTrack as HTMLElement).scrollWidth - window.innerWidth;
        gsap.to(hTrack, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: hScroll,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
          },
        });
      }

      // ── Scale-in hero text ──
      const heroText = document.querySelector("[data-hero-text]");
      if (heroText) {
        gsap.fromTo(heroText,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out", delay: 0.3 }
        );
      }

      // ── Hero scroll zoom ──
      const heroSection = document.querySelector("[data-hero]");
      if (heroSection) {
        gsap.to("[data-hero-content]", {
          y: -100, opacity: 0, scale: 0.95,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // ── Rocket reveal: About section sweeps in from right with expanding circle ──
      const revealSection = document.querySelector("[data-rocket-reveal]");
      if (revealSection) {
        gsap.fromTo(revealSection,
          { clipPath: "circle(0% at 80% 30%)", opacity: 0 },
          {
            clipPath: "circle(150% at 80% 30%)", opacity: 1,
            duration: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: revealSection,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }

      // ── Line draw on scroll ──
      document.querySelectorAll("[data-line]").forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.2, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

/* ═══════════════════════════════════════════════════════════
   Magnetic Button
   ═══════════════════════════════════════════════════════════ */
function MagneticLink({
  href, children, className = "", cursor = "",
}: {
  href: string; children: React.ReactNode; className?: string; cursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <Link
      ref={ref} href={href}
      data-cursor={cursor}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero Canvas — Interactive space eclipse with mouse reactivity
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

    // ── Stars ──
    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      size: 0.3 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      brightness: 0.3 + Math.random() * 0.7,
    }));

    // ── Orbiting particles around eclipse ──
    const ORBIT_COUNT = 80;
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
    const DUST_COUNT = 60;
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
   Orbiting Solutions — Labels orbiting the eclipse
   ═══════════════════════════════════════════════════════════ */
function OrbitingSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const solutions = useMemo(() => [
    { label: "Branding", icon: "◆", href: "/solutions/branding" },
    { label: "Web & Apps", icon: "⬡", href: "/solutions/web-apps" },
    { label: "Marketing", icon: "◈", href: "/solutions/digital-marketing" },
    { label: "Production", icon: "◉", href: "/solutions/production" },
    { label: "Animation", icon: "▲", href: "/solutions/animation" },
    { label: "3D Creations", icon: "✦", href: "/solutions/3d-creations" },
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
        const angle = baseAngle + t * 0.15; // slow rotation
        // Elliptical orbit
        const rx = Math.min(window.innerWidth * 0.32, 320);
        const ry = rx * 0.35;
        const x = Math.cos(angle) * rx;
        const y = Math.sin(angle) * ry;
        // Depth effect — items at back are smaller and dimmer
        const depth = Math.sin(angle); // -1 = back, 1 = front
        const scale = 0.65 + (depth + 1) * 0.2;
        const opacity = 0.2 + (depth + 1) * 0.3;
        const zIndex = depth > 0 ? 5 : 1;
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={containerRef} className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-[3]">
      {solutions.map((s, i) => (
        <Link
          key={i}
          href={s.href}
          data-orbit-item
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[rgba(10,10,10,0.6)] px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6b35]/30 hover:bg-[rgba(255,107,53,0.08)]">
            <span className="text-[#ff6b35] text-xs">{s.icon}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{s.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Hero
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const canvasRef = useHeroCanvas();

  return (
    <section data-hero className="relative h-[120vh] overflow-hidden bg-[#050508]">
      {/* ── Animated canvas background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      />

      {/* ── Orbiting solutions around the eclipse ── */}
      <OrbitingSolutions />

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 200px 80px rgba(5,5,8,0.8)",
      }} />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-[2]" />

      {/* ── Title centered inside the eclipse ── */}
      <div data-hero-content className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ top: "-8%" }}>
        <div data-hero-text className="text-center">
          <h1 className="font-heading text-[clamp(1rem,2.5vw,2rem)] font-bold leading-[1.1] tracking-tight">
            <span className="block text-white/80 text-[clamp(0.6rem,1.2vw,0.85rem)] font-semibold uppercase tracking-[0.35em] mb-2">Eclipse Agency</span>
            <span className="text-white">From Shadow</span>
            <br />
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
              to Spotlight
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-[10px] leading-relaxed text-white/25 md:text-xs">
            Marketing Built on Strategy, Driven by Creativity.
          </p>
        </div>
      </div>
    </section>
  );
}
/* ═══════════════════════════════════════════════════════════
   Scroll Rocket — Canvas rocket that flies naturally between sections
   Reveals content as it swoops through, with fire trail + smoke
   ═══════════════════════════════════════════════════════════ */
function ScrollRocket() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useRef(0);

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

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(window.scrollY / docH, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── Trail particles ──
    const trail: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; type: "fire" | "smoke" }[] = [];

    // ── Rocket path — natural flight weaving between sections ──
    // Uses cubic bezier interpolation for smooth, organic curves
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function ease(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    // Waypoints the rocket flies through (normalized x,y in viewport)
    // Each: [scrollT, x%, y%, rotation hint]
    const waypoints = [
      [0.04, 0.50, 0.42],  // start: emerge from eclipse center
      [0.08, 0.55, 0.25],  // rise up-right from eclipse
      [0.13, 0.70, 0.15],  // arc toward top-right
      [0.18, 0.85, 0.30],  // swoop right
      [0.24, 0.75, 0.60],  // dive down to reveal About section
      [0.30, 0.55, 0.75],  // sweep across center-bottom
      [0.36, 0.25, 0.55],  // curve up to the left
      [0.42, 0.15, 0.30],  // rise up-left (Services area)
      [0.48, 0.30, 0.15],  // arc across top
      [0.55, 0.60, 0.20],  // glide right (Portfolio area)
      [0.62, 0.80, 0.45],  // dive right-center
      [0.68, 0.70, 0.70],  // swoop down
      [0.74, 0.40, 0.80],  // sweep left-bottom (Process)
      [0.80, 0.20, 0.60],  // curve up-left
      [0.86, 0.30, 0.35],  // rise (Testimonials)
      [0.92, 0.50, 0.20],  // center top
      [0.97, 0.50, -0.30], // blast off to space!
    ];

    function getRocketPos(t: number): { x: number; y: number; angle: number } {
      if (t < waypoints[0][0]) {
        return { x: w * 0.5, y: h * 0.42, angle: -Math.PI / 2 };
      }
      if (t >= waypoints[waypoints.length - 1][0]) {
        const last = waypoints[waypoints.length - 1];
        return { x: w * last[1], y: h * last[2], angle: -Math.PI / 2 };
      }

      // Find segment
      let seg = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        if (t >= waypoints[i][0] && t < waypoints[i + 1][0]) { seg = i; break; }
      }

      const wp0 = waypoints[Math.max(0, seg - 1)];
      const wp1 = waypoints[seg];
      const wp2 = waypoints[seg + 1];
      const wp3 = waypoints[Math.min(waypoints.length - 1, seg + 2)];

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

      const t = scrollProgress.current;
      if (t < 0.06) { animId = requestAnimationFrame(draw); return; }

      const { x, y, angle } = getRocketPos(t);
      const visible = y > -80 && y < h + 80 && x > -80 && x < w + 80;

      // ── Spawn trail particles ──
      if (visible && t > 0.08) {
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

      // ── Engine glow ──
      if (visible && t > 0.08) {
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
        drawRocket(x, y, angle, 1.3);
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
      style={{ willChange: "transform" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: About — Large editorial text
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section data-rocket-reveal className="relative py-40 md:py-56">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        {/* Large editorial statement */}
        <h2 className="font-heading text-[clamp(1.8rem,4.5vw,4rem)] font-bold leading-[1.15] tracking-tight" data-reveal>
          <span className="text-white">We bring visions to life through </span>
          <span className="text-[#ff6b35]">strategy, design, </span>
          <span className="text-white/40">and relentless creativity.</span>
        </h2>

        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {aboutContent.story.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/40" data-fade={i * 0.15}>
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] md:grid-cols-4">
          {[
            { value: "200+", label: "Projects" },
            { value: "50+", label: "Clients" },
            { value: "8+", label: "Years" },
            { value: "15+", label: "Experts" },
          ].map((stat, i) => (
            <div key={stat.label} className="bg-white/[0.02] p-8 text-center md:p-10" data-fade={i * 0.1}>
              <p className="font-heading text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/25">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Services — Clean numbered list
   ═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Solutions</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>What We Do</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-12">
          {servicesOverview.map((service, i) => (
            <Link href={`/solutions/${service.slug}`} key={service.id}>
              <div
                data-cursor="View"
                data-fade={i * 0.08}
                className="group relative border-b border-white/[0.06] py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02]"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="flex items-start gap-6 md:items-center md:gap-12">
                  {/* Number */}
                  <span className="shrink-0 font-heading text-sm font-bold text-white/15 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#ff6b35] md:text-3xl">
                    {service.title}
                  </h3>

                  {/* Description (shows on hover) */}
                  <p
                    className="ml-auto hidden max-w-sm text-right text-sm leading-relaxed text-white/30 transition-opacity duration-500 md:block"
                    style={{ opacity: active === i ? 1 : 0 }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="shrink-0 text-white/10 transition-all duration-300 group-hover:text-[#ff6b35] group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Portfolio — Horizontal scroll
   ═══════════════════════════════════════════════════════════ */
function PortfolioSection() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Selected Work</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>Featured Projects</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />
      </div>

      {/* Horizontal scroll container */}
      <div data-h-scroll className="relative h-screen">
        <div data-h-track className="flex h-full items-center gap-8 pl-8 pr-[50vw] md:pl-16 md:gap-12">
          {portfolioItems.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item }: { item: (typeof portfolioItems)[number] }) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={item.href || "#"} target={item.target} className="block shrink-0">
      <div
        data-cursor="View"
        className="group relative overflow-hidden rounded-xl"
        style={{ width: "min(75vw, 600px)" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
          <Image
            src={item.image} alt={item.title}
            width={1200} height={900} unoptimized
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: hover ? "scale(1.08)" : "scale(1)" }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {item.category}
          </span>
          <h3 className="mt-1 font-heading text-xl font-bold text-white md:text-2xl transition-colors duration-300 group-hover:text-[#ff6b35]">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Process — Minimal numbered steps
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>How We Work</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl" data-reveal>Our Process</h2>
        <div className="mt-4 h-px w-full origin-left bg-white/[0.06]" data-line />

        <div className="mt-16 grid gap-0 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <div key={step.number} className="relative border-b border-white/[0.04] py-8 md:border-b-0 md:border-r md:border-white/[0.04] md:px-6 md:py-0 last:border-0" data-fade={i * 0.1}>
              <span className="font-heading text-4xl font-bold text-white/[0.04] md:text-5xl">{step.number}</span>
              <h3 className="mt-3 font-heading text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/30">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Testimonials — Editorial quotes
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60 mb-4" data-fade>Testimonials</p>
        <h2 className="font-heading text-3xl font-bold text-white md:text-5xl mb-16" data-reveal>What They Say</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.slice(0, 4).map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-10" data-fade={i * 0.1}>
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-white/50 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6b35]/10 text-xs font-bold text-[#ff6b35]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/25">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: CTA — Full-width statement
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-40 md:py-56">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 text-center">
        <h2 className="font-heading text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.05] tracking-tight" data-reveal>
          <span className="text-white">Ready to eclipse </span>
          <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            your competition?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-white/35 md:text-base" data-fade="0.2">
          Let&apos;s create something extraordinary together.
        </p>
        <div className="mt-10" data-fade="0.4">
          <MagneticLink href="/contact" cursor="Go" className="inline-flex rounded-full bg-[#ff6b35] px-10 py-4 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(255,107,53,0.35)]">
            Start a Project
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-heading text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-1 text-xs text-white/25">{siteConfig.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-white/30">
              Customized marketing solutions for businesses across the Middle East.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Contact</p>
            <div className="space-y-3">
              <a href={`mailto:${siteConfig.email}`} className="block text-sm text-white/40 transition-colors hover:text-[#ff6b35]">
                {siteConfig.email}
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/20 px-4 py-2 text-xs font-medium text-[#25D366]/70 transition-all hover:border-[#25D366]/40 hover:text-[#25D366]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Follow Us</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteConfig.social).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/[0.08] px-4 py-1.5 text-[11px] uppercase tracking-wider text-white/30 transition-all hover:border-[#ff6b35]/30 hover:text-[#ff6b35]">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 h-px bg-white/[0.04]" />
        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[11px] text-white/10">
            Mon–Fri, 10:00 AM – 5:00 PM
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   Sticky WhatsApp Button
   ═══════════════════════════════════════════════════════════ */
function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello! I'm interested in your services.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)]"
      aria-label="Chat on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function V2Page() {
  useSmoothScroll();
  useScrollAnimations();

  return (
    <main className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen">
      <ScrollRocket />
      <WhatsAppButton />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
