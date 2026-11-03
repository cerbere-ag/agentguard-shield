import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * Source: Cerbere AG latency bench, 200 calls/scenario, collector
 * app.cerbereag.site, Python 3.14.2 on Windows. 415/415 events delivered.
 *
 * Competitor figures are the ones each vendor publishes itself. They are
 * NOT measured head to head by us and use different workloads: the chart
 * shows orders of magnitude, not a controlled race.
 * ------------------------------------------------------------------ */

const headline = [
  { label: "p50", value: "0.34" },
  { label: "p95", value: "0.86" },
  { label: "p99", value: "0.96" },
];

const rows = [
  { scenario: "Warm", note: "steady state", n: 200, p50: 0.3376, p95: 0.8575, p99: 0.9597, max: 1.4202 },
  { scenario: "Concurrent", note: "parallel calls", n: 200, p50: 0.3857, p95: 1.0481, p99: 1.2174, max: 1.3088 },
  { scenario: "Stale", note: "expired cache", n: 5, p50: 0.8012, p95: 1.998, p99: 1.998, max: 1.998 },
  { scenario: "Cold start", note: "first call only", n: 10, p50: 269.789, p95: 356.5741, p99: 356.5741, max: 356.5741 },
];

const fmt = (v: number) => (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2));

type Bar = {
  name: string;
  what: string;
  ms: number;
  label: string;
  us: boolean;
  href?: string;
  source?: string;
};

const bars: Bar[] = [
  {
    name: "Cerbere AG",
    what: "decision on the hot path, p99",
    ms: 0.9597,
    label: "0.96 ms",
    us: true,
  },
  {
    name: "Lakera Guard, self-hosted",
    what: "detection call, p95, 1,000 characters",
    ms: 20,
    label: "< 20 ms",
    us: false,
    href: "https://docs.lakera.ai/docs/sizing-guide",
    source: "Lakera sizing guide",
  },
  {
    name: "NVIDIA NeMo Guardrails",
    what: "five guardrails in parallel",
    ms: 500,
    label: "≈ 0.5 s",
    us: false,
    href: "https://developer.nvidia.com/neMo-guardrails",
    source: "NVIDIA",
  },
  {
    name: "Cerbere AG, deep scan",
    what: "regex + ML + LLM arbiter, p50",
    ms: 2352,
    label: "2.4 s",
    us: true,
  },
];

// log scale, 0.1 ms to 10 s
const MIN = Math.log10(0.1);
const SPAN = Math.log10(10000) - MIN;
const pos = (ms: number) => ((Math.log10(ms) - MIN) / SPAN) * 100;
const ticks = [
  { ms: 0.1, t: "0.1 ms" },
  { ms: 1, t: "1 ms" },
  { ms: 10, t: "10 ms" },
  { ms: 100, t: "100 ms" },
  { ms: 1000, t: "1 s" },
  { ms: 10000, t: "10 s" },
];

