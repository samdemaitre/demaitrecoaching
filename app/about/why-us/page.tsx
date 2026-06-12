"use client";

import { motion } from "framer-motion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function WhyUsPage() {
  const { t } = useLanguage();
  const w = t.whyUs;

  const differentiators = [
    { title: w.d1Title, body: w.d1Body },
    { title: w.d2Title, body: w.d2Body },
    { title: w.d3Title, body: w.d3Body },
    { title: w.d4Title, body: w.d4Body },
    { title: w.d5Title, body: w.d5Body },
    { title: w.d6Title, body: w.d6Body },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 mb-16"
          >
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              {w.eyebrow}
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              {w.heading}{" "}
              <em className="text-gold not-italic">{w.headingItalic}</em>
            </h2>
            <p className="font-dmsans text-base text-text-soft leading-relaxed max-w-2xl">
              {w.body}
            </p>
          </motion.div>

          {/* Differentiators grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-cream2 rounded-xl p-7 border border-border-soft flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <h3 className="font-cormorant text-xl font-medium text-text">{item.title}</h3>
                </div>
                <p className="font-dmsans text-sm text-text-soft leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-green-dark py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-cormorant italic text-2xl md:text-3xl text-cream leading-relaxed">
            &ldquo;{w.quote}&rdquo;
          </blockquote>
        </div>
      </section>

      <CtaStrip
        heading={
          <>
            {w.ctaHeading}{" "}
            <em className="text-gold not-italic">{w.ctaItalic}</em>
          </>
        }
      />
    </>
  );
}
