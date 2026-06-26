"use client";

import { useEffect, useState } from "react";

//fades out as you scroll, same as the skills card
export default function RoomScene() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => setOpacity(Math.max(0, 1 - window.scrollY / 300));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = opacity <= 0.05;
  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
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
