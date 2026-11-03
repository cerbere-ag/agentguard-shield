export const SITE_URL = "https://www.cerbereag.site";
export const APP_URL = "https://app.cerbereag.site";

export const PLANS = [
  { name: "Open Source", price: "0", summary: "Self-hosted, unlimited actions, bring your own LLM, community support on Discord." },
  { name: "Pro", price: "199", summary: "100,000 protected actions per month, 5,000 LLM analyses included, dashboard, signed audit trail, Slack support." },
  { name: "Team", price: "599", summary: "500,000 protected actions per month, 25,000 LLM analyses included, dashboard with 5 seats, signed audit export, priority Slack." },
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cerbere AG",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      description:
        "Runtime security and observability layer for AI agents: every tool call is checked, decided on and audited before it executes.",
      founder: { "@type": "Person", name: "Christopher Dikesa" },
      email: "christopher-ag@cerbereag.site",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "christopher-ag@cerbereag.site",
        telephone: "+243854442103",
      },
      sameAs: [
        "https://github.com/chrismsmr-celcom/cerbere-AG",
        "https://pypi.org/project/cerbere-ag/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cerbere AG",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Cerbere AG",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Web, Linux, macOS, Windows",
      description:
        "Intercepts AI agent tool calls and decides allow, block or human approval, with traces and a signed audit trail. Python SDK (pip install cerbere-ag) and MCP server.",
      url: SITE_URL,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: PLANS.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price,
        priceCurrency: "USD",
        description: p.summary,
        url: `${SITE_URL}/#pricing`,
      })),
    },
  ],
};

// "<" escaped so the JSON can never close the <script> tag
export const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
