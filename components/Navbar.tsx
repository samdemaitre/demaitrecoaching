"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Build nav structure from translations
  const NAV = [
    { key: "home", label: t.nav.home, href: "/" },
    {
      key: "about", label: t.nav.about, href: "/about",
      children: [
        { label: t.nav.dropdown.about.meetCoach, subtitle: t.nav.dropdown.about.meetCoachSub, href: "/about/meet-the-coach" },
        { label: t.nav.dropdown.about.whyUs, subtitle: t.nav.dropdown.about.whyUsSub, href: "/about/why-us" },
        { label: t.nav.dropdown.about.ourGoals, subtitle: t.nav.dropdown.about.ourGoalsSub, href: "/about/our-goals" },
      ],
    },
    {
      key: "services", label: t.nav.services, href: "#",
      children: [
        { label: t.nav.dropdown.services.personal, subtitle: t.nav.dropdown.services.personalSub, href: "/services/personal-training" },
        { label: t.nav.dropdown.services.hybrid, subtitle: t.nav.dropdown.services.hybridSub, href: "/services/hybrid-coaching" },
        { label: t.nav.dropdown.services.online, subtitle: t.nav.dropdown.services.onlineSub, href: "/services/online-coaching" },
      ],
    },
    { key: "faq", label: t.nav.faq, href: "/faq" },
    { key: "contact", label: t.nav.contact, href: "/contact" },
  ];

  // Close desktop dropdown when clicking outside the whole nav
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isDropdownActive = (children: { href: string }[]) =>
    children.some((c) => pathname.startsWith(c.href));

  const Caret = ({ open }: { open: boolean }) => (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(247,242,232,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(184,149,62,0.16)",
      }}
    >
      <div className="mx-auto px-14 flex items-center justify-between" style={{ maxWidth: 1360, height: 72 }}>
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-cormorant text-text font-normal leading-none" style={{ fontSize: 19 }}>
            De Maître <em className="text-gold not-italic">Coaching</em>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden md:flex items-center gap-10">
          {NAV.map((link) => {
            if (!link.children) {
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`font-montserrat font-medium tracking-[0.2em] uppercase transition-colors ${
                    isActive(link.href) ? "text-gold" : "text-text-soft hover:text-gold"
                  }`}
                  style={{ fontSize: 10 }}
                >
                  {link.label}
                </Link>
              );
            }

            const isOpen = openDropdown === link.key;
            const active = isDropdownActive(link.children);

            return (
              <div
                key={link.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : link.key)}
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1 font-montserrat font-medium tracking-[0.2em] uppercase transition-colors ${
                    active ? "text-gold" : "text-text-soft hover:text-gold"
                  }`}
                  style={{ fontSize: 10 }}
                >
                  {link.label}
                  <Caret open={isOpen} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-cream rounded-xl shadow-lg overflow-hidden"
                      style={{ border: "1px solid rgba(184,149,62,0.25)" }}
                    >
                      <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-l border-t border-gold rotate-45" />
                      <div className="py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex flex-col px-5 py-3 hover:bg-cream2 transition-colors ${
                              pathname.startsWith(child.href) ? "text-gold" : "text-text"
                            }`}
                          >
                            <span className="font-cormorant font-medium text-base">{child.label}</span>
                            <span className="font-montserrat text-[10px] tracking-widest text-text-muted mt-0.5 uppercase">
                              {child.subtitle}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop right side: Language switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="font-montserrat font-semibold tracking-[0.16em] uppercase text-text rounded-full transition-all duration-200 hover:bg-gold hover:text-white"
            style={{
              fontSize: 10,
              border: "1.5px solid var(--gold)",
              padding: "11px 28px",
            }}
          >
            {t.nav.bookCall}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-text transition-transform duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-text transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-text transition-transform duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-cream"
            style={{ borderTop: "1px solid rgba(184,149,62,0.16)" }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV.map((link) => {
                if (!link.children) {
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      className={`font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${
                        isActive(link.href) ? "text-gold" : "text-text-soft"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }

                const isMobileOpen = mobileOpenDropdown === link.key;
                const active = isDropdownActive(link.children);

                return (
                  <div key={link.key}>
                    <button
                      onClick={() => setMobileOpenDropdown(isMobileOpen ? null : link.key)}
                      className={`w-full flex items-center justify-between font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${
                        active ? "text-gold" : "text-text-soft"
                      }`}
                    >
                      {link.label}
                      <Caret open={isMobileOpen} />
                    </button>
                    {isMobileOpen && (
                      <div className="pl-4 flex flex-col gap-1 mb-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`font-dmsans text-sm py-1.5 ${
                              pathname.startsWith(child.href) ? "text-gold" : "text-text-soft"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Language switcher in mobile menu */}
              <div className="pt-2 pb-1 border-t border-border mt-2">
                <LanguageSwitcher />
              </div>

              <div className="pt-2 pb-1">
                <Link
                  href="/contact"
                  className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase text-gold border border-gold rounded-full px-5 py-2.5"
                >
                  {t.nav.bookCall}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
