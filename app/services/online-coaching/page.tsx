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

          {/* Single card — centred, constrained width */}
          <div className="max-w-sm mx-auto">
            <div className="bg-cream rounded-2xl border border-border p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-cormorant text-2xl font-medium text-text">{o.cardTitle}</h3>
                <p className="font-dmsans text-sm text-text-muted mt-1">{o.cardSubtitle}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="font-cormorant text-4xl font-medium text-gold">Q950</span>
                <span className="font-montserrat text-xs text-text-muted mb-1.5">{t.common.perMonth}</span>
              </div>
              <ul className="flex flex-col gap-3">
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
              <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-green-dark text-cream rounded-full py-3 hover:bg-green-mid transition-colors mt-2">
                {t.common.getStarted}
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
