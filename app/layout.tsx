import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { MetaPixel } from "@/components/MetaPixel";
import { MetaPixelPageView } from "@/components/analytics/MetaPixelPageView";
import { OrganizationSchema, SoftwareApplicationSchema } from "@/components/JsonLd";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: false,
});

// Runs before paint to avoid a light→dark flash on reload. Honours a
// ?theme=light|dark override (handy for deep-linking / QA).
const THEME_INIT = `(function(){try{var u=new URLSearchParams(location.search).get('theme');var s=localStorage.getItem('oo-theme');var sys=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=(u==='dark'||u==='light')?u:(s||sys);document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://openoura.com"),
  title: {
    default: "OpenOura · Ražošanas pārvaldības programma",
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
    title: "OpenOura · Visa tava ražotne vienā ekrānā",
    description:
      "Vienkārša ražošanas vadība Latvijas mazajiem ražotājiem. Sākot no €69/mēnesī.",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: "OpenOura · Ražošanas pārvaldības programma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenOura · Visa tava ražotne vienā ekrānā",
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
    <html
      lang="lv"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <a href="#top" className="skip-link">
          Pāriet uz saturu
        </a>
        <div className="progress-bar" id="progress" />
        <div className="noise" aria-hidden />
        <OrganizationSchema />
        <SoftwareApplicationSchema />
        <MetaPixel />
        <MetaPixelPageView />
        <PostHogProvider>
          <PageViewTracker />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
