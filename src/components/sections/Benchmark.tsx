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
