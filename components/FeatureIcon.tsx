"use client";

import { motion } from "framer-motion";

interface FeatureIconProps {
  type: 'deal-flow' | 'portfolio' | 'data-room' | 'white-label' | 'multi-tenant' | 'events';
  className?: string;
}

export default function FeatureIcon({ type, className = "" }: FeatureIconProps) {
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderIcon = () => {
    switch (type) {
      case 'deal-flow':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="dealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="dealShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* 3D bars */}
            <rect x="15" y="50" width="12" height="35" rx="2" fill="url(#dealGradient)" filter="url(#dealShadow)" />
            <rect x="32" y="35" width="12" height="50" rx="2" fill="url(#dealGradient)" filter="url(#dealShadow)" />
            <rect x="49" y="25" width="12" height="60" rx="2" fill="url(#dealGradient)" filter="url(#dealShadow)" />
            <rect x="66" y="40" width="12" height="45" rx="2" fill="url(#dealGradient)" filter="url(#dealShadow)" />
            {/* Highlight */}
            <rect x="15" y="50" width="12" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="32" y="35" width="12" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="49" y="25" width="12" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
            <rect x="66" y="40" width="12" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
          </svg>
        );
      
      case 'portfolio':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <filter id="portfolioShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Trending line */}
            <polyline
              points="20,70 35,55 50,45 65,30 80,20"
              fill="none"
              stroke="url(#portfolioGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#portfolioShadow)"
            />
            {/* Data points */}
            <circle cx="20" cy="70" r="4" fill="url(#portfolioGradient)" filter="url(#portfolioShadow)" />
            <circle cx="35" cy="55" r="4" fill="url(#portfolioGradient)" filter="url(#portfolioShadow)" />
            <circle cx="50" cy="45" r="4" fill="url(#portfolioGradient)" filter="url(#portfolioShadow)" />
            <circle cx="65" cy="30" r="4" fill="url(#portfolioGradient)" filter="url(#portfolioShadow)" />
            <circle cx="80" cy="20" r="5" fill="url(#portfolioGradient)" filter="url(#portfolioShadow)" />
            {/* Glow on last point */}
            <circle cx="80" cy="20" r="8" fill="url(#portfolioGradient)" opacity="0.3" />
          </svg>
        );
      
      case 'data-room':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <filter id="lockShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Lock body */}
            <rect x="30" y="50" width="40" height="35" rx="4" fill="url(#lockGradient)" filter="url(#lockShadow)" />
            {/* Lock shackle */}
            <path
              d="M 40 50 Q 40 35, 50 35 Q 60 35, 60 50"
              fill="none"
              stroke="url(#lockGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#lockShadow)"
            />
            {/* Keyhole */}
            <circle cx="50" cy="62" r="6" fill="rgba(255,255,255,0.9)" />
            <rect x="48" y="62" width="4" height="12" fill="rgba(255,255,255,0.9)" />
            {/* Shine */}
            <rect x="35" y="55" width="8" height="12" rx="2" fill="rgba(255,255,255,0.3)" />
          </svg>
        );
      
      case 'white-label':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <filter id="paintShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Paint brush */}
            <ellipse cx="35" cy="75" rx="8" ry="12" fill="url(#paintGradient)" filter="url(#paintShadow)" />
            <rect x="25" y="30" width="20" height="50" rx="10" fill="url(#paintGradient)" filter="url(#paintShadow)" />
            {/* Paint stroke */}
            <path
              d="M 45 40 Q 60 35, 75 40 Q 80 45, 75 50"
              fill="none"
              stroke="url(#paintGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#paintShadow)"
              opacity="0.8"
            />
            {/* Color dots */}
            <circle cx="60" cy="45" r="3" fill="#3b82f6" />
            <circle cx="70" cy="48" r="3" fill="#6366f1" />
            <circle cx="65" cy="52" r="3" fill="#8b5cf6" />
          </svg>
        );
      
      case 'multi-tenant':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="buildingShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Buildings */}
            <rect x="15" y="45" width="18" height="40" rx="2" fill="url(#buildingGradient)" filter="url(#buildingShadow)" />
            <rect x="38" y="30" width="18" height="55" rx="2" fill="url(#buildingGradient)" filter="url(#buildingShadow)" />
            <rect x="61" y="50" width="18" height="35" rx="2" fill="url(#buildingGradient)" filter="url(#buildingShadow)" />
            {/* Windows */}
            <rect x="18" y="50" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="23" y="50" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="18" y="55" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="23" y="55" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            
            <rect x="41" y="35" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="46" y="35" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="51" y="35" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="41" y="40" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="46" y="40" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            
            <rect x="64" y="55" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="69" y="55" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            <rect x="64" y="60" width="3" height="3" fill="rgba(255,255,255,0.6)" />
            {/* Connection lines */}
            <line x1="24" y1="65" x2="38" y2="50" stroke="url(#buildingGradient)" strokeWidth="2" opacity="0.5" />
            <line x1="47" y1="50" x2="61" y2="60" stroke="url(#buildingGradient)" strokeWidth="2" opacity="0.5" />
          </svg>
        );
      
      case 'events':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter id="targetShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Target circles */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#targetGradient)" strokeWidth="3" filter="url(#targetShadow)" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#targetGradient)" strokeWidth="3" filter="url(#targetShadow)" />
            <circle cx="50" cy="50" r="10" fill="url(#targetGradient)" filter="url(#targetShadow)" />
            {/* Arrow */}
            <path
              d="M 30 30 L 45 45 M 45 45 L 35 50 M 45 45 L 50 35"
              stroke="url(#targetGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#targetShadow)"
            />
            {/* Center highlight */}
            <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.9)" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center ${className}`}
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <motion.div
        className="relative w-full h-full"
        variants={hoverVariants}
      >
        {renderIcon()}
      </motion.div>
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

