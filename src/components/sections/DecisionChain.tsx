import { Reveal } from "@/components/Reveal";
import { ArchitectureFigure } from "@/components/ArchitectureFigure";

export function DecisionChain() {
  return (
    <section id="how-it-works" className="border-t border-line-black bg-ink text-paper">
      <div className="wrap pb-20 md:pb-28">
        <Reveal className="max-w-2xl pt-20 md:pt-28">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            From agent call to audited decision.
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-base text-paper/65">
            Cerbere AG sits between your agent and its tools. Every call is intercepted,
            classified, decided on by policy and risk, observed, and written to an audit log. One
            trace follows it the whole way.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ArchitectureFigure />
        </Reveal>
      </div>
    </section>
  );
}
