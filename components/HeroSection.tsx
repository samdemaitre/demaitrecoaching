"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-cream overflow-visible">
        <div
          style={{ maxWidth: 1360 }}
          className="mx-auto px-6 md:px-14 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          // right col fixed width on larger screens
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gold shrink-0" />
              <span className="font-montserrat text-[10px] font-semibold tracking-[0.32em] uppercase text-gold">
                {t.home.eyebrow}
              </span>
            </div>

            <h1
              className="font-cormorant font-normal text-text leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(50px, 5.5vw, 80px)" }}
            >
              {t.home.h1}<br />
              <em className="italic text-gold">{t.home.h1Italic}</em>
            </h1>

            <p className="font-cormorant italic text-xl text-text-soft leading-relaxed border-l-2 border-gold pl-4">
              {t.home.tagline}
            </p>

            <p className="font-dmsans text-[15px] text-text-soft leading-[1.8] max-w-[460px]">
              {t.home.body}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="font-montserrat text-[10px] font-semibold tracking-[0.18em] uppercase bg-ink text-cream rounded-full px-8 py-4 hover:opacity-80 transition-opacity"
              >
                {t.home.ctaPrimary}
              </Link>
              <Link
                href="/services/personal-training"
                className="font-montserrat text-[10px] font-medium tracking-[0.18em] uppercase text-gold border border-gold rounded-full px-7 py-4 hover:bg-gold hover:text-white transition-all duration-200"
              >
                {t.home.ctaSecondary} →
              </Link>
            </div>
          </motion.div>

          {/* Right — editorial portrait frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative" style={{ maxWidth: 420, width: "100%" }}>
              {/* Outer frame */}
              <div
                className="relative bg-cream p-4 rounded-sm"
                style={{ border: "1px solid rgba(184,149,62,0.3)" }}
              >
                {/* Gold corner brackets */}
                <span
                  className="absolute top-1.5 left-1.5 w-6 h-6 pointer-events-none"
                  style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }}
                />
                <span
                  className="absolute top-1.5 right-1.5 w-6 h-6 pointer-events-none"
                  style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }}
                />
                <span
                  className="absolute bottom-1.5 left-1.5 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }}
                />
                <span
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }}
                />

                {/* Portrait */}
                <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src="/images/hero-sam.jpg"
                    alt="Sam De Maître — Elite Fitness Coach"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
              </div>

              {/* Floating credential — left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex flex-col gap-0.5 rounded-2xl px-5 py-3 shadow-lg"
                style={{
                  bottom: 44,
                  left: -20,
                  background: "var(--cream)",
                  border: "1px solid rgba(184,149,62,0.22)",
                  boxShadow: "0 8px 32px rgba(28,24,18,0.12)",
                }}
              >
                <span className="font-cormorant font-light text-gold" style={{ fontSize: 32, lineHeight: 1 }}>12+</span>
                <span className="font-montserrat font-semibold uppercase text-text-muted" style={{ fontSize: 9, letterSpacing: "0.18em" }}>{t.home.statsYears}</span>
              </motion.div>

              {/* Floating credential — right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                className="absolute flex flex-col gap-0.5 rounded-2xl px-5 py-3 shadow-lg"
                style={{
                  bottom: 44,
                  right: -20,
                  background: "var(--cream)",
                  border: "1px solid rgba(184,149,62,0.22)",
                  boxShadow: "0 8px 32px rgba(28,24,18,0.12)",
                }}
              >
                <span className="font-cormorant font-light text-gold" style={{ fontSize: 32, lineHeight: 1 }}>400+</span>
                <span className="font-montserrat font-semibold uppercase text-text-muted" style={{ fontSize: 9, letterSpacing: "0.18em" }}>{t.home.statsClients}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave: cream → cream2 */}
      <div className="w-full overflow-hidden leading-none bg-cream" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="80" width="100%">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#EDE5D4" />
        </svg>
      </div>
    </>
  );
}
