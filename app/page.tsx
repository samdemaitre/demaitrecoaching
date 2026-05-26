"use client";

import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import PillarsSection from "@/components/PillarsSection";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <PillarsSection />
      <CtaStrip
        heading={
          <>
            {t.home.ctaHeading} <em className="text-gold not-italic">{t.home.ctaItalic}</em>
          </>
        }
      />
    </>
  );
}
