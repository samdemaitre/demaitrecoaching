"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t.footer.links.home, href: "/" },
    { label: t.footer.links.meetCoach, href: "/about/meet-the-coach" },
    { label: t.footer.links.whyUs, href: "/about/why-us" },
    { label: t.footer.links.ourGoals, href: "/about/our-goals" },
    { label: t.footer.links.personal, href: "/services/personal-training" },
    { label: t.footer.links.hybrid, href: "/services/hybrid-coaching" },
    { label: t.footer.links.online, href: "/services/online-coaching" },
    { label: t.footer.links.faq, href: "/faq" },
    { label: t.footer.links.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-green-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                <span className="font-cormorant text-gold font-medium text-base">SDM</span>
              </div>
              <span className="font-cormorant text-cream font-medium text-lg">
                De Maître <em className="text-gold not-italic">Coaching</em>
              </span>
            </div>
            <p className="font-cormorant italic text-gold-soft text-lg leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="font-dmsans text-sm text-text-muted leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat text-xs font-semibold tracking-widest uppercase text-gold">
              {t.footer.navigate}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dmsans text-sm text-text-muted hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat text-xs font-semibold tracking-widest uppercase text-gold">
              {t.footer.getInTouch}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="font-dmsans text-sm text-text-muted hover:text-cream transition-colors"
              >
                {BRAND.email}
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="font-dmsans text-sm text-text-muted hover:text-cream transition-colors"
              >
                {BRAND.phone}
              </a>
              <span className="font-dmsans text-sm text-text-muted">{BRAND.location}</span>
              <a
                href="https://instagram.com/demaitrecoaching"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dmsans text-sm text-gold hover:text-gold-soft transition-colors"
              >
                {BRAND.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-green-mid border-t border-green-soft">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-montserrat text-[11px] text-text-muted tracking-wide">
            © {new Date().getFullYear()} De Maître Coaching. {t.footer.copyright}
          </p>
          <p className="font-cormorant italic text-text-muted text-sm">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
