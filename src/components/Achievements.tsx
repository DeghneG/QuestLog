"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Zap, Crown, Target, Flame, Star } from "lucide-react";

const achievements = [
  {
    icon: <Crown size={24} />,
    title: "Mythical Glory x9",
    game: "Mobile Legends",
    description: "Achieved Mythical Glory rank across 9 consecutive seasons.",
  },
  {
    icon: <Target size={24} />,
    title: "Ascendant III Peak",
    game: "Valorant",
    description: "Climbed to Ascendant 3 through disciplined aim and game sense.",
  },
  {
    icon: <Award size={24} />,
    title: "Emerald I",
    game: "League of Legends",
    description: "Rapid climber — reached Emerald I in just 40+ matches.",
  },
  {
    icon: <Flame size={24} />,
    title: "~10 Years of FPS",
    game: "CrossFire",
    description: "Almost a decade of FPS mastery starting from the OG tactical shooter.",
  },
  {
    icon: <Zap size={24} />,
    title: "500+ Clutches",
    game: "Valorant",
    description: "Clutch specialist with a near-mythical 1vX win record.",
  },
  {
    icon: <Star size={24} />,
    title: "Top Local EXP Laner",
    game: "Mobile Legends",
    description: "Almost 10 heroes sitting on the local leaderboard simultaneously.",
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={sectionRef} className="py-24 px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            ACHIEVEMENTS UNLOCKED
          </h2>
          <p className="mt-2 text-xs text-ghost-grey tracking-[0.15em] uppercase">
            Milestones & Notable Accomplishments
          </p>
        </motion.div>

        {/* Achievement cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(230, 57, 70, 0.5)",
                boxShadow: "0 0 25px rgba(230, 57, 70, 0.15)",
              }}
              className="group relative bg-card-bg border border-card-border rounded-lg p-6 cursor-pointer transition-all duration-300 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gamer-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-gamer-red/70 group-hover:text-gamer-red transition-colors">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{a.title}</h3>
                    <span className="text-[10px] text-gamer-red tracking-[0.15em] uppercase">
                      {a.game}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-ghost-grey leading-relaxed">
                  {a.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gamer-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
