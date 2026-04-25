"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

export default function Embers() {
  const [particles, setParticles] = useState<Snowflake[]>([]);

  useEffect(() => {
    if (!document.getElementById('embers-style')) {
      const style = document.createElement('style');
      style.id = 'embers-style';
      style.innerHTML = `
        @keyframes fire-fall {
          0% { transform: translateY(-20vh) translateX(0) rotate(0deg); opacity: 1; }
          25% { transform: translateY(20vh) translateX(-15px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(50vh) translateX(15px) rotate(180deg); opacity: 0.6; }
          75% { transform: translateY(80vh) translateX(-10px) rotate(270deg); opacity: 0.4; }
          100% { transform: translateY(120vh) translateX(0px) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const minParticles = 50;
    const maxParticles = 90;
    const particleCount = Math.floor(Math.random() * (maxParticles - minParticles) + minParticles);
    
    const root = [];
    for (let i = 0; i < particleCount; i++) {
      root.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 6,
        delay: -(Math.random() * 12),
      });
    }
    setParticles(root);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
      {particles.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-orange-500 shadow-[0_0_8px_2px_rgba(255,100,0,0.8)]"
          style={{
            width: flake.size,
            height: flake.size,
            left: flake.left,
            top: 0,
            animation: `fire-fall ${flake.duration}s linear ${flake.delay}s infinite`
          }}
        />
      ))}
    </div>
  );
}
