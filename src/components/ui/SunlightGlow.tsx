/**
 * SunlightGlow — animated sun-ray overlay for dark sections.
 * Pure CSS animations, no JS runtime cost.
 * Renders four staggered light beams from the top that slowly drift, fade, and loop.
 */
export function SunlightGlow() {
  /*
   * Each ray is an absolutely-positioned gradient strip.
   * They differ in: width, horizontal position, rotation, blur, animation timing.
   * All beams originate from the top and fade towards the bottom.
   */
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Ray 1 — wide, left-centre */}
      <div
        className="absolute -top-[20%] left-[10%] h-[110%] w-[35%]"
        style={{
          background:
            "linear-gradient(195deg, rgba(255,107,53,0.07) 0%, rgba(255,140,80,0.03) 40%, transparent 75%)",
          filter: "blur(60px)",
          animation: "sunray-drift-1 14s ease-in-out infinite",
          transformOrigin: "top center",
        }}
      />

      {/* Ray 2 — narrow, right side */}
      <div
        className="absolute -top-[15%] right-[8%] h-[100%] w-[22%]"
        style={{
          background:
            "linear-gradient(200deg, rgba(255,107,53,0.06) 0%, rgba(247,147,30,0.025) 45%, transparent 70%)",
          filter: "blur(50px)",
          animation: "sunray-drift-2 18s ease-in-out 3s infinite",
          transformOrigin: "top center",
        }}
      />

      {/* Ray 3 — medium, centre-left */}
      <div
        className="absolute -top-[25%] left-[30%] h-[115%] w-[28%]"
        style={{
          background:
            "linear-gradient(190deg, rgba(255,120,60,0.05) 0%, rgba(255,107,53,0.02) 50%, transparent 80%)",
          filter: "blur(70px)",
          animation: "sunray-drift-3 22s ease-in-out 7s infinite",
          transformOrigin: "top center",
        }}
      />

      {/* Ray 4 — subtle, far right */}
      <div
        className="absolute -top-[10%] right-[25%] h-[95%] w-[18%]"
        style={{
          background:
            "linear-gradient(198deg, rgba(255,107,53,0.04) 0%, rgba(255,140,80,0.015) 40%, transparent 65%)",
          filter: "blur(55px)",
          animation: "sunray-drift-4 26s ease-in-out 11s infinite",
          transformOrigin: "top center",
        }}
      />

      {/* Top ambient wash — warm glow across the top edge */}
      <div
        className="absolute -top-[5%] left-0 h-[40%] w-full"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,107,53,0.045) 0%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
