'use client';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h2>SN TAILOR</h2>
          <p>Crafting elegance, one stitch at a time.</p>
        </div>

        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/designs">Designs</a>          
          <a href="/contact">Contact</a>
        </div>

        <div className={styles.contact}>
          <p><strong>Email:</strong> sangitanikhar1@gmail.com</p>
          <p className={styles.para}><strong>Phone:</strong> +91-7020780797</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} SN Tailor. All rights reserved.</p>
      </div>
    </footer>
  );
}
