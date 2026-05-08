"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  decay: number;
  trail: { x: number; y: number }[];
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const shootingStars: ShootingStar[] = [];
    let tick = 0;

    const spawnShootingStar = () => {
      const angle = (Math.random() * 30 + 10) * (Math.PI / 180);
      const speed = Math.random() * 12 + 8;
      const startX = Math.random() * canvas.width * 1.2 - canvas.width * 0.1;
      const startY = Math.random() * canvas.height * 0.5;

      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 120 + 60,
        opacity: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.012 + 0.008,
        trail: [],
      });
    };

    const draw = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle = Math.sin(tick * star.twinkleSpeed + star.twinkleOffset);
        const alpha = Math.max(0, star.opacity + twinkle * 0.2);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      if (tick % 55 === 0 && Math.random() < 0.7) spawnShootingStar();
      if (tick % 120 === 0 && Math.random() < 0.4) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.trail.push({ x: s.x, y: s.y });

        const maxTrailLen = Math.round(s.length / 6);
        if (s.trail.length > maxTrailLen) s.trail.shift();

        for (let t = 1; t < s.trail.length; t++) {
          const p = t / s.trail.length;
          const alpha = s.opacity * p * p;
          const width = p * 2.5;
          const prev = s.trail[t - 1];
          const cur = s.trail[t];

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(cur.x, cur.y);
          ctx.strokeStyle = `rgba(180, 210, 255, ${alpha * 0.3})`;
          ctx.lineWidth = width + 3;
          ctx.lineCap = "round";
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(cur.x, cur.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= s.decay;

        if (
          s.opacity <= 0 ||
          s.x > canvas.width + 50 ||
          s.y > canvas.height + 50
        ) {
          shootingStars.splice(i, 1);
        }
      }

      tick++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
