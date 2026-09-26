import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Terminal, type Line } from "@/components/Terminal";
import logo from "@/assets/cerbere-logo.jpeg";

export const Route = createFileRoute("/blog/detecting-prompt-injection-in-production")({
  head: () => ({
    meta: [
      {
        title:
          "Detecting prompt injection in production: our first public benchmark | Cerbere AG",
      },
      {
        name: "description",
        content:
          "91.5% recall at sub-millisecond latency from regex alone, 98.1% with a ML layer added — and the false positives that come with it. Full methodology, mapped to the OWASP Top 10 for LLM Applications.",
      },
      {
        property: "og:title",
        content: "Detecting prompt injection in production: our first public benchmark",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://www.cerbereag.site/blog/detecting-prompt-injection-in-production",
      },
      {
        property: "og:image",
        content: "https://www.cerbereag.site/og/detecting-prompt-injection.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Detecting prompt injection in production",
      },
      {
        name: "twitter:description",
        content:
          "91.5% recall at sub-ms latency from regex alone, 98.1% with ML added — full benchmark mapped to the OWASP Top 10 for LLM Applications.",
      },
      {
        name: "twitter:image",
        content: "https://www.cerbereag.site/og/detecting-prompt-injection.png",
      },
    ],
  }),
  component: Post,
});

const GITHUB = "https://github.com/chrismsmr-celcom/agentguard";
const APP = "https://app.cerbereag.site";

const dim = "text-paper/40";
const allow = "text-allow";
const deny = "text-deny";
const amb = "text-amber";

const benchLines: Line[] = [
  [{ t: "$ python benchmarks/run_public_benchmark.py --all-layers" }],
  [],
  [{ t: "=== Layers: regex ===", c: amb }],
  [{ t: "Recall (attacks):      91.5%" }],
  [{ t: "  - dangerous_commands           12/12", c: dim }],
  [{ t: "  - direct_injection             24/27", c: dim }],
  [{ t: "  - encoded_obfuscated           7/10", c: dim }],
  [{ t: "  - exfiltration                 15/15", c: dim }],
  [{ t: "  - indirect_injection           10/10", c: dim }],
  [{ t: "  - jailbreak                    16/18", c: dim }],
  [{ t: "  - system_extraction            13/14", c: dim }],
  [{ t: "FPR (benign):          " }, { t: "0.00%", c: allow }],
  [{ t: "FPR (hard negatives): " }, { t: "0.00%", c: allow }],
  [{ t: "Latency p50/p95/p99:   0.29 / 1.48 / 4.61 ms" }],
  [],
  [{ t: "=== Layers: regex,ml ===", c: amb }],
  [{ t: "Recall (attacks):      98.1%" }],
  [{ t: "FPR (benign):          " }, { t: "5.00%", c: deny }],
  [{ t: "FPR (hard negatives): " }, { t: "33.33%", c: deny }],
  [{ t: "Latency p50/p95/p99:   0.20 / 447.96 / 536.28 ms" }],
  [],
  [{ t: "=== Layers: regex,ml,llm ===", c: amb }],
  [{ t: "Recall (attacks):      98.1%" }],
  [{ t: "FPR (benign):          " }, { t: "5.00%", c: deny }],
  [{ t: "FPR (hard negatives): " }, { t: "33.33%", c: deny }],
  [{ t: "Latency p50/p95/p99:   0.19 / 310.75 / 492.21 ms" }],
  [],
  [{ t: "📄 Report written to benchmarks/results/benchmark-2026-09-26.json", c: dim }],
];

const categories = [
  { name: "dangerous_commands", pass: 12, total: 12 },
  { name: "exfiltration", pass: 15, total: 15 },
  { name: "indirect_injection", pass: 10, total: 10 },
  { name: "system_extraction", pass: 13, total: 14 },
  { name: "direct_injection", pass: 24, total: 27 },
  { name: "jailbreak", pass: 16, total: 18 },
  { name: "encoded_obfuscated", pass: 7, total: 10 },
];

const owaspMap = [
  {
    id: "LLM01",
    name: "Prompt Injection",
    covers: "direct_injection, indirect_injection, jailbreak, encoded_obfuscated",
  },
  { id: "LLM02", name: "Sensitive Information Disclosure", covers: "exfiltration" },
  { id: "LLM06", name: "Excessive Agency", covers: "dangerous_commands" },
  { id: "LLM07", name: "System Prompt Leakage", covers: "system_extraction" },
];

