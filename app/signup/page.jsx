"use client";

import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, mobile, email, password } = formData;

    if (!name || !mobile || !email || !password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      const existingUserRef = doc(db, "users", email);
      const existingUserSnap = await getDoc(existingUserRef);

      if (existingUserSnap.exists()) {
        setMessage({
          type: "error",
          text: "User already registered. Please use registered email and password.",
        });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        mobile,
        email: user.email,
        password, // optional, but needed if you want it for login validation
        role: "user", // default role
        createdAt: new Date().toISOString(),
      });

      setMessage({ type: "success", text: "User registered successfully!" });

      // Redirect after 5 seconds
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className={styles.signup}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>

        {message && (
          <div className={`${styles.popup} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
