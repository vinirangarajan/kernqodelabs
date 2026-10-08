import { useState, useEffect } from 'react';
import { FiMail, FiX, FiChevronUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingConnectors.module.css';

/* ── Contact config ────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '919876543210'; // TODO: Replace with real WhatsApp number (countrycode+number, no +)
const WHATSAPP_MESSAGE =
  "Hello KernQode Labs! 👋 I'm interested in your services. Could we discuss my project?";

const EMAIL_ADDRESS = 'kernqodelabs@gmail.com';
const EMAIL_SUBJECT = 'Project Inquiry — KernQode Labs';
const EMAIL_BODY =
  `Hello KernQode Labs Team,\n\nI came across your website and I'm interested in your services.\nI'd love to discuss my project requirements with you.\n\nLooking forward to hearing from you!\n\nBest regards,`;

export default function FloatingConnectors() {
  const [showScroll, setShowScroll] = useState(false);
  const [expanded, setExpanded]     = useState(false);

  /* Show scroll-to-top after 400px */
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const mailHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

  return (
    <div className={styles.cluster}>

      {/* ── Scroll to top ── */}
      <button
        className={`${styles.fab} ${styles.scrollTop} ${showScroll ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <FiChevronUp size={20} />
      </button>

      {/* ── Email connector ── */}
      <a
        href={mailHref}
        className={`${styles.fab} ${styles.emailFab} ${expanded ? styles.show : ''}`}
        aria-label="Send us an email"
        title="Email Us"
        target="_blank"
        rel="noreferrer"
      >
        <FiMail size={22} />
        <span className={styles.fabLabel}>Email Us</span>
      </a>

      {/* ── WhatsApp connector ── */}
      <a
        href={waHref}
        className={`${styles.fab} ${styles.waFab} ${expanded ? styles.show : ''}`}
        aria-label="Chat on WhatsApp"
        title="WhatsApp Us"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp size={24} />
        <span className={styles.fabLabel}>WhatsApp</span>
      </a>

      {/* ── Toggle button ── */}
      <button
        className={`${styles.fab} ${styles.toggleFab} ${expanded ? styles.open : ''}`}
        onClick={() => setExpanded(e => !e)}
        aria-label={expanded ? 'Close connectors' : 'Open connectors'}
        title="Contact Us"
      >
        {expanded ? <FiX size={22} /> : <FaWhatsapp size={24} />}
        {!expanded && <span className={styles.togglePulse} aria-hidden="true" />}
      </button>

    </div>
  );
}
