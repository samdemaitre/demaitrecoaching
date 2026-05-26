import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/context";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "De Maître Coaching | Elite Personal Training Guatemala City",
    template: "%s | De Maître Coaching",
  },
  description:
    "Luxury personal training in Guatemala City. Tailored programmes for driven individuals. In-person, hybrid, and online coaching with Samuel de Maître.",
  keywords: [
    "personal training Guatemala City",
    "luxury fitness coaching",
    "De Maître Coaching",
    "online personal trainer",
    "hybrid coaching Guatemala",
  ],
  openGraph: {
    siteName: "De Maître Coaching",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${dmsans.variable}`}
    >
      <body className="font-dmsans antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
