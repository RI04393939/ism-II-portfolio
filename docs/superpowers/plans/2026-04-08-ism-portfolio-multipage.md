# ISM Portfolio Multi-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-page scroll portfolio into a 7-page Next.js site matching the ISM Digital Portfolio Rubric MP1.

**Architecture:** Each ISM tab becomes its own Next.js app-router route under `src/app/`. The shared `ClientShell` in `layout.tsx` provides particle canvas, cursor effects, and preloader across all pages. The Navbar switches from scroll-anchor links to Next.js `<Link>` components with `usePathname()` for active state.

**Tech Stack:** Next.js 14 (App Router, static export), React, TypeScript, CSS Modules

---

## File Map

**Create:**
- `src/app/about-me/page.tsx` — About Me page
- `src/app/about-ism/page.tsx` — About ISM page
- `src/app/mentor-bio/page.tsx` — Mentor Bio page
- `src/app/research/page.tsx` — Research page
- `src/app/blog/page.tsx` — Blog page
- `src/app/projects/page.tsx` — Projects page

**Modify:**
- `src/app/page.tsx` — Replace with HOME page content
- `src/components/ClientShell/ClientShell.tsx` — Remove section detection, ambient layers, section dots, section counter
- `src/components/Navbar/Navbar.tsx` — Switch to Link + usePathname, move to top-right
- `src/components/Navbar/Navbar.module.css` — Position to top-right
- `src/app/globals.css` — Remove old section-specific h1 styles, add shared page heading styles

**Delete:**
- `src/components/Introduction/Introduction.tsx`
- `src/components/About/About.tsx`
- `src/components/Projects/Projects.tsx`
- `src/components/Experience/Experience.tsx`
- `src/components/Achievements/Achievements.tsx`
- `src/components/Skills/Skills.tsx`
- `src/components/Extracurriculars/Extracurriculars.tsx`
- `src/components/Footer/Footer.tsx`
- `src/components/ProjectCard/ProjectCard.tsx`
- `src/app/project/` (entire folder)
- `src/data/data.ts`
- `src/app/page.module.css`

**Assets to copy to `public/`:**
- `/Users/divyainampudi/.claude/image-cache/1601781c-5c25-48dd-bfa5-19b8eba5c6b7/2.png` → `public/ism-logo.png`
- `/Users/divyainampudi/Downloads/Copy of CNS General Resume Template.pdf` → `public/resume.pdf`
- `/Users/divyainampudi/Downloads/_Original Work Proposal.docx` → `public/original-work-proposal.docx`
- `/Users/divyainampudi/Downloads/Final Product Progress Assesment.docx` → `public/final-product-assessment.docx`

---

## Task 1: Copy Assets to Public

**Files:**
- Create: `public/ism-logo.png`
- Create: `public/resume.pdf`
- Create: `public/original-work-proposal.docx`
- Create: `public/final-product-assessment.docx`

- [ ] **Step 1: Copy all assets**

```bash
cp "/Users/divyainampudi/.claude/image-cache/1601781c-5c25-48dd-bfa5-19b8eba5c6b7/2.png" /Users/divyainampudi/MyWesbite/public/ism-logo.png
cp "/Users/divyainampudi/Downloads/Copy of CNS General Resume Template.pdf" /Users/divyainampudi/MyWesbite/public/resume.pdf
cp "/Users/divyainampudi/Downloads/_Original Work Proposal.docx" /Users/divyainampudi/MyWesbite/public/original-work-proposal.docx
cp "/Users/divyainampudi/Downloads/Final Product Progress Assesment.docx" /Users/divyainampudi/MyWesbite/public/final-product-assessment.docx
```

- [ ] **Step 2: Verify**

```bash
ls /Users/divyainampudi/MyWesbite/public/
```
Expected: `ism-logo.png  resume.pdf  original-work-proposal.docx  final-product-assessment.docx`

- [ ] **Step 3: Commit**

```bash
cd /Users/divyainampudi/MyWesbite
git add public/
git commit -m "feat: add public assets (ISM logo, resume, project docs)"
```

---

## Task 2: Slim Down ClientShell

Remove section-specific logic (section detection, ambient layers, section dots, section counter). Keep particle canvas, cursor, preloader, scroll progress, scroll-to-top.

**Files:**
- Modify: `src/components/ClientShell/ClientShell.tsx`

