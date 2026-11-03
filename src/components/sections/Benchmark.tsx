import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * Source of truth: cerbere-ag-public-benchmark v1.0.0 (SDK 0.6.1)
 * cerbere-ag-corpus-2k · 1000 attacks · 703 benign · 300 hard negatives
 * ------------------------------------------------------------------ */

const detectionRows = [
  {
    corpus: "Internal corpus 2k",
    config: "Regex + ML + LLM",
    n: "1000 attacks · 703 benign · 300 hard neg.",
    recall: 100.0,
    ci: "99.6 – 100",
    fpr: "0%",
    hn: "0%",
    latency: "362 ms",
    current: true,
  },
  {
    corpus: "Internal corpus (previous run)",
    config: "Regex only",
    n: "300 attacks",
    recall: 44.0,
    ci: "38.5 – 49.7",
    fpr: "0%",
    hn: "2.7%",
    latency: "0.5 ms",
    current: false,
  },
  {
    corpus: "Internal corpus (previous run)",
    config: "Regex + ML + LLM",
    n: "500 attacks",
    recall: 99.4,
    ci: "98.3 – 99.8",
    fpr: "0%",
    hn: "2.7%",
    latency: "2.4 s",
    current: false,
  },
  {
    corpus: "External (deepset)",
    config: "Regex + ML",
    n: "60 attacks",
    recall: 35.0,
    ci: "24.2 – 47.6",
    fpr: "0%",
    hn: "n/a",
    latency: "0.3 s",
    current: false,
  },
  {
    corpus: "External (deepset)",
    config: "Regex + ML + LLM",
    n: "60 attacks",
    recall: 21.7,
    ci: "13.1 – 33.6",
    fpr: "0%",
    hn: "n/a",
    latency: "0.2 s",
    current: false,
  },
];

export function Benchmark() {
  return (
    <section id="benchmark" className="border-t border-line-black bg-cream py-20 text-coal md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">benchmark</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            What we catch, and what we miss.
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-base text-coal/70">
            Detection quality measured on our own 2k corpus and on a frozen third-party set. We
            publish the numbers where we fall short.
          </p>
        </Reveal>

        {/* ------------------------ DETECTION ------------------------ */}
        <Reveal className="mt-14">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl">Detection quality</h3>
            <span className="font-mono text-[12px] text-coal/55">recall with 95% CI</span>
          </div>
          <p className="mt-2 max-w-[64ch] text-[14.5px] text-coal/70">
            The current run uses our 2,000-prompt corpus (1,000 attacks, 703 benign, 300 hard
            negatives). Our corpus is synthetic and templated, so it flatters us. The external
            rows use a frozen third-party set we did not write, and they are the numbers to trust.
          </p>
        </Reveal>

        <Reveal className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-line-cream font-mono text-[11.5px] uppercase tracking-wider text-coal/50">
                <th className="py-2.5 pr-4 font-medium">Corpus</th>
                <th className="py-2.5 pr-4 font-medium">Layers</th>
                <th className="w-[26%] py-2.5 pr-4 font-medium">Recall</th>
                <th className="py-2.5 pr-4 text-right font-medium">FPR benign</th>
                <th className="py-2.5 pr-4 text-right font-medium">FPR hard neg.</th>
                <th className="py-2.5 text-right font-medium">p50</th>
              </tr>
            </thead>
            <tbody>
              {detectionRows.map((r, i) => {
                const external = r.corpus.startsWith("External");
                return (
                  <tr
                    key={i}
                    className={`border-b border-line-cream/70 align-middle ${r.current ? "bg-amber-deep/5" : "opacity-75"}`}
                  >
                    <td className="py-3.5 pr-4">
                      <div className="font-medium">
                        {r.corpus}
                        {r.current && (
                          <span className="ml-2 rounded-sm bg-amber-deep px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cream">
                            current
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[12px] text-coal/55">
                        {r.n}
                        {!r.current && " · SDK 0.5.0"}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[13px]">{r.config}</td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 bg-line-cream">
                          <div
                            className={external ? "h-full bg-amber-deep" : "h-full bg-coal/70"}
                            style={{ width: `${r.recall}%` }}
                          />
                        </div>
                        <span className="w-[52px] text-right font-mono text-[14px] font-semibold">
                          {r.recall.toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-1 text-right font-mono text-[11px] text-coal/50">
                        CI {r.ci}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-right font-mono">{r.fpr}</td>
                    <td className="py-3.5 pr-4 text-right font-mono">{r.hn}</td>
                    <td className="py-3.5 text-right font-mono">{r.latency}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        <div className="mt-8 grid gap-px border border-line-cream bg-line-cream md:grid-cols-3">
          {[
            {
              t: "What we catch",
              d: "On the 2k corpus, the full stack (Regex + ML + LLM arbiter) catches 100% of attacks (CI 99.6–100) across all seven categories — including encoded payloads, indirect injection and system extraction — with zero false positives on 703 benign prompts and 300 hard negatives.",
            },
            {
              t: "What we miss",
              d: "Nothing on this run: no attack slipped through, no benign prompt blocked, no hard negative flagged. Our corpus is synthetic, so the honest caveat remains: on the external deepset corpus, recall is far lower and labels are noisy.",
            },
            {
              t: "What we found",
              d: "The LLM arbiter matters. Earlier, without it, ML alone blocked 2.3% of benign prompts (French technical summaries, fiction about intrusions) at up to 100% confidence. With the arbiter active, those blocks vanish — at the cost of a p50 latency of 362 ms, up from 221 ms.",
            },
          ].map(({ t, d }) => (
            <Reveal key={t} className="bg-cream p-6">
              <span className="font-mono text-[12px] font-semibold text-amber-deep">{t}</span>
              <p className="mt-2.5 text-[14px] text-coal/70">{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href="/blog/detecting-prompt-injection-in-production"
            className="inline-flex items-center gap-2 font-mono text-sm text-amber-deep transition-colors hover:text-coal"
          >
            Read the full benchmark write-up
            <span aria-hidden>→</span>
          </a>
          <span className="font-mono text-[12px] text-coal/50">
            cerbere-ag-public-benchmark v1.0.0 · SDK 0.6.1 · cerbere-ag-corpus-2k ·
            deepset/prompt-injections (test split, SDK 0.5.0)
          </span>
        </Reveal>
      </div>
    </section>
  );
}
