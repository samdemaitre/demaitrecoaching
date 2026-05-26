"use client";

import FaqAccordion from "@/components/FaqAccordion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function FaqPage() {
  const { t } = useLanguage();
  const f = t.faqPage;

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
              {f.eyebrow}
            </span>
            <h1 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight mb-4">
              {f.heading} <em className="text-gold not-italic">{f.headingItalic}</em>
            </h1>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {f.body}
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      <CtaStrip
        heading={<>{f.ctaHeading} <em className="text-gold not-italic">{f.ctaItalic}</em></>}
        note={f.ctaNote}
      />
    </>
  );
}
