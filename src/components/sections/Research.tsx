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
