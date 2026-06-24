"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";

type ServiceKey = "personal" | "hybrid" | "online";

const ROUTES: Record<ServiceKey, string> = {
  personal: "/services/personal-training",
  hybrid: "/services/hybrid-coaching",
  online: "/services/online-coaching",
};

const ORDER: ServiceKey[] = ["personal", "hybrid", "online"];

// Home-page section: the three ways to train, each linking to its service page
// so visitors scrolling the homepage can jump straight to the offers.
export default function ServicesPreview() {
  const { t } = useLanguage();
  const svc = t.nav.dropdown.services;

  const cards: Record<ServiceKey, { title: string; sub: string; desc: string; price: string }> = {
    personal: { title: svc.personal, sub: svc.personalSub, desc: t.personalTraining.tagline, price: "Q1,200" },
    hybrid: { title: svc.hybrid, sub: svc.hybridSub, desc: t.hybridCoaching.tagline, price: "Q1,300" },
    online: { title: svc.online, sub: svc.onlineSub, desc: t.onlineCoaching.tagline, price: "Q850" },
  };

  return (
    <section className="bg-cream2 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
            {t.home.servicesEyebrow}
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">
            {t.home.servicesHeading}{" "}
            <em className="text-gold not-italic">{t.home.servicesHeadingItalic}</em>
          </h2>
          <p className="font-dmsans text-base text-text-soft leading-relaxed max-w-2xl mx-auto mt-4">
            {t.home.servicesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORDER.map((key, i) => {
            const c = cards[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={ROUTES[key]}
                  className="group h-full bg-cream rounded-2xl border border-border p-8 flex flex-col gap-4 hover:border-gold hover:shadow-sm transition-all duration-200"
                >
                  <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                    {c.sub}
                  </p>
                  <h3 className="font-cormorant text-2xl font-medium text-text">{c.title}</h3>
                  <p className="font-dmsans text-sm text-text-soft leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex items-end justify-between pt-2 border-t border-border">
                    <p className="font-dmsans text-xs text-text-muted">
                      <span className="font-cormorant text-xl text-gold font-medium">{c.price}</span>
                      <span className="text-text-muted"> {t.common.perMonth}</span>
                    </p>
                    <span className="font-montserrat text-[11px] font-semibold tracking-widest uppercase text-gold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      {t.common.learnMore} <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
