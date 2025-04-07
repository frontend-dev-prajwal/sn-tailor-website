'use client';
import styles from './styles.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>            
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>Custom Tailoring, Redefined</h1>
          <p>Experience bespoke fashion with precision, elegance, and timeless craftsmanship.</p>
          <a href='/designs'><button>Choose your perfect</button></a>
        </div>
      </div>
    </section>
  );
}
