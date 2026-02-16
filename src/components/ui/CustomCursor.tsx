"use client";

import { useEffect, useRef, useCallback } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const raf = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${hovering.current ? 1.5 : 1})`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]';

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(interactiveSelector)) {
        hovering.current = true;
        cursorRef.current?.classList.add("cursor-hover");
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(interactiveSelector)) {
        hovering.current = false;
        cursorRef.current?.classList.remove("cursor-hover");
      }
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  // Don't render on touch devices (SSR-safe)
  return (
    <>
      {/* Main cursor — Eclipse crescent icon */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="eclipse-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform", opacity: 0 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "-16px", marginTop: "-16px" }}
        >
          <defs>
            <mask id="eclipse-mask">
              <rect width="32" height="32" fill="white" />
              <circle cx="20" cy="16" r="11" fill="black" />
            </mask>
            <radialGradient id="eclipse-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer glow */}
          <circle cx="16" cy="16" r="16" fill="url(#eclipse-glow)" />
          {/* Eclipse crescent */}
          <circle
            cx="14"
            cy="16"
            r="10"
            fill="#ff6b35"
            mask="url(#eclipse-mask)"
          />
        </svg>
      </div>

      {/* Center dot — stays exactly on mouse position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform", opacity: 0 }}
      >
        <div
          className="rounded-full bg-primary"
          style={{
            width: "5px",
            height: "5px",
            marginLeft: "-2.5px",
            marginTop: "-2.5px",
          }}
        />
      </div>
    </>
  );
}
