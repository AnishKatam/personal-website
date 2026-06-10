"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [loadMs, setLoadMs] = useState<number | null>(null);
  const [lcpMs, setLcpMs] = useState<number | null>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => setOpacity(Math.max(0, 1 - window.scrollY / 300));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav && nav.loadEventEnd > 0) setLoadMs(nav.loadEventEnd - nav.startTime);
    };


    //loadEventEnd fills in right after the load event
    const onLoad = () => setTimeout(measure, 0);
    if (document.readyState === "complete") measure();
    else window.addEventListener("load", onLoad, { once: true });

    let observer: PerformanceObserver | undefined;
    try {
      observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) setLcpMs(last.startTime);
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      //browser w/o lcp support
    }


    return () => {
      window.removeEventListener("load", onLoad);
      observer?.disconnect();
    };
  }, []);

  if (loadMs === null && lcpMs === null) return null;

  const sec = (ms: number) => `${(ms / 1000).toFixed(2)}s`;
  const hidden = opacity <= 0.05;

  return (
    <div
      className="fixed top-6 left-6 z-40 hidden lg:block select-none font-mono text-[11px] leading-relaxed"
      style={{ opacity, pointerEvents: "none", transition: "opacity 0.15s linear" }}
      aria-hidden={hidden}
    >
      <p className="text-zinc-500">Benchmark</p>
      {loadMs !== null && (
        <p className="text-zinc-400">
          loaded in <span className="text-white">{sec(loadMs)}</span>
        </p>
      )}
      {lcpMs !== null && (
        <p className="text-zinc-400">
          largest paint <span className="text-white">{sec(lcpMs)}</span>
        </p>
      )}
    </div>
  );
}
