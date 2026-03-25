"use client";

import { useRef, useState } from "react";

const portfolioVideos = [
  { id: "branding-1", src: "/videos/branding-1.mp4", label: "Branding" },
  { id: "branding-2", src: "/videos/branding-2.mp4", label: "Branding" },
  { id: "branding-3", src: "/videos/branding-3.mp4", label: "Branding" },
  { id: "webdev-1", src: "/videos/webdev-1.mp4", label: "Web Dev" },
  { id: "webdev-2", src: "/videos/webdev-2.mp4", label: "Web Dev" },
  { id: "webdev-3", src: "/videos/webdev-3.mp4", label: "Web Dev" },
];

function VideoCard({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleToggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border cursor-pointer"
      onClick={handleToggle}
    >
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Play overlay */}
        {!playing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}
        {/* Label */}
        <span className="absolute left-3 top-3 z-20 rounded-full border border-primary/30 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

export function VideoGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {portfolioVideos.map((video) => (
        <VideoCard key={video.id} src={video.src} label={video.label} />
      ))}
    </div>
  );
}
