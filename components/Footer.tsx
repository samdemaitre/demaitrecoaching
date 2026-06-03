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
    <footer style={{ background: "var(--ink2)" }}>
      <div style={{ maxWidth: 1360 }} className="mx-auto px-6 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="font-cormorant text-cream font-medium text-lg">
                De Maître <em className="text-gold not-italic">Coaching</em>
              </span>
            </div>
            <p className="font-cormorant italic text-lg leading-relaxed" style={{ color: "var(--gold-soft)" }}>
              {t.footer.tagline}
            </p>
            <p className="font-dmsans text-sm leading-relaxed" style={{ color: "rgba(247,242,232,0.28)" }}>
              {t.footer.description}
            </p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-montserrat font-semibold uppercase text-gold"
              style={{ fontSize: 9, letterSpacing: "0.28em" }}
            >
              {t.footer.navigate}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dmsans text-sm transition-colors hover:text-cream"
                  style={{ color: "rgba(247,242,232,0.28)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col gap-4">
            <h4
              className="font-montserrat font-semibold uppercase text-gold"
              style={{ fontSize: 9, letterSpacing: "0.28em" }}
            >
              {t.footer.getInTouch}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="font-dmsans text-sm transition-colors hover:text-cream"
                style={{ color: "rgba(247,242,232,0.28)" }}
              >
                {BRAND.email}
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="font-dmsans text-sm transition-colors hover:text-cream"
                style={{ color: "rgba(247,242,232,0.28)" }}
              >
                {BRAND.phone}
              </a>
              <span className="font-dmsans text-sm" style={{ color: "rgba(247,242,232,0.28)" }}>
                {BRAND.location}
              </span>
              <a
                href="https://instagram.com/demaitrecoaching"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dmsans text-sm transition-colors"
                style={{ color: "var(--gold)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-soft)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
              >
                {BRAND.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          style={{ maxWidth: 1360 }}
          className="mx-auto px-6 md:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p
            className="font-montserrat"
            style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(247,242,232,0.18)" }}
          >
            © {new Date().getFullYear()} De Maître Coaching. {t.footer.copyright}
          </p>
          <p className="font-cormorant italic text-sm" style={{ color: "rgba(247,242,232,0.18)" }}>
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
