// src/lib/schema.ts
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cerbere AG",
  url: "https://app.cerbereag.site",
  logo: "https://app.cerbereag.site/logo.png",
  description: "Runtime security and observability for autonomous AI agents.",
  founder: { "@type": "Person", name: "Christopher Dikesa" },
  sameAs: [
    "https://github.com/cerbere-ag",
    // + LinkedIn, X, etc.
  ],
};

export const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cerbere AG",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, // adapte à ton pricing
};
