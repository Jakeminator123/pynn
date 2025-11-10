"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  external?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] text-white font-bold shadow-[0_6px_20px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border border-blue-700/30 hover:shadow-[0_10px_30px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] hover:animate-gradient-x focus:ring-blue-600 transform-gpu",
  secondary:
    "relative bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-[length:200%_100%] text-white font-bold shadow-[0_6px_20px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border border-cyan-600/30 hover:shadow-[0_10px_30px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] hover:animate-gradient-x focus:ring-cyan-500 transform-gpu",
  outline:
    "relative bg-white/90 backdrop-blur-sm text-blue-700 font-bold border-2 border-blue-400/60 shadow-[0_4px_15px_rgba(59,130,246,0.15)] hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-500 hover:shadow-[0_8px_25px_rgba(59,130,246,0.25)] focus:ring-blue-500 transform-gpu",
};

const sizeClasses = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-sm",
  lg: "py-4 px-8 text-base",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  external = false,
  className = "",
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-[25px] font-semibold
    transition-all duration-300 whitespace-nowrap
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  const motionProps = {
    whileHover: {
      scale: 1.04,
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
    whileTap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClasses}
        onClick={onClick}
        {...motionProps}
      >
        {children}
        {external && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
