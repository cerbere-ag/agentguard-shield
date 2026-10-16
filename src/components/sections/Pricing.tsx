import { Reveal } from "@/components/Reveal";
import { APP } from "@/lib/constants";

const plans = [
  {
    name: "Free",
    tag: "Get to know Cerbere AG",
    price: "0",
    per: "",
    featured: false,
    features: [
      "2 connected agents",
      "Local deployment only",
      "Prompt injection and exfiltration checks",
      "7 day audit trail",
      "Community support",
    ],
    cta: { label: "Start free", href: APP + "/login" },
  },
  {
    name: "Pro",
    tag: "For a small production fleet",
    price: "49",
    per: "/mo",
    featured: true,
    features: [
      "5 connected agents",
      "Local or cloud deployment",
      "Real time Gmail and Slack alerts",
      "90 day audit trail",
      "Signed security decisions",
      "Email support",
    ],
    cta: { label: "Start with Pro", href: APP + "/login" },
  },
  {
    name: "Team",
    tag: "For multiple teams and agents",
    price: "199",
    per: "/mo",
    featured: false,
    features: [
      "10+ connected agents",
      "Local and cloud, mixed",
      "Custom policies per agent",
      "Unlimited audit trail",
      "SSO and role based access",
      "Priority support",
    ],
    cta: {
      label: "Talk to sales",
      href: "mailto:christopher-ag@cerbereag.site?subject=Team%20plan",
    },
  },
  {
    name: "Enterprise",
    tag: "High volume, self hosted",
    price: "Custom",
    per: "",
    featured: false,
    features: [
      "Unlimited agents",
      "Self hosted, your data residency",
      "SLA and support contract",
      "Custom retention and policies",
      "Compliance packages",
      "Dedicated ops channel",
    ],
    cta: {
      label: "Talk to sales",
      href: "mailto:christopher-ag@cerbereag.site?subject=Enterprise",
    },
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-ink py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">pricing</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Start free. Grow into your agent fleet.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-black bg-line-black sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <Reveal
              key={p.name}
              className={[
                "flex",
                "flex-col",
                "p-7",
                p.featured ? "border-t-2 border-amber bg-[oklch(0.17_0.004_60)]" : "bg-ink",
              ].join(" ")}
            >
              <div className="font-mono text-sm font-semibold">{p.name}</div>
              <div className="mt-1.5 min-h-8 text-[12.5px] text-paper/45">{p.tag}</div>

              <div className="mt-5 font-display text-[34px]">
                {p.price === "Custom" ? (
                  <span className="text-2xl">Custom</span>
                ) : (
                  <>
                    <sup className="mr-0.5 text-[15px] font-medium opacity-60">$</sup>
                    {p.price}
                    {p.per && (
                      <span className="font-mono text-[13px] font-normal text-paper/45">
                        {p.per}
                      </span>
                    )}
                  </>
                )}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {p.features.map((f) => (
                  <li key={f} className="relative pl-4 text-[13.5px] text-paper/75">
                    <span className="absolute left-0 font-bold text-amber">·</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.cta.href}
                className={[
                  "mt-6",
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "rounded-sm",
                  "px-4",
                  "py-2.5",
                  "font-mono",
                  "text-sm",
                  "transition-colors",
                  p.featured
                    ? "bg-brand text-ink hover:brightness-110"
                    : "border border-line-black hover:border-amber hover:text-amber",
                ].join(" ")}
              >
                {p.cta.label}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

