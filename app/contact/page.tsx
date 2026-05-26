import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Samuel de Maître. Book a free 30-minute discovery call or send a message about personal training, hybrid, or online coaching.",
};

const CONTACT_ITEMS = [
  { label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { label: "WhatsApp", value: BRAND.phone, href: `https://wa.me/50255550000` },
  { label: "Location", value: `${BRAND.location} · Online worldwide`, href: null },
  { label: "Instagram", value: BRAND.instagram, href: "https://instagram.com/demaitrecoaching" },
];

export default function ContactPage() {
  return (
    <section className="bg-cream py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
              Get in Touch
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              Let&apos;s talk about{" "}
              <em className="text-gold not-italic">your goals.</em>
            </h2>
          </div>

          <p className="font-dmsans text-base text-text-soft leading-relaxed">
            Whether you&apos;re ready to commit to a programme or just curious about what&apos;s possible, Sam would love to hear from you. Book a free 30-minute discovery call — no sales pitch, no pressure.
          </p>

          <div className="flex flex-col gap-5">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div>
                  <p className="font-montserrat text-[10px] font-semibold tracking-widest uppercase text-text-muted mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-dmsans text-base text-text hover:text-gold transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-dmsans text-base text-text">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <ContactForm />
      </div>
    </section>
  );
}
