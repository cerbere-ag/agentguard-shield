import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export function DecisionChain() {
  return (
    <section className="border-t border-line-black bg-ink text-paper">
      <div className="wrap">
        <Reveal className="max-w-2xl pt-20 md:pt-28">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            The AgentGuard Security Architecture.
          </h2>
          <p className="mt-3.5 max-w-[54ch] text-base text-paper/65">
            From agent call to audited decision: runtime, policy, observability and governance
            in one stack. Watch the flow come alive as you scroll.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ArchitectureDiagram />
        </Reveal>

        <HowItWorks />
      </div>
    </section>
  );
}
