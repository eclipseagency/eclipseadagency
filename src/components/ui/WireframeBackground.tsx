/*
 * Cinematic Background
 *
 * Deep black canvas with a soft, diffused golden glow (#c28a14)
 * emanating from the bottom-right / lower-center area.
 * Subtle noise grain overlay for a premium cinematic feel.
 * Pure CSS — zero JS, zero animation frames, maximum performance.
 */

export function WireframeBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Layer 1: Deep black base ── */}
      <div className="absolute inset-0 bg-black" />

      {/* ── Layer 2: Primary golden glow — bottom-right / lower-center ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 65% 85%, rgba(194,138,20,0.18) 0%, rgba(194,138,20,0.06) 35%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 55% 90%, rgba(194,138,20,0.12) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Layer 3: Secondary softer spread — fills more area with very faint warmth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 60% 95%, rgba(194,138,20,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 75% 75%, rgba(194,138,20,0.04) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Layer 4: Noise grain texture ── */}
      <div className="page-hero-noise absolute inset-0" style={{ opacity: 0.035 }} />
    </div>
  );
}
