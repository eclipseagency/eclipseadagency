"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   SECTION: Portfolio - Video showreel horizontal scroll
   ═══════════════════════════════════════════════════════════ */
const portfolioVideos: { id: string; src: string; thumb: string }[] = [
  { id: "showreel", src: "/videos/showreel.mp4", thumb: "https://vumbnail.com/1051203598.jpg" },
  { id: "branding-1", src: "/videos/branding-1.mp4", thumb: "https://vumbnail.com/1144863160.jpg" },
  { id: "branding-2", src: "/videos/branding-2.mp4", thumb: "https://vumbnail.com/1144863671.jpg" },
  { id: "branding-3", src: "/videos/branding-3.mp4", thumb: "https://vumbnail.com/1147623451.jpg" },
  { id: "webdev-1", src: "/videos/webdev-1.mp4", thumb: "https://vumbnail.com/1144880936.jpg" },
  { id: "webdev-2", src: "/videos/webdev-2.mp4", thumb: "https://vumbnail.com/1144881841.jpg" },
  { id: "webdev-3", src: "/videos/webdev-3.mp4", thumb: "https://vumbnail.com/1054176209.jpg" },
];

export function PortfolioSection() {
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

      {/* Horizontal scroll - GSAP driven on all screen sizes */}
      <div data-h-scroll className="relative h-[60vh] md:h-[70vh]">
        <div data-h-track className="flex h-full items-center gap-4 md:gap-8 pl-5 md:pl-[max(2rem,calc((100vw-1100px)/2+1.25rem))] pr-[30vw] md:pr-[20vw]">
          {portfolioVideos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: (typeof portfolioVideos)[number]; index: number }) {
  const [activated, setActivated] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Activate cards with stagger when portfolio section scrolls into view
  useEffect(() => {
    const section = document.getElementById("portfolio");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setActivated(true), index * 300);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div className="block shrink-0 group" onClick={() => setActivated(true)}>
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-[#ff6b35]/20 hover:shadow-[0_20px_80px_rgba(255,107,53,0.1)]"
        style={{ width: "min(55vw, 400px)" }}
      >
        {/* Uniform 1:1 square aspect for all cards */}
        <div className="relative overflow-hidden bg-white/[0.02]" style={{ paddingTop: "100%" }}>
          {/* Thumbnail - visible until video plays */}
          <img
            src={video.thumb}
            alt=""
            className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          />

          {/* Play icon overlay on thumbnail */}
          {!videoReady && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                {activated ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
              </div>
            </div>
          )}

          {/* Local video */}
          {activated && (
            <video
              src={video.src}
              autoPlay muted loop playsInline
              onPlaying={() => setVideoReady(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
