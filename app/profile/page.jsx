"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Navs from "../components/header/page";
import { AnimatePresence } from "framer-motion";
import Preloads from "../preloads/preload";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [preloadComplete, setPreloadComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/signin");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setFormData({ name: data.name, email: data.email });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: formData.name,
        email: formData.email,
      });

      if (user.email !== formData.email) {
        await updateEmail(user, formData.email);
      }

      setUserData({ ...userData, ...formData });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile.");
    }
  };

  if(!preloadComplete){
    return (
      <AnimatePresence mode="wait">
        <Preloads
          pageName="Profile"
          onComplete={() => setPreloadComplete(true)}
        />
      </AnimatePresence>
    )
  }

  return (
    <>
      <Navs />
      <div className={styles.profile}>
        <h1>User Profile</h1>

        <div className={styles.info}>
          <label>Name:</label>
          {editMode ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            <p>{userData.name}</p>
          )}
        </div>

        <div className={styles.info}>
          <label>Email:</label>
          {editMode ? (
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>

        <div className={styles.info}>
          <label>Mobile:</label>
          <p>{userData.mobile}</p>
        </div>

        {editMode ? (
          <div className={styles.actions}>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className={styles.editBtn}>
            Edit Profile
          </button>
        )}
      </div>
    </>
  );
}
