import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiMonitor,
  FiSmartphone,
  FiLayout,
  FiCpu,
  FiCloud,
  FiShoppingCart,
  FiCode,
  FiBook,
} from 'react-icons/fi';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: FiMonitor,
    title: 'Web Development',
    description:
      'Responsive, fast, and beautiful web applications built with modern frameworks',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android',
  },
  {
    icon: FiLayout,
    title: 'UI/UX Design',
    description:
      'User-centered design that combines aesthetics with seamless functionality',
  },
  {
    icon: FiCpu,
    title: 'AI & Machine Learning',
    description:
      'Intelligent systems, ML models, and AI-powered application integrations',
  },
  {
    icon: FiCloud,
    title: 'DevOps & Cloud',
    description:
      'Infrastructure automation, CI/CD pipelines, and scalable cloud architecture',
  },
  {
    icon: FiShoppingCart,
    title: 'E-Commerce Solutions',
    description:
      'Full-featured online stores with payment gateways and inventory management',
  },
  {
    icon: FiCode,
    title: 'Custom Software',
    description:
      'Bespoke software solutions engineered precisely to your specifications',
  },
  {
    icon: FiBook,
    title: 'Academic Projects',
    description:
      'UG & PG projects, research papers, and academic software solutions',
  },
];

/* ─── 3-D Tilt Handler ───────────────────────────────────────────────── */
function useTilt() {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 → +1
    const dy = (e.clientY - cy) / (rect.height / 2);   // -1 → +1
    const MAX = 15;
    card.style.transform = `perspective(1000px) rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null);
  const { handleMouseMove, handleMouseLeave } = useTilt();

  useGSAP(
    () => {
      /* Header reveal */
      gsap.fromTo(
        `.${styles.header} > *`,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* Cards stagger — fromTo guarantees visible end state even on hard refresh */
      gsap.fromTo(
        `.${styles.card}`,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: `.${styles.grid}`,
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="services" className={`section ${styles.services}`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            End-to-end software solutions tailored to your business needs
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className={styles.card}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Icon */}
              <div className={styles.iconWrap}>
                <Icon size={26} />
              </div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>

              {/* CTA */}
              <span className={styles.learnMore}>
                Learn more <span className={styles.arrow}>→</span>
              </span>

              {/* Bottom gradient line */}
              <div className={styles.bottomLine} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
