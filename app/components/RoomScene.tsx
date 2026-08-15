"use client";

import { useEffect, useState } from "react";

const WIDE = "(min-width: 1280px)";

export default function RoomScene() {
  const [wide, setWide] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const onChange = () => setWide(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const onScroll = () => setOpacity(Math.max(0, 1 - window.scrollY / 300));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [wide]);

  if (!wide) return null;

  const hidden = opacity <= 0.05;
  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40"
      style={{
        opacity,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 0.15s linear",
      }}
      aria-hidden={hidden}
    >
      <iframe
        src="/room.html?embed=1"
        title="Minecraft room"
        className="w-[clamp(360px,25vw,480px)] h-[clamp(280px,19vw,370px)] border-0"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
