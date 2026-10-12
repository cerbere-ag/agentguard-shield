import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { DecisionScene } from "@/components/DecisionScene";

export function DecisionChain() {
  return (
    <section className="border-t border-line-black bg-ink text-paper">
      <div className="wrap">
        <Reveal className="max-w-2xl pt-20 md:pt-28">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">One decision chain, every time.</h2>
          <p className="mt-3.5 max-w-[54ch] text-base text-paper/65">
            Cerbere sits inline on every LLM call and every tool call. Keep scrolling: the diagram
            unfolds into the exact chain each call walks before it is allowed to run.
          </p>
        </Reveal>
      </div>

      <DecisionScene />

      <div className="wrap">
        <HowItWorks />
      </div>
    </section>
  );
}
