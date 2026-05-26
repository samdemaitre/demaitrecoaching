import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import PillarsSection from "@/components/PillarsSection";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "De Maître Coaching | Elite Personal Training Guatemala City",
  description:
    "Luxury personal training in Guatemala City. Tailored programmes for driven individuals. In-person, hybrid, and online coaching with Samuel de Maître.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <PillarsSection />
      <CtaStrip
        heading={
          <>
            Ready to transform your <em className="text-gold not-italic">body?</em>
          </>
        }
      />
    </>
  );
}
