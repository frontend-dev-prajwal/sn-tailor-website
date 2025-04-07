"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Nav from "./nav/page";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navs() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <a href="/">
            <Image
              src="/logo.png"
              alt="sn-tailor"
              width={80}
              height={80}
              className={styles.image}
            />
          </a>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={styles.button}
          >
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
