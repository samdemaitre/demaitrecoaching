"use client";

import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

function Feature({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0`} />
      <span className={`font-dmsans text-sm leading-relaxed ${light ? "text-cream/75" : "text-text-soft"}`}>{text}</span>
    </li>
  );
}

export default function HybridCoachingPage() {
  const { t } = useLanguage();
  const h = t.hybridCoaching;

  return (
    <>
      <ServiceHero
        eyebrow={h.eyebrow}
        title={<>{h.title} <em className="text-gold not-italic">{h.titleItalic}</em></>}
        tagline={h.tagline}
        body={h.body}
        includes={h.includes}
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

            {/* ── Card 1 · 1-month hybrid ── */}
            <div className="bg-cream rounded-2xl border border-border p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{h.card1Title}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{h.card1Subtitle}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="font-cormorant text-4xl font-medium text-gold">Q1,450</span>
                <span className="font-montserrat text-xs text-text-muted mb-1.5">{t.common.perMonth}</span>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {[h.card1F1, h.card1F2, h.card1F3, h.card1F4, h.card1F5, h.card1F6].map((f) => (
                  <Feature key={f} text={f} />
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full py-3 hover:bg-gold hover:text-cream transition-all duration-200 mt-2">
                {t.common.bookFreeCall}
              </Link>
            </div>

            {/* ── Card 2 · 3-month hybrid (Best Value) ── */}
            <div className="relative bg-green-dark rounded-2xl p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-3 py-1">{t.common.bestValue}</span>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-cream">{h.card2Title}</h3>
                <p className="font-dmsans text-sm text-gold-soft/70 mt-1">{h.card2Subtitle}</p>
              </div>
              <div>
                <div className="flex items-end gap-1">
                  <span className="font-cormorant text-4xl font-medium text-gold">Q1,350</span>
                  <span className="font-montserrat text-xs text-gold-soft/70 mb-1.5">{t.common.perMonth}</span>
                </div>
                <p className="font-dmsans text-xs text-gold-soft/60 mt-1">{h.card2Total} · {h.card2Save}</p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {[h.card2F1, h.card2F2, h.card2F3, h.card2F4, h.card2F5, h.card2F6, h.card2F7].map((f) => (
                  <Feature key={f} text={f} light />
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full py-3 hover:bg-gold-soft transition-colors mt-2">
                {t.common.bookFreeCall}
              </Link>
            </div>

          </div>

          {/* ── Add-ons ── */}
          <div>
            <p className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">{h.addOnsTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-cream rounded-xl border border-border px-6 py-5 flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <div>
                  <p className="font-cormorant text-lg font-medium text-text">{h.addOn1Title}</p>
                  <p className="font-dmsans text-sm text-text-muted mt-0.5">{h.addOn1Body}</p>
                </div>
              </div>
              <div className="bg-cream rounded-xl border border-border px-6 py-5 flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <div>
                  <p className="font-cormorant text-lg font-medium text-text">{h.addOn2Title}</p>
                  <p className="font-dmsans text-sm text-text-muted mt-0.5">{h.addOn2Body}</p>
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
        heading={<>{h.ctaHeading} <em className="text-gold not-italic">{h.ctaItalic}</em></>}
        note={h.ctaNote}
      />
    </>
  );
}
