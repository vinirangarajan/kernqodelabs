import { useState, useEffect } from 'react';
import {
  FiAlertTriangle, FiWifi, FiLock, FiServer,
  FiClock, FiRefreshCw, FiHome, FiArrowLeft,
  FiSearch
} from 'react-icons/fi';
import styles from './ErrorPage.module.css';

/* ─── Error type config ─────────────────────────────────────────────── */
const ERROR_CONFIG = {
  404: {
    code: '404',
    icon: FiSearch,
    title: 'Page Not Found',
    subtitle: 'Oops! The page you\'re looking for has drifted into the void.',
    description: 'It might have been moved, deleted, or you may have typed the URL incorrectly.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
    actions: ['home', 'back'],
  },
  500: {
    code: '500',
    icon: FiServer,
    title: 'Internal Server Error',
    subtitle: 'Something went wrong on our end.',
    description: 'Our team has been notified and is working hard to fix this. Please try again in a few moments.',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
    actions: ['retry', 'home'],
  },
  503: {
    code: '503',
    icon: FiClock,
    title: 'Service Unavailable',
    subtitle: 'We\'re currently undergoing maintenance.',
    description: 'We\'ll be back shortly. Thanks for your patience while we improve things for you.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    actions: ['retry', 'home'],
  },
  403: {
    code: '403',
    icon: FiLock,
    title: 'Access Forbidden',
    subtitle: 'You don\'t have permission to access this page.',
    description: 'This area is restricted. If you believe this is a mistake, please contact support.',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #7C3AED)',
    actions: ['home', 'back'],
  },
  offline: {
    code: '⚡',
    icon: FiWifi,
    title: 'No Internet Connection',
    subtitle: 'You appear to be offline.',
    description: 'Please check your network connection and try again.',
    color: '#6B7280',
    gradient: 'linear-gradient(135deg, #6B7280, #374151)',
    actions: ['retry', 'home'],
  },
  generic: {
    code: '!',
    icon: FiAlertTriangle,
    title: 'Something Went Wrong',
    subtitle: 'An unexpected error occurred.',
    description: 'Please try refreshing the page. If the problem persists, contact our support team.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #EC4899)',
    actions: ['retry', 'home'],
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ErrorPage({
  type = 'generic',
  onRetry,
  onGoHome,
  onGoBack,
  customMessage,
}) {
  const config = ERROR_CONFIG[type] || ERROR_CONFIG.generic;
  const IconComponent = config.icon;
  const [retrying, setRetrying] = useState(false);
  const [dots, setDots] = useState('');

  // Animated dots while retrying
  useEffect(() => {
    if (!retrying) return;
    const id = setInterval(() => {
      setDots(d => (d.length < 3 ? d + '.' : ''));
    }, 400);
    return () => clearInterval(id);
  }, [retrying]);

  async function handleRetry() {
    setRetrying(true);
    await new Promise(r => setTimeout(r, 2000));
    setRetrying(false);
    onRetry?.();
  }

  function handleGoHome() {
    onGoHome ? onGoHome() : (window.location.href = '/');
  }

  function handleGoBack() {
    onGoBack ? onGoBack() : window.history.back();
  }

  return (
    <div className={styles.page} data-theme="dark">
      {/* Ambient background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.blob1} style={{ background: `radial-gradient(circle, ${config.color}33, transparent 70%)` }} />
        <div className={styles.blob2} style={{ background: `radial-gradient(circle, ${config.color}22, transparent 70%)` }} />
        <div className={styles.grid} />
      </div>

      <div className={styles.card}>
        {/* Error code */}
        <div className={styles.codeWrap}>
          <span className={styles.codeText} style={{ backgroundImage: config.gradient }}>
            {config.code}
          </span>
          <div className={styles.codeGlow} style={{ background: `radial-gradient(circle, ${config.color}40, transparent 60%)` }} />
        </div>

        {/* Icon badge */}
        <div className={styles.iconBadge} style={{ borderColor: `${config.color}40`, background: `${config.color}15` }}>
          <IconComponent size={28} style={{ color: config.color }} />
        </div>

        {/* Text */}
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>{customMessage || config.subtitle}</p>
        <p className={styles.description}>{config.description}</p>

        {/* Actions */}
        <div className={styles.actions}>
          {config.actions.includes('retry') && (
            <button
              className={styles.btnPrimary}
              style={{ background: config.gradient }}
              onClick={handleRetry}
              disabled={retrying}
            >
              {retrying ? (
                <>
                  <span className={styles.spinner} />
                  Retrying{dots}
                </>
              ) : (
                <>
                  <FiRefreshCw size={16} />
                  Try Again
                </>
              )}
            </button>
          )}

          {config.actions.includes('home') && (
            <button className={styles.btnOutline} onClick={handleGoHome}>
              <FiHome size={16} />
              Go Home
            </button>
          )}

          {config.actions.includes('back') && (
            <button className={styles.btnGhost} onClick={handleGoBack}>
              <FiArrowLeft size={16} />
              Go Back
            </button>
          )}
        </div>

        {/* Support link */}
        <p className={styles.support}>
          Need help?{' '}
          <a href="mailto:kernqodelabs@gmail.com" className={styles.supportLink}>
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
