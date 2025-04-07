"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { useAuth } from "../context/page";
import styles from "./styles.module.scss";
import Navs from "../components/header/page";
import Footer from "../components/footer/page";
import { AnimatePresence } from "framer-motion";
import Preloads from "../preloads/preload";

export default function DesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { currentUser } = useAuth();
  const [preloadComplete, setPreloadComplete] = useState(false);

  // Fetch all designs
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "designs"));
        const fetchedDesigns = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDesigns(fetchedDesigns);
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  // Fetch wishlist IDs for current user to disable added designs
  useEffect(() => {
    const fetchWishlistIds = async () => {
      if (!currentUser) return;
      try {
        const wishlistSnapshot = await getDocs(
          collection(db, "users", currentUser.uid, "wishlist")
        );
        const ids = wishlistSnapshot.docs.map((doc) => doc.id);
        setWishlistIds(ids);
      } catch (error) {
        console.error("Error fetching wishlist IDs:", error);
      }
    };

    fetchWishlistIds();
  }, [currentUser]);

  // Add a design to wishlist
  const addToWishlist = async (design) => {
    if (!currentUser) {
      alert("Please sign in to add to wishlist.");
      return;
    }

    try {
      await setDoc(doc(db, "users", currentUser.uid, "wishlist", design.id), {
        ...design,
      });
      setWishlistIds((prev) => [...prev, design.id]);
      alert(`${design.name} added to wishlist!`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  if(!preloadComplete){
    return (
      <AnimatePresence mode="wait">
        <Preloads
          pageName="Designs"
          onComplete={() => setPreloadComplete(true)}
        />
      </AnimatePresence>
    )
  }

  return (
    <>
      <Navs />
      <div className={styles.designsContainer}>
        <h2>Available Dress Designs 👗</h2>
        <div className={styles.cardsGrid}>
          {designs.map((design) => (
            <div key={design.id} className={styles.card}>
              <img src={design.imageUrl} alt={design.name} />
              <h3>{design.name}</h3>
              <p>Price: ₹{design.price}</p>
              <button
                onClick={() => addToWishlist(design)}
                disabled={wishlistIds.includes(design.id)}
              >
                {wishlistIds.includes(design.id)
                  ? "✅ Added"
                  : "❤️ Add to Wishlist"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
