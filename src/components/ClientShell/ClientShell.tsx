'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      if (preloaderRef.current) preloaderRef.current.classList.add('hidden');
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Cursor tracking
  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) return;

    let trailTimer = 0;
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${x}px`;
        cursorRingRef.current.style.top = `${y}px`;
      }
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = `${x}px`;
        mouseGlowRef.current.style.top = `${y}px`;
      }
      clearTimeout(trailTimer);
      trailTimer = window.setTimeout(() => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 700);
      }, 30);
    };

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 750);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal — re-runs on every page navigation
  useEffect(() => {
    // Small delay so the new page's DOM is painted before we query
    const id = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)');
      if (!els.length) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        }),
        { threshold: 0.05 }
      );
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(id);
  }, [pathname]);

  // Background particle canvas
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const N = 60;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.5)';
        ctx.fill();
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <div className="preloader" ref={preloaderRef}>
        <div className="preloader-content">
          <span className="preloader-initials">RI</span>
          <div className="preloader-bar"><div className="preloader-fill" /></div>
        </div>
      </div>

      {/* Cursor */}
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="mouse-glow" ref={mouseGlowRef} />

      {/* Scroll progress */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Background canvas */}
      <canvas id="bgCanvas" className="bg-canvas" ref={bgCanvasRef} />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      {children}

      {/* Scroll to top */}
      <button
        className={`scroll-top ${scrollProgress > 15 ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >↑</button>
    </>
  );
}
