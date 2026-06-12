"use client";

import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/context";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(t.common.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappCta}
      title={t.common.whatsappCta}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full hover:scale-110 transition-transform duration-200"
      style={{
        background: "#25D366",
        boxShadow: "0 6px 24px rgba(28,24,18,0.25)",
      }}
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="#fff" aria-hidden="true">
        <path d="M16.04 4C9.4 4 4 9.36 4 15.96c0 2.1.56 4.16 1.62 5.98L4 28l6.22-1.6a12.1 12.1 0 0 0 5.8 1.47h.01c6.63 0 12.03-5.36 12.03-11.96A11.87 11.87 0 0 0 16.04 4zm0 21.87h-.01a10.1 10.1 0 0 1-5.12-1.4l-.37-.22-3.69.95.99-3.58-.24-.37a9.87 9.87 0 0 1-1.53-5.29c0-5.47 4.49-9.92 10-9.92a9.9 9.9 0 0 1 9.98 9.93c0 5.47-4.5 9.9-10.01 9.9zm5.49-7.43c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48a9.04 9.04 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.5-.5-.68-.51l-.58-.01c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.22 5.14 4.51.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z" />
      </svg>
    </a>
  );
}
