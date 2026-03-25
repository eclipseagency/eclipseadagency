"use client";

const portfolioVideos = [
  { id: "motion-reel", src: "/videos/motion-reel.mp4" },
  { id: "branding-1", src: "/videos/branding-1.mp4" },
  { id: "branding-2", src: "/videos/branding-2.mp4" },
  { id: "branding-3", src: "/videos/branding-3.mp4" },
  { id: "webdev-1", src: "/videos/webdev-1.mp4" },
  { id: "webdev-2", src: "/videos/webdev-2.mp4" },
  { id: "webdev-3", src: "/videos/webdev-3.mp4" },
];

export function VideoGrid() {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
      {portfolioVideos.map((video) => (
        <div
          key={video.id}
          className="relative overflow-hidden rounded-2xl border border-border"
        >
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <video
              src={video.src}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      ))}
    </div>
  );
}
