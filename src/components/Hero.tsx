"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-cover background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-[-1]"
      >
        <Image
          src="/Mapbg.png"
          alt="League of Legends Map Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Background gradient overlays for text readability */}
      <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-[-1]" />
      <div className="absolute inset-0 bg-black/30 z-[-1]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[-1]" />

      {/* Animated particles / red dots */}
      <div className="absolute inset-0 z-[2]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gamer-red/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl">
        {/* Origin Story Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase font-bold text-gamer-red border border-gamer-red/40 rounded-full bg-gamer-red/10 red-glow-subtle">
            ORIGIN STORY
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 text-lg md:text-xl font-medium text-white/90 leading-relaxed"
        >
          Born on{" "}
          <span className="text-gamer-red font-bold">Summoner&apos;s Rift</span>,{" "}
          <span className="text-gamer-red font-bold">The Land of Azeroth</span>,{" "}
          and{" "}
          <span className="text-gamer-red font-bold">Blackwidow</span>.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-5 text-sm text-ghost-grey leading-relaxed max-w-lg mx-auto"
        >
          Started when I was 8, and that is where my journey as a gamer began. A
          childhood forged in the fires of Azeroth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(230, 57, 70, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll("combat")}
            className="px-8 py-3 bg-gamer-red text-white text-xs tracking-[0.2em] uppercase font-bold rounded-md hover:bg-gamer-red-dark transition-colors cursor-pointer w-full sm:w-auto"
          >
            VIEW CAMPAIGNS
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(230, 57, 70, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll("vault")}
            className="px-8 py-3 border border-gamer-red/40 text-gamer-red text-xs tracking-[0.2em] uppercase font-bold rounded-md hover:border-gamer-red transition-colors cursor-pointer w-full sm:w-auto"
          >
            EXPLORE VAULT
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gamer-red rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
