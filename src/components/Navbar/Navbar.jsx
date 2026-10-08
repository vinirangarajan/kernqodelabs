import { useEffect, useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Home',           href: '#home' },
  { label: 'About',          href: '#about' },
  { label: 'Services',       href: '#services' },
  { label: 'Products',       href: '#products' },
  { label: 'My Project Kit', href: '#mpk' },
  { label: 'Reviews',        href: '#reviews' },
  { label: 'Blog',           href: '#blog' },
  { label: 'Contact',        href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'services', 'products', 'mpk', 'reviews', 'blog', 'contact'];

export default function Navbar({ theme, toggleTheme }) {
  const navRef        = useRef(null);
  const logoRef       = useRef(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('home');

  /* ── Scroll → solid bg ───────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via Intersection Observer ────────────────────── */
  useEffect(() => {
    const observers = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveLink(id);
        },
        { threshold: 0.35, rootMargin: '-80px 0px -35% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Close mobile menu on resize ────────────────────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── GSAP: slide navbar down on mount ────────────────────────────── */
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: navRef });

  /* ── Logo 3D tilt ────────────────────────────────────────────────── */
  const handleLogoMove = useCallback((e) => {
    const el   = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rotX = ((e.clientY - cy) / rect.height) * -14;
    const rotY = ((e.clientX - cx) / rect.width)  *  14;
    el.style.transform = `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
  }, []);

  const handleLogoLeave = useCallback(() => {
    if (logoRef.current)
      logoRef.current.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={`container ${styles.inner}`}>
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <a
          href="#home"
          className={styles.logoWrap}
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="KernQode Labs – go to homepage"
        >
          <div
            ref={logoRef}
            className={styles.logoTilt}
            onMouseMove={handleLogoMove}
            onMouseLeave={handleLogoLeave}
          >
            <img src="/kernqode-logo.png" alt="KernQode Labs" height={56} className={styles.logoImg} />
          </div>
        </a>

        {/* ── Desktop nav links ─────────────────────────────────────── */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              return (
                <li key={id}>
                  <a
                    href={href}
                    className={`${styles.navLink} ${activeLink === id ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                    <span className={styles.underline} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Actions ──────────────────────────────────────────────── */}
        <div className={styles.actions}>
          {/* Theme toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className={`btn-primary ${styles.ctaBtn}`}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Get a Quote</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileList}>
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              return (
                <li key={id}>
                  <a
                    href={href}
                    className={`${styles.mobileLink} ${activeLink === id ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(e, href)}
                    tabIndex={mobileOpen ? 0 : -1}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#contact"
                className={`btn-primary ${styles.mobileCta}`}
                onClick={(e) => handleNavClick(e, '#contact')}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <span>Get a Quote</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
