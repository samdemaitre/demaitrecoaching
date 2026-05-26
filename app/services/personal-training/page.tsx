"use client";

import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

function Feature({ text, negative = false }: { text: string; negative?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      {negative ? (
        <svg className="w-3.5 h-3.5 mt-1 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
      )}
      <span className={`font-dmsans text-sm leading-relaxed ${negative ? "text-text-muted line-through" : "text-text-soft"}`}>
        {text}
      </span>
    </li>
  );
}

function Badge({ label, variant = "gold" }: { label: string; variant?: "gold" | "green" }) {
  return (
    <span className={`font-montserrat text-[10px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 ${
      variant === "gold"
        ? "bg-gold text-green-dark"
        : "bg-green-soft/20 text-green-soft border border-green-soft/40"
    }`}>
      {label}
    </span>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">{t.common.pricing}</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">{t.common.choosePackage}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ── Card 1 · Single session ── */}
            <div className="bg-cream rounded-2xl border border-border p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{p.card1Title}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{p.card1Subtitle}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="font-cormorant text-4xl font-medium text-gold">Q350</span>
                <span className="font-montserrat text-xs text-text-muted mb-1.5">{t.common.perSession}</span>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                <Feature text={p.card1F1} />
                <Feature text={p.card1F2} />
                <Feature text={p.card1F3} negative />
                <Feature text={p.card1F4} negative />
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full py-3 hover:bg-gold hover:text-cream transition-all duration-200 mt-2">
                {t.common.bookSession}
              </Link>
            </div>

            {/* ── Card 2 · Monthly packages (featured) ── */}
            <div className="relative bg-green-dark rounded-2xl p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge label={t.common.mostPopular} />
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-cream">{p.card2Title}</h3>
                <p className="font-dmsans text-sm text-gold-soft/70 mt-1">{p.card2Subtitle}</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-green-mid rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold-soft">{p.card2Tier1}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,200</span>
                </div>
                <div className="bg-green-mid rounded-xl px-5 py-3 flex items-center justify-between">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold-soft">{p.card2Tier2}</p>
                  <span className="font-cormorant text-2xl font-medium text-gold">Q1,950</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {[p.card2F1, p.card2F2, p.card2F3].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="font-dmsans text-sm text-cream/75 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full py-3 hover:bg-gold-soft transition-colors mt-2">
                {t.common.getStarted}
              </Link>
            </div>

            {/* ── Card 3 · Bring a friend (accent) ── */}
            <div className="relative bg-cream rounded-2xl border-2 border-gold p-8 flex flex-col gap-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge label={t.common.twoForOne} />
              </div>
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{p.card3Title}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{p.card3Subtitle}</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-cream2 rounded-xl px-5 py-3">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted mb-1">{p.card3Tier1}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-dmsans text-sm text-text-muted line-through">Q1,200 {p.card3PPLabel}</span>
                    <span className="font-cormorant text-2xl font-medium text-gold">Q900 {p.card3PPLabel}</span>
                  </div>
                  <p className="font-dmsans text-xs text-text-muted mt-0.5">{p.card3TotalLabel} Q1,800</p>
                </div>
                <div className="bg-cream2 rounded-xl px-5 py-3">
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted mb-1">{p.card3Tier2}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-dmsans text-sm text-text-muted line-through">Q1,950 {p.card3PPLabel}</span>
                    <span className="font-cormorant text-2xl font-medium text-gold">Q1,463 {p.card3PPLabel}</span>
                  </div>
                  <p className="font-dmsans text-xs text-text-muted mt-0.5">{p.card3TotalLabel} Q2,925</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                <Feature text={p.card3F1} />
                <Feature text={p.card3F2} />
              </ul>
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full py-3 hover:bg-gold-soft transition-colors mt-2">
                {t.common.bookFriend}
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
        heading={<>{p.ctaHeading} <em className="text-gold not-italic">{p.ctaItalic}</em></>}
        note={p.ctaNote}
      />
    </>
  );
}
