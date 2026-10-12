import { Reveal } from "@/components/Reveal";
import { APP } from "@/lib/constants";

const items = [
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

export function Observability() {
  return (
    <section className="bg-amber py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">observability</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Full visibility into every agent decision.
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-base text-coal/70">
            Security means nothing without observability. The dashboard below is one tool in the
            Cerbere package: the SDK and policy engine work standalone too, but this is what you
            get once a collector is running.
          </p>

          <a
            href={APP}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-coal px-4.5 py-2.5 font-mono text-sm text-amber transition-colors hover:bg-coal/85"
          >
            Try the Collector
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-lg border border-line-coal bg-coal shadow-[0_30px_80px_oklch(0.19_0.008_45/0.35)]">
          <img
            src="/collector/collector.png"
            alt="Cerbere AG collector dashboard: service health, request volume, cost and the daily activity heatmap"
            className="w-full"
            loading="lazy"
          />
        </Reveal>

        <div className="mt-12 grid gap-px border border-line-coal bg-line-coal md:grid-cols-3">
          {items.map((item) => (
            <Reveal key={item.tag} className="bg-amber p-8">
              <span className="font-mono text-[12.5px] font-semibold text-coal/60">{item.tag}</span>
              <h3 className="mb-3 mt-3.5 text-xl text-coal">{item.title}</h3>
              <p className="text-[15px] text-coal/75">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
