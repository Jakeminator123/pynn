"use client";

import Link from "next/link";
import { siteContent } from "@/lib/content";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-blue-100/10 to-transparent backdrop-blur-sm text-white py-12 mt-auto border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-8">
          {/* Contact Links */}
          <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6" aria-label="Footer navigation">
            {siteContent.footer.email && (
              <motion.a
                href={`mailto:${siteContent.footer.email}`}
                className="text-sm text-white/70 hover:text-white transition-all duration-300 font-medium relative group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative">
                  {siteContent.footer.email}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </motion.a>
            )}
            {siteContent.footer.linkedin && (
              <motion.a
                href={siteContent.footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-white transition-all duration-300 font-medium relative group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="relative">
                  LinkedIn
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </motion.a>
            )}
            {siteContent.footer.termsLink && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link
                  href={siteContent.footer.termsLink}
                  className="text-sm text-white/70 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  <span className="relative">
                    Terms & Conditions
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Made with Love */}
          <motion.p
            className="flex items-center justify-center gap-2 text-sm text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {siteContent.footer.text.split("❤️")[0]}
            <motion.span
              className="text-pink-400 inline-block"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              aria-hidden="true"
            >
              ❤️
            </motion.span>
            {siteContent.footer.text.split("❤️")[1]}
          </motion.p>

          {/* Copyright */}
          <motion.p
            className="text-sm text-white/70 font-medium text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {siteContent.footer.copyright}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
