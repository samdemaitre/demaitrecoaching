"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  index?: number;
}

export default function PricingCard({
  name,
  price,
  frequency,
  features,
  featured = false,
  badge,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
        featured
          ? "bg-green-dark text-cream"
          : "bg-cream border border-border"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-4 py-1">
            {badge}
          </span>
        </div>
      )}

      <div>
        <h3 className={`font-cormorant text-2xl font-medium mb-1 ${featured ? "text-cream" : "text-text"}`}>
          {name}
        </h3>
        <p className={`font-montserrat text-[11px] tracking-widest uppercase ${featured ? "text-gold-soft" : "text-text-muted"}`}>
          {frequency}
        </p>
      </div>

      <div className="flex items-end gap-1">
        <span className={`font-cormorant text-4xl font-medium ${featured ? "text-gold" : "text-gold"}`}>
          {price}
        </span>
        <span className={`font-montserrat text-xs mb-1.5 ${featured ? "text-gold-soft" : "text-text-muted"}`}>
          /month
        </span>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
            <span className={`font-dmsans text-sm leading-relaxed ${featured ? "text-cream/80" : "text-text-soft"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-2 block text-center font-montserrat text-xs font-semibold tracking-widest uppercase rounded-full px-6 py-3 transition-all duration-200 ${
          featured
            ? "bg-gold text-green-dark hover:bg-gold-soft"
            : "border border-gold text-gold hover:bg-gold hover:text-cream"
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
}
