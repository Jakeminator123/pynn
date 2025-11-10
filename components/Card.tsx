"use client";

import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import Button from "./Button";

interface CardProps {
  index: number;
  title: string;
  description: string[];
  buttons: Array<{
    text: string;
    href: string;
    variant: "primary" | "secondary";
  }>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.8,
    },
  },
};

export default function Card({
  index,
  title,
  description,
  buttons,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    if (isMobile) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsExpanded((prev) => !prev);
    }
  };

  const openModal = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const previewText = description[0];
  const extraContent = description.slice(1);
  const showInlineDetails = isMobile && isExpanded;

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={
          !isMobile
            ? {
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }
            : {}
        }
        className="
          bg-gradient-to-br from-white via-blue-50/90 to-indigo-50/80 backdrop-blur-xl rounded-3xl p-10 lg:p-12 flex flex-col gap-6 text-xl font-semibold text-slate-800
          shadow-[0_10px_40px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.7)] border-2 border-blue-300/60 min-w-[320px] max-w-[400px] transition-all duration-500
          hover:shadow-[0_20px_80px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-blue-400/80 hover:scale-[1.02]
          relative overflow-hidden group transform-gpu perspective-1000
        "
        role={isMobile ? "button" : "group"}
        tabIndex={isMobile ? 0 : -1}
        aria-expanded={isMobile ? isExpanded : undefined}
        aria-label={`${title} details`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
      >
        {/* Multiple animated overlays */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
        </div>
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-blue-400/20 via-transparent to-indigo-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x leading-tight">
            {title}
          </h3>
          <div
            className="h-2 w-20 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-[length:200%_100%] animate-gradient-x"
            aria-hidden="true"
          />
        </div>

        <p className="text-lg lg:text-xl font-normal text-slate-700 leading-relaxed text-center relative z-10">
          {previewText}
        </p>

        {!isMobile && (
          <Button
            variant="outline"
            size="sm"
            onClick={openModal}
            className="mt-2 relative z-10"
          >
            More details
          </Button>
        )}

        {!isMobile && (
          <div className="mt-4 flex flex-col gap-3 w-full relative z-10">
            {buttons.map((button, idx) => (
              <Button
                key={`${index}-cta-${idx}`}
                href={button.href}
                variant={button.variant}
                external
                onClick={(event) => event.stopPropagation()}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}

        {showInlineDetails && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 text-sm font-normal text-slate-700 space-y-3 relative z-10"
          >
            {extraContent.map((paragraph, idx) => (
              <p key={`${index}-extra-${idx}`} className="leading-relaxed">
                {paragraph.replace(/<strong>|<\/strong>/g, "")}
              </p>
            ))}
            <div className="pt-2 border-t border-blue-200 flex flex-col gap-3">
              {buttons.map((button, idx) => (
                <Button
                  key={`${index}-mobile-cta-${idx}`}
                  href={button.href}
                  variant={button.variant}
                  external
                  fullWidth
                  onClick={(event) => event.stopPropagation()}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={(event) => {
              event.stopPropagation();
              setIsModalOpen(true);
            }}
            className="mt-2 relative z-10"
          >
            See more
          </Button>
        )}
      </motion.div>

      <Modal
        isOpen={isModalOpen && !isMobile}
        onClose={() => setIsModalOpen(false)}
        title={title}
        size="lg"
      >
        <div className="space-y-5 text-slate-700 text-base leading-relaxed">
          {description.map((paragraph, idx) => (
            <p key={`${index}-modal-${idx}`}>
              {paragraph.replace(/<strong>|<\/strong>/g, "")}
            </p>
          ))}
          <div className="pt-4 border-t border-blue-200 flex flex-col sm:flex-row gap-3">
            {buttons.map((button, idx) => (
              <Button
                key={`${index}-modal-cta-${idx}`}
                href={button.href}
                variant={button.variant}
                external
                fullWidth={buttons.length === 1}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
