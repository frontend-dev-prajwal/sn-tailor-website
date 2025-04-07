"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import styles from "./styles.module.scss";

export default function About() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pulled, setPulled] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePull = () => {
    setPulled(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setPulled(false);
    }, 400);
  };

  return (
    <main className={styles.about}>
      <div className={styles.header}>
        <h1>About SN Tailor</h1>

        <div className={styles.lampWrapper} onClick={handlePull}>
          <svg
            viewBox="0 0 100 140"
            className={styles.lampSvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lamp string */}
            <motion.line
              x1="50"
              y1="0"
              x2="50"
              y2="60"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ y2: pulled ? 80 : 60 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            {/* Glowing Bulb */}
            <motion.circle
              cx="50"
              cy="90"
              r="20"
              fill="currentColor"
              className={styles.bulb}
              animate={
                theme === "dark"
                  ? {
                      scale: [1, 1.05, 1],
                      opacity: [1, 0.8, 1],
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={
                theme === "dark"
                  ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 }
              }
            />
            {/* Lamp body */}
            <rect x="45" y="110" width="10" height="20" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.section}>
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
            className={styles.row}
          >
            <Phone />
            <span>+91- 7020780797</span>
          </motion.div>
        </div>

        <div className={styles.section}>
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.2,
            }}
            className={styles.row}
          >
            <Mail />
            <span>sangitanikhar1@gmail.com</span>
          </motion.div>
        </div>

        <div className={styles.section}>
          <h2>Address</h2>
          <p>Plot Number 03,</p>
          <p>Netaji co-operative housing society,</p>
          <p>Katol Road,</p>
          <p>Nagpur, Maharashtra, India - 440013</p>
        </div>

        <div className={styles.section}>
          <h2>Location</h2>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d465.0492957769712!2d79.0355643!3d21.1764872!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1cf574a4501%3A0x3e37aa0b0913c497!2s10%2C%20Kranti%20Surya%20Nagar%2C%20Jagdish%20Nagar%2C%20Vrindavan%20Colony%2C%20Nagpur%2C%20Maharashtra%20440013!5e0!3m2!1sen!2sin!4v1743933027913!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
