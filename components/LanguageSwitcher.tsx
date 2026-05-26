"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { LANGUAGE_LABELS, LANGUAGE_FLAGS, type Language } from "@/lib/i18n";

const LANGUAGES = Object.keys(LANGUAGE_LABELS) as Language[];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        className="flex items-center gap-1.5 font-montserrat text-[11px] font-semibold tracking-widest uppercase text-text-soft hover:text-text transition-colors px-2 py-1 rounded"
      >
        {/* Globe icon */}
        <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{lang.toUpperCase()}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-cream rounded-xl shadow-lg border border-border py-1 z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left font-dmsans text-sm transition-colors
                ${l === lang ? "text-gold bg-cream2" : "text-text-soft hover:text-text hover:bg-cream2"}`}
            >
              <span className="text-base leading-none">{LANGUAGE_FLAGS[l]}</span>
              <span>{LANGUAGE_LABELS[l]}</span>
              {l === lang && (
                <svg className="w-3 h-3 ml-auto text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
