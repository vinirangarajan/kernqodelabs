import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiAward, FiBookOpen, FiFileText, FiArrowRight } from 'react-icons/fi';
import styles from './MyProjectKit.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: FiAward,
    title: 'UG Projects',
    desc: 'Complete undergraduate project development from ideation to deployment',
  },
  {
    icon: FiBookOpen,
    title: 'PG Research Projects',
    desc: 'Advanced postgraduate research implementation and documentation',
  },
  {
    icon: FiFileText,
    title: 'Paper Writing',
    desc: 'IEEE, Springer, and journal-ready research paper writing and formatting',
  },
];

export default function MyProjectKit() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const cardsRef    = useRef(null);
  const rightRef    = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards stagger
    gsap.fromTo(
      cardsRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Right logo panel
    gsap.fromTo(
      rightRef.current,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="mpk" className={styles.mpk} ref={sectionRef}>
      {/* Decorative bg particles */}
      <div className={styles.particle} style={{ top: '10%', left: '5%',  width: 280, height: 280 }} aria-hidden="true" />
      <div className={styles.particle} style={{ bottom: '8%', right: '4%', width: 340, height: 340 }} aria-hidden="true" />

      <div className="container">

        {/* ── Header ── */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.label}>Our Sub-Company</span>
          <h2 className={styles.title}>My Project Kit Solutions</h2>
          <p className={styles.tagline}>Projects Made Simple.</p>
          <p className={styles.desc}>
            A dedicated division of KernQode Labs specializing in academic excellence.
            We help students and researchers achieve their goals with high-quality project
            development and research support.
          </p>
        </div>

        {/* ── Body: cards + logo ── */}
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.cards} ref={cardsRef}>
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://myprojectkit.com"
              target="_blank"
              rel="noreferrer"
              className={styles.cta}
            >
              Explore My Project Kit
              <FiArrowRight />
            </a>
          </div>

          {/* ── Right: logo showcase ── */}
          <div className={styles.logoPanel} ref={rightRef}>
            <div className={styles.logoGlow} aria-hidden="true" />
            <div className={styles.logoMain}>
              <img
                src="/mpk-logo.jpg"
                alt="My Project Kit Solutions"
                className={styles.logoImg}
              />
            </div>
            <div className={styles.logoCircleWrap}>
              <img
                src="/mpk-circle.jpg"
                alt="My Project Kit"
                className={styles.logoCircle}
              />
            </div>
            <p className={styles.subBrand}>A KernQode Labs Company</p>
          </div>
        </div>

      </div>
    </section>
  );
}
