"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
            <span className="font-cormorant text-gold font-medium text-base leading-none">SM</span>
          </div>
          <span className="font-cormorant text-text font-medium text-lg leading-none">
            De Maître <em className="text-gold not-italic font-medium">Coaching</em>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-montserrat text-xs font-medium tracking-widest uppercase transition-colors ${
                    isActive(link.href)
                      ? "text-gold"
                      : "text-text-soft hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div
                key={link.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                  className={`flex items-center gap-1 font-montserrat text-xs font-medium tracking-widest uppercase transition-colors ${
                    isServicesActive ? "text-gold" : "text-text-soft hover:text-text"
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-cream border border-gold rounded-xl shadow-lg overflow-hidden"
                    >
                      {/* Arrow caret */}
                      <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-l border-t border-gold rotate-45" />
                      <div className="py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex flex-col px-5 py-3 hover:bg-cream2 transition-colors ${
                              pathname === child.href ? "text-gold" : "text-text"
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

        {/* Book a Call CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="font-montserrat text-xs font-semibold tracking-widest uppercase text-gold border border-gold rounded-full px-5 py-2 hover:bg-gold hover:text-cream transition-all duration-200"
          >
            Book a Call
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
            className="md:hidden overflow-hidden bg-cream border-t border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              <Link href="/" className={`font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${isActive("/") ? "text-gold" : "text-text-soft"}`}>Home</Link>
              <Link href="/about" className={`font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${isActive("/about") ? "text-gold" : "text-text-soft"}`}>About</Link>
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className={`flex items-center justify-between font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${isServicesActive ? "text-gold" : "text-text-soft"}`}
              >
                Services
                <svg className={`w-3 h-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-1 mb-1">
                  <Link href="/services/personal-training" className="font-dmsans text-sm text-text-soft py-1.5">Personal Training</Link>
                  <Link href="/services/hybrid-coaching" className="font-dmsans text-sm text-text-soft py-1.5">Hybrid Coaching</Link>
                  <Link href="/services/online-coaching" className="font-dmsans text-sm text-text-soft py-1.5">Online Coaching</Link>
                </div>
              )}
              <Link href="/contact" className={`font-montserrat text-xs font-medium tracking-widest uppercase py-2 ${isActive("/contact") ? "text-gold" : "text-text-soft"}`}>Contact</Link>
              <div className="pt-3 pb-1">
                <Link href="/contact" className="block text-center font-montserrat text-xs font-semibold tracking-widest uppercase text-gold border border-gold rounded-full px-5 py-2.5">
                  Book a Call
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
