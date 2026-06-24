"use client";

import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import LakeBand from "@/components/LakeBand";
import PillarsSection from "@/components/PillarsSection";
import ServicesPreview from "@/components/ServicesPreview";
import CtaStrip from "@/components/CtaStrip";
import { useLanguage } from "@/lib/i18n/context";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <LakeBand />
      <PillarsSection />
      <ServicesPreview />
      <CtaStrip
        heading={
          <>
            {t.home.ctaHeading}<br /><em className="italic text-gold-soft">{t.home.ctaItalic}</em>
          </>
        }
      />
    </>
  );
}
