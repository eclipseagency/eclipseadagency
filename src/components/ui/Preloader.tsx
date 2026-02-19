"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 3) * 100,
      size: 0.8 + seededRandom(i * 17 + 5) * 2,
      opacity: 0.15 + seededRandom(i * 23 + 7) * 0.6,
      delay: seededRandom(i * 29 + 11) * 5,
      duration: 2 + seededRandom(i * 31 + 13) * 4,
    }));
  }, []);

  const rays = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const spread = 110;
      const startAngle = -spread / 2;
      const step = spread / 7;
      return {
        angle: startAngle + i * step,
        width: 1 + seededRandom(i * 41 + 1) * 2.5,
        opacity: 0.04 + seededRandom(i * 43 + 3) * 0.08,
        delay: seededRandom(i * 47 + 5) * 3,
        duration: 4 + seededRandom(i * 53 + 7) * 3,
      };
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 3400);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader-overlay"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* ── Background base ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#050508",
        }}
      />

      {/* ── Radial glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,53,0.07) 0%, rgba(247,147,30,0.025) 30%, transparent 70%)",
        }}
      />

      {/* ── Stars ── */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="hero-star"
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* ── Light rays from center ── */}
      {rays.map((ray, i) => (
        <div
          key={`ray-${i}`}
          className="hero-ray"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: ray.width,
            height: "45vh",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${ray.angle}deg)`,
            background: `linear-gradient(to top, rgba(255,107,53,${ray.opacity * 2.5}), rgba(247,147,30,${ray.opacity}), transparent 70%)`,
            animationDelay: `${ray.delay}s`,
            animationDuration: `${ray.duration}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Eclipse arc ── */}
      <div
        className="hero-eclipse-arc"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(70vw, 600px)",
          height: "min(70vw, 600px)",
          borderRadius: "50%",
          border: "1.5px solid transparent",
          borderBottomColor: "rgba(255,107,53,0.3)",
          borderLeftColor: "rgba(255,107,53,0.15)",
          borderRightColor: "rgba(255,107,53,0.15)",
          boxShadow:
            "0 20px 60px rgba(255,107,53,0.1), 0 8px 30px rgba(247,147,30,0.07), inset 0 -20px 60px rgba(255,107,53,0.03)",
          pointerEvents: "none",
        }}
      />

      {/* ── Logo container ── */}
      <div className="preloader-logo-wrap">
        <Image
          src="/images/logo.png"
          alt="Eclipse Agency"
          width={280}
          height={280}
          priority
          unoptimized
          className="preloader-logo"
        />

        {/* ── Loading bar ── */}
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" />
        </div>
      </div>

      {/* ── Film grain ── */}
      <div className="page-hero-noise" style={{ position: "absolute", inset: 0 }} />

      {/* ── Vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
