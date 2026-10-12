import { Reveal } from "@/components/Reveal";

export function Mission() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">mission</span>
        </Reveal>

        <Reveal>
          <p className="mt-3 max-w-[30ch] font-display text-[clamp(22px,2.6vw,29px)] font-medium leading-[1.32]">
            The internet's early years taught us that an open, unguarded system gets exploited.
            Agentic AI is repeating that lesson, faster.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">1995 - the open web</span>
            <h3 className="mb-3 text-xl">Every new connection was a new exposure.</h3>
            <p className="max-w-[40ch] text-[15.5px] text-paper/65">
              As homes and offices came online, viruses, worms and bad actors found an unguarded
              surface. It took firewalls, antivirus and years of hard lessons before connected
              stopped meaning exposed.
            </p>
          </Reveal>

          <Reveal className="border-l border-line-black pl-6">
            <span className="mb-2.5 block font-mono text-sm text-amber">2026 - the agentic era</span>
            <h3 className="mb-3 text-xl">Every new agent is a new attack surface.</h3>
            <p className="max-w-[40ch] text-[15.5px] text-paper/65">
              An agent that can read, decide and act can also be hijacked by a poisoned document,
              a malicious tool response or an injected instruction. Without a layer that checks
              intent before execution, autonomy becomes risk.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
