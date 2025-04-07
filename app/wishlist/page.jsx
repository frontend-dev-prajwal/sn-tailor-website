"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { useAuth } from "../context/page";
import styles from "./styles.module.scss";
import Navs from "../components/header/page";
import Footer from "../components/footer/page";

export default function WishlistPage() {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);

  // Track scroll direction to show/hide heading
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideHeader(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchWishlist = async () => {
    if (!currentUser) return;
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", currentUser.uid, "wishlist")
      );
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlist(items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "wishlist", id));
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [currentUser]);

  if (!currentUser) return <p>Please sign in to view your wishlist.</p>;
  if (loading) return <p>Loading wishlist...</p>;

  return (
    <>
      <Navs />
      <div className={styles.designsContainer}>
        <h2 className={`${styles.heading} ${hideHeader ? styles.hide : ""}`}>
          Your Wishlist 💖
        </h2>
        <div className={styles.cards}>
          <div className={styles.cardsGrid}>
            {wishlist.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={item.imageUrl} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => removeFromWishlist(item.id)}>
                  🗑 Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
