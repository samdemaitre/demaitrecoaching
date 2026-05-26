"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import type { Translations } from "@/lib/i18n";

type FaqSection = Translations["faqSections"][number];

// Language pills always show coaching languages (not translated — these are proper names)
function LanguagePills() {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {["English", "Dutch"].map((lang) => (
        <span key={lang} className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-gold text-green-dark rounded-full px-3 py-1">
          {lang}
        </span>
      ))}
      {["Spanish", "French", "German"].map((lang) => (
        <span key={lang} className="font-montserrat text-[10px] font-semibold tracking-widest uppercase bg-cream3 text-text-soft rounded-full px-3 py-1">
          {lang}
        </span>
      ))}
    </div>
  );
}

function AccordionItem({
  q, a, langPills, isOpen, onToggle,
}: {
  q: string;
  a: string;
  langPills?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className={`font-cormorant text-lg font-medium leading-snug transition-colors ${isOpen ? "text-gold" : "text-text group-hover:text-text"}`}>
          {q}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 mt-1 text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="font-dmsans text-sm text-text-soft leading-relaxed">{a}</p>
              {langPills && <LanguagePills />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion({ sections: sectionsProp }: { sections?: FaqSection[] }) {
  const { t } = useLanguage();
  const sections = sectionsProp ?? t.faqSections;
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem((prev) => (prev === key ? null : key));

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, si) => (
        <div key={si}>
          <h3 className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            {section.title}
          </h3>
          <div className="bg-cream rounded-xl border border-border px-6">
            {section.items.map((item, ii) => {
              const key = `${si}-${ii}`;
              return (
                <AccordionItem
                  key={key}
                  q={item.q}
                  a={item.a}
                  langPills={"langPills" in item ? (item.langPills as boolean) : false}
                  isOpen={openItem === key}
                  onToggle={() => toggle(key)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
