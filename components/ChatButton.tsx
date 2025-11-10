"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    // Chat integration can be added here
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.5)] transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-sm"
            aria-label="Open chat"
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-50 animate-pulse"></div>
            
            {/* Icon */}
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-white relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="absolute bottom-16 right-0 w-72 h-80 bg-white rounded-xl shadow-2xl border border-blue-200/50 overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs">Chat</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat content */}
            <div className="flex-1 p-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">AI</span>
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm max-w-[80%]">
                    <p className="text-slate-700 text-xs">
                      Hello! 👋 How can I help?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-blue-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="chat-message-input"
                  name="chat-message"
                  placeholder="Message..."
                  className="flex-1 px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-400 text-xs"
                />
                <button
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center transition-all shadow-md"
                  aria-label="Send message"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

