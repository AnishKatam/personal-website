"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  layer: number;
  idx: number;
  radius: number;
  bias: number;
  excite: number;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface Signal {
  edge: number;
  progress: number;
  speed: number;
  intensity: number;
}

const LAYER_SIZES = [3, 6, 8, 6, 3];
const LAYER_LABELS = ["INPUT", "HIDDEN", "HIDDEN", "HIDDEN", "OUTPUT"];
const NODE_RADIUS = 3.2;
const TOP_LABEL_GAP = 14;
const BOTTOM_PAD = 6;
const SIDE_PAD = 24;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 1;
    let h = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const signals: Signal[] = [];

    const layout = () => {
      nodes = [];
      edges = [];

      const usableW = Math.max(1, w - SIDE_PAD * 2);
      const startX = SIDE_PAD;
      const layerCount = LAYER_SIZES.length;

      for (let l = 0; l < layerCount; l++) {
        const count = LAYER_SIZES[l];
        const x =
          layerCount === 1
            ? startX + usableW / 2
            : startX + (usableW * l) / (layerCount - 1);
        const verticalSpan = h - TOP_LABEL_GAP - BOTTOM_PAD;
        const top = TOP_LABEL_GAP;
        for (let i = 0; i < count; i++) {
          const y =
            count === 1
              ? top + verticalSpan / 2
              : top + (verticalSpan * i) / (count - 1);
          nodes.push({
            x,
            y,
            layer: l,
            idx: i,
            radius: NODE_RADIUS,
            bias: Math.random() * Math.PI * 2,
            excite: 0,
          });
        }
      }

      let offset = 0;
      for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
        const sizeA = LAYER_SIZES[l];
        const sizeB = LAYER_SIZES[l + 1];
        const startA = offset;
        const startB = offset + sizeA;
        for (let i = 0; i < sizeA; i++) {
          for (let j = 0; j < sizeB; j++) {
            edges.push({
              from: startA + i,
              to: startB + j,
              weight: Math.random(),
            });
          }
        }
        offset += sizeA;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: 320, height: 200 };
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const spawnForwardWave = () => {
      const inputSize = LAYER_SIZES[0];
      const startCount = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < startCount; k++) {
        const inputIdx = Math.floor(Math.random() * inputSize);
        const outgoing: number[] = [];
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].from === inputIdx) outgoing.push(i);
        }
        if (!outgoing.length) continue;
        const eIdx = outgoing[Math.floor(Math.random() * outgoing.length)];
        signals.push({
          edge: eIdx,
          progress: 0,
          speed: 0.018 + Math.random() * 0.012,
          intensity: 0.75 + Math.random() * 0.25,
        });
      }
    };

    const propagateFrom = (nodeIdx: number, intensity: number) => {
      const outgoing: number[] = [];
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].from === nodeIdx) outgoing.push(i);
      }
      if (!outgoing.length) return;
      const fireCount = Math.min(
        outgoing.length,
        1 + Math.floor(Math.random() * 2),
      );
      for (let k = 0; k < fireCount; k++) {
        const eIdx = outgoing[Math.floor(Math.random() * outgoing.length)];
        if (signals.length > 140) return;
        signals.push({
          edge: eIdx,
          progress: 0,
          speed: 0.016 + Math.random() * 0.014,
          intensity: intensity * (0.7 + Math.random() * 0.3),
        });
      }
    };

    const curveControl = (a: Node, b: Node, edgeIdx: number) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const perpX = -dy / dist;
      const perpY = dx / dist;
      const seed = (edgeIdx * 9301 + 49297) % 233280;
      const off = (seed / 233280 - 0.5) * 16;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      return { cx: mx + perpX * off, cy: my + perpY * off };
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      if (frame % 60 === 0) spawnForwardWave();
      if (frame % 35 === 0 && Math.random() < 0.6) {
        const lastLayerStart =
          nodes.length - LAYER_SIZES[LAYER_SIZES.length - 1];
        if (lastLayerStart > 0) {
          propagateFrom(Math.floor(Math.random() * lastLayerStart), 0.6);
        }
      }

      for (const n of nodes) {
        n.bias += 0.02;
        n.excite *= 0.92;
      }

      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = nodes[e.from];
        const b = nodes[e.to];
        const { cx, cy } = curveControl(a, b, i);
        const wAlpha = 0.07 + e.weight * 0.16;
        const exciteBoost = Math.max(a.excite, b.excite) * 0.35;
        const alpha = Math.min(0.75, wAlpha + exciteBoost);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cx, cy, b.x, b.y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.lineWidth = 0.55 + e.weight * 0.45;
        ctx.stroke();
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;
        const e = edges[sig.edge];
        if (!e) {
          signals.splice(s, 1);
          continue;
        }
        const a = nodes[e.from];
        const b = nodes[e.to];
        const { cx, cy } = curveControl(a, b, sig.edge);

        if (sig.progress >= 1) {
          nodes[e.to].excite = Math.min(
            1.5,
            nodes[e.to].excite + sig.intensity,
          );
          if (Math.random() < 0.88) {
            propagateFrom(e.to, sig.intensity * 0.82);
          }
          signals.splice(s, 1);
          continue;
        }

        const t = sig.progress;
        const omt = 1 - t;
        const px = omt * omt * a.x + 2 * omt * t * cx + t * t * b.x;
        const py = omt * omt * a.y + 2 * omt * t * cy + t * t * b.y;

        const trailSteps = 4;
        for (let k = trailSteps; k >= 1; k--) {
          const tt = Math.max(0, t - k * 0.04);
          const o = 1 - tt;
          const tx = o * o * a.x + 2 * o * tt * cx + tt * tt * b.x;
          const ty = o * o * a.y + 2 * o * tt * cy + tt * tt * b.y;
          const tAlpha = (1 - k / trailSteps) * 0.4 * sig.intensity;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167, 243, 250, ${tAlpha})`;
          ctx.fill();
        }

        const glowR = 6.5;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(0, `rgba(224, 252, 255, ${sig.intensity})`);
        glow.addColorStop(0.4, `rgba(103, 232, 249, ${0.7 * sig.intensity})`);
        glow.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      for (const n of nodes) {
        const pulse = 0.55 + 0.45 * Math.sin(n.bias);
        const activation = Math.min(1, n.excite + pulse * 0.16);

        const haloR = n.radius * (2.8 + activation * 5);
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        halo.addColorStop(
          0,
          `rgba(103, 232, 249, ${0.2 + activation * 0.35})`,
        );
        halo.addColorStop(
          0.5,
          `rgba(34, 211, 238, ${0.08 + activation * 0.15})`,
        );
        halo.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(103, 232, 249, ${0.4 + activation * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 252, 255, ${0.75 + activation * 0.25})`;
        ctx.fill();
      }

      ctx.font = "7px var(--font-orbitron), system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(103, 232, 249, 0.55)";
      for (let l = 0; l < LAYER_SIZES.length; l++) {
        const sample = nodes.find((n) => n.layer === l);
        if (!sample) continue;
        ctx.fillText(LAYER_LABELS[l] ?? `L${l}`, sample.x, 8);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
