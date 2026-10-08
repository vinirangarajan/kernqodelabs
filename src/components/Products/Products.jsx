import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiBell, FiMapPin, FiSmartphone, FiWifi,
  FiMoon, FiNavigation, FiZap,
} from 'react-icons/fi';
import styles from './Products.module.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: FiBell,       label: 'Smart Destination Alert',  desc: 'Get notified before you reach your stop — never miss it.' },
  { icon: FiMapPin,     label: 'Real-Time GPS Tracking',   desc: 'Live location monitoring throughout your entire journey.' },
  { icon: FiMoon,       label: 'Sleep Mode Friendly',      desc: 'Designed for nappers — alerts work even when the screen is off.' },
  { icon: FiNavigation, label: 'Multi-Transport Support',  desc: 'Works for bus, train, metro, car, and shared rides.' },
  { icon: FiWifi,       label: 'Offline Capable',          desc: 'Core alert features work with limited connectivity.' },
  { icon: FiZap,        label: 'Low Battery Impact',       desc: 'Optimised for minimal battery drain during long commutes.' },
];

export default function Products() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Header
    gsap.from(`.${styles.header} > *`, {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    // Left column
    gsap.from(`.${styles.left}`, {
      opacity: 0, x: -60, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%', once: true },
    });
    // Right phone mockup
    gsap.from(`.${styles.right}`, {
      opacity: 0, x: 60, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%', once: true },
    });
    // Feature items stagger
    gsap.from(`.${styles.feature}`, {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.features}`, start: 'top 85%', once: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="products" className={`section ${styles.products}`} ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">🛠️ In Development</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Products</span>
          </h2>
          <p className="section-subtitle">
            Innovations we're building in-house — tools that solve real everyday problems.
          </p>
        </div>

        {/* Product card */}
        <div className={styles.card}>
          <div className={styles.grid}>

            {/* ── Left: Info ───────────────────────────────────── */}
            <div className={styles.left}>
              {/* Status badge */}
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} />
                Actively in Development
              </span>

              {/* App name */}
              <div className={styles.appNameRow}>
                <div className={styles.appIconWrap}>
                  <FiNavigation size={28} color="#fff" />
                </div>
                <div>
                  <h3 className={styles.appName}>Nearlee</h3>
                  <p className={styles.appCategory}>Smart Travel Companion</p>
                </div>
              </div>

              {/* Description */}
              <p className={styles.appDesc}>
                Nearlee is a destination-alert app designed for everyday commuters.
                Set your destination, take a nap, and Nearlee will wake you up
                before you reach your stop — whether you're on a bus, train, metro, or car.
                Never miss your destination again.
              </p>

              {/* Platform badges */}
              <div className={styles.platforms}>
                <span className={styles.platformBadge}>
                  <FiSmartphone size={14} /> Android
                </span>
                <span className={styles.platformBadgeComing}>
                  🍎 iOS — Coming Soon
                </span>
              </div>

              {/* Features grid */}
              <div className={styles.features}>
                {FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className={styles.feature}>
                    <div className={styles.featureIcon}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className={styles.featureLabel}>{label}</p>
                      <p className={styles.featureDesc}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Phone Mockup ───────────────────────── */}
            <div className={styles.right}>
              <div className={styles.phoneWrap}>
                {/* Glow behind phone */}
                <div className={styles.phoneGlow} aria-hidden="true" />

                <div className={styles.phone}>
                  {/* Speaker + camera */}
                  <div className={styles.phoneTop}>
                    <div className={styles.phoneSpeaker} />
                    <div className={styles.phoneCamera} />
                  </div>

                  {/* Screen */}
                  <div className={styles.phoneScreen}>
                    {/* Status bar */}
                    <div className={styles.statusBar}>
                      <span>9:41</span>
                      <FiWifi size={11} />
                    </div>

                    {/* App UI */}
                    <div className={styles.appUI}>
                      <div className={styles.appHeader}>
                        <FiNavigation size={18} color="#7C3AED" />
                        <span className={styles.appHeaderLabel}>Nearlee</span>
                      </div>

                      {/* Map placeholder */}
                      <div className={styles.mapPlaceholder}>
                        <div className={styles.mapGrid} />
                        <div className={styles.mapPin}>
                          <FiMapPin size={20} color="#7C3AED" />
                        </div>
                        <div className={styles.mapRoute} />
                      </div>

                      {/* Destination card */}
                      <div className={styles.destCard}>
                        <div className={styles.destInfo}>
                          <p className={styles.destLabel}>Destination</p>
                          <p className={styles.destName}>Central Station</p>
                        </div>
                        <div className={styles.destEta}>
                          <p className={styles.etaNum}>3</p>
                          <p className={styles.etaUnit}>stops</p>
                        </div>
                      </div>

                      {/* Alert bar */}
                      <div className={styles.alertBar}>
                        <FiBell size={14} color="#7C3AED" />
                        <span>Alert set · Arriving in 12 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Home button */}
                  <div className={styles.homeBtn} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
