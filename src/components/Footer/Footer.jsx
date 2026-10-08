import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
  FiMail, FiPhone, FiMapPin,
} from 'react-icons/fi';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_LINKS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud Solutions',
  'API Development',
  'DevOps & CI/CD',
  'AI & ML Solutions',
  'Consulting',
];

const COMPANY_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Blog',     href: '#blog' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'Careers',  href: '#careers' },
];

const SOCIALS = [
  { icon: FiGithub,    href: '#', label: 'GitHub' },
  { icon: FiLinkedin,  href: '#', label: 'LinkedIn' },
  { icon: FiTwitter,   href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: 'https://www.instagram.com/kernqodelabs?utm_source=qr&stkn=YmxyNHc5ZnJ2MWw0', label: 'Instagram' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current.querySelectorAll(`.${styles.col}`),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer className={styles.footer} ref={footerRef}>

      {/* ── 3-D layered wave ── */}
      <div className={styles.waveWrap} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Layer 3 — deepest, slowest */}
          <path
            className={`${styles.wave} ${styles.wave3}`}
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          />
          {/* Layer 2 — mid */}
          <path
            className={`${styles.wave} ${styles.wave2}`}
            d="M0,70 C180,30 360,100 540,70 C720,40 900,90 1080,70 C1260,50 1350,80 1440,70 L1440,120 L0,120 Z"
          />
          {/* Layer 1 — top, fastest */}
          <path
            className={`${styles.wave} ${styles.wave1}`}
            d="M0,80 C120,50 240,100 360,80 C480,60 600,100 720,80 C840,60 960,100 1080,80 C1200,60 1320,95 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="container">

        {/* ── Four-column grid ── */}
        <div className={styles.grid}>

          {/* Col 1: Brand */}
          <div className={styles.col}>
            <a href="#hero" className={styles.logoLink}>
              <img
                src="/kernqode-logo.png"
                alt="KernQode Labs"
                className={styles.logo}
              />
            </a>
            <p className={styles.brandDesc}>
              We build exceptional digital products that transform businesses.
              From idea to launch, we&rsquo;re your dedicated technology partner.
            </p>

            {/* Sub-brand badge */}
            <div className={styles.subBrand}>
              <img src="/mpk-circle.jpg" alt="MPK" className={styles.subBrandIcon} />
              <div>
                <span className={styles.subBrandName}>My Project Kit</span>
                <span className={styles.subBrandTagline}>A KernQode Labs Company</span>
              </div>
            </div>

            {/* Socials */}
            <div className={styles.socials}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialIcon}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className={styles.link}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={styles.link}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <FiMail size={15} className={styles.contactIcon} />
                <span>hello@kernqodelabs.com</span>
              </li>
              <li>
                <FiPhone size={15} className={styles.contactIcon} />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <FiMapPin size={15} className={styles.contactIcon} />
                <span>Coimbatore · Erode · Chennai</span>
              </li>
              <li className={styles.remoteNote}>
                Remote-first · Tamil Nadu, India
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2024 KernQode Labs. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <span className={styles.heart}>♥</span> in India
          </p>
        </div>

      </div>
    </footer>
  );
}
