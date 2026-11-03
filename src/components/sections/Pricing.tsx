import { Reveal } from "@/components/Reveal";
import { APP, GITHUB } from "@/lib/constants";

type Plan = {
  name: string;
  tag: string;
  price: string;
  per: string;
  from?: string;
  badge?: string;
  featured: boolean;
  features: string[];
  cta: { label: string; href: string };
};

const plans: Plan[] = [
  {
    name: "Open Source",
    tag: "Devs and hackers",
    price: "0",
    per: "",
    featured: false,
    features: [
      "Self-hosted, unlimited actions",
      "Bring your own LLM",
      "Install in minutes",
      "Community support on Discord",
    ],
    cta: { label: "Star on GitHub / Self-host", href: GITHUB },
  },
  {
    name: "Pro",
    tag: "1 to 2 agents in production",
    price: "199",
    per: "/mo",
    featured: false,
    features: [
      "100,000 protected actions",
      "5,000 LLM analyses included",
      "Dashboard and signed audit trail",
      "Slack support, 24h response",
    ],
    cta: { label: "Start protecting · $199/mo", href: APP + "/login" },
  },
  {
    name: "Team",
    tag: "Startups that scale",
    price: "599",
    per: "/mo",
    badge: "Most popular",
    featured: true,
    features: [
      "500,000 protected actions",
      "25,000 LLM analyses included",
      "Dashboard with 5 seats",
      "Signed audit export, priority Slack",
    ],
    cta: { label: "Most popular · Start Team", href: APP + "/login" },
  },
  {
    name: "Enterprise",
    tag: "Banks, EU AI Act",
    price: "Custom",
    per: "",
    from: "From $2,500/mo",
    featured: false,
    features: [
      "5M+ actions, fair use",
      "Unlimited LLM analyses, on-prem option",
      "SSO, 1-year audit retention",
      "Air-gapped option, SLA, on-call",
    ],
    cta: {
      label: "Talk to us for EU compliance",
      href: "mailto:christopher-ag@cerbereag.site?subject=Enterprise",
    },
  },
];

// Comparison table: one row per line, one value per plan, same order as `plans`.
const compare: { label: string; values: string[] }[] = [
  { label: "Price", values: ["$0", "$199/mo", "$599/mo", "From $2,500/mo"] },
  { label: "Best for", values: ["Devs and hackers", "1 to 2 agents in production", "Startups that scale", "Banks, EU AI Act"] },
  { label: "Protected actions / month", values: ["Unlimited, self-hosted", "100,000 included", "500,000 included", "5M+, fair use"] },
  { label: "LLM analyses included", values: ["Your own LLM", "5,000", "25,000", "Unlimited, on-prem option"] },
  { label: "Warm-path latency", values: ["0.34 ms p50", "0.34 ms p50", "0.34 ms p50", "0.34 ms p50"] },
  { label: "Dashboard", values: ["Not included", "Included", "Included, 5 seats", "Included, SSO, 1-year audit"] },
  { label: "Signed audit trail", values: ["DIY", "Included, supports EU AI Act Art. 12 logging", "Included, signed export", "Included, air-gapped option, SLA"] },
  { label: "Overage", values: ["—", "$0.02 per extra LLM analysis, $0.50 per 1,000 extra actions", "$0.02 per extra LLM analysis, $0.50 per 1,000 extra actions", "Custom"] },
  { label: "Support", values: ["Discord", "Slack, 24h response", "Priority Slack", "Slack and on-call"] },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-ink py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">pricing</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Pricing built for agents that don’t sleep.
          </h2>
          <p className="mt-3.5 max-w-[58ch] text-base text-paper/70">
            Cerbere AG decides on the warm path in under a millisecond, without calling an LLM.
            The LLM arbiter only steps in on ambiguous cases. You pay for protected actions, with
            an LLM quota included, not for every model call.
          </p>
        </Reveal>

        {/* ----------------------- CARDS ----------------------- */}
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
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-sm font-semibold">{p.name}</div>
                {p.badge && (
                  <span className="rounded-sm bg-amber/15 px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wide text-amber">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-1.5 min-h-8 text-[12.5px] text-paper/45">{p.tag}</div>

              <div className="mt-5 font-display text-[34px]">
                {p.price === "Custom" ? (
                  <>
                    <span className="text-2xl">Custom</span>
                    {p.from && (
                      <div className="mt-1 font-mono text-[13px] font-normal text-paper/55">
                        {p.from}
                      </div>
                    )}
                  </>
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
                {...(p.cta.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className={[
                  "mt-6",
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "rounded-sm",
                  "px-4",
                  "py-2.5",
                  "text-center",
                  "font-mono",
                  "text-[13px]",
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

        <Reveal>
          <p className="mt-3 text-right font-mono text-[11.5px] text-paper/45">
            Billed monthly. Prices in USD.
          </p>
        </Reveal>

        {/* ----------------------- TABLE ----------------------- */}
        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line-black font-mono text-[11.5px] uppercase tracking-wider text-paper/45">
                <th className="w-[17%] py-3 pr-4 font-medium" />
                {plans.map((p) => (
                  <th
                    key={p.name}
                    className={[
                      "py-3 pr-4 font-semibold",
                      p.featured ? "text-amber" : "text-paper/80",
                    ].join(" ")}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.label} className="border-b border-line-black/70 align-top">
                  <td className="py-3 pr-4 font-mono text-[12px] text-paper/50">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={[
                        "py-3 pr-4",
                        row.label === "Price" ? "font-display text-[15px] font-medium" : "text-paper/75",
                      ].join(" ")}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-[78ch] border-l-2 border-amber pl-4 text-[14px] text-paper/70">
            No per-seat surprise. One workspace, unlimited agents. Every plan includes an LLM
            quota because the LLM only arbitrates ambiguous cases. If an agent loops past 10,000
            actions an hour, we throttle it and alert you, so a runaway agent can’t run up your
            bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
