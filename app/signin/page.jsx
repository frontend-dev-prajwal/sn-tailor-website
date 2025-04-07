"use client";

import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign in using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User data not found.");
      }

      // Redirect to homepage
      router.replace("/");
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("❌ Invalid email or password.");
      setEmail("");
      setPassword("");
      setLoading(false);

      // Clear error after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignIn} className={styles.form}>
        <h2>Sign In</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p style={{ color: "black", marginTop: "10px" }}>
          Don't have an account? <a href="/signup" style={{color: "blue"}}>Register</a>
        </p>
      </form>
    </div>
  );
}
