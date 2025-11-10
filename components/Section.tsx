"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "light" | "dark";
}

const variantClasses = {
  default: "animated-pattern-bg relative",
  light:
    "bg-gradient-to-br from-sky-50/60 via-blue-50/60 to-indigo-50/60 backdrop-blur-md",
  dark: "relative text-white",
};

export default function Section({
  children,
  className = "",
  id,
  variant = "default",
}: SectionProps) {
  // Only apply fade-in animation if not already animated by parent
  // This prevents double animations
  return (
    <motion.section
      id={id}
      className={`${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {variant === "default" && (
        <>
          <div className="floating-blob blob-1"></div>
          <div className="floating-blob blob-2"></div>
          <div className="floating-blob blob-3"></div>
        </>
      )}
      <div className="relative z-10 bg-transparent">{children}</div>
    </motion.section>
  );
}
