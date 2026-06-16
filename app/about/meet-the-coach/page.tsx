"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TestimonialBlock from "@/components/TestimonialBlock";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

// Gold-bracket photo frame; optional caption below
function PhotoFrame({
  src,
  alt,
  caption,
  sizes,
  objectPosition,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  sizes: string;
  objectPosition?: string;
  priority?: boolean;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="relative bg-cream2 rounded-sm p-3"
        style={{ border: "1px solid rgba(184,149,62,0.3)" }}
      >
        <span className="absolute top-1 left-1 w-5 h-5 z-10 pointer-events-none" style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute top-1 right-1 w-5 h-5 z-10 pointer-events-none" style={{ borderTop: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute bottom-1 left-1 w-5 h-5 z-10 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderLeft: "1.5px solid rgba(184,149,62,0.6)" }} />
        <span className="absolute bottom-1 right-1 w-5 h-5 z-10 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(184,149,62,0.6)", borderRight: "1.5px solid rgba(184,149,62,0.6)" }} />
        <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "4/5" }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="font-dmsans text-[13px] text-text-soft text-center leading-snug">{caption}</figcaption>
      )}
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
            className="flex flex-col gap-8"
          >
            {/* Portrait */}
            <PhotoFrame
              src="/images/about-sam.jpg"
              alt="Sam de Maître"
              sizes="(max-width: 768px) 100vw, 600px"
              objectPosition="center 20%"
              priority
            />

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

      {/* Photo strip */}
      <section className="bg-cream pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">
            {mc.photosEyebrow}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <PhotoFrame src="/images/photo-decathlon.jpg" alt={mc.photo1Caption} caption={mc.photo1Caption} sizes="(max-width: 768px) 50vw, 300px" />
            <PhotoFrame src="/images/photo-powerlifting.jpg" alt={mc.photo2Caption} caption={mc.photo2Caption} sizes="(max-width: 768px) 50vw, 300px" />
            <PhotoFrame src="/images/photo-adventure.jpg" alt={mc.photo3Caption} caption={mc.photo3Caption} sizes="(max-width: 768px) 50vw, 300px" />
            <PhotoFrame src="/images/photo-coaching.jpg" alt={mc.photo4Caption} caption={mc.photo4Caption} sizes="(max-width: 768px) 50vw, 300px" />
          </div>
        </div>
      </section>

      <TestimonialBlock
        quote={mc.testimonialQuote}
        author={mc.testimonialAuthor}
        title={mc.testimonialRole}
        image="/images/testimonial-els.jpg"
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