- [ ] **Step 1: Replace ClientShell.tsx with slimmed version**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ClientShell/ClientShell.tsx
git commit -m "feat: slim ClientShell to remove section-specific logic"
```

---

## Task 3: Update Navbar to Multi-Page Router

Switch from scroll anchors to Next.js `<Link>` with `usePathname()`. Move navbar to top-right.

**Files:**
- Modify: `src/components/Navbar/Navbar.tsx`
- Modify: `src/components/Navbar/Navbar.module.css`

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const routes = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT ME', href: '/about-me' },
  { label: 'ABOUT ISM', href: '/about-ism' },
  { label: 'MENTOR BIO', href: '/mentor-bio' },
  { label: 'RESEARCH', href: '/research' },
  { label: 'BLOG', href: '/blog' },
  { label: 'PROJECTS', href: '/projects' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.topBar}>
        <Link href="/">
          <h3 className={styles.nameHeader}>Rithvik</h3>
        </Link>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
      <nav className={`${styles.navHeader} ${isMenuOpen ? styles.open : ''}`}>
        {routes.map((route, i) => (
          <div key={route.href}>
            <Link href={route.href} onClick={() => setIsMenuOpen(false)}>
              <h3 className={`${styles.navItem} ${isActive(route.href) ? styles.active : ''}`}>
                <span className={styles.navNumber}>{String(i + 1).padStart(2, '0')}</span>
                {route.label}
              </h3>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
```

- [ ] **Step 2: Replace Navbar.module.css**

```css
.navBar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1.2rem 1.5rem;
}

.topBar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nameHeader {
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ccc;
  cursor: none;
  transition: color 0.2s;
}

.nameHeader:hover { color: var(--accent); }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: #666;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

.navHeader {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  margin-top: 0.5rem;
}

.navNumber {
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: #333;
  margin-right: 0.4rem;
  vertical-align: middle;
  transition: color 0.2s;
}

.navItem {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #444;
  cursor: none;
  padding: 0.2rem 0;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.navItem:hover { color: #888; }
.navItem:hover .navNumber { color: #555; }
.navItem.active { color: var(--accent); }
.navItem.active .navNumber { color: var(--accent); }

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .navHeader {
    display: none;
    margin-top: 0.8rem;
  }

  .navHeader.open { display: flex; }
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar/Navbar.tsx src/components/Navbar/Navbar.module.css
git commit -m "feat: switch navbar to multi-page routing with numbered tabs"
```

---

## Task 4: Clean Up globals.css

Remove old section-ID-specific h1 styles and add shared `.page-heading` class for all pages.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove old section heading rules and add shared styles**

Find and delete these blocks in `globals.css` (lines 57–107):

```css
/* DELETE THIS ENTIRE BLOCK: */
/* ─── Section headings ─────────────────────────────── */
#about h1, #projects h1, #experience h1,
#achievements h1, #skills h1, #extracurriculars h1 { ... }

/* Ghost numbers behind headings */
#about h1::after { content: '01'; }
... (all the ::after and ::before rules)
```

Also delete the ambient layer CSS (lines 305–323):
```css
/* DELETE: */
.ambient-layer { ... }
.ambient-layer.active { ... }
.ambient-home { ... }
.ambient-about { ... }
.ambient-projects { ... }
.ambient-experience { ... }
.ambient-achievements { ... }
.ambient-skills { ... }
.ambient-extracurriculars { ... }
```

Also delete section-dots and section-counter CSS (lines 334–378):
```css
/* DELETE: */
.section-dots { ... }
.section-dot { ... }
.section-dot.active { ... }
.section-counter { ... }
.section-counter.visible { ... }
```

- [ ] **Step 2: Add shared page styles at end of globals.css**

```css
/* ─── Shared page layout ───────────────────────────── */
.page-container {
  min-height: 100vh;
  padding: 7rem 2rem 4rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-heading {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
  background: linear-gradient(100deg, var(--accent) 0%, #ffffff 55%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
}

.page-subheading {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.content-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.placeholder-box {
  border: 1.5px dashed rgba(96, 165, 250, 0.3);
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  color: rgba(96, 165, 250, 0.4);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: clean up globals.css - remove section-specific styles, add shared page styles"
```

---

## Task 5: Build HOME Page

Replace `src/app/page.tsx` with a styled HOME page.

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          opacity: 0.7,
          marginBottom: '1rem',
        }}>
          ISM Digital Portfolio
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Rithvik<br />Inampudi
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ width: 32, height: 1, background: 'var(--accent)', opacity: 0.5 }} />
          <p style={{
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#888',
          }}>
            Topic of Study: Deep Learning
          </p>
        </div>

        <blockquote style={{
          maxWidth: '520px',
          borderLeft: '2px solid rgba(96, 165, 250, 0.3)',
          paddingLeft: '1.25rem',
          color: '#555',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          fontStyle: 'italic',
          letterSpacing: '0.03em',
        }}>
          &ldquo;[Your quote here]&rdquo;
        </blockquote>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build HOME page with name, topic, quote"
