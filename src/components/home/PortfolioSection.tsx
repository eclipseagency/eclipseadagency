"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════════════
   SECTION: Portfolio - Cinematic horizontal scroll gallery
   ═══════════════════════════════════════════════════════════ */
const portfolioVideos = [
  { id: "showreel", src: "/videos/showreel.mp4", featured: true },
  { id: "branding-1", src: "/videos/branding-1.mp4" },
  { id: "branding-2", src: "/videos/branding-2.mp4" },
  { id: "branding-3", src: "/videos/branding-3.mp4" },
  { id: "webdev-1", src: "/videos/webdev-1.mp4" },
  { id: "webdev-2", src: "/videos/webdev-2.mp4" },
  { id: "webdev-3", src: "/videos/webdev-3.mp4" },
];

export function PortfolioSection() {
  const progressRef = useRef<HTMLDivElement>(null);

  // Drive progress bar from ScrollTrigger onUpdate (only fires during scroll)
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;

    // Wait for GSAP ScrollTrigger to initialize
    const timer = setTimeout(() => {
      const hScroll = document.querySelector("[data-h-scroll]");
      if (!hScroll) return;
      const triggers = ScrollTrigger.getAll();
      const st = triggers.find((t) => t.trigger === hScroll);
      if (st) {
        st.vars.onUpdate = (self: ScrollTrigger) => {
          el.style.transform = `scaleX(${self.progress})`;
        };
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="relative py-12 md:py-24 overflow-hidden">
      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8 mb-8 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50 mb-3 md:text-xs" data-fade>Selected Work</p>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-bold text-white" data-reveal>Featured Projects</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-[#ff6b35]" data-fade="0.3">
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="mt-4 h-px w-full origin-left bg-gradient-to-r from-[#ff6b35]/20 to-transparent" data-line />
      </div>

      {/* Horizontal scroll - GSAP driven */}
      <div data-h-scroll className="relative h-[45vh] min-h-[280px] md:h-[75vh] md:min-h-[500px]">
        <div data-h-track className="flex h-full items-center gap-3 md:gap-5 pl-4 md:pl-[max(2rem,calc((100vw-1100px)/2+1.25rem))] pr-[15vw] md:pr-[20vw]">
          {portfolioVideos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 w-[min(60vw,400px)] h-[2px] bg-white/[0.08] rounded-full overflow-hidden z-10">
          <div
            ref={progressRef}
            className="h-full bg-[#ff6b35] rounded-full origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: { id: string; src: string; featured?: boolean }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loadSrc, setLoadSrc] = useState(false);

  // Stagger reveal + lazy-load video src + play/pause based on visibility
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let revealTimer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Load the video source when first visible
          if (!loadSrc) setLoadSrc(true);
          if (!visible) {
            revealTimer = setTimeout(() => setVisible(true), index * 150);
          }
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.05, rootMargin: "200px" }
    );
    observer.observe(card);
    return () => {
      clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, [index, visible, loadSrc]);

  return (
    <div
      ref={cardRef}
      className={`shrink-0 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        width: video.featured
          ? "clamp(280px, 85vw, 560px)"
          : "clamp(240px, 75vw, 380px)",
      }}
    >
      <div className="group relative overflow-hidden rounded-lg md:rounded-xl border border-white/[0.06] transition-all duration-500 hover:border-[#ff6b35]/25 hover:shadow-[0_20px_80px_rgba(255,107,53,0.08)]">
        {/* 16:9 cinematic aspect */}
        <div className="relative overflow-hidden bg-white/[0.02]" style={{ paddingTop: "56.25%" }}>
          <video
            ref={videoRef}
            src={loadSrc ? video.src : undefined}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
