'use client';

import { useEffect, useRef } from 'react';

const TRAIL_SIZE = 24;

/**
 * Custom cursor: a glowing dot, a ring around it, and small dots left behind
 * where the pointer pauses. Mouse and trackpad only; touch keeps its default.
 *
 * The system cursor is hidden only once this is running (via .has-cursor), so
 * a failed script never leaves the page without a cursor.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trailBox = trailRef.current;
    if (!root || !dot || !ring || !trailBox) return;

    const trail = Array.from(trailBox.children) as HTMLElement[];
    let next = 0;
    let trailTimer = 0;

    document.documentElement.classList.add('has-cursor');

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      place(dot, x, y);
      place(ring, x, y);
      root.classList.add('is-visible');

      // Ring grows over anything clickable, since the hand pointer is hidden.
      const target = e.target as Element | null;
      ring.classList.toggle('is-hover', !!target?.closest('a, button, [role="button"], label, summary'));

      // A trail dot drops where the pointer settles (30ms after the last move).
      clearTimeout(trailTimer);
      trailTimer = window.setTimeout(() => {
        const t = trail[next];
        next = (next + 1) % trail.length;
        place(t, x, y);
        t.animate(
          [{ opacity: 0.45, scale: 1 }, { opacity: 0, scale: 0 }],
          { duration: 700, easing: 'ease', fill: 'forwards' },
        );
      }, 30);
    };

    const onLeave = () => root.classList.remove('is-visible');

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
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