```

---

## Task 6: Build ABOUT ME Page

**Files:**
- Create: `src/app/about-me/page.tsx`

- [ ] **Step 1: Create about-me/page.tsx**

```tsx
export default function AboutMe() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">About Me</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Photo placeholder */}
        <div className="placeholder-box reveal" style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem', opacity: 0.3 }}>[ ]</span>
          <span>Professional Photo</span>
          <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>Add photo in professional attire</span>
        </div>

        {/* Bio */}
        <div className="content-card reveal">
          <p className="page-subheading">Biography</p>
          <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem' }}>
            Rithvik Inampudi is a student passionate about artificial intelligence and deep learning.
            With a strong foundation in mathematics and computer science, he is dedicated to exploring
            how neural networks and machine learning models can be applied to solve complex, real-world
            challenges. Through the ISM program, Rithvik is actively deepening his expertise in deep
            learning research and development, with a long-term goal of building intelligent systems
            that create meaningful impact.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="content-card reveal">
        <p className="page-subheading">Mission Statement</p>
        <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.9rem' }}>
          My mission is to contribute meaningfully to the field of deep learning by developing
          intelligent systems that solve real-world problems and push the boundaries of AI research.
          I aim to create impactful technologies that not only advance the field technically but also
          lead to practical improvements in people&apos;s lives. Through continuous learning and
          collaboration, I hope to make a positive difference in society by using deep learning as
          a tool for innovation and social good.
        </p>
      </div>

      {/* Resume */}
      <div className="content-card reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="page-subheading">Résumé</p>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>View or download my résumé</p>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.4rem',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(96,165,250,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          View Résumé ↗
        </a>
      </div>

      {/* Contact */}
      <div className="content-card reveal">
        <p className="page-subheading">Contact Information</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#444', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', width: '60px' }}>Email</span>
            <a
              href="mailto:rithvik.inampudi@gmail.com"
              style={{ color: '#aaa', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
            >
              rithvik.inampudi@gmail.com
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#444', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', width: '60px' }}>LinkedIn</span>
            <a
              href="https://linkedin.com/in/rithvik-inampudi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#aaa', fontSize: '0.85rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
            >
              linkedin.com/in/rithvik-inampudi ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about-me/
git commit -m "feat: build ABOUT ME page with bio, mission, resume, contact"
```

---

## Task 7: Build ABOUT ISM Page

**Files:**
- Create: `src/app/about-ism/page.tsx`

- [ ] **Step 1: Create about-ism/page.tsx**

```tsx
import Image from 'next/image';

export default function AboutISM() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">About ISM</h1>

      {/* Logo */}
      <div className="content-card reveal" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 2rem' }}>
        <Image
          src="/ism-logo.png"
          alt="ISM Logo — Choose Excellence. Exemplify Character."
          width={320}
          height={160}
          style={{ objectFit: 'contain', filter: 'brightness(1.05)' }}
        />
      </div>

      {/* Description */}
      <div className="content-card reveal">
        <p className="page-subheading">About the Program</p>
        <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '0.9rem' }}>
          ISM — Independent Study Mentorship — is a year-long, research-based program that connects
          high school students with professionals in their field of interest. Students develop
          real-world skills through primary and secondary research, mentorship, and an original work
          project, culminating in a final product that demonstrates mastery of their chosen topic.
        </p>
        <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '0.9rem', marginTop: '1rem' }}>
          The program emphasizes professional development, independent thinking, and the application
          of academic knowledge to real-world problems. Students engage directly with industry
          mentors, conduct original research, and present their findings to panels of professionals —
          building the skills needed for college and career success.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about-ism/
git commit -m "feat: build ABOUT ISM page with logo and program description"
```

---

## Task 8: Build MENTOR BIO Page

**Files:**
- Create: `src/app/mentor-bio/page.tsx`

- [ ] **Step 1: Create mentor-bio/page.tsx**

```tsx
export default function MentorBio() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Mentor Bio</h1>

      <div className="placeholder-box reveal" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>—</span>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Coming Soon</p>
        <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '320px', textAlign: 'center', lineHeight: 1.6 }}>
          Mentor biography and photo will be added once a mentorship is established.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/mentor-bio/
