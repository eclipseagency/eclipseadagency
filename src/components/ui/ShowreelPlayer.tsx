"use client";

import { useState, useRef } from "react";

interface ShowreelPlayerProps {
  vimeoUrl?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  title?: string;
}

export function ShowreelPlayer({
  vimeoUrl,
  videoUrl,
  thumbnailUrl,
  title = "Showreel",
}: ShowreelPlayerProps) {
  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setActivated(true);
    if (videoUrl && videoRef.current) {
      videoRef.current.play();
      setReady(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {/* Thumbnail - fades out once media is loaded */}
        <img
          src={thumbnailUrl}
          alt={title}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />

        {/* Play button overlay */}
        {!ready && (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={handlePlay}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              {activated && !ready ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </div>
          </button>
        )}

        {/* Local video */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
          />
        )}

        {/* Vimeo iframe fallback - only rendered after activation */}
        {!videoUrl && activated && (
          <iframe
            src={vimeoUrl}
            loading="lazy"
            onLoad={() => {
              setTimeout(() => setReady(true), 1200);
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            className="absolute inset-0 h-full w-full border-0"
            title={title}
          />
        )}
      </div>
    </div>
  );
}
