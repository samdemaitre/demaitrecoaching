import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import PricingCard from "@/components/PricingCard";
import CtaStrip from "@/components/CtaStrip";
import { HYBRID_INCLUDES, HYBRID_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hybrid Coaching",
  description:
    "The best of in-person and online coaching. In-person sessions in Guatemala City combined with continuous remote support.",
};

export default function HybridCoachingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Guatemala City + Online"
        title={
          <>
            Hybrid <em className="text-gold not-italic">Coaching</em>
          </>
        }
        tagline="The perfect blend of in-person and remote."
        body="Hybrid Coaching combines face-to-face sessions in Guatemala City with the flexibility and continuity of online coaching. You get the accountability of in-person training and the convenience of expert remote support — everywhere, every day."
        includes={HYBRID_INCLUDES}
      />

      {/* Pricing */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              Pricing
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text mt-3">
              Choose Your Package
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {HYBRID_PLANS.map((plan, i) => (
              <PricingCard key={plan.name} {...plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        heading={
          <>
            Not sure which package is right for{" "}
            <em className="text-gold not-italic">you?</em>
          </>
        }
        note="Book a free 30-minute discovery call"
      />
    </>
  );
}
