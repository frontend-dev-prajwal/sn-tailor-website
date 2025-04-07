import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://www.instagram.com/_sn_tailors_05/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ pointerEvents: "auto" }}
      >
        Instagram
      </a>
    </div>
  );
}
