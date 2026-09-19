'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const routes = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about-me' },
  { label: 'About ISM', href: '/about-ism' },
  { label: 'Mentor Bio', href: '/mentor-bio' },
  { label: 'Research', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.nav}>
      <div className={styles.top}>
        <Link href="/" className={styles.brand}>Rithvik</Link>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav id="site-nav" aria-label="Main" className={`${styles.links} ${open ? styles.open : ''}`}>
        {routes.map((route) => {
          const active = isActive(route.href);
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`${styles.link} ${active ? styles.active : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
