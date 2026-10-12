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
    <section className="hero-grain wrap relative isolate grid items-center gap-14 py-20 md:py-24 lg:grid-cols-[1.15fr_.85fr]">
      {/* halo animé derrière le contenu */}
      <div
        className="hero-glow pointer-events-none absolute -top-40 left-1/2 -z-10 size-[560px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(217 164 65 / 0.25), transparent)" }}
        aria-hidden="true"
      />

      <div>
        <Reveal>
          <span className="eyebrow">security &amp; observability layer</span>

          {/* Titre plus grand : clamp(42px, 6.4vw, 84px) */}
          <h1 className="mt-4 text-[clamp(42px,6.4vw,84px)] leading-[1.04]">
            <span className="block">Cerbere AG</span>

            <span className="relative mt-1 block min-h-[1.2em] text-amber">
              {rotating.map((line, i) => (
                <span
                  key={line}
                  className={[
                    "transition-all duration-500",
                    i === rot
                      ? "relative block translate-y-0 opacity-100"
                      : "absolute left-0 top-0 block w-full translate-y-3 opacity-0",
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
            Security and observability layer to control your AI agents in real time. It is the
            agentic era. Stay in control.
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
