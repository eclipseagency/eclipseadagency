"use client";

import { useState } from "react";

interface ShowreelPlayerProps {
  vimeoUrl: string;
  thumbnailUrl: string;
  title?: string;
}

export function ShowreelPlayer({
  vimeoUrl,
  thumbnailUrl,
  title = "Showreel",
}: ShowreelPlayerProps) {
  const [activated, setActivated] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {/* Thumbnail - fades out once iframe is loaded */}
        <img
          src={thumbnailUrl}
          alt={title}
          className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${
            iframeReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />

        {/* Play button overlay */}
        {!iframeReady && (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() => setActivated(true)}
            className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              {activated ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </div>
          </button>
        )}

        {/* Vimeo iframe - only rendered after activation */}
        {activated && (
          <iframe
            src={vimeoUrl}
            loading="lazy"
            onLoad={() => {
              setTimeout(() => setIframeReady(true), 1200);
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
