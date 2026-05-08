"use client";

import { useEffect, useState } from "react";

export default function AwesomeBadge() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      setOpacity(Math.max(0, 1 - window.scrollY / 260));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-5 z-50 select-none"
      style={{
        opacity,
        transition: "opacity 0.2s ease",
        pointerEvents: opacity > 0.05 ? "auto" : "none",
        width: "78px",
        transformOrigin: "top center",
        animation: "badgeSway 6s ease-in-out infinite",
      }}
      aria-label="Most COOL Person — Certified 2026"
      title="Most COOL Person · Certified 2026"
    >
      {/* Lanyard string */}
      <div
        style={{
          width: "2px",
          height: "12px",
          margin: "0 auto",
          background:
            "linear-gradient(to bottom, rgba(150,170,255,0) 0%, rgba(150,170,255,0.55) 100%)",
        }}
      />

      {/* Metal eyelet ring */}
      <div
        style={{
          position: "relative",
          width: "13px",
          height: "13px",
          borderRadius: "50%",
          margin: "-1px auto 0",
          background:
            "radial-gradient(circle at 32% 28%, #5a6280 0%, #20232e 55%, #0a0c12 100%)",
          border: "1px solid rgba(160,180,230,0.35)",
          boxShadow:
            "inset 0 0 3px rgba(0,0,0,0.85), 0 0 5px rgba(120,150,255,0.18)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "3px",
            borderRadius: "50%",
            background: "#08090c",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
      </div>

      {/* Badge body */}
      <div
        style={{
          position: "relative",
          marginTop: "-1px",
          padding: "10px 8px 8px",
          borderRadius: "9px",
          background:
            "linear-gradient(180deg, #15151a 0%, #0b0b0e 50%, #0e0e12 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.55), 0 8px 22px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 18px rgba(100,140,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* corner blue glow accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(110,150,255,0.16), transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* corner rivets */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #6a7290, #1a1d28 80%)",
              boxShadow: "inset 0 0 1px rgba(0,0,0,0.8)",
              ...p,
            }}
          />
        ))}

        {/* Star insignia */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginBottom: "6px",
            marginTop: "1px",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            style={{
              filter:
                "drop-shadow(0 0 5px rgba(120,160,255,0.6)) drop-shadow(0 0 1px rgba(255,255,255,0.4))",
              animation: "badgeStarPulse 3.5s ease-in-out infinite",
            }}
          >
            <defs>
              <linearGradient id="awesomeStar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f4ff" />
                <stop offset="55%" stopColor="#aabbff" />
                <stop offset="100%" stopColor="#5a6cff" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.4l2.7 6.3 6.8.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.5 1.6-6.7L2.5 9.3l6.8-.6z"
              fill="url(#awesomeStar)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Top divider */}
        <div
          style={{
            height: "1px",
            margin: "0 4px 7px",
            background:
              "linear-gradient(to right, transparent, rgba(160,180,255,0.4), transparent)",
          }}
        />

        {/* Stacked title */}
        <div
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "0.18em",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "rgba(190,205,255,0.85)",
            }}
          >
            MOST
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 900,
              padding: "2px 0",
              background:
                "linear-gradient(135deg, #ffffff 0%, #aabbff 50%, #6677ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            COOL
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "rgba(190,205,255,0.85)",
            }}
          >
            PERSON
          </div>
        </div>

        {/* Bottom divider */}
        <div
          style={{
            height: "1px",
            margin: "7px 4px 5px",
            background:
              "linear-gradient(to right, transparent, rgba(160,180,255,0.22), transparent)",
          }}
        />

        {/* Certified line */}
        <div
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontSize: "6.5px",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textAlign: "center",
            color: "rgba(170,190,255,0.65)",
          }}
        >
          CERTIFIED · 2026
        </div>

        {/* Serial number */}
        <div
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: "6px",
            letterSpacing: "0.22em",
            textAlign: "center",
            color: "rgba(130,150,200,0.45)",
            marginTop: "2px",
          }}
        >
          NO. 001/∞
        </div>
      </div>
    </div>
  );
}
