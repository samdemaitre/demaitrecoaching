"use client";

import { motion } from "framer-motion";
import TestimonialBlock from "@/components/TestimonialBlock";
import CtaStrip from "@/components/CtaStrip";
import { CREDENTIALS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
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
              About Sam
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              A decade of training.{" "}
              <em className="text-gold not-italic">Real results.</em>
            </h2>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              Sam de Maître has spent over a decade studying the science and art of human performance. Born from a passion for strength and a frustration with cookie-cutter coaching, he founded De Maître Coaching to offer something genuinely different — a luxury, results-driven experience for those who refuse to settle.
            </p>
            <p className="font-dmsans text-base text-text-soft leading-relaxed">
              Based in Guatemala City with clients across Europe and the Americas, Sam&apos;s approach blends evidence-based programming with a deep understanding of each individual&apos;s lifestyle, psychology, and ambitions. Every client gets a programme built from scratch — no templates, no shortcuts.
            </p>

            <div className="pt-4 border-t border-border">
              <p className="font-cormorant italic text-3xl text-text font-medium">
                Sam de Maître
              </p>
              <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted mt-1">
                Founder · Head Coach
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
                &ldquo;The body achieves what the mind believes — but only with a programme worthy of that belief.&rdquo;
              </blockquote>
              <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold">
                — Sam de Maître
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-col gap-4">
              <h3 className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                Credentials
              </h3>
              {CREDENTIALS.map((cred) => (
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
        quote="Working with Sam changed everything. I&apos;d tried three coaches before him and never got results like this. His attention to detail and genuine investment in my progress is unlike anything I&apos;ve experienced."
        author="Carlos M."
        title="Client · Guatemala City"
      />

      <CtaStrip
        heading={
          <>
            Ready to work with <em className="text-gold not-italic">Sam?</em>
          </>
        }
      />
    </>
  );
}
