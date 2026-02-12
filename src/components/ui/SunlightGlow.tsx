/**
 * SunlightGlow — volumetric sun-ray overlay for dark sections.
 *
 * Renders bright conic light beams radiating from the top-centre,
 * matching the reference visual of warm amber light shafts through haze.
 * Pure CSS animations — zero JS runtime cost.
 */
export function SunlightGlow() {
  /**
   * Each ray is a tall narrow div with a linear-gradient that goes from
   * bright warm orange at the top to transparent at the bottom.
   * They are positioned at the top-centre of the section and rotated to
   * fan outward like real sunlight beams through atmosphere.
   *
   * The CSS custom properties --ray-angle and --ray-peak are used by the
   * keyframe animations defined in globals.css so each ray can use the
   * same animation with different angles and intensities.
   */

  const rays = [
    // [left%, angle, width, height%, blur, opacity-peak, duration, delay, animation]
    { left: "50%", angle: -32, w: 120, h: 110, blur: 8,  peak: 0.18, dur: 16, del: 0,  anim: "sunray-1" },
    { left: "50%", angle: -18, w: 90,  h: 105, blur: 12, peak: 0.22, dur: 14, del: 2,  anim: "sunray-2" },
    { left: "50%", angle: -5,  w: 140, h: 115, blur: 6,  peak: 0.25, dur: 18, del: 1,  anim: "sunray-3" },
    { left: "50%", angle: 8,   w: 100, h: 110, blur: 10, peak: 0.2,  dur: 15, del: 4,  anim: "sunray-1" },
    { left: "50%", angle: 20,  w: 80,  h: 100, blur: 14, peak: 0.16, dur: 20, del: 6,  anim: "sunray-2" },
    { left: "50%", angle: 34,  w: 110, h: 108, blur: 9,  peak: 0.14, dur: 17, del: 8,  anim: "sunray-3" },
    { left: "50%", angle: -42, w: 70,  h: 95,  blur: 16, peak: 0.10, dur: 22, del: 10, anim: "sunray-1" },
    { left: "50%", angle: 46,  w: 60,  h: 90,  blur: 18, peak: 0.08, dur: 24, del: 12, anim: "sunray-2" },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Top source glow — bright warm spot where rays originate */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "-12%",
          width: "80%",
          height: "45%",
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(255,130,60,0.14) 0%, rgba(255,107,53,0.06) 40%, transparent 75%)",
          filter: "blur(30px)",
          animation: "sunray-ambient 12s ease-in-out infinite",
        }}
      />

      {/* Light beams */}
      {rays.map((ray, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: ray.left,
            top: "-5%",
            width: `${ray.w}px`,
            height: `${ray.h}%`,
            marginLeft: `${-ray.w / 2}px`,
            background: `linear-gradient(180deg, rgba(255,140,60,0.9) 0%, rgba(255,107,53,0.4) 25%, rgba(255,107,53,0.08) 60%, transparent 85%)`,
            filter: `blur(${ray.blur}px)`,
            transformOrigin: "top center",
            ["--ray-angle" as string]: `${ray.angle}deg`,
            ["--ray-peak" as string]: ray.peak,
            animation: `${ray.anim} ${ray.dur}s ease-in-out ${ray.del}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Secondary ambient haze across top */}
      <div
        className="absolute left-0 top-0 h-[55%] w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,120,50,0.06) 0%, rgba(255,107,53,0.02) 40%, transparent 100%)",
          filter: "blur(40px)",
          animation: "sunray-ambient 16s ease-in-out 3s infinite",
        }}
      />
    </div>
  );
}
