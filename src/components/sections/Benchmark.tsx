import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * Source of truth: cerbere-ag-public-benchmark v1.0.0 (SDK 0.5.0)
 * ------------------------------------------------------------------ */

const detectionRows = [
  {
    corpus: "Internal corpus",
    config: "Regex only",
    n: "300 attacks",
    recall: 44.0,
    ci: "38.5 – 49.7",
    fpr: "0%",
    hn: "2.7%",
    latency: "0.5 ms",
  },
  {
    corpus: "Internal corpus",
    config: "Regex + ML + LLM",
    n: "500 attacks",
    recall: 99.4,
    ci: "98.3 – 99.8",
    fpr: "0%",
    hn: "2.7%",
    latency: "2.4 s",
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
            Detection quality measured on our own corpus and on a frozen third-party set. We
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
            Our own corpus is synthetic and templated, so it flatters us. The external run uses a
            frozen third-party set we did not write, and it is the number to trust.
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
                  <tr key={i} className="border-b border-line-cream/70 align-middle">
                    <td className="py-3.5 pr-4">
                      <div className="font-medium">{r.corpus}</div>
                      <div className="font-mono text-[12px] text-coal/55">{r.n}</div>
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
              d: "Classic direct injections, exfiltration and system prompt extraction: 99.4% on our corpus, 0% false positives on benign traffic.",
            },
            {
              t: "What we miss",
              d: "On the external set many misses are role-play framing, embedded instructions in German and Spanish, and prompts labelled as attacks that look benign. Labels there are noisy.",
            },
            {
              t: "What we found",
              d: "Adding an LLM arbiter lowered external recall from 35% to 21.7%: it cleared 8 real attacks as safe and never cleared a benign prompt, so it only cost us recall. We are reworking that layer.",
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
            cerbere-ag-public-benchmark v1.0.0 · SDK 0.5.0 · deepset/prompt-injections (test split)
          </span>
        </Reveal>
      </div>
    </section>
  );
}
