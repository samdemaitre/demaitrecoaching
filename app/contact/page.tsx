"use client";

import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/context";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  const contactItems = [
    { label: c.labelEmail, value: BRAND.email, href: `mailto:${BRAND.email}` },
    { label: c.labelWhatsApp, value: BRAND.phone, href: `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(t.common.whatsappMessage)}` },
    { label: c.labelLocation, value: c.locationValue, href: null },
    { label: c.labelInstagram, value: BRAND.instagram, href: "https://instagram.com/demaitrecoaching" },
  ];

  return (
    <section className="bg-cream py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
              {c.eyebrow}
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium text-text leading-tight">
              {c.heading}{" "}
              <em className="text-gold not-italic">{c.headingItalic}</em>
            </h2>
          </div>

          <p className="font-dmsans text-base text-text-soft leading-relaxed">
            {c.body}
          </p>

          <div className="flex flex-col gap-5">
            {contactItems.map((item) => (
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
