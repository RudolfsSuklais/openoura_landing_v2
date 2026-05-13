import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { MetaPixel } from "@/components/MetaPixel";
import { MetaPixelPageView } from "@/components/analytics/MetaPixelPageView";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/JsonLd";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
  adjustFontFallback: false,
});

const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openoura.com"),
  title: {
    default: "OpenOura — Ražošanas pārvaldības programma",
    template: "%s | OpenOura",
  },
  description:
    "Vienkārša ražošanas vadība Latvijas mazajiem ražotājiem. Bez ieviešanas projekta, bez konsultantu rēķiniem. Sākot no €69/mēnesī.",
  keywords: [
    "ražošanas vadība",
    "ražošanas programmatūra",
    "ražošanas pārvaldība",
    "mini ERP",
    "ERP Latvijā",
    "Latvijas ražotājiem",
    "Forma 2",
    "pavadzīmju AI parsēšana",
  ],
  authors: [{ name: "Rudolfs Šuklais" }],
  creator: "OpenOura",
  publisher: "OpenOura",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/openoura_logo.png",
    shortcut: "/openoura_logo.png",
    apple: "/openoura_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "lv_LV",
    url: "https://openoura.com",
    siteName: "OpenOura",
    title: "OpenOura — Excel ir tavs sliktākais darbinieks",
    description:
      "Vienkārša ražošanas vadība Latvijas mazajiem ražotājiem. Sākot no €69/mēnesī.",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "OpenOura — Ražošanas pārvaldības programma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenOura — Excel ir tavs sliktākais darbinieks",
    description:
      "Vienkārša ražošanas vadība Latvijas mazajiem ražotājiem. Sākot no €69/mēnesī.",
    images: ["/og-card.png"],
    creator: "@rudolfs_lv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...(process.env.META_DOMAIN_VERIFICATION
    ? {
        verification: {
          other: {
            "facebook-domain-verification": [
              process.env.META_DOMAIN_VERIFICATION,
            ],
          },
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lv" className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Pāriet uz saturu
        </a>
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <MetaPixel />
        <MetaPixelPageView />
        <PostHogProvider>
          <PageViewTracker />
          {children}
        </PostHogProvider>
        <WhatsAppButton />
        <StickyMobileCTA />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
