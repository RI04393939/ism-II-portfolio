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