const limits = [
  {
    t: "ML false positives",
    d: "On hard negatives — benign prompts worded to look like attacks — the ML layer wrongly blocks 4 out of 12 (33.3%). Typically requests that talk about security or API keys without exposing any. This is the current top priority.",
  },
  {
    t: "ML latency",
    d: "p95 sits around 450ms versus under 2ms for regex alone — a real cost to weigh against the recall gain depending on the use case.",
  },
  {
    t: "LLM layer",
    d: "Depends on an external API, so results vary by environment. On this corpus it adds no measurable recall over regex+ML.",
  },
  {
    t: "Obfuscation",
    d: "Still the hardest category (80% even with ML) — character-spaced text, invisible characters and HTML-comment tricks are the next target.",
  },
];

function RecallBar({ name, pass, total }: { name: string; pass: number; total: number }) {
  const pct = (pass / total) * 100;
  const color = pct === 100 ? "bg-allow" : pct >= 85 ? "bg-amber" : "bg-deny";
  return (
    <div className="grid grid-cols-[160px_1fr_52px] items-center gap-3 text-sm">
      <span className="font-mono text-[12.5px] text-paper/60">{name}</span>
      <div className="h-2.5 overflow-hidden rounded-sm bg-line-black">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-right font-mono text-[12.5px] text-paper/70">
        {pass}/{total}
      </span>
    </div>
  );
}

