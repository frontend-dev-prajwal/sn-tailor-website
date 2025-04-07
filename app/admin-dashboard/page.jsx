"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [designName, setDesignName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists() || snap.data().role !== "admin") {
        router.push("/");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageUrl || !designName || !price) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Validate image URL format
    if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
      setMessage(
        "❌ Please provide a valid image URL (ending in jpg/png etc)."
      );
      return;
    }

    // Check for duplicate design name
    const q = query(collection(db, "designs"), where("name", "==", designName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setMessage("Design with this name already exists.");
      return;
    }

    try {
      await addDoc(collection(db, "designs"), {
        name: designName,
        price,
        imageUrl,
      });

      setMessage("✅ Design uploaded successfully!");
      setDesignName("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Failed to upload. Try again.");
    }
  };

  if (loading)
    return <p className={styles.loading}>Checking admin access...</p>;
  if (!isAdmin) return null;

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard 👑</h2>
      <form onSubmit={handleUpload} className={styles.form}>
        <input
          type="text"
          placeholder="Design Name"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Upload Design</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
