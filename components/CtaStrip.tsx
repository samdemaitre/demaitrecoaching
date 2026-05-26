"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CtaStripProps {
  heading: React.ReactNode;
  note?: string;
}

export default function CtaStrip({
  heading,
  note = "No commitment · 30 minutes · Free",
}: CtaStripProps) {
  return (
    <section className="py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-green-dark rounded-[18px] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-medium leading-snug text-center sm:text-left">
            {heading}
          </h3>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="font-montserrat text-xs font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-7 py-3 hover:bg-gold-soft transition-colors whitespace-nowrap"
            >
              Book a Free Call
            </Link>
            <span className="font-dmsans text-xs text-text-muted">{note}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
