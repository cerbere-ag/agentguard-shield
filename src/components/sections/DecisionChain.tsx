import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/HowItWorks";
import { DecisionScene } from "@/components/DecisionScene";

const steps: Array<[string, string, string]> = [
  ["01", "Agent acts", "Your agent calls a tool or an LLM through the SDK or MCP server."],
  ["02", "Identity & capability", "Cerbere resolves which agent this is and what it is allowed to hold."],
  ["03", "Scope & sensitivity", "The specific arguments are checked against scope and data classification."],
  ["04", "Policy evaluated", "Budget, rate limits and your org's rules are applied to this one call."],
  ["05", "Decision", "Allow, block, or hold for human approval, logged with the full reasoning."],
];

export function DecisionChain() {
  return (
    <section className="border-t border-line-black bg-ink py-20 md:py-28">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">One decision chain, every time.</h2>
          <p className="mt-3.5 max-w-[54ch] text-base text-paper/65">
            Cerbere sits inline on every LLM call and every tool call. Each one walks the same
            deterministic chain before it is allowed to run. Hover the diagram to explore it.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-0 overflow-x-auto md:grid-cols-1">
            {steps.map(([n, title, body], i) => (
              <Reveal
                key={n}
                className={["border-t", "border-line-black", "p-6", i === steps.length - 1 ? "border-b" : ""].join(" ")}
              >
                <span className="font-mono text-[12.5px] text-amber">{n}</span>
                <h3 className="mb-2 mt-2 text-[17px]">{title}</h3>
                <p className="text-[13.5px] text-paper/60">{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <DecisionScene />
          </Reveal>
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}
