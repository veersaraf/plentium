"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const TextRevealWipe = ({ children, duration = 0.4, threshold = 0, delay = 0.5, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsAnimating(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <span className="invisible">{children}</span>
      {isAnimating && (
        <motion.span
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transition: { duration, delay, ease: "easeOut" },
          }}
          className="absolute inset-0 w-fit"
        >
          {children}
        </motion.span>
      )}
    </div>
  );
};
