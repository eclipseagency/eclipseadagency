"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + images.length) % images.length : null
      ),
    [images.length]
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % images.length : null
      ),
    [images.length]
  );

  return (
    <>
      <div className="relative">
        {/* Scroll track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-[80%] flex-shrink-0 snap-center sm:w-[45%] lg:w-[32%]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block w-full overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scroll("left")}
          className={`absolute -left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0c11]/90 text-white backdrop-blur-sm transition-opacity duration-300 hover:border-primary/40 ${
            canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scroll("right")}
          className={`absolute -right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0c11]/90 text-white backdrop-blur-sm transition-opacity duration-300 hover:border-primary/40 ${
            canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
