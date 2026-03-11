"use client";

import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   Back to Top Button - appears after scrolling down
   ═══════════════════════════════════════════════════════════ */
export function BackToTop() {
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
