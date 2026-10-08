import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3,  suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

const TECH = ['React', 'Node.js', 'Python', 'Flutter', 'AWS'];

function StatCard({ value, suffix, label, trigger }) {
  const numRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!trigger || counted) return;
    setCounted(true);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });
  }, [trigger, counted, value, suffix]);

  return (
    <div className={styles.statCard}>
      <span className={styles.statValue} ref={numRef}>0{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
        onEnter: () => setStatsVisible(true),
      },
    });

    tl.fromTo(
      leftRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    ).fromTo(
      rightRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '<0.15'
    );
  }, { scope: sectionRef });

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>

          {/* ── Left column ── */}
          <div className={styles.left} ref={leftRef}>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              We Are{' '}
              <span className="gradient-text">KernQode Labs</span>
            </h2>
            <p className={styles.desc}>
              KernQode Labs is a full-service software development company dedicated
              to building exceptional digital products. From startups to enterprises,
              we partner with businesses to transform their vision into reality
              through cutting-edge technology and innovative design.
            </p>
            <p className={styles.desc}>
              Founded by passionate developers, we blend technical excellence with
              creative thinking to deliver solutions that are not just functional,
              but truly impactful.
            </p>
            <div className={styles.ctas}>
              <a href="#services" className="btn-primary">
                <span>Our Services →</span>
              </a>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className={styles.right} ref={rightRef}>
            <div className={styles.glowFrame}>
              <div className={styles.statsGrid}>
                {STATS.map((s) => (
                  <StatCard key={s.label} {...s} trigger={statsVisible} />
                ))}
              </div>

              <div className={styles.techRow}>
                <span className={styles.techLabel}>Tech Stack</span>
                <div className={styles.techBadges}>
                  {TECH.map((t) => (
                    <span key={t} className={styles.badge}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Decorative blobs */}
              <div className={styles.blob1} aria-hidden="true" />
              <div className={styles.blob2} aria-hidden="true" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
