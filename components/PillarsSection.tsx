"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

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
  const { t } = useLanguage();

  const pillars = [
    { title: t.home.strengthTitle, body: t.home.strengthBody },
    { title: t.home.nutritionTitle, body: t.home.nutritionBody },
    { title: t.home.accountabilityTitle, body: t.home.accountabilityBody },
    { title: t.home.longevityTitle, body: t.home.longevityBody },
  ];

  return (
    <section className="bg-cream py-24 px-6 md:px-14">
      <div style={{ maxWidth: 1360 }} className="mx-auto">
        <div className="text-center mb-20 flex flex-col items-center gap-3">
          <span
            className="font-montserrat font-bold uppercase text-terr"
            style={{ fontSize: 9, letterSpacing: "0.32em" }}
          >
            {t.home.pillarsEyebrow}
          </span>
          <h2
            className="font-cormorant font-normal text-text"
            style={{ fontSize: "clamp(36px, 4vw, 50px)" }}
          >
            {t.home.pillarsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-cream2 rounded-2xl p-7 flex flex-col gap-4"
                style={{ border: "1px solid rgba(184,149,62,0.12)" }}
              >
                <div className="w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center">
                  <Icon />
                </div>
                <h3 className="font-cormorant text-2xl font-normal text-text">{pillar.title}</h3>
                <p className="font-dmsans text-sm text-text-soft leading-relaxed">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
