"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Marketing chrome (nav / footer / WhatsApp) wraps the whole site, except
// client-facing weekly-review links, which render bare for a focused experience.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare =
    pathname?.startsWith("/review") ||
    pathname?.startsWith("/check-in") ||
    pathname?.startsWith("/admin");

  if (bare) return <main>{children}</main>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
