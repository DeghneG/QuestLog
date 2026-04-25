"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import GameCard, { gameData } from "./GameCard";
import { LayoutGrid, List } from "lucide-react";

export default function CombatRecord() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="combat" ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            COMBAT RECORD
          </h2>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-ghost-grey tracking-[0.15em] uppercase">
              Active Career Stats & Historical Data
            </p>
            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-surface rounded-md p-0.5 border border-white/5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gamer-red text-white"
                    : "text-ghost-grey hover:text-white"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={14} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-gamer-red text-white"
                    : "text-ghost-grey hover:text-white"
                }`}
                aria-label="List view"
              >
                <List size={14} />
              </motion.button>
            </div>
          </div>
          <div className="mt-3 h-px bg-gradient-to-r from-gamer-red/50 via-gamer-red/20 to-transparent" />
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {gameData.map((game, i) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GameCard {...game} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
