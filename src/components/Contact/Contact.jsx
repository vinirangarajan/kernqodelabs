import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiMail, FiPhone, FiMapPin,
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
  FiUser, FiMessageSquare, FiSend, FiAlertCircle,
} from 'react-icons/fi';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const INFO_CARDS = [
  { icon: FiMail,   title: 'Email Us',      detail: 'kernqodelabs@gmail.com' },
  { icon: FiPhone,  title: 'Call Us',        detail: '+91 98765 43210' },
  { icon: FiMapPin, title: 'Our Locations',  detail: 'Coimbatore · Erode · Chennai' },
];

const SOCIALS = [
  { icon: FiGithub,   href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiTwitter,  href: '#', label: 'Twitter' },
  { icon: FiInstagram,href: 'https://www.instagram.com/kernqodelabs?utm_source=qr&stkn=YmxyNHc5ZnJ2MWw0', label: 'Instagram' },
];

const INIT = { name: '', email: '', subject: '', message: '' };

function validate(fields) {
  const errs = {};
  if (!fields.name.trim())    errs.name    = 'Name is required.';
  if (!fields.email.trim())   errs.email   = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = 'Enter a valid email address.';
  if (!fields.subject.trim()) errs.subject = 'Subject is required.';
  if (!fields.message.trim()) errs.message = 'Message is required.';
  return errs;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  const [fields,      setFields]      = useState(INIT);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [serverError, setServerError] = useState('');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
    if (serverError)  setServerError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

      if (scriptUrl) {
        // Prepare FormData for the Google Apps Script Web App
        const formData = new FormData();
        formData.append('name', fields.name.trim());
        formData.append('email', fields.email.trim());
        formData.append('subject', fields.subject.trim());
        formData.append('message', fields.message.trim());
        formData.append('timestamp', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

        // mode: 'no-cors' is essential to bypass CORS restriction from Google Apps Script
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
      } else {
        // Fallback simulation when VITE_GOOGLE_SHEET_URL is not yet configured in .env
        await new Promise(r => setTimeout(r, 1200));
        console.info('Contact Form: VITE_GOOGLE_SHEET_URL not set. Form submitted in mock mode:', fields);
      }

      setLoading(false);
      setSuccess(true);
      setFields(INIT);
      setErrors({});
    } catch (err) {
      console.error('Contact form submission error:', err);
      setLoading(false);
      setServerError('Unable to send your message right now. Please reach out to us at kernqodelabs@gmail.com.');
    }
  }

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={sectionRef}>
      <div className="container">

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let&rsquo;s Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? We&rsquo;d love to hear about it. Drop us a message!
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div className={styles.grid}>

          {/* ── Left: contact info ── */}
          <div className={styles.infoCol} ref={leftRef}>
            <div className={styles.infoGlowCard}>
              <div className={styles.infoGlowBlob} aria-hidden="true" />

              {INFO_CARDS.map(({ icon: Icon, title, detail, sub }) => (
                <div key={title} className={styles.infoCard}>
                  <div className={styles.infoIcon}><Icon size={18} /></div>
                  <div>
                    <p className={styles.infoTitle}>{title}</p>
                    <p className={styles.infoDetail}>{detail}</p>
                    {sub && <p className={styles.infoSub}>{sub}</p>}
                  </div>
                </div>
              ))}

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
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className={styles.formCol} ref={rightRef}>
            <div className={styles.formWrap}>
            {loading && (
              <div className={styles.sendingOverlay} role="status" aria-live="polite">
                <div className={styles.sendingSpinner} aria-hidden="true" />
                <p className={styles.sendingText}>
                  Sending your message<span className={styles.sendingDots} aria-hidden="true" />
                </p>
              </div>
            )}
            {success ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We&rsquo;ll get back to you soon.</p>
                <button
                  className="btn-primary"
                  onClick={() => setSuccess(false)}
                >
                  <span>Send Another</span>
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {serverError && (
                  <div className={styles.errorAlert} role="alert">
                    <FiAlertCircle size={18} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Name */}
                <div className={`${styles.field} ${errors.name ? styles.hasError : ''}`}>
                  <span className={styles.fieldIcon}><FiUser size={16} /></span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={fields.name}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="name"
                  />
                  {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
                </div>

                {/* Email */}
                <div className={`${styles.field} ${errors.email ? styles.hasError : ''}`}>
                  <span className={styles.fieldIcon}><FiMail size={16} /></span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={fields.email}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="email"
                  />
                  {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
                </div>

                {/* Subject */}
                <div className={`${styles.field} ${errors.subject ? styles.hasError : ''}`}>
                  <span className={styles.fieldIcon}><FiMessageSquare size={16} /></span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={fields.subject}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.subject && <span className={styles.errMsg}>{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className={`${styles.field} ${styles.fieldTextarea} ${errors.message ? styles.hasError : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project…"
                    value={fields.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                  />
                  {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className={styles.spinner} aria-label="Sending…" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend size={16} />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
