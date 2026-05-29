"use client";

import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

function Feature({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
      <span className={`font-dmsans text-sm leading-relaxed ${light ? "text-cream/75" : "text-text-soft"}`}>{text}</span>
    </li>
  );
}

export default function PersonalTrainingPage() {
  const { t } = useLanguage();
  const p = t.personalTraining;

  return (
    <>
      <ServiceHero
        eyebrow={p.eyebrow}
        title={<>{p.title} <em className="text-gold not-italic">{p.titleItalic}</em></>}
        tagline={p.tagline}
        body={p.body}
        includes={p.includes}
      />

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">{t.common.pricing}</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">{t.common.choosePackage}</h2>
          </div>

          {/* ── Two main cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* ── Card 1 · 1-month in-person ── */}
            <div className="bg-cream rounded-2xl border border-border p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{p.card1Title}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{p.card1Subtitle}</p>
              </div>

              {/* Tier pills */}
              <div className="flex flex-col gap-3">
                <div className="bg-cream2 rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted">{p.card1Tier1}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,200</span>
                </div>
                <div className="bg-cream2 rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted">{p.card1Tier2}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,950</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {[p.card1F1, p.card1F2, p.card1F3, p.card1F4, p.card1F5].map((f) => (
                  <Feature key={f} text={f} />
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full py-3 hover:bg-gold hover:text-cream transition-all duration-200 mt-2">
                {t.common.getStarted}
              </Link>
            </div>

            {/* ── Card 2 · 3-month in-person (Most Popular) ── */}
            <div className="relative bg-green-dark rounded-2xl p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-3 py-1">{t.common.mostPopular}</span>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-cream">{p.card2Title}</h3>
                <p className="font-dmsans text-sm text-gold-soft/70 mt-1">{p.card2Subtitle}</p>
              </div>

              {/* Tier pills */}
              <div className="flex flex-col gap-3">
                <div className="bg-green-mid rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold-soft">{p.card2Tier1}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,050</span>
                </div>
                <div className="bg-green-mid rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold-soft">{p.card2Tier2}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,750</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {[p.card2F1, p.card2F2, p.card2F3, p.card2F4, p.card2F5].map((f) => (
                  <Feature key={f} text={f} light />
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full py-3 hover:bg-gold-soft transition-colors mt-2">
                {t.common.getStarted}
              </Link>
            </div>

          </div>

          {/* ── Add-ons ── */}
          <div>
            <p className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">{p.addOnsTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-cream rounded-xl border border-border px-6 py-5 flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <div>
                  <p className="font-cormorant text-lg font-medium text-text">{p.addOn1Title}</p>
                  <p className="font-dmsans text-sm text-text-muted mt-0.5">{p.addOn1Body}</p>
                </div>
              </div>
              <div className="bg-cream rounded-xl border border-border px-6 py-5 flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <div>
                  <p className="font-cormorant text-lg font-medium text-text">{p.addOn2Title}</p>
                  <p className="font-dmsans text-sm text-text-muted mt-0.5">{p.addOn2Body}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">{t.common.faqSection}</span>
            <h2 className="font-cormorant text-4xl font-medium text-text mt-3">{t.common.commonQuestions}</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <CtaStrip
        heading={<>{p.ctaHeading} <em className="text-gold not-italic">{p.ctaItalic}</em></>}
        note={p.ctaNote}
      />
    </>
  );
}
