"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import gsap from "gsap";

/* ═══════════════════════════════════════════════════════════
   Rocket Preloader - Full-screen intro that tears apart
   Rocket flies down center, rips the screen open with orange
   glow, revealing the homepage hero beneath
   ═══════════════════════════════════════════════════════════ */
export function RocketPreloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

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

  // Cosmic tear stars - tiny stars visible through the rift
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

    // Prevent scroll during preloader - use fixed position to avoid scrollbar shift
    document.body.style.position = "fixed";
    document.body.style.inset = "0";
    document.body.style.overflowY = "scroll";

    // ── Animation timeline via GSAP ──
    const proxy = { progress: 0, split: 0, rocketReturn: 0, fade: 1 };

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Phase 1: Rocket descends and tears (0 → 1) - starts at 1s to let text be read
    tl.to(proxy, { progress: 1, duration: 2.2, ease: "power2.inOut" }, 1.0);
    // Phase 2: Split halves apart
    tl.to(proxy, { split: 1, duration: 0.9, ease: "power3.in" }, 2.8);
    // Phase 3: Rocket flies back up to eclipse center (seamless handoff to ScrollRocket)
    tl.to(proxy, { rocketReturn: 1, duration: 1.0, ease: "power2.inOut" }, 3.2);
    // Show ScrollRocket BEFORE preloader fades so there's no gap
    tl.call(() => { onComplete(); }, [], 3.8);
    // Phase 4: Fade out preloader canvas (ScrollRocket already visible beneath)
    tl.to(proxy, { fade: 0, duration: 0.5, ease: "power2.in" }, 4.0);
    // Phase 5: Cleanup - unlock body scroll, unmount preloader
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
      // Curved return path - arcs to the right then back to center
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

      // ── Cosmic rift visible through the tear - no clip, just soft radials ──
      if (p > 0.03) {
        ctx.save();

        // Warm glow in the rift gap - contained by tight radial
        const riftW = tearWidth / 2 + 10;
        const riftBg = ctx.createRadialGradient(cx, glowHeight * 0.4, 0, cx, glowHeight * 0.4, Math.max(riftW, 20));
        riftBg.addColorStop(0, "rgba(50, 18, 5, 0.6)");
        riftBg.addColorStop(0.5, "rgba(35, 10, 3, 0.3)");
        riftBg.addColorStop(1, "transparent");
        ctx.fillStyle = riftBg;
        ctx.fillRect(cx - riftW * 2, -10, riftW * 4, glowHeight + 20);

        // Nebula glow - tight to rift width
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

        // Stars twinkling inside - with edge fade
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

        // Cosmic energy streaks - softer, with transparency falloff
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

      // Overall opacity fade for split phase - smoothly dissolves the halves
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

      // ── Torn edge glow - soft cosmic energy bleeding from rift edges ──
      if (p > 0.05) {
        // Sample every 3rd point for smoother, softer glow (less granular = less harsh)
        for (let idx = 0; idx < tearPoints.length; idx += 3) {
          const pt = tearPoints[idx];
          if (pt.y * h > glowHeight) break;
          const edgeGlow = 5 + split * 14;
          const yFade = Math.min(1, pt.y * h / 30) * Math.min(1, (glowHeight - pt.y * h) / 40);
          const alpha = 0.15 * (1 - pt.y * 0.3) * yFade;
          // Left edge - orange glow
          const exL = cx - tearWidth / 2 + pt.x - splitOffset;
          const glL = ctx.createRadialGradient(exL, pt.y * h, 0, exL, pt.y * h, edgeGlow);
          glL.addColorStop(0, `rgba(255, 180, 80, ${alpha * 0.5})`);
          glL.addColorStop(0.5, `rgba(255, 120, 40, ${alpha * 0.2})`);
          glL.addColorStop(1, "transparent");
          ctx.fillStyle = glL;
          ctx.fillRect(exL - edgeGlow, pt.y * h - edgeGlow, edgeGlow * 2, edgeGlow * 2);
          // Right edge - orange glow
          const exR = cx + tearWidth / 2 - pt.x + splitOffset;
          const glR = ctx.createRadialGradient(exR, pt.y * h, 0, exR, pt.y * h, edgeGlow);
          glR.addColorStop(0, `rgba(255, 160, 80, ${alpha * 0.5})`);
          glR.addColorStop(0.5, `rgba(255, 100, 40, ${alpha * 0.2})`);
          glR.addColorStop(1, "transparent");
          ctx.fillStyle = glR;
          ctx.fillRect(exR - edgeGlow, pt.y * h - edgeGlow, edgeGlow * 2, edgeGlow * 2);
        }
      }

      // ── Central energy line - bright orange core ──
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
        // Second pass - bright white inner core
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

      // ── "Eclipse Agency" text - stays until rocket reaches it ──
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
      clearTimeout(skipTimer);
      cancelAnimationFrame(animId);
      tl.kill();
      window.removeEventListener("resize", resize);
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.overflowY = "";
    };
  }, [tearPoints, cosmicStars, onComplete, shouldSkip]);

  const handleSkip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    onComplete();
    document.body.style.position = "";
    document.body.style.inset = "";
    document.body.style.overflowY = "";
    try { sessionStorage.setItem("eclipse-preloader-seen", "1"); } catch {}
    setDone(true);
  }, [onComplete]);

  if (done) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      />
      {showSkip && (
        <button
          onClick={handleSkip}
          className="pointer-events-auto absolute bottom-6 right-6 flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-all duration-300 animate-[fadeIn_0.4s_ease-out]"
          style={{ zIndex: 101 }}
        >
          Skip
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
