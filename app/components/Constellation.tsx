export default function Constellation({ className = "" }: { className?: string }) {
  // Orion-inspired constellation — customized star positions
  const stars = [
    { id: "s1",  x: 120, y: 30,  r: 3.5, glow: 10 },
    { id: "s2",  x: 200, y: 55,  r: 2.5, glow: 8  },
    { id: "s3",  x: 80,  y: 120, r: 2,   glow: 6  },
    { id: "s4",  x: 155, y: 145, r: 4,   glow: 14 }, // Alnitak
    { id: "s5",  x: 205, y: 155, r: 3,   glow: 10 }, // Alnilam
    { id: "s6",  x: 255, y: 148, r: 2.5, glow: 8  }, // Mintaka
    { id: "s7",  x: 100, y: 220, r: 4.5, glow: 16 }, // Betelgeuse
    { id: "s8",  x: 260, y: 210, r: 3.5, glow: 12 },
    { id: "s9",  x: 130, y: 290, r: 2,   glow: 6  },
    { id: "s10", x: 175, y: 310, r: 2.5, glow: 8  },
    { id: "s11", x: 220, y: 295, r: 2,   glow: 6  },
    { id: "s12", x: 85,  y: 360, r: 4,   glow: 14 }, // Rigel area
    { id: "s13", x: 270, y: 340, r: 3.5, glow: 12 },
  ];

  const lines = [
    ["s1", "s2"], ["s1", "s3"], ["s1", "s4"],
    ["s2", "s5"],
    ["s3", "s7"],
    ["s4", "s5"], ["s5", "s6"],
    ["s4", "s7"], ["s6", "s8"],
    ["s7", "s9"], ["s8", "s10"],
    ["s9", "s10"], ["s10", "s11"],
    ["s9", "s12"], ["s11", "s13"],
    ["s12", "s13"],
  ];

  const starMap = Object.fromEntries(stars.map((s) => [s.id, s]));

  return (
    <svg
      viewBox="0 0 360 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        {stars.map((s) => (
          <radialGradient key={`g-${s.id}`} id={`g-${s.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#aabbff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6677ff" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* Constellation lines */}
      {lines.map(([a, b], i) => {
        const sa = starMap[a];
        const sb = starMap[b];
        return (
          <line
            key={i}
            x1={sa.x} y1={sa.y}
            x2={sb.x} y2={sb.y}
            stroke="#8899ff"
            strokeWidth="0.7"
            strokeOpacity="0.35"
          />
        );
      })}

      {/* Stars with glow */}
      {stars.map((s) => (
        <g key={s.id}>
          <circle cx={s.x} cy={s.y} r={s.glow} fill={`url(#g-${s.id})`} />
          <circle cx={s.x} cy={s.y} r={s.r} fill="white" opacity="0.95" />
        </g>
      ))}
    </svg>
  );
}