function Post() {
  return (
    <div className="bg-ink text-paper">
      <header className="sticky top-0 z-50 border-b border-line-black bg-ink/85 backdrop-blur-md">
        <div className="wrap flex h-[68px] items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 font-mono text-[17px] font-bold">
            <img src={logo} alt="Cerbere AG logo" className="size-8 shrink-0 border border-amber/40 object-cover" />
            <span>
              CERBERE<span className="text-amber">&nbsp;AG</span>
            </span>
          </a>
          <Link to="/blog" className="font-mono text-sm text-paper/70 transition-colors hover:text-amber">
            ← Blog
          </Link>
        </div>
      </header>

      <article className="wrap max-w-[720px] py-20 md:py-24">
        <Reveal>
          <span className="eyebrow">benchmark</span>
          <h1 className="mt-3 text-[clamp(30px,4.6vw,44px)] leading-[1.12]">
            Detecting prompt injection in production
          </h1>
          <p className="mt-4 max-w-xl text-[17px] text-paper/70">
            Our first public benchmark for AgentGuard's detection runtime: recall, false
            positives and latency for each layer, measured against a corpus mapped to the
            OWASP Top 10 for LLM Applications.
          </p>
          <p className="mt-5 font-mono text-[12.5px] text-paper/40">
            September 26, 2026 · benchmark v1.0.0 · reproducible corpus and hashes below
          </p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-3 divide-x divide-line-black border border-line-black">
          <div className="p-5">
            <div className="text-2xl">91.5%</div>
            <div className="mt-1 text-xs text-paper/50">recall — regex only</div>
          </div>
          <div className="p-5">
            <div className="text-2xl text-amber">98.1%</div>
            <div className="mt-1 text-xs text-paper/50">recall — regex + ML</div>
          </div>
          <div className="p-5">
            <div className="text-2xl">0%</div>
            <div className="mt-1 text-xs text-paper/50">false positives — regex only</div>
          </div>
        </Reveal>

        <Reveal className="mt-10 border-l-2 border-amber bg-black/20 p-6">
          <p className="text-[15px] text-paper/85">
            <strong className="text-paper">Short version:</strong> the deterministic{" "}
            <code className="font-mono text-amber">regex</code> layer catches 91.5% of the
            attacks in our corpus with 0% false positives, under a millisecond. Adding a ML
            layer pushes recall to 98.1%, at the cost of ~450ms latency and false positive
            rates that still need work.
          </p>
          <p className="mt-3 text-[15px] text-paper/70">
            We're publishing this first because the deterministic layer is already solid,
            fast and fully reproducible. The ML false-positive work is in progress — the
            "Known limitations" section below is part of this post, not a footnote.
          </p>
        </Reveal>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">Methodology</h2>
        <p className="mt-4 text-paper/80">
          The corpus contains 106 malicious prompts, 20 ordinary benign prompts, and 12{" "}
          <em>hard negatives</em> — benign prompts worded to resemble attacks (e.g. "write a
          blog post explaining prompt injection and how to defend against it"), designed to
          trip up an over-eager detector.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[13px] text-paper/60 sm:grid-cols-3">
          <div>SDK <span className="text-paper">0.4.2</span></div>
          <div>Python <span className="text-paper">3.14.2</span></div>
          <div>Platform <span className="text-paper">Windows 10</span></div>
        </div>
        <p className="mt-6 text-xs text-paper/45">Corpus hashes (for reproduction):</p>
        <p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-paper/45">
          attacks — 7775a3e8326df3c71fdd478587e126bc5d733ce5327181305d1d61ec8213c5aa
          <br />
          benign — f967bf6d22d18c4fa764f864286cc0f2e960265066c51ba1039beff0e2a4bf60
          <br />
          hard_negatives — 54e96f408e696b8bfda7aaa8cf8dee305af6c678dfdf1a06c924fab3f83dae99
        </p>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">The actual run</h2>
        <p className="mt-4 text-paper/80">No cherry-picking — this is the real CLI output.</p>
        <Reveal className="mt-6">
          <Terminal title="benchmarks/run_public_benchmark.py" lines={benchLines} height="min-h-[320px]" />
        </Reveal>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">Results by configuration</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-black text-left text-xs text-paper/50">
                <th className="py-2 pr-3 font-normal">Layers</th>
                <th className="py-2 pr-3 text-right font-normal">Recall</th>
                <th className="py-2 pr-3 text-right font-normal">FP benign</th>
                <th className="py-2 pr-3 text-right font-normal">FP hard-neg.</th>
                <th className="py-2 pr-3 text-right font-normal">p50</th>
                <th className="py-2 text-right font-normal">p95</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              <tr className="border-b border-line-black">
                <td className="py-3 pr-3 text-allow">regex</td>
                <td className="py-3 pr-3 text-right">91.5%</td>
                <td className="py-3 pr-3 text-right">0.0%</td>
                <td className="py-3 pr-3 text-right">0.0%</td>
                <td className="py-3 pr-3 text-right">0.29ms</td>
                <td className="py-3 text-right">1.48ms</td>
              </tr>
              <tr className="border-b border-line-black">
                <td className="py-3 pr-3 text-amber">regex + ML</td>
                <td className="py-3 pr-3 text-right">98.1%</td>
                <td className="py-3 pr-3 text-right">5.0%</td>
                <td className="py-3 pr-3 text-right">33.3%</td>
                <td className="py-3 pr-3 text-right">0.20ms</td>
                <td className="py-3 text-right">448ms</td>
              </tr>
              <tr>
                <td className="py-3 pr-3 text-amber">regex + ML + LLM</td>
                <td className="py-3 pr-3 text-right">98.1%</td>
                <td className="py-3 pr-3 text-right">5.0%</td>
                <td className="py-3 pr-3 text-right">33.3%</td>
                <td className="py-3 pr-3 text-right">0.22ms</td>
                <td className="py-3 text-right">442ms</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">Recall by category — regex only</h2>
        <div className="mt-6 grid gap-3">
          {categories.map((c) => (
            <RecallBar key={c.name} name={c.name} pass={c.pass} total={c.total} />
          ))}
        </div>
        <p className="mt-5 text-sm text-paper/60">
          Obfuscation — character-spaced text, invisible characters, HTML-comment tricks —
          is the hardest category for regex alone. It's exactly where the ML layer helps
          most (7/10 → 8/10), at the cost of the false positives described below.
        </p>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">
          Mapping to the OWASP Top 10 for LLM Applications (2025)
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden border border-line-black bg-line-black sm:grid-cols-2">
          {owaspMap.map((o) => (
            <div key={o.id} className="bg-ink p-6">
              <div className="font-mono text-xs text-amber">{o.id}</div>
              <div className="mt-1.5 text-[15px] font-medium">{o.name}</div>
              <div className="mt-1 font-mono text-[12.5px] text-paper/50">{o.covers}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 border-t border-line-black pt-8 text-2xl">Known limitations</h2>
        <div className="mt-4">
          {limits.map((l) => (
            <div key={l.t} className="flex gap-4 border-b border-line-black py-4 last:border-b-0">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
              <p className="text-[14.5px] text-paper/70">
                <strong className="text-paper">{l.t}:</strong> {l.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-black pt-8">
          <p className="text-sm text-paper/60">
            Code and benchmark are reproducible on GitHub. Feedback and failure cases welcome
            — this is an actively iterated project.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-sm border border-line-black px-4 py-2.5 font-mono text-sm transition-colors hover:border-amber hover:text-amber"
          >
            View the repo →
          </a>
        </div>
      </article>

      <footer className="border-t border-line-black bg-cream py-10 text-coal">
        <div className="wrap flex flex-wrap items-center justify-between gap-3.5">
          <div className="font-mono text-[13px] opacity-75">
            <a href={`${APP}/login`} className="hover:opacity-100">
              Dashboard
            </a>
          </div>
          <div className="font-mono text-[12.5px] opacity-65">© 2026 Cerbere AG. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
