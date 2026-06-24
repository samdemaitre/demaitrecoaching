import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
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
  metadataBase: new URL("https://demaitrecoaching.com"),
  title: {
    default: "De Maître Coaching | Entrenamiento Personal en Ciudad de Guatemala",
    template: "%s | De Maître Coaching",
  },
  description:
    "Entrenamiento personal a medida en Ciudad de Guatemala y coaching online en todo el mundo. Programas presenciales, híbridos y online con Sam de Maître — más de 12 años de experiencia.",
  keywords: [
    "entrenador personal Ciudad de Guatemala",
    "entrenamiento personal Guatemala",
    "coaching online fitness",
    "De Maître Coaching",
    "personal trainer Guatemala City",
    "hybrid coaching Guatemala",
  ],
  openGraph: {
    siteName: "De Maître Coaching",
    title: "De Maître Coaching | Entrenamiento Personal en Ciudad de Guatemala",
    description:
      "Entrenamiento personal a medida en Ciudad de Guatemala y coaching online en todo el mundo. Más de 12 años de experiencia.",
    locale: "es_GT",
    alternateLocale: ["en_US", "nl_BE", "fr_BE", "de_DE"],
    type: "website",
    images: [
      {
        url: "/images/hero-sam.jpg",
        width: 1800,
        height: 1440,
        alt: "Sam de Maître — Entrenador Personal en Ciudad de Guatemala",
      },
    ],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "De Maître Coaching",
  description:
    "Entrenamiento personal a medida en Ciudad de Guatemala y coaching online en todo el mundo.",
  url: "https://demaitrecoaching.com",
  image: "https://demaitrecoaching.com/images/hero-sam.jpg",
  email: "sam@demaitrecoaching.com",
  telephone: "+50230502334",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de Guatemala",
    addressCountry: "GT",
  },
  founder: {
    "@type": "Person",
    name: "Samuel de Maître",
  },
  sameAs: ["https://instagram.com/demaitrecoaching"],
  priceRange: "Q350 - Q1,950",
  areaServed: ["Ciudad de Guatemala", "Worldwide (online)"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} ${dmsans.variable}`}
    >
      <body className="font-dmsans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
