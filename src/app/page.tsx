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
            scrub: 0.3,
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
    const STAR_COUNT = 120;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      size: 0.3 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      brightness: 0.3 + Math.random() * 0.7,
    }));

    // ── Orbiting particles around eclipse ──
    const ORBIT_COUNT = 50;
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
    const DUST_COUNT = 35;
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
        // Depth effect — items at back are smaller and dimmer
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
   Journey Button — Auto-scrolls the page smoothly
   ═══════════════════════════════════════════════════════════ */
function JourneyButton() {
  const scrollingRef = useRef(false);
  const animRef = useRef(0);

  const startJourney = useCallback(() => {
    if (scrollingRef.current) {
      scrollingRef.current = false;
      cancelAnimationFrame(animRef.current);
      return;
    }
    scrollingRef.current = true;
    const speed = 2.5; // pixels per frame (~150px/sec at 60fps)
    let currentPos = window.scrollY;

    function step() {
      if (!scrollingRef.current) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (currentPos >= maxScroll - 2) {
        scrollingRef.current = false;
        return;
      }
      currentPos = Math.min(currentPos + speed, maxScroll);
      window.scrollTo(0, currentPos);
      animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);

    const stop = () => {
      scrollingRef.current = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });
  }, []);

  useEffect(() => {
    return () => {
      scrollingRef.current = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20">
      <button
        onClick={startJourney}
        className="group flex flex-col items-center gap-2 cursor-pointer px-6 py-3 min-h-[48px]"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/30 group-hover:text-[#ff6b35]/70 transition-colors duration-500 md:text-xs">
          Start the Journey
        </span>
        <div className="relative flex flex-col items-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/20 group-hover:text-[#ff6b35]/60 transition-colors animate-bounce" style={{ animationDuration: "2s" }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/10 group-hover:text-[#ff6b35]/40 transition-colors animate-bounce" style={{ animationDuration: "2s", animationDelay: "0.15s" }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Hero
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
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
          <p className="mx-auto mt-3 max-w-[280px] text-[10px] leading-relaxed text-white/25 md:text-xs">
            Marketing Built on Strategy,<br />Driven by Creativity.
          </p>
        </div>
      </div>

      {/* ── Auto-scroll journey button ── */}
      <JourneyButton />

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
/* ═══════════════════════════════════════════════════════════
   Scroll Rocket — Canvas rocket that flies naturally between sections
   Reveals content as it swoops through, with fire trail + smoke
   ═══════════════════════════════════════════════════════════ */
function ScrollRocket({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useRef(0);
  const visibleRef = useRef(false);
  // Sync ref on every render — this runs synchronously during render
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

    // ── Rocket path — natural flight weaving between sections ──
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

    // Ascending path (scrolling up) — y INCREASES with t so that
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

    // Active waypoints — switches based on scroll direction
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

/* ═══════════════════════════════════════════════════════════
   Rocket Preloader — Full-screen intro that tears apart
   Rocket flies down center, rips the screen open with orange
   glow, revealing the homepage hero beneath
   ═══════════════════════════════════════════════════════════ */
function RocketPreloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [done, setDone] = useState(false);

  // Skip preloader for returning visitors in the same session
  const [shouldSkip] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem("eclipse-preloader-seen");
  });

  // Generate jagged tear edge points (stable across renders)
  const tearPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const segments = 60;
    for (let i = 0; i <= segments; i++) {
      const y = i / segments;
      const jag = (Math.sin(i * 2.7) * 12 + Math.sin(i * 5.1) * 6 + Math.sin(i * 8.3) * 3);
      pts.push({ x: jag, y });
    }
    return pts;
  }, []);

  // Cosmic tear stars — tiny stars visible through the rift
  const cosmicStars = useMemo(() =>
    Array.from({ length: 120 }, () => ({
      x: (Math.random() - 0.5) * 80,
      y: Math.random(),
      size: 0.3 + Math.random() * 2,
      brightness: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 2,
      hue: Math.random() > 0.5 ? 30 + Math.random() * 20 : 10 + Math.random() * 20, // warm gold or deep orange
    }))
  , []);

  // If returning visitor, skip preloader entirely
  useEffect(() => {
    if (shouldSkip) {
      onComplete();
      setDone(true);
    }
  }, [shouldSkip, onComplete]);

  useEffect(() => {
    if (shouldSkip) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
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

    // Prevent scroll during preloader — use fixed position to avoid scrollbar shift
    document.body.style.position = "fixed";
    document.body.style.inset = "0";
    document.body.style.overflowY = "scroll";

    // ── Animation timeline via GSAP ──
    const proxy = { progress: 0, split: 0, rocketReturn: 0, fade: 1 };

    const tl = gsap.timeline();

    // Phase 1: Rocket descends and tears (0 → 1) — starts at 1s to let text be read
    tl.to(proxy, { progress: 1, duration: 2.2, ease: "power2.inOut" }, 1.0);
    // Phase 2: Split halves apart
    tl.to(proxy, { split: 1, duration: 0.9, ease: "power3.in" }, 2.8);
    // Phase 3: Rocket flies back up to eclipse center (seamless handoff to ScrollRocket)
    tl.to(proxy, { rocketReturn: 1, duration: 1.0, ease: "power2.inOut" }, 3.2);
    // Show ScrollRocket BEFORE preloader fades so there's no gap
    tl.call(() => { onComplete(); }, [], 3.8);
    // Phase 4: Fade out preloader canvas (ScrollRocket already visible beneath)
    tl.to(proxy, { fade: 0, duration: 0.5, ease: "power2.in" }, 4.0);
    // Phase 5: Cleanup — unlock body scroll, unmount preloader
    tl.call(() => {
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.overflowY = "";
      try { sessionStorage.setItem("eclipse-preloader-seen", "1"); } catch {}
      setDone(true);
    }, [], 4.5);

    // Sync progress ref
    gsap.ticker.add(() => {
      progressRef.current = proxy.progress;
    });

    // ── Draw rocket ──
    function drawRocket(x: number, y: number, angle: number, scale: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const s = scale;

      // Body
      ctx.beginPath();
      ctx.moveTo(0, -22 * s);
      ctx.quadraticCurveTo(8 * s, -14 * s, 8 * s, 5 * s);
      ctx.lineTo(14 * s, 18 * s);
      ctx.lineTo(5 * s, 12 * s);
      ctx.lineTo(-5 * s, 12 * s);
      ctx.lineTo(-14 * s, 18 * s);
      ctx.lineTo(-8 * s, 5 * s);
      ctx.quadraticCurveTo(-8 * s, -14 * s, 0, -22 * s);
      ctx.closePath();
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

      // Nose cone
      ctx.beginPath();
      ctx.moveTo(0, -22 * s);
      ctx.quadraticCurveTo(6 * s, -16 * s, 6 * s, -8 * s);
      ctx.lineTo(-6 * s, -8 * s);
      ctx.quadraticCurveTo(-6 * s, -16 * s, 0, -22 * s);
      ctx.fillStyle = "#ff6b35";
      ctx.fill();

      // Window
      ctx.beginPath();
      ctx.arc(0, -4 * s, 3 * s, 0, Math.PI * 2);
      ctx.fillStyle = "#1a3a5c";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-0.8 * s, -4.8 * s, 1.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150,200,255,0.4)";
      ctx.fill();

      // Fins
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

      // "E" logo
      ctx.fillStyle = "rgba(255, 107, 53, 0.6)";
      ctx.font = `bold ${8 * s}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("E", 0, 4 * s);

      ctx.restore();
    }

    // ── Fire/smoke trail particles ──
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; type: "fire" | "smoke" }[] = [];
    let lastTime = performance.now();

    function draw(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const p = proxy.progress;
      const split = proxy.split;
      const rocketReturn = proxy.rocketReturn;
      const fade = proxy.fade;

      if (fade <= 0) { animId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = fade;

      const cx = w / 2;
      // Rocket Y position: from top (-60px) to bottom (h + 60px)
      const tearRocketY = -60 + (h + 120) * p;

      // Return path: rocket flies from bottom back to eclipse center with a curve
      const eclipseCenterY = h * 0.26;
      const returnStartY = h + 60;
      const returnStartX = cx;
      // Curved return path — arcs to the right then back to center
      const returnT = rocketReturn;
      const returnX = returnStartX + Math.sin(returnT * Math.PI) * w * 0.15;
      const returnY = returnStartY + (eclipseCenterY - returnStartY) * returnT;

      // Determine current rocket position based on phase
      const inReturnPhase = rocketReturn > 0;
      const rocketX = inReturnPhase ? returnX : cx;
      const rocketY = inReturnPhase ? returnY : tearRocketY;

      // Rocket angle during return (pointing in direction of travel)
      let rocketAngle = Math.PI; // pointing down during tear
      if (inReturnPhase) {
        // Calculate angle from return path derivative
        const dt2 = 0.01;
        const nextT = Math.min(1, returnT + dt2);
        const nx = returnStartX + Math.sin(nextT * Math.PI) * w * 0.15;
        const ny = returnStartY + (eclipseCenterY - returnStartY) * nextT;
        rocketAngle = Math.atan2(ny - rocketY, nx - rocketX) + Math.PI / 2;
      }

      // ── Draw the two dark halves ──
      const splitOffset = split * (w * 0.55);
      const tearWidth = split * 60 + 2; // gap grows as split increases
      const glowHeight = Math.min(p * 1.2, 1) * h;
      const time = now * 0.001;

      // ── Cosmic rift visible through the tear — no clip, just soft radials ──
      if (p > 0.03) {
        ctx.save();

        // Warm glow in the rift gap — contained by tight radial
        const riftW = tearWidth / 2 + 10;
        const riftBg = ctx.createRadialGradient(cx, glowHeight * 0.4, 0, cx, glowHeight * 0.4, Math.max(riftW, 20));
        riftBg.addColorStop(0, "rgba(50, 18, 5, 0.6)");
        riftBg.addColorStop(0.5, "rgba(35, 10, 3, 0.3)");
        riftBg.addColorStop(1, "transparent");
        ctx.fillStyle = riftBg;
        ctx.fillRect(cx - riftW * 2, -10, riftW * 4, glowHeight + 20);

        // Nebula glow — tight to rift width
        const nebR = Math.max(riftW * 1.5, 20);
        const nebula1 = ctx.createRadialGradient(cx, glowHeight * 0.3, 0, cx, glowHeight * 0.3, nebR);
        nebula1.addColorStop(0, "rgba(255, 120, 40, 0.2)");
        nebula1.addColorStop(0.5, "rgba(255, 80, 20, 0.06)");
        nebula1.addColorStop(1, "transparent");
        ctx.fillStyle = nebula1;
        ctx.fillRect(cx - nebR, 0, nebR * 2, glowHeight);

        const nebula2 = ctx.createRadialGradient(cx, glowHeight * 0.65, 0, cx, glowHeight * 0.65, nebR * 0.8);
        nebula2.addColorStop(0, "rgba(255, 140, 40, 0.15)");
        nebula2.addColorStop(0.5, "rgba(200, 80, 20, 0.04)");
        nebula2.addColorStop(1, "transparent");
        ctx.fillStyle = nebula2;
        ctx.fillRect(cx - nebR, 0, nebR * 2, glowHeight);

        // Stars twinkling inside — with edge fade
        const riftHalfW = tearWidth / 2 + 8;
        for (const star of cosmicStars) {
          const sy = star.y * glowHeight;
          if (sy > glowHeight) continue;
          const sx = cx + star.x;
          // Fade stars near edges for soft look
          const distFromCenter = Math.abs(star.x) / riftHalfW;
          const edgeFade = Math.max(0, 1 - distFromCenter * 1.2);
          // Fade near top and bottom
          const yFade = Math.min(1, sy / 30) * Math.min(1, (glowHeight - sy) / 40);
          const twinkle = 0.4 + 0.6 * Math.sin(time * star.speed + star.phase);
          const alpha = star.brightness * twinkle * Math.min(1, p * 5) * edgeFade * yFade;
          if (alpha < 0.02) continue;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 90%, 70%, ${alpha})`;
          ctx.fill();
          if (star.size > 1.2) {
            ctx.beginPath();
            ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${star.hue}, 70%, 60%, ${alpha * 0.12})`;
            ctx.fill();
          }
        }

        // Cosmic energy streaks — softer, with transparency falloff
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 5; i++) {
          const streakY = (glowHeight * (i + 0.5)) / 5;
          const wave = Math.sin(time * 1.5 + i * 2.1) * 10;
          const streakAlpha = (0.06 + 0.04 * Math.sin(time * 2 + i)) * Math.min(1, p * 4);
          const streakR = Math.max(riftW, 12);
          const grad = ctx.createRadialGradient(cx + wave, streakY, 0, cx + wave, streakY, streakR);
          grad.addColorStop(0, `rgba(255,130,35, ${streakAlpha})`);
          grad.addColorStop(0.6, `rgba(255,90,15, ${streakAlpha * 0.3})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fillRect(cx - streakR + wave, streakY - 6, streakR * 2, 12);
        }
        ctx.globalCompositeOperation = "source-over";

        ctx.restore();
      }

      // Overall opacity fade for split phase — smoothly dissolves the halves
      const halvesAlpha = split > 0.3 ? Math.max(0, 1 - (split - 0.3) / 0.7) : 1;

      // Left half
      ctx.save();
      ctx.globalAlpha = fade * halvesAlpha;
      ctx.beginPath();
      // Extend well beyond viewport on all non-tear sides
      ctx.moveTo(-w, -100);
      ctx.lineTo(-w, h + 100);
      for (let i = tearPoints.length - 1; i >= 0; i--) {
        const pt = tearPoints[i];
        ctx.lineTo(cx - tearWidth / 2 + pt.x - splitOffset, pt.y * h);
      }
      ctx.lineTo(-w, -100);
      ctx.closePath();
      ctx.fillStyle = "#050508";
      ctx.fill();
      ctx.globalAlpha = fade;
      ctx.restore();

      // Right half
      ctx.save();
      ctx.globalAlpha = fade * halvesAlpha;
      ctx.beginPath();
      ctx.moveTo(w * 2, -100);
      ctx.lineTo(w * 2, h + 100);
      for (let i = tearPoints.length - 1; i >= 0; i--) {
        const pt = tearPoints[i];
        ctx.lineTo(cx + tearWidth / 2 - pt.x + splitOffset, pt.y * h);
      }
      ctx.lineTo(w * 2, -100);
      ctx.closePath();
      ctx.fillStyle = "#050508";
      ctx.fill();
      ctx.globalAlpha = fade;
      ctx.restore();

      // ── Torn edge glow — soft cosmic energy bleeding from rift edges ──
      if (p > 0.05) {
        // Sample every 3rd point for smoother, softer glow (less granular = less harsh)
        for (let idx = 0; idx < tearPoints.length; idx += 3) {
          const pt = tearPoints[idx];
          if (pt.y * h > glowHeight) break;
          const edgeGlow = 5 + split * 14;
          const yFade = Math.min(1, pt.y * h / 30) * Math.min(1, (glowHeight - pt.y * h) / 40);
          const alpha = 0.15 * (1 - pt.y * 0.3) * yFade;
          // Left edge — orange glow
          const exL = cx - tearWidth / 2 + pt.x - splitOffset;
          const glL = ctx.createRadialGradient(exL, pt.y * h, 0, exL, pt.y * h, edgeGlow);
          glL.addColorStop(0, `rgba(255, 180, 80, ${alpha * 0.5})`);
          glL.addColorStop(0.5, `rgba(255, 120, 40, ${alpha * 0.2})`);
          glL.addColorStop(1, "transparent");
          ctx.fillStyle = glL;
          ctx.fillRect(exL - edgeGlow, pt.y * h - edgeGlow, edgeGlow * 2, edgeGlow * 2);
          // Right edge — orange glow
          const exR = cx + tearWidth / 2 - pt.x + splitOffset;
          const glR = ctx.createRadialGradient(exR, pt.y * h, 0, exR, pt.y * h, edgeGlow);
          glR.addColorStop(0, `rgba(255, 160, 80, ${alpha * 0.5})`);
          glR.addColorStop(0.5, `rgba(255, 100, 40, ${alpha * 0.2})`);
          glR.addColorStop(1, "transparent");
          ctx.fillStyle = glR;
          ctx.fillRect(exR - edgeGlow, pt.y * h - edgeGlow, edgeGlow * 2, edgeGlow * 2);
        }
      }

      // ── Central energy line — bright orange core ──
      if (p > 0.05 && split < 0.6) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, glowHeight);
        const lineAlpha = 0.7 * (1 - split * 1.5);
        ctx.strokeStyle = `rgba(255, 150, 60, ${Math.max(0, lineAlpha)})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(255, 107, 53, 0.9)";
        ctx.shadowBlur = 20;
        ctx.stroke();
        // Second pass — bright white inner core
        ctx.strokeStyle = `rgba(255, 230, 200, ${Math.max(0, lineAlpha * 0.5)})`;
        ctx.lineWidth = 0.8;
        ctx.shadowColor = "rgba(255, 180, 80, 0.7)";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Spawn fire/smoke particles behind rocket ──
      const rocketActive = (p > 0.02 && p < 0.98 && split < 0.3) || (inReturnPhase && rocketReturn < 0.95);
      if (rocketActive) {
        // Thrust direction (opposite of travel)
        const thrustAngle = inReturnPhase ? rocketAngle - Math.PI / 2 : 0;
        const thrustDx = inReturnPhase ? -Math.cos(thrustAngle) : 0;
        const thrustDy = inReturnPhase ? -Math.sin(thrustAngle) : 1;
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: rocketX + (Math.random() - 0.5) * 8 + thrustDx * 15,
            y: rocketY + 30 * (inReturnPhase ? -1 : 1) + Math.random() * 10 + thrustDy * 15,
            vx: (Math.random() - 0.5) * 40 + thrustDx * 60,
            vy: (inReturnPhase ? 50 + Math.random() * 80 : -50 - Math.random() * 80) + thrustDy * 30,
            life: 0, maxLife: 0.3 + Math.random() * 0.4,
            size: 2 + Math.random() * 4,
            type: "fire",
          });
        }
        if (Math.random() > 0.4) {
          particles.push({
            x: rocketX + (Math.random() - 0.5) * 12 + thrustDx * 20,
            y: rocketY + 35 * (inReturnPhase ? -1 : 1) + Math.random() * 15 + thrustDy * 20,
            vx: (Math.random() - 0.5) * 25 + thrustDx * 30,
            vy: (inReturnPhase ? 20 + Math.random() * 40 : -20 - Math.random() * 40) + thrustDy * 15,
            life: 0, maxLife: 0.6 + Math.random() * 0.6,
            size: 4 + Math.random() * 8,
            type: "smoke",
          });
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.life += dt;
        if (pt.life > pt.maxLife) { particles.splice(i, 1); continue; }
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.vx *= 0.96;
        pt.vy *= 0.96;
        if (pt.type === "smoke") pt.size += dt * 15;

        const prog = pt.life / pt.maxLife;
        const alpha = prog < 0.1 ? prog * 10 : Math.max(0, 1 - (prog - 0.1) / 0.9);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * (1 - prog * 0.3), 0, Math.PI * 2);
        if (pt.type === "fire") {
          ctx.fillStyle = `rgba(255, ${80 + Math.floor(100 * prog)}, ${20 + Math.floor(40 * prog)}, ${alpha * 0.7})`;
          ctx.shadowColor = `rgba(255,107,53,${alpha * 0.5})`;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(180,160,140,${alpha * 0.12})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (particles.length > 200) particles.splice(0, particles.length - 200);

      // ── Engine glow ──
      if (rocketActive) {
        const glowR = ctx.createRadialGradient(rocketX, rocketY + (inReturnPhase ? -25 : 25), 0, rocketX, rocketY + (inReturnPhase ? -25 : 25), 40);
        glowR.addColorStop(0, "rgba(255,160,50,0.6)");
        glowR.addColorStop(0.3, "rgba(255,107,53,0.3)");
        glowR.addColorStop(1, "transparent");
        ctx.fillStyle = glowR;
        ctx.fillRect(rocketX - 45, rocketY + (inReturnPhase ? -65 : -15), 90, 80);
      }

      // ── Draw rocket ──
      const showRocket = (p < 0.98 && split < 0.5) || (inReturnPhase && rocketReturn < 0.98);
      if (showRocket) {
        drawRocket(rocketX, rocketY, rocketAngle, 1.5);
      }

      // ── "Eclipse Agency" text — stays until rocket reaches it ──
      // Rocket reaches center (h*0.45) when p ≈ 0.45, so fade out starting at p=0.35
      if (p < 0.55) {
        const fadeIn = Math.min(1, p / 0.08); // fade in over first 8%
        const fadeOut = p > 0.35 ? Math.max(0, 1 - (p - 0.35) / 0.15) : 1; // fade out 0.35→0.50
        const textAlpha = fadeIn * fadeOut;
        if (textAlpha > 0) {
          ctx.save();
          ctx.fillStyle = `rgba(255,255,255,${textAlpha * 0.8})`;
          ctx.font = "600 14px 'Plus Jakarta Sans', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("ECLIPSE AGENCY", cx, h * 0.46);
          ctx.fillStyle = `rgba(255,107,53,${textAlpha * 0.6})`;
          ctx.font = "400 11px 'Plus Jakarta Sans', sans-serif";
          ctx.fillText("FROM SHADOW TO SPOTLIGHT", cx, h * 0.46 + 28);
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      tl.kill();
      window.removeEventListener("resize", resize);
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.overflowY = "";
    };
  }, [tearPoints, cosmicStars, onComplete, shouldSkip]);

  if (done) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Space Background — Full-page fixed starfield with parallax
   Creates a continuous space journey feel while scrolling
   ═══════════════════════════════════════════════════════════ */
function SpaceBackground() {
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

    // Three parallax star layers — far (slow), mid, near (fast)
    const farStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.3 + Math.random() * 0.8,
      brightness: 0.12 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
    const midStars = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.5 + Math.random() * 1.2,
      brightness: 0.15 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    }));
    const nearStars = Array.from({ length: 25 }, () => ({
      x: Math.random() * 1.2 - 0.1, y: Math.random(),
      size: 0.8 + Math.random() * 1.5,
      brightness: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));

    // Subtle nebula wisps — very faint color patches
    const nebulae = [
      { x: 0.2, y: 0.25, rx: 250, ry: 150, color: "rgba(180,80,20,0.015)", parallax: 0.05 },
      { x: 0.75, y: 0.55, rx: 300, ry: 180, color: "rgba(255,80,30,0.012)", parallax: 0.08 },
      { x: 0.5, y: 0.8, rx: 200, ry: 130, color: "rgba(200,100,30,0.01)", parallax: 0.06 },
    ];

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    function draw(now: number) {
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: About — Rocket reveal, space-themed intro
   ═══════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about" className="relative z-0 pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Subtle nebula glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none opacity-30" style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)",
      }} />


      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        {/* Big statement */}
        <h2 className="font-heading text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-tight max-w-4xl" data-reveal>
          <span className="text-white">We bring visions to life through </span>
          <span className="text-[#ff6b35]">strategy, design, </span>
          <span className="text-white/40">and relentless creativity.</span>
        </h2>

        <div className="mt-6 h-px w-full origin-left bg-gradient-to-r from-[#ff6b35]/20 to-transparent" data-line />

        {/* Story text */}
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          {aboutContent.story.map((p, i) => (
            <p key={i} className="text-sm leading-[1.8] text-white/35" data-fade={i * 0.15}>
              {p}
            </p>
          ))}
        </div>

        {/* Stats — floating cards with glow */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {[
            { value: "200+", label: "Projects", icon: "🚀" },
            { value: "50+", label: "Clients", icon: "🌍" },
            { value: "8+", label: "Years", icon: "⭐" },
            { value: "15+", label: "Experts", icon: "👨‍🚀" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              data-fade={i * 0.12}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[#ff6b35]/[0.03] md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,107,53,0.06) 0%, transparent 70%)",
              }} />
              <span className="text-2xl">{stat.icon}</span>
              <p className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/25">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Services — Space cards with orbital connectors
   ═══════════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section id="services" className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Left nebula */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40%] h-[80%] pointer-events-none opacity-20" style={{
        background: "radial-gradient(ellipse at 10% 50%, rgba(255,107,53,0.1) 0%, transparent 60%)",
      }} />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          {/* Tube Man mascot — directly above section title */}
          <div className="relative z-20 flex justify-center pointer-events-none select-none" style={{ marginBottom: "-200px", marginTop: "-20px" }}>
            <video
              src="https://eclipseadagency.com/wp-content/uploads/2024/08/Inflatable-Tube-Man.webm"
              autoPlay
              muted
              loop
              playsInline
              className="h-[260px] w-auto mix-blend-screen md:h-[380px]"
              style={{ transform: "translateY(-220px) translateX(20px)" }}
            />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>Our Solutions</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>What We Do</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Service cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {servicesOverview.map((service, i) => (
            <Link href={`/solutions/${service.slug}`} key={service.id} className="block">
              <div
                data-fade={i * 0.1}
                className="group relative h-full rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.015)] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/25 hover:bg-[rgba(255,107,53,0.03)] hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(255,107,53,0.08)]"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                  background: "radial-gradient(circle at 30% 20%, rgba(255,107,53,0.08) 0%, transparent 60%)",
                }} />

                {/* Number badge */}
                <div className="relative flex items-center justify-between mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b35]/10 font-heading text-sm font-bold text-[#ff6b35] transition-colors group-hover:bg-[#ff6b35]/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white/10 transition-all duration-300 group-hover:text-[#ff6b35] group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="relative font-heading text-lg font-bold text-white transition-colors group-hover:text-[#ff6b35] md:text-xl">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/30 group-hover:text-white/40 transition-colors">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] transition-all duration-700 group-hover:w-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Partners — Certified partner badges
   ═══════════════════════════════════════════════════════════ */
function PartnersSection() {
  const partners = [
    { name: "HubSpot", label: "Certified Partner" },
    { name: "Google", label: "Partner" },
    { name: "Semrush", label: "Certified Agency" },
    { name: "Adjust", label: "Solutions Partner" },
  ];

  return (
    <section id="partners" className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-white/20 mb-8 md:text-xs" data-fade>
          Trusted Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((p, i) => (
            <div
              key={p.name}
              data-fade={i * 0.1}
              className="group flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 md:px-5 md:py-2.5 min-h-[44px] transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[#ff6b35]/[0.03]"
            >
              <span className="text-xs md:text-sm font-bold text-white/50 group-hover:text-[#ff6b35] transition-colors">{p.name}</span>
              <span className="text-[11px] uppercase tracking-wider text-white/20">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Portfolio — Video showreel horizontal scroll
   ═══════════════════════════════════════════════════════════ */
const portfolioVideos: { id: string; vimeoId?: string; vimeoHash?: string; src?: string }[] = [
  { id: "showreel", vimeoId: "1051203598", vimeoHash: "a43672f073" },
  { id: "branding-1", vimeoId: "1144863160" },
  { id: "branding-2", vimeoId: "1144863671" },
  { id: "branding-3", vimeoId: "1147623451" },
  { id: "webdev-1", vimeoId: "1144880936" },
  { id: "webdev-2", vimeoId: "1144881841" },
  { id: "webdev-3", vimeoId: "1054176209", vimeoHash: "e8b82880e0" },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-16 md:py-24 overflow-hidden">

      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>Selected Work</p>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>Featured Projects</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-[#ff6b35]" data-fade="0.3">
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="mt-4 h-px w-full origin-left bg-gradient-to-r from-[#ff6b35]/20 to-transparent" data-line />
      </div>

      {/* Horizontal scroll — desktop only */}
      <div className="hidden md:block">
        <div data-h-scroll className="relative h-[80vh]">
          <div data-h-track className="flex h-full items-center gap-10 pl-[max(2rem,calc((100vw-1100px)/2+1.25rem))] pr-[50vw]">
            {portfolioVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: horizontal scroll cards */}
      <div className="md:hidden px-5">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {portfolioVideos.map((v) => (
            <div key={v.id} className="snap-center shrink-0" style={{ width: "85vw" }}>
              <VideoCard video={v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: (typeof portfolioVideos)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vimeoParams = `badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&background=1`;
  const vimeoSrc = video.vimeoId
    ? `https://player.vimeo.com/video/${video.vimeoId}?${video.vimeoHash ? `h=${video.vimeoHash}&` : ""}${vimeoParams}`
    : "";

  return (
    <div ref={ref} className="block shrink-0 group">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-[#ff6b35]/20 hover:shadow-[0_20px_80px_rgba(255,107,53,0.1)]"
        style={{ width: "min(70vw, 500px)" }}
      >
        {/* Uniform 1:1 square aspect for all cards */}
        <div className="relative overflow-hidden bg-white/[0.02]" style={{ paddingTop: "100%" }}>
          {visible && video.vimeoId ? (
            <iframe
              src={vimeoSrc}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : visible && video.src ? (
            <video
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-[#ff6b35]/30 border-t-[#ff6b35] animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Process — Rocket flight path timeline
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden">

      {/* Center nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none opacity-15" style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 50%)",
      }} />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>How We Work</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>Our Process</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#ff6b35]/15 to-transparent" />

          {processSteps.map((step, i) => (
            <div
              key={step.number}
              data-fade={i * 0.12}
              className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-8 last:mb-0 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content card */}
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/20 hover:bg-[rgba(255,107,53,0.02)]">
                  <span className="font-heading text-4xl font-bold text-[#ff6b35]/10 md:text-5xl">{step.number}</span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/30">{step.description}</p>
                </div>
              </div>

              {/* Center node — desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 h-4 w-4 items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-[#ff6b35]/40 ring-4 ring-[#ff6b35]/10" />
              </div>

              {/* Empty spacer for other side */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: Testimonials — Floating space cards
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>Testimonials</p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>What They Say</h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" data-line />
        </div>

        {/* Testimonial cards — scrollable on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {testimonials.slice(0, 4).map((t, i) => (
            <div
              key={i}
              data-fade={i * 0.1}
              className="group shrink-0 snap-center w-[85vw] sm:w-[70vw] md:w-auto rounded-2xl border border-white/[0.06] bg-[rgba(255,255,255,0.015)] p-6 md:p-8 transition-all duration-500 hover:border-[#ff6b35]/15 hover:bg-[rgba(255,107,53,0.02)]"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,107,53,0.05) 0%, transparent 50%)",
              }} />

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff6b35" stroke="none" className="opacity-60">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="relative text-sm leading-[1.8] text-white/45 italic md:text-[15px]">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b35]/20 to-[#f7931e]/10 text-sm font-bold text-[#ff6b35]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/20">{t.title}</p>
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
   SECTION: CTA — Eclipse-themed call to action
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">


      {/* Central eclipse glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 30%, transparent 60%)",
      }} />

      {/* Orbital ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,500px)] h-[min(90vw,500px)] rounded-full border border-white/[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,380px)] h-[min(70vw,380px)] rounded-full border border-[#ff6b35]/[0.06] pointer-events-none" />

      <div className="relative mx-auto max-w-[800px] px-5 md:px-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-4 md:text-xs" data-fade>Get Started</p>
        <h2 className="font-heading text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight" data-reveal>
          <span className="text-white">Ready to eclipse </span>
          <span className="bg-gradient-to-r from-[#ff6b35] to-[#f7931e] bg-clip-text text-transparent">
            your competition?
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-white/30 md:text-base" data-fade="0.2">
          Let&apos;s create something extraordinary together. Your brand deserves to shine.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-fade="0.4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e] px-6 py-3 md:px-8 md:py-3.5 min-h-[44px] text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,107,53,0.35)] hover:translate-y-[-2px]">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 md:px-8 md:py-3.5 min-h-[44px] text-sm font-semibold text-white/50 transition-all duration-300 hover:border-[#25D366]/30 hover:text-[#25D366]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat with Us
          </a>
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
            <Image src="https://eclipseadagency.com/wp-content/uploads/2025/12/eclipse-logo-source-1.png" alt={siteConfig.name} width={160} height={40} className="h-8 w-auto object-contain mb-3" />
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
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/10">
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
   Back to Top Button — appears after scrolling down
   ═══════════════════════════════════════════════════════════ */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm text-white/40 transition-all duration-300 hover:border-[#ff6b35]/30 hover:text-[#ff6b35] ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const onPreloaderComplete = useCallback(() => setPreloaderDone(true), []);
  useSmoothScroll();
  useScrollAnimations();

  return (
    <>
      <RocketPreloader onComplete={onPreloaderComplete} />
      <main className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen">
        <SpaceBackground />
        <ScrollRocket visible={preloaderDone} />
        <WhatsAppButton />
        <BackToTop />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PartnersSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
