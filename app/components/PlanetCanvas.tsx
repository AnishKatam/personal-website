"use client";

import { useEffect, useRef } from "react";

export default function PlanetCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const S = 600;
    canvas.width = S;
    canvas.height = S;
    const cx = S / 2;
    const cy = S / 2;
    const r = S * 0.29;
    const RING_RY_RATIO = 0.13;

    // ── Procedural panoramic cloud texture (generated once) ─────────────
    const TEX_W = 768;
    const TEX_H = 256;
    const tex = document.createElement("canvas");
    tex.width = TEX_W;
    tex.height = TEX_H;
    const tctx = tex.getContext("2d")!;

    // Value-noise grid (wraps in x for seamless rotation)
    const NW = 192;
    const NH = 96;
    const grid = new Float32Array(NW * NH);
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const x0 = ((xi % NW) + NW) % NW;
      const x1 = (x0 + 1) % NW;
      const y0 = Math.max(0, Math.min(NH - 1, yi));
      const y1 = Math.max(0, Math.min(NH - 1, yi + 1));
      const a = grid[y0 * NW + x0];
      const b = grid[y0 * NW + x1];
      const c = grid[y1 * NW + x0];
      const d = grid[y1 * NW + x1];
      const u = smooth(xf);
      const v = smooth(yf);
      return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
    };
    const fbm = (x: number, y: number) => {
      let v = 0;
      let amp = 0.5;
      let freq = 1;
      for (let o = 0; o < 4; o++) {
        v += noise(x * freq, y * freq) * amp;
        amp *= 0.5;
        freq *= 2;
      }
      return v;
    };

    const img = tctx.createImageData(TEX_W, TEX_H);
    for (let py = 0; py < TEX_H; py++) {
      const v = py / TEX_H;
      const lat = (v - 0.5) * Math.PI;

      // Layered latitude band pattern (gas-giant style stripes)
      const bandFreq = 8.5;
      const bandPattern =
        Math.sin(lat * bandFreq) * 0.30 +
        Math.sin(lat * bandFreq * 1.7 + 0.6) * 0.14 +
        Math.sin(lat * bandFreq * 0.45 + 1.2) * 0.18;

      // Polar darkening (cosine falloff)
      const polar = Math.pow(Math.cos(lat * 0.92), 0.7);

      for (let px = 0; px < TEX_W; px++) {
        const u = px / TEX_W;
        // Horizontal warp — bands stretch zonally like Jupiter
        const wx = (fbm(u * NW * 0.6, v * NH * 1.4) - 0.5) * 6;
        const wy = (fbm(u * NW * 0.4 + 7.3, v * NH * 1.0 + 3.1) - 0.5) * 1.2;
        const cloud =
          fbm(u * NW * 1.4 + wx, v * NH * 4.5 + wy) * 0.7 +
          fbm(u * NW * 4.5 + wx * 2, v * NH * 8) * 0.3;

        let intensity = 0.46 + bandPattern + (cloud - 0.5) * 0.55;
        intensity = Math.max(0, Math.min(1, intensity));
        intensity *= polar;

        // Palette: deep navy → indigo-blue → bright cyan-white. NO purple.
        let R: number, G: number, B: number;
        if (intensity < 0.35) {
          const t = intensity / 0.35;
          R = 4 + (22 - 4) * t;
          G = 8 + (44 - 8) * t;
          B = 22 + (110 - 22) * t;
        } else if (intensity < 0.7) {
          const t = (intensity - 0.35) / 0.35;
          R = 22 + (95 - 22) * t;
          G = 44 + (140 - 44) * t;
          B = 110 + (215 - 110) * t;
        } else {
          const t = (intensity - 0.7) / 0.3;
          R = 95 + (215 - 95) * t;
          G = 140 + (230 - 140) * t;
          B = 215 + (255 - 215) * t;
        }

        const idx = (py * TEX_W + px) * 4;
        img.data[idx] = R;
        img.data[idx + 1] = G;
        img.data[idx + 2] = B;
        img.data[idx + 3] = 255;
      }
    }
    tctx.putImageData(img, 0, 0);

    // ── Ring particles (denser, with a Cassini-style gap) ──────────────
    const ringParticles = Array.from({ length: 850 }, () => {
      // Skip the gap region (band 2)
      let band = Math.floor(Math.random() * 5);
      if (band === 2) band = Math.random() < 0.5 ? 1 : 3;
      const bandR = r * (1.26 + band * 0.13);
      return {
        angle: Math.random() * Math.PI * 2,
        dist: bandR * (1 + (Math.random() - 0.5) * 0.09),
        size: Math.random() * 1.5 + 0.25,
        opacity: Math.random() * 0.55 + 0.18,
        speed: (Math.random() * 0.32 + 0.05) * 0.001,
        band,
      };
    });

    // Offscreen sphere composition canvas
    const sphereCanvas = document.createElement("canvas");
    const SX = Math.ceil(r * 2) + 4;
    const SY = Math.ceil(r * 2) + 4;
    sphereCanvas.width = SX;
    sphereCanvas.height = SY;
    const sctx = sphereCanvas.getContext("2d")!;

    let animId: number;
    let tick = 0;

    const drawRingHalf = (front: boolean) => {
      const ringRY = r * RING_RY_RATIO;

      // Five rings with a gap (band 2 skipped) — varying brightness
      const ringDefs = [
        { rMul: 1.26, alphaF: 0.50, alphaB: 0.20, w: 1.8 },
        { rMul: 1.39, alphaF: 0.40, alphaB: 0.16, w: 1.4 },
        // gap (1.52) intentionally skipped
        { rMul: 1.65, alphaF: 0.34, alphaB: 0.12, w: 1.0 },
        { rMul: 1.78, alphaF: 0.22, alphaB: 0.08, w: 0.8 },
        { rMul: 1.90, alphaF: 0.13, alphaB: 0.05, w: 0.6 },
      ];

      for (const rd of ringDefs) {
        const bandR = r * rd.rMul;
        const alpha = front ? rd.alphaF : rd.alphaB;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ringRY / bandR);
        ctx.beginPath();
        if (front) ctx.arc(0, 0, bandR, 0, Math.PI, false);
        else ctx.arc(0, 0, bandR, Math.PI, 0, true);
        ctx.restore();

        ctx.strokeStyle = `rgba(195, 220, 255, ${alpha})`;
        ctx.lineWidth = rd.w;
        ctx.stroke();
      }

      // Particles
      for (const p of ringParticles) {
        if (front) p.angle += p.speed;
        const sinA = Math.sin(p.angle);
        if ((front && sinA >= 0) || (!front && sinA < 0)) {
          const px = cx + Math.cos(p.angle) * p.dist;
          const py = cy + sinA * ringRY;
          const alphaScale = front ? 0.85 : 0.32;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (front ? 1 : 0.55), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 235, 255, ${p.opacity * alphaScale})`;
          ctx.fill();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, S, S);

      // Outer atmospheric haze
      const haze = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.85);
      haze.addColorStop(0, "rgba(80, 130, 240, 0.20)");
      haze.addColorStop(0.5, "rgba(40, 80, 200, 0.07)");
      haze.addColorStop(1, "transparent");
      ctx.fillStyle = haze;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.85, 0, Math.PI * 2);
      ctx.fill();

      // Back ring half
      drawRingHalf(false);

      // ── Render planet body to offscreen sphere canvas ─────────────────
      sctx.clearRect(0, 0, SX, SY);
      const sphereCx = SX / 2;
      const sphereCy = SY / 2;

      // 1) Sphere-project the panoramic texture onto the disc, row-by-row.
      // Each row's chord width comes from circle math; we sample a 180°
      // visible-hemisphere slice (sliceW) of the strip, scrolled by tick.
      const scrollPx = ((tick * 0.42) % TEX_W + TEX_W) % TEX_W;
      const sliceW = TEX_W / 2;
      const ROW_STEP = 1;

      for (let py = -Math.floor(r); py <= Math.floor(r); py += ROW_STEP) {
        const norm = py / r;
        if (norm <= -1 || norm >= 1) continue;
        const chord = Math.sqrt(1 - norm * norm);
        const destW = chord * r * 2;
        if (destW < 1) continue;

        // Spherical latitude → texture v
        const lat = Math.asin(norm);
        const tv = (lat / Math.PI + 0.5) * TEX_H;
        const tvi = Math.max(0, Math.min(TEX_H - 1, Math.floor(tv)));

        const dx = sphereCx - destW / 2;
        const dy = sphereCy + py;

        if (scrollPx + sliceW <= TEX_W) {
          sctx.drawImage(tex, scrollPx, tvi, sliceW, 1, dx, dy, destW, ROW_STEP);
        } else {
          const firstW = TEX_W - scrollPx;
          const secondW = sliceW - firstW;
          const splitW = (firstW / sliceW) * destW;
          sctx.drawImage(tex, scrollPx, tvi, firstW, 1, dx, dy, splitW, ROW_STEP);
          sctx.drawImage(tex, 0, tvi, secondW, 1, dx + splitW, dy, destW - splitW, ROW_STEP);
        }
      }

      // 2) Lighting & weather overlays inside the sphere clip
      sctx.save();
      sctx.beginPath();
      sctx.arc(sphereCx, sphereCy, r, 0, Math.PI * 2);
      sctx.clip();

      // Storm — cyclonic eddy, cyan/white instead of purple
      const stx = sphereCx + r * 0.18;
      const sty = sphereCy + r * 0.14;
      const swirl = sctx.createRadialGradient(stx, sty, 0, stx, sty, r * 0.19);
      swirl.addColorStop(0, "rgba(235, 245, 255, 0.62)");
      swirl.addColorStop(0.3, "rgba(150, 195, 255, 0.36)");
      swirl.addColorStop(0.65, "rgba(70, 120, 220, 0.16)");
      swirl.addColorStop(1, "transparent");
      sctx.fillStyle = swirl;
      sctx.beginPath();
      sctx.ellipse(
        stx,
        sty,
        r * 0.19,
        r * 0.105,
        -0.12 + Math.sin(tick * 0.0006) * 0.05,
        0,
        Math.PI * 2
      );
      sctx.fill();

      // Specular highlight (sun glint, upper-left)
      const hl = sctx.createRadialGradient(
        sphereCx - r * 0.42,
        sphereCy - r * 0.38,
        0,
        sphereCx - r * 0.18,
        sphereCy - r * 0.12,
        r * 0.85
      );
      hl.addColorStop(0, "rgba(225, 240, 255, 0.30)");
      hl.addColorStop(0.3, "rgba(180, 215, 255, 0.10)");
      hl.addColorStop(1, "transparent");
      sctx.fillStyle = hl;
      sctx.fillRect(0, 0, SX, SY);

      // Limb darkening — slight global vignette at the disc edge
      const limb = sctx.createRadialGradient(
        sphereCx,
        sphereCy,
        r * 0.78,
        sphereCx,
        sphereCy,
        r
      );
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(1, "rgba(0,4,18,0.55)");
      sctx.fillStyle = limb;
      sctx.fillRect(0, 0, SX, SY);

      sctx.restore();

      // 3) Composite sphere onto main canvas
      ctx.drawImage(sphereCanvas, cx - sphereCx, cy - sphereCy);

      // Atmospheric rim — thicker on the lit side, thin crescent on the dark side
      const rim = ctx.createRadialGradient(cx, cy, r * 0.94, cx, cy, r * 1.10);
      rim.addColorStop(0, "transparent");
      rim.addColorStop(0.45, "rgba(120, 180, 255, 0.34)");
      rim.addColorStop(0.75, "rgba(80, 140, 240, 0.18)");
      rim.addColorStop(1, "transparent");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.10, 0, Math.PI * 2);
      ctx.fill();

      // Front ring half
      drawRingHalf(true);

      // Orbiting moon
      const moonA = tick * 0.006 + 1.2;
      const moonDistR = r * 1.95;
      const moonX = cx + Math.cos(moonA) * moonDistR;
      const moonY =
        cy + Math.sin(moonA) * r * RING_RY_RATIO * (moonDistR / (r * 1.28));
      const moonR = r * 0.072;
      const moonFront = Math.sin(moonA) >= 0;

      if (moonFront) {
        const mg = ctx.createRadialGradient(
          moonX - moonR * 0.4,
          moonY - moonR * 0.35,
          0,
          moonX,
          moonY,
          moonR
        );
        mg.addColorStop(0, "#dde6ff");
        mg.addColorStop(0.6, "#6878b8");
        mg.addColorStop(1, "#101638");
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
        ctx.fillStyle = mg;
        ctx.fill();

        const moonGl = ctx.createRadialGradient(
          moonX,
          moonY,
          moonR * 0.7,
          moonX,
          moonY,
          moonR * 1.9
        );
        moonGl.addColorStop(0, "rgba(160, 200, 255, 0.18)");
        moonGl.addColorStop(1, "transparent");
        ctx.fillStyle = moonGl;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR * 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      tick++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}
