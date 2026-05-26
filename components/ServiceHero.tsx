"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

interface ServiceHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  tagline: string;
  body: string;
  includes: string[];
}

export default function ServiceHero({
  eyebrow,
  title,
  tagline,
  body,
  includes,
}: ServiceHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
            {eyebrow}
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-medium text-text leading-tight">
            {title}
          </h1>
          <p className="font-cormorant italic text-xl text-text-soft">{tagline}</p>
          <p className="font-dmsans text-base text-text-soft leading-relaxed">{body}</p>
          <div className="flex gap-4 pt-2">
            <Link
              href="/contact"
              className="font-montserrat text-xs font-semibold tracking-widest uppercase bg-green-dark text-cream rounded-full px-6 py-3 hover:bg-green-mid transition-colors"
            >
              {t.nav.bookCall}
            </Link>
          </div>
        </motion.div>

        {/* Right — Includes list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-cream2 rounded-2xl p-8 border border-border"
        >
          <h3 className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
            {t.common.whatsIncluded}
          </h3>
          <ul className="flex flex-col gap-4">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="font-cormorant text-xl font-medium text-text">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
