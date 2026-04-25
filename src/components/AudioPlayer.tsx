"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // minimal volume
      
      // Attempt auto-play immediately
      const tryPlay = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (err) {
          // Auto-play blocked by browser
          console.warn("Autoplay prevented, waiting for user interaction");
        }
      };
      
      tryPlay();

      // Fallback: start playing on first user interaction anywhere on the page
      const handleInteraction = async () => {
        if (audioRef.current && audioRef.current.paused) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (err) {
            // Still prevented
          }
        }
        // Remove listeners once it plays
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keydown", handleInteraction);
      };

      document.addEventListener("click", handleInteraction);
      document.addEventListener("keydown", handleInteraction);

      return () => {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keydown", handleInteraction);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Auto-play prevented:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" autoPlay />
      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md text-ghost-grey hover:text-white transition-colors hover:bg-white/5 shadow-lg flex items-center justify-center"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </>
  );
}
