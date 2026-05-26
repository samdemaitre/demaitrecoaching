"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import CtaStrip from "@/components/CtaStrip";
import { ONLINE_INCLUDES } from "@/lib/constants";

const ONLINE_FEATURES = [
  "Custom training programme updated monthly",
  "Nutrition guidelines & macro targets",
  "Weekly video check-in (30 min)",
  "App-based progress tracking",
  "24/7 WhatsApp message support",
  "Monthly programme refresh",
];

export default function OnlineCoachingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Worldwide · Fully Remote"
        title={
          <>
            Online <em className="text-gold not-italic">Coaching</em>
          </>
        }
        tagline="World-class coaching, wherever you are."
        body="Distance is no barrier to exceptional coaching. Online Coaching delivers the full De Maître experience remotely — from custom programmes and nutrition guidance to weekly check-ins and 24/7 support."
        includes={ONLINE_INCLUDES}
      />

      {/* Pricing — Wide single card */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              Pricing
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">
              One Comprehensive Package
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-cream rounded-2xl border border-border overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — Plan details */}
              <div className="p-10 flex flex-col gap-6">
                <div>
                  <h3 className="font-cormorant text-3xl font-medium text-text mb-1">
                    Online Coaching
                  </h3>
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-text-muted">
                    Worldwide · Fully remote
                  </p>
                </div>

                <div className="flex items-end gap-1">
                  <span className="font-cormorant text-5xl font-medium text-gold">Q 2,200</span>
                  <span className="font-montserrat text-xs text-text-muted mb-1.5">/month</span>
                </div>

                <ul className="flex flex-col gap-3">
                  {ONLINE_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span className="font-dmsans text-sm text-text-soft leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase border border-gold text-gold rounded-full px-6 py-3 hover:bg-gold hover:text-cream transition-all duration-200 mt-2"
                >
                  Apply Now
                </Link>
              </div>

              {/* Right — Testimonial + CTA */}
              <div className="bg-green-dark p-10 flex flex-col gap-6 justify-between">
                <blockquote className="font-cormorant italic text-xl text-cream leading-relaxed">
                  &ldquo;I&apos;ve been training with Sam remotely from Belgium for eight months. The structure, the check-ins, the programme quality — it genuinely rivals having a coach next to you in the gym.&rdquo;
                </blockquote>
                <div>
                  <p className="font-montserrat text-[10px] tracking-widest uppercase text-gold">
                    — Mathieu V.
                  </p>
                  <p className="font-dmsans text-xs text-text-muted mt-0.5">Online Client · Belgium</p>
                </div>

                <div className="border-t border-green-soft pt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-6 py-3 hover:bg-gold-soft transition-colors"
                  >
                    Apply Now
                  </Link>
                  <p className="font-dmsans text-xs text-text-muted text-center">
                    Limited spots available each month
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CtaStrip
        heading={
          <>
            Ready to start your journey from{" "}
            <em className="text-gold not-italic">anywhere?</em>
          </>
        }
        note="Limited spots · Apply to secure yours"
      />
    </>
  );
}
