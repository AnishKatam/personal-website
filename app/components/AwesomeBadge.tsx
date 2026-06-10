"use client";

import { useEffect, useState } from "react";

const BADGE_RADIUS = "14px";

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
        width: "112px",
        transformOrigin: "top center",
        animation: "badgeSway 6s ease-in-out infinite",
      }}
      aria-label="Best Dev 2026 — Certified Credential"
      title="Uhhhhh ... just trust me on this one"
    >
      <svg
        viewBox="0 0 80 22"
        width="80"
        height="22"
        style={{ display: "block", margin: "0 auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="lanyardCord" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(150,170,255,0)" />
            <stop offset="100%" stopColor="rgba(160,185,255,0.7)" />
          </linearGradient>
        </defs>
  
        <path
          d="M40 0 Q 36 12, 22 20"
          stroke="url(#lanyardCord)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
     
        <path
          d="M40 0 Q 44 12, 58 20"
          stroke="url(#lanyardCord)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        
        <circle cx="40" cy="1.5" r="2" fill="#1a1d28" stroke="rgba(180,200,255,0.5)" strokeWidth="0.5" />
      </svg>

      
      <div
        style={{
          position: "relative",
          marginTop: "-4px",
          padding: "2px",
          borderRadius: BADGE_RADIUS,
          background:
            "linear-gradient(135deg, rgba(180,200,255,0.45) 0%, rgba(80,90,120,0.15) 30%, rgba(255,255,255,0.05) 50%, rgba(80,90,120,0.15) 70%, rgba(180,200,255,0.4) 100%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.65))",
        }}
      >
      
        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            background:
              "linear-gradient(180deg, #15171f 0%, #0a0b10 45%, #0d0e14 100%)",
            padding: "12px 8px 9px",
            overflow: "hidden",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 22px rgba(80,120,220,0.08)",
          }}
        >

          <svg
            viewBox="0 0 100 140"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.18,
              pointerEvents: "none",
            }}
          >
            <g stroke="rgba(140,170,255,0.7)" strokeWidth="0.4" fill="none">
              <path d="M0 20 L 30 20 L 35 25 L 70 25 L 75 20 L 100 20" />
              <path d="M0 60 L 20 60 L 25 55 L 60 55 L 65 60 L 100 60" />
              <path d="M0 100 L 40 100 L 45 105 L 80 105 L 85 100 L 100 100" />
              <path d="M20 0 L 20 12 L 25 17 L 25 35" />
              <path d="M80 140 L 80 128 L 75 123 L 75 110" />
              <path d="M50 30 L 50 50" />
              <path d="M50 80 L 50 100" />
            </g>
            <g fill="rgba(140,170,255,0.85)">
              <circle cx="35" cy="25" r="0.9" />
              <circle cx="70" cy="25" r="0.9" />
              <circle cx="25" cy="55" r="0.9" />
              <circle cx="65" cy="55" r="0.9" />
              <circle cx="45" cy="105" r="0.9" />
              <circle cx="80" cy="105" r="0.9" />
              <circle cx="50" cy="50" r="1.2" />
              <circle cx="50" cy="80" r="1.2" />
            </g>
          </svg>

        
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% -10%, rgba(110,150,255,0.22), transparent 60%)",
              pointerEvents: "none",
            }}
          />
             
          <div
            style={{
              position: "absolute",
              left: "4%",
              right: "4%",
              top: 0,
              height: "8px",
              background:
                "linear-gradient(180deg, transparent, rgba(140,180,255,0.45), transparent)",
              filter: "blur(1px)",
              pointerEvents: "none",
              animation: "badgeScanline 5s linear infinite",
            }}
          />

  
          {[
            { top: 6, left: 6, borderTop: 1, borderLeft: 1 },
            { top: 6, right: 6, borderTop: 1, borderRight: 1 },
            { bottom: 6, left: 6, borderBottom: 1, borderLeft: 1 },
            { bottom: 6, right: 6, borderBottom: 1, borderRight: 1 },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                borderColor: "rgba(170,195,255,0.6)",
                borderStyle: "solid",
                borderWidth: 0,
                ...p,
              }}
            />
          ))}

    

         
          <div
            style={{
              position: "relative",
              width: "44px",
              height: "44px",
              margin: "0 auto 6px",
              animation: "badgeChipGlow 3.5s ease-in-out infinite",
            }}
          >
            <svg
              viewBox="0 0 60 60"
              width="44"
              height="44"
              style={{
                position: "absolute",
                inset: 0,
                animation: "badgeChipSpin 18s linear infinite",
              }}
            >
              <defs>
                <linearGradient id="chipRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#dfe7ff" />
                  <stop offset="50%" stopColor="#6f82ff" />
                  <stop offset="100%" stopColor="#2a2f55" />
                </linearGradient>
              </defs>
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="url(#chipRing)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
           
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="30"
                  y1="2"
                  x2="30"
                  y2="6"
                  stroke="rgba(180,200,255,0.85)"
                  strokeWidth="0.8"
                  transform={`rotate(${deg} 30 30)`}
                />
              ))}
            </svg>

          
            <svg
              viewBox="0 0 60 60"
              width="44"
              height="44"
              style={{ position: "absolute", inset: 0 }}
            >
              <defs>
                <linearGradient id="hexFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b1f2c" />
                  <stop offset="100%" stopColor="#070810" />
                </linearGradient>
                <linearGradient id="hexStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#a8b8ff" />
                  <stop offset="100%" stopColor="#5867ff" />
                </linearGradient>
                <linearGradient id="codeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#8aa0ff" />
                </linearGradient>
              </defs>
            
              <polygon
                points="30,12 46,21 46,39 30,48 14,39 14,21"
                fill="url(#hexFill)"
                stroke="url(#hexStroke)"
                strokeWidth="1.2"
              />
            
              <g
                fill="none"
                stroke="url(#codeGrad)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20,30 25,35" />
                <polyline points=" 40,30 35,35" />
              </g>
            </svg>
          </div>

         
          <div
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              textAlign: "center",
              lineHeight: 1,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.18em",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #c5d2ff 45%, #6677ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 12px rgba(120,160,255,0.25)",
              }}
            >
              BEST
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.22em",
                marginTop: "1px",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #c5d2ff 45%, #6677ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DEV
            </div>
          </div>

        
          <div
            style={{
              marginTop: "6px",
              padding: "2px 0",
              borderTop: "1px solid rgba(160,185,255,0.15)",
              borderBottom: "1px solid rgba(160,185,255,0.15)",
              background:
                "linear-gradient(90deg, rgba(80,110,200,0) 0%, rgba(80,110,200,0.18) 50%, rgba(80,110,200,0) 100%)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.32em",
                textAlign: "center",
                paddingLeft: "0.32em",
                color: "#e6ecff",
                textShadow:
                  "0 0 8px rgba(140,180,255,0.55), 0 0 1px rgba(255,255,255,0.6)",
              }}
            >
              2026
            </div>
          </div>

       

        </div>
      </div>
    </div>
  );
}