git commit -m "feat: build MENTOR BIO page with coming soon placeholder"
```

---

## Task 9: Build RESEARCH Page

**Files:**
- Create: `src/app/research/page.tsx`

- [ ] **Step 1: Create research/page.tsx**

```tsx
export default function Research() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Research</h1>

      {/* Primary Sources */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <p className="page-subheading">Primary Sources</p>

        <div className="content-card" style={{ marginBottom: '1rem' }}>
          <p style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Interviews
          </p>
          <div className="placeholder-box" style={{ marginBottom: 0 }}>
            No interviews added yet
          </div>
        </div>

        <div className="content-card">
          <p style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Mentor Visits
          </p>
          <div className="placeholder-box" style={{ marginBottom: 0 }}>
            No mentor visits added yet
          </div>
        </div>
      </div>

      {/* Secondary Sources */}
      <div className="reveal">
        <p className="page-subheading">Secondary Sources</p>
        <div className="content-card">
          <div className="placeholder-box" style={{ marginBottom: 0 }}>
            No secondary sources added yet
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/research/
git commit -m "feat: build RESEARCH page with primary and secondary source placeholders"
```

---

## Task 10: Build BLOG Page

**Files:**
- Create: `src/app/blog/page.tsx`

- [ ] **Step 1: Create blog/page.tsx**

```tsx
export default function Blog() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Blog</h1>

      <div className="placeholder-box reveal" style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem', opacity: 0.2 }}>✎</span>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>No posts yet</p>
        <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'none', letterSpacing: '0.05em', maxWidth: '340px', textAlign: 'center', lineHeight: 1.7 }}>
          Weekly blog posts will appear here, ordered newest to oldest.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/
git commit -m "feat: build BLOG page with empty state"
```

---

## Task 11: Build PROJECTS Page

**Files:**
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create projects/page.tsx**

```tsx
export default function Projects() {
  return (
    <main className="page-container">
      <h1 className="page-heading reveal">Projects</h1>

      {/* Original Work */}
      <div className="reveal" style={{ marginBottom: '2.5rem' }}>
        <p className="page-subheading">Original Work</p>
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ddd', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Adaptive Resolution Vision Simulator
              </h2>
              <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Deep Learning · October 24, 2025
              </p>
            </div>
            <a
              href="/original-work-proposal.docx"
              download
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                border: '1px solid rgba(96,165,250,0.3)',
                color: 'var(--accent)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              Download ↓
            </a>
          </div>
          <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem' }}>
            An interactive educational web application that demonstrates how deep learning models can
            operate more efficiently by dynamically adjusting image resolution based on prediction
            confidence. The system reduces computational usage by up to 50% while maintaining accuracy
            within 1–2% — making adaptive AI efficiency concepts accessible to students and educators.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Python', 'PyTorch', 'Computer Vision', 'Gradio', 'Green AI'].map(tag => (
              <span key={tag} className="skill-pill">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Final Product */}
      <div className="reveal">
        <p className="page-subheading">Final Product</p>
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ddd', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                AI-Powered Waste Detection Model
              </h2>
              <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Deep Learning · March 26, 2026
              </p>
            </div>
            <a
              href="/final-product-assessment.docx"
              download
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.1rem',
                border: '1px solid rgba(96,165,250,0.3)',
                color: 'var(--accent)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              Download ↓
            </a>
          </div>
          <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.85rem' }}>
            A computer vision model trained to detect and classify multiple waste categories from
            images, demonstrating a practical application of deep learning to environmental challenges.
            The project involved dataset preparation, annotation, model training, and performance
            evaluation using precision, recall, and mAP metrics — progressing from concept to a
            functioning prototype.
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Python', 'Computer Vision', 'Object Detection', 'Dataset Annotation', 'mAP Evaluation'].map(tag => (
              <span key={tag} className="skill-pill">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/
git commit -m "feat: build PROJECTS page with original work and final product"
```

---

## Task 12: Delete Retired Components and Cleanup

**Files:**
- Delete: `src/components/Introduction/`
- Delete: `src/components/About/`
- Delete: `src/components/Projects/`
- Delete: `src/components/Experience/`
- Delete: `src/components/Achievements/`
- Delete: `src/components/Skills/`
- Delete: `src/components/Extracurriculars/`
- Delete: `src/components/Footer/`
- Delete: `src/components/ProjectCard/`
- Delete: `src/app/project/`
- Delete: `src/data/data.ts`
- Delete: `src/app/page.module.css`

- [ ] **Step 1: Delete retired files**

```bash
cd /Users/divyainampudi/MyWesbite
rm -rf src/components/Introduction
rm -rf src/components/About
rm -rf src/components/Projects
rm -rf src/components/Experience
rm -rf src/components/Achievements
rm -rf src/components/Skills
rm -rf src/components/Extracurriculars
rm -rf src/components/Footer
rm -rf src/components/ProjectCard
rm -rf src/app/project
rm -f src/data/data.ts
rm -f src/app/page.module.css
```

- [ ] **Step 2: Final build verification**

```bash
cd /Users/divyainampudi/MyWesbite && npm run build 2>&1
```
Expected: clean build with 7 routes generated:
- `/` → HOME
- `/about-me/` → ABOUT ME
- `/about-ism/` → ABOUT ISM
- `/mentor-bio/` → MENTOR BIO
- `/research/` → RESEARCH
- `/blog/` → BLOG
- `/projects/` → PROJECTS

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove retired single-page components and cleanup"
```
