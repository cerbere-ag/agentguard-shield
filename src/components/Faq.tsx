import { useState } from "react";
import { Reveal } from "./Reveal";

export function Faq() {
  const faqs = [
    {
      q: "How does Cerbere AG detect prompt injections?",
      a: "We use a 3-layer engine: ultra-fast regex patterns, a lightweight ML classifier, and an LLM judge for ambiguous cases. All of this runs in milliseconds before the prompt reaches your model.",
    },
    {
      q: "Do my data leave my infrastructure?",
      a: "No. With local or self-hosted deployment, all checks happen on your own network. No sensitive data is ever sent to third-party servers.",
    },
    {
      q: "Which agent frameworks are compatible?",
      a: "Our Python SDK integrates natively with LangGraph, CrewAI, and any agent using standard tool calls. We also support MCP for universal compatibility.",
    },
    {
      q: "How do billing and observability work?",
      a: "Every agent action generates a signed trace. You can set atomic budgets per agent and receive Slack or Gmail alerts for anomalous behavior or cost overruns.",
    },
    {
      q: "Can I try it for free before committing?",
      a: "Absolutely. The Free plan lets you connect up to 2 agents with a 7-day audit history, no credit card required.",
    },
  ];

  const [selectedFaq, setSelectedFaq] = useState<typeof faqs[0] | null>(null);

  return (
    <section className="bg-ink py-20 md:py-28" id="faq">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">faq</span>
          <h2 className="mt-3 text-[clamp(26px,3.4vw,36px)]">
            Frequently Asked Questions
          </h2>
        </Reveal>

        {/* Scroll horizontal corrigé */}
        <div className="mt-10 flex w-full overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
          {faqs.map((item, index) => (
            <Reveal key={index}>
              <button
                type="button"
                onClick={() => setSelectedFaq(item)}
                className="flex-none w-[280px] md:w-[320px] snap-center rounded-sm border border-line-black bg-black/20 p-6 text-left transition-all hover:border-amber hover:bg-black/40 active:scale-[0.98]"
              >
                <h3 className="font-display text-lg font-medium text-paper">
                  {item.q}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-amber">
                  Read answer
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modale */}
      {selectedFaq && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedFaq(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-sm border border-amber bg-ink p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFaq(null)}
              className="absolute right-4 top-4 text-paper/50 hover:text-amber transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <span className="font-mono text-xs font-semibold text-amber">FAQ</span>
            <h3 className="mt-3 text-xl font-display font-medium text-paper">
              {selectedFaq.q}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              {selectedFaq.a}
            </p>
            
            <button
              type="button"
              onClick={() => setSelectedFaq(null)}
              className="mt-8 w-full rounded-sm bg-amber py-2.5 font-mono text-sm text-ink font-medium hover:bg-amber-deep transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
