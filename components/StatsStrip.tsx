"use client";

import { motion } from "framer-motion";

const STAT_CARDS = [
  {
    value: "400",
    suffix: "+",
    label: "Clients Trained",
    desc: "Driven individuals in Guatemala City and worldwide who've transformed their bodies — and kept the results.",
    accent: "var(--gold)",
  },
  {
    value: "12",
    suffix: "",
    label: "Years of Coaching",
    desc: "A decade-plus of evidence-based coaching, backed by a BSc in Physical Education and Movement Science.",
    accent: "var(--terr)",
  },
  {
    value: "100",
    suffix: "%",
    label: "Tailored to You",
    desc: "Every programme is written from scratch around your goals, your life, and your schedule. Zero templates.",
    accent: "var(--ink)",
  },
];

export default function StatsStrip() {
  return (
    <>
      <section className="bg-cream2 py-20 md:py-24 px-6 md:px-14">
        <div style={{ maxWidth: 1360 }} className="mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <p className="font-montserrat text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-2">
                The Numbers
              </p>
              <h2
                className="font-cormorant font-normal text-text"
                style={{ fontSize: "clamp(36px, 4vw, 50px)" }}
              >
                Results that <em className="italic text-gold">speak for themselves</em>
              </h2>
            </div>
            <p className="font-dmsans text-sm text-text-soft leading-[1.7] max-w-xs">
              Over a decade of coaching driven individuals who refuse to settle — in Guatemala City and across the world.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAT_CARDS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-cream rounded-[20px] p-10 flex flex-col gap-2.5 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                style={{
                  border: "1px solid rgba(184,149,62,0.1)",
                  boxShadow: "0 2px 20px rgba(28,24,18,0.05)",
                }}
              >
                {/* Accent top bar */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: stat.accent }}
                />
                <span
                  className="font-cormorant font-light text-text leading-none"
                  style={{ fontSize: 64 }}
                >
                  {stat.value}
                  <span className="text-gold">{stat.suffix}</span>
                </span>
                <span
                  className="font-montserrat font-semibold uppercase text-text-muted"
                  style={{ fontSize: 10, letterSpacing: "0.22em" }}
                >
                  {stat.label}
                </span>
                <p className="font-dmsans text-[13px] text-text-soft leading-[1.65]">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: cream2 → cream */}
      <div className="w-full overflow-hidden bg-cream2" style={{ lineHeight: 0, transform: "rotate(180deg)" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F7F2E8" />
        </svg>
      </div>
    </>
  );
}
