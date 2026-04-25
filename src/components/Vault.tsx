"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const vaultGames = [
  { name: "CS 2", category: "FPS" },
  { name: "Counter-Strike", category: "FPS" },
  { name: "Minecraft", category: "Sandbox" },
  { name: "Roblox", category: "Sandbox" },
  { name: "ROBLOX", category: "Studio" },
  { name: "Delta Force", category: "FPS" },
  { name: "COD Mobile", category: "FPS" },
  { name: "Valorant", category: "FPS" },
  { name: "LOL", category: "MOBA" },
  { name: "DOTA", category: "MOBA" },
  { name: "Mobile Legends: BangBang", category: "MOBA" },
  { name: "AC Odyssey", category: "RPG" },
  { name: "AC Mirage", category: "RPG" },
  { name: "Fortnite", category: "BR" },
  { name: "Rules of Survival", category: "BR" },
  { name: "DragonBall: XS", category: "Fighting" },
  { name: "NBA 2K20", category: "Sports" },
  { name: "Portal", category: "Puzzle" },
  { name: "FC 2025", category: "Sports" },
  { name: "Resident Evil Franchise", category: "Horror" },
  { name: "Left 4 Dead", category: "Survival" },
];

const categories = ["All", "FPS", "MOBA", "Sandbox", "RPG", "BR", "Sports", "Fighting", "Horror", "Survival", "Puzzle", "Studio"];

export default function Vault() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeFilter === "All"
      ? vaultGames
      : vaultGames.filter((g) => g.category === activeFilter);

  return (
    <section id="vault" ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            THE VAULT
          </h2>
          <p className="mt-2 text-xs text-ghost-grey tracking-[0.15em] uppercase">
            Games Played & Explored
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? "bg-gamer-red border-gamer-red text-white red-glow-subtle"
                  : "bg-transparent border-white/10 text-ghost-grey hover:border-gamer-red/40 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Game tags grid */}
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-3"
        >
          {filtered.map((game, i) => (
            <motion.div
              key={game.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              onHoverStart={() => setHoveredGame(game.name)}
              onHoverEnd={() => setHoveredGame(null)}
              className={`relative px-5 py-2.5 bg-surface border rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none ${
                hoveredGame === game.name
                  ? "border-gamer-red/50 text-white bg-gamer-red/10 shadow-[0_0_15px_rgba(230,57,70,0.2)]"
                  : "border-white/8 text-ghost-grey hover:text-white"
              }`}
            >
              {game.name}
              {/* Category tooltip on hover */}
              {hoveredGame === game.name && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] bg-gamer-red text-white rounded whitespace-nowrap"
                >
                  {game.category}
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-xs text-muted"
        >
          Showing {filtered.length} of {vaultGames.length} titles
        </motion.p>
      </div>
    </section>
  );
}
