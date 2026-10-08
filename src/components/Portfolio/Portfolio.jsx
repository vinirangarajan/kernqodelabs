import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiGlobe,
  FiSmartphone,
  FiCpu,
  FiShoppingCart,
  FiArrowUpRight,
} from 'react-icons/fi';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB'],
    desc: 'A full-featured e-commerce platform with real-time inventory and analytics',
    color: '#7C3AED',
  },
  {
    title: 'Healthcare Mobile App',
    category: 'mobile',
    tags: ['React Native', 'Firebase'],
    desc: 'Patient management and telemedicine app for a leading healthcare provider',
    color: '#4F46E5',
  },
  {
    title: 'AI Analytics Dashboard',
    category: 'ai',
    tags: ['Python', 'TensorFlow', 'React'],
    desc: 'Real-time data analytics platform with ML-powered predictions',
    color: '#EC4899',
  },
  {
    title: 'Restaurant Ordering System',
    category: 'ecommerce',
    tags: ['Next.js', 'Stripe'],
    desc: 'Digital ordering and delivery management for restaurant chains',
    color: '#06B6D4',
  },
  {
    title: 'EdTech Learning Platform',
    category: 'web',
    tags: ['Vue.js', 'Django'],
    desc: 'Interactive e-learning platform with live classes and course management',
    color: '#10B981',
  },
  {
    title: 'Fleet Management System',
    category: 'mobile',
    tags: ['Flutter', 'Node.js'],
    desc: 'GPS-enabled fleet tracking and management mobile application',
    color: '#F59E0B',
  },
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'AI/ML', value: 'ai' },
  { label: 'E-Commerce', value: 'ecommerce' },
];

/* Category → icon map */
const CATEGORY_ICON = {
  web: FiGlobe,
  mobile: FiSmartphone,
  ai: FiCpu,
  ecommerce: FiShoppingCart,
};

/* ─── Component ──────────────────────────────────────────────────────── */
export default function Portfolio() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visible, setVisible] = useState(PROJECTS);

  /* Filter logic with smooth fade */
  useEffect(() => {
    const filtered =
      activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter);

    /* Fade out → update → fade in */
    if (gridRef.current) {
      gsap.to(`.${styles.card}`, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.04,
        ease: 'power2.in',
        onComplete: () => {
          setVisible(filtered);
        },
      });
    } else {
      setVisible(filtered);
    }
  }, [activeFilter]);

  /* Re-animate when visible list changes */
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      `.${styles.card}`,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }
    );
  }, [visible]);

  /* Initial reveal */
  useGSAP(
    () => {
      gsap.from(`.${styles.header} > *`, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(`.${styles.filters}`, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from(`.${styles.card}`, {
        opacity: 0,
        y: 50,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="portfolio" className={`section ${styles.portfolio}`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of our recent work across different domains
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filters} role="tablist" aria-label="Project filters">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={activeFilter === value}
              className={`${styles.filterBtn} ${activeFilter === value ? styles.active : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid} ref={gridRef}>
          {visible.map((project) => {
            const CategoryIcon = CATEGORY_ICON[project.category] ?? FiGlobe;
            return (
              <article key={project.title} className={styles.card}>
                {/* Image placeholder */}
                <div
                  className={styles.thumbnail}
                  style={{
                    background: `linear-gradient(135deg, ${project.color}cc 0%, ${project.color}44 100%)`,
                  }}
                >
                  <div
                    className={styles.thumbnailIcon}
                    style={{ color: project.color }}
                  >
                    <CategoryIcon size={40} />
                  </div>
                  {/* Decorative blobs */}
                  <div
                    className={styles.blob1}
                    style={{ background: project.color }}
                  />
                  <div
                    className={styles.blob2}
                    style={{ background: project.color }}
                  />
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>

                  {/* Tags */}
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className={styles.cardDesc}>{project.desc}</p>

                  <button
                    className={styles.viewBtn}
                    style={{ '--accent': project.color }}
                  >
                    View Project <FiArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
