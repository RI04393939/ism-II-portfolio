'use client';

import { useEffect, useRef } from 'react';

const TRAIL_SIZE = 24;
const PARTICLE_POOL = 48;
/** One spark per this many pixels of pointer travel, so speed sets the rate. */
const PARTICLE_EVERY_PX = 14;
const MAX_PARTICLES_PER_MOVE = 3;

/**
 * Custom cursor: a glowing dot, a ring around it, sparks thrown off behind it
 * while it moves, small dots left where it pauses, and an aura on click.
 * Mouse and trackpad only; touch keeps its default.
 *
 * The system cursor is hidden only once this is running (via .has-cursor), so
 * a failed script never leaves the page without a cursor.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trailBox = trailRef.current;
    const particleBox = particleRef.current;
    if (!root || !dot || !ring || !trailBox || !particleBox) return;

    const trail = Array.from(trailBox.children) as HTMLElement[];
    const particles = Array.from(particleBox.children) as HTMLElement[];
    let nextTrail = 0;
    let nextParticle = 0;
    let trailTimer = 0;
    let lastX: number | null = null;
    let lastY = 0;
    let travel = 0;

    document.documentElement.classList.add('has-cursor');

    const at = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    // Throw a spark mostly backwards from the direction of travel.
    const shoot = (x: number, y: number, dirX: number, dirY: number) => {
      const p = particles[nextParticle];
      nextParticle = (nextParticle + 1) % particles.length;
      const angle = Math.atan2(-dirY, -dirX) + (Math.random() - 0.5) * 2.2;
      const dist = 12 + Math.random() * 22;
      const size = 1.5 + Math.random() * 1.5;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.animate(
        [
          { transform: `${at(x, y)} scale(1)`, opacity: 0.9 },
          { transform: `${at(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist)} scale(0.3)`, opacity: 0 },
        ],
        { duration: 450 + Math.random() * 350, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
      );
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      dot.style.transform = at(x, y);
      ring.style.transform = at(x, y);
      root.classList.add('is-visible');

      // Ring grows over anything clickable, since the hand pointer is hidden.
      const target = e.target as Element | null;
      ring.classList.toggle('is-hover', !!target?.closest('a, button, [role="button"], label, summary'));

      if (lastX !== null) {
        const mx = x - lastX;
        const my = y - lastY;
        const d = Math.hypot(mx, my);
        if (d > 0) {
          travel += d;
          let n = 0;
          while (travel >= PARTICLE_EVERY_PX && n < MAX_PARTICLES_PER_MOVE) {
            travel -= PARTICLE_EVERY_PX;
            shoot(x, y, mx / d, my / d);
            n++;
          }
          if (n === MAX_PARTICLES_PER_MOVE) travel = 0;
        }
      }
      lastX = x;
      lastY = y;

      // A trail dot drops where the pointer settles (30ms after the last move).
      clearTimeout(trailTimer);
      trailTimer = window.setTimeout(() => {
        const t = trail[nextTrail];
        nextTrail = (nextTrail + 1) % trail.length;
        t.style.transform = at(x, y);
        t.animate(
          [{ opacity: 0.45, scale: 1 }, { opacity: 0, scale: 0 }],
          { duration: 700, easing: 'ease', fill: 'forwards' },
        );
      }, 30);
    };

    const onLeave = () => {
      root.classList.remove('is-visible');
      lastX = null; // no burst of sparks from the jump when the pointer re-enters
    };

    // Click aura: a ring that expands out from the pointer and fades.
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      root.appendChild(ripple);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('click', onClick);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      clearTimeout(trailTimer);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('click', onClick);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <div ref={trailRef}>
        {Array.from({ length: TRAIL_SIZE }, (_, i) => (
          <div key={i} className="cursor-trail" />
        ))}
      </div>
      <div ref={particleRef}>
        {Array.from({ length: PARTICLE_POOL }, (_, i) => (
          <div key={i} className="cursor-particle" />
        ))}
      </div>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
