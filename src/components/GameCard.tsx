"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Trophy, Target, Star, Swords, Shield, Flame } from "lucide-react";
import Image from "next/image";

interface GameStat {
  label: string;
  value: string;
}

interface GameCardProps {
  title: string;
  rank: string;
  rankColor?: string;
  stats: GameStat[];
  highlights: string[];
  description?: string;
  icon?: React.ReactNode;
  accentTag?: string;
  ign?: string;
}

export default function GameCard({
  title,
  rank,
  rankColor = "text-gamer-red",
  stats,
  highlights,
  description,
  icon,
  accentTag,
  ign,
}: GameCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative bg-card-bg border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer flex flex-col min-h-[280px] ${
        hovered
          ? "border-gamer-red shadow-[0_0_8px_rgba(230,57,70,0.8),inset_0_0_4px_rgba(230,57,70,0.4)]"
          : "border-card-border"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* The bouncing blob */}
      <div className="absolute z-0 top-1/2 left-1/2 w-[150px] h-[150px] rounded-full bg-gamer-red opacity-80 blur-[24px] card-blob"></div>

      {/* The frosted glass background layer */}
      <div className="absolute inset-[2px] z-[1] bg-[#111111]/90 backdrop-blur-xl rounded-[12px] pointer-events-none"></div>

      <div className="relative z-[2] flex flex-col h-full flex-grow">
        {/* Card header */}
        <div className="p-5 flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="text-gamer-red/80 w-[52px] h-[52px] shrink-0 flex items-center justify-center bg-black/40 rounded-md border border-white/5 overflow-hidden">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                {title}
              </h3>
              <span className={`text-xs font-semibold ${rankColor} tracking-wider block`}>
                {rank}
              </span>
              {ign && (
                <span className="text-[10px] text-ghost-grey tracking-widest mt-0.5 block uppercase">
                  {ign}
                </span>
              )}
            </div>
          </div>
          {accentTag && (
            <motion.span
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-gamer-red text-white rounded"
            >
              {accentTag}
            </motion.span>
          )}
        </div>

        {/* Quick stats row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-2.5 py-1.5 bg-surface rounded text-[10px] text-ghost-grey border border-white/5"
            >
              <span className="text-white font-semibold">{stat.value}</span>{" "}
              {stat.label}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-3 space-y-1">
          {highlights.slice(0, 2).map((h, i) => (
            <p key={i} className="text-xs text-ghost-grey leading-relaxed flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gamer-red/60 shrink-0" />
              {h}
            </p>
          ))}
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-white/5">
              {description && (
                <p className="text-xs text-ghost-grey leading-relaxed mb-3">
                  {description}
                </p>
              )}
              {highlights.length > 2 && (
                <div className="space-y-1">
                  {highlights.slice(2).map((h, i) => (
                    <p
                      key={i}
                      className="text-xs text-ghost-grey leading-relaxed flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-gamer-red/60 shrink-0" />
                      {h}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand toggle footer */}
      <div className="flex items-center justify-center py-2 bg-surface/50 border-t border-white/5 mt-auto">
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ghost-grey"
        >
          <ChevronDown size={14} />
        </motion.div>
      </div>

      </div>

      {/* Hover red glow line at bottom */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute z-[3] bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gamer-red to-transparent"
      />
    </motion.div>
  );
}

// Removed old SVG components as we are now using the uploaded logo images.

// Export the data and icons for use
export const gameData: GameCardProps[] = [
  {
    title: "League of Legends",
    rank: "EMERALD I",
    ign: "IGN: LobLexFanboy",
    icon: <Image src="/league.jpg" alt="League of Legends" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "matches", value: "40+" },
      { label: "peak rank", value: "Emerald I" },
    ],
    highlights: [
      "Main Champions: Viego, Yasuo, Nidalee",
      "Fast climber with high win rate in ranked",
    ],
    description:
      "Rapid ranked climber who reached Emerald I in under 50 games — pure mechanical instinct from years of MOBA experience.",
  },
  {
    title: "Valorant",
    rank: "ASCENDANT III",
    ign: "IGN: HiIten",
    icon: <Image src="/valorant.jpg" alt="Valorant" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "peak rank", value: "Ascendant 3" },
      { label: "headshot %", value: "20%" },
    ],
    highlights: [
      "Duelist / Controller Hybrid",
      "Clutch Master: 500+ clutch round wins",
      "Custom Team Strats expert",
    ],
    description:
      "Climbed to Ascendant via strategic play, disciplined aim training, and clutch performances under pressure.",
  },
  {
    title: "Mobile Legends",
    rank: "MYTHICAL IMMORTAL",
    ign: "IGN: Gab Presko",
    icon: <Image src="/mel.jpg" alt="Mobile Legends" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "local heroes", value: "~10" },
      { label: "role", value: "EXP Laner" },
    ],
    highlights: [
      "Top local EXP laner with almost 10 heroes on local leaderboard",
      "Dominant split-push and team fight presence",
      "9-time Mythical Immortal achiever",
    ],
    description:
      "A feared EXP lane specialist with near-unmatched local dominance — almost 10 heroes sitting on the local leaderboard simultaneously.",
  },
  {
    title: "CrossFire",
    rank: "VETERAN",
    ign: "IGN: Quickscope.X",
    icon: <Image src="/crossfire.jpg" alt="Crossfire" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "experience", value: "~15 years" },
    ],
    highlights: [
      "First FPS experience — almost 15 years of competitive FPS gaming",
      "The foundation of competitive FPS reflexes and game sense",
      "AR and Sniper specialist since the early days",
    ],
    description:
      "Where it all began — more than a decade of FPS experience that built raw reflexes and a lifelong love for the genre.",
  },
  {
    title: "Rules of Survival",
    rank: "GRANDMASTER",
    ign: "IGN: ProfessorInSpire",
    icon: <Image src="/rule.jpg" alt="Rules of Survival" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "games", value: "3000+" },
    ],
    highlights: [
      "Used to shit on normies in Ghili Island",
      "1,100+ Hour",
      "Early adopter of the Battle Royale genre on mobile",
    ],
    description:
      "Helped shape early mobile Battle Royale strategy before the genre became mainstream.",
  },
  {
    title: "Bloodstrike",
    rank: "MYTHIC",
    ign: "IGN: NE Gabzimo",
    icon: <Image src="/strike.jpg" alt="Bloodstrike" width={52} height={52} className="object-cover w-full h-full scale-[1.35]" quality={100} unoptimized />,
    stats: [
      { label: "points", value: "50,027" },
      { label: "global rank", value: "Top 151" },
    ],
    highlights: [
      "Favorite Guns: Dual glock, m700 and vector",
      "Outplayed and eliminated top leaderboard contenders like Kosmik, Nomz, AkiroLala, and Poseidon",
      "Climbed the leaderboard effortlessly in just 3 months",
    ],
    description:
      "A fast-rising star on the global leaderboard, known for dominant loadouts and sweeping the competition with minimal effort.",
  },
];
