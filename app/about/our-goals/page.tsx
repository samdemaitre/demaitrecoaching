"use client";

import { motion } from "framer-motion";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function OurGoalsPage() {
  const { t } = useLanguage();
  const g = t.ourGoals;

  const goals = [
    { number: g.g1Number, title: g.g1Title, body: g.g1Body },
    { number: g.g2Number, title: g.g2Title, body: g.g2Body },
    { number: g.g3Number, title: g.g3Title, body: g.g3Body },
    { number: g.g4Number, title: g.g4Title, body: g.g4Body },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 mb-16"
          >
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              {g.eyebrow}
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              {g.heading}{" "}
              <em className="text-gold not-italic">{g.headingItalic}</em>
            </h2>
            <p className="font-dmsans text-base text-text-soft leading-relaxed max-w-2xl">
              {g.body}
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed max-w-2xl">
              {g.body2}
            </p>
          </motion.div>

          {/* Goals */}
          <div className="flex flex-col gap-6">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex gap-8 items-start bg-cream2 rounded-xl p-8 border border-border-soft"
              >
                <span className="font-cormorant text-5xl font-light text-gold/30 leading-none shrink-0 select-none">
                  {goal.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-cormorant text-2xl font-medium text-text">{goal.title}</h3>
                  <p className="font-dmsans text-sm text-text-soft leading-relaxed">{goal.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-green-dark py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-cormorant italic text-2xl md:text-3xl text-cream leading-relaxed mb-6">
            &ldquo;{g.missionQuote}&rdquo;
          </blockquote>
          <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold">
            — Sam de Maître
          </p>
        </div>
      </section>

      <CtaStrip
        heading={
          <>
            {g.ctaHeading}{" "}
            <em className="text-gold not-italic">{g.ctaItalic}</em>
          </>
        }
      />
    </>
  );
}
