"use client";

import { motion } from "framer-motion";
import TestimonialBlock from "@/components/TestimonialBlock";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function MeetTheCoachPage() {
  const { t } = useLanguage();
  const mc = t.meetCoach;

  const credentials = [
    { title: mc.cred1Title, desc: mc.cred1Desc },
    { title: mc.cred2Title, desc: mc.cred2Desc },
    { title: mc.cred3Title, desc: mc.cred3Desc },
    { title: mc.cred4Title, desc: mc.cred4Desc },
  ];

  return (
    <>
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              {mc.eyebrow}
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              {mc.heading}{" "}
              <em className="text-gold not-italic">{mc.headingItalic}</em>
            </h2>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body1}
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body2}
            </p>

            <div className="pt-4 border-t border-border">
              <p className="font-cormorant italic text-3xl text-text font-medium">
                {mc.signature}
              </p>
              <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted mt-1">
                {mc.role}
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Quote block */}
            <div className="bg-green-dark rounded-2xl p-8">
              <blockquote className="font-cormorant italic text-xl md:text-2xl text-cream leading-relaxed mb-4">
                &ldquo;{mc.quote}&rdquo;
              </blockquote>
              <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold">
                {mc.quoteAttr}
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-col gap-4">
              <h3 className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                {mc.credentialsHeading}
              </h3>
              {credentials.map((cred) => (
                <div key={cred.title} className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                  <div>
                    <p className="font-cormorant text-lg font-medium text-text">{cred.title}</p>
                    <p className="font-dmsans text-sm text-text-soft">{cred.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialBlock
        quote={mc.testimonialQuote}
        author={mc.testimonialAuthor}
        title={mc.testimonialRole}
      />

      <CtaStrip
        heading={
          <>
            {mc.ctaHeading} <em className="text-gold not-italic">{mc.ctaItalic}</em>
          </>
        }
      />
    </>
  );
}
