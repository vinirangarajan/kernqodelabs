import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const steps = [
      { target: 30, delay: 0,    duration: 400 },
      { target: 65, delay: 400,  duration: 500 },
      { target: 90, delay: 900,  duration: 400 },
      { target: 100, delay: 1300, duration: 300 },
    ];

    const timers = [];

    steps.forEach(({ target, delay }) => {
      timers.push(setTimeout(() => setProgress(target), delay));
    });

    // Start fade-out after progress hits 100
    timers.push(
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => onComplete?.(), 600);
      }, 1700)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`} aria-live="polite" role="status">
      {/* Background orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        {/* Logo mark */}
        <div className={styles.logoWrap}>
          <div className={styles.logoRing} aria-hidden="true" />
          <img
            src="/kernqode-icon.jpg"
            alt="KernQode Labs"
            className={styles.logoImg}
          />
        </div>

        {/* Brand name */}
        <h1 className={styles.brand}>
          Kern<span className={styles.accent}>Qode</span> Labs
        </h1>
        <p className={styles.tagline}>Building the digital future</p>

        {/* Progress bar */}
        <div className={styles.barTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.percent}>{progress}%</span>
      </div>
    </div>
  );
}
