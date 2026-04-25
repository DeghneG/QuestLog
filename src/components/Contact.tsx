"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            SEND A PARTY INVITE
          </h2>
          <p className="mt-2 text-xs text-ghost-grey tracking-[0.15em] uppercase">
            Ready to team up? Drop a message.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div className="group">
            <label
              htmlFor="contact-name"
              className="block text-xs text-ghost-grey tracking-[0.1em] uppercase mb-2 group-focus-within:text-gamer-red transition-colors"
            >
              Summoner Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg text-sm text-white placeholder-muted focus:border-gamer-red/50 focus:ring-1 focus:ring-gamer-red/30 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="group">
            <label
              htmlFor="contact-email"
              className="block text-xs text-ghost-grey tracking-[0.1em] uppercase mb-2 group-focus-within:text-gamer-red transition-colors"
            >
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg text-sm text-white placeholder-muted focus:border-gamer-red/50 focus:ring-1 focus:ring-gamer-red/30 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Message */}
          <div className="group">
            <label
              htmlFor="contact-message"
              className="block text-xs text-ghost-grey tracking-[0.1em] uppercase mb-2 group-focus-within:text-gamer-red transition-colors"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              placeholder="Let's queue up together..."
              rows={5}
              className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg text-sm text-white placeholder-muted focus:border-gamer-red/50 focus:ring-1 focus:ring-gamer-red/30 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={sending || submitted}
            whileHover={!sending && !submitted ? { scale: 1.02, boxShadow: "0 0 25px rgba(230, 57, 70, 0.4)" } : {}}
            whileTap={!sending && !submitted ? { scale: 0.98 } : {}}
            className={`w-full py-3.5 rounded-lg text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed ${
              submitted
                ? "bg-green-600 text-white"
                : "bg-gamer-red text-white hover:bg-gamer-red-dark"
            }`}
          >
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                SENDING...
              </>
            ) : submitted ? (
              <>
                <CheckCircle size={16} />
                MESSAGE SENT!
              </>
            ) : (
              <>
                <Send size={16} />
                SEND MESSAGE
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
