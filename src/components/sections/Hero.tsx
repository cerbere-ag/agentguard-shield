import { Reveal } from "@/components/Reveal";
import { CopyableCode } from "@/components/CopyableCode";
import { APP, DOCS, GITHUB, MCP_INSTALL_CMD } from "@/lib/constants";

// Preuves vérifiables uniquement. Remplacer ou compléter par des chiffres réels
// (pilotes, essais en cours, intégrations) dès qu'ils existent.
const proof = [
  { k: "Open source", v: "SDK under Apache 2.0" },
  { k: "Published", v: "pip install cerbere-ag" },
  { k: "Tested", v: "500+ automated tests" },
  { k: "Verifiable", v: "Ed25519-signed decisions" },
];

export function Hero() {
  return (
    <section className="hero-grain relative isolate overflow-hidden">
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[-140px] -z-10 h-[640px] w-[min(1100px,130vw)] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(217 164 65 / 0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="wrap pt-28 text-center md:pt-36">
        <Reveal>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-full border border-line-black bg-black/30 px-4 py-1.5 font-mono text-[12.5px] text-paper/75 transition-colors hover:border-amber hover:text-amber"
          >
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            Open-source SDK, live on PyPI
            <span aria-hidden="true">→</span>
          </a>

          <h1 className="mx-auto mt-8 max-w-[19ch] text-[clamp(42px,7vw,92px)] leading-[1.03] tracking-tight">
            Give your agents autonomy,{" "}
            <span className="text-brand">without giving up control.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-[62ch] text-[clamp(17px,1.5vw,20px)] text-paper/70">
            Cerbere AG is the runtime security and observability layer for AI agents. Before every
            tool call runs, it decides whether the action is allowed, needs a human, or is
            blocked, and it records every decision.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={APP + "/login"}
              className="inline-flex items-center rounded-sm bg-brand px-6 py-3 font-mono text-sm text-ink transition hover:brightness-110"
            >
              Get started free
            </a>
           <a
  href={GITHUB}
  target="_blank"
  rel="noopener"
  className="inline-flex items-center rounded-sm border border-line-black px-6 py-3 font-mono text-sm transition-colors hover:border-brand hover:text-brand"
>
  View on GitHub
</a>
<a
  href={DOCS}
  className="inline-flex items-center gap-2 px-3 py-3 font-mono text-sm text-paper/70 transition-colors hover:text-brand"
>
  Read the docs <span aria-hidden="true">→</span>
</a>
</div>

<div className="mx-auto mt-9 grid max-w-3xl gap-3.5 text-left md:grid-cols-2">
<div>
  <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-paper/40">
    Python SDK
  </span>
  <CopyableCode code="pip install cerbere-ag" />
</div>
<div>
  <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-paper/40">
    MCP · Claude Code, Cursor and others
  </span>
  <CopyableCode code={MCP_INSTALL_CMD} />
</div>
          </div>
        </Reveal>

        <Reveal className="relative mx-auto mt-16 max-w-[1120px] text-left">
          <div
            className="absolute -inset-x-8 -top-8 -z-10 h-full rounded-[32px] bg-amber/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative max-h-[380px] overflow-hidden rounded-xl border border-line-black bg-coal shadow-[0_40px_120px_rgb(0_0_0/0.65)] md:max-h-[640px]">
            <div className="flex items-center gap-2 border-b border-line-black px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="size-2.5 rounded-full bg-paper/20" />
              <span className="mx-auto rounded-sm bg-black/40 px-4 py-0.5 font-mono text-[11.5px] text-paper/45">
                app.cerbereag.site
              </span>
            </div>
            <img
              src="/product/dashboard-overview.webp"
              width={1800}
              height={1125}
              alt="Cerbere AG dashboard: decisions per minute, blocked rate, cost, the latest allowed and blocked agent actions, and top threats"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-[240%] max-w-none -translate-x-[16%] md:w-full md:translate-x-0"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent"
              aria-hidden="true"
            />
          </div>
        </Reveal>
      </div>

      <div className="wrap relative z-10 pb-20 pt-2 md:pb-24">
        <dl className="grid grid-cols-2 gap-px border border-line-black bg-line-black md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.k} className="bg-ink px-5 py-4 text-left">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-paper/40">{p.k}</dt>
              <dd className="mt-1 text-[15px] text-paper">{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

