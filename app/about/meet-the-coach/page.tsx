"use client";

import { motion } from "framer-motion";
import TestimonialBlock from "@/components/TestimonialBlock";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

// Placeholder frame — swap the inner div for an <Image> once real photos are ready
function PhotoPlaceholder({ caption, comingLabel }: { caption: string; comingLabel: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="relative bg-cream2 rounded-sm p-3"
        style={{ border: "1px solid rgba(184,149,62,0.3)" }}
      >
        <span className="absolute top-1 left-1 w-5 h-5 pointer-events-none" style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute top-1 right-1 w-5 h-5 pointer-events-none" style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute bottom-1 left-1 w-5 h-5 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute bottom-1 right-1 w-5 h-5 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }} />
        <div
          className="w-full flex flex-col items-center justify-center gap-3 rounded-sm"
          style={{ aspectRatio: "4/5", border: "1px dashed rgba(184,149,62,0.4)", background: "rgba(184,149,62,0.05)" }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="rgba(184,149,62,0.5)" strokeWidth={1.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          <span className="font-montserrat text-[9px] font-semibold tracking-[0.2em] uppercase" style={{ color: "rgba(184,149,62,0.6)" }}>
            {comingLabel}
          </span>
        </div>
      </div>
      <figcaption className="font-dmsans text-[13px] text-text-soft text-center leading-snug">{caption}</figcaption>
    </figure>
  );
}

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
            {mc.body1 && <p className="font-dmsans text-base text-text-soft leading-relaxed">{mc.body1}</p>}
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body2}
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body3}
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body4}
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              {mc.body5}
            </p>
            <p className="font-dmsans text-sm text-gold font-medium leading-relaxed italic">
              {mc.body6}
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
                    {cred.desc && <p className="font-dmsans text-sm text-text-soft">{cred.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo strip — placeholders until real photos are shot */}
      <section className="bg-cream pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
            {mc.photosEyebrow}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <PhotoPlaceholder caption={mc.photo1Caption} comingLabel={mc.photoComing} />
            <PhotoPlaceholder caption={mc.photo2Caption} comingLabel={mc.photoComing} />
            <PhotoPlaceholder caption={mc.photo3Caption} comingLabel={mc.photoComing} />
            <PhotoPlaceholder caption={mc.photo4Caption} comingLabel={mc.photoComing} />
          </div>
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
