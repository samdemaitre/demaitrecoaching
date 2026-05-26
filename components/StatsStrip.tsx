"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export default function StatsStrip() {
  return (
    <section className="bg-cream2 py-12 px-6 border-y border-border">
      <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-gold/30">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 px-6"
          >
            <span className="font-cormorant text-4xl md:text-5xl font-medium text-gold">
              {stat.value}
            </span>
            <span className="font-montserrat text-[10px] font-medium tracking-widest uppercase text-text-muted text-center">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
