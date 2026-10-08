import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import styles from './Reviews.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── Add real client reviews here when ready ──────────────────────────────
// Format:
// { name, role, rating (1-5), text, avatar (2-letter initials), color (hex) }
const REVIEWS = [];

export default function Reviews() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(`.${styles.header} > *`, {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    gsap.from(`.${styles.comingSoon}`, {
      opacity: 0, y: 40, scale: 0.96, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: `.${styles.comingSoon}`, start: 'top 85%', once: true },
    });
    if (REVIEWS.length > 0) {
      gsap.from(`.${styles.card}`, {
        opacity: 0, y: 50, scale: 0.96, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 82%', once: true },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="reviews" className={`section ${styles.reviews}`} ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">⭐ Client Reviews</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Real feedback from the businesses and students we've had the pleasure of working with.
          </p>
        </div>

        {REVIEWS.length === 0 ? (
          /* ── Coming Soon placeholder ── */
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>
              <FiMessageSquare size={36} />
            </div>
            <div className={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(i => (
                <FiStar key={i} size={22} className={styles.starIcon} />
              ))}
            </div>
            <h3 className={styles.comingSoonTitle}>Reviews Coming Soon</h3>
            <p className={styles.comingSoonDesc}>
              We're collecting feedback from our amazing clients.<br />
              Check back soon — great things take a little time! 🚀
            </p>
            <a href="#contact" className="btn-primary">
              <span>Work With Us</span>
            </a>
          </div>
        ) : (
          /* ── Reviews grid ── */
          <div className={styles.grid}>
            {REVIEWS.map(({ name, role, rating, text, avatar, color }) => (
              <div key={name} className={styles.card}>
                <span className={styles.quote} aria-hidden="true">"</span>
                <div className={styles.stars}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <FiStar key={i} size={14} className={styles.star} />
                  ))}
                </div>
                <p className={styles.text}>{text}</p>
                <div className={styles.reviewer}>
                  <div
                    className={styles.avatar}
                    style={{ background: `${color}22`, border: `2px solid ${color}44`, color }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <p className={styles.reviewerName}>{name}</p>
                    <p className={styles.reviewerRole}>{role}</p>
                  </div>
                </div>
                <div className={styles.accentLine} style={{ background: color }} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
