import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import PricingCard from "@/components/PricingCard";
import CtaStrip from "@/components/CtaStrip";
import { PERSONAL_TRAINING_INCLUDES, PERSONAL_TRAINING_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Personal Training",
  description:
    "Bespoke in-person personal training in Guatemala City. 1-on-1 sessions designed around your goals with Samuel de Maître.",
};

export default function PersonalTrainingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="In-Person · Guatemala City"
        title={
          <>
            Personal <em className="text-gold not-italic">Training</em>
          </>
        }
        tagline="One-on-one coaching built entirely around you."
        body="Experience truly bespoke training in Guatemala City. Every session is designed around your physiology, your goals, and your schedule — no two programmes are alike."
        includes={PERSONAL_TRAINING_INCLUDES}
      />

      {/* Pricing */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              Pricing
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">
              Choose Your Package
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAL_TRAINING_PLANS.map((plan, i) => (
              <PricingCard key={plan.name} {...plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        heading={
          <>
            Questions about <em className="text-gold not-italic">which package?</em>
          </>
        }
        note="Book a free 30-minute discovery call"
      />
    </>
  );
}
