'use client';

import { useEffect, useRef } from 'react';

/**
 * Procedural circuit-board background. Traces are routed on a grid in 45 and
 * 90 degree runs, dotted with vias and chips, and data pulses drift along them.
 *
 * The static board is rendered once to an offscreen canvas and blitted each
 * frame; only the pulses are redrawn, which keeps this cheap enough to sit
 * behind every page.
 */

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; cum: number[]; len: number };
type Pulse = { trace: number; dist: number; speed: number; tail: number };
type Via = { x: number; y: number; r: number };
type Chip = { x: number; y: number; w: number; h: number };

const DIRS: [number, number][] = [
  [1, 0], [1, 1], [0, 1], [-1, 1],
  [-1, 0], [-1, -1], [0, -1], [1, -1],
];

/** Small deterministic PRNG so the board is stable between frames. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function routeTrace(rand: () => number, w: number, h: number, pitch: number): Pt[] {
  const pts: Pt[] = [];
  let x = Math.round((rand() * w) / pitch) * pitch;
  let y = Math.round((rand() * h) / pitch) * pitch;
  let d = Math.floor(rand() * 8);
  pts.push({ x, y });

  const steps = 5 + Math.floor(rand() * 9);
  for (let i = 0; i < steps; i++) {
    // Mostly carry straight on; otherwise bend by 45 degrees like real routing.
    if (rand() < 0.5) d = (d + (rand() < 0.5 ? 1 : 7)) % 8;
    const run = (1 + Math.floor(rand() * 3)) * pitch;
    const [dx, dy] = DIRS[d];
    x += dx * run;
    y += dy * run;
    // Let traces run a little past the edge so nothing looks fenced in.
    if (x < -pitch * 3 || x > w + pitch * 3 || y < -pitch * 3 || y > h + pitch * 3) break;
    pts.push({ x, y });
  }
  return pts;
}

function measure(pts: Pt[]): Trace {
  const cum = [0];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    cum.push(total);
  }
  return { pts, cum, len: total };
}

/** Point at a given distance along the trace. */
function pointAt(tr: Trace, dist: number): Pt {
  const d = Math.max(0, Math.min(tr.len, dist));
  let i = 1;
  while (i < tr.cum.length - 1 && tr.cum[i] < d) i++;
  const segLen = tr.cum[i] - tr.cum[i - 1] || 1;
  const f = (d - tr.cum[i - 1]) / segLen;
  const a = tr.pts[i - 1];
  const b = tr.pts[i];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

/** Polyline points between two distances, for drawing a comet trail. */
function slice(tr: Trace, from: number, to: number): Pt[] {
  const out: Pt[] = [pointAt(tr, from)];
  for (let i = 1; i < tr.cum.length; i++) {
    if (tr.cum[i] > from && tr.cum[i] < to) out.push(tr.pts[i]);
  }
  out.push(pointAt(tr, to));
  return out;
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Note: this deliberately does not gate on prefers-reduced-motion. The
    // pulses are already slow by design (12-30s to cross a trace), which is
    // gentle enough to stand as the reduced-motion presentation itself.
    // Halving it again just made the board look frozen.

    let w = 0;
    let h = 0;
    let dpr = 1;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let board: HTMLCanvasElement | null = null;

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = makeRng(20260831);
      const pitch = 26;
      const area = w * h;
      const traceCount = Math.max(26, Math.min(90, Math.round(area / 26000)));

      traces = [];
      for (let i = 0; i < traceCount; i++) {
        const pts = routeTrace(rand, w, h, pitch);
        if (pts.length > 2) traces.push(measure(pts));
      }

      // Vias sit at trace ends and the odd corner.
      const vias: Via[] = [];
      traces.forEach((tr) => {
        vias.push({ x: tr.pts[0].x, y: tr.pts[0].y, r: 2.4 });
        vias.push({ x: tr.pts[tr.pts.length - 1].x, y: tr.pts[tr.pts.length - 1].y, r: 2.4 });
        for (let i = 1; i < tr.pts.length - 1; i++) {
          if (rand() < 0.18) vias.push({ x: tr.pts[i].x, y: tr.pts[i].y, r: 1.8 });
        }
      });

      const chips: Chip[] = [];
      const chipCount = Math.max(3, Math.round(area / 320000));
      for (let i = 0; i < chipCount; i++) {
        const cw = pitch * (3 + Math.floor(rand() * 3));
        const ch = pitch * (2 + Math.floor(rand() * 3));
        chips.push({
          x: Math.round((rand() * (w - cw)) / pitch) * pitch,
          y: Math.round((rand() * (h - ch)) / pitch) * pitch,
          w: cw,
          h: ch,
        });
      }

      // Bake the static board once.
      board = document.createElement('canvas');
      board.width = canvas.width;
      board.height = canvas.height;
      const bx = board.getContext('2d');
      if (bx) {
        bx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bx.lineCap = 'round';
        bx.lineJoin = 'round';

        bx.strokeStyle = 'rgba(96,165,250,0.16)';
        bx.lineWidth = 1;
        traces.forEach((tr) => {
          bx.beginPath();
          bx.moveTo(tr.pts[0].x, tr.pts[0].y);
          for (let i = 1; i < tr.pts.length; i++) bx.lineTo(tr.pts[i].x, tr.pts[i].y);
          bx.stroke();
        });

        chips.forEach((c) => {
          bx.fillStyle = 'rgba(96,165,250,0.05)';
          bx.strokeStyle = 'rgba(96,165,250,0.22)';
          bx.lineWidth = 1;
          bx.beginPath();
          bx.rect(c.x, c.y, c.w, c.h);
          bx.fill();
          bx.stroke();
          // pin stubs down each long side
          bx.strokeStyle = 'rgba(96,165,250,0.28)';
          for (let px = c.x + 6; px < c.x + c.w - 4; px += 7) {
            bx.beginPath();
            bx.moveTo(px, c.y);
            bx.lineTo(px, c.y - 4);
            bx.moveTo(px, c.y + c.h);
            bx.lineTo(px, c.y + c.h + 4);
            bx.stroke();
          }
        });

        vias.forEach((v) => {
          bx.beginPath();
          bx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
          bx.fillStyle = 'rgba(96,165,250,0.13)';
          bx.fill();
          bx.strokeStyle = 'rgba(96,165,250,0.30)';
          bx.lineWidth = 0.8;
          bx.stroke();
        });
      }

      // One slow pulse per few traces.
      const rp = makeRng(77003);
      pulses = [];
      const pulseCount = Math.max(8, Math.round(traces.length * 0.45));
      for (let i = 0; i < pulseCount; i++) {
        const t = Math.floor(rp() * traces.length);
        pulses.push({
          trace: t,
          dist: rp() * traces[t].len,
          // Deliberately slow: a pulse takes roughly 12–30s to cross a trace.
          speed: 10 + rp() * 16,
          tail: 60 + rp() * 70,
        });
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, w, h);
      if (board) ctx.drawImage(board, 0, 0, w, h);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      pulses.forEach((p) => {
        const tr = traces[p.trace];
        if (!tr) return;
        p.dist += p.speed * dt;
        if (p.dist - p.tail > tr.len) p.dist = 0;

        const head = pointAt(tr, p.dist);
        const trail = slice(tr, Math.max(0, p.dist - p.tail), p.dist);

        if (trail.length > 1) {
          const a = trail[0];
          const grad = ctx.createLinearGradient(a.x, a.y, head.x, head.y);
          grad.addColorStop(0, 'rgba(96,165,250,0)');
          grad.addColorStop(1, 'rgba(147,197,253,0.85)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < trail.length; i++) ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }

        // Head glow — a radial fill is much cheaper than shadowBlur here.
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 9);
        g.addColorStop(0, 'rgba(191,219,254,0.55)');
        g.addColorStop(1, 'rgba(96,165,250,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(frame);
    };

    build();
    rafRef.current = requestAnimationFrame(frame);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas className="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}
