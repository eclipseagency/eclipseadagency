"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/data/site";

/* ═══════════════════════════════════════════════════════
   Portfolio video items — showcase reels across all services
   ═══════════════════════════════════════════════════════ */
const portfolioVideos = [
  { id: "v1", src: "/videos/portfolio-1.mp4" },
  { id: "v2", src: "/videos/portfolio-2.mp4" },
  { id: "v3", src: "/videos/portfolio-3.mp4" },
  { id: "v4", src: "/videos/portfolio-4.mp4" },
  { id: "v5", src: "/videos/portfolio-5.mp4" },
  { id: "v6", src: "/videos/portfolio-6.mp4" },
  { id: "v7", src: "/videos/portfolio-7.mp4" },
  { id: "v8", src: "/videos/portfolio-8.mp4" },
];

/* ═══════════════════════════════════════════════════════
   Video Card - plays on hover, lazy loads
   ═══════════════════════════════════════════════════════ */
function VideoCard({
  video,
  index,
}: {
  video: (typeof portfolioVideos)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoaded(true);
          if (!visible) {
            setTimeout(() => setVisible(true), index * 80);
          }
          if (window.matchMedia("(max-width: 768px)").matches) {
            videoRef.current?.play().catch(() => {});
            setPlaying(true);
          }
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, visible]);

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
      className={`group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden" style={{ paddingTop: "125%" }}>
        <video
          ref={videoRef}
          src={loaded ? video.src : undefined}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Play indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-500 group-hover:border-[#ff6b35]/20 group-hover:shadow-[inset_0_0_30px_rgba(255,107,53,0.05)]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Branding Card - image with overlay
   ═══════════════════════════════════════════════════════ */
function BrandCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          setTimeout(() => setVisible(true), index * 80);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, visible]);

  const Wrapper = item.href ? Link : "div";
  const wrapperProps = item.href
    ? {
        href: item.href,
        target: item.target,
        rel: item.target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* @ts-expect-error -- dynamic tag union */}
      <Wrapper {...wrapperProps} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-[#ff6b35]/20 hover:shadow-[0_20px_60px_rgba(255,107,53,0.06)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              <span className="mb-2 self-start rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
                {item.category}
              </span>
              <h3 className="font-heading text-lg font-bold text-white md:text-xl">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Portfolio Grid
   ═══════════════════════════════════════════════════════ */
interface PortfolioGridProps {
  limit?: number;
  showCta?: boolean;
}

export function PortfolioGrid({ showCta = true }: PortfolioGridProps) {
  return (
    <section className="relative py-16 md:py-24">
      {/* Video Showcase */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 mb-16 md:mb-24">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-5 w-[2px] rounded-full bg-[#ff6b35]" />
          <h3 className="font-heading text-lg font-semibold text-white/80">
            Our Work
          </h3>
          <span className="text-sm text-white/20">{portfolioVideos.length} reels</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {portfolioVideos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>

      {/* Branding Case Studies */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-5 w-[2px] rounded-full bg-[#ff6b35]" />
          <h3 className="font-heading text-lg font-semibold text-white/80">
            Case Studies
          </h3>
          <span className="text-sm text-white/20">{portfolioItems.length} projects</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {portfolioItems.map((item, i) => (
            <BrandCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      {showCta && (
        <div className="mx-auto max-w-7xl px-5 md:px-8 mt-20 text-center">
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
    </section>
  );
}
