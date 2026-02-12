"use client";

export function WireframeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial mask to fade center so content stays readable */}
          <radialGradient id="wire-fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="wire-mask">
            <rect width="1440" height="900" fill="url(#wire-fade)" />
          </mask>
        </defs>

        <g mask="url(#wire-mask)" stroke="#ff6b35" fill="none" strokeWidth="0.7">
          {/* === Left side wireframe mesh === */}
          {/* Large angular shapes - left */}
          <path d="M0 0 L120 180 L0 320" opacity="0.12" />
          <path d="M0 0 L200 80 L120 180" opacity="0.1" />
          <path d="M200 80 L320 20 L280 160" opacity="0.08" />
          <path d="M120 180 L280 160 L200 300" opacity="0.1" />
          <path d="M0 320 L120 180 L200 300" opacity="0.09" />
          <path d="M200 300 L80 440 L0 320" opacity="0.11" />
          <path d="M200 300 L280 160 L380 280" opacity="0.08" />
          <path d="M80 440 L200 300 L260 460" opacity="0.1" />
          <path d="M0 500 L80 440 L0 320" opacity="0.09" />
          <path d="M0 500 L80 440 L160 560" opacity="0.11" />
          <path d="M80 440 L260 460 L160 560" opacity="0.08" />
          <path d="M260 460 L380 280 L420 420" opacity="0.07" />
          <path d="M260 460 L420 420 L360 560" opacity="0.09" />
          <path d="M160 560 L260 460 L360 560" opacity="0.1" />
          <path d="M0 680 L160 560 L80 750" opacity="0.09" />
          <path d="M160 560 L360 560 L280 700" opacity="0.08" />
          <path d="M0 680 L80 750 L0 900" opacity="0.1" />
          <path d="M80 750 L280 700 L200 860" opacity="0.09" />
          <path d="M0 900 L80 750 L200 860" opacity="0.11" />
          <path d="M200 860 L280 700 L400 800" opacity="0.08" />
          <path d="M200 860 L400 800 L320 900" opacity="0.09" />

          {/* Mid-left connectors */}
          <path d="M320 20 L480 60 L420 160" opacity="0.06" />
          <path d="M280 160 L420 160 L380 280" opacity="0.07" />
          <path d="M420 160 L480 60 L560 180" opacity="0.05" />
          <path d="M380 280 L420 160 L560 180" opacity="0.06" />
          <path d="M420 420 L560 180 L580 360" opacity="0.05" />
          <path d="M420 420 L580 360 L520 500" opacity="0.06" />
          <path d="M360 560 L520 500 L480 640" opacity="0.05" />
          <path d="M280 700 L360 560 L480 640" opacity="0.06" />
          <path d="M400 800 L480 640 L560 760" opacity="0.05" />
          <path d="M400 800 L560 760 L500 900" opacity="0.06" />

          {/* === Right side wireframe mesh === */}
          <path d="M1440 0 L1320 180 L1440 320" opacity="0.12" />
          <path d="M1440 0 L1240 80 L1320 180" opacity="0.1" />
          <path d="M1240 80 L1120 20 L1160 160" opacity="0.08" />
          <path d="M1320 180 L1160 160 L1240 300" opacity="0.1" />
          <path d="M1440 320 L1320 180 L1240 300" opacity="0.09" />
          <path d="M1240 300 L1360 440 L1440 320" opacity="0.11" />
          <path d="M1240 300 L1160 160 L1060 280" opacity="0.08" />
          <path d="M1360 440 L1240 300 L1180 460" opacity="0.1" />
          <path d="M1440 500 L1360 440 L1440 320" opacity="0.09" />
          <path d="M1440 500 L1360 440 L1280 560" opacity="0.11" />
          <path d="M1360 440 L1180 460 L1280 560" opacity="0.08" />
          <path d="M1180 460 L1060 280 L1020 420" opacity="0.07" />
          <path d="M1180 460 L1020 420 L1080 560" opacity="0.09" />
          <path d="M1280 560 L1180 460 L1080 560" opacity="0.1" />
          <path d="M1440 680 L1280 560 L1360 750" opacity="0.09" />
          <path d="M1280 560 L1080 560 L1160 700" opacity="0.08" />
          <path d="M1440 680 L1360 750 L1440 900" opacity="0.1" />
          <path d="M1360 750 L1160 700 L1240 860" opacity="0.09" />
          <path d="M1440 900 L1360 750 L1240 860" opacity="0.11" />
          <path d="M1240 860 L1160 700 L1040 800" opacity="0.08" />
          <path d="M1240 860 L1040 800 L1120 900" opacity="0.09" />

          {/* Mid-right connectors */}
          <path d="M1120 20 L960 60 L1020 160" opacity="0.06" />
          <path d="M1160 160 L1020 160 L1060 280" opacity="0.07" />
          <path d="M1020 160 L960 60 L880 180" opacity="0.05" />
          <path d="M1060 280 L1020 160 L880 180" opacity="0.06" />
          <path d="M1020 420 L880 180 L860 360" opacity="0.05" />
          <path d="M1020 420 L860 360 L920 500" opacity="0.06" />
          <path d="M1080 560 L920 500 L960 640" opacity="0.05" />
          <path d="M1160 700 L1080 560 L960 640" opacity="0.06" />
          <path d="M1040 800 L960 640 L880 760" opacity="0.05" />
          <path d="M1040 800 L880 760 L940 900" opacity="0.06" />

          {/* === Top edge shapes === */}
          <path d="M480 60 L620 0 L560 180" opacity="0.06" />
          <path d="M620 0 L780 0 L680 120" opacity="0.05" />
          <path d="M780 0 L960 60 L880 180" opacity="0.06" />
          <path d="M780 0 L820 0 L680 120" opacity="0.04" />

          {/* === Bottom edge shapes === */}
          <path d="M500 900 L620 780 L660 900" opacity="0.06" />
          <path d="M660 900 L780 820 L820 900" opacity="0.05" />
          <path d="M820 900 L780 820 L940 900" opacity="0.06" />
          <path d="M620 780 L780 820 L720 720" opacity="0.04" />

          {/* === Sparse center elements (very faint) === */}
          <path d="M580 360 L680 120 L880 180" opacity="0.03" />
          <path d="M580 360 L880 180 L860 360" opacity="0.03" />
          <path d="M580 360 L720 480 L860 360" opacity="0.03" />
          <path d="M520 500 L720 480 L580 360" opacity="0.03" />
          <path d="M920 500 L720 480 L860 360" opacity="0.03" />
          <path d="M480 640 L720 480 L520 500" opacity="0.03" />
          <path d="M960 640 L720 480 L920 500" opacity="0.03" />
          <path d="M620 780 L720 480 L480 640" opacity="0.02" />
          <path d="M780 820 L720 480 L960 640" opacity="0.02" />
        </g>
      </svg>
    </div>
  );
}
