"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Navs from "./components/header/page";
import Hero from "./components/hero/page";
import Footer from "./components/footer/page";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/preloader/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <div className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Navs />
      <Hero />
      <Footer />
    </div>
  );
}
