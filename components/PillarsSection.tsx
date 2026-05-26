"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/constants";

function StrengthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold">
      <rect x="2" y="10.5" width="3" height="3" rx="0.5" />
      <rect x="19" y="10.5" width="3" height="3" rx="0.5" />
      <rect x="5" y="9" width="2.5" height="6" rx="0.5" />
      <rect x="16.5" y="9" width="2.5" height="6" rx="0.5" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" />
    </svg>
  );
}

function NutritionIcon() {
  // Fork and knife — universally recognisable nutrition symbol
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold">
      <line x1="8" y1="3" x2="8" y2="21" />
      <path d="M6 3v6a3 3 0 0 0 6 0V3" />
      <line x1="16" y1="3" x2="16" y2="21" />
    </svg>
  );
}

function AccountabilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function LongevityIcon() {
  // Hourglass
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold">
      <path d="M5 3h14" />
      <path d="M5 21h14" />
      <path d="M5 3l7 9-7 9" />
      <path d="M19 3l-7 9 7 9" />
    </svg>
  );
}

const PILLAR_ICONS = [StrengthIcon, NutritionIcon, AccountabilityIcon, LongevityIcon];

export default function PillarsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
            The Method
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">
            Four Pillars of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-cream2 rounded-xl p-7 flex flex-col gap-4 border border-border-soft"
              >
                <div className="w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center">
                  <Icon />
                </div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{pillar.title}</h3>
                <p className="font-dmsans text-sm text-text-soft leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
