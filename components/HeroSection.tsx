"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-cream py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <span className="font-montserrat text-[11px] font-semibold tracking-[0.25em] uppercase text-gold">
            Elite Personal Training
          </span>

          <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-medium text-text leading-tight">
            Train Smarter.{" "}
            <em className="text-gold not-italic">Live Better.</em>
          </h1>

          <p className="font-cormorant italic text-xl md:text-2xl text-text-soft">
            Tailored programmes for driven individuals.
          </p>

          <p className="font-dmsans text-base text-text-soft leading-relaxed max-w-md">
            De Maître Coaching delivers elite personal training in Guatemala City and worldwide. Every programme is built around your goals, your schedule, and your potential.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="font-montserrat text-xs font-semibold tracking-widest uppercase bg-green-dark text-cream rounded-full px-7 py-3.5 hover:bg-green-mid transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/services/personal-training"
              className="font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full px-7 py-3.5 hover:bg-gold hover:text-cream transition-all duration-200 flex items-center gap-2"
            >
              See Services
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Right — Decorative oval */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-96 md:w-80 md:h-[420px]">
            {/* Outer oval border */}
            <div className="absolute inset-0 rounded-[50%] border-2 border-gold/40" />
            {/* Inner oval */}
            <div className="absolute inset-6 rounded-[50%] border border-gold/20 bg-cream2 flex flex-col items-center justify-center gap-4">
              <span className="font-cormorant text-7xl font-light text-gold leading-none">SM</span>
              <div className="w-12 h-px bg-gold/50" />
              <span className="font-montserrat text-[10px] font-semibold tracking-[0.3em] uppercase text-text-muted">
                De Maître
              </span>
            </div>
            {/* Decorative dots */}
            <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-gold/30" />
            <div className="absolute bottom-10 left-6 w-1.5 h-1.5 rounded-full bg-gold/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