export function Overhead() {
  return (
    <section id="overhead" className="border-t border-line-black bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">overhead</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Under a millisecond added to each tool call.
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-base text-paper/70">
            A guard that slows agents down is a guard people remove. We measured what Cerbere AG
            adds to an agent’s execution: on the warm path the decision costs less time than a
            single network packet.
          </p>
        </Reveal>

        {/* ---------------------- HEADLINE ---------------------- */}
        <div className="mt-12 grid gap-px border border-line-black bg-line-black sm:grid-cols-3">
          {headline.map(({ label, value }) => (
            <Reveal key={label} className="bg-ink p-7">
              <span className="font-mono text-[12px] font-semibold text-amber">
                {label}, per guarded call
              </span>
              <div className="mt-3 font-display text-[44px] leading-none">
                {value}
                <span className="ml-1.5 text-[20px] text-paper/50">ms</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-4 max-w-[68ch] text-[14px] text-paper/60">
            Put differently: 1,000 guarded tool calls add about a third of a second in total at the
            median. Under concurrent load p99 stays near 1.2 ms. 415 of 415 events were delivered
            to the collector, none failed or dropped.
          </p>
        </Reveal>

        {/* --------------------- COMPARISON --------------------- */}
        <Reveal className="mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl">Where that sits</h3>
            <span className="font-mono text-[12px] text-paper/50">log scale</span>
          </div>
          <p className="mt-2 max-w-[64ch] text-[14.5px] text-paper/65">
            Published latency of other guardrail tools, next to ours. Heavy guards call a model or a
            remote service on every check, and that is where the seconds come from.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="space-y-6">
            {bars.map((b) => (
              <div key={b.name} className="grid items-center gap-x-6 gap-y-2 md:grid-cols-[250px_1fr_80px]">
                <div>
                  <div className={b.us ? "font-medium text-amber" : "font-medium"}>{b.name}</div>
                  <div className="font-mono text-[11.5px] text-paper/50">
                    {b.what}
                    {b.href && (
                      <>
                        {" · "}
                        <a href={b.href} target="_blank" rel="noreferrer" className="underline hover:text-amber">
                          {b.source}
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="relative h-2 bg-line-black">
                  <div
                    className={b.us ? "h-full bg-amber" : "h-full bg-paper/35"}
                    style={{ width: `${pos(b.ms)}%` }}
                  />
                </div>
                <div className="font-mono text-[15px] font-semibold md:text-right">{b.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 hidden md:grid md:grid-cols-[250px_1fr_80px] md:gap-x-6">
            <span />
            <div className="relative h-4 font-mono text-[10.5px] text-paper/40">
              {ticks.map(({ ms, t }) => (
                <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pos(ms)}%` }}>
                  {t}
                </span>
              ))}
            </div>
            <span />
          </div>

          <p className="mt-6 max-w-[72ch] text-[13px] text-paper/55">
            Read this as orders of magnitude, not a controlled race. The competitor figures come
            from each vendor’s own documentation, with different hardware, payloads and workloads,
            and we have not run them side by side. A hosted API also adds a network round trip that
            a self-hosted number leaves out. Our deep scan row is shown because the ML and LLM
            layers cost real time, and it was measured over a slow connection from Kinshasa.
          </p>
        </Reveal>

        {/* ---------------------- SCENARIOS ---------------------- */}
        <Reveal className="mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl">Every scenario we measured</h3>
            <span className="font-mono text-[12px] text-paper/50">200 calls per scenario</span>
          </div>
        </Reveal>

        <Reveal className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line-black font-mono text-[11.5px] uppercase tracking-wider text-paper/45">
                <th className="py-2.5 pr-4 font-medium">Scenario</th>
                <th className="py-2.5 pr-4 text-right font-medium">n</th>
                <th className="py-2.5 pr-4 text-right font-medium">p50</th>
                <th className="py-2.5 pr-4 text-right font-medium">p95</th>
                <th className="py-2.5 pr-4 text-right font-medium">p99</th>
                <th className="py-2.5 text-right font-medium">max</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {rows.map((r) => (
                <tr key={r.scenario} className="border-b border-line-black/70">
                  <td className="py-3 pr-4 font-sans">
                    <span className="font-medium">{r.scenario}</span>
                    <span className="ml-2 text-[12px] text-paper/45">{r.note}</span>
                  </td>
                  <td className="py-3 pr-4 text-right text-paper/55">{r.n}</td>
                  <td className="py-3 pr-4 text-right">{fmt(r.p50)} ms</td>
                  <td className="py-3 pr-4 text-right">{fmt(r.p95)} ms</td>
                  <td className="py-3 pr-4 text-right">{fmt(r.p99)} ms</td>
                  <td className="py-3 text-right text-paper/55">{fmt(r.max)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 max-w-[68ch] text-[13.5px] text-paper/60">
            The cold start of about 270 ms happens once, when the SDK fetches its first decision.
            After that the warm path stays under a millisecond at p99.
          </p>
          <a
            href="https://github.com/chrismsmr-celcom/agentguard"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-amber transition-colors hover:text-paper"
          >
            Run the bench yourself
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
