export default function Planet({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        {/* Planet body gradient */}
        <radialGradient id="planetGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6b7fff" />
          <stop offset="35%" stopColor="#3a3fa8" />
          <stop offset="70%" stopColor="#1a1060" />
          <stop offset="100%" stopColor="#080520" />
        </radialGradient>

        {/* Atmosphere rim */}
        <radialGradient id="atmosphereGrad" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="transparent" />
          <stop offset="88%" stopColor="#5566ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7788ff" stopOpacity="0" />
        </radialGradient>

        {/* Ring gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8899ff" stopOpacity="0" />
          <stop offset="15%" stopColor="#aabbff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ccd4ff" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#ccd4ff" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#aabbff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8899ff" stopOpacity="0" />
        </linearGradient>

        {/* Inner ring shadow */}
        <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4455aa" stopOpacity="0" />
          <stop offset="20%" stopColor="#6677cc" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#8899ee" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#6677cc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4455aa" stopOpacity="0" />
        </linearGradient>

        {/* Highlight */}
        <radialGradient id="highlightGrad" cx="32%" cy="28%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <clipPath id="planetClip">
          <circle cx="160" cy="160" r="95" />
        </clipPath>
      </defs>

      {/* Outer glow */}
      <circle cx="160" cy="160" r="115" fill="#3344cc" opacity="0.06" />
      <circle cx="160" cy="160" r="108" fill="#4455dd" opacity="0.07" />
      <circle cx="160" cy="160" r="101" fill="#5566ee" opacity="0.08" />

      {/* Ring behind planet (bottom half) */}
      <ellipse cx="160" cy="175" rx="155" ry="22" fill="url(#ringGrad)" opacity="0.5" clipPath="url(#planetClip)" />

      {/* Planet body */}
      <circle cx="160" cy="160" r="95" fill="url(#planetGrad)" />

      {/* Surface bands */}
      <ellipse cx="160" cy="140" rx="88" ry="10" fill="#4a55c0" opacity="0.25" clipPath="url(#planetClip)" />
      <ellipse cx="160" cy="165" rx="90" ry="7" fill="#3a45b0" opacity="0.2" clipPath="url(#planetClip)" />
      <ellipse cx="160" cy="185" rx="85" ry="8" fill="#5060d0" opacity="0.18" clipPath="url(#planetClip)" />

      {/* Atmosphere rim */}
      <circle cx="160" cy="160" r="95" fill="url(#atmosphereGrad)" />

      {/* Highlight */}
      <circle cx="160" cy="160" r="95" fill="url(#highlightGrad)" />

      {/* Full ring in front (top half, above planet) */}
      <ellipse cx="160" cy="175" rx="155" ry="22" fill="url(#ringGrad)" opacity="0.85" />
      <ellipse cx="160" cy="175" rx="140" ry="16" fill="url(#ringGrad2)" opacity="0.6" />

      {/* Small moon */}
      <circle cx="272" cy="108" r="10" fill="#b0b8e8" opacity="0.85" />
      <circle cx="272" cy="108" r="10" fill="url(#highlightGrad)" opacity="0.5" />
    </svg>
  );
}
