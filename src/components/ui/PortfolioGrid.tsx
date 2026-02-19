"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

export interface PortfolioProject {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = projects.map((p) => ({
    src: p.image,
    alt: p.title,
  }));

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + projects.length) % projects.length : null
      ),
    [projects.length]
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % projects.length : null
      ),
    [projects.length]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border text-left"
          >
            {/* Cover image */}
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-x-0 bottom-0 flex h-1/2 translate-y-full flex-col justify-center bg-black/60 px-5 py-4 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:translate-y-0 md:px-8 md:py-6">
              <h4 className="font-heading text-base font-bold capitalize text-white md:text-xl">
                {project.title}
              </h4>
              <p className="mt-2 hidden text-sm leading-relaxed text-white/80 md:line-clamp-3 md:block">
                {project.description}
              </p>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider text-primary md:text-sm">
                View Project &rsaquo;
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
