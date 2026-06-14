"use client";

import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function OnlineCoachingPage() {
  const { t } = useLanguage();
  const o = t.onlineCoaching;

  const features: { text: string; negative?: boolean }[] = [
    { text: o.cardF1, negative: true },
    { text: o.cardF2 },
    { text: o.cardF3 },
    { text: o.cardF4 },
    { text: o.cardF5 },
    { text: o.cardF6 },
  ];

  return (
    <>
      <ServiceHero
        eyebrow={o.eyebrow}
        title={<>{o.title} <em className="text-gold not-italic">{o.titleItalic}</em></>}
        tagline={o.tagline}
        body={o.body}
        includes={o.includes}
      />

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">{t.common.pricing}</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">{t.common.choosePackage}</h2>
          </div>

          {/* ── Two cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* ── Card 1 · 1-month online ── */}
            <div className="bg-cream rounded-2xl border border-border p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{o.card1Title}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{o.card1Subtitle}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="font-cormorant text-4xl font-medium text-gold">Q950</span>
                <span className="font-montserrat text-xs text-text-muted mb-1.5">{t.common.perMonth}</span>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {features.map(({ text, negative }) => (
                  <li key={text} className="flex items-start gap-3">
                    {negative ? (
                      <svg className="w-3.5 h-3.5 mt-1 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    )}
                    <span className={`font-dmsans text-sm leading-relaxed ${negative ? "text-text-muted" : "text-text-soft"}`}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full py-3 hover:bg-gold hover:text-cream transition-all duration-200 mt-2">
                {t.common.bookFreeCall}
              </Link>
            </div>

            {/* ── Card 2 · 3-month online (Best Value) ── */}
            <div className="relative bg-green-dark rounded-2xl p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-3 py-1">{t.common.bestValue}</span>
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-cream">{o.card2Title}</h3>
                <p className="font-dmsans text-sm text-gold-soft/70 mt-1">{o.card2Subtitle}</p>
              </div>
              <div>
                <div className="flex items-end gap-1">
                  <span className="font-cormorant text-4xl font-medium text-gold">Q850</span>
                  <span className="font-montserrat text-xs text-gold-soft/70 mb-1.5">{t.common.perMonth}</span>
                </div>
                <p className="font-dmsans text-xs text-gold-soft/60 mt-1">{o.card2Total} · {o.card2Save}</p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {features.map(({ text, negative }) => (
                  <li key={text} className="flex items-start gap-3">
                    {negative ? (
                      <svg className="w-3.5 h-3.5 mt-1 shrink-0 text-cream/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    )}
                    <span className={`font-dmsans text-sm leading-relaxed ${negative ? "text-cream/50" : "text-cream/75"}`}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full py-3 hover:bg-gold-soft transition-colors mt-2">
                {t.common.bookFreeCall}
              </Link>
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
        heading={<>{o.ctaHeading} <em className="text-gold not-italic">{o.ctaItalic}</em></>}
        note={o.ctaNote}
      />
    </>
  );
}
