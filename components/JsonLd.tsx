import Script from "next/script";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OpenOura",
    url: "https://openoura.com",
    logo: "https://openoura.com/openoura_logo.png",
    email: "rudolfs@openoura.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liepāja",
      addressCountry: "LV",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "rudolfs@openoura.com",
      contactType: "sales",
      availableLanguage: ["Latvian", "English"],
    },
  };
  return (
    <Script
      id="org-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OpenOura",
    description:
      "Ražošanas pārvaldības programma Latvijas mazajiem ražotājiem. Vienkārša ražošanas vadība bez ieviešanas projekta.",
    url: "https://openoura.com",
    image: "https://openoura.com/og-card.png",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "69",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "69",
        priceCurrency: "EUR",
        unitText: "MONTH",
      },
    },
    softwareVersion: "1.0",
    inLanguage: "lv-LV",
  };
  return (
    <Script
      id="software-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
