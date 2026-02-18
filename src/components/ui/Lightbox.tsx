"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Counter */}
        <span className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-sm text-white/40 font-heading tracking-wider">
          {index + 1} / {images.length}
        </span>

        {/* Prev arrow */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-primary/40 hover:text-white md:left-8"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-primary/40 hover:text-white md:right-8"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Image */}
        <motion.div
          key={index}
          className="relative z-[1] mx-16 max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl md:mx-24"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={1400}
            height={900}
            unoptimized
            className="max-h-[85vh] w-auto object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
