"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

const Cursor = () => {
  const cursorSize = 40;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth follow effect
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTransparent, setIsTransparent] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("a, button");

    elements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        setIsHovering(true);
        setIsTransparent(false);
        setScale(2.5); // Increased cursor size on hover
        if (element.classList.contains("view")) {
          setHoverText("View");
        } else {
          setHoverText("");
        }
      });

      element.addEventListener("mouseleave", () => {
        setIsHovering(false);
        setHoverText("");
        setScale(1); // Reset size
      });
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", () => {});
        element.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? "hover" : ""} ${
        isTransparent ? "transparent" : ""
      }`}
      style={{
        x: smoothX,
        y: smoothY,
        scale: useSpring(scale, { stiffness: 200, damping: 20 }), // Smooth scaling
      }}
    >
      {hoverText && <span className="cursor-text">{hoverText}</span>}
    </motion.div>
  );
};

export default Cursor;
