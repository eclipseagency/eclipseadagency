"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/data/site";

/* ═══════════════════════════════════════════════════════
   Portfolio showcase items
   ═══════════════════════════════════════════════════════ */
const portfolioVideos = [
  { id: "v1", src: "/videos/portfolio-1.mp4", label: "Brand Identity" },
  { id: "v2", src: "/videos/portfolio-2.mp4", label: "Social Media" },
  { id: "v3", src: "/videos/portfolio-3.mp4", label: "Web Design" },
  { id: "v4", src: "/videos/portfolio-4.mp4", label: "Logo Animation" },
  { id: "v5", src: "/videos/portfolio-5.mp4", label: "Digital Campaign" },
  { id: "v6", src: "/videos/portfolio-6.mp4", label: "Brand Story" },
  { id: "v7", src: "/videos/portfolio-7.mp4", label: "Visual Identity" },
  { id: "v8", src: "/videos/portfolio-8.mp4", label: "Motion Design" },
];

/* ═══════════════════════════════════════════════════════
   Video Card
   ═══════════════════════════════════════════════════════ */
function VideoCard({
  video,
  index,
  tall = false,
}: {
  video: (typeof portfolioVideos)[number];
  index: number;
  tall?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoaded(true);
          if (window.matchMedia("(max-width: 768px)").matches) {
            videoRef.current?.play().catch(() => {});
            setPlaying(true);
          }
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.01, rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseEnter = useCallback(() => {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    videoRef.current?.pause();
    setPlaying(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: tall ? "130%" : "100%" }}
      >
        <video
          ref={videoRef}
          src={loaded ? video.src : undefined}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Dark overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            playing ? "bg-black/10" : "bg-black/40"
          }`}
        />

        {/* Play ring */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
            playing ? "opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/[0.08] backdrop-blur-md transition-all duration-300 group-hover:border-[#ff6b35]/60 group-hover:bg-[#ff6b35]/20 group-hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="ml-0.5 drop-shadow-lg">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md border border-white/[0.08]">
            {video.label}
          </span>
        </div>

        {/* Number */}
        <div className="absolute bottom-4 right-5 z-10">
          <span className="font-heading text-[42px] font-bold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.12]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.06] transition-all duration-500 group-hover:border-[#ff6b35]/25 group-hover:shadow-[inset_0_0_40px_rgba(255,107,53,0.06)]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Brand Case Study Card
   ═══════════════════════════════════════════════════════ */
function BrandCard({
  item,
}: {
  item: (typeof portfolioItems)[number];
}) {
  const Wrapper = item.href ? Link : "div";
  const wrapperProps = item.href
    ? {
        href: item.href,
        target: item.target,
        rel: item.target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <div>
      {/* @ts-expect-error -- dynamic tag union */}
      <Wrapper {...wrapperProps} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-[#ff6b35]/20 hover:shadow-[0_20px_60px_rgba(255,107,53,0.06)]">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={1067}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              <span className="mb-2 self-start rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
                {item.category}
              </span>
              <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[#ff6b35] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-xs font-semibold uppercase tracking-wider">View Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Portfolio Grid — Bento Layout
   ═══════════════════════════════════════════════════════ */
interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

export function PortfolioGrid({ showCta = true }: PortfolioGridProps) {
  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">

        {/* ── Row 1: Featured + stacked + stats ── */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 md:grid-cols-12">
          {/* Big featured */}
          <div className="col-span-2 md:col-span-5">
            <VideoCard video={portfolioVideos[0]} index={0} tall />
          </div>
          {/* Two stacked */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-3 md:gap-4 lg:gap-5">
            <VideoCard video={portfolioVideos[1]} index={1} />
            <VideoCard video={portfolioVideos[2]} index={2} />
          </div>
          {/* Stats + video */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-3 md:gap-4 lg:gap-5">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ff6b35]/60">
                Since 2020
              </span>
              <h3 className="mt-2 font-heading text-4xl font-bold text-white md:text-5xl">
                50+
              </h3>
              <p className="mt-1 text-sm text-white/30">Projects Delivered</p>
              <div className="mt-5 space-y-3">
                {[
                  { name: "Branding", pct: 40 },
                  { name: "Motion & Video", pct: 30 },
                  { name: "Web & Apps", pct: 20 },
                  { name: "Social Media", pct: 10 },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-[11px] text-white/35 mb-1">
                      <span>{s.name}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#ff6b35]"
                        style={{ width: `${s.pct}%`, opacity: 0.3 + s.pct / 100 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <VideoCard video={portfolioVideos[3]} index={3} />
          </div>
        </div>

        {/* ── Marquee divider ── */}
        <div className="my-8 md:my-12 overflow-hidden">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, r) => (
              <div key={r} className="flex items-center gap-8 shrink-0">
                {["Branding", "Web Design", "Social Media", "Motion Graphics", "Digital Marketing", "3D Design", "Production", "Animation"].map((s) => (
                  <span key={`${r}-${s}`} className="flex items-center gap-4 text-white/[0.04] font-heading text-3xl md:text-5xl font-bold uppercase tracking-wider">
                    {s}
                    <svg width="16" height="16" viewBox="0 0 20 20" className="text-[#ff6b35]/20">
                      <circle cx="10" cy="10" r="4" fill="currentColor" />
                    </svg>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Alternating tall/square ── */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 md:grid-cols-4">
          <VideoCard video={portfolioVideos[4]} index={4} tall />
          <VideoCard video={portfolioVideos[5]} index={5} />
          <VideoCard video={portfolioVideos[6]} index={6} tall />
          <VideoCard video={portfolioVideos[7]} index={7} />
        </div>

        {/* ── Section divider ── */}
        <div className="my-14 md:my-20 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <div className="text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ff6b35]/50">
              Branding & Identity
            </span>
            <h3 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
              Case Studies
            </h3>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* ── Brand case studies ── */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 lg:grid-cols-4">
          {portfolioItems.map((item) => (
            <BrandCard key={item.id} item={item} />
          ))}
        </div>

        {/* ── CTA ── */}
        {showCta && (
          <div className="mt-20 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/[0.08] px-8 py-3.5 text-sm font-semibold text-[#ff6b35] transition-all duration-300 hover:bg-[#ff6b35] hover:text-white hover:shadow-[0_0_30px_rgba(255,107,53,0.25)]"
            >
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
