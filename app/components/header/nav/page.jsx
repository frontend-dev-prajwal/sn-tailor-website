"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { menuSlide } from "../anim";
import Link from "./Link/page";
import Curve from "./Curve/page";
import Footer from "./Footer/page";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Designs", href: "/designs" },
    { title: "About", href: "/about" },
    { title: "Wishlist", href: "/wishlist" },
    ...(user
      ? [{ title: "Profile", href: "/profile" }]
      : [{ title: "Sign In", href: "/signin" }]),
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // ✅ redirect after sign out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            <Link
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}

          {user && (
            <>
              <div className={styles.userInfo}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className={styles.avatar}
                  />
                ) : (
                  <p className={styles.name}>
                    {user.displayName || user.email}
                  </p>
                )}
              </div>
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </>
          )}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}
