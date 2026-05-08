"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none select-none"
      style={{
        opacity: visible ? 0.4 : 0,
        transition: "opacity 0.7s ease",
      }}
    >
      <span
        className="text-xs tracking-widest text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        SCROLL
      </span>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path
          d="M8 0v16M1 10l7 8 7-8"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
