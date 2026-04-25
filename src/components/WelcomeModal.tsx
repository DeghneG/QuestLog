"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal shortly after mount
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] w-[90vw] sm:max-w-md bg-[#161616]/95 backdrop-blur-md border border-red-500/30 shadow-2xl shadow-red-900/20 rounded-xl p-6 text-white"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-bold text-red-500 text-lg tracking-wider uppercase">Welcome</h3>
          </div>
          
          <p className="text-sm text-gray-300 leading-relaxed font-mono">
            Hello, I&apos;m Deghne Gabriel Agana. I&apos;m a 19-year-old Information Technology sophomore with a deep passion for competitive gaming and front-end development. I created this web app as a hands-on practice project to hone my programming skills and showcase my journey through the ranks of my favorite games.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
