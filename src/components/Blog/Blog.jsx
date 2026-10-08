import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiX, FiClock, FiCalendar, FiUser } from 'react-icons/fi';
import { posts } from 'virtual:posts';
import styles from './Blog.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Category config: label → color key ────────────────────────────────── */
const CATEGORIES = [
  'All',
  'Global News',
  'Company News',
  'Tutorial',
  'Tips',
  'Our Story',
  'Developer Story',
];

const CATEGORY_COLOR = {
  'Global News':     'blue',
  'Company News':    'purple',
  'Tutorial':        'green',
  'Tips':            'orange',
  'Our Story':       'pink',
  'Developer Story': 'cyan',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/* ─── Article Modal ─────────────────────────────────────────────────────── */
function ArticleModal({ post, onClose }) {
  const { frontmatter, html } = post;

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const colorKey = CATEGORY_COLOR[frontmatter.category] || 'purple';

  return (
    <div
      className={styles.articleOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
      aria-label={frontmatter.title}
    >
      <article className={styles.articleBox}>
        {/* Cover */}
        <div className={styles.articleCoverWrap}>
          <img
            src={frontmatter.cover}
            alt={frontmatter.title}
            className={styles.articleCover}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/kernqode-logo.png';
            }}
          />
          <div className={styles.articleCoverGradient} />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close article">
            <FiX />
          </button>
          {/* Category badge over cover */}
          <span className={`${styles.modalCategoryBadge} ${styles[`cat_${colorKey}`]}`}>
            {frontmatter.category}
          </span>
        </div>

        {/* Content */}
        <div className={styles.articleContent}>
          <div className={styles.articleMeta}>
            <FiCalendar size={13} />
            <span>{formatDate(frontmatter.date)}</span>
            <span>·</span>
            <FiUser size={13} />
            <span>{frontmatter.author}</span>
            <span>·</span>
            <FiClock size={13} />
            <span>{frontmatter.readTime}</span>
          </div>

          <h1 className={styles.articleTitle}>{frontmatter.title}</h1>

          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </div>
  );
}

/* ─── Blog Card ─────────────────────────────────────────────────────────── */
function BlogCard({ post, onClick }) {
  const { frontmatter } = post;
  const colorKey = CATEGORY_COLOR[frontmatter.category] || 'purple';

  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Read: ${frontmatter.title}`}
    >
      {/* ── Photo ── */}
      <div className={styles.photoWrap}>
        <img
          src={frontmatter.cover}
          alt={frontmatter.title}
          className={styles.photo}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/kernqode-logo.png';
          }}
        />
        <div className={styles.photoOverlay} />

        {/* Category badge — top-left over photo */}
        <span className={`${styles.categoryBadge} ${styles[`cat_${colorKey}`]}`}>
          {frontmatter.category}
        </span>

        {/* Read time — bottom-right over photo */}
        <span className={styles.readTimeBadge}>
          <FiClock size={11} /> {frontmatter.readTime}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className={styles.cardBody}>
        {/* Date */}
        <span className={styles.cardDate}>
          <FiCalendar size={12} /> {formatDate(frontmatter.date)}
        </span>

        {/* Title — the star of the card */}
        <h3 className={styles.cardTitle}>{frontmatter.title}</h3>

        {/* Excerpt */}
        <p className={styles.cardExcerpt}>{frontmatter.excerpt}</p>

        {/* CTA */}
        <span className={`${styles.readMore} ${styles[`readMore_${colorKey}`]}`}>
          Read article <FiArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}

/* ─── Blog Section ──────────────────────────────────────────────────────── */
export default function Blog() {
  const [activePost, setActivePost]       = useState(null);
  const [activeFilter, setActiveFilter]   = useState('All');
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? posts
    : posts.filter((p) => p.frontmatter.category === activeFilter);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(`.${styles.card}`),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [activeFilter] });

  return (
    <section className={styles.section} id="blog" ref={sectionRef}>
      <div className="container">

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            From Our Team
          </div>
          <h2 className={styles.title}>
            Latest from the <span className={styles.titleAccent}>Blog</span>
          </h2>
          <p className={styles.subtitle}>
            Tutorials, company news, and stories straight from the
            KernQode Labs team.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className={styles.filterRow} role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const colorKey = CATEGORY_COLOR[cat];
            return (
              <button
                key={cat}
                className={`${styles.filterPill} ${activeFilter === cat ? styles.filterPillActive : ''} ${colorKey ? styles[`pill_${colorKey}`] : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Cards Grid ── */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                onClick={() => setActivePost(post)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span>No posts in this category yet.</span>
          </div>
        )}

      </div>

      {/* ── Article Modal ── */}
      {activePost && (
        <ArticleModal
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      )}
    </section>
  );
}
