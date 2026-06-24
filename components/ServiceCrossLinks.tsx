"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

type ServiceKey = "personal" | "hybrid" | "online";

const ROUTES: Record<ServiceKey, string> = {
  personal: "/services/personal-training",
  hybrid: "/services/hybrid-coaching",
  online: "/services/online-coaching",
};

const ORDER: ServiceKey[] = ["personal", "hybrid", "online"];

// Two small frames linking to the other two service offers.
// Styled to match the add-on / pricing frames on each service page.
export default function ServiceCrossLinks({ current }: { current: ServiceKey }) {
  const { t } = useLanguage();
  const svc = t.nav.dropdown.services;

  const labels: Record<ServiceKey, { title: string; sub: string }> = {
    personal: { title: svc.personal, sub: svc.personalSub },
    hybrid: { title: svc.hybrid, sub: svc.hybridSub },
    online: { title: svc.online, sub: svc.onlineSub },
  };

  const others = ORDER.filter((k) => k !== current);

  return (
    <section className="py-16 px-6 bg-cream2">
      <div className="max-w-5xl mx-auto">
        <p className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-6 text-center">
          {t.common.exploreOther}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {others.map((key) => (
            <Link
              key={key}
              href={ROUTES[key]}
              className="group bg-cream rounded-xl border border-border px-6 py-5 flex items-center justify-between gap-4 hover:border-gold transition-colors duration-200"
            >
              <div>
                <p className="font-cormorant text-xl font-medium text-text">{labels[key].title}</p>
                <p className="font-dmsans text-sm text-text-muted mt-0.5">{labels[key].sub}</p>
              </div>
              <span className="font-montserrat text-[11px] font-semibold tracking-widest uppercase text-gold shrink-0 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                {t.common.learnMore} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
