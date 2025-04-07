"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { opacity, slideUp } from "./anim"; // ✅ Import animations

export default function Preloads({ pageName, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={styles.introduction}
      variants={slideUp} // ✅ Use slideUp animation
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.p variants={opacity} initial="initial" animate="enter">
        <span></span>
        {pageName}
      </motion.p>
    </motion.div>
  );
}
