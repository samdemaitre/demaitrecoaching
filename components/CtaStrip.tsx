"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

interface CtaStripProps {
  heading: React.ReactNode;
  note?: string;
}

export default function CtaStrip({ heading, note }: CtaStripProps) {
  const { t } = useLanguage();
  const resolvedNote = note ?? t.common.noCommitment;

  return (
    <>
      {/* Wave: cream → ink */}
      <div className="w-full overflow-hidden bg-cream" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="100" width="100%">
          <path d="M0,0 C480,100 960,0 1440,60 L1440,100 L0,100 Z" fill="#1A1510" />
        </svg>
      </div>

      {/* CTA section */}
      <section className="bg-ink px-6 md:px-14 pb-24">
        <div style={{ maxWidth: 1360 }} className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
          >
            {/* Left — CTA */}
            <div>
              <p
                className="font-montserrat font-semibold uppercase mb-4"
                style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(184,149,62,0.6)" }}
              >
                {t.common.readyToStart}
              </p>
              <h3
                className="font-cormorant font-light text-cream leading-[1.05]"
                style={{ fontSize: "clamp(42px, 4vw, 64px)" }}
              >
                {heading}
              </h3>
              <div className="flex flex-wrap gap-4 mt-7">
                <Link
                  href="/contact"
                  className="font-montserrat font-semibold uppercase rounded-full hover:opacity-90 transition-opacity"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    background: "var(--gold)",
                    color: "var(--ink)",
                    padding: "15px 36px",
                    textDecoration: "none",
                  }}
                >
                  {t.common.bookFreeCall}
                </Link>
                <Link
                  href="/services/personal-training"
                  className="font-montserrat font-medium uppercase rounded-full transition-all duration-200"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "rgba(247,242,232,0.45)",
                    border: "1px solid rgba(247,242,232,0.2)",
                    padding: "15px 28px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,242,232,0.2)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(247,242,232,0.45)";
                  }}
                >
                  {t.common.seeServices} →
                </Link>
              </div>
              <p
                className="font-dmsans mt-3"
                style={{ fontSize: 13, color: "rgba(247,242,232,0.25)" }}
              >
                {resolvedNote}
              </p>
            </div>

            {/* Right — Quote */}
            <div>
              <div className="w-12 h-px opacity-50 mb-5" style={{ background: "var(--gold)" }} />
              <blockquote
                className="font-cormorant italic leading-[1.55]"
                style={{ fontSize: 22, color: "rgba(247,242,232,0.45)" }}
              >
                &ldquo;{t.common.ctaQuote}&rdquo;
              </blockquote>
              <span
                className="font-montserrat uppercase block mt-4"
                style={{ fontSize: 9, letterSpacing: "0.26em", color: "var(--gold)" }}
              >
                — Sam De Maître · De Maître Coaching
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
