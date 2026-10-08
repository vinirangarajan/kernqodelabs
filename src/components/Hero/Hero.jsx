import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiStar,
  FiUsers,
  FiClock,
  FiHeadphones,
} from 'react-icons/fi';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
  { icon: <FiStar  size={14} />, label: '50+ Projects' },
  { icon: <FiUsers size={14} />, label: '30+ Clients'  },
  { icon: <FiClock size={14} />, label: '3+ Years'     },
  { icon: <FiHeadphones size={14} />, label: 'Scheduled Support', title: 'Weekdays: 9:30–12:00, 1:00–4:00, 5:00–8:30 PM\nSat–Sun: 10:30 AM–1:00, 2:00–6:30 PM' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const tlRef      = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tlRef.current = tl;

    /* Left column – stagger from x:-60 */
    tl.from(`.${styles.label}`,     { x: -60, opacity: 0, duration: 0.7 })
      .from(`.${styles.headline}`,  { x: -60, opacity: 0, duration: 0.75 }, '-=0.4')
      .from(`.${styles.sub}`,       { x: -60, opacity: 0, duration: 0.7  }, '-=0.45')
      .from(`.${styles.ctaRow}`,    { x: -60, opacity: 0, duration: 0.65 }, '-=0.4')
      .from(`.${styles.badges}`,    { x: -60, opacity: 0, duration: 0.6  }, '-=0.35')

    /* Right column – slide from x:60 */
      .from(`.${styles.videoCol}`,  { x: 60,  opacity: 0, duration: 0.9  }, '-=0.75')

    /* Background orbs fade in */
      .from(`.${styles.orb}`,       { scale: 0, opacity: 0, stagger: 0.12, duration: 1 }, '-=0.8');
  }, { scope: sectionRef });

  return (
    <section id="home" ref={sectionRef} className={styles.hero}>

      {/* ── Particle dot-grid background ───────────────────────────── */}
      <div className={styles.particleGrid} aria-hidden="true" />

      {/* ── Gradient orbs ──────────────────────────────────────────── */}
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb3}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb4}`} aria-hidden="true" />

      {/* ── Floating 3D geo shapes ──────────────────────────────────── */}
      <div className={`${styles.geo} ${styles.geo1}`} aria-hidden="true" />
      <div className={`${styles.geo} ${styles.geo2}`} aria-hidden="true" />
      <div className={`${styles.geo} ${styles.geo3}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* ══ LEFT – text content ══════════════════════════════════════ */}
        <div className={styles.textCol}>
          <span className={`section-label ${styles.label}`}>
            ✦ Full-Stack &amp; AI Agency
          </span>

          <h1 className={styles.headline}>
            Building Digital{' '}
            <span className={`gradient-text ${styles.gradWord}`}>Excellence</span>
          </h1>

          <p className={styles.sub}>
            We craft cutting-edge web, mobile, and AI solutions that transform
            ideas into powerful digital products.
          </p>

          <div className={styles.ctaRow}>
            <a href="#portfolio" className={`btn-primary ${styles.btnHero}`}>
              <span>Explore Our Work</span>
              <FiArrowRight size={16} />
            </a>
            <a href="#contact" className={`btn-outline ${styles.btnHero}`}>
              <span>Get a Quote</span>
            </a>
          </div>

          {/* ── Trust badges ──────────────────────────────────────── */}
          <div className={styles.badges}>
            {BADGES.map(({ icon, label, title }) => (
              <span key={label} className={styles.badge} title={title}>
                {icon}
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ══ RIGHT – brand showcase card ══════════════════════════════ */}
        <div className={styles.videoCol}>
          {/* Glow rings */}
          <div className={styles.glowRing}  aria-hidden="true" />
          <div className={styles.glowRing2} aria-hidden="true" />

          <div className={styles.videoCard}>
            {/* Card header */}
            <div className={styles.cardHeader}>
              <img
                src="/kernqode-icon.jpg"
                alt="KernQode Labs"
                className={styles.cardIcon}
              />
              <div className={styles.cardMeta}>
                <span className={styles.cardTitle}>KernQode Labs</span>
                <span className={styles.cardSub}>Full-Stack Digital Agency</span>
              </div>
              <div className={styles.dots} aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>

            {/* Brand center */}
            <div className={styles.brandCenter}>
              <img
                src="/kernqode-icon.jpg"
                alt="KernQode Labs Logo"
                className={styles.brandLogo}
              />
              <p className={styles.brandTagline}>
                Building Digital <span className="gradient-text">Excellence</span>
              </p>
              {/* Floating tech tags */}
              <div className={styles.techCloud}>
                {['React', 'Node.js', 'Python', 'Flutter', 'AI/ML', 'AWS', 'MongoDB', 'TypeScript'].map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
            </div>

            {/* Card footer stats */}
            <div className={styles.cardFooter}>
              <div className={styles.footerStat}>
                <strong>50+</strong><span>Projects</span>
              </div>
              <div className={styles.footerDivider} />
              <div className={styles.footerStat}>
                <strong>30+</strong><span>Clients</span>
              </div>
              <div className={styles.footerDivider} />
              <div className={styles.footerStat}>
                <strong>3+</strong><span>Years</span>
              </div>
            </div>
          </div>

          {/* Floating stat pills */}
          <div className={`${styles.floatPill} ${styles.pill1}`}>
            <FiStar size={13} /> 5.0 Rating
          </div>
          <div className={`${styles.floatPill} ${styles.pill2}`}>
            🚀 50+ Projects
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
